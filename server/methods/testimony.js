Meteor.methods({
	"testimonyInsert": function(data) {
		return Testimony.insert(data);
	},
	"testimonyUpdate": function(id, data) {
		Testimony.update({ _id: id }, { $set: data });
	},
	"testimonyRemove": function(id) {
		Testimony.remove({ _id: id });
	}
});
