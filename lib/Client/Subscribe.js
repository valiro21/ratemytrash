if (Meteor.isClient) {
    Meteor.subscribe('campuses');
    Meteor.subscribe('self_users');
    Meteor.subscribe('images');
}