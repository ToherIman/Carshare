import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { GeoCoder } from 'meteor/aldeed:geocoder';

Meteor.methods({
  'links.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
  async 'geocodeReverse' (lat, lng) {
    check(lat, Number);
    check(lng, Number);
    let geo = new GeoCoder({
      'key': 'AIzaSyCWhpeerNrVZ0anRiC7LdDramfX2faZELI',
    });
    return geo.reverse(lat, lng);
  }
});
