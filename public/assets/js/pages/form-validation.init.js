/*
Template Name: Veltrix - Admin & Dashboard Template
Author: Themesbrand
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Form validation Js File
*/



// parsley validation
$(document).ready(function() {
	window.ParsleyValidator
        .addValidator('fileextension', function (value, requirement) {
            var fileExtension = value.split('.').pop();
			var myArray = requirement.split(",");
			if($.inArray(fileExtension, myArray) != -1) {
				return true;
			} else {
				return false;
			} 
            //return fileExtension === requirement;
        }, 32)
        .addMessage('en', 'fileextension', 'The extension doesn\'t match the required')


	$('.custom-validation').parsley();
});



// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
  
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  }
  
		  form.classList.add('was-validated')
		}, false)
	  })
  })()