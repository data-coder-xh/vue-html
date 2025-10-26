<template>
  <main class="page">
    <!-- 个人信息 -->
    <div class="section">
      <section class="header">
        <div>
          <div class="name">{{ personal.name }}</div>
          <div class="info">
            <span>
              <img class="icon" src="/icons/fa-phone.svg" alt="phone" />
              {{ personal.phone }}
            </span>
            <span>
              <img class="icon" src="/icons/fa-envelope.svg" alt="mail" />
              <a :href="`mailto:${personal.email}`">{{ personal.email }}</a>
            </span>
          </div>
        </div>
        <div class="photo">
          <img src="/profile.jpg" alt="profile" />
        </div>
      </section>
    </div>

    <!-- 教育经历 -->
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-graduation-cap.svg" alt="" /> 教育经历
      </div>
      <div class="entry" v-for="(edu, i) in education" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ edu.school }} · {{ edu.degree }}</div>
          <div class="entry-right">{{ edu.time }} · {{ edu.city }}</div>
        </div>
        <div class="entry-sub">{{ edu.college }} · {{ edu.major }}</div>
        <div class="entry-extra">{{ edu.extra }}</div>
        <div class="honors">
          {{ edu.honors }}
        </div>
      </div>
    </div>

    <!-- 项目经历 -->
    <div class="section">
      <div class="section-title with-add-btn">
        <img class="icon" src="/icons/fa-code.svg" alt="" /> 项目经历
        <span class="add-btn">+</span>
      </div>
      <div class="entry" v-for="(proj, i) in projects" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ proj.title }}</div>
          <div class="entry-right">{{ proj.time }}</div>
        </div>
          <!-- 操作按钮区 -->
         <div class="entry-actions">
          <button class="action-btn">编辑</button>
          <button class="action-btn">AI对话</button>
          <button class="action-btn delete">删除</button>
        </div>
        <ul>
          <li v-for="(p, j) in proj.points" :key="j">
            <span class="point-title">{{ p.title }}：</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 工作经历 -->
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-work.svg" alt="" /> 工作经历
      </div>
      <div class="entry" v-for="(work, i) in workExp" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ work.company }}</div>
          <div class="entry-right">{{ work.time }} · {{ work.city }}</div>
        </div>
        <div class="entry-sub">{{ work.role }}</div>
        <ul>
          <li v-for="(p, j) in work.points" :key="j">
            <span class="point-title">{{ p.title }}：</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 其他经历 -->
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-star.svg" alt="" /> 其他经历
      </div>
      <div class="entry" v-for="(other, i) in others" :key="i">
        <div class="entry-top">
          <div class="entry-title">{{ other.title }}</div>
          <div class="entry-right">{{ other.time }}</div>
        </div>
        <div class="entry-sub">{{ other.sub }}</div>
        <ul>
          <li v-for="(p, j) in other.points" :key="j">
            <span class="point-title">{{ p.title }}：</span>
            <span class="point-content">{{ p.content }}</span>
          </li>
        </ul>
      </div>
    </div>
<!-- 其他 -->
<div class="section">
  <div class="section-title">
    <img class="icon" src="/icons/fa-star.svg" alt="" /> 其他
  </div>
  <!-- 新增 entry 容器 -->
  <div class="entry">
    <div class="other-item">
      <div class="other-label">技能</div>
      <div class="other-content">{{ othersInfo.skills }}</div>
    </div>
    <div class="other-item">
      <div class="other-label">证书 / 执照</div>
      <div class="other-content">{{ othersInfo.certificates }}</div>
    </div>
    <div class="other-item">
      <div class="other-label">语言</div>
      <div class="other-content">{{ othersInfo.languages }}</div>
    </div>
    <div class="other-item">
      <div class="other-label">兴趣爱好</div>
      <div class="other-content">{{ othersInfo.hobbies }}</div>
    </div>
  </div>
</div>



    <!-- 个人总结 -->
    <div class="section">
      <div class="section-title">
        <img class="icon" src="/icons/fa-lightbulb.svg" alt="" /> 个人总结
      </div>
      <div class="summary">{{ summary }}</div>
    </div>
  </main>
</template>

