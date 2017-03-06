Template.FooterMain.onRendered(function() {
    $(document).ready(function() {
        var script = document.createElement("script");
        script.type="text/javascript";
        script.src = "REMOTE_SCRIPT_URL";
        $("#script_div").append(script);
      });

});

