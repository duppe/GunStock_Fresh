//Shared

//const { localstorage } = require("modernizr");

//const { localstorage } = require("modernizr");

//const { Doc } = require("../assets/vendor/codemirror/lib/codemirror");

//window.onload = codeAddress;
var ServerURL = '../api/';
var filesadded = "";

// Listen Handlers
window.addEventListener('load', function () {
    codeAddress();
})


var events = ["mouseup", "keydown", "scroll", "mousemove"];
document.addEventListener("DOMContentLoaded", function () {
    events.forEach(function (e) {
        document.addEventListener(e, function () {
            endTime = Date.now() + 10000;

            if (e === "mouseup") {
                try {
                    document.getElementById("AlertBox").innerHTML = '';
                }
                catch { }
                }

            else if (e === "keydown") {
                
                localStorage.setItem('txtSessionTimeOut', '0');
                document.getElementById("AlertBox").innerHTML = '';
            }
           
            else if (e === "mousemove") {
                
                localStorage.setItem('txtSessionTimeOut','0') ;
            }

            
        });
    });
});




function codeAddress() {

   
    page = QueryString('page');
    HeadName = QueryString('HeadName');
    if (page === null) { page = 'inside.html';}

    /*
    var path = window.location.pathname;
    var page = path.split("/").pop();
    */

    DoMainContent(page);
    document.getElementById('HeadName').innerHTML = HeadName;
   
    //ElementTest()
    var Password = '';//params.get("Q"); document.getElementById('txtPassword').value = Password;
    var ClientName = '';//params.get("ClientName");
    var CLientLevel = '';//params.get("ClientName");

    if (Password == "") { Password = localStorage.getItem('SessionPassword'); }
    if (ClientName == "") { ClientName = localStorage.getItem('ClientName'); }
    if (CLientLevel == "") { CLientLevel = localStorage.getItem('CLientLevel'); }

    if (Password == "") {
        DoLogOut();
        document.location.href = 'index.html';
    }
    CheckSessionPass(Password, ClientName);
  //  document.getElementById('User').innerHTML = localStorage.getItem('ClientName');

    
    localStorage.setItem('txtSessionTimeOut','0');


    DoDo();
}
// When a page (html) loads, this is executed
function DoOnPageLoad(page) {

    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }

    try {
        document.getElementById('divFirmName').innerHTML = localStorage.getItem('FirmName');
    }
    catch { }

    if (page == "Rapport.html") {
        //document.getElementById('CostumScript').innerHTML = '<script type="text/javascript" src="Scripts/Rapport.js?1500"></script>';
        //document.getElementById('RapportID0').style = 'display:block';
       
        DoFill("drpRapportLager", 7, '', 1);
        //DoFillRapport();
    }


    if (page.includes("StoreList.html")) {

        const urlParams = new URLSearchParams(window.location.search);
        const PID = urlParams.get('TempUserID');

        if (PID != null) {
            localStorage.setItem('TempUserID', PID);
            // SendHistory(readCookie('CLientName'), 'CostumerCard.html?ID=' + SelectedV);

            //document.DoFillForm('txtSalg', '1', PID);
        }


        DoFill("MdrpLeverandor", 1, '', 1);
        DoFill("MdrpStatus", 31, '', 1);
        DoFill("MdrpMerke", 3, '', 1);
        DoFill("MdrpModel", 4, '', 1);
        DoFillListing('0_a');
    }

    if (page.includes("CostumerList.html")) {

        const urlParams = new URLSearchParams(window.location.search);
        const PID = urlParams.get('TempUserID');

        if (PID != null) {
            localStorage.setItem('TempUserID', PID);
            // SendHistory(readCookie('CLientName'), 'CostumerCard.html?ID=' + SelectedV);

            //document.DoFillForm('txtSalg', '1', PID);
        }
    }

    if (page.includes("CostumerCard.html")) {
        // alert(localStorage.getItem('ClientName'));
        const urlParams = new URLSearchParams(window.location.search);
        const PID = urlParams.get('TempUserID');

        if (PID != null) {
            localStorage.setItem('TempUserID', PID);
            // SendHistory(readCookie('CLientName'), 'CostumerCard.html?ID=' + SelectedV);
            DoFillForm('txtSalg', '1', PID);

            //DoFillForm('HeadText', '1', PID);
            DoFill('txtSelHistory', '6', PID);
            //  alert(document.getElementById('txtSalgKundenavn').value);
            DoPic();

            SendHistory(localStorage.getItem('CLientEmail'), 'CostumerCard.htmlTempUserID=' + localStorage.getItem('TempUserID'), 'Sett på ' + document.getElementById('txtSalgKundenavn').value, 'HistoryText');
           
        }

        if (document.getElementById('txtSalgKundenavn').value = 'Butikk') {
            document.getElementById('txtSalgKundenavn').disabled = true;
        }


    }
    

    if (page.includes("InsertWeapon.html")) {

        EmtyTextBox();

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        const Snr = urlParams.get('Snr');
        //if (Snr != null) { document.getElementById('MtxtSerienummer').value = Snr; } //CheckIfExist();}
      
        DoFill("MdrpLeverandor", 1, '', 1);
        DoFill("MdrpMekanisme", 2, '', 1);
        DoFill("MdrpMerke", 3, '', 1);
        DoFill("MdrpModel", 4, '', 1);
        DoFill("MdrpStatus", 71, '', 1);
  
        CheckIfExist();

        document.getElementById('MdrpEier').value = 'Butikk';
        document.getElementById('MdrpEier').disabled = true;
        //document.getElementById('MtxtBestilt').disabled = true;

        //document.getElementById('chkSerieNummer').disabled = true;



        // Hent dato
        document.getElementById('Mtxtdate').value = ToDaysDate();
        document.getElementById('MtxtBestilt').value = ToDaysDate();
        document.getElementById('MtxtDateOppdatert').value = ToDaysDate();

        setTimeout(function () {
            DoGetTheWeapon(id);
            document.getElementById('NoDokumentation').hidden = true;
            document.getElementById('Dokumentasjon').src = "https://documentation.dokumentasjon.eu/?FirmID=" + localStorage.getItem("FirmID") + "&ID=" + QueryString('id') + "&BaseAKA=" + localStorage.getItem("BaseAKA") + "&SessionPassword=" + localStorage.getItem("SessionPassword");
            document.getElementById('ShowPics').src = "https://documentation.dokumentasjon.eu/show.aspx/?FirmID=" + localStorage.getItem("FirmID") + "&ID=" + QueryString('id') + "&BaseAKA=" + localStorage.getItem("BaseAKA") + "&SessionPassword=" + localStorage.getItem("SessionPassword");
            if (id == null) { document.getElementById('DokumentationFrame').hidden = true; }
        }, 1000);
       


    }

    if (page.includes("Admin_Brands.html")) {

        DoLoadThings();

    }



    if (page.includes("Admin_Supplyers.html")) {

        //DoLoadThings();
        DoFill("txtListLeverandor", 1, '');
        DoFill("drpEditLeverandorMerker", 42, ''); //42
    }

    if (page.includes("Admin_DeleteListing.html")) {

        
            DoFillSletteListe();
     

    }

    if (page == "Admin_Users.html") {
        if (localStorage.getItem('CLientLevel') == "0") { alert('Ingen Tillgang !'); document.location.href = 'GunStock.html'; }
        DoFill("BrukerDrpDown", 10, '');
    }

    //  ************   MAL **************************
    // TempUserID=324238
    if (page.includes("mal.html")) {

        //DoLoadThings();
        DoFill("txtListLeverandor", 1, '');
        DoFill("drpEditLeverandorMerker", 42, ''); //42
    }
}




