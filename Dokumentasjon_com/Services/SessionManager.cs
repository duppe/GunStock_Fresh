using Microsoft.AspNetCore.Http;
using MySql.Data.MySqlClient;
using System;

namespace IdanikaSoftware
{
    /// <summary>
    /// Håndterer session-variabler globalt i applikasjonen.
    /// </summary>
    public static class SessionManager
    {
        private static IHttpContextAccessor _httpContextAccessor;

        /// <summary>
        /// Initialiserer SessionManager med en HttpContextAccessor.
        /// Må kalles fra Program.cs for at session skal fungere.
        /// </summary>
        /// <param name="accessor">Instans av IHttpContextAccessor</param>
        public static void Initialize(IHttpContextAccessor accessor)
        {
            _httpContextAccessor = accessor;
        }

        /// <summary>
        /// Setter en session-variabel med en string-verdi.
        /// </summary>
        /// <param name="key">Nøkkelen for session-variabelen</param>
        /// <param name="value">Verdien som skal lagres</param>
        public static void SetSessionValue(string key, string value)
        {
            _httpContextAccessor?.HttpContext?.Session.SetString(key, value);
        }

        /// <summary>
        /// Henter en session-variabel som string.
        /// </summary>
        /// <param name="key">Nøkkelen for session-variabelen</param>
        /// <returns>String-verdi eller null hvis nøkkelen ikke finnes</returns>
        public static string GetSessionValue(string key)
        {
            return _httpContextAccessor?.HttpContext?.Session.GetString(key);
        }

        /// <summary>
        /// Sletter en session-variabel.
        /// </summary>
        /// <param name="key">Nøkkelen for session-variabelen</param>
        public static void RemoveSessionValue(string key)
        {
            _httpContextAccessor?.HttpContext?.Session.Remove(key);
        }

        /// <summary>
        /// Sjekker om en session-variabel eksisterer.
        /// </summary>
        /// <param name="key">Nøkkelen for session-variabelen</param>
        /// <returns>True hvis variabelen finnes, ellers false</returns>
        public static bool SessionExists(string key)
        {
            return !string.IsNullOrEmpty(GetSessionValue(key));
        }


       
    }
}
