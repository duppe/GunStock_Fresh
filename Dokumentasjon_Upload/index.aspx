<%@ Page Title="Upload Images Using DropzoneJs in Asp.net C#." Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="index.aspx.cs" Inherits="ImageUploadWithDropzoneJS" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="latestJs_1.11/jquery.min.js"></script>
    <script src="DropzoneJs_scripts/dropzone.js"></script>
    <link href="DropzoneJs_scripts/dropzone.css" rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

  
    <br /><br />
    <div id="dZUpload" class="dropzone">
        <div class="dz-default dz-message">
            Drop filen her, eller trykk for å velge. 
        </div>
    </div>

    <p hidden="hidden" id="FirmID" >213</p>

    <script type="text/javascript">

        $(document).ready(function () {

            var FirmID = getParameterByName('FirmID');
            var ID = getParameterByName('ID');
            var BaseAKA = getParameterByName('BaseAKA');
            var SessionPassword = getParameterByName('SessionPassword');
           //index.aspx?FirmID=926287818&ID=55&BaseAKA=GunStock_Armatech&SessionPassword=xadNlXK3K0CdAzquimT7BdthwWSk
            //var FirmID = $("#FirmID").text();//document.getElementById('FirmID').nodeValue;


            Dropzone.autoDiscover = false;
           // alert(FirmID);
            //Simple Dropzonejs 
            $("#dZUpload").dropzone({
                url: "hn_SimpeFileUploader.ashx?FirmID=" + FirmID + "&ID=" + ID + "&BaseAKA=" + BaseAKA + "&SessionPassword=" + SessionPassword,
                maxFiles: 500,
                addRemoveLinks: true,
                success: function (file, response) {
                    var imgName = response;
                    file.previewElement.classList.add("dz-success");
                    console.log("Successfully uploaded :" + imgName);
                    //window.top.location.reload();
                },
                error: function (file, response) {
                    file.previewElement.classList.add("dz-error");
                }
            });
            
        });


        function getParameterByName(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }

    </script>
</asp:Content>

