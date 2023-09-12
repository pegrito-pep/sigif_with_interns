<template>
  <div>
    
    <b-row>
      <b-col>
          <b-form-group>
          <label class="p-0 m-0"><span style="color: red">*</span>Code</label>
          <b-form-input id="code" name="code" size="sm" class="w-100 p-0 m-0" placeholder v-model="traitement.codetravsyl" :state="validateState('code')" aria-describedby="code" data-vv-as="code"/>
          <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
      <b-col>
         <b-form-group>
          <label class="p-0 m-0"><span style="color: red">*</span>Nom du traitement</label>
          <b-form-input  id="nomtraitement" name="nomtraitement" size="sm" class="w-100 p-0 m-0" placeholder v-model="traitement.nomtraitement" :state="validateState('code')" aria-describedby="code" data-vv-as="code"/>
          <b-form-invalid-feedback id="nomtraitement">{{ veeErrors.first('nomtraitement') }}</b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group>
          <label class="p-0 m-0">Description</label>
        <b-form-textarea placeholder="saissisez ici.." style="height: 6.5em !important" v-model="traitement.description"></b-form-textarea>
        </b-form-group>
      </b-col>
    </b-row>
    <br />

    <b-row>
      <b-form-group class="pl-1 mt-1">
        <b-form-checkbox :disabled="submitted" v-model="invalide" :state="validateState('actif')" aria-describedby="actif" data-vv-as="actif">{{ invalide ? ' actif' : 'inactif'}}</b-form-checkbox>
      </b-form-group>
    </b-row>
    <hr />
      <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="addTraitement" >Enregistrer<b-spinner v-if="submitted" small></b-spinner></b-button>
      <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" @click.prevent="addTraitementAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>
  </div>
</template>

<script>
const php = require("phpjs");
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
  name: "traitement-form",
  props: {
      action: {type: String, default: 'add'},
      title: {type: String, default: 'ajout d\'une essence'},
      editTraitment: {type: Object, default: null}
  },
  data: () => ({
    amount: "",
    submitted: false,
    submitted2: false,
    typesProduits:[],
    essences:[],
    showOverlay:true,
    traitement:{
      nomtraitement:"",
      codetravsyl : "",
      description: "",
      invalide: "",
    },
    invalide:false
      
  }),
  methods: {
    validateState(ref) {
      if (this.veeFields[ref] &&(this.veeFields[ref].dirty || this.veeFields[ref].validated)) 
      { return !this.veeErrors.has(ref);}
      return null;
    },
    resetForm() {
      this.traitement = {
        nomtraitement:"",
        codetravsyl : "",
        description: "",
        invalide: "",
      };
      this.invalide=""
      this.$nextTick(() => {
          this.$validator.reset();
      });
    },
    async addTraitement(){
      this.$validator.validateAll().then(result => {if (!result) {return;}
      this.traitement.invalide=this.isactive
      this.traitement.intituleEn = "My treatement",
      this.submitted = true
          this.$donneesReference.post('traitements-sylvicoles', this.traitement).then(response => {
              this.submitted = false 
              this.$emit('traitementadded',response)
              this.resetForm()
              return App.notifySuccess(response.data.message);
          }).catch(error => {
              this.submitted = false
              console.log('erreur',error.message)
              this.errorHappened(error)
          })
      })
    },
    async addTraitementAndContinue(){
      this.$validator.validateAll().then(result => {if (!result) {return;}
            this.traitement.invalide=this.isactive
            this.traitement.intituleEn = "My treatement",
            this.submitted2 = true
                this.$donneesReference.post('traitements-sylvicoles', this.traitement).then(response => {
                    this.submitted2 = false 
                    this.$emit('traitementaddedandcontinue',response)
                    this.resetForm()
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted2 = false
                    console.log('erreur',error.message)
                    this.errorHappened(error)
                })
      })
    },

  },
   async mounted() {
        
  }
};
</script>
<style >
.setwidth > input {
  width: 154px !important;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: "choisir";
}
.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
  }

</style>