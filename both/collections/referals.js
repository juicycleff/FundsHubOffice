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

this.Schemas = this.Schemas || {};

this.Schemas.Referals = new SimpleSchema({
	owner: {
		label: "Owner",
		type: String
	},
	refs: {
		type: [String]
	}
});

this.Referals.attachSchema(this.Schemas.Referals);
