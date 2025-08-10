/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */
var ServerURL = '../api/'





DuppeEvent(document, 'DOMContentLoaded', function () {

    //DoNewBrowserTab('999', 265, 100, 'Front.html');
    //WriteTabCookie();
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

function ReadTabCookie() {
    var json_str = readCookie("TAB");

    var Clen;

    if (json_str === "") {
        alert("NOO");
    } else {
        var Temp = JSON.parse(json_str);
        var Temp = JSON.parse(Temp);
        var Clen = Temp.TAB.length;
        alert(' ReadTabCookie --> ' + json_str);
        if (Clen < 1) {
            DoNewBrowserTab("https://www.vg.no/");
        } else {
            for (var x = 0; x < Clen; x++) {
                //  alert(Temp.TAB[x]);
                DoNewBrowserTab(Temp.TAB[x], 1);
            }
        }
    }
}

function WriteTabCookie() {
    var myObj;
    var Clen = "";
    var t = "";

    Clen = readCookie("TabTick");

    if (Clen < 2) {
        myObj = '{ "TAB": ["Front.html", "https://www.vg.no/"] }';
    } else {
        myObj = '{ "TAB": [';
        for (var x = 1; x <= Clen; x++) {
            t = "BDIV" + x;

            if (document.getElementById(t) == null) {

            } else {
                t = document.getElementById(t).innerHTML;

            }

            myObj = myObj + ' "' + t + '"';
            if (x < Clen) {
                myObj = myObj + ", ";
            }
        }
        myObj = myObj + "] }";
    }

    var json_str = JSON.stringify(myObj);
    //createCookie('TAB', json_str);
    DeletCookie("TAB");
    writeCookie("TAB", json_str, 0);
    alert("--- WriteTabCookie --> " + json_str);
}

function CreateNewButton(Left) {
   
    //alert('JuHu');
    DoNewBrowserTab('index.html');
    /*
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "&nbsp;+&nbsp;";
    btn.style = "display: block;position: absolute;top: 100px;bottom: 0;left:365px;width:50px;height:30px;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 2px;border: 1px solid #c3c3c3;display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    btn.onclick = function () {
        alert('Lage Ny Tab'); return false;
    };
    btn.id = "btnMakeNew";
    document.body.appendChild(btn);
    */
}

function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        /*date.setTime(date.getTime() + (days * 60 * 1000));*/
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log(expires);
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return '';
}

function DeletCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}



