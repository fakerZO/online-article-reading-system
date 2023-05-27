<template>
  <el-row class="demo-avatar demo-basic">
    <el-col :span="12">
      <div class="demo-basic--circle">
        <div class="block">
          <el-avatar :size="140" :src="circleUrl"></el-avatar>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <div id="perMsg">个人信息</div>
            </div>
            <div class="text item">
              <transition-group name="todo" appear>
                <PersonItem
                  v-for="(item, index) in newArr"
                  :key="index"
                  :item="item"
                />
              </transition-group>
            </div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import PersonItem from "../components/PersonItem";
import { mapState } from "vuex";

export default {
  name: "PersonList",
  components: { PersonItem },
  data() {
    return {
      newArr: [],
      MsgArr: ["姓名", "性别", "地址", "邮箱", "电话"],
      MsgArrEng: ["userName", "gender", "address", "email", "phone"],
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  computed: {
    ...mapState(["userMsg"]),
  },
  methods: {
    mergeArray() {
      this.newArr = this.MsgArr.map((item, index) => {
        return [
          item,
          this.userMsg[index],
          this.userMsg[5],
          this.MsgArrEng[index],
        ];
      });
    },
  },

  mounted() {
    this.mergeArray();
    // console.log(this.newArr);
  },
};
</script>
<style scoped>
.block {
  margin: 10px 100px 0 110px;
  width: 1200px;
  text-align: center;
}
.text {
  color: #409eff;
  font-size: 17px;
  line-height: 48px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  color: white;
  font-size: 20px;
  border-radius: 15px;
  border-color: #2c2a2a;
  width: 480px;
  margin: 20px 0 0 355px;
  padding-top: 10px;
  text-align: left;
  background-color: #2c2a2a;
}

#perMsg {
  margin-top: -10px;
  text-align: center;
}
</style>
