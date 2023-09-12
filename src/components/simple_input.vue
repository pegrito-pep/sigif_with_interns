<template>
    <div class="contents">
        <label class="mr-1" style="white-space: nowrap;" for="" :style="libelle === 'nullable' ? 'visibility:hidden' : ''">{{ libelle }}</label>
        <input v-model="val" @input="(v) => { $emit('input', v)}"  type="text" class="search-bar-custum-input form-control" :disabled="disable"/>
    </div>
</template>

<script>
export default {
    name: "SimpleInput",
    props: {
        libelle: String,
        options: Array,
        disabled: Boolean,
        value: String,
    },
    data(){
        return {
            disable: this.disabled ? true : false,
            val: this.value,
        }
    }
}
</script>
<style >
.form-control{
  height: 30px !important;
}
label{
    font-weight: normal !important;
}
.contents{
    display: flex;
    flex-direction: row;
    height: 30px !important;
}
</style>