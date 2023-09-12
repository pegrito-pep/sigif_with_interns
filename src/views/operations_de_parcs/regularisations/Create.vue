<template>
  <div id="cover" class="min-vh-100">
        <div>
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span >Création d'une régularisation d'entrée parc <span class="font-weight-bold"></span> </span>
              </h4>
              </b-col> 
              
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="submitData" :disabled="submitted"  size="sm"  style="cursor: pointer" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>

          <div class="container1 mx-3 mt-3 mb-2">
            <b-row class="d-flex d-flex justify-content-between my-2">
                <b-col cols="4">
                  <b-row>
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Site concerné</span>
                      <!--<label for=""><span class="set-obligation-indicator">*</span> Site concerné</label>-->
                    </b-col>
                    <b-col cols="7">
                      <v-select :options="paginatedSites" v-model="form.site" :filterable="false" @search="onSearchSites" label="INTITULE" :reduce="site => site.IDSITEOPER" class="custom-select-type_titre" :class="{'styleToSet': notSetSiteoper }" style="margin-top: .5em;">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                            <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>      
                </b-col>
                <b-col cols="3">
                  <b-row>
                    <b-col cols="7">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Date opération</span>
                      <!--<label for="" class=""><span class="set-obligation-indicator">*</span> Date opération</label>-->
                    </b-col>
                    <b-col cols="5">
                      <input class="sigif-input-date" type="date" v-model="form.date" format="YYYY-MM-DD" :class="{'border-danger-date': notSetDateoper }"/>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="4">
                  <b-row>
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"> Heure</span>
                        <!--<label for="">heure</label>-->
                      </b-col>
                      <b-col cols="5">
                        <input type="time" v-model="form.heure" id="appt" name="appt" >
                      </b-col>
                  </b-row>
                </b-col>
            </b-row>
            <b-row class="d-flex d-flex justify-content-between">
              <b-col cols="4">
                <b-row>
                  <b-col cols="5">
                    <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> N° certificat de stock</span>
                    <!--<label for=""><span class="set-obligation-indicator">*</span> N° certificat de stock</label>-->
                  </b-col>
                  <b-col cols="7">
                    <b-form-input v-model="form.numcertificat" name="numcertificat" size="sm" class="w-50 py-0 px-2 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true }" :state="validateState('numcertificat')"/>
                    <b-form-invalid-feedback id="numcertificat">{{ veeErrors.first('numcertificat') }}</b-form-invalid-feedback>
                  </b-col>
                </b-row>      
              </b-col>
              <b-col cols="3">
                <b-row>
                  <b-col cols="7">
                    <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Date certificat de stock</span>
                    <!--<label for="" class=""><span class="set-obligation-indicator">*</span> Date certificat</label>-->
                  </b-col>
                  <b-col cols="5">
                    <input class="sigif-input-date" type="date" v-model="form.datecertificat" format="YYYY-MM-DD" :class="{'border-danger-date': notSetDatecertificat }"/>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="4">
                <b-row>
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Certificat de stock</span>
                    <!--<label for="" class=""><span class="set-obligation-indicator">*</span>Certificat de stock</label>-->
                  </b-col>
                  <b-col cols="5">
                    <div class="upload-container" :class="{'border-danger-date': notsetFileCertificat }">
                        <label>
                          <input type="file" @change="selectFileCertificat"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="filecertificat" class="file-name">{{ filecertificat.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                          
                        </label>
                    </div>
                  </b-col>
                  <span v-if="notsetFileCertificat" class="text-danger" style="font-size: 0.8rem">bien vouloir joindre le fichier du certificat de stock</span>
                </b-row>
              </b-col>
          </b-row>
            
          </div>
        </div>
        <ChangeProductBox ref="changeProduct"></ChangeProductBox>
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
        <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col cols="8"><h4 class="tab-header-left-text mx-2"> Liste des produits</h4>
              <a style="cursor: pointer;" @click.prevent="addFieldGrume" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
              <a style="cursor: pointer;" @click.prevent="RemouveAllFieldsGrumes" class="mx-1 simple-btn"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
              <a style="cursor: pointer;" @click.prevent="showImportSection" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Importer</a>
            </b-col>
            <b-col cols="3">
              <div class="mt-1">
                <label for="">Type de produit</label>
                <select @change.prevent="showConfirmMessage" name="typeproduits" :class="{'border-danger-date': notSetTypeproduit }" class="m-0 p-0"  style="width:35%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem) !important;">
                  <option v-for="(type, index) in typesproduits" :value="type.value" :key="index" :selected="index==0" >{{ type.libelle }}</option>
                </select>
              </div>
            </b-col>
          </b-row>
        </div>
        <div style="width:98%">
          <b-overlay rounded="sm" :show="showOverlayCodeData">
          <b-table v-if="form.typeproduit=='GR'" height="50px" :items="itemsgrumes"  :fields="fieldsgrumes" :busy="isBusy" class="mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
            <template v-slot:head(codebarre)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(sequence)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(essence)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(numdf10)="data">
              <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
            </template>
            <template v-slot:head(dpb)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(dgb)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(longueur)="data">
              <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
            </template>
            <template v-slot:head(volume)="data">
              <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
            </template>
            
            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
            
            <template #cell(codebarre)="data">
              <input size="xs" @keydown.tab.prevent="checkCodebarre($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
            </template>
            <template #cell(sequence)="data">
              <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
            </template>
            <template #cell(numdf10)="data">
              <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
            </template>
            <template #cell(essence)="data">
              <v-select :options="paginated" v-model="data.item.essence" :reduce="essence  => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre">
                <template #option="{ NOMUSUEL }">
                  <span class="font-weight-bold text-dark">{{ NOMUSUEL }}</span>
                </template>
                <li slot="list-footer" class="pagination">
                    <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                    <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                </li>
              </v-select>
            </template>
            <template #cell(dpb)="data">
              <input  size="xs" class=" w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dpb" />
            </template>
            <template #cell(dgb)="data">
              <input  size="xs" class="d-flex justify-content-end align-items-end w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dgb" />
            </template>
            <template #cell(longueur)="data">
              <input  size="xs" @keydown.tab.prevent="setVolume(1)" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
            </template>
            <template #cell(volume)="data">
              <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view"  style="background: green!important; color: white" v-model="data.item.volume" />
            </template>
            <template #cell(action)="data">
              <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveField(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
            </template>
           
          </b-table>
          <b-table v-if="form.typeproduit=='CL'" height="50px" :items="itemsdebites"  :fields="fieldsdebites" :busy="isBusy" class="mt-1" outlined   ref="selectableTabledebites" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
            <template v-slot:head(codebarre)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(sequence)="data">
              <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
            </template>
            <template v-slot:head(essence)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(numdf10)="data">
              <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
            </template>
            <template v-slot:head(epaisseur)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(largeur)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            <template v-slot:head(longueur)="data">
              <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
            </template>
            <template v-slot:head(nombrepiece)="data">
              <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
            </template>
            <template v-slot:head(volume)="data">
              <span v-html="data.field.label" style="color:green"></span>
            </template>
            
            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
            
            <template #cell(codebarre)="data">
              <input size="xs" @keydown.tab.prevent="checkCodebarre($event.target.value, data.index , 'codebarre')"   class="mx-1 px-1 sigif-input-view text-left"  style="color:white!important;width:98%" v-model="data.item.codebarre" />
            </template>
            <template #cell(sequence)="data">
              <input  size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
            </template>
            <template #cell(numDf10)="data">
              <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numDf10" />
            </template>
            <template #cell(essence)="data">
              <v-select :options="paginated" v-model="data.item.IDESSENCE" :reduce="essence  => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre">
                <template #option="{ NOMUSUEL }">
                  <span class="font-weight-bold text-dark">{{ NOMUSUEL }}</span>
                </template>
                <li slot="list-footer" class="pagination">
                    <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                    <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                </li>
              </v-select>
            </template>
            <template #cell(epaisseur)="data">
              <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.epaisseur" />
            </template>
            <template #cell(largeur)="data">
              <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.largeur" />
            </template>
            <template #cell(longueur)="data">
              <input  size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
            </template>
            <template #cell(nombrepiece)="data">
              <input @keydown.tab.prevent="setVolume(1)" size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nombrepiece" />
            </template>
            <template #cell(volume)="data">
              <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view"  style="background: green!important; color: white" v-model="data.item.volume" />
            </template>
            <template #cell(action)="data">
              <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveField(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
            </template>
           
          </b-table>
        </b-overlay>
        </div>
        <file-component ref="filecomponent"  @importsuccessfull="handleDataImported" :dto="dto"></file-component>
        
  </div>

</template>

<script>
const php  = require ( 'phpjs' ) ;

import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import FileComponent from '@/components/utils/operation_de_parc/ImportRegularisationFIle.vue';

import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
name: "create_regularisation",
components: {
  ChangeProductBox,
  CodeBarreInfo,
  FileComponent
},
data: () => ({

  notSetSiteoper:false,
  hasError:false,
  hasErrorDate:false,
  isBusy:false,
  submitted:false, //controle bouton creation entree parc
  isRowselected:false,
  /*porpriétés data de pagination*/
  perPage: 10,
  currentPage: 1,
  total: 0,

  perPageEssence: 10,
  currentPageEssence: 1,

  offset: 0,
  limit: 10,
  Sites: 0,
  limitSites: 10,
  offsetSites: 0,
  sites:[],
  essences:[],
  search:"",
  searchSite:"",
  visible: true,

 
  heure: '08:20',
  showOverlayCodeData:false,
    //données du tableaux
    fieldsgrumes: [ 
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Référence code barre' },
      { key: 'numdf10', label: 'Ligne DF10' }, { key: 'essence', label: 'Nom commercial',thStyle:"width:20%" },
      { key: 'dpb', label: 'Diamètre petit bout' }, { key: 'dgb', label: 'Diamètre gros bout' },
      { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" }, { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
      { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    fieldsdebites: [ 
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Référence' },
      { key: 'numDf10', label: 'Ligne DF10' }, { key: 'essence', label: 'Nom commercial',thStyle:"width:20%" },
      { key: 'epaisseur', label: 'épaisseur(cm)' }, { key: 'largeur', label: 'largeur(m)' },
      { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" }, 
      { key: 'nombrepiece', label: 'Nombre de pièces',thStyle:"width:14%" },
      { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
      { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elementsgrumes:[],
    elementsdebites:[],
    form: {
      site: '', 
      typeproduit: "", 
      date: "", 
      heure: "",
      numcertificat: "",
      datecertificat: "",
      codebarres: [],
      documentcertificat: '',
    },
    filecertificat:null,
    notSetSite:false, //verification du champ site
    notSetDateoper:false, //verification que la date opération est renseignée
    notSetDatecertificat:'',
    notsetFileCertificat:false,
    typesproduits: [
      { libelle: "", value: '' },
      { libelle: "Grumes", value: 'GR' },
      { libelle: "Débités", value: 'CL' }
    ], 
    notSetTypeproduit:false,
    indexRowSelectedGrumes:0,
    indexRowSelectedDebites:0,
    //données du tableaux
    fields1: [ { key: 'index', label: '' },{ key: 'codebrre', label: 'Code à barre' }, { key: 'referencecodebarre', label: 'Référence code à barre' },
            { key: 'lignedf10', label: 'Ligne DF10' }, { key: 'nomcommercial', label: 'Nom commercial' }],

    elements1: [],
    selected:{},
    format:'hh:mm',
    showGrume: true,
    elementsDebitesChecked:[],
    elementsGrumesChecked:[],
    dto:{}
}),
computed:{
  itemsgrumes(){
    return this.elementsgrumes.map((a, index) => {
      a.isFirst = index == 0;
      a.isEven = index % 2 == 0;
      return a;
    });
  },
  itemsdebites(){
    return this.elementsdebites.map((a, index) => {
      a.isFirst = index == 0;
      a.isEven = index % 2 == 0;
      return a;
    });
  },
  filteredSites() {
      return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase()))
  },
  paginatedSites() {
    return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetSites)
  },
  hasNextPageSites() {
    const nextOffset = this.offsetSites + this.limitSites
    return Boolean(
      this.filteredSites.slice(nextOffset, this.limitSites + nextOffset).length
    )
  },
  hasPrevPageSites() {   
    const prevOffset = this.offsetSites - this.limitSites
    return Boolean(
      this.filteredSites.slice(prevOffset, this.limitSites + prevOffset).length
    )
  },

  filtered() {
      return this.essences.filter((essence) => essence.NOMUSUEL.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
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



},
watch:{
  "form.site"(value) {
    if(!php.empty(value)){
        this.notSetSiteoper= false
    }
    else{
        this.notSetSiteoper= true
    }
  },
  "form.date"(value) {
      if(!php.empty(value)){
        this.notSetDateoper= false
      }
      else{
        this.notsetDateoper= true
      }
  },

filecertificat(value){
  this.notsetFileCertificat=false
},
  "form.typeproduit"(value){
    if(!php.empty(value)){
      this.notSetTypeproduit = false;
    };
  },
  elementsgrumes(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTablegrumes'].selectRow(0) }, 200);
    }
  },
  elementsdebites(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTabledebites'].selectRow(0) }, 200);
    }
  }  
},
methods: {
  createFile(){
  //create or obtain the file's content
  var content = 'This is a text';

  //create a file and put the content, name and type
  var file = new File(["\ufeff"+content], 'myFile.txt', {type: "text/plain:charset=UTF-8"});

  //create a ObjectURL in order to download the created file
  url = window.URL.createObjectURL(file);

  //create a hidden link and set the href and click it
  var a = document.createElement("a");
  a.style = "display: none";
  a.href = url;
  a.download = file.name;
  a.click();
  window.URL.revokeObjectURL(url);
}, 
  handleDataImported(data){
    if(this.form.typeproduit=='GR'){
      for(let i=0;i<data.length; i++){
        this.elementsgrumes.push(data[i])
      }
    }
    else if(this.form.typeproduit=='CL'){
      for(let i=0;i<data.length; i++){
        this.elementsdebites.push(data[i])
      }
      this.elementsdebites.map(elt =>{
        elt.volume = elt.volume!=""?elt.volume.toFixed(3):""
        return elt
      })
    }
   
    this.$refs.filecomponent._close();
  },
  showImportSection(){
        if (php.empty(this.form.site)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.date)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typeproduit)) {
          this.notSetTypeproduit=true;
          let error={ message:'Veuillez renseigner le type de produit'}
          return this.sendAlertMessage(error);
        }
        let data={
          site: this.form.site, typeproduit: this.form.typeproduit, date:this.form.date
        }
        if(php.empty(this.form.heure)){data.heure=''}
        else{data.heure=this.form.date+'T'+this.form.heure+':00'}
        this.dto=data
      this.showUploadFile();
    },
    async showUploadFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'régularisation',
        okButton: 'valider',
        cancelButton: 'Annuler'

      })
    },
  async checkCodebarre(value, index, commande) {
    if(this.form.typeproduit=='GR'){
        //controle du fait que le code barre n'est pas encore pris en compte
      if(this.elementsgrumes.length>1){
        let stop=false
          this.elementsGrumesChecked.forEach(field => {
            if(field.codebarre==value){
              stop=true 
            }
          }) 
        if(stop){
          return this.showDialogueLigne('codebarre déjà utilisé');
        }
        else{
          this.getSequence(value, index, commande);
        }
          
      }
      else{
        this.getSequence(value, index, commande);
      }
    }
    else if(this.form.typeproduit=='CL'){
        //controle du fait que le code barre n'est pas encore pris en compte
      if(this.elementsdebites.length>1){
        let stop=false
          this.elementsDebitesChecked.forEach(field => {
            if(field.codebarre==value){
              stop=true 
            }
          }) 
        if(stop){
          return this.showDialogueLigne('codebarre déjà utilisé');
        }
        else{
          this.getSequence(value, index, commande);
        }
          
      }
      else{
        this.getSequence(value, index, commande);
      }
    }   
  },
  addFieldGrume () {
    if (php.empty(this.form.site)) {
      this.notSetSiteoper=true;
      let error={ message:'Veuillez choisir le site de l\'opération'}
      return this.sendAlertMessage(error);
    }
    if (php.empty(this.form.date)) {
      this.notSetDateoper=true;
      let error={ message:'Veuillez renseigner la date de l\'opération'}
      return this.sendAlertMessage(error);
    }
    if (php.empty(this.form.typeproduit)) {
          this.notSetTypeproduit=true;
          let error={ message:'Veuillez renseigner le type de produit'}
          return this.sendAlertMessage(error);
        }
    if(this.form.typeproduit=='GR'){
      if(this.elementsGrumesChecked.length>0){
        this.setVolume(1)
      }
      this.elementsgrumes.unshift({codebarre: '', reference: '', lignedf10: "", essence:'', dpb:'',dgb:'',longueur:'',volume:'', });
    }
    if(this.form.typeproduit=='CL'){
      if(this.elementsDebitesChecked.length>0){
        this.setVolume(1)
      }
      this.elementsdebites.unshift({codebarre: '', reference: '', lignedf10: "", essence:'', epaisseur:'',largeur:'',longueur:'',nbpieces:'',volume:'', });
    }
  },
  setVolume(indexligne){
    const coef = parseFloat(0.19625)
    if(this.form.typeproduit=='GR'){
      this.elementsgrumes[indexligne -1].dpb = parseFloat(this.elementsgrumes[indexligne -1].dpb) !=null ? parseFloat(this.elementsgrumes[indexligne -1].dpb)  : 0
      this.elementsgrumes[indexligne -1].dgp = parseFloat(this.elementsgrumes[indexligne -1].dgb) !=null ? parseFloat(this.elementsgrumes[indexligne -1].dgb)  : 0
      this.elementsgrumes[indexligne -1].longueur = parseFloat(this.elementsgrumes[indexligne -1].longueur) !=null ? parseFloat(this.elementsgrumes[indexligne -1].longueur)  : 0
      const dpb = this.elementsgrumes[indexligne -1].dpb
      const dgb = this.elementsgrumes[indexligne -1].dgb
      const longueur = this.elementsgrumes[indexligne -1].longueur
     
      this.elementsgrumes[indexligne -1].volume=(dpb *dgb*longueur*0.0001 * coef).toFixed(3)
    }
    else if(this.form.typeproduit=='CL'){
      this.elementsdebites[indexligne -1].epaisseur = parseFloat(this.elementsdebites[indexligne -1].epaisseur) !=null ? parseFloat(this.elementsdebites[indexligne -1].epaisseur)  : 0
      this.elementsdebites[indexligne -1].largeur = parseFloat(this.elementsdebites[indexligne -1].largeur) !=null ? parseFloat(this.elementsdebites[indexligne -1].largeur)  : 0
      this.elementsdebites[indexligne -1].longueur = parseFloat(this.elementsdebites[indexligne -1].longueur) !=null ? parseFloat(this.elementsdebites[indexligne -1].longueur)  : 0
      this.elementsdebites[indexligne -1].nombrepiece = parseFloat(this.elementsdebites[indexligne -1].nombrepiece) !=null ? parseFloat(this.elementsdebites[indexligne -1].nombrepiece)  : 0
      const e = this.elementsdebites[indexligne -1].epaisseur
      const l = this.elementsdebites[indexligne -1].largeur
      const L = this.elementsdebites[indexligne -1].longueur
      const nbpieces = this.elementsdebites[indexligne -1].nombrepiece

      this.elementsdebites[indexligne -1].volume=(e*l*L*nbpieces*0.01*coef).toFixed(3)
      
    }
    
    
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
  },
  async showConfirmMessage(e){
        if (e.currentTarget.value == "GR") {
          console.log('entrée sujet grumes',this.elementsdebites.length);
          if( this.elementsdebites.length >= 1 ){
              const ok = await this.$refs.changeProduct.show({
                  title: 'Changement de produit',
                  message: "Si oui tous les champs seront vidé",
                  okButton: 'oui',
                  cancelButton: "Non",
                })
                //If you throw an error, the method will terminate here unless you surround it wil try/catch
                if (ok) {
                    this.$refs.changeProduct._close();
                    this.form.typeproduit = "GR";
                } else {
                  this.$refs.changeProduct._close();
                }
          }
          else{
            this.form.typeproduit = "GR";
          }
        }
        else if (e.currentTarget.value == "CL") {
          console.log('entrée sujet débites',this.elementsgrumes.length );

          if( this.elementsgrumes.length >= 1 ){
              const ok = await this.$refs.changeProduct.show({
                  title: 'Changement de produit',
                  message: "Si oui tous les champs seront vidé",
                  okButton: 'oui',
                  cancelButton: "Non",
                })
                //If you throw an error, the method will terminate here unless you surround it wil try/catch
                if (ok) {
                    this.$refs.changeProduct._close();
                    this.form.typeproduit = "CL";
                } else {
                  this.$refs.changeProduct._close();
                }
          }
          else{
            this.form.typeproduit = "CL";
          }
        }
        
  },
  handleSelectedRowGrumes(index){
    //s'il y'a un seul élement, je calcule le volume au moment d'ajouter un autre élément
    this.indexRowSelectedGrumes =index
    if(this.indexRowSelectedGrumes >=1){
      this.setVolume(this.indexRowSelectedGrumes);

    }
    
  },

  async getSequence(value, index, commande){
    this.showOverlayCodeData=true;
      await this.$codesbarres.post("check/check_codebarre_regularisation", {codebarre : value, typeproduit:this.form.typeproduit, site:this.form.site })
      .then(response =>{
        this.dataresult =response.data.result
        if(this.form.typeproduit=='GR'){
           this.elementsgrumes[index].codebarre = this.dataresult.codebarre !==null ? this.dataresult.codebarre :"dd" ;      
            this.elementsgrumes[index].sequence = this.dataresult.sequence !==null ? this.dataresult.sequence :"sequence" ;
          console.log('result gr',this.itemsgrumes);
        } 
        else if(this.form.typeproduit=='CL'){
          this.elementsdebites[0].codebarre = this.dataresult.codebarre;
          this.elementsdebites[0].sequence = this.dataresult.sequence;
          console.log('result cl',this.itemsdebites);
        }
        return this.showOverlayCodeData=false;
      } )
      .catch(error =>{
        this.showOverlayCodeData=false;
        return this.errorHappened(error.response.data);
      } )
   
              
            
  },

 
  //methode d'ajout d'une régularisation
async submitData() {
  this.$validator.validateAll().then(result => {if (!result) {return;}
  if (php.empty(this.form.site)) {
    this.notSetSite=true;
    let error={ message:'Veuillez remplir le site'}
    return this.sendAlertMessage(error);
  }
  if (php.empty(this.form.date)) {
    this.notSetDateoper=true;
    let error={ message:'Veuillez renseigner la date de l\'opération'}
    return this.sendAlertMessage(error);
  }
  if (php.empty(this.form.datecertificat)) {
    this.notSetDatecertificat=true;
    let error={ message:'Veuillez renseigner la date du certificat de stock'}
    return this.sendAlertMessage(error);
  }
  if (php.empty(this.filecertificat)) {
    this.notsetFileCertificat=true;
    let error={ message:'Veuillez ajouter le fichier du certificat'}
    return this.sendAlertMessage(error);
  }
 
  let data={
    site: this.form.site,typeproduit: this.form.typeproduit,date: this.form.date, numcertificat:this.form.numcertificat, 
    datecertificat: this.form.datecertificat, documentcertificat: this.form.documentcertificat}
            if(php.empty(this.form.heure)){
              data.heure=''
            }
            else{
              data.heure=this.form.date+'T'+this.form.heure+':00'
            }
  if(this.form.typeproduit=='GR'){
    setTimeout( () =>{this.setVolume(1);}, 500)
      data.grumereg=this.elementsgrumes;
  }
  else if(this.form.typeproduit=='CL'){
    setTimeout( () =>{this.setVolume(1);}, 200)
      data.colis=this.elementsdebites;
  }
  this.submitted = true;
 
  console.log('données envoyées',data);
    this.$operationParc.post('regulations', data).then(response => {
        this.submitted = false 
        this.resetForm()
        App.notifySuccess(response.data.message)
        return this.$router.push({ name: "regularisations" });
    }).catch(error => {
        console.log('entrée dans le catch');
        this.submitted = false
        this.errorHappened(error)
    })
  })
},
resetForm() {
  this.form = { site: '',   typeproduit: "",   date: "",  heure: "", numcertificat: "",  datecertificat: "",	grumereg: [],
    colis :[], documentcertificat: ''
  };
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
},
  async selectFileCertificat(e){
    const filecertificat = this.filecertificat =  e.target.files[0];
    this.form.documentcertificat=await this.getBase64(filecertificat)
  },
  getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
  },
  async alertBoxMessage(value){
    const ok = await this.$refs.changeProduct.show({
      title: 'Changement de produit',
      message: "Si oui tous les champs seront vidés",
      okButton: 'oui',
      cancelButton: "Non",
    })
    //If you throw an error, the method will terminate here unless you surround it wil try/catch
    if (ok) {
        this.form.typeproduit= value
    } else {
        this.$refs.changeProduct._close();
    }
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
      },
      RemouveField(index){
        if(this.form.typeproduit=='GR'){
          this.elementsgrumes.splice(index, 1);
        }
        else if(this.form.typeproduit=='CL'){
          this.elementsdebites.splice(index, 1);
        }
      },
      RemouveAllFieldsGrumes(){
        this.elementsgrumes=[];
      },



  validateState(ref){
    if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
    ) 
    { return !this.veeErrors.has(ref);}
        return null;
  },
  removeAtIndexDebites(index) {
    this.fieldsDebites.splice(index, 1);
  },
  removeAtIndexGrumes(index) {
    this.fieldsGrumes.splice(index, 1);
  },
  AddField () {
      if(php.empty(this.form.typeproduit)){
        this.notSetTypeproduit =true;
          let error={ message:'Veuillez sélectionner un type de produit'}
      return this.sendAlertMessage(error);
      }
      else{
        if(this.form.typeproduit=="GR"){
          if(this.fieldsGrumes.length>=1){
            for(let i=0; i<=this.fieldsGrumes.length; i++){
              if(php.empty(this.fieldsGrumes[this.indexRowSelectedGrumes].codebarre)){
                let error={ message:'Bien vouloir renseigner toutes les données pour chaque ligne'}
                return  this.sendAlertMessage(error);
              }
            }
          
          }
          this.fieldsGrumes.push({codebarre: '', sequence: '', idessence: '', numdf10: '', dpb: '', dgb:'', longueur: '', volume: ''})
        }
        if(this.form.typeproduit=="CL"){
          this.fieldsDebites.push({codebarre: '', sequence: '', idessence: '',numdf10: '', epaisseur: '', largeur: '', longueur:'', nombrepiece: '', volume: ''})
        }
      }
    },
    deleteAll(){
      this.fields = [{codebarre: '', codebarresequence: '', nomcommercial: '', lignedf10: '', diametrepetit: '', diametregros:'', longueur: '', volume: '', epaisseur: '', largeur: '', nbrpiece:'' }]
    },

    async getCreationData(){

      if(!php.empty(this.$store.state.sitesnoutbs)){
        this.sites=this.$store.state.sitesnoutbs;
      }
      else{
        try {
              this.sites =  await this.$donneesReference.get("sites/no-utb").then(response => response.data.result);
              this.$store.dispatch('sitesnoutbs', this.sites)
          } catch (error) {
              console.log(error.message);
          }
      }
      if(!php.empty(this.$store.state.essences)){
        this.essences=this.$store.state.essences;
      }
      else{
        try {
              this.essences = await this.$donneesReference.get("essences/raw").then(response => response.data.result);
              this.$store.dispatch('essences', this.essences)
          } catch (error) {
              console.log(error.message);
          }
      }
        this.showOverlay=false;
    },
    
    fermer(){
      this.$router.back();
    },

    validateState(ref){
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) { 
        return !this.veeErrors.has(ref);
      }
      return null;
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
        actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

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
        
        actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
    },
    onSearchSites(query) {
      this.searchSite = query
      this.offsetSites = 0
    },
    onSearch(query) {
      this.search = query
      this.offset = 0
    },
    async errorHappened(error, index){
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
    },
},

  mounted(){
    //this.form.typeProduit='Grume';
    this.getCreationData();
  }
}

