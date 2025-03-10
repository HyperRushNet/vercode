const codes = {}; // Tijdelijke opslag, gebruik een database in productie!

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.body;
    if (!email || !email.includes("@")) {
        return res.status(400).json({ error: "Ongeldig e-mailadres" });
    }

    // Genereer een 6-cijferige code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    codes[email] = verificationCode; // Tijdelijk opslaan

    try {
        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "api-key": process.env.BREVO_API_KEY,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: { email: "noreply@jouwdomein.com", name: "Verificatie" },
                to: [{ email: email }],
                subject: "Jouw verificatiecode",
                htmlContent: `<p>Je verificatiecode is: <strong>${verificationCode}</strong></p>`,
            }),
        });

        if (!response.ok) {
            throw new Error("E-mail verzenden mislukt.");
        }

        res.status(200).json({ success: true, message: "Code verzonden!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
