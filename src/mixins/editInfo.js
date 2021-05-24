export const editInfo = {
    data() {
        return {
            info: {
                isshow: false,
                isadd: true,
            },
        }
    },
    methods: {
        edit(id) {
            this.$refs.form.getOne(id);
            // console.log(id);
        },
        add() {
            this.info.isshow = true;
            this.info.isadd = true;
        },
    },
}