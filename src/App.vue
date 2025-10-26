<template>
  <div class="app-shell">
    <header class="app-header">
      <h1 class="app-title">本地新闻管理系统</h1>
      <nav class="app-nav">
        <RouterLink to="/" class="nav-link">新闻列表</RouterLink>
        <RouterLink to="/news/new" class="nav-link">添加新闻</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: #f5f7fb;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: linear-gradient(135deg, #1d67ff, #4b9bff);
  color: #fff;
  padding: 1.5rem 2rem;
  box-shadow: 0 6px 16px rgba(0, 35, 102, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.app-title {
  font-size: 1.75rem;
  margin: 0;
}

.app-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.92);
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.22);
  color: #fff;
  transform: translateY(-1px);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.app-main {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

@media (max-width: 640px) {
  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .app-main {
    padding: 1.5rem 1rem;
  }
}
</style>
