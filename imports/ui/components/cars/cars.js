import { Markers } from '/imports/api/cars/cars.js';
import './cars.html';

Template.cars.onRendered(function() {

});

Template.cars.helpers({
    cars () {
        return Markers.find().fetch();
    },
});

Template.cars.events({
    'click .carRow' () {
        Session.set('selectedCar', this);
        console.log('Selected Car', this);
        FlowRouter.go(`/cars/${this._id}`)
    },
});