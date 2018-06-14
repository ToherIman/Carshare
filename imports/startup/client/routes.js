import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
//import '../../ui/pages/car/car.js';
import '../../ui/pages/not-found/not-found.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/select', {
  action() {
    BlazeLayout.render('App_body', { main: 'select' });
  },
});

FlowRouter.route('/add', {
  name: 'add',
  action() {
    BlazeLayout.render('App_body', { main: 'add' });
  },
});

FlowRouter.route('/cars', {
  action() {
    BlazeLayout.render('App_body', { main: 'cars' });
  },
});

FlowRouter.route('/cars/:carId', {
  action() {
    BlazeLayout.render('App_body', { main: 'oneCar' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
