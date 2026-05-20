async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`加载失败: ${path}`);
  }
  return response.json();
}

function getRandomItem(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function renderNavLinks(navLinks) {
  const container = document.getElementById("nav-links");
  container.innerHTML = "";

  navLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.className = "nav-btn";
    container.appendChild(a);
  });
}

function renderSocialLinks(socialLinks) {
  const container = document.getElementById("social-links");
  container.innerHTML = "";

  socialLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.className = "social-link";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    container.appendChild(a);
  });
}

async function initHomePage() {
  try {
    const [siteData, bgData, quoteData] = await Promise.all([
      loadJSON("./data/site.json"),
      loadJSON("./data/backgrounds.json"),
      loadJSON("./data/quotes.json")
    ]);

    document.title = siteData.title || "个人主页";

    document.getElementById("site-title").textContent = siteData.name || "Your Name";
    document.getElementById("site-subtitle").textContent = siteData.subtitle || "";
    document.getElementById("site-logo").src = siteData.logo || "./assets/logo.png";
    document.getElementById("site-logo").alt = siteData.name || "logo";

    const randomBg = getRandomItem(bgData);
    if (randomBg && randomBg.url) {
      document.getElementById("bg-layer").style.backgroundImage = `url('${randomBg.url}')`;
    }

    const randomQuote = getRandomItem(quoteData);
    if (randomQuote && randomQuote.text) {
      document.getElementById("random-quote").textContent = `“${randomQuote.text}”`;
    }

    renderNavLinks(siteData.navLinks || []);
    renderSocialLinks(siteData.socialLinks || []);
  } catch (error) {
    console.error(error);
    document.getElementById("random-quote").textContent = "页面加载失败，请检查本地服务是否正常。";
  }
}

initHomePage();