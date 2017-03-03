this.Donations = new Mongo.Collection("donations");

this.Donations.userCanInsert = function(userId, doc) {
	return true;
};

this.Donations.userCanUpdate = function(userId, doc) {
	return true;
};

this.Donations.userCanRemove = function(userId, doc) {
	return true;
};
