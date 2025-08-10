using Microsoft.EntityFrameworkCore;
using GunStock_One.Data;

var builder = WebApplication.CreateBuilder(args);

// Legg til støtte for HTTP i Kestrel-serveren
/*
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(7090); // HTTP
    options.ListenAnyIP(7091, listenOptions => listenOptions.UseHttps()); // HTTPS
});
*/

// Add services to the container.
builder.Services.AddControllersWithViews();

// MySQL Connection String
var connectionString = "server=mysql55.unoeuro.com;database=dokumentasjon_eu_db_GunStock;user=dokumentasjon_eu;password=Runa1983;CharSet=utf8mb4;";

// Fix: Use `ServerVersion.AutoDetect`
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
