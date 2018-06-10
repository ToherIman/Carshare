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

//A car has several attributes like type, price, fueled or not, reserved, etc.

Markers.attachSchema(new SimpleSchema({
  lat: {
      type: Number,
      optional: true,
  },
  lng: {
    type: Number,
    optional: true,
},
position: {
    type: Object,
    optional: true
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
    label: "Model",
    max: 200,
    //optional: true,
  },
  type: {
    type: String,
    label: "Type",
    max: 200,
    //optional: true,
  },
  price: {
    type: Number,
    label: "Price",
    max: 200,
    //optional: true,
  },
  fueled: {
    type: Boolean,
    label: "Fueled",
    //optional: true,
  },
  condition: {
    type: String,
    label: "Condition",
    max: 200,
    optional: true,
  },
  notes: {
    type: String,
    label: "Notes",
    max: 200,
    optional: true,
  },
}, { tracker: Tracker }));

export { Markers };