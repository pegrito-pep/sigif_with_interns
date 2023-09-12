<template>
    <div class="d-flex">
        <label class="mr-2" for="">{{ libelle }}</label>
        <b-form-select v-model="selected" :options="options" size="sm"></b-form-select>
    </div>
</template>

<script>
export default {
    name: "FormSelect",
    props: {
        libelle: String,
        options: Array,
    },
    data(){
        return {}
    }
}
</script>