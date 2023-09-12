<template>
  <div id="cover" class="min-vh-100">
        <b-overlay :show="showOverlay">
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
              <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span>Création inventaire </span>
              </h4>
            </b-col> 
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="sendFormInventaire" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION INVENTAIRE -->
            <b-row class="mt-2">
              <b-col cols="5">
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Type de Titre </h6></b-col>
                  <b-col cols="7">
                    <select @change.prevent="showSelectedValue" v-model="form.typetitre" :class="{ styleToSet: notSetTypeTitre }" class="m-0 p-0 default-old-system-input-properties w-100"   style="width: 95%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option value=""></option>
                      <option v-for="(typetitre, i) in typestitres" :value="typetitre" :key="i">
                        {{ typetitre.libelle }}
                      </option>
                    </select>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Titre N° </h6></b-col>
                  <b-col cols="7">
                    <select @change.prevent="showSelectedValueTitre" :disabled="disableTitre" v-model="form.numtitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(titre,i) in _titres" :key="i" :value="titre"> {{ titre.numtitre }}</option>
                    </select>              
                  </b-col>
                </b-row>
                <!--SPECIFICITES CONVENTION PROVISOIRE ET CONVENTION DEFINITIVE-->
                <b-row class="my-2" v-if="form.typetitre!=''&&form.typetitre.code=='CP'||form.typetitre.code=='CD'">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span>N° UFA </h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableUFA" v-model="form.numufa" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(ufa,i) in _titresufa" :key="i" :value="ufa.idufa"> {{ ufa.numufa }}</option>
                    </select>              
                  </b-col>
                </b-row>
                <!--SPECIFICITES FORET COMMUNALE ET CONVENTION DEFINITIVE-->
                <b-row class="my-2" v-if="form.typetitre!=''&&form.typetitre.code=='CD'">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span>N° UFE </h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableUFE" v-model="form.numufe" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(ufe,i) in _titreufe" :key="i" :value="ufe.idufe"> {{ ufe.numufe }}</option>
                    </select>              
                  </b-col>
                </b-row>
                <b-row class="my-2" v-if="form.typetitre!=''&&form.typetitre.code=='CP'||form.typetitre.code=='CD'">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span>N° AAC </h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableAAC" v-model="form.numaac" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(aac,i) in _titresaac" :key="i" :value="aac.idaac"> {{ aac.numaac }}</option>
                    </select>              
                  </b-col>
                </b-row>
                
                <!--SPECIFICITES FORETS COMMUNAUTAIRE-->
                <b-row class="my-2" v-if="form.typetitre!=''&&form.typetitre.code=='FS'||form.typetitre.code=='FC'">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span>Secteur </h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableUFA" v-model="form.numsecteur" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(ufa,i) in _titresufa" :key="i" :value="ufa.idufa"> {{ ufa.idufa }}</option>
                    </select>               
                  </b-col>
                </b-row>
                <b-row class="my-2" v-if="form.typetitre!=''&&form.typetitre.code=='FS'||form.typetitre.code=='FC'">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span>Parcelle </h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableAAC" v-model="form.numparcelle" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="(aac,i) in _titresaac" :key="i" :value="aac.idaac"> {{ aac.numaac }}</option>
                    </select>              
                  </b-col>
                </b-row> 
              </b-col>
             <!--ELEMENTS DE DROITE-->
              <b-col cols="6">
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Exercice Fiscal</h6></b-col>
                  <b-col cols="7">
                    <select :disabled="disableExercice" :class="{ styleToSet: notsetExerciceFiscal }" class="m-0 p-0 default-old-system-input-properties" v-model="form.exercice"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option v-for="(exercice, i) in exercices" :value="exercice.libelle" :key="i">
                        {{ exercice.libelle }}
                      </option>
                    </select>
                  </b-col>
                </b-row>  
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Entité agrée inventaire</h6></b-col>
                  <b-col cols="7">
                    <b-overlay :show="shoverlayentites" rounded="sm">
                      <template #overlay>
                      <div class="text-center">
                        <i class="fas fa-2x fa-sync fa-spin"></i>
                        <p id="cancel-label">Chargement...</p>
                      </div>
                    </template>
                    <div class="w-100 pr-1">
                      <v-select :disabled="notsetExerciceFiscal" :options="entitesagrees" :filterable="false" @search="onSearchEntiteeAgree" label="raisonsociale" class="custom-select-type_titre  w-90" v-model="form.entiteagree"  :class="{'styleToSet': notSetEntiteagree }">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntiteesagrees" @click="(offsetentiteagree -= limitentiteagree)">Prèc.</button>
                            <button :disabled="!hasNextPageEntiteesagrees" @click="(offsetentiteagree += limitentiteagree)">Suiv.</button>
                        </li>
                      </v-select>
                    </div>
                  </b-overlay>
                  </b-col>
                </b-row>  
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Type d'inventaire</h6></b-col>
                  <b-col cols="7">
                    <select :class="{ styleToSet: notSetTypeInventaire }" class="m-0 p-0 default-old-system-input-properties" v-model="form.typeinventaire"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option></option>
                      <option value="EXPLOITATION">Exploitation</option>
                    </select>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
            <div>
              <div class="mx-4 px-2 table-header-border mt-2">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des produits</h4></b-col>
                    <b-col class="liens">
                      <a @click.prevent="loadFile"   class="mx-2 simple-btn"><b-img  src="@/assets/images/excel.png"></b-img>Importer</a>
                      <a @click.prevent="addFieldTige" class="mx-2 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a @click.prevent="remouveAllFieldsTiges"  class="mx-2 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                    </b-col>
                </b-row>
              </div>
              <!--TABLEAU PRODUITS -->
              <div class="">
                <b-overlay :show="showOverlayCodeData" rounded="sm">
                  <b-table max-height="700px" v-model="currentItemGrume" :items="items"  
                    :fields="fieldstiges" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   
                    ref="selectableTableDetailLot" select-mode="single" selectable 
                    @row-selected="onRowSelectedProduits" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(essence)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template v-slot:head(diametreTige)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(numBloc)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(numUc)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(numtige)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(qualite)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(utmZone)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmX)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmY)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    
                    <template v-slot:head(volume)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <input size="xs" @keydown.tab.prevent="getSequence(data.index, data.item.codebarre)" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:98%" v-model="data.item.codebarre" />
                    </template>
                    <template #cell(sequence)="data">
                      <input size="xs" class="mx-1 w-75 d-flex justify-content-center px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                    </template>
                    <template #cell(essence)="data">
                      <v-select :options="paginated" v-model="data.item.essence" :reduce="essence => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetessences -= limitessences">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offsetessences += limitessences">Suiv.</button>
                        </li>
                      </v-select>
                    </template>
                    <template #cell(diametreTige)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.diametreTige" />
                      </div>
                    </template>
                    <template #cell(numBloc)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.numBloc" />
                      </div>
                    </template>
                    <template #cell(numUc)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.numUc" />
                      </div>
                    </template>
                    <template #cell(numtige)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.numtige" />
                      </div>
                    </template>
                    <template #cell(qualite)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.qualite" >
                          <option value=""></option>
                          <option v-for="(q,i) in qualites" :key="i" :value="q.idqualite">{{ q.intitule }}</option>
                        </select>
                      </div>
                    </template>
                    <template #cell(utmZone)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmZone">
                            <option value=""></option>
                            <option value="32N">32N</option>
                            <option value="33N">33N</option>
                          </select>
                      </div>
                    </template>
                    <template #cell(utmX)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmX" />
                      </div>
                    </template>
                    <template #cell(utmY)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmY" />
                      </div>
                    </template>
                    <template #cell(volume)="data">
                      <input size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.volume" />
                    </template>
                    <template #cell(action)="data">
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldTige(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  </b-table>
                  <paginator
                    hr="top"
                    :offset="offset"
                    :total="elementsproduits.length || 0"
                    :limit="perPage"
                    :page="currentPage"
                    @pageChanged="(page) => {currentPage = page}"
                    @limitChanged="(limit) => {perPage = limit}"
                    v-show="itemsProduits.length > 25"
                  />
                </b-overlay>
              </div>
            </div>
        </b-overlay>
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
        <api-unreachable ref="apiunreacahble"></api-unreachable>
        <file-component ref="filecomponent"  @importsuccessfull="handleDataImported"></file-component>
        <created-box ref="createdDialogue"></created-box>
        <error-dialogue ref="errorDialogue"></error-dialogue>
        
      </div>
  
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ApiUnreachable from '@/components/utils/ApiUnreachable.vue';
import FileComponent from '@/components/utils/inventaire/ImportInventaireFile.vue';
import CreatedBox from '@/components/utils/Created.vue';


export default {
  name:"creation-inventaire",
  components:{ErrorDialogue, CodeBarreInfo, ApiUnreachable, FileComponent, CreatedBox},
   watch: {
    "form.typetitre"(value) {
        console.log('php.empty(value) ',php.empty(value));
        if(!php.empty(value)){
            this.disableTitre= false
        }
        else{
            this.disableTitre= true
        }
     },
     "form.numtitre"(value) {
        if(!php.empty(value)){
            this.disableUFA= false
        }
        else{
            this.disableUFA= true
        }
     },
     "form.numufa"(value) {
      console.log('numtitre ufa ',this.form.numtitre);
        if(this.form.typetitre.code=='CP'){
          if(!php.empty(value)){
            this.disableAAC= false
          }
          else{
            this.disableAAC= true
          }
        }else if(this.form.typetitre.code=='CD'){
          if(!php.empty(value)){
            this.disableUFE= false
          }
          else{
            this.disableUFE= true
          }
        }
       
     },
     "form.numufe"(value) {
        if(!php.empty(value)){
            this.disableAAC= false
        }
        else{
            this.disableAAC= true
        }
     },
     "form.numaac"(value) {
        console.log('php.empty(value) ',php.empty(value));
        if(!php.empty(value)){
          this.disableExercice= false
        }
        else{
          this.disableExercice= true
        }
     },
    "form.exercice"(value) {
      if(!php.empty(value)){
        this.notsetExerciceFiscal= false
      }
      else{
        this.notsetExerciceFiscal= true
      }
    },
    "form.numsecteur"(value){
      if(!php.empty(value)){
            this.disableAAC= false
        }
        else{
            this.disableAAC= true
        }
    },
  },
   data: () => ({
    searchentiteagree:'',
    notSetEntiteagree:false,
    notsetExerciceFiscal:true,
    shoverlayentites:false,
    showOverlay:false,
    notSetTypeTitre:false,
    typestitres:[],
    numtitres: [],
    disableTitre:true,
    disableUFA:true,
    disableUFE:true,
    disableAAC:true,
    disableExercice:true,
    notSetNumTitre:false,
    fieldstiges:[
      { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
      { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
      { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
      {key:'diametreTige',label:'Diamètre tige'},{key:'numBloc',label:'Numéro du bloc'},{key:'numUc',label:'Numéro de l\'UC'},
      {key:'numtige',label:'Numéro de la tige'},{key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
      { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
      { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
      {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},
      {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
    ],
      elementsproduits:[],
      currentPage: 1,
      perPage: 10,
      exercices:[],
      submitted:false, 
      notSetNumCatalogue:false,
      notSetTypeInventaire:false, 
   
      searchligne:'',
      offsetlignes:0,
      limitlignes:7,
      offsetessences:0,
      limitessences:10,
      searchessences:'',
      isBusy:false,
      showOverlayLocalisation:false,
      essences:[],
      sequence:'',
      form:{
        typetitre:'',
        numtitre:'',
        exercice:'',
        entiteagree:'',
      },
     
   
    
      titres:[],
      qualites:[],

      annecourante:"",
      entitesagrees:[],
      loadData:false,
      typesinventaires: ["Exploitation"],
      currentItemGrume:[],
      showOverlayCodeData:false,
  }),

  methods: {
    showSelectedValueTitre(){
      console.log('titre ',this.form.numtitre);
    },
    onSearchEntiteeAgree(query){
      this.searchentiteagree = query
      this.offsetentiteagree = 0
    },
    showSelectedValue(){
      console.log('value ',this.form.typetitre);
    },
    //chargements du fichier d'import
    async loadFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'produits',
        okButton: 'valider',
        cancelButton: 'Annuler'
      })
    },
    handleDataImported(data){
      for(let i=0;i<data.length; i++){
        this.elementsproduits.push(data[i])
      }
      this.$refs.filecomponent._close();
    },
    remouveAllFieldsTiges(){
      this.elementsproduits = [];
    },
    addFieldTige(){
      this.getProduitsData();
          
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
        this.elementsproduits.unshift({codebarre: '', sequence: '',essence:'',diametreTige:'',
                                          numBloc:'',numUc:'',numtige:'',qualite:'', utmZone : '', 
                                          utmX:'',utmY:'',volume:''});
    },
   
    RemouveFieldTige(index){
      this.elementsproduits.splice(index, 1);
    },
   
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },
   
    onRowSelectedProduits(items){
      console.log('row selected',items);
      items.isSelected =true;
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
    //methode d'ajout d'un catalogue
    formatPostContent(){      
      if (php.empty(this.form.numcatalogue)) {
          this.notSetNumCatalogue=true;
          let error={ message:'Veuillez remplir le numéro de catalogue'}
          this.sendAlertMessage(error);
          return false;
      }
      else  if (php.empty(this.form.typeinventaire)) {
          this.notsetTypeInventaire=true;
          let error={ message:'Veuillez remplir le type d\'inventaire'}
          this.sendAlertMessage(error);
          return false;
        }
      else  if (php.empty(this.form.exercice)) {
          this.notSetExercice=true;
          let error={ message:'Veuillez renseigner l\'exercice'}
          this.sendAlertMessage(error);
          return false;
        }
        return true;
    },
    async sendFormInventaire(){
      let data={}
      if(this.formatPostContent){

        data.typetitre = this.form.typetitre.code; 
        data.numtitre = this.form.numtitre.idtitre;
        data.numufa = this.form.numufa; 
        data.numufe = this.form.numufe!=undefined?this.form.numufe:''; data.numaac = this.form.numaac;
        data.exercice = this.form.exercice;
        data.entite = this.form.entiteagree.idsociete;
        data.typeinventaire = this.form.typeinventaire; 
        data.numsecteur = this.form.numsecteur;
        data.numparcelle = this.form.numparcelle;
        this.elementsproduits = this.elementsproduits.map(elt =>{
          elt.idessence = elt.essence
          return elt
        })
        data.tiges = this.elementsproduits;
        this.submitted =true;
        this.$inventaire.post('inventaires', data).then(response => {
          console.log('response ',response);
            this.submitted = false 
          App.notifySuccess(response.data.message)
          return this.handleCreated();
          return this.$router.push({ name: "inventaires" });
        }).catch(error => {
          console.log('error ',error);
            this.submitted = false
            this.errorHappened(error.response.data.message )
        })
      }
     
    
    },
    async handleCreated() {
      const ok = await this.$refs.createdDialogue.show({
          title: 'Enregistrement',
          message: 'inventaire ajouté avec succès',
          okButton: 'Nouvel enregistrement',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.createdDialogue._close();
          this.resetForm();
      } else {
          this.$refs.createdDialogue._close();
          this.$router.back();
      }
    },
    resetForm(){
      this.form={
        typetitre:'',
        numtitre:'',
        numufa:'',
        numufe:'',
        numaac:'',
        exercice:'2023',
        entiteagree:'',
        numsecteur:'',
        numparcelle:''
      }
      this.elementsproduits = []
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


     getDates(){
         let exact = 2000 + new Date().getYear() - 100;
         for (let index = 0; index < 5; index++) {
          this.exercices.push({ libelle: exact - index, value: index + 1, },)
         }
         this.form.exercice=exact
      },

    async getSequence(index, value){
      this.showOverlayCodeData=true;
        await this.$codesbarres.post("check/check_codebarre_inventaire", {codebarre : value,idaac:this.form.typetitre.code=='FS'?this.form.numparcelle:this.form.numaac})
      .then(response =>{
        console.log('response 1',response);
        if(response.status===200){
          this.elementsproduits[index].sequence = response.data.result.sequence
        }
    
        else{
          console.log('entrée dans le else ',response.data.message);
          this.showOverlayCodeData=false;
          return this.showDialogueApiError(response.data.message);
        }
          this.showOverlayCodeData=false;
      })
      .catch(error =>{
          this.showOverlayCodeData=false;
          if(error.response){
            return this.showDialogueApiError(error.response.data.message||'érreur interne du serveur');
          }else if(error.request){
            console.log(error.request)
          }else{
            console.log(error.message)
          }
      })     
    },

    removeAtIndex(index) {
      this.fields.splice(index, 1);
    },
      
      async showDialogueApiError(message){
        const ok = await this.$refs.apiunreacahble.show({
          title: 'Information',
          message: message,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.codebarreinfo._close();
            // this.$router.back();
        } else {
          this.$refs.codebarreinfo._close();
          this.elementsproduits[0].codebarre=''
          // this.$router.back();
        }
      },
      //récupération des entitées agrées à l'inventaire
    async getProduitsData(){
        this.shoverlayentites=true
        console.log('entrée ici')
        if(!php.empty(this.$store.state.entitesagrees)){
            this.entitesagrees=this.$store.state.entitesagrees
        }else{
          try {
              this.entitesagrees = await this.$donneesReference.get("entites/agrees-inventaire?size=400").then(response => response.data.result.items);
              console.log('entitées agrées ',this.entitesagrees);
              this.$store.dispatch('entitesagrees', this.entitesagrees);
          } catch (error) {
          }
        }
        this.shoverlayentites=false
    },
      async getInventaireData(){
        this.showOverlay=true;
          if (!php.empty(this.$store.state.typesTitres) ) {
            this.typestitres = this.$store.state.typesTitres;
          } 
          else{
            try {
              this.typestitres= await this.$donneesReference.get("types-titre?with_titre=true").then(response => response.data.result.items);
              this.$store.dispatch('typesTitres', this.typestitres)
            } catch (error) {
                App.notifyError(error.message);
            }
          }
          if(!php.empty(this.$store.state.entitesagrees)){
            this.entitesagrees=this.$store.state.entitesagrees
          }else{
            try {
                this.entitesagrees = await this.$donneesReference.get("entites/agrees-inventaire?size=400").then(response => response.data.result.items);
                console.log('entitées agrées ',this.entitesagrees);
                this.$store.dispatch('entitesagrees', this.entitesagrees);
            } catch (error) {
            }
          }
          this.form.exercice="2023"
          this.showOverlay=false;
        },
      async getProduitsData(){
        this.showOverlayCodeData=true;
        if(!php.empty(this.$store.state.essences)){
          this.essences=this.$store.state.essences;
        }
        else{
          try {
              this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
              console.log('essences ',this.essences);
              this.$store.dispatch('essences', this.essences)
          } catch (error) {
              console.log(error.message);
          }
        }
        if(!php.empty(this.$store.state.qualites)){
          this.qualites=this.$store.state.qualites
        }else{
          try {
              this.qualites =  await this.$inventaire.get("catalogues/qualites").then(response => response.data.result.Items);
              console.log('qualites ',this.qualites);
              this.$store.dispatch('qualites', this.qualites)
          } catch (error) {
              console.log(error.message);
          }
        }
        this.showOverlayCodeData=false;
      },
      async  setformNext(){
        if(!php.empty(this.inventaire.typetitre)){
          this.typeTitreSet =true
          this.loadData = true
          this.inventaire.numtitre=""
          this.titres= await this.$titres.get("titres/"+this.inventaire.typetitre.code+"?size=400").then(response => response.data.result.items);
          this.loadData = false
        }
      },

      
      onSearch(query) {
      this.searchessences = query
      this.offsetessences = 0
    },

     fermer() {this.$router.back()},
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
     
      enregistrer() {
        /*this.form.codebarres =  [];
        this.fields.forEach(field => {
          this.form.codebarres.push(field.codebarre)
        }) */
        if (php.empty(this.form.numcatalogue)) {
          this.notSetNumCatalogue=true;
          let error={ message:'Veuillez remplir le numéro de catalogue'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typetitre)) {
          this.notSetTypeTitre=true;
          let error={ message:'Veuillez remplir le type de titre'}
          return this.sendAlertMessage(error);
        }
        if(this.form.typetitre==='AE'){
          this.checkFormAE()
        }
      },
   

  },
  computed:{
    filteredEntiteesagrees() {
      return this.entitesagrees.filter((entite) =>
      entite.raisonsociale.toLocaleLowerCase().includes(this.searchentiteagree.toLocaleLowerCase())
      )
    },
    paginatedEntiteesagrees() {
      return this.filteredEntiteesagrees.slice(this.offsetentiteagree, this.limitentiteagree + this.offsetentiteagree)
    },
    hasNextPageEntiteesagrees() {
      const nextOffset = this.offsetentiteagree + this.limitentiteagree
      return Boolean(
        this.filteredEntiteesagrees.slice(nextOffset, this.limitentiteagree + nextOffset).length
      )
    },
    hasPrevPageEntiteesagrees() {   
      const prevOffset = this.offsetentiteagree - this.limitentiteagree
      return Boolean(
        this.filteredEntiteesagrees.slice(prevOffset, this.limitentiteagree + prevOffset).length
      )
    },
    _titres() {
     if(!php.empty(this.form.typetitre)){
      return this.form.typetitre.titres;
     }
     return [];
    },
    _titresufa() {
     if(!php.empty(this.form.numtitre)){
      return this.form.numtitre.titreufa;
     }
     return [];
    },
    _titreufe(){ 
      if(!php.empty(this.form.numtitre)){
        return this.form.numtitre.titreufe;
      }
      return [];
    },
    _titresaac() {
     if(!php.empty(this.form.numtitre)){
      return this.form.numtitre.titreaac;
     }
     return [];
    },
    //éléments pagination
    items() {
      return php.array_slice(this.itemsProduits, this.offset, this.perPage);
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
    valuesSetCorrectly() {
      return ( !php.empty(this.form.typetitre)&&!php.empty(this.form.typeinventaire)
              &&!php.empty(this.form.exercice)
              &&
              !php.empty(this.elementsproduits)&&
              !php.empty(this.elementsproduits[0].codebarre)&&!php.empty(this.elementsproduits[0].diametreTige)&&!php.empty(this.elementsproduits[0].volume)
      );
    },
    
   
    itemsProduits(){
        return this.elementsproduits.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
      },
    volumetotal(){
      let vt =this.elementsproduits.reduce(function(prev, cur) {
        return Number(prev) +Number(cur.volume);
      }, 0);
      if(!php.empty(vt)){
        return vt.toFixed(3)
      }
      else{
        return 0
      }
    },
   
    // /////////////////////Listing des essences
    filtered() {
      return this.essences.filter((essence) =>
      essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetessences, this.limitessences + this.offsetessences)
    },
    hasNextPage() {
      const nextOffset = this.offsetessences + this.limitessences
      return Boolean(
        this.filtered.slice(nextOffset, this.limitessences + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offsetessences - this.limitessences
      return Boolean(
        this.filtered.slice(prevOffset, this.limitessences + prevOffset).length
      )
    },
  },
   mounted() {
      this.getInventaireData();
      this.getDates();
  },

}
</script>


<style scoped>

.system-input-etude-impact{
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
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;

}
.system-input-nom-promoteur{
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
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;
  height: 20px;
}
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
.catalogue-input-form{
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(1em + .500rem + 2px) !important;
}
.catalogue-form{
  width: 50%;
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(1em + .500rem + 2px) !important;
}
.sigif-input-view{
background:#82C138!important;
border:1px solid white;
font-size:0.75rem !important;
font-weight: 300;
height: calc(1em + .500rem + 1px) !important;
border-radius: .2rem;
}
.styleToSet{
border: 2px solid red;
}
.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
      /* Font */
  --vs-font-size: 0.65rem;
  --vs-line-height: 1.2;
}
.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
}
.liens a {
  color: rgb(0, 82, 44) !important;
  font-weight: 600;
  cursor: pointer;
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
    cursor:pointer;
  }
.custumSigifTab {
  float: left;
  background-position: top;
  box-sizing: border-box;
  white-space: nowrap;
  border-top: 1px solid #82C138;
  border-left: 1px solid #82C138;
  border-right: 1px solid #82C138;
  padding: 0px 5px 0px 7px;
  border-bottom: none;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  line-height: 19px;
  margin-top: 0px;
  background-color: #82C138;
  color:#fff;
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

  #vs6__combobox {
    border: red solid 5px !important;
    height: 20px !important;
    display: none !important;
  }

  .sigif-select{
    width: 99%;
    font-size:1rem; 
    border-radius:0.25rem; 
    height: calc(0.8em + .500rem + 2px) !important;
  }


</style>
