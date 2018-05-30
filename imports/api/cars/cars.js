import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);
let Markers = new Mongo.Collection('markers');  
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

//Books = new Mongo.Collection("books");
Markers.attachSchema(new SimpleSchema({
  lat: {
      type: Number,
      optional: true,
  },
  lng: {
    type: Number,
    optional: true,
},
user: {
    type: String,
    optional:true,
    label: "User"
},
editing: {
    type: Boolean,
    optional: true
},
  title: {
    type: String,
    label: "Title",
    max: 200,
    optional: true,
  },
}, { tracker: Tracker }));

export { Markers };