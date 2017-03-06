Template.BlankLayout.onRendered(function() {
    $('body').addClass('loaded'); 
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
});

Template.BlankLayout.onCreated(function() { 
     
});

Template.BlankLayout.onDestroyed(function() { 
     
});

Template.BlankLayout.events({ 
    'click #event': function(event, template) { 
         
    } 
});

Template.BlankLayout.helpers({
    rendered: function() {
        
    }
});
