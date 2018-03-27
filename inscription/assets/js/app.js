
$(window).on('load', function () {
    $(document).foundation();
});


$(document).ready( function() {
    $("#f_phone").intlTelInput({
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.12/js/utils.js',
        initialCountry: ['fr']
    });
});

$('#f_male').click(function() {
    $('#f_female').prop( "checked", false );
});
$('#f_female').click(function() {
    $('#f_male').prop( "checked", false );
});
$('input').focus(function() {
    $(this).removeClass('red-border');
})

$('#f_summit').click( function() {
    if (validateForm()) {
        sendData();
    }
});


function validateForm() {
    var check = true;


    $('.civilite-container *').css('color', "white");
    $('.error').css('display','none');


    /* CHECK ALL */

    $('input').each( function() {
        $(this).removeClass('red-border');

        if ($(this).hasClass('required')) {

            if ($(this).val() === "") {

                $('.error-required').show();
                $(this).addClass('red-border');
                check = false;
            }
        }
    });

    /* CHECK EMAIL */

    if ($("#f_mail").val() !== "") {
        if (!(validateEmail($("#f_mail").val()))) {
            $("#f_mail").addClass('red-border');
            $('.error-email').show();
            check = false;
        }
    }


    /* CHECK PHONE */

    if ($("#f_phone").val() !== "") {
        if (!$("#f_phone").intlTelInput("isValidNumber")) {
            $("#f_phone").addClass('red-border');
            $('.error-phone').show();
            check = false;
        }
    }


    /* CHECK ZIPCODE */

    if ($("#f_zipcode").val() !== "") {
        if ($("#f_zipcode").val() != parseInt($("#f_zipcode").val(), 10)) {
            $("#f_zipcode").addClass('red-border');
            $('.error-zipcode').show();
            check = false;
        }
    }

    /* CHECK RECAPTCHA */

    var response = grecaptcha.getResponse();

    if(response.length === 0) {
        $('.error-captcha').show();
        check = false;
    }

    return check;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function displayNotif(text) {
    $('.notif-container p').text(text);
    $('.notif-container').slideDown();
    setTimeout(function(){
        $('.notif-container').slideUp();
    },4000);
}