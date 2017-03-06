this.Testimony = new Mongo.Collection("testimony");

this.Testimony.userCanInsert = function(userId, doc) {
	return true;
};

this.Testimony.userCanUpdate = function(userId, doc) {
	return true;
};

this.Testimony.userCanRemove = function(userId, doc) {
	return true;
};

this.Schemas = this.Schemas || {};

this.Schemas.Testimony = new SimpleSchema({
	owner: {
		label: "Owner",
		type: String,
		autoValue: function(){
			return HTMLMeterElement.user().profile.name;
		}
	},
	text: {
		label: "Testimony",
		type: String
	}
});

this.Testimony.attachSchema(this.Schemas.Testimony);
