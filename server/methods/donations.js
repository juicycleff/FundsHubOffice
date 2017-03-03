Meteor.methods({
	"donationsInsert": function(data) {
		return Donations.insert(data);
	},
	"donationsUpdate": function(id, data) {
		Donations.update({ _id: id }, { $set: data });
	},
	"donationsRemove": function(id) {
		Donations.remove({ _id: id });
	}
});
