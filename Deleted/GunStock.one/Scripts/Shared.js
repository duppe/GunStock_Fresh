//Shared

var ServerURL = '../api/';
var filesadded = "";

function DoFill(drpName, ConstantID, Vari, NoLeadBlank) {


    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFill/' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + readCookie('SessionPassword');
    var IfPost = 'ConstantID' + ConstantID + "?Vari=" + Vari + "&SessionPassword=" + readCookie('SessionPassword');


    var dropdown = document.getElementById(drpName);
    dropdown.innerHTML = "";
    // Lag null linje
    if (typeof NoLeadBlank !== 'undefined') {
        addOption(dropdown, '', '');
    }

    xhr.open(method, url, true);
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
    xhr.send(IfPost);

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

function DoFillForm(drpName, ConstantID, Vari) {

    var xhr = new XMLHttpRequest(),
        method = "GET",
        url = ServerURL + 'DoFillForm/' + ConstantID + "?Vari=" + DoHTMLencode(Vari) + "&SessionPassword=" + readCookie('SessionPassword');

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
    var date, expires;
    if (days) {
        date = new Date();
        /*date.setTime(date.getTime() + (days * 2) * 60 * 1000);*/
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
   
}

function readCookie(name) {
    var i,
        c,
        ca,
        nameEQ = name + "=";
    ca = document.cookie.split(";");
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return "";
}

function DeletCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function DeleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function ScrollMainToTop() {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function SendError(Error, Text) {

    var MJson = '{"case" : "SendError", "Error" : "' + Error + '", "Text" : "' + Text + '"}';
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

    var MJson = '{"case" : "SendMail", "Body" : "' + Body + '", "Subject" : "' + Subject + '"}';
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

    var MJson = '{"case" : "UserActivity", "ClientSessionPassword" : "' + readCookie('SessionPassword') + '", "Type" : "' + Type + '"}';
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
    FeedBackJson += ', "ByUser" : "' + readCookie('ClientName') + '"';
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