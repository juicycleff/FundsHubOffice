Template.Dashboard.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Dashboard.events({
	
});

Template.Dashboard.helpers({
	
});
