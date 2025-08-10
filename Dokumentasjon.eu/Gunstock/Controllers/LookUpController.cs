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
    public class LookUpController : ApiController
    {
        
        // GET: api/LookUp
        public IEnumerable<string> Get()
        {
            yield return "Skriv '/' + Serienummer";
            //return new string[] { "value1", "value2" };
        }

        //public HttpResponseMessage Get([FromUri] string location) { return 1; }

        // GET: api/LookUp/5
        public void  Get(string id)
        {
            
        }

        // POST: api/LookUp
        public string Post([FromBody] string Jsonstring)
        {
             JavaScriptSerializer jss = new JavaScriptSerializer();           
            dynamic Json = jss.DeserializeObject(HttpUtility.UrlDecode(Jsonstring));

            string id = Json["Search"];
            string SessionPassword = Json["SessionPassword"];
            string BaseAKA = Json["BaseAKA"];

            String addOnSQL = "";
            try
            {
                // Is There optional SQl 
                addOnSQL = Json["addOnSQL"];
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch { }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used



            id = WebUtility.UrlDecode(id);
            var Vari = "";
            var Vari2 = "";

            try
            {
                if (id.Split('_')[2] != null) { Vari2 = id.Split('_')[2]; }

            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch { }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used

            try
            {

                if (id.Split('_')[1] != null) { Vari = id.Split('_')[1]; id = id.Split('_')[0]; } else { id = "0"; }// Eksempel 71_1

       
            }
#pragma warning disable CS0168 // The variable 'ex' is declared but never used
            catch (Exception ex) { }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used

            string STRsql = "";
            if (id == "0") // StoreList.js
            {


                STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID, ItemText FROM " + BaseAKA + "_Pistoler WHERE ((Serienummer like '" + Vari + "%') or (ID like '" + Vari + "%') or (Eier like '" + Vari + "%') or (Eier like '" + Vari + "%')) " + addOnSQL + " FOR JSON AUTO";
                //STRsql = "SELECT  (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, " + BaseAKA + "_Kunder.ID, Kunde_ID FROM " + BaseAKA + "_Pistoler inner join " + BaseAKA + "_Kunder on " + BaseAKA + "_Kunder.id = " + BaseAKA + "_Pistoler.Kunde_ID WHERE (Serienummer like '" + Vari + "%') or (" + BaseAKA + "_Kunder.ID like '" + Vari + "%') or (Eier like '" + Vari + "%') or (Telefon like '" + Vari + "%') FOR JSON AUTO";
            }

            else if (id == "01") // InsertWeapon.js
            {


                STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt,  Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID, ItemText FROM " + BaseAKA + "_Pistoler WHERE (Serienummer like '" + Vari.Replace("%","[%]") + "') FOR JSON AUTO";

            }

            else if (id == "02") // InsertWeapon.js Distinct By ID
            {


                STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID, ItemText FROM " + BaseAKA + "_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO";


            }

            else if (id == "71") // RAPPORT på Status
            { //STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, CONVERT(varchar, Dato, 23) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID FROM " + BaseAKA + "_Pistoler WHERE (Status = '" + Vari + "') FOR JSON AUTO"; 

                string GOTsql = "";
                string Periode = "";
                string Ar = "";

                try
                {
                    if (Vari.Split('|')[1] != null) { Ar = Vari.Split('|')[2]; Periode = Vari.Split('|')[1]; Vari = Vari.Split('|')[0]; } else { id = "0"; }// stringSyntax 22_and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

                    // make SQLstring
                    if (Periode == "1")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-01-01') AND (DateOppdatert < '" + Ar + "-03-31') ";
                    }
                    if (Periode == "2")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-04-01') AND (DateOppdatert < '" + Ar + "-06-30') ";
                    }
                    if (Periode == "3")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-07-01') AND (DateOppdatert < '" + Ar + "-10-01') ";
                    }
                    if (Periode == "4")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-10-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                    }
                    if (Periode == "5")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-01-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                    }
                    if (Periode == "6") //Hele Livet
                    {
                        GOTsql = "";
                    }

                }

