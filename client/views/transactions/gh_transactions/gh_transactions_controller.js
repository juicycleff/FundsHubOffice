this.TransactionsGhTransactionsController = RouteController.extend({
	template: "TransactionsGhTransactions",
	layoutTemplate: "MainLayout",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		var userId = Meteor.userId;

		var subs = [
			Meteor.subscribe("my_gh_trans", userId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		var userId = Meteor.userId;

		var data = {
			params: this.params || {},
			my_gh_trans: Donations.find({gh:userId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});