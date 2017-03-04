Template.Dashboard.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Dashboard.events({
	'click #copyButton': function(e, t){
		var $temp = $("<input>");
		$("refId").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	}
});

Template.Dashboard.helpers({
	
});
