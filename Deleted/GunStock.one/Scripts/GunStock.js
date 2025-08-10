/*!
 * GunStock v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */
var ServerURL = '../api/'
//var ServerURL = 'http://GunStockOne.serversiden.no/api/' 
 //var ServerURL = 'http://localhost:61424/api/'
// Set timeout variables.
var timoutWarning = 5000; // Display warning in 14 Mins.
var logoutUrl = 'index.html'; // URL to logout page.

//if (isIE()) { document.location.href = "Wrong.html"; }

DuppeEvent(document, 'DOMContentLoaded', function () {


    // let params = (new URL(document.location)).searchParams;
    var Password = ''; //params.get("Q"); document.getElementById('txtPassword').value = Password;
    var ClientName = ''; //params.get("ClientName");
    var CLientLevel = ''; //params.get("ClientName");



    if (Password == "") { Password = readCookie('SessionPassword'); }
    if (ClientName == "") { ClientName = readCookie('ClientName'); }
    if (CLientLevel == "") { CLientLevel = readCookie('CLientLevel'); }
    CheckSessionPass(Password, ClientName);

   // StartWarningTimer()
    msieversion()


   
    
    // Hent dato
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //Husk at Januar er null (0)
    var yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; }
   // document.getElementById('Mtxtdate').value = yyyy + '-' + mm + '-' + dd;
    //if (document.getElementById('Mtxtdate')) { document.getElementById('Mtxtdate').value = yyyy + '-' + mm + '-' + dd; }

         

   
       


        DoFillForm("txtSetting", 10, '');

        
        
       
        DoFillConfig()
        document.getElementById('Home').style = "display:Block;";

        DoFill("MdrpLeverandor", 1, '');
        DoFill("MdrpMekanisme", 2, '');
        DoFill("MdrpMerke", 3, '');
        DoFill("MdrpModel", 4, '');
        DoFill("BrukerDrpDown", 10, '');


       

        //Oppdater Våpen
        DoFill("MdrpStatus", 7, '');
        //var timer = setInterval(DoTime, 10000);
        // Hent dato
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //Husk at Januar er null (0)
        var yyyy = today.getFullYear();

        if (dd < 10) { dd = '0' + dd; } if (mm < 10) { mm = '0' + mm; }
        document.getElementById('Mtxtdate').value = yyyy + '-' + mm + '-' + dd;



        //event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;

        document.getElementById('txtSettingTimeOutValue').value = readCookie('ClientTimeOutValue');


        

        //  document.getElementById("FootStatus").innerHTML = "Logic By. Haavaldsen" + GetBrowserInfo();

       

  


    
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

function DoHTMLencode(TheString) {
    return TheString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(' ', "%20").replace(' ', "%20");
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

                //alert('Du Logges ut fordi session nøkkelen er ugyldig. '); 
                //alert('Du logges ikke av :-) , men send gjerne URL til meg så jeg ser hvor du er :-) '); 
                //document.location.href = 'index.html';
            }

        }
    };
    xhr.send();
}

function SendMail(Subject, Body) {
    
    var MJson = '{"case" : "SendMail", "Body" : "' + Body + '", "Subject" : "' + Subject + '"}';
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

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

    var myDate = new Date(date);

    var day = myDate.getDate();
    var monthIndex = myDate.getMonth;
    var year = myDate.getFullYear;

   // return "xx.xx.xx";
    return date;
  //return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function DaysDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();

    return today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016
    
}



// **********************************************
// *****         Login            ***************
// **********************************************


function DoDo() {
    setInterval(function () {
        var x = parseFloat(document.getElementById('txtSessionTimeOut').value) + 1;
        document.getElementById('LoggStatus').innerHTML = 'idle ' + x;
        if (x > 20) { document.title = 'GunStock_ONE (Idle)'; } else { document.title = 'GunStock_ONE (In use)';}
        document.getElementById('txtSessionTimeOut').value = x;
        CheckSessionPass(readCookie('SessionPassword'), readCookie('ClientName'))

       

    }, 5000);
}

// Check SessionPass
function CheckSessionPass(SessionPass, ClientName) {

    
    var MJson = '{"ClientSessionPassword" : "' + readCookie('SessionPassword') + '"}';
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

function writeCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 60 * 1000));
        /*date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));*/
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
    console.log(expires);
}

function DeletCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


// Start warning timer.
function StartWarningTimer() {
   
    document.getElementById('LoggStatus').innerHTML = 'Idle';
    DoDo();
    
}

// Reset timers.
function ResetTimeOutTimer() {
   
    if (document.getElementById('DoDo_IsRunning').value == '0') { StartWarningTimer(); document.getElementById('DoDo_IsRunning').value = '1';}
    document.getElementById('LoggStatus').innerHTML = 'Using';
    document.title = 'GunStock_ONE ';
    document.getElementById('txtSessionTimeOut').value = 0;
    SendPing('1');

    
}




//
// **********************************************
// *****        Login END         ***************
// **********************************************

function isIE() {
    var ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
    var msie = ua.indexOf('MSIE '); // IE 10 or older
    var trident = ua.indexOf('Trident/'); //IE 11

    return (msie > 0 || trident > 0);
}

function SendFeedBack() {

   
    var TextToSend = document.getElementById('txtFeedBack').value;
    var FeedBackJson = '';

    if (TextToSend == '') {
        alert('Du må skrive noe !');
        return;
    }

    FeedBackJson += '{';
    FeedBackJson += '"case" : "FeedBack" ';
    FeedBackJson += ', "Text" : "' + TextToSend + '"';
    FeedBackJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    FeedBackJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/?jsonstring=" + FeedBackJson;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert(xhr.responseText.toString());
            document.getElementById('txtFeedBack').value = '';
           

        }
    };
    xhr.send();
    //alert('Kommer Snart !/r/n' + TextToSend);
}

function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
    {
        //alert();
       
        alert(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))));
       // window.location.href = 'Gammel.html';
        //
    }
    else  // If another browser, return 0
    {
        //alert('otherbrowser');
    }

    return false;
}

function GetBrowserInfo() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    
   /* document.write(''
        + 'Browser name  = ' + browserName + '<br>'
        + 'Full version  = ' + fullVersion + '<br>'
        + 'Major version = ' + majorVersion + '<br>'
        + 'navigator.appName = ' + navigator.appName + '<br>'
        + 'navigator.userAgent = ' + navigator.userAgent + '<br>');
        */
    return '  Running --> ' + fullVersion + ", " + fullVersion + ', ' + majorVersion + ', ' + navigator.appName + ', ' + navigator.userAgent;
}

