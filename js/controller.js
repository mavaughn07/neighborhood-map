var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 42.323590,
            lng: -83.446889
        },
        zoom: 11,
        mapTypeControl: false
    });
}