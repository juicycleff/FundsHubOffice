this.TransactionsViewTransactionController = RouteController.extend({
	template: "TransactionsViewTransaction",
	

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
		

		var subs = [
			Meteor.subscribe("transaction", this.params.transactionId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			transaction: Donations.findOne({_id:this.params.transactionId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});