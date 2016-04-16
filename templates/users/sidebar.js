if (Meteor.isClient) {
    Session.setDefault('show_login', false);
    Session.setDefault('show_sidebar', false);
    Template.Sidebar.helpers({
        show: function () {
            return Session.get("show_sidebar");
        },
        show_login:function () {
            return Session.get("show_login");
        }
    });
}