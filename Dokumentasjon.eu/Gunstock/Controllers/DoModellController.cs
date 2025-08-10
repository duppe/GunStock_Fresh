using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using IdanikaSoftware;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoModellController : ApiController
    {
        public int PutSQL = 0;


        public string BaseAKA { get; private set; }

        // GET: api/DoModell
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoModell/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoModell
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(HttpUtility.UrlDecode(jsonstring));
                BaseAKA = Json["BaseAKA"];

                if (Json["Merke"] == "-1")
                {

                    strSQL = "DELETE from  " + BaseAKA + "_MerkeModell where id = " + Json["ID"];
                }

                else if (Json["ID"] == "0")
                { }

                else
                {
                    if (Exist(Json["ID"]))
                    {
                        strSQL = "update " + BaseAKA + "_MerkeModell set Modell = '" + Json["Merke"] + "' where ID = '" + Json["ID"].Replace("'", "_") + "'";

                    }
                    else
                    {
                        // strSQL = 
                        strSQL = "insert into " + BaseAKA + "_MerkeModell (Merke_Id, Modell, Merke) values (0, '" + Json["Merke"] + "', '" + Json["Merke_Id"].Replace("'", "_") + "')";


                    }
                }



            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)";  }

            finally
            {
                strSQL = "update " + BaseAKA + "_MerkeModell set " + BaseAKA + "_MerkeModell.Merke_id = (select top 1 " + BaseAKA + "_MerkeModell.Merke_id from " + BaseAKA + "_MerkeModell where " + BaseAKA + "_MerkeModell.Merke like (select top 1 " + BaseAKA + "_MerkeModell.Merke from " + BaseAKA + "_MerkeModell  where Merke_id <1)) where " + BaseAKA + "_MerkeModell.Id = (select top 1 " + BaseAKA + "_MerkeModell.Id from " + BaseAKA + "_MerkeModell where Merke_id <1)";
                if (PutSQL != 0)
                {
                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                }

            }

            return "Kunden ble oppdatert ! (" + PutSQL + ")";
        }

        // PUT: api/DoModell/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoModell/5
        public void Delete(int id)
        {
        }

       
        public bool Exist(string ID)
        {
            if (ID == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update " + BaseAKA + "_MerkeModell set Merke = Merke where ID = " + ID;
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return false; }

            finally
            {

            }

            if (PutSQL == 1) { return true; } else { return false; }

        }

    }
}
