<template>
  <div class="sigifcustom-select" :class="setWidth" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {type: Array,required: true,},
    default: {type: String,required: false,default: null,},
    tabindex: {type: Number,required: false,default: 0,},
    setWidth: {type:String, default: 'w-100'},
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  },
};
</script>

<style scoped>
.sigifcustom-select {
  position: relative;
  /*width: 100%;*/
  text-align: left;
  outline: none;
  height: 27px;
  line-height: 27px;
}

.sigifcustom-select .selected {
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid #666666;
  color: #212529;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.sigifcustom-select .selected.open {
  border: 1px solid #caf09e;
  border-radius: 6px 6px 0px 0px;
}

.sigifcustom-select .selected:after {
  position: absolute;
  content: "";
  top: 14px;
  right: 1em;
  width: 0;
  height: 0;
  border: 5px solid transparent;
  border-color: #212529 transparent transparent transparent;
}

.sigifcustom-select .items {
  color: #212529;
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid #ad8225;
  border-left: 1px solid #ad8225;
  border-bottom: 1px solid #ad8225;
  position: absolute;
  background-color: #fff;
  left: 0;
  right: 0;
  z-index: 1;
}

.sigifcustom-select .items div {
  color: #212529;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.sigifcustom-select .items div:hover {
  background-color: #caf09e;
}

.selectHide {
  display: none;
}
</style>
