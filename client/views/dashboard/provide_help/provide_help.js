var pageSession = new ReactiveDict();

function allFilled() {
    var filled = true;
    $('body input').each(function () {
        if ($(this).val() == '') filled = false;
    });
    return filled;
}

Template.DashboardProvideHelp.rendered = function () {

    Meteor.defer(function () {
        globalOnRendered();
        $("input[autofocus]").focus();
    });

    $(document).ready(function () {
        $('select').material_select();
    });
    //$("#submitIt").prop('disabled', true);

    /*$('#selectId, #agreeSelect').bind('keyup', function () {
        if (allFilled()) $('#submitIt').removeAttr('disabled');
    });*/
};

Template.DashboardProvideHelp.events({
    "submit #provide_form": function (e, t) {
        e.preventDefault();
        pageSession.set("errorMessage", "");

        var submit_button = $(t.find("#submit"));

        var package = t.find('#selectId').value;
        var checked = t.find('#agreeSelect').value;



        // check password
        if (package == "") {
            //pageSession.set("errorMessage", "Please select a package.");
            //t.find('#selectId').focus();
            Materialize.toast('Please select a package.', 4000);
            return false;
        }

        var dataObject = {
            pk: package,
        }

        var data = {
            name : Meteor.user().profile.email,
            status: false,
            pk: package
        }
        
        Materialize.toast('I am a toast!', 4000); // 4000 is the duration of the toast

        /*Meteor.call('phRequestInsert', data, function (error, success) {
            if (error) {
                console.log('error', error);
                Materialize.toast('PThere was an error with your request.', 4000);   
            }
            if (success) {
                Materialize.toast('Request Made, please wait to be matched.', 4000);
            }
        });*/

        return false;
    },
});

Template.DashboardProvideHelp.helpers({

});