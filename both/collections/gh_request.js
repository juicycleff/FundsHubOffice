this.GhRequest = new Mongo.Collection("gh_request");

this.GhRequest.userCanInsert = function(userId, doc) {
	return true;
};

this.GhRequest.userCanUpdate = function(userId, doc) {
	return true;
};

this.GhRequest.userCanRemove = function(userId, doc) {
	return true;
};
