<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list :info="info" :list="list" @init="init" @edit="edit"></v-list>
    <v-form :info="info" :list="list" @init="init" ref="form"></v-form>
  </div>
</template>
<script>
import {editInfo} from "../../mixins/editInfo.js";
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";
import { reqrolelist } from "../../request/api";
export default {
  mixins: [editInfo],
  data() {
    return {
      list: [],
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
    this.init();
  },
  methods: {
    ...mapActions({}),
    init() {
      reqrolelist({ istree: true }).then((res) => {
        this.list = res.data.list ? res.data.list : [];
      });
    },
    
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>