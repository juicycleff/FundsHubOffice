/*================================================================================
  Item Name: Materialize - Material Design Admin Template
  Version: 1.0
  Author: GeeksLabs
  Author URL: http://www.themeforest.net/user/geekslabs
================================================================================*/

$(function() {

  "use strict";

  var window_width = $(window).width();


  /*----------------------
  * Plugin initialization
  ------------------------*/

  // Materialize Slider
  $('.slider').slider({
    full_width: true
  });

  // Materialize Dropdown
  $('.dropdown-button').dropdown({
    inDuration: 300,
    outDuration: 125,
    constrain_width: true, // Does not change width of dropdown to that of the activator
    hover: false, // Activate on click
    alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
    gutter: 0, // Spacing from edge
    belowOrigin: true // Displays dropdown below the button
  });

  // Materialize Tabs
  $('.tab-demo').show().tabs();
  $('.tab-demo-active').show().tabs();

  // Materialize Parallax
  $('.parallax').parallax();
  $('.modal-trigger').leanModal();

  // Materialize scrollSpy
  $('.scrollspy').scrollSpy();

  // Materialize tooltip
  $('.tooltipped').tooltip({
    delay: 50
  });

  

  // Fullscreen
  function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
      (!document.mozFullScreen && !document.webkitIsFullScreen)) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      }
      else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      }
      else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    }
    else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      }
      else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      }
      else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  $('.toggle-fullscreen').click(function() {
    toggleFullScreen();
  });


  // Floating-Fixed table of contents (Materialize pushpin)
  if ($('nav').length) {
    $('.toc-wrapper').pushpin({
      top: $('nav').height()
    });
  }
  else if ($('#index-banner').length) {
    $('.toc-wrapper').pushpin({
      top: $('#index-banner').height()
    });
  }
  else {
    $('.toc-wrapper').pushpin({
      top: 0
    });
  }

  // Toggle Flow Text
  var toggleFlowTextButton = $('#flow-toggle')
  toggleFlowTextButton.click(function() {
    $('#flow-text-demo').children('p').each(function() {
      $(this).toggleClass('flow-text');
    })
  });
  
  
  //Toggle Containers on page
  /*var toggleContainersButton = $('#container-toggle-button');
  toggleContainersButton.click(function() {
    $('body .browser-window .container, .had-container').each(function() {
      $(this).toggleClass('had-container');
      $(this).toggleClass('container');
      if ($(this).hasClass('container')) {
        toggleContainersButton.text("Turn off Containers");
      }
      else {
        toggleContainersButton.text("Turn on Containers");
      }
    });
  });*/

  // Detect touch screen and enable scrollbar if necessary
  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    }
    catch (e) {
      return false;
    }
  }
  if (is_touch_device()) {
    $('#nav-mobile').css({
      overflow: 'auto'
    })
  }


}); // end of document ready