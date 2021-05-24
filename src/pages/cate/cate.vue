<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-list :info="info" @edit="edit"></v-list>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>
<script>
import { editInfo } from "../../mixins/editInfo.js";
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list";
import vForm from "./components/form";

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
    
  },
  methods: {
    ...mapActions({}),
    
  },
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>