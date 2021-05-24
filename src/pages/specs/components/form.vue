<template>
  <div>
    <el-dialog
      :title="info.isadd == true ? '分类添加' : '分类编辑'"
      :visible.sync="info.isshow"
      @closed="close"
    >
      <el-form :model="form">
        {{ form }}
        {{ attrArr.length }}
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="box">
            <el-input v-model="item.value" autocomplete="off"></el-input>
            <el-button type="primary" v-if="index == 0" @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="attrDel(index)">删除</el-button>
          </div>
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
  reqcateinfo,
  reqspecsadd,
  reqspecsedit,
  reqspecsinfo,
} from "../../../request/api";
import { successAlert, errorAlert } from "../../../utils/alert";
import { mapActions, mapGetters } from "vuex";
import path from "path";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [
        {
          value: "",
        },
      ],
    };
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:"specs/reqTotal"
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
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [
        {
          value: "",
        },
      ];
    },

    add() {
      // console.log(this.form);

      let arrStr = this.attrArr.reduce((pre, item) => {
        return pre + item.value + ",";
      }, "");
      this.form.attrs = arrStr.slice(0, arrStr.length - 1);

      reqspecsadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.info.isshow = false;
          this.reqList();
          this.reqTotal();
        } else {
          errorAlert(res.data.msg);
        }
      });
    },

    getOne(id) {
      reqspecsinfo({ id }).then((res) => {
        this.form = res.data.list[0];
        // console.log(this.form);
        this.attrArr = this.form.attrs.map(item=>({ value:item}))
        console.log(this.attrArr);
      });
    },
    edit() {
      this.form.attrs = this.attrArr.map(item=>item.value).join(',')
      reqspecsedit(this.form).then((res) => {
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
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    attrDel(index){
      this.attrArr.splice(index,1)
    }
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    
  },
};
</script>

<style scoped lang="less">
.box {
  display: flex;
}
.box .el-input {
  flex: 1;
}
</style>
