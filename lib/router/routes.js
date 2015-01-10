Router.map(function() {
  this.route('home', {
      path: '/',
      template: 'dashboard',
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
      data: function () {
          var eventIdFound = Events.findOne({
              name: this.params._eventName
          });
          console.log(eventIdFound);
          if (eventIdFound) {
              return Snapshots.find({
                  eventId: eventIdFound._id
              })
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
