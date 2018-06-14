// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../cars';
import { Markers, Books } from '../cars';

Meteor.publish('markers.all', function (params) {
  return Markers.find({title: {$exists: true}});
});

