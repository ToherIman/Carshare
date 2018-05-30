// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../cars';
import { Markers } from '../cars';

Meteor.publish('links.all', function () {
  return Links.find();
});

Meteor.publish('markers.all', function () {
  return Markers.find();
});