var tbl_documentos = null;
var validator = null;


function registrarResolucion() {
    var elid = $("#form-resolucion input[name=id]");

    var obj = $("#form-resolucion").serializeObject();
    //obj.contenido = $('div.note-editable').html();
    obj.id = obj.id;
    obj.detalle = obj.detalle;
    obj.anio = obj.anio;
    obj.nro_resolucion = obj.nro_resolucion;
    obj.fecha_emision = obj.fecha_emision;
    obj.sumilla = obj.sumilla;
    obj.archivo = $('.img-resoluciones').attr('file');
    obj.archivo_token = $('.img-resoluciones').attr('token');
    obj.tipo_id = obj.tipo_id;
    obj.area_id = obj.area_id;
    obj.electronico = obj.electronico;

    obj.usuario_id = USUARIO.id;
    
    var el = $('.btn-guardar-resolucion');
    
    loadOn(el);
    $.ajax({
        url: API.RESOLUCIONES + 'resolucion',
        type: $.isNumeric(elid.val()) ? 'put' : 'post',
        dataType: 'json',
        contentType: 'application/json',
        success: function(obj) {
        	loadOff(el);

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

function file_explorer() {

    document.getElementById('selectfile').click();
    document.getElementById('selectfile').onchange = function() {
    	
	
        var form_data = new FormData();
        
        var tipo = $('option:selected', "#tipo_id").attr('data');
        var area = $('option:selected', "#area_id").attr('data');
        var anio = $('option:selected', "#anio").val();
        
        if(anio == undefined && anio == "")  $.toast({
                                                text: 'Seleccionar el año del documento',
                                                icon: 'error',
                                                position: 'bottom-right'
                                            });

        if(tipo == undefined)   $.toast({
                                    text: 'Seleccionar el tipo del documento',
                                    icon: 'error',
                                    position: 'bottom-right'
                                });

        if(area == undefined)  $.toast({
                                        text: 'Seleccionar el area del documento',
                                        icon: 'error',
                                        position: 'bottom-right'
                                    });

        if(area != undefined & tipo != undefined && anio != "") {
            for(var i = 0; i < document.getElementById('selectfile').files.length; i++)
                form_data.append('file', document.getElementById('selectfile').files[i]);
                
                var path = '/web/pdf/resoluciones/' + anio + "/" ;
                var dir =  tipo + "/" + area + "/";
                path += dir;
            form_data.append('directorio', path);

            $.ajax({
                type: 'POST',
                url: API.ARCHIVOS + 'archivo',
                contentType: false,
                processData: false,
                data: form_data,
                enctype: 'multipart/form-data',
                success: function(rpta) {
                    for(var o in rpta){
                        var obj = rpta[o];
                        
                        $('.content-file').removeClass('d-none');
                        $('img.img-resoluciones').addClass('d-none');
                        $(".img-resoluciones").replaceWith("<div class='content-file'><p>"+
                                                                "<a href='" + DATA.URL_SERVER + path + obj.archivo + "' target='_BLANK'>" + obj.archivo + "</a>"+
                                                            "</p>"+
                                                            "<iframe type='application/pdf' src='" + DATA.URL_SERVER + path + obj.archivo + "' class='img-resoluciones' style='height: 250px;width: 100%;' token='"+ obj.token +"' file='"+ dir + obj.archivo +"'></iframe></div>");

                        $('.btn-resoluciones-img-eliminar').removeClass('d-none');
                        $('.btn-resoluciones-img-subir').addClass('d-none');
                    
                    }
                    
                }
            });
        }
        document.getElementById('selectfile').value = '';
    	
    };
    
    return false;
}


$(document).ready(function() {
	
    $('.btn-guardar-resolucion').on('click', function() {
        var el = this;
        $("#form-resolucion").submit();
    });
	
    tbl_documentos = $('#lista-resoluciones').DataTable({
        'pageLength': 10,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'order': [
            [0, "desc"]
        ],
        'ajax': {
            'url': API.RESOLUCIONES + 'resolucion/all',
            'contentType': "application/json",
            "data": function(d) {
                return JSON.stringify(d);
            }
        },
        'columns': [
            { data: 'id' },
            { data: 'detalle' },
            { data: 'tipo_nombre' },
            { data: 'area_id' },
            { data: 'nro_resolucion' },
            { data: 'anio' },
            { data: 'fecha_emision' },
            {
                data: null,
                render: function(data, type, row) {
                    return '<button type="button" class="btn-shadow btn-eliminar-resolucion btn btn-danger"><i class="fa fa-times-circle fa-w-20"></i></button> <a href="resoluciones/editar/'+row.id+'" class="btn-editar btn-shadow btn btn-primary"><i class="fa fa-edit fa-w-20"></i></a>';
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

    
    $('body').on('click', '#btn-nuevo', function() {
        $('.invalid-feedback').remove();
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('.btn-post-noticia.crear').removeClass('d-none').addClass('d-block');
        $('.btn-post-noticia.editar').removeClass('d-block').addClass('d-none');

        $('.msj-v').show();
        $('div.form-resolucion-modal').modal('show');


        $('#f-noticia input, #f-noticia select, #f-noticia textarea').val('');

        $('.msj-drag').show();
        $('.gallery-c').empty();
    });


    $('body').on('click', '.btn-resoluciones-img-eliminar', function() {
    	
        var tk = $('.img-resoluciones').attr('token');
        var archivo = $('.img-resoluciones').attr('file').split("/");
        archivo = archivo[0] + "/" + archivo[1] + "/";
        var anio = $('option:selected', "#anio").val();
        
        if(anio == undefined && anio == "")  $.toast({
                                                text: 'Seleccionar el año del documento',
                                                icon: 'error',
                                                position: 'bottom-right'
                                            });
        
        if(anio != "") {
            var dir = '/web/pdf/resoluciones/' + anio + "/" + archivo;
            
            $.confirm({
                title: 'Confirmación',
                content: 'Estas seguro que desea eliminar el archivo?',
                buttons: {
                    aceptar: {
                        btnClass: 'btn-primary',
                        action: function() {
                            let obj = {};
                            obj.token = tk;
                            obj.directorio = dir;
                            
                            $.ajax({
                                type: 'DELETE',
                                url: API.ARCHIVOS + 'archivo',
                                contentType: false,
                                processData: false,
                                dataType: 'json',
                                contentType: 'application/json',
                                data: JSON.stringify(obj),
                                success: function(r) {
                                    var elid = $("#form-resolucion input[name=id]");
                                    if(r.estado == 'OK'){
                                        $.ajax({
                                            url: API.RESOLUCIONES + 'resolucion/elimiar-archivo/' + elid.val(),
                                            type: 'post',
                                            success: function(obj) {
                                                if(obj.estado == 'OK'){
                                                    $(".content-file").replaceWith('<img src="' + ASSETS.img + 'imagen-no-disponible.jpg' + '" class="img-resoluciones img-thumbnail">');
                                                    $('.btn-evento-img-eliminar').addClass('d-none');
                                                    $('.btn-evento-img-subir').removeClass('d-none');
                                                    
                                                    $.toast({
                                                        text: obj.mensaje,
                                                        icon: 'success',
                                                        position: 'bottom-right',
                                                    });
                                                }
                                                else{
                                                    $.toast({
                                                        text: 'Error al eliminar el archivo. Intente mas tarde',
                                                        icon: 'error',
                                                        position: 'bottom-right'
                                                    });
                                                }
                                                 
                                            },
                                            
                                        });
                                        
                                    }
                                    else{
                                        $.toast({
                                            text: 'Error al eliminar el archivo. Intente mas tarde',
                                            icon: 'error',
                                            position: 'bottom-right'
                                        });
                                    }
                                    
                                }
                            });
                        }
                    },
                    cancelar: function() {}
                }
            });
        }
    });

    $('body').on('click', '.btn-eliminar-resolucion', function(e) {

        var el = this;

        $.confirm({
            title: 'Confirmación',
            content: 'Estas seguro que desea eliminarlo?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {

                        $.ajax({
                            url: API_RESOLUCIONES + 'resolucion/' + $(el).parents('tr').attr('id'),
                            type: 'DELETE',
                            success: function(rpta) {
                                tbl_documentos.ajax.reload(null, false);
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




    validator = $("#form-resolucion").validate({
    	ignore: ".note-editable.panel-body,.note-editable",
        rules: {
            detalle: {
                required: 1,
                minlength: 5
            },
            anio: {
                required: 1
            },
            fecha_emision: {
                required: 1
            },
            sumilla: {
                required: 1
            },
            tipo_id: {
                required: 1
            },
            area_id: {
                required: 1
            },
            electronico: {
                required: 1
            },
        },
        messages: {
            detalle: {
                required: "Ingrese el Nombre de la resolución",
                minlength: "El título debe ser superior a 5 caracteres"
            },
            anio: {
                required: "Seleccione el año de la resolución"
            },
            fecha_emision: {
                required: "Ingrese la fecha de emisión de la resolución"
            },
            sumilla: {
                required: "Ingrese la sumilla de la resolución"
            },
            tipo_id: {
                required: "Seleccione el tipo de resolución"
            },
            area_id: {
                required: "Seleccione el area de la resolución"
            },
            electronico: {
                required: "Seleccione si es electronico de la resolución"
            },
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
            $(e).removeClass("is-invalid");
        },
        submitHandler: function(form) {
            registrarResolucion();
        }
    })


});