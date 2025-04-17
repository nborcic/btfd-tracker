require("dotenv").config();
const fetchBtfdNews = require("./scraper/btfdNews");
const fetchBtfdPrice = require("./scraper/priceTracker");
const updateNotion = require("./notion/updateDatabase");
const exportDatabase = require("./notion/exportToFile");


async function runTracker() {
  try {
    const news = await fetchBtfdNews();
    const price = await fetchBtfdPrice();
    await updateNotion(news, price);

    const outputPath = "C:/Users/John Dou/Documents/btfd_snapshot.json";
    await exportDatabase(process.env.NOTION_DATABASE_ID, outputPath);
    
    console.log("✅ Notion updated at", new Date().toLocaleString());
  } catch (error) {
    console.error("❌ Error in tracker:", error.message);
  }
}

runTracker();
setInterval(runTracker, 1000 * 60 * 30); 
