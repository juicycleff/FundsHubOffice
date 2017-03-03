this.ConsoleUsersEditController = RouteController.extend({
	template: "ConsoleUsersEdit",
	

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
			Meteor.subscribe("admin_user", this.params.userId)
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
			admin_user: Users.findOne({_id:this.params.userId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});