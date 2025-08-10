using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using IdanikaSoftware;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoUpdateVapenController : ApiController
    {
        public int PutSQL = 0;

        // GET: api/DoUpdateVapen
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoUpdateVapen/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoUpdateVapen
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";

            try
            {
                
                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);
                string BaseAKA = Json["BaseAKA"];


                if (Json["Switch"] == "1")
                {
                    string SetDate = "";
                    if (Json["DateReserved"] == "") { SetDate = "getdate()"; } else { SetDate = "'" + Json["DateReserved"] + "'"; }
                    strSQL = "update " + BaseAKA + "_Pistoler set Status = " + Json["Status"].Replace("'", "_") + ", Kunde_ID  = " + Json["Kunde_ID"].Replace("'", "_");
                    strSQL += ", Eier = '" + Json["Eier"].Replace("'", "_") + "',   DateOppdatert = " + SetDate +" where Serienummer = '" + Json["Serienummer"].Replace("'", "_") + "' and Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "'";
                    strSQL += "  ";
                    strSQL += "update " + BaseAKA + "_Kunder set KundeVapen = (KundeVapen + '" + Json["Serienummer"].Replace("'", "_") + ",') where id=" + Json["Kunde_ID"].Replace("'", "_");

                }

                else if (Json["Switch"] == "2") // Utleverings query
                {
                    strSQL = "update " + BaseAKA + "_Pistoler set Status = " + Json["Status"].Replace("'", "_") + ", ByUser = '" + Json["ByUser"].Replace("_", "@") + "'  where Serienummer = '" + Json["Serienummer"].Replace("'", "_") + "' and Kunde_ID = " + Json["Kunde_ID"].Replace("'", "_") + " and Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "'";
                   
                }

                // Update By Våpen ID 
                else if (Json["Switch"] == "3")
                {
                    strSQL = "update " + BaseAKA + "_Pistoler set Status = " + Json["Status"].Replace("'", "_") + ", ByUser = '" + Json["ByUser"].Replace("_", "@") + "'  where ID = '" + Json["VapenID"].Replace("'", "_") + "' ";

                }

            }
            catch (Exception StringFuck) { SendError(StringFuck.ToString(), "Error"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { SendError(StringFuck.ToString(), "SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

            finally
            { }

            return "Våpen lagt inn korrekt.";
        }

        // PUT: api/DoUpdateVapen/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoUpdateVapen/5
        public string Delete(string jsonstring)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(jsonstring);
            string BaseAKA = Json["BaseAKA"];
            string ID = Json["ID"];

            try
            {
                string strSQL = "";
                strSQL = "Delete from " + BaseAKA + "_Pistoler where ID = " + ID;

                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
                try
                {
                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                }
                catch (Exception StringFuck) { SendError(StringFuck.ToString(), "SQL", BaseAKA); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

                return "OK";
               
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex) { DuppeCommands.SendError("Kunne Ikke Slette ID = " + jsonstring); return "Kunne Ikke Slette";  }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used
        }

        public static void SendError(string Error, string BaseAKA)
        {

            Error = Error.Replace(@"\", "");
            Error = Error.Replace(@"(", "");
            Error = Error.Replace(@")", "");
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

            try
            {
                SqlCommand myCommand = new SqlCommand("INSERT INTO [" + BaseAKA + "_ErrorLog] (FromSite, ErrorMessage) VALUES ('GunStock','" + Error.ToString() + "')", myConnection);

                myCommand.Connection.Open();
                int i = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck)
            {
                SendError(StringFuck.ToString(), "Feil med SendError()");
            }

            finally
            { }
        }

        public static void SendError(string Error, string ShowText, string BaseAKA)
        {
            Error = Error.Replace(@"\", "");
            Error = Error.Replace(@"(", "");
            Error = Error.Replace(@")", "");
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

            try
            {
                SqlCommand myCommand = new SqlCommand("INSERT INTO [ErrorLog] (FromSite, ErrorMessage, ShowText) VALUES ('GunStock','" + Error.ToString() + "','" + ShowText + "')", myConnection);

                myCommand.Connection.Open();
                int i = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck)
            {
                SendError(StringFuck.ToString(), BaseAKA);
            }


        }
    }
}
