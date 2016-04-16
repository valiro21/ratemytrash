/**
 * Created by Andrei on 4/16/2016.
 */

if (Meteor.isClient) {

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
            var x = event.currentTarget.value;
            console.log("opacity: ",x);
            var elem = template.find("highlightblack");
            console.log(elem);
            var elem2 = template.find("highlightblack");


            elem.style.opacity = x * (1 / 10);
            elem2.style.opacity = x * -(1 / 10);
        }
    });
}