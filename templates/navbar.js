/**
 * Created by Valentin Rosca on 16.04.2016.
 */
if (Meteor.isClient) {
    Template.UserNavbar.helpers({
        get_user: function () {
            if (!Meteor.userId())
                return false;
            return Meteor.user().username;
        }
    });

    Template.UserNavbar.events({
        'click #Login': function (){
            Session.set ('login_error', false);
            Session.set('show_login_side', true);
        },
        'click #SignUp': function () {
            window.location.href='SignUp';
        },
        'click #SignOut': function () {
            Meteor.logout();
        }
    });
}