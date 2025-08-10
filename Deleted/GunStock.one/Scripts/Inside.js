/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */

document.addEventListener("DOMContentLoaded", DuppeLoad());
window.onload = codeAddress;






function DuppeLoad() {
    //DoNewBrowserTab('999', 265, 100, 'Front.html');
    //WriteTabCookie();
    //alert(readCookie('CLientLevel'));
    
    //StartWarningTimer();
    //DoFillHistory();
}

function codeAddress() {

    //ElementTest()
    var Password = '';//params.get("Q"); document.getElementById('txtPassword').value = Password;
    var ClientName = '';//params.get("ClientName");
    var CLientLevel = '';//params.get("ClientName");

    if (Password == "") { Password = readCookie('SessionPassword'); }
    if (ClientName == "") { ClientName = readCookie('ClientName'); }
    if (CLientLevel == "") { CLientLevel = readCookie('CLientLevel'); }

    if (Password == "") {
        DoLogOut();
        document.location.href = 'index.html';
    }
    CheckSessionPass(Password, ClientName);
   

    document.getElementById('User').innerHTML = ClientName;

    var img = document.getElementById('AdminMenu');
    if (CLientLevel == "1") { 
    img.style.visibility = 'visible';
    } else {
    img.style.visibility = 'hidden';
       
    }

    DeletCookie("TabTick");
    ReadTabCookie();
   
    StartWarningTimer();
    
}





// **********************************************
// *****         Tools            ***************
// **********************************************


