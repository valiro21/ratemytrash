if(Meteor.isClient) {
    Session.setDefault('show_login_side', false);
    Session.setDefault ('login_error', false);

    Template.Login.helpers({
        get_login_error: function () {
            return Session.get('login_error');
        },
        show: function() {
            if (Meteor.userId())
                return false;
            return Session.get('show_login_side')}
    });

    Template.Login.events({
        'submit form': function (event) {
            event.preventDefault();
            var campus = event.target[0].value;
            var username = event.target[1].value;
            var password = event.target[2].value;

            var cursor = SelfUsers.find({username:username, campus:campus});
            var possibleUsers = cursor.fetch();

            if (possibleUsers.length == 0) {
                Session.set('login_error', true);
                return;
            }
            else {
                Session.set('login_error', false);
                var email = possibleUsers[0].email;
            }

            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    Session.set ('login_error', true);
                }
                else {
                    Session.set('show_login_side', false);
                    Session.set ('login_error', true);
                }
            });
        }
    });
}