// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../links.js';
import { Markers } from '../links.js';

Meteor.publish('links.all', function () {
  return Links.find();
});

Meteor.publish('markers.all', function () {
  return Markers.find();
});