function LogIn() {
    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLogOn/";
    var MJson = '{"NewPassword" : "0", "ClientEmail" : "' + document.getElementById('Bruker').value + '", "ClientSessionID" : "NA","ClientPassword" : "' + document.getElementById('Passord').value + '","ClientSessionPassword" : "' + generatePassword() + '"}';
    

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //var myObjE = JSON.parse(xhr.responseText);
            // var myObjE = JSON.parse(myObjE);
            if (xhr.responseText == '"Error13"') {
                SendError('Pålogging med ' + document.getElementById('Bruker').value + ', og passord ' + document.getElementById('Passord').value + ' feilet', 'Passord'); alert('Feil Bruker, eller passord'); }

            var password = xhr.responseText.toString().split('|')[0].toString().replace(/"/g, '');

            
            if (detectMob()) {
                var ResponsURL = '_MOB_DoDelivery.html'; //xhr.responseText.toString().split('|')[1].toString().replace(/"/g, '');
            }
            else {
                var ResponsURL = 'inside.html'; //xhr.responseText.toString().split('|')[1].toString().replace(/"/g, '');
            }
            


            var CLientLevel = xhr.responseText.toString().split('|')[2].toString().replace(/"/g, '');
            var ClientTimeOutValue = xhr.responseText.toString().split('|')[3].toString().replace(/"/g, '');
            var ClientChangePassword = xhr.responseText.toString().split('|')[4].toString().replace(/"/g, '');
            var CLientName = xhr.responseText.toString().split('|')[5].toString().replace(/"/g, '');
            //var password = xhr.responseText.toString().replace(/"/g, '');  

            document.getElementById('Result').innerHTML = 'OK <br /> Sending You To GunStock.ONE '; // + xhr.responseText.toString();
            writeCookie('SessionPassword', password, 30000);
            writeCookie('CLientLevel', CLientLevel, 30000);
            writeCookie('ClientName', document.getElementById('Bruker').value.replace(/""/g, '"'), 30000);
            writeCookie('ClientTimeOutValue', ClientTimeOutValue, 30000);
            writeCookie('CLientName', CLientName, 30000);
            writeCookie('CLientEmail', document.getElementById('Bruker').value, 30000);
            //alert(password.replace(/"/g, ''));
            if (ClientChangePassword == "1") { ChangePassword(); } else {  top.location.href = ResponsURL + '?q=' + generatePassword();}
            



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

            alert(ClientSessionID);
        }
    };
    xhr.send();
    
}

function ChangePassword() {
    document.getElementById("divChangePassword").innerHTML = '<object style="border: medium solid #000000; width:400px;height:200px; position: absolute; left: 30%; top: 40%; background-color: #808080;" type="text/html" data="ChangePassword.html" ></object>';
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
    var MJson = '{"NewPassword" : "1", "ClientEmail" : "' + window.parent.document.getElementById('Bruker').value + '", "ClientPassword" : "' + document.getElementById('txtNewPassword').value + '"}';


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
    
    var MJson = '{"case" : "SendError", "Error" : "' + Error + '", "Text" : "' + Text + '"}';
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

    var MJson = '{"case" : "UserActivity", "ClientSessionPassword" : "' + readCookie('SessionPassword') + '", "Type" : "' + Type + '"}';
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

function DoFillHistory() {

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

function DoNewBrowserTab(URL, ReadOnly) {
    //style = "display: block;position: absolute;top: 100px;bottom: 0;left: 265px;width:1500px; height:800px;z-index: 15;"
    if (document.cookie.indexOf("TabTick") === -1) {
        var TabTick = 1;
    } else {
        TabTick = parseFloat(readCookie("TabTick"));
        TabTick = TabTick + 1;
    }

    writeCookie("TabTick", TabTick, 0);
    writeCookie("ActiveTab", TabTick, 30);
    alert(readCookie("ActiveTab"));

    // Make Tab
    var btn = document.createElement("BUTTON");
    btn.innerHTML = "erter";
    btn.style =
        "display: block;position: absolute;top: 100px;bottom: 0;left: " +
        (365 + (100 * TabTick - 100)) +
        "px;width:100px;height:30px;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 2px;border: 1px solid #c3c3c3;display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    btn.onclick = function () {
        alert("here be dragons");
        return false;
    };
    btn.id = "BTN" + TabTick;
    document.body.appendChild(btn);
    // Make
    var BDiv1 = document.createElement("DIV");
    BDiv1.type = "text/html";
    BDiv1.id = "BDIV" + TabTick;
    BDiv1.innerHTML = URL;
    document.body.appendChild(BDiv1);

    // Make BrowserWindow
    var BrowserDiv1 = document.createElement("embed");
    BrowserDiv1.src = URL;
    BrowserDiv1.type = "text/html";
    BrowserDiv1.id = "TAB" + TabTick;
    BrowserDiv1.style =
        "display: block;position: absolute;top: 121px;bottom: 0;left: 256px;width:80%;height:800px;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 2px;border: 1px solid #c3c3c3;display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    document.body.appendChild(BrowserDiv1);
    //var oldChild = element.removeChild(child);
    //document.getElementById("test").remove();
    if (ReadOnly == null) { WriteTabCookie(); }

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



    }, 5000);
}

// Check SessionPass
function CheckSessionPass(SessionPass) {

    
    var MJson = '{"ClientSessionPassword" : "' + SessionPass + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;
    alert(MJson);


    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();

            alert(VALID);
            if (VALID == 'false') {

                //alert('Du Logges ut fordi session nøkkelen er ugyldig. '); 
                // alert('Du logges ikke av :-) , men send gjerne URL til meg så jeg ser hvor du er :-) ');
                SendError('SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')', 'ForceLogOf');
                //SendMail('ForceLogOf', 'SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')')

                DoLogOut();
                document.location.href = 'index.html';
            }
            else {
                document.location.href = 'inside.html?q='+SessionPass;
            }

        }
    };
    xhr.send();
}

// DoLogOut
function DoLogOut() {

    var Password = readCookie('SessionPassword');
    var MJson = '{"DoLogOut" : "' + Password + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            DeletCookie('ClientName');
            DeletCookie('SessionPassword');
            document.location.href = 'index.html';

        }
    };
    xhr.send();
}



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