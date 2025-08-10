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
    public class DoFillController : ApiController
    {
       
        // GET: api/DoFill
        public IEnumerable<string> Get()
        {
            //yield return "Inget Valg";
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoFill/5
        public string Get(int id, string Vari, string SessionPassword, string BaseAKA )
        {
            try
            {
                if (Vari != null)
                {
                    Vari = HttpUtility.UrlDecode(Vari.Replace("|", "&"));
                }
                    // Vari = HttpUtility.HtmlDecode(Vari);
                // if (!IdanikaSoftware.DuppeCommands.CheckUser(SessionPassword)) { return "No Session"; }
            }
            catch { }


            string STRsql = "";
            if (id == 0)
            { /*STRsql = "SELECT Text, id FROM " + BaseAKA + "_ConstantText WHERE (ConstantID = 1) FOR JSON PATH ,WITHOUT_ARRAY_WRAPPER;"; */}
            else if (id == 1)
            { STRsql = "SELECT [Leverandor] as Text, id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Leverandor] order by [Leverandor] ASC FOR JSON PATH ;"; }
            else if (id == 2)
            { STRsql = "SELECT [Mekanisme] as Text, id  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Mekanisme] order by [Mekanisme] ASC FOR JSON AUTO"; }
            else if (id == 21)
            { STRsql = "SELECT [Mekanisme] as Text, id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Mekanisme] where [Mekanisme] = '" + Vari + "' order by [Mekanisme] DESC FOR JSON AUTO"; }
            else if (id == 3)
            { STRsql = "SELECT DISTINCT [Merke] as Text, [Merke] as id  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell] order by [Merke] ASC FOR JSON AUTO"; }
            else if (id == 31)  // Get Status
            { STRsql = "SELECT DISTINCT [Text] as Text, [Status] as id  FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Status] where [Status]<10 order by [Text] ASC FOR JSON AUTO"; }
           
            
            else if (id == 4)
            { STRsql = "SELECT [Modell] as Text, id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell] order by [Modell] ASC FOR JSON AUTO"; }
            else if (id == 41)
            { STRsql = "SELECT [Modell] as Text, id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell] where [Merke] = '" + Vari + "' order by [Modell] ASC FOR JSON AUTO"; }
            else if (id == 42)
            { STRsql = "DROP TABLE IF EXISTS LevID SELECT * into LevID from (select distinct [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke_Id as id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell]) as Elliot Select distinct [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke as Text, LevID.id from LevID inner join [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell] on LevID.id = [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke_Id FOR JSON PATH  drop table LevID "; }
            else if (id == 43)
            { if (Vari == "undefined") { Vari = "(LevID.id = 6)"; }; STRsql = "DROP TABLE IF EXISTS LevID SELECT * into LevID from (select distinct [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke_Id as id FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell]) as Elliot Select distinct [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke as Text, LevID.id from LevID inner join [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell] on LevID.id = [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_MerkeModell].Merke_Id where " + Vari + " FOR JSON PATH drop table LevID "; }

            else if (id == 14)
            { STRsql = "WITH RankedData AS (SELECT [LagerLokasjon] AS Text, id, [Modell], ROW_NUMBER() OVER (PARTITION BY [LagerLokasjon] ORDER BY [Modell] ASC) AS rn FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Pistoler] ) SELECT Text, id FROM RankedData WHERE rn = 1 and Text != '' ORDER BY [Text] ASC FOR JSON AUTO"; }


            else if (id == 5)
            { if (Vari == "undefined") { return @"[{""id"":0,""Text"":""Ingen Historie""}]"; }; STRsql = "select (Kundenavn + '_('  + Adresse + ')') as Text, id from dbo." + BaseAKA + "_Kunder where dbo." + BaseAKA + "_Kunder.Kundenavn like '" + Vari + "%' or dbo." + BaseAKA + "_Kunder.Telefon like '" + Vari + "%' FOR JSON AUTO"; }

            else if (id == 51) // Hent KundeNavner
            { if (Vari == "undefined") { return @"[{""id"":0,""Text"":""Ingen Historie""}]"; }; STRsql = "select (Kundenavn) as Text, (Kundenavn) as id from dbo." + BaseAKA + "_Kunder where dbo." + BaseAKA + "_Kunder.Kundenavn like '" + Vari + "%' or dbo." + BaseAKA + "_Kunder.Telefon like '" + Vari + "%' order by Kundenavn FOR JSON AUTO"; }



            else if (id == 6)
            {
                if (Vari == "undefined") { Vari = ""; };
                // STRsql = "SELECT id, (CONVERT(VARCHAR(50), DateOppdatert, 105) + ' ' + CONVERT(VARCHAR(50), DateOppdatert, 108) + '  (' + Serienummer + ')  ' +  Merke + ' ' + Modell) as Text FROM " + BaseAKA + "_Pistoler where Kunde_ID = " + Vari + " FOR JSON PATH"; }
                STRsql = "DECLARE @s INT = (select top (1) " + BaseAKA + "_Pistoler.ID from " + BaseAKA + "_Pistoler where " + BaseAKA + "_Pistoler.Kunde_ID = " + Vari + ") ";
                STRsql += "SELECT " + BaseAKA + "_Pistoler.ID, ";
                STRsql += "(CONVERT(VARCHAR(50), " + BaseAKA + "_Pistoler.DateOppdatert, 105) + ' ' + CONVERT(VARCHAR(50), " + BaseAKA + "_Pistoler.DateOppdatert, 108) + '  ' +";
                STRsql += "(select " + BaseAKA + "_Status.Text from " + BaseAKA + "_Status inner join " + BaseAKA + "_Pistoler on " + BaseAKA + "_status.Status = " + BaseAKA + "_Pistoler.Status where " + BaseAKA + "_Pistoler.id = @s)";
                STRsql += "+'  (' + " + BaseAKA + "_Pistoler.Serienummer + ')  ' + " + BaseAKA + "_Pistoler.Merke + ' ' + " + BaseAKA + "_Pistoler.Modell + ' ' + " + BaseAKA + "_Pistoler.Mekanisme) as Text ";
                STRsql += "FROM " + BaseAKA + "_Pistoler where Kunde_ID =  " + Vari + " FOR JSON PATH";
            }
            // STATUSer
            else if (id == 7) // Rapporter
            { STRsql = "SELECT [Status] as id,[Text] FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Status] order by Text asc FOR JSON PATH"; }
            else if (id == 71) // InsertWepon (status < 1000)
            { STRsql = "SELECT [Status] as id,[Text] FROM [dokumentasjon_eu_db].[dbo].[" + BaseAKA + "_Status] where Status<1000 order by Text asc FOR JSON PATH"; }


            else if (id == 9)
            { STRsql = "select " + BaseAKA + "_Pistoler.ID as id, (ISNULL(CONVERT(varchar(50)," + BaseAKA + "_Pistoler.Merke),' ') + ' ' + ISNULL(CONVERT(varchar(50)," + BaseAKA + "_Pistoler.Modell),' ') + ' ' + ISNULL(CONVERT(varchar(50)," + BaseAKA + "_Pistoler.Mekanisme),' ') + ', Eies av ' + ISNULL(CONVERT(varchar(50)," + BaseAKA + "_Pistoler.Eier),'Butikk') ) as Text from " + BaseAKA + "_Pistoler where " + BaseAKA + "_Pistoler.Serienummer = '" + Vari + "' and Status != 3 FOR JSON PATH"; }

            else if (id == 10)
            { STRsql = "SELECT ID as id, ClientName as Text FROM " + BaseAKA + "_LogOn FOR JSON PATH"; }

            else
            { /*STRsql = "SELECT Text, id FROM " + BaseAKA + "_ConstantText WHERE (ConstantID = 1) FOR JSON PATH";*/ }

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


                        var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
                        json.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.Indented;


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

        // POST: api/DoFill
        public void Post(int id, string Vari, string SessionPassword, string JDoFill, string BaseAKA)
        {
            
            
        }

        // PUT: api/DoFill/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoFill/5
        public void Delete(int id)
        {
        }
    }
}