// Check SessionPass
function CheckSessionPass(SessionPass, ClientName) {

    if (SessionPass == null) {
        DoLogOut();
        document.location.href = 'index.html';
    }


    var MJson = '{"ClientSessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {


                SendError('SessionPass error for user ' + localStorage.getItem('ClientName') + ' (' + SessionPass + ' <> ' + localStorage.getItem('SessionPassword') + ')', 'ForceLogOf');
                //SendMail('ForceLogOf', 'SessionPass error for user ' + localStorage.getItem('ClientName') + ' (' + SessionPass + ' <> ' + localStorage.getItem('SessionPassword') + ')')

                DoLogOut();
                document.location.href = 'index.html';
            }

        }
    };
    xhr.send();
}

function DoDo() {
    setInterval(function () {
        var x = parseFloat(localStorage.getItem('txtSessionTimeOut')) + 1;
        
        if (x < 20) {
            document.title = 'GunStock_ONE (Idle)';
            document.getElementById('LoggStatus').innerHTML = 'idle &nbsp;&nbsp;&nbsp;' + x + '&nbsp;&nbsp;&nbsp;(' + localStorage.getItem('SessionPassword') + ')';
        }
        if (x < 2) {
            document.title = 'GunStock_ONE (In use)';
            document.getElementById('LoggStatus').innerHTML = 'Use &nbsp;&nbsp;&nbsp;' + x + '&nbsp;&nbsp;&nbsp;(' + localStorage.getItem('SessionPassword') + ')';
        }
        localStorage.setItem('txtSessionTimeOut',x) ;
        CheckSessionPass(localStorage.getItem('SessionPassword'), localStorage.getItem('ClientName'))
        document.getElementById('User').innerHTML = localStorage.getItem('ClientName');
        document.getElementById('UserRole').innerHTML = 'Innlogget';

    }, 1000);
}


