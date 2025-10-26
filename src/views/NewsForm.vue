<template>
  <section class="card">
    <header class="card-header">
      <div>
        <h2>{{ isEdit ? '编辑新闻' : '发布新闻' }}</h2>
        <p class="subtitle">{{ isEdit ? '修改标题和内容并保存' : '填写标题和内容后提交' }}</p>
      </div>
      <RouterLink to="/" class="ghost-link">返回列表</RouterLink>
    </header>

    <form class="form" @submit.prevent="handleSubmit">
      <label class="form-field">
        <span>标题</span>
        <input v-model="title" type="text" placeholder="请输入新闻标题" required />
      </label>

      <label class="form-field">
        <span>内容</span>
        <textarea
          v-model="content"
          rows="8"
          placeholder="请输入新闻内容"
          required
        ></textarea>
      </label>

      <div v-if="error" class="state error">{{ error }}</div>

      <div class="form-actions">
        <button type="submit" class="primary-btn" :disabled="submitting">
          {{ submitting ? '提交中...' : isEdit ? '保存修改' : '发布新闻' }}
        </button>
        <button type="button" class="ghost-btn" @click="resetForm" :disabled="submitting">
          重置
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { createNews, getNewsById, updateNews } from '../api/newsService'

const route = useRoute()
const router = useRouter()

const title = ref('')
const content = ref('')
const error = ref('')
const submitting = ref(false)
const isEdit = computed(() => Boolean(route.params.id))

async function loadNews() {
  if (!isEdit.value) return
  submitting.value = true
  error.value = ''

  try {
    const data = await getNewsById(route.params.id)
    title.value = data.title
    content.value = data.content
  } catch (err) {
    error.value = err.message || '加载新闻失败'
  } finally {
    submitting.value = false
  }
}

async function handleSubmit() {
  submitting.value = true
  error.value = ''

  try {
    if (isEdit.value) {
      await updateNews(route.params.id, { title: title.value, content: content.value })
    } else {
      await createNews({ title: title.value, content: content.value })
    }

    router.push('/')
  } catch (err) {
    error.value = err.message || '提交失败'
  } finally {
    submitting.value = false
  }
}

function resetForm() {
  title.value = ''
  content.value = ''
  error.value = ''
}

onMounted(loadNews)
</script>

<style scoped>
.card {
  background: #fff;
  width: min(720px, 100%);
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

.ghost-link {
  color: #1d67ff;
  font-weight: 600;
  text-decoration: none;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-weight: 600;
  color: #1d2b50;
}

input,
textarea {
  border: 1px solid rgba(30, 70, 160, 0.18);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  font-family: inherit;
  resize: vertical;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #1d67ff;
  box-shadow: 0 0 0 4px rgba(29, 103, 255, 0.12);
}

.form-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-btn {
  background: #1d67ff;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 25px rgba(29, 103, 255, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn:disabled {
  cursor: progress;
  opacity: 0.7;
  box-shadow: none;
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(29, 103, 255, 0.3);
}

.ghost-btn {
  background: transparent;
  border: 1px solid rgba(29, 103, 255, 0.4);
  color: #1d67ff;
  border-radius: 10px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.ghost-btn:hover:not(:disabled) {
  background: rgba(29, 103, 255, 0.08);
}

.state.error {
  color: #d54857;
  background: #ffeef1;
  padding: 0.75rem 1rem;
  border-radius: 12px;
}

@media (max-width: 640px) {
  .card {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .form-actions {
    flex-direction: column;
  }

  .ghost-btn,
  .primary-btn {
    width: 100%;
  }
}
</style>
