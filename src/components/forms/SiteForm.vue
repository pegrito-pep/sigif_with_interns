<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlay">
            <b-row>
               <b-col>
                    <b-form-group>
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Type de site</label>
                            <select name="tyepsite" v-model="form.typesiteoper" @change="controleChange" :class="requiredTysite ? 'is-red' : ''" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option v-for="site in typesSite" :key="site.value" :value="site.value"> {{ site.libelle }}</option>
                            </select>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col >
                    <b-form-group>
                        <label class="p-0 m-0" style="font-weight:300">Nom du site</label>
                        <b-form-input size="sm" name="nomSite" class="w-100 px-2 py-0 m-0" placeholder="" v-model="form.intitule" />
                    </b-form-group>
                </b-col>
            </b-row>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row v-if="form.typesiteoper=='PFC'||form.typesiteoper=='PFO'">
                    <b-col>
                        <b-form-group>
                            <div>
                                <label for="" class="m-0 p-0" style="font-weight:300">Type de titre</label>
                                <select v-model="form.typetitre" @change="getTitres" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option v-for="typetitre in _typestitres" :key="typetitre.value" :value="typetitre.value"> {{ typetitre.libelle }}</option>
                                </select>
                            </div>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                            <div>
                                <label for="" class="m-0 p-0" style="font-weight:300">N° du titre</label>
                                <select :disabled="!typetitreSet" v-model="form.idaac" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option v-for="titre in titres" :key="titre.numtitre" :value="titre.numtitre"> {{ titre.numtitre }}</option>
                                </select>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
            </transition> 
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row v-if="form.typesiteoper=='PS'||form.typesiteoper=='PRU'||form.typesiteoper=='AUT'||form.typesiteoper=='PFO'">
                    <b-col cols="4">
                            <b-form-group>
                                <div>
                                    <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red; font-size: .9rem">*</span>Exercice fiscal</label>
                                    <select v-model="form.exercice" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option selected> {{ form.exercice }}</option>
                                        <option v-for="exercice in exercices" :key="exercice.value" :value="exercice.libelle"> {{ exercice.libelle }}</option>
                                    </select>
                                </div>
                            </b-form-group>
                    </b-col>
                    <b-col cols="8" v-if="form.typesiteoper=='PFO'||form.typesiteoper=='AUT'">
                            <b-form-group>
                            <div>
                                <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span> Localité</label>
                                 <b-form-input size="sm" name="nomSite" class="w-100 px-2 py-0 m-0" placeholder="" v-model="form.localite" />

                                </div>
                            </b-form-group>
                    </b-col>
                </b-row>
                <b-row v-if="form.typesiteoper=='MIN'">
                    <b-col>
                        <b-form-group>
                            <div>
                                <label for="" class="m-0 p-0" style="font-weight:300">Type de site MINFOF</label>
                                <select name="tyepsite" v-model="form.typesiteminfof" @change="controleChange" :class="requiredTysite ? 'is-red' : ''" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                        <option v-for="typesite in typesSiteminfof" :key="typesite.value" :value="typesite.value"> {{ typesite.libelle }}</option>
                                </select>
                            </div>
                        </b-form-group>
                    </b-col>
                </b-row>
            </transition>

            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row  v-if="form.typesiteoper=='MF'">
                        <b-col cols="12">
                            <b-form-group  class="m-0 p-0">
                                <label for="" class="font-weight: bold m-0 pr-2">Type de site MINFOF</label><br>
                                    <select  v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                                        {{ status.libelle }}
                                    </option>
                                </select>
                            </b-form-group> 
                        </b-col>
                </b-row>
            </transition>
            <b-row>
              <b-col>
                    <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span>Région</label>
                          <select v-model="form.idregion" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="region in regions" :key="region.idregion" :value="region.idregion"> {{ region.intitule }}</option>
                        </select>
                        </div>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span>Departement</label>
                        <select :disabled="disableDep" v-model="form.iddepartement" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="departement in _departements" :key="departement.iddepartement" :value="departement.iddepartement"> {{ departement.intitule }}</option>
                        </select>

                        </div>
                    </b-form-group>
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                    <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300"><span style="color: red;font-size: .9rem">*</span>Arrondissement</label>
                        <select name="arrondissement" :disabled="disableArrond" v-model="form.idarrondissement" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" v-validate="{ required: true}" :state="validateState('arrondissement')" aria-describedby="arrondissement" data-vv-as="arrondissement">
                           <option v-for="arrondissement in _arrondissements" :key="arrondissement.idarrondissement" :value="arrondissement.idarrondissement"> {{ arrondissement.intitule }}</option>
                        </select>
                            <b-form-invalid-feedback id="arrondissement">donnée obligatoire</b-form-invalid-feedback>
                        </div>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                      <div>
                        <label for="" class="m-0 p-0" style="font-weight:300">Entité forestière</label>
                        <select :disabled="isNotMinfof" class="m-0 p-0" v-model="entite.libelle"   style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                        </select>
                        </div>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-card>
                 <template #header>
                    <h6 class="mb-0 font-weight-bold text-center">Coordonnées UTM</h6>
                </template>
                <b-row>
                    <b-form-group>
                            <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Zone</label>
                            <select name="zone" v-model="form.utmzone" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 6px) !important;">
                                <option v-for="(zone, index) in listeZone" :value="zone" :key="index" :selected="index==0">
                                    {{ zone }}
                                </option>
                            </select>
                            <b-form-invalid-feedback id="zone">donnée obligatoire</b-form-invalid-feedback>
                            </div>
                    </b-form-group>

                    <b-col>
                        <b-form-group>
                            <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">X</label>
                            <b-form-input name="x" size="sm" class="px-2 py-0 m-0" placeholder="" v-model="form.utmx" v-validate="{ required: true}" :state="validateState('x')" aria-describedby="x" data-vv-as="x"/>
                            <b-form-invalid-feedback id="x">donnée obligatoire</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                            <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Y</label>
                            <b-form-input name="y" size="sm" class="px-2 py-0 m-0" placeholder="" v-model="form.utmy" v-validate="{ required: true}" :state="validateState('y')" aria-describedby="y" data-vv-as="y"/>
                            <b-form-invalid-feedback id="y">donnée obligatoire</b-form-invalid-feedback>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row v-if="form.typesiteoper=='PRU'">
                    <h6 class="mb-0 font-weight-bold text-center">Autorisation d'enregistrement du site</h6>
                    <b-form-group>
                        <label class="p-0 m-0" style="font-weight:300">Attacher autorisation</label>
                        <input type="file" size="sm" class="w-100 p-0 m-0" ref="attacheautorisation"  @change="selectattacheautorisationFile" id="attacheautorisation" placeholder=""/>
                    </b-form-group>
                </b-row>
            </transition>

            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-row v-if="form.typesiteoper=='SP'||form.typesiteoper=='PP'||form.typesiteoper=='UTB'">
                    <b-form-group>
                        <label class="p-0 m-0" style="font-weight:300">Attacher certificat d'exportateur</label>
                        <input type="file" @change="selectcertificatexportateurFile" size="sm" class="w-100 p-0 m-0" placeholder="" />
                    </b-form-group>
                </b-row>
            </transition>
           <b-row>
                <b-form-group class="pl-1 mt-1"><b-form-checkbox :disabled="submitted" v-model="form.statut">{{ form.statut ?  'desactiver le site'  : 'activer le site'}}</b-form-checkbox></b-form-group>   
           </b-row>
           <hr>
            <b-button @click.prevent="addSite" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
            <b-button @click.prevent="addSiteAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" >
            Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>
                <error-dialogue ref="errorDialogue"></error-dialogue>
        </b-overlay>
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
            return this.departements.filter(elt => elt.regionDto.idregion == this.form.idregion)
        },
        _arrondissements() {
            return this.arrondissements.filter(elt => elt.departementdto.iddepartement == this.form.iddepartement)
        },
        _typestitres(){
            return this.typestitres.filter(elt => elt.typesite.value == this.form.typesiteoper)
        }

     },
       props: {
      action: {type: String, default: 'add'},
      title: {type: String, default: 'ajout d\'une entite'},
    
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
        showOverlay: false,
        typetitreSet:false,//proprité permettant de controler le select du titre
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
            certificatexportateurfile:"",
            exercice: "2022",
            statut:false,
            idregion: null,
            iddepartement: null,
            idarrondissement: null,
            typetitre:"",
            localite:"",
            idorganisation:"",
            idaac:"",
            typesiteminfof:""
        },

          search:{
                statut:""
     },

        optionsStatus:[{key:"ADMINISTRATION", libelle: "Administration centrale"},
        {key:"DEPARTEMENTALE", libelle: "Délégation départementale"},
        {key:"REGIONALE", libelle: "Délégation régionale"}, 
        {key:"CONTROLE", libelle: "Poste de controle forestier"},
         {key:"CONTROLE ROUTIER", libelle: "Poste de controle frontalier/routier"},
        {key:"CONTROL FORESTIER", libelle: "Poste de controle forestier port"}],


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
            {libelle: "Concéssion forrestière en convention définitive", value: "fc", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Concéssion forrestière en convention provisoire", value: "fs", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "forèt communale", value: "FC", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "PEBO", value: "PEBO", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Permis spécial", value: "PS", typesite:{libelle: "Parc Foret", value: "PF"}},
            {libelle: "Vente de coupe", value: "VC", typesite:{libelle: "Parc Foret", value: "PF"}},
        ],
        typesSite: [
            {libelle:"Permis Spécial", value:"PS"},
            {libelle:"Parc Rupture", value:"PRU"},
            {libelle:"Site Port", value:"SP"},
            {libelle:"Parc Port", value:"PP"},
            {libelle:"Unité de transformation de bois", value:"UTB"},
            {libelle:"Parc Foret communautaire", value:"PFC"},
            {libelle:"Site Cemac", value:"SE"},
            {libelle:"Minfof", value:"MIN"},
            {libelle:"Autres sites", value:"AUT"},
            {libelle:"Parc Foret", value:"PFO"},
            {libelle:"Pste de controle forrestier", value:"PORT"},
        ],
        typesSiteminfof:[
            {libelle :"Administration centrale", value:"AC"},
            {libelle :"Déléguation départementale", value:"DDEP"},
            {libelle :"Déléguation Régionale", value:"DREG"},
            {libelle :"Poste de controle forrestier", value:"PCFC"},
            {libelle :"Poste de controle forrestier port", value:"PORT"},
            {libelle :"Poste de controle frontalier/routier", value:"CPT"},
        ],

        listeZone: ["3N","2N"],

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
       regions: [],
       titres:[]
    }),

    methods: {
        getLocalites() {
            this.showOverlay=true;
            if(!php.empty(this.$store.state.arrondissementsfournis)){
                this.arrondissements = this.$store.state.arrondissementsfournis
            }else{
                this.$donneesReference.get("arrondissements/raw").then(response => response.data).then(response => {
                this.arrondissements = response.result.Items
                this.$store.dispatch('arrondissementsfournis', this.arrondissements)
            })

            }
            for (const dep of this.arrondissements.map(elt => elt.departementdto)) {
                    if (!this.departements.map(elt => elt.iddepartement).includes(dep.iddepartement)) {
                        this.departements.push(dep)
                    }
            }
            for (const reg of this.departements.map(elt => elt.regionDto)) {
                if (!this.regions.map(elt => elt.idregion).includes(reg.idregion)) {
                    this.regions.push(reg)
                }
            }
            this.regions = this.regions.sort((a, b) => a.intitule > b.intitule ? 1 : -1)
            this.showOverlay=false;

           
        },

        async selectattacheautorisationFile(e){
            const attacheautorisation =e.target.files[0];
            this.form.attacherautorisation=await this.getBase64(attacheautorisation)
        },
        controleChange() {
            console.log("Somethings change");
        },
        async getTitres(){
            this.showOverlay= true;
            const params = this.getRequestParams(0,20);
            
            try {
                this.titres= await this.$titres.get("titres/"+this.form.typetitre, {params}).then(response => response.data.result.items || [])
            } catch (error) {
                this.showOverlay= false;
                console.log('data',error.response.data);
                this.errorHappened(error)
            }

            if(this.titres.length>0){
                this.typetitreSet=true;
            }
            this.showOverlay= false;
            console.log('taille',this.titres.length);
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
                idregion: null, iddepartement: null,idarrondissement: null,certificatexportateurfile:null
            };
             this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        async selectcertificatexportateurFile(e){
            const attacheautorisation =e.target.files[0];
            this.form.attachercertificatexport=await this.getBase64(attacheautorisation)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
       
        async addSiteAndContinue(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
               this.form.idorganisation=this.user.idOrganisation 
            if(!this.form.typesiteoper){this.requiredTysite=true; return;}
            else{this.requiredTysite=false;}
            this.form.idorganisation=this.user.idOrganisation //set de l'id l'organisation
            console.log('données envoyées',this.form);
            this.submitted2 = true
                this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted2 = false 
                    this.$emit('siteAddedAndContinue',response)
                    this.resetForm()
                    return console.log('respone après ajout', response);
                    
                }).catch(error => {
                    this.submitted2 = false
                    console.log('erreur',error.message)
                    this.errorHappened(error)
                })
            })
        },
        async errorHappened(error) {
            let message=error.response.data.message!=undefined?error.response.data.message:'erreur interne interne du serveur'
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: message,
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
            console.log('user', this.user.idOrganisation);
            this.submitted = true
            this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
            console.log("data site", this.form)
                this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('siteAdded',response)
                    this.resetForm()
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    console.log('erreur site',error.message)
                    this.errorHappened(error)
                })
            })
        },
        getDates(){
           let exact = 2000 + new Date().getYear() - 100;
           for (let index = 1; index < 5; index++) {
            this.exercices.push({ libelle: exact - index, value: index + 1, },)
           }
           this.form.exercice=exact
        },
        getRequestParams(page, pageSize){
            let params= {
                page: 0,
                size: pageSize || 10
            };
            if(page && page > 0) {
                params.page= page -1
            }
            return params;
        },
        
    },
     mounted() {
       // this.loadSelects();
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
.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
  }
</style>