/*** Created by Andrei on 4/16/2016.
 */
if (Meteor.isClient) {
    // counter starts at 0
    var images = [{Img: "https://goo.gl/9sqP52", Rating: 7},{Img: "https://goo.gl/9sqP52", Rating: 8}, {Img: "https://goo.gl/9sqP52", Rating: -5}, {Img: "http://www.waitaki.govt.nz/services/PublishingImages/Pages/Registering-Your-Dog/Dog%20Control.png", Rating: 8}];
    /*var facuts = [
        {ImgGood: {Img : "https://goo.gl/9sqP52", Rating: 3},
            ImgBad:{Img : "http://www.waitaki.govt.nz/services/PublishingImages/Pages/Registering-Your-Dog/Dog%20Control.png", Rating : 3}
        }];*/

    Session.setDefault("images",images);

    function compare(a, b){
        if (a.Rating < b.Rating)
            return 1;
        else if(a.Rating > b.Rating)
            return -1;
        else return 0;
    }

    images.sort(compare);

    function makefacuts(a){
        var i, j, poz = 0;
        var b = [];
        for(i = 0; i < a.length; i++)
        {
            b.push( {ImgGood: {Img : a[i].Img, Rating: a[i].Rating}, ImgBad: {Img : ' ', Rating: 0}, Id : i} );
            poz++;
        }
        console.log("Before Bad", b);
        poz = 0;
        for(j = a.length-1; j >= 0; j--)
        {
            b[poz].ImgBad.Img = a[j].Img;
            b[poz].ImgBad.Rating = a[j].Rating;
            poz++;
        }
        return b;
    }
    var facuts = makefacuts(images);

    console.log("Facuts", facuts);

    Template.Campus.helpers(
        {
            "facuts": function() {
                return facuts;
            }
        }
    );

    Template.facut.helpers(
        {
            ImgG: function(number) {
                console.log("ID", number);
                console.log("facuts", facuts);
                var sad = number.hash.number;
                console.log("ratinggood", facuts[sad].ImgGood.Rating);
                var s = '//:0';
                if(facuts[sad].ImgGood.Rating>0)
                    s = facuts[sad].ImgGood.Img;
                return s;
            },
            ImgB: function(number) {
                var sad = number.hash.number;
                console.log("ratingbad", facuts[sad].ImgBad.Rating);
                var s = '//:0';
                if(facuts[sad].ImgBad.Rating<0)
                    s = facuts[sad].ImgBad.Img;
                return s;
            }
        });
}