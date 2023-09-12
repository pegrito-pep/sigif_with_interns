<template>
    <div >
        <SigifHeader />
        <div>
            <slot />
        </div>
        <!--<ModulesFooter />-->
    </div>
   
</template>

<script>
import SigifHeader from "@/components/templates/SigifHeader.vue"
import ModulesFooter from  '../components/ModulesFooterc.vue';
export default {
    name: 'ModuleLayout',
    components: {
        SigifHeader,
        ModulesFooter,
    }
}
</script>

<style scoped>
.wrapper{
    flex: 1;
}
</style>