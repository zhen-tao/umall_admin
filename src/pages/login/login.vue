<template>
  <div class="login">
    <div class="con">
      <h3 class="center">登录</h3>
      <div class="input">
        <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
      </div>
      <div class="input">
        <el-input
          placeholder="请输入密码"
          show-password
          v-model="user.password"
        ></el-input>
      </div>
      <div class="center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { errorAlert, successAlert } from '../../utils/alert';
import { requserlogin } from '../../request/api';
export default {
  props: [],
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({
      changeUserInfo:"changeUserInfo"
    }),
    //跳转页面
    login() {
      // this.$router.push("/index");
      requserlogin(this.user).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg);
          // this.$router.push("/index");
          this.changeUserInfo(res.data.list)
          this.$router.push("/index");
        }
        else{
          errorAlert(res.data.msg)
        }
      })
    },
  },
};
</script>

<style scoped lang="less">
@import "../../less/index.less";
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, @primary, @primary2);
  position: relative;
}
.con {
  width: 300px;
  padding: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
}
.el-button {
  width: 300px;
}
.center {
  text-align: center;
  margin-bottom: 20px;
}
.input {
  margin-bottom: 20px;
}
</style>
