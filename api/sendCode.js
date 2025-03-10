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
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "Verificatie <noreply@jouwdomein.com>",
                to: email,
                subject: "Jouw verificatiecode",
                text: `Je verificatiecode is: ${verificationCode}`,
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
