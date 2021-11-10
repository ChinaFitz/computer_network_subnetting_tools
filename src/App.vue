<template>
    <div id="app">
        <el-container>
            <el-header height="65px">
                <Nav />
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Nav from "./components/Nav.vue"
    export default {
        name: "App",
        data() {
            return {

            }
        },
        components: {
            Nav,
        }
    }
</script>

<style lang="less">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
