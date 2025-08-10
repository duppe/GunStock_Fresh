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
    public class DoMekanismeController : ApiController
    {
        public int PutSQL = 0;

        public string BaseAKA { get; private set; }

        // GET: api/DoMekanisme
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoMekanisme/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoMekanisme
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";
            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(HttpUtility.UrlDecode(jsonstring));
            BaseAKA = Json["BaseAKA"];

            try
            {

              

                if (Json["Mekanisme"] == "-1")
                {

                    strSQL = "DELETE from  " + BaseAKA + "_Mekanisme where ID = '" + Json["ID"] + "'";
                }

                else if (Json["ID"] == "0")
                { }

                else
                {
                    if (Exist(Json["ID"]))
                    {
                        strSQL = "update " + BaseAKA + "_Mekanisme set Mekanisme = '" + Json["Mekanisme"] + "' where ID = '" + Json["ID"].Replace("'", "_") + "'";

                    }
                    else
                    {
                        strSQL = "insert into " + BaseAKA + "_Mekanisme (Mekanisme) values ( '" + Json["Mekanisme"] + "')";

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
               

            }

            return "Kunden ble oppdatert ! (" + PutSQL + ")";
        }

        // PUT: api/DoMekanisme/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoMekanisme/5
        public void Delete(int id)
        {
        }

      
        public bool Exist(string ID)
        {
            if (ID == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update " + BaseAKA + "_Mekanisme set Mekanisme = Mekanisme where ID = '" + ID + "'";
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
