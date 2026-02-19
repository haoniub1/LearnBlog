<template>
<!--  q 为什么新建这里的时候 使用webstorm的新建vue组建的时候有 composition api和options api？但是跟之前的view代码有点差异-->
<!--  a 两种写法：Options API（旧，Vue 2 风格，按 data/methods/computed 分类）和 Composition API（新，Vue 3 推荐，直接写逻辑）-->
<!--  a Options: <script lang="ts"> export default defineComponent({ data(){}, methods:{} }) </script>-->
<!--  a Composition: <script setup lang="ts"> 直接写变量和函数 </script> ← 我们用这个-->
<!--  a 类比：Options 像 Java 类（固定结构），Composition 像 Go 函数（自由组织）-->

  <div>
    <h1>测试router</h1>
    <p>测试一下 看看router是怎么工作的</p>
    <p>能不能正式显示这里的内容</p>
  </div>
</template>
