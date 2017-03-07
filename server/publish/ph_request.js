Meteor.publish("ph_list", function() {
	return Bank.find({}, {});
});