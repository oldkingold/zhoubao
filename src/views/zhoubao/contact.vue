<template>
<div class="contact">
    <van-nav-bar
    title="联系方式"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    />
    <van-cell-group>
        <van-cell >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
            <span class="custom-title">电话</span>
            <span class="custom-content">0571-89809186</span>
        </template>
        <template #right-icon>
            <a :href="'tel:' + '0571-89809186'"><van-tag plain color="#41a9fa">拨打</van-tag></a>
        </template>
        </van-cell>
        <van-cell >
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
            <span class="custom-title">微信(小孙老师)</span>
            <span class="custom-content">13958193848</span>
        </template>
        <template #right-icon>
            <span v-clipboard:copy="fuzhi" v-clipboard:success="onCopy"><van-tag plain color="#41a9fa">复制</van-tag></span>
        </template>
        </van-cell>
    </van-cell-group>
</div>
</template>
<script>
export default {
    data() {
        return {
            fuzhi:"wx12313555"
        }
    },
    name: 'Contact',
    methods: {
        onCopy:function () {
            // this.$message.success("内容已复制到剪切板！")
            this.$notify({type: 'primary',message:'微信账号已复制到剪切板！'});
        },
        onClickLeft: function() {
            this.$router.go(-1)
        }
  },
}
</script>

<style scoped>
.contact {
    background-color: #fff;
}
.van-cell {
    background-color: rgb(246, 246, 252);
}
.van-cell-group__title {
    font-size: 16px;
}
.custom-content {
    margin-left: 25px;
    color: rgb(117, 121, 121);
}
.van-tag {
    height: 20px;
}
</style>