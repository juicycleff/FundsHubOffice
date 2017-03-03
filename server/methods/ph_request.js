Meteor.methods({
	"phRequestInsert": function(data) {
		return PhRequest.insert(data);
	},
	"phRequestUpdate": function(id, data) {
		PhRequest.update({ _id: id }, { $set: data });
	},
	"phRequestRemove": function(id) {
		PhRequest.remove({ _id: id });
	}
});
