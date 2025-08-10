using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Http.Cors;
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
        public string Get(string id)
        {
            id = WebUtility.UrlDecode(id);
            var Vari = "";
            var Vari2 = "";

            try
            {
                if (id.Split('_')[2] != null) { Vari2 = id.Split('_')[2].Replace("?", "@"); }
               
            }
            catch (Exception ex) { }

            try
            {
               
                if (id.Split('_')[1] != null) { Vari = id.Split('_')[1]; id = id.Split('_')[0]; } else { id = "0"; }// Eksempel 71_1
                
                // Konverter spesialtegn tilbake
                Vari = Vari.Replace('¤', '%');
                Vari = Vari.Replace('|', '/');
                Vari = Vari.Replace('§', '.');
                Vari = Vari.Replace('£', '+');
            }
            catch (Exception ex) { }

            string STRsql = "";
            if (id == "0") // StoreList.js
            {


                 STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM Skitt_Pistoler WHERE (Serienummer like '" + Vari + "%') or (ID like '" + Vari + "%') or (Eier like '" + Vari + "%') or (Eier like '" + Vari + "%') FOR JSON AUTO";
                //STRsql = "SELECT  (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, Skitt_Kunder.ID, Kunde_ID FROM Skitt_Pistoler inner join Skitt_Kunder on Skitt_Kunder.id = Skitt_Pistoler.Kunde_ID WHERE (Serienummer like '" + Vari + "%') or (Skitt_Kunder.ID like '" + Vari + "%') or (Eier like '" + Vari + "%') or (Telefon like '" + Vari + "%') FOR JSON AUTO";
            }

            else if (id == "01") // InsertWeapon.js
            {


                STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt,  Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM Skitt_Pistoler WHERE (Serienummer like '" + Vari + "') FOR JSON AUTO";

            }

            else if (id == "02") // InsertWeapon.js Distinct By ID
            {


                STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, CONVERT(varchar, DateOppdatert, 23) as DateOppdatert, CONVERT(varchar, Dato, 23) as Dato, CONVERT(varchar, Bestilt, 23) as Bestilt, Eier, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM Skitt_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO";


            }

            else if (id == "71") // RAPPORT på Status
            { //STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, CONVERT(varchar, Dato, 23) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID FROM Skitt_Pistoler WHERE (Status = '" + Vari + "') FOR JSON AUTO"; 

                string GOTsql = "";
                string Periode = "";
                string Ar = "";

                try
                {
                    if (Vari.Split('/')[1] != null) { Ar = Vari.Split('/')[2]; Periode = Vari.Split('/')[1]; Vari = Vari.Split('/')[0]; } else { id = "0"; }// stringSyntax 22_and (Dato < '2019-04-27') AND (Dato > '2017-04-27')

                    // make SQLstring
                    if (Periode =="1")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-01-01') AND (DateOppdatert < '" + Ar + "-03-31') ";
                    }
                    if (Periode == "2")
                    {
                        GOTsql = "and (DateOppdatert >= '" + Ar + "-04-01') AND (DateOppdatert < '" + Ar + "-07-01') ";
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

                catch (Exception ex) { }

                int SearchType = Convert.ToInt32(Vari);

                if (SearchType < 1000) // Rapporter Single Status
                {

                    STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, Eier, ";
                    STRsql += "ISNULL(CONVERT(varchar, DateOppdatert, 23), '-' ) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, ISNULL(Caliber, '-' ) as Caliber , ISNULL(LopLengde, '-' ) as LopLengde , Skitt_Pistoler.ID, ";
                    STRsql += "ISNULL(Skitt_Kunder.Kundenavn, '-' ) as Kundenavn, Skitt_Kunder.id as Kunde_ID ";


                    STRsql += "FROM Skitt_Pistoler ";
                    STRsql += "full join Skitt_Kunder on Skitt_Kunder.ID = Skitt_Pistoler.Kunde_ID ";
                    STRsql += "WHERE(Status = '" + Vari + "') ";
                    STRsql += GOTsql;
                    STRsql += " order by Dato Desc FOR JSON PATH";
                }

                else if (SearchType > 1000) // Rapporter Multi Status
                {
                    // Make query of status type
                    if (SearchType == 1001) { Vari = "(Status = '3') " + GOTsql; }

                    //Innkjøpsrapport
                    else if (SearchType == 1002) {
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
                    else if (SearchType == 1003) {

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


                    STRsql = "SELECT (select text from Skitt_Status where Status = Skitt_Pistoler.Status) as Status, Eier, ";
                    STRsql += "ISNULL(CONVERT(varchar, DateOppdatert, 23), '-' ) as Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, ISNULL(Caliber, '-' ) as Caliber , ISNULL(LopLengde, '-' ) as LopLengde , Skitt_Pistoler.ID, ";
                    STRsql += "ISNULL(Skitt_Kunder.Kundenavn, '-' ) as Kundenavn, Skitt_Kunder.id as Kunde_ID ";


                    STRsql += "FROM Skitt_Pistoler ";
                    STRsql += "full join Skitt_Kunder on Skitt_Kunder.ID = Skitt_Pistoler.Kunde_ID where ";
                    STRsql += Vari;
                    // STRsql += GOTsql;
                    STRsql += " order by Dato Desc FOR JSON PATH";
                }



            }

            else if (id == "72") // Vari = Serial
            {
                //STRsql = "SELECT       Skitt_Pistoler.DatoOprettet as Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID ,(select Skitt_Kunder.Kundenavn  from Skitt_Kunder  inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.ID WHERE (Serienummer like '" + id + "%')) as Kundenavn FROM Skitt_Pistoler WHERE (Serienummer like '" + id + "%') FOR JSON AUTO";

                STRsql = "SELECT Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM Skitt_Pistoler WHERE (ID = " + Vari + ") FOR JSON AUTO";

                /*
                STRsql = "IF EXISTS";
                STRsql += "(";
                STRsql += "SELECT Skitt_Pistoler. Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, ";
                STRsql += "Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, ";
                STRsql += "Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID , ";
                STRsql += "";
                STRsql += "(select Skitt_Kunder.Kundenavn  from Skitt_Kunder  inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.ID ";
                STRsql += "WHERE (ID like '" + Vari + "')) as Kundenavn ";
                STRsql += "";
                STRsql += "FROM Skitt_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO ";
                STRsql += ") ";
                STRsql += "";
                STRsql += "SELECT        Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, ID, Kunde_ID FROM Skitt_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO ";
                STRsql += "";
                STRsql += "else ";
                STRsql += "";
                STRsql += "SELECT Skitt_Pistoler. Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, ";
                STRsql += "Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, ";
                STRsql += "Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID ,";
                STRsql += "";
                STRsql += "(select Skitt_Kunder.Kundenavn  from Skitt_Kunder  inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.ID ";
                STRsql += "WHERE (ID like '" + Vari + "')) as Kundenavn ";
                STRsql += "";
                STRsql += "FROM Skitt_Pistoler WHERE (ID like '" + Vari + "') FOR JSON AUTO";
                */

            }

            else if (id == "9")
            {
                STRsql = "(SELECT Status, Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, Skitt_Pistoler.ID as PistolID, Kunde_ID, 'test' as T, Skitt_Kunder.Kundenavn as Kundenavn, Skitt_Kunder.Adresse as Adresse, Skitt_Kunder.Poststed as Poststed, Skitt_Kunder.Telefon as Telefon FROM Skitt_Pistoler inner join Skitt_Kunder on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.id WHERE(Skitt_Pistoler.ID = " + Vari + "))  FOR JSON PATH";

            }

            
            

            else
            {
                STRsql = "IF EXISTS";
                STRsql += " (SELECT Skitt_Pistoler.Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, ";
                STRsql += "Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID , (select Skitt_Kunder.Kundenavn from Skitt_Kunder ";
                STRsql += "inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.ID WHERE(Serienummer like '" + id + "')) as Kundenavn FROM Skitt_Pistoler WHERE(Serienummer like '" + id + "') ) ";


                STRsql += "(SELECT Dato, Leverandor, Serienummer, Mekanisme, Merke, Modell, Caliber, LopLengde, Skitt_Pistoler.ID as PistolID, Kunde_ID, 'test' as T, ";
                STRsql += "Skitt_Kunder.Kundenavn as Kundenavn, Skitt_Kunder.Adresse as Adresse, Skitt_Kunder.Poststed as Poststed, Skitt_Kunder.Telefon as Telefon ";
                STRsql += "FROM Skitt_Pistoler ";
                STRsql += "inner join Skitt_Kunder on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.id ";
                STRsql += "WHERE(Serienummer like '" + id + "')) FOR JSON PATH ";
                STRsql += "else ";
                STRsql += "";
                STRsql += "SELECT Skitt_Pistoler. Dato, Skitt_Pistoler.Leverandor, Skitt_Pistoler.Serienummer, ";
                STRsql += "Skitt_Pistoler.Mekanisme, Skitt_Pistoler.Merke, Skitt_Pistoler.Modell, Skitt_Pistoler.Caliber, Skitt_Pistoler.LopLengde, Skitt_Pistoler.ID , ";
                STRsql += "(select Skitt_Kunder.Kundenavn from Skitt_Kunder ";
                STRsql += "inner join Skitt_Pistoler on Skitt_Pistoler.Kunde_ID = Skitt_Kunder.id ";
                STRsql += "";
                STRsql += "WHERE(Serienummer like '" + id + "')) as Kundenavn FROM Skitt_Pistoler WHERE(Serienummer like '" + id + "') FOR JSON PATH ";


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

        // POST: api/LookUp
        public void Post([FromBody]string value)
        {


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
