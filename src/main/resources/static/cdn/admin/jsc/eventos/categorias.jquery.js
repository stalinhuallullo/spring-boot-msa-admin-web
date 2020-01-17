var tbl_category = null;
var validator = null;

$(document).ready(function() {

    $('body').on('click', '#btn-nuevo', function() {
    	
    	$('.btn-crear-categoria').show();
    	$('.btn-editar-categoria').hide();
    	
        $('div.form-categoria-modal').modal('show');
        $('#form-categoria #nombre,#form-categoria #id,#form-categoria #slug').val('');

    });

	tbl_category = $('#lista-categorias').DataTable({
        'pageLength': 10,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'order': [
            [0, "desc"]
        ],
        'ajax': {
            'url': API.EVENTOS + 'categoria/filter',
            'contentType': "application/json",
            "data": function(d) {
                return JSON.stringify(d);
            }
        },
        

        'columns': [{
                data: 'id'
            },
            {
                data: 'nombre'
            },
            {
                data: 'slug'
            },
            {
                data: 'fecha'
            },
            {
                data: null,
                render: function(data, type, row) {
                    //console.log(row);
                    return '<button type="button" class="btn-shadow btn-eliminar-categoria btn btn-danger"><i class="fa fa-times-circle fa-w-20"></i></button> <button class="btn-editar btn-shadow btn btn-primary"><i class="fa fa-edit fa-w-20"></i></button>';
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
    
    
    validator = $("#form-categoria").validate({
        rules: {
            nombre: {
                required: 1,
                minlength: 3
            },
            slug: {
                required: 1,
                minlength: 3
            },
        },
        messages: {
        	nombre: {
                required: "Ingrese el nombre de la categoría",
                minlength: "El nombre debe ser superior a 3 caracteres"
            },
            slug: {
                required: "Ingrese la url corta de la categoría",
                minlength: "La url corta debe ser superior a 3 caracteres"
            }
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
        	var f = $("#form-categoria")
            var obj = f.serializeObject();
            obj.usuario_id = USUARIO.id;
            
            var elid = f.find("input[name=id]");
            
            $.ajax({
                url: API.EVENTOS + 'categoria',
                type: $.isNumeric(elid.val()) ? 'PUT' : 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(rpta) {

                	if(rpta.estado == 'OK'){
                    	$('div.form-categoria-modal').modal('hide');
                    	tbl_category.ajax.reload(null, false);
                	}

                    $.toast({
                        text: rpta.mensaje,
                        icon: rpta.estado == 'OK' ? 'success' : 'error',
                        position: 'bottom-right',
                    });
                }
            });
        }
    });
    
    $( "#form-categoria #nombre" ).keyup(function( e ) {
    	
    	$( "#form-categoria #slug").val(convertirSlug($(this).val()));

    }).keydown(function( v ) {if ( v.which == 13 ) v.preventDefault();});
    
    $('body').on('click', '.btn-editar', function() {
        var el = this;
        
    	$('.btn-crear-categoria').hide();
    	$('.btn-editar-categoria').show();
    	
        $('.invalid-feedback').remove();
        $('.is-valid, .is-invalid').removeClass('is-valid is-invalid');

        loadOn(el);
        $.get(API.EVENTOS + "categoria/" + $(el).parents('tr').attr('id'), function(rpta) {
            $('div.form-categoria-modal').modal('show');

            loadOff(el);
            $.each(rpta, function(key, value) {
                $('#form-categoria [name=' + key + ']').val(value);
            });

        });
    });
    
    

    $('body').on('click', '.btn-eliminar-categoria', function(e) {

        var el = this;


        $.confirm({
            title: 'Confirmación',
            content: 'Confirma que desea eliminar la categoría?',
            buttons: {
                aceptar: {
                    btnClass: 'btn-primary',
                    action: function() {

                        $.ajax({
                            url: API.EVENTOS + 'categoria/'+$(el).parents('tr').attr('id'),
                            type: 'DELETE',
                            success: function(rpta) {
                            	tbl_category.ajax.reload(null, false);
                                $.toast({
                                    text: rpta.mensaje,
                                    icon: rpta.estado == 'OK' ? 'success' : 'error',
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
});