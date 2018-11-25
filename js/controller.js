var map;
var bounds;
var infowindow;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 42.323590,
            lng: -83.446889
        },
        zoom: 11,
        mapTypeControl: false
    });

    infowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    ko.applyBindings(new viewModel());

}

var viewModel = function() {
    var self = this;
    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');
    self.markers = ko.observableArray([]);

    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i
        });
        marker.address = locations[i].address;
        marker.phone = locations[i].phone;
        marker.website = locations[i].website;

        self.markers.push(marker);
        marker.addListener('click', function() {
            populateInfoWindow(this, infowindow);
        });

    }

    // Extend the boundaries of the map for each marker and display the marker

    self.showListings = function() {

        for (var i = 0; i < self.markers().length; i++) {
            self.markers()[i].setMap(map);
            bounds.extend(self.markers()[i].position);
        }
        map.fitBounds(bounds);
    }

    self.hideListings = function() {
        for (var i = 0; i < self.markers().length; i++) {
            self.markers()[i].setMap(null);
        }
    }

    self.highlightMarker = function(marker) {

        marker.setIcon(highlightedIcon);

    }

    self.defaultMarker = function(marker) {

        marker.setIcon(defaultIcon);
    }

    //pulled from previous Udacity lessons
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34),
            new google.maps.Size(21, 34));
        return markerImage;
    }

    function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
            infowindow.setContent('<div class="info-window"><h4>' + marker.title + '</h4><div>' + marker.address + '</div><div>' +
                marker.phone + '</div><a href="http://' + marker.website + '">' + marker.website + '</a></div>');
        } else {
            infowindow.setContent('<div class="info-window"><h4>' + marker.title + '</h4><div>' + marker.address + '</div><div>' +
                marker.phone + '</div><a href="http://' + marker.website + '">' + marker.website + '</a></div>');
        }
        infowindow.open(map, marker);
    }
}