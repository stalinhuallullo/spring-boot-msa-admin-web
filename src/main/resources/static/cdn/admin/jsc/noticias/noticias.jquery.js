var tbl_news = null;
var validator = null;


function registrarNoticia() {
    var elid = $("#form-noticia input[name=id]");

    var obj = $("#form-noticia").serializeObject();
    obj.contenido = $('div.note-editable').html();
    obj.slug = convertirSlug(obj.titulo);
    obj.portada_token = $('.isportada.d-block').parents('figure').attr('item-token');
    obj.imagenes = [];
    $('.gallery-c figure').each(function() {
    	obj.imagenes.push({"archivo_url": $(this).attr('item-file'), "token": $(this).attr('item-token')})
    });
    obj.usuario_id = USUARIO.id;
    
    console.log(API.NOTICIAS, elid.val(), obj);
    
    var el = $('.btn-guardar-noticia');
    
    loadOn(el);
    $.ajax({
        url: API.NOTICIAS + 'noticia',
        type: $.isNumeric(elid.val()) ? 'put' : 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function(obj) {
        	loadOff(el);
            console.log('obj',obj);

            $.toast({
                text: obj.mensaje,
                icon: 'success',
                position: 'bottom-right',
            }); 
            
            elid.val(obj.id);

        },
        data: JSON.stringify(obj)
    }); 

}


function item_gallery(obj) {

    return '<figure class="gallery-news ui-state-default" item-id="' + obj.id + '">' +
        '	<img src="' + obj.archivo_url + '" /><a class="mb-2 mr-2 btn btn-success isportada ' + (obj.isportada ? 'd-block' : 'd-none') + '"><i class="fa fa-check"></i> <span class="badge badge-success badge-dot badge-dot-lg"> </span></a>' +
        '	<figcaption>' +
        '		<button type="button" class="btn btn-primary btn-portada float-left">' + (obj.isportada ? '<i class="fa fa-check"></i>' : '<i class="fa fa-plus-circle"></i> Portada') + '</button>' +
        '		<p class="icon-links"><a href="" class="lnk-image-delete"><span class="fa fa-times-circle"></span></a></p>' +
        '	</figcaption>' +
        '</figure>';
}


function item_gallery_off(obj) {

    return '<figure class="gallery-news ui-state-default" item-token="' + obj.token + '" item-file="'+obj.archivo+'">' +
        '	<img src="' + DATA.URL_SERVER + DATA.MODULOS.DIR_UPLOAD_NOTICIAS_GALERIA + obj.archivo + '" /><a class="mb-2 mr-2 btn btn-success isportada d-none"><i class="fa fa-check"></i> <span class="badge badge-success badge-dot badge-dot-lg"> </span></a>' +
        '	<figcaption>' +
        '		<button type="button" class="btn btn-primary btn-portada float-left"><i class="fa fa-plus-circle"></i> Portada</button>' +
        '		<p class="icon-links"><a href="" class="lnk-image-delete"><span class="fa fa-times-circle"></span></a></p>' +
        '	</figcaption>' +
        '</figure>';
}



var fileobj;

function upload_file(e) {
    e.preventDefault();
    
    fileobj = e.dataTransfer.files[0];
    //ajax_file_upload(fileobj);
    
    
    console.log(fileobj, document.getElementById('selectfile').files);
    
    var form_data = new FormData();
    
    for(var i = 0; i < document.getElementById('selectfile').files.length; i++)
    	form_data.append('file', document.getElementById('selectfile').files[i]);

    form_data.append('directorio', DATA.MODULOS.DIR_UPLOAD_NOTICIAS_GALERIA); //$('#f-noticia input[name=id]').val()

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
        	$('.gallery-c').append(item_gallery_off(obj));
        	}
        	
        }
    });
    
    
    
}

function dragEnter(e) {
    e.preventDefault();
    $('#drop_file_zone').addClass('border-a');
}

function dragLeave(e) {
    e.preventDefault();
    $('#drop_file_zone').removeClass('border-a');
}