function DoFill(drpName, ConstantID, Vari,NoLeadBlank) {


    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFill/' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + readCookie('SessionPassword');
    var IfPost = 'ConstantID' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + readCookie('SessionPassword');


    var dropdown = document.getElementById(drpName);  
    dropdown.innerHTML = "";
    // Lag null linje
    if (typeof NoLeadBlank !== 'undefined') {
        addOption(dropdown, '', 0);
    } 
   
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            try {
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);

                for (var key in myObj) {
                    if (myObj.hasOwnProperty(key)) {
                        addOption(dropdown, myObj[key].Text, myObj[key].id);
                    }
                }
            }

            catch (Error) {}

            DoCheckForNew(); // Sjekk NySalg DropDown om ny kunde
        }
    };
    xhr.send(IfPost);

    function addOption(selectbox, text, value) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;

        selectbox.options.add(optn);
    }

}

function DoFillForm(drpName, ConstantID, Vari) {

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFillForm/' + ConstantID + "?Vari=" + DoHTMLencode(Vari) + "&SessionPassword=" + readCookie('SessionPassword');

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var myObj = JSON.parse(xhr.responseText);
            var myObj = JSON.parse(myObj);
            //console.log(xhr.responseText);


            var s = myObj;
            var txtX = "";

            var keys = [];
            for (var k in s) {
                //alert(k);
                txtX = drpName + k
                try {
                    document.getElementById(txtX).value = myObj[k].toString();
                }

                catch (err) { }

                try {
                    
                    if (myObj[k].toString() == "true") {
                        document.getElementById(txtX).checked = true;
                    }
                    else {
                        document.getElementById(txtX).checked = false;
                    }
                   
                    
                }
                catch (err) { }

            }

            // Sjekk Våpen historie for Salg, og om kunden er bannet
            if (document.getElementById('txtSalgid')) {
                DoFill('txtSelHistory', '6', document.getElementById('txtSalgid').value);
           
            DoCheckVandel(document.getElementById('txtSalgid').value);
            document.getElementById('butBlankCostumer').style = 'display:none;';
            document.getElementById('divSelKunde').style = "display:none;";
            }
        }
    };
    xhr.send();

}

function DoFillKundeOversikt(id) {
    DoFillForm('txtKunde', 5, id );
    DoFill('txtKundeHistory', '6', id);
    DoFill('txtKundeInfo', '6', id);

}





