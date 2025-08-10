//const { localstorage } = require("modernizr");

function DoFillRapport() {

    // 1001	-- == Salgsrapport == --
    // 1002	--== Innkjøpsrapport == --
    // 1003	--== Varebeholdningsrapport == --
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById('drpKunde');
    var Customer = e4.options[e4.selectedIndex].value;
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "gradeC";


    var MJson = '{"Customer" : "' + Customer + '", "Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

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

            var RapportListCache = xhr.responseText;
            parsedRapportData = JSON.parse(RapportListCache);
            localStorage.setItem("RapportListCache", parsedRapportData);



            // 1001	-- == Salgsrapport == --
            if (Status == "1001") {


                //console.log(xhr.responseText);
                Linje = "Salg tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Utleveringsdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DateOppdatert + "</td> <td >" + myObjE[key].Leverandor + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
            }

            // --== Innkjøpsrapport == --
            else if (Status == "1002") { 


                //console.log(xhr.responseText);
                Linje = "Innkjøp tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td> <td >&nbsp;Leverandør&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].Dato + "</td> <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
            }

           else if (Status == "1003") {


                //console.log(xhr.responseText);
                Linje = "Vare tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
            }

            else  {


                //console.log(xhr.responseText);
                Linje = Title + " tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DatoOprettet + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
            }


        }
    };
    xhr.send(JSON.stringify(MJson));

    //document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoPrintRapport() {

    // 1001	-- == Salgsrapport == --
    // 1002	--== Innkjøpsrapport == --
    // 1003	--== Varebeholdningsrapport == --
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var Periode2 = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById('drpKunde');
    var Customer = e4.options[e4.selectedIndex].value;
    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

    var Eier = "";
    var Linje = ""; 
    var num = "1"; 
    var ColorLine = "gradeC";
    

    var MJson = '{"Customer" : "' + Customer + '", "Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

    var xhr = new XMLHttpRequest(),
        method = "POST", url = ServerURL + "lookup/71_";// + Status + '|' + Periode + '|' + Ar;
    //console.log('-->' + url + '<---');

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // ertert
            //console.log(' ---------------------   >' + xhr.responseText + '<-----------------');
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);
            var TotPage = 17; //27 
            var Temp = 0;
            var PageNumber = 1;
            var TotItem = myObjE.length;
            var Linje = '';
            // localStorage.getItem('FirmName')


            // 1001	-- == Salgsrapport == --
            if (Status == "1001") {


                //console.log(xhr.responseText);
                Linje += "<br />Salg tottalt " + myObjE.length + ""; 
                Linje += "<div class='panel-body'>  <table style='width: 95%;border: thin solid #a2a9b1;' class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Utleveringsdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";
                Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";
                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (Temp == TotPage) {
                            PageNumber++;
                            Linje += "</table><br />";  //SideNummer : " + PageNumber;
                            Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
                            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Utleveringsdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                            Linje += "<br /><p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                            Temp = 0;
                        } else { Temp++; }


                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <br /><a style=\"font-size:8px\" onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DateOppdatert + "</td> <td >" + myObjE[key].Leverandor.substring(0, 13) + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell.substring(0, 5) + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>"; //SideNummer : " + (parseInt(PageNumber) + 1).toString();

                Linje += "<br />";
                Linje += " <p style='font - weight: bold; font - size: x - large'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tottalt  : " + TotItem + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + DaysDate() + ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signert av " + localStorage.getItem('CLientName') + "&nbsp; :&nbsp; _________________________________</p>";
                Linje += "<p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto:" + localStorage.getItem('FirmEmail') + "'>Våpenansvarlig : " + localStorage.getItem('CLientName') + " (" + localStorage.getItem('CLientEmail') + "</a>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmName') + ", " + localStorage.getItem('FirmAdress') + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmEmail') + ", Telefon : " + localStorage.getItem('FirmPhone') + "</p>";


                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
                var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
                RapportWindow.document.write(Linje);

                RapportWindow.print();
            }


            // --== Innkjøpsrapport == --
            else if (Status == "1002") {


                //console.log(xhr.responseText);
                Linje = "<br />Innkjøp tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table style='width: 95%;border: thin solid #a2a9b1;' class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td> <td >&nbsp;Leverandør&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";
                Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (Temp == TotPage) {
                            PageNumber++;
                            Linje += "</table><br />";  //SideNummer : " + PageNumber;
                            Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
                            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                            Linje += "<br /><p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                            Temp = 0;
                        } else { Temp++; }

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        // Alternere ColorLine-verdien
                        ColorLine = (ColorLine === "gradeX") ? "gradeC" : "gradeX";

                        try {
                            // Generer og legg til HTML-innholdet
                            const rowHtml = `<tr class="${ColorLine}" id="list${key}">
                                <td>${myObjE[key].Status}, <br>
                                <a style="font-size:8px" onclick="document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=${myObjE[key].Kunde_ID}'" href="#">${Eier}</a>
                                </td>
                                <td>${myObjE[key].Dato}</td>
                                <td>${myObjE[key].Leverandor.substring(0, 13)}</td>
                                <td>${myObjE[key].Merke}</td>
                                <td>${myObjE[key].Modell.substring(0, 5)}</td>
                                <td>${myObjE[key].Caliber}</td>
                                <td>${myObjE[key].LopLengde}</td>
                                <td>
                                    <a onclick="document.location.href='Gunstock.html?page=InsertWeapon.html&id=${myObjE[key].gID}'" href="#">${myObjE[key].Serienummer}</a>
                                </td>
                                <td>${myObjE[key].Mekanisme}</td>
                                </tr>`;
                            // Anta at Linje er en variabel som allerede er definert og vi legger til den genererte HTML-koden
                            Linje += rowHtml;
                        } catch (e) {
                            console.error("Det oppstod en feil ved generering av HTML-innholdet: ", e);
                        }
                    }
                }

                Linje += "</tbody> </table>"; //SideNummer : " + (parseInt(PageNumber) + 1).toString();

                Linje += "<br />";
                Linje += " <p style='font - weight: bold; font - size: x - large'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tottalt  : " + TotItem + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + DaysDate() + ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signert av " + localStorage.getItem('CLientName') + "&nbsp; :&nbsp; _________________________________</p>";
                Linje += "<p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto:" + localStorage.getItem('FirmEmail') + "'>Våpenansvarlig : " + localStorage.getItem('CLientName') + " (" + localStorage.getItem('CLientEmail') + "</a>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmName') + ", " + localStorage.getItem('FirmAdress') + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmEmail') + ", Telefon : " + localStorage.getItem('FirmPhone') + "</p>";


                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
                var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
                RapportWindow.document.write(Linje);
                RapportWindow.print();
               
            }

            else if (Status == "1003") {

                TotPage = 26;
                //console.log(xhr.responseText);
                Linje = "<br />Vare tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table style='width: 95%;border: thin solid #a2a9b1;' class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";
                Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (Temp == TotPage) {
                            PageNumber++;
                            Linje += "</table><br />";  //SideNummer : " + PageNumber;
                            Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
                            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                            Linje += "<br /><p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                            Temp = 0;
                        } else { Temp++; }

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }

                        var modell = "";
                        if (myObjE[key] && typeof myObjE[key].Modell === 'string') {
                            modell = myObjE[key].Modell.substring(0, 5);
                        }


                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a style=\"font-size:8px\" onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>"; //SideNummer : " + (parseInt(PageNumber) + 1).toString();

                Linje += "<br />";
                Linje += " <p style='font - weight: bold; font - size: x - large'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tottalt  : " + TotItem + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + DaysDate() + ",&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Signert av " + localStorage.getItem('CLientName') + "&nbsp; :&nbsp; _________________________________</p>";
                Linje += "<p >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto:" + localStorage.getItem('FirmEmail') + "'>Våpenansvarlig : " + localStorage.getItem('CLientName') + " (" + localStorage.getItem('CLientEmail') + "</a>)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmName') + ", " + localStorage.getItem('FirmAdress') + "<br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + localStorage.getItem('FirmEmail') + ", Telefon : " + localStorage.getItem('FirmPhone') + "</p>";


                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
                var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
                RapportWindow.document.write(Linje);
                RapportWindow.print();
            }

            else {


                //console.log(xhr.responseText);
                Linje = "<br />" + Title + " tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table style='width: 95%;border: thin solid #a2a9b1;' class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";
                Linje += "<p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (Temp == TotPage) {
                            PageNumber++;
                            Linje += "</table><br />";  //SideNummer : " + PageNumber;
                            Linje += " <table align='center' style='width: 95%;border: thin solid #a2a9b1;'  >";
                            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                            Linje += "<br /><p style='font - weight: bold; font - size: xx-large'>  " + Title + " " + Ar + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; " + Periode2 + "&nbsp;" + Ar + ", SideNummer : " + PageNumber + "</p>";

                            Temp = 0;
                        } else { Temp++; }

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a style=\"font-size:8px\" onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DatoOprettet + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell.substring(0, 5) + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>"; // SideNummer : " + (parseInt(PageNumber) + 1).toString(); 

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";
                var RapportWindow = window.open("", "Rapport", "width=1200,height=1000");
                RapportWindow.document.write(Linje);
                RapportWindow.print();
            }


        }
    };
    xhr.send(JSON.stringify(MJson));

    //document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}
