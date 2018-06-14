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
        
        Markers.find().observe({
          added (document) {
            let marker = new google.maps.Marker({
              draggable: true,
              animation: google.maps.Animation.DROP,
              position: new google.maps.LatLng(document.lat, document.lng),
              //label: "",
              icon: 'img/car.png',
              map: map.instance,
              id: document._id
            });
    
            google.maps.event.addListener(marker, 'dragend', function(event) {
              Markers.update(marker.id, {$set: {lat: event.latLng.lat(), lng: event.latLng.lng()}});
            });
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

