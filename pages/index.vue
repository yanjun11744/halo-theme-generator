<template xmlns:th="http://www.w3.org/1999/xhtml">
  <div>
    <h1>Post</h1>
    <!--    直接在组件上使用thymeleaf语法-->
    <Tutorial th:if="${posts.hasPrevious()}"/>
    <div th:with="menu = ${menuFinder.getPrimary()}">
      <ul th:with="menuItems = ${menu.menuItems}">
        <li th:each="menuItem : ${menuItems}">
          <a
            th:href="@{${menuItem.status.href}}"
            th:text="${menuItem.status.displayName}"
            th:target="${menuItem.spec.target?.value}"
          >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

</script>
