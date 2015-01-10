/**
 * Created by mzimmerman on 1/10/15.
 */

Template.layout.events({
    'click .logout': function() {
        Meteor.logout(function() {
            Router.go('login');
        })
    }
});
