this.Testimony = new Mongo.Collection("testimony");

this.Testimony.userCanInsert = function(userId, doc) {
	return true;
};

this.Testimony.userCanUpdate = function(userId, doc) {
	return true;
};

this.Testimony.userCanRemove = function(userId, doc) {
	return true;
};