function DoLogOut() {

    var Password = readCookie('SessionPassword');
    var MJson = '{"DoLogOut" : "' + Password + '", "BaseAKA" : "' + readCookie('BaseAKA') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoLogOn/1?Q=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            localStorage.clear();
            document.location.href = 'index.html';

        }
    };
    xhr.send();
}



//***************************************************************



function QueryString(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function DoFill(drpName, ConstantID, Vari, NoLeadBlank) {

    //var MJson = '{"Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFill/' + ConstantID + "?Vari=" + DoHTMLencode(Vari.replace('&','|')) + "&SessionPassword=" + localStorage.getItem('SessionPassword') + "&BaseAKA=" + localStorage.getItem('BaseAKA');
    //var IfPost = 'ConstantID' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + localStorage.getItem('SessionPassword');

    try {
        var dropdown = document.getElementById(drpName);
        dropdown.innerHTML = "";
        // Lag null linje
        if (typeof NoLeadBlank !== 'undefined') {
            addOption(dropdown, '', '');
        }
    }
    catch { }

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            try {
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);

                for (var key in myObj) {
                    if (myObj.hasOwnProperty(key)) {
                        addOption(dropdown, myObj[key].Text, myObj[key].id);
                    }
                }
            }

            catch (Error) { }

            DoCheckForNew(); // Sjekk NySalg DropDown om ny kunde
        }
    };
    xhr.send();

    function DoCheckForNew() {
        try {
            if (document.getElementById('drpSelKunde').options.length == 0) {
                butSelNewCostumer.style = "visibility:visible";
            }
            else {
                butSelNewCostumer.style = "visibility:hidden";
            }
        }
        catch (err) {}
    }

    function addOption(selectbox, text, value) {
        var optn = document.createElement("OPTION");
        optn.text = text;
        optn.value = value;

        selectbox.options.add(optn);
    }

}

