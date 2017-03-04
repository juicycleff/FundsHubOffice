this.TransactionsPhTransactionsController = RouteController.extend({
	template: "TransactionsPhTransactions",
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
			Meteor.subscribe("my_ph_trans", userId)
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
			my_ph_trans: Donations.find({ph:userId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});