function DoPrintRapport2() {
    // 
   
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var Periode2 = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;
    var e4 = document.getElementById('drpKunde');
    var Customer = e4.options[e4.selectedIndex].value;
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



    var MJson = '{"Customer" : "' + Customer + '", "Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

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
            
            
            
            Linje = "Vare tottalt " + myObjE.length + "";
            Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
            Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

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

                    Eier = myObjE[key].Eier;
                    if (typeof myObjE[key].Kundenavn === 'undefined') { Eier = "Butikk"; } else { Eier = myObjE[key].Kundenavn; }
                    if (typeof myObjE[key].Status === 'undefined') { Statusen = "-"; } else { Statusen = myObjE[key].Status; } //  if (typeof myObjE[key].Status === 'undefined') { Statusen = "-"; } else { Statusen = myObjE[key].Status.substring(0, 3); }
                    if (typeof myObjE[key].Merke === 'undefined') { Merke = "-"; } else { Merke = myObjE[key].Merke.substring(0, 10); }
                    if (typeof myObjE[key].Modell === 'undefined') { Modell = "-"; } else { Modell = myObjE[key].Modell.substring(0, 25); }
                    if (typeof myObjE[key].LopLengde === 'undefined') { LopLengde = "-"; } else { LopLengde = myObjE[key].LopLengde.substring(0, 4); }
                    if (typeof myObjE[key].Leverandor === 'undefined') { Leverandor = "-"; } else { Leverandor = myObjE[key].Leverandor.substring(0, 25); }

                    if (Eier === "-") { Eier = "" }



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

    //document.getElementById('LagerListing').innerHTML = Linje + "wery" + "<br />";
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

   // document.getElementById('LagerListing').innerHTML = Linje + "wery" + "<br />";
}

