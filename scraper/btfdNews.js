import axios from "axios";
import { load } from "cheerio";

async function fetchBtfdNews() {
  const { data } = await axios.get("https://www.btfd.io");
  const $ = load(data);
  const headlines = [];

  $("h2, h3, p").each((i, el) => {
    const text = $(el).text().trim();
    if (text.toLowerCase().includes("btfd") || text.toLowerCase().includes("launch")) {
      headlines.push(text);
    }
  });

  return headlines.slice(0, 5);
}

export default fetchBtfdNews;