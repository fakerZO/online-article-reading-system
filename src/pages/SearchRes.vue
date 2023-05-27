<template>
  <div class="outside">
    <span v-show="isHave" class="demonstration">为您找到了：</span>
    <span v-show="!isHave" class="demonstration"
      >很抱歉，未找到您想要的内容！</span
    >
    <div class="demo-image__placeholder">
      <div class="block">
        <div class="listOutside" v-for="bookObj in inputMsg" :key="bookObj.id">
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
import { mapState } from "vuex";
export default {
  name: "SearchRes",
  computed: {
    ...mapState(["inputMsg", "isHave"]),
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
    // console.log(this.isHave);
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
