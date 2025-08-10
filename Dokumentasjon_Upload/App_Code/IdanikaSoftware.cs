using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Script.Serialization;

namespace IdanikaSoftware
{

    /// <summary>
    /// Summary description for IdanikaSoftware
    /// </summary>
    public class IdanikaSoftware
    {
        public static int PutSQL = 0;
        public static class DuppeCommands
        {
            public static void SendError(string Error)
            {

                Error = Error.Replace(@"\", "");
                Error = Error.Replace(@"(", "");
                Error = Error.Replace(@")", "");

                /*
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                try
                {
                    SqlCommand myCommand = new SqlCommand("INSERT INTO [Skitt_ErrorLog] (FromSite, ErrorMessage) VALUES ('GunStock','" + Error.ToString() + "')", myConnection);

                    myCommand.Connection.Open();
                    int i = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                }
                catch (Exception StringFuck)
                {
                    SendError(StringFuck.ToString(), "Feil med SendError()");
                }

                finally
                { }
                */
            }

            public static void SendError(string Error, string ShowText)
            {
                Error = Error.Replace(@"\", "");
                Error = Error.Replace(@"(", "");
                Error = Error.Replace(@")", "");
                /*
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                try
                {
                    SqlCommand myCommand = new SqlCommand("INSERT INTO [Skitt_ErrorLog] (FromSite, ErrorMessage, ShowText) VALUES ('GunStock','" + Error.ToString() + "','" + ShowText + "')", myConnection);

                    myCommand.Connection.Open();
                    int i = myCommand.ExecuteNonQuery();
                    myConnection.Close();
                }
                catch (Exception StringFuck)
                {
                    SendError(StringFuck.ToString());
                }
                */

            }

            public static bool CheckUser(string SessionPassword)
            {
                int PutSQL = 0;
                if (SessionPassword == "") { return false; }
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
                try
                {

                    string strSQL = "update Dokumentasjon_Costumer set ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + SessionPassword + "'";
                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();

                }
                catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return false; }

                finally
                {
                    myConnection.Close();
                }

                if (PutSQL == 1) { return true; } else { return false; }
            }

            public static string SendMail(string FromEmail, string To, string Body, string Subject)
            {
                MailAddress fromAddress = new MailAddress("haavald@haavaldsen.eu", "GunStock");
                MailAddress toAddress = new MailAddress(To, "Et Menneske");
                const string fromPassword = "Runa1983?!";
                //const string subject = "Subject";
                //const string body = "Body";
                // SMTP Configuration
                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.simply.com"; //"smtp.unoeuro.com";
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);
                // MAIL MESSAGE CONFIGURATION
                MailMessage message = new MailMessage(fromAddress, toAddress);
                message.IsBodyHtml = true;
                message.Subject = "User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + Subject;
                message.Body = Body;
                // SEND EMAIL
                try
                {
                    smtp.Send(message);
                    return "OK (Sent To " + To + ")";
                }
                catch (Exception ex)
                {

                    return "error:" + ex.ToString();
                }


                /*
                using (MailMessage mm = new MailMessage(Email, To))
                {

                    SmtpClient client = new SmtpClient();
                    client.DeliveryMethod = SmtpDeliveryMethod.Network;
                    //client.EnableSsl = true;
                    //client.UseDefaultCredentials = false;
                    client.Host = "smtp.unoeuro.com";
                    client.Port = 587;
                    // setup Smtp authentication

                    //System.Net.NetworkCredential credentials =  new System.Net.NetworkCredential("gunstock.one@dokumentasjon.eu", "AG48Zxv7YJU42Qm");
                    client.Credentials = new System.Net.NetworkCredential("gunstock.one@dokumentasjon.eu", "EgonOlsenErGaffel?!");

                    client.UseDefaultCredentials = false;
                    //client.Credentials = credentials;


                    //can be obtained from your model
                    MailMessage msg = new MailMessage();
                    msg.From = new MailAddress("gunstock.one@dokumentasjon.eu");
                    msg.To.Add(new MailAddress(To));
                    msg.Subject = Subject;
                    msg.IsBodyHtml = true;
                    msg.Body = string.Format(Body);
                    try
                    {
                        client.Send(msg);
                        return "OK (Sent To " + To + ")";
                    }
                    catch (Exception ex)
                    {

                        return "error:" + ex.ToString();
                    }

                }*/
            }

        }
        public static class DuppeGlobals
        {
            public static string ConnString = "user id=Dokumentasjon_eu;password=Runa1983;server=mssql8.simply.com;Trusted_Connection=no;database=dokumentasjon_eu_db;connection timeout=30;";
            // public static string ConnString = "user id=sa;password=Runa1983;server=ask;Trusted_Connection=no;database=dokumentasjon_eu_db;connection timeout=30;";

