var pageSession = new ReactiveDict();

Template.TransactionsPhTransactions.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.TransactionsPhTransactions.events({
	
});

Template.TransactionsPhTransactions.helpers({
	
});

var TransactionsPhTransactionsPhTransFormItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TransactionsPhTransactionsPhTransFormSearchString");
	var sortBy = pageSession.get("TransactionsPhTransactionsPhTransFormSortBy");
	var sortAscending = pageSession.get("TransactionsPhTransactionsPhTransFormSortAscending");
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

var TransactionsPhTransactionsPhTransFormExport = function(cursor, fileType) {
	var data = TransactionsPhTransactionsPhTransFormItems(cursor);
	var exportFields = ["gh", "ph", "status", "completed"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TransactionsPhTransactionsPhTransForm.rendered = function() {
	pageSession.set("TransactionsPhTransactionsPhTransFormStyle", "table");
	
};

Template.TransactionsPhTransactionsPhTransForm.events({
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
				pageSession.set("TransactionsPhTransactionsPhTransFormSearchString", searchString);
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
					pageSession.set("TransactionsPhTransactionsPhTransFormSearchString", searchString);
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
					pageSession.set("TransactionsPhTransactionsPhTransFormSearchString", "");
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
		TransactionsPhTransactionsPhTransFormExport(this.my_ph_trans, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TransactionsPhTransactionsPhTransFormExport(this.my_ph_trans, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TransactionsPhTransactionsPhTransFormExport(this.my_ph_trans, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TransactionsPhTransactionsPhTransFormExport(this.my_ph_trans, "json");
	}

	
});

Template.TransactionsPhTransactionsPhTransForm.helpers({

	"insertButtonClass": function() {
		return Donations.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.my_ph_trans || this.my_ph_trans.count() == 0;
	},
	"isNotEmpty": function() {
		return this.my_ph_trans && this.my_ph_trans.count() > 0;
	},
	"isNotFound": function() {
		return this.my_ph_trans && pageSession.get("TransactionsPhTransactionsPhTransFormSearchString") && TransactionsPhTransactionsPhTransFormItems(this.my_ph_trans).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TransactionsPhTransactionsPhTransFormSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TransactionsPhTransactionsPhTransFormStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("TransactionsPhTransactionsPhTransFormStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("TransactionsPhTransactionsPhTransFormStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TransactionsPhTransactionsPhTransFormStyle") == "gallery";
	}

	
});


Template.TransactionsPhTransactionsPhTransFormTable.rendered = function() {
	
};

Template.TransactionsPhTransactionsPhTransFormTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TransactionsPhTransactionsPhTransFormSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TransactionsPhTransactionsPhTransFormSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TransactionsPhTransactionsPhTransFormSortAscending") || false;
			pageSession.set("TransactionsPhTransactionsPhTransFormSortAscending", !sortAscending);
		} else {
			pageSession.set("TransactionsPhTransactionsPhTransFormSortAscending", true);
		}
	}
});

Template.TransactionsPhTransactionsPhTransFormTable.helpers({
	"tableItems": function() {
		return TransactionsPhTransactionsPhTransFormItems(this.my_ph_trans);
	}
});


Template.TransactionsPhTransactionsPhTransFormTableItems.rendered = function() {
	
};

Template.TransactionsPhTransactionsPhTransFormTableItems.events({
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

Template.TransactionsPhTransactionsPhTransFormTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Donations.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Donations.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
