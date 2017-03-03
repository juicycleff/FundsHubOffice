var pageSession = new ReactiveDict();

Template.ConsoleUsersDetails.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleUsersDetails.events({
	
});

Template.ConsoleUsersDetails.helpers({
	
});

Template.ConsoleUsersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("consoleUsersDetailsDetailsFormInfoMessage", "");
	pageSession.set("consoleUsersDetailsDetailsFormErrorMessage", "");

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

Template.ConsoleUsersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleUsersDetailsDetailsFormInfoMessage", "");
		pageSession.set("consoleUsersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleUsersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(consoleUsersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleUsersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleUsersDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ConsoleUsersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleUsersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleUsersDetailsDetailsFormErrorMessage");
	}
	
});
