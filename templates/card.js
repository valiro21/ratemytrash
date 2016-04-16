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

    function loadhighlight() {
        var template = template.instance();
        var elem = template.findAll("#highlightblack");
        var elem2 = template.findAll("#highlightyellow");
        console.log("first ",elem);
        console.log("second ",elem2);

        elem.style.opacity = 0.5;
        elem2.style.opacity = 0.5;
    }

    Template.cards.rendered = loadhighlight;
    Template.cards.events(
    {
        "change #slider":function(event) {
            var template = Template.instance();

            console.log (template);
            var x = event.currentTarget.value;
            console.log("opacity: ",x);
            console.log (event);
            var elem = template.find('#highlightyellow');
            console.log(elem);
            var elem2 = template.find('#highlightblack');
            console.log (elem2);

            var middle = 0.65;
            var low = 0.3;
            var high = 1;

            var first = 0.5 + x * 0.05;
            var second = 0.5 - x * 0.05;

            elem.style.opacity = low + first * (high - low);
            elem2.style.opacity = low + second * (high - low);
        }
    });
	
}