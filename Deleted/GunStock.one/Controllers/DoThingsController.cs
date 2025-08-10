using IdanikaSoftware;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Script.Serialization;

namespace GunStock.one.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoThingsController : ApiController
    {
        public int PutSQL = 0;

        // GET: api/DoThings
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoThings/5
        public string Get(string jsonstring)
        {
            string strSQL = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(jsonstring);

                if (Json["case"] == "FeedBack") 
                {
                    var FeedBack = Json["ByUser"] + ": <br /><br />" + Json["Text"];
                    // Jsons Text
                    SendFeedBack(Json["Text"], Json["ByUser"]);
                    return DuppeCommands.SendMail("GunStock.one", "haavald@haavaldsen.eu", FeedBack, "Kommentar fra GunStock.one siden");
                    
                    //return "Feedback ble sendt";
                }

                

                else if (Json["case"] == "SendError")
                {
                    var FeedBack = Json["Error"];
                    var Text = Json["Text"];
                    try
                    {
                     DuppeCommands.SendError(FeedBack, Text);
                        DuppeCommands.SendMail("haavald@haavaldsen.eu", "Haavald@haavaldsen.eu", FeedBack, Text);

                        return "Sendt";
                    }

                    catch (Exception ex) { return ex.ToString(); }
                   
                    
                   

                    //return "Feedback ble sendt";
                }


                else if (Json["case"] == "SendMail")
                {
                    var Body = Json["Body"];
                    var Subject = Json["Subject"];
                    try
                    {
                        //DuppeCommands.SendError(FeedBack, Text);
                        DuppeCommands.SendMail("GunStock.one", "Haavald@haavaldsen.eu", Body, Subject);

                        return "Sendt";
                    }

                    catch (Exception ex) { return ex.ToString(); }


                    //return "Feedback ble sendt";
                }

                else if (Json["case"] == "UserActivity")
                {
                    var Type = Json["Type"];
                    var ClientSessionPassword = Json["ClientSessionPassword"];

                    SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

                    try
                    {
                        strSQL = "update Skitt_LogOn set ClientTimeIdle = 0, ClientPing = GETDATE() where ClientSessionPassword = '" + ClientSessionPassword + "'";
                       
                        //strSQL = "update Skitt_LogOn set ClientTimeIdle = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientPing), ClientPing = GETDATE()  where ClientSessionPassword = '" + ClientSessionPassword + "'";

                        //, ClientOnline = DATEDIFF(SECOND, '19000101', ClientLastSeen - ClientStart) 
                        SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                        myCommand.Connection.Open();
                        PutSQL = myCommand.ExecuteNonQuery();
                        myCommand.Dispose();

                    }
                    catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(), "SQL"); }

                    finally
                    {
                        myConnection.Close();

                    }





                    //return "Feedback ble sendt";
                }

            }

            catch (Exception ex) { return ex.ToString(); }

            return "Skjedde Ittno";
        }

        // POST: api/DoThings
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/DoThings/5
        public void Put(int id, [FromBody]string value)
        {
            
        }

        // DELETE: api/DoThings/5
        public void Delete(int id)
        {
        }

        public static void SendFeedBack(string FeedBackText, string ShowText)
        {
            FeedBackText = FeedBackText.Replace(@"\", "");
            FeedBackText = FeedBackText.Replace(@"(", "");
            FeedBackText = FeedBackText.Replace(@")", "");
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);

            try
            {
                SqlCommand myCommand = new SqlCommand("INSERT INTO [Skitt_FeedBack] (FromSite, FeedBackText, ShowText, ByUser) VALUES ('GunStock','" + FeedBackText.ToString() + "','" + ShowText + "','" + ShowText + "')", myConnection);

                myCommand.Connection.Open();
                int i = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck)
            {
               
            }


        }

    }
}
