if (Meteor.isClient) {
    Router.route('/', function () {
        this.render('Home');
    });

    Router.route('/Home', function () {
        this.render('Home');
    });

    Router.route('/Top', function () {
        this.render('Top');
    });
}