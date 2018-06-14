import './search.html';
import { Markers } from '/imports/api/cars/cars.js';


Template.search.onCreated(function () {
    //Meteor.subscribe('books.all');
    Meteor.subscribe('markers.all');
  });

 


  Template.search.helpers({
    makerCollection: function() {
      return Markers;
    },
    carList() {
      let cars = Markers.find().fetch();
      const carC = Session.get('carCriteria');
      if(carC) {
          return cars.filter(j => {
            let fields = Object.values(j);
            if(fields.some(e => e.toString().toUpperCase().includes(carC))) {
              return j;
            }
          });
        }
            /*
            Object.values(j).filter(v => 
              console.log(v.toString().toUpperCase().includes(carC))
              //v.toString().toUpperCase().includes(carC)
            );
           })/
           */
      else {
          return cars;
      } 
  },
});

Template.search.events({
  'keypress #searchCar, keyup #searchCar': function(ev, template) {
    Session.set('carCriteria', $("#searchCar").val().toUpperCase());
    //const search = $("#search_for_jurisdiction_field").val().toUpperCase();
  },
  "click .carCard" () {
    Session.set('selectedCar', this);
    FlowRouter.go(`/cars/${this._id}`)
  }
});