jQuery.fn.serializeObject = function () {
    var formData = {};
    var formArray = this.serializeArray();
    for (var i = 0, n = formArray.length; i < n; ++i)
         formData[formArray[i].name] = formArray[i].value;
     return formData;
};


function convertirSlug (texto) {
	texto = texto.replace(/^\s+|\s+$/g, ''); // trim
	texto = texto.toLowerCase();

    var original = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var nuevo   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=original.length ; i<l ; i++) texto = texto.replace(new RegExp(original.charAt(i), 'g'), nuevo.charAt(i));
    
    texto = texto.replace(/[^a-z0-9 -]/g, '') 
        .replace(/\s+/g, '-') //
        .replace(/-+/g, '-'); 

    return texto;
}


function loadOn(el) {
    $(el).prop('disabled', true);
    $(el).append('<div class="load-x" style="background-color:' + $(el).css('backgroundColor') + '"><div class="load-speeding-wheel"></div></div>');
}

function loadOff(el) {
    $(el).prop('disabled', false);
    $(el).find('.load-x').remove();
}