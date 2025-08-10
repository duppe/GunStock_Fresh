/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */
var ServerURL = 'api/'

if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}



DuppeEvent(document, 'DOMContentLoaded', function () {


    StartWarningTimer();
    DoFillHistory();

    DeletCookie("ActiveTab");
    DeletCookie("TabTick");
    ReadTabCookie();


});


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


function LogIn() {
    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLogOn/";
    var MJson = '{"NewPassword" : "0", "ClientEmail" : "' + document.getElementById('Bruker').value + '", "ClientSessionID" : "NA","ClientPassword" : "' + document.getElementById('Passord').value + '","ClientSessionPassword" : "' + generatePassword() + '"}';
  //  alert(MJson);

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var myObjE = JSON.parse(xhr.responseText);
            // var myObjE = JSON.parse(myObjE);
            if (xhr.responseText == '"Error13"') {
                SendError('Pålogging med ' + document.getElementById('Bruker').value + ', og passord ' + document.getElementById('Passord').value + ' feilet', 'Passord'); alert('Feil Bruker, eller passord'); }

            var password = xhr.responseText.toString().split('|')[0].toString().replace(/"/g, '');

                     


            var CLientLevel = xhr.responseText.toString().split('|')[2].toString().replace(/"/g, '');
            var ClientTimeOutValue = xhr.responseText.toString().split('|')[3].toString().replace(/"/g, '');
            var ClientChangePassword = xhr.responseText.toString().split('|')[4].toString().replace(/"/g, '');
            var CLientName = xhr.responseText.toString().split('|')[5].toString().replace(/"/g, '');
            var BaseAKA = xhr.responseText.toString().split('|')[6].toString().replace(/"/g, '');
            var FirmMail = xhr.responseText.toString().split('|')[7].toString().replace(/"/g, '');
            var FirmPhone = xhr.responseText.toString().split('|')[8].toString().replace(/"/g, '');
            var FirmAdress = xhr.responseText.toString().split('|')[9].toString().replace(/"/g, '');
            var FirmName = xhr.responseText.toString().split('|')[10].toString().replace(/"/g, '');
            //var password = xhr.responseText.toString().replace(/"/g, '');  

            document.getElementById('Result').innerHTML = 'OK <br /> Sending You To GunStock.ONE '; // + xhr.responseText.toString();


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
           
            if (localStorage.getItem('FirmName') == 'Skitt') { localStorage.setItem('FirmName', 'Skitt Fiske'); }
            if (ClientChangePassword == "1") { ChangePassword(); } else {  top.location.href = '../Gunstock/GunStock.html?q=' + generatePassword();}
           

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
    
    var MJson = '{"case" : "SendError", "Error" : "' + Error + '", "Text" : "' + Text + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
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

function SendPing(Type) {

    var MJson = '{"case" : "UserActivity", "ClientSessionPassword" : "' + readCookie('SessionPassword') + '", "Type" : "' + Type + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
    //var myJSON = JSON.stringify(MJson);

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/1?jsonstring=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {


            }

        }
    };
    xhr.send();
}

function DoRefreshHistory() {
    var CLientName = readCookie('CLientName')
    // <div id="test" onmouseover="document.getElementById('test').class='DuppeNoSelected';"  class="DuppeSelected">Rounded corners!</div>


}





// **********************************************
// *****         Login            ***************
// **********************************************


function DoDo() {
    setInterval(function () {
        var x = parseFloat(document.getElementById('txtSessionTimeOut').value) + 1;
        document.getElementById('LoggStatus').innerHTML = 'idle ' + x;
        if (x < 20) { document.title = 'GunStock_ONE (Idle)'; }
        if (x == 0) { document.title = 'GunStock_ONE (In use)';  }
        document.getElementById('txtSessionTimeOut').value = x;
        CheckSessionPass(readCookie('SessionPassword'), readCookie('ClientName'))



    }, 60000);
}

// Check SessionPass
function CheckSessionPass(SessionPass, ClientName) {


    var MJson = '{"ClientSessionPassword" : "' + localStorage.getItem('SessionPassword') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {

                //alert('Du Logges ut fordi session nøkkelen er ugyldig. '); 
                // alert('Du logges ikke av :-) , men send gjerne URL til meg så jeg ser hvor du er :-) ');
                SendError('SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')', 'ForceLogOf');
                //SendMail('ForceLogOf', 'SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')')

                DoLogOut();
                document.location.href = 'index.html';
            }
            else {
                localStorage.setItem('SessionPassword', SessionPass);
                document.location.href = 'Inside.html';
            }

        }
    };
    xhr.send();
}

// DoLogOut




// Start warning timer.
function StartWarningTimer() {

    top.document.getElementById('LoggStatus').innerHTML = 'Idle';
    DoDo();

}

// Reset timers.
function ResetTimeOutTimer() {

    if (document.getElementById('DoDo_IsRunning').value == '0') { StartWarningTimer(); document.getElementById('DoDo_IsRunning').value = '1'; }
    document.getElementById('LoggStatus').innerHTML = 'Using';
    document.title = 'GunStock_ONE (In use)';
    document.getElementById('txtSessionTimeOut').value = 0;
    SendPing('1');


}

function SendHistory(User_Name, UserURL, HistoryTitle, HistoryText) {


    var UserHistory = '{';
    UserHistory += '"User_Name" : "' + User_Name + '"';
    UserHistory += ', "CLientEmail" : "' + localStorage.getItem('CLientEmail') + '"';
    UserHistory += ', "UserURL" : "' + UserURL + '"';
    UserHistory += ', "HistoryTitle" : "' + HistoryTitle + '"';
    UserHistory += ', "HistoryText" : "' + HistoryText + '"';
    UserHistory += ', "ActionType" : "1"';
    UserHistory += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
    UserHistory += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "UserHistory/?jsonstring=" + UserHistory;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // alert(xhr.responseText.toString());

        }
        DoFillHistory(localStorage.getItem('ClientName'));
    };
    xhr.send();
    //alert('Kommer Snart !/r/n' + TextToSend);

}

/*
 * 
 * 
 * 
 * function DoFillHistory() {

    var Linje = "";
    var UserHistory = '{';
    UserHistory += '"ActionType" : "2"';
    UserHistory += ' } ';


    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "UserHistory/?jsonstring=" + UserHistory;
    console.log('GetHistory-->' + url + '<---');

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(' ---------------------   >' + xhr.responseText + '<-----------------');
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            //console.log(xhr.responseText);


            for (var key in myObjE) {
                Linje += "<div id='test'   class='DuppeSelected'>";

                if (myObjE.hasOwnProperty(key)) {
                    Linje += "<h1>" + myObjE[key].HistoryTitle + "</h1><br /><br />";

                    Linje += "<a onclick=\"getElementById('TAB" + readCookie('ActiveTab') + "').src='" + myObjE[key].User_URL + "'\">test</a>";
                    //User_Name, User_URL, User_TimeStamp
                }

                Linje += "</div><br />";
            }



            document.getElementById('LastHistory').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    ReadTabCookie();
}
 * 
 * 
 * 
 */