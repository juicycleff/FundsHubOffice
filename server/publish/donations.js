Meteor.publish("my_gh_trans", function(userId) {
	return Donations.publishJoinedCursors(Donations.find({gh:userId}, {}));
});

Meteor.publish("my_awaiting_gh_trans", function(userId) {
	return Donations.publishJoinedCursors(Donations.find({gh:userId,completed:false,canceled:false}, {}));
});

Meteor.publish("my_ph_trans", function(userId) {
	return Donations.publishJoinedCursors(Donations.find({ph:userId}, {}));
});

Meteor.publish("my_awaiting_ph_trans", function(userId) {
	return Donations.publishJoinedCursors(Donations.find({ph:userId,completed:false,canceled:false}, {}));
});

Meteor.publish("transaction", function(transactionId) {
	return Donations.publishJoinedCursors(Donations.find({_id:transactionId}, {}));
});

