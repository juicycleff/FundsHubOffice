PhRequest.allow({
	insert: function (userId, doc) {
		return PhRequest.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return PhRequest.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return PhRequest.userCanRemove(userId, doc);
	}
});

PhRequest.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

PhRequest.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

PhRequest.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

PhRequest.before.remove(function(userId, doc) {
	
});

PhRequest.after.insert(function(userId, doc) {
	
});

PhRequest.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

PhRequest.after.remove(function(userId, doc) {
	
});
