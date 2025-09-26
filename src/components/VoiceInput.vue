<!-- VoiceInput.vue -->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

// v-model
const props = defineProps({
  modelValue: { type: String, default: '' },
  lang: { type: String, default: 'zh-CN' },     // 识别语言
  placeholder: { type: String, default: '说点什么…' }
})
const emit = defineEmits(['update:modelValue', 'error', 'start', 'end'])

const inputEl = ref(null)
const value = ref(props.modelValue)
watch(() => props.modelValue, v => (value.value = v))

// Web Speech API
let recognition = null
const supported = ref(false)
const recognizing = ref(false)
const interimText = ref('')    // 临时识别文本（实时）
const errorMsg = ref('')

onMounted(() => {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.startTime);

    }
  });
  observer.observe({ type: 'paint', buffered: true });
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  supported.value = !!SR
  if (!supported.value) return

  recognition = new SR()
  recognition.lang = props.lang
  recognition.continuous = true      // 持续识别
  recognition.interimResults = true   // 返回临时结果

  recognition.onstart = () => {
    recognizing.value = true
    interimText.value = ''
    errorMsg.value = ''
    emit('start')
  }

  recognition.onresult = (event) => {
    // 聚合本次回调里的片段
    let interim = ''
    let finalChunk = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const res = event.results[i]
      const text = res[0].transcript
      if (res.isFinal) {
        finalChunk += text
      } else {
        interim += text
      }
    }
    // 把最终结果追加到输入框
    if (finalChunk) {
      value.value = (value.value || '') + finalChunk
      emit('update:modelValue', value.value)
    }
    // 展示临时结果
    interimText.value = interim
  }

  recognition.onerror = (e) => {
    errorMsg.value = e.error || 'speech recognition error'
    emit('error', e)
    // 不同错误策略
    if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
      stop()
    }
  }

  recognition.onend = () => {
    recognizing.value = false
    emit('end')
  }
})

onBeforeUnmount(() => {
  if (recognition && recognizing.value) {
    recognition.stop()
  }
  recognition = null
})

function start() {
  if (!supported.value || recognizing.value) return
  errorMsg.value = ''
  try {
    recognition.start()
  } catch { /* 某些实现中重复 start 会抛错，忽略即可 */ }
}

function stop() {
  if (!recognizing.value) return
  recognition.stop()
}

function toggle() {
  recognizing.value ? stop() : start()
}


</script>

<template>
  <div class="voice-input">
    <div class="field">
      <!-- 文字输入框 -->
      <input
        ref="inputEl"
        type="text"
        class="input"
        :placeholder="placeholder"
        v-model="value"
        @input="emit('update:modelValue', value)"
      />

      <!-- 临时语音结果的“幽灵叠加层”，不改输入框值，只做预览 -->
      <div v-if="recognizing && interimText" class="ghost">{{ value }}<span class="interim">{{ interimText }}</span></div>

      <!-- 按钮 -->
      <button
        class="mic"
        :class="{ on: recognizing }"
        :disabled="!supported"
        @click="toggle"
        :title="supported ? (recognizing ? '停止语音输入' : '开始语音输入') : '当前浏览器不支持 Web Speech API'"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Zm-7-3a1 1 0 1 0-2 0 9 9 0 0 0 8 8v3h2v-3a9 9 0 0 0 8-8 1 1 0 1 0-2 0 7 7 0 0 1-14 0Z"/>
        </svg>
        <span>{{ recognizing ? '停止' : '语音' }}</span>
      </button>
    </div>

    <p v-if="!supported" class="tip">当前浏览器不支持语音识别（建议使用 Chrome/Edge）。</p>
    <p v-if="errorMsg" class="err">语音出错：{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.voice-input { width: 400px; }
.field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}
.input {
  flex: 1;
  height: 40px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 14px;
}
.mic {
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fafafa;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}
.mic.on { border-color: #1677ff; background: #e8f2ff; }
.mic:disabled { opacity: 0.5; cursor: not-allowed; }
.tip { margin-top: 6px; color: #888; font-size: 12px; }
.err { margin-top: 6px; color: #c0392b; font-size: 12px; }

/* “幽灵叠加层”：把临时识别结果以半透明方式显示在输入框上方 */
.ghost {
  pointer-events: none;
  position: absolute;
  inset: 0 auto 0 0;
  transform: translateY(0);
  padding: 0 12px;
  height: 40px;
  line-height: 40px;
  color: transparent; /* 保留布局，不显示已输入文本颜色 */
  white-space: nowrap;
  overflow: hidden;
}
.ghost .interim {
  color: rgba(0,0,0,.35);
}
</style>
