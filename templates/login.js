if(Meteor.isClient) {
    Session.setDefault('show_login_side', false);
    Template.Login.helpers({
        show: function() {return Session.get('show_login_side')}
    });
}