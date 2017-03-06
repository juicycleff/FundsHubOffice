var pageSession = new ReactiveDict();

Template.MemberUpdateBankDetails.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	$('select').material_select();
};

Template.MemberUpdateBankDetails.events({
	
});

Template.MemberUpdateBankDetails.helpers({
	
});

Template.MemberUpdateBankDetailsBankDetailsForm.rendered = function() {
	

	pageSession.set("memberUpdateBankDetailsBankDetailsFormInfoMessage", "");
	pageSession.set("memberUpdateBankDetailsBankDetailsFormErrorMessage", "");

	Meteor.subscribe('bank_list');
};

Template.MemberUpdateBankDetailsBankDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("memberUpdateBankDetailsBankDetailsFormInfoMessage", "");
		pageSession.set("memberUpdateBankDetailsBankDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var memberUpdateBankDetailsBankDetailsFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(memberUpdateBankDetailsBankDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("memberUpdateBankDetailsBankDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("memberUpdateBankDetailsBankDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				Meteor.call("updateUserAccount", t.data.current_user_data._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.MemberUpdateBankDetailsBankDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("memberUpdateBankDetailsBankDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("memberUpdateBankDetailsBankDetailsFormErrorMessage");
	},
	bankList: function () {
		return Bank.find({}, {}).fetch();
	}
	
});
