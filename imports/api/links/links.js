// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection('links');
export const Markers = new Mongo.Collection('markers');  
export const Pos = new Mongo.Collection('pos');

Markers.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

Pos.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
});