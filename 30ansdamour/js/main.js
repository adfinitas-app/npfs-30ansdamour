function validateForm(mode) {
    var check = 0;
    var emailID = $("input[name='email']").val();
    atpos = emailID.indexOf("@");
    dotpos = emailID.lastIndexOf(".");

    if (atpos < 1 || ( dotpos - atpos < 2 ) && index.html)
    {
        $('.error_mail').show();
        $("input[name='email']").css('border','1px solid red');
        $("input[name='email']").focus() ;
        return false;
    }
    else
        $('.error_mail').hide();

    submitForm();
    showNotif();
}

var p = extractUrlParams();

function showNotif() {
    $('.notification').slideDown( "slow", function() {
        setTimeout(function(){
            $('.notification').slideUp("slow");
        }, 5000);
    });
}


function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function submitForm(mode) {

    console.log('email: ' + pureField($('input[name="email"]').val()));
    var data = {
        "db": {
            "schema": "mdp_newsletter",
            "db": {
                "email": pureField($("input[name='email']").val()),
            },
            "woopra" : {
                "host": "nospetitsfreresetsoeurs.org",
                "cookie": getCookie("wooTracker"),
                "event": "lp-video_inscription",
                "cv_email": pureField($("input[name='email']").val()),
                "ce_url": document.location.href,
                "ce_title": document.title
            },
            "mailjet": {
                "Email": pureField($("input[name='email']").val()),
                "Properties": {},
                "addLists": [],
                "delLists": []
            }
        }
    };
    makeCorsRequest(data);
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}

function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/31451a9e-d1d4-4901-91de-aafe2dc78733/webhook/cc6375c0-c366-4cae-95b8-273a9bd22256';
    var body = JSON.stringify(data);
    console.log('on rentre aussi1');
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    console.log('on rentre aussi2');
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log('on rentre aussi3');
    xhr.send(body);
    console.log('on rentre aussi4');
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function getCodeMedia() {
    if ('reserved_code_media' in p && p['reserved_code_media'] != "")
        return p['reserved_code_media'];
    else
        return ("2017WENQ")
}