function DoFillForm(drpName, ConstantID, Vari, BaseAKA) {

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFillForm/' + ConstantID + "?Vari=" + DoHTMLencode(Vari) + "&SessionPassword=" + localStorage.getItem('SessionPassword') + "&BaseAKA=" + localStorage.getItem('BaseAKA');

    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            try {
                var myObj = JSON.parse(xhr.responseText);
                var myObj = JSON.parse(myObj);
            }
            catch (err) { return; }


            var s = myObj;
            var txtX = "";

            var keys = [];
            for (var k in s) {
                //alert(k);
                txtX = drpName + k
                try {
                    document.getElementById(txtX).value = myObj[k].toString();
                }

                catch (err) { }

                try {

                    if (myObj[k].toString() == "true") {
                        document.getElementById(txtX).checked = true;
                    }
                    else {
                        document.getElementById(txtX).checked = false;
                    }


                }
                catch (err) { }

            }

          
            // Sjekk Våpen historie for Salg, og om kunden er bannet
            if (document.getElementById('txtSalgid')) {
                DoFill('txtSelHistory', '6', document.getElementById('txtSalgid').value);

                DoCheckVandel(document.getElementById('txtSalgid').value);
                document.getElementById('butBlankCostumer').style = 'display:none;';
                document.getElementById('divSelKunde').style = "display:none;";
            }

            // Controll admin_User UserLevel
            if (document.getElementById('BrukerClientLevelText2')) {
                
                if (document.getElementById('BrukerClientLevel').value == '') {
                    selectDropDownElement('BrukerClientLevelText2', '0');
                    document.getElementById('BrukerClientLevel').value = '0';
                }
                else {
                    selectDropDownElement('BrukerClientLevelText2', document.getElementById('BrukerClientLevel').value);
                }
            }

            
           
        }
    };
    xhr.send();

}

function DoHTMLencode(TheString) {

    try {
        TheString = TheString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(' ', "%20").replace(' ', "%20");
    }
    catch { }
    return TheString;
}

function DoNew(NSerial) {

    if (typeof NSerial === 'undefined') { NSerial = ''; }
   
    document.getElementById('Insert').style = 'display:block;height: 1001px;';
    document.getElementById('MSwitch').value = "1";
    document.getElementById('MtxtSerienummer').value = NSerial;

    DoFill("MdrpLeverandor", 1, '', 1);
    DoFill("MdrpMekanisme", 2, '', 1);
    DoFill("MdrpMerke", 3, '', 1);
    DoFill("MdrpModel", 4, '', 1);
    SelectElement("MdrpStatus", 1);

    document.getElementById('MtxtCaliber').value = '';
    document.getElementById('MtxtLopLengde').value = '';
    document.getElementById('MdrpEier').value = 'Butikk';
    document.getElementById('MdrpEier').disabled = true;


}

function writeCookie(name, value, days) {
    localStorage.setItem(name, value);
}

function readCookie(name) {

    return localStorage.getItem(name);
}

function DeletCookie(name) {
    localStorage.removeItem(name);
    ;
}

function DeleteAllCookies() {
    localStorage.clear();
}

function ScrollMainToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function SendError(Error, Text) {

    var MJson = '{"case" : "SendError", "Error" : "' + Error + '", "Text" : "' + Text + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/1?jsonstring=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {

                //alert('Du Logges ut fordi session nøkkelen er ugyldig. '); 
                //alert('Du logges ikke av :-) , men send gjerne URL til meg så jeg ser hvor du er :-) '); 
                //document.location.href = 'index.html';
            }

        }
    };
    xhr.send();
}

function SendMail(Subject, Body) {

    var MJson = '{"case" : "SendMail", "Body" : "' + Body + '", "Subject" : "' + Subject + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    //var myJSON = JSON.stringify(MJson);

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/1?jsonstring=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {


            }

        }
    };
    xhr.send();
}

function SendPing(Type) {

    var MJson = '{"case" : "UserActivity", "ClientSessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "Type" : "' + Type + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';
    //var myJSON = JSON.stringify(MJson);

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/1?jsonstring=" + MJson;



    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            var VALID = xhr.responseText.replace('"', '').replace('"', '').toString();
            if (VALID == 'false') {


            }

        }
    };
    xhr.send();
}

