<template>
  <div>
    <div class="tip">分享一本你最喜欢的书！</div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="type">
        <span id="text">类型</span
        ><el-select v-model="booktype" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <el-form-item label="书名" prop="bookname">
        <el-input
          type="text"
          v-model="ruleForm.bookname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input
          type="text"
          v-model="ruleForm.author"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="封面链接" prop="link">
        <el-input
          type="text"
          v-model="ruleForm.link"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')"
          >上传</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "upload",
  data() {
    var validateBname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入书名"));
      } else {
        callback();
      }
    };
    var validateAuthor = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入作者"));
      } else {
        callback();
      }
    };
    var validateLink = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入封面链接"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        bookname: "",
        author: "",
        link: "",
      },
      rules: {
        author: [{ validator: validateAuthor, trigger: "blur" }],
        bookname: [{ validator: validateBname, trigger: "blur" }],
        link: [{ validator: validateLink, trigger: "blur" }],
      },
      options: [
        {
          value: "小说",
          label: "小说",
        },
        {
          value: "专业书",
          label: "专业书",
        },
        {
          value: "工具书",
          label: "工具书",
        },
      ],
      booktype: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.addUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addUser() {
      axios
        .post("http://localhost:8081/api/book", {
          type: this.booktype,
          bookName: this.ruleForm.bookname,
          bookImg: this.ruleForm.link,
          author: this.ruleForm.author,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({
              name: "Index",
            });
            // console.log("添加成功", res);
          } else {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          alert(err);
        });
    },

    //监视键盘事件
    handleKeyup(e) {
      if (e.keyCode === 13) {
        // console.log(11);
        this.submitForm("ruleForm");
      }
    },
  },

  mounted() {
    this.$el.addEventListener("keyup", this.handleKeyup); //监视键盘事件
  },
};
</script>

<style scoped>
.el-form {
  border: 1px solid #242323;
  border-radius: 20px;
  width: 350px;
  text-align: center;
  margin: 60px 0 50px 500px;
  padding: 25px 68px 5px 0px;
  background-color: #242323;
}
.submit {
  border-color: #24862d;
  color: white;
  background-color: #24862d;
  width: 250px;
  letter-spacing: 10px;
  text-align: center;
}
.submit:hover {
  border-color: rgb(243, 245, 249);
}
.tip {
  margin: 20px 0 0 30px;
  font-size: 25px;
}
.type {
  margin: 0 0 22px 18px;
}
#text {
  color: #606266;
  font-size: 14.5px;
  margin: 0 11px 0 10px;
}
</style>