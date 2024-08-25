<template xmlns:th="http://www.w3.org/1999/xhtml">
  <!--  post页面至少有一个<article>标签-->
  <div>
    <h1>{{ title }}</h1>
    <h1 th:text="${post.spec.title}"></h1>
    <article>
      <el-button type="primary" th:text="${post.spec.title}" />
      <el-input v-model="title" placeholder="请输入内容"></el-input>
    </article>
  </div>
</template>
<script setup>
  import {ref} from "vue"
  const title = ref('post')
</script>

<style scoped>

</style>
