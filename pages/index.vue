<template xmlns:th="http://www.w3.org/1999/xhtml">
  <div>
    <h1>Post</h1>
    <!--    直接在组件上使用thymeleaf语法-->
    <Tutorial th:if="${posts.hasPrevious()}"/>
  </div>
</template>

<script setup>

</script>
