/**
 * Created by Andrei on 4/16/2016.
 */

if (Meteor.isClient) {

   Template.cards.helpers({Variable : function(argument)
   {
       console.log("argument functie", argument);
       var image=argument.hash.argument;
       console.log("argument functie", image);
       if(image == "//:0") return false;
       else return true;
   }
   });
}