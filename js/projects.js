async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`加载失败: ${path}`);
  }
  return response.json();
}

async function initProjectsPage() {
  try {
    const projects = await loadJSON("./data/projects.json");
    const container = document.getElementById("projects-list");
    container.innerHTML = "";

    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "project-card";

      const title = document.createElement("h3");
      title.textContent = project.name;

      const desc = document.createElement("p");
      desc.textContent = project.description;

      const linksWrap = document.createElement("div");
      linksWrap.className = "project-links";

      if (project.demo) {
        const demoLink = document.createElement("a");
        demoLink.href = project.demo;
        demoLink.textContent = "在线预览";
        demoLink.className = "project-link";
        demoLink.target = "_blank";
        demoLink.rel = "noopener noreferrer";
        linksWrap.appendChild(demoLink);
      }

      if (project.github) {
        const githubLink = document.createElement("a");
        githubLink.href = project.github;
        githubLink.textContent = "GitHub";
        githubLink.className = "project-link";
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        linksWrap.appendChild(githubLink);
      }

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(linksWrap);

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
  }
}

initProjectsPage();