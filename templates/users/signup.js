/**
 * Created by Valentin Rosca on 16.04.2016.
 */
function is_alphanumeric(c){
    if ('a' <= c && c <='z')
        return true;
    else if ('A' <= c && c <= 'Z')
        return true;
    else if ('0'<=c && c <='9')
        return true;
    return false;
}

if (Meteor.isClient) {
    Session.setDefault('passwords_different', false);
    Session.setDefault('password_small', false);

    Session.setDefault('email_taken', false);

    Session.setDefault('no_campus', false);
    Session.setDefault('campus', '');

    Session.setDefault('username_too_big', false);
    Session.setDefault('username_too_small', false);
    Session.setDefault('username_not_valid', false);
    Session.setDefault('is_username_taken', false);
    Session.setDefault('null_username', false);

    Template.SignUp.helpers({
        'get_campuses': function() {
            return Campuses.find();
        },
        'get_password_confirm': function (){
            return Session.get('passwords_different');
        },
        'get_username_not_valid': function () {
            return Session.get('username_not_valid');
        },
        'get_password_small':function () {
            return Session.get('password_small');
        },
        'get_username_small':function () {
            return Session.get('username_small');
        },
        'get_username_too_big':function () {
            return Session.get('username_too_big');
        },
        'is_username_taken':function () {
            return Session.get('is_username_taken');
        },
        'is_not_campus_selected':function (){
            return Session.get('no_campus');
        },
        'get_null_username': function () {
            return Session.get('null_username');
        }
    });

    Template.SignUp.events({
        'submit form': function(event) {
            event.preventDefault();
            var campus = event.target[0].value;
            if (Campuses.find({name:campus}).count()==0) {
                alert('Please select a campus!');
                return;
            }

            var username = event.target[1].value;
            var password = event.target[2].value;
            var confirm_password = event.target[3].value;
            var email = event.target[4].value;

            var passwords_different;
            if (password == confirm_password)
                passwords_different = false;
            else
                passwords_different = true;

            Session.set('passwords_different', passwords_different);

            if (password.length < 6) {
                Session.set('password_small', true);
                return;
            }
            else Session.set('password_small', false);

            var passwords_different = Session.get('passwords_different');
            var is_username_taken = Session.get('is_username_taken');
            var no_campus = Session.get('no_campus');
            var email_taken = Session.get('email_taken');

            if (username=='') {
                Session.set('null_username', true);
            }
            else
               Session.set('null_username', false);

            if (!passwords_different && !is_username_taken && !no_campus && !email_taken) {
                Meteor.call('register_user', {username:username, email:email, password:password, campus:campus});
                Session.set('show_sidebar', true);
                Session.set('show_login', true);
            }
        },
        'keyup #username': function (event) {
            Session.set('null_username', false);
            var username = event.currentTarget.value;
            var check = true;
            for (var i = 0; i < username.length; i++) {
                var c = username[i];
                if (!is_alphanumeric(c))
                    check = false;
            }

            var campus = Session.get('campus');
            if (Campuses.find({name:campus}).count() == 0)
                Session.set('no_campus', true);
            else
                Session.set('no_campus',false);

            Session.set('username_not_valid', !check);

            if (username.length > 20) {
                Session.set('username_too_big', true);
            }
            else Session.set('username_too_big', false);

            if (username.length < 6 && username.length > 0) {
                Session.set('username_small', true);
            }
            else Session.set('username_small', false);

            if (SelfUsers.find({username: username, campus:Session.get('campus')}).count()) {
                Session.set('is_username_taken', true);
            }
            else {
                Session.set('is_username_taken', false);
            }
        },
        'keyup #email': function (event) {
            var email = event.currentTarget.value;
            if (Meteor.users.find({email:email}).count()) {
                Session.set('email_taken', true);
            }
            else Session.set('email_taken', false);
        },
        'change #password': function (event) {
            var password = event.currentTarget.value;
            if (password.length < 6)
                Session.set('password_small', true);
            else Session.set('password_small', false);
        },
        'change #change_password': function(event) {
            var template = Template.instance();
            var confirm_password = event.currentTarget.value;
            var password = event.target[3].value;
            if (password !== confirm_password) {
                Session.set('password_different', true);
            }
            else Session.set('password_different', false);
        },
        'change #Campuses': function(event) {
            var campus = event.currentTarget.value;
            Session.set('campus',campus);
            if (Campuses.find({name:campus}).count()==0)
                Session.set('no_campus', true);
            Session.set('no_campus', false);
        }
    });
}