/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */

//const { each } = require("jquery");

var ServerURL = '../api/'

if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}





DuppeEvent(document, 'keyup', function (event) {
    if (event.key === "Enter") {
        LogIn();
    }
});




// **********************************************
// *****         Tools            ***************
// **********************************************

function DuppeEvent(el, eventName, eventHandler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

function HandleEvent(t, e) {
    if (!e) var e = window.event;

    if (t.name == "") {
        var code;
        if (e.keyCode) code = e.keyCode;
        else if (e.which) code = e.which;


        if (code == 13) { LogIn()}
           // alert(code);

            // t.form.T2.focus();
    }
    
}

function isIE() {
    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); //IE 11

    return (msie > 0 || trident > 0);
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}





function writeCookie(name, value, days) {
    localStorage.setItem(name, value);
}



// ************************************
// ****  Do localStorage     **********
// ************************************

function DoLogOnLS() {

    var object = { value: "value", timestamp: new Date().getTime() }
    localStorage.setItem("key", JSON.stringify(object));

    var object = JSON.parse(localStorage.getItem("key")),
        dateString = object.timestamp,
        now = new Date().getTime().toString();

    compareTime(dateString, now); //to implement
}


//*************************************
function addOption(selectbox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    optn.onclick = value;

    selectbox.options.add(optn);
}

function ReDirect(XY) {
    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "LogIn/";
    var MJson = '{"NewPassword" : "0", "ClientEmail" : "' + document.getElementById('Bruker').value + '", "ClientSessionID" : "NA","ClientPassword" : "' + document.getElementById('Passord').value + '","ClientSessionPassword" : "' + generatePassword() + '"}';
  //  alert(MJson);

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObjE = JSON.parse(xhr.responseText);

            try {
                var myObjE = JSON.parse(myObjE);
            }
            catch {
                SendError('Pålogging med ' + document.getElementById('Bruker').value + ', og passord ' + document.getElementById('Passord').value + ' feilet', 'Passord'); alert('Feil Bruker, eller passord');

            }

        
            var password = myObjE[XY]['ClientSessionPassword'];



            var CLientLevel = myObjE[XY]['ClientLevel'];
            var ClientTimeOutValue = myObjE[XY]['ClientTimeOutValue'];
            var ClientChangePassword = myObjE[XY]['ClientChangePassword'];
            var CLientName = myObjE[XY]['ClientName'];
            var BaseAKA = myObjE[XY]['BaseAKA'];
            var CLientUrl = myObjE[XY]['ClientUrl'];
            var CLientService = myObjE[0]['Service'];


            var FirmMail = myObjE[XY]['FirmMail'];
            var FirmPhone = myObjE[XY]['FirmPhone'];
            var FirmAdress = myObjE[XY]['FirmAdress'];
            var FirmName = BaseAKA.split('_')[1]; //  myObjE[0]['FirmName'];
            //var password = xhr.responseText.toString().replace(/"/g, '');  



            document.getElementById('Result').innerHTML = '<br /><h2 class="user-name text-dark m-none">Velg Tjeneste</h2> ';
            document.getElementById('divService').hidden = false;
            document.getElementById('divLogInFields').hidden = true;


            var object = { value: "value", timestamp: new Date().getTime() }
            localStorage.setItem("key", JSON.stringify(object));

            localStorage.setItem('SessionPassword', password);
            localStorage.setItem('CLientLevel', CLientLevel);
            localStorage.setItem('ClientName', document.getElementById('Bruker').value.replace(/""/g, '"'));
            localStorage.setItem('ClientTimeOutValue', ClientTimeOutValue);
            localStorage.setItem('CLientName', CLientName);
            localStorage.setItem('CLientEmail', document.getElementById('Bruker').value);
            localStorage.setItem('BaseAKA', BaseAKA);
            localStorage.setItem('FirmName', FirmName);
            localStorage.setItem('FirmLogo', BaseAKA);
            localStorage.setItem('FirmAdress', FirmAdress);
            localStorage.setItem('FirmWebSite', 'www.gunstock.one');
            localStorage.setItem('FirmEmail', FirmMail);
            localStorage.setItem('FirmPhone', FirmPhone);

           
            if (localStorage.getItem('BaseAKA') == 'Skitt') { localStorage.setItem('FirmName', 'Skitt Fiske'); CLientService = 'Gunstock'}
            if (ClientChangePassword == "1") { ChangePassword(); } else { top.location.href = CLientService + '/' + CLientUrl + '?q=' + generatePassword();}
           

            //alert('AkaBase = ' + BaseAKA);

        }
    };
    xhr.send(JSON.stringify(MJson));


}

