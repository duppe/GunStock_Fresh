window.onload = codeAddress;

function codeAddress() {

    ScrollMainToTop();
   
}

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
    if (S == "") { urlD = ServerURL + "lookup/0"; } else { urlD = ServerURL + "lookup/" + S.replaceAll('/', '¤').replaceAll("+", "£"); }
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
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'parent.DoNewBrowserTab(\"InsertWeapon.html?id=" + myObjE[key].ID + "\",null,\"våpen<br><b>" + myObjE[key].Serienummer + "</b>\");\' alt='' style='width:20px;' src='img/edit.gif' /></a></td><td >" + myObjE[key].Status + "&nbsp;(<a onclick=\"parent.DoNewBrowserTab('CostumerCard.html?TempUserID=" + myObjE[key].Kunde_ID + " ',null,'våpen<br><b>" + Eier + "</b>')\" href=\"#\">" + Eier + "</a>)" + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send();

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

//DoNewBrowserTab(URL, ReadOnly, Name)
/*
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

    if (typeof NSerial === 'undefined') { NSerial = ''; }
    CloseAll();
    document.getElementById('Insert').style = 'display:block;height: 1001px;';
    document.getElementById('MSwitch').value = "1";
    document.getElementById('MtxtSerienummer').value = NSerial;

    DoFill("MdrpLeverandor", 1, '', 1);
    DoFill("MdrpMekanisme", 2, '', 1);
    DoFill("MdrpMerke", 3, '', 1);
    DoFill("MdrpModel", 4, '', 1);
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
        else { dd.selectedIndex = 0; }
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
*/