function GetBySerial(Serial) {

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL; 

    if (Serial != "") {
        url = ServerURL + "lookup/0_" + Serial + "?SessionPassword=" + readCookie('SessionPassword');
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
                    if (typeof are.Eier === 'undefined') { document.getElementById('txtNavn').value = "Butikk"; } else { document.getElementById('txtNavn').value = are.Eier;}
                    
                    document.getElementById('txtModell').value = are.Modell;
                    document.getElementById('txtSerie').value = are.Serienummer;
                    document.getElementById('txtLeverandor').value = are.Leverandor;
                    document.getElementById('txtMekanisme').value = are.Mekanisme;
                    document.getElementById('txtMerke').value = are.Merke;
                    document.getElementById('txtCaliber').value = are.Caliber;
                    document.getElementById('txtLopLengde').value = are.LopLengde;
                    document.getElementById('txtDato').value = are.Dato;
                    if (typeof are.Kundenavn === 'undefined') { document.getElementById('AEier').value = "Butikk"; } else { document.getElementById('AEier').value = are.Kundenavn; }
                   // document.getElementById('AEier').innerHTML = are.Kundenavn;
                }

                else if (myObj[1] != null) {

                    document.getElementById('Singel').style = "display:none;";
                    document.getElementById('Listing').style = "display:block;";
                    var listing = '';

                    listing = " <table style='width:91%;'> <tr> <td >Serie</td> <td>Modell</td> <td>Leverandør</td> </tr>";
                    for (var key in myObj) {
                        if (myObj.hasOwnProperty(key)) {

                            listing += "<tr> <td ><a onclick='javascript:document.getElementById(\"txtSerial\").value=\"" + myObj[key].Serienummer + "\";GetBySerial(\"" + myObj[key].Serienummer + "\");'>" + myObj[key].Serienummer + "</a></td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Leverandor + "</td> </tr>";


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

    function MDoPost() {

        if (Mcheck.checked == false) { document.getElementById('Mresult').style = "background-color: #FF0000; color: #008000; font-weight: bolder;"; document.getElementById('Mresult').innerHTML = "Du må krysse av for godkjenning"; return;}
        var MJson = "";

        MJson += '{';
        MJson += '"Status" : "1" ';
        MJson += ', "ID" : "' + document.getElementById('MtxtID').value + '" '; 
        MJson += ', "Switch" : "' + document.getElementById('MSwitch').value + '" '; 
        MJson += ', "date" : "' + document.getElementById('Mtxtdate').value + '" ';
        MJson += ', "DateOppdatert" : "' + document.getElementById('MtxtDateOppdatert').value + '" ';
        MJson += ', "Serienummer" : "' + document.getElementById('MtxtSerienummer').value.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Leverandor" : "' + document.getElementById('MdrpLeverandor').options[document.getElementById('MdrpLeverandor').selectedIndex].text.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Mekanisme" : "' + document.getElementById('MdrpMekanisme').options[document.getElementById('MdrpMekanisme').selectedIndex].text.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Merke" : "' + document.getElementById('MdrpMerke').options[document.getElementById('MdrpMerke').selectedIndex].text.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Modell" : "' + document.getElementById('MdrpModel').options[document.getElementById('MdrpModel').selectedIndex].text.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Status" : "' + document.getElementById('MdrpStatus').options[document.getElementById('MdrpStatus').selectedIndex].value.replace(/["']/g, '\'\'') + '"';
        MJson += ', "Caliber" : "' + document.getElementById('MtxtCaliber').value.replace(/["']/g, '\'\'') + '"';
        MJson += ', "LøpLengde" : "' + document.getElementById('MtxtLopLengde').value.replace(/["']/g, '\'\'') + '"';
        MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
        MJson += ' } ';

        // Populate Receipt
        document.getElementById('M2txtdate').value = document.getElementById('Mtxtdate').value;
        document.getElementById('M2txtSerienummer').value = document.getElementById('MtxtSerienummer').value.replace(/["']/g, '\'\'');
        document.getElementById('M2txtLeverandor').value = document.getElementById('MdrpLeverandor').options[document.getElementById('MdrpLeverandor').selectedIndex].text.replace(/["']/g, '\'\'');
        document.getElementById('M2txtMerke').value = document.getElementById('MdrpMerke').options[document.getElementById('MdrpMerke').selectedIndex].text.replace(/["']/g, '\'\'');
        document.getElementById('M2txtModel').value = document.getElementById('MdrpModel').options[document.getElementById('MdrpModel').selectedIndex].text.replace(/["']/g, '\'\'');
        document.getElementById('M2txtMekanisme').value = document.getElementById('MdrpMekanisme').options[document.getElementById('MdrpMekanisme').selectedIndex].text.replace(/["']/g, '\'\'');
        document.getElementById('M2txtCaliber').value = document.getElementById('MtxtCaliber').value.replace(/["']/g, '\'\'');
        document.getElementById('M2txtLopLengde').value = document.getElementById('MtxtLopLengde').value.replace(/["']/g, '\'\'');
        

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "DoInsertSQL/";
       

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);
                CloseAll();
                document.getElementById('Inserted').style = "display:block;";
                document.getElementById('M2result').style = "background-color: #008000; color: ##FFFFFF; font-weight: bolder;height: 800px;"
                document.getElementById('M2result').innerHTML = xhr.responseText.toString();
                document.getElementById('Mcheck').checked = false;

            }
        };
        xhr.send(JSON.stringify(MJson));

}

function DoPostCostumerUpdate() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "2" ';
    MJson += ', "id" : "' + document.getElementById('DoModifyCostumerId').value + '" ';
    MJson += ', "Kundenavn" : "' + document.getElementById('SaveKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('SaveAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('SavePoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('SaveTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";
    

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            DoFillcostumer('');
        }
    };
    xhr.send(JSON.stringify(MJson));
   
}

function DoPostCostumerInsert() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "1" ';
    //MJson += ', "id" : "' + document.getElementById('DoModifyCostumerId').value + '" ';
    MJson += ', "Kundenavn" : "' + document.getElementById('txtSalgKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtSalgAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtSalgPoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtSalgTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            alert('Kunden Ble Lagt inn');
            butSelNewCostumer.style = "visibility:hidden";
           // DoFillcostumer('');
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoFillcostumer(S) {
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";
    var urlD = "";
    if (S == "") { urlD = ServerURL + "costumer/0"; } else { urlD = ServerURL + "costumer/" + S; }
  


    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table style='width: 90%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Navn&nbsp;</td>  <td >Adresse</td> <td >Poststed</td> <td>Telefon</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifycostumer(\"" + key + "\",\"" + myObjE[key].ID + "\",\"" + myObjE[key].Kundenavn + "\",\"" + myObjE[key].Adresse + "\",\"" + myObjE[key].Poststed + "\",\"" + myObjE[key].Telefon + "\");\' alt='' style='width:20px;' src='img/no-stock2.png' /></a></td><td ><a onclick=\"CloseAll();DoFillKundeOversikt('" + myObjE[key].ID + "');document.getElementById('VapenList').style = 'display:block;height: 1001px;';\" href=\"#\">" + myObjE[key].Kundenavn + "</a></td>  <td >" + myObjE[key].Adresse + "</td> <td >" + myObjE[key].Poststed + "</td> <td >" + myObjE[key].Telefon + "</td>  </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('KundeListing').innerHTML = Linje + "&nbsp;<br />";

        }
    };
    xhr.send();

    

    document.getElementById('KundeListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoModifycostumer(key, id, Kundenavn, Adresse, Poststed, Telefon) {
  
    var ColorLine = "FFFFFF";
    var DoHTML = "";
    // var DoHTML = "<td><img onclick=\'DoModifyListing(\"" + key + "\");\' alt='' style='width:10px;' src='img/no-stock2.png' /></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> ";

    //var DoHTML = "<tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;</td><td >&nbsp;</td>  <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td>&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> </tr>";
    DoHTML += "<td><input type=\"hidden\" value=\"" + id + "\" id=\"DoModifyCostumerId\" /><input id=\"Buon1\" onclick=\"DoPostCostumerUpdate();\" type=\"button\" value=\"Lagre\" /></td> <td ><input id=\"SaveKundenavn\" type=\"text\" value=\"" + Kundenavn + "\" /></td> <td ><input id=\"SaveAdresse\" type=\"text\" value=\"" + Adresse + "\" /></td><td ><input id=\"SavePoststed\" type=\"text\" value=\"" + Poststed + "\" /></td>  <td ><input id=\"SaveTelefon\" type=\"text\" value=\"" + Telefon + "\" /></td>  ";
    //DoHTML += " <td colspan=\"5\">&nbsp;<input id=\"testeret\" type=\"text\" value=\"" + Kundenavn + "\" /></td>"

    document.getElementById('list' + key).innerHTML = DoHTML;

}

// **********************************************
// ********        LAGER          ***************
// **********************************************

function DoFillListing(S) {
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";
    var urlD = "";
    var Eier = "";
    var Caliber = "";
    if (typeof S === 'undefined') {
        S = ""
    }
    if (S == "") { urlD = ServerURL + "lookup/0"; } else { urlD = ServerURL + "lookup/" + S.replace('/','¤'); }
    //urlD = encodeURIComponent(urlD);
    //var res = encodeURIComponent(urlD);
    var xhr = new XMLHttpRequest(),
        method = "GET", url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table style='width: 90%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Leverandor</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier.replace(/\r?\n|\r/, "").replace(/['"]+/g, '');
                    }

                    if (typeof myObjE[key].Caliber === 'undefined') {
                        Caliber = "-";
                    }
                    else {
                        Caliber = myObjE[key].Caliber.replace(/\r?\n|\r/, "").replace(/['"]+/g, '');
                    }

                   


                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifyListing(\"" + myObjE[key].DateOppdatert + "\",\"" + myObjE[key].ID + "\",\"" + myObjE[key].Leverandor + "\",\"" + myObjE[key].Merke + "\",\"" + myObjE[key].Modell + "\",\"" + Caliber + "\",\"" + myObjE[key].LopLengde + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Status + "\",\"" + myObjE[key].Mekanisme + "\",\"" + Eier + "\");\' alt='' style='width:20px;' src='img/no-stock2.png' /></a></td><td >" + myObjE[key].Status + "&nbsp;(" + Eier + ")" + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoModifyListing(DateOppdatert, ID, lLeverandor, lMerke, lModell, lCaliber, lLopLengde, lSerienummer, lStatus, lMekanisme, lEier) {

    document.getElementById('MSwitch').value = "2";
    CloseAll(); document.getElementById('Insert').style = 'display:block;height: 1001px;';

    document.getElementById('MtxtID').value = ID;
    document.getElementById('MtxtSerienummer').value = lSerienummer;
    SelectElement("MdrpStatus", lStatus);
    SelectElement("MdrpMerke", lMerke);
    SelectElement("MdrpLeverandor", lLeverandor);
    SelectElement("MdrpMekanisme", lMekanisme);
    SelectElement("MdrpModel", lModell);
    document.getElementById('MtxtCaliber').value = lCaliber;
    document.getElementById('MtxtLopLengde').value = lLopLengde;
    if (lEier != "undefined") {
        document.getElementById('MdrpEier').value = lEier.replace(/['"]+/g, '');
    } else { document.getElementById('MdrpEier').value = 'Butikk'; }
    document.getElementById('MdrpEier').disabled = true;
    //DoFillForm('txtSalg', '1', SelectedV);  
    document.getElementById('MtxtDateOppdatert').value = DateOppdatert;
    

}

function DoNew(NSerial) {

    if (typeof NSerial === 'undefined') { NSerial = '';}
    CloseAll(); 
    document.getElementById('Insert').style = 'display:block;height: 1001px;';
    document.getElementById('MSwitch').value = "1";
    document.getElementById('MtxtSerienummer').value = NSerial;

    DoFill("MdrpLeverandor", 1, '',1);
    DoFill("MdrpMekanisme", 2, '',1);
    DoFill("MdrpMerke", 3, '',1);
    DoFill("MdrpModel", 4, '',1);
    SelectElement("MdrpStatus", 1);

    document.getElementById('MtxtCaliber').value = '';
    document.getElementById('MtxtLopLengde').value = '';
    document.getElementById('MdrpEier').value = 'Butikk';
    document.getElementById('MdrpEier').disabled = true;
    

}

function SelectElementValue(id, valueToSelect) {
    var dd = document.getElementById(id);
    for (var i = 0; i < dd.options.length; i++) {
        if (dd.options[i].value === valueToSelect) {
            dd.selectedIndex = i;
            break;
        }
        else { dd.selectedIndex = 0; }
    }
}

function SelectElement(id, valueToSelect) {
    var dd = document.getElementById(id);
    for (var i = 0; i < dd.options.length; i++) {
        if (dd.options[i].text === valueToSelect) {
            dd.selectedIndex = i;
            break;
        }
        else { dd.selectedIndex = 0;}
    }
}

function DoModifyListing2(key, lLeverandor, lMerke, lModell, lCaliber, lLopLengde, lSerienummer, lMekanisme) {

    var ColorLine = "FFFFFF";
    var DoHTML = "";
    // var DoHTML = "<td><img onclick=\'DoModifyListing(\"" + key + "\");\' alt='' style='width:10px;' src='img/no-stock2.png' /></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> ";

    //var DoHTML = "<tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;</td><td >&nbsp;</td>  <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td>&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> </tr>";
    DoHTML += "<td><input id=\"Buon1\" type=\"button\" value=\"Lagre\" /></td><td >Dato</td>  <td ><input id=\"LLeverandor\" type=\"text\" value=\"" + lLeverandor + "\" /></td> <td ><input id=\"LMerke\" type=\"text\" value=\"" + lMerke + "\" /></td> <td ><input id=\"LMerke\" type=\"text\" value=\"" + lModell + "\" /></td> <td ><input id=\"LMerke\" type=\"text\" value=\"" + lCaliber + "\" /></td> <td><input id=\"LMerke\" type=\"text\" value=\"" + lLopLengde + "\" /></td> <td ><input id=\"LMerke\" type=\"text\" value=\"" + lSerienummer + "\" /></td> <td ><input id=\"LMerke\" type=\"text\" value=\"" + lMekanisme + "\" /></td> ";
    document.getElementById('list' + key).innerHTML = DoHTML;

}





// **********************************************
// *****           LAGER  END      ***************
// **********************************************

// **********************************************
// *****         Utlevering       ***************
// **********************************************

function UtleverFnnVapenSerial(Serial) {

   
    if (Serial != "") {

        DoFill("UtleveringVapenMulti", 9, Serial);
        document.getElementById('UtleveringVapenMulti').style = "display:block;width:500px;";
    }

    else { alert("Ingentig å gjøre !"); document.getElementById('Singel').style = "display:none;"; document.getElementById('UtleveringVapenDIV').style = "display:none;"; }


}

function UtleverVapenSerial(Serial) {

    if ((typeof Serial === 'undefined') || (Serial == 'undefined') ) {

        var e = document.getElementById('UtleveringVapenMulti');
        var Serial = e.options[e.selectedIndex].value;

    }
  
    

    var xhr = new XMLHttpRequest(),
        method = "GET",
       url = 'http://skittjakt.serversiden.no/api/';

    if (Serial != "") {
        url = ServerURL + "lookup/9_" + Serial + "_" + readCookie('ClientName').replace('@', '?');
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);
                var are = myObj[0]; // get array number1
                

                if (are == null) { alert('Kan ikke utleveres!'); document.getElementById('UtleveringVapenDIV').style = "display:none;"; document.getElementById('UtleveringVapenInfo').innerHTML = ''; }

                else if (are.Status == 3) {

                    alert('Våpenet er allerede utlevert!');
                    document.getElementById('UtleveringVapenDIV').style = "display:none;";
                    document.getElementById('UtleveringVapenInfo').innerHTML = '';
                    document.getElementById('UtleveringVapenInfo').style = "display:none;";
                }

                else if (are != null)  {
                    if (parseInt(are.Kunde_ID, 10) > 0) {

                        var Sout = '<h2>' + are.Merke + '</h2> <br> Leverandør : ' + are.Leverandor + '<br />Mekanisme : ' + are.Mekanisme + "<br />Kaliber : " + are.Caliber + "<br />Løp Lengde : " + are.LopLengde;
                       
                        document.getElementById('UtleveringVapenKundenavn').value = are.Kundenavn;
                        document.getElementById('UtleveringVapenAdresse').value = are.Adresse;
                        document.getElementById('UtleveringVapenPoststed').value = are.Poststed;
                        document.getElementById('UtleveringVapenTelefon').value = are.Telefon;


                        document.getElementById('UtleveringVapenInfo').innerHTML = Sout + ' <input style="width:100px;" onclick="UtleverUpdateVapen(\'3\',\'' + are.Serienummer + '\',\'' + are.Kunde_ID + '\',\'' + are.Mekanisme + '\');" id="butUtleverNow" type="button" value="UTLEVER" />';
                        document.getElementById('UtleveringVapenImg').src = 'img/WEB_Image Browning BL Gr 2 S 22LR Lever action  browning-bl-gr-2_s_22lr-2014481601.Jpeg';
                        document.getElementById('UtleveringVapenDIV').style = "display:block;";

                      
                       
                    }
                    else {
                        

                       
                        document.getElementById('UtleveringVapenImg').src = 'img/GunOtherPerson_200x100.png';
                        document.getElementById('UtleveringVapenDIV').style = "display:none;";

                    }


                }


                else {
                    document.getElementById('txtSelVapen').innerHTML = '';
                    document.getElementById('imgSelVapen').src = 'img/GunNotFound.png';
                    document.getElementById('butSalgSalg').style = "visibility:hidden";
                    document.getElementById('butSalgCheck').style = "visibility:visible";
                    


                }



            }
        };
        xhr.send();


    }

    else { alert("Ingentig å gjøre !"); document.getElementById('Singel').style = "display:none;"; document.getElementById('UtleveringVapenDIV').style = "display:none;";}


}

function UtleverUpdateVapen(Status, Serienummer, Kunde_ID, Mekanisme) {

    var MJson = "";

    MJson += '{';
    MJson += '"Status" : "' + Status + '" ';
    MJson += ', "Serienummer" : "' + Serienummer + '"';
    MJson += ', "Mekanisme" : "' + Mekanisme + '"';
    MJson += ', "Switch" : "2"';
    MJson += ', "Kunde_ID" : "' + Kunde_ID + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName').replace('@','_') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoUpdateVapen/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            //
            DoFillKundeOversikt(Kunde_ID)
            document.getElementById('VapenList').style = "visibility:visible;";
            document.getElementById('UtleveringVapen').style = "display:none;";
            
            

        }
    };
    xhr.send(JSON.stringify(MJson));

}

// **********************************************
// *****      Utlevering END      ***************
// **********************************************

// **********************************************
// *****           Rapport           ************
// **********************************************

function RapportCloseAll() {
    document.getElementById('RapportID0').style = "display:none;";
    document.getElementById('RapportID1').style = "display:none;";
    document.getElementById('RapportID2').style = "display:none;";
}

function DoFillRapport() {

    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    //alert(); 
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "lookup/71_" + Status + '|' + Periode + '|' + Ar;
    console.log('-->' + url + '<---');

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            console.log(' ---------------------   >' + xhr.responseText + '<-----------------');
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);
            
            //console.log(xhr.responseText);
            Linje = " <table style='width: 90%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td style='width: 50px;'>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier;
                    }

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifyListing(\"" + key + "\",\"" + myObjE[key].Leverandor + "\",\"" + myObjE[key].Merke + "\",\"" + myObjE[key].Modell + "\",\"" + myObjE[key].Caliber + "\",\"" + myObjE[key].LopLengde + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Status + "\",\"" + myObjE[key].Mekanisme + "\",\"" + Eier + "\");\' alt='' style='width:20px;' src='img/no-stock2.png' /></a></td><td >" + myObjE[key].Status + ", " + Eier + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoPrintRapport() {
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var Periode2 = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    SendError(readCookie('ClientName') + ' Gjør en Rapportutskrift', 'Skriver ut Rapport');
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Statusen = "";
    var Merke = "";
    var Modell = "";
    var LopLengde = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "lookup/71_" + Status + '|' + Periode + '|' + Ar;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);
            var TotPage = 39; //27
            var Temp = 0;
            var PageNumber = 1;
            var TotItem = myObjE.length;
            var Title = "";

            try {
                Title = myObjE[0].Status.split(' ')[1].toString()
            }
            catch (Error){
                Title = myObjE[0].Status.split(' ')[0].toString()
            }

            Linje = " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
            Linje += "<p style='font - weight: bold; font - size: xx-large'>  Våpen -- " + Title + "Rapport -- Skitt Fiske AS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";
            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td>Leverandør</td> <td >Caliber</td> <td>Løp</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {

                if (Temp == TotPage) {
                    PageNumber++;
                    Linje += "</table>SideNummer : " + PageNumber;
                    Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  ><br /><br />";
                    Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Merke</td> <td>Modell</td><td>Leverandør</td> <td >Caliber</td> <td>Løp</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";
                    Linje += "<p style='font - weight: bold; font - size: xx-large'>  Våpen -- SalgsRapport -- Skitt Fiske AS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                    Temp = 0;
                } else { Temp++; }

                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') { Eier = "Butikk"; } else { Eier = myObjE[key].Eier; }
                    if (typeof myObjE[key].Status === 'undefined') { Statusen = "-"; } else { Statusen = myObjE[key].Status.substring(0, 3); }
                    if (typeof myObjE[key].Merke === 'undefined') { Merke = "-"; } else { Merke = myObjE[key].Merke.substring(0, 10); }
                    if (typeof myObjE[key].Modell === 'undefined') { Modell = "-"; } else { Modell = myObjE[key].Modell.substring(0, 25); }
                    if (typeof myObjE[key].LopLengde === 'undefined') { LopLengde = "-"; } else { LopLengde = myObjE[key].LopLengde.substring(0, 4); }
                    if (typeof myObjE[key].Leverandor === 'undefined') { Leverandor = "-"; } else { Leverandor = myObjE[key].Leverandor.substring(0, 25); }
                    
                    

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";font-size: x-small;' id='list" + key + "'><td >" + Statusen + ", " + Eier.substring(0, 20) + "</td><td >" + formatDate(myObjE[key].Dato) + "." + "</td>  <td >" + Merke + "</td> <td >" + Modell + "</td> <td >" + Leverandor + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            PageNumber++;
            Linje += "</table>SideNummer : " + PageNumber;
            Linje += "<br />";
            Linje += " <p style='font - weight: bold; font - size: x - large'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tottalt " + myObjE[key].Status + " : " + TotItem + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + DaysDate() + ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signert av " + readCookie('CLientName') + "&nbsp; :&nbsp; _________________________________</p>";
            Linje += "<p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto: hso@skittfiske.no'>Våpenansvarlig : Hening Solem (hso@skittfiske.no</a>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Skitt Fiske AS, Nygårdsveien 78, 3225 Sandefjord<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;www.skittfiske.no , service@skittfiske.no, Telefon : +47 33 46 07 57</p>";

            document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

            var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
            RapportWindow.document.write(Linje);
            
            RapportWindow.print();
            
        }
    };
    xhr.send();

    document.getElementById('LagerListing').innerHTML = Linje + "wery" + "<br />";
}

function DoMailRapport() {
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    //SendError(readCookie('ClientName') + ' Gjør en Rapportutskrift', 'Skriver ut Rapport');
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "lookup/71_" + Status + '|' + Periode + '|' + Ar;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table align='center' style='width: 90%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier;
                    }

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td >" + myObjE[key].Status + ", " + Eier + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            SendMail('Test', Linje);

        }
    };
    xhr.send();

    document.getElementById('LagerListing').innerHTML = Linje + "wery" + "<br />";
}



function DoPDF() {


}

// **********************************************
// *****           Rapport END        ***********
// **********************************************

// **********************************************
// *****           Salg           ***************
// **********************************************

function DoCheckForNew() {
    if (document.getElementById('drpSelKunde').options.length == 0) {
        butSelNewCostumer.style = "visibility:visible";
    }
    else {
        butSelNewCostumer.style = "visibility:hidden";
    }
}

function DoGetWeaponSerials(Serial) {
    if (Serial != "") {

        DoFill("drpSalgVapenMulti", 9, Serial);
        document.getElementById('drpSalgVapenMulti').style = "display:block;width:280px;";
    }

}

function DoValidateFields() {
    document.getElementById('drpSalgVapenMulti').style = 'display:none;'; 
    document.getElementById('butSalgSalg').style = "visibility:hidden";
    document.getElementById('butSalgCheck').style = "visibility:visible";
    if ((txtSalgKundenavn.value.length > 1) & (txtSalgAdresse.value.length > 1) & (txtSalgPoststed.value.length > 1) & (txtSalgTelefon.value.length > 1)) {
        document.getElementById('txtSalgSerienummer').disabled = false;
    } else { document.getElementById('txtSalgSerienummer').disabled = true; }
}

function DoBlankCostumer() {

    document.getElementById('divSelKunde').style = 'display:none;';
    butSelNewCostumer.style = "visibility:visible";
    document.getElementById('butBlankCostumer').style = 'display:none;';

    document.getElementById('txtSalgAdresse').value = '';
    document.getElementById('txtSalgPoststed').value = '';
    document.getElementById('txtSalgTelefon').value = '';
        
    
}

function DoGetCostumer() {
    document.getElementById('txtSalgInfo').value = '';
        
    var e = document.getElementById('drpSelKunde');
    var SelectedV = e.options[e.selectedIndex].value;
    writeCookie('TempUserID', SelectedV, 30);
   // SendHistory(readCookie('CLientName'), 'CostumerCard.html?ID=' + SelectedV);
    DoFillForm('txtSalg', '1', SelectedV);


    function Search (){
        if (this.value.length > 3)
        { DoFill('drpSelKunde', 5, this.value); document.getElementById('divSelKunde').style = 'display:none;'; }
        else
        { document.getElementById('drpSelKunde').innerHTML = ''; document.getElementById('divSelKunde').style = 'display:block;'; }; DoCheckForNew();
    }


}

function DoNewCostumer() {

    DoPostCostumerInsert();
    
}

function DoCheckVandel(ID) {

 
    if (document.getElementById('txtSalgNotOK').value == 'True')
    {       
     
        document.getElementById('txtSalgSerienummer').value = 'Salg Ikke Mulig !!';
        document.getElementById('txtSalgSerienummer').disabled = true;
    }
    else
    {
     
        document.getElementById('txtSalgSerienummer').value = '';
        document.getElementById('txtSalgSerienummer').disabled = false;
    }

}

function GetVapenSerial(ID) {

    

    if ((typeof ID === 'undefined') || (ID == 'undefined')) {

        var e = document.getElementById('drpSalgVapenMulti');
        var ID = e.options[e.selectedIndex].value;

    }

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = 'http://skittjakt.serversiden.no/api/DoFill/1?Vari=1';

    if (ID != "") {
        url = ServerURL + "lookup/72_" + ID;
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);
                var are = myObj[0]; // get array number1

                if ((myObj[0] != null) & (myObj[1] == null)) {
                    if (parseInt(are.Kunde_ID, 10) > 0) {
                        document.getElementById('txtSelVapen').innerHTML = "";
                        document.getElementById('imgSelVapen').src = 'img/GunOtherPerson_200x100.png';
                        document.getElementById('butSalgSalg').style = "visibility:hidden";
                        document.getElementById('butSalgCheck').style = "visibility:visible";


                    }
                    else {
                        var Sout = '<h2>' + are.Merke + '</h2> ' + are.Leverandor + '<br />' + are.Mekanisme + ", " + are.Caliber + ", " + are.LopLengde;

                        /*
                        document.getElementById('txtNavn').value = are.ID;
                        document.getElementById('txtModell').value = are.Modell;
                        document.getElementById('txtSerie').value = are.Serienummer;
                        document.getElementById('txtLeverandor').value = are.Leverandor;
                        document.getElementById('txtMekanisme').value = are.Mekanisme;
                        document.getElementById('txtMerke').value = are.Merke;
                        document.getElementById('txtCaliber').value = are.Caliber;
                        document.getElementById('txtLopLengde').value = are.LopLengde;
                        document.getElementById('txtDato').value = are.Dato;
                        document.getElementById('AEier').innerHTML = are.Kundenavn;
                        */
                        document.getElementById('txtSelVapen').innerHTML = Sout;
                        document.getElementById('imgSelVapen').src = 'img/WEB_Image Browning BL Gr 2 S 22LR Lever action  browning-bl-gr-2_s_22lr-2014481601.Jpeg';
                        document.getElementById('butSalgSalg').style = "visibility:visible";
                        document.getElementById('butSalgCheck').style = "visibility:hidden";
                        document.getElementById('txtSelVapenID').value = are.ID;
                        document.getElementById('txtSalgMekanisme').value = are.Mekanisme;

                    }


                }

                
                else
                {
                    document.getElementById('txtSelVapen').innerHTML = '';
                    document.getElementById('imgSelVapen').src = 'img/GunNotFound.png';
                    document.getElementById('butSalgSalg').style = "visibility:hidden";
                    document.getElementById('butSalgCheck').style = "visibility:visible";
                    

                }
                
               

            }
        };
        xhr.send();


    }

    else { alert("Ingentig å gjøre !"); document.getElementById('Singel').style = "display:none;"; }


}

function DoUpdateVapen(Status, Mekanisme, Serienummer, Kunde_ID, Eier, ID, Kundeid) {

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
           
            // Sjekk Våpen historie for Salg, og om kunden er bannet
            DoFill('txtSelHistory', '6', document.getElementById('txtSalgid').value);

            //
            var txt;
            var r = confirm("Utlevere med en gang ?");
            if (r == true) {
                UtleverUpdateVapen('3', Serienummer, Kunde_ID, Mekanisme);
                txt = "Våpenet ble UTLEVERT !!!";
            } else {
                txt = "våpenet Ble IKKE utlevert !!!";
            }
            alert(txt);

            //
            document.getElementById('butSalgSalg').style = "visibility:hidden";
            document.getElementById('butSalgCheck').style = "visibility:visible";
            document.getElementById('VapenList').style = "visibility:visible";
            document.getElementById('Salg').style = "visibility:hidden";
            
           

            
             DoFillKundeOversikt(Kunde_ID)

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoFillHistory() {

    var T = 1;
    var Linje = "";
    var UserHistory = '{';
    UserHistory += '"ActionType" : "2"';
    UserHistory += ' } ';

    if (document.cookie.indexOf("ActiveTab") === -1) { DoNewBrowserTab('front.html'); } else { T = readCookie('ActiveTab'); }

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
                    Linje += "<h2>" + myObjE[key].HistoryTitle + "</h2><br /><br />";

                    Linje += "<h1  onclick=\"getElementById('BDIV" + T + "').innerHTML='" + myObjE[key].User_URL + "';getElementById('TAB" + T + "').src='" + myObjE[key].User_URL + "';getElementById('BTN" + T + "').innerHTML='" + myObjE[key].HistoryTitle + "';\" target =\"TAB" + T + "\"><br />" + myObjE[key].HistoryText + "</h1>";
                    //User_Name, User_URL, User_TimeStamp
                }

                Linje += "</div><br />";
            }



            document.getElementById('LastHistory').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();


}



// **********************************************
// *****           Salg  END      ***************
// **********************************************
 


// *****************  Config ********************
function DoFillConfig() {
    // Fill Config Boxes
    DoFill("txtListMekanisme", 2, '',1);
    DoFill("txtListLeverandor", 1, '');
    DoFill("txtListMerke", 3, '');
    DoFill("drpEditLeverandorMerker", 42, ''); //42
    //DoFill("MdrpModel", 4, '');
}



function DoRefillLeverandorList() {
    var select = document.getElementById("txtListLeverandor");
    var length = select.options.length;
    for (i = 0; i <= length; i++) {
        select.options[i] = null;
    }
    DoFill("txtListLeverandor", 1, '');
}

function DoMakeNewLeverandor() {
    document.getElementById('txtEditLeverandorID').value = "";
    document.getElementById('txtEditLeverandor').value = "";
    document.getElementById('txtEditLeverandorAdresse').value = "";
    document.getElementById('txtEditLeverandorPost').value = "";
    document.getElementById('txtEditText').value = "";
    document.getElementById('txtEditLeverandorTelefon').value = "";

    var select = document.getElementById("txtListLeverandorMerker");
    var length = select.options.length;
    for (i = 0; i <= length; i++) {
        select.options[i] = null;
    }

    document.getElementById('butUpdateLev').style = "visibility: visible;";
    document.getElementById('butAddLev').style = "visibility: visible;";
    document.getElementById('txtEditLeverandor').disabled = false;
    document.getElementById('butAddLev').disabled = true;
    document.getElementById('txtListLeverandor').disabled = true;
    


    if (document.getElementById('txtEditLeverandor').value = "") { alert("Skriv inn et leverandørnavn :-)") } //else { DoInsertLeverandor()}
  

}

function DoInsertModell() {
    var MJson = "";
    
    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditModellID').value + '" ';
    MJson += ', "Merke" : "' + document.getElementById('txtEditModell').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerke').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoModell/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = Http.responseText.toString();
            DoFill('txtListModell', 41, txtEditMerkeID.value);
            document.getElementById('txtEditModell').value = '';
            document.getElementById('txtEditModellID').value = '';

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoDeleteModell(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Merke" : "-1"';
    
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoModell/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            DoFill('txtListModell', 41, txtEditMerkeID.value);
            // document.getElementById('txtEditModell').value = '';
            document.getElementById('txtEditModellID').value = '';
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoInsertMekanisme() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditMekanismeID').value + '" ';
    MJson += ', "Mekanisme" : "' + document.getElementById('txtEditMekanisme').value.replace(/["']/g, '\'\'') + '"';
    //MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerkeID').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMekanisme/";

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            DoFill('txtListMekanisme', 2, '');
        }
    };
    xhr.send(JSON.stringify(MJson));
}

function DoDeleteMekanisme(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Mekanisme" : "-1"';

    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMekanisme/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("txtEditMekanismeID").value = '';
            document.getElementById("txtEditMekanisme").value = '';
            DoFill('txtListMekanisme', 2, '');
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoInsertMerke() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditMerkeID').value + '" ';
    MJson += ', "Merke" : "' + document.getElementById('txtEditMerke').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerkeID').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMerke/";

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            document.getElementById("txtEditMerkeID").value = document.getElementById('txtEditMerke').value;
            DoFill('txtListMerke', 3, '');
        }
    };
    xhr.send(JSON.stringify(MJson));
}

function DoDeleteMerke(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Merke" : "-1"';

    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMerke/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            document.getElementById("txtEditMerkeID").value = '';
            DoFill('txtListMerke', 3, '');
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoInsertLeverandor(){
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditLeverandorID').value + '" ';
    MJson += ', "Leverandor" : "' + document.getElementById('txtEditLeverandor').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtEditLeverandorAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtEditLeverandorPost').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Text" : "' + document.getElementById('txtEditText').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merker" : "' + document.getElementById('txtEditLeverandorMerker').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtEditLeverandorTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';


    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLeverandor/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            DoRefillLeverandorList();
            //document.getElementById("MidLev").innerHTML = xhr.responseText.toString();
            document.getElementById('butAddLev').disabled = false;
            document.getElementById('txtEditLeverandor').disabled = true;
            document.getElementById('txtListLeverandor').disabled = false;
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoDeleteLeverandor(ID) {

    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "-1" ';
    MJson += ', "DeleteID" : "' + ID + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLeverandor/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            DoRefillLeverandorList();
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoFillLeverandorFields() {
    
    document.getElementById('butUpdateLev').style = "visibility: visible;";
    //document.getElementById('butAddLev').style = "visibility: hidden";
    //document.getElementById('txtEditLeverandor').disabled = "disabled";
   // txtEditLeverandor
    var e = document.getElementById('txtListLeverandor');
    var SelectedID = e.options[e.selectedIndex].value;
    var SelectedV = e.options[e.selectedIndex].text;
    txtEditLeverandor.value = SelectedV;
    //MidLev.innerHTML = SelectedV;
    DoGetLeverandor(SelectedID);
}

function DoAddMerker() {
    if (document.getElementById('txtEditLeverandor').value == "") { alert('Velg Leverandør !!') }
    else {
    var e = document.getElementById('drpEditLeverandorMerker');
        var Merke = e.options[e.selectedIndex].text;
        var Value = e.options[e.selectedIndex].value;
    var x = document.getElementById("txtListLeverandorMerker");
    var option = document.createElement("option");
        option.text = Merke;
        option.value = Value;
        x.add(option);

        
        var select = document.getElementById("txtListLeverandorMerker");
        var length = select.options.length;
        var n = txtEditLeverandorMerker.value;
        var n2 = "";
        txtEditLeverandorMerker.value = "";

        for (i = 0; i < length; i++) {
            
            //alert(n.search(select.options[i].value) + ' ----> ' + n + ' = ' + select.options[i].value);
            if (n.search(select.options[i].value) == -1) {
                n += ',' + select.options[i].value;
               // select.remove(i);

            }          
        }
        
        txtEditLeverandorMerker.value = n; 
        TotxtListLeverandorMerker();

    }
}

function DoGetLeverandor(S) {
    var urlD = "";
    if (S == "") { urlD = ServerURL + "DoLeverandor?id=0&Vari=0"; } else { urlD = ServerURL + "DoLeverandor?id=" + S + "&Vari=0"; }


    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);
            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    document.getElementById('txtEditLeverandorAdresse').value = myObjE[key].Adresse;
                    document.getElementById('txtEditLeverandorPost').value = myObjE[key].Poststed;
                    document.getElementById('txtEditLeverandorID').value = S;
                    if (!myObjE[key].Merker) { document.getElementById('txtEditLeverandorMerker').value = "0"; }
                    else { document.getElementById('txtEditLeverandorMerker').value = myObjE[key].Merker; }

                    document.getElementById('txtEditText').value = myObjE[key].Text;
                    document.getElementById('txtEditLeverandorTelefon').value = myObjE[key].Telefon;

                }
            }
            TotxtListLeverandorMerker();
        }
    };
    xhr.send();
}

function TotxtListLeverandorMerker() {

    var LevSTR = document.getElementById('txtEditLeverandorMerker').value.toString().split(",");
    var Saddam = "";

    for (var key in LevSTR) {
        if (LevSTR[key] != "undefined") { Saddam += "(LevID.id = " + LevSTR[key] + ") or "; }
    }
    Saddam += "(LevID.id = -1) ";
    
    DoFill('txtListLeverandorMerker', 43, Saddam)

}

function DoFillSletteListe() {

    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;

    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "lookup/71_999|5|0" ;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table style='width: 90%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td style='width: 50px;'>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier;
                    }

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\" onclick=\'DoDeleteSletteListe(\"" + myObjE[key].ID + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Mekanisme + "\");\'>Slett</a>&nbsp;&nbsp;&nbsp;<a href=\"#\" onclick=\'DoModifyListing(\"" + key + "\",\"" + myObjE[key].Leverandor + "\",\"" + myObjE[key].Merke + "\",\"" + myObjE[key].Modell + "\",\"" + myObjE[key].Caliber + "\",\"" + myObjE[key].LopLengde + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Status + "\",\"" + myObjE[key].Mekanisme + "\",\"" + Eier + "\");\'>Rediger</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td >" + myObjE[key].Status + ", " + Eier + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('SletteListe').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    document.getElementById('SletteListe').innerHTML = Linje + "&nbsp;<br />";
}

function DoDeleteSletteListe(Key, Serial, Mekanisme) {

    var result = confirm("Vil Du Virkelig Slette '" + Serial + "(" + Mekanisme + ")" + "'?");
    if (result) {

        

        var xhr = new XMLHttpRequest(),
            method = "DELETE",
            url = ServerURL + "DoUpdateVapen?jsonstring=" + Key;


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
               
                DoFillSletteListe();
            }
        };
        xhr.send();
        
    }
    

}

function DoGetUserSettings() {

    var e = document.getElementById('BrukerDrpDown');
    var BrukerID = e.options[e.selectedIndex].value;
    DoFillForm('Bruker', 11, BrukerID);
    // DoFill('BrukerClientLevelText',q,'','')
    SelectElementValue('BrukerClientLevelText2', document.getElementById('BrukerClientLevel').value);

}

function DoSendPassword(Email) {
    
    var MJson = '{"GetPassword" : "' + Email + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
        }
    };
    xhr.send();
}

