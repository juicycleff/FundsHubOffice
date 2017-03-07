Template.Dashboard.rendered = function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
	var inputData = "https://www.fundshub.com/register/"+Meteor.user().profile.email;
    Session.set('refValue', inputData);

	// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $(document).ready(function(){
		// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
		$('.modal').modal();
	});

	$('select').material_select();

	$('#package, #agreeSelect').bind('keyup', function() {
    if(allFilled()) $('#provideHelp').removeAttr('disabled');

	
    $('input[name="refId"]').val(Session.get('refValue'));
});
};

function allFilled() {
    var filled = true;
    $('body input').each(function() {
        if($(this).val() == '') filled = false;
    });
    return filled;
}

Template.Dashboard.events({
	'click #copyButton': function(e, t){
		var $temp = $("<input>");
		$("refId").append($temp);
		$temp.val($(element).text()).select();
		document.execCommand("copy");
		$temp.remove();
	},
	'click #closeModal': function(e, t){
		$('#modal1').modal('close');
	},
	'click #openModal': function(e, t){
		$('#modal1').modal('open');
		console.log("pressed it");
	},
	'click #provideHelp': function(e, t){
		$('#modal1').modal('close');
	}
});

Template.Dashboard.helpers({
	
});