            // parameterless constructor required for static class
            static DuppeGlobals()
            {
                GlobalInt = 1234;
                User = "";
                Password = "";
            } // default value

            // public get, and private set for strict access control
            public static int GlobalInt { get; private set; }
            public static string User { get; private set; }
            public static string Password { get; private set; }


            // GlobalInt can be changed only via this method
            public static void SetPassword(string PasswordX)
            {
                Password = PasswordX;
            }
            public static void SetUser(string UserX)
            {
                User = UserX;
            }
            public static void SetGlobalInt(int newInt)
            {
                GlobalInt = newInt;
            }
        }

        public IdanikaSoftware()
        {
            //
            // TODO: Add constructor logic here
            //
        }





        public static string Post(string Jsonstring)
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
            string BaseAKA = "";
            string TheNewPassword = "";
            string FirmMail = "";
            string FirmPhone = "";
            string FirmAdress = "";
            string FirmName = "";
            string FirmID = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(Jsonstring);

                ClientEmail = Json["ClientEmail"].Replace("'", "_");
                ClientPassword = Json["ClientPassword"].Replace("'", "_");
                NewPassword = Json["NewPassword"].Replace("'", "_");

                try
                {
                    TheNewPassword = Json["TheNewPassword"].Replace("'", "_");
                }
                catch { }

                try
                {
                    ClientPassword = Json["ClientPassword"].Replace("'", "_");
                    ClientSessionPassword = Json["ClientSessionPassword"].Replace("'", "_");
                    ClientSessionID = Json["ClientSessionID"].Replace("'", "_");
                }
                catch { }

                JavaScriptSerializer jss2 = new JavaScriptSerializer();
                dynamic Json2 = jss2.DeserializeObject(DoGetUser(ClientEmail, ClientPassword).ToString());

                foreach (var item in Json2)
                {

                    try
                    {
                        if (ClientEmail == item["ClientEmail"] & ClientPassword == item["ClientPassword"])
                        {
                            BaseAKA = item["BaseAKA"];
                            FirmID = item["FirmID"].ToString();
                            strSQL = "update " + BaseAKA + "_LogOn set ClientIP = '" + HttpContext.Current.Request.UserHostAddress + "', ClientStart = getdate(), ClientPing = getdate(), ClientSessionID = '" + ClientSessionID + "', ClientSessionPassword = '" + ClientSessionPassword + "' where ClientEmail = '" + ClientEmail + "'";
                            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                            SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                            myCommand.Connection.Open();
                            PutSQL = myCommand.ExecuteNonQuery();
                            myConnection.Close();
                            //MakeNewCostumer("testerenT");

                            try
                            {
                                //BaseAKA = GetBaseAKA(CLientName);

                                CLientUrl = GetUserUrl(ClientEmail, BaseAKA);
                                ClientLevel = GetUserLevel(ClientEmail, BaseAKA);
                                ClientTimeOutValue = GetUserTimeout(ClientEmail, BaseAKA);
                                ClientChangePassword = GetChangePassword(ClientEmail, BaseAKA);
                                CLientName = GetUserName(ClientEmail, BaseAKA);


                            }

                            catch { }

                            // *************      Get Firm Info (Firm is treated like a costumer, and are always ID 1 in DB)
                            try
                            {
                                string BaseAka = item["BaseAKA"];
                                JavaScriptSerializer jssFirm = new JavaScriptSerializer();
                                dynamic JFirm = jssFirm.DeserializeObject(DoGetFirmSetting(BaseAka).ToString());

                                FirmMail = JFirm[0]["FirmMail"];
                                FirmPhone = JFirm[0]["FirmPhone"];
                                FirmAdress = JFirm[0]["FirmAdress"];
                                FirmName = JFirm[0]["FirmName"];


                            }

                            catch (Exception error) { Console.WriteLine(error.ToString()); }

                            DuppeCommands.SendError(CLientName + " Logget på med SessionPass = " + ClientSessionPassword);


                            if (NewPassword == "1")
                            {
                                strSQL = "update " + BaseAKA + "_LogOn set ClientPassword = '" + TheNewPassword + "', ClientChangePassword = 0 where ClientEmail = '" + ClientEmail + "'";



                                SqlConnection myConnection2 = new SqlConnection(DuppeGlobals.ConnString);
                                try
                                {
                                    SqlCommand myCommand2 = new SqlCommand(strSQL, myConnection2);

                                    myCommand2.Connection.Open();
                                    PutSQL = myCommand2.ExecuteNonQuery();
                                    myConnection2.Close();
                                }

                                catch (Exception StringFuck)
                                {
                                    DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)";
                                }

                                finally { }

                                return "Passordet ble oppdatert ! True=" + PutSQL.ToString();

                            }



                            return ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel + "|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName + "|" + BaseAKA + "|" + FirmMail + "|" + FirmPhone + "|" + FirmAdress + "|" + FirmName + "|" + FirmID;

                        }
                    }
                    catch (Exception tre) { return tre.ToString(); }
                }



