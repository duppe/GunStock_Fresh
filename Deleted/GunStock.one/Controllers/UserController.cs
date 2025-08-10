using IdanikaSoftware;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {
        public int PutSQL = 0;

        // GET: api/User
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/User/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/User
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";
            string strRET = "";
            string strERR = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);

                if (Json["Switch"] == "1") //insert
                {

                    strSQL = "insert into dbo.Skitt_LogOn (ClientName) values ('" + Json["ClientName"] + "')";
                }

                else if (Json["Switch"] == "2") //Update
                {
                    var ClinetEnable = Json["ClinetEnable"].Replace("'", "_");
                    //if (ClinetEnable == "true") { ClinetEnable = "true"; } else { ClinetEnable = "false"; }

                   strSQL = "update Skitt_LogOn set ClientEmail = '" + Json["ClientEmail"].Replace("'", "_") + "', ClientPassword = '" + Json["ClientPassword"].Replace("'", "_") + "', ClientName = '" + Json["ClientName"].Replace("'", "_") + "', ClinetEnable = '" + ClinetEnable + "', ClientTimeOutValue = '" + Json["ClientTimeOutValue"].Replace("'", "_") + "', ClientLevel = '" + Json["ClientLevel"].Replace("'", "_") + "',ClientLevelText = '" + Json["ClientLevelText"].Replace("'", "_") + "', ClientUpdated = getdate(), ByUser = '" + Json["ByUser"].Replace("'", "_") + "' where ClientName = '" + Json["ClientName"].Replace("'", "_") + "' and ClientEmail != 'haavald@haavaldsen.eu'";
                    strERR = "Email eksisterer allerede";
                }

                else if (Json["Switch"] == "3") //Delete
                {
                    //var ClinetEnable = Json["ClinetEnable"].Replace("'", "_");
                    //if (ClinetEnable == "true") { ClinetEnable = "true"; } else { ClinetEnable = "false"; }

                    strSQL = "delete from Skitt_LogOn where ClientEmail = '" + Json["ClientEmail"].Replace("'", "_") + "' and OverLord != 1";
                    strERR = "Man kan ikke Slette en OverLord :-)";
                }

                else if (Json["Switch"] == "4") // Kick all users
                {
                   
                    strSQL = "update  Skitt_LogOn set Skitt_LogOn.ClientSessionPassword = '' where ClientEmail != '" + Json["ClientEmail"].Replace("'", "_")  + "' ";
                    strRET = "Alle ble kastet ut :-)";
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

            if (strRET != "") { return strRET; }
            if (PutSQL != 1 ) { return strERR; }
            return "Kunden ble oppdatert !";
        }

        // PUT: api/User/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/User/5
        public void Delete(int id)
        {
        }
    }
}
