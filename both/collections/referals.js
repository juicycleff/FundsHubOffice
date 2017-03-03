this.Referals = new Mongo.Collection("referals");

this.Referals.userCanInsert = function(userId, doc) {
	return true;
};

this.Referals.userCanUpdate = function(userId, doc) {
	return true;
};

this.Referals.userCanRemove = function(userId, doc) {
	return true;
};
