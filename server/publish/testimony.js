Meteor.publish("testimony_list", function() {
	return Testimony.find({}, {});
});

Meteor.publish("testimonies_null", function() {
	return Testimony.find({_id:null}, {});
});

Meteor.publish("testimony", function(testimonyId) {
	return Testimony.find({_id:testimonyId}, {});
});

