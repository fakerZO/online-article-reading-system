<template>
  <div class="outside">
    <div class="demo-image__placeholder">
      <div class="block">
        <el-carousel :interval="3000" type="card" height="350px">
          <el-carousel-item v-for="item in bookArr" :key="item.id">
            <el-image :src="item.bookImg" @click="ContextShow(item)"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Index",
  data() {
    return {
      bookArr: [],
    };
  },
  methods: {
    ContextShow(item) {
      this.$router.push({
        name: "Context",
        query: {
          id: item.id,
          image: item.bookImg,
          bookName: item.bookName,
          author: item.author,
        },
      });
      // console.log(this.$route.query.id);
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
  },
};
</script>
<style scoped>
.outside {
  border: 1px solid rgb(65, 61, 61);
  border-radius: 15px;
}
.demo-image__placeholder {
  margin: 40px 150px 0 122px;
  padding: 30px;
}
.block {
  width: 1100px;
}
.el-carousel__item:nth-child(2n),
.el-carousel__item:nth-child(2n + 1) {
  width: 300px;
  border: 1px solid #43474b;
  border-radius: 15px;
  background-color: #43474b;
  margin-left: 124px;
}
.el-image {
  width: 200px;
  height: 300px;
  padding: 25px 20px 20px 49px;
  cursor: pointer;
}
</style>
