import fs from "fs";
import notion from "./client.js";

async function exportDatabase(databaseId, filePath) {
  const pages = [];

  let cursor = undefined;
  do {
    const response = await notion.databases.query({
      database_id: databaseId,
      start_cursor: cursor
    });

    pages.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  const simplified = pages.map(page => ({
    name: page.properties.Name?.title?.[0]?.plain_text || "No Name",
    price: page.properties.Price?.rich_text?.[0]?.plain_text || null,
    news: page.properties.News?.rich_text?.[0]?.plain_text || null,
    status: page.properties.Status?.status?.name || null,
    created: page.created_time
  }));

  fs.writeFileSync(filePath, JSON.stringify(simplified, null, 2), "utf8");
  console.log(`📝 Exported ${simplified.length} rows to: ${filePath}`);
}

export default exportDatabase;