<template>
    <div>
            <b-row>
              <b-col>
                    <b-form-group>
                        <label class="p-0 m-0" style="font-weight:300">Code region</label>
                        <b-form-input size="sm" name="nomSite" class="w-100 p-0 m-0" placeholder="" v-model="form.intitule" />
                    </b-form-group>

                          <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300">Nom departement</label>
                        <select :disabled="disableDep" v-model="form.iddepartement" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="departement in _departements" :key="departement.iddepartement" :value="departement.iddepartement"> {{ departement.intitule }}</option>
                        </select>

                        </div>
                    </b-form-group>
                </b-col>
                <b-col>
                     <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300">Nom région</label>
                          <select v-model="form.idregion" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="region in regions" :key="region.idregion" :value="region.idregion"> {{ region.intitule }}</option>
                        </select>
                        </div>
                    </b-form-group>

                      <b-form-group>
                      <div>
                        <label for="" class="mt-0 p-0" style="font-weight:300">Chef-lieu</label>
                        <select name="arrondissement" :disabled="disableArrond" v-model="form.idarrondissement" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" v-validate="{ required: true}" :state="validateState('arrondissement')" aria-describedby="arrondissement" data-vv-as="arrondissement">
                           <option v-for="arrondissement in _arrondissements" :key="arrondissement.idarrondissement" :value="arrondissement.idarrondissement"> {{ arrondissement.intitule }}</option>
                        </select>
                            <b-form-invalid-feedback id="arrondissement">donnée obligatoire</b-form-invalid-feedback>
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>

            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row >
                    <b-col cols="4">
                      
                    </b-col>
                    <b-col cols="4">
                          
                    </b-col>
                </b-row>
            </transition>
            <b-row>
              <b-col>
                 
              </b-col>
              <b-col>
                  
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                  
              </b-col>
              <b-col>
               
              </b-col>
            </b-row>
            
        <b-row>
                <b-form-group class="pl-1 mt-1"><b-form-checkbox :disabled="submitted" v-model="form.statut">{{ form.statut ?  'Actif'  : 'Inactif'}}</b-form-checkbox></b-form-group>   
           </b-row>
           <hr>
          <b-button @click.prevent="addSite" type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small /></b-button>
          <b-button @click.prevent="addSiteAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" >
          Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small /></b-button>
        <error-dialogue ref="errorDialogue"></error-dialogue>
    </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
  import { mapGetters } from 'vuex'
