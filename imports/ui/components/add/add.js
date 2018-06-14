import './add.html';
import { Markers, Pos, Books } from '/imports/api/cars/cars.js';

Template.add.onCreated(function () {
  //Meteor.subscribe('books.all');
  Meteor.subscribe('markers.all');
});

Template.add.onRendered(function () {
  
})


Template.add.helpers({
    makerCollection: function() {
      return Markers;
    },
    spot: function () {
      return Markers.findOne(Session.get('place'));
    },
    carInfo: function() {
      return Session.get('carInfo');
    },
  });
  
  Template.add.events({
    "click .addSpot" () {
      const spot = Session.get('place');
      const cheked = Markers.findOne(spot).editing;
      Markers.update(spot, {$set: {editing: !cheked}});
      console.log(cheked);
    },
    "click .deleteSpot" () {
      const spot = Session.get('place');
      Markers.remove(spot);
    },
    "submit .new-spot" (event) {
      event.preventDefault();
      const name = event.target.spotName.value;
      const typeSpot = event.target.spotType.value;
      const descr = event.target.description.value;
      const spot = Session.get('place');
      const cheked = Markers.findOne(spot).editing;
      Markers.update(spot, {$set: {
        "name": name,
        "type": typeSpot,
        "descr": descr,
        "editing" : !cheked
      }
      });
    }
  });

  AutoForm.addHooks('insertCarForm', {
    before: {
      // Replace `formType` with the form `type` attribute to which this hook applies
      insert: function(doc) {
        if(doc.address) {
          if(Session.get('carInfo')) {
            doc.lat = Session.get('carInfo').lat;
            doc.lng = Session.get('carInfo').lng;
          } else {
            Bert.alert({ 
              title: 'Error', 
              message: 'Click on map to mark car position', 
              style:'fixed-top', 
              type: 'danger', 
          });
          }
        } else {
          Bert.alert({ 
            title: 'Error', 
            message: 'Address is required', 
            style:'fixed-top', 
            type: 'danger', 
          }); 
        }
        return doc;
        // Then return it or pass it to this.result()
        //return doc; (synchronous)
        //return false; (synchronous, cancel)
        //this.result(doc); (asynchronous)
        //this.result(false); (asynchronous, cancel)
      }
    },
  });

  //something