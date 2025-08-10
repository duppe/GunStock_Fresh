using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using System.Web.Script.Serialization;
using IdanikaSoftware;
using System.Web.Http.Cors;
using System.Web;

namespace GunStock.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]

    public class Item
    {
        public string date { get; set; }
        public string Serienummer { get; set; }
        public string Leverandor { get; set; }
        public string Mekanisme { get; set; }
        public string Merke { get; set; }
        public string Modell { get; set; }
        public string LøpLengde { get; set; }
        public string Caliber { get; set; }
        //public int Id { get; set; }
       // public string Command { get; set; }
       // public bool Processed { get; set; }
       // public List<double> Position { get; set; }
    }

    public class AllItems
    {
        public List<Item> Items { get; set; }
        public bool HasMoreResults { get; set; }
    }

    public class DoInsertSQLController : ApiController
    {
        public int PutSQL = 0;

        // GET: api/DoInsertSQL
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
            
            
        }

        // GET: api/DoInsertSQL/5
        public string Get(int id)
        {
            try
            {
                var test = "";

                test += DuppeCommands.SendMail("Idanika@serversiden.no", "haavald@haavaldsen.eu", "Det er Oppdatert/Lagt inn et vapen, men det var bare en mail test ... Ha Ha Haavald", "Det Har skjedd noe");
                test += DuppeCommands.SendMail("Idanika@serversiden.no", "halvard@undseth.eu", "Det er Oppdatert/Lagt inn et vapen, men det var bare en mail test ... Ha Ha Haavald", "Det Har skjedd noe");


                return " Sent OK :-)" + test;
                   
            }
            catch {
                return "Feil";
            }
            //return "Mail Sendt";
        }

        // POST: api/DoInsertSQL
        public string Post([FromBody]string jsonstring)
        {
            string strSQL = "";

            try
            {

                JavaScriptSerializer jss = new JavaScriptSerializer();
                dynamic Json = jss.DeserializeObject(HttpUtility.UrlDecode(jsonstring));
                string BaseAKA = Json["BaseAKA"];


                if (Json["Switch"] == "1")
                {
                    string Serie = Json["Serienummer"].ToString().Replace("&amp;","&");
                
                    if (Serie.IndexOf(',') != -1)
                    {
                      

                        string[] S = Serie.Split(',');
                        string TempS = "";

                        for (var X = 0; X < S.Count(); X++)
                        {
                            if (S[X].ToString() == "") { break; }

                            TempS = S[X].ToString().Replace("'", "_");
                            TempS = TempS.Replace("\r\n", "").Replace("\n", "").Replace("\r", "");
                            TempS = TempS.Replace(System.Environment.NewLine, "");

                            strSQL += "insert into " + BaseAKA + "_Pistoler (Status, Dato, Bestilt, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ByUser, ItemText, Varenummer, LagerLokasjon) values";
                            strSQL += " (";
                            strSQL += "'" + Json["Status"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["date"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["Bestilt"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["Leverandor"].Replace("'", "_") + "', ";
                            strSQL += "'" + TempS.Replace("&amp;", "&") + "', ";
                            strSQL += "'" + Json["Mekanisme"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["Merke"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["Modell"].Replace("'", "") + "', ";
                            strSQL += "'" + Json["Caliber"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["LøpLengde"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["ByUser"].Replace("'", "_") + "', ";
                            strSQL += "'" + Json["ItemText"].Replace("'", "_") + "'";
                            strSQL += "'" + Json["Varenummer"].Replace("'", "_") + "'";
                            strSQL += ")                             ";
                        }
                    }
                    else

                    {
                        strSQL = "insert into " + BaseAKA + "_Pistoler (Status, Dato, DatoOprettet, DateOppdatert, Bestilt, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ByUser, ItemText, Varenummer, LagerLokasjon) values";
                        strSQL += " (";
                        strSQL += "'" + Json["Status"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["date"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["DateOppdatert"].Replace("'", "_") + "', "; // fff
                        strSQL += "'" + Json["DateOppdatert"].Replace("'", "_") + "', "; // fff
                        strSQL += "'" + Json["Bestilt"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["Leverandor"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["Serienummer"].Replace("'", "_").Replace("&amp;", "&") + "', ";
                        strSQL += "'" + Json["Mekanisme"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["Merke"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["Modell"].Replace("'", "") + "', ";
                        strSQL += "'" + Json["Caliber"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["LøpLengde"].Replace("'", "_") + "', ";
                        strSQL += "'" + Json["ByUser"].Replace("'", "_") + "' ,";
                        strSQL += "'" + Json["ItemText"].Replace("'", "_") + "' ,";
                        strSQL += "'" + Json["Varenummer"].Replace("'", "_") + "' ,";
                        strSQL += "'" + Json["LagerLokasjon"].Replace("'", "_") + "'";
                        strSQL += ")";
                    }
                }

                else if (Json["Switch"] == "2")
                {
                    var ST = Json["Status"].ToString();
                    strSQL = "update " + BaseAKA + "_Pistoler ";
                    //strSQL += " set Status = '" + Json["Status"].Replace("'", "_") + "',";
                    strSQL += " set Dato = '" + Json["date"].Replace("'", "_") + "',";
                    strSQL += " DatoOprettet = '" + Json["Bestilt"].Replace("'", "_") + "',";
                    strSQL += " DateOppdatert = '" + Json["DateOppdatert"].Replace("'", "_") + "',";
                    strSQL += " Bestilt = '" + Json["Bestilt"].Replace("'", "_") + "',";
                    strSQL += " Leverandor = '" + Json["Leverandor"].Replace("'", "_") + "',";
                    strSQL += " Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "',";
                    strSQL += " Merke = '" + Json["Merke"].Replace("'", "_") + "',";
                    strSQL += " Modell = '" + Json["Modell"].Replace("'", "_") + "',";
                    strSQL += " Caliber = '" + Json["Caliber"].Replace("'", "_") + "',";
                    strSQL += " LopLengde = '" + Json["LøpLengde"].Replace("'", "_") + "', ";
                    strSQL += " ItemText = '" + Json["ItemText"].Replace("'", "_") + "', ";
                    strSQL += " Varenummer = '" + Json["Varenummer"].Replace("'", "_") + "', ";
                    strSQL += " LagerLokasjon = '" + Json["LagerLokasjon"].Replace("'", "_") + "', ";
                    
                    strSQL += " ByUser = '" + Json["ByUser"].Replace("'", "_") + "', ";

                    /*
                    // Check if Status = 2 3 4
                    if (!(ST == "2" || ST == "3" || ST == "4"))
                    {
                        strSQL += " Kunde_ID = NULL, ";
                        strSQL += " Eier = NULL, ";
                    }
                    */

                    strSQL += " Status = '" + Json["Status"].Replace("'", "_") + "' ";
                    strSQL += "where ID = " + Json["ID"].Replace("'", "_") ;
                    //strSQL += "where Serienummer = '" + Json["Serienummer"].Replace("'", "_") + "' and Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "'";
                }

                else if (Json["Switch"] == "3")
                {
                    string Serie = Json["Serienummer"].Replace("'", "_").Replace("§", ".").Replace("£","+");
                    //strSQL = "select dbo." + BaseAKA + "_Pistoler.Serienummer from dbo." + BaseAKA + "_Pistoler where (dbo." + BaseAKA + "_Pistoler.Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "') and (dbo." + BaseAKA + "_Pistoler.Serienummer = '" + Json["Serienummer"].Replace("'", "_") + "')";
                    strSQL = "update dbo." + BaseAKA + "_Pistoler set dbo." + BaseAKA + "_Pistoler.Serienummer = dbo." + BaseAKA + "_Pistoler.Serienummer where (dbo." + BaseAKA + "_Pistoler.Mekanisme = '" + Json["Mekanisme"].Replace("'", "_") + "') and (dbo." + BaseAKA + "_Pistoler.Serienummer = '" + Serie + "')";
                }

            }
            catch(Exception StringFuck) {DuppeCommands.SendError(StringFuck.ToString()); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }
            
            SqlConnection myConnection = new SqlConnection(DuppeGlobals.ConnString);
            try
            {
               SqlCommand myCommand = new SqlCommand(strSQL, myConnection);

                myCommand.Connection.Open();
                PutSQL = myCommand.ExecuteNonQuery();
                myConnection.Close();
            }
            catch (Exception StringFuck) { DuppeCommands.SendError(StringFuck.ToString(),"SQL"); return "Det skjedde noe feil./r/nVi har registrert den og vil rette den :-)"; }

            finally
            { }
           
            return PutSQL.ToString();
        }

       

        // PUT: api/DoInsertSQL/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoInsertSQL/5
        public void Delete(int id)
        {
        }

    }

  
}
