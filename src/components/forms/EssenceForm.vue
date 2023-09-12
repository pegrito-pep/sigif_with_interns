<template>
  <div>
    <b-overlay :show="showOverlay" rounded="sm">
    <b-row>
      <b-col>
         <!-- <b-form-group>
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Categories des essences</label>
                            <select name="tyepsite" v-model="form.typesiteoper" @change="controleChange" :class="requiredTysite ? 'is-red' : ''" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option v-for="site in typesSite" :key="site.value" :value="site.value"> {{ site.libelle }}</option>
                            </select>
                        </div>
                    </b-form-group> -->
      </b-col>
      <b-col>

            <b-form-group>
                <div>
                    <label for="" class="m-0 p-0" style="font-weight:300">Categories des essences</label>
                    <select name="libelle" v-model="essence.catEssence" :class="!requiredCatEssence ? 'is-red' : ''" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="catEssence in catEssences" :key="catEssence.idCatEssence" :value="catEssence.codeCatEssence"> {{ catEssence.libelle }}</option>
                    </select>
                </div>
            </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="8">
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>Nom scientifique</label>
            <b-form-input id="nomscientifique" name="nomscientifique" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.nomscientifique" v-validate="{ required: true, min: 4}" :state="validateState('nomscientifique')" aria-describedby="nomscientifique" data-vv-as="nomscientifique"/>
            <b-form-invalid-feedback id="nomscientifique">{{ veeErrors.first('nomscientifique') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>DME</label>
            <b-form-input id="dme" name="dme" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.dme" :state="validateState('dme')" aria-describedby="dme" data-vv-as="dme"/>
            <b-form-invalid-feedback id="dme">{{ veeErrors.first('dme') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>code MINFOF</label>
            <b-form-input id="codeminfof" name="codeminfof" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.codedf10" :state="validateState('codeminfof')" aria-describedby="codeminfof" data-vv-as="codeminfof"/>
            <b-form-invalid-feedback id="codeminfof">{{ veeErrors.first('codeminfof') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>Nom commercial</label>
            <b-form-input id="nomcommercial" name="nomcommercial" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.nomusuelEn" :state="validateState('nomcommercial')" aria-describedby="nomcommercial" data-vv-as="nomcommercial"/>
            <b-form-invalid-feedback id="nomcommercial">{{ veeErrors.first('nomcommercial') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>code douanier/tarifaire</label>
            <b-form-input id="codedouanier" name="codedouanier" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.codedouanier" :state="validateState('codedouanier')" aria-describedby="codedouanier" data-vv-as="codedouanier"/>
            <b-form-invalid-feedback id="codedouanier">{{ veeErrors.first('codedouanier') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>code SH</label>
            <b-form-input id="codesh" name="codesh" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.codesh" :state="validateState('codesh')" aria-describedby="codesh" data-vv-as="codesh"/>
            <b-form-invalid-feedback id="codesh">{{ veeErrors.first('codesh') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>Code CEMAC grume</label>
            <b-form-input id="codecemac" name="codecemac" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.codecemacgrume" :state="validateState('codecemac')" aria-describedby="codecemac" data-vv-as="codecemac"/>
            <b-form-invalid-feedback id="codecemac">{{ veeErrors.first('codecemac') }}</b-form-invalid-feedback>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0"><span style="color: red">*</span>Code CEMAC débité</label>
            <b-form-input id="codecemacdebite" name="codecemacdebite" size="sm" class="w-100 p-0 m-0" placeholder v-model="essence.codecemacdebite" :state="validateState('codecemacdebite')" aria-describedby="codecemacdebite" data-vv-as="codecemacdebite"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col> <b-form-checkbox :disabled="submitted" v-model="essence.intexportgrume" value="1" unchecked-value="0">{{ essence.intexportgrume ? 'Non Interdiction export grume' : 'Interdiction export grume'}}</b-form-checkbox></b-col>
        <b-col> <b-form-checkbox :disabled="submitted" v-model="essence.intexploitation" value="1" unchecked-value="0">{{ essence.intexportgrume ? 'Non interdit a l\'exploitation' : 'interdit a l\'exploitation'}}</b-form-checkbox></b-col>
      </b-row>
      <b-row>
        <b-col> <b-form-checkbox :disabled="submitted" v-model="essence.quotas" value="1" unchecked-value="0">{{ essence.intexportgrume ? 'Quotas non autorisé' : 'Quotas autorisé'}}</b-form-checkbox></b-col>
        <b-col> <b-form-checkbox :disabled="submitted" v-model="essence.invalide" value="1" unchecked-value="0">{{ essence.intexportgrume ? 'actif' : 'inactif'}}</b-form-checkbox></b-col>
      </b-row>
      <br />
      <hr />
      <b-button  class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="addEssence" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
      <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" @click.prevent="addEssenceAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>
    </b-overlay>
    <serveur-error-box ref="errorDialogue"></serveur-error-box>
  </div>
</template>

<script>
const php = require("phpjs");
import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
  name: "essence-form",
  components: { ServeurErrorBox },
  props: {
      action: {type: String, default: 'add'},
      title: {type: String, default: 'ajout d\'une essence'},
      editProfil: {type: Object, default: null}
  },
  data: () => ({
    catEssences:[],
    essence:{
      catEssence:"",
      nomusuelEn:"",
      nomscientifique:"",
      codecemacdebite:"",
      codecemacgrume:"",
      codedf10:"",
      codedouanier:"",
      codesh:"",
      dme:"",
      intexportgrume:"",
      intexploitation:"",
      quotas:"",
      invalide:""
    },
    submitted: false,
    submitted2:false,
    showOverlay:false,
    requiredCatEssence:true,//champ de controle que la qualite est sélectionnée
  }),
  methods: {
    async createQuittanceDF10() {
      if (php.empty(this.modal.idCompte) || php.empty(this.modal.montant)) {
        return App.error(
          "Veuillez entrer le montant de la recharge et le compte à recharger"
        );
      }
      const data = {
        numquittance: this.numquittance,
        datequittance: this.datequittance,
        montant: this.montant,
        idCompte: this.idCompte,
        payerCharge: this.payerCharge,
        recu: await this.$getBase64(this.photRecu)
      };
      for (const key in this.modal) {
        formData.append(key, this.modal[key]);
      }
      this.submitted = true;

      /*axios.post('occupations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.submitted = false 
                this.$emit('payed')
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })*/
    },
    async getEssenceData(){
      this.showOverlay=true
          try {
            this.catEssences = await this.$donneesReference.get("categoriesessences").then(response => response.data.result.items);
          } catch (error) {
            console.log(error.message);
          }
      this.showOverlay=false;
    },
    validateState(ref) {
      if (this.veeFields[ref] &&(this.veeFields[ref].dirty || this.veeFields[ref].validated)) 
      { return !this.veeErrors.has(ref);}
      return null;
    },
    async doDelete() {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur !!!',
          message: 'Erreur interne du serveur',
      })
    },
    resetForm() {
      this.essence = {
        catEssence:"",
        nomusuelEn:"",
        nomscientifique:"",
        codecemacdebite:"",
        codecemacgrume:"",
        codedf10:"",
        codedouanier:"",
        codesh:"",
        dme:"",
        intexportgrume:"",
        intexploitation:"",
        quotas:"",
        invalide:""
      };

      this.$nextTick(() => {
          this.$validator.reset();
      });
    },
    async addEssence() {
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.essence.catEssence){this.requiredCatEssence=false; return;}
                else{this.requiredCatEssence=true;}
                this.essence.idessence=this.essence.codedf10
                console.log('données envoyées ',this.essence);
                this.submitted = true
                if(this.action=="add"){
                    this.$donneesReference.post('essences', this.essence).then(response => {
                       // this.submitted = false 
                        this.$emit('essenceAdded')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        if(error.response.data.status==500){
                        return this.doDelete()
                        }
                    })
                }
               /* if(this.action="edit"){
                    this.submitted = false
                    this.$donneesReference.put('essences/'+this.editEssence.idEssence, this.essence).then(response => {
                        this.submitted = false 
                        this.$emit('essenceEdited')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        return App.alertError(error.message)
                    })
                }*/
                
            });
    },
    addEssenceAndContinue(){
          this.$validator.validateAll().then(result => {if (!result) {return;}
          if(!this.essence.catEssence){this.requiredCatEssence=false; return;}
                else{this.requiredCatEssence=true;}
                console.log('données envoyées ',this.essence);
                this.submitted = true
                if(this.action=="add"){
                    this.$donneesReference.post('essences', this.essence).then(response => {
                       // this.submitted = false 
                        this.$emit('essenceAddedAndContinue')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        if(error.response.data.status==500){
                        return this.doDelete()
                        }
                    })
                }
                /*if(this.action="edit"){
                    this.submitted = false
                    this.$donneesReference.put('essences/'+this.editEssence.idEssence, this.essence).then(response => {
                        this.submitted = false 
                        this.$emit('essenceEdited')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        return App.alertError(error.message)
                    })
                }*/
                
            });
    },
     
  },
   async mounted(){
      await this.getEssenceData()
      /*Validator.extend("unique", {
          validate: isUnique,
          getMessage: (field, params, data) => data.message
      });*/
  }
};
</script>
<style>
  .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
  }
</style>