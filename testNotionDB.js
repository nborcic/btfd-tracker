// testNotionDB.js
require("dotenv").config();
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY });

async function testDatabaseAccess() {
  try {
    const db = await notion.databases.retrieve({ database_id: process.env.NOTION_DATABASE_ID });
    console.log("✅ Success! Database title:", db.title[0]?.plain_text || "(no title)");
  } catch (error) {
    console.error("❌ Cannot access database:", error.message);
  }
}

testDatabaseAccess();
