<template>
  <div>{{ time }}</div>
</template>

<script setup >
  import { ref, onMounted } from 'vue'

  const duration = 60 // 秒数
  const time = ref(duration)
  let timer

  const startCountdown = () => {
    timer = setInterval(() => {
      if (time.value > 0) {
        time.value--
      } else {
        clearInterval(timer)
      }
    }, 1000)
  }

  onMounted(() => startCountdown())
</script>
