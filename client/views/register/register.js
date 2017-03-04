var pageSession = new ReactiveDict();

Template.Register.rendered = function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false)

	$('body').addClass('cyan');
	$('select').material_select();

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});

	Meteor.subscribe('bank_list');


};

Template.Register.created = function() {
	pageSession.set("errorMessage", "");
};

Template.Register.events({
	'submit #register_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var register_fname = t.find('#register_fname').value.trim();
		var register_lname = t.find('#register_lname').value.trim();
		var register_email = t.find('#register_email').value.trim();
		var register_bank = t.find('#register_bank').value.trim();
		var register_accountName = t.find('#register_accountName').value.trim();
		var register_accountNumber = t.find('#register_accountNumber').value.trim();
		var register_phone = t.find('#register_accountName').value.trim();
		var register_address = t.find('#register_accountNumber').value.trim();
		var register_password = t.find('#register_password').value;
		var register_c_password = t.find('#register_c_password').value;


		var register_name = register_fname + " " + register_lname;
		// check name
		if(register_fname == "")
		{
			pageSession.set("errorMessage", "Please enter your first name.");
			t.find('#register_name').focus();
			return false;
		}

		if(register_lname == "")
		{
			pageSession.set("errorMessage", "Please enter your last name.");
			t.find('#register_name').focus();
			return false;
		}

		if(register_phone == "")
		{
			pageSession.set("errorMessage", "Please enter your phone number.");
			t.find('#register_name').focus();
			return false;
		}

		if(register_address == "")
		{
			pageSession.set("errorMessage", "Please enter your address.");
			t.find('#register_name').focus();
			return false;
		}



		if(register_accountNumber == "")
		{
			pageSession.set("errorMessage", "Please enter your account number.");
			t.find('#register_accountName').focus();
			return false;
		}

		if(register_bank == "")
		{
			pageSession.set("errorMessage", "Please select a your bank.");
			t.find('#register_bank').focus();
			return false;
		}

		if(register_accountName == "")
		{
			pageSession.set("errorMessage", "Please enter your account name.");
			t.find('#register_accountName').focus();
			return false;
		}

		// check email
		if(!isValidEmail(register_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#register_email').focus();
			return false;
		}

		// check password
		var min_password_len = 8;
		if(!isValidPassword(register_password, min_password_len))
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#register_password').focus();
			return false;
		}

		//submit_button.button("loading");
		Accounts.createUser({email: register_email, password : register_password, profile: { 
			name: register_name,
			fname: register_fname,
			lname: register_lname,
			phone: register_phone,
			address: register_address,
			bank: register_bank,
			accountName: register_accountName,
			accountNumber: register_accountNumber
		 }}, function(err) {
			//submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			}
			else
			{
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}
	
});

Template.Register.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	},
	bankList: function(){
		return Bank.find({}, {}).fetch();
	}
	
});
