import './map.html';
import '../../stylesheets/map.less';
import { Markers } from '/imports/api/cars/cars.js';

let MAP_ZOOM = 15;
let previousMarker;

Meteor.startup(function () {  
    GoogleMaps.load({
      'key':'AIzaSyCWhpeerNrVZ0anRiC7LdDramfX2faZELI',
      'libraries': 'places'
  });
});

Template.map.onCreated(function() {  
    Meteor.subscribe('markers.all');
    GoogleMaps.ready('map', function(map) {
      
      var geocoder = new google.maps.Geocoder();
        google.maps.event.addListener(map.instance, 'click', async function(event) {
          console.log('event', event);
          if( previousMarker) {
            previousMarker.setMap(null);
          }
          geocoder.geocode({location: {lat: event.latLng.lat(), lng: event.latLng.lng()}}, function(results, status){
            if (status === 'OK') {
              if (results[0]) {
                const carInfo = { 
                  lat: event.latLng.lat(), 
                  lng: event.latLng.lng(), 
                  user: Meteor.userId(),
                  address: results[0].formatted_address
                 };  
                 Session.set('carInfo', carInfo);
              } else {
                window.alert('No results found');
              }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
          previousMarker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
            label: "Add Car",
            //icon: 'img/car.png',
            map: map.instance,
            id: document._id
          });
          
        });

        var markers = {};
        console.log('m', Markers.find().fetch());
        Markers.find().observe({
          added (document) {
            let marker = new google.maps.Marker({
              draggable: false,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(document.lat, document.lng),
              //label: "",
              icon: 'img/car.png',
              map: map.instance,
              id: document._id
            });

            google.maps.event.addDomListener(marker, 'click', function() {
              console.log('click', marker);
              Session.set('selectedCar', document);
              FlowRouter.go(`/cars/${document._id}`);
            });
            /*
            google.maps.event.addListener(marker, 'dragend', function(event) {
              Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
            });
            */
            markers[document._id] = marker;
          },
          
          changed: function (newDocument, oldDocument) {
            markers[newDocument._id].setPosition({lat: newDocument.lat, lng: newDocument.lng});
          },
          
          removed: function (oldDocument) {
            markers[oldDocument._id].setMap(null);
            google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
            delete markers[oldDocument._id];
          }
        });
        
        const input = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        console.log('Map', map);
        // Bias the SearchBox results towards current map's viewport.
   
        map.instance.addListener('bounds_changed', function() {
            searchBox.setBounds(map.instance.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
  
            if (places.length == 0) {
              return;
            }
  
            // Clear out the old markers.
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];
  
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };
  
              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: map.instance,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));
  
              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.instance.fitBounds(bounds);
          });
    
      });
    });

Template.map.helpers({  
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });

