Router.map(function() {
    Router.route('home', {
        path: '/',
        template: 'dashboard',
        layoutTemplate: 'layout'
    });

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
            });
            console.log(eventIdFound);
            if (eventIdFound) {
                return Snapshots.find({
                    eventId: eventIdFound._id
                });
            }
        }
    });

    Router.route('login', {
        path: '/login',
        template: 'login',
        layoutTemplate: 'layout'
    });
});