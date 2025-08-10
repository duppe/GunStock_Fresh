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
    public class DoInsertCostumerController : ApiController
    {
        public int PutSQL = 0;

        // GET: api/DoInsertCostumer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoInsertCostumer/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoInsertCostumer
        public string Post([FromBody] string jsonstring)
        {
            string strSQL = "";


            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);
                string BaseAKA = Json["BaseAKA"];

                if (Json["Switch"] == "1") //insert
                {

                    strSQL = "insert into " + BaseAKA + "_Kunder (Kundenavn, Adresse, PostSted, Telefon, ByUser, Info) values ('" + Json["Kundenavn"].Replace("'", "_") + "','" + Json["Adresse"].Replace("'", "_") + "', '" + Json["Poststed"].Replace("'", "_") + "', '" + Json["Telefon"].Replace("'", "_") + "', '" + Json["ByUser"].Replace("'", "_") + "', '" + Json["Info"].Replace("'", "_") + "')";
                }

                else if (Json["Switch"] == "2") //Update
                {
                    strSQL = "update " + BaseAKA + "_Kunder set Kundenavn = '" + Json["Kundenavn"].Replace("'", "_") + "', Adresse = '" + Json["Adresse"].Replace("'", "_") + "', PostSted = '" + Json["Poststed"].Replace("'", "_") + "', Telefon = '" + Json["Telefon"].Replace("'", "_") + "', Updated = getdate(), ByUser = '" + Json["ByUser"].Replace("'", "_") + "', Info = '" + Json["Info"].Replace("'", "_") + "' where ID = '" + Json["id"].Replace("'", "_") + "'";

                }

                else if (Json["Switch"] == "3") // In Line Update
                {
                    strSQL = "update " + BaseAKA + "_Kunder set Kundenavn = '" + Json["Kundenavn"].Replace("'", "_") + "', Adresse = '" + Json["Adresse"].Replace("'", "_") + "', PostSted = '" + Json["Poststed"].Replace("'", "_") + "', Telefon = '" + Json["Telefon"].Replace("'", "_") + "', Updated = getdate(), ByUser = '" + Json["ByUser"].Replace("'", "_") + "'  where ID = '" + Json["id"].Replace("'", "_") + "'";

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
            { }

            return "Kunden ble oppdatert !";

        }

        // PUT: api/DoInsertCostumer/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/DoInsertCostumer/5
        public void Delete(int id)
        {
        }


    }
}
