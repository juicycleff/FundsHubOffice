Bank.allow({
	insert: function (userId, doc) {
		return Bank.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Bank.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Bank.userCanRemove(userId, doc);
	}
});

Bank.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Bank.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Bank.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Bank.before.remove(function(userId, doc) {
	
});

Bank.after.insert(function(userId, doc) {
	
});

Bank.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Bank.after.remove(function(userId, doc) {
	
});
