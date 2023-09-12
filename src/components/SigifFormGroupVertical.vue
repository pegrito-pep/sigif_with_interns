<template>
    <b-form-group label-size="sm" label-for="input-sm">
       <template #label><span class="x1fh">{{ label }}</span></template>
       <input type="text" :disabled="disabled" :style="{'padding': py + 'rem ' + px + 'rem !important'}"  :name="name" :value="value" @input="$emit('input', $event.target.value)" class="form-control-xs" :class="reduceSize" placeholder=""/>
    </b-form-group>
</template>

<script>
export default {
    name: "SigifFormGroup",
    props: {
        label: {type:String, default: ''},
        reduceSize: {type:String, default: 'w-100'},
        value: {type:String, default: ''},
        px: {type:Number, default: 0 },
        py: {type:Number, default: 0 },
        disabled: {type:Boolean, default: false},
    },
    data(){
        return {
            disable: this.disabled ? true : false,
            val: this.value,
        }
    },
    computed: {
        name() {
        return this.label.toLowerCase();
        },
    },
}
</script>
<style >
.x1fh {
    font-family: 'Verdana';
    font-size: 13px;
    color: #333333;
    padding: 0px 0px 0px 0px;
    margin: 0px!important;
    font-weight: normal;
    text-align: right;
    white-space: nowrap;
}
.form-control-xs {
    height: calc(1em + .500rem + 2px) !important;
    font-size: .85rem !important;
    line-height: 1.5;
    border-radius: .2rem;
    border: 1px solid darkgreen;
    width: 100%;
    font-weight: 800;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: .25rem;
    /*box-shadow: inset 0 0 0 transparent;*/
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
</style>