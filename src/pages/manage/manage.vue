<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list :info="info" :list="list" @init="initPage" @edit="edit"></v-list>
    <v-form :info="info" :list="list" @init="initPage" ref="form"></v-form>
    <el-pagination
      layout="prev, pager, next"
      background
      :page-size="size"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { editInfo } from "../../mixins/editInfo.js";
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { requsercount, requserlist } from "../../request/api";
export default {
  mixins: [editInfo],
  data() {
    return {
      list: [],
      total: 0,
      size: 2,
      page: 1,
    };
  },
  components: {
    vList,
    vForm,
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    this.initPage();
  },
  methods: {
    ...mapActions({}),
    initPage() {
      this.init();
      this.getTotal();
    },
    init() {
      requserlist({ size: this.size, page: this.page }).then((res) => {
        let list = res.data.list ? res.data.list : [];

        if (list.length == 0 && this.page != 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    //获取总条数
    getTotal() {
      requsercount().then((res) => {
        this.total = res.data.list[0] ? res.data.list[0].total : 0;
      });
    },
    changePage(e) {
      this.page = e;
      this.init();
    },
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>