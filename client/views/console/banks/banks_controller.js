this.ConsoleBanksController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleBanks': { to: 'ConsoleSubcontent'}
		
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
			Meteor.subscribe("bank_list")
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
			bank_list: Bank.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});