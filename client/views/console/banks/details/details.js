var pageSession = new ReactiveDict();

Template.ConsoleBanksDetails.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleBanksDetails.events({
	
});

Template.ConsoleBanksDetails.helpers({
	
});

Template.ConsoleBanksDetailsForm.rendered = function() {
	

	pageSession.set("consoleBanksDetailsFormInfoMessage", "");
	pageSession.set("consoleBanksDetailsFormErrorMessage", "");

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

Template.ConsoleBanksDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleBanksDetailsFormInfoMessage", "");
		pageSession.set("consoleBanksDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleBanksDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(consoleBanksDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleBanksDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleBanksDetailsFormErrorMessage", message);
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

		Router.go("console.banks", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("console.banks", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.ConsoleBanksDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleBanksDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleBanksDetailsFormErrorMessage");
	}
	
});
