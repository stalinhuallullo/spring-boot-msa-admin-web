var tbl_news = null;
var validator = null;


function registrarEvento(){

    var el = $('.btn-guardar-evento');
	var id = $('#form-evento input[name=id]').val();
	var obj = $("#form-evento").serializeObject();
	var f = $('#form-evento input[name=rango_fechas]').val().split(' - ');
	obj.descripcion = $('div.note-editable').html();
	obj.usuario_id = USUARIO.id;
	obj.fecha_inicio = f[0];
	obj.fecha_final = f[1];
	obj.archivo = $('.img-evento').attr('file');
	obj.archivo_token = $('.img-evento').attr('token');
	
    loadOn(el);
    $.ajax({
        url: API.EVENTOS + 'evento',
        type: $.isNumeric(id) ? 'PUT' : 'POST',
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: function(obj) {
            loadOff(el);
            $('#form-evento input[name=id]').val(obj.id);
            $.toast({
                text: obj.mensaje,
                icon: obj.estado == 'OK' ? 'success' : 'error',
                position: 'bottom-right',
            });
            
            setTimeout(function(){
            	location.href= BASE_URL	+ 'eventos';
            }, 2500);
        }
    });

}






var fileobj;

function upload_file(e) {
    e.preventDefault();
    fileobj = e.dataTransfer.files[0];
    ajax_file_upload(fileobj);
}


function file_explorer() {

    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
    	
    	
        var form_data = new FormData();
        
        for(var i = 0; i < document.getElementById('selectfile').files.length; i++)
        	form_data.append('file', document.getElementById('selectfile').files[i]);

        form_data.append('directorio', DATA.MODULOS.DIR_UPLOAD_EVENTOS_GALERIA); //$('#f-noticia input[name=id]').val()

        console.log(form_data);

        $.ajax({
            type: 'POST',
            //url: BASE_URL + 'noticias/subir_imagen',
            url: API.ARCHIVOS + '/archivo',
            contentType: false,
            processData: false,
            data: form_data,
            enctype: 'multipart/form-data',
            success: function(rpta) {
            	for(var o in rpta){
            		var obj = rpta[o];
            	console.log('----', obj);
            	//$('.gallery-c').append(item_gallery_off(obj));
            	
            	$('.img-evento').attr({src:DATA.URL_SERVER + DATA.MODULOS.DIR_UPLOAD_EVENTOS_GALERIA + obj.archivo, token: obj.token, file: obj.archivo}).removeClass('border-red');
				$('.btn-evento-img-eliminar').removeClass('d-none');
				$('.btn-evento-img-subir').addClass('d-none');
				
            	}
            	
            }
        });
    	
    	

    	/*
        fileobj = document.getElementById('selectfile').files[0];
        ajax_file_upload(fileobj);
        $('#selectfile').val('');
		*/
    };
    
    return false;
}
/*
function ajax_file_upload(file_obj) {

    	//var not_id = $('#f-noticia input[name=id]').val();

        if (file_obj != undefined) {
            var form_data = new FormData();
            form_data.append('file', file_obj);

            //form_data.append('noticia_id', not_id); //$('#f-noticia input[name=id]').val()
            
            $.ajax({
                type: 'POST',
                url: BASE_URL + 'eventos/subir_imagen',
                contentType: false,
                processData: false,
                data: form_data,
                enctype: 'multipart/form-data',
                success: function(rpta) {
					if(rpta.estado == 'OK'){
						$('.img-evento').attr('src', ASSETS.data + 'eventos/galeria/'+rpta.archivo_url).removeClass('border-red');
						$('#arch_imagen-error').remove();
						$('.btn-evento-img-eliminar').removeClass('d-none');
						$('.btn-evento-img-subir').addClass('d-none');
						
					} else {
						$.alert({
					        title: 'Error!',
					        content: rpta.mensaje
					    });
					}
                }
            });
        }

}
*/