function file_explorer() {

    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {


        var form_data = new FormData();
        
        for(var i = 0; i < document.getElementById('selectfile').files.length; i++)
        	form_data.append('file', document.getElementById('selectfile').files[i]);

        form_data.append('directorio', DATA.MODULOS.DIR_UPLOAD_NOTICIAS_GALERIA); //$('#f-noticia input[name=id]').val()

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
            	$('.gallery-c').append(item_gallery_off(obj));
            	}
            	
            }
        });
    	
    	
    	
    	/*
        fileobj = document.getElementById('selectfile').files[0];
        ajax_file_upload(fileobj);
        $('#selectfile').val('');
        */
        

    };
}


/*
function ajax_file_upload(file_obj) {

    var not_id = $('#form-noticia input[name=id]').val();

    if (not_id != null && parseInt(not_id) > 0) {

        $('#drop_file_zone').removeClass('border-a');
        if (file_obj != undefined) {
            var form_data = new FormData();
            form_data.append('file', file_obj);

            form_data.append('noticia_id', not_id); //$('#f-noticia input[name=id]').val()

            for (var key of form_data.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
            $.ajax({
                type: 'POST',
                url: BASE_URL + 'noticias/subir_imagen',
                contentType: false,
                processData: false,
                data: form_data,
                enctype: 'multipart/form-data',
                success: function(rpta) {


                    $('.gallery-c').append(item_gallery(rpta));
                    $('#selectfile').val('');

                    $('.msj-drag').hide();
                    $(".gallery-c").sortable({
                        placeholder: "ui-state-highlight"
                    });
                }
            });
        }



    } else $.alert({
        title: 'Atención!',
        content: 'Debe registrar una noticia para subir la imagen.'
    });
}
*/


