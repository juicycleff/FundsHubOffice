this.ConsoleTestimonyDetailsController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleTestimonyDetails': { to: 'ConsoleSubcontent'}
		
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
			Meteor.subscribe("testimony", this.params.testimonyId)
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
			testimony: Testimony.findOne({_id:this.params.testimonyId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});