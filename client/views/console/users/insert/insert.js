var pageSession = new ReactiveDict();

Template.ConsoleUsersInsert.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleUsersInsert.events({
	
});

Template.ConsoleUsersInsert.helpers({
	
});

Template.ConsoleUsersInsertInsertForm.rendered = function() {
	

	pageSession.set("consoleUsersInsertInsertFormInfoMessage", "");
	pageSession.set("consoleUsersInsertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.ConsoleUsersInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleUsersInsertInsertFormInfoMessage", "");
		pageSession.set("consoleUsersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleUsersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(consoleUsersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleUsersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleUsersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.ConsoleUsersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleUsersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleUsersInsertInsertFormErrorMessage");
	}
	
});
