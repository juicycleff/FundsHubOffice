Meteor.methods({
	"bankInsert": function(data) {
		return Bank.insert(data);
	},
	"bankUpdate": function(id, data) {
		Bank.update({ _id: id }, { $set: data });
	},
	"bankRemove": function(id) {
		Bank.remove({ _id: id });
	}
});
