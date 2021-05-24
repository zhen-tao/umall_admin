<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
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
  </div>
</template>

<script>
import { reqroledelete } from "../../../request/api";
export default {
  props: ["list", "info"],
  data() {
    return {};
  },
  methods: {
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$emit("edit", id);
    },
    del(id) {
      reqroledelete({ id }).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$emit("init");
        }
      });
    },
  },
};
</script>

<style>
</style>