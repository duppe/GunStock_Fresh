
window.onload = codeAddress;

function codeAddress() {
    if (readCookie('CLientLevel') == "0") { document.location.href = 'https://www.vg.no'; }
   // CloseAllConfig();
    //DoFillForm("txtSetting", 10, '');
    //DoFillConfig()
    //document.getElementById('ConfigDiverse').style = 'display:block;';
    parent.ScrollMainToTop();

    //document.getElementById('Home').style = "display:Block;";
    DoFill("BrukerDrpDown", 10, '');



}
//DoFill("MdrpLeverandor", 1, '');


function DoGetUserSettings() {

    var e = document.getElementById('BrukerDrpDown');
    var BrukerID = e.options[e.selectedIndex].value;
    document.getElementById('BrukerClientEmail').value = "";
    document.getElementById('BrukerClientName').value = "";
    document.getElementById('BrukerClientPassword').value = "";
    document.getElementById('BrukerClientTimeOutValue').value = "";
    DoFillForm('Bruker', 11, BrukerID);
    // DoFill('BrukerClientLevelText',q,'','')
    SelectElementValue('BrukerClientLevelText2', document.getElementById('BrukerClientLevel').value);

}

function DoSendPassword(Email) {

    var MJson = '{"GetPassword" : "' + Email + '"';
    MJson += ', "ClientSessionPassword" : "' + readCookie('SessionPassword') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert(xhr.responseText);
        }
    };
    xhr.send();
}

function AddNewUser() {

    var MJson = "";
    var person = prompt("Skriv inn navnet på brukeren :", "Harry Potter");
    if (person == null || person == "") {
        alert("Feil ved inntasting.");
    } else {
        MJson += '{';
        MJson += '"Switch" : "1" ';
        MJson += ', "ClientName" : "' + person + '"';
        MJson += ', "ClientSessionPassword" : "' + readCookie('SessionPassword') + '"';
        MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
        MJson += ', "BrukerID" : ""';
        MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(person + ' ble lagt Inn.');
                DoFill("BrukerDrpDown", 10, '');

            }
        };
        xhr.send(JSON.stringify(MJson));
    }
}

function DoUpdateUser() {

    var e = document.getElementById('BrukerDrpDown');
    var BrukerID = e.options[e.selectedIndex].value;
    var MJson = "";

    MJson += '{';
    MJson += '"Switch" : "2" ';
    MJson += ', "ClientEmail" : "' + document.getElementById('BrukerClientEmail').value + '"';
    MJson += ', "ClinetEnable" : "' + document.getElementById('BrukerClinetEnable').checked + '"';
    MJson += ', "ClientTimeOutValue" : "' + document.getElementById('BrukerClientTimeOutValue').value + '"';
    MJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
    MJson += ', "ClientPassword" : "' + document.getElementById('BrukerClientPassword').value + '"';
    MJson += ', "ClientName" : "' + document.getElementById('BrukerClientName').value + '"';
    MJson += ', "ClientSessionPassword" : "' + readCookie('SessionPassword') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ', "BrukerID" : "' + BrukerID + '"';

    var c = document.getElementById("BrukerClientLevelText2");
    MJson += ', "ClientLevelText" : "' + c.options[c.selectedIndex].text + '"';

    var d = document.getElementById("BrukerClientLevelText2");
    MJson += ', "ClientLevel" : "' + d.options[d.selectedIndex].value + '"';

    var e = document.getElementById("BrukerDrpDown");
    MJson += ', "ClientName" : "' + e.options[e.selectedIndex].text + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "User/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert(xhr.responseText);
            //DoFill("BrukerDrpDown", 10, '');

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoDeleteUser() {

    if (confirm('Vil du virkelig slette ' + document.getElementById('BrukerClientName').value + '?')) {
        var e = document.getElementById('BrukerDrpDown');
        var BrukerID = e.options[e.selectedIndex].value;
        var MJson = "";

        MJson += '{';
        MJson += '"Switch" : "3" ';
        MJson += ', "ClientEmail" : "' + document.getElementById('BrukerClientEmail').value + '"';
        MJson += ', "ClientSessionPassword" : "' + readCookie('SessionPassword') + '"';
        MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
        MJson += ', "BrukerID" : "' + BrukerID + '"';
        MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
                DoFill("BrukerDrpDown", 10, '');
                document.getElementById('BrukerClientEmail').value = "";
                document.getElementById('BrukerClientName').value = "";
                document.getElementById('BrukerClientPassword').value = "";
                document.getElementById('BrukerClientTimeOutValue').value = "";


            }
        };
        xhr.send(JSON.stringify(MJson));

    } else {
        // Do nothing!

    }


}

function DoKickAllUsers() {

    if (confirm('Vil du virkelig Kaste ut alle brukere?')) {
        var MJson = "";

        MJson += '{';
        MJson += '"Switch" : "4" ';
        MJson += ', "ClientEmail" : "' + readCookie("CLientEmail") + '"';
        MJson += ', "ClientSessionPassword" : "' + readCookie('SessionPassword') + '"';
        MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
        MJson += ' } ';

        var xhr = new XMLHttpRequest(),
            method = "POST",
            url = ServerURL + "User/";


        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {

                alert(xhr.responseText);
                DoFill("BrukerDrpDown", 10, '');

            }
        };
        xhr.send(JSON.stringify(MJson));

    } else {
        // Do nothing!

    }


}