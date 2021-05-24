<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '用户添加' : '用户编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        {{ form }}
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" :placeholder="info.isadd?'':'密码空置则不修改'"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd"
          >提交</el-button
        >
        <el-button type="primary" v-else @click="edit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqrolelist,
  requseradd,
  requseredit,
  requserinfo,
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      roleList: [],
      defaultProps: {
        children: "children",
        label: "title",
      },
      
    };
  },
  methods: {
    changepid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      // console.log(this.form);
      // console.log(this.$refs.tree.getCheckedKeys());
      console.log(this.form);
      requseradd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isshow = false;
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    getOne(id) {
      requserinfo({ uid:id }).then((res) => {
        
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password='';
          // this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    edit() {
      // this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.empty();
          this.$emit("init");
        }
      });
    },
    close() {
      !this.info.isadd && this.empty();
    },
  },
  mounted() {
    reqrolelist().then((res) => {
      this.roleList = res.data.list ? res.data.list : [];
    });
  },
};
</script>

<style></style>
