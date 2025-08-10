<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MakeCostumer.aspx.cs" Inherits="Dokumentasjon.eu.MakeCostumer" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            Opprett kunde.<br />
            <br />
            <asp:TextBox ID="txtCostumerName" runat="server"></asp:TextBox>
        </div>
        <asp:Button ID="butDoMakeCostumer" runat="server" Text="Make Gunstock" OnClick="butDoMakeCostumer_Click" />
        <asp:Button ID="butDoMakeCostumerDocumentation" runat="server" Text="Make Documentation" OnClick="butDoMakeCostumerDocumentation_Click" />
        <br />
        <br />
        <asp:Button ID="Button1" runat="server" Text="Do Kill Costumer" OnClick="Button1_Click" />
        <br />
        ------------------------------------------------------------------------------------------<br />
        <br />
        Rediger Kunde:<br />
        <br />
        <asp:TextBox ID="TextBox1" runat="server" Width="253px"></asp:TextBox>
    </form>
</body>
</html>
