<template>
  <main class="page">
    <!-- Header -->
    <section class="header">
      <div>
        <div class="name">某某</div>
        <div class="info">
          <span>
            <img class="icon" src="icons/fa-phone.svg" alt="phone" />
            (+86) 133-3333-3333
          </span>
          <span>
            <img class="icon" src="icons/fa-envelope.svg" alt="mail" />
            <a href="mailto:liming@example.com">liming@example.com</a>
          </span>
        </div>
      </div>
      <div class="photo"><img src="profile.jpg" alt="profile" /></div>
    </section>

    <!-- 教育经历 -->
    <div class="section-title">
      <img class="icon" src="icons/fa-graduation-cap.svg" alt="" /> 教育经历
    </div>
    <div class="entry">
      <div class="entry-top">
        <div class="entry-title">某某大学 · 本科</div>
        <div class="entry-right">2020.09 – 2024.06 · 深圳</div>
      </div>
      <div class="entry-sub">计算机学院 · 软件工程</div>
      <div class="entry-extra">GPA: 3.8 / 4.0 · 专业排名前 10%</div>
      <ul class="honors">
        <li>互联网+ 大学生创新创业大赛</li>
        <li>ACM-ICPC 区域赛</li>
      </ul>
    </div>

    <!-- 项目经历 -->
    <div class="section-title">
      <img class="icon" src="icons/fa-code.svg" alt="" /> 项目经历
    </div>
    <div class="project">
      <div class="project-head">
        <div class="project-title">AI 简历生成平台</div>
        <div class="project-time">2024.03 – 2024.08</div>
      </div>
      <ul>
        <li>负责前端架构设计，使用 Vue3 + Pinia 实现简历编辑与预览模块。</li>
        <li>通过接口拆分和 Tree-Shaking，将页面加载时间优化约 30%。</li>
        <li>实现基于 Puppeteer 的 PDF 导出功能，支持高分辨率排版。</li>
      </ul>
    </div>

    <!-- 工作经历 -->
    <div class="section-title">
      <img class="icon" src="icons/fa-work.svg" alt="" /> 工作经历
    </div>
    <div class="entry">
      <div class="entry-top">
        <div class="work-title">某某科技有限公司</div>
        <div class="entry-right">2024.07 – 至今 · 广州</div>
      </div>
      <div class="entry-sub">前端开发实习生</div>
      <ul>
        <li>负责前端页面搭建与交互优化，独立完成多个业务模块。</li>
        <li>引入前端埋点与性能监控方案，提升问题定位效率。</li>
      </ul>
    </div>

    <!-- 其他经历 -->
    <div class="section-title">
      <img class="icon" src="icons/fa-star.svg" alt="" /> 其他经历
    </div>
    <div class="entry">
      <div class="entry-top">
        <div class="entry-title">某某开源社区贡献者</div>
        <div class="entry-right">2023.05 – 2023.12</div>
      </div>
      <div class="entry-sub">为开源项目提交代码与文档</div>
      <ul>
        <li>优化前端组件库的文档与示例代码。</li>
        <li>修复多处跨浏览器兼容性问题。</li>
        <li>帮助社区答疑，累计贡献 30+ PR。</li>
      </ul>
    </div>

    <!-- 个人总结 -->
    <div class="section-title">
      <img class="icon" src="icons/fa-lightbulb.svg" alt="" /> 个人总结
    </div>
    <p class="summary">
      具备扎实的计算机基础与项目实践能力，专注于前端开发与性能优化，能够独立完成项目模块开发与调优。热衷开源与新技术学习，具备较强的团队协作与沟通能力。
    </p>
  </main>
</template>

<script setup>
// 当前简历为纯静态内容，如果要改成动态数据，可以在这里用 props 或响应式数据传入
</script>

<style scoped>
:root {
  --theme-color: #26267d;
  --text-main: #222;
  --text-sec: #444;
  --gray: #666;
  --page-w: 190mm;
  --page-h: 297mm;
  --margin-top: 20px;
  --margin-bottom: 24px;
  --margin-left: 24px;
  --margin-right: 24px;
}

body {
  margin: 0;
  padding: 0;
  background: #f6f7f9;
  font-family: "Noto Sans SC", "Microsoft YaHei", sans-serif;
  font-size: 12px;
  color: var(--text-sec);
}

.page {
  width: var(--page-w);
  min-height: var(--page-h);
  margin: 0 auto;
  background: #fff;
  padding: var(--margin-top) var(--margin-right) var(--margin-bottom)
    var(--margin-left);
}

/* Header */
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 16px;
}

.name {
  font-size: 24px;
  font-weight: 800;
  color: var(--theme-color);
}

.info {
  margin-top: 6px;
  color: var(--theme-color);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 12px;
}

.info a {
  color: var(--theme-color);
  text-decoration: none;
}

.icon {
  width: 14px;
  height: 14px;
  vertical-align: -2px;
  margin-right: 3px;
  filter: brightness(0) saturate(100%) invert(18%) sepia(93%) saturate(2060%)
    hue-rotate(218deg) brightness(90%) contrast(94%);
}

.photo img {
  width: 90px;
  border-radius: 6px;
}

/* Section title */
.section-title {
  font-size: 16px;
  color: var(--theme-color);
  font-weight: 700;
  margin: 16px 0 8px;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--theme-color);
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 教育/工作经历三行布局 */
.entry {
  margin: 10px 0;
}

.entry-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.entry-title {
  font-weight: 700;
  color: var(--theme-color);
}

.entry-right {
  color: var(--gray);
  font-size: 11px;
  text-align: right;
}

.entry-sub {
  margin-top: 3px;
  font-size: 12px;
  color: var(--text-sec);
}

.entry-extra {
  margin-top: 3px;
  color: var(--gray);
  font-size: 11px;
}

.honors {
  margin-top: 4px;
}

.honors li {
  list-style: disc;
  margin-left: 16px;
  font-size: 12px;
}

/* 项目经历 */
.project {
  margin: 12px 0;
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.project-title {
  font-weight: 700;
  color: var(--theme-color);
  font-size: 14px;
}

.project-time {
  color: var(--gray);
  font-size: 11px;
}

.project ul {
  margin: 4px 0 0 16px;
}

.project li {
  margin: 3px 0;
  line-height: 1.4;
  font-size: 12px;
}

/* 工作经历标题 */
.work-title {
  font-weight: 700;
  color: var(--theme-color);
  font-size: 14px;
}

/* 个人总结 */
.summary {
  margin-top: 8px;
  line-height: 1.4;
  font-size: 12px;
}
</style>
