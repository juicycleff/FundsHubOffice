Template.Home.rendered = function () {

	Meteor.defer(function () {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
	$('body').addClass('white');

	//Main Left Sidebar Menu
	$('.sidebar-collapse').sideNav({
		edge: 'left', // Choose the horizontal origin      
	});

	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('.carousel').carousel();
};

Template.Home.events({

});

Template.Home.helpers({

});

Template.SmallLogin.rendered = function () {

};

Template.SmallLogin.events({
	"submit #login_form": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var submit_button = $(t.find("#submit"));

		var login_email = t.find('#login_email').value.trim();
		var login_password = t.find('#login_password').value;

		// check email
		if (!isValidEmail(login_email)) {
			pageSession.set("errorMessage", "Please enter your e-mail address.");
			t.find('#login_email').focus();
			return false;
		}

		// check password
		if (login_password == "") {
			pageSession.set("errorMessage", "Please enter your password.");
			t.find('#login_email').focus();
			return false;
		}

		//submit_button.button("loading");
		Meteor.loginWithPassword(login_email, login_password, function (err) {
			//submit_button.button("reset");

			if (err) {
				pageSession.set("errorMessage", err.message);
				return false;
			}
		});
		return false;
	},

	"click #login-with-google": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithGoogle({
				requestPermissions: ["email"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-github": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithGithub({
				requestPermissions: ["public_repo", "user:email"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-linkedin": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithLinkedin({
				requestPermissions: ["r_emailaddress"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-facebook": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithFacebook({
				requestPermissions: ["email"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-twitter": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithTwitter({
				requestPermissions: ["email"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	},

	"click #login-with-meteor": function (e, t) {
		e.preventDefault();
		pageSession.set("errorMessage", "");

		var button = $(e.currentTarget);
		button.button("loading");

		Meteor.loginWithMeteorDeveloperAccount({
				requestPermissions: ["email"]
			},
			function (err) {
				button.button("reset");
				if (err) {
					pageSession.set("errorMessage", err.message);
					return false;
				}
			}
		);

		return false;
	}
});

Template.SmallLogin.helpers({

});

Template.AllTestament.created = function () {

};

Template.AllTestament.destroyed = function () {

};

Template.AllTestament.rendered = function () {
	Meteor.subscribe("testimony_list");

	
};

Template.AllTestament.helpers({
	testaments: function () {
		return Testimony.find({}, {limit: 10});
	}
});

Template.AllTestament.events({
	
});

Template.AboutUs.created = function () {

};

Template.AboutUs.destroyed = function () {

};

Template.AboutUs.rendered = function () {

};

Template.AboutUs.helpers({

});

Template.AboutUs.events({

});