using System;
using System.Collections.Generic;

using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class test : System.Web.UI.Page
{
    private string dirFullPath;

    public string Folder { get; private set; }
    public string BaseAKA { get; private set; }

    protected void Page_Load(object sender, EventArgs e)
    {

        //if (!IsPostBack)
        // {
        try
        {


            string ID = Request.QueryString["ID"];
            string Folder = Request.QueryString["FirmID"];
            string BaseAKA = Request.QueryString["BaseAKA"];
            string SessionPassword = Request.QueryString["SessionPassword"];
            if (Folder == null) { return; }

        // string WebPath = "~/Upload/" + Folder + "/" + BaseAKA + "/" + ID + "/";

        // Delete all Thumb's
        string q = Server.MapPath("~/").Replace("documentation", @"Filene\App_Data\Upload");
       // string dirFullPath = HttpContext.Current.Server.MapPath("~/App_Data/Upload/" + Folder + "/" + BaseAKA + "/" + ID);

        string dirFullPath = HttpContext.Current.Server.MapPath("~/" + Folder + "/" + BaseAKA + "/" + ID).Replace("documentation", @"Filene\App_Data\Upload") ;
        //string dirFullPath = HttpContext.Current.Server.MapPath("~/" + Folder + "/" + BaseAKA + "/" + ID).Replace("Dokumentasjon_Upload", @"Filene\App_Data\Upload");
        Console.WriteLine(dirFullPath);

        DirectoryInfo di = new DirectoryInfo(dirFullPath);
            FileInfo[] files = di.GetFiles("*thumb.png")
                                 .Where(p => p.Extension == ".png").ToArray();
            foreach (FileInfo file in files)
                try
                {
                    file.Attributes = FileAttributes.Normal;
                    File.Delete(file.FullName);
                }
                catch { }

        // Get inputs.
            string input_dir = dirFullPath;   //string input_dir = Server.MapPath("~/App_Data/Upload/" + Folder + "/" + BaseAKA) + "/" + ID;
            if (!input_dir.EndsWith("\\")) input_dir += "\\";

            string output_dir = dirFullPath; //string output_dir = Server.MapPath("~/App_Data/Upload/" + Folder + "/" + BaseAKA + "/" + ID);
            if (!output_dir.EndsWith("\\")) output_dir += "\\";
            string url_prefix = "";
            if ((url_prefix.Length > 0) && (!url_prefix.EndsWith("/"))) url_prefix += "/";
            int thumb_width = int.Parse("100");
            int thumb_height = int.Parse("100");

      
            // Do the work.
            MakeWebPage(input_dir, output_dir, url_prefix,
                "Result.html", thumb_width, thumb_height);

            // Do Read from Security folder
            var root = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
            foreach (string file in Directory.EnumerateFiles(Path.Combine(root, dirFullPath), "*thumb.*")) //foreach (string file in Directory.EnumerateFiles(Path.Combine(root, "App_Data/Upload/" + Folder + "/" + BaseAKA + "/" + ID + "/"), "*thumb.*"))
            {
                string contents = File.ReadAllText(file);

                /*
                Image img = new Image();
                img.ImageUrl = Get(Folder + "\\" + BaseAKA + "\\" + ID + "\\" + file.Split('/').Last());
                img.Width = thumb_width;
                img.BorderWidth = 20;
                img.BorderColor = System.Drawing.Color.White;
                Controls.Add(img);

                " + Get(Folder + "\\" + BaseAKA + "\\" + ID + "\\" + file.Split('/').Last()) + "
                */
                string BigFile = file.Split('/').Last().Replace("_thumb.png", "");
                string test = "javascript:var win = window.open(\"\", \"Title\", \"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=780, height=200, top=\" + (screen.height - 400) + \", left=\" + (screen.width - 840));win.document.body.innerHTML = \"Pass your html here\";";
                test = "window.open(\"https://www.w3schools.com\");";
                test = "var myWindow = window.open(\"\", \"" + BigFile + "\", \"Width=400,Height=500\");  myWindow.document.write(\"<img src='" + Get(BigFile) + "'></img>\"); ";

                ImageButton imgButton;

                imgButton = new ImageButton();

                imgButton.ID = "prgcode";
                imgButton.ImageUrl = Get(dirFullPath + "\\" + file.Split('\\').Last());
                imgButton.ToolTip = "test";
                imgButton.Width = thumb_width;
                imgButton.BorderWidth = 20;
                imgButton.BorderColor = System.Drawing.Color.White;
                imgButton.ID = file;
                imgButton.OnClientClick = test; // "javascript:var newWin=open('url','windowName','height=300,width=300');newWin.document.write('<img src='' />'); ";




                // imgButton.Click += new ImageClickEventHandler(imgButton_click);
                Page.Form.Controls.Add(imgButton);

            }

        }

        catch { }


       // }

    }
    /*
    private void imgButton_click(object sender, ImageClickEventArgs e )
    {
        ImageButton objImage = (ImageButton)sender;

        Page.ClientScript.RegisterStartupScript(GetType(), "OpenWindow", "window.open('" + objImage.ImageUrl + "', '_blank');", true);


    }
    */



    // Get from Sequrity
    public dynamic Get(string Pic)
    {
        var root = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
        var path = Path.Combine(root, dirFullPath + Pic);

        var bytes = File.ReadAllBytes(path);
        var base64 = Convert.ToBase64String(bytes);

        return "data:image/jpeg;base64," + base64;
    }



    // Make the web page and thumbnails.
    private void MakeWebPage(string input_dir, string output_dir, string url_prefix, string web_page, int thumb_width, int thumb_height)
    {
        // Open the HTML file.
        string html_filename = output_dir + web_page;
        using (StreamWriter html_file = new StreamWriter(html_filename))
        {
            // Make a list of the image files.
            List<string> files =
                FindFiles(input_dir, "*.bmp;*.gif;*.jpg;*.png;*.tif", false);

            // Process the files.
            foreach (string image_filename in files)
            {
                // Copy the file to the destination directory.

                FileInfo image_fileinfo = new FileInfo(image_filename);
                string dest_filename = output_dir + image_fileinfo.Name;
                try
                {
                    File.Copy(image_filename, dest_filename, true);
                }
                catch { }

                // Get the image.
                using (System.Drawing.Bitmap bm = new System.Drawing.Bitmap(image_filename))
                {
                    // Get the original size.
                    System.Drawing.Rectangle src_rect =
                        new System.Drawing.Rectangle(0, 0, bm.Width, bm.Height);

                    // Shrink the image.
                    double scale = Math.Min(
                        (double)thumb_width / bm.Width,
                        (double)thumb_height / bm.Height);
                    int shrunk_width = (int)(bm.Width * scale);
                    int shrunk_height = (int)(bm.Height * scale);
                    System.Drawing.Rectangle dest_rect =
                        new System.Drawing.Rectangle(0, 0, shrunk_width, shrunk_height);

                    using (System.Drawing.Bitmap thumbnail = new System.Drawing.Bitmap(shrunk_width, shrunk_height))
                    {
                        // Copy the image at reduced scale.
                        using (System.Drawing.Graphics gr = System.Drawing.Graphics.FromImage(thumbnail))
                        {
                            gr.DrawImage(bm, dest_rect, src_rect, System.Drawing.GraphicsUnit.Pixel);
                        }

                        // Save the thumbnail image.
                        /*string thumb_filename =
                            dest_filename.Substring(0,
                                dest_filename.Length - image_fileinfo.Extension.Length) +
                            "_thumb.png";
                        */
                        string thumb_filename =
                            dest_filename.Substring(0,
                                dest_filename.Length) +
                            "_thumb.png";


                        thumbnail.Save(thumb_filename, System.Drawing.Imaging.ImageFormat.Png);

                        // Add the thumbnail image to the HTML page.
                        FileInfo thumb_fileinfo = new FileInfo(thumb_filename);
                        html_file.WriteLine(
                            "<a target='_blank' href=\"" + url_prefix + image_fileinfo.Name + "\">" +
                            "<img src=\"" + url_prefix + thumb_fileinfo.Name + "\">" +
                            "</a>");

                    } // using (Bitmap thumbnail = new Bitmap(shrunk_width, shrunk_height))
                } // using (Bitmap bm = new Bitmap(image_file))
            } // foreach (string image_file in files)

            // Close the HTML file.
            html_file.Close();


        } // using (StreamWriter html_file = new StreamWriter(html_filename))
    } // MakeWebPage

    private List<string> FindFiles(string dir_name, string patterns, bool search_subdirectories)
    {
        // Make the result list.
        List<string> files = new List<string>();

        // Get the patterns.
        string[] pattern_array = patterns.Split(';');

        // Search.
        SearchOption search_option = SearchOption.TopDirectoryOnly;
        if (search_subdirectories) search_option = SearchOption.AllDirectories;
        foreach (string pattern in pattern_array)
        {
            foreach (string filename in Directory.GetFiles(dir_name, pattern, search_option))
            {
                if (!files.Contains(filename)) files.Add(filename);
            }
        }

        // Sort.
        files.Sort();

        // Return the result.
        return files;
    }



}