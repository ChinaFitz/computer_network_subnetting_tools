<template>
    <div id="hello">
        <div>hi!👋 欢迎使用该工具辅助您学习计算机网络😁</div>
        <div>Author: ChinaFitz</div>
        <div>
            <span>个人前端学习博客: </span>
            <el-link type="primary" href="https://www.cnblogs.com/fitzlovecode/" style="font-size: 16px; font-weight: bold;">
                博客园
            </el-link>
        </div>
        <div>
            <span>Gitee地址: </span>
            <el-link type="primary" href="https://github.com/ChinaFitz/" style="font-size: 16px; font-weight: bold;">
                https://gitee.com/chinafitz
            </el-link>
        </div>
        <div>
            <span>Github地址: </span>
            <el-link type="primary" href="https://github.com/ChinaFitz/" style="font-size: 16px; font-weight: bold;">
                https://github.com/ChinaFitz
            </el-link>
        </div>
    </div>
</template>


<script>

    export default {
        name: "HelloPage", // 指定组件名
        data: function () {
            return {
                
            }
        }
    }

</script>

<style lang="less" scoped>
    #hello {
        width: 100%;
        height: 100%;
        font-size: 20px;
        margin-top: 14%;

        > div {
            margin: 10px 0;
        }
    }
</style>