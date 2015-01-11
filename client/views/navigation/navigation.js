Template.navigation.helpers({
'addToolTips': function(){
  $('[data-toggle="addEventModal"]').tooltip({placement:'bottom'});
}
 
})
Template.navigation.events({
  'click #add-event' : function(event, t) {
    event.preventDefault();
    console.log('Add event logic here');
    $('#addEventModal').modal('toggle');
  },

  'click #save-event-btn' : function (event, t) {
    event.preventDefault();

    var eventName = $('#event-name').val();
    var eventDescription = $('#event-description').val();
    var userId = Meteor.userId();

    var eventId = Events.insert({
      name : eventName,
      description : eventDescription,
      creatingUserId : userId,
      createdAt: new Date()
    });

    Router.go('events');
  },

  'click #logout': function(e, t) {
    event.preventDefault();

    Meteor.logout(function(err) {
      Router.go('/');
    })
  }
});
