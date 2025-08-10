using Nancy.Json;
using System.Data;
using System.Data.SqlClient;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace IdanikaSoftware
{
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

        public static string SendMail(string FromEmail, string To, string Body, string Subject, HttpContext httpContext = null)
        {
            string FromIP = "";

            if (httpContext != null)
            {
                try
                {
                    FromIP = httpContext.Connection.RemoteIpAddress.ToString();
                }
                catch (Exception)
                {
                    FromIP = "";
                }
            }
            else
            {
                FromIP = "";
            }

            MailAddress fromAddress = new MailAddress("NoReply@Gunstock.One", "GunStock");
            MailAddress toAddress = new MailAddress(To, "Et Menneske");
            const string fromPassword = "Runa1983?!";

            // SMTP Configuration
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.simply.com"; // Endre til din SMTP-serveradresse
            smtp.Port = 587; // Endre til riktig SMTP-portnummer
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential(fromAddress.Address, fromPassword);

            // Mail Message Configuration
            MailMessage message = new MailMessage(fromAddress, toAddress);
            message.IsBodyHtml = true;
            message.Subject = "User IP: " + FromIP + " --> " + Subject;
            message.Body = Body;

            // Send Email
            try
            {
                smtp.Send(message);
                return "OK (Sent To " + To + ")";
            }
            catch (Exception ex)
            {
                return "error: " + ex.ToString();
            }
        }


    }
    public static class DuppeGlobals
    {
       // public static string ConnString = "user id=Dokumentasjon_eu;password=Runa1983;server=mssql8.simply.com;Trusted_Connection=no;database=dokumentasjon_eu_db;connection timeout=30;";
        public static string ConnString = "user id=sa;password=Runa1983;server=192.168.0.10;Trusted_Connection=no;database=gunstock_one_db;connection timeout=30;";

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

    public static class DoLogOn_
    {
        public static bool ExistCSP(string ClientSessionPassword, string BaseAKA)
        {
            int PutSQL = 0;
            //string w = "x.x.x.x";
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                //string strSQL = "update " + BaseAKA + "_LogOn set ClientLastSeen = GETDATE(), ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart), ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + ClientSessionPassword + "'";

                string strSQL = "update " + BaseAKA + "_LogOn set ClientTimeIdle = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing ), ClientLastSeen = GETDATE(), ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart), ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + ClientSessionPassword + "'";
                //  strSQL += " update dbo." + BaseAKA + "_LogOn set ClientSessionPassword = '', ClientTimeIdle = '0'  where (DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing )) > 1200";
                // strSQL += " update dbo." + BaseAKA + "_LogOn set ClientSessionPassword = '', ClientTimeIdle = '0'  where ClientTimeIdle > 12000000";

                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myCommand.Dispose();

            }
            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + "x.x.x.x" + " --> " + StringFuck.ToString(), "SQL"); return false; }

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
                DuppeCommands.SendError("User IP : " + "x.x.x.x" + "  (User expired == " + ClientSessionPassword + ")", "Client Password Error");
                return false;
            }

        }

        public static bool DoLogOut(string ClientSessionPassword, string BaseAKA)
        {
            int PutSQL = 0;
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update " + BaseAKA + "_LogOn set ClientSessionPassword = '', ClientOnline = '', ClinetEnd = getdate() where ClientSessionPassword = '" + ClientSessionPassword + "'";
                SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();

            }
            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + "x.x.x.x" + " --> " + StringFuck.ToString(), "SQL"); return false; }

            finally
            {
                myConnection.Close();
            }

            if (PutSQL == 1) { return true; } else { return false; }

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

        public static string GetBaseAKA(string ClientName)
        {
            string STRsql = "select dbo.Dokumentasjon_LogOn.BaseAKA from dbo.Dokumentasjon_LogOn where dbo.Dokumentasjon_LogOn.ClientName = '" + ClientName + "'";
            string BaseAKA = "";

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
                            BaseAKA = "index.html";
                        }
                        else
                        {
                            BaseAKA = reader["BaseAKA"].ToString();
                            // URL = reader.GetValue(0).ToString();
                        }

                        reader.Close();
                        con.Close();
                        cmd.Dispose();

                        return BaseAKA;

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

        public static string GetOverLord(string CLientLevel, string BaseAKA)
        {
            string STRsql = "select dbo." + BaseAKA + "_LogOn.OverLord from dbo." + BaseAKA + "_LogOn where dbo." + BaseAKA + "_LogOn.ClientEmail = '" + CLientLevel + "'";
            string ReturnString = "";
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
      
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
                            ReturnString = reader["OverLord"].ToString();
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

        public static string DoSendPassword(string Email, string BaseAKA, HttpContext httpContext)
        {
            int PutSQL = 0;
            try
            {
                var Password = MakePassword.Generate(8, 0);
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
                    return DuppeCommands.SendMail("gunstock.one@dokumentasjon.eu", Email, Body, "Her er ditt Nye Passord", httpContext: httpContext);
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

        public static class MakePassword
        {
            private static readonly char[] Punctuations = "!@#$%^&*()_-+=[{]};:>|./?".ToCharArray();

            public static string Generate(int length, int numberOfNonAlphanumericCharacters)
            {
                if (length < 1 || length > 128)
                {
                    throw new ArgumentException(nameof(length));
                }

                if (numberOfNonAlphanumericCharacters > length || numberOfNonAlphanumericCharacters < 0)
                {
                    throw new ArgumentException(nameof(numberOfNonAlphanumericCharacters));
                }

                using (var rng = RandomNumberGenerator.Create())
                {
                    var byteBuffer = new byte[length];

                    rng.GetBytes(byteBuffer);

                    var count = 0;
                    var characterBuffer = new char[length];

                    for (var iter = 0; iter < length; iter++)
                    {
                        var i = byteBuffer[iter] % 87;

                        if (i < 10)
                        {
                            characterBuffer[iter] = (char)('0' + i);
                        }
                        else if (i < 36)
                        {
                            characterBuffer[iter] = (char)('A' + i - 10);
                        }
                        else if (i < 62)
                        {
                            characterBuffer[iter] = (char)('a' + i - 36);
                        }
                        else
                        {
                            characterBuffer[iter] = Punctuations[i - 62];
                            count++;
                        }
                    }

                    if (count >= numberOfNonAlphanumericCharacters)
                    {
                        return new string(characterBuffer);
                    }

                    int j;
                    var rand = new Random();

                    for (j = 0; j < numberOfNonAlphanumericCharacters - count; j++)
                    {
                        int k;
                        do
                        {
                            k = rand.Next(0, length);
                        }
                        while (!char.IsLetterOrDigit(characterBuffer[k]));

                        characterBuffer[k] = Punctuations[rand.Next(0, Punctuations.Length)];
                    }

                    return new string(characterBuffer);
                }
            }
        }

        // ************************************************
        // ********    Generate New Costumer **************
        // ************************************************
        public static String DoGetUser(string FirmName, string ClientEmail, string ClientPassword)
        {

            string strSQL = "";
            
            

            strSQL += "Select [ClientIP],[FirmID],RTRIM([FirmName]) AS [FirmName],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser],";
            strSQL += " 'GunStock_' + RTRIM([FirmName]) AS BaseAKA, 'GunStock' AS [Service] from dbo.GunStock_" + FirmName + "_LogOn where ClientEmail like '" + ClientEmail + "'  and ClientPassword like '" + ClientPassword + "' ";
            strSQL += " FOR JSON AUTO ";
#pragma warning disable CS0219 // The variable 'BaseAKA' is assigned but its value is never used
            //string BaseAKA = "";
#pragma warning restore CS0219 // The variable 'BaseAKA' is assigned but its value is never used

            try
            {
                string Ret = SQL.RunSQLQuery(strSQL);
                return SQL.RunSQLQuery(strSQL);

            }
            catch (Exception ex) { return ex.ToString(); }
        }


        public static string MakeNewCostumer(string NewClient)
        {
            int PutSQL = 0;
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

                        /*
                        var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                        json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;
                        */

                        string ert = jsonResult.ToString();
                        Firmreader.Close();
                        return ert;

                    }
                }


            }
            catch (Exception ex) { return ex.ToString(); }
        }

       
    }

    class SQL
    {
        /// <summary>
        /// Execute a SQL string with NonQuery, and return reults as  True/False.
        /// </summary>
        /// <param name="strSQL">String for SQL execution.</param>
        /// <returns>True/False</returns>
        public static string RunSQLNonQuery(string strSQL)
        {
            int PutSQL;
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
                DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "0";
            }

            finally { }

            return PutSQL.ToString();
        }

        /// <summary>
        /// Execute a SQL string, and return reults as Json.
        /// </summary>
        /// <param name="strSQL">String for SQL execution.</param>
        /// <returns>Json[]</returns>
        public static string RunSQLQuery(string strSQL)
        {
            try
            {
                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                //////DataTable dt = new DataTable();
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(strSQL, con))
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




                        string JSONString = string.Empty;
                        JSONString = jsonResult.ToString();

                        var serializer = new JavaScriptSerializer();
                        var serializedJson = serializer.Serialize(JSONString);

                        var deserializer = new JavaScriptSerializer();
                        var deserializedJson = deserializer.DeserializeObject(serializedJson);

                        JSONString = serializedJson.ToString();




                        string ert = jsonResult.ToString();
                        reader.Close();

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
            catch (Exception ex) { return ex.ToString(); }
        }
    }


}
