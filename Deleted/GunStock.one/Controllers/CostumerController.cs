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
        public string Get(string id)
        {
            string STRsql;
            if (id == "0")
            { STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[Skitt_Kunder] FOR JSON AUTO"; }
            else if (id == "123")
            {
                STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[Skitt_Kunder] where ([Kundenavn] like '" + id + "%') or ([Telefon] like '" + id + "%') FOR JSON AUTO";
            }
            else
            {
                //STRsql = "SELECT       Skitt_Pistoler.DatoOprettet as Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID ,(select Skitt_Kunder.Kundenavn  from Skitt_Kunder  inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.ID WHERE (Serienummer like '" + id + "%')) as Kundenavn FROM Skitt_Pistoler WHERE (Serienummer like '" + id + "%') FOR JSON AUTO";
                STRsql = "SELECT TOP (1000) [ID] ,[Kundenavn],[Adresse] ,[Poststed] ,[Telefon]  FROM [dokumentasjon_eu_db].[dbo].[Skitt_Kunder] where ([Kundenavn] like '" + id + "%') or ([Telefon] like '" + id + "%') FOR JSON AUTO";
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
                    return ert;

                }
            }
        }

        // POST: api/Costumer
        public void Post([FromBody]string value)
        {
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
