Template.Member.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Member.events({
	
});

Template.Member.helpers({
	
});