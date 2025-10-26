# 本地新闻管理系统

基于 **Vue 3 + Vite** 的前端界面与 **Node.js + Express + mysql2** 的后端服务，实现的前后端一体化新闻管理系统。通过该项目可以完成新闻的增删改查，并实时刷新界面显示。

## 功能特性

- 新闻列表：展示新闻标题与发布时间，支持快速删除与编辑跳转。
- 新闻发布：使用表单发布新新闻，自动记录发布时间。
- 新闻编辑：支持对既有新闻的标题与内容进行修改。
- 新闻删除：从列表中直接删除新闻记录。
- RESTful 接口：后端提供标准的 `GET/POST/PUT/DELETE` 接口。

## 目录结构

```
.
├── public/                # Vite 静态资源
├── server/
│   └── index.js           # Express + mysql2 后端服务
├── src/
│   ├── api/
│   │   └── newsService.js # 前端调用 REST 接口的封装
│   ├── router/
│   │   └── index.js       # Vue Router 路由配置
│   ├── views/
│   │   ├── NewsForm.vue   # 新闻发布/编辑页面
│   │   └── NewsList.vue   # 新闻列表页面
│   ├── App.vue            # 应用根组件与基础布局
│   ├── main.js            # Vue 应用入口文件
│   └── style.css          # 全局样式
├── seed.sql               # 示例数据脚本
├── package.json
└── vite.config.js
```

## 环境准备

- Node.js 20+
- 已安装并运行的 MySQL 数据库（示例使用 `test` 数据库）

### 初始化数据库

1. 在 MySQL 中确认已存在 `test` 数据库，并执行以下建表语句：

   ```sql
   CREATE TABLE IF NOT EXISTS news (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(200),
     content TEXT,
     add_time VARCHAR(100)
   );
   ```

2. 需要示例数据时，可执行仓库根目录下的 `seed.sql` 脚本：

   ```bash
   mysql -u root -p123456 test < seed.sql
   ```

## 项目启动

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动前后端一体化开发环境：

   ```bash
   npm run dev
   ```

   该命令会并行启动：
   - Vite 前端开发服务器（默认端口 `5173`）；
   - Express 后端 API 服务（默认端口 `3000`，自动打印访问地址和数据库连接状态）。

3. 浏览器访问 `http://localhost:5173` 体验应用。

## 可用脚本

- `npm run build`：构建前端生产环境资源。
- `npm run preview`：本地预览生产环境资源。
- `npm run lint`：使用 ESLint 自动修复代码风格问题。
- `npm run format`：使用 Prettier 整理前端源文件格式。

## 接口说明

- `GET /api/news`：获取全部新闻。
- `GET /api/news/:id`：按 ID 获取单条新闻（用于编辑）。
- `POST /api/news`：添加新闻，需传入 `title` 与 `content`。
- `PUT /api/news/:id`：按 ID 更新新闻标题与内容。
- `DELETE /api/news/:id`：按 ID 删除新闻。

所有接口均返回 JSON，错误时会返回描述性消息。

## 许可证

该项目仅用于示例演示，可自由修改与扩展。