function ReadTabCookie() {
    var json_str = readCookie("TAB");

    var Clen;

    if (json_str === "") {
        DoNewBrowserTab('Front.html', 1, 'Hjem');
    } else {
        var Temp = JSON.parse(json_str);
        var Temp = JSON.parse(Temp);
        var Clen = Temp.TAB.length;
        // alert(Temp);
        if (Clen < 1) {
            DoNewBrowserTab("Front.html");
        } else {
            for (var x = 0; x < Clen; x++) {

                //DoNewBrowserTab(Temp.TAB[x], 1);
                DoNewBrowserTab(Temp.TAB[x].URL, 1, Temp.TAB[x].TabName)
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
        myObj = '{ "TAB": [{"URL":"Front.html", "TabName":"Hjem"}] }';
    } else {
        myObj = '{ "TAB": [';
        for (var x = 1; x <= Clen; x++) {
            // {"URL":"Front.html", "TabName":"Forside"},
            //  myObj = myObj + "{\"URL\":\"" + document.getElementById("BDIV" + x).innerHTML + "\", \"TabName\":\"" + document.getElementById("BTN" + x).innerHTML + "\"}";


            if (document.getElementById("BDIV" + x).innerHTML == "") {
                //NOP
            }
            else {
                myObj = myObj + "{\"URL\":\"" + document.getElementById("BDIV" + x).innerHTML + "\", \"TabName\":\"" + document.getElementById("BTN" + x).innerHTML + "\"}";




            }
            
            if ((x < Clen & document.getElementById("BDIV" + x).innerHTML != "" )) {
                myObj = myObj + ", ";
            }
        }
        myObj = myObj + "] }";
    }

    var json_str = JSON.stringify(myObj).replace(', ] }', '] }');
    //createCookie('TAB', json_str);
    DeletCookie("TAB");
    writeCookie("TAB", json_str, 30);
    //alert("--- WriteTabCookie --> " + json_str);
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

function DoNewBrowserTab(URL, ReadOnly, Name) {
    //style = "display: block;position: absolute;top: 100px;bottom: 0;left: 265px;width:1500px; height:800px;z-index: 15;"

    // Check if tab exist
    var Clen = readCookie("TabTick");
   
    for (var x = 1; x <= Clen; x++) {
        if (!(document.getElementById("BTN" + x).innerHTML).indexOf(Name)) { BringToFront(x, URL); return; }
    }

    if (document.cookie.indexOf("TabTick") === -1) {
        var TabTick = 1;
    } else {
        TabTick = parseFloat(readCookie("TabTick"));
        TabTick = TabTick + 1;
    }

    writeCookie("TabTick", TabTick, 0);
    writeCookie("ActiveTab", TabTick, 30);

    // Make Cross
    var btnCross = document.createElement("DIV");
    btnCross.innerHTML = "<img  src=\"img/CrossON.gif\" />";
    btnCross.style =
        "z-index: 1000;font-family: 'Linux Libertine','Georgia','Times',serif;font-size: 60%;display: block;position: absolute;top: 0px;bottom: 0;left: " +
        (265 + (100 * TabTick - 100)) +
        "px;width:23px;height:24px;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 2px;border: 1px solid #c3c3c3;"; //display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    btnCross.onclick = function () {

        //alert("BDIV" + TabTick);
        document.getElementById("BDIV" + TabTick).innerHTML = "";
        WriteTabCookie();
        document.location.reload();
        return false;
    };
    btnCross.id = "btnCross" + TabTick;
    document.body.appendChild(btnCross);

    // Make Tab
    var btn = document.createElement("DIV");
    btn.innerHTML = Name; // + "<img style=\"float: right; margin: 0px 15px 15px 0px; \" src=\"img/CrossON.gif\" />"; //"Tab " + readCookie("ActiveTab");

    //btn.innerHTML = Name + "<img style=\"float: right; margin: 0px 15px 15px 0px; \" src=\"img/CrossON.gif\" />"; //"Tab " + readCookie("ActiveTab");
    btn.style =
        "z-index: 19;font-family: 'Linux Libertine','Georgia','Times',serif;font-size: 15px;;display: block;position: absolute;top: 0px;bottom: 0;left: " +
        (265 + (100 * TabTick - 100)) +
        "px;width:100px;height:20px;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 30px;padding-top:0px;border: 1px solid #c3c3c3;"; //display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    btn.onclick = function () {
        //alert("here be dragons");
       
        BringToFront(TabTick);
        writeCookie("ActiveTab", TabTick, 30);
        WriteTabCookie();
        
       
        return false;
    };
    btn.id = "BTN" + TabTick;
    document.body.appendChild(btn);

    // Make Tag
    var BTNtag = Name.split('<')[0].toString().split(' ')[0].toString();
    writeCookie("BTNtag" + TabTick, BTNtag, 30);

    // Make
    var BDiv1 = document.createElement("DIV");
    BDiv1.type = "text/html";
    BDiv1.id = "BDIV" + TabTick;
    BDiv1.innerHTML = URL;
    document.body.appendChild(BDiv1);


    // Make BrowserWindow
    var BrowserDiv1 = document.createElement("iframe");
    BrowserDiv1.src = URL;
    BrowserDiv1.type = "text/html";
    BrowserDiv1.id = "TAB" + TabTick;
    BrowserDiv1.style =
        "display: block;position: absolute;top: 48px;bottom: 0;left: 61px;width:90%;height:90%;border-radius: 5px;border: 2px solid #fefefe;background: #ffffff;padding: 2px;border: 1px solid #c3c3c3;display: -webkit-flex;display: flex;-webkit-flex-wrap: wrap;flex-wrap: wrap;-webkit-align-content: top;align-content: top;";
    document.body.appendChild(BrowserDiv1);
    //var oldChild = element.removeChild(child);
    //document.getElementById("test").remove();
    
    if (ReadOnly == null) { WriteTabCookie(); } 
    BringToFront();
   
    
}

function BringToFront(ID, URL) {
    //var TAB = "TAB" + ID;
    if (ID == null) { ID = readCookie('ActiveTab'); }

    for (var tq = 1; tq < (parseFloat(readCookie("TabTick"))+1); tq++)
    {
        //document.getElementById("TAB" + tq).style.visibility = 'hidden;';
        document.getElementById("TAB" + tq).style.display = 'none';
        document.getElementById("BTN" + tq).style.backgroundColor = 'white';
    }

    //document.getElementById("TAB" + ID).style.visibility = 'visible;';
    document.getElementById("TAB" + ID).style.display = 'block';
    if (URL != null) { document.getElementById("TAB" + ID).src = URL; }
    document.getElementById("BTN" + ID).style.backgroundColor = '#f6f6f6';
    writeCookie('ActiveTab', ID, 1);
}

function HotKay(event) {
    var x = event.which || event.keyCode;
    var url = document.getElementById("searchInput_TOP").value.toString()
    if (x == 167) {
        //alert(url);
        //DoNewBrowserTab(url.substring(0, url.length - 1), 0, "test");
        document.getElementById("searchInput_TOP").value = url.substring(0, url.length);
        DoNewBrowserTab(url.substring(0, url.length), 0, "test");
    }
}

// **********************************************
// *****         Login            ***************
// **********************************************


function DoDo() {
    setInterval(function () {
        var x = parseFloat(document.getElementById('txtSessionTimeOut').value) + 1;
        document.getElementById('LoggStatus').innerHTML = 'idle &nbsp;&nbsp;&nbsp;' + x + '&nbsp;&nbsp;&nbsp;(' + readCookie('SessionPassword') + ')' ;
        if (x < 20) { document.title = 'GunStock_ONE (Idle)'; }
        if (x == 0) { document.title = 'GunStock_ONE (In use)'; }
        document.getElementById('txtSessionTimeOut').value = x;
        CheckSessionPass(readCookie('SessionPassword'), readCookie('ClientName'))



    }, 5000);
}

// Check SessionPass
function CheckSessionPass(SessionPass, ClientName) {

    if (SessionPass == null) {
        DoLogOut();
        document.location.href = 'index.html';
    }


    var MJson = '{"ClientSessionPassword" : "' + readCookie('SessionPassword') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {


                SendError('SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')', 'ForceLogOf');
                //SendMail('ForceLogOf', 'SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')')

                DoLogOut();
                document.location.href = 'index.html';
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
            deleteAllCookies();
            document.location.href = 'index.html';

        }
    };
    xhr.send();
}

