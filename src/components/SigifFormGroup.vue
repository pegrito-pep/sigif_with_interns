<template>
    <b-form-group :label-cols="sizeLabel" :label-cols-lg="sizeLabelLg" label-size="sm" label-for="input-sm">
        <template #label><span class="x1fh" :style="{'font-weight': fontWeight+'!important'}">{{ label }}</span></template>
        <input type="text" :disabled="disabled" :style="{'padding': py + 'rem ' + px + 'rem !important'}"  :name="name" :value="value" @input="$emit('input', $event.target.value)" class="new-form-control-xs" :class="reduceSize" placeholder=""/>
    </b-form-group>
</template>

<script>
export default {
    name: "SigifFormGroup",
    props: {
        sizeLabel: {type: Number, default: 4},
        sizeLabelLg: {type: Number, default: 3},
        label: {type:String, default: ''},
        reduceSize: {type:String, default: 'w-100'},
        value: {type:String, default: ''},
        px: {type:Number, default: .5 },
        py: {type:Number, default: .125 },
        fontWeight:{type:String, default:'normal'},
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
    padding: 0px 0px 4px 0px;
    text-align: right;
    white-space: nowrap;
}
.new-form-control-xs {
    height: calc(0.8em + .300rem + 2px) !important;
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