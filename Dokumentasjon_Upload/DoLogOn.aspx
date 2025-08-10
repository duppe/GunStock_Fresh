<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DoLogOn.aspx.cs" Inherits="DoLogOn" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    	<!-- Vendor CSS -->
		<link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.css" />
		<!-- Theme CSS -->
		<link rel="stylesheet" href="assets/stylesheets/theme.css" />

		<!-- Skin CSS -->
		<link rel="stylesheet" href="assets/stylesheets/skins/default.css" />
</head>
<body>
      <section class="body-sign body-locked">
			<div class="center-sign">
				<div class="panel panel-sign">
					<div class="panel-body">
						<form id="form1" runat="server">
							<div class="current-user text-center">
								<h1 class="user-name text-dark m-none">
									Våpenregisteret.no</h1><img src="assets/images/GunStock_LOGO.png" width="300" alt="John Doe"  />
								
								  <div id="Result"><h2 class="user-name text-dark m-none">LogIn</h2></div>
								<p class="user-email m-none">
									<asp:TextBox ID="Bruker" runat="server" class="form-control input-lg" ></asp:TextBox> </p>
							</div>
							<div class="form-group mb-lg">
								<div class="input-group input-group-icon">
									<asp:TextBox   ID="Passord" runat="server" class="form-control input-lg" TextMode="Password" ></asp:TextBox>
								
									<span class="input-group-addon">
										<span class="icon icon-lg">
											<i class="fa fa-lock"></i>
										</span>
									</span>
								</div>
							</div>
							<div id="divChangePassword"></div>
							<div class="row">
								<div class="col-xs-6">
									<p class="mt-xs mb-none">
										<a hidden="hidden" href="#">Glemt Passord?</a>
										<img style="cursor: pointer;width:50px;" onclick="document.location.href='https://www.facebook.com/idanika.no';" src="img/logoSquare.bmp" />
									</p>
								</div>
								<div class="col-xs-6 text-right">
								
								    <asp:Button ID="Button1" class="btn btn-primary" runat="server" Text="Button" OnClick="Button1_Click" />
								</div>
							    
							</div>
							
						</form>
							
					</div>
				</div>
			</div>
		
		</section>
</body>
</html>
