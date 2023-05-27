<template>
  <div>
    <img class="Logo" src="../assets/logo.jpg" />
    <div class="tip">
      已经有账户？<router-link class="res" active-class="active" to="/"
        >登录</router-link
      >
    </div>
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
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "register",
  data() {
    var validateUname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        uname: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        uname: [{ validator: validateUname, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          this.addUser();
          console.log("注册成功");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addUser() {
      axios
        .post("http://localhost:8081/api/user", {
          userName: this.ruleForm.uname,
          passWord: this.ruleForm.pass,
        })
        .then((res) => {
          if (res.status === 200) {
            this.$router.push({
              name: "Login",
            });
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
  border-color: rgb(243, 245, 249);
}
.Logo {
  width: 200px;
  position: absolute;
  left: 630px;
  top: 120px;
}
.tip {
  color: white;
  position: absolute;
  top: 25px;
  left: 1200px;
  letter-spacing: 3px;
}
.res {
  text-decoration: none;
  color: rgb(121, 146, 222);
}
</style>