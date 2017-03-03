Meteor.methods({
	"ghRequestInsert": function(data) {
		return GhRequest.insert(data);
	},
	"ghRequestUpdate": function(id, data) {
		GhRequest.update({ _id: id }, { $set: data });
	},
	"ghRequestRemove": function(id) {
		GhRequest.remove({ _id: id });
	}
});
