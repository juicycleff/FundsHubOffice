Template.Referrals.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Referrals.events({
	
});

Template.Referrals.helpers({
	
});
