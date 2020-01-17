var validator = null;
var tbl_roles = null;
;(function ($) {

    $.switcher = function (filter) {

        var $haul = $('input[type=checkbox],input[type=radio]');

        if (filter !== undefined && filter.length) {
            $haul = $haul.filter(filter);
        }

        $haul.each(function () {

            var $checkbox = $(this).hide(),
                $switcher = $(document.createElement('div'))
                    .addClass('ui-switcher')
                    .attr('aria-checked', $checkbox.is(':checked'));

            if ('radio' === $checkbox.attr('type')) {
                $switcher.attr('data-name', $checkbox.attr('name'));
            }

            toggleSwitch = function (e) {
                if (e.target.type === undefined) {
                    $checkbox.trigger(e.type);
                }
                $switcher.attr('aria-checked', $checkbox.is(':checked'));
                if ('radio' === $checkbox.attr('type')) {
                    $('.ui-switcher[data-name=' + $checkbox.attr('name') + ']')
                        .not($switcher.get(0))
                        .attr('aria-checked', false);
                }
            };

            $switcher.on('click', toggleSwitch);
            $checkbox.on('click', toggleSwitch);

            $switcher.insertBefore($checkbox);
        });

    };

})(jQuery);


$(document).ready(function(){
	
	

    tbl_roles = $('#lista-roles').DataTable({
        'pageLength': 10,
        'processing': true,
        'serverSide': true,
        'serverMethod': 'post',
        'order': [
            [0, "desc"]
        ],
        'ajax': {
            'url': API.USUARIOS + 'rol/filter',
            'contentType': "application/json",
            "data": function(d) {
                return JSON.stringify(d);
            }
        },
        

        'columns': [{
                data: 'id'
            },
            {
                data: 'avatar',
                render: function(data, type, row) {
                    return '<img src="' + (row.avatar ? DATA.URL_SERVER + DATA.MODULOS.DIR_UPLOAD_USUARIOS_AVATARES + row.avatar : ASSETS.img + 'sinfoto.png') + '" class="img-thumbnail" style="width:60px" />'
                },
                "orderable": false
            },
            {
                data: 'nombre'
            },
            {
                data: 'fecha'
            },
            {
                data: null,
                render: function(data, type, row) {
                    //console.log(row);
                    return '<button type="button" class="btn-shadow btn-eliminar-evento btn btn-danger"><i class="fa fa-times-circle fa-w-20"></i></button> <a href="usuarios/roles/editar/'+row.id+'" class="btn-shadow btn btn-primary"><i class="fa fa-edit fa-w-20"></i></a>';
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
	
	
    $('body').on('click', '.list-avatars a', function(e) {
    	var el = $(this), im = $(this).find('img');
    	$('#img-avatar').attr({'src':im.attr('src'), 'name': im.attr('name')}).removeClass('border-red');
    	$('#avatar_id').val(im.attr('name'));
    	$('#avatar_id-error').remove();
    	e.preventDefault();
    });
    
    $('body').on('click', '.btn-guardar-rol', function() {
    	$('#form-rol').submit();
    });

    validator = $("#form-rol").validate({
    	ignore: "",
        rules: {
        	nombre: {
                required: 1,
                minlength: 3
            },
            avatar_id: {
                required: true
			}
        },
        messages: {
        	nombre: {
                required: "Ingrese el nombre del rol",
                minlength: "El nombre debe ser superior a 3 caracteres"
            },
            avatar_id: {
                required: "Debe seleccionar el avatar"
            }
        },
        
        errorElement: "em",
        errorPlacement: function(t, e) {
            t.addClass("invalid-feedback"),
                "checkbox" === e.prop("type") ? t.insertAfter(e.next("label")) : t.insertAfter(e);
                console.log(t[0]);
                if(t[0].id == 'avatar_id-error') $('.img-avatar').addClass('border-red');
        },
        highlight: function(e, i, n) {
            $(e).addClass("is-invalid").removeClass("is-valid")
        },
        unhighlight: function(e, i, n) {
            //$(e).addClass("is-valid").removeClass("is-invalid")
            $(e).removeClass("is-invalid");
        },
        submitHandler: function(form) {
        	var f = $("#form-rol")
            var obj = f.serializeJSON({checkboxUncheckedValue: "false",useIntKeysAsArrayIndex: true});
        	
            obj.usuario_id = USUARIO.id;
            
            var elid = f.find("input[name=id]");
            
            console.log(JSON.stringify(obj));

            $.ajax({
                url: API.USUARIOS + 'rol',
                type: $.isNumeric(elid.val()) ? 'PUT' : 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                success: function(rpta) {
                    $.toast({
                        text: rpta.mensaje,
                        icon: rpta.estado == 'OK' ? 'success' : 'error',
                        position: 'bottom-right',
                    });
                    
                    setTimeout(function(){
                    	location.href= BASE_URL	+ 'usuarios/roles';
                    }, 3200);
                }
            });
            
            
        }
    });
	
	
	
	
	
	
	
	
	
	
	
	
	$.switcher();
})