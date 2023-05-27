<template>
  <div>
    <img class="Logo" src="../assets/logo.jpg" />
    <div class="res"></div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="uname">
        <el-input
          type="text"
          v-model="ruleForm.uname"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
    <div class="tip">
      还没有账户？<router-link class="res" active-class="active" to="/Register"
        >注册</router-link
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.userArr.forEach((item) => {
          if (item.passWord === value) {
            return callback();
          }
        });
      }
      callback(new Error("密码错误"));
    };
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        this.userArr.forEach((item) => {
          if (item.userName === value) {
            this.username = item.userName;
            this.userMsgArr = Object.values(item).splice(1, 6);
            // console.log(this.username);
            return callback();
          }
        });
      }
      callback(new Error("用户名错误"));
    };

    return {
      userMsgArr: [],
      userArr: [],
      username: "",
      ruleForm: {
        pass: "",
        uname: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "submit" }],
        uname: [{ validator: validateUname, trigger: "submit" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    login() {
      axios.get("http://localhost:8081/api/user").then(
        (response) => {
          response.data.forEach((item) => {
            if (
              item.userName === this.ruleForm.uname &&
              item.passWord === this.ruleForm.pass
            ) {
              // console.log("登录成功");
              this.$router.push({
                name: "Index",
              });
              this.changeUname();
              this.changeLog();
              this.changeUmsg();
            }
          });
        },
        (error) => {
          console.log("请求失败了", error.message);
        }
      );
    },
    changeUname() {
      this.$store.commit("changeUserName", this.username);
    },
    changeLog() {
      this.$store.commit("changeIsLog", true);
    },
    changeUmsg() {
      this.$store.commit("changeUserMsg", this.userMsgArr);
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
    axios.get("http://localhost:8081/api/user").then(
      (response) => {
        // console.log("请求成功", response);
        this.userArr = response.data;
        // console.log(this.userArr);
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
.el-form {
  border: 1px solid #242323;
  border-radius: 20px;
  width: 350px;
  text-align: center;
  position: absolute;
  left: 520px;
  top: 250px;
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
  border-color: rgb(244, 245, 246);
}
.Logo {
  width: 200px;
  position: absolute;
  left: 630px;
  top: 120px;
}
.tip {
  width: 295px;
  color: white;
  border-radius: 13px;
  border: 1px solid rgb(63, 61, 61);
  position: absolute;
  left: 524px;
  top: 500px;
  padding: 25px 68px 20px 50px;
  text-align: center;
  letter-spacing: 3px;
}
.res {
  text-decoration: none;
  color: rgb(121, 146, 222);
}
</style>