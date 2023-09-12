<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlayTitres">
        <b-form >
            <b-row>
                    <b-col cols="12 d-flex">
                        <label for="" class="m-0 p-0">Entité forrestière: </label>
                        <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="tracking.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                            <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                      </v-select>
                        <p v-else class="ml-1 font-weight-bold">LA SOCIETE CAMEROON UNITED FOREST</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="mt-1">
                        <label for="" class="m-0 p-0" style="font-weight:300">Type de titre</label>
                        <v-select label="libelle" :options="typesTitres" v-model="tracking.typetitre" class="custom-select-type_titre" @input="getConcessions"></v-select>
                    </b-col>
                </b-row>
                <b-row class="p-0 m-0 mt-1">
                    <b-col class="m-0 p-0 mt-1">
                        <label for="" class="" style="font-weight:300">Concession forestière No</label>
                        <v-select :disabled="!typetitreSet" label="numtitre" :options="titres" v-model="tracking.numconcession" :reduce="(concession) => concession.numtitre" class="custom-select-type_titre"></v-select>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col class="mt-1">
                        <label for="" class="m-0 p-0" style="font-weight:300">Exercice</label>
                        <v-select label="libelle" :options="exercices" v-model="tracking.exercice"  class="custom-select-type_titre" :reduce="(exercice) => exercice.libelle"></v-select>
                    </b-col>
                    <b-col class="mt-1">
                        <label for="" class="m-0 p-0" style="font-weight:300">Zone</label>
                        <v-select label="libelle" :options="listeZone" v-model="tracking.zone"  class="custom-select-type_titre" :reduce="(zone) => zone.libelle"></v-select>
                        <b-form-invalid-feedback id="zone">Donnée obligatoire</b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row class="mt-2">
                    <b-col>
                        <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Document(.zip)" label-class="font-weight-normal" label-for="input-sm">
                            <input type="file" ref="document" @change="selectdocumentFile" id="document"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-form-group label-cols="9" label-cols-lg="9" label-size="sm" label="Tracking(.shp)" label-class="font-weight-normal" label-for="input-sm">
                            <input type="file" ref="document" @change="selectTrackingFile" id="document"/>
                        </b-form-group>
                    </b-col>
                </b-row>
                <hr>
                <b-button  @click.prevent="addTracking" type="submit" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="float-right mt-2" style="background: rgb(0, 82, 44) !important;">Enregistrer<b-spinner v-if="submitted" small ></b-spinner></b-button>

                <!--<b-button @click.prevent="addTracking" type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" >Enregistrer<b-spinner v-if="submitted" small ></b-spinner></b-button>
                <b-button @click.prevent="addTrackingAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" >
                Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>-->
        </b-form>
    </b-overlay>      

        <serveur-error-box ref="errorDialogue"></serveur-error-box>
    </div>
</template>

