<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DoImportXLSX.aspx.cs" Inherits="InportTest.DoImportXLSX" %>

<!DOCTYPE html>

<script>
    if (IsPostBack) {
        document.getElementById('lblConfirm').innerHTML = 'Importerer Data, Venneligst Vent.....';
    }

</script>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
         <div style="font:14px Verdana">
        
             Velg Ecel fil for import : 
                <asp:FileUpload ID="FileUpload" Width="450px" runat="server" />
             <asp:Button ID="Button1" runat="server" Text="Kjør import" OnClick="Button1_Click" />
            <p></p>
            <p><asp:Label id="lblConfirm" runat="server"></asp:Label></p>
        </div>
    </form>
</body>
</html>
