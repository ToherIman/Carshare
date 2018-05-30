import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

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

Books = new Mongo.Collection("books");
Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  copies: {
    type: Number,
    label: "Number of copies",
    min: 0
  },
  lastCheckedOut: {
    type: Date,
    label: "Last date this book was checked out",
    optional: true
  },
  summary: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  }
}, { tracker: Tracker }));
