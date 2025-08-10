

function DoFillListing(S) {
    var Linje = "";
    var addOnSQL = "";
    var ColorLine = "f6f6f6";
    var urlD = "";
    var Eier = "";
    var Caliber = "";

    var MdrpStatus = document.getElementById('MdrpStatus');
    Status = MdrpStatus.options[MdrpStatus.selectedIndex].value;

    if (!MdrpStatus) {
        addOnSQL += " and (Status like '%')";
    } else {
        addOnSQL += " and (Status like '%" + Status + "') ";
    }

    var MdrpLeverandor = document.getElementById('MdrpLeverandor');
    Leverandor = MdrpLeverandor.options[MdrpLeverandor.selectedIndex].text;

    if (!Leverandor ) {
        addOnSQL += " and (Leverandor like '%')";
    } else {
        addOnSQL += " and (Leverandor like '%" + Leverandor  +"') ";
    }

    var MdrpMerke = document.getElementById('MdrpMerke');
    Merke = MdrpMerke.options[MdrpMerke.selectedIndex].text;

    if (!MdrpMerke) {
        addOnSQL += " and (Merke like '%')";
    } else {
        addOnSQL += " and (Merke like '%" + Merke + "') ";
    }

    var MdrpModel = document.getElementById('MdrpModel');
    Model = MdrpModel.options[MdrpModel.selectedIndex].text;

    if (!MdrpModel) {
        addOnSQL += " and (Modell like '%')";
    } else {
        addOnSQL += " and (Modell like '%" + Model + "') ";
    }


    if (typeof S === 'undefined') {
        S = ""
    }
    if (S == "")
    {
        urlD = ServerURL + "lookup/0";
        var MJson = '{"Search" : "%", "SessionPassword" : "' + readCookie('SessionPassword') + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
    }
    else {
        var MJson = '{"Search" : "' + DoHTMLencode(S) + '", "addOnSQL" : "' + addOnSQL + '", "SessionPassword" : "' + readCookie('SessionPassword') + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
        urlD = ServerURL + "lookup/" ;
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

            Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id='datatable-default' >  <thead>";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Leverandor</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead><tbody>";


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
                    Linje += "<div id='R" + key + "'><tr class='" + ColorLine + ";' id='list" + key + "'><td><div class=\"fa-hover mb-sm mt-sm col-md-6 col-lg-4 col-xl-3\"><i class=\"fa fa-edit\" onclick=\"document.location.href=\'Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].ID + "\'\"></i></div>&nbsp;</td><td >" + myObjE[key].Status + "&nbsp;(<a onclick=\"parent.DoNewBrowserTab('Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + " ',null,'KundeKort<br><b>" + Eier + "</b>')\" href=\"Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "\">" + Eier + "</a>)" + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</tbody> </table></div>";

            document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send(JSON.stringify(MJson));

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

