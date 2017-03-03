var pageSession = new ReactiveDict();

Template.DashboardAddTestimony.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.DashboardAddTestimony.events({
	
});

Template.DashboardAddTestimony.helpers({
	
});

Template.DashboardAddTestimonyNewTestimony.rendered = function() {
	

	pageSession.set("dashboardAddTestimonyNewTestimonyInfoMessage", "");
	pageSession.set("dashboardAddTestimonyNewTestimonyErrorMessage", "");

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

Template.DashboardAddTestimonyNewTestimony.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("dashboardAddTestimonyNewTestimonyInfoMessage", "");
		pageSession.set("dashboardAddTestimonyNewTestimonyErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var dashboardAddTestimonyNewTestimonyMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(dashboardAddTestimonyNewTestimonyMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("dashboardAddTestimonyNewTestimonyInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("dashboardAddTestimonyNewTestimonyErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("testimonyInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.DashboardAddTestimonyNewTestimony.helpers({
	"infoMessage": function() {
		return pageSession.get("dashboardAddTestimonyNewTestimonyInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("dashboardAddTestimonyNewTestimonyErrorMessage");
	}
	
});
