export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { email, code } = req.body;
    if (!email || !code) {
        return res.status(400).json({ error: "E-mail en code zijn verplicht" });
    }

    if (codes[email] && codes[email] === code) {
        delete codes[email]; // Verwijder de code na verificatie
        return res.status(200).json({ success: true, message: "Verificatie geslaagd!" });
    } else {
        return res.status(400).json({ error: "Ongeldige of verlopen code" });
    }
}
