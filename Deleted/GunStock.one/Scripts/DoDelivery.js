/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */
var ServerURL = '../api/';

window.onload = codeAddress;


function codeAddress() {

    //ElementTest()
    var Password = '';//params.get("Q"); document.getElementById('txtPassword').value = Password;
    var ClientName = '';//params.get("ClientName");
    var CLientLevel = '';//params.get("ClientName");

    if (Password == "") { Password = readCookie('SessionPassword'); }
    if (ClientName == "") { ClientName = readCookie('ClientName'); }
    if (CLientLevel == "") { CLientLevel = readCookie('CLientLevel'); }
    CheckSessionPass(Password, ClientName);


    document.getElementById('User').innerHTML = ClientName;

    /*
    var img = document.getElementById('AdminMenu');
    if (CLientLevel == "1") {
        img.style.visibility = 'visible';
    } else {
        img.style.visibility = 'hidden';

    }
    */
  
    //alert(CheckSessionPass('test'));
  

}



// **********************************************
// *****         Login            ***************
// **********************************************


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


                SendError('SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')', 'ForceLogOf');
                //SendMail('ForceLogOf', 'SessionPass error for user ' + readCookie('ClientName') + ' (' + SessionPass + ' <> ' + readCookie('SessionPassword') + ')')

                DoLogOut();
                document.location.href = 'index.html';
            }

            //alert (VALID);

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
    var i,
        c,
        ca,
        nameEQ = name + "=";
    ca = document.cookie.split(";");
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return "";
}


// FrontPage
function GetBySerial(Serial) {

    var LineColor = 'FFFFFF';
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
                    if (typeof are.Eier === 'undefined') { document.getElementById('txtNavn').value = "Butikk"; } else { document.getElementById('txtNavn').value = are.Eier; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.Kunde_ID; }

                    document.getElementById('txtModell').value = are.Modell;
                    document.getElementById('txtSerie').value = are.Serienummer;
                    document.getElementById('txtLeverandor').value = are.Leverandor;
                    document.getElementById('txtMekanisme').value = are.Mekanisme;
                    document.getElementById('txtMerke').value = are.Merke;
                    document.getElementById('txtCaliber').value = are.Caliber;
                    document.getElementById('txtLopLengde').value = are.LopLengde;
                    document.getElementById('txtDato').value = are.Dato;
                    document.getElementById('txtID').value = are.ID;
                    
                    if (are.Status == "Utlevert") {
                        document.getElementById('Deliver').style = "width:250px;visibility:hidden;";
                    }
                    else {
                        document.getElementById('Deliver').style="width:250px;visibility:visible;";
                    }

                    if (typeof are.Kundenavn === 'undefined') { document.getElementById('AEier').innerHTML = "Butikk"; } else { document.getElementById('AEier').innerHTML = are.Kundenavn; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.ID; }
                    // document.getElementById('AEier').innerHTML = are.Kundenavn;
                }

                else if (myObj[1] != null) {

                    document.getElementById('Singel').style = "display:none;";
                    document.getElementById('Listing').style = "display:block;";
                    var listing = '';

                    listing = " <table style='width:91%;'> <tr> <td >Serie</td> <td>Modell</td> <td>Leverandør</td> </tr>";
                    for (var key in myObj) {
                        if (myObj.hasOwnProperty(key)) {

                            if (myObj[key].Status == "Utlevert") {
                                LineColor = '808000'
                            }
                            else {
                                LineColor = 'FFFFFF'
                            }

                            listing += "<tr style='background-color: #" + LineColor + ";'> <td ><a onclick='javascript:document.getElementById(\"txtSerial\").value=\"" + myObj[key].Serienummer + "\";GetBySerial(\"" + myObj[key].ID + "\");'>" + myObj[key].Serienummer + "</a></td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Leverandor + "</td> </tr>";


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



function UtleverUpdateVapen(VapenID) {

    var MJson = "";

    MJson += '{';
    MJson += '"Status" : "3" ';
    MJson += ', "VapenID" : "' + VapenID + '"';
    MJson += ', "Switch" : "3"';
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

            //
            alert('Våpenet ble Utlevert');



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