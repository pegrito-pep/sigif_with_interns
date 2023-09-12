<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
          <div>
            <b-row class="ml-2" style="border-bottom: 2px solid green">
              <b-col class="pb-1 m-1" >
                  <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button>
                <span >Création entrée de parc <span class="font-weight-bold"></span> </span>
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

            <div class="container1 mx-3 mt-3">
              <b-row class="d-flex d-flex justify-content-between">
                  <b-col cols="3">
                    <label for=""><span class="set-obligation-indicator">*</span> Site concerné</label>
                      <v-select :options="paginatedSites" v-model="form.site" :filterable="false" @search="onSearch" label="INTITULE" class="custom-select-type_titre" :class="{'styleToSet': notSetSiteoper }">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                            <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                        </li>
                      </v-select>
                      <span v-if="notSetSiteoper" class="text-danger">bien vouloir remplir ce champ</span>
                  </b-col>
                  <b-col cols="3">
                    <label for="" class=""><span class="set-obligation-indicator">*</span> Date opération</label>
                    <b-form-group label="" description="" >
                      <input class="sigif-input-date" type="date" v-model="form.date" format="YYYY--MM-DD"  :class="{'styleToSet': notSetDateoper }"/><br>

                      <!--<date-picker v-model="form.date" placeholder="YYYY-MM-DD" format="YYYY-MM-DD" valueType="YYYY-MM-DD" class="w-50" :class="{'styleToSet': notSetDateoper }" :clearable="false" /><br>-->
                        <span v-if="notSetDateoper" class="text-danger">bien vouloir remplir ce champ</span>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <label for="">heure</label>
                    <b-form-group label="" description="">
                      <input type="time" v-model="form.heure" id="appt" name="appt" >
                        <!--<vue-timepicker v-model="form.heure" format="HH:mm:ss"></vue-timepicker>-->
                    </b-form-group>
                  </b-col>
              </b-row>
              
            </div>
          </div>
          <ChangeProductBox ref="changeProduct"></ChangeProductBox>
          <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col cols="5"><h4 class="tab-header-left-text mx-2"> Liste des produits</h4>
                <a style="cursor: pointer;" @click.prevent="addFieldGrume" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                <a style="cursor: pointer;" @click.prevent="RemouveAllFieldsGrumes" class="mx-1 simple-btn"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                <a style="cursor: pointer;" @click.prevent="showImportSection" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Importer</a>
              </b-col>
              <b-col cols="3">
                <div class="mt-1">
                  <label for="">Type de produit</label>
                  <select @change.prevent="showConfirmMessage" name="typeproduits" class="m-0 p-0"  style="width:35%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem) !important;">
                    <option v-for="(type, index) in typeProduit" :value="type.value" :key="index" :selected="index==0" >{{ type.libelle }}</option>
                  </select>
                </div>
              </b-col>
              <b-col cols="3">
                <div class="mt-1">
                  <label for="">Code à barre LV</label>
                  <b-form-input @keydown.tab.prevent="processTags($event.target.value, index, 'codebarrelv')" size="sm" class="w-50 p-0 m-0 bg-green px-1 d-inline-block" style="height: 24px !important;" placeholder="" v-model="form.codebarrelv" />
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
              <template v-slot:head(nomcommercial)="data">
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
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
              </template>
              <template #cell(nomcommercial)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nomcommercial" />
              </template>
              <template #cell(diampb)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.diampb" />
              </template>
              <template #cell(diamgb)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.diamgb" />
              </template>
              <template #cell(longueur)="data">
                <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
              </template>
              <template #cell(volume)="data">
                <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
              </template>
              <template #cell(action)="data">
                <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldGrumes(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
              </template>
             
            </b-table>
            <div v-if="form.typeproduit=='CL'">
              <b-table v-model="currentItemColis" height="50px" :items="itemsdebites"  :fields="fieldsdebites" class="mt-1" outlined   ref="selectableTabledebites" select-mode="single" selectable @row-selected="onRowSelectedDebites" :tbody-tr-class="rowClass">
                <template v-slot:head(codebarre)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(sequence)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(numgrume)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(nomcommercial)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(longueur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(largeur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(epaisseur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(nombrePiece)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(volume)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
           
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
                <template #cell(codebarre)="data">
                  <input disabled size="xs" @keydown.tab.prevent="checkCodebarreLv($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                </template>
                <template #cell(sequence)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                </template>
                <template #cell(numgrume)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numgrume" />
                </template>
                <template #cell(nomcommercial)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nomcommercial" />
                </template>
                <template #cell(longueur)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                </template>
                <template #cell(epaisseur)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.epaisseur" />
                </template>
                <template #cell(largeur)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.largeur" />
                </template>
                <template #cell(nombrePiece)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nombrePiece" />
                </template>
                <template #cell(volume)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldGrumes(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                </template>
              
              </b-table>
              <div class="px-2 table-header-border mt-5">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Détail des débités</h4></b-col>
                    <b-col class="liens">
                      <a style="cursor: pointer" @click.prevent="addFieldDetailsDebites" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a style="cursor: pointer" @click.prevent="removeAllFieldsDetailsDebites"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                    </b-col>
                </b-row>
              </div>
              <b-table height="50px" :items="itemsdetailsdebites"  :fields="fieldsdetailsdebites" class="mt-1" outlined   ref="selectableCodesDebites" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                <template v-slot:head(codebarre)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(epaisseur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(largeur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(longueur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(nombrepiece)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(poids)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(superficie)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(volume)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
           
                
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
                <template #cell(codebarre)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                </template>
                <template #cell(epaisseur)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.epaisseur" />
                </template>
                <template #cell(largeur)="data">
                  <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.largeur" />
                </template>
                <template #cell(longueur)="data">
                  <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                </template>
                <template #cell(nombrepiece)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nombrepiece" />
                </template>
                <template #cell(poids)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.poids" />
                </template>
                <template #cell(superficie)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.superficie" />
                </template>
                <template #cell(volume)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldGrumes(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                </template>
              
              </b-table>
            </div>
          </b-overlay>
          </div>
         
            
        </b-overlay>
        <file-component ref="filecomponent" @fileupload="handleFileUpload" @importsuccessfull="handleDataImported" :dto="dto"></file-component>
        <confirm-dialogue ref="confirmdialogue"></confirm-dialogue>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import Papa from 'papaparse';

  import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
  import ConfirmDialogue from '@/components/utils/ConfirmDialogue.vue';
  
  import FileComponent from '@/components/utils/operation_de_parc/ImportEntreeParcFIle.vue';

  import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";

export default {
  name: "create_entree_parcs",
  components: {
    FileComponent,
    ChangeProductBox,
    CodeBarreInfo,
    ConfirmDialogue
  },
  data: () => ({
    //elements debités
    currentItemColis:[],
    indexRowSelectedColis:0,
    fieldsdebites: [ 
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, 
        { key: 'sequence', label: 'Séquence' },
        { key: 'nomcommercial', label: 'Nom commercial',thStyle:"width:20%" },
        { key: 'numgrume', label: 'Ligne DF10',thStyle:"width:8%" },
        { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" },
        { key: 'epaisseur', label: 'épaisseur(cm)',thStyle:"width:8%" },
        { key: 'largeur', label: 'largeur(cm)',thStyle:"width:8%" },
        { key: 'nombrePiece', label: 'Nombre de pièces',thStyle:"width:14%" },
         { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      elementsdebites:[],
      fieldsdetailsdebites: [
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' },
        { key: 'epaisseur', label: 'épaisseur(cm)' }, { key: 'largeur', label: 'Largeur(cm)',thStyle:"width:14%" },
        { key: 'Longueur', label: 'Longueur de la pièce (cm)',thStyle:"width:18%" }, { key: 'nombrepiece', label: 'Nombre de pièces' },
        { key: 'poids', label: 'Poids'}, { key: 'superficie', label: 'Superficie',thStyle:"width:8%" },
        { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      elementsdetailsdebites:[],

    showOverlayCodeData:false,
    notSetSiteoper:false,
    notSetDateoper:false,
    indexRowSelected:0,
    offsetSites: 0,
    limitSites: 10,
    sites:[],
    essences:[],
    searchsite:"",
    visible: true,

    fieldsGrumes: [],
    elementsgrumes:[],
    isBusy:false,
    showOverlay:false,
    form: {
      site:"",
      typeproduit: 'GR',
      codebarrelv: "",
      dateoperation: "",
      heureoperation:"",
    
    },
    submitted:false,
    typeProduit: [
      { libelle: "Grume", value: 'GR' },
      { libelle: "Débité", value: 'CL' }
    ], 

    //données du tableaux
    fieldsgrumes: [ 
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Référence code barre' },
      { key: 'numdf10', label: 'Ligne DF10' }, { key: 'nomcommercial', label: 'Nom commercial',thStyle:"width:20%" },
      { key: 'diampb', label: 'Diamètre petit bout' }, { key: 'diamgb', label: 'Diamètre gros bout' },
      { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" }, { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
      { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    fieldsGrumesChecked: [],
    
    showGrume: true,
    asimport:false, //variable de check méthode d'enregistrement
    //propriétés liées à l'upload de fichier
    file:'',
    content: [],
    parsed: false,
    uploadsection:false,
    dto:{}
  }),
  computed:{
    itemsdebites(){
      return this.elementsdebites.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdetailsdebites(){
      return this.elementsdetailsdebites.map((a, index) => {
        a.largeur = a.largeur!=null? a.largeur:''
        a.longueur = a.longueur!=null? a.longueur:''
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
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
    filteredSites(){
        return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase()))
    },
    paginatedSites(){
      return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetSites)
    },
    hasNextPageSites(){
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filteredSites.slice(nextOffset, this.limitSites + nextOffset).length
      )
    },
    hasPrevPageSites(){   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filteredSites.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
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
    handleDataImported(data){
      if(this.form.typeproduit=='GR'){
        for(let i=0;i<data.length; i++){
          this.elementsgrumes.push(data[i])
        }
      }else if(this.form.typeproduit=='CL'){
        for(let i=0;i<data.length; i++){
          this.elementsdebites.push(data[i])
        }
        this.elementsdebites.map(elt =>{
          elt.longueur = elt.longueur!=null?elt.longueur.toFixed(3):''
          elt.largeur = elt.largeur!=null?elt.largeur.toFixed(3):''
          elt.volume = elt.volume!=null?elt.volume.toFixed(3):''
          elt.superficie = elt.superficie!=null?elt.superficie.toFixed(3):''
          elt.epaisseur = elt.epaisseur!=null?elt.epaisseur.toFixed(3):''
        })
        this.elementsdetailsdebites = this.elementsdebites[0].pieces;
      }
      
      this.$refs.filecomponent._close();
    },
    onRowSelectedDebites(items){
      this.isRowselected=true
      this.indexRowSelectedColis = items.map(item => this.currentItemColis.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemColis.indexOf(item)).length;i++){
          this.indexRowSelectedColis =items.map(item => this.currentItemColis.indexOf(item))[i]
        }
      if(!php.empty(items)&&!php.empty(items[0].detailsdebites)){
        this.elementsdetailsdebites =items[0].pieces
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
        if(this.form.typeproduit=='GR'){
          this.elementsgrumes.unshift({codebarre: '', reference: '', lignedf10: "", nomcommercial:'', dpb:'',dgb:'',longueur:'',volume:'', });
        }
        if(this.form.typeproduit=='CL'){
          this.elementsdebites.unshift({codebarre: '', reference: '', lignedf10: "", nomcommercial:'', epaisseur:'',largeur:'',longueur:'',nbpieces:'',volume:'', });
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
      RemouveFieldGrumes(index){
        this.elementsgrumes.splice(index, 1);
      },
      RemouveAllFieldsGrumes(){
        this.elementsgrumes=[];
      },
      async checkCodebarre(value,index, commande){
          this.showOverlayCodeData=true;
            if(commande='codebarre'){
              if(this.form.typeproduit=='GR'){
                await this.$codesbarres.post("check/codebarre-grume-grumeabatage", {codebarre : value, idsite:this.form.site.IDSITEOPER })
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsgrumes[index].sequence=this.dataresult.sequence
                  this.elementsgrumes[index].numdf10=this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
                  this.elementsgrumes[index].nomcommercial=this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
                  this.elementsgrumes[index].diampb=this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
                  this.elementsgrumes[index].diamgb=this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
                  this.elementsgrumes[index].longueur=this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
                  this.elementsgrumes[index].volume=this.dataresult.volume !==null ? this.dataresult.volume :"" ;
                  this.showOverlayCodeData=false;

                } )
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeData=false;
                  this.errorHappened(error.response.data);
                } )
              }
              if(this.form.typeproduit=='CL'){
                await this.$codesbarres.post("check/codebarre-colis", {codebarre : value, idsite:this.form.site.IDSITEOPER })
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsdebites[index].sequence=this.dataresult.Items[0].reference
                  this.elementsdebites[index].numdf10=this.dataresult.Items[0].numDf10 !==null ? this.dataresult.Items[0].numDf10 :"" ;
                  this.elementsdebites[index].nomcommercial=this.dataresult.Items[0].nonusuel !==null ? this.dataresult.Items[0].nonusuel :"" ;
                  this.elementsdebites[index].epaisseur=this.dataresult.Items[0].epaisseur !==null ? this.dataresult.Items[0].epaisseur :"" ;
                  this.elementsdebites[index].largeur=this.dataresult.Items[0].largeur !==null ? this.dataresult.Items[0].largeur :"" ;
                  this.elementsdebites[index].longueur=this.dataresult.Items[0].longueur !==null ? this.dataresult.Items[0].longueur :"" ;
                  this.elementsdebites[index].nombrepiece=this.dataresult.Items[0].volume !==null ? this.dataresult.Items[0].volume :"" ;
                  this.showOverlayCodeData=false;
                })
                .catch(error =>{
                  console.log('execution du catch aussi 2',error);
                  this.showOverlayCodeData=false;
                  this.errorHappened(error.response.data);
                } )
              }
              
            }     
        },
   
        resetForm() {
          this.form = {
            site: '', date: '', typeproduit: "", heure: "", codebarres:[],
          };
        },
    /**ajout d'une entrée parc*/
      async submitData(){
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
          let codebarres=[];

          if(this.form.typeproduit=='GR'){
            this.elementsgrumes.forEach(elt =>{
              codebarres.push(elt.codebarre)
            })
          }
          if(this.form.typeproduit=='CL'){
            this.elementsdebites.forEach(elt =>{
              codebarres.push(elt.codebarre)
            })
          }
          if(php.empty(codebarres)){
            let error={ message:'Bien vouloir renseigner au moins 1 codebarre'}
              return this.sendAlertMessage(error);
          }
 

          //traitement ajout en masse
          if(this.asimport==true){
            console.log('ajout en masse ',this.content);
          }
          //triatement ajout unitaire
          else{
            this.form.codebarres= codebarres;
            let data={site: this.form.site.IDSITEOPER,typeproduit: this.form.typeproduit,codebarrelv: this.form.codebarrelv,date: this.form.date, codebarres:this.form.codebarres }
            if(php.empty(this.form.heure)){
              data.heure=''
            }
            else{
              data.heure=this.form.date+'T'+this.form.heure+':00'
            }
            this.submitted = true
            console.log('données envoyées ',data);
            this.submitted = true 
            this.$operationParc.post('entrees-parc', data).then(response => {
                this.submitted = false 
                this.resetForm()
                App.notifySuccess(response.data.message)
                return this.$router.push({ name: "entree_parcs" });
            }).catch(error => {
                console.log('entrée dans le catch');
                this.submitted = false
                this.errorHappened(error.response.data)
            })
          }
        
      },
      async errorHappened(error){
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

      /*changeSelect(val) {
        if (this.form.typeproduit == "GR") {
          this.form.typeproduit = "CL";
        }
        else {
          this.form.typeproduit = "GR";
        }
        this.deleteAll();
      },*/
      validateState(ref){
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) 
        { return !this.veeErrors.has(ref);}
            return null;
      },   
      removeAtIndex(index) {
        this.fields.splice(index, 1);
      },
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
      async getCreationData(){
        this.showOverlay=true;
      
        if(!php.empty(this.$store.state.sitesnoutbs) ){
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
        this.showOverlay=false;
      },
        
    fermer(){
      this.$router.back()
    },
  //methode d'ajout d'une entrée parc

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
    handleSelected(index){
      this.indexRowSelected =index
      console.log('ligne sélectionnée ',index);
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
    onSearch(query) {
      this.searchsite = query
      this.offsetSites = 0
    },
    
    async getBulkCodesData(entreeParcDto){
      let result=[]
      await this.$operationParc.post("entrees-parc/list_verif_import_entreeParc", entreeParcDto)
        .then(response =>{
            result=response.data.result.Items
          console.log('reult ',response.data.result);

          for(let i=0;i<result.length; i++){
            console.log('datta ',result[i]);
            this.elementsgrumes.push(result[i])
          }
          
        } )
        .catch(error =>{
          console.log('execution du catch aussi 1',error.response.data);
          this.$emit('hideSpinner')
          this.errorHappened(error.response.data);
        } )
    },
    async custoFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'entrées parcs',
        okButton: 'valider',
        cancelButton: 'Annuler'

        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          let codebarres=[]
          this.content.data.forEach(elt =>{
              codebarres.push(elt.CODEBARRE)
            })
          let entreeParcDto={site: this.form.site.IDSITEOPER,typeproduit: this.form.typeproduit,codebarrelv: this.form.codebarrelv,date: this.form.date, codebarres: codebarres}
            if(php.empty(this.form.heure)){
              entreeParcDto.heure=''
            }
            else{
              entreeParcDto.heure=this.form.date+'T'+this.form.heure+':00'
            }
            this.getBulkCodesData(entreeParcDto)
         // this.$refs.filecomponent._close();

          //.uploadsection=true
        } else {
          this.$refs.filecomponent._close();
        }
    },
    handleFileUpload( event ){
      this.file = event.target.files[0];
      this.parseFile();
    },
      //méthode de gestion e l'upload de fichier csv
    parseFile(){
        Papa.parse( this.file, {
            header: true,
            skipEmptyLines: true,
            complete: function( results ){
                this.content = results;
                this.parsed = true;
                this.asimport=true; 
            }.bind(this)
        } );
    },
    async retour(){
      const ok = await this.$refs.confirmdialogue.show({
            title: 'Information',
            message: 'toutes vos données seront déchargées',
            okButton:'VALIDER'
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.confirmdialogue._close();
              this.parsed = false;
              this.uploadsection = false;
              this.file=''
              this.content=[]
          } else {
            this.$refs.confirmdialogue._close();
          }
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
        let data={
          site: this.form.site.IDSITEOPER, typeproduit: this.form.typeproduit, date:this.form.date
        }
        if(php.empty(this.form.heure)){data.heure=''}
        else{data.heure=this.form.date+'T'+this.form.heure+':00'}
        this.dto=data
      this.showUploadFile();
    },
    async showUploadFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'entrées parcs',
        okButton: 'valider',
        cancelButton: 'Annuler'

      })
    },
  },
  

  mounted(){
    this.getCreationData();
  }
}

</script>
<style scoped>

.sigif-input-date{
  width: 45%;
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
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
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
.change_bg{
  background:#82C138
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
  .set-obligation-indicator{
    color:red; font-size: 1.4em
  }

  .border-danger{
    --vs-controls-color: #f50a0a;
    --vs-border-color: #f50a0a;
  }
  .styleToSet{
    border: 2px solid red;
  }

</style>
<style>
  .custom-bg{ background: rgb(0, 82, 44) !important;}
</style>