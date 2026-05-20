async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`加载失败: ${path}`);
  }
  return response.json();
}

function renderSocialLinks(containerId, socialLinks) {
  const container = document.getElementById(containerId);
  if (!container) return;

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

function renderLinksPage(containerId, siteData) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const allLinks = [
    ...(siteData.navLinks || []),
    ...(siteData.socialLinks || [])
  ];

  container.innerHTML = "";
  allLinks.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    a.textContent = link.name;
    a.className = "link-card";
    if (link.url.startsWith("http") || link.url.startsWith("mailto:")) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    container.appendChild(a);
  });
}

async function initPage() {
  try {
    const siteData = await loadJSON("./data/site.json");

    const aboutName = document.getElementById("about-name");
    const aboutSubtitle = document.getElementById("about-subtitle");

    if (aboutName) {
      aboutName.textContent = siteData.name || "关于我";
    }

    if (aboutSubtitle) {
      aboutSubtitle.textContent = siteData.subtitle || "";
    }

    renderSocialLinks("about-social-links", siteData.socialLinks || []);
    renderLinksPage("links-page-list", siteData);
  } catch (error) {
    console.error(error);
  }
}

initPage();