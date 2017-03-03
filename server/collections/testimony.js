Testimony.allow({
	insert: function (userId, doc) {
		return Testimony.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Testimony.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Testimony.userCanRemove(userId, doc);
	}
});

Testimony.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Testimony.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Testimony.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Testimony.before.remove(function(userId, doc) {
	
});

Testimony.after.insert(function(userId, doc) {
	
});

Testimony.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Testimony.after.remove(function(userId, doc) {
	
});
