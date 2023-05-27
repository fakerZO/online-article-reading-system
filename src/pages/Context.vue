<template>
  <div>
    <div class="context" v-if="article.length > 0">
      <div
        class="content1"
        :class="{ content2: showChapters === true }"
        @click="judge"
      >
        <h1>{{ article[index].title }}</h1>
        <h5 v-html="article[index].content"></h5>
      </div>

      <transition name="el-zoom-in-center">
        <el-menu
          v-show="showChapters"
          :default-active="(index + 1).toString()"
          class="chapters"
          background-color="#f4f4f4"
          text-color="black"
          active-text-color="#409EFF"
        >
          <el-menu-item
            v-for="item in article"
            :key="item.id"
            :index="item.title.substring(1, 2)"
            @click="jumpCapters(item.title.substring(1, 2) - 1)"
          >
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </el-menu>
      </transition>
    </div>

    <div>
      <transition name="el-zoom-in-top">
        <div v-show="showNav" class="navigation">
          <img
            src="../assets/logo2.jpg"
            width="120px"
            height="55px"
            style="margin-left: 20px"
          />
          <span class="operate">
            <span class="list el-icon-notebook-1" @click="changeContent"
              >查看目录</span
            >
            <span
              class="list el-icon-caret-left"
              :class="{ listDisabled: index === 0 }"
              @click="reduceCapters"
              >上一章</span
            >
            <span
              class="list el-icon-caret-right"
              :class="{ listDisabled: index === 3 }"
              @click="addCapters"
              >下一章</span
            >
            <span class="list el-icon-refresh-left" @click="back"
              >返回书架</span
            >
          </span>
        </div>
      </transition>
    </div>

    <div>
      <transition name="el-zoom-in-bottom">
        <div v-show="showNav" class="schedule">
          <el-image :src="$route.query.image"></el-image>
          <span class="bookName">{{ $route.query.bookName }}</span>
          <span class="author">作者：{{ $route.query.author }}</span>
          <el-progress :percentage="percentage" :format="format"></el-progress>
        </div>
      </transition>
    </div>

    <el-backtop :bottom="100" :right="70" :visibility-height="50"></el-backtop>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showChapters: false,
      showNav: true,
      article: [],
      index: 0,
    };
  },
  computed: {
    percentage() {
      const map = {
        0: 0,
        1: 25,
        2: 50,
        3: 100,
      };
      return map[this.index];
    },
  },
  methods: {
    judge() {
      // 判断是不是在选中文字 如果是就不执行点击事件 直接 return
      if (!!this.getSelected()) {
        // console.log("有选择的文字不触发点击事件");
        return;
      }
      this.showNav = !this.showNav;
    },
    getSelected() {
      if (window.getSelection) {
        //ie9以上及其他
        return window.getSelection().toString();
      } else {
        //ie9以下
        const selection = document.selection?.createRange();
        if (selection.text) {
          return selection.text.toString();
        }
        return "";
      }
    },
    changeContent() {
      this.showChapters = !this.showChapters;
    },
    jumpCapters(index) {
      this.index = index;
    },
    reduceCapters() {
      if (this.index === 0) return;
      this.index -= 1;
    },
    addCapters() {
      if (this.index === 3) return;
      this.index += 1;
    },
    back() {
      this.$router.back();
    },

    format(percentage) {
      return percentage === 100 ? "已看完" : `${percentage}%`;
    },
  },

  mounted() {
    axios
      .get(
        `http://localhost:8081/api/article?pages=${this.$route.query.id}&size=4`
      )
      .then(
        (response) => {
          //   console.log("请求成功", response.data.records);
          this.article = response.data.records;
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
  },
};
</script>

<style scoped>
.content1 {
  width: 700px;
  height: 100%;
  margin-left: 100px;
  background-color: #fff;
  transition: all 0.4s;
}
.content2 {
  width: 700px;
  height: 100%;
  margin-left: 200px;
  background-color: #fff;
}
.context {
  width: 900px;
  height: 100%;
  margin: -22px 273.5px 0 273.5px;
  background-color: #f4f4f4;
}
h5 {
  margin: 0;
  color: black;
  font-size: 20px;
  font-weight: 500;
  line-height: 45px;
  text-indent: 40px;
  padding: 10px 70px 120px 70px;
}
h1 {
  color: black;
  padding: 110px 70px 10px 70px;
  letter-spacing: 5px;
}
.navigation {
  width: 100%;
  height: 70px;
  border-radius: 5px;
  background-color: rgb(41, 44, 49);
  box-sizing: border-box;
  position: fixed;
  padding: 8px 0 0 0;
  top: 0;
}
.schedule {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  background-color: rgb(41, 44, 49);
  box-sizing: border-box;
  position: fixed;
  /* padding: 8px 0 0 0; */
  bottom: 0px;
}
.operate {
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  position: fixed;
  top: 15px;
  left: 475px;
}
.list {
  color: rgb(143, 145, 149);
  margin: 0 20px 0 20px;
  cursor: pointer;
  letter-spacing: 2px;
}
.list:hover {
  color: black;
}
.listDisabled {
  color: rgb(209, 211, 213);
  margin: 0 20px 0 20px;
  cursor: pointer;
  letter-spacing: 2px;
}
.listDisabled:hover {
  color: rgb(209, 211, 213);
}
.chapters {
  margin: 20px 20px 0 20px;
  width: 160px;
  position: fixed;
  top: 70px;
  border-right: 0;
  border-left: 3px solid rgb(216, 215, 215);
}
.el-menu-item {
  border-bottom: 1px solid rgb(216, 215, 215);
}
.el-image {
  width: 80px;
  height: 110px;
  margin: 0 0 100px 30px;
  position: fixed;
  bottom: -100px;
  border-radius: 8px;
}
.bookName {
  color: white;
  font-weight: 200;
  font-size: 17px;
  position: fixed;
  left: 130px;
  bottom: 38px;
}
.author {
  color: white;
  font-weight: 200;
  font-size: 15px;
  position: fixed;
  left: 130px;
  bottom: 12px;
}
.el-progress {
  width: 850px;
  position: fixed;
  left: 320px;
  bottom: 24px;
}
.el-backtop {
  transition: all 0.4s;
}
.el-backtop:hover {
  transform: scale(1.2);
}
</style>