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

this.Schemas = this.Schemas || {};

this.Schemas.GhRequest = new SimpleSchema({
	name: {
		label: "Name",
		type: String,
		optional: true
	},
	plan: {
		label: "Plan",
		type: String,
		optional: true
	},
	status: {
		label: "Status",
		type: Boolean,
		optional: true
	}
});

this.GhRequest.attachSchema(this.Schemas.GhRequest);
