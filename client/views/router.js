Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"login",
	"register",
	"register.ref",
	"verify_email",
	"forgot_password",
	"reset_password",
];

var privateRoutes = [
	"dashboard",
	"dashboard.add_testimony",
	"console",
	"console.users",
	"console.users.details",
	"console.users.insert",
	"console.users.edit",
	"console.banks",
	"console.banks.details",
	"console.banks.insert",
	"console.banks.update",
	"console.testimony",
	"console.testimony.details",
	"console.testimony.insert",
	"console.testimony.update",
	"member",
	"member.update_personal_details",
	"member.change_pass",
	"member.update_bank_details",
	"logout",
	"transactions",
	"transactions.view_transaction",
	"transactions.ph_transactions",
	"transactions.gh_transactions",
	"transactions.awaiting_gh_transaction",
	"transactions.awaiting_ph_transactions",
	"referrals"
];

var freeRoutes = [
	"home",
	"about"
];

var roleMap = [
	{ route: "console",	roles: ["admin"] },
	{ route: "console.users",	roles: ["admin"] },
	{ route: "console.users.details",	roles: ["admin"] },
	{ route: "console.users.insert",	roles: ["admin"] },
	{ route: "console.users.edit",	roles: ["admin"] },
	{ route: "console.banks",	roles: ["admin"] },
	{ route: "console.banks.details",	roles: ["admin"] },
	{ route: "console.banks.insert",	roles: ["admin"] },
	{ route: "console.banks.update",	roles: ["admin"] },
	{ route: "console.testimony",	roles: ["admin"] },
	{ route: "console.testimony.details",	roles: ["admin"] },
	{ route: "console.testimony.insert",	roles: ["admin"] },
	{ route: "console.testimony.update",	roles: ["admin"] },
	{ route: "member",	roles: ["user","admin"] },
	{ route: "member.update_personal_details",	roles: ["user","admin"] },
	{ route: "member.change_pass",	roles: ["user","admin"] },
	{ route: "member.update_bank_details",	roles: ["user","admin"] },
	{ route: "transactions",	roles: ["admin","user"] },
	{ route: "transactions.view_transaction",	roles: ["admin","user"] },
	{ route: "transactions.ph_transactions",	roles: ["admin","user"] },
	{ route: "transactions.gh_transactions",	roles: ["admin","user"] },
	{ route: "transactions.awaiting_gh_transaction",	roles: ["admin","user"] },
	{ route: "transactions.awaiting_ph_transactions",	roles: ["admin","user"] },
	{ route: "referrals",	roles: ["admin","user"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.currentRouteParams = function() {
	var route = Router ? Router.current() : null;
	if(!route) {
		return {};
	}

	var params = {};
	for(var key in route.params) {
		params[key] = JSON.parse(JSON.stringify(route.params[key]));
	}

	return params;
};


Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home", controller: "HomeController"});
	this.route("/login", {name: "login", controller: "LoginController"});
	this.route("/register", {name: "register", controller: "RegisterController"});
	this.route("/register/:ref", {name: "register.id", controller: "RegisterController"});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", controller: "ResetPasswordController"});
	this.route("/about", {name: "about", controller: "AboutController"});
	this.route("/dashboard", {name: "dashboard", controller: "DashboardController"});
	this.route("/dashboard/add_testimony", {name: "dashboard.add_testimony", controller: "DashboardAddTestimonyController"});
	this.route("/console", {name: "console", controller: "ConsoleController"});
	this.route("/console/users", {name: "console.users", controller: "ConsoleUsersController"});
	this.route("/console/users/details/:userId", {name: "console.users.details", controller: "ConsoleUsersDetailsController"});
	this.route("/console/users/insert", {name: "console.users.insert", controller: "ConsoleUsersInsertController"});
	this.route("/console/users/edit/:userId", {name: "console.users.edit", controller: "ConsoleUsersEditController"});
	this.route("/console/banks", {name: "console.banks", controller: "ConsoleBanksController"});
	this.route("/console/banks/details/:bankId", {name: "console.banks.details", controller: "ConsoleBanksDetailsController"});
	this.route("/console/banks/insert", {name: "console.banks.insert", controller: "ConsoleBanksInsertController"});
	this.route("/console/banks/update/:bankId", {name: "console.banks.update", controller: "ConsoleBanksUpdateController"});
	this.route("/console/testimony", {name: "console.testimony", controller: "ConsoleTestimonyController"});
	this.route("/console/testimony/details/:testimonyId", {name: "console.testimony.details", controller: "ConsoleTestimonyDetailsController"});
	this.route("/console/testimony/insert", {name: "console.testimony.insert", controller: "ConsoleTestimonyInsertController"});
	this.route("/console/testimony/update/:testimonyId", {name: "console.testimony.update", controller: "ConsoleTestimonyUpdateController"});
	this.route("/member", {name: "member", controller: "MemberController"});
	this.route("/member/update_personal_details", {name: "member.update_personal_details", controller: "MemberUpdatePersonalDetailsController"});
	this.route("/member/change_pass", {name: "member.change_pass", controller: "MemberChangePassController"});
	this.route("/member/update_bank_details", {name: "member.update_bank_details", controller: "MemberUpdateBankDetailsController"});
	this.route("/logout", {name: "logout", controller: "LogoutController"});
	this.route("/transactions", {name: "transactions", controller: "TransactionsController"});
	this.route("/transactions/view_transaction/:transactionId", {name: "transactions.view_transaction", controller: "TransactionsViewTransactionController"});
	this.route("/transactions/ph_transactions", {name: "transactions.ph_transactions", controller: "TransactionsPhTransactionsController"});
	this.route("/transactions/gh_transactions", {name: "transactions.gh_transactions", controller: "TransactionsGhTransactionsController"});
	this.route("/transactions/awaiting_gh_transaction", {name: "transactions.awaiting_gh_transaction", controller: "TransactionsAwaitingGhTransactionController"});
	this.route("/transactions/awaiting_ph_transactions", {name: "transactions.awaiting_ph_transactions", controller: "TransactionsAwaitingPhTransactionsController"});
	this.route("/referrals", {name: "referrals", controller: "ReferralsController"});
});
