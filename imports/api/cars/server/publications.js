// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Links } from '../cars';
import { Markers, Books } from '../cars';

Meteor.publish('links.all', function () {
  return Links.find();
});

Meteor.publish('markers.all', function () {
  return Markers.find();
});

Meteor.publish('books.all', function () {
  return Books.find();
});