function LogIn() {
    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "LogIn/";
    var MJson = '{"NewPassword" : "0", "ClientEmail" : "' + document.getElementById('Bruker').value + '", "ClientSessionID" : "NA","ClientPassword" : "' + document.getElementById('Passord').value + '","ClientSessionPassword" : "' + generatePassword() + '"}';
  //  alert(MJson);

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var myObjE = JSON.parse(xhr.responseText);

            try {
                var myObjE = JSON.parse(myObjE);
            }
            catch {
                SendError('Pålogging med ' + document.getElementById('Bruker').value + ', og passord ' + document.getElementById('Passord').value + ' feilet', 'Passord'); alert('Feil Bruker, eller passord');
            
            }

            //  Fill DropDown for Service Selection
            var dropdown = document.getElementById('selService');
            for (var k in myObjE) {
                //alert(myObjE[k]['Service']);
                console.log(k, myObjE[k]['Service']);
                //addOption(dropdown, myObjE[k]['Service'] + ' (' + myObjE[k]['BaseAKA'].split('_')[1] + ')', myObjE[k]['Service'] + '/' + myObjE[0]['ClientUrl'] + '?q=' + generatePassword());
                addOption(dropdown, myObjE[k]['Service'] + ' (' + myObjE[k]['BaseAKA'].split('_')[1] + ')', k);

            }

            

            var password = myObjE[0]['ClientSessionPassword'];
                     


            var CLientLevel = myObjE[0]['ClientLevel'];
            var ClientTimeOutValue = myObjE[0]['ClientTimeOutValue'];
            var ClientChangePassword = myObjE[0]['ClientChangePassword'];
            var CLientName = myObjE[0]['ClientName'];
            var BaseAKA = myObjE[0]['BaseAKA'];
            var CLientUrl = myObjE[0]['ClientUrl'];
            var CLientService = myObjE[0]['Service'];

            
            var FirmMail = myObjE[0]['FirmMail'];
            var FirmPhone = myObjE[0]['FirmPhone'];
            var FirmAdress = myObjE[0]['FirmAdress'];
            var FirmName = BaseAKA.split('_')[1]; //  myObjE[0]['FirmName'];
            //var password = xhr.responseText.toString().replace(/"/g, '');  

           

            document.getElementById('Result').innerHTML = '<br /><h2 class="user-name text-dark m-none">Velg Tjeneste</h2> ';
            document.getElementById('divService').hidden = false;
            document.getElementById('divLogInFields').hidden = true;


            var object = { value: "value", timestamp: new Date().getTime() }
            localStorage.setItem("key", JSON.stringify(object));

            localStorage.setItem('SessionPassword', password);
            localStorage.setItem('CLientLevel', CLientLevel);
            localStorage.setItem('ClientName', document.getElementById('Bruker').value.replace(/""/g, '"'));
            localStorage.setItem('ClientTimeOutValue', ClientTimeOutValue);
            localStorage.setItem('CLientName', CLientName);
            localStorage.setItem('CLientEmail', document.getElementById('Bruker').value);
            localStorage.setItem('BaseAKA', BaseAKA);
            localStorage.setItem('FirmName', FirmName);
            localStorage.setItem('FirmLogo', BaseAKA);
            localStorage.setItem('FirmAdress', FirmAdress);
            localStorage.setItem('FirmWebSite', 'www.gunstock.one');
            localStorage.setItem('FirmEmail', FirmMail);
            localStorage.setItem('FirmPhone', FirmPhone);

            /*
            if (localStorage.getItem('BaseAKA') == 'Skitt') { localStorage.setItem('FirmName', 'Skitt Fiske'); CLientService = 'Gunstock'}
            if (ClientChangePassword == "1") { ChangePassword(); } else { top.location.href = CLientService + '/' + CLientUrl + '?q=' + generatePassword();}
            */

            //alert('AkaBase = ' + BaseAKA);

        }
    };
    xhr.send(JSON.stringify(MJson));
}

function generatePassword() {
    var length = 28,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function GetSettings() {
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/";
    var ClientSessionID = '';


    xhr.open(method, url, true);
    //xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            ClientSessionID = xhr.responseText.toString();

           // alert(ClientSessionID);
        }
    };
    xhr.send();
    
}

function ChangePassword() {
    document.getElementById("divChangePassword").innerHTML = '<object style="border: medium solid #000000; width:400px;height:200px; position: absolute; left: 30%; top: 40%; background-color: #FFFFFF;" type="text/html" data="ChangePassword.html" ></object>';
    //document.getElementById("ChangePAssword").style = "width:400px;height:600px;";
    
}

function DoChangePassword() {
    if (document.getElementById('txtNewPassword').value == document.getElementById('txtReNewPassword').value) {
        DoSetPassword();
    }
    else {
        alert('Ikke Lik');
    }
}

function DoSetPassword() {
    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLogOn/";
    var MJson = '{"NewPassword" : "1", "ClientEmail" : "' + window.parent.document.getElementById('Bruker').value + '", "TheNewPassword" : "' + document.getElementById('txtNewPassword').value + '", "ClientPassword" : "' + window.parent.document.getElementById('Passord').value + '"}';


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert('Passordet Ble Endret.' + xhr.responseText.toString());
            window.parent.location.reload();
            window.parent.document.getElementById('divChangePassword').style = "display:none;";
            

        }
    };
    xhr.send(JSON.stringify(MJson));
}

function SendError(Error, Text) {
    
    var MJson = '{"case" : "SendError", "Error" : "' + Error + '", "Text" : "' + Text + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/1?jsonstring=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {

               
                alert('Feil passord eller bruker ?'); 
                document.location.href = 'index.html';
            }

        }
    };
    xhr.send();
}





