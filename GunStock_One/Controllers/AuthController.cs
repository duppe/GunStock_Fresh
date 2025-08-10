using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Data;
using System.Threading.Tasks;

namespace GunStock_One.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly string _connectionString = "server=mysql55.unoeuro.com;database=dokumentasjon_eu_db_GunStock;user=dokumentasjon_eu;password=Runa1983;charset=utf8mb4;";

        // 🎯 POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.ClientEmail) || string.IsNullOrEmpty(loginRequest.ClientPassword))
                return BadRequest(new { message = "Brukernavn og passord kreves!" });

            try
            {
                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    // 🎯 SQL-spørring (parameterisert for å unngå SQL Injection)
                    string query = @"
                        SELECT ID, FirmID, ClientLevel, ClientTimeOutValue, ClientChangePassword, 
                               ClientName, ClientEmail, ClientSessionID, ClientUrl, ByUser, OverLord
                        FROM GunStock_LogOn
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
                                    SessionPassword = GenerateSessionPassword(),
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

        // 🎯 Generer en tilfeldig session-passord
        private string GenerateSessionPassword()
        {
            var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 28).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }

    // 🎯 Login Request Model
    public class LoginRequest
    {
        public string ClientEmail { get; set; }
        public string ClientPassword { get; set; }
    }
}
