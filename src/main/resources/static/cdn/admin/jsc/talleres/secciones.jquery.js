let mask_hora = () => {
	$(".inp-hora").inputmask(
	        "datetime", {
	            inputFormat: "HH:MM",
	            placeholder: "HH:MM",
	            insertMode: true, 
	            showMaskOnHover: true,
	            hourFormat: 24
	          }
	          );
}



$(document).ready(function() {
	
	mask_hora();
	
	if($('#summernote').length) $('#summernote').summernote({minHeight: 50, height: 420});

	  
	
	
	$(document).on('click', '.add-horario', function(){
		
		//var ht = $('.list-hrs').html();
		var fl = $('.list-hrs').find('.fila').last();
		var fi = fl.clone();
		$('.list-hrs').find('.add-horario').remove();
		$('.list-hrs').append(fi);
		mask_hora();
	});
	
	
	$(document).on('click', '.delete-horario', function(){
		
		if($('.list-hrs').find('.fila').length > 1){
		$(this).parents('.fila').remove();
		
		var inpts = '<button class="btn btn-hover-shine btn-dark delete-horario  btn-add col" type="button" id="button-addon2"><i class="fa fa-trash fa-w-40"></i></button> <button class="btn btn-hover-shine btn-success  add-horario btn-border-l ml-1 col" type="button" id="button-addon2"><i class="fa fa-plus fa-w-40"></i></button>';
		var fl = $('.list-hrs').find('.fila').last();
		fl.find('.btn-opc').html(inpts);
		} else {
			$.alert('Debe tener al menos un horario para la sección de taller.');
		}
		
		mask_hora();
		
	});
	
});