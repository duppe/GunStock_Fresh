

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
        addOnSQL += " and (Status like '%|" + Status + "') ";
    }

    var MdrpLeverandor = document.getElementById('MdrpLeverandor');
    Leverandor = MdrpLeverandor.options[MdrpLeverandor.selectedIndex].text;

    if (!Leverandor ) {
        addOnSQL += " and (Leverandor like '%')";
    } else {
        addOnSQL += " and (Leverandor like '%|" + Leverandor  +"') ";
    }

    var MdrpMerke = document.getElementById('MdrpMerke');
    Merke = MdrpMerke.options[MdrpMerke.selectedIndex].text;

    if (!MdrpMerke) {
        addOnSQL += " and (Merke like '%')";
    } else {
        addOnSQL += " and (Merke like '%|" + Merke + "') ";
    }

    var MdrpModel = document.getElementById('MdrpModel');
    Model = MdrpModel.options[MdrpModel.selectedIndex].text;

    if (!MdrpModel) {
        addOnSQL += " and (Modell like '%')";
    } else {
        addOnSQL += " and (Modell like '%|" + Model + "') ";
    }

    var MdrpLokasjon = document.getElementById('MdrpLokasjon');
    Lokasjon = MdrpLokasjon.options[MdrpLokasjon.selectedIndex].text;

    if (!MdrpLokasjon) {
        addOnSQL += " and (LagerLokasjon like '%')";
    } else {
        addOnSQL += " and (LagerLokasjon like '%|" + Lokasjon + "') ";
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

            const StoreListCache = xhr.responseText;
            parsedData = JSON.parse(StoreListCache);
            localStorage.setItem("StoreListCache", parsedData);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje += "<div class='panel-body'>  <table class='table table-bordered table-striped mb-none' id='datatable-default' >  <thead>";
            Linje += "<tr style='background-color:#C0C0C0;'><td>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>  <td >Leverandor</td> <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> <td>LagerLokasjon</td> </tr></thead><tbody>";


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
                    Linje += "<div id='R" + key + "'><tr class='" + ColorLine + ";' id='list" + key + "'><td><div class=\"fa-hover mb-sm mt-sm col-md-6 col-lg-4 col-xl-3\"><i class=\"fa fa-edit\" onclick=\"document.location.href=\'Gunstock.html?page=InsertWeapon.html&id=" + myObjE[key].ID + "\'\"></i></div>&nbsp;</td><td >" + myObjE[key].Status + "&nbsp;(<a onclick=\"parent.DoNewBrowserTab('Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + " ',null,'KundeKort<br><b>" + Eier + "</b>')\" href=\"Gunstock.html?page=CostumerCard.html&TempUserID=" + myObjE[key].Kunde_ID + "\">" + Eier + "</a>)" + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Leverandor + "</td> <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> <td >" + myObjE[key].LagerLokasjon + "</td> </tr></div>";
                }
            }

            Linje += "</tbody> </table></div>";

            document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send(JSON.stringify(MJson));

    document.getElementById('LagerListing').innerHTML = Linje + "&nbsp;<br />";
}


function StoreListToXLSX() {
  
    const jsonData = localStorage.getItem("StoreListCache");
    const arkNavn = "StoreList";
    // Variabler
    const Qstatus = "StoreList";
    const filnavn = "GunStockOne_" + arkNavn;
    const navn = "BrukerNavn";
    const Overskrift = "Vapenoversikt";
    //const arkNavn = "MinArk";
    const Logo = localStorage.getItem('BaseAKA');

    // Lag en XMLHttpRequest
    const xhr = new XMLHttpRequest();
   
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
    xhr.send(jsonData);




}
