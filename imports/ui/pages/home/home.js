import './home.html';

import '../../components/login/login.js';
import '../../components/add/add.js';
import '../../components/search/search.js';
import '../../components/cars/cars.js';
import '../../components/oneCar/oneCar.js';
import '../../components/map/map.js';

Template.App_home.helpers({
    isLogged() {
        return !!Meteor.user();
    }
});