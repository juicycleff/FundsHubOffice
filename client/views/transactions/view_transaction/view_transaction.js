var pageSession = new ReactiveDict();

Template.TransactionsViewTransaction.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.TransactionsViewTransaction.events({
	
});

Template.TransactionsViewTransaction.helpers({
	
});

Template.TransactionsViewTransactionViewDonForm.rendered = function() {
	

	pageSession.set("transactionsViewTransactionViewDonFormInfoMessage", "");
	pageSession.set("transactionsViewTransactionViewDonFormErrorMessage", "");

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

Template.TransactionsViewTransactionViewDonForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("transactionsViewTransactionViewDonFormInfoMessage", "");
		pageSession.set("transactionsViewTransactionViewDonFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var transactionsViewTransactionViewDonFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(transactionsViewTransactionViewDonFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("transactionsViewTransactionViewDonFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("transactionsViewTransactionViewDonFormErrorMessage", message);
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

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.TransactionsViewTransactionViewDonForm.helpers({
	"infoMessage": function() {
		return pageSession.get("transactionsViewTransactionViewDonFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("transactionsViewTransactionViewDonFormErrorMessage");
	}
	
});
