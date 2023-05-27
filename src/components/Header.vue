<template>
  <el-menu
    :default-active="this.$store.state.index.toString()"
    mode="horizontal"
    background-color="#1b1a1a"
    text-color="#fff"
    active-text-color="#409EFF"
  >
    <el-menu-item index="1" @click="IndexShow">
      <img src="../assets/logo.jpg" width="120px" />
    </el-menu-item>
    <el-menu-item index="2" @click="RecommendShow">推荐</el-menu-item>
    <el-submenu index="3">
      <template slot="title">分类</template>
      <el-menu-item index="3" @click="NovelShow">小说</el-menu-item>
      <el-menu-item index="3" @click="ProShow">专业书</el-menu-item>
      <el-menu-item index="3" @click="RefShow">工具书</el-menu-item>
    </el-submenu>
    <el-menu-item index="4" @click="UploadShow">分享</el-menu-item>
    <Search />
    <span class="el-icon-user-solid"></span>
    <a
      id="person"
      href="http://localhost:8081/#/Home/Person"
      @click="PersonShow"
      >{{ this.$store.state.username }}</a
    >
  </el-menu>
</template>

<script>
import Search from "./Search";
export default {
  name: "Header",
  components: { Search },
  data() {
    return {};
  },
  methods: {
    IndexShow() {
      this.$router.push({
        name: "Index",
      });
      this.$store.commit("changeIndex", 1);
    },
    PersonShow() {
      this.$router.push({
        name: "Person",
      });
      this.$store.commit("changeIndex", 0);
    },
    NovelShow() {
      this.$router.push({
        name: "Novel",
      });
      this.$store.commit("changeIndex", 3);
    },
    ProShow() {
      this.$router.push({
        name: "Professional_books",
      });
      this.$store.commit("changeIndex", 3);
    },
    RefShow() {
      this.$router.push({
        name: "reference_books",
      });
      this.$store.commit("changeIndex", 3);
    },
    UploadShow() {
      this.$router.push({
        name: "Upload",
      });
      this.$store.commit("changeIndex", 4);
    },
    RecommendShow() {
      this.$router.push({
        name: "Recommend",
      });
      this.$store.commit("changeIndex", 2);
    },
  },

  mounted() {},
};
</script>

<style scoped>
#person {
  position: absolute;
  left: 1370px;
  top: 17px;
  color: white;
  text-decoration: none;
}
.el-icon-user-solid {
  position: absolute;
  top: 22px;
  left: 1340px;
}
</style>