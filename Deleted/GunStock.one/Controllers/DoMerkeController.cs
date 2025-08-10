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
    public class DoMerkeController : ApiController
    {
        public int PutSQL = 0;


        // GET: api/DoMerke
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoMerke/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoMerke
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);

                if (Json["Merke"] == "-1")
                {

                    strSQL = "DELETE from  Skitt_MerkeModell where Merke = '" + Json["ID"] + "'";
                }

                else if (Json["ID"] == "0")
                { }

                else
                {
                    if (Exist(Json["ID"]))
                    {
                        strSQL = "update skitt_MerkeModell set Merke = '" + Json["Merke"].Replace("'", "_") + "' where Merke = '" + Json["Merke_Id"].Replace("'", "_") + "'";

                    }
                    else
                    {
                        strSQL = "insert into Skitt_MerkeModell (Merke_Id, Modell, Merke) values ((select top(1) (Merke_id+1) as X FROM  Skitt_MerkeModell order by Merke_id desc), '', '" + Json["Merke"].Replace("'", "_") + "')";

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
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

            finally
            {
                strSQL = "update Skitt_MerkeModell set Skitt_MerkeModell.Merke_id = (select top 1 Skitt_MerkeModell.Merke_id from Skitt_MerkeModell where Skitt_MerkeModell.Merke like (select top 1 Skitt_MerkeModell.Merke from Skitt_MerkeModell  where Merke_id <1)) where Skitt_MerkeModell.Id = (select top 1 Skitt_MerkeModell.Id from Skitt_MerkeModell where Merke_id <1)";
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

        // PUT: api/DoMerke/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoMerke/5
        public void Delete(int id)
        {
        }
              
        public bool Exist(string ID)
        {
            if (ID == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update Skitt_MerkeModell set Merke = Merke where Merke = '" + ID + "'";
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return false; }

            finally
            {

            }

            if (PutSQL > 0) { return true; } else { return false; }

        }

    }
}
