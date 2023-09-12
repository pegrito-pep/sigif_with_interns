<template>
  <b-form-group  :label-cols="sizeLabel" :label-cols-lg="sizeLabelLg" label-size="sm" :label="label" label-class="font-weight-normal" label-for="input-sm">
    <div class="upload-container">
      <label>
        <input type="file" @change="selectfile"/>
        <b-img src="@/assets/images/download.png"></b-img>
        
        <span v-if="fileselect" class="file-name">{{ fileselect.name }}</span>
        <span v-else class="title">cliquer pour choisir</span>
      </label>
    </div>
  </b-form-group>
  <!--<b-form-group :label-cols="sizeLabel" :label-cols-lg="sizeLabelLg" label-size="sm" :label="label" label-for="input-sm">
     <input type="text" :disabled="disabled" :style="{'padding': py + 'rem ' + px + 'rem !important'}"  :name="name" :value="value" @input="$emit('input', $event.target.value)" class="form-control-xs" :class="reduceSize" placeholder=""/>
  </b-form-group>-->
</template>

<script>
export default {
  name: "SigifFormGroup",
  props: {
      sizeLabel: {type: Number, default: 2},
      sizeLabelLg: {type: Number, default: 2},
      label: {type:String, default: ''},
   
      value: {type:String, default: ''},

  },
  data(){
      return {
          disable: this.disabled ? true : false,
          fileselect: this.value,
      }
  },

  methods:{
    async selectsanctionfile(e){
      //this.fileProtocoleAccord = this.$refs.fileProtocoleAccord.files[0];
      const docsanction =this.fileSanction=e.target.files[0];
      this.form.documentnotesanction=await this.getBase64(docsanction)
    },
   async  selectfile(){
      const doc =this.fileselect=e.target.files[0];
      this.form.documentnotesanction=await this.getBase64(doc)
    }
  }
}
</script>
<style >
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