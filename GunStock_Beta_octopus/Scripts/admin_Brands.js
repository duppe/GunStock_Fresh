


function DoLoadThings() {
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







function DoInsertModell(Duppe) {

    /*
    if (Duppe = '') {
        Duppe = txtEditModell.value;
    }
    */

    if (Duppe != '') {
        var MJson = "";

        MJson += '{';
        MJson += '"ID" : "' + encodeURIComponent(document.getElementById('txtEditModellID').value.replace(/["']/g, '\'\'')) + '" ';
        MJson += ', "Merke" : "' + encodeURIComponent(Duppe.replace(/["']/g, '\'\'')) + '"';
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
    if (txtEditMekanisme.value != '') {
        var MJson = "";

        MJson += '{';
        MJson += '"ID" : "' + encodeURIComponent(document.getElementById('txtEditMekanismeID').value.replace(/["']/g, '\'\'')) + '" ';
        MJson += ', "Mekanisme" : "' + encodeURIComponent(document.getElementById('txtEditMekanisme').value.replace(/["']/g, '\'\'')) + '"';
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
    if (txtEditMerke.value != '') {
        var MJson = "";

        MJson += '{';
        MJson += '"ID" : "' + encodeURIComponent(document.getElementById('txtEditMerkeID').value.replace(/["']/g, '\'\'')) + '" ';
        MJson += ', "Merke" : "' + encodeURIComponent(document.getElementById('txtEditMerke').value.replace(/["']/g, '\'\'')) + '"';
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

function GetBrandPopUp() {
    var Brand = prompt("Skriv inn Merke Navn", "");

    if (Brand != null) {

        document.getElementById('txtEditMerkeID').value = '';
        document.getElementById('txtEditMerke').value = Brand;
        DoInsertMerke();

    }
}

function GetModelPopUp() {
    var Model = prompt("Skriv inn Modell Navn", "");

    if (Model != null) {

        txtEditModellID.value = Model;
        document.getElementById('txtEditModell').disabled = false;
        document.getElementById('txtEditModell').value = Model;
        DoInsertModell(Model);
    }
}

function GetMechanismPopUp() {
    var Mechanism = prompt("Skriv inn Mekanisme Navn", "");

    if (Mechanism != null) {
               
        document.getElementById('txtEditMekanisme').disabled = false;
        document.getElementById('txtEditMekanisme').value = Mechanism;
        DoInsertMekanisme();
    }
}