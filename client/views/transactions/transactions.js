Template.Transactions.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Transactions.events({
	
});

Template.Transactions.helpers({
	
});
