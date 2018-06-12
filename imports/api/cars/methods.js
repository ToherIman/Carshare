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
  'geocodeReverse' (lat, lng) {
    return 'YEs';
    check(lat, Number);
    check(lng, Number);
    let geo = new GeoCoder({
      apiKey: 'AIzaSyCWhpeerNrVZ0anRiC7LdDramfX2faZELI',
      httpAdapter: "https",
    });
    const res = geo.reverse(lat, lng);
    console.log('geocode', res);
    return res;
  }
});