$(document).ready(function() {
	
    tbl_news = $('#lista-eventos').DataTable({
        'pageLength': 10,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'order': [
            [0, "desc"]
        ],
        'ajax': {
            'url': API.EVENTOS + 'evento/filter',
            'contentType': "application/json",
            "data": function(d) {
                return JSON.stringify(d);
            }
        },
        

        'columns': [{
                data: 'id'
            },
            {
                data: 'archivo',
                render: function(data, type, row) {

                    return '<img src="' + (data ? DATA.URL_SERVER + DATA.MODULOS.DIR_UPLOAD_EVENTOS_GALERIA + data : ASSETS.img + 'sinfoto.png') + '" class="img-thumbnail" style="width:60px" />'
                },
                "orderable": false
            },
            {
                data: 'titulo'
            },
            {
                data: 'categoria'
            },
            {
                data: 'fecha_inicio'
            },
            {
                data: 'fecha_final'
            },
            {
                data: null,
                render: function(data, type, row) {
                    //console.log(row);
                    return '<button type="button" class="btn-shadow btn-eliminar-evento btn btn-danger"><i class="fa fa-times-circle fa-w-20"></i></button> <a href="eventos/editar/'+row.id+'" class="btn-shadow btn btn-primary"><i class="fa fa-edit fa-w-20"></i></a>';
                },
                "orderable": false
            },
        ],

        language: {
            url: ASSETS.utils + 'Spanish.json'
        },

        "fnCreatedRow": function(nRow, aData, iDataIndex) {
            $(nRow).attr('id', aData.id);
        }

    });

    
    
    $('body').on('click', '.btn-evento-img-eliminar', function() {
    	
        var tk = $('.img-evento').attr('token');
        $.confirm({
            title: 'Confirmación',
            content: 'Confirma que desea eliminar la imagen seleccionada?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {
                    	let obj = {};
                    	obj.token = tk;
                    	obj.directorio = DATA.MODULOS.DIR_UPLOAD_EVENTOS_GALERIA;
                    	console.log(JSON.stringify(obj));
                        $.ajax({
                            url: API.ARCHIVOS + '/archivo',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(obj),
                            type: 'DELETE',
                            success: function(rpta) {
                            	console.log(rpta);
                                
                                $('.img-evento').attr('src', ASSETS.img + 'imagen-no-disponible.jpg').removeAttr('file').removeAttr('token');
                				$('.btn-evento-img-eliminar').addClass('d-none');
                				$('.btn-evento-img-subir').removeClass('d-none');
                            }
                        });
                    }
                },
                cancelar: function() {}
            }
        });
/*
        $.confirm({
            title: 'Confirmación',
            content: 'La eliminación de la imagen será permanente, esta seguro de esta acción?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {

                        $.ajax({
                            url: BASE_URL + 'eventos/eliminar_imagen',
                            type: 'DELETE',
                            data : {"archivo" : $('#arch_imagen').val()},
                            success: function(rpta) {
                                $.toast({
                                    text: rpta.mensaje,
                                    icon: rpta.estado == 'OK' ? 'success' : 'error',
                                    position: 'bottom-right',
                                });
                                $('.img-evento').attr('src', ASSETS.img + 'imagen-no-disponible.jpg' );
                				$('.btn-evento-eliminar').addClass('d-none');
                				$('.btn-evento-subir').removeClass('d-none');
                				$('#arch_imagen').val('');
                            }
                        });
                        
                    }
                },
                cancelar: function() {}
            }
        });
        */

    	
    });
    
    
	  if($('#summernote').length) $('#summernote').summernote({minHeight: 50, height: 420});

	  if($('input[name="rango_fechas"]').length){ $('input[name="rango_fechas"]').daterangepicker({
		    timePicker: true,

		    locale: {
		      format: 'Y/M/DD HH:mm',

		      "separator": " - ",
		      "applyLabel": "Aplicar",
		      "cancelLabel": "Cancelar",
		      "fromLabel": "DE",
		      "toLabel": "HASTA",
		      "customRangeLabel": "Custom",
		      "daysOfWeek": [
		          "Dom",
		          "Lun",
		          "Mar",
		          "Mie",
		          "Jue",
		          "Vie",
		          "Sáb"
		      ],
		      "monthNames": [
		          "Enero",
		          "Febrero",
		          "Marzo",
		          "Abril",
		          "Mayo",
		          "Junio",
		          "Julio",
		          "Agosto",
		          "Septiembre",
		          "Octubre",
		          "Noviembre",
		          "Diciembre"
		      ],
		      "firstDay": 1
		    }
		  }); //.val('');
	  if($('#form-evento input[name="id"]').val().length == 0) $('#form-evento input[name="rango_fechas"]').val('');
	  }
	  
    
    
    $('body').on('click', '.btn-guardar-evento', function() {
    	$('#form-evento').submit();
    });

    
    $('.check-duplicado').change(function() {
    	var el = $(this);
        if(!el.is(":checked")) {
        	$('#form-evento input[name="id"]').val(el.attr('evid'));

        	
        	
        } else {
        	$('#form-evento input[name="id"]').val('');
        	
        	console.log(!el.hasClass('generado') && $('#arch_imagen').val().length > 0);
        	if(!el.hasClass('generado') && $('#arch_imagen').val().length > 0){
        		
                $.ajax({
                    type: 'POST',
                    url: BASE_URL + 'eventos/duplicar_imagen',
                    data:{archivo: $('#arch_imagen').val()},
                    success: function(rpta) {

    					if(rpta.estado == 'OK'){
    						$('.img-evento').attr('src', ASSETS.data + 'eventos/galeria/'+rpta.archivo_url);
    						$('#arch_imagen').val(rpta.archivo_url);
    						el.addClass('generado');
    					} else {
    						$.alert({
    					        title: 'Error!',
    					        content: rpta.mensaje
    					    });
    					}
                    	
                    }
                });
                
        	}
        }    
    });

    $('body').on('click', '.btn-eliminar-evento', function(e) {

        var el = this;


        $.confirm({
            title: 'Confirmación',
            content: 'Confirma que desea eliminar el evento?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {

                        $.ajax({
                            url: API.EVENTOS + 'evento/' + $(el).parents('tr').attr('id'),
                            type: 'DELETE',
                            success: function(rpta) {
                                tbl_news.ajax.reload(null, false);
                                $.toast({
                                    text: rpta.mensaje,
                                    icon: 'success',
                                    position: 'bottom-right',
                                });
                            }
                        });
                    }
                },
                cancelar: function() {}
            }
        });

    });


    validator = $("#form-evento").validate({
    	ignore: ".note-editable.panel-body,.note-editable",
        rules: {
            titulo: {
                required: 1,
                minlength: 5
            },
            rango_fechas: 'required',
            categoria_id: 'required',
            arch_imagen: 'required',
        },
        messages: {
            titulo: {
                required: "Ingrese el título del evento",
                minlength: "El título debe ser superior a 5 caracteres"
            },
            rango_fechas: "Debe ingresar las fechas de inicio y fin del evento",
            categoria_id: "Seleccione un categoría",
            arch_imagen: "Seleccione una imagen",
        },
        errorElement: "em",
        errorPlacement: function(t, e) {
            t.addClass("invalid-feedback"),
                "checkbox" === e.prop("type") ? t.insertAfter(e.next("label")) : t.insertAfter(e);
            if(t[0].id == 'arch_imagen-error') $('.img-evento').addClass('border-red');
            
        },
        highlight: function(e, i, n) {
            $(e).addClass("is-invalid").removeClass("is-valid")
        },
        unhighlight: function(e, i, n) {
            //$(e).addClass("is-valid").removeClass("is-invalid")
            $(e).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            registrarEvento();
        }
    })


});