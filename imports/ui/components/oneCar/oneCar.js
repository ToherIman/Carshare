import './oneCar.html';

Template.oneCar.helpers({
    selectedCar () {
        return Session.get('selectedCar');
    }
});

Template.oneCar.onDestroyed(function() {
    Session.set('selectedCar', null);
});