import dotenv from "dotenv";
dotenv.config();

import fetchBtfdNews from "./scraper/btfdNews.js";
import fetchBtfdPrice from "./scraper/priceTracker.js";
import status from "./scraper/priceTracker.js";
import updateNotion from "./notion/updateDatabase.js";
import exportDatabase from "./notion/exportToFile.js";
import sendEmail from "./notifier/sendEmail.js";


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

if (status === "Listed") {
  await sendEmail(
    "🚨 BTFD IS LISTED!",
    `Token is now listed at ${priceData.btfdEstPrice}. Check your tracker to sell for ROI.`
  );
}

runTracker();
setInterval(runTracker, 1000 * 60 * 30); 
