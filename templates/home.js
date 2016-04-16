if (Meteor.isClient) {
    Template.Home.helpers({
        'get_images': function () {
            return Images.find();
        }
    });
}