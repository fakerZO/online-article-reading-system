<template>
  <el-container>
    <div class="list">在线文章阅读系统</div>
    <Header />
    <el-main><router-view></router-view></el-main>
    <el-footer><Footer /></el-footer>
    <el-backtop :bottom="100" :right="70" :visibility-height="50"></el-backtop>
  </el-container>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  name: "Home",
  components: { Header, Footer },

  mounted() {
    // console.log(this.$store.state.username);
    // console.log(this.$store.state.userMsg);
  },
};
</script>
<style scoped>
.list {
  background-color: #232020;
  text-align: center;
  font-size: 25px;
  line-height: 70px;
  border-top: 1px solid rgb(59, 57, 57);
  border-bottom: 0.5px solid rgb(210, 208, 208);
  letter-spacing: 4px;
}
.el-backtop {
  transition: all 0.4s;
}
.el-backtop:hover {
  transform: scale(1.2);
}
</style>


