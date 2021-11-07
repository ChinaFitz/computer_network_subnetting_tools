<template>
    <div>
        
        <div 
            id="type1"
            v-if="subnet_type === '1'"
        >
            1号问题
        </div>

        <div 
            id="type2"
            v-if="subnet_type === '2'"
        >
            2号问题
        </div>

        <div 
            id="type3"
            v-if="subnet_type === '3'"
        >
            3号问题
        </div>

        <div 
            id="type4"
            v-if="subnet_type === '4'"
        >
            4号问题
        </div>

    </div>
</template>


<script>
    import {mapState} from "vuex"
    import utils from "../../utils"

    export default {
        name: "Process3", // 指定组件名
        data: function () {
            return {
                
            }
        },
        computed: {
            ...mapState([
                "subnet_type",
            ])
        },
        mounted() {
            console.log(typeof this.subnet_type)
        },
    }

</script>

<style lang="less" scoped>
    
</style>