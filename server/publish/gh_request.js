Meteor.publish("gh_list", function() {
	return Bank.find({}, {});
});