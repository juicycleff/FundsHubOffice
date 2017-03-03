var pageSession = new ReactiveDict();

Template.ConsoleTestimony.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleTestimony.events({
	
});

Template.ConsoleTestimony.helpers({
	
});

var ConsoleTestimonyViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ConsoleTestimonyViewSearchString");
	var sortBy = pageSession.get("ConsoleTestimonyViewSortBy");
	var sortAscending = pageSession.get("ConsoleTestimonyViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["owner", "text"];
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

var ConsoleTestimonyViewExport = function(cursor, fileType) {
	var data = ConsoleTestimonyViewItems(cursor);
	var exportFields = ["owner"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ConsoleTestimonyView.rendered = function() {
	pageSession.set("ConsoleTestimonyViewStyle", "table");
	
};

Template.ConsoleTestimonyView.events({
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
				pageSession.set("ConsoleTestimonyViewSearchString", searchString);
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
					pageSession.set("ConsoleTestimonyViewSearchString", searchString);
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
					pageSession.set("ConsoleTestimonyViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("console.testimony.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ConsoleTestimonyViewExport(this.testimony_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ConsoleTestimonyViewExport(this.testimony_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ConsoleTestimonyViewExport(this.testimony_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ConsoleTestimonyViewExport(this.testimony_list, "json");
	}

	
});

Template.ConsoleTestimonyView.helpers({

	"insertButtonClass": function() {
		return Testimony.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.testimony_list || this.testimony_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.testimony_list && this.testimony_list.count() > 0;
	},
	"isNotFound": function() {
		return this.testimony_list && pageSession.get("ConsoleTestimonyViewSearchString") && ConsoleTestimonyViewItems(this.testimony_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ConsoleTestimonyViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ConsoleTestimonyViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ConsoleTestimonyViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ConsoleTestimonyViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ConsoleTestimonyViewStyle") == "gallery";
	}

	
});


Template.ConsoleTestimonyViewTable.rendered = function() {
	
};

Template.ConsoleTestimonyViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ConsoleTestimonyViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ConsoleTestimonyViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ConsoleTestimonyViewSortAscending") || false;
			pageSession.set("ConsoleTestimonyViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ConsoleTestimonyViewSortAscending", true);
		}
	}
});

Template.ConsoleTestimonyViewTable.helpers({
	"tableItems": function() {
		return ConsoleTestimonyViewItems(this.testimony_list);
	}
});


Template.ConsoleTestimonyViewTableItems.rendered = function() {
	
};

Template.ConsoleTestimonyViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("console.testimony.details", mergeObjects(Router.currentRouteParams(), {testimonyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("testimonyUpdate", this._id, values, function(err, res) {
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
						Testimony.remove({ _id: me._id });
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
		Router.go("console.testimony.update", mergeObjects(Router.currentRouteParams(), {testimonyId: this._id}));
		return false;
	}
});

Template.ConsoleTestimonyViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Testimony.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Testimony.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