                return "Error13";  //ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel +"|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName + "|" + BaseAKA;




            }

            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }



#pragma warning disable CS0162 // Unreachable code detected
            return "Error13";
#pragma warning restore CS0162 // Unreachable code detected
            //return "{/"Error13/" , /"1/"}";



        }


        public static String DoGetUser(string ClientEmail, string ClientPassword)
        {

            string strSQL = "";
            strSQL += @"IF OBJECT_ID ('tempdb..#TempResults') is not null ";
            strSQL += "drop table #TempResults ";
            strSQL += "";
            strSQL += "DECLARE @tmpTablesToFindUser ";
            strSQL += "";
            strSQL += "TABLE ( RowNumber INT PRIMARY KEY ,Query NVARCHAR(MAX) )    ";
            strSQL += "";
            strSQL += "";
            strSQL += "/* ";
            strSQL += "Make first ";
            strSQL += "*/ ";
            strSQL += "Select [ClientIP],[FirmID],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser],  'Dokumentasjon_Costumer________________________________________________________________________' as BaseAKA, 'Dokumentasjon_Costumer' AS [Service] into #TempResults from dbo.GunStock_Haavaldsen_LogOn where ClientEmail like '" + ClientEmail + @"2'  and ClientPassword like '" + ClientPassword + @"' ";
            strSQL += "";
            strSQL += "INSERT INTO            ";
            strSQL += "@tmpTablesToFindUser    ";
            strSQL += "";
            strSQL += "";
            strSQL += "SELECT          RowNumber = ROW_NUMBER() OVER (ORDER BY (SELECT (0)))  ,'insert into #TempResults Select  [ClientIP],[FirmID],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser], '''+(SELECT SUBSTRING(objects.name, 1, LEN(objects.name) - CHARINDEX('_', REVERSE(objects.name))))+''' as BaseAKA, '''+SUBSTRING(objects.name, 0, CHARINDEX('_', objects.name))+''' AS [Service] from '+schemas.name+'.'+objects.name+' where ClientEmail like ''" + ClientEmail + @"''  and ClientPassword like ''" + ClientPassword + @"''' AS Query    ";
            strSQL += "FROM         sys.objects     ";
            strSQL += "INNER JOIN        sys.schemas    ON        schemas.schema_id = objects.schema_id   ";
            strSQL += "WHERE         type = 'U' AND objects.name like '%LogOn'    ";
            strSQL += "";
            strSQL += "";
            strSQL += "DECLARE @Counter INT    ";
            strSQL += "";
            strSQL += "";
            strSQL += "SELECT @Counter = MAX(RowNumber) FROM @tmpTablesToFindUser       WHILE(@Counter > 0) BEGIN        ";
            strSQL += "";
            strSQL += "DECLARE @Query NVARCHAR(MAX) ";
            strSQL += "";
            strSQL += "SELECT @Query = Query FROM @tmpTablesToFindUser    WHERE RowNumber = @Counter        ";
            strSQL += "PRINT @Query ";
            strSQL += "";
            strSQL += "EXEC sp_executesql @statement = @Query   ";
            strSQL += "";
            strSQL += "SET @Counter = @Counter - 1   ";
            strSQL += "";
            strSQL += "END    ";
            strSQL += "";
            strSQL += "";
            strSQL += "select  *  ";
            strSQL += "from #TempResults FOR JSON AUTO ";
#pragma warning disable CS0219 // The variable 'BaseAKA' is assigned but its value is never used
            //string BaseAKA = "";
#pragma warning restore CS0219 // The variable 'BaseAKA' is assigned but its value is never used

            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                ////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(strSQL, con))
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
            catch (Exception ex) { return ex.ToString(); }
        }

        public static string GetUserUrl(string CLientUrl, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.ClientUrl from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + CLientUrl + "'";
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

        public static String DoGetFirmSetting(String BaseAKA)
        {
            string strSQL = "SELECT  Kundenr, Kundenavn, Adresse, Poststed, Telefon, EPostKunde, KundeVapen, Updated, ByUser, Info, NotOK, Inserted, id, KundeEtternavn FROM      " + BaseAKA + "_Kunder WHERE   (Kundenavn = 'Butikk')";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                ////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(strSQL, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        SqlDataAdapter da = new SqlDataAdapter(cmd);
                        var jsonResult = new StringBuilder();
                        var Firmreader = cmd.ExecuteReader();

                        //var test = reader.GetValue(0).ToString();



                        if (!Firmreader.HasRows)
                        {
                            jsonResult.Append("[]");
                        }
                        else
                        {
                            Firmreader.Read();
                            string FirmMail = Firmreader["EPostKunde"].ToString();
                            string FirmPhone = Firmreader["Telefon"].ToString();
                            string FirmAdress = Firmreader["Adresse"].ToString() + ", " + Firmreader["Poststed"].ToString();
                            string FirmName = Firmreader["KundeEtternavn"].ToString();
                            //jsonResult.Append(@"[{""FirmMail"":""" + FirmMail + @""",""FirmPhone"":""" + FirmPhone + @"""}]");
                            jsonResult.Append(@"[{""FirmMail"":""" + FirmMail + @""",""FirmPhone"":""" + FirmPhone + @""",""FirmAdress"":""" + FirmAdress + @""",""FirmName"":""" + FirmName + @"""}]");

                        }

                        var output = jsonResult.ToString();

                        //JToken token = JToken.Parse(output.ToString());


                        string JSONString = string.Empty;
                        JSONString = jsonResult.ToString();

                        var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                        json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;


                        string ert = jsonResult.ToString();
                        Firmreader.Close();
                        return ert;

                    }
                }


            }
            catch (Exception ex) { return ex.ToString(); }
        }

        public static string GetUserName(string ClientEmail, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.CLientName from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + ClientEmail + "'";
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

        public static string GetUserTimeout(string CLientLevel, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.ClientTimeOutValue from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + CLientLevel + "'";
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

        public static string DoSendPassword(string Email, string BaseAKA)
        {
            try
            {
                var Password = System.Web.Security.Membership.GeneratePassword(8, 0);
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
                try
                {
                    string strSQL = "update " + BaseAKA + "_LogOn set ClientPassword = '" + Password + "', ClinetEnd = getdate(), ClientChangePassword = 1 where ClientEmail = '" + Email + "'";
                    SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                    myCommand.Connection.Open();
                    PutSQL = myCommand.ExecuteNonQuery();

                }
                catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde en feil ved endring av passord, prøv igjen litt senere"; }

                finally
                {
                    myConnection.Close();
                }

                if (PutSQL == 1)
                {
                    var Body = @"<!doctype html> <html lang=""no""> <head> <meta http-equiv=""content-type"" content=""text/html; charset=ISO-8859-1"" /> <title>Nytt passord</title> <meta name=""viewport"" content=""width=device-width, initial-scale=1""> <style> * { line-height: 1.2; margin: 0; } html { color: #888; display: table; font-family: sans-serif; height: 100%; text-align: center; width: 100%; } body { display: table-cell; vertical-align: middle; margin: 2em auto; } h1 { color: #555; font-size: 2em; font-weight: 400; } p { margin: 0 auto; width: 280px; } @media only screen and (max-width: 280px) { body, p { width: 95%; } h1 { font-size: 1.5em; margin: 0 0 0.3em; } } </style> </head> <body> GunStock ONE. <h1> <img alt="""" src=""http://gunapi.gunstock.one/img/GunStockOne.png"" /></h1> <p>&nbsp;</p> <h3 >Her er ditt nye passord :<br /><strong>" + Password + @"</strong> <br />Husk at passordet må endres ved pålogging.</h3> <h3 ><a href=""http://www.gunstock.one"">http://www.gunstock.one</a><br /> </h3> </body> </html> <!-- IE needs 512+ bytes: http://blogs.msdn.com/b/ieinternals/archive/2010/08/19/http-error-pages-in-internet-explorer.aspx --> ";
                    return DuppeCommands.SendMail("gunstock.one@dokumentasjon.eu", Email, Body, "Her er ditt Nye Passord");
                }
                else
                {
                    return "Passordet ble ikke endret, prøv igjen litt senere";
                }


            }

            catch { return "Misslykkes!"; }
        }

        public static string GetChangePassword(string ClientEmail, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.ClientChangePassword from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + ClientEmail + "'";
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

        public static string GetUserLevel(string CLientLevel, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.ClientLevel from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + CLientLevel + "'";
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

        /// <summary>
        /// Generates a Random Password
        /// respecting the given strength requirements.
        /// </summary>
        /// <param name="opts">A valid PasswordOptions object
        /// containing the password strength requirements.</param>
        /// <returns>A random password</returns>
        public static string generatePassword(Microsoft.AspNetCore.Identity.PasswordOptions opts = null)
        {
            if (opts == null) opts = new Microsoft.AspNetCore.Identity.PasswordOptions()
            {
                RequiredLength = 8,
                RequiredUniqueChars = 4,
                RequireDigit = true,
                RequireLowercase = true,
                RequireNonAlphanumeric = true,
                RequireUppercase = true
            };

            string[] randomChars = new[] {
            "ABCDEFGHJKLMNOPQRSTUVWXYZ",    // uppercase 
            "abcdefghijkmnopqrstuvwxyz",    // lowercase
            "0123456789",                   // digits
            "!@$?_-"                        // non-alphanumeric
        };

            Random rand = new Random(Environment.TickCount);
            List<char> chars = new List<char>();

            if (opts.RequireUppercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[0][rand.Next(0, randomChars[0].Length)]);

            if (opts.RequireLowercase)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[1][rand.Next(0, randomChars[1].Length)]);

            if (opts.RequireDigit)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[2][rand.Next(0, randomChars[2].Length)]);

            if (opts.RequireNonAlphanumeric)
                chars.Insert(rand.Next(0, chars.Count),
                    randomChars[3][rand.Next(0, randomChars[3].Length)]);

            for (int i = chars.Count; i < opts.RequiredLength
                || chars.Distinct().Count() < opts.RequiredUniqueChars; i++)
            {
                string rcs = randomChars[rand.Next(0, randomChars.Length)];
                chars.Insert(rand.Next(0, chars.Count),
                    rcs[rand.Next(0, rcs.Length)]);
            }

            return new string(chars.ToArray());
        }


        public static bool ExistCSP(string ClientSessionPassword, string BaseAKA)
        {
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update " + BaseAKA + "_LogOn set ClientTimeIdle = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing ), ClientLastSeen = GETDATE(), ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart), ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + ClientSessionPassword + "'";
               
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

            if (PutSQL == 1)
            {
                return true;
            }
            else
            {
                DuppeCommands.SendError("User IP : " + HttpContext.Current.Request.UserHostAddress + "  (User expired == " + ClientSessionPassword + ")", "Client Password Error");
                return false;
            }

        }


    }
}