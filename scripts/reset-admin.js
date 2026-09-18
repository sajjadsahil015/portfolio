const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

async function reset(newPassword) {
  const dbUrl = getDbUrl();
  if (!dbUrl) {
    console.error("Error: DATABASE_URL not found in .env or .env.local");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl.replace(/[\r\n\s]+/g, ""),
    ssl: { rejectUnauthorized: false }
  });

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const res = await pool.query(
      'UPDATE "User" SET password = $1 WHERE role = $2 OR email = $3 RETURNING id, name, email',
      [hashedPassword, 'admin', 'sajjadsahil015@gmail.com']
    );

    if (res.rowCount === 0) {
      console.log("No admin user found to update.");
    } else {
      console.log("\n=================================");
      console.log(" SUCCESS! Admin Password Reset");
      console.log("=================================");
      console.log("Admin Email:", res.rows[0].email);
      console.log("New Password:", newPassword);
      console.log("You can now login at /login\n");
    }
  } catch (err) {
    console.error("Failed to update password:", err);
  } finally {
    await pool.end();
  }
}

const argPass = process.argv[2];
if (argPass) {
  reset(argPass);
} else {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter new admin password (or press Enter for default 'adminpassword'): ", (answer) => {
    rl.close();
    const pass = answer.trim() || 'adminpassword';
    reset(pass);
  });
}
