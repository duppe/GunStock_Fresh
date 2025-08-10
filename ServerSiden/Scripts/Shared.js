//Shared
window.onload = codeAddress;
var ServerURL = '../api/';
var filesadded = "";

// Listen Handlers
var events = ["mouseup", "keydown", "scroll", "mousemove"];
document.addEventListener("DOMContentLoaded", function () {
    events.forEach(function (e) {
        document.addEventListener(e, function () {
            endTime = Date.now() + 10000;
           
            if (e === "keydown") {
                
                localStorage.setItem('txtSessionTimeOut','0');
            }
           
            else if (e === "mousemove") {
                
                localStorage.setItem('txtSessionTimeOut','0') ;
            }
        });
    });
});





function codeAddress() {

    var path = window.location.pathname;
    var page = path.split("/").pop();

    if (page == "rapport.html") {

        document.getElementById('RapportID0').style = 'display:block';
        DoFill("drpRapportLager", 7, '', 1);
        //DoFillRapport();
    }


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
    document.getElementById('User').innerHTML = localStorage.getItem('ClientName');

    
    localStorage.setItem('txtSessionTimeOut','0');


    DoDo();
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

function QueryString(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function DoFill(drpName, ConstantID, Vari, NoLeadBlank) {

    //var MJson = '{"Search" : "71_' + Status + '|' + Periode + '|' + Ar + '", "SessionPassword" : "' + localStorage.getItem('SessionPassword') + '", "BaseAKA" : "' + localStorage.getItem('BaseAKA') + '"}';

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFill/' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + localStorage.getItem('SessionPassword') + "&BaseAKA=" + localStorage.getItem('BaseAKA');
    //var IfPost = 'ConstantID' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + localStorage.getItem('SessionPassword');


    var dropdown = document.getElementById(drpName);
    dropdown.innerHTML = "";
    // Lag null linje
    if (typeof NoLeadBlank !== 'undefined') {
        addOption(dropdown, '', '');
    }

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

            var myObj = JSON.parse(xhr.responseText);
            var myObj = JSON.parse(myObj);
            


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
           
        }
    };
    xhr.send();

}

function DoHTMLencode(TheString) {
    return TheString.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(' ', "%20").replace(' ', "%20");
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


function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("w3-include-html");
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


/*
function ElementTest() {
    var elements = document.getElementsByTagName('div');

    for (var i = 0, element; element = elements[i++];) {
        if (element.type === "text" && element.value === "")
         d  
    }
}
*/

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


function GunStock() {
    document.location.href = 'https://gunstock.one/index.html?q=' + localStorage.getItem('SessionPassword');
}