Router.map(function() {

  this.route('login', {
      path: '/login',
      template: 'login',
      layoutTemplate: 'emptyLayout'
  });

  this.route('event', {
    path: '/event/:_eventName',
    template: 'dashboard',
    layoutTemplate: 'layout',
    waitOn: function() {
      return Meteor.subscribe('events');
    },
    data: function () {
        if(!this.ready()) {
          return;
        }

        // TODO: Not the meteor way. Should use better templates and routes
        Session.set('showDropzone', true);
        var eventFound = Events.findOne({
            name: this.params._eventName
        });
        if (eventFound) {
            Session.set('eventId',eventFound._id);
            Session.set('eventName', this.params._eventName);

            return Snapshots.find({
                eventId: eventFound._id
            }, {sort: {createdAt: -1}});
        }
        else {

            // redirect to event creation page
            console.log('Could not find event.');
            Router.go('/');
        }
    }
    });

  this.route('events', {
    path: ['/', '/events'],
    template: 'events',
    layoutTemplate: 'layout',
    data: function () {
      return Events.find({}, {sort: {createdAt: -1}});
    }
  });

  this.route('eventresult', {
    path: '/event/:_eventName/:_snaptype',
    template: 'story',
    layoutTemplate: 'layout',
    data: function () {
        Session.set('showDropzone', false); // Don't allow new snapshots when showing results of an event.
        var eventFound = Events.findOne({
            name: this.params._eventName
        });
        if (eventFound) {
          Session.set('eventId', eventFound._id);
          Session.set('eventName', this.params._eventName);

          var result = [];
          if(this.params._snaptype === 'top') {
            var snapshotIds = Snapshots.getTopVotedIds(eventFound._id,20);
            result = Snapshots.find({
              _id: {
                $in: snapshotIds
              }
            }, {sort: {createdAt: -1}});
          }
          return result;
        }
      }
    });

  this.onBeforeAction(function () {
      if (!Meteor.userId()) {
          Session.set('formView', 'loginView');
          this.layout('emptyLayout');
          this.render('login');
      }
      else {
          this.next();
      }
  });
});
