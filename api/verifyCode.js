let storedCode = null; // Tijdelijke opslag, beter om Redis of DB te gebruiken

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: "Email and code are required" });
  }

  if (code === storedCode) {
    storedCode = null; // Reset na verificatie
    return res.status(200).json({ success: true, message: "Verification successful" });
  } else {
    return res.status(400).json({ error: "Invalid code" });
  }
}
