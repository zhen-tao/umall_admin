<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          unique-opened
        >
          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu
            v-for="item in infopid"
            :key="item.id"
            :index="item.id.toString()"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group v-for="i in item.children" :key="i.id">
              <el-menu-item :index="'/index/' + i.url">{{
                i.title
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item-group v-for="i in noinfopid" :key="i.id">
            <el-menu-item :index="'/index/' + i.url">{{
              i.title
            }}</el-menu-item>
          </el-menu-item-group>

          <!-- <div v-else>
            <el-menu-item-group v-for="item in userInfo.menus" :key="item.id">
                <el-menu-item :index="'/index/' + item.url">{{
                  item.title
                }}</el-menu-item>
              </el-menu-item-group>
          </div> -->
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/menu">菜单管理</el-menu-item>
              <el-menu-item index="/index/role">角色管理</el-menu-item>
              <el-menu-item index="/index/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/cate">商品分类</el-menu-item>
              <el-menu-item index="/index/specs">商品规格</el-menu-item>
              <el-menu-item index="/index/goods">商品管理</el-menu-item>
              <el-menu-item index="/index/member">会员管理</el-menu-item>
              <el-menu-item index="/index/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/index/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row :gutter="20">
            <el-col :span="4" :offset="18">Admin</el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view class="view"> </router-view
        ></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      infopid: [],
      noinfopid: [],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  mounted() {
    let infopid = this.userInfo.menus.filter((item) => item.pid == 0);
    let noinfopid = this.userInfo.menus.filter((item) => item.pid != 0);
    // console.log(noinfopid);
    this.infopid = infopid;
    this.noinfopid = noinfopid;
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.con {
  height: 100vh;
}
.el-aside,
.el-menu-vertical-demo,
.el-menu-item-group {
  background: @primaryIndex;
}
.el-header,
.el-menu-item:focus,
.el-menu-item:hover,
/deep/ .el-submenu__title:hover {
  background: @indexHeader;
}
.view {
  margin-top: 20px;
}
</style>
