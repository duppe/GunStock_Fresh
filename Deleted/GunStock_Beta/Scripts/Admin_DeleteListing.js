
window.onload = codeAddress;

function codeAddress() {
    if (readCookie('CLientLevel') == "0") { document.location.href = 'https://www.vg.no'; }
    


}


setTimeout(() => {
    DoFillSletteListe();
}, 1000);


function DoFillSletteListe() {

    /*
    // 
    var e1 = document.getElementById('drpRapportLager');
    var Status = e1.options[e1.selectedIndex].value;
    var e2 = document.getElementById('drpRapportPeriode');
    var Periode = e2.options[e2.selectedIndex].value;
    var e3 = document.getElementById('drpRapportAr');
    var Ar = e3.options[e3.selectedIndex].value;

    // and (Dato < '2019-04-27') AND (Dato > '2017-04-27')
    */

    var Eier = "";
    var Linje = "";
    var num = "1";
    var ColorLine = "f6f6f6";



    var xhr = new XMLHttpRequest(),
        method = "POST", url = ServerURL + "lookup/";
    var MJson = '{"Search" : "71_999|6|0", "SessionPassword" : "' + readCookie('SessionPassword') + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);

            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);

            Linje = " <table style='width: 100%;border: thin solid #a2a9b1;'  >";
            Linje += "<tr style='background-color:#C0C0C0;'><td style='width: 50px;'>&nbsp;Valg&nbsp;&nbsp;</td><td >&nbsp;Status&nbsp;</td><td >&nbsp;Dato&nbsp;</td>   <td >Merke</td> <td>Modell</td> <td >Caliber</td> <td>LøpLengde</td> <td>Serienummer</td>  <td>Mekanisme</td> </tr>";

            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (typeof myObjE[key].Eier === 'undefined') {
                        Eier = "Butikk";
                    }
                    else {
                        Eier = myObjE[key].Eier;
                    }
                    //DoNewBrowserTab('InsertWeapon.html',null,'Våpen')
                    if (ColorLine == "f6f6f6") { ColorLine = "FFFFFF"; } else { ColorLine = "f6f6f6"; }
                  //  Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\" onclick=\'DoDeleteSletteListe(\"" + myObjE[key].ID + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Mekanisme + "\");\'>Slett</a>&nbsp;&nbsp;&nbsp;<a href=\"#\" onclick=\'DoModifyListing(\"" + key + "\",\"" + myObjE[key].Leverandor + "\",\"" + myObjE[key].Merke + "\",\"" + myObjE[key].Modell + "\",\"" + myObjE[key].Caliber + "\",\"" + myObjE[key].LopLengde + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Status + "\",\"" + myObjE[key].Mekanisme + "\",\"" + Eier + "\");\'>Rediger</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td >" + myObjE[key].Status + ", " + Eier + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                    Linje += "<div id='R" + key + "'><tr style='background-color:#" + ColorLine + ";' id='list" + key + "'><td>&nbsp;<a href=\"#\" onclick=\'DoDeleteSletteListe(\"" + myObjE[key].ID + "\",\"" + myObjE[key].Serienummer + "\",\"" + myObjE[key].Mekanisme + "\");\'>Slett</a>&nbsp;&nbsp;&nbsp;<a href=\"#\" onclick=\'parent.DoNewBrowserTab(\"InsertWeapon.html?id=" + myObjE[key].ID + "\",\"null\",\"Våpen\");\'>Rediger</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td >" + myObjE[key].Status + ", " + Eier + "</td><td >" + myObjE[key].Dato + "</td>  <td >" + myObjE[key].Merke + "</td> <td >" + myObjE[key].Modell + "</td> <td >" + myObjE[key].Caliber + "</td> <td>" + myObjE[key].LopLengde + "</td> <td >" + myObjE[key].Serienummer + "</td> <td >" + myObjE[key].Mekanisme + "</td> </tr></div>";
                }
            }

            Linje += "</table>";

            document.getElementById('SletteListe').innerHTML = Linje + "&nbsp;<br />";
        }
    };
    xhr.send(JSON.stringify(MJson));

    document.getElementById('SletteListe').innerHTML = Linje + "&nbsp;<br />";
}

function DoDeleteSletteListe(Key, Serial, Mekanisme) {

    var result = confirm("Vil Du Virkelig Slette '" + Serial + "(" + Mekanisme + ")" + "'?");
    if (result) {

        var MJson = '{"ID" : "' + Key + '", "SessionPassword" : "' + readCookie('SessionPassword') + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';

        var xhr = new XMLHttpRequest(),
            method = "DELETE",
            url = ServerURL + "DoUpdateVapen?jsonstring="+MJson;
        

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                DoFillSletteListe();
            }
        };
        xhr.send();

    }


}

