Router.route('home', {
    path: '/',
    template: 'dashboard',
    layoutTemplate: 'mainLayout'
});

Router.route('event', {
    path: '/event/:event_name'
})

Router.route('login', {
    path: '/login',
    template: 'login',
    layoutTemplate: 'mainLayout'
});