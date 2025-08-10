using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class test : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Button1_Click(object sender, EventArgs e)
    {
        

        //string q = Server.MapPath("../GunStock.one/Front.html");
        //string q = Server.MapPath("~/App_Data/Upload/");
        

        ImageButton1.ImageUrl = Get("idanika.jpg");
    }

    protected void ImageButton1_Click(object sender, ImageClickEventArgs e)
    {

    }


    public dynamic Get(string Pic)
    {


        string q = Server.MapPath("~/");
        string BigFile = q.Replace("documentation", @"Filene\App_Data\Upload");
        string Sti = BigFile + Pic;

        TextBox1.Text = Sti;

        var root = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
        var path = Path.Combine(root, TextBox1.Text);

        var bytes = File.ReadAllBytes(path);
        var base64 = Convert.ToBase64String(bytes);

        return "data:image/jpeg;base64," + base64;
    }

    protected void Button2_Click(object sender, EventArgs e)
    {
        ImageButton1.ImageUrl = Get(TextBox2.Text);
    }
}