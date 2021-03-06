this.ConsoleTestimonyController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleTestimony': { to: 'ConsoleSubcontent'}
		
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
			Meteor.subscribe("testimony_list")
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
			testimony_list: Testimony.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});