using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using IdanikaSoftware;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoLeverandorController : ApiController
    {
         public int PutSQL = 0;

        // GET: api/DoLeverandor
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoLeverandor/5
        public string Get(int id, string Vari)
        {
            string STRsql;
            if (id == 0)
            { STRsql = "SELECT ID, Leverandor, Poststed, Adresse, Merker, Text, Telefon FROM Skitt_Leverandor where Leverandor = '" + Vari + "' order by Leverandor asc for json auto"; }
            else
            { STRsql = "SELECT ID, Leverandor, Poststed, Adresse, Merker, Text, Telefon FROM Skitt_Leverandor where ID = "+id+ " order by Leverandor asc for json auto"; }

            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
           
            using (SqlConnection con = _DBConn)
            {
                using (SqlCommand cmd = new SqlCommand(STRsql, con))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    //SqlDataAdapter da = new SqlDataAdapter(cmd);
                    var jsonResult = new StringBuilder();
                    var reader = cmd.ExecuteReader();

                    if (!reader.HasRows)
                    {
                        jsonResult.Append("[]");
                    }
                    else
                    {
                        while (reader.Read())
                        {
                            jsonResult.Append(reader.GetValue(0).ToString());
                        }
                    }


                    var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                    json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;


                    string ert = jsonResult.ToString();
                    reader.Close();
                    return ert;

                }
            }

        }

        // POST: api/DoLeverandor
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);

                if (Json["ID"] == "-1")
                {
                    strSQL = "delete from dbo.Skitt_Leverandor where ID = " + Json["DeleteID"];
                }

                else if (Json["ID"] == "0")
                { }

                else
                {
                    if (Exist(Json["ID"]))
                    {
                        strSQL = "update Skitt_Leverandor set Leverandor = '" + Json["Leverandor"].Replace("'", "_") + "', Adresse = '" + Json["Adresse"].Replace("'", "_") + "', PostSted = '" + Json["Poststed"].Replace("'", "_") + "', Telefon = '" + Json["Telefon"].Replace("'", "_") + "', Text = '" + Json["Text"].Replace("'", "_") + "', Merker = '" + Json["Merker"].Replace("'", "_") + "' where ID = '" + Json["ID"].Replace("'", "_") + "'";

                    }
                    else
                    {
                       // strSQL = 
                       strSQL = "insert into Skitt_Leverandor (Leverandor, Adresse, PostSted, Telefon, Text, Merker     ) values ('" + Json["Leverandor"].Replace("'", "_") + "', '" + Json["Adresse"].Replace("'", "_") + "', '" + Json["Poststed"].Replace("'", "_") + "', '" + Json["Telefon"].Replace("'", "_") + "', '" + Json["Text"].Replace("'", "_") + "', '" + Json["Merker"].Replace("'", "_") + "')";


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
            { }

            return "Kunden ble oppdatert ! (" + PutSQL + ")";
        }

        // PUT: api/DoLeverandor/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoLeverandor/5
        public string Delete(string id)
        {
            return "werty -->" + id;
        }



      

        public bool Exist (string ID)
        {
            if (ID == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update Skitt_Leverandor set Text = Text where ID = " + ID;
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return  false ; }

            finally
            {
               
            }

            if (PutSQL == 1) { return true; } else { return false; } 
            
        }


    }
}
