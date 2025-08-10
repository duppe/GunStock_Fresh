
/*
function DoBack() {
    DoPostCostumerUpdate();
    SendHistory(localStorage.getItem('ClientName'), 'CostumerCard.html?TempUserID=' + QueryString('TempUserID'), document.getElementById('txtSalgKundenavn').value, '<br />' + document.getElementById('txtSalgTelefon').value);
    DoFillHistory(localStorage.getItem('ClientName'));
}

function SendHistory(User_Name, UserURL, HistoryTitle, HistoryText) {


    var UserHistory = '{';
    UserHistory += '"User_Name" : "' + User_Name + '"';
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

function DoCheckForNew() {
    if (document.getElementById('drpSelKunde').options.length == 0) {
        butSelNewCostumer.style = "visibility:visible";
    }
    else {
        butSelNewCostumer.style = "visibility:hidden";
    }
}


function DoGetCostumer() {

    //document.getElementById('txtSalgInfo').value = '';


    var SelectedV = QueryString('TempUserID');
    localStorage.setItem('TempUserID', SelectedV);
    // SendHistory(parent.localStorage.getItem('CLientName'), 'CostumerCard.html?ID=' + SelectedV);
    DoFillForm('txtSalg', '1', SelectedV, localStorage.getItem('BaseAKA'));


}

function DoGetWeaponSerials(Serial) {
    if (Serial != "") {

        DoFill("drpSalgVapenMulti", 9, Serial);
        document.getElementById('drpSalgVapenMulti').style = "display:block;width:280px;";

        document.getElementById("txtDateReserved").defaultValue = ToDaysDate() ;
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


function DoPostCostumerInsert() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "1" ';
    //MJson += ', "id" : "' + document.getElementById('DoModifyCostumerId').value + '" ';
    MJson += ', "Kundenavn" : "' + document.getElementById('txtSalgKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtSalgAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtSalgPoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtSalgTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + parent.localStorage.getItem('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
    MJson += ', "Info" : " "';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Kunden Ble Lagt inn');
          
        }
    };
    xhr.send(JSON.stringify(MJson));

}
*/





function DoBlankCostumer() {

    document.getElementById('divSelKunde').style = 'display:none;';
    butSelNewCostumer.style = "visibility:visible";
    document.getElementById('butBlankCostumer').style = 'display:none;';

    document.getElementById('txtSalgAdresse').value = '';
    document.getElementById('txtSalgPoststed').value = '';
    document.getElementById('txtSalgTelefon').value = '';


}



function DoNewCostumer() {

    DoPostCostumerInsert();

}

function DoPic() {
    document.getElementById('PicName').innerHTML = document.getElementById('txtSalgKundenavn').value;
}

function DoPostCostumerUpdate() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "2" ';
    MJson += ', "id" : "' + localStorage.getItem('TempUserID') + '" ';
    MJson += ', "EPostKunde" : "' + document.getElementById('txtSalgEPostKunde').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Kundenavn" : "' + document.getElementById('txtSalgKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "KundeEtternavn" : "' + document.getElementById('txtSalgKundeEtternavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtSalgAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtSalgPoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtSalgTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + localStorage.getItem('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
    MJson += ', "Info" : "' + document.getElementById('txtSalgInfo').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
    
            localStorage.setItem('FirmPhone', document.getElementById('txtSalgTelefon').value.replace(/["']/g, '\'\'') );
            alert_OK('Oppdatert', 'Informasjonen ble lagt inn !',2);
        }
    };
    xhr.send(JSON.stringify(MJson));

}


function DoFillCostumerSearch(S) {
    var Linje = "";
    var addOnSQL = "";
    var ColorLine = "f6f6f6";
    var urlD = "";
    var Eier = "";
    var Caliber = "";

   

   
    addOnSQL += " and (Status <> '2')";
    addOnSQL += " and (Status <> '3')";
    addOnSQL += " and (Status <> '4')";
   
    
   
  

    if (typeof S === 'undefined') {
        S = ""
    }
    if (S == "") {
        urlD = ServerURL + "lookup/0";
        var MJson = '{"Search" : "%", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    }
    else {
        var MJson = '{"Search" : "' + DoHTMLencode(S) + '", "addOnSQL" : "' + addOnSQL + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
        urlD = ServerURL + "lookup/";
    }
    //urlD = encodeURIComponent(urlD);
    //var res = encodeURIComponent(urlD);
    var xhr = new XMLHttpRequest(),
        method = "POST", url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' style='width:100%;' id='datatable-default' >  <thead>"
            + "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td>  <td >Leverandor</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead><tbody>";


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




                    if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                    Linje += "<div id='R" + key + "'><tr class='" + ColorLine + ";' id='list" + key + "'><td><a  class=\"modal-with-form btn btn-default\""

                       // + "class=\"modal-with-form btn btn-default\" href=\"#modalForm\"  "
                        + "onclick =\"DoUpdateVapen(2, '" + myObjE[key].Mekanisme + "', '" + myObjE[key].Serienummer + "', '" + localStorage.getItem('TempUserID') + "', '" + document.getElementById('txtSalgKundenavn').value + "', '" + myObjE[key].ID + "', '' )\" "

                        + ">Velg</a></td >  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr ></div > ";
                }
            }

            Linje += "</tbody> </table></div>";

            document.getElementById('VeponList').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send(JSON.stringify(MJson));

    document.getElementById('VeponList').innerHTML = Linje + "&nbsp;<br />";
}







// *******************************************

