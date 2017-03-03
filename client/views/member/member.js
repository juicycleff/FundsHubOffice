Template.Member.rendered = function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
};

Template.Member.events({
	
});

Template.Member.helpers({
	
});

Template.MemberSideMenu.rendered = function() {
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

Template.MemberSideMenu.events({
	"click .toggle-text": function(e, t) {
		e.preventDefault();
		$(e.target).closest("ul").toggleClass("menu-hide-text");
	}
	
});

Template.MemberSideMenu.helpers({
	
});
