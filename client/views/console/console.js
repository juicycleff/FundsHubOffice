Template.Console.rendered = function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Console.events({
	
});

Template.Console.helpers({
	
});

Template.ConsoleSideMenu.rendered = function() {
	$(".menu-item-collapse .dropdown-toggle").each(function() {
		if($(this).find("li.active")) {
			$(this).removeClass("collapsed");
		}
		$(this).parent().find(".collapse").each(function() {
			if($(this).find("li.active").length) {
				$(this).addClass("in");
			}
		});
	});
	
};

Template.ConsoleSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.ConsoleSideMenu.helpers({
	
});
