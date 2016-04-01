// Project focuses on jQuery, HTML, & CSS to build an interactive To-Do List
// Copyright 2016, Nick Coleman

//Check off a specific To-Do by clicking on it
//Note: we create event listner on "ul" parent element and that reacts when 
//an "li" element is clicked.  Done because we are dynamically creating "li"'s
// after page is loaded.
$( "ul" ).on('click', 'li', function() {
	$(this).toggleClass('completed');
});  

// Click on X to delete To-Do.  Note here we also add the event listener to the
// parent 'ul' element  and react when child 'span' is clicked.  Done since we 
//need to be able to remove the dynamically created ToDo's
$('ul').on('click', 'span', function(event) {
	$(this).parent().fadeOut(300, function(){
		$(this).remove();	//li
	});
	event.stopPropagation();
});

//Create new To-Do via input box.  Note the parent 'ul' was created at page load
//so we can manuipulate it as normal.
$("input[type='text']").keypress(function(event){
	// note could have also used event.which === 13
	if (event.keyCode === 13) {
		var toDoText = $(this).val();
		$('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + toDoText + "</li>");
		$(this).val('');
	}
});

$('#newTD').on('click', function(){
	$("input[type='text']").fadeToggle();
});
