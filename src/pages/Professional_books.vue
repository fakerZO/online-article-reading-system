<template>
  <div class="outside">
    <span class="demonstration"
      ><span style="color: rgb(121, 146, 222)">专业书</span>专题</span
    >
    <div class="demo-image__placeholder">
      <div class="block">
        <div class="listOutside" v-for="bookObj in bookArr" :key="bookObj.id">
          <el-image
            :src="bookObj.bookImg"
            @click="ContextShow(bookObj)"
          ></el-image>
          <div class="about">
            <div class="aboutBook">
              <a href="" @click.prevent="ContextShow(bookObj)"
                >书名：《{{ bookObj.bookName }}》</a
              ><br />
              <a href="" @click.prevent="ContextShow(bookObj)"
                >作者：{{ bookObj.author }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Professional_books",
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
    },
  },

  mounted() {
    axios.get("http://localhost:8081/api/book").then(
      (response) => {
        // console.log("请求成功", response);
        this.bookArr = response.data.filter((item) => {
          return item.type === "专业书";
        });
      },
      (error) => {
        console.log("请求失败了", error.message);
      }
    );
  },
};
</script>
<style scoped>
.demo-image__placeholder {
  margin: 40px 150px 0 150px;
  padding: 30px;
}
.block {
  width: 1100px;
}
.outside {
  border: 1px solid rgb(65, 61, 61);
  border-radius: 15px;
}
.demonstration {
  position: absolute;
  left: 80px;
  top: 170px;
  font-size: 23px;
  letter-spacing: 2px;
}
.listOutside {
  display: inline-block;
  margin: 15px 0 0 17px;
  width: 241px;
  height: 365px;
}
.el-image {
  width: 200px;
  height: 278px;
  border: 1px solid rgb(65, 61, 61);
  border-radius: 15px;
  padding: 20px 20px 12px 20px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.4s;
}
.el-image:hover {
  transform: scale(1.1);
  z-index: 100;
}
.about {
  text-align: center;
}
.aboutBook {
  display: inline-block;
  text-align: left;
  margin-top: 8px;
}
a {
  color: white;
  text-decoration: none;
  font-size: 13px;
}
a:hover {
  color: rgb(121, 146, 222);
}
</style>