#pragma warning disable CS0168 // The variable 'ex' is declared but never used
                catch (Exception ex) { }
#pragma warning restore CS0168 // The variable 'ex' is declared but never used

              
                    int SearchType = 0;
                    if (Vari != ""  ) {
                        SearchType = Convert.ToInt32(Vari); }
             

                if (SearchType < 1000) // Rapporter Single Status
                {

                    STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, Eier, ";
                    STRsql += "ISNULL(CONVERT(varchar, DateOppdatert, 23), '-' ) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, ISNULL(Caliber, '-' ) as Caliber , ISNULL(LopLengde, '-' ) as LopLengde , " + BaseAKA + "_Pistoler.ID, ";
                    STRsql += "ISNULL(" + BaseAKA + "_Kunder.Kundenavn, '-' ) as Kundenavn, " + BaseAKA + "_Kunder.id as Kunde_ID ";


                    STRsql += "FROM " + BaseAKA + "_Pistoler ";
                    STRsql += "full join " + BaseAKA + "_Kunder on " + BaseAKA + "_Kunder.ID = " + BaseAKA + "_Pistoler.Kunde_ID ";
                    STRsql += "WHERE(Status = '" + Vari + "') ";
                    STRsql += GOTsql;
                    STRsql += " order by Dato Desc FOR JSON PATH";
                }

                else if (SearchType > 1000) // Rapporter Multi Status
                {
                    // Make query of status type
                    if (SearchType == 1001) { Vari = "(Status = '3') " + GOTsql; }

                    //Innkjøpsrapport
                    else if (SearchType == 1002)
                    {
                        // make SQLstring
                        if (Periode == "1")
                        {
                            GOTsql = " (DateOppdatert >= '" + Ar + "-01-01') AND (DateOppdatert < '" + Ar + "-03-31') ";
                        }
                        if (Periode == "2")
                        {
                            GOTsql = " (DateOppdatert >= '" + Ar + "-04-01') AND (DateOppdatert < '" + Ar + "-06-30') ";
                        }
                        if (Periode == "3")
                        {
                            GOTsql = " (DateOppdatert >= '" + Ar + "-07-01') AND (DateOppdatert < '" + Ar + "-10-01') ";
                        }
                        if (Periode == "4")
                        {
                            GOTsql = " (DateOppdatert >= '" + Ar + "-10-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                        }
                        if (Periode == "5")
                        {
                            GOTsql = " (DateOppdatert >= '" + Ar + "-01-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                        }
                        if (Periode == "6") //Hele Livet
                        {
                            GOTsql = "";
                        }

                        Vari = GOTsql;
                    }

                    //VareBeholdning 
                    else if (SearchType == 1003)
                    {

                        // make SQLstring
                        if (Periode == "1")
                        {
                            GOTsql = "and (DateOppdatert >= '1980-01-01') AND (DateOppdatert < '" + Ar + "-03-31') ";
                        }
                        if (Periode == "2")
                        {
                            GOTsql = "and (DateOppdatert >= '1980-01-01') AND (DateOppdatert < '" + Ar + "-06-30') ";
                        }
                        if (Periode == "3")
                        {
                            GOTsql = "and (DateOppdatert >= '1980-01-01') AND (DateOppdatert < '" + Ar + "-10-01') ";
                        }
                        if (Periode == "4")
                        {
                            GOTsql = "and (DateOppdatert >= '1980-01-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                        }
                        if (Periode == "5")
                        {
                            GOTsql = "and (DateOppdatert >= '1980-01-01') AND (DateOppdatert <= '" + Ar + "-12-31') ";
                        }
                        if (Periode == "6") //Hele Livet
                        {
                            GOTsql = "";
                        }



                        Vari = "(Status = '7') or (Status = '5') or (Status = '2') or (Status = '1') " + GOTsql;


                    }


                    STRsql = "SELECT (select text from " + BaseAKA + "_Status where Status = " + BaseAKA + "_Pistoler.Status) as Status, Eier, ";
                    STRsql += "ISNULL(CONVERT(varchar, DateOppdatert, 23), '-' ) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, ISNULL(Caliber, '-' ) as Caliber , ISNULL(LopLengde, '-' ) as LopLengde , " + BaseAKA + "_Pistoler.ID, ";
                    STRsql += "ISNULL(" + BaseAKA + "_Kunder.Kundenavn, '-' ) as Kundenavn, " + BaseAKA + "_Kunder.id as Kunde_ID ";


                    STRsql += "FROM " + BaseAKA + "_Pistoler ";
                    STRsql += "full join " + BaseAKA + "_Kunder on " + BaseAKA + "_Kunder.ID = " + BaseAKA + "_Pistoler.Kunde_ID where ";
                    STRsql += Vari;
                    // STRsql += GOTsql;
                    STRsql += " order by Dato Desc FOR JSON PATH";
                }



            }

            else if (id == "72") // Vari = Serial
            {
                //STRsql = "SELECT       " + BaseAKA + "_Pistoler.DatoOprettet as Dato, " + BaseAKA + "_Pistoler.Leverandor, " + BaseAKA + "_Pistoler.Serienummer, " + BaseAKA + "_Pistoler.Mekanisme, " + BaseAKA + "_Pistoler.Merke, " + BaseAKA + "_Pistoler.Modell, " + BaseAKA + "_Pistoler.Caliber, " + BaseAKA + "_Pistoler.LopLengde, " + BaseAKA + "_Pistoler.ID ,(select " + BaseAKA + "_Kunder.Kundenavn  from " + BaseAKA + "_Kunder  inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.ID WHERE (Serienummer like '" + id + "%')) as Kundenavn FROM " + BaseAKA + "_Pistoler WHERE (Serienummer like '" + id + "%') FOR JSON AUTO";

                STRsql = "SELECT Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM " + BaseAKA + "_Pistoler WHERE (ID = " + Vari + ") FOR JSON AUTO";

                /*
                STRsql = "IF EXISTS";
                STRsql += "(";
                STRsql += "SELECT " + BaseAKA + "_Pistoler. Dato, " + BaseAKA + "_Pistoler.Leverandor, " + BaseAKA + "_Pistoler.Serienummer, ";
                STRsql += "" + BaseAKA + "_Pistoler.Mekanisme, " + BaseAKA + "_Pistoler.Merke, " + BaseAKA + "_Pistoler.Modell, " + BaseAKA + "_Pistoler.Caliber, ";
                STRsql += "" + BaseAKA + "_Pistoler.LopLengde, " + BaseAKA + "_Pistoler.ID , ";
                STRsql += "";
                STRsql += "(select " + BaseAKA + "_Kunder.Kundenavn  from " + BaseAKA + "_Kunder  inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.ID ";
                STRsql += "WHERE (ID like '" + Vari + "')) as Kundenavn ";
                STRsql += "";
                STRsql += "FROM " + BaseAKA + "_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO ";
                STRsql += ") ";
                STRsql += "";
                STRsql += "SELECT        Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM " + BaseAKA + "_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO ";
                STRsql += "";
                STRsql += "else ";
                STRsql += "";
                STRsql += "SELECT " + BaseAKA + "_Pistoler. Dato, " + BaseAKA + "_Pistoler.Leverandor, " + BaseAKA + "_Pistoler.Serienummer, ";
                STRsql += "" + BaseAKA + "_Pistoler.Mekanisme, " + BaseAKA + "_Pistoler.Merke, " + BaseAKA + "_Pistoler.Modell, " + BaseAKA + "_Pistoler.Caliber, ";
                STRsql += "" + BaseAKA + "_Pistoler.LopLengde, " + BaseAKA + "_Pistoler.ID ,";
                STRsql += "";
                STRsql += "(select " + BaseAKA + "_Kunder.Kundenavn  from " + BaseAKA + "_Kunder  inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.ID ";
                STRsql += "WHERE (ID like '" + Vari + "')) as Kundenavn ";
                STRsql += "";
                STRsql += "FROM " + BaseAKA + "_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO";
                */

            }

            else if (id == "9")
            {
                STRsql = "(SELECT Status, Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, " + BaseAKA + "_Pistoler.ID as PistolID, Kunde_ID, 'test' as T, " + BaseAKA + "_Kunder.Kundenavn as Kundenavn, " + BaseAKA + "_Kunder.Adresse as Adresse, " + BaseAKA + "_Kunder.Poststed as Poststed, " + BaseAKA + "_Kunder.Telefon as Telefon FROM " + BaseAKA + "_Pistoler inner join " + BaseAKA + "_Kunder on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.id WHERE(" + BaseAKA + "_Pistoler.ID = " + Vari + "))  FOR JSON PATH";

            }

           
            else
            {
                STRsql = "IF EXISTS";
                STRsql += " (SELECT " + BaseAKA + "_Pistoler.Status, " + BaseAKA + "_Pistoler.Dato, " + BaseAKA + "_Pistoler.Leverandor, " + BaseAKA + "_Pistoler.Serienummer, " + BaseAKA + "_Pistoler.Mekanisme, " + BaseAKA + "_Pistoler.Merke, ";
                STRsql += "" + BaseAKA + "_Pistoler.Modell, " + BaseAKA + "_Pistoler.Caliber, " + BaseAKA + "_Pistoler.LopLengde, " + BaseAKA + "_Pistoler.ID , (select " + BaseAKA + "_Kunder.Kundenavn from " + BaseAKA + "_Kunder ";
                STRsql += "inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.ID WHERE(Serienummer like '" + id + "')) as Kundenavn FROM " + BaseAKA + "_Pistoler WHERE(Serienummer like '" + id + "') ) ";


                STRsql += "(SELECT Status, Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, " + BaseAKA + "_Pistoler.ID as PistolID, Kunde_ID, 'test' as T, ";
                STRsql += "" + BaseAKA + "_Kunder.Kundenavn as Kundenavn, " + BaseAKA + "_Kunder.Adresse as Adresse, " + BaseAKA + "_Kunder.Poststed as Poststed, " + BaseAKA + "_Kunder.Telefon as Telefon ";
                STRsql += "FROM " + BaseAKA + "_Pistoler ";
                STRsql += "inner join " + BaseAKA + "_Kunder on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.id ";
                STRsql += "WHERE(Serienummer like '" + id + "')) FOR JSON PATH ";
                STRsql += "else ";
                STRsql += "";
                STRsql += "SELECT " + BaseAKA + "_Pistoler.Status, " + BaseAKA + "_Pistoler. Dato, " + BaseAKA + "_Pistoler.Leverandor, " + BaseAKA + "_Pistoler.Serienummer, ";
                STRsql += "" + BaseAKA + "_Pistoler.Mekanisme, " + BaseAKA + "_Pistoler.Merke, " + BaseAKA + "_Pistoler.Modell, " + BaseAKA + "_Pistoler.Caliber, " + BaseAKA + "_Pistoler.LopLengde, " + BaseAKA + "_Pistoler.ID , ";
                STRsql += "(select " + BaseAKA + "_Kunder.Kundenavn from " + BaseAKA + "_Kunder ";
                STRsql += "inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_Pistoler.Kunde_ID = " + BaseAKA + "_Kunder.id ";
                STRsql += "";
                STRsql += "WHERE(Serienummer like '" + id + "')) as Kundenavn FROM " + BaseAKA + "_Pistoler WHERE(Serienummer like '" + id + "') FOR JSON PATH ";


            }



            SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
            ////DataTable dt = new DataTable();
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

        // PUT: api/LookUp/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/LookUp/5
        public void Delete(int id)
        {
        }
    }
}
