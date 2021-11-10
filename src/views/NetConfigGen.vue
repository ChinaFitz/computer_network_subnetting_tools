<template>
    <div
        v-loading="true"
        element-loading-text="拼命开发中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, .8)"
    >
        NetConfigGen
    </div>
</template>

<script>

    export default {
        name: "NetConfigGen", // 指定组件名
        data: function () {
            return {

            }
        }
    }
</script>

<style lang="less" scoped>
    div {
        height: 87vh;
    }
</style>
