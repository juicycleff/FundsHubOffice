this.ConsoleBanksUpdateController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleBanksUpdate': { to: 'ConsoleSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("Console"); this.render("loading", { to: "ConsoleSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("bank", this.params.bankId)
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
			bank: Bank.findOne({_id:this.params.bankId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});