/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced 
 */
const ServerURL = "https://localhost:7090/api/auth/";

async function LogIn() {
    const clientEmail = document.getElementById("Bruker").value;
    const clientPassword = document.getElementById("Passord").value;

    const loginData = {
        ClientEmail: clientEmail,
        ClientPassword: clientPassword
    };

    try {
        const response = await fetch(ServerURL + "login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return;
        }

        const userData = await response.json();
        saveUserData(userData);

        // 🔄 Hvis passord må endres, send til passordside
        if (userData.ClientChangePassword === "1") {
            ChangePassword();
        } else {
            window.location.href = `inner-page.html?q=${userData.SessionPassword}`;
        }

    } catch (error) {
        console.error("Feil ved pålogging:", error);
        alert("Kunne ikke logge inn. Prøv igjen.");
    }
}


// 🛠️ Lagrer brukerdata i LocalStorage
function saveUserData(userData) {
    console.log("🔍 Mottatt userData:", userData); // Debugging

    localStorage.clear();
    localStorage.setItem("sessionPassword", userData.sessionPassword || "");
    localStorage.setItem("clientLevel", userData.clientLevel || "");
    localStorage.setItem("clientTimeOutValue", userData.clientTimeOutValue || "");
    localStorage.setItem("clientChangePassword", userData.clientChangePassword || "");
    localStorage.setItem("clientName", userData.clientName || "");
    localStorage.setItem("clientEmail", userData.clientEmail || "");
    localStorage.setItem("clientSessionID", userData.clientSessionID || "N/A");
    localStorage.setItem("clientUrl", userData.clientUrl || "index.html");
    localStorage.setItem("firmID", userData.firmID || "0");
    localStorage.setItem("byUser", userData.byUser || "Ukjent");
    localStorage.setItem("overLord", userData.overLord || false);
}


// 🛠️ Genererer en random session-passord (ikke lenger nødvendig i JS)
function generatePassword() {
    const length = 28;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
