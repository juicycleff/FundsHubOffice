this.ConsoleBanksInsertController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleBanksInsert': { to: 'ConsoleSubcontent'}
		
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
			Meteor.subscribe("banks_null")
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
			banks_null: Bank.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});