// Start warning timer.
function StartWarningTimer() {

    top.document.getElementById('LoggStatus').innerHTML = 'Idle (' + readCookie('SessionPassword') + ')';
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

                alert('Logg Out');
            }

        }
    };
    xhr.send();
}


// FrontPage
function GetBySerial(Serial) {

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL;

    if (Serial != "") {
        url = ServerURL + "lookup/0_" + Serial.replaceAll(".", "§").replaceAll("+", "£") + "?SessionPassword=" + readCookie('SessionPassword');
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);
                var are = myObj[0]; // get array number1

                if ((myObj[0] != null) & (myObj[1] == null)) {

                    document.getElementById('Listing').style = "display:none;";
                    document.getElementById('Singel').style = "display:block;";
                    if (typeof are.Eier === 'undefined') { document.getElementById('txtNavn').value = "Butikk"; } else { document.getElementById('txtNavn').value = are.Eier; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.Kunde_ID;}

                    document.getElementById('txtID').value = are.ID;
                    document.getElementById('txtKunde_ID').value = are.Kunde_ID;
                    document.getElementById('txtModell').value = are.Modell;
                    document.getElementById('txtSerie').value = are.Serienummer;
                    document.getElementById('txtLeverandor').value = are.Leverandor;
                    document.getElementById('txtMekanisme').value = are.Mekanisme;
                    document.getElementById('txtMerke').value = are.Merke;
                    document.getElementById('txtCaliber').value = are.Caliber;
                    document.getElementById('txtLopLengde').value = are.LopLengde;
                    document.getElementById('txtDato').value = are.Dato;
                    if (typeof are.Kundenavn === 'undefined') { document.getElementById('AEier').innerHTML = "Butikk"; } else { document.getElementById('AEier').innerHTML = are.Kundenavn; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.ID; }

                    document.getElementById('Utlever').hidden = true; document.getElementById('Retur').hidden = true;
                    if (are.Status == 'Utlevert') { document.getElementById('Retur').hidden = false; document.getElementById('Utlever').hidden = true;}
                    if (are.Status == 'Reservert') { document.getElementById('Utlever').hidden = false; document.getElementById('Retur').hidden = true;}

                    // document.getElementById('AEier').innerHTML = are.Kundenavn;
                }

                else if (myObj[1] != null) {

                    document.getElementById('Singel').style = "display:none;";
                    document.getElementById('Listing').style = "display:block;";
                    var listing = '';

                    listing = " <table style='width:100%;'> <tr> <td style='width:100px;' >Serie</td> <td style='width:250px;'>Eier</td> <td style='width:150px;'>Modell</td> <td style='width:150px;'>Mekanisme</td> </tr>";
                    for (var key in myObj) {
                        if (myObj.hasOwnProperty(key)) {

                            if (myObj[key].Eier == "Butikk") {
                                listing += "<tr> <td >" + myObj[key].Serienummer + "</td> <td>" + myObj[key].Eier + "</td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Mekanisme + "</td> </tr>";
                            }
                            else {
                                listing += "<tr> <td ><a style=\"cursor: pointer;\" onclick='javascript:document.getElementById(\"txtSerial\").value=\"" + myObj[key].Serienummer + "\";GetBySerial(\"" + myObj[key].ID + "\");'>" + myObj[key].Serienummer + "</a></td> <td>" + myObj[key].Eier + "</td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Mekanisme + "</td> </tr>";
                            }

                        }
                    }
                    listing += "</table>";

                    document.getElementById('Listing').innerHTML = listing;

                    Serial = "";
                }


            }
        };
        xhr.send();


    }

    else { alert("Ingentig å gjøre !"); document.getElementById('Singel').style = "display:none;"; }


}


