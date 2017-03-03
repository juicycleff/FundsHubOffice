var pageSession = new ReactiveDict();

Template.ConsoleUsers.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleUsers.events({
	
});

Template.ConsoleUsers.helpers({
	
});

var ConsoleUsersViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("ConsoleUsersViewSearchString");
	var sortBy = pageSession.get("ConsoleUsersViewSortBy");
	var sortAscending = pageSession.get("ConsoleUsersViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["profile.name", "profile.email", "roles"];
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

var ConsoleUsersViewExport = function(cursor, fileType) {
	var data = ConsoleUsersViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.ConsoleUsersView.rendered = function() {
	pageSession.set("ConsoleUsersViewStyle", "table");
	
};

Template.ConsoleUsersView.events({
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
				pageSession.set("ConsoleUsersViewSearchString", searchString);
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
					pageSession.set("ConsoleUsersViewSearchString", searchString);
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
					pageSession.set("ConsoleUsersViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("admin.users.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		ConsoleUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		ConsoleUsersViewExport(this.admin_users, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		ConsoleUsersViewExport(this.admin_users, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		ConsoleUsersViewExport(this.admin_users, "json");
	}

	
});

Template.ConsoleUsersView.helpers({

	

	"isEmpty": function() {
		return !this.admin_users || this.admin_users.count() == 0;
	},
	"isNotEmpty": function() {
		return this.admin_users && this.admin_users.count() > 0;
	},
	"isNotFound": function() {
		return this.admin_users && pageSession.get("ConsoleUsersViewSearchString") && ConsoleUsersViewItems(this.admin_users).length == 0;
	},
	"searchString": function() {
		return pageSession.get("ConsoleUsersViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("ConsoleUsersViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("ConsoleUsersViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("ConsoleUsersViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("ConsoleUsersViewStyle") == "gallery";
	}

	
});


Template.ConsoleUsersViewTable.rendered = function() {
	
};

Template.ConsoleUsersViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("ConsoleUsersViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("ConsoleUsersViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("ConsoleUsersViewSortAscending") || false;
			pageSession.set("ConsoleUsersViewSortAscending", !sortAscending);
		} else {
			pageSession.set("ConsoleUsersViewSortAscending", true);
		}
	}
});

Template.ConsoleUsersViewTable.helpers({
	"tableItems": function() {
		return ConsoleUsersViewItems(this.admin_users);
	}
});


Template.ConsoleUsersViewTableItems.rendered = function() {
	
};

Template.ConsoleUsersViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("admin.users.details", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("", this._id, values, function(err, res) {
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
						Users.remove({ _id: me._id });
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
		Router.go("admin.users.edit", mergeObjects(Router.currentRouteParams(), {userId: this._id}));
		return false;
	}
});

Template.ConsoleUsersViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Users.isAdmin(Meteor.userId()) ? "" : "hidden";
	}
});
