<template>
  <section class="card">
    <header class="card-header">
      <div>
        <h2>新闻列表</h2>
        <p class="subtitle">查看、编辑或删除现有新闻</p>
      </div>
      <RouterLink to="/news/new" class="primary-btn">+ 添加新闻</RouterLink>
    </header>

    <div v-if="loading" class="state">正在加载新闻...</div>
    <div v-else-if="error" class="state error">{{ error }}</div>
    <div v-else-if="newsList.length === 0" class="state">还没有新闻，请先添加一条吧。</div>

    <ul v-else class="news-list">
      <li v-for="item in newsList" :key="item.id" class="news-item">
        <div class="news-body">
          <RouterLink :to="`/news/${item.id}`" class="news-title">{{ item.title }}</RouterLink>
          <time class="news-time">{{ item.add_time }}</time>
        </div>
        <button class="ghost-btn" @click="handleDelete(item.id)">删除</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { deleteNews, getNewsList } from '../api/newsService'

const newsList = ref([])
const loading = ref(false)
const error = ref('')

async function fetchNews() {
  loading.value = true
  error.value = ''
  try {
    newsList.value = await getNewsList()
  } catch (err) {
    error.value = err.message || '加载失败'
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  if (!confirm('确定要删除这条新闻吗？')) return

  try {
    await deleteNews(id)
    newsList.value = newsList.value.filter((item) => item.id !== id)
  } catch (err) {
    error.value = err.message || '删除失败'
  }
}

onMounted(fetchNews)
</script>

<style scoped>
.card {
  background: #fff;
  width: min(960px, 100%);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 20px 45px rgba(43, 72, 142, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.card-header h2 {
  margin: 0 0 0.25rem;
  font-size: 1.5rem;
}

.subtitle {
  margin: 0;
  color: #5c6780;
}

.primary-btn {
  background: #1d67ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 12px 25px rgba(29, 103, 255, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(29, 103, 255, 0.3);
}

.state {
  text-align: center;
  color: #5c6780;
  padding: 1rem;
  background: #f6f8ff;
  border-radius: 12px;
}

.state.error {
  color: #d54857;
  background: #ffeef1;
}

.news-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-radius: 14px;
  background: #f7f9ff;
  border: 1px solid rgba(79, 123, 255, 0.08);
  box-shadow: 0 10px 24px rgba(43, 72, 142, 0.08);
}

.news-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 30px rgba(43, 72, 142, 0.12);
}

.news-body {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.news-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d2b50;
  text-decoration: none;
}

.news-title:hover {
  color: #1d67ff;
}

.news-time {
  font-size: 0.85rem;
  color: #6c7895;
}

.ghost-btn {
  background: transparent;
  border: 1px solid rgba(255, 66, 66, 0.3);
  color: #ff4242;
  border-radius: 10px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.ghost-btn:hover {
  background: rgba(255, 66, 66, 0.08);
}

@media (max-width: 640px) {
  .card {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .news-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .ghost-btn {
    align-self: stretch;
    text-align: center;
  }
}
</style>
