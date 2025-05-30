async function fetchBTCFromBinance() {
  try {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT"
    );
    const data = await res.json();

    const price = parseFloat(data.lastPrice);
    const changePercent = parseFloat(data.priceChangePercent);

    document.getElementById("btc-price").textContent =
      price.toLocaleString("en-US");
    const changeEl = document.getElementById("btc-change");
    changeEl.textContent = changePercent.toFixed(2) + "%";
    changeEl.className = changePercent >= 0 ? "positive" : "negative";
  } catch (err) {
    console.error("خطا در دریافت اطلاعات از Binance:", err);
    document.getElementById("btc-price").textContent = "خطا";
    document.getElementById("btc-change").textContent = "خطا";
  }
}

fetchBTCFromBinance();
setInterval(fetchBTCFromBinance, 60000);

// part sell/buy menu

const btcMenu = document.querySelector("#menu-btc");
const btn = document.querySelector("#btn-open");
const arrowBtn = document.querySelector("#arrow");

btn.addEventListener("click", function () {
  btcMenu.classList.toggle("hidden");
  arrowBtn.classList.toggle("rotate-180");
});

//
const url = "https://api.navasan.net/v1/rates/BTC/IRR";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (data.success) {
      const priceInRial = data.data.price;
      const priceInToman = priceInRial / 10;
      const formattedPrice = priceInToman.toLocaleString("fa-IR");
      document.getElementById("btc-price").textContent =
        formattedPrice + " تومان";
    } else {
      document.getElementById("btc-price").textContent = "خطا در دریافت قیمت";
    }
  })
  .catch(() => {
    document.getElementById("btc-price").textContent = "خطا در ارتباط با سرور";
  });

//   .....
async function fetchMarketRank() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false"
    );
    const data = await res.json();
    const rank = data.market_cap_rank;
    document.getElementById("btc-rank").textContent = `#${rank}`;
  } catch (error) {
    document.getElementById("btc-rank").textContent = "خطا!";
    console.error("Error fetching rank:", error);
  }
}

fetchMarketRank();
setInterval(fetchMarketRank, 60000);

// معاملات روزانه
async function fetchDailyVolume() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&market_data=true"
    );
    const data = await res.json();
    const volumeUSD = data.market_data.total_volume.usd;
    const volumeBillion = (volumeUSD / 1_000_000_000).toFixed(2); // میلیارد دلار
    document.getElementById("btc-volume").textContent = `${Number(
      volumeBillion
    ).toLocaleString("en-US")} `;
  } catch (error) {
    document.getElementById("btc-volume").textContent = "خطا!";
    console.error("Error fetching volume:", error);
  }
}

fetchDailyVolume();
setInterval(fetchDailyVolume, 60000);
// ارزش بازار بیت کوین
async function fetchMarketCap() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin?localization=false&market_data=true"
    );
    const data = await res.json();
    const marketCapUSD = data.market_data.market_cap.usd;
    const marketCapTrillion = (marketCapUSD / 1_000_000_000_000).toFixed(3); // تریلیارد دلار (Trillion)
    document.getElementById("btc-marketcap").textContent = `${Number(
      marketCapTrillion
    ).toLocaleString("en-US")} `;
  } catch (error) {
    document.getElementById("btc-marketcap").textContent = "خطا!";
    console.error("Error fetching market cap:", error);
  }
}

fetchMarketCap();
setInterval(fetchMarketCap, 60000);

// تغییرات یک روزه بیت کوین
async function fetchBitcoinChange() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );
    const data = await res.json();
    const change = data.bitcoin.usd_24h_change.toFixed(2);

    const changeEl = document.getElementById("change");
    changeEl.textContent = `${change}%`;

    changeEl.classList.remove(
      "text-blue-600",
      "text-green-600",
      "text-red-600"
    );
    changeEl.classList.add(change >= 0 ? "text-green-600" : "text-red-600");
  } catch (error) {
    document.getElementById("change").textContent = "خطا در دریافت داده";
  }
}

fetchBitcoinChange();
// کوین در گردش
async function fetchCirculatingSupply() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin");
    const data = await res.json();
    const supply = data.market_data.circulating_supply;

    // نمایش عدد با کاما برای خوانایی بهتر
    const formattedSupply = supply.toLocaleString("en-US");

    document.getElementById("circulating").textContent =
      formattedSupply + " BTC";
  } catch (error) {
    document.getElementById("circulating").textContent = "خطا در دریافت داده";
  }
}

fetchCirculatingSupply();
// بالا ترین قیمت دیروز بیت کوین
async function fetchBitcoinHighPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1685404800&to=1685491200"
    );
    const data = await res.json();
    const highPrice = data.prices.reduce(
      (max, price) => (price[1] > max ? price[1] : max),
      0
    );
    const formattedPrice = highPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    document.getElementById("high-price").textContent = formattedPrice;
  } catch (error) {
    document.getElementById("high-price").textContent = "خطا در دریافت داده";
  }
}

fetchBitcoinHighPrice();
// پایین ترین قیمت دیروز بیت کوین
async function fetchBitcoinLowPrice() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1685404800&to=1685491200"
    );
    const data = await res.json();
    const lowPrice = data.prices.reduce(
      (min, price) => (price[1] < min ? price[1] : min),
      Infinity
    );
    const formattedPrice = lowPrice.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    document.getElementById("low-price").textContent = formattedPrice;
  } catch (error) {
    document.getElementById("low-price").textContent = "خطا در دریافت داده";
  }
}

fetchBitcoinLowPrice();
// سهم بازار
async function fetchBitcoinMarketShare() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/global");
    const data = await res.json();
    const btcMarketShare = data.data.market_cap_percentage.btc;

    document.getElementById("btc-market-share").textContent =
      btcMarketShare.toFixed(2) + " %";
  } catch (error) {
    document.getElementById("btc-market-share").textContent =
      "خطا در دریافت داده";
  }
}

fetchBitcoinMarketShare();
