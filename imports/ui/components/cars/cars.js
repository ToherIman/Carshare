import { Markers } from '/imports/api/cars/cars.js';
import './cars.html';

Template.cars.onRendered(function() {

});

Template.cars.helpers({
    cars () {
        console.log(Markers.find().fetch());
        return Markers.find().fetch();
    },
    geocoding(lat, lng) {
        let address = Meteor.call('geocodeReverse', lat, lng)
        return address.formattedAddress;
    }
});

Template.cars.events({
    'click .carRow' () {
        console.log('Selected Car', this);
        FlowRouter.go(`/cars/${this._id}`)
    },
});