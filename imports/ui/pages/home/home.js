import './home.html';

import '../../components/login/login.js';
import '../../components/add/add.js';
import '../../components/select/select.js';

Template.App_home.helpers({
    isLogged() {
        return !!Meteor.user();
    }
});