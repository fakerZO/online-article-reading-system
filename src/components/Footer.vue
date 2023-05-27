<template>
  <div class="footer">
    <div class="stat">
      <span class="el-icon-s-custom"></span>
      <span class="userNum">总用户：</span>{{ userArr.length }}

      <span class="el-icon-notebook-2"></span>
      <span class="bookNum">总书本：</span>{{ bookArr.length }}
    </div>
    <hr />
    <h5>
      珠海科技学院 版权所有 2023 桂园6栋楼405林志丰
      技术支持（请使用Chrome/Edge浏览器访问本系统）
    </h5>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Footer",
  data() {
    return {
      userArr: [],
      bookArr: [],
    };
  },
  mounted() {
    axios.get("http://localhost:8081/api/user").then(
      (response) => {
        this.userArr = response.data;
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );

    axios.get("http://localhost:8081/api/book").then(
      (response) => {
        this.bookArr = response.data;
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  },
};
</script>

<style scoped>
hr {
  border-color: rgb(106, 105, 105);
  width: 1200px;
}
.stat {
  margin: 20px 0 35px 0;
}
.footer {
  text-align: center;
  height: 200px;
  color: rgb(106, 105, 105);
}
.userNum,
.bookNum {
  margin-left: 10px;
}
.el-icon-notebook-2 {
  margin-left: 50px;
}
</style>