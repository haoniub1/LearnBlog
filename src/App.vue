<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<!--  q 这个container有什么用呢？类似一个整体的div？但是之前好像都没有它 只有一个body 然后就是 header main footer啥的-->
<!--  a 就是 Element Plus 版的 div，自带 flex 竖排布局。用普通 <div style="display:flex;flex-direction:column"> 效果一样，它帮你省了这些 CSS。-->
  <el-container class="app-container">
    <el-header class="app-header">
<!--      q 这里是一个单独的div 区分右边的memu？-->
<!--      a 对，把 Logo 和 menu 分成两个并列盒子。不包 div 的话 Logo 会被 el-menu 当子项。-->
      <div class="header-left">
<!--        q 这个也没有看到过 是有什么用呢？类似导航到 /应该首页的意思？-->
<!--        a 对，渲染成 <a> 链接。点击后 URL 变成 /（首页），但不刷新页面，只替换 RouterView 的内容。-->
        <RouterLink to="/" class="logo">MyBlog</RouterLink>
      </div>
<!--      q 这个 ellipsis 是什么意思呢？是否收起来？-->
<!--      a 对，菜单项放不下时默认收进 ... 按钮，:ellipsis="false" 关掉这个行为，全部显示。-->
      <el-menu mode="horizontal" :ellipsis="false" class="header-menu">
        <el-menu-item>
          <RouterLink to="/">首页</RouterLink>
        </el-menu-item>
        <el-menu-item>
          <RouterLink to="/archive">归档</RouterLink>
        </el-menu-item>
        <el-menu-item>
<!--          q 它是怎么实现 页面内容改变 而没有跳转的感觉的呢？-->
<!--          a RouterLink 拦截点击，用 history.pushState() 只改地址栏 URL，不发请求。-->
<!--          a Vue Router 看到 URL 变了，查 router/index.ts 的映射表，找到对应组件渲染到 RouterView 位置。-->
<!--          a 所以顶栏底栏不动，只有中间内容在切换。类比 Go：服务端路由返回整页，这里是浏览器端路由只换一块。-->
          <RouterLink to="/about">关于</RouterLink>
        </el-menu-item>
        <el-menu-item>
          <RouterLink to="/test">测试router</RouterLink>
        </el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
<!--      q 这里似乎就是上面导航的内容的显示？至于显示什么这里似乎没有定义？-->
<!--      a 对，这是占位符。显示什么由 router/index.ts 决定：URL / → HomeView.vue，/about → AboutView.vue。-->
      <RouterView />
    </el-main>

    <el-footer class="app-footer">
      © 2026 MyBlog
    </el-footer>
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  color: #409eff;
  text-decoration: none;
  margin-right: 40px;
}

.header-menu {
  border-bottom: none;
}

.header-menu a {
  text-decoration: none;
  color: inherit;
}

.app-footer {
  text-align: center;
  color: #909399;
  border-top: 1px solid #e4e7ed;
}
</style>
