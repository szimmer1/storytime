Template.navigation.events({
  'click #add-event' : function(event, t) {
    event.preventDefault();
    console.log('Add event logic here');
  },

  'click #logout': function(e, t) {
    event.preventDefault();

    Meteor.logout(function(err) {
      Router.go('/');
    })
  }
});
