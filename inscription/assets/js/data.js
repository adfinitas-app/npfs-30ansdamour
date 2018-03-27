



function sendData() {
    var data = {
        "db": {
            "schema": "npfs_newsletter_site\n",
            "db": {
                "civility": getCivility(),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "email": pureField($('#f_mail').val()),
                "phone": pureField(getPhone()),
                "address1": pureField($('#f_addr_1').val()),
                "address2": pureField($('#f_addr_2').val()),
                "postcode": pureField($('#f_zipcode').val()),
                "city": pureField($('#f_city').val())
            }
        },
        "woopra": {
            "host": "spa.asso.fr",			// Nom du projet dans Woopra.

            /* Variables de configuration de la fiche utilisateur, préfixe : "cv_" */

            "cv_civility": getCivility(),
            "cv_firstname": pureField($('#f_firstname').val().toUpperCase()),
            "cv_lastname": pureField($('#f_lastname').val().toUpperCase()),
            "cv_email": pureField($('#f_mail').val()),
            "cv_phone": pureField(getPhone()),
            "cv_address1": pureField($('#f_addr_1').val()),
            "cv_address2": pureField($('#f_addr_2').val()),
            "cv_postcode": pureField($('#f_zipcode').val()),
            "cv_city": pureField($('#f_city').val()),

            /* Variables de l'événement, : préfixe : "ce_" */

            "event": "newsletter_site",				// Nom de l'événement à tracker si applicable. Non préfixé.
            "ce_phone": pureField(getPhone())
        },
        "mailjet": {
            "Email": pureField($('#f_mail').val()),
            "Properties": {
                "civility": getCivility(),
                "firstname": pureField($('#f_firstname').val().toUpperCase()),
                "lastname": pureField($('#f_lastname').val().toUpperCase()),
                "email": pureField($('#f_mail').val()),
                "phone": pureField(getPhone()),
                "address1": pureField($('#f_addr_1').val()),
                "address2": pureField($('#f_addr_2').val()),
                "postcode": pureField($('#f_zipcode').val()),
                "city": pureField($('#f_city').val())
            },
            "addLists": getList(), // Noms de transmission des listes dans lesquelles ajouter le contact. Ne pas mettre les listes "Toute la base" et "Prospects" ici, le contact y est inséré par défaut (excepté dans "Prospect" si donateur).
            "delLists": []  // Noms de transmission des listes dans lesquelles supprimer le contact.
        }
    };

    //console.log(data);
    if (makeCorsRequest(data)) {
        displayNotif("Merci pour votre inscription !");
    }
}




/*
 * Debut de la lib
 */

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
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return false;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
    return true;
}

/*
 * Fin de la lib
 */


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


function validatePhone(phone) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    return re.test(phone);
}




function getPhone() {
    return $('#f_phone').intlTelInput("getNumber");
}

function getPersonnalisationCourte() {
    return getCivilityLong() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getPersonnalisation() {
    return getCivilityDear() + " " + getCivilityLong() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getList() {
    var data = [];

    data.push("newsletter");
    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#comm').is(":checked")) {
        return "true";
    }
    return "false";
}

function getSexe() {
    if ($('#f_male').is(":checked")) {
        return 'Homme';
    }
    else {
        return 'Femme';
    }
}

function getCivility() {
    if ($('#f_male').is(":checked")) {
        return 'M';
    }
    else {
        return 'MME';
    }
}

function getCivilityDear() {
    if ($('#f_male').is(":checked")) {
        return 'Cher';
    }
    else {
        return 'Chère';
    }
}

function getCivilityLong() {
    if ($('#f_male').is(":checked")) {
        return 'MONSIEUR';
    }
    else {
        return 'MADAME';
    }
}
