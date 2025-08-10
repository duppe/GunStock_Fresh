<%@ WebHandler Language="C#" Class="hn_SimpeFileUploader" %>

using System;
using System.Web;
using System.IO;
using System.Drawing;

public class hn_SimpeFileUploader : IHttpHandler {

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        string ID = context.Request.QueryString["ID"];
        string BaseAKA = context.Request.QueryString["BaseAKA"];
        string SessionPassword = context.Request.QueryString["SessionPassword"];
        string FirmID = context.Request.QueryString["FirmID"];
        string str_image = "";
        if (FirmID == "") { return; }
        if (ID == "") { return; }
        

        //string dirFullPath = HttpContext.Current.Server.MapPath("~/App_Data/Upload/" + FirmID + "/" + "/" + BaseAKA + "/" + ID + "/");
        string dirFullPath = HttpContext.Current.Server.MapPath("~/" + FirmID + "/" + BaseAKA + "/" + ID).Replace("documentation", @"Filene\App_Data\Upload") ;
        //string dirFullPath = HttpContext.Current.Server.MapPath("~/" + FirmID + "/" + BaseAKA + "/" + ID).Replace("Dokumentasjon_Upload", @"Filene\App_Data\Upload");

        
        DirectoryInfo di = Directory.CreateDirectory(dirFullPath);


        string[] files;
        int numFiles;
        files = System.IO.Directory.GetFiles(dirFullPath);
        numFiles = files.Length;
        numFiles = numFiles + 1;



        foreach (string s in context.Request.Files)
        {
            HttpPostedFile file = context.Request.Files[s];
            string fileName = file.FileName;
            string fileExtension = file.ContentType;


            if (!string.IsNullOrEmpty(fileName))
            {
                string Unik = UniqueID;
                fileExtension = Path.GetExtension(fileName);

                try
                {
                    fileName = fileName.Substring(0, 20);
                }
                catch { }

                //str_image = numFiles + "_" + FirmID + "_" + ID + "_" + fileName + "_" + Unik + fileExtension;
                str_image = FirmID + "_" + ID + "_" + fileName + "_" + Unik + fileExtension;
                string pathToSave = dirFullPath + "\\" + str_image;
                new FileInfo(pathToSave).Directory.Create();
                file.SaveAs(pathToSave);
            }
        }
        context.Response.Write(str_image);
    }

    public string UniqueID
    {
        get
        {
            DateTime date = DateTime.Now;

            string uniqueID = String.Format(
              "{0:0000}{1:00}{2:00}{3:00}{4:00}{5:00}{6:000}",
              date.Year, date.Month, date.Day,
              date.Hour, date.Minute, date.Second, date.Millisecond
              );
            return uniqueID;
        }
    }

    public bool IsReusable {
        get {
            return false;
        }
    }



}