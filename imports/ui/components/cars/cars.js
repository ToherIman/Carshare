import { Markers } from '/imports/api/cars/cars.js';
import './cars.html';

Template.cars.onRendered(function() {

});

Template.cars.helpers({
    cars () {
        return Markers.find().fetch();
    },
    geocoding(lat, lng) {
        //let address = Meteor.call('geocodeReverse', lat, lng)
        return lat+lng;
    }
});

Template.cars.events({
    'click .carRow' () {
        Session.set('selectedCar', this);
        console.log('Selected Car', this);
        FlowRouter.go(`/cars/${this._id}`)
    },
});