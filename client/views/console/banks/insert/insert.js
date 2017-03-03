var pageSession = new ReactiveDict();

Template.ConsoleBanksInsert.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleBanksInsert.events({
	
});

Template.ConsoleBanksInsert.helpers({
	
});

Template.ConsoleBanksInsertForm.rendered = function() {
	

	pageSession.set("consoleBanksInsertFormInfoMessage", "");
	pageSession.set("consoleBanksInsertFormErrorMessage", "");

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

Template.ConsoleBanksInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleBanksInsertFormInfoMessage", "");
		pageSession.set("consoleBanksInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleBanksInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(consoleBanksInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleBanksInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("console.banks", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleBanksInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("bankInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("console.banks", mergeObjects(Router.currentRouteParams(), {}));
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

Template.ConsoleBanksInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleBanksInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleBanksInsertFormErrorMessage");
	}
	
});
