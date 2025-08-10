using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.Web.UI;
using System.Web.UI.WebControls;
using static IdanikaSoftware.IdanikaSoftware;

public partial class DoLogOn : System.Web.UI.Page
    {
       
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
        var Password = generatePassword();
        var MJson = @"{'NewPassword' : '0', 'ClientEmail' : '" + Bruker.Text + @"', 'ClientSessionID' : 'NA','ClientPassword' : '" + Passord.Text + @"','ClientSessionPassword' : '" + Password + "'}";
        var X = IdanikaSoftware.IdanikaSoftware.Post(MJson);
       
        //index.aspx?FirmID=926287818&ID=55&BaseAKA=GunStock_Armatech&SessionPassword=xadNlXK3K0CdAzquimT7BdthwWSk

        /*
        
           var CLientLevel = xhr.responseText.toString().split('|')[2].toString().replace(/ "/g, '');

           var ClientTimeOutValue = xhr.responseText.toString().split('|')[3].toString().replace(/ "/g, '');

           var ClientChangePassword = xhr.responseText.toString().split('|')[4].toString().replace(/ "/g, '');

           var CLientName = xhr.responseText.toString().split('|')[5].toString().replace(/ "/g, '');

           var BaseAKA = xhr.responseText.toString().split('|')[6].toString().replace(/ "/g, '');

           var FirmMail = xhr.responseText.toString().split('|')[7].toString().replace(/ "/g, '');

           var FirmPhone = xhr.responseText.toString().split('|')[8].toString().replace(/ "/g, '');

           var FirmAdress = xhr.responseText.toString().split('|')[9].toString().replace(/ "/g, '');

           var FirmName = xhr.responseText.toString().split('|')[10].toString().replace(/ "/g, '');

           var FirmID = xhr.responseText.toString().split('|')[11].toString().replace(/ "/g, '');*/
        var R = "/index.aspx?FirmID=" + X.Split('|')[11].ToString() + "&ID=" + X.Split('|')[11].ToString() + "&BaseAKA=" + X.Split('|')[6].ToString().Replace(@"\s+", "") + "&SessionPassword=" + Password + "";

       Response.Redirect(R);

    }




}

