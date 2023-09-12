<template>
    <div class="contents">
        <label class="mr-1" style="white-space: nowrap;" for="">{{ libelle }}</label>
        <div class="select"><v-select label="libelle"  :options="options"></v-select></div>
    </div>
</template>

<script >
export default {
    name: "SelectInput",
    props: {
        libelle: String,
        options: Array,
    },
    data(){
        return {}
    }
}
</script>

<style scoped>
    .select{
        height: 25px !important;
        width: 100% !important;
    }
    
</style>