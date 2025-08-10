<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="import.aspx.cs" Inherits="InportTest.import" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
         <div style="font:14px Verdana">
        
            Select a file to upload: 
                <asp:FileUpload ID="FileUpload" Width="450px" runat="server" />
            <p></p>
            <p><asp:Label id="lblConfirm" runat="server"></asp:Label></p>
             <asp:Button ID="Button1" runat="server" Text="DoImport" />
        </div>
         <asp:Button ID="Button2" runat="server" OnClick="Button2_Click" Text="MergeCostumer" />
    </form>
</body>
</html>
