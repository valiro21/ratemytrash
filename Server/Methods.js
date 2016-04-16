Meteor.methods({
    'register_user': function (object) {
        if (object.campus =='')
            return;
        var newUsername = object.username + '@' + object.campus, newPassword = object.password;
        console.log("New username: ",newUsername);
        console.log("New password: ", newPassword);
        console.log("Input json", object);

        if (SelfUsers.find({username:object.username, campus:object.campus}).count() == 0) {
            console.log("Username is new");
            if (SelfUsers.find({email:object.email}).count() == 0) {
                console.log("Email is new");
                if (object.username.length > 5 && object.username.length < 20 && newPassword.length > 5) {
                    console.log("Username is good: ", newUsername);
                    var userid = Accounts.createUser({username:newUsername, email:object.email, password:newPassword});
                    SelfUsers.insert({username: object.username, email: object.email, userid: userid, campus: object.campus});
                }
            }
        }
    }
});