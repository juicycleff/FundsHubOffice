var pageSession = new ReactiveDict();

Template.TransactionsAwaitingPhTransactions.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.TransactionsAwaitingPhTransactions.events({
	
});

Template.TransactionsAwaitingPhTransactions.helpers({
	
});

var TransactionsAwaitingPhTransactionsAPhTransFormItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSearchString");
	var sortBy = pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSortBy");
	var sortAscending = pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSortAscending");
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

var TransactionsAwaitingPhTransactionsAPhTransFormExport = function(cursor, fileType) {
	var data = TransactionsAwaitingPhTransactionsAPhTransFormItems(cursor);
	var exportFields = ["gh", "ph", "status", "completed"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TransactionsAwaitingPhTransactionsAPhTransForm.rendered = function() {
	pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormStyle", "table");
	
};

Template.TransactionsAwaitingPhTransactionsAPhTransForm.events({
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
				pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSearchString", searchString);
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
					pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSearchString", searchString);
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
					pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSearchString", "");
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
		TransactionsAwaitingPhTransactionsAPhTransFormExport(this.my_awaiting_ph_trans, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingPhTransactionsAPhTransFormExport(this.my_awaiting_ph_trans, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingPhTransactionsAPhTransFormExport(this.my_awaiting_ph_trans, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TransactionsAwaitingPhTransactionsAPhTransFormExport(this.my_awaiting_ph_trans, "json");
	}

	
});

Template.TransactionsAwaitingPhTransactionsAPhTransForm.helpers({

	"insertButtonClass": function() {
		return Donations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.my_awaiting_ph_trans || this.my_awaiting_ph_trans.count() == 0;
	},
	"isNotEmpty": function() {
		return this.my_awaiting_ph_trans && this.my_awaiting_ph_trans.count() > 0;
	},
	"isNotFound": function() {
		return this.my_awaiting_ph_trans && pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSearchString") && TransactionsAwaitingPhTransactionsAPhTransFormItems(this.my_awaiting_ph_trans).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormStyle") == "gallery";
	}

	
});


Template.TransactionsAwaitingPhTransactionsAPhTransFormTable.rendered = function() {
	
};

Template.TransactionsAwaitingPhTransactionsAPhTransFormTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TransactionsAwaitingPhTransactionsAPhTransFormSortAscending") || false;
			pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSortAscending", !sortAscending);
		} else {
			pageSession.set("TransactionsAwaitingPhTransactionsAPhTransFormSortAscending", true);
		}
	}
});

Template.TransactionsAwaitingPhTransactionsAPhTransFormTable.helpers({
	"tableItems": function() {
		return TransactionsAwaitingPhTransactionsAPhTransFormItems(this.my_awaiting_ph_trans);
	}
});


Template.TransactionsAwaitingPhTransactionsAPhTransFormTableItems.rendered = function() {
	
};

Template.TransactionsAwaitingPhTransactionsAPhTransFormTableItems.events({
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

Template.TransactionsAwaitingPhTransactionsAPhTransFormTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Donations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Donations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
