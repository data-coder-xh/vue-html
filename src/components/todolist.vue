<template>
  <div>
    <input v-model="msg" @keyup.enter="add"/>
    <ul>
      <li v-for="(item,index) in todo" :key="index">
        <div>{{item}}<button @click="remove(index)">删除</button></div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const msg=ref("")
const todo=ref([])
function  add()
{
  if(msg.value)
  todo.value.push(msg.value)
msg.value=""
}
function remove(index)
{
  todo.value.splice(index,1)
}
</script>
