<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h5 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Forêt communautaire en convention provisoire</h5></b-col>
            <b-col class="col-md-auto">
              <span >
                <a @click.prevent="enregistrer" style="cursor:pointer" size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN CP-->
          <div>
              <b-row class="m-4">

                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3">Type du titre</b-col>
                    <b-col cols="6">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 150%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="FCP" selected disabled> Foret communautaire en convention provisoire</option>
                      </select>
                    </b-col>
                  </b-row>
               
                  <b-row class="m-2">
                    <b-col cols="3"><span style="color:red;font-weight: bold;">*</span> Entité forrestière</b-col>
                    <b-col cols="6">
                        <v-select v-if="isMinfof" style="width:140%" @open="getEntites"  :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                            <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                        </v-select>
                        <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                        </select> 
                    </b-col>
                  </b-row>

                  <b-row class="m-2">
                    <b-col cols="3">Marteau</b-col>
                    <b-col cols="6" v-if="search.entite">
                      <input type="text" disabled  class=" w-50 form-control-xs" v-model="search.entite.sigle"/>
                    </b-col>
                    <b-col cols="6" v-else>
                      <input type="text" disabled  class=" w-50 form-control-xs" />
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="5">
                  <b-row class="m-2">
                    <b-col cols="6"><span style="color:red;font-weight: bold;">*</span> Forêt communautaire n°</b-col>
                    <b-col cols="4">
                      <b-form-input class="form-control-xs" type="text" size="sm" v-model="form.numtitre"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="6">Superficie totale(ha)</b-col>
                    <b-col cols="4">
                      <b-form-input v-model="form.superficie" type="number" name="superficie"  class="p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('superficie')"/>
                      <b-form-invalid-feedback id="superficie">{{ veeErrors.first('superficie') }}</b-form-invalid-feedback>
                    </b-col>
                  </b-row>
   
                
                </b-col>
              </b-row>

              <ul class="nav nav-tabs">
                <li class="nav-item" :class="{ custumSigifTab: section === 'fcp' }">
                    <a
                    ref="intialtabselect"
                    data-toggle="tab"
                    href="#"
                    class="nav-link"
                    style="color: inherit"
                    @click.prevent="section = 'fcp'"
                    >Forêt communautaire en convention provisoire n°</a
                    >
                </li>
                <li class="nav-item" :class="{ custumSigifTab: section === 'Localisation' }">
                    <a
                    data-toggle="tab"
                    href="#"
                    class="nav-link"
                    style="color: inherit"
                    @click.prevent="section = 'Localisation'"
                    >Localisation</a
                    >
                </li>
                <li class="nav-item" :class="{ custumSigifTab: section === 'contrat' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'contrat'"
                  >Contrat de partenariat industriel</a
                  >
              </li>
                
              </ul>

              <b-container class="contents" fluid v-if="section == 'fcp'">
                <b-row class="w-100 mx-3">
                  
                  <b-col cols="7">
                    <b-form-group label-cols="3"  label-class="font-weight-normal" label-cols-lg="3" label-size="sm" label="Date début" label-for="input-sm">
                      <input type="date" class="w-35 form-control default-old-system-input-properties" v-model="form.datedebut">
                      <!-- <date-picker  v-model="form.datedebut"  format="YYYY-MM-DD" placeholder=""  valueType="YYYY-MM-DD" class="w-25" :clearable="false"/> -->
                    </b-form-group>
                    <b-form-group  label-cols="4" label-cols-lg="5" label-size="sm" label="Convention provisoire d'exploitation" label-class="font-weight-normal" label-for="input-sm">
                      <div class="upload-container">
                        <label>
                          <input type="file" @change="getFileBase64"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          
                          <span v-if="fileconvention">{{ fileconvention }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date fin" label-for="input-sm">
                      <input type="date" class="w-35 form-control default-old-system-input-properties" v-model="form.datefin">
                    </b-form-group>
                    <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Durée " label-for="input-sm">
                      <b-form-input v-model="form.duree" name="" type="number" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-form-group>
                  </b-col>

                </b-row>

              </b-container>
              <b-container v-if="section == 'Localisation'" class="contents" title="Contrat des partenariat industriel">
                <b-row style="border-bottom: 2px solid green">
                    <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Répartition des superficies par Arrondissement</h3></b-col>
                    <b-col class="col-md-auto liens">
                        <span>
                          <a @click.prevent="AddFieldLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                          <a @click.prevent="RemouveAllFieldsLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                        </span>
                    </b-col>
                  </b-row>
                  <div style="width:60%">
                    <b-overlay rounded="sm" :show="showOverlayLocalisation">
                      <b-table height="50px" :items="itemslocation"  :fields="fieldslocalisation" :busy="showOverlayLocalisation" class="mt-1" outlined   ref="selectableTablelocation" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                        <template #cell(idarrondissement)="data">
                          <div style="width:80%">
                            <v-select v-model="data.item.idarrondissement" :options="paginatedArrondissements"
                              @input="loadOtherDataLocation(0, data.item.idarrondissement)"  :filterable="false" @search="onSearchLocalisation" :reduce="elt=>elt.idarrondissement" label="intitule" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                              <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPageArrondissements" @click="offsetArrondissements -= limitArrondissements">Prèc.</button>
                                <button :disabled="!hasNextPageArrondissements" @click="offsetArrondissements += limitArrondissements">Suiv.</button>
                              </li>
                            </v-select>
                          </div>
                        </template>
                        <template #cell(departement)="data">
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.departement" />
                        </template>
                        <template #cell(region)="data">
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.region" />
                        </template>
                        <template #cell(action)="data">
                          <b-button size="sm" class="d-flex justify-content-center" v-b-tooltip.hover title="enlever" @click.prevent="RemouveFieldLocalisation(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                        </template>
                      </b-table>
                    </b-overlay>
                  </div>
              </b-container>
              <b-container v-if="section == 'contrat'" class="contents" title="Contrat des partenariat industriel">
                <b-row style="border-bottom: 2px solid green">
                  <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Liste de contrats de partenairat</h3></b-col>
                  <b-col class="col-md-auto liens">
                      <span>
                        <a @click.prevent="addFieldContrat" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAllContrats" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                      </span>
                  </b-col>
                </b-row>
                  <b-row class="w-100 mx-1">
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Raison sociale</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">sigle</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">N° de contrat</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Date du contrat</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Acte  N°</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Date Acte  N°</label>
                    </b-col>
                  </b-row>
                  <b-row class="w-100  m-0 pt-2 px-1" v-for="(field, index) in fielsContrat" :key="index">
                  <span style="position: absolute; left: 10px;">{{ index + 1 }}</span>
                  <b-col cols="2">
                      <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.raisonsocilae" />
                  </b-col>
                  <b-col cols="1">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.sigle" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.numcontrat" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.datecontrat" />
                    <!--<date-picker  v-model="field.datecontrat" style="height: 24px !important;"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-75" :clearable="false"/>-->
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="ex: 2022-01-19" v-model="field.numacte" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="ex: 2022-05-15" v-model="field.dateacte" />
                    <!--<date-picker   v-model="field.dateacte" style="height: 24px !important;"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-75" :clearable="false"/>-->
                  </b-col>
                 
                    <b-col cols="1">
                      <b-row>
                        <b-col cols="1">
                          <a @click.prevent="removeAtIndexContrats(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
              </b-container>
          </div>
        </div>
      </b-overlay>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"titre-cp-convention-form",
  components:{ ErrorDialogue,CodeBarreInfo},
   computed: {
    ...mapGetters(['user','hasAccess']),
    
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
    },
    filtered() {
          return this.arrondissements.filter((arrond) =>
            arrond.intitule.toLocaleLowerCase().includes(this.searcharrond.toLocaleLowerCase())
          )
    },
    paginated() {
      return this.filtered.slice(this.offset, this.limit + this.offset)
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.filtered.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.filtered.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    itemslocation() { 
      return this.elementslocation.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    filteredArrondissements() {
      return this.arrondissements.filter((arrondissement) =>
      arrondissement.intitule.toLocaleLowerCase().includes(this.searcharrond.toLocaleLowerCase())
      )
    },
    paginatedArrondissements(){
      return this.filteredArrondissements.slice(this.offsetArrondissements, this.limitArrondissements + this.offsetArrondissements)
    },
    hasNextPageArrondissements(){
      const nextOffset = this.offsetArrondissements + this.limitArrondissements
      return Boolean(
        this.filteredArrondissements.slice(nextOffset, this.limitArrondissements + nextOffset).length
      )
    },
    hasPrevPageArrondissements() {   
      const prevOffset = this.offsetArrondissements - this.limitArrondissements
      return Boolean(
        this.filteredArrondissements.slice(prevOffset, this.limitArrondissements + prevOffset).length
      )
    },
   },
   watch: {
    section(value) {
      if (value == 'Localisation') {
          this.getArrondissements()
      }
    },
  },

   data: () => ({
    isbusyLocation:false,
    showOverlayLocalisation:false,
    fieldslocalisation:[
        { key: 'index', label: '',thStyle: { width: "2%" } },
        { key: 'idarrondissement', label : 'Arrondissement',thStyle: { width: "40%" } },
        { key: 'departement', label: 'Département' ,thStyle: { width: "35%" }}, 
        { key: 'region', label: 'région',thStyle: { width: "25%" } },
        { key: 'action', label: '',thStyle: { width: "5%" } },
     ],
    elementslocation:[{ idarrondissement: '',departement: '', region: '' }],
      isbusy:false,
      amount: '',
      form: {
        typetitre: "FCP",
        numtitre: "", // string, obligatoire
        idorganisation: 3, // int, obligatoire
        superficie: "", // int, non obligatoire
        arreteattribution: "", // string, non obligatoire
        numforet:"",
        superficie:"",
        datedebut:"",
        dureeconvention:"",
        arrondissement:"",

       
      },
      fileconvention:null,
      entite:{
        id:1,
        libelle:''
      },

      arrondissements:[],
      searcharrond:'',
      offsetArrondissements:0,
      limitArrondissements:10,
      section: "fcp",
      submitted:false,
      submittedContinue:false,
      visibleappeloffre: true,
      visiblerecepissedepot:true,
      visibleplanapprov:true,
      visiblenoteservicebraconnage:true,
      visiblenoteservicesanctions:false,

      // Données du tableau
      fieldsLocation: [{ arrondissement: '',departement: '', region: '' }],
      fielsContrat: [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", numacte:"", dateacte: ""}],
      searchentite:'',
      showOverlayEntites:false,
      entiteswithoutminfof:[],
      searchentite:'',
      offsetEntites:0, 
      limitEntites:10,
      search:{},
      field:{},
      showOverlayLocations:false
  }),

  methods: {
    async showDialogueLigne(message){
      const ok = await this.$refs.codebarreinfo.show({
              title: 'Information',
              message: message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
              this.$refs.codebarreinfo._close();
            }
    },
    async getData(){

    },
    RemouveFieldLocalisation(index){
      this.elementslocation.splice(index, 1);
    },
    //chargement autres données localisation
    async loadOtherDataLocation(index,data){
      console.log('data',data);
        this.showOverlayLocalisation = true;
        try{
          if(php.empty(data)){
            this.elementslocation[index].departement='';
            this.elementslocation[index].region='';
            this.showOverlayLocalisation = false;
            return
          }
          this.arrondissement=await this.$donneesReference.get(`arrondissements/${data}/departement_region`)
            .then(resp=>{
              let arr=resp.data.result
              console.log(this.arrondissement)
              this.elementslocation[index].departement=arr.departement;
              this.elementslocation[index].region=arr.region;
            })
        }catch(err){
          console.log(err.message)
        }
        this.showOverlayLocalisation = false;
    },
    onSearchLocalisation(query){
      this.searcharrond = query
      this.offsetArrondissements = 0    
    },
    async sendAlertMessage(error){
            const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error.message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
                this.$refs.codebarreinfo._close();
            }
      } ,
    //liste des entités forrestières
    async getEntites(){
      this.showOverlayEntites=true;
        if (!php.empty(this.$store.state.entiteswithoutminfof)) {
            this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
            
        } 
        else {
            try {
            this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=500").then(response => response.data.result.items);
            this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
            } catch (error) {
            App.notifyError(error.message);
            }
        }
        this.showOverlayEntites=false;  
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    async getFileBase64(e){
      console.log(e.target.files[0])
      this.fileconvention=e.target.files[0]?.name
      this.form.limitesString=await this.$getBase64(e.target.files[0])
      // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
      console.log(this.form.limitesString)
    },
    async enregistrer(){
      this.isbusy=true
      console.log('entite',this.search.entite)
      try{
        await this.$titres.post('titres/fs',{
          typetitre: "FS",
          numtitre: this.form.numtitre, // string, obligatoire
          durree:Number(this.form.duree),//Long
          dateDebut:this.form.datedebut,
          dateFin:this.form.dateFin,
          conventionProvExploitation:this.form.limitesString,// string base64
          entiteForestier:Number(this.search.entite.idorganisation),//Long
          superficie:Number(this.form.superficie),
          localisations:[
              {
                  idarrondissement :Number(this.form.arrondissement.idarrondissement),
              }
              
          ],
        }).then(resp=>{
          this.isbusy=false
          let message={ message:'Forêt communautaire créée avec succès'}
          return this.sendAlertMessage(message);
        })
      }catch(error){
        this.isbusy=false
        console.log(error)
      }
    },
    async setOtherData(){
      this.isbusyLocation=true
      // console.log('fieldarr',this.field.arrondissement)
      try{
        if(!this.form.arrondissement){
          this.showOverlayLocations=false
          this.form.departement=''
          this.form.region=''
          this.isbusyLocation=false
        }else{
          await this.$donneesReference.get('arrondissements/'+this.form.arrondissement.idarrondissement+'/departement_region')
          .then(resp=>{
            const obj=resp.data.result
            console.log('obj',obj)
            this.form.departement=obj.departement
            this.form.region=obj.region
          })
        this.isbusyLocation=false
        }
        
      }catch(err){
        this.isbusyLocation=false
        console.log(err)
      }
      
      //  this.fieldsLocation = this.fieldsLocation.map(elt =>{
      //     elt.arrondissement=elt.arrondissement !=='' ? elt.arrondissement :"",
      //     elt.departement =elt.arrondissement !=='' ? elt.arrondissement.departement.intitule :"",
      //     elt.region =elt.arrondissement !=='' ? elt.arrondissement.departement.region.intitule :""

      //     return elt
      //   })

    },
    async selectfileconvention(e){
      this.fileconvention =  e.target.files[0];
      this.form.fileconvention=await this.getBase64(fileconvention)
    },


    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) 
      { return !this.veeErrors.has(ref);}
          return null;
    },
    fermer() {
      this.$router.back()
    },

    AddFieldLocalisation (){
      if(this.elementslocation.length<1){
        this.elementslocation.unshift({ arrondissement: "", departement: "", region:""});
        return setTimeout(() => {this.$refs['selectableTablelocation'].selectRow(0) }, 200);
      }
      else{
       for(let i=0; i<this.elementslocation.length; i++){
        if(php.empty(this.elementslocation[i].idarrondissement)){
          return this.showDialogueLigne('Bien vouloir choisir l\'arrondissement')
        }
       }
        this.elementslocation.unshift({ arrondissement: "", departement: "", region:""});
        setTimeout(() => {this.$refs['selectableTablelocation'].selectRow(0) }, 200);
      }
      
    },
    deleteAllLocations(){
      this.fieldsLocation = [{ arrondissement: "", departement: "", region: ""}]
    },
    addFieldContrat () {
      this.fielsContrat.push({ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""});
    },
    deleteAllContrats(){
      this.fielsContrat = [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""}]
    },
    removeAtIndexLocations(index) {
      this.fieldsLocation.splice(index, 1);
    },
    removeAtIndexContrats(index) {
      this.fielsContrat.splice(index, 1);
    },
    async getArrondissements(){
      this.isbusyLocation=true
      if (!php.empty(this.$store.state.arrondissements)) {
        this.arrondissements = this.$store.state.arrondissements;
      } 
      else {
        try {
          this.arrondissements= await this.$donneesReference.get("arrondissements?size=400").then(response => response.data.result.items);
          this.$store.dispatch('arrondissements', this.arrondissements)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      console.log('arrondissements ',this.arrondissements);
      this.isbusyLocation=false
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

    getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
    },
     
      controleChange() {
          console.log("Somethings change");
      },
      resetForm() {
          this.form = {
            typetitre: "CP", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
            dateattribution: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
            dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
            numappeloffre: "", dateappeloffre: "", documentappeloffre: "",
            numdepot: "",  datedepot: "", documentdepot: "", numplan: "", 
            dateplan: "", documentplan: "", numservicebraconnage: "", 
            dateservicebraconnage: "", documentservicebraconnage: "", numnotesanction: "", 
            datenotesanction: "",documentnotesanction: "", arrondissement:""
          };

      },
      async addTitreAndContinue(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
               this.form.idorganisation=this.user.idOrganisation 

            this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
            console.log('données envoyées',this.form);
            this.submittedContinue = true
              this.$titres.post('titres', this.form).then(response => {
              this.submitted2 = false 
              this.$emit('titreAddedAndContinue',response)
              this.resetForm()
              return console.log('respone après ajout', response); 
              }).catch(error => {
                this.submittedContinue = false
                console.log('erreur',error.message)
                this.errorHappened(error)
              })
            })
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
      async addTitre(){
            this.$validator.validateAll().then(result => {if (!result) {return;}

            this.submitted = true
            this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
            console.log("data site", this.form)
                this.$titres.post('titres', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('titreAdded',response)
                    this.resetForm()
                     App.notifySuccess(response.data.message)
                   return setTimeout(() => {this.$router.push({ name: "concession_en_cp" }); }, 200);
                }).catch(error => {
                    this.submitted = false
                    console.log('erreur titre',error.message)
                    this.errorHappened(error)
                })
            })
      },
      rowClass(item, type) {
          if(item !=''&&item!=null){
          if (item.isEven) return 'table-row-other'
          if (!item || type !== 'row') return 'table-info'
          }else{
          return 
          }
      },
      onRowSelected(items) {
          console.log('row selected',items);
          items.isSelected =true;
          this.isRowselected=true
              this.selected = items
      },
      toggleSideBar(){
      var sidebar = document.querySelector('#sidebar');
      var administration = document.querySelector('#administration');
      var administrationItem = document.querySelectorAll('.administrationItem');
      var actionButton = document.querySelector("#toggleSideBar");

      if (sidebar.style.width !== '0px'){
        sidebar.style.width = '0px';
        sidebar.style.transition = 'all 0.5s ease';
        administration.style.backgroundColor = 'white';
        administration.style.transition = 'background-color 0.2s ease';
        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = '0';
          element.style.transition = 'opacity 0.2s ease';
        }
        actionButton.innerHTML = '<i class="fa fa-arrow-right fa-1x" style="font-size: 18px"></i>';

      }
      else {
        sidebar.style.width = '250px';
        sidebar.style.transition = 'all 0.3s ease';
        administration.style.backgroundColor = '#82C138';
        administration.style.transition = 'background-color 0.8s ease';

        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = '100%';
          element.style.transition = 'opacity 1s ease';
        }
        
        actionButton.innerHTML = '<i class="fa fa-arrow-left" style="font-size: 18px"></i>';
      }
      },
      onSearch(query) {
        this.searcharrond = query
        this.offset = 0
      },
  },
   mounted() {
    if(!this.isMinfof){
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
    this.getData()
    //this.$refs['site-form'].show()
    this.$refs["intialtabselect"].click()
    this.entite.libelle=this.user.profil.organisation
  },

}
</script>


