const projectsList = document.getElementById("projects-list");

if (projectsList) {
  projectsList.innerHTML = projectsData.map(project => `
    <a class="article-item" href="./project-detail.html?id=${project.id}">
      <div class="article-cover">${project.cover}</div>
      <div class="article-content">
        <div class="article-meta">
          <span class="article-category">${project.category}</span>
          <span class="article-date">${project.date}</span>
          <span class="article-readtime">${project.readTime}</span>
        </div>
        <h2 class="article-title">${project.title}</h2>
        <p class="article-subtitle">${project.subtitle}</p>
        <p class="article-summary">${project.summary}</p>
        <div class="article-more">查看项目详情 →</div>
      </div>
    </a>
  `).join("");
}