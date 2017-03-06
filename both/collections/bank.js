this.Bank = new Mongo.Collection("bank");

this.Bank.userCanInsert = function(userId, doc) {
	return true;
};

this.Bank.userCanUpdate = function(userId, doc) {
	return true;
};

this.Bank.userCanRemove = function(userId, doc) {
	return true;
};
//
//materialize:materialize@=0.97.3
this.Schemas = this.Schemas || {};

this.Schemas.Bank = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	}
});

this.Bank.attachSchema(this.Schemas.Bank);
