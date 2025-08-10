/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced only used by Halvard
 */









function DoLoadThings() {




  
    
}





// **********************************************
// *****         Tools            ***************
// **********************************************



function HotKay(event) {
    var x = event.which || event.keyCode;
    var url = document.getElementById("searchInput_TOP").value.toString()
    if (x == 167) {
        //alert(url);
        //DoNewBrowserTab(url.substring(0, url.length - 1), 0, "test");
        document.getElementById("searchInput_TOP").value = url.substring(0, url.length);
        DoNewBrowserTab(url.substring(0, url.length), 0, "test");
    }
}

// **********************************************
// *****         Login            ***************
// **********************************************






// DoLogOut
function DoLogOut() {

    var Password = localStorage.getItem('SessionPassword');
    var MJson = '{"DoLogOut" : "' + Password + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            DeletCookie('ClientName');
            DeletCookie('SessionPassword');
            deleteAllCookies();
            document.location.href = 'index.html';

        }
    };
    xhr.send();
}








// FrontPage
function GetBySerial(Serial) {

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL;

    if (Serial != "") {
        url = ServerURL + "lookup/"; //+ Serial.replaceAll(".", "§").replaceAll("+", "£") + "?SessionPassword=" + localStorage.getItem('SessionPassword');
        var MJson = '{"Search" : "0_' + encodeURIComponent(Serial) + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                //console.log(xhr.responseText);
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);
                var are = myObj[0]; // get array number1

                if ((myObj[0] != null) & (myObj[1] == null)) {

                    document.getElementById('Listing').style = "display:none;";
                    document.getElementById('Singel').style = "display:block;";
                    if (typeof are.Eier === 'undefined') { document.getElementById('txtNavn').value = "Butikk"; } else { document.getElementById('txtNavn').value = are.Eier; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.Kunde_ID; }

                    document.getElementById('txtID').value = are.ID;
                    document.getElementById('txtKunde_ID').value = are.Kunde_ID;
                    document.getElementById('txtModell').value = are.Modell;
                    document.getElementById('txtSerie').value = are.Serienummer;
                    document.getElementById('txtLeverandor').value = are.Leverandor;
                    document.getElementById('txtMekanisme').value = are.Mekanisme;
                    document.getElementById('txtMerke').value = are.Merke;
                    document.getElementById('txtCaliber').value = are.Caliber;
                    document.getElementById('txtLopLengde').value = are.LopLengde;
                    document.getElementById('txtDato').value = are.Dato;
                    if (typeof are.Kundenavn === 'undefined') { document.getElementById('AEier').innerHTML = "Butikk"; } else { document.getElementById('AEier').innerHTML = are.Kundenavn; document.getElementById('AEier').href = "costumerCard.html?TempUserID=" + are.Kunde_ID; }

                    document.getElementById('Utlever').hidden = true; document.getElementById('Retur').hidden = true;
                    if (are.Status == 'Utlevert') { document.getElementById('Retur').hidden = false; document.getElementById('Utlever').hidden = true; } // Status 3
                    if (are.Status == 'Reservert') { document.getElementById('Utlever').hidden = false; document.getElementById('Retur').hidden = true; } // Status 2

                    // document.getElementById('AEier').innerHTML = are.Kundenavn;
                }

                else if (myObj[1] != null) {

                    document.getElementById('Singel').style = "display:none;";
                    document.getElementById('Listing').style = "display:block;";
                    var listing = '';

                    listing = " <table style='width:100%;'> <tr> <td style='width:100px;' >Serie</td> <td style='width:250px;'>Eier</td> <td style='width:150px;'>Modell</td> <td style='width:150px;'>Mekanisme</td> </tr>";
                    for (var key in myObj) {
                        if (myObj.hasOwnProperty(key)) {

                            if (myObj[key].Eier == "Butikk" || myObj[key].Eier === 'undefined' || myObj[key].Eier === undefined) {
                                listing += '';
                                //listing += "<tr> <td >" + myObj[key].Serienummer + "</td> <td>" + myObj[key].Kundenavn + "</td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Mekanisme + "</td> </tr>";
                            }
                            else {
                                listing += "<tr> <td ><a style=\"cursor: pointer;\" onclick='javascript:document.getElementById(\"txtSerial\").value=\"" + myObj[key].Serienummer + "\";GetBySerial(\"" + myObj[key].ID + "\");'>" + myObj[key].Serienummer + "</a></td> <td>" + myObj[key].Eier + "</td> <td>" + myObj[key].Modell + "</td> <td>" + myObj[key].Mekanisme + "</td> </tr>";
                            }

                        }
                    }
                    listing += "</table>";

                    document.getElementById('Listing').innerHTML = listing;

                    Serial = "";
                }

                else {
                    document.getElementById('Listing').innerHTML = 'No Hits :-|';
                }


            }
        };
        xhr.send(JSON.stringify(MJson));


    }

    else { alert_OK("OBS.", "Finner Ikke Treff", 3);  document.getElementById('Singel').style = "display:none;"; }


}


function DashBoardUtleverUpdateVapen(Status, Serienummer, Kunde_ID, Mekanisme) {

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

            
         
            document.getElementById('Retur').hidden = false; document.getElementById('Utlever').hidden = true;

            alert('Våpen ble utlevert korrekt.');
            GetBySerial(Serienummer);

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoReturnVapen(Status, Mekanisme, Serienummer, Kunde_ID, Eier, ID, DateReserved) {

    var MJson = "";
    if ((typeof ID === 'undefined') || (ID == 'undefined')) {

        var e = document.getElementById('drpSalgVapenMulti');
        var ID = e.options[e.selectedIndex].value;

    }


    MJson += '{';
    MJson += '"Status" : "' + Status + '" ';
    MJson += ', "Serienummer" : "' + encodeURIComponent(Serienummer) + '"';
    MJson += ', "Mekanisme" : "' + Mekanisme + '"';
    MJson += ', "Switch" : "1"';
    MJson += ', "Kunde_ID" : "' + Kunde_ID + '"';
    MJson += ', "DateReserved" : ""';
    MJson += ', "ID" : "' + ID + '"';
    MJson += ', "Eier" : "' + Eier + '"';
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

            document.getElementById('Utlever').hidden = false; document.getElementById('Retur').hidden = true;
          
            alert('Våpenet korrekt mottatt.');
            GetBySerial(Serienummer);

        }
    };
    xhr.send(JSON.stringify(MJson));

}