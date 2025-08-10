//const { localstorage } = require("modernizr");

function DoFillRapport() {

    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
   
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "gradeC";


    var MJson = '{"Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

    var xhr = new XMLHttpRequest(),
        method = "POST", url = ServerURL + "lookup/71_";// + Status + '|' + Periode + '|' + Ar;
    console.log('-->' + url + '<---');

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            console.log(' ---------------------   >' + xhr.responseText + '<-----------------');
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            //console.log(xhr.responseText);
            Linje = "Viser tottalt " + myObjE.length + "";
            Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier;
                    }

                    if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                    Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</tbody> </table>";

            document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send(JSON.stringify(MJson));

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoPrintRapport() {
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var Periode2 = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    SendError(localStorage.getItem('ClientName') + ' Gjør en Rapportutskrift', 'Skriver ut Rapport');
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Statusen = "";
    var Merke = "";
    var Modell = "";
    var LopLengde = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var MJson = '{"Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

    var xhr = new XMLHttpRequest(),
        method = "POST", url = ServerURL + "lookup/71_";// + Status + '|' + Periode + '|' + Ar;



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
            
            /*
            try {
                Title = myObjE[0].Status.split(' ')[1].toString()
            }
            catch (Error) {
                Title = myObjE[0].Status.split(' ')[0].toString()
            }
            */
            
            
            
            Linje = " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
            Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " -- " + localStorage.getItem('FirmName') + ", Viser tottalt&nbsp;" + myObjE.length + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";
            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td>Leverandør</td> <td >Caliber</td> <td>Løp</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {

                if (Temp == TotPage) {
                    PageNumber++;
                    Linje += "</table>SideNummer : " + PageNumber;
                    Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  ><br /><br />";
                    Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Merke</td> <td>Modell</td><td>Leverandør</td> <td >Caliber</td> <td>Løp</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";
                    Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + localStorage.getItem('FirmName') + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

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
            Linje += " <p style='font - weight: bold; font - size: x - large'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tottalt  : " + TotItem + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + DaysDate() + ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signert av " + localStorage.getItem('CLientName') + "&nbsp; :&nbsp; _________________________________</p>";
            Linje += "<p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto:" + localStorage.getItem('FirmEmail') + "'>Våpenansvarlig : " + localStorage.getItem('CLientName') + " (" + localStorage.getItem('CLientEmail') + "</a>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmName') + ", " + localStorage.getItem('FirmAdress') + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmEmail') + ", Telefon : " + localStorage.getItem('FirmPhone') + "</p>";

            document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

            var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
            RapportWindow.document.write(Linje);

            RapportWindow.print();

        }
    };
    xhr.send(JSON.stringify(MJson));

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
    //SendError(localStorage.getItem('ClientName') + ' Gjør en Rapportutskrift', 'Skriver ut Rapport');
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