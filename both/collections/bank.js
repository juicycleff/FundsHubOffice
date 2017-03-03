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
