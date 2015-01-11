var isValidPassword = function(password) {
  if(!password) {
    return false;
  }
  else if(password.length < 6) {
    return false;
  }
  else {
    return true;
  }
}


var isValidEmail = function(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



Template.login.events({
  'submit .form-signin' : function(e, t) {
    e.preventDefault();

    var email = $('#signin-email').val();
    var password = $('#signin-password').val();

    if(!isValidEmail(email)) {
      alert('Please enter a valid email address!');
      return;
    }

    if(!isValidPassword(password)) {
      alert('Please enter a valid password!');
      return;
    }

    Meteor.loginWithPassword(email, password, function(err) {
      if(err) {
        alert('Error logging in: ' + err.reason);
      }
      else {
        Router.go('/events');
      }
    });
  },

  'submit .form-enroll' : function(e, t) {
    e.preventDefault();

    var em = $('#signin-email').val();
    var pw = $('#signin-password').val();
    var pw2 = $('#signin-password-confirm').val();

    if(!isValidEmail(em)) {
      alert('Please enter a valid email address!');
      return;
    }

    if(!isValidPassword(pw)) {
      alert('Please enter a valid password!');
      return;
    }

    if(pw !== pw2) {
      alert('Passwords must match!');
      return;
    }

    Accounts.createUser({ email: em, password: pw }, function(err) {
      if(err) {
        alert('Error creating new user: ' + err.reason);
      }
      else {
        Router.go('/events');
      }
    });
  },

  'click .btn-enroll' : function(e, t) {
    Session.set('formView', 'enrollView');
  },

  'click .btn-login' : function(e, t) {
    Session.set('formView', 'loginView');
  }

});


Template.login.helpers({
  isLoginForm : function() {
    return Session.get('formView') === 'loginView';
  },

  isEnrollForm : function() {
    return Session.get('formView') === 'enrollView';
  }
});