</script>
<style scoped>
.styleToSet{
  border: 2px solid red;
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.sigif-input-date{
  width: 90%;
  height: 26px;
  padding: 1px 3px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.change_bg{
  background:#82C138
}
.xf{
  margin-right: 3px;
  font-family: 'Verdana';
  font-weight: normal;
  font-size: 13px;
  color: Red;
}
.upload-container label input {
  display: none;
}

.form-control{
height: 30px !important;
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


/*style barre de recherche */
.search-bar-btn-group{
display: flex;
justify-content: center;
align-items: center;
}

.search-bar-btn{
border:none;
border-radius: 6px;
padding: 6px 20px;
background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
background-color: rgba(0, 82, 44, 0.89);
border:none;
}
.search-bar-btn a{
color:white
}
.search-bar-btn a:hover{
font-weight: 600;
font-style: italic;

}

.search-bar-custum-input{
background-color: #fff;
background-clip: border-box;
border: 1px solid #ced4da;
border-radius: .25rem;
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
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
color: #6c757d;
background-color: white!important;
border-color: white!important;
}
.change-image-opacity:hover {
color: #6c757d;
background-color: rgb(0, 82, 44)!important;
border-color: white!important;
cursor: not-allowed;
}
.not-change-image-opacity:hover{
color:#82C138;
}
.change-image-opacity{
opacity: 0.15;
}
.not-change-image-opacity{
opacity: 1;
}
.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
  --vs-controls-size: 1;
      /* Font */
  --vs-font-size: 0.55rem;
  --vs-line-height: 0.38;
  --vs-dropdown-option-padding: 10px 15px;
  --vs-actions-padding: 0px 0 0 0px;

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
.set-obligation-indicator{
  color:red; font-size: 1.4em
}

.border-danger{
  --vs-controls-color: #f50a0a;
  --vs-border-color: #f50a0a;
}
.border-danger-date{
  border: 2px solid red;
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
</style>
<style>
.custom-bg{ background: rgb(0, 82, 44) !important;}
</style>