<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu theme="dark" :default-selected-keys="['1']" mode="inline" @click="home">
        <a-menu-item key="option1">
          <a-icon type="pie-chart" />
          <span>Examples实例</span>
        </a-menu-item>
        <a-sub-menu key="myexamples">
          <span slot="title"><a-icon type="area-chart" /><span>examples</span></span>
          <a-menu-item key="myexamplesline">
            <a-icon type="line-chart" />折线图
          </a-menu-item>
          <a-menu-item key="examplescategory">
            <a-icon type="bar-chart" />柱状图
          </a-menu-item>
          <a-menu-item key="vertical">
            <a-icon type="pie-chart" />饼图
          </a-menu-item>
          <a-menu-item key="scatter">
            <a-icon type="dot-chart" />散点图
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="option2">
          <a-icon type="desktop" />
          <span>Option 2</span>
        </a-menu-item>
        <a-sub-menu key="user">
          <span slot="title"><a-icon type="user" /><span>User</span></span>
          <a-menu-item key="usermanger">
            用户管理
          </a-menu-item>
          <a-menu-item key="5">
            待定
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><a-icon type="team" /><span>Team</span></span>
          <a-menu-item key="6">
            Team 1
          </a-menu-item>
          <a-menu-item key="8">
            Team 2
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9">
          <a-icon type="file" />
          <span>File</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{this.$route.path}}</a-breadcrumb-item>
<!--          <a-breadcrumb-item>Bill</a-breadcrumb-item>-->
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <h1>首页</h1>
         <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data () {
    return {
      collapsed: false
    }
  },
  components: {
  },
  methods: {
    home (obj) {
      console.log(obj)
     /* this.$router.push({ name: obj.key })*/
      if (this.$route.name !== obj.key) {
        this.$router.push({ name: obj.key })
      }

    }
  }
}
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
