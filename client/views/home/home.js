Template.Home.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Home.events({
	
});

Template.Home.helpers({
	
});

Template.HomeHomeJumbotron.rendered = function() {
	
};

Template.HomeHomeJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("login", {});
	}
	
});

Template.HomeHomeJumbotron.helpers({
	
});

Template.AllTestament.created = function() {
  
};

Template.AllTestament.destroyed = function() {

};

Template.AllTestament.rendered = function() {
  Meteor.subscribe("testimony_list");
};

Template.AllTestament.helpers({
  testaments: function(){
    return Testimony.find({},{});
  }
});

Template.AllTestament.events({

});

Template.AboutUs.created = function() {

};

Template.AboutUs.destroyed = function() {

};

Template.AboutUs.rendered = function() {

};

Template.AboutUs.helpers({

});

Template.AboutUs.events({

});
