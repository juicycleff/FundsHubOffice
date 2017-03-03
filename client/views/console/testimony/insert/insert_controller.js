this.ConsoleTestimonyInsertController = RouteController.extend({
	template: "Console",
	

	yieldTemplates: {
		'ConsoleTestimonyInsert': { to: 'ConsoleSubcontent'}
		
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
			Meteor.subscribe("testimonies_null")
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
			testimonies_null: Testimony.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});