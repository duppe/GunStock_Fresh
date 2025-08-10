using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using System.Data.SqlClient;
using IdanikaSoftware;
using System.Data;
using System.Text;
using Hangfire;
using System.Security.Cryptography;
using Newtonsoft;
using System.Text.Json;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace GunStock_One.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoLogOnController : Controller
    {

        public int PutSQL = 0;
        private HttpContext httpContext;

        // POST api/<DoLogOn>
        [HttpPost]
        public string LogIn([FromBody] string Jsonstring)
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
            string OverLord = "";


            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(Jsonstring);

                ClientEmail = Json["ClientEmail"].Replace("'", "_");
                ClientPassword = Json["ClientPassword"].Replace("'", "_");
                NewPassword = Json["NewPassword"].Replace("'", "_");
                FirmName = Json["FirmName"].Replace("'", "_");



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
                dynamic Json2 = jss2.DeserializeObject(DoLogOn_.DoGetUser(FirmName, ClientEmail, ClientPassword).ToString());



                foreach (var item in Json2)
                {


                    try
                    {
                        if (ClientEmail == item["ClientEmail"] & ClientPassword == item["ClientPassword"])
                        {
                            BaseAKA = item["BaseAKA"];
                            FirmID = item["FirmID"].ToString();
                            strSQL = "update " + BaseAKA + "_LogOn set ClientIP = '" + this.HttpContext.Connection.RemoteIpAddress + "', ClientStart = getdate(), ClientPing = getdate(), ClientSessionID = '" + ClientSessionID + "', ClientSessionPassword = '" + ClientSessionPassword + "' where ClientEmail = '" + ClientEmail + "'";
                            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                            SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                            myCommand.Connection.Open();
                            PutSQL = myCommand.ExecuteNonQuery();
                            myConnection.Close();
                            //MakeNewCostumer("testerenT");

                            try
                            {
                                //BaseAKA = GetBaseAKA(CLientName);

                                CLientUrl = DoLogOn_.GetUserUrl(ClientEmail, BaseAKA);
                                ClientLevel = DoLogOn_.GetUserLevel(ClientEmail, BaseAKA);
                                ClientTimeOutValue = DoLogOn_.GetUserTimeout(ClientEmail, BaseAKA);
                                ClientChangePassword = DoLogOn_.GetChangePassword(ClientEmail, BaseAKA);
                                CLientName = DoLogOn_.GetUserName(ClientEmail, BaseAKA);
                                OverLord = DoLogOn_.GetOverLord(ClientEmail, BaseAKA);

                            }

                            catch { }

                            // *************      Get Firm Info (Firm is treated like a costumer, and are always ID 1 in DB)
                            try
                            {
                                string BaseAka = item["BaseAKA"];
                                JavaScriptSerializer jssFirm = new JavaScriptSerializer();
                                dynamic JFirm = jssFirm.DeserializeObject(DoLogOn_.DoGetFirmSetting(BaseAka).ToString());

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



                            return ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel + "|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName + "|" + BaseAKA + "|" + FirmMail + "|" + FirmPhone + "|" + FirmAdress + "|" + FirmName + "|" + FirmID + "|" + OverLord + "|";

                        }
                    }
                    catch (Exception tre) { return tre.ToString(); }
                }



                return "Error13";  //ClientSessionPassword + "|" + CLientUrl + "|" + ClientLevel +"|" + ClientTimeOutValue + "|" + ClientChangePassword + "|" + CLientName + "|" + BaseAKA;




            }

            catch (Exception StringFuck) { DuppeCommands.SendError("User IP : " + this.HttpContext.Connection.RemoteIpAddress + " --> " + StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }



#pragma warning disable CS0162 // Unreachable code detected
            return "Error13";
#pragma warning restore CS0162 // Unreachable code detected
            //return "{/"Error13/" , /"1/"}";



        }


        public IActionResult Index()
        {
            return View();
        }
    }
}
