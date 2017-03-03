var pageSession = new ReactiveDict();

Template.ConsoleTestimonyDetails.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleTestimonyDetails.events({
	
});

Template.ConsoleTestimonyDetails.helpers({
	
});

Template.ConsoleTestimonyDetailsForm.rendered = function() {
	

	pageSession.set("consoleTestimonyDetailsFormInfoMessage", "");
	pageSession.set("consoleTestimonyDetailsFormErrorMessage", "");

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

Template.ConsoleTestimonyDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleTestimonyDetailsFormInfoMessage", "");
		pageSession.set("consoleTestimonyDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleTestimonyDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(consoleTestimonyDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleTestimonyDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleTestimonyDetailsFormErrorMessage", message);
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

		Router.go("console.testimony", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("console.testimony", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ConsoleTestimonyDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleTestimonyDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleTestimonyDetailsFormErrorMessage");
	}
	
});
