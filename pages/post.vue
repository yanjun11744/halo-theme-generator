<template>
<div>
  <h1>Post</h1>
  <p v-html="title"></p>
  <article>
    <el-button type="primary">123</el-button>
  </article>
</div>
</template>
<script setup>
import {ref} from "vue";

const title = ref('<h1 th:text="${post.spec.title}"></h1>')
</script>

<style scoped>

</style>
