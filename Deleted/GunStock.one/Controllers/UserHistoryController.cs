using IdanikaSoftware;
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

namespace GunStock.one.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserHistoryController : ApiController
    {
        private dynamic User_Name;
        private dynamic UserURL;

        public dynamic HistoryTitle { get; private set; }
        public dynamic HistoryText { get; private set; }

        private string strSQL;
        private int PutSQL;
        private string ActionType;

        public string STRsql { get; private set; }

        // GET: api/UserHistory
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/UserHistory/5
        public string Get(string Jsonstring)
        {
            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(Jsonstring);
                ActionType = Json["ActionType"].Replace("'", "_");

                if (ActionType == "1")
                {
                    try
                    {
                        User_Name = Json["User_Name"].Replace("'", "_");
                        UserURL = Json["UserURL"].Replace("'", "_");
                        HistoryTitle = Json["HistoryTitle"].Replace("'", "_");
                        HistoryText = Json["HistoryText"].Replace("'", "_");

                        strSQL = "DELETE FROM Skitt_UserHistory WHERE (User_URL = '" + UserURL + "') AND (User_Name = '" + User_Name + "') INSERT INTO skitt_UserHistory(User_Name, User_URL, HistoryTitle, HistoryText) VALUES ('" + User_Name + "', '" + UserURL + "', '" + HistoryTitle + "', '" + HistoryText + "') ";
                        //strSQL = "insert into Skitt_UserHistory (User_Name, User_URL) values ('" + User_Name + "', '" + UserURL +"') ";
                        SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                        SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                        myCommand.Connection.Open();
                        PutSQL = myCommand.ExecuteNonQuery();
                        myConnection.Close();
                        return "History oppdatert !";
                    }

                    catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }
                }

                if (ActionType == "2")
                {
                    try
                    {
                        STRsql = "SELECT TOP (7) User_Name, User_URL, User_TimeStamp, HistoryTitle, HistoryText FROM Skitt_UserHistory order by User_TimeStamp desc FOR JSON PATH";
                        //User_Name = Json["User_Name"].Replace("'", "_");

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

                    catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }
                }

                return "Nothing To Do";

            }

            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }



        }

    }
}
