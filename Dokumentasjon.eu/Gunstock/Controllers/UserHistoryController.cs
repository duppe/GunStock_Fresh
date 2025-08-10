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
        private dynamic CLientEmail;
        public dynamic HistoryTitle { get; private set; }
        public dynamic HistoryText { get; private set; }
        public dynamic BaseAKA { get; private set; }

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


                if (ActionType == "0")
                {
                    try
                    {
                        CLientEmail = Json["CLientEmail"].Replace("'", "_");
                        User_Name = Json["User_Name"].Replace("'", "_");
                        UserURL = Json["UserURL"].Replace("'", "_");
                        HistoryTitle = Json["HistoryTitle"].Replace("'", "_");
                        HistoryText = Json["HistoryText"].Replace("'", "_");
                        BaseAKA = Json["BaseAKA"].Replace("'", "_");

                        strSQL = "INSERT INTO " + BaseAKA + "_UserHistory(User_Name, User_URL, HistoryTitle, HistoryText) VALUES ('" + User_Name + "', '" + UserURL + "', '" + HistoryTitle + "', '" + HistoryText + "') ";
                        //strSQL = "insert into " + BaseAKA + "_UserHistory (User_Name, User_URL) values ('" + User_Name + "', '" + UserURL +"') ";
                        SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                        SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                        myCommand.Connection.Open();
                        PutSQL = myCommand.ExecuteNonQuery();
                        myConnection.Close();
                        return "History oppdatert !";
                    }

                    catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }
                }


                if (ActionType == "1") // Insert Unik
                {
                    try
                    {
                        CLientEmail = Json["CLientEmail"].Replace("'", "_");
                        User_Name = Json["User_Name"].Replace("'", "_");
                        UserURL = Json["UserURL"].Replace("'", "_");
                        HistoryTitle = Json["HistoryTitle"].Replace("'", "_");
                        HistoryText = Json["HistoryText"].Replace("'", "_");
                        BaseAKA = Json["BaseAKA"].Replace("'", "_");

                        strSQL = "DELETE FROM " + BaseAKA + "_UserHistory WHERE (User_URL = '" + UserURL + "') AND (User_Name = '" + User_Name + "') INSERT INTO " + BaseAKA + "_UserHistory(User_Name, User_URL, HistoryTitle, HistoryText) VALUES ('" + User_Name + "', '" + UserURL + "', '" + HistoryTitle + "', '" + HistoryText + "') ";
                        //strSQL = "insert into " + BaseAKA + "_UserHistory (User_Name, User_URL) values ('" + User_Name + "', '" + UserURL +"') ";
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
                    BaseAKA = Json["BaseAKA"].Replace("'", "_");
                    User_Name = Json["User_Name"].Replace("'", "_");

                    try
                    {
                        STRsql = "SELECT TOP (20) User_Name, User_URL, User_TimeStamp, HistoryTitle, HistoryText FROM " + BaseAKA + "_UserHistory where User_Name = '" + User_Name +"' order by User_TimeStamp desc FOR JSON PATH";
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
