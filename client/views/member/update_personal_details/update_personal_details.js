var pageSession = new ReactiveDict();

Template.MemberUpdatePersonalDetails.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	$('select').material_select();
};

Template.MemberUpdatePersonalDetails.events({
	
});

Template.MemberUpdatePersonalDetails.helpers({
	
});

Template.MemberUpdatePersonalDetailsEditForm.rendered = function() {
	

	pageSession.set("memberUpdatePersonalDetailsEditFormInfoMessage", "");
	pageSession.set("memberUpdatePersonalDetailsEditFormErrorMessage", "");

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

Template.MemberUpdatePersonalDetailsEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("memberUpdatePersonalDetailsEditFormInfoMessage", "");
		pageSession.set("memberUpdatePersonalDetailsEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var memberUpdatePersonalDetailsEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(memberUpdatePersonalDetailsEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("memberUpdatePersonalDetailsEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("user_settings.update_personal_details", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("memberUpdatePersonalDetailsEditFormErrorMessage", message);
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

		

		Router.go("dashboard", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("dashboard", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("dashboard", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.MemberUpdatePersonalDetailsEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("memberUpdatePersonalDetailsEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("memberUpdatePersonalDetailsEditFormErrorMessage");
	}
	
});
