const menuIcon = document.querySelector(".Menu-bar");
const closeIcon = document.querySelector(".close-icon");
const nav = document.querySelector(".nav");
let overlay = document.querySelector(".overlay");
let colSpan = document.querySelector("#col-hidden");

menuIcon.addEventListener("click", function () {
  nav.classList.remove("-right-[270px]");
  nav.classList.add("right-0");
  menuIcon.classList.add("hidden");
  closeIcon.classList.remove("hidden");
});

closeIcon.addEventListener("click", function () {
  nav.classList.add("-right-[270px]");
  nav.classList.remove("right-0");
  menuIcon.classList.remove("hidden");
  closeIcon.classList.add("hidden");
});

function toggleCollapse() {
  colSpan.classList.toggle("hidden");

  const content = document.getElementById("myCollapse");
  if (content.classList.contains("max-h-0")) {
    content.classList.remove("max-h-0");
    content.classList.add("max-h-40"); // به اندازه دلخواه
  } else {
    content.classList.remove("max-h-40");
    content.classList.add("max-h-0");
  }
}

//   user panel script
let currentIndex = 0;
const carousel = document.getElementById("carousel-images");
const totalSlides = document.querySelectorAll("#carousel-images img").length;

function showSlide(index) {
  const width = carousel.clientWidth;
  carousel.style.transform = `translateX(-${index * width}px)`;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  showSlide(currentIndex);
}

// Automatic movement
setInterval(() => {
  nextSlide();
}, 3000); // هر ۳ ثانیه یکبار اسلاید بعدی

window.addEventListener("resize", () => showSlide(currentIndex));

function toggleAnswer(index) {
  const answer = document.getElementById(`answer-${index}`);
  const icon = document.getElementById(`icon-${index}`);
  const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px";

  // close all
  document.querySelectorAll(".accordion-content").forEach((el) => {
    el.style.maxHeight = null;
    el.classList.remove("accordion-open");
  });
  document.querySelectorAll('svg[id^="icon-"]').forEach((el) => {
    el.classList.remove("rotate-180");
  });

  // If it wasn't open, open this one.
  if (!isOpen) {
    answer.style.maxHeight = answer.scrollHeight + 50 + "px";
    answer.classList.add("h-auto");

    answer.classList.add("accordion-open");
    icon.classList.add("rotate-180");
  }
}

// typeWriter effect
const texts = [
  "معاملات آسان رمز‌ارزها",
  "امنیت بالا، تجربه ساده",
  "شروع سریع، بدون پیچیدگی",
  "مدیریت هوشمند دارایی‌های دیجیتال",
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const typewriterElement = document.getElementById("typewriter");

function type() {
  const currentText = texts[index];
  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typewriterElement.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      type();
    }, 1000);
    return;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    index = (index + 1) % texts.length;
  }

  setTimeout(type, isDeleting ? speed / 2 : speed);
}

type();

// Bitcoin current price
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
setInterval(fetchBTCFromBinance, 60000); // هر 60 ثانیه آپدیت شود

// ETH
async function fetchETHData() {
  try {
    const res = await fetch(
      "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT"
    );
    const data = await res.json();

    const price = parseFloat(data.lastPrice);
    const changePercent = parseFloat(data.priceChangePercent);

    document.getElementById("eth-price").textContent =
      price.toLocaleString("en-US");
    const changeEl = document.getElementById("eth-change");
    changeEl.textContent = changePercent.toFixed(2) + "%";
    changeEl.className = changePercent >= 0 ? "positive" : "negative";
  } catch (err) {
    console.error("خطا در دریافت اطلاعات اتریوم:", err);
    document.getElementById("eth-price").textContent = "خطا";
    document.getElementById("eth-change").textContent = "خطا";
  }
}

fetchETHData();
setInterval(fetchETHData, 60000); // هر 60 ثانیه آپدیت شود

// USDT

// xrp
