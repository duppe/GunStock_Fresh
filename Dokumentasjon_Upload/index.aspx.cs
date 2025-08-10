using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ImageUploadWithDropzoneJS : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       // var MJson = @"{'NewPassword' : '0', 'ClientEmail' : '', 'ClientSessionID' : 'NA','ClientPassword' : '','ClientSessionPassword' : ''}";
       // var X = IdanikaSoftware.IdanikaSoftware.Post(MJson);

        if (IdanikaSoftware.IdanikaSoftware.ExistCSP(Request.QueryString["SessionPassword"], Request.QueryString["BaseAKA"]))
        {
           
        }
        else
        {
            Response.Redirect("DoLogOn.aspx");
        }
    }
}