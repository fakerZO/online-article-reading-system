<template>
  <li>
    <span v-show="!isEdit">
      {{ item[0] }}：<span id="msg">{{ item[1] }}</span></span
    >
    <span v-show="isEdit"
      >{{ item[0] }}：<input
        id="changeMsg"
        type="text"
        autocomplete="off"
        ref="inputTitle"
        v-model="item[1]"
        @change="handleChange($event)"
        @blur="handleBlur"
    /></span>

    <el-button v-show="!isEdit" id="btn" type="primary" @click="handleEdit"
      >修改</el-button
    >
    <el-button v-show="isEdit" id="btn" type="primary" @click="handleBlur"
      >确定</el-button
    >
  </li>
</template>

<script>
import axios from "axios";

export default {
  name: "PersonItem",
  props: ["item"],
  data() {
    return {
      isEdit: false,
    };
  },
  methods: {
    //修改
    handleEdit() {
      this.isEdit = true;
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },

    //失去焦点回调
    handleBlur() {
      this.isEdit = false;
    },

    //input框输入有所改变回调（真正执行修改逻辑）
    handleChange(e) {
      if (!e.target.value.trim()) return alert("输入不能为空！");
      this.isEdit = false;

      // console.log(this.item[1]);
      this.changeMessege();
    },

    changeMessege() {
      const type = this.item[3];
      axios
        .put("http://localhost:8081/api/user", {
          id: this.item[2],
          [type]: this.item[1],
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },

  mounted() {},
};
</script>
<style scoped>
#msg {
  color: white;
}
#changeMsg {
  color: black;
  outline: none;
}
li {
  border-radius: 5px;
  padding: 10px 20px 5px 20px;
}
li:hover {
  background-color: #6c6969;
}
li .el-button {
  display: none;
}
li:hover .el-button {
  display: block;
}
#btn {
  float: right;
  font-size: 15px;
  height: 5px;
  line-height: 5px;
  padding-bottom: 15px;
  letter-spacing: 1px;
  margin-top: 9px;
}
</style>
