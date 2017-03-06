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

this.Schemas = this.Schemas || {};

this.Schemas.PhRequest = new SimpleSchema({
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
		type: String,
		optional: true
	}
});

this.PhRequest.attachSchema(this.Schemas.PhRequest);
