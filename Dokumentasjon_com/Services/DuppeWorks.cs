using MySql.Data.MySqlClient;
using System;
using System.Text.Json;
using System.Text;

namespace IdanikaSoftware
{
    public static class DuppeCommands
    {
        public static string _connString = SessionManager.GetSessionValue("UserConnectionString");

        public static void SendError(string error)
        {
            // Rens opp error-strengen
            error = error.Replace(@"\", "").Replace(@"(", "").Replace(@")", "");

            // Hent tilkoblingsstrengen fra _configuration (Pass på at _configuration er tilgjengelig, for eksempel via en statisk variabel eller injisering)
           // string _connString = ConfigManager.GetConnectionString("MySQLUserConnection");
            // 📌 Hent connection string fra session i stedet for appsettings.json
            string _connString = SessionManager.GetSessionValue("UserConnectionString");


            // Opprett MySQL-tilkoblingen
            using (MySqlConnection myConnection = new MySqlConnection(_connString))
            {
                myConnection.Open();
                try
                {
                    // Bruk parameterisert spørring for å unngå problemer
                    string query = "INSERT INTO ErrorLog (FromSite, ErrorMessage) VALUES ('GunStock', @ErrorMessage)";

                    using (MySqlCommand myCommand = new MySqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@ErrorMessage", error);
                        myCommand.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    // Vær forsiktig med rekursiv kall av SendError for å unngå uendelig løkke.
                    // Du kan f.eks. logge feilen til en fil eller konsoll her.
                    Console.WriteLine("Feil ved SendError: " + ex.ToString());
                }
            }
        }

        // Overbelastning med ekstra parameter
        public static void SendError(string error, string showText)
        {
            error = error.Replace(@"\", "").Replace(@"(", "").Replace(@")", "");
            // Her kan du gjøre lignende som over, evt. med en annen spørring som inkluderer showText

            string _connString = SessionManager.GetSessionValue("UserConnectionString");

            using (MySqlConnection myConnection = new MySqlConnection(_connString))
            {
                myConnection.Open();
                try
                {
                    string query = "INSERT INTO Skitt_ErrorLog (FromSite, ErrorMessage, ShowText) VALUES ('GunStock', @ErrorMessage, @ShowText)";
                    using (MySqlCommand myCommand = new MySqlCommand(query, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@ErrorMessage", error);
                        myCommand.Parameters.AddWithValue("@ShowText", showText);
                        myCommand.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    // Unngå rekursivt kall hvis det feiler igjen
                    Console.WriteLine("Feil ved SendError (overbelastning): " + ex.ToString());
                }
            }
        }

        public static bool CheckUser(string sessionPassword)
        {
            if (string.IsNullOrEmpty(sessionPassword))
                return false;

            int putSQL = 0;
            string _connString = SessionManager.GetSessionValue("UserConnectionString");

            using (MySqlConnection myConnection = new MySqlConnection(_connString))
            {
                try
                {
                    string strSQL = "UPDATE Dokumentasjon_Costumer SET ClientSessionPassword = ClientSessionPassword WHERE ClientSessionPassword = @SessionPassword";
                    using (MySqlCommand myCommand = new MySqlCommand(strSQL, myConnection))
                    {
                        myCommand.Parameters.AddWithValue("@SessionPassword", sessionPassword);
                        myConnection.Open();
                        putSQL = myCommand.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    // Logg feilen med SendError (unngå eventuelt rekursivt kall her hvis det feiler)
                    SendError(ex.ToString(), "SQL");
                    return false;
                }
            }

            return putSQL == 1;
        }
    }




    public class Duppe_SQL
    {
        public static bool SessionOK()
        {
            string _logOnconnectionString = SessionManager.GetSessionValue("MasterDB");
            if (string.IsNullOrEmpty(_logOnconnectionString))
                return false;

            try
            {

                using (var connection = new MySqlConnection(_logOnconnectionString))
                {
                    connection.OpenAsync();

                    string query = @"SELECT ClientSessionPassword FROM dokumentasjon_eu_db.LogOn where ClientSessionPassword like '" + SessionManager.GetSessionValue("SessionPassword") + "';";

                    using (var command = new MySqlCommand(query, connection))
                    {


                        using (var reader = command.ExecuteReader())
                        {
                            if (reader.HasRows) { return true; } else { return false; }


                        }
                    }
                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public static string ConnString = ConfigManager.GetConnectionString("MySQLConnection");
        //public static string ConnString = SessionManager.GetSessionValue("UserConnectionString");
        public static bool RunSQLNonQuery(string strSQL)
        {
            try
            {
                using (var myConnection = new MySqlConnection(ConnString))
                {
                    myConnection.Open();
                    using (var myCommand = new MySqlCommand(strSQL, myConnection))
                    {
                        int putSQL = myCommand.ExecuteNonQuery();
                        return putSQL > 0;
                    }
                }
            }
            catch (Exception ex)
            {
                DuppeCommands.SendError(ex.ToString(), "SQL");
                return false;
            }
        }

        public static string RunSQLQuery(string strSQL)
        {
            try
            {
                using (var myConnection = new MySqlConnection(ConnString))
                {
                    myConnection.Open();
                    using (var myCommand = new MySqlCommand(strSQL, myConnection))
                    using (var reader = myCommand.ExecuteReader())
                    {
                        var results = new StringBuilder();
                        var jsonList = new List<object>();

                        while (reader.Read())
                        {
                            var row = new Dictionary<string, object>();
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                row[reader.GetName(i)] = reader.GetValue(i);
                            }
                            jsonList.Add(row);
                        }

                        return JsonSerializer.Serialize(jsonList);
                    }
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }
    }


    }
