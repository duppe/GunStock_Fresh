using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using IdanikaSoftware;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CostumerController : ApiController
    {
       
        // GET: api/Costumer
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Costumer/5
        public void  Get(string Jsonstring)
        {
#pragma warning disable CS0219 // The variable 'STRsql' is assigned but its value is never used
            string STRsql = "";
#pragma warning restore CS0219 // The variable 'STRsql' is assigned but its value is never used

            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(Jsonstring);

            String id = Json["Search"].Replace("'", "_");
            String Password = Json["Password"].Replace("'", "_");
            String BaseAKA = Json["BaseAKA"].Replace("'", "_");

           


        }

        // POST: api/Costumer
        public string Post([FromBody]string Jsonstring)
        {

            string STRsql = "";

            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(Jsonstring);

            String id = Json["Search"].Replace("'", "_");
            String Password = Json["Password"].Replace("'", "_");
            String BaseAKA = Json["BaseAKA"].Replace("'", "_");





            if (id == "0")
            { STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Kunder] FOR JSON AUTO"; }
            else if (id == "123")
            {
                STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Kunder] where ([Kundenavn] like '" + id + "%') or ([Telefon] like '" + id + "%') FOR JSON AUTO";
            }
            else
            {
                STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Kunder] where ([Kundenavn] like '" + id + "%') or ([Telefon] like '" + id + "%') FOR JSON AUTO";
            }




            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
            //DataTable dt = new DataTable();
            using (SqlConnection con = _DBConn)
            {
                using (SqlCommand cmd = new SqlCommand(STRsql, con))
                {
                    cmd.CommandType = CommandType.Text;
                    con.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    var jsonResult = new StringBuilder();
                    var reader = cmd.ExecuteReader();
                    //reader.Read();
                    //var test = reader.GetValue(0).ToString();

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

                    var output = jsonResult.ToString();

                    //JToken token = JToken.Parse(output.ToString());


                    string JSONString = string.Empty;
                    JSONString = jsonResult.ToString();

                    var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                    json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;

                    string ert = jsonResult.ToString();

                    reader.Close();
                    con.Close();

                    if (_DBConn.State == ConnectionState.Open)
                    {
                        // do something
                        // ...
                        _DBConn.Close();
                    }


                    return ert;

                }
            }


        }

        // PUT: api/Costumer/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Costumer/5
        public void Delete(int id)
        {
        }
    }
}
