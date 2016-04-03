function initMap() {
    // Create a map object and specify the DOM element for display.
    var myLatLng = {
        lat: -33.9,
        lng: 151.2
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: true,
        mapTypeControl: false,
        streetViewControl: false,
        zoom: 10
    });

    /*var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });*/
    setMarkers(map);
}

var beaches = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
        url: 'assets/images/marker2.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(32, 32),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: 'poly'
    };
    for (var i = 0; i < beaches.length; i++) {
        var beach = beaches[i];
        var marker = new google.maps.Marker({
            position: {
                lat: beach[1],
                lng: beach[2]
            },
            map: map,
            icon: image,
            shape: shape,
            title: beach[0],
            zIndex: beach[3]
        });
        attachSecretMessage(marker, i + 1);
    }
}
function attachSecretMessage(marker, secretMessage) {
    marker.addListener('click', function() {
        $("li.item").fadeOut('fast').delay(200);
        $(".item-" + secretMessage).fadeIn('slow');
    });
}
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function DoRotate(d) {

    $(".rotate").css({
        '-moz-transform': 'rotate(' + d + 'deg)',
        '-webkit-transform': 'rotate(' + d + 'deg)',
        '-o-transform': 'rotate(' + d + 'deg)',
        '-ms-transform': 'rotate(' + d + 'deg)',
        'transform': 'rotate(' + d + 'deg)'
    });
}
function AnimateRotate(angle) {
    // caching the object for performance reasons
    var $elem = $('.rotate');

    // we use a pseudo object for the animation
    // (starts from `0` to `angle`), you can name it as you want
    $({
        deg: 90
    }).animate({
        deg: angle
    }, {
        duration: 2000,
        step: function(d) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            $elem.css({
                '-moz-transform': 'rotate(' + d + 'deg)',
                '-webkit-transform': 'rotate(' + d + 'deg)',
                '-o-transform': 'rotate(' + d + 'deg)',
                '-ms-transform': 'rotate(' + d + 'deg)',
                'transform': 'rotate(' + d + 'deg)'
            });
        }
    });
}
function showPosition(position) {
    pos = position;
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=f335cc6cd6ced755c5f01064d6932c0f", function(data) {
        console.log(data);
        // DoRotate(data.wind.deg+90);
        AnimateRotate(data.wind.deg + 90);
        $(".speed").text(data.wind.speed);
        $(".name").text(data.name);
    });
}

jQuery(document).ready(function($) {
    $("div.item-title .glyphicon").click(function() {
        $("li.item").fadeOut('fast').delay(200);
    })

    getLocation();
});