import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Sla data op in de Vercel KV-store
    const { key, value } = req.body;
    await kv.set(key, value);
    res.status(200).json({ message: 'Data opgeslagen in Vercel KV' });
  } else if (req.method === 'GET') {
    // Haal data op uit de Vercel KV-store
    const { key } = req.query;
    const value = await kv.get(key);
    res.status(200).json({ value: value || 'Geen data gevonden' });
  } else {
    res.status(405).json({ message: 'Onjuiste HTTP-methode' });
  }
}
