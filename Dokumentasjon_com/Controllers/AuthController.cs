using IdanikaSoftware;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace Dokumentasjon_com.Controllers
{
    
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
       

        private readonly string _connectionString = "server=mysql55.unoeuro.com;database=dokumentasjon_eu_db_GunStock;user=dokumentasjon_eu;password=Runa1983;charset=utf8mb4;";
        private readonly string _logOnconnectionString = "server=mysql55.unoeuro.com;database=dokumentasjon_eu_db;user=dokumentasjon_eu;password=Runa1983;charset=utf8mb4;";
        

        //  POST: api/auth/CheckLogin
        [HttpPost("CheckLogin")]
        public async Task<IActionResult> CheckLogin([FromBody] LoginRequest loginRequest)
        {
            if (string.IsNullOrEmpty(loginRequest.sessionPassword))
                return BadRequest(new { message = "sessionPassword kreves!" });
           
            try
            {
                using (var connection = new MySqlConnection(_logOnconnectionString))
                {
                    await connection.OpenAsync();

                    string query = @"SELECT ClientSessionPassword FROM dokumentasjon_eu_db.LogOn where ClientSessionPassword like '" + loginRequest.sessionPassword +"';";


                    var response = new
                    {
                        SessionPassword = loginRequest.sessionPassword,
                        Status = "Valid"
                    };


                    using (var command = new MySqlCommand(query, connection))
                    {
                        
                       
                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (reader.HasRows) { return Ok(response); } else { return NotFound(new { message = "Feil brukernavn eller passord." }); }

                          
                        }
                    }
                }
               
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Serverfeil", error = ex.Message });
            }
        }

    


        //  POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ClientEmail) || string.IsNullOrEmpty(loginRequest.ClientPassword))
                return BadRequest(new { message = "Brukernavn og passord kreves!" });

            try
            {
                using (var connection = new MySqlConnection(_logOnconnectionString))
                {
                    await connection.OpenAsync();

                    // 🎯 SQL-spørring (parameterisert for å unngå SQL Injection)
                    string query = @"
                    WITH RECURSIVE pass_gen AS (
                        SELECT '' AS password, 1 AS n
                    UNION ALL
                        SELECT CONCAT(password, SUBSTRING('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+', FLOOR(RAND() * 72) + 1, 1)), n + 1
                        FROM pass_gen
                        WHERE n < 13
                    )
                    SELECT ID, FirmID, ClientDB, ClientLevel, ClientTimeOutValue, ClientChangePassword, 
                        ClientName, ClientEmail, ClientSessionID, ClientUrl, ByUser, OverLord,
                        (SELECT password FROM pass_gen WHERE n = 13) AS SessionPassword
                        FROM LogOn
                    WHERE ClientEmail = @ClientEmail AND ClientPassword = @ClientPassword";


                    using (var command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@ClientEmail", loginRequest.ClientEmail);
                        command.Parameters.AddWithValue("@ClientPassword", loginRequest.ClientPassword);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            if (await reader.ReadAsync())
                            {
                                var response = new
                                {
                                    SessionPassword = GenerateSessionPassword(reader["ClientEmail"].ToString()),
                                    ClientLevel = reader["ClientLevel"],
                                    ClientTimeOutValue = reader["ClientTimeOutValue"],
                                    ClientChangePassword = reader["ClientChangePassword"],
                                    ClientName = reader["ClientName"].ToString(),
                                    ClientEmail = reader["ClientEmail"].ToString(),
                                    ClientSessionID = reader["ClientSessionID"].ToString(),
                                    ClientUrl = reader["ClientUrl"].ToString(),
                                    FirmID = reader["FirmID"],
                                    ByUser = reader["ByUser"].ToString(),
                                    OverLord = Convert.ToBoolean(reader["OverLord"])
                                };

                                // Kall GetConnString(FirmID) API for å få riktig database-connection
                                var ConnString_response = Duppe_SQL.RunSQLQuery("SELECT * FROM dokumentasjon_eu_db.ConnStrings where FirmID = '" + reader["FirmID"] + "';");
                                // Bruk JArray.Parse() siden responsen er en liste
                                var jsonArray = JArray.Parse(ConnString_response);
                       
                                // Hent første objekt i arrayen (hvis det finnes)
                                if (jsonArray.Count > 0)
                                {
                                    var json = jsonArray[0]; // Hent første element som JObject
                                    string connectionString = json["ConnString"]?.ToString();

                                    if (string.IsNullOrEmpty(connectionString))
                                    {
                                        return BadRequest(new { message = "No connection string found for this FirmID." });
                                    }

                                    // Lagre i session
                                    //_httpContextAccessor.HttpContext.Session.SetString("UserConnectionString", connectionString);
                                    //_httpContextAccessor.HttpContext.Session.SetString("FirmID", json["FirmID"].ToString());

                                    SessionManager.SetSessionValue("UserConnectionString", connectionString);
                                    SessionManager.SetSessionValue("FirmID", json["FirmID"].ToString());
                                    SessionManager.SetSessionValue("ClientDB", json["ConnString"].ToString());
                                    SessionManager.SetSessionValue("MasterDB", _logOnconnectionString);

                                }
                                else
                                {
                                    return NotFound(new { message = "Ingen tilkoblingsstreng funnet for FirmID." });
                                }
                            



                                return Ok(response);
                            }
                        }
                    }
                }
                return Unauthorized(new { message = "Feil brukernavn eller passord." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Serverfeil", error = ex.Message });
            }
        }

        //  Generer en tilfeldig session-passord
        private string GenerateSessionPassword(string ClientEmail)
        {
            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            var Spass = new string(Enumerable.Repeat(chars, 28).Select(s => s[random.Next(s.Length)]).ToArray());

            UpdateClientSessionPassword(ClientEmail, Spass);
            SessionManager.SetSessionValue("SessionPassword", Spass);
            return Spass;

            
        }




        public async Task<bool> UpdateClientSessionPassword(string clientEmail, string newPassword)
        {
            // Først sjekker vi om det finnes en X-Forwarded-For header (nyttig hvis applikasjonen kjører bak en proxy)
            string ipAddress = HttpContext.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if (string.IsNullOrEmpty(ipAddress))
            {
                // Hvis headeren ikke er tilstede, hentes IP-adressen fra Connection-objektet
                ipAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
            }
            string query = @"
        UPDATE LogOn
        SET ClientSessionPassword = @NewPassword, ClientIP = @IpAddress, ClientStart = @ClientStart
        WHERE ClientEmail = @ClientEmail";

            try
            {
                using (var connection = new MySqlConnection(_logOnconnectionString))
                {
                    await connection.OpenAsync();
                    using (var command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@NewPassword", newPassword);
                        command.Parameters.AddWithValue("@ClientEmail", clientEmail);
                        command.Parameters.AddWithValue("@IpAddress", ipAddress);
                        command.Parameters.AddWithValue("@ClientStart", System.DateTime.Now);

                        int rowsAffected = await command.ExecuteNonQueryAsync();
                        return rowsAffected > 0; // Returnerer true hvis minst én rad ble oppdatert
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($" Feil ved oppdatering av ClientSessionPassword: {ex.Message}");
                return false;
            }
        }




    }


    //  Login Request Model
    public class LoginRequest
    {
        public string ClientEmail { get; set; }
        public string ClientPassword { get; set; }
        public string sessionPassword { get; set; } 
    }





}


