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

const skillsData = [
  // Agentic AI & LLMs
  { name: "OpenAI Agents SDK", category: "Agentic AI & LLMs", proficiency: 95, iconUrl: "/icons/openai.svg" },
  { name: "Claude-based Agent Development", category: "Agentic AI & LLMs", proficiency: 95, iconUrl: "/icons/anthropic.svg" },
  { name: "Prompt Engineering", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/prompt_engineering.svg" },
  { name: "Context Engineering", category: "Agentic AI & LLMs", proficiency: 85, iconUrl: "/icons/context_engineering.svg" },
  { name: "Retrieval-Augmented Generation (RAG)", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/rag.svg" },
  { name: "Google Gemini API", category: "Agentic AI & LLMs", proficiency: 90, iconUrl: "/icons/gemini.svg" },
  { name: "Cohere API", category: "Agentic AI & LLMs", proficiency: 80, iconUrl: "/icons/cohere.svg" },
  { name: "Hugging Face", category: "Agentic AI & LLMs", proficiency: 85, iconUrl: "/icons/huggingface.svg" },

  // Vector & Data
  { name: "Qdrant Cloud", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/qdrant.svg" },
  { name: "PostgreSQL (Neon)", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/neon.svg" },
  { name: "SQLite", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/sqlite.svg" },
  { name: "SQLModel", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/sqlmodel.svg" },
  { name: "SQLAlchemy", category: "Vector & Data", proficiency: 85, iconUrl: "/icons/sqlmodel.svg" },
  { name: "Pydantic", category: "Vector & Data", proficiency: 90, iconUrl: "/icons/pydantic.svg" },

  // Backend Development
  { name: "Python", category: "Backend Development", proficiency: 95, iconUrl: "/icons/python.svg" },
  { name: "FastAPI", category: "Backend Development", proficiency: 90, iconUrl: "/icons/fastapi.svg" },
  { name: "RESTful API Design", category: "Backend Development", proficiency: 90, iconUrl: "/icons/api.svg" },
  { name: "Docker", category: "Backend Development", proficiency: 80, iconUrl: "/icons/docker.svg" },

  // Frontend Development
  { name: "React", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/react.svg" },
  { name: "Next.js (App Router)", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/nextjs.svg" },
  { name: "TypeScript", category: "Frontend Development", proficiency: 90, iconUrl: "/icons/typescript.svg" },
  { name: "Redux Toolkit", category: "Frontend Development", proficiency: 85, iconUrl: "/icons/redux.svg" },
  { name: "Tailwind CSS", category: "Frontend Development", proficiency: 95, iconUrl: "/icons/tailwind.svg" },
  { name: "Leaflet", category: "Frontend Development", proficiency: 80, iconUrl: "/icons/leaflet.svg" },
  { name: "Docusaurus", category: "Frontend Development", proficiency: 80, iconUrl: "/icons/docusaurus.svg" },

  // Tools & Practices
  { name: "Git/GitHub", category: "Tools & Practices", proficiency: 95, iconUrl: "/icons/github.svg" },
  { name: "Vercel", category: "Tools & Practices", proficiency: 90, iconUrl: "/icons/vercel.svg" },
  { name: "Render", category: "Tools & Practices", proficiency: 85, iconUrl: "/icons/render.svg" },
  { name: "uv", category: "Tools & Practices", proficiency: 85, iconUrl: "/icons/uv.svg" },
  { name: "Spec-Driven Development (SDD)", category: "Tools & Practices", proficiency: 95, iconUrl: "/icons/sdd.svg" },
  { name: "Claude Code", category: "Tools & Practices", proficiency: 90, iconUrl: "/icons/claude_code.svg" },
];

async function main() {
  const dbUrl = getDbUrl();
  if (!dbUrl) {
    console.error("DATABASE_URL not found!");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: dbUrl.replace(/[\r\n\s]+/g, "").replace(/^["']|["']$/g, ""),
    ssl: { rejectUnauthorized: false },
  });

  const client = await pool.connect();
  try {
    console.log("Connected to Neon DB. Populating skills...");
    
    // Insert each skill if not already present
    for (const skill of skillsData) {
      const checkRes = await client.query('SELECT id FROM "Skill" WHERE name = $1', [skill.name]);
      if (checkRes.rows.length === 0) {
        await client.query(
          'INSERT INTO "Skill" (name, category, proficiency, "iconUrl", "createdAt") VALUES ($1, $2, $3, $4, NOW())',
          [skill.name, skill.category, skill.proficiency, skill.iconUrl]
        );
        console.log(`[+] Added: ${skill.name} (${skill.category})`);
      } else {
        await client.query(
          'UPDATE "Skill" SET category = $1, proficiency = $2, "iconUrl" = $3 WHERE name = $4',
          [skill.category, skill.proficiency, skill.iconUrl, skill.name]
        );
        console.log(`[*] Updated: ${skill.name} (${skill.category})`);
      }
    }
    console.log("Successfully synced all skills to database!");
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
