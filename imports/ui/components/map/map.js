import './map.html';
import '../../stylesheets/map.less';
import { Markers, Pos } from '/imports/api/cars/cars.js';

var MAP_ZOOM = 15;

Meteor.startup(function () {  
    GoogleMaps.load({'key':'AIzaSyCWhpeerNrVZ0anRiC7LdDramfX2faZELI'});
});
if(Meteor.isClient) {
Template.map.onCreated(function() {  
    Meteor.subscribe('markers.all');
    GoogleMaps.ready('map', function(map) {
      var geocoder = new google.maps.Geocoder();
        let marker;
        Markers.find().observe(function () {
          let latLng = Geolocation.latLng();
          const userId = Meteor.userId();
          const userPosition = Pos.findOne({user: userId});
          //console.log('user p', userPosition);

          if(!userPosition || Meteor.userId()) {
            Pos.insert({
                user: Meteor.userId(),
                latLng: latLng
            });
          } else {
            console.log(userPosition.latLng);
            Pos.update({_id: userPosition._id}, { $set: {latLng: latLng}});
          }

          if(!latLng) {
            return;
          }
          
          if(!marker) {
            marker = new google.maps.Marker({
              position: new google.maps.LatLng(latLng.lat, latLng.lng),
              map: map.instance,
              label: 'R'
            });
          }
    
          else {
            marker.setPosition(latLng);
          }
          map.instance.setCenter(marker.getPosition());
          map.instance.setZoom(MAP_ZOOM);
    
    
        });
    
        google.maps.event.addListener(map.instance, 'click', async function(event) {
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
         
         new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()),
            label: "THIS",
            //icon: 'img/car.png',
            map: map.instance,
            id: document._id
          });
          /*
          Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng(), user: Meteor.userId() }, function(err, res) {
            if(err) {
              console.log('err', err);
              Bert.alert({
                title: 'Error',
                message: err.reason,
                style:'fixed-top',
                type: 'danger',
              });
            } else {
              Session.set('place', res);
            }
          });
          */
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
    
            google.maps.event.addListener(marker, 'click', function(event) {
              console.log('marker', marker.position.lat(), marker.position.lng());
              let selectedMarker = marker.id;
              Session.set('place', marker.id);
              
              const carInfo = { 
                lat: marker.position.lat(), 
                lng: marker.position.lng(), 
                user: Meteor.userId(),
                };
              Session.set('carInfo', carInfo);
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

};