function DoCheckVandel(ID) {


    if (document.getElementById('txtSalgNotOK').value == 'True') {

        document.getElementById('txtSalgSerienummer').value = 'Salg Ikke Mulig !!';
        document.getElementById('txtSalgSerienummer').disabled = true;
    }
    else {

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
        url = ServerURL + "DoFill/1?Vari=1";

    if (ID != "") {
        url = ServerURL + "lookup/72_" + ID;
        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
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
                       // document.getElementById('imgSelVapen').src = 'img/WEB_Image Browning BL Gr 2 S 22LR Lever action  browning-bl-gr-2_s_22lr-2014481601.Jpeg';
                        document.getElementById('butSalgSalg').style = "visibility:visible";
                        document.getElementById('butSalgCheck').style = "visibility:hidden";
                        document.getElementById('txtSelVapenID').value = are.ID;
                        document.getElementById('txtSalgMekanisme').value = are.Mekanisme;
                        document.getElementById('txtDateReserved').style = 'display:visible;';
                    }


                }


                else {
                    document.getElementById('txtSelVapen').innerHTML = '';
                   // document.getElementById('imgSelVapen').src = 'img/GunNotFound.png';
                    document.getElementById('butSalgSalg').style = "visibility:hidden";
                    document.getElementById('butSalgCheck').style = "visibility:visible";


                }



            }
        };
        xhr.send();


    }

    else { alert("Ingentig å gjøre !"); document.getElementById('Singel').style = "display:none;"; }


}




function DoUpdateVapen(Status, Mekanisme, Serienummer, Kunde_ID, Eier, ID, DateReserved ) {

    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);

    


    
    /*
    if ((typeof ID === 'undefined') || (ID == 'undefined')) {

        var e = document.getElementById('drpSalgVapenMulti');
        var ID = e.options[e.selectedIndex].value;

    }
    */
 
    var Linje = "<br /><br /><div class=\"form-group\">"
        +"Utlevering av " + Serienummer + "(" + Mekanisme +")<br />"
        + "RegistreringsDato <input id=\"RegDate\" class=\"form-control\" type=\"date\" value=\"" + today + "\" /><br />"
        + "<input class=\"form-control\" type=\"button\" value=\"Utlever\" onclick =\"DoInsertUpdate(" + Status + ",'" + Mekanisme + "','" + Serienummer + "'," + Kunde_ID + ",'" + Eier + "', " + ID + ",document.getElementById('RegDate').value)\" />"
        + "<input class=\"form-control\" type=\"button\" value=\"Utlånt\" onclick =\"DoInsertUpdate(8,'" + Mekanisme + "','" + Serienummer + "'," + Kunde_ID + ",'" + Eier + "', " + ID + ",document.getElementById('RegDate').value)\" />"
        + "</div > ";

    document.getElementById('VeponList').innerHTML = Linje;

    
  

}

function DoInsertUpdate(Status, Mekanisme, Serienummer, Kunde_ID, Eier, ID, DateReserved){

    var MJson = "";
    MJson += '{'
    + '"Status" : "' + Status + '" '
    + ', "Serienummer" : "' + encodeURIComponent(Serienummer) + '"'
    + ', "Mekanisme" : "' + Mekanisme + '"'
    + ', "Switch" : "1"'
    + ', "Kunde_ID" : "' + Kunde_ID + '"'
    + ', "DateReserved" : "' + DateReserved + '"'
    + ', "ID" : "' + ID + '"'
    + ', "Eier" : "' + Eier + '"'
    + ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"'
    + ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoUpdateVapen/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            // Sjekk Våpen historie for Salg, og om kunden er bannet

            DoFill('txtSelHistory', '6', localStorage.getItem('TempUserID'));
            //
            var txt;
            SkalViUtlevere(Serienummer, Kunde_ID, Mekanisme);

          
           // document.location.reload();



        }
    };
    xhr.send(JSON.stringify(MJson));
}

function UtleverUpdateVapen(Status, Serienummer, Kunde_ID, Mekanisme) {

    var MJson = "";

    MJson += '{';
    MJson += '"Status" : "' + Status + '" ';
    MJson += ', "Serienummer" : "' + Serienummer + '"';
    MJson += ', "Mekanisme" : "' + Mekanisme + '"';
    MJson += ', "Switch" : "2"';
    MJson += ', "Kunde_ID" : "' + Kunde_ID + '"';
    MJson += ', "ByUser" : "' + localStorage.getItem('ClientName').replace('@', '_') + '"';
    MJson += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
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

function SkalViUtlevere(Serienummer, Kunde_ID, Mekanisme) {
    // Opprett en egendefinert dialogboks
    var dialog = document.createElement('div');
    dialog.innerHTML = `
        <div id="customDialog" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; border: 1px solid black; padding: 20px; z-index: 1000; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
            <p>Vil du utlevere med en gang?</p>
            <button id="btnJa">Ja</button>
            <button id="btnNei">Nei</button>
        </div>
        <div id="overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 999;"></div>
    `;

    document.body.appendChild(dialog);

    // Hent knappene
    document.getElementById('btnJa').onclick = function () {
        document.body.removeChild(dialog);
        UtleverUpdateVapen('3', Serienummer, Kunde_ID, Mekanisme);
        alert_OK('Utlevering', 'Våpenet ble UTLEVERT til kunden!!!', 2);
    };

    document.getElementById('btnNei').onclick = function () {
        document.body.removeChild(dialog);
        alert_OK('Reservasjon', 'Våpenet ble RESERVERT/UTLÅNT til kunden, og kan utleveres senere!', 2);
    };
}

