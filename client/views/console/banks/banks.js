var pageSession = new ReactiveDict();

Template.ConsoleBanks.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleBanks.events({
	
});

Template.ConsoleBanks.helpers({
	
});

var ConsoleBanksViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ConsoleBanksViewSearchString");
	var sortBy = pageSession.get("ConsoleBanksViewSortBy");
	var sortAscending = pageSession.get("ConsoleBanksViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name"];
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

var ConsoleBanksViewExport = function(cursor, fileType) {
	var data = ConsoleBanksViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ConsoleBanksView.rendered = function() {
	pageSession.set("ConsoleBanksViewStyle", "table");
	
};

Template.ConsoleBanksView.events({
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
				pageSession.set("ConsoleBanksViewSearchString", searchString);
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
					pageSession.set("ConsoleBanksViewSearchString", searchString);
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
					pageSession.set("ConsoleBanksViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("console.banks.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ConsoleBanksViewExport(this.bank_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ConsoleBanksViewExport(this.bank_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ConsoleBanksViewExport(this.bank_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ConsoleBanksViewExport(this.bank_list, "json");
	}

	
});

Template.ConsoleBanksView.helpers({

	"insertButtonClass": function() {
		return Bank.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.bank_list || this.bank_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.bank_list && this.bank_list.count() > 0;
	},
	"isNotFound": function() {
		return this.bank_list && pageSession.get("ConsoleBanksViewSearchString") && ConsoleBanksViewItems(this.bank_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ConsoleBanksViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ConsoleBanksViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ConsoleBanksViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ConsoleBanksViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ConsoleBanksViewStyle") == "gallery";
	}

	
});


Template.ConsoleBanksViewTable.rendered = function() {
	
};

Template.ConsoleBanksViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ConsoleBanksViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ConsoleBanksViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ConsoleBanksViewSortAscending") || false;
			pageSession.set("ConsoleBanksViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ConsoleBanksViewSortAscending", true);
		}
	}
});

Template.ConsoleBanksViewTable.helpers({
	"tableItems": function() {
		return ConsoleBanksViewItems(this.bank_list);
	}
});


Template.ConsoleBanksViewTableItems.rendered = function() {
	
};

Template.ConsoleBanksViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("console.banks.details", mergeObjects(Router.currentRouteParams(), {bankId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("bankUpdate", this._id, values, function(err, res) {
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
						Bank.remove({ _id: me._id });
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
		Router.go("console.banks.update", mergeObjects(Router.currentRouteParams(), {bankId: this._id}));
		return false;
	}
});

Template.ConsoleBanksViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Bank.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Bank.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
