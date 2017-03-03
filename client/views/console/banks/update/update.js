var pageSession = new ReactiveDict();

Template.ConsoleBanksUpdate.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.ConsoleBanksUpdate.events({
	
});

Template.ConsoleBanksUpdate.helpers({
	
});

Template.ConsoleBanksUpdateForm.rendered = function() {
	

	pageSession.set("consoleBanksUpdateFormInfoMessage", "");
	pageSession.set("consoleBanksUpdateFormErrorMessage", "");

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

Template.ConsoleBanksUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("consoleBanksUpdateFormInfoMessage", "");
		pageSession.set("consoleBanksUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var consoleBanksUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(consoleBanksUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("consoleBanksUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("console.banks", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("consoleBanksUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("bankUpdate", t.data.bank._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.ConsoleBanksUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("consoleBanksUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("consoleBanksUpdateFormErrorMessage");
	}
	
});
