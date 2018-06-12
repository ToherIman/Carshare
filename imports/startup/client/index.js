// Import client startup through a single index entry point

import './routes.js';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

Meteor.startup(function() {  
    GoogleMaps.load({'key':'AIzaSyCWhpeerNrVZ0anRiC7LdDramfX2faZELI'});
});