<script>
export default {
  name: "ResumePage",
  data() {
    return {
      personal: {
        name: "某某",
        phone: "(+86) 133-3333-3333",
        email: "liming@example.com"
      },
      education: [
        {
          school: "某某大学",
          degree: "本科",
          college: "计算机学院",
          major: "软件工程",
          time: "2020.09 – 2024.06",
          city: "深圳",
          extra: "GPA: 3.8 / 4.0 · 专业排名前 10%",
          honors: "互联网+ 大学生创新创业大赛 ACM-ICPC 区域赛"
        },
        {
          school: "另一所大学",
          degree: "硕士",
          college: "信息学院",
          major: "人工智能",
          time: "2024.09 – 至今",
          city: "广州",
          extra: "奖学金获得者",
          honors: "优秀研究生奖学金 发表论文 2 篇"
        }
      ],
      projects: [
        {
          title: "AI 简历生成平台",
          time: "2024.03 – 2024.08",
          points: [
            {
              title: "前端架构设计",
              content: "负责前端架构设计，使用 Vue3 + Pinia 实现简历编辑与预览模块。"
            },
            {
              title: "性能优化",
              content: "通过接口拆分和 Tree-Shaking，将页面加载时间优化约 30%。"
            },
            {
              title: "PDF 导出功能",
              content: "实现基于 Puppeteer 的 PDF 导出功能，支持高分辨率排版。"
            }
          ]
        },
        {
          title: "流程管理系统",
          time: "2025.01 – 2025.03",
          points: [
            {
              title: "可视化流程设计器",
              content: "实现可视化流程设计器，支持节点拖拽与连线。"
            },
            {
              title: "动态权限控制",
              content: "基于 Vue Router 动态权限控制，实现用户分级管理。"
            }
          ]
        }
      ],
      workExp: [
        {
          company: "某某科技有限公司",
          role: "前端开发实习生",
          time: "2024.07 – 至今",
          city: "广州",
          points: [
            {
              title: "前端页面搭建",
              content: "负责前端页面搭建与交互优化，独立完成多个业务模块。"
            },
            {
              title: "性能监控",
              content: "引入前端埋点与性能监控方案，提升问题定位效率。"
            }
          ]
        },
        {
          company: "另一家公司",
          role: "前端工程师",
          time: "2023.01 – 2023.12",
          city: "深圳",
          points: [
            {
              title: "内部管理系统",
              content: "负责内部管理系统的开发与维护。"
            },
            {
              title: "代码 ESM 化",
              content: "推动代码 ESM 化，提升构建性能。"
            }
          ]
        }
      ],
      others: [
        {
          title: "某某开源社区贡献者",
          sub: "为开源项目提交代码与文档",
          time: "2023.05 – 2023.12",
          points: [
            {
              title: "优化文档",
              content: "优化前端组件库的文档与示例代码"
            },
            {
              title: "修复兼容性问题",
              content: "修复多处跨浏览器兼容性问题"
            }
          ]
        },
        {
          title: "校园技术社团成员",
          sub: "组织技术分享活动",
          time: "2022.09 – 2023.06",
          points: [
            {
              title: "主讲 Vue3 新特性",
              content: "主讲 Vue3 新特性，组织技术分享活动。"
            },
            {
              title: "组织 Hackathon 比赛",
              content: "组织 Hackathon 比赛，邀请开发者参与。"
            }
          ]
        }
      ],
      summary:
        "具备扎实的计算机基础与项目实践能力，专注于前端开发与性能优化，能够独立完成项目模块开发与调优。热衷开源与新技术学习，具备较强的团队协作与沟通能力。",
      othersInfo: {
        skills: "Vue3, React, Node.js, Express, MongoDB, MySQL, Git",
        certificates: "CCNA, AWS Certified Solutions Architect",
        languages: "中文（母语）, 英文（流利）, 日文（基础）",
        hobbies: "旅游, 运动（足球, 篮球）, 阅读"
      }
    };
  }
};
</script>

<style scoped>
.page {
  width: 453px;
  margin: 0 auto;
  background: #fff;
  padding: 20px 24px;

  --theme-color: var(--color-cv-gray);
  --theme-filter: var(--filter-gray);
  --text-main: #222;
  --text-sec: #444;
  --gray: #666;

  --font-name: 24px;
  --font-title: 16px;
  --font-desc: 12px;
  --font-meta: 11px;

  --filter-red: invert(43%) sepia(15%) saturate(2127%) hue-rotate(345deg) brightness(95%) contrast(92%);
  --filter-blue: invert(41%) sepia(94%) saturate(7486%) hue-rotate(183deg) brightness(92%) contrast(96%);
  --filter-gray: invert(16%) sepia(8%) saturate(237%) hue-rotate(169deg) brightness(90%) contrast(90%);

  --color-cv-red: #d97757;;
  --color-cv-blue: #4183ff;
  --color-cv-gray: #404040;
}

/* 模块外层 */
.section {
  display: flow-root; /* 独立排版上下文 */
}

/* Header */
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
}

.name {
  font-size: var(--font-name);
  font-weight: 800;
  color: var(--theme-color);
  margin-bottom: 10px;
}

