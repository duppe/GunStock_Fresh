
window.addEventListener('load', codeAddress())


function codeAddress() {
    
    
    var Password = '';//params.get("Q"); document.getElementById('txtPassword').value = Password;
    var ClientName = '';//params.get("ClientName");
    var CLientLevel = '';//params.get("ClientName");
    var ClientID = ''; //getParameterByName('ID');

    
    if (Password == "") { Password = parent.readCookie('SessionPassword'); }
    if (ClientName == "") { ClientName = parent.readCookie('ClientName'); }
    if (CLientLevel == "") { CLientLevel = parent.readCookie('CLientLevel'); }
    if (ClientID != "") { Password = parent.readCookie('SessionPassword'); }
    DoGetCostumer();
    DoFillHistory(readCookie('ClientName'));
    parent.CheckSessionPass(Password, ClientName);
 // alert("It's loaded!")
   
   
}

function DoBack() {
    DoPostCostumerUpdate();
    SendHistory(readCookie('ClientName'), 'CostumerCard.html?TempUserID=' + QueryString('TempUserID'), document.getElementById('txtSalgKundenavn').value, '<br />' + document.getElementById('txtSalgTelefon').value);
    DoFillHistory(readCookie('ClientName'));
}

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

function DoBlankCostumer() {

    document.getElementById('divSelKunde').style = 'display:none;';
    butSelNewCostumer.style = "visibility:visible";
    document.getElementById('butBlankCostumer').style = 'display:none;';

    document.getElementById('txtSalgAdresse').value = '';
    document.getElementById('txtSalgPoststed').value = '';
    document.getElementById('txtSalgTelefon').value = '';


}

function DoGetCostumer() {
  
    //document.getElementById('txtSalgInfo').value = '';

  
    var SelectedV = QueryString('TempUserID');
    writeCookie('TempUserID', SelectedV, 30);
    // SendHistory(parent.readCookie('CLientName'), 'CostumerCard.html?ID=' + SelectedV);
    DoFillForm('txtSalg', '1', SelectedV, readCookie('BaseAKA'));
    

}

function DoNewCostumer() {

    DoPostCostumerInsert();

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
    MJson += ', "ByUser" : "' + parent.readCookie('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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
            butSelNewCostumer.style = "visibility:hidden";
            // DoFillcostumer('');
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoPostCostumerUpdate() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "2" ';
    MJson += ', "id" : "' + QueryString('TempUserID') + '" ';
    MJson += ', "Kundenavn" : "' + document.getElementById('txtSalgKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtSalgAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtSalgPoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtSalgTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ', "Info" : "' + document.getElementById('txtSalgInfo').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            // DoFillcostumer('');
            DoFillcostumer(document.getElementById('searchKundeInput').value)
        }
    };
    xhr.send(JSON.stringify(MJson));

}

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
    MJson += ', "DateReserved" : "' + DateReserved + '"';
    MJson += ', "ID" : "' + ID + '"';
    MJson += ', "Eier" : "' + Eier + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoUpdateVapen/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
           
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
            document.location.reload();

            //Neste Linjene kan nok slettes
            document.getElementById('butSalgSalg').style = "visibility:hidden";
            document.getElementById('butSalgCheck').style = "visibility:visible";
            document.getElementById('VapenList').style = "visibility:visible";
            document.getElementById('Salg').style = "visibility:hidden";
            DoFillKundeOversikt(Kunde_ID)

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoFillHistory(User_Name) {

    var T = 1;
    var Linje = ""; Linje += "<h2>Kunde Historie : </h1><br />";
    var UserHistory = '{';
    UserHistory += '"ActionType" : "2"';
    UserHistory += ', "User_Name" : "' + User_Name + '"';
    UserHistory += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    UserHistory += ' } ';

    if (document.cookie.indexOf("ActiveTab") === -1) { DoNewBrowserTab('front.html'); } else { T = parent.readCookie('ActiveTab'); }

    var xhr = new XMLHttpRequest(),
        method = "GET", url = ServerURL + "UserHistory/?jsonstring=" + UserHistory;
    
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

           


            for (var key in myObjE) {
                
                Linje += "<div  id='test'   class='DuppeSelected' style=\"padding-bottom: 5px;\" >";

                if (myObjE.hasOwnProperty(key)) {
                  //  Linje += "<h2>" + myObjE[key].HistoryTitle + "</h2><br />";

                    Linje += "<a style=\"cursor: pointer;\"  onclick=\"top.document.getElementById('BDIV" + T + "').innerHTML='" + myObjE[key].User_URL + "';top.document.getElementById('TAB" + T + "').src='" + myObjE[key].User_URL + "';top.document.getElementById('BTN" + T + "').innerHTML='" + myObjE[key].HistoryTitle + "';\" target =\"TAB" + T + "\">" + myObjE[key].HistoryTitle + myObjE[key].HistoryText + "</a>";

                   // Linje += "<br />" + myObjE[key].HistoryTitle ;
                }

                Linje += "</div>";
            }



            document.getElementById('LastHistory').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();


}

function SendHistory(User_Name, UserURL, HistoryTitle, HistoryText) {


    var UserHistory = '{';
    UserHistory += '"User_Name" : "' + User_Name + '"';
    UserHistory += ', "UserURL" : "' + UserURL + '"';
    UserHistory += ', "HistoryTitle" : "' + HistoryTitle + '"';
    UserHistory += ', "HistoryText" : "' + HistoryText + '"';
    UserHistory += ', "ActionType" : "1"';
    UserHistory += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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
        DoFillHistory(readCookie('ClientName'));
    };
    xhr.send();
    //alert('Kommer Snart !/r/n' + TextToSend);
  
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
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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

