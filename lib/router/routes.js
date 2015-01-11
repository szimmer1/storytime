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
            var newEventId = Events.insert({
                name: this.params._eventName
            });
            if (newEventId) {
                console.log("inserted new event");
                Session.set('eventId', newEventId);
                return Snapshots.find({
                    eventId: newEventId
                })
            }
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