$(document).ready(function() {
	
    $( "#form-noticia #titulo" ).keyup(function( e ) {
    	
    	$( "#form-noticia #slug").val(convertirSlug($(this).val()));

    }).keydown(function( v ) {if ( v.which == 13 ) v.preventDefault();});
    
    $('.btn-guardar-noticia').on('click', function() {
        var el = this;
        $("#form-noticia").submit();
    });
	
    $('.btn-post-noticia').on('click', function() {
        var el = this;
        $("#form-noticia").submit();
    });

    tbl_news = $('#lista-noticias').DataTable({
        'pageLength': 10,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'order': [
            [0, "desc"]
        ],
        'ajax': {
            'url': API.NOTICIAS + 'noticia/all',
            'contentType': "application/json",
            "data": function(d) {
                return JSON.stringify(d);
            }
        },
        'columns': [{
                data: 'id'
            },
            {
                data: 'imagen',
                render: function(data, type, row) {

                    return '<img src="' + (data ? DATA.URL_SERVER + DATA.MODULOS.DIR_UPLOAD_NOTICIAS_GALERIA +data : ASSETS.img + 'sinfoto.png') + '" class="img-thumbnail" style="width:60px" />'
                },
                "orderable": false
            },
            {
                data: 'titulo'
            },
            {
                data: 'subtitulo'
            },
            {
                data: 'categoria'
            },
            {
                data: 'fecha'
            },
            {
                data: null,
                render: function(data, type, row) {
                    //console.log(row);
                    return '<button type="button" class="btn-shadow btn-eliminar-noticia btn btn-danger"><i class="fa fa-times-circle fa-w-20"></i></button> <a href="noticias/editar/'+row.id+'" class="btn-editar btn-shadow btn btn-primary"><i class="fa fa-edit fa-w-20"></i></a>';
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


   
    if($('#summernote').length) $('#summernote').summernote({minHeight: 50, height: 420});
    
    $('body').on('click', '.btn-explorar', function() {

        $('div.form-noticia-modal').modal('show');

    });
    
    
    $('body').on('click', '#btn-nuevo', function() {
        $('.invalid-feedback').remove();
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('.btn-post-noticia.crear').removeClass('d-none').addClass('d-block');
        $('.btn-post-noticia.editar').removeClass('d-block').addClass('d-none');

        $('.msj-v').show();
        $('div.form-noticia-modal').modal('show');


        $('#f-noticia input, #f-noticia select, #f-noticia textarea').val('');

        $('.msj-drag').show();
        $('.gallery-c').empty();
    });

/*
    $('body').on('click', '.btn-editar', function() {
        var el = this;

        $('.invalid-feedback').remove();
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');

        $('.msj-drag').show();
        $('.gallery-c').empty();
        $('.msj-v').hide();

        loadOn(el);
        $.get(API_NOTICIAS + "noticia/" + $(el).parents('tr').attr('id'), function(rpta) {
            $('div.form-noticia-modal').modal('show');



            loadOff(el);
            $.each(rpta, function(key, value) {
                $('#f-noticia [name=' + key + ']').val(value);
            });


            if (rpta.imagenes.length > 0) {
                $('.msj-drag').hide();
                $.each(rpta.imagenes, function(key, obj) {
                    obj.isportada = rpta.fotos_portada_id == obj.id;
                    $('.gallery-c').append(item_gallery(obj));
                });
            }


            $('.btn-post-noticia.crear').removeClass('d-block').addClass('d-none');
            $('.btn-post-noticia.editar').removeClass('d-none').addClass('d-block');

            $(".gallery-c").sortable({
                placeholder: "ui-state-highlight"
            });
            //$( ".gallery-c" ).disableSelection();
        });
    });
*/


    $('body').on('click', '.lnk-image-delete', function(e) {

        var tk = $(this).parents('.gallery-news').attr('item-token');
        $.confirm({
            title: 'Confirmación',
            content: 'Confirma que desea eliminar la imagen seleccionada?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {
                    	let obj = {};
                    	obj.token = tk;
                    	obj.directorio = DATA.MODULOS.DIR_UPLOAD_NOTICIAS_GALERIA;
                    	console.log(JSON.stringify(obj));
                        $.ajax({
                            url: API.ARCHIVOS + '/archivo',
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify(obj),
                            type: 'DELETE',
                            success: function(rpta) {
                            	console.log(rpta);
                                $('.gallery-news[item-token="' + tk + '"]').remove();
                                
                                $('.img-noticia').attr('src', ASSETS.img + 'imagen-no-disponible.jpg');

                            }
                        });
                    }
                },
                cancelar: function() {}
            }
        });




        e.preventDefault();
        e.stopPropagation();

    });


    $('body').on('click', '.btn-portada', function(e) {
        var el = $(this),
            p = el.parents('figure.gallery-news'),
            id = p.attr('item-id');

        $('.isportada').removeClass('d-block').addClass('d-none');
        p.find('.isportada').removeClass('d-none').addClass('d-block');

        $('.btn-portada').html('<i class="fa fa-plus-circle"></i> Portada');
        $(this).html('<i class="fa fa-check"></i>');
        $('.img-noticia').attr('src', el.parents('figure').find('img').attr('src'));
        
        e.preventDefault();
        e.stopPropagation();

    });

    $('body').on('click', '.btn-eliminar-noticia', function(e) {

        var el = this;


        $.confirm({
            title: 'Confirmación',
            content: 'Confirma que desea eliminar la noticia?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {

                        $.ajax({
                            url: API_NOTICIAS + 'noticia/' + $(el).parents('tr').attr('id'),
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




    validator = $("#form-noticia").validate({
    	ignore: ".note-editable.panel-body,.note-editable",
        rules: {
            titulo: {
                required: 1,
                minlength: 5
            },
            contenido: {
                required: 1,
                minlength: 30
            },
            categoria_id: 'required',

        },
        messages: {
            titulo: {
                required: "Ingrese el título de la noticia",
                minlength: "El título debe ser superior a 5 caracteres"
            },
            contenido: {
                required: "Ingrese el contenido de la noticia",
                minlength: "El contenido debe ser superior a 30 caracteres"
            },
            categoria_id: "Seleccione un categoría",

        },
        errorElement: "em",
        errorPlacement: function(t, e) {
            t.addClass("invalid-feedback"),
                "checkbox" === e.prop("type") ? t.insertAfter(e.next("label")) : t.insertAfter(e)
        },
        highlight: function(e, i, n) {
            $(e).addClass("is-invalid").removeClass("is-valid")
        },
        unhighlight: function(e, i, n) {
            //$(e).addClass("is-valid").removeClass("is-invalid")
            $(e).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            registrarNoticia();
        }
    })


});