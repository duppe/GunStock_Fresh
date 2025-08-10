using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;
using IdanikaSoftware;

namespace GunStock_Beta_octopus.Controllers
{
    public class RapportController : ApiController
    {
        public string Post([FromBody] string Jsonstring)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(HttpUtility.UrlDecode(Jsonstring));
            string STRsql = "";
            string id = Json["Search"];
            string SessionPassword = Json["SessionPassword"];
            string BaseAKA = Json["BaseAKA"];
            string Customer = Json["Customer"];

            String addOnSQL = "";
            try
            {
                // Is There optional SQl 
                addOnSQL = Json["addOnSQL"];
            }

            catch (Exception ex) { }

            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
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
                    return ert;



                }
            }


        }
    }
}