function AddNewUser() {
   
    var MJson = "";
        var person = prompt("Skriv inn navnet på brukeren :", "Harry Potter");
        if (person == null || person == "") {
            alert("Feil ved inntasting.");
        } else {
            MJson += '{';
            MJson += '"Switch" : "1" ';
            MJson += ', "ClientName" : "' + person + '"';
            MJson += ' } ';

            var xhr = new XMLHttpRequest(),
                method = "POST",
                url = ServerURL + "User/";


            xhr.open(method, url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {

                    alert(person + ' ble lagt Inn.');
                    DoFill("BrukerDrpDown", 10, '');

                }
            };
            xhr.send(JSON.stringify(MJson));
        }
}

function DoUpdateUser() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "2" ';
    MJson += ', "ClientEmail" : "' + document.getElementById('BrukerClientEmail').value + '"';
    MJson += ', "ClinetEnable" : "' + document.getElementById('BrukerClinetEnable').checked + '"';
    MJson += ', "ClientTimeOutValue" : "' + document.getElementById('BrukerClientTimeOutValue').value + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ', "ClientPassword" : "' + document.getElementById('BrukerClientPassword').value + '"';
    MJson += ', "ClientName" : "' + document.getElementById('BrukerClientName').value + '"';

    var c = document.getElementById("BrukerClientLevelText2");
    MJson += ', "ClientLevelText" : "' + c.options[c.selectedIndex].text + '"';

    var d = document.getElementById("BrukerClientLevelText2");
    MJson += ', "ClientLevel" : "' + d.options[d.selectedIndex].value + '"';

    var e = document.getElementById("BrukerDrpDown");
    MJson += ', "ClientName" : "' + e.options[e.selectedIndex].text + '"';
    MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
                //DoFill("BrukerDrpDown", 10, '');

            }
        };
        xhr.send(JSON.stringify(MJson));
   
}

// Config End