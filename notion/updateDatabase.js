import notion from "./client.js";

async function updateNotion(news, priceData) {
  const { ethPrice, btfdEstPrice, status } = priceData;

  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `BTFD Update - ${new Date().toLocaleString()}`
            }
          }
        ]
      },
      Status: {
        status: {
          name: status
        }
      },

      Price: {
        rich_text: [
          {
            text: {
              content: btfdEstPrice ? `$${btfdEstPrice}` : "N/A"
            }
          }
        ]
      },
      ETH: {
        rich_text: [
          {
            text: {
              content: `$${ethPrice}`
            }
          }
        ]
      },
      News: {
        rich_text: [
          {
            text: {
              content: news.join(" | ")
            }
          }
        ]
      }
    }
  });
}

export default updateNotion;