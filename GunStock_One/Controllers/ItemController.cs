using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace GunStock_One.Controllers
{
    [Route("api/item")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly string _connectionString = "server=mysql55.unoeuro.com;database=dokumentasjon_eu_db_GunStock;user=dokumentasjon_eu;password=Runa1983;charset=utf8mb4;";

        // 🎯  Hent et item basert på eksakt serienummer
        [HttpGet("lookup/{FirmID}/{serialNumber}")]
        public async Task<IActionResult> LookupBySerial(string FirmID, string serialNumber)
        {
            try
            {
                /*
                if (!IsValidFirmID(FirmID))
                {
                    return BadRequest(new { message = "Ugyldig FirmID" });
                }
                */

                var items = new List<object>();

                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

                    // 🛠️ Tving MySQL til UTF-8
                    using (var setNamesCommand = new MySqlCommand("SET NAMES utf8mb4; SET CHARACTER SET utf8mb4;", connection))
                    {
                        await setNamesCommand.ExecuteNonQueryAsync();
                    }

                    string query = $"SELECT * FROM GunStock_{FirmID}_items WHERE Serienummer = @SerialNumber";

                    using (var command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@SerialNumber", serialNumber);

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                items.Add(new
                                {
                                    ID = reader["ID"],
                                    Status = reader["Status"],
                                    Kunde_ID = reader["Kunde_ID"],
                                    Eier = reader["Eier"].ToString(),
                                    StatusText = reader["StatusText"].ToString(),
                                    Dato = reader["Dato"] != DBNull.Value ? Convert.ToDateTime(reader["Dato"]).ToString("yyyy-MM-dd HH:mm:ss") : "N/A",
                                    Serienummer = reader["Serienummer"].ToString(),
                                    Mekanisme = reader["Mekanisme"].ToString(),
                                    Merke = reader["Merke"].ToString(),
                                    Modell = reader["Modell"].ToString(),
                                    LopLengde = reader["LopLengde"].ToString(),
                                    ByUser = reader["ByUser"].ToString(),
                                    Bestilt = reader["Bestilt"] != DBNull.Value ? Convert.ToDateTime(reader["Bestilt"]).ToString("yyyy-MM-dd HH:mm:ss") : "N/A",
                                    Varenummer = reader["Varenummer"].ToString(),
                                    LagerLokasjon = reader["LagerLokasjon"].ToString()
                                });
                            }
                        }
                    }
                }

                if (items.Count == 0)
                    return NotFound(new { message = "Ingen treff." });

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Serverfeil", error = ex.Message });
            }
        }




        // 🎯  Hent items basert på wildcard i serienummer
        [HttpGet("lookupWildCard/{FirmID}/{serialNumber}")]
        public async Task<IActionResult> LookupWildcard(string serialNumber, string FirmID)
        {
            try
            {
                var items = new List<object>();

                using (var connection = new MySqlConnection(_connectionString))
                {
                    await connection.OpenAsync();

            
                    string query = $"SELECT * FROM GunStock_{FirmID}_items WHERE Serienummer = @SerialNumber";

                    using (var command = new MySqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@SerialNumber", serialNumber + "%");

                        using (var reader = await command.ExecuteReaderAsync())
                        {
                            while (await reader.ReadAsync())
                            {
                                items.Add(new
                                {
                                    ID = reader["ID"],
                                    Status = reader["Status"],
                                    Kunde_ID = reader["Kunde_ID"],
                                    Eier = reader["Eier"].ToString(),
                                    StatusText = reader["StatusText"].ToString(),
                                    Dato = reader["Dato"] != DBNull.Value ? Convert.ToDateTime(reader["Dato"]).ToString("yyyy-MM-dd HH:mm:ss") : "N/A",
                                    Serienummer = reader["Serienummer"].ToString(),
                                    Mekanisme = reader["Mekanisme"].ToString(),
                                    Merke = reader["Merke"].ToString(),
                                    Modell = reader["Modell"].ToString(),
                                    LopLengde = reader["LopLengde"].ToString(),
                                    ByUser = reader["ByUser"].ToString(),
                                    Bestilt = reader["Bestilt"] != DBNull.Value ? Convert.ToDateTime(reader["Bestilt"]).ToString("yyyy-MM-dd HH:mm:ss") : "N/A",
                                    Varenummer = reader["Varenummer"].ToString(),
                                    LagerLokasjon = reader["LagerLokasjon"].ToString()
                                });
                            }
                        }
                    }
                }

                if (items.Count == 0)
                    return NotFound(new { message = "Ingen treff." });

                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Serverfeil", error = ex.Message });
            }
        }
    }
}
