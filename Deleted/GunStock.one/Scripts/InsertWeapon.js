window.onload = codeAddress;

function codeAddress() {
    parent.ScrollMainToTop();
    EmtyTextBox();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const Snr = urlParams.get('Snr');
    if (Snr != null) { document.getElementById('MtxtSerienummer').value = Snr; } //CheckIfExist();}

    DoFill("MdrpLeverandor", 1, '', 1);
    DoFill("MdrpMekanisme", 2, '', 1);
    DoFill("MdrpMerke", 3, '', 1);
    DoFill("MdrpModel", 4, '', 1);
    DoFill("MdrpStatus", 71, '', 1);

    

    document.getElementById('MdrpEier').value = 'Butikk';
    document.getElementById('MdrpEier').disabled = true;
    //document.getElementById('MtxtBestilt').disabled = true;

    //document.getElementById('chkSerieNummer').disabled = true;
    

    document.getElementById('Inserted').style = "display:none;";
    document.getElementById('Insert').style = "display:block;";

    // Hent dato
    document.getElementById('Mtxtdate').value = ToDaysDate();
    document.getElementById('MtxtBestilt').value = ToDaysDate();
    document.getElementById('MtxtDateOppdatert').value = ToDaysDate();
    
    DoGetTheWeapon(id);

}

function validate_drpDown() {
    var Failed = false;
    selects = document.getElementsByClassName("IsItEmty");
    for (i = 0; i < selects.length; ++i) {
        if (selects[i].value == '') {
            //selects[i].disabled = bad;
            selects[i].style = "background-color:red;width:200px;";
            Failed = true;
        }
        else {
            selects[i].style = "background-color:white;width:200px;";
        }
            
    }

    return Failed;
}

function GjorHvit(_this) {
    _this.style.backgroundColor = "white";
}

function validate_MtxtSerienummer(e) {
    var i,
        bad = this.value === "",
        selects = document.getElementsByClassName("IsItEmty");
    if (!this.value) { bad = true;}
    for (i = 0; i < selects.length; ++i) {
        if (selects[i].id !== 'MtxtSerienummer')
            selects[i].disabled = bad;
    }
}

function DisableInputs(e) {
    var i,
        bad = e;
        selects = document.getElementsByClassName("IsItEmty");
    //if (!e) { bad = true; }
    for (i = 0; i < selects.length; ++i) {
        if (selects[i].id !== 'MtxtSerienummer')
            selects[i].disabled = bad;
    }
}

