/*!
 * Logging v0.0.1 (http://idanika.no)
 * Copyright 2019- Haavald Haavaldsen.
 * Licenced 
 */
const ServerURL = "api/auth/";

async function CheckLogin() {

    const sessionPass = localStorage.getItem('sessionPassword');
    const clientEmail = localStorage.getItem('clientEmail');
    const clientPassword = '*****';


    const loginData = {
        ClientEmail: clientEmail,
        ClientPassword: clientPassword,
        sessionPassword: sessionPass
    };


    try {


        const response = await fetch(ServerURL + "CheckLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            window.location.href = "index.html";

            // alert(errorData.message);
            return;
        }
        console.log(response);
    } catch (error) {
        console.error("Feil ved pålogging:", error);
        alert("Kunne ikke logge inn. Prøv igjen.");
    }

}
function getUserData(userData) {
    return localStorage.getItem(userData);
    console.log("🔍 Mottatt userData:", userData); // Debugging
}


// Kjør CheckLogin() hvert 5. sekund (5000 ms)
setInterval(() => {
    try {
        CheckLogin();
    } catch (error) {
        console.error("⚠️ Feil i CheckLogin():", error);
    }
}, 3000);
