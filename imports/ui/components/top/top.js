import './top.html';

Template.top.events({
    'click #addCars' () {
        console.log('click');
        FlowRouter.go('/add');
    },
    'click #searchCars' () {
        console.log('click');
        FlowRouter.go('/select');
    }
});