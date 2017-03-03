Meteor.methods({
	"referalsInsert": function(data) {
		return Referals.insert(data);
	},
	"referalsUpdate": function(id, data) {
		Referals.update({ _id: id }, { $set: data });
	},
	"referalsRemove": function(id) {
		Referals.remove({ _id: id });
	}
});
