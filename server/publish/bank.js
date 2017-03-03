Meteor.publish("bank_list", function() {
	return Bank.find({}, {});
});

Meteor.publish("banks_null", function() {
	return Bank.find({_id:null}, {});
});

Meteor.publish("bank", function(bankId) {
	return Bank.find({_id:bankId}, {});
});