<script>
const php = require('phpjs');
import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
export default {
    props: {
        action: {type: String, default: 'add'},
        editTracking: {type: Object, default: null}  
    },
    computed: { 
        ...mapGetters(['user', 'hasAccess']),
        valuesSetCorrectly(){
            return (!php.empty(this.tracking.typetitre)&&!php.empty(this.tracking.numconcession)
                    &&!php.empty(this.tracking.exercice)
                    &&!php.empty(this.tracking.zone)
            );
        },
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
            return true;
            }else{
            return false;
            }
        },
        filteredEntites() {
          return this.entiteswithoutminfof.filter((entite) =>
            entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
          )
        },
        paginatedEntites() {
          return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
        },
        hasNextPageEntites() {
          const nextOffset = this.offsetEntites + this.limitEntites
          return Boolean(
            this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
          )
        },
        hasPrevPageEntites(){   
          const prevOffset = this.offsetEntites - this.limitEntites
          return Boolean(
            this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
          )
        }
    },
    components: {
       ServeurErrorBox
    },
    data: () => ({
        offsetEntites:0,
        limitEntites:10,
        tracking:{
            typetitre:"",
            numconcession:"",
            exercice:"",
            zone:"",
            document:"",
            tracking:""
        },
        typetitreSet:false,
        showOverlayTitres: false,
        submitted: false,
        submitted2: false,

        inventaireSelected:false,
        grumeSelected:false,
        colisSelected:false,
        grumesAbbattageSelected:false,

        exercices: [],
        typesTitres:[],
        entiteswithoutminfof:[],
        sites:[],
        permis:[],
       
        requiredtypeTitre:true,
        requiredSite:true,
        requiredPermis:true,
        setTitre:false,

        disableNoConcession: true,
        disableExercice: true,
        disableZone: true,

        titres:[],
        listeZone: [{libelle : "32N"},{libelle : "33N"}], 
    }),
  

    methods: {
        async getConcessions(){
            this.showOverlayTitres= true;
            const params = this.getRequestParams(0,20);
            this.titres =this.tracking.typetitre.titres;
            //this.titres= await this.$titres.get("titres/"+this.tracking.typetitre, {params}).then(response => response.data.result.items || [])
            this.typetitreSet=true;
            this.showOverlayTitres= false;
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
        getDates(){
           let exact = 2000 + new Date().getYear() - 100;
           for (let index = 0; index < 3; index++) {
            this.exercices.push({ libelle: exact - index, value: index + 1, },)
           }
           this.tracking.exercice = exact;
        },
        async selectdocumentFile(e){
            const document =e.target.files[0];
            this.tracking.document=await this.getBase64(document)
        },
        async selectTrackingFile(e){
            const document =e.target.files[0];
            this.tracking.tracking=await this.getBase64(document)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        triggerSetTitre(){this.setTitre=true},
        validateState(ref) {
            if (
                this.veeFields[ref] &&
                (this.veeFields[ref].dirty || this.veeFields[ref].validated)
            ) 
            { return !this.veeErrors.has(ref);}
                return null;
        },
        resetForm() {
            this.tracking = {
                typetitre:"",
                numconcession:"",
                exercice:"",
                zone:"",
                docment:"",
                tracking:""
            },

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        async getTrackingData(){
            this.showOverlayTitres=true
            if (!php.empty(this.$store.state.typesTitres) ) {
                this.typesTitres = this.$store.state.typesTitres;
            } 
            else{ 
                try {
                    this.typesTitres= await this.$donneesReference.get("types-titre?with_titre=true").then(response => response.data.result.items);
                    this.$store.dispatch('typesTitres', this.typesTitres)
                } catch (error) {
                    App.notifyError(error.message);
                }
            }
            if(this.isMinfof){
                if (!php.empty(this.$store.state.entiteswithoutminfof)) {
                    this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
                } 
                else {
                    try {
                        this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=800").then(response => response.data.result.items);
                        this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
                    } catch (error) {
                        App.notifyError(error.message);
                    }
                }  
            }
            
            this.showOverlayTitres=false
        },
        
        
        /*async addTrackingAndContinue() {

            this.$validator.validateAll().then(result => {if (!result) {return;}
            this.tracking.idorganisation=this.user.idOrganisation //set de l'id de l'organisation

            console.log('données envoyées ',this.tracking);

            this.submitted2 = true
                this.$inventaire.post('/tracking', this.tracking).then(response => {
                    this.submitted2 = false 
                    this.$emit('trackingAddedAndContinue', response)
                    this.resetContinue()
                    return console.log('respone après ajout ', response);
                }).catch(error => {
                    this.submitted2 = false
                    console.log('erreur',error.message)
                    this.errorHappened(error)
                })
            })
        },*/
        async doDelete() {
            const ok = await this.$refs.errorDialogue.show({
                title: 'Erreur !!!',
                message: 'Erreur interne du serveur',
            })
        },
        async addTracking() {
            this.$validator.validateAll().then(result => {if (!result) {return;}
            this.submitted=true;
            let data ={}
            data = this.tracking
            data.typetitre = this.tracking.typetitre.code
            data.entite = this.isMinfof?this.tracking.entite.idorganisation:this.user.idOrganisation 
            this.tracking.idorganisation=this.user.idOrganisation //set de l'id de l'organisation

            console.log('données envoyées',data);
            this.$inventaire.post('/tracking', data).then(response => {
                    this.submitted = false 
                    this.$emit('trackingAdded')
                    this.resetForm()
                    console.log('respone après ajout', response);
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    console.log('error ', error);
                    this.submitted = false
                    if(error.response.data.code==500){
                    return this.doDelete()
                    }
                })
            });
            
        },
        
    },

    mounted(){
        this.getTrackingData()
        this.getDates();
        if (this.editTracking!=null) {
            console.log("entrée ici", this.editTracking);
            if(this.editTracking.typetitre=="concession forrestière en convention provisoire"){
                this.tracking.typetitre="CP"
            }
            if(this.editTracking.typetitre=="Concession forestière en convention définitive"){
                this.tracking.typetitre="CD"
            }
            if(this.editTracking.typetitre=="foret communale"){
                this.tracking.typetitre="FC"
            }
            if(this.editTracking.typetitre=="foret communautaire en convention provisoire"){
                this.tracking.typetitre="FCP"
            }
            if(this.editTracking.typetitre=="foret communautaire en convention définitive"){
                this.tracking.typetitre="FCD"
            }
            if(this.editTracking.typetitre=="vente de coupe"){
                this.tracking.typetitre="VC"
            }
            this.tracking.typetitre = this.editTracking.typetitre
            this.tracking.numconcession = this.editTracking.numtitre
            this.typetitreSet=true
            this.tracking.exercice = this.editTracking.exercice
        }
    },

    watch: {

    },
   
    
}

</script>

<style scoped>
.custom-select-type_titre{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
      --vs-selected-color: #1f1c1c;
          /* Font */
      --vs-font-size: 0.65rem;
      --vs-line-height: 1.2;
}


.is-red{
    border:1px solid red;
}
label {
    font-weight: normal !important;
}
</style>