function formatDate(date) {
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    var myDate = new Date(date);

    var day = myDate.getDate();
    var monthIndex = myDate.getMonth;
    var year = myDate.getFullYear;

    // return "xx.xx.xx";
    return date;
    //return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

function SendFeedBack() {


    var TextToSend = document.getElementById('txtFeedBack').value;
    var FeedBackJson = '';

    if (TextToSend == '') {
        alert('Du må skrive noe !');
        return;
    }

    FeedBackJson += '{';
    FeedBackJson += '"case" : "FeedBack" ';
    FeedBackJson += ', "Text" : "' + TextToSend + '"';
    FeedBackJson += ', "ByUser" : "' + localStorage.getItem('ClientName') + '"';
    FeedBackJson += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "DoThings/?jsonstring=" + FeedBackJson;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            alert(xhr.responseText.toString());
            document.getElementById('txtFeedBack').value = '';


        }
    };
    xhr.send();
    //alert('Kommer Snart !/r/n' + TextToSend);
}

function DaysDate() {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var today = new Date();

    return today.toLocaleDateString("en-US", options); // Saturday, September 17, 2016

}

function ToDaysDate() {

    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day; 

    return today;
}

function includeHTML(element, FileName) {
    var z, i, elmnt, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute(element);
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute(element);
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
}

function DoMainContent(FileName) {
    element = 'MainContent';
   
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    try {
                        if (this.status == 200) { document.getElementById(element).innerHTML = this.responseText; }
                        if (this.status == 404) { document.getElementById(element).innerHTML = "Page not found."; }
                       
                    }
                    catch (error) {
                        console.log(error);
                    }
                    DoOnPageLoad(FileName); // Do Spesific page things;
                }
            }
    xhttp.open("GET", FileName, true);
            xhttp.send();
            /*exit the function:*/
       
}



function selectDropDownElement(id, valueToSelect) {
    let element = document.getElementById(id);
    element.value = valueToSelect;
}


