using System;
using Microsoft.Extensions.Configuration;

public static class ConfigManager
{
    private static IConfigurationRoot _config;

    static ConfigManager()
    {
        _config = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)  // Sikrer at vi leser fra riktig mappe
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
    }

    public static string GetConnectionString(string name)
    {
        return _config.GetConnectionString(name);
    }

    public static string GetAppSetting(string key)
    {
        return _config[key];
    }
}
