<!-- FormBasic.vue -->
<template>
  <form @submit.prevent="onSubmit" novalidate class="form">
    <div class="field">
      <label>用户名</label>
      <input
        v-model.trim="form.username"
        @blur="touch('username')"
        type="text"
        placeholder="请输入用户名"
      />
      <p v-if="touched.username && errors.username" class="err">{{ errors.username }}</p>
    </div>

    <div class="field">
      <label>邮箱</label>
      <input
        v-model.trim="form.email"
        @blur="touch('email')"
        type="email"
        placeholder="name@example.com"
      />
      <p v-if="touched.email && errors.email" class="err">{{ errors.email }}</p>
    </div>

    <div class="field">
      <label>密码</label>
      <input
        v-model.trim="form.password"
        @blur="touch('password')"
        type="password"
        placeholder="至少 6 位"
      />
      <p v-if="touched.password && errors.password" class="err">{{ errors.password }}</p>
    </div>

    <button :disabled="!isValid" type="submit">提交</button>
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

// 表单状态
const form = reactive({
  username: '',
  email: '',
  password: ''
})

// 失焦标记（控制仅在触碰过的字段显示报错）
const touched = reactive({
  username: false,
  email: false,
  password: false
})

function touch(key) {
  touched[key] = true
}

// 规则（最简单的纯 JS 逻辑）
function validateUsername(v) {
  if (!v) return '用户名必填'
  if (v.length < 2) return '至少 2 个字符'
  return ''
}
function validateEmail(v) {
  if (!v) return '邮箱必填'
  // 简易邮箱校验
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  if (!ok) return '邮箱格式不正确'
  return ''
}
function validatePassword(v) {
  if (!v) return '密码必填'
  if (v.length < 6) return '至少 6 位'
  return ''
}

// 汇总错误
const errors = computed(() => ({
  username: validateUsername(form.username),
  email: validateEmail(form.email),
  password: validatePassword(form.password)
}))

// 整体是否可提交
const isValid = computed(() => !errors.value.username && !errors.value.email && !errors.value.password)

function onSubmit() {
  // 提交前，强制触碰所有字段以显示错误
  Object.keys(touched).forEach(k => (touched[k] = true))
  if (!isValid.value) return

  // 通过校验 → 执行提交逻辑
  alert('提交成功：' + JSON.stringify(form))
}
</script>

<style scoped>
.form { max-width: 360px; display: grid; gap: 12px; }
.field { display: grid; gap: 6px; }
input { padding: 8px; border: 1px solid #ccc; border-radius: 6px; }
.err { color: #d33; font-size: 12px; margin: 0; }
button[disabled] { opacity: 0.5; cursor: not-allowed; }
</style>
