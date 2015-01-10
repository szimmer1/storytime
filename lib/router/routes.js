Router.map(function() {
    Router.route('home', {
        path: '/',
        template: 'dashboard',
        layoutTemplate: 'layout'
    });

<<<<<<< HEAD
Router.route('login', {
    path: '/login',
    template: 'login',
    layoutTemplate: 'mainLayout'
});

Router.route('event', {
    path: '/event/:_eventName',
    template: 'dashboard',
    layoutTemplate: 'mainLayout',
    data: function(){
        var eventIdFound = Events.findOne({
            name: this.params._eventName
        });
        console.log(eventIdFound);
        if (eventIdFound) {
            return Snapshots.find({
                eventId: eventIdFound._id
=======
    Router.route('story', {
        path: '/story',
        template: 'story',
        layoutTemplate: 'layout'
    });

    Router.route('event', {
        path: '/event/:_eventName',
        template: 'dashboard',
        layoutTemplate: 'layout',
        data: function(){
            var eventIdFound = Events.findOne({
                name: this.params._eventName
>>>>>>> 673e029405b5c0ccbe562eba840cdde3055a38b5
            });
            console.log(eventIdFound);
            if (eventIdFound) {
                return Snapshots.find({
                    eventId: eventIdFound._id
                });
            }
        }
    });

<<<<<<< HEAD
Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.render('login');
    }
    else {
        this.next();
    }
});
=======
    Router.route('login', {
        path: '/login',
        template: 'login',
        layoutTemplate: 'layout'
    });
});
>>>>>>> 673e029405b5c0ccbe562eba840cdde3055a38b5
