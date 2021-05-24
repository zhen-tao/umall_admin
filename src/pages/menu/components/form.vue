<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        <!-- {{ form }} -->
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select v-model="form.pid" @change="changepid">
            <el-option disabled value="">请选择</el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <!-- <el-option disabled value=""></el-option> -->
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          v-if="form.type == 1"
          label="目录图标"
          label-width="120px"
        >
          <el-select v-model="form.icon">
            <el-option disabled value="">请选择</el-option>
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
            <!-- <el-option value="el-icon-s-goods">
              <i class="el-icon-s-goods"></i>
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item v-else label="菜单地址" label-width="120px">
          <el-select v-model="form.url">
            <el-option disabled value="">请选择</el-option>
            <el-option
              v-for="item in routerPath"
              :key="item.path"
              :label="item.meta.title"
              :value="item.path"
            ></el-option>
            <!-- <el-option label="/banner" value="/banner"></el-option> -->
          </el-select>
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
import { routerPath } from "../../../router";
import { reqmenuadd, reqmenuedit, reqmenuinfo } from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  data() {
    return {
      // dialogFormVisible: true,
      // dialogTableVisible: false,
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      routerPath,
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-goods",
        "el-icon-help",
        "el-icon-s-operation",
      ],
    };
  },
  methods: {
    changepid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      console.log(1);
      reqmenuadd(this.form).then((res) => {
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
      reqmenuinfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    edit() {
      reqmenuedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.empty();
          this.$emit("init");
        }
      });
    },
    close(){
      !this.info.isadd && this.empty();
    }
  },
};
</script>

<style></style>
