const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

function getDbUrl() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  }
  return process.env.DATABASE_URL;
}

async function run() {
  const dbUrl = getDbUrl();
  const pool = new Pool({
    connectionString: dbUrl.replace(/[\r\n\s]+/g, ""),
    ssl: { rejectUnauthorized: false }
  });

  const res = await pool.query('SELECT id, position, company, type FROM "Experience"');
  console.log("Current experiences in DB:", res.rows);

  // Delete dummy work experiences
  const deleteRes = await pool.query('DELETE FROM "Experience" WHERE type = $1 RETURNING id, position', ['work']);
  console.log("Deleted dummy work experiences:", deleteRes.rows);

  const remaining = await pool.query('SELECT id, position, company, type FROM "Experience"');
  console.log("Remaining experiences in DB (Education only):", remaining.rows);

  await pool.end();
}

run().catch(console.error);
