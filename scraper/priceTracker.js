const axios = require("axios");
require("dotenv").config();

async function fetchBtfdPrice() {
  // 1. Get ETH price from CoinGecko
  const eth = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );

  // 2. Placeholder ETH pair address on Uniswap — replace after launch
  const pairAddress = `${process.env.ETH_COIN_GECKO_ADDRESS}`; // TODO: Update after listing or make a followup to get the address
  let btfdEstPrice = null;
  let status = "Not Listed";

  try {
    const dex = await axios.get(
      `https://api.dexscreener.com/latest/dex/pairs/ethereum/${pairAddress}`
    );

    if (dex.data.pair && dex.data.pair.priceUsd) {
      btfdEstPrice = parseFloat(dex.data.pair.priceUsd);
      status = "Listed";
    }
  } catch (e) {
    console.log("⚠️ BTFD pair not live on Ethereum yet.");
  }

  return {
    ethPrice: eth.data.ethereum.usd,
    btfdEstPrice,
    status
  };
}

module.exports = fetchBtfdPrice;
