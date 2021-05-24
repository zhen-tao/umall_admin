<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '分类添加' : '分类编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        {{ form }}
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
  reqcateadd,
  reqcateedit,
  reqcateinfo
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },

      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    beforeAvatarUpload(file) {
      console.log(file);
      let imgArr = [".png", ".jpg", ".jpeg", ".gif"];
      let extname = path.extname(file.name);
      if (!imgArr.find((item) => item == extname)) {
        errorAlert("请上传正确的文件格式");
        return;
      }
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    changepid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imageUrl = "";
    },

    add() {
      console.log(this.form);
      reqcateadd(this.form).then((res) => {
        console.log(1);
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isshow = false;
          this.reqList();
        } else {
          errorAlert(res.data.msg);
        }
      });
    },

    getOne(id) {
      reqcateinfo({ id }).then((res) => {
        // res.data.list.menus = this.$refs.from.setCheckedKeys()
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id
          this.imageUrl = this.$api + this.form.img;
          console.log(1111);

        }
      });
    },
    edit() {
      reqcateedit(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isshow = false;
          this.empty();
          this.reqList();
        }
      });
    },
    close() {
      !this.info.isadd && this.empty();
    },
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    // reqmenulist({ istree: true }).then((res) => {
    //   this.menuList = res.data.list ? res.data.list : [];
    // });
  },
};
</script>

<style scoped lang="less">
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
