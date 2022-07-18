function hcaptcha_callback(){
    $('button').prop("disabled", false);
}

function hcaptcha_expired_callback() {
    $('button').prop("disabled", true);
}