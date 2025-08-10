

window.onload = codeAddress;

function codeAddress() {
    if (readCookie('CLientLevel') == "0") { document.location.href = 'https://www.vg.no'; }
  
 
   
    parent.ScrollMainToTop();

    //document.getElementById('Home').style = "display:Block;";
    
   

    DoFill("txtListLeverandor", 1, '');

}
//DoFill("MdrpLeverandor", 1, '');


// *****************  Config ********************
function DoFillConfig() {
    // Fill Config Boxes
    DoFill("txtListMekanisme", 2, '', 1);
    DoFill("txtListLeverandor", 1, '');
    DoFill("txtListMerke", 3, '');
    DoFill("drpEditLeverandorMerker", 42, ''); //42
    //DoFill("MdrpModel", 4, '');
}


function DoRefillLeverandorList() {
    var select = document.getElementById("txtListLeverandor");
    var length = select.options.length;
    for (i = 0; i <= length; i++) {
        select.options[i] = null;
    }
    DoFill("txtListLeverandor", 1, '');
}

function DoMakeNewLeverandor() {
    document.getElementById('txtEditLeverandorID').value = "";
    document.getElementById('txtEditLeverandor').value = "";
    document.getElementById('txtEditLeverandorAdresse').value = "";
    document.getElementById('txtEditLeverandorPost').value = "";
    document.getElementById('txtEditText').value = "";
    document.getElementById('txtEditLeverandorTelefon').value = "";

    var select = document.getElementById("txtListLeverandorMerker");
    var length = select.options.length;
    for (i = 0; i <= length; i++) {
        select.options[i] = null;
    }

    document.getElementById('butUpdateLev').style = "visibility: visible;";
    document.getElementById('butAddLev').style = "visibility: visible;";
    document.getElementById('txtEditLeverandor').disabled = false;
    document.getElementById('butAddLev').disabled = true;
    document.getElementById('txtListLeverandor').disabled = true;



    if (document.getElementById('txtEditLeverandor').value = "") { alert("Skriv inn et leverandørnavn :-)") } //else { DoInsertLeverandor()}


}



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
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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
    txtEditLeverandorID.value = SelectedID;
    //MidLev.innerHTML = SelectedV;
    DoGetLeverandor(SelectedID);
}

function DoGetLeverandor(S) {
    var urlD = "";
    if (S == "") { urlD = ServerURL + "DoLeverandor?id=0&Vari=0&BaseAKA="+readCookie("BaseAKA"); } else { urlD = ServerURL + "DoLeverandor?id=" + S + "&Vari=0&BaseAKA="+readCookie("BaseAKA"); }


    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = urlD;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            var myObjE = JSON.parse(xhr.responseText);
            var myObjE = JSON.parse(myObjE);
            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    document.getElementById('txtEditLeverandorAdresse').value = myObjE[key].Adresse;
                    document.getElementById('txtEditLeverandorPost').value = myObjE[key].Poststed;
                    document.getElementById('txtEditLeverandorID').value = S;
                    if (!myObjE[key].Merker) { document.getElementById('txtEditLeverandorMerker').value = "0"; }
                    else { document.getElementById('txtEditLeverandorMerker').value = myObjE[key].Merker; }

                    document.getElementById('txtEditText').value = myObjE[key].Text;
                    document.getElementById('txtEditLeverandorTelefon').value = myObjE[key].Telefon;

                }
            }
            TotxtListLeverandorMerker();
        }
    };
    xhr.send();
}

function TotxtListLeverandorMerker() {

    var LevSTR = document.getElementById('txtEditLeverandorMerker').value.toString().split(",");
    var Saddam = "";

    for (var key in LevSTR) {
        if (LevSTR[key] != "undefined") { Saddam += "(LevID.id = " + LevSTR[key] + ") or "; }
    }
    Saddam += "(LevID.id = -1) ";

    DoFill('txtListLeverandorMerker', 43, Saddam)

}


function DoDeleteLeverandor(ID) {

    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "-1" ';
    MJson += ', "DeleteID" : "' + ID + '"';
    MJson += ', "BaseAKA" : "' + readCookie('BaseAKA') + '"';
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


// Config End


