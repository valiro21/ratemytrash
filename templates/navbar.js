/**
 * Created by Valentin Rosca on 16.04.2016.
 */
if (Meteor.isClient) {
    Template.UserNavbar.helpers({
        get_user: function () {
            return Meteor.userId();
        }
    });

    Template.UserNavbar.events({
        'click #Login': function (){
            console.log ("works!");
            Session.set('show_login_side', true);
        }
    });
}