function MDoPost() {

    var UtFylt = validate_drpDown();
    if (UtFylt == true) { alert('Du må fylle ut alle felt !'); return; }

    if (window.confirm('Er Dette Riktig : ' + document.getElementById('MtxtSerienummer').value.replace(/,/g, ', ') + ' ?')) {
        // De trykket Ja :-)
    }
    else {
        return;
    }

    if (Mcheck.checked == false) { NotAgreed(); return; }
    var MJson = "";

    MJson += '{';
    MJson += '"Status" : "1" ';
    MJson += ', "ID" : "' + document.getElementById('MtxtID').value + '" ';
    MJson += ', "Switch" : "' + document.getElementById('MSwitch').value + '" ';
    MJson += ', "date" : "' + document.getElementById('Mtxtdate').value + '" ';
    MJson += ', "Bestilt" : "' + document.getElementById('MtxtBestilt').value + '" ';
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
    document.getElementById('M2txtSerienummer').innerHTML = document.getElementById('MtxtSerienummer').value.replace(/,/g, ', ');
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
           
            document.getElementById('Inserted').style = "display:block;";
            document.getElementById('Insert').style = "display:none;";
            document.getElementById('M2result').style = "background-color: green; color: #FF0000; font-weight: bolder;";
            document.getElementById('M2result').innerHTML = "**** Enheten ble lagt korrekt ****";
            //document.getElementById('M2result').style = "background-color: #008000; color: ##FFFFFF; font-weight: bolder;height: 800px;"
            //document.getElementById('M2result').innerHTML = xhr.responseText.toString();
            document.getElementById('Mcheck').checked = false;

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function CheckIfExist() {


    var MJson = "";

    // Check for multi Serienumbers
    if (document.getElementById('MtxtSerienummer').value.indexOf(',') != -1) {
        document.getElementById('divHeadSerial').innerHTML = "Innleggelse av Flere Serienummer på en gang";
        var T = '';
        var DumpSerienummer = document.getElementById('MtxtSerienummer').value;
        DumpSerienummer = DumpSerienummer.replace(/,/g, '<br />');
        DumpSerienummer = DumpSerienummer.split('.').join('<br />');
        DumpSerienummer = DumpSerienummer.split(' ').join('');
            T = '<B>Serienummere:</B><br />';
            T = T + DumpSerienummer;
            T = T + '<br /><b>Det er i øyeblikket ikke validering på at det ikke ligger inne fra før !!</b>';

        document.getElementById('divSerials').innerHTML =  T
        return; 
    }

    if (document.getElementById('MtxtSerienummer').value == "") { DisableInputs(true); } else { DisableInputs(false); }
    try {
        MJson += '{';
        MJson += '"Status" : "1" ';
        MJson += ', "Switch" : "3" ';
        MJson += ', "Serienummer" : "' + document.getElementById('MtxtSerienummer').value.replace(/["']/g, '\'\'').replaceAll(".", "§").replaceAll("+", "£") + '"';
        MJson += ', "Mekanisme" : "' + document.getElementById('MdrpMekanisme').options[document.getElementById('MdrpMekanisme').selectedIndex].text.replace(/["']/g, '\'\'') + '"';
        MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
        MJson += ' } ';
    }
    catch (ex) { MJson = '"Status" : 1, "Switch" : "3", "Serienummer" : "0", "Mekanisme" : "0", "ByUser" : "' + readCookie('ClientName') + '"';}


    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertSQL/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var Astr = JSON.parse( xhr.responseText);
           
            if (Astr == "0") {
                document.getElementById('Mresult').style = "background-color: white; color: #008000; font-weight: bolder;";
                document.getElementById('Mresult').innerHTML = "Klar for Registrering."; //xhr.responseText.toString();
               
                

              

            } else {
                document.getElementById('Mresult').style = "background-color: white; color: #FF0000; font-weight: bolder;";
                document.getElementById('Mresult').innerHTML = "**** Duplikat Enhet funnet (informasjonen over oppdateres) ****";
                document.getElementById('MPost').disabled = true;
             
              
            }

            
        

        }
        DoFillSerialsListing(document.getElementById('MtxtSerienummer').value);
    };
    xhr.send(JSON.stringify(MJson));

}


function NotAgreed() {
    document.getElementById('Agree').style = "background-color: #FF0000; color: #008000; font-weight: bolder;";
}

function DoFillSerialsListing(S) {
    document.getElementById('divHeadSerial').innerHTML = "Andre Enheter med serienummer : " + S;
    document.getElementById('divSerials').innerHTML = "";

    if (document.getElementById('MtxtSerienummer').value == "") {
        S = "@";
        EmtyTextBox();
        document.getElementById('MSwitch').value = "1";
        document.getElementById('MPost').value = "Registrer Ny";
       // document.getElementById('MPost').disabled = false;
    }

    S = "01_" + S;
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";
    var urlD = "";
    var Eier = "";
    var Caliber = "";
    if (typeof S === 'undefined') {
        S = ""
    }
    if (S == "") { urlD = ServerURL + "lookup/0"; } else { urlD = ServerURL + "lookup/" + S.replace('/', '|').replaceAll(".", "§").replaceAll("+", "£"); } //encodeURIComponent(S)
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

            if (myObjE.length == 1) {
               // DoModifyListing(myObjE[0].DateOppdatert, myObjE[0].ID, myObjE[0].Leverandor, myObjE[0].Merke, myObjE[0].Modell, myObjE[0].Caliber, myObjE[0].LopLengde, myObjE[0].Serienummer, myObjE[0].Status, myObjE[0].Mekanisme, myObjE[0].Eier);
            }   

            Linje = " <table style='width: 590px;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>   <td >Caliber</td> <td>LøpLengde</td>  <td>Mekanisme</td> </tr>";

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
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifyListing(\"" + myObjE[key].DateOppdatert + "\",\"" + myObjE[key].Bestilt + "\",\"" + myObjE[key].ID + "\",\"" + myObjE[key].Leverandor + "\",\"" + myObjE[key].Merke + "\",\"" + myObjE[key].Modell + "\",\"" + Caliber + "\",\"" + myObjE[key].LopLengde + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Status + "\",\"" + myObjE[key].Mekanisme + "\",\"" + Eier + "\");\' alt='' style='width:20px;' src='img/edit.gif' /></a></td><td >" + myObjE[key].Status + "&nbsp;(" + Eier + ")" + "</td><td >" + myObjE[key].Dato + "</td>    <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td>  <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('divSerials').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    document.getElementById('divSerials').innerHTML = Linje + "&nbsp;<br />";
}

function DoGetTheWeapon(S) {
  
    S = "02_" + S;
    var Linje = "";
    var urlD = "";
  
    if (typeof S === 'undefined') {
        S = ""
    }
    if (S == "") { urlD = ServerURL + "lookup/0"; } else { urlD = ServerURL + "lookup/" + S.replace('/', '¤'); }
    var xhr = new XMLHttpRequest(),
        method = "GET", url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            DoModifyListing(myObjE[0].DateOppdatert, myObjE[0].ID, myObjE[0].Leverandor, myObjE[0].Merke, myObjE[0].Modell, myObjE[0].Caliber, myObjE[0].LopLengde, myObjE[0].Serienummer, myObjE[0].Status, myObjE[0].Mekanisme, myObjE[0].Eier);
            CheckIfExist();
        }
    };
    xhr.send();

    document.getElementById('divSerials').innerHTML = Linje + "&nbsp;<br />";
}

function DoModifyListing(DateOppdatert, Bestilt, ID, lLeverandor, lMerke, lModell, lCaliber, lLopLengde, lSerienummer, lStatus, lMekanisme, lEier) {

    

    if (lCaliber == "") { lCaliber = "-"; }
    if (lLopLengde == "") { lLopLengde = "-"; }
    var BTN = "BTN" + readCookie("ActiveTab")
    
    parent.document.getElementById(BTN).innerHTML = "våpen<br><b>" + lSerienummer + "</b><br />(" + lMekanisme +")";


    document.getElementById('MSwitch').value = "2";
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
    document.getElementById('MtxtBestilt').value = Bestilt;
    document.getElementById('MPost').value = "Oppdater";
    document.getElementById('MPost').disabled = false;
    //validate_drpDown();
    parent.ScrollMainToTop();
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
        if (dd.options[i].text.replace(' ','') === valueToSelect.replace(' ','')) {
            dd.selectedIndex = i;
            break;
        }
        else {
            dd.selectedIndex = 0;
        }
    }
} 

function CheckForEmtySerial() {
    var Serial = document.getElementById('MtxtSerienummer').value;
    //alert(Serial);
    if (Serial == "") { EmtyTextBox();}
}

function EmtyTextBox() {
    document.getElementById('MtxtSerienummer').value = "";
    document.getElementById('MtxtCaliber').value = "";
    document.getElementById('MtxtLopLengde').value = "";
    document.getElementById('MdrpEier').value = "";
    SelectElementValue("MdrpStatus", 0);
    SelectElementValue("MdrpMerke", 0);
    SelectElementValue("MdrpLeverandor", 0);
    SelectElementValue("MdrpMekanisme", 0);
    SelectElementValue("MdrpModel", 0);

}