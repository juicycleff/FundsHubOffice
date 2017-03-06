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

this.Schemas = this.Schemas || {};

this.Schemas.Donations = new SimpleSchema({
	gh: {
		label: "GH",
		type: String
	},
	ph: {
		label: "PH",
		type: String
	},
	status: {
		label: "Status",
		type: String
	},
	amount: {
		label: "Amount",
		type: Number
	},
	timer: {
		label: "Expire Date",
		type: Date
	},
	canceled: {
		label: "Canceled",
		type: Boolean
	},
	completed: {
		label: "Completed",
		type: Boolean
	},
	proof: {
		label: "Proof",
		type: Object,
		blackbox: true,
		optional: true
	}
});

this.Donations.attachSchema(this.Schemas.Donations);
