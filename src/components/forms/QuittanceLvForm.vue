<template>
  <div>
    <b-row class="my-1">
        <b-col cols="4">
          <label class="p-0 m-0" style="font-weight:300">Entité Forrestière</label>
        </b-col>
        <b-col cols="8">
            <select disabled class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                <option selected="selected">{{ entite.libelle }}</option>
            </select>
        </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="4">
        <label class="p-0 m-0" style="font-weight:300">N° de la Quittance</label>
      </b-col>
      <b-col cols="8">
          <input type="text" v-model="form.numquittance" class="sigif-form-control w-75"/>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="4">
        <label class="p-0 m-0" style="font-weight:300">Date quittance FSDF</label>
      </b-col>
      <b-col cols="8">
        <calendar class="w-75"  v-model="form.datequittancelv" :format="format" :clear-button="clear" :placeholder="placeholder" :pane="1" ></calendar>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="4">
        <label class="p-0 m-0" style="font-weight:300">Montant</label>
      </b-col>
      <b-col cols="8">
        <v-numeric v-model="form.montant" currency=" " separator=","  style="border-radius: 5px;" class="w-50"></v-numeric>
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="4">
        <label class="p-0 m-0" style="font-weight:300">Nombre de LV</label>
      </b-col>
      <b-col cols="8">
        <input type="text" v-model="form.nmblv" class="sigif-form-control w-50" />
      </b-col>
    </b-row>
    <b-row class="my-1">
      <b-col cols="4">
        <label class="p-0 m-0" style="font-weight:300">Joindre la quittance</label>
      </b-col>
      <b-col cols="8">
        <div class="upload-container">
          <label>
            <input type="file" @change="selectFileQuittance"/>
            <b-img src="@/assets/images/download.png"></b-img>
            
            <span v-if="filequittance" class="file-name">{{ filequittance.name }}</span>
            <span v-else class="title">cliquer pour choisir</span>
          </label>
        </div>
      </b-col>
    </b-row>
    <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="createQuitanceLV">Enregistrer<b-spinner v-if="submitted" small></b-spinner> </b-button>
    <error-dialogue ref="errorDialogue"></error-dialogue>
  </div>
</template>

<script>
const php = require('phpjs');
import { mapGetters } from 'vuex'

import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
Vue.use(VueNumeric)

export default {
  components:{
      ErrorDialogue
  },
   computed: {
    ...mapGetters(['user']),

   },

  data: () => ({
      amount: '',
      submitted: false,
      form: {
        datequittancelv: "",
        numquittance: "",
        montant: '',
        nmblv: '',
        iudquittancelv: "",
      },
      format:"yyyy-MM-dd",
      clear:true,
      placeholder:"date quittance",
      entite:{
        id:'',
        libelle:''
      },
      filequittance:null
  }),
  methods: {
      async handlefilequitance(e){
          const fichierquittancde =e.target.files[0];
          this.form.iddocument=await this.getBase64(fichierquittancde)
      },
      async errorHappened(error) {
          const ok = await this.$refs.errorDialogue.show({
             title: 'Erreur survenue',
             message: "erreur interne interne du serveur",
             okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorDialogue._close();
              this.$emit('closeForm')
          } else {
             this.$refs.errorDialogue._close();
             this.resetForm()
          }
      },
      async createQuitanceLV(){   
          this.submitted = true
          console.log("donées finales", this.form)
          this.$fiscalite.post('quittances-lv', this.form).then(response => {
              this.submitted = false 
              this.$emit('quittancelvAdded',response)
              this.resetForm()
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              this.submitted = false
              console.log('erreur site',error.message)
              this.errorHappened(error)
          })
      },
      resetForm() {
        this.form = {
          datequittancelv: "", numquittance: "", montant: '', nmblv: '', iudquittancelv: "",
        };
      },
      validateState(ref) {
          if (
              this.veeFields[ref] &&
              (this.veeFields[ref].dirty || this.veeFields[ref].validated)
          ) 
          { return !this.veeErrors.has(ref);}
              return null;
      },
      getBase64(file) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
          });
      },
      async selectFileQuittance(e){
        const filequittance = this.filequittance =  e.target.files[0];
        this.form.iudquittancelv=await this.getBase64(filequittance)
      },
  },
  async mounted(){
    this.entite.libelle = this.user.profil.organisation;
    //await this.getTypesTitres();
  }
}
</script>
<style>
.upload-container label input {
  display: none;
}
.sigif-form-control{
  padding: .25rem .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  width: 100%;
  height: calc(1em + .500rem + 2px) !important;
}
.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
}
.border-danger{
  border: 2px solid red;
}
</style>