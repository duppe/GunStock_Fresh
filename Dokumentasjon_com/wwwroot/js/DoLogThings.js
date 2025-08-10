/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced 
 */
const ServerURL = "api/auth/";

//test ert

async function LogIn() {
    const clientEmail = document.getElementById("Bruker").value;
    const clientPassword = document.getElementById("Passord").value;

    const loginData = {
        ClientEmail: clientEmail,
        ClientPassword: clientPassword,
        sessionPassword : '1'
    };

    console.log("🔍 Sender loginData:", JSON.stringify(loginData));

    try {
        const response = await fetch(ServerURL + "login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        // 🚨 Sjekk om responsen faktisk er JSON
        const textResponse = await response.text();
        console.log("🔍 Rå API-respons:", textResponse);

        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message);
            return;
        }
        const userData = JSON.parse(textResponse); // Forsøk å parse JSON
        // 🛠️ Lagrer brukerdata
        saveUserData(userData);

        // 🔄 Hvis passord må endres, send til passordside
        if (userData.clientChangePassword === 1 || userData.clientChangePassword === "1") {
            ChangePassword();
        } else {
            // 🌍 Omdiriger bruker til riktig side
            const redirectUrl = userData.clientUrl + `?q=${encodeURIComponent(userData.sessionPassword)}`;
            console.log("🔍 Omdirigerer til:", redirectUrl);
            window.location.href = redirectUrl;
        }


    }
        catch (jsonError) {
            console.error("⚠️ Kunne ikke parse JSON:", jsonError);
            alert("Serveren returnerte et ugyldig svar. Se konsollen for detaljer.");
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

function getUserData(userData) {
    return localStorage.getItem(userData);
    console.log("🔍 Mottatt userData:", userData); // Debugging
}

