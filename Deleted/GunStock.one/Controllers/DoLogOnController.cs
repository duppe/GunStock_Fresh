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

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoLogOnController : ApiController
    {
        public int PutSQL = 0;
        
        // GET: api/DoLogOn
        public IEnumerable<string> Get()
        {
            yield return "Skriv '/' + Serienummer";
            //return new string[] { "value1", "value2" };
        }

        // GET: api/DoLogOn/5
        public string Get(string Q)
        {
            JavaScriptSerializer jss = new JavaScriptSerializer();
            dynamic Json = jss.DeserializeObject(Q);

            string ClientSessionPassword = "";

            try
            {
                if (Json["GetPassword"].ToString() != "") {
                    var ToReturn = DoSendPassword(Json["GetPassword"]);
                    return ToReturn;
                }
            }
            catch (Exception StringFuck) { }

            try
            {
                if(Json["DoLogOut"].ToString() != "") { if (DoLogOut(Json["DoLogOut"])) { return "true"; } }
            }
            catch (Exception StringFuck) { }

            try
            {
                //if (Json["ClientSessionPassword"].ToString() != "")
                if (Json["ClientSessionPassword"].ToString() != null && Json["ClientSessionPassword"].ToString() != "")
                {
                    ClientSessionPassword = Json["ClientSessionPassword"].Replace("'", "_");

                    if (ExistCSP(ClientSessionPassword))
                    {
                        return "true";
                    }
                    else
                    {
                        return "false";
                    }

                }

            }

            catch (Exception StringFuck) {  }


            return "true";
        }

        // POST: api/DoLogOn
        public string Post([FromBody]string Jsonstring)
        {
            string strSQL = "";
            string ClientEmail = "";
            string ClientPassword = "";
            string ClientSessionPassword = "";
            string ClientSessionID = "";
            string CLientUrl = "";
            string ClientLevel = "";
            string ClientTimeOutValue = "";
            string ClientChangePassword = "";
            string NewPassword = "";
            string CLientName = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(Jsonstring);

                ClientEmail = Json["ClientEmail"].Replace("'", "_");
                NewPassword = Json["NewPassword"].Replace("'", "_");

                try
                {
                    ClientPassword = Json["ClientPassword"].Replace("'", "_");
                    ClientSessionPassword = Json["ClientSessionPassword"].Replace("'", "_");
                    ClientSessionID = Json["ClientSessionID"].Replace("'", "_");
                    CLientUrl = GetUserUrl(ClientEmail);
                    ClientLevel = GetUserLevel(ClientEmail);
                    ClientTimeOutValue = GetUserTimeout(ClientEmail);
                    ClientChangePassword = GetChangePassword(ClientEmail);
                    CLientName = GetUserName(ClientEmail);
                }

                catch { }

                if (NewPassword == "1")
                {
                    strSQL = "update Skitt_LogOn set ClientPassword = '" + ClientPassword + "', ClientChangePassword = 0 where ClientEmail = '" + ClientEmail + "'";
                    SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                    return "Passordet ble oppdatert !";
                }

                else if (Exist(ClientEmail, ClientPassword))
                {

                    strSQL = "update Skitt_LogOn set ClientIP = '"+ HttpContext.Current.Request.UserHostAddress + "', ClientStart = getdate(), ClientPing = getdate(), ClientSessionID = '" + ClientSessionID + "', ClientSessionPassword = '" + ClientSessionPassword + "' where ClientEmail = '" + ClientEmail + "'";
                    SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                    //MakeNewCostumer("testerenT");
                    DuppeCommands.SendError(CLientName + " Logget på med SessionPass = " + ClientSessionPassword);
                    return ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel +"|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName;


                }

            }

            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }



            return "Error13";
            //return "{/"Error13/" , /"1/"}";



        }

        // PUT: api/DoLogOn/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoLogOn/5
        public void Delete(int id)
        {
        }

        public bool Exist(string ClientEmail, string ClientPassword)
        {
            if (ClientEmail == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
               
               // string strSQL = "update Skitt_LogOn set ClientEmail = ClientEmail where ClientEmail = '" + ClientEmail + "' ";
               string strSQL = "update Skitt_LogOn set ClientEmail = ClientEmail where ClientEmail = '" + ClientEmail + "' and ClientPassword = '" + ClientPassword + "' and ClinetEnable = 'true'";

                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myCommand.Dispose();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return false; }

            finally
            {
                myConnection.Close();
            }


            if (PutSQL == 1) { return true; } else { return false; }

        }

        public bool ExistCSP(string ClientSessionPassword)
        {
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                //string strSQL = "update Skitt_LogOn set ClientLastSeen = GETDATE(), ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart), ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + ClientSessionPassword + "'";

                string strSQL = "update Skitt_LogOn set ClientTimeIdle = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing ), ClientLastSeen = GETDATE(), ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart), ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + ClientSessionPassword + "'";
               //  strSQL += " update dbo.Skitt_LogOn set ClientSessionPassword = '', ClientTimeIdle = '0'  where (DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing )) > 1200";
               // strSQL += " update dbo.Skitt_LogOn set ClientSessionPassword = '', ClientTimeIdle = '0'  where ClientTimeIdle > 12000000";

                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myCommand.Dispose();

            }
            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString(), "SQL"); return false; }

            finally
            {
                myConnection.Close();
                
            }

            if (PutSQL == 1) {
                return true;
            }
            else {
                DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + "  (User expired == " + ClientSessionPassword + ")", "Client Password Error");
                return false;
            }

        }

        public bool DoLogOut(string ClientSessionPassword)
        {
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update Skitt_LogOn set ClientSessionPassword = '', ClientOnline = '', ClinetEnd = getdate() where ClientSessionPassword = '" + ClientSessionPassword + "'";
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();

            }
            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString(), "SQL"); return false; }

            finally
            {
                myConnection.Close();
            }

            if (PutSQL == 1) { return true; } else { return false; }

        }

        public string GetUserUrl(string CLientUrl)
        {
            string STRsql = "select dbo.Skitt_LogOn.ClientUrl from dbo.Skitt_LogOn where dbo.Skitt_LogOn.ClientEmail = '" + CLientUrl + "'";
            string URL = "";

            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        var reader = cmd.ExecuteReader();
                        reader.Read();

                        if (!reader.HasRows)
                        {
                            URL = "index.html";
                        }
                        else
                        {
                            URL = reader["ClientUrl"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();

                        return URL;

                    }
                }

               
            }
            catch (Exception ex) { return ex.ToString(); }


        }

        public string GetUserLevel(string CLientLevel)
        {
            string STRsql = "select dbo.Skitt_LogOn.ClientLevel from dbo.Skitt_LogOn where dbo.Skitt_LogOn.ClientEmail = '" + CLientLevel + "'";
            string ReturnString = "";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        var reader = cmd.ExecuteReader();
                        reader.Read();

                        if (!reader.HasRows)
                        {
                            ReturnString = "0";
                        }
                        else
                        {
                            ReturnString = reader["ClientLevel"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();

                        return ReturnString;

                    }
                }
            }
            catch (Exception ex) { return ex.ToString(); }
        }

        public string GetUserName(string ClientEmail)
        {
            string STRsql = "select dbo.Skitt_LogOn.CLientName from dbo.Skitt_LogOn where dbo.Skitt_LogOn.ClientEmail = '" + ClientEmail + "'";
            string ReturnString = "";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        var reader = cmd.ExecuteReader();
                        reader.Read();

                        if (!reader.HasRows)
                        {
                            ReturnString = "0";
                        }
                        else
                        {
                            ReturnString = reader["CLientName"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();

                        return ReturnString;

                    }
                }
            }
            catch (Exception ex) { return ex.ToString(); }
        }

        public string GetUserTimeout(string CLientLevel)
        {
            string STRsql = "select dbo.Skitt_LogOn.ClientTimeOutValue from dbo.Skitt_LogOn where dbo.Skitt_LogOn.ClientEmail = '" + CLientLevel + "'";
            string ReturnString = "";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        var reader = cmd.ExecuteReader();
                        reader.Read();

                        if (!reader.HasRows)
                        {
                            ReturnString = "0";
                        }
                        else
                        {
                            ReturnString = reader["ClientTimeOutValue"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();


                        return ReturnString;

                    }
                }
            }
            catch (Exception ex) { return ex.ToString(); }
        }

        public string DoSendPassword(string Email)
        {
            try
            {
                var Password = System.Web.Security.Membership.GeneratePassword(8, 0);
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
                try
                {
                    string strSQL = "update Skitt_LogOn set ClientPassword = '"+ Password + "', ClinetEnd = getdate(), ClientChangePassword = 1 where ClientEmail = '" + Email + "'";
                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();

                }
                catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde en feil ved endring av passord, prøv igjen litt senere"; }

                finally
                {
                    myConnection.Close();
                }

                if (PutSQL == 1) {
                    var Body = @"<!doctype html> <html lang=""no""> <head> <meta http-equiv=""content-type"" content=""text/html; charset=ISO-8859-1"" /> <title>Nytt passord</title> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <style> * { line-height: 1.2; margin: 0; } html { color: #888; display: table; font-family: sans-serif; height: 100%; text-align: center; width: 100%; } body { display: table-cell; vertical-align: middle; margin: 2em auto; } h1 { color: #555; font-size: 2em; font-weight: 400; } p { margin: 0 auto; width: 280px; } @media only screen and (max-width: 280px) { body, p { width: 95%; } h1 { font-size: 1.5em; margin: 0 0 0.3em; } } </style> </head> <body> GunStock ONE. <h1> <img alt="""" src=""http://gunapi.gunstock.one/img/GunStockOne.png"" /></h1> <p>&nbsp;</p> <h3 >Her er ditt nye passord :<br /><strong>" + Password + @"</strong> <br />Husk at passordet må endres ved pålogging.</h3> <h3 ><a href=""http://www.gunstock.one"">http://www.gunstock.one</a><br /> </h3> </body> </html> <!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx --> ";
                    return DuppeCommands.SendMail("gunstock.one@dokumentasjon.eu", Email, Body, "Her er ditt Nye Passord");
                }
                else {
                    return "Passordet ble ikke endret, prøv igjen litt senere";
                }


            }

            catch { return "Misslykkes!"; }
        }

        public string GetChangePassword(string ClientEmail)
        {
            string STRsql = "select dbo.Skitt_LogOn.ClientChangePassword from dbo.Skitt_LogOn where dbo.Skitt_LogOn.ClientEmail = '" + ClientEmail + "'";
            string ReturnString = "";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        var reader = cmd.ExecuteReader();
                        reader.Read();

                        if (!reader.HasRows)
                        {
                            ReturnString = "0";
                        }
                        else
                        {
                            ReturnString = reader["ClientChangePassword"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();

                        return ReturnString;

                    }
                }
            }
            catch (Exception ex) { return ex.ToString(); }
        }


        // ************************************************
        // ********    Generate New Costumer **************
        // ************************************************


        public string MakeNewCostumer(string NewClient)
        {
            using (SqlConnection con = new SqlConnection(DuppeGlobals.ConnString))
            {

                try
                {
                    //
                    // Open the SqlConnection.
                    //
                    con.Open();
                    //
                    // The following code uses an SqlCommand based on the SqlConnection.
                    //
                    using (SqlCommand command = new SqlCommand("CREATE TABLE " + NewClient + "(First_Name char(50),Last_Name char(50),Address char(50),City char(50),Country char(25),Birth_Date datetime);", con))
                     
                    PutSQL = command.ExecuteNonQuery();


                    return PutSQL.ToString();
                }
                catch (Exception ex)
                {
                   return (ex.Message);
                }
            }
        }

        /*
        public string GetSettings()
        {

            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
            ////DataTable dt = new DataTable();
            using (SqlConnection con = _DBConn)
            {
                using (SqlCommand cmd = new SqlCommand("Select * from dbo.Skitt_Settings where ID = 1", con))
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
        */
    }
}
