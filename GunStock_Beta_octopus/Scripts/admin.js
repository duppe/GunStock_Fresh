

window.onload = codeAddress;

function codeAddress() {
    if (readCookie('CLientLevel') == "0") { document.location.href = 'https://www.vg.no';}
    CloseAllConfig();
    DoFillForm("txtSetting", 10, '');
    DoFillConfig()
    document.getElementById('ConfigDiverse').style = 'display:block;';
    parent.ScrollMainToTop();
   
    //document.getElementById('Home').style = "display:Block;";
    DoFill("BrukerDrpDown", 10, '');
    DoFill("MdrpLeverandor", 1, '');
    DoFill("MdrpMekanisme", 2, '');
    DoFill("MdrpMerke", 3, '');
    DoFill("MdrpModel", 4, '');
    
   
    
}
//DoFill("MdrpLeverandor", 1, '');


// *****************  Config ********************
function DoFillConfig() {
    // Fill Config Boxes
    DoFill("txtListMekanisme", 2, '', 1);
    DoFill("txtListLeverandor", 1, '');
    DoFill("txtListMerke", 3, '');
    DoFill("drpEditLeverandorMerker", 42, ''); //42
    //DoFill("MdrpModel", 4, '');
}

function CloseAllConfig() {

    document.getElementById('ConfigLeverandorer').style = "display:none;height: 800px;";
    document.getElementById('ConfigDiverse').style = "display:none;";
    document.getElementById('ConfigMerMod').style = "display:none;";
    document.getElementById('ConfigMekanismer').style = "display:none;";
    document.getElementById('ConfigBrukere').style = "display:none;";
    document.getElementById('CostumerUpdate').style = "display:none;";
    


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

function DoInsertLeverandor() {
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

    /*
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;

    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')
    */

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "lookup/71_999|6|0";


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
    document.getElementById('BrukerClientEmail').value = "";
    document.getElementById('BrukerClientName').value = "";
    document.getElementById('BrukerClientPassword').value = "";
    document.getElementById('BrukerClientTimeOutValue').value = "";
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

function DoDeleteUser() {

    if (confirm('Vil du virkelig slette ' + document.getElementById('BrukerClientName').value + '?')) {
        var MJson = "";

        MJson += '{';
        MJson += '"Switch" : "3" ';
        MJson += ', "ClientEmail" : "' + document.getElementById('BrukerClientEmail').value + '"';
        MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
                DoFill("BrukerDrpDown", 10, '');
                document.getElementById('BrukerClientEmail').value = "";
                document.getElementById('BrukerClientName').value = "";
                document.getElementById('BrukerClientPassword').value = "";
                document.getElementById('BrukerClientTimeOutValue').value = "";


            }
        };
        xhr.send(JSON.stringify(MJson));
       
    } else {
        // Do nothing!
       
    }

   
}

function DoKickAllUsers() {

    if (confirm('Vil du virkelig Kaste ut alle brukere?')) {
        var MJson = "";

        MJson += '{';
        MJson += '"Switch" : "4" ';
        MJson += ', "ClientEmail" : "' + readCookie("CLientEmail") + '"';
        MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
                DoFill("BrukerDrpDown", 10, '');

            }
        };
        xhr.send(JSON.stringify(MJson));

    } else {
        // Do nothing!

    }


}
// Config End


