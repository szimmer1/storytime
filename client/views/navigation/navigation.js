Template.navigation.events({
  'click #add-event' : function(event, t) {
    event.preventDefault();
    console.log('Add event logic here');
    $('#addEventModal').modal('toggle');
  },

  'submit #add-event-form' : function (event, t) {
    event.preventDefault();

    var eventName = $('#event-name').val();
    var eventDescription = $('#event-description').val();
    var userId = Meteor.userId();

    var eventId = Events.insert({
      name : eventName,
      description : eventDescription,
      creatingUserId : userId
    });

    console.log(eventId);
  },

  'click #logout': function(e, t) {
    event.preventDefault();

    Meteor.logout(function(err) {
      Router.go('/');
    })
  }
});
