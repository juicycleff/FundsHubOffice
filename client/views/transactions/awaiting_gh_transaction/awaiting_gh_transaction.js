var pageSession = new ReactiveDict();

Template.TransactionsAwaitingGhTransaction.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.TransactionsAwaitingGhTransaction.events({
	
});

Template.TransactionsAwaitingGhTransaction.helpers({
	
});

var TransactionsAwaitingGhTransactionAGhTransFormItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSearchString");
	var sortBy = pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSortBy");
	var sortAscending = pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["gh", "ph", "status", "amount", "timer", "canceled", "completed", "proof"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TransactionsAwaitingGhTransactionAGhTransFormExport = function(cursor, fileType) {
	var data = TransactionsAwaitingGhTransactionAGhTransFormItems(cursor);
	var exportFields = ["gh", "ph", "status", "completed"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TransactionsAwaitingGhTransactionAGhTransForm.rendered = function() {
	pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormStyle", "table");
	
};

Template.TransactionsAwaitingGhTransactionAGhTransForm.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		/**/
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingGhTransactionAGhTransFormExport(this.my_awaiting_gh_trans, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingGhTransactionAGhTransFormExport(this.my_awaiting_gh_trans, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingGhTransactionAGhTransFormExport(this.my_awaiting_gh_trans, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingGhTransactionAGhTransFormExport(this.my_awaiting_gh_trans, "json");
	}

	
});

Template.TransactionsAwaitingGhTransactionAGhTransForm.helpers({

	"insertButtonClass": function() {
		return Donations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.my_awaiting_gh_trans || this.my_awaiting_gh_trans.count() == 0;
	},
	"isNotEmpty": function() {
		return this.my_awaiting_gh_trans && this.my_awaiting_gh_trans.count() > 0;
	},
	"isNotFound": function() {
		return this.my_awaiting_gh_trans && pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSearchString") && TransactionsAwaitingGhTransactionAGhTransFormItems(this.my_awaiting_gh_trans).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormStyle") == "gallery";
	}

	
});


Template.TransactionsAwaitingGhTransactionAGhTransFormTable.rendered = function() {
	
};

Template.TransactionsAwaitingGhTransactionAGhTransFormTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TransactionsAwaitingGhTransactionAGhTransFormSortAscending") || false;
			pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSortAscending", !sortAscending);
		} else {
			pageSession.set("TransactionsAwaitingGhTransactionAGhTransFormSortAscending", true);
		}
	}
});

Template.TransactionsAwaitingGhTransactionAGhTransFormTable.helpers({
	"tableItems": function() {
		return TransactionsAwaitingGhTransactionAGhTransFormItems(this.my_awaiting_gh_trans);
	}
});


Template.TransactionsAwaitingGhTransactionAGhTransFormTableItems.rendered = function() {
	
};

Template.TransactionsAwaitingGhTransactionAGhTransFormTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("donationsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Donations.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		/**/
		return false;
	}
});

Template.TransactionsAwaitingGhTransactionAGhTransFormTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Donations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Donations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
