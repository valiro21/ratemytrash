/**
 * Created by Valentin Rosca on 16.04.2016.
 */

if (Meteor.isServer) {
    function create_publishers () {
        Meteor.publish('campuses', function () {
            return Campuses.find();
        });

        Meteor.publish('self_users', function () {
            return SelfUsers.find();
        });
    }

    Meteor.startup(function (){
        console.log (create_publishers);
        create_publishers();
    });
}