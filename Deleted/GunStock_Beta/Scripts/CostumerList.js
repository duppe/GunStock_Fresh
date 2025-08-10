


var ServerURL = '../api/'




function DoFillKundeOversikt(id) {
    DoFillForm('txtKunde', 5, id);
    DoFill('txtKundeHistory', '6', id);
    DoFill('txtKundeInfo', '6', id);

}

function DoFillcostumer(S) {
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";
    var urlD = "";

    if (S == "")
    {
        urlD = ServerURL + "costumer/0";

        var MJson = '{"Search" : "%", "Password" : "' + Error + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
    }
    else
    {
        var MJson = '{"Search" : "' + S + '", "Password" : "' + Error + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
        urlD = ServerURL + "costumer/" + S;
    }



    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table style='width: 95%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Navn&nbsp;</td>  <td >Adresse</td> <td >Poststed</td> <td>Telefon</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                    //Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifycostumer(\"" + key + "\",\"" + myObjE[key].ID + "\",\"" + myObjE[key].Kundenavn + "\",\"" + myObjE[key].Adresse + "\",\"" + myObjE[key].Poststed + "\",\"" + myObjE[key].Telefon + "\");\' alt='' style='width:20px;' src='img/edit.gif' /></a></td><td ><a onclick=\"CloseAll();DoFillKundeOversikt('" + myObjE[key].ID + "');document.getElementById('VapenList').style = 'display:block;height: 1001px;';\" href=\"#\">" + myObjE[key].Kundenavn + "</a></td>  <td >" + myObjE[key].Adresse + "</td> <td >" + myObjE[key].Poststed + "</td> <td >" + myObjE[key].Telefon + "</td>  </tr></div>";
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\"><img onclick=\'DoModifycostumer(\"" + key + "\",\"" + myObjE[key].ID + "\",\"" + myObjE[key].Kundenavn + "\",\"" + myObjE[key].Adresse + "\",\"" + myObjE[key].Poststed + "\",\"" + myObjE[key].Telefon + "\");\' alt='' style='width:20px;' src='img/edit.gif' /></a></td><td ><a onclick=\"document.location.href='CostumerCard.html?TempUserID=" + myObjE[key].ID + "'\" href=\"#\">" + myObjE[key].Kundenavn + "</a></td>  <td >" + myObjE[key].Adresse + "</td> <td >" + myObjE[key].Poststed + "</td> <td >" + myObjE[key].Telefon + "</td>  </tr></div>";

                }
            }

            Linje += "</table>";
            document.getElementById('KundeListing').innerHTML = Linje + "&nbsp;<br />";

        }
    };
    xhr.send(JSON.stringify(MJson));



    document.getElementById('KundeListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoModifycostumer(key, id, Kundenavn, Adresse, Poststed, Telefon) {

    var ColorLine = "FFFFFF";
    var DoHTML = "";
    // var DoHTML = "<td><img onclick=\'DoModifyListing(\"" + key + "\");\' alt='' style='width:10px;' src='img/edit.gif' /></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> ";

    //var DoHTML = "<tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;</td><td >&nbsp;</td>  <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> <td>&nbsp;</td> <td >&nbsp;</td> <td >&nbsp;</td> </tr>";
    DoHTML += "<td><input type=\"hidden\" value=\"" + id + "\" id=\"DoModifyCostumerId\" /><input id=\"Buon1\" onclick=\"DoPostCostumerUpdate();\" type=\"button\" value=\"Lagre\" /></td> <td ><input id=\"SaveKundenavn\" type=\"text\" value=\"" + Kundenavn + "\" /></td> <td ><input id=\"SaveAdresse\" type=\"text\" value=\"" + Adresse + "\" /></td><td ><input id=\"SavePoststed\" type=\"text\" value=\"" + Poststed + "\" /></td>  <td ><input id=\"SaveTelefon\" type=\"text\" value=\"" + Telefon + "\" /></td>  ";
    //DoHTML += " <td colspan=\"5\">&nbsp;<input id=\"testeret\" type=\"text\" value=\"" + Kundenavn + "\" /></td>"

    document.getElementById('list' + key).innerHTML = DoHTML;

}

function DoPostCostumerUpdate() {

    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "3" ';
    MJson += ', "id" : "' + document.getElementById('DoModifyCostumerId').value + '" ';
    MJson += ', "Kundenavn" : "' + document.getElementById('SaveKundenavn').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('SaveAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('SavePoststed').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('SaveTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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

function DoPostCostumerInsertNew() {

    var MJson = "";
    var Tel = "-"
    var KundeNavn = "-";
    var Temp = document.getElementById('searchKundeInput').value.replace(/["']/g, '\'\'');
    if (Temp.match(/^\d+$/)) {
        Tel = document.getElementById('searchKundeInput').value.replace(/["']/g, '\'\'');
    }
    else {
        KundeNavn = document.getElementById('searchKundeInput').value.replace(/["']/g, '\'\'');
    }

    if (KundeNavn == "") { return;}

    MJson += '{';
    MJson += '"Switch" : "1" ';
    //MJson += ', "id" : "' + document.getElementById('DoModifyCostumerId').value + '" ';
    MJson += ', "Kundenavn" : "' + KundeNavn + '"';
    MJson += ', "Adresse" : "-"';
    MJson += ', "Poststed" : "-"';
    MJson += ', "Telefon" : "' + Tel + '"';
    MJson += ', "ByUser" : "' + parent.readCookie('ClientName') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ', "Info" : ""';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoInsertCostumer/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            DoFillcostumer(document.getElementById('searchKundeInput').value)
            // DoFillcostumer('');
        }
    };
    xhr.send(JSON.stringify(MJson));

}