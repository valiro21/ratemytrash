
if (Meteor.isClient) {
  // counter starts at 0
  var images = [{Img: "https://goo.gl/9sqP52"}, {Img: "http://www.waitaki.govt.nz/services/PublishingImages/Pages/Registering-Your-Dog/Dog%20Control.png"}];

  Template.body.helpers({
    Img: function() {
     return images; 
    }
  });
}


if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

