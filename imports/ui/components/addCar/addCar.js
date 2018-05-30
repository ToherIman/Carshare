import './addCar.html';
import { Markers, Pos } from '/imports/api/links/links.js';

Template.spot.helpers({
    spot: function () {
      return Markers.findOne(Session.get('place'));
    }
  });
  
  Template.spot.events({
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

  //something