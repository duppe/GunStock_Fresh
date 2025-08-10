using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System.Data;
using Dokumentasjon_com.Services;
using IdanikaSoftware;

var builder = WebApplication.CreateBuilder(args);

// Hent MySQL-tilkoblingsstreng fra appsettings.json
var connectionString = builder.Configuration.GetConnectionString("MySQLConnection");

// Legg til MySQL-tilkobling i DI-containeren
builder.Services.AddTransient<IDbConnection>((sp) => new MySqlConnection(connectionString));
builder.Services.AddHttpClient();

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<PdfService>(); 
builder.Services.AddEndpointsApiExplorer();

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5000); // Lytt på alle IP-er for HTTP
    options.ListenAnyIP(5001, listenOptions => listenOptions.UseHttps()); // Lytt på alle IP-er for HTTPS
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        });
});

// session i appen
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Timeout for session
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
builder.Services.AddDistributedMemoryCache(); // Kreves for session
builder.Services.AddHttpContextAccessor(); // Gir tilgang til HttpContext i hele appen




var app = builder.Build();
app.UseCors("AllowAll");

// 📌 Initialiser SessionManager med HttpContextAccessor
SessionManager.Initialize(app.Services.GetRequiredService<IHttpContextAccessor>());

// Konfigurer feilhåndtering
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// Middleware
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseSession();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

// 📌 Endre root route til å peke på wwwroot/index.html
app.MapFallbackToFile("index.html");

app.Run();
