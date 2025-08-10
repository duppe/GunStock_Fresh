using System;
using System.Collections.Generic;
using System.Collections.Specialized;
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

namespace Dokumentasjon.eu.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LogOnController : ApiController
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
            string BaseAKA = Json["BaseAKA"].Replace("'", "_");

            try
            {
                if (Json["GetPassword"].ToString() != "") {
                    var ToReturn = DoSendPassword(Json["GetPassword"], Json["BaseAKA"]);
                    return ToReturn;
                }
            }
#pragma warning disable CS0168 // The variable 'StringFuck' is declared but never used
            catch  { }
#pragma warning restore CS0168 // The variable 'StringFuck' is declared but never used

            try
            {
                if(Json["DoLogOut"].ToString() != "") { if (DoLogOut(Json["DoLogOut"], Json["BaseAKA"])) { return "true"; } }
            }
#pragma warning disable CS0168 // The variable 'StringFuck' is declared but never used
            catch { }
#pragma warning restore CS0168 // The variable 'StringFuck' is declared but never used

            try
            {
                //if (Json["ClientSessionPassword"].ToString() != "")
                if (Json["ClientSessionPassword"].ToString() != null && Json["ClientSessionPassword"].ToString() != "")
                {
                    ClientSessionPassword = Json["ClientSessionPassword"].Replace("'", "_");

                    if (ExistCSP(ClientSessionPassword, BaseAKA))
                    {
                        return "true";
                    }
                    else
                    {
                        return "false";
                    }

                }

            }

#pragma warning disable CS0168 // The variable 'StringFuck' is declared but never used
            catch (Exception StringFuck) {  }
#pragma warning restore CS0168 // The variable 'StringFuck' is declared but never used


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
            string BaseAKA = "";
            string TheNewPassword = "";
            string FirmMail = "";
            string FirmPhone = "";
            string FirmAdress = "";
            string FirmName = "";

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
                               if (ClientEmail == item["ClientEmail"] & ClientPassword == item["ClientPassword"] )
                               {
                                            BaseAKA = item["BaseAKA"];
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

                            catch (Exception error){ Console.WriteLine(error.ToString()); }

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

                                                            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; 
                                                    }

                                                    finally { }
                                
                                            return "Passordet ble oppdatert ! True=" + PutSQL.ToString();

                                        }



                                return ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel + "|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName + "|" + BaseAKA + "|" + FirmMail + "|" + FirmPhone + "|" + FirmAdress + "|" + FirmName;
                                                        
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

        // PUT: api/DoLogOn/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoLogOn/5
        public void Delete(int id)
        {
        }

        /*
        public bool Exist(string ClientEmail, string ClientPassword)
        {
            if (ClientEmail == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
               
               // string strSQL = "update " + BaseAKA + "_LogOn set ClientEmail = ClientEmail where ClientEmail = '" + ClientEmail + "' ";
               string strSQL = "update " + BaseAKA + "_LogOn set ClientEmail = ClientEmail where ClientEmail = '" + ClientEmail + "' and ClientPassword = '" + ClientPassword + "' and ClinetEnable = 'true'";

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
        */
        public bool ExistCSP(string ClientSessionPassword,string BaseAKA)
        {
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

        public bool DoLogOut(string ClientSessionPassword, string BaseAKA)
        {
            if (ClientSessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
                string strSQL = "update " + BaseAKA + "_LogOn set ClientSessionPassword = '', ClientOnline = '', ClinetEnd = getdate() where ClientSessionPassword = '" + ClientSessionPassword + "'";
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

        public string GetUserUrl(string CLientUrl, string BaseAKA)
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

        public string GetBaseAKA(string ClientName)
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

        public string GetUserLevel(string CLientLevel, string BaseAKA)
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

        public string GetUserName(string ClientEmail, string BaseAKA)
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

        public string GetUserTimeout(string CLientLevel, string BaseAKA)
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

        public string DoSendPassword(string Email, string BaseAKA)
        {
            try
            {
                var Password = System.Web.Security.Membership.GeneratePassword(8, 0);
                SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
                try
                {
                    string strSQL = "update " + BaseAKA + "_LogOn set ClientPassword = '"+ Password + "', ClinetEnd = getdate(), ClientChangePassword = 1 where ClientEmail = '" + Email + "'";
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

        public string GetChangePassword(string ClientEmail, string BaseAKA)
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


        public String DoGetUser(string ClientEmail,string ClientPassword)
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
            strSQL += "Select [ClientIP],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser],  'Dokumentasjon_Costumer________________________________________________________________________' as BaseAKA, 'Dokumentasjon_Costumer' AS [Service] into #TempResults from dbo.GunStock_Haavaldsen_LogOn where ClientEmail like '" + ClientEmail + @"2'  and ClientPassword like '" + ClientPassword + @"' ";
            strSQL += "";
            strSQL += "INSERT INTO            ";
            strSQL += "@tmpTablesToFindUser    ";
            strSQL += "";
            strSQL += "";
            strSQL += "SELECT          RowNumber = ROW_NUMBER() OVER (ORDER BY (SELECT (0)))  ,'insert into #TempResults Select  [ClientIP],[ClientLevel],[ClientOnline],[ClientTimeIdle],[ClientPing],[ClientChangePassword],[ClientLevelText],[ClientStart],[ClientLastSeen],[ClientUpdated],[ClinetEnd],[ClientPassword],[ClientSessionPassword],[ClientName],[ClientEmail],[ClientSessionID],[ClientTimeOutValue],[ClientUrl],[ClinetEnable],[ByUser], '''+(SELECT SUBSTRING(objects.name, 1, LEN(objects.name) - CHARINDEX('_', REVERSE(objects.name))))+''' as BaseAKA, '''+SUBSTRING(objects.name, 0, CHARINDEX('_', objects.name))+''' AS [Service] from '+schemas.name+'.'+objects.name+' where ClientEmail like ''" + ClientEmail + @"''  and ClientPassword like ''" + ClientPassword + @"''' AS Query    ";
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

        public String DoGetFirmSetting(String BaseAKA)
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

      
    }
}
