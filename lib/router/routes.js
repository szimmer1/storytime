Router.route('home', {
    path: '/',
    template: 'dashboard',
    layoutTemplate: 'mainLayout'
});

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
            });
        }
    }
});

Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        this.render('login');
    }
    else {
        this.next();
    }
});