export default {
    name:"site-form",
    components:{ ErrorDialogue},
     computed: {
       ...mapGetters(['user']),
       _departements() {
            return this.departements.filter(elt => elt.region.idregion == this.form.idregion)
        },
        _arrondissements() {
            return this.arrondissements.filter(elt => elt.departement.iddepartement == this.form.iddepartement)
        },
        _typestitres(){
            return this.typestitres.filter(elt => elt.typesite.value == this.form.typesiteoper)
        }

     },
     watch: {
      "form.idregion"(value) {
        if(value!==null&&value.length!==''){
            this.disableDep= false
        }
        else{
            this.disableDep= true
        }
     },
     "form.iddepartement"(value) {
        if(value!==null&&value.length!==''){
            this.disableArrond= false
        }
        else{
            this.disableArrond= true
        }
     },
   
    },
     data: () => ({
        amount: '',
        submitted: false,
        submitted2: false,
        exercices:[],
        form: {
            typesiteoper: "Permis spécial",
            intitule:'',
            utmzone: "3N",
            utmx: "",
            utmy: "",
            attachautorisation: "",
            exerciceFiscal: "2022",
            statut:false,
            idregion: null,
            iddepartement: null,
            idarrondissement: null,
            typetitre:"",
            localite:"",
            exercicefiscal:""
        },
        isNotMinfof:true,
        disableDep:true,
        disableArrond:true,
        requiredTysite:false,
        typestitres:[
            {typesite:{libelle: "Parc Port", value: "PP"}},
            {libelle: "forèt communautaire en convention définitive", value: "FCD", typesite:{libelle: "Parc Foret Communautaire", value: "PFC"}},
            {libelle: "forèt communautaire en convention provisoire", value: "FCP", typesite:{libelle: "Parc Foret Communautaire", value: "PFC"}},
            {typesite:{libelle: "Parc Usine", value: "PU"}},
            {libelle: "AEB", value: "AEB", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "APC", value: "APC", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "ARB", value: "ARB", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Concéssion forrestière en convention définitive", value: "CD", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Concéssion forrestière en convention provisoire", value: "CP", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "forèt communale", value: "FC", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "PEBO", value: "PEBO", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Permis spécial", value: "PS", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Vente de coupe", value: "VC", typesite:{libelle: "Parc Foret", value: "PF"}},
        ],
        typesSite: [],

        listeZone: [
            "3N",
            "2N"
        ],

        typeTitre: [
            "Forêt communautaire en convention définitive",
            "Forêt communautaire en convention provisoire",
        ],
       entite:{
         id:1,
         libelle:''
       },
       arrondissements: [],
       departements: [], 
       regions: []
    }),

    methods: {
        getLocalites() {
            this.$donneesReference.get("arrondissements?size=400").then(response => response.data).then(response => {
                this.arrondissements = response.result.items
                
                for (const dep of this.arrondissements.map(elt => elt.departement)) {
                    if (!this.departements.map(elt => elt.iddepartement).includes(dep.iddepartement)) {
                        this.departements.push(dep)
                    }
                }
                for (const reg of this.departements.map(elt => elt.region)) {
                    if (!this.regions.map(elt => elt.idregion).includes(reg.idregion)) {
                        this.regions.push(reg)
                    }
                }

                this.regions = this.regions.sort((a, b) => a.intitule > b.intitule ? 1 : -1)
            })
        },
        loadSelects(){
            for (const typesite of this.typestitres.map(elt => elt.typesite)) {
                    if (!this.typesSite.map(elt => elt.value).includes(typesite.value)) {
                        this.typesSite.push(typesite)
                    }
                }
        },
        controleChange() {
            console.log("Somethings change");
        },
        validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) 
        { return !this.veeErrors.has(ref);}
            return null;
        },

        resetForm() {
            this.form = {
               typesiteoper: "Permis spécial", intitule:'', utmzone: "3N",utmx: "", utmy: "", attachautorisation: "", exerciceFiscal: "2022",
                idregion: null, iddepartement: null,idarrondissement: null,
            };
             this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        resetContinue() {
            this.form = { intitule:'',utmx: "", utmy: "", attachautorisation: "", exerciceFiscal: "2022",
            };
             this.$nextTick(() => {
                this.$validator.reset();
            });
        },
       
        async addSiteAndContinue(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.form.typesiteoper){this.requiredTysite=true; return;}
            else{this.requiredTysite=false;}
            console.log('données envoyées',this.form);
            this.submitted2 = true
                this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted2 = false 
                    this.$emit('siteAddedAndContinue',response)
                    this.resetContinue()
                    return console.log('respone après ajout', response);
                }).catch(error => {
                    this.submitted2 = false
                    console.log('erreur',error.message)
                    this.errorHappened(error)
                })
            })
        },
        async errorHappened(error) {
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: error.response.data.message,
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
        async addSite(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.form.typesiteoper){this.requiredTysite=true; return;}
            else{this.requiredTysite=false;}
            this.submitted2 = true
            console.log('données envoyées',this.form);
                this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted2 = false 
                    this.$emit('siteAdded',response)
                    this.resetForm()
                    return console.log('respone après ajout', response);
                    //return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted2 = false
                    console.log('erreur',error.message)
                    this.errorHappened(error)
                })
            })
        },
        getDates(){
           let exact = 2000 + new Date().getYear() - 100;
           for (let index = 1; index < 5; index++) {
            this.exercices.push({ libelle: exact - index, value: index + 1, },)
           }
           this.form.exercicefiscal=exact
        },
        
    },
     mounted() {
        this.loadSelects();
        this.getLocalites()
        this.entite.libelle = this.user.profil.organisation;
        if(this.entite.libelle=='MINFOF'){
            this.isNotMinfof=false
        }
        this.getDates();
    },

}
</script>
<style >
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
</style>