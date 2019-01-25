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

    this.itemFilter = ko.observable('');

    //create a marker for each location in the locations array located in models.js
    for (var i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon,
            id: i,
            map: map
        });

        //add default values if there is no data returned from foursquare
        marker.address = '';
        marker.phone = '';
        marker.website = '';
        marker.rating = '';

        //ajax call to get data from foursquare api
        (function(marker) {
            $.ajax({
                url: 'https://api.foursquare.com/v2/venues/search?ll=' + marker.position.lat() + ',' + marker.position.lng() + '&query=' + marker.title + '&client_id=MCLI5B3BQXDAOANZ0KROJJDTU1ENKQUMDZEXSEQ3VZZL3K5O&client_secret=ZFNPE0JKM3UIC3WCQBZ4UP0ZM4FWY42AQISP0Y2Q0Y2GU31L&v=20181125',
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    marker.id = data.response.venues[0].id;
                    $.ajax({
                        url: 'https://api.foursquare.com/v2/venues/' + marker.id + '?client_id=MCLI5B3BQXDAOANZ0KROJJDTU1ENKQUMDZEXSEQ3VZZL3K5O&client_secret=ZFNPE0JKM3UIC3WCQBZ4UP0ZM4FWY42AQISP0Y2Q0Y2GU31L&v=20181125',
                        method: 'GET',
                        dataType: 'json',
                        success: function(data) {
                            var foursqLoc = data.response.venue.location;

                            //test to make sure address exists in foursquare
                            if (foursqLoc.address && foursqLoc.city && foursqLoc.state && foursqLoc.postalCode) {
                                marker.address = foursqLoc.address + ', ' + foursqLoc.city + ', ' + foursqLoc.state + ' ' + foursqLoc.postalCode;
                            }

                            //test to make sure phone number exists in foursquare
                            var phone = data.response.venue.contact.phone
                            if (phone) {
                                phone = phone.replace(/[^\d]/g, "")
                                if (phone.length == 10) {
                                    marker.phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
                                }
                            }

                            //test to make sure url exists in foursquare
                            if (data.response.venue.url) {
                                marker.website = data.response.venue.url
                            }

                            //test to make sure rating exists
                            if (data.response.venue.rating) {
                                marker.rating = 'Foursquare Rating: ' + data.response.venue.rating
                            }
                        },
                        error: function() {
                            marker.rating = 'Error reaching Foursquare API';
                        }
                    })
                },
                error: function() {
                    marker.rating = 'Error reaching Foursquare API';
                }

            })
        })(marker)

        //add marker to markers location array
        self.markers.push(marker);

        //listener to open infowindow on individual marker
        marker.addListener('click', function() {
            toggleBounce(this);
        });
        bounds.extend(marker.position);
    }

    map.fitBounds(bounds);

    // Extend the boundaries of the map for each marker and display the marker
    self.showListings = function() {

        for (var i = 0; i < self.markers().length; i++) {
            self.markers()[i].setMap(map);
            bounds.extend(self.markers()[i].position);
            infowindow.setContent(null);
            infowindow.close();

        }
        map.fitBounds(bounds);
    }

    //highlights marker on mouseover 
    self.highlightMarker = function(marker) {

        marker.setIcon(highlightedIcon);

    }

    //returns marker to default icon color
    self.defaultMarker = function(marker) {

        marker.setIcon(defaultIcon);
    }

    //function pulled from google marker animations tutorial
    //used to toggle the bounce animation of a marker when clicked, or stop bouncing after 5 seconds.
    //will also open the info window
    function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            populateInfoWindow(marker, infowindow);
            map.panTo(marker.position);
            window.setTimeout(function() {
                marker.setAnimation(null);
            }, 5000);
        }
    }

    //pulled from previous Udacity lessons
    //sets color and shape of marker
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


    //sets the data inside an opened infowindow
    function populateInfoWindow(marker, infowindow) {
        if (infowindow.marker != marker) {
            // Clear the infowindow content to give the streetview time to load.
            infowindow.setContent('');
            infowindow.marker = marker;
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;
            });
            infowindow.setContent('<div class="info-window"><h4>' + marker.title + '</h4><div>' + marker.rating + '</div><div>' + marker.address + '</div><div>' +
                marker.phone + '</div><a href="' + marker.website + '">' + marker.website + '</a></div>');
        } else {
            infowindow.setContent('<div class="info-window"><h4>' + marker.title + '</h4><div>' + marker.rating + '</div><div>' + marker.address + '</div><div>' +
                marker.phone + '</div><a href="' + marker.website + '">' + marker.website + '</a></div>');
        }
        infowindow.open(map, marker);
    }

    //toggles the hamburger icon and sidebar the width of the sidebar
    self.toggleMenu = function() {
        $(".sidebar").toggleClass("sidebar-toggle");


    }

    //live search set on keydown
    this.breweryFilter = ko.computed(function() {
        //takes value in search bar, all lower case and compares it to markers array
        var search = self.itemFilter().toLowerCase();
        //if there is no data in the search bar set all markers to visible, and display all locations in the sidebar
        if (!search) {
            self.markers().forEach(marker => { marker.setVisible(true) });
            return self.markers();
        } else {
            //display only valid results and set others as non visible
            return ko.utils.arrayFilter(self.markers(), function(marker) {
                var filter = marker.title.toLowerCase().indexOf(search) > -1;
                if (filter) {
                    marker.setVisible(true);
                } else {
                    marker.setVisible(false);
                }
                return filter;
            })
        }
    })
}