Router.map(function() {
    Router.route('home', {
        path: '/',
        template: 'login',
        layoutTemplate: 'layout'
    });

Router.route('login', {
    path: '/login',
    template: 'login',
    layoutTemplate: 'layout'
});

Router.route('event', {
    path: '/event/:_eventName',
    template: 'dashboard',
    layoutTemplate: 'layout',
    data: function () {
        var eventFound = Events.findOne({
            name: this.params._eventName
        });
        if (eventFound) {
            Session.set('eventId',eventFound._id);
            return Snapshots.find({
                eventId: eventFound._id
            })
        }
    }
});

    Router.route('story', {
        path: '/story',
        template: 'story',
        layoutTemplate: 'layout'
    });

    Router.onBeforeAction(function () {
        if (!Meteor.userId()) {
            this.render('login');
        }
        else {
            this.next();
        }
    });
});