function DoXlsx() {

    // 1001	-- == Salgsrapport == --
    // 1002	--== Innkjøpsrapport == -- 
    // 1003	--== Varebeholdningsrapport == --
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

            // 1001	-- == Salgsrapport == --
            if (Status == "1001") {


                //console.log(xhr.responseText);
                Linje = "Salg tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Utleveringsdato&nbsp;</td>  <td >&nbsp;Leverandør&nbsp;</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].Dato + "</td> <td >" + myObjE[key].Leverandor + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

                DoXlsxFile(myObjE, 'Salgsrapport', Status);
            }

            // --== Innkjøpsrapport == --
            else if (Status == "1002") {


                //console.log(xhr.responseText);
                Linje = "Innkjøp tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td> <td >&nbsp;Leverandør&nbsp;</td>  <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DatoOprettet + "</td> <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

                DoXlsxFile(myObjE, 'Innkjøpsrapport', Status);
            }

            else if (Status == "1003") {


                //console.log(xhr.responseText);
                Linje = "Vare tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DatoOprettet + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

                DoXlsxFile(myObjE, 'Varebeholdningsrapport', Status);
            }

            else {


                //console.log(xhr.responseText);
                Linje = Title + " tottalt " + myObjE.length + "";
                Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id = 'datatable-default' >  <thead>";
                Linje += "<tr style='background-color:#C0C0C0;'><td >&nbsp;Status&nbsp;</td><td >&nbsp;Mottaksdato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr></thead>";

                for (var key in myObjE) {
                    if (myObjE.hasOwnProperty(key)) {

                        if (typeof myObjE[key].Eier === 'undefined') {
                            Eier = "Butikk";
                        }
                        else {

                            //Eier = myObjE[key].Eier;
                            Eier = myObjE[key].Kundenavn;
                        }

                        if (myObjE[key].Kundenavn === "-") { Eier = "Butikk" }



                        if (ColorLine == "gradeX") { ColorLine = "gradeC"; } else { ColorLine = "gradeX"; }
                        Linje += "<div id='R" + key + "'><tr class='" + ColorLine + "'  id='list" + key + "'><td >" + myObjE[key].Status + ", <a onclick=\"document.location.href='Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "'\" href=\"#\">" + Eier + "</a></td><td >" + myObjE[key].DatoOprettet + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td ><a onclick=\"document.location.href='Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].gID + "'\" href=\"#\">" + myObjE[key].Serienummer + "</a></td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    }
                }

                Linje += "</tbody> </table>";

                document.getElementById('Rapporten').innerHTML = Linje + "&nbsp;<br />";

                DoXlsxFile(myObjE, Title, Status);
            }

            
        }
    };
    xhr.send(JSON.stringify(MJson));

    //document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}

