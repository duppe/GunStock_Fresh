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
    public class DoFillFormController : ApiController
    {
       
        // GET: api/DoFillForm
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/DoFillForm/5
        public string Get(int id, string Vari, string BaseAKA)
        {
            string STRsql;
            if (id == 0)
            { return "NO"; }
            else if (id == 1) // Gwt Costumer info Salg
            {
                //STRsql = "SELECT TOP (1) id, Kundenavn, Adresse, Poststed, Telefon, KundeVapen, Updated, ByUser, Info, NotOK FROM " + BaseAKA + "_Kunder WHERE (Kundenavn LIKE '" + Vari.Split('_')[0].ToString() + "%') ORDER BY Kundenavn FOR JSON PATH, WITHOUT_ARRAY_WRAPPER";
                STRsql = "SELECT id, EPostKunde, Kundenavn, KundeEtternavn, Adresse, Poststed, Telefon, KundeVapen, Updated, ByUser, Info, NotOK FROM " + BaseAKA + "_Kunder WHERE (id = " + Vari + ") ORDER BY Kundenavn FOR JSON PATH, WITHOUT_ARRAY_WRAPPER";
            }
            else if (id == 2) // Gwt Costumer VapenInfo By Serial
            { STRsql = "SELECT TOP (1) id, EPostKunde, Kundenavn, Adresse, Info, Poststed, Telefon, KundeVapen, Updated, ByUser FROM " + BaseAKA + "_Kunder WHERE (Kundenavn LIKE '" + Vari.Split('_')[0].ToString() + "%') ORDER BY Kundenavn FOR JSON PATH, WITHOUT_ARRAY_WRAPPER"; }

            else if (id == 10) // Get Default Settings
            {
                STRsql = "Select* from dbo." + BaseAKA + "_Settings where LogOnID = 0  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER";

            }

            else if (id == 11)  //Get User Settings
            {
                STRsql = "SELECT * FROM " + BaseAKA + "_LogOn where ID = " + Vari + "  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER";

            }

            else
            { STRsql = "SELECT TOP (1) id, EPostKunde, Kundenavn, Adresse, Info, Poststed, Telefon, KundeVapen, Updated, ByUser FROM " + BaseAKA + "_Kunder WHERE (id LIKE " + Vari + ") ORDER BY Kundenavn FOR JSON PATH, WITHOUT_ARRAY_WRAPPER "; }

            try
            {
               

                SqlConnection _DBConn = new SqlConnection(DuppeGlobals.ConnString);
                using (SqlConnection con = _DBConn)
                {
                    using (SqlCommand cmd = new SqlCommand(STRsql, con))
                    {
                        cmd.CommandType = CommandType.Text;
                        con.Open();
                        
                            var jsonResult = new StringBuilder();
                            var reader = cmd.ExecuteReader();
                            reader.Read();

                            string ert = reader.GetValue(0).ToString();
                            reader.Close();
                            con.Close();

                       
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

        // POST: api/DoFillForm
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/DoFillForm/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/DoFillForm/5
        public void Delete(int id)
        {
        }



}
}
