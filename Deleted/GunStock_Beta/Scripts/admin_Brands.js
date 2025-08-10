

window.onload = codeAddress;

function codeAddress() {
    if (readCookie('CLientLevel') == "0") { document.location.href = 'https://www.vg.no'; }

    DoFillForm("txtSetting", 10, '');
    DoFillConfig()
  
    parent.ScrollMainToTop();

    DoFill("MdrpMekanisme", 2, '');
    DoFill("MdrpMerke", 3, '');
    DoFill("MdrpModel", 4, '');



}
//DoFill("MdrpLeverandor", 1, '');


// *****************  Config ********************
function DoFillConfig() {
    // Fill Config Boxes
    DoFill("txtListMekanisme", 2, '', 1);
    //DoFill("txtListLeverandor", 1, '');
    DoFill("txtListMerke", 3, '');
   // DoFill("drpEditLeverandorMerker", 42, ''); //42
    //DoFill("MdrpModel", 4, '');
}







function DoInsertModell() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditModellID').value + '" ';
    MJson += ', "Merke" : "' + document.getElementById('txtEditModell').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerke').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoModell/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = Http.responseText.toString();
            DoFill('txtListModell', 41, txtEditMerkeID.value);
            document.getElementById('txtEditModell').value = '';
            document.getElementById('txtEditModellID').value = '';

        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoDeleteModell(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Merke" : "-1"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';

    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoModell/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            DoFill('txtListModell', 41, txtEditMerkeID.value);
            // document.getElementById('txtEditModell').value = '';
            document.getElementById('txtEditModellID').value = '';
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoInsertMekanisme() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditMekanismeID').value + '" ';
    MJson += ', "Mekanisme" : "' + document.getElementById('txtEditMekanisme').value.replace(/["']/g, '\'\'') + '"';
    //MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerkeID').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMekanisme/";

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            DoFill('txtListMekanisme', 2, '');
        }
    };
    xhr.send(JSON.stringify(MJson));
}

function DoDeleteMekanisme(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Mekanisme" : "-1"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';

    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMekanisme/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("txtEditMekanismeID").value = '';
            document.getElementById("txtEditMekanisme").value = '';
            DoFill('txtListMekanisme', 2, '');
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoInsertMerke() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditMerkeID').value + '" ';
    MJson += ', "Merke" : "' + document.getElementById('txtEditMerke').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merke_Id" : "' + document.getElementById('txtEditMerkeID').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMerke/";

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            document.getElementById("txtEditMerkeID").value = document.getElementById('txtEditMerke').value;
            DoFill('txtListMerke', 3, '');
        }
    };
    xhr.send(JSON.stringify(MJson));
}

function DoDeleteMerke(ID) {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + ID + '" ';
    MJson += ', "Merke" : "-1"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';

    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoMerke/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //document.getElementById("MidLev2").innerHTML = xhr.responseText.toString();
            document.getElementById("txtEditMerkeID").value = '';
            DoFill('txtListMerke', 3, '');
        }
    };
    xhr.send(JSON.stringify(MJson));

}
// Config End

/*
function DoInsertLeverandor() {
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditLeverandorID').value + '" ';
    MJson += ', "Leverandor" : "' + document.getElementById('txtEditLeverandor').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtEditLeverandorAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtEditLeverandorPost').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Text" : "' + document.getElementById('txtEditText').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merker" : "' + document.getElementById('txtEditLeverandorMerker').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtEditLeverandorTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ' } ';


    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLeverandor/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            DoRefillLeverandorList();
            //document.getElementById("MidLev").innerHTML = xhr.responseText.toString();
            document.getElementById('butAddLev').disabled = false;
            document.getElementById('txtEditLeverandor').disabled = true;
            document.getElementById('txtListLeverandor').disabled = false;
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoDeleteLeverandor(ID) {

    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "-1" ';
    MJson += ', "DeleteID" : "' + ID + '"';
    MJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLeverandor/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            DoRefillLeverandorList();
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function DoFillLeverandorFields() {

    document.getElementById('butUpdateLev').style = "visibility: visible;";
    //document.getElementById('butAddLev').style = "visibility: hidden";
    //document.getElementById('txtEditLeverandor').disabled = "disabled";
    // txtEditLeverandor
    var e = document.getElementById('txtListLeverandor');
    var SelectedID = e.options[e.selectedIndex].value;
    var SelectedV = e.options[e.selectedIndex].text;
    txtEditLeverandor.value = SelectedV;
    //MidLev.innerHTML = SelectedV;
    DoGetLeverandor(SelectedID);
}

function DoAddMerker() {
    if (document.getElementById('txtEditLeverandor').value == "") { alert('Velg Leverandør !!') }
    else {
        var e = document.getElementById('drpEditLeverandorMerker');
        var Merke = e.options[e.selectedIndex].text;
        var Value = e.options[e.selectedIndex].value;
        var x = document.getElementById("txtListLeverandorMerker");
        var option = document.createElement("option");
        option.text = Merke;
        option.value = Value;
        x.add(option);


        var select = document.getElementById("txtListLeverandorMerker");
        var length = select.options.length;
        var n = txtEditLeverandorMerker.value;
        var n2 = "";
        txtEditLeverandorMerker.value = "";

        for (i = 0; i < length; i++) {

            //alert(n.search(select.options[i].value) + ' ----> ' + n + ' = ' + select.options[i].value);
            if (n.search(select.options[i].value) == -1) {
                n += ',' + select.options[i].value;
                // select.remove(i);

            }
        }

        txtEditLeverandorMerker.value = n;
        TotxtListLeverandorMerker();

    }
}

*/



