Template.MainLayout.onRendered(function() {

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

   $('.show-search').click(function() {
    $('.search-out').fadeToggle( "50", "linear" );
  });

  // Materialize sideNav  

  //Main Left Sidebar Menu
  $('.sidebar-collapse').sideNav({
    edge: 'left', // Choose the horizontal origin      
  });
  
  //Main Left Sidebar Chat
  $('.chat-collapse').sideNav({
    menuWidth: 240,
    edge: 'right',
  });
  $('.chat-close-collapse').click(function() {
    $('.chat-collapse').sideNav('hide');
  });
  $('.chat-collapsible').collapsible({
    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  // Pikadate datepicker
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  // Perfect Scrollbar
  $('select').not('.disabled').material_select();
    var leftnav = $(".page-topbar").height();  
    var leftnavHeight = window.innerHeight - leftnav;
  $('.leftside-navigation').height(leftnavHeight).perfectScrollbar({
    suppressScrollX: true
  });
    var righttnav = $("#chat-out").height();
  $('.rightside-navigation').height(righttnav).perfectScrollbar({
    suppressScrollX: true
  });
});

Template.MainLayout.helpers({
    rendered: function() {
        
    }
});

Template.MainLayout.events({ 

    'click #event': function(event, template) { 
         
    } 
});

Template.MainLayout.onDestroyed(function() { 
     
});




