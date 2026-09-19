const fs = require("fs");
const path = require("path");

const iconsDir = path.join(__dirname, "..", "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

const icons = {
  "gemini.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1BA1E3"/><stop offset="50%" stop-color="#5472E4"/><stop offset="100%" stop-color="#9C52E0"/></linearGradient></defs><path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#gemini-grad)"/></svg>`,

  "huggingface.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#FFD21E"/><ellipse cx="8.5" cy="10" rx="1.5" ry="2" fill="#000"/><ellipse cx="15.5" cy="10" rx="1.5" ry="2" fill="#000"/><path d="M7 14C8.5 17 15.5 17 17 14" stroke="#000" stroke-width="1.8" stroke-linecap="round"/><path d="M3 13C3.5 10.5 5 11 5.5 12" stroke="#FF9D00" stroke-width="1.5" stroke-linecap="round"/><path d="M21 13C20.5 10.5 19 11 18.5 12" stroke="#FF9D00" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  "cohere.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#39594C"/><path d="M12 6C8.686 6 6 8.686 6 12C6 15.314 8.686 18 12 18C15.314 18 18 15.314 18 12" stroke="#D18EE2" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="12" r="2.5" fill="#FF7759"/></svg>`,

  "rag.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#6366F1"/><path d="M7 6H15M7 10H13M7 14H11" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="15" cy="14" r="3.5" stroke="white" stroke-width="1.5"/><path d="M17.5 16.5L20 19" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  "prompt_engineering.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0EA5E9"/><path d="M7 8L11 12L7 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 16H18" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M17 6L18 8L20 9L18 10L17 12L16 10L14 9L16 8L17 6Z" fill="#FDE047"/></svg>`,

  "context_engineering.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#8B5CF6"/><rect x="5" y="6" width="14" height="12" rx="2" stroke="white" stroke-width="1.5"/><path d="M8 9H16M8 12H13" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="16" cy="13" r="1.5" fill="#34D399"/></svg>`,

  "qdrant.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#DC2626"/><path d="M12 4L19 8V16L12 20L5 16V8L12 4Z" stroke="white" stroke-width="1.5"/><path d="M12 12L19 8M12 12L5 8M12 12V20" stroke="white" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" fill="#60A5FA"/></svg>`,

  "neon.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#00E599"/><path d="M12 5L6 18H18L12 5Z" fill="#0A0D0F"/><path d="M12 9L8 16H16L12 9Z" fill="#00E599"/></svg>`,

  "postgresql.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#336791"/><path d="M12 6C9.5 6 7.5 8 7.5 10.5C7.5 13 8.5 14.5 9.5 16C10 16.8 10.5 18 12 18C13.5 18 14 16.8 14.5 16C15.5 14.5 16.5 13 16.5 10.5C16.5 8 14.5 6 12 6Z" fill="white"/><circle cx="10" cy="10" r="1" fill="#336791"/><circle cx="14" cy="10" r="1" fill="#336791"/></svg>`,

  "sqlite.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#003B57"/><path d="M6 18C8 14 11 8 18 6C15 10 14 14 11 18C9.5 18 7.5 18 6 18Z" fill="#00A9E0"/><path d="M9 16C12 11 15 8 18 6" stroke="white" stroke-width="1"/></svg>`,

  "sqlmodel.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#D71E00"/><path d="M7 7C7 5.5 9 5 12 5C15 5 17 5.5 17 7C17 8.5 15 9 12 9C9 9 7 8.5 7 7Z" stroke="white" stroke-width="1.5"/><path d="M7 12C7 10.5 9 10 12 10C15 10 17 10.5 17 12C17 13.5 15 14 12 14C9 14 7 13.5 7 12Z" stroke="white" stroke-width="1.5"/><path d="M7 17C7 15.5 9 15 12 15C15 15 17 15.5 17 17C17 18.5 15 19 12 19C9 19 7 18.5 7 17Z" stroke="white" stroke-width="1.5"/><path d="M7 7V17M17 7V17" stroke="white" stroke-width="1.5"/></svg>`,

  "pydantic.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#E92063"/><path d="M6 7H14C16.2 7 18 8.8 18 11C18 13.2 16.2 15 14 15H9V19H6V7Z" fill="white"/></svg>`,

  "fastapi.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#009688"/><path d="M13 3L6 13H12L11 21L18 11H12L13 3Z" fill="white"/></svg>`,

  "api.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#3B82F6"/><circle cx="7" cy="12" r="2.5" fill="white"/><circle cx="17" cy="8" r="2.5" fill="white"/><circle cx="17" cy="16" r="2.5" fill="white"/><path d="M9.5 11L14.5 9M9.5 13L14.5 15" stroke="white" stroke-width="1.5"/></svg>`,

  "docker.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#2496ED"/><rect x="6" y="9" width="2" height="2" fill="white"/><rect x="9" y="9" width="2" height="2" fill="white"/><rect x="12" y="9" width="2" height="2" fill="white"/><rect x="9" y="6" width="2" height="2" fill="white"/><rect x="12" y="6" width="2" height="2" fill="white"/><rect x="15" y="9" width="2" height="2" fill="white"/><path d="M4 12C5 15 8 16 14 16C18 16 19 14 19 13.5C18 13.5 17 13.5 16 13C15 12 15 11 16 10C14 10 12 12 4 12Z" fill="white"/></svg>`,

  "react.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#20232A"/><circle cx="12" cy="12" r="2" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1.2" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1.2" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="8" ry="3" stroke="#61DAFB" stroke-width="1.2" transform="rotate(150 12 12)"/></svg>`,

  "nextjs.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="black"/><path d="M8 8V16M16 8V13M8 8L16 16" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>`,

  "typescript.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M10 8H6V10H7V16H9V10H10V8ZM16.5 10.5C16.5 9.5 15.5 8.5 14 8.5C12.5 8.5 11.5 9.5 11.5 10.5C11.5 12.5 16.5 11.8 16.5 14C16.5 15.5 15.2 16 14 16C12.2 16 11.5 15 11.5 14H13C13 14.5 13.5 15 14 15C14.5 15 15 14.8 15 14C15 12 10 12.5 10 10.5C10 9 11.2 8.5 12.5 8.5C13.8 8.5 15 9 15 10.5H16.5Z" fill="white"/></svg>`,

  "redux.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#764ABC"/><circle cx="12" cy="7" r="2" fill="white"/><circle cx="7.5" cy="15" r="2" fill="white"/><circle cx="16.5" cy="15" r="2" fill="white"/><path d="M12 9C12 13 8 13 8 15M12 9C12 13 16 13 16 15" stroke="white" stroke-width="1.2"/></svg>`,

  "tailwind.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#0F172A"/><path d="M7 11C7.8 7.8 9.8 7 13 7C16.2 7 17.4 8.6 18.2 11C19 13.4 20.2 15 23 15C20.6 15 19.4 13.4 18.6 11C17.8 8.6 16.6 7 13.8 7M1 17C1.8 13.8 3.8 13 7 13C10.2 13 11.4 14.6 12.2 17C13 19.4 14.2 21 17 21C14.6 21 13.4 19.4 12.6 17C11.8 14.6 10.6 13 7.8 13" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/></svg>`,

  "leaflet.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#199900"/><path d="M6 18C6 18 7 9 15 6C15 6 17 15 9 18C7.5 18 6 18 6 18Z" fill="white"/><path d="M6 18C10 14 13 10 15 6" stroke="#199900" stroke-width="1.2"/></svg>`,

  "docusaurus.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#3ECC5F"/><circle cx="10" cy="11" r="5" fill="#25C2A0"/><circle cx="8.5" cy="10" r="1" fill="white"/><circle cx="8.5" cy="10" r="0.5" fill="black"/><path d="M12 16L14 19M8 16L6 19M15 13C17 13 19 14 19 16" stroke="white" stroke-width="1.2" stroke-linecap="round"/></svg>`,

  "git.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#F05032"/><path d="M17.5 11.5L12.5 6.5C12.1 6.1 11.5 6.1 11.1 6.5L6.5 11.1C6.1 11.5 6.1 12.1 6.5 12.5L11.5 17.5C11.9 17.9 12.5 17.9 12.9 17.5L17.5 12.9C17.9 12.5 17.9 11.9 17.5 11.5Z" fill="white"/><circle cx="10" cy="12" r="1.2" fill="#F05032"/><circle cx="14" cy="12" r="1.2" fill="#F05032"/></svg>`,

  "github.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#181717"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.39 10.01 17.72C8 18.09 7.46 17.21 7.3 16.76C7.21 16.53 6.82 15.83 6.48 15.64C6.2 15.49 5.8 15.12 6.47 15.11C7.1 15.1 7.55 15.69 7.7 15.93C8.42 17.15 9.58 16.81 10.04 16.6C10.11 16.08 10.32 15.72 10.55 15.52C8.77 15.32 6.91 14.63 6.91 11.57C6.91 10.7 7.22 9.98 7.73 9.42C7.65 9.22 7.37 8.39 7.81 7.29C7.81 7.29 8.48 7.08 10.02 8.12C10.66 7.94 11.34 7.85 12.02 7.85C12.7 7.85 13.38 7.94 14.02 8.12C15.56 7.07 16.23 7.29 16.23 7.29C16.67 8.39 16.39 9.22 16.31 9.42C16.82 9.98 17.13 10.69 17.13 11.57C17.13 14.64 15.26 15.32 13.48 15.52C13.77 15.77 14.02 16.25 14.02 17C14.02 18.08 14.01 18.95 14.01 19.21C14.01 19.42 14.16 19.67 14.56 19.59C17.71 18.53 20 15.53 20 12C20 7.58 16.42 4 12 4Z" fill="white"/></svg>`,

  "vercel.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="black"/><path d="M12 6L18 16.5H6L12 6Z" fill="white"/></svg>`,

  "render.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#46E3B7"/><path d="M7 6H13C15.2 6 17 7.8 17 10C17 12.2 15.2 14 13 14H10V18H7V6ZM10 9V11.5H12.5C13.2 11.5 13.8 10.9 13.8 10.2C13.8 9.5 13.2 9 12.5 9H10Z" fill="#12181B"/><path d="M13 14L17 18H14L11 14" stroke="#12181B" stroke-width="1.5"/></svg>`,

  "uv.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#DE5FE9"/><path d="M7 8V12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12V8" stroke="white" stroke-width="2.2" stroke-linecap="round"/></svg>`,

  "sdd.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#6366F1"/><rect x="6" y="5" width="12" height="14" rx="2" stroke="white" stroke-width="1.5"/><path d="M9 9H15M9 12H15M9 15H12" stroke="white" stroke-width="1.5" stroke-linecap="round"/><circle cx="15" cy="15" r="1.5" fill="#10B981"/></svg>`,

  "claude_code.svg": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="6" fill="#D97757"/><path d="M7 9L10 12L7 15" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15H17" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`
};

for (const [filename, content] of Object.entries(icons)) {
  fs.writeFileSync(path.join(iconsDir, filename), content.trim(), "utf8");
  console.log("Created: " + filename);
}

console.log("SUCCESS: All icons generated in public/icons/");
