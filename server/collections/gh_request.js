GhRequest.allow({
	insert: function (userId, doc) {
		return GhRequest.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return GhRequest.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return GhRequest.userCanRemove(userId, doc);
	}
});

GhRequest.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

GhRequest.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

GhRequest.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

GhRequest.before.remove(function(userId, doc) {
	
});

GhRequest.after.insert(function(userId, doc) {
	
});

GhRequest.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

GhRequest.after.remove(function(userId, doc) {
	
});
