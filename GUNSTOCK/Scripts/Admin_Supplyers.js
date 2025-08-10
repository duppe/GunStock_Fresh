
//DoFill("MdrpLeverandor", 1, '');

//const { localstorage } = require("modernizr");


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

    var NewSupplyer = prompt("Leverandør Navn", "");
    if (!NewSupplyer == '') {
        document.getElementById('txtEditLeverandor').value = NewSupplyer;
        DoInsertLeverandor();
        location.reload();
    } else { location.reload();}

  //  if (document.getElementById('txtEditLeverandor').value = "") { alert("Skriv inn et leverandørnavn :-)") } //else { DoInsertLeverandor()}


}

function DoRemoveBrand() {


    Leverandor = localStorage.getItem('TempLeverandør');

    var V = document.getElementById('txtListLeverandorMerker');
    var Merke = V.options[V.selectedIndex].text;
    var Value = V.options[V.selectedIndex].value;
   

    if (window.confirm('Ønsker du virkelig å slette ' + Merke + ' fra leverandøren ?')) {
        // De trykket Ja :-)
    }
    else {
        return;
    }

    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "0"';
    MJson += ', "Leverandor" : "' + Leverandor + '"';
    MJson += ', "Text" : "' + Value + '"';
    MJson += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
    MJson += ' } ';


    var xhr = new XMLHttpRequest(),
        method = "POST",
        url = ServerURL + "DoLeverandor/";


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            //console.log(xhr.responseText);
            //DoInsertLeverandor();
            //document.location.reload();
            DoGetLeverandor(Leverandor)
            e.options[e.selectedIndex].value = Leverandor;
        }
    };
    xhr.send(JSON.stringify(MJson));




    
}

function DoAddMerker() {
    if (document.getElementById('txtEditLeverandor').value == "") { alert('Velg Leverandør !!'); return; }
    else {

        

        var e = document.getElementById('drpEditLeverandorMerker');
        var Merke = e.options[e.selectedIndex].text;
        var Value = e.options[e.selectedIndex].value;

        var x = document.getElementById("txtListLeverandorMerker");
        var option = document.createElement("option");
        option.text = Merke;
        option.value = Value;
        if (Merke == '') { return;}
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
        DoRefillLeverandorList();
        DoInsertLeverandor();
   
    }
}


function DoInsertLeverandor() {
    if (document.getElementById('txtEditLeverandor').value == "") {return; }
    var MJson = "";

    MJson += '{';
    MJson += '"ID" : "' + document.getElementById('txtEditLeverandorID').value + '" ';
    MJson += ', "Leverandor" : "' + DoHTMLencode(document.getElementById('txtEditLeverandor').value) + '"';
    MJson += ', "Adresse" : "' + document.getElementById('txtEditLeverandorAdresse').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Poststed" : "' + document.getElementById('txtEditLeverandorPost').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Text" : "' + document.getElementById('txtEditText').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Merker" : "' + document.getElementById('txtEditLeverandorMerker').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "Telefon" : "' + document.getElementById('txtEditLeverandorTelefon').value.replace(/["']/g, '\'\'') + '"';
    MJson += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
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

    if (window.confirm('Ønsker du virkelig å slette denne leverandøren ?')) {
        // De trykket Ja :-)
    }
    else {
        return;
    }


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
            document.getElementById('txtEditLeverandor').value = '';
            document.getElementById('txtEditLeverandorAdresse').value = '';
            document.getElementById('txtEditLeverandorPost').value = '';
            document.getElementById('txtEditLeverandorTelefon').value = '';
            document.getElementById('txtEditText').value = '';
            removeOptions('txtListLeverandorMerker');
            

            
        }
    };
    xhr.send(JSON.stringify(MJson));

}

function removeOptions(selectElement) {
    try {
        var i, L = selectElement.options.length - 1;
        for (i = L; i >= 0; i--) {
            selectElement.remove(i);
        }
    }
    catch { }
}

function DoFillLeverandorFields() {

    document.getElementById('butUpdateLev').style = "visibility: visible;";
    //document.getElementById('butAddLev').style = "visibility: hidden";
    //document.getElementById('txtEditLeverandor').disabled = "disabled";
    // txtEditLeverandor
    localStorage.setItem('TempLeverandør', document.getElementById('txtListLeverandor').value);
    var e = document.getElementById('txtListLeverandor');
    var SelectedID = e.options[e.selectedIndex].value;
    var SelectedV = e.options[e.selectedIndex].text;
    txtEditLeverandor.value = SelectedV;
    txtEditLeverandorID.value = SelectedID;
    //MidLev.innerHTML = SelectedV;
    DoGetLeverandor(SelectedID);
    document.getElementById('PicText').innerHTML = SelectedV;
}

function DoGetLeverandor(S) {
    var urlD = "";
    if (S == "") { urlD = ServerURL + "DoLeverandor?id=0&Vari=0&BaseAKA=" + localStorage.getItem("BaseAKA"); } else { urlD = ServerURL + "DoLeverandor?id=" + S + "&Vari=0&BaseAKA=" + localStorage.getItem("BaseAKA"); }


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



            myObjE = replaceNull(myObjE);

       


            for (var key in myObjE) {
                if (myObjE.hasOwnProperty(key)) {

                    if (myObjE[key].Adresse != undefined) { document.getElementById('txtEditLeverandorAdresse').value = myObjE[key].Adresse; }
                    if (myObjE[key].Poststed != undefined) { document.getElementById('txtEditLeverandorPost').value = myObjE[key].Poststed; }
                    document.getElementById('txtEditLeverandorID').value = S;
                    if (!myObjE[key].Merker) { document.getElementById('txtEditLeverandorMerker').value = "0"; }
                    else { document.getElementById('txtEditLeverandorMerker').value = myObjE[key].Merker; }

                    if (myObjE[key].Text != undefined) { document.getElementById('txtEditText').value = myObjE[key].Text; }
                    if (myObjE[key].Telefon != undefined) { document.getElementById('txtEditLeverandorTelefon').value = myObjE[key].Telefon; }

                }
            }
     
         
            TotxtListLeverandorMerker();
            
        }
    };
    xhr.send();
}

function replaceNull(someObj, replaceValue = "***") {
    const replacer = (key, value) =>
        String(value) === "null" || String(value) === "undefined" ? replaceValue : value;
    //^ because you seem to want to replace (strings) "null" or "undefined" too

    return JSON.parse(JSON.stringify(someObj, replacer));
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

/*
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
*/

// Config End


