<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        {{ form }}
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="120px">
          <!-- 
            :default-expanded-keys="[2, 3]" 默认展开
            :default-checked-keys="[5]"     默认选中
          -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
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

import {reqmenulist, reqroleadd, reqroleedit, reqroleinfo } from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      menuList:[],
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
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    add() {
      // console.log(this.form);
      // console.log(this.$refs.tree.getCheckedKeys());
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      console.log(this.form);
      reqroleadd(this.form).then((res) => {
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
      reqroleinfo({ id }).then((res) => {
        // res.data.list.menus = this.$refs.from.setCheckedKeys()
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
          this.form.id = id
        }
      });
    },
    edit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqroleedit(this.form).then((res) => {
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
    reqmenulist({istree:true}).then(res=>{
      this.menuList = res.data.list?res.data.list:[];
    })
  },
};
</script>

<style></style>
