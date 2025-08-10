using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Data.OleDb;
using System.Data.SqlClient;        // FOR "SqlBulkCopy" CLASS.
using System.IO;

namespace InportTest
{
    public partial class DoImportXLSX : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            lblConfirm.Text = "Importerer Data Vennligst Vent.....";
            lblConfirm.Attributes.Add("style", "color:red");
            DoUploadXLSX();
          
        }

 

        protected void DoMerge()
        {
            string sqlConnectionString = "user id = Dokumentasjon_eu; password = Runa1983; server = mssql8.simply.com; Trusted_Connection = no; database = dokumentasjon_eu_db; connection timeout = 30;";
            string script = File.ReadAllText(Server.MapPath("Merge_Costumer.sql"));
            string sclearsql = "drop table Skitt_Kunder2";

            //execute a query to erase any previous data from our destination table
            try
            {
                using (SqlConnection con = new SqlConnection(sqlConnectionString))
                {
                    con.Open();
                    using (SqlCommand sqlcmd2 = new SqlCommand(sclearsql, con))
                    {
                        sqlcmd2.ExecuteNonQuery();

                    }
                    con.Close();
                }
            }
            catch { }

            SqlConnection conn = new SqlConnection(sqlConnectionString);

            SqlCommand sqlcmd = new SqlCommand(script, conn);
            conn.Open();
            sqlcmd.ExecuteNonQuery();
            conn.Close();
            lblConfirm.Text = lblConfirm.Text;
        }

        protected void DoUploadXLSX()
        {
            if (FileUpload.HasFile)
            {
                

                if (!Convert.IsDBNull(FileUpload.PostedFile) &
                    FileUpload.PostedFile.ContentLength > 0)
                {
                    
                    //FIRST, SAVE THE SELECTED FILE IN THE ROOT DIRECTORY.
                    FileUpload.SaveAs(Server.MapPath(".") + "\\" + FileUpload.FileName);

                    SqlBulkCopy oSqlBulk = null;

                    // SET A CONNECTION WITH THE EXCEL FILE.
                    OleDbConnection myExcelConn = new OleDbConnection
                        ("Provider=Microsoft.ACE.OLEDB.12.0; " +
                            "Data Source=" + Server.MapPath(".") + "\\" + FileUpload.FileName +
                            ";Extended Properties=Excel 12.0;");
                    try
                    {
                        myExcelConn.Open();

                        // GET DATA FROM EXCEL SHEET.
                        OleDbCommand objOleDB =
                            new OleDbCommand("SELECT *FROM [Multicase$]", myExcelConn);

                        // READ THE DATA EXTRACTED FROM THE EXCEL FILE.
                        OleDbDataReader objBulkReader = null;
                        objBulkReader = objOleDB.ExecuteReader();

                        // SET THE CONNECTION STRING.
                        string sCon = "user id = Dokumentasjon_eu; password = Runa1983; server = mssql8.simply.com; Trusted_Connection = no; database = dokumentasjon_eu_db; connection timeout = 30;";
                        //string sCon = "Data Source=DNA;Persist Security Info=False;" +
                        //    "Integrated Security=SSPI;" +
                        //    "Initial Catalog=DNA_Classified;User Id=sa;Password=;" +
                        //    "Connect Timeout=30;";


                        //execute a query to erase any previous data from our destination table
                        string sclearsql = "delete from Skitt_Kunder_Update";
                        SqlConnection sqlconn = new SqlConnection(sCon);
                        SqlCommand sqlcmd = new SqlCommand(sclearsql, sqlconn);
                        sqlconn.Open();
                        sqlcmd.ExecuteNonQuery();
                        sqlconn.Close();


                        using (SqlConnection con = new SqlConnection(sCon))
                        {
                            con.Open();

                            // FINALLY, LOAD DATA INTO THE DATABASE TABLE.
                            oSqlBulk = new SqlBulkCopy(con);
                            oSqlBulk.DestinationTableName = "Skitt_Kunder_Update"; // TABLE NAME.
                            oSqlBulk.WriteToServer(objBulkReader);
                        }

                        lblConfirm.Text = "DATA IMPORTED SUCCESSFULLY.";
                        lblConfirm.Attributes.Add("style", "color:green");


                    }
                    catch (Exception ex)
                    {

                        lblConfirm.Text = ex.Message;
                        lblConfirm.Attributes.Add("style", "color:red");

                    }
                    finally
                    {
                        // CLEAR.
                        //oSqlBulk.Close();
                        oSqlBulk = null;
                        myExcelConn.Close();
                        myExcelConn = null;
                    }
                }
                
                DoMerge();
            }
            else
            {
                lblConfirm.Text = "Du må velge fil først :-)";
                lblConfirm.Attributes.Add("style", "color:red");
            }

        }


    }
}