Referals.allow({
	insert: function (userId, doc) {
		return Referals.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Referals.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Referals.userCanRemove(userId, doc);
	}
});

Referals.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Referals.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Referals.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Referals.before.remove(function(userId, doc) {
	
});

Referals.after.insert(function(userId, doc) {
	
});

Referals.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Referals.after.remove(function(userId, doc) {
	
});
