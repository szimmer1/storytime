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
            name: this.params._eventName.toLowerCase()
        });
        if (eventFound) {
            Session.set('eventId',eventFound._id);
            return Snapshots.find({
                eventId: eventFound._id
            })
        }
        else {
            
            // redirect to event creation page
            Router.go('/');
        }
    }
    });

  this.route('events', {
    path: ['/', '/events'],
    template: 'events',
    layoutTemplate: 'layout',
    data: function () {
      return Events.find({}, {name: 1});
    }
  });

  this.route('eventresult', {
    path: '/event/:_eventName/:_snaptype',
    template: 'story',
    layoutTemplate: 'layout',
    data: function () {
        Session.set('showDropzone', false); // Don't allow new snapshots when showing results of an event.
        var eventFound = Events.findOne({
            name: this.params._eventName.toLowerCase()
        });
        if (eventFound) {
          Session.set('eventId',eventFound._id);
          var snapshotIds = Snapshots.getTopVotedIds(eventFound._id,3);
          console.log(snapshotIds);
          var result = Snapshots.find({
            _id: {
              $in: snapshotIds
            }
          });
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
