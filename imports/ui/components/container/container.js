import './container.html';
import '../login/login.js';
import '../add/add.js';
import '../select/select.js';

Template.container.helpers({
    isLogged() {
        return !!Meteor.user();
    }
});