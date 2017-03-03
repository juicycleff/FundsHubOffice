this.PhRequest = new Mongo.Collection("ph_request");

this.PhRequest.userCanInsert = function(userId, doc) {
	return true;
};

this.PhRequest.userCanUpdate = function(userId, doc) {
	return true;
};

this.PhRequest.userCanRemove = function(userId, doc) {
	return true;
};
