<template>
  <div>
    <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
    <span class="el-icon-search" @click="SearchShow"></span>
    <a v-show="!$store.state.isLog" class="Log" href="">登录</a>
    <a v-show="$store.state.isLog" class="Log" href="">切换账号</a>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      input: "",
      bookArr: [],
      bookArrMap: [],
      isHave: "",
    };
  },
  methods: {
    SearchShow() {
      if (this.input === "") return alert("输入不能为空！");

      this.bookArrMap = this.bookArr.filter((item) => {
        return this.input === item.bookName || this.input === item.author;
      });

      this.$store.commit("changeInputMsg", this.bookArrMap);

      if (this.bookArrMap.length !== 0) {
        this.isHave = true;
      } else {
        this.isHave = false;
      }
      this.$store.commit("changeIsHave", this.isHave);
      this.$store.commit("changeIndex", 0);

      this.$router.push({
        name: "SearchRes",
      });

      // console.log(this.bookArrMap);
    },
    //监视键盘事件
    handleKeyup(e) {
      if (e.keyCode === 13) {
        this.SearchShow();
        this.input = "";
      }
    },
  },

  mounted() {
    axios.get("http://localhost:8081/api/book").then(
      (response) => {
        // console.log("请求成功", response);
        this.bookArr = response.data;
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );

    this.$el.addEventListener("keyup", this.handleKeyup); //监视键盘事件
  },
};
</script>
<style scoped>
.el-input {
  width: 200px;
  margin-top: 10px;
  margin-left: 600px;
}
::v-deep .el-input__inner {
  background-color: #1b1a1a;
  border-radius: 30px;
  width: 230px;
}
::v-deep .el-input__inner:focus {
  border-color: white;
}
.el-icon-search {
  position: absolute;
  left: 1185px;
  top: 22px;
  cursor: pointer;
}
.Log {
  position: absolute;
  left: 1250px;
  top: 18px;

  color: white;
  text-decoration: none;
}
</style>