.info {
  color: var(--theme-color);
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: var(--font-meta);
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
  filter: var(--theme-filter);
}

.photo img {
  width: 90px;
  border-radius: 6px;
}

/* 模块标题 */
::v-deep(.section-title) {
  font-size: var(--font-title);
  color: var(--theme-color);
  font-weight: 700;
  padding-bottom: 4px;
  border-bottom: 2px solid var(--theme-color);
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px; /* 标题与内容距离 */
}

/* 经历条目 */
.entry {
  position: relative; /* 让按钮能定位在右上角 */
  margin-bottom: 10px; /* 间距由条目撑开 */
}
.entry-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.entry-title {
  font-weight: 700;
  color: var(--theme-color);
  font-size: var(--font-title);
}
.entry-right {
  color: var(--gray);
  font-size: var(--font-meta);
  text-align: right;
}
.entry-sub {
  font-size: var(--font-meta);
  color: var(--text-sec);
  line-height: 2.0;
}
.entry-extra {
  line-height: 1.0;
  color: var(--gray);
  font-size: var(--font-meta);
}
.entry li {
  margin-left: 0; /* 确保 li 本身不再往里缩 */
  line-height: 1.4;
  font-size: var(--font-desc);
}
.entry ul {
  padding-left: 20px; /* 保持 ul 内边距 */
  margin: 0;
}
.honors {
  font-size: var(--font-desc);
  line-height: 2.0;
}

/* 个人总结 */
.summary {
  line-height: 1.4;
  font-size: var(--font-desc);
}

.point-title {
  font-weight: 600;
  color: var(--theme-color);
  margin-right: 4px;
  font-size: var(--font-desc);
}

.point-content {
  color: var(--text-sec);
  font-size: var(--font-desc);
}

.entry-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.entry:hover .entry-actions {
  opacity: 1;
}

.action-btn {
  background: var(--theme-color);
  color: #fff;
  border: none;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  cursor: pointer;
}

.action-btn:hover {
  background: #444da7; /* hover 时稍微变浅 */
}

.action-btn.delete {
  background: #d9534f; /* 删除按钮红色 */
}

.action-btn.delete:hover {
  background: #c9302c;
}

/* 高亮选中样式（更精致） */
.entry.highlighttitle {
  position: relative;
  border-radius: 8px;
  background: linear-gradient(90deg, rgba(38,38,125,0.08), #fff);
  box-shadow: inset 0 0 6px rgba(38,38,125,0.15),
              0 2px 6px rgba(0,0,0,0.06);
  transition: all 0.25s ease;
  padding: 6px 10px;
}

/* 左侧主题条 */
.entry.highlighttitle::before {
  content: "";
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: -4px;
  width: 4px;
  border-radius: 2px;
  background: linear-gradient(to bottom, var(--theme-color), #4a4ad8);
}

/* hover 状态让它更有动效 */
.entry.highlighttitle:hover {
  box-shadow: inset 0 0 8px rgba(38,38,125,0.2),
              0 4px 10px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}

/* 通用标题容器：保持标题靠左，右侧预留空间给 + 号 */
.with-add-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 不再拉开两端，标题靠左 */
  padding-right: 24px;         /* 预留右侧空间，避免文字与 + 重叠 */
}

/* 默认隐藏的 + 按钮：绝对定位到标题右侧，垂直居中 */
.with-add-btn .add-btn {
  position: absolute;
  left: 100px;                /* 离右边留点空隙 */
  top: 40%;                  /* 垂直居中基准 */
  transform: translateY(-50%); /* 精准垂直居中 */
  font-size: 16px;
  font-weight: bold;
  color: var(--theme-color);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  line-height: 1;
}

/* 悬停标题时显示 +，轻微放大 */
.with-add-btn:hover .add-btn {
  opacity: 1;
  transform: translateY(-50%) scale(1.2);
}

.summary {
  line-height: 1.6;
  font-size: var(--font-desc);
  color: var(--text-sec);
  white-space: pre-wrap; /* 保留换行和空格，适合多段总结 */
}

/* 其他模块整体条目 */
.other-item {
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

/* 左侧小标签 */
.other-label {
  min-width: 72px;
  font-weight: 700;
  color: var(--theme-color);
  font-size: var(--font-meta);
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(65, 131, 255, 0.1); /* 浅蓝底作为区分 */
  text-align: center;
}

/* 右侧内容 */
.other-content {
  flex: 1;
  font-size: var(--font-desc);
  color: var(--text-sec);
  line-height: 1.6;
  word-break: break-word; /* 防止长词溢出 */
}

</style>
