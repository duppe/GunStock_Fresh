using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Http.Cors;
using IdanikaSoftware;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class DoMailController : ApiController
    {
        // GET: api/DoMail
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoMail/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/DoMail
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/DoMail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoMail/5
        public void Delete(int id)
        {
        }

        public static string SendMail(string Email, string To, string Subject, string Body)
        {
            using (MailMessage mm = new MailMessage(Email, To))
            {

                SmtpClient client = new SmtpClient();
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.EnableSsl = true;
                client.Host = "smtp.unoeuro.com";
                client.Port = 587;
                // setup Smtp authentication
                System.Net.NetworkCredential credentials =
                    new System.Net.NetworkCredential("gunstock.one@dokumentasjon.eu", "AG48Zxv7YJU42Qm");
                client.UseDefaultCredentials = false;
                client.Credentials = credentials;
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

            }
        }


    }
}
