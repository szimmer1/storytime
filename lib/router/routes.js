Router.map(function() {

    this.route('splash', {
        path: '/',
        template: 'splash',
        layoutTemplate: 'layout'
    });

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

  this.route('story', {
      path: '/story',
      template: 'story',
      layoutTemplate: 'layout'
  });

  this.onBeforeAction(function () {
      if (!Meteor.userId()) {
          this.layout('emptyLayout');
          this.render('dashboard');
      }
      else {
          this.next();
      }
  });
});
