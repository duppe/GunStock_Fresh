using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Http;

namespace IdanikaSoftware
{
    public static class DuppeCommands
    {
        public static void SendError(string Error)
        {

            Error = Error.Replace(@"\", "");
            Error = Error.Replace(@"(", "");
            Error = Error.Replace(@")", "");
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
        }

        public static void SendError(string Error, string ShowText)
        {
            Error = Error.Replace(@"\", "");
            Error = Error.Replace(@"(", "");
            Error = Error.Replace(@")", "");
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


        }

        public static bool CheckUser(string SessionPassword)
        {
            int PutSQL = 0;
            if (SessionPassword == "") { return false; }
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {

                string strSQL = "update Skitt_LogOn set ClientSessionPassword = ClientSessionPassword where ClientSessionPassword = '" + SessionPassword + "'";
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
            MailAddress fromAddress = new MailAddress("haavald@gmail.com", "GunStock");
            MailAddress toAddress = new MailAddress(To, "Et Menneske");
            const string fromPassword = "2BensJesus";
            //const string subject = "Subject";
            //const string body = "Body";
            // SMTP Configuration
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com"; //"smtp.unoeuro.com";
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
        //public static string ConnString = "user id=Dokumentasjon_eu;password=Runa1983;server=SQLA;Trusted_Connection=no;database=dokumentasjon_eu_db;connection timeout=30;";

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
}

namespace GunStock.one
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors();
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
