const detailContainer = document.getElementById("project-detail");

function getProjectIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderProjectDetail() {
  if (!detailContainer) return;

  const projectId = getProjectIdFromUrl();
  const project = projectsData.find(item => item.id === projectId);

  if (!project) {
    detailContainer.innerHTML = `
      <div class="detail-empty">
        <h1>未找到该项目</h1>
        <p class="muted">你访问的项目不存在，或者链接参数有误。</p>
        <a href="./projects.html" class="detail-back-btn">返回项目列表</a>
      </div>
    `;
    return;
  }

  document.title = `${project.title} - 项目详情`;

  detailContainer.innerHTML = `
    <div class="detail-top">
      <div class="detail-cover">${project.cover}</div>
      <div class="detail-head">
        <div class="article-meta detail-meta">
          <span class="article-category">${project.category}</span>
          <span class="article-date">${project.date}</span>
          <span class="article-readtime">${project.readTime}</span>
        </div>
        <h1 class="detail-title">${project.title}</h1>
        <p class="detail-subtitle">${project.subtitle}</p>
      </div>
    </div>

    <div class="detail-summary-box">
      <strong>项目摘要：</strong>
      <p>${project.summary}</p>
    </div>

    <article class="detail-content">
      ${project.content}
    </article>

    <div class="detail-footer">
      <a href="./projects.html" class="detail-back-btn">← 返回项目列表</a>
    </div>
  `;
}

renderProjectDetail();