<style scoped>



.default-old-system-input-properties{
    font-weight: normal;
    border-color: #637A95;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: White;
    color: #333333;
    border: 1px solid #637A95;
    padding: 1px 2px 1px 3px;
    margin: 1px;
    width: 170px;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'verdana';
    font-size: 13px;
    height: 20px;
}
.upload-container label input {
  display: none;
}

.setheight{
  padding: 1px 1px;

}
.nav-tabs .nav-link.active {
  background-color: rgb(0, 82, 44)!important;
  font-weight: bold;
  color: white !important;
  border-color:  rgb(0, 82, 44)!important;
}
.contents {
  padding: 10px 5px;
}

.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
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

#toggleSideBar{
margin-left: 20px;
border: none;
background-color: #fff;
}
.position_absolute{
position: absolute;
bottom: 20px;
right: 35px;
}
.b-card{
background-color: transparent !important;
}
.b-col{
margin-right: 16px;
}
.b-col .content{
display: flex;
flex-direction: column;
}


#cover {
  background-image: url('~@/assets/images/logo_sigif_trame.png');
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.collapse-close{
list-style-type: disclosure-closed;
}
.collapse-open{
list-style-type: disclosure-open;
}


.simple-btn{
background:none;
border:none;
color:black;
font-weight: bold;
}

.simple-btn:hover{
background:none;
border:none;
}
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }
  .pagination {
    display: flex;
    margin: 0.25rem 0.25rem 0;
  }
  .pagination button {
    flex-grow: 1;
  }
  .pagination button:hover {
    cursor: pointer;
  }


</style>