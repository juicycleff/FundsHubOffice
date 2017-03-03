Donations.allow({
	insert: function (userId, doc) {
		return Donations.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Donations.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Donations.userCanRemove(userId, doc);
	}
});

Donations.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Donations.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Donations.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Donations.before.remove(function(userId, doc) {
	
});

Donations.after.insert(function(userId, doc) {
	
});

Donations.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Donations.after.remove(function(userId, doc) {
	
});
