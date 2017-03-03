Meteor.methods({
	"imagesInsert": function(data) {
		return Images.insert(data);
	},
	"imagesUpdate": function(id, data) {
		Images.update({ _id: id }, { $set: data });
	},
	"imagesRemove": function(id) {
		Images.remove({ _id: id });
	}
});
