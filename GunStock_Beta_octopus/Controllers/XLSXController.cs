using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Web.Mvc;
using OfficeOpenXml;
using System.IO;
using OfficeOpenXml.Core.ExcelPackage;
using System.Windows.Media.Animation;
using Microsoft.Ajax.Utilities;
using OfficeOpenXml.Drawing;

namespace GunStock_Beta_octopus.Controllers
{
    public class XLSXController : Controller
    {

        // GET: XLSX
        public ActionResult Index()
        {
            return View();
        }

        // POST: XLSX/GenerateExcel
      
        [HttpPost]
        //public ActionResult GenerateExcel(string filnavn = "DataExport", string navn = "StandardNavn", string arkNavn = "DataArk")
        public ActionResult GenerateExcel()
        {
            try
            {
                // Hent query-parametere
                string LogoName = Request.QueryString["Logo"] + ".jpg" ?? "Logo.png";
                string Logo = Server.MapPath("~/img/" + Request.QueryString["Logo"]) + ".jpg"  ?? Server.MapPath("~/img/GunStockOne.png");
                string filnavn = Request.QueryString["filnavn"] ?? "DataExport";
                string navn = Request.QueryString["navn"] ?? "StandardNavn";
                string arkNavn = Request.QueryString["arkNavn"] ?? "DataArk";
                string status = Request.QueryString["Qstatus"] ?? "0";
                string Overskrift = Request.QueryString["Overskrift"] ?? arkNavn + " Utskrift ";
                



                // Les rå JSON-data fra forespørselen
                using (var reader = new StreamReader(Request.InputStream))
                {
                    var jsonData = reader.ReadToEnd();

                    // Deserialiser JSON-dataen
                    var data = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(jsonData);

                    if (data == null || data.Count == 0)
                    {
                        return new HttpStatusCodeResult(400, "JSON data is empty or invalid.");
                    }

                    // Definer kolonner som skal ekskluderes
                    var excludedColumns = new HashSet<string>();
                    if (status == "1001")
                    {
                        excludedColumns = new HashSet<string> { "Kunde_ID", "ID", "gID", "MottaksDato", "DatoOprettet", "Dato", "LagerLokasjon", "Kundenavn", "ItemText", "Info" };
                    }
                    else if (status == "1002")
                    {
                        excludedColumns = new HashSet<string> { "Kunde_ID", "ID", "gID", "DateOppdatert", "DatoOprettet", "Dato", "Kundenavn", "ItemText", "Info" };
                    }
                    else if (status == "1003")
                    {
                        excludedColumns = new HashSet<string> { "Kunde_ID", "ID", "gID", "MottaksDato", "DateOppdatert", "Dato", "Kundenavn", "Eier", "ItemText", "Info" }; //
                    }
                    else if (status == "StoreList")
                    {
                        excludedColumns = new HashSet<string> { "Kunde_ID", "ID", "gID", "MottaksDato", "DateOppdatert", "Dato", "Kundenavn", "Eier", "ItemText", "Info" }; //
                    }
                    else
                    {
                        excludedColumns = new HashSet<string> { "Kunde_ID", "ID", "gID", "MottaksDato", "DateOppdatert", "Dato", "LagerLokasjon", "ItemText", "Info" };
                    }


                    // 1001	-- == Salgsrapport == --
                    // 1002	--== Innkjøpsrapport == -- 
                    // 1003	--== Varebeholdningsrapport == --
                    // 



                    // Opprett Excel-logikken her...
                    // EPPlus lisensieringskontekst
                    OfficeOpenXml.ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                    using (var package = new OfficeOpenXml.ExcelPackage(new MemoryStream()))
                    {
                        var worksheet = package.Workbook.Worksheets.Add(arkNavn);


                        // Legg til logo
                        string logoPath = Logo; // Sett korrekt sti til logoen
                        if (System.IO.File.Exists(logoPath))
                        {
                            var logoImage = new FileInfo(logoPath);
                            var picture = worksheet.Drawings.AddPicture("Logo", logoImage);

                            // Sett en fast høyde (f.eks. 100) og juster bredde proporsjonalt
                            const int fixedHeight = 50; // Fast høyde i piksler
                            var originalWidth = picture.Image.Width;
                            var originalHeight = picture.Image.Height;
                            var scaleFactor = (double)fixedHeight / originalHeight;
                            var proportionalWidth = (int)(originalWidth * scaleFactor);

                            picture.SetSize(proportionalWidth, fixedHeight); // Sett bredde og høyde
                            picture.SetPosition(0, 0, 0, 0); // Plasser logoen (Rad 1, Kolonne 1)
                        }

                        // Legg til overskrifter
                        int colIndex = 1;
                       
                        foreach (var key in data[0].Keys)
                        {
                            if (!excludedColumns.Contains(key)) // Sjekk om kolonnen er ekskludert
                            {
                                // string KeyToBe;
                                // if (key == "DatoOprettet") { KeyToBe = "Dato"; } else { KeyToBe = key.ToString(); } ItemText
                                string header = key; // Standard header

                                // Tilpass header basert på status og kolonnenavn
                                if (status == "1001" && key == "DateOppdatert")
                                {
                                    header = "Dato utlevert";
                                }
                                else if (key == "DatoOprettet")
                                {
                                    header = "Dato";
                                }
                                else if (key == "Dato")
                                {
                                    header = "Status Dato";
                                }
                                else if (key == "ItemText")
                                {
                                    header = "Info";
                                }
                                else if (key == "Bestilt")
                                {
                                    header = "Dato";
                                }
                                var cell = worksheet.Cells[6, colIndex++];
                                cell.Value = header;
                                cell.Style.Font.Bold = true; // Gjør overskriften fet
                                cell.Style.Font.Size = 14; // Angi ønsket skriftstørrelse

                            }
                        }


                        // Legg til tekst i kolonne 5, rad 6
                        worksheet.Cells[4, 1].Value = Overskrift;
                        worksheet.Cells[4, 1].Style.Font.Bold = true;
                        worksheet.Cells[4, 1].Style.Font.Size = 15;
                        worksheet.Cells[4, 1].Style.WrapText = false; // Aktiver tekstbryting
                        worksheet.Cells[4, 1].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left; // Juster teksten til venstre (valgfritt)
                        worksheet.Cells[4, 1, 4, 5].Merge = true;                                                                                                     // Sørg for at kolonnebredden er den samme som cellene under
                      

                        // Legg til rader
                        int rowIndex = 7;
                        foreach (var row in data)
                        {
                            colIndex = 1;
                            foreach (var key in row.Keys)
                            {
                                if (!excludedColumns.Contains(key)) // Sjekk om kolonnen er ekskludert
                                {
                                    worksheet.Cells[rowIndex, colIndex++].Value = row[key];
                                }
                            }
                            rowIndex++;
                        }

                        // Sett arket til liggende utskriftsretning
                        //  worksheet.PrinterSettings.Orientation = OfficeOpenXml.Style.eOrientation.Landscape;

                        // Tilpass arket til én side ved utskrift
                        worksheet.PrinterSettings.Orientation = eOrientation.Landscape;

                        worksheet.PrinterSettings.FitToPage = true;
                        worksheet.PrinterSettings.FitToWidth = 1; // Tilpass bredden til én side
                        worksheet.PrinterSettings.FitToHeight = 0; // Ingen grense på høyden (kan strekke seg over flere sider)


                        // Autofilter for overskriftene
                        worksheet.Cells[6, 1, 6, colIndex - 1].AutoFilter = true;

                        // Tilpass kolonner
                        worksheet.Cells.AutoFitColumns();

                        // Gjenta overskriftene på hver side ved utskrift
                        worksheet.PrinterSettings.RepeatRows = new ExcelAddress("6:6"); // Gjenta rad 6


                        // Generer Excel-fil som byte-array
                        var stream = new MemoryStream();
                        package.SaveAs(stream);
                        stream.Position = 0;

                        return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filnavn + ".xlsx");
                    }
                }
            }
            catch (Exception ex)
            {
                return new HttpStatusCodeResult(500, $"An error occurred: {ex.Message}");
            }
        }

    }
}
