this.HomeController = RouteController.extend({
	template: "Home",
	layoutTemplate: "PublicLayout",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},
	
  	fastRender: true,

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
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