function DoXlsxFile(jsonData, arkNavn, Qstatus) {
    var e1 = document.getElementById('drpRapportLager');
    var TypeRapp = e1.options[e1.selectedIndex].text;
    var Title = e1.options[e1.selectedIndex].text;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].text;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;


    // Variabler
    const filnavn = "GunStockOne_" + arkNavn;
    const navn = "BrukerNavn";
    const Overskrift = TypeRapp + " " + Periode + " " + Ar;
    const Logo = localStorage.getItem('BaseAKA');
    //const arkNavn = "MinArk";

    // Lag en XMLHttpRequest
    const xhr = new XMLHttpRequest();
    //xhr.open("POST", "XLSX/GenerateExcel", true);
    //xhr.open("POST", "XLSX/GenerateExcel?filnavn=DataExport&navn=StandardNavn&arkNavn=DataArk", true);
    // Åpne forespørselen med URL-parametere for variablene
    xhr.open(
        "POST",
        `XLSX/GenerateExcel?Logo=${encodeURIComponent(Logo)}&filnavn=${encodeURIComponent(filnavn)}&navn=${encodeURIComponent(navn)}&arkNavn=${encodeURIComponent(arkNavn)}&Overskrift=${encodeURIComponent(Overskrift)}&Qstatus=${encodeURIComponent(Qstatus)}`,
        //"XLSX/GenerateExcel",
        true
    );
    xhr.responseType = "blob"; // Viktig for å håndtere binærdata som kommer fra API-et

    // Sett Content-Type header
    xhr.setRequestHeader("Content-Type", "application/json");

    // Når forespørselen er ferdig
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Opprett en blob fra responsen
            const blob = new Blob([xhr.response], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });

            // Hent filnavnet fra Content-Disposition-headeren
            const disposition = xhr.getResponseHeader("Content-Disposition");
            let fileName = "NedlastetFil.xlsx"; // Standard fallback-navn

            if (disposition) {
                // Håndter filename*=UTF-8''GunStockOne_Utl%C3%A5n.xlsx
                const filenameStarMatch = disposition.match(/filename\*=UTF-8''([^;]+)/);
                if (filenameStarMatch && filenameStarMatch[1]) {
                    fileName = decodeURIComponent(filenameStarMatch[1]); // Dekoder URL-encodet filnavn
                } else {
                    // Håndter vanlig filename="GunStockOne.xlsx"
                    const filenameMatch = disposition.match(/filename="?([^"]+)"?/);
                    if (filenameMatch && filenameMatch[1]) {
                        fileName = filenameMatch[1];
                    }
                }
            }

            // Opprett en URL for å laste ned filen
            const url = window.URL.createObjectURL(blob);

            // Lag en lenke og klikk på den programmatisk for å starte nedlasting
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);

            

            //alert("Excel-filen er lastet ned!");
        } else {
            alert(`Kan ikke Generere, ikke noen data tilgjengelige  ${xhr.statusText}`);
            console.error(`Statuskode: ${xhr.status}, Feilmelding: ${xhr.statusText}`);
        }
    };

    // Håndter feil under forespørselen
    xhr.onerror = function () {
        alert("Kan ikke Generere, ikke noen data tilgjengelige.");
    };

    // Send forespørselen med JSON-dataen
    xhr.send(JSON.stringify(jsonData));




}