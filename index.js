const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => {
    console.log("Verbonden met de database");
    
    // Voorbeeld van een query om gegevens op te halen
    client.query('SELECT * FROM users;', (err, res) => {
      if (err) {
        console.error('Fout bij uitvoeren van de query', err.stack);
      } else {
        console.log(res.rows); // Log de gegevens
      }
      
      client.end(); // Verbreek de verbinding na de query
    });
  })
  .catch((err) => console.error('Verbindingsfout', err.stack));