function DoLoadFile(filename, filetype) {
    if (filetype == "js") { 
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { 
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

function DoCheckLoadFile(filename, filetype) {
    if (filesadded.indexOf("[" + filename + "]") == -1) {
        loadjscssfile(filename, filetype)
        filesadded += "[" + filename + "]" 
    }
    else
        alert("File eksisterer");
}

function DoRemoveFile(filename, filetype) {
    var targetelement = (filetype == "js") ? "script" : (filetype == "css") ? "link" : "none" //determine element type to create nodelist from
    var targetattr = (filetype == "js") ? "src" : (filetype == "css") ? "href" : "none" //determine corresponding attribute to test for
    var allsuspects = document.getElementsByTagName(targetelement)
    for (var i = allsuspects.length; i >= 0; i--) { //search backwards within nodelist for matching elements to remove
        if (allsuspects[i] && allsuspects[i].getAttribute(targetattr) != null && allsuspects[i].getAttribute(targetattr).indexOf(filename) != -1)
            allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

function alert_OK(HeadText, BreadText, Type) {

    Alert=1;

    switch (Type) {
        case 0:
            Alert = 'alert alert-primary';
            break;
        case 1:
            Alert = 'alert alert-info';
            break;
        case 2:
            Alert = 'alert alert-success';
            break;
        case 3:
            Alert = 'alert alert-warning';
            break;
        case 4:
            Alert = 'alert alert-danger';
            break;
        case 5:
            Alert = 'alert alert-dark';
            break;
        case 6:
            Alert = 'alert alert-info fade in nomargin';
            break;
    }

   // document.getElementById('AlertBox').className = 'alert alert-success';
    document.getElementById('AlertBox').innerHTML = '<div class="'+Alert+'"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button><strong>'+HeadText+'</strong><br /> ' + BreadText + '</div>';
}





function alert_Standard(HeadText, BreadText, DivName, onclick) {

    Responser = '';

   // Responser = "<div id='" + DivName + "' class=''modal-block modal-block-sm mfp-hide''>";
    Responser = '										<section class=\'panel\'>';
    Responser += '											<header class=\'panel-heading\'>';
    Responser += '												<h2 class=\'panel-title\'>' + HeadText + '</h2>';
    Responser += '											</header>';
    Responser += '											<div class=\'panel-body\'>';
    Responser += '												<div class=\'modal-wrapper\'>';
    Responser += '													<div class=\'modal-text\'>';
    Responser += '														<p>' + BreadText + '</p>';
    Responser += '													</div>';
    Responser += '												</div>';
    Responser += '											</div>';
    Responser += '											<footer class=\'panel-footer\'>';
    Responser += '												<div class=\'row\'>';
    Responser += '													<div class=\'col-md-12 text-right\'>';
    Responser += '														<button onclick=\'' + onclick + '\' class=\'btn btn-primary modal-confirm\'>Bekreft</button>';
    Responser += '														<button class=\'btn btn-default modal-dismiss\'>Avbryt</button>';
    Responser += '													</div>';
    Responser += '												</div>';
    Responser += '											</footer>';
    Responser += '										</section>';
  //  Responser += "									</div>";

    document.getElementById(DivName).innerHTML = Responser;
}


function alert_Input_Single(HeadText, BreadText, DivName, onclick) {
    Responser = '';
    //Responser += "<div id='modalForm' class='modal-block modal-block-primary mfp-hid'>"
    Responser += '										<section class=\'panel\'>';
    Responser += '											<header class=\'panel-heading\'>';
    Responser += '												<h2 class=\'panel-title\'>' + HeadText + '</h2>';
    Responser += '											</header>';
    Responser += '											<div class=\'panel-body\'>';
    Responser += '												<form id=\'demo-form\' class=\'form-horizontal mb-lg\' novalidate=\'novalidate\'>';
    //Responser += "													<div class='form-group mt-lg'>';
    Responser += '														<label>Skriv en sang om vann</label>';
   // Responser += "														<div class='col-sm-9'>';
    Responser += '															<input type=\'text\' id=\'name\' name=\'name\' class=\'form-control\' placeholder=\'' + BreadText + '\' required=\'\'>';
   // Responser += "														</div>';
   // Responser += "													</div>';
    Responser += '									';
    Responser += '												</form>';
    Responser += '											</div>';
    Responser += '											<footer class=\'panel-footer\'>';
    Responser += '												<div class=\'row\'>';
    Responser += '													<div class=\'col-md-12 text-right\'>';
    Responser += '														<button onclick=\'' + onclick + '(document.getElementById("name").value)\' class=\'btn btn-primary modal-confirm\'> Ok</button > ';
    Responser += '														<button class=\'btn btn-default modal-dismiss\'>Avbryt</button>';
    Responser += '													</div>';
    Responser += '												</div>';
    Responser += '											</footer>';
    Responser += '										</section>';
    //Responser += "									</div>"

    document.getElementById(DivName).innerHTML = Responser;
}


function TestNew() {
    //document.getElementById('AlertBox').className = "mb-xs mt-xs mr-xs modal-sizes btn btn-default"
    document.getElementById('AlertBox').innerHTML = "<div id='tester' class='modal-block modal-block-sm mfp-hide'></div>";
    //document.getElementById('AlertBox').innerHTML = "w";
    alert_Standard('test', 'Tester dette', 'tester');
    this.href = "#modalDUPPE2";
}

function PrintOutElement(elem, title = 'GunStock ONE') {
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title>' + title + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + title + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

function SendHistory(User_Name, UserURL, HistoryTitle, HistoryText) {


    var UserHistory = '{';
    UserHistory += '"User_Name" : "' + User_Name + '"';
    UserHistory += ', "CLientEmail" : "' + localStorage.getItem('CLientEmail') + '"';
    UserHistory += ', "UserURL" : "' + UserURL + '"';
    UserHistory += ', "HistoryTitle" : "' + HistoryTitle + '"';
    UserHistory += ', "HistoryText" : "' + HistoryText + '"';
    UserHistory += ', "ActionType" : "1"';
    UserHistory += ', "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"';
    UserHistory += ' } ';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + "UserHistory/?jsonstring=" + UserHistory;


    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // alert(xhr.responseText.toString());

        }
        DoFillHistory(localStorage.getItem('ClientName'));
    };
    xhr.send();
    //alert('Kommer Snart !/r/n' + TextToSend);

}
