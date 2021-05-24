<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
      <el-table-column label="规格属性" sortable width="180">
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="danger" @click="del(scope.row.id)">删除</el-button> -->
          <del-btn @del="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="size"
      :total="total"
      @current-change="changeP"
    >
    </el-pagination>
  </div>
</template>

<script>
import { reqspecsdelete } from "../../../request/api";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
      changePage: "specs/changePage",
    }),
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$emit("edit", id);
    },
    del(id) {
      reqspecsdelete({ id }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });

          this.reqList();
          this.reqTotal();
        }
      });
    },
    changeP(e){
      console.log(e);
      this.changePage(e)
      this.reqList()
    }
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  mounted() {
    this.reqList();
    this.reqTotal();
  },
};
</script>

<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>