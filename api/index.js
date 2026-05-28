import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { code } = req.query;

  // Kyunki links.json aur index.js dono api folder ke andar hain, hum __dirname use karenge
  const filePath = path.join(__dirname, 'links.json');

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(500).send("Server par links.json file nahi mili.");
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const redirectUrl = data[code];

    if (redirectUrl) {
      res.writeHead(302, { Location: redirectUrl });
      return res.end();
    } else {
      return res.status(404).send(`Code "${code}" nahi mila! Apni links.json check karein.`);
    }
  } catch (error) {
    return res.status(500).send("JSON parse karne mein ya server par koi dikkat hui hai.");
  }
}