function UtleverUpdateVapen(Status, Serienummer, Kunde_ID, Mekanisme) {

    var MJson = "";

    MJson += '{';
    MJson += '"Status" : "' + Status + '" ';
    MJson += ', "Serienummer" : "' + Serienummer + '"';
    MJson += ', "Mekanisme" : "' + Mekanisme + '"';
    MJson += ', "Switch" : "2"';
    MJson += ', "Kunde_ID" : "' + Kunde_ID + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName').replace('@', '_') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoUpdateVapen/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            
         
            document.getElementById('Retur').hidden = false; document.getElementById('Utlever').hidden = true;

            alert('Våpen ble utlevert korrekt.');
            GetBySerial(Serienummer);

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoReturnVapen(Status, Mekanisme, Serienummer, Kunde_ID, Eier, ID, DateReserved) {

    var MJson = "";
    if ((typeof ID === 'undefined') || (ID == 'undefined')) {

        var e = document.getElementById('drpSalgVapenMulti');
        var ID = e.options[e.selectedIndex].value;

    }


    MJson += '{';
    MJson += '"Status" : "' + Status + '" ';
    MJson += ', "Serienummer" : "' + Serienummer + '"';
    MJson += ', "Mekanisme" : "' + Mekanisme + '"';
    MJson += ', "Switch" : "1"';
    MJson += ', "Kunde_ID" : "' + Kunde_ID + '"';
    MJson += ', "DateReserved" : ""';
    MJson += ', "ID" : "' + ID + '"';
    MJson += ', "Eier" : "' + Eier + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoUpdateVapen/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            document.getElementById('Utlever').hidden = false; document.getElementById('Retur').hidden = true;
          
            alert('Våpenet korrekt mottatt.');
            GetBySerial(Serienummer);

        }
    };
    xhr.send(JSON.stringify(MJson));

}