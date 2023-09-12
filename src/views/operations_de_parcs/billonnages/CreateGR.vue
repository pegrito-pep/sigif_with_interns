<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
      <div>
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
              <span class="font-weight-bold">Création Billonnage des grumes</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="postData" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
            </span>
          </b-col>
        </b-row>
        <!-- CREATION ligne de transformation-->
        <div>
          <div class="container1 mx-3 mt-1">
            <b-row class="d-flex d-flex justify-content-between">
                <b-col cols="3">
                  <label for=""><span class="set-obligation-indicator">*</span> Site concerné</label>
                    <v-select :options="paginatedSites" v-model="form.siteoper" :filterable="false" @search="onSearch" label="INTITULE" :reduce="site => site.IDSITEOPER" class="custom-select-type_titre" :class="{'styleToSet': notSetSiteoper }">
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
                    <input class="sigif-input-date" type="date" v-model="form.dateoper" format="YYYY--MM-DD"  :class="{'styleToSet': notSetDateoper }"/><br>
                      <span v-if="notSetDateoper" class="text-danger">bien vouloir remplir ce champ</span>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <label for="">heure</label>
                  <b-form-group label="" description="">
                    <input type="time" v-model="form.heure" id="appt" name="appt" >
                  </b-form-group>
                </b-col>
            </b-row>
            
          </div>
            <div style="height: 250px; overflow-y: auto; overflow-x: hidden;">
              <div class="m-4 px-2 table-header-border mt-5">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des grumes mères</h4></b-col>
                    <b-col class="liens">
                      <a @click.prevent="addFieldGrume" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a @click.prevent="removeAllFieldsGrumes"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                      <a @click.prevent="showImportSection"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                    </b-col>
                </b-row>
              </div>
              <div style="width:98%; max-height: 350px;">
                <b-overlay rounded="sm" :show="showOverlayCodeDatagrumes">
                  <b-table v-model="currentItemGrume" height="50px" :items="itemsgrumes"  :fields="fieldsgrumes" :busy="isBusy" class="mt-1" outlined   ref="selectableTablegrumeMere" select-mode="range" selectable @row-selected="onRowSelectedgrume" :tbody-tr-class="rowClass">
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
                    <input size="xs" @keydown.tab.prevent="checkCodebarrebillonnage($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
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
                  <template #cell(dpb)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dpb" />
                  </template>
                  <template #cell(dgb)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dgb" />
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
                </b-overlay>
              </div>
            
            </div>

            <!--BILLONS-->
            <div style="width:98%; max-height: 350px;">
              <div class="px-2 table-header-border mt-5">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des Billons</h4></b-col>
                    <b-col class="liens">
                      <a @click.prevent="addFieldBillons" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a @click.prevent="remouveAllBillons"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                    </b-col>
                </b-row>
              </div>
              <b-overlay rounded="sm" :show="showOverlayCodeDatabillons">
                <b-table height="50px" :items="itemsbillons"  :fields="fieldsBillons" :busy="isBusy" class="mt-1" outlined   ref="selectableTablebillons" select-mode="single" selectable @row-selected="onRowSelectedbillons" :tbody-tr-class="rowClass">
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
                <template v-slot:head(abandonne)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
                <template v-slot:head(position)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>

                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
                <template #cell(codebarre)="data">
                  <div class="d-flex justify-content-between">
                    <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:white!important; width:45%" v-model="data.item.cbmere" />
                    <input size="xs" @keydown.tab.prevent="checkCodebarrefille($event.target.value, data.index, 'codebarre')" class="mx-1 px-1 sigif-input-view text-left"  style="color:white!important; width:45%" v-model="data.item.codebarre" />
                  </div>
                </template>
                <template #cell(sequence)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                </template>
                <template #cell(numdf10)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
                </template>
                <template #cell(essence)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.essence" />
                </template>
                <template #cell(dpb)="data">
                  <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dpb" />
                </template>
                <template #cell(dgb)="data">
                  <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dgb" />
                </template>
                <template #cell(longueur)="data">
                  <input @keydown.tab.prevent="setVolume(data.index)" size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                </template>
                <template #cell(volume)="data">
                  <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important; background-color:rgb(0, 82, 44) !important;" v-model="data.item.volume" />
                </template>
                <template #cell(abandonne)="data">
                  <b-form-checkbox class="d-flex justify-content-center" v-model="data.item.abandonne" name="checkbox-1" value="1" unchecked-value="0" id="statut"></b-form-checkbox>
                </template>
                <template #cell(position)="data">
                  <select  v-model="data.item.position" class="m-0 p-0" style="background:#82C138!important;color:white!important; width:90%;font-size:0.8rem; border-radius:0.25rem; height: calc(1em + .350rem + 2px) !important;" >
                    <option v-for="(status, i) in optionsPosition" :value="status.value" :key="i">
                      {{ status.libelle }}
                    </option>
                  </select>
                </template>
                <template #cell(action)="data">
                  <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldBillons(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                </template>
                </b-table>
              </b-overlay>
            </div>
            <div>
          </div>
        </div>
      </div>
      <ChangeProductBox ref="changeProduct"></ChangeProductBox>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      <error-dialogue ref="errorbox"></error-dialogue>
      <api-unreachable ref="apiunreacahble"></api-unreachable>
      <file-component ref="filecomponent" @importsuccessfull="handleDataImported" :dto="dto"></file-component>
    </b-overlay>
  </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';
import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ApiUnreachable from '@/components/utils/ApiUnreachable.vue';
import { mapGetters } from 'vuex'
import Papa from 'papaparse';
import FileComponent from '@/components/utils/operation_de_parc/ImportBillonnageFIle.vue';


export default {
  name:"billonnage-form",
  components:{ ErrorDialogue,NoActionPossibleDialogue, ChangeProductBox, CodeBarreInfo, ApiUnreachable, FileComponent},

  computed: {
    ...mapGetters(['lignes']),
    filteredFieldsBillons(){
      if (!this.elementsgrumes[this.indexRowSelectedGrume]  || !this.elementsgrumes[this.indexRowSelectedGrume].codebarre) {
        return []
      }
      return this.elementsbillons.filter( field =>field.cbmere==this.elementsgrumes[this.indexRowSelectedGrume].codebarre)
    },  

    itemsgrumes(){
      return this.elementsgrumes.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsbillons(){
      return this.filteredFieldsBillons.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },

    filteredSites() {
        return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase()))
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

    filteredEssences() {
        return this.essences.filter((essence) =>
        essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
        )
      },
      paginatedEssences() {
        return this.filteredEssences.slice(this.offsetessences, this.limitessences + this.offsetessences)
      },
      hasNextPageEssences() {
        const nextOffset = this.offsetessences + this.limitessences
        return Boolean(
          this.filteredEssences.slice(nextOffset, this.limitessences + nextOffset).length
        )
      },
      hasPrevPageEssences() {   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filteredEssences.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },

   },
   watch: {
    "form.siteoper"(value) {
      if(!php.empty(value)){
          this.notSetSiteoper= false
      }
      else{
          this.notSetSiteoper= true
      }
    },
    "form.dateoper"(value) {
      if(!php.empty(value)){
          this.notSetDateoper= false
      }
      else{
          this.notSetDateoper= true
      }
    },
    elementsgrumes(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTablegrumeMere'].selectRow(0) }, 200);
      }
    }
  
    },
   data: () => ({
    dto:{},
    currentItemGrume:[],
    showOverlay:false,
    showOverlayCodeDatagrumes:false,
    showOverlayCodeDatabillons:false,
    optionsPosition:[{libelle: 'Bille de pied', value:"Bille de pied"},{libelle: 'Bille', value:"Bille"}, {libelle: 'Courson', value:"Courson"}],
    fieldsgrumes: [ 
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Référence code barre' },
      { key: 'numdf10', label: 'Ligne DF10' }, { key: 'nomcommercial', label: 'Nom commercial',thStyle:"width:20%" },
      { key: 'dpb', label: 'Diamètre petit bout' }, { key: 'dgb', label: 'Diamètre gros bout' },
      { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" }, { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
      { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elementsgrumes:[],
    elementsGrumesChecked:[],
    indexRowSelected:0,
    fieldsBillons: [
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre',thStyle:"width:14%" }, { key: 'sequence', label: 'Séquence',thStyle:"width:10%" },
      { key: 'essence', label: 'éssence',thStyle:"width:15%" },{ key: 'numdf10', label: 'Numbillon',thStyle:{width:'8%'}},
      { key: 'dpb', label: 'Diam. petit bout', thStyle:{width:'10%'} }, { key: 'dgb', label: 'Diam. gros bout', thStyle:{width:'10%'} },
      { key: 'longueur', label: 'longueur(m)',thStyle:{width:'8%'} }, { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
      { key: 'abandonne', label: 'Abandonné',thStyle:{width:'6%'}}, { key: 'position', label: 'Position',thStyle:"width:7%" },
      { key: 'action', label: '',thStyle:{ width:"5%"}}
    ],
    elementsbillons:[],
    elementsbillonsChecked:[],
    searchsite:'',
    offsetSites: 0,
    limitSites: 10,
    isRowselectedgrume:false,
    indexRowSelectedGrume:0,
    selectedgrume:null,
    isRowselectedbillon:false,
    selectedbillon:null,
    notSetUtb:false, //variable de controle remplissage champ utb
   
    submitted: false,
    searchessences: '',
    searchligne:'',


    showGrume: true, //propriété de controle affichage des champs pour le type de produit grumes

    form: {
      siteoper:'', //id du site de l'opération
      dateoper:'',
      heureoper: ''
    },
    sites:[],
    notSetSiteoper:false,
    notSetDateoper:false,
    notsetGrume:false,
    isActive:false,
    disable:true,
    dataresult:null, //objet permettant de rassembler les informations obtenues du code barre
    isBusy:false,


  
  }),
  methods: {
    addFieldGrume () {
        if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
   
        if(!php.empty(this.elementsgrumes)&&php.empty(this.elementsgrumes[this.indexRowSelected].codebarre)){
          this.notsetGrume= true;
          return this.showDialogueLigne('Bien vouloir renseigner le code barre');
        }
        this.elementsgrumes.unshift({codebarre: '', sequence: '', nomcommercial:'', numdf10: "", dpb: '', dgb: '', longueur: '', volume: '' },);
        //document.getElementById("codebarre").focus();
      },
      /* onSelect(items, index) {
        this.indexRowSelectedGrume = items.map(item => this.currentItemGrume.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemGrume.indexOf(item)).length;i++){
          this.indexRowSelectedGrume =items.map(item => this.currentItemGrume.indexOf(item))[i]
          console.log('i ',this.indexRowSelectedGrume);
        }
        
      },*/ 
      onRowSelectedgrume(items) {
        this.indexRowSelectedGrume = items.map(item => this.currentItemGrume.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemGrume.indexOf(item)).length;i++){
          this.indexRowSelectedGrume =items.map(item => this.currentItemGrume.indexOf(item))[i]
          console.log('i ',this.indexRowSelectedGrume);
        }

        items.isSelected =true;
        this.isRowselectedgrume=true
        if(!php.empty(items)){
          this.selectedgrume = items[0]
          console.log('selected ',this.selectedgrume);
        }
        
      },
      onRowSelectedbillons(items) {
        items.isSelected =true;
        this.isRowselectedbillon=true
            this.selectedbillon = items[0]
      },
      rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },
      async checkCodebarrebillonnage(value, index, commande) {
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
            this.checkCodebarre(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarre(value, index, commande);
        }
      },
      async checkCodebarre(value,index, commande){
          this.showOverlayCodeDatagrumes=true;
            if(commande='codebarre'){
           
                await this.$codesbarres.post("check/check_codebarreM_billon", {codebarre : value, idsite:this.form.siteoper })
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsgrumes[index].sequence=this.dataresult.sequence
                  this.elementsgrumes[index].numdf10=this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
                  this.elementsgrumes[index].nomcommercial=this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
                  this.elementsgrumes[index].idessence=this.dataresult.idessence !==null ? this.dataresult.idessence :"" ;
                  this.elementsgrumes[index].dpb=this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
                  this.elementsgrumes[index].dgb=this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
                  this.elementsgrumes[index].longueur=this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
                  this.elementsgrumes[index].volume=this.dataresult.volume !==null ? this.dataresult.volume :"" ;
                  this.elementsGrumesChecked.unshift(this.dataresult)
                  this.showOverlayCodeDatagrumes=false;

                } )
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeDatagrumes=false;
                  this.errorHappened(error.response.data);
                } )   
           }  
      },
      async checkCodebarrefille(value, index, commande){
        //controle du fait que le code barre n'est pas encore pris en compte
        if(this.elementsbillons.length>1){
          let stop=false
            this.elementsbillonsChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.checkCodebarrebillon(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarrebillon(value, index, commande);
        }
      },
      async checkCodebarrebillon(value,index, commande){
          this.showOverlayCodeDatabillons=true;
            if(commande='codebarre'){
           
                await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value})
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsbillons[index].sequence=this.dataresult.sequence
                  this.showOverlayCodeDatabillons=false;

                } )
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeDatabillons=false;
                  this.errorHappened(error.response.data);
                } )   
           }  
      },
      //methode de calcul du volume des billons
       //methode de calcul du volume
       setVolume(index){
        this.showOverlayCodeDatabillons=true;
        const coef = parseFloat(0.786215)

        const dpb = !isNaN(parseFloat(this.elementsbillons[index].dpb)) ? parseFloat(this.elementsbillons[index].dpb)  : 0
        const dgb = !isNaN(parseFloat(this.elementsbillons[index].dgb)) ? parseFloat(this.elementsbillons[index].dgb)  : 0
        const longueur = !isNaN(parseFloat(this.elementsbillons[index].longueur)) ? parseFloat(this.elementsbillons[index].longueur)  : 0
     
        this.elementsbillons[index].volume=(dpb*dgb*0.0001*longueur*coef).toFixed(3)
        this.showOverlayCodeDatabillons=false;
      },

      async getDataDetailsGrume(value, index, commande) {
      console.log('comming here from blur');

        //controle du fait que le code barre n'est pas encore pris en compte
      if(this.fieldsGrumes.length>1){
        this.fieldsGrumesChecked.forEach(field => {
          if(field.codebarre==value){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
      }) 

      }
     
            console.log('value',value, ' commande ',commande);
            this.showOverlayCodeData=true;
            if(commande='codebarre'){
              this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value})
              .then(response => response.data.result)
              .catch(error =>{
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
              } )
              //this.dataresult =  await this.$codesbarres.post("check/codebarre-colis-production", {codebarre : value, idsiteutb: this.form.utb }).then(response => response.data.result);
            }
            else if(commande='sequence'){
              this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {sequence : value })
              .then(response => response.data.result)
              .catch(error =>{
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
              } )
            }
              console.log('donnée obtenue ',this.dataresult);

              this.fieldsGrumes[index].codebarre = this.dataresult.codebarre;
              this.fieldsGrumes[index].sequence = this.dataresult.sequence;
              this.fieldsGrumes[index].numdf10 = this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
              this.fieldsGrumes[index].essence = this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
              this.fieldsGrumes[index].idessence = this.dataresult.idessence !==null ? this.dataresult.idessence :"" ;
              this.fieldsGrumes[index].dpb = this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
              this.fieldsGrumes[index].dgb = this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
              this.fieldsGrumes[index].longueur = this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
              this.fieldsGrumesChecked.push({codebarre:this.fieldsGrumes[index].codebarre, sequence :this.fieldsGrumes[index].sequence  })
            this.showOverlayCodeData=false;
      },
      handleSelected(index){
        this.indexRowSelected =index
        console.log('ligne sélectionnée ',index);
      },
      handleSelectedBillons(index){
        this.indexRowSelectedBillons =index
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
      RemouveFieldGrumes(index){
        this.elementsgrumes.splice(index, 1);
      },
      RemouveFieldBillons(index){
        this.elementsbillons.splice(index, 1);
      },
      removeAllFieldsGrumes(){
        this.fieldsGrumes = [{codebarre: '', sequence: '', essence:'', lignedf10: "", dpb: 0, dgb: 0, longueur: 0, volume: 0 }]
      },
      addFieldBillons () {
        if(php.empty(this.elementsGrumesChecked)){
          this.notsetGrume= true;
          return this.showDialogueLigne('Bien vouloir ajouter au moins 1 Grume');
        }
        /*else if(php.empty(this.elementsgrumes[this.indexRowSelected].codebarre)){
          this.notsetGrume= true;
          return this.showDialogueLigne('Bien vouloir renseigner le code barre');
        }*/
        this.notsetGrume= false;
        this.elementsbillons.unshift({cbmere: this.selectedgrume.codebarre, codebarre: '', sequence: '', idessence:this.selectedgrume.idessence, 
        essence: this.selectedgrume.nomcommercial,  
        numdf10: this.selectedgrume.numdf10+'/'+(this.elementsbillons.length+1), dpb: '', dgb: '', longueur: '', volume: '', abandonne: '', position: ''});
      },
      remouveAllBillons(){
        this.elementsbillons = []
      },

       //début méthodes liées à l'import
       async custoFile(){
        const ok = await this.$refs.filecomponent.show({
          title:'Billonnage',
          okButton: 'valider',
          cancelButton: 'Annuler'

          })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          let grumes=[]
          this.content.data.forEach(elt =>{
              let grume = {
                cbmere:elt.CB_MERE,
                codebarre:elt.CODE_BARRE,
                sequence:"",
                idessence:1800,
                numdf10:"1",
                dpb:elt.DIAMPB,
                dgb:elt.DIAMGB,
                longueur:elt.LONGUEUR,
                volume:2.4,
                abandonne:elt.ABANDONNE,
                position:elt.POSITION
              }
              grumes.push(grume)
            })
            let billonnageDto={siteoper: this.form.siteoper,dateoper: this.form.dateoper, grumes: grumes}
            if(php.empty(this.form.heure)){
              billonnageDto.heure=''
            }
            else{
              billonnageDto.heureoper=this.form.dateoper+'T'+this.form.heureoper+':00'
            }
            console.log('données finales ',billonnageDto);
          //this.$refs.filecomponent._close();

          //.uploadsection=true
        } else {
          this.$refs.filecomponent._close();
        }
      },
      showImportSection(){
      if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        let data={
          site: this.form.siteoper, date:this.form.dateoper
        }
        if(php.empty(this.form.heureoper)){data.heure=''}
        else{data.heureoper=this.form.date+'T'+this.form.heure+':00'}
        this.dto=data
        console.log('dto',this.dto);
      this.showUploadFile();
    },
      async showUploadFile(){
        const ok = await this.$refs.filecomponent.show({
          title:'Billonnage',
          okButton: 'valider',
          cancelButton: 'Annuler'

        })
      },
      handleDataImported(data){
        console.log('évènement écouté');
        for(let i=0;i<data.length; i++){
          this.elementsgrumes.push(data[i])
          for(let j=0;j<data[i].billons.length;j++){
            this.elementsbillons.push(data[i].billons[j])
          }
        }
        console.log('elements grumes',this.elementsgrumes );
        console.log('elements billons',this.elementsbillons );
        this.elementsgrumes.map(elt =>{ 
          elt.codebarre = elt.cbmere
          elt.nomcommercial = elt.essence
          return elt
        })
        /*this.elementsbillons.map(elt =>{ 
          elt.codebarre = elt.cbmere
          return elt
        })*/
        this.$refs.filecomponent._close();
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

      fermer() {
        this.$router.back()
      },
  
      controleChange() {
        console.log("Somethings change");
      },
      resetForm() {
        this.form = {
          utb: '', lignetransformation: '', typeProduit: "", dateproduction: "", numcontrat:"",
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
      async postData() {
        this.elementsbillons.map( elt =>{
          elt.abandonne = elt.abandonne=="1"?'1':'0'
        })
        this.form.grumes=this.elementsbillons
        if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if(php.empty(this.elementsbillons)){
            let error={ message:'Veuillez renseigner des billons'}
            return this.sendAlertMessage(error);
        }
        if(!php.empty(this.elementsbillons)){
        this.elementsbillons.forEach(elt => {
          if(php.empty(elt.cbmere)|| php.empty(elt.codebarre)||php.empty(elt.numdf10)|| php.empty(elt.dpb)||php.empty(elt.dgb)||php.empty(elt.longueur)||php.empty(elt.volume)){
            let error={ message:'Veuillez renseigner correctement les données des billons'}
            return this.sendAlertMessage(error);
          }
        }) 
      }
        let data={siteoper: this.form.siteoper ,dateoper: this.form.dateoper, grumes:this.form.grumes }
        if(php.empty(this.form.heureoper)){
            data.heureoper=''
        }
        else{
          data.heureoper=this.form.dateoper+'T'+this.form.heureoper+':00'
        }
        console.log('données envoyées ',data);
            this.submitted = true 
        this.$operationParc.post('billonages/GR', data).then(response => {
            this.submitted = false 
            this.resetForm()
            App.notifySuccess(response.data.message)
            return this.$router.push({ name: "billonnages" });
        }).catch(error => {
            console.log('entrée dans le catch');
            this.submitted = false
            this.errorHappened(error)
        })
      },
      async errorHappenedServeur() {
          const ok = await this.$refs.errorbox.show({
              title: 'Erreur survenue',
              message: "erreur interne interne du serveur",
              okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorbox._close();
          } else {
              this.$refs.errorbox._close();
              this.resetForm()
          }
      },
      async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "UTB",
              okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorDialogue._close();
              this.$router.back()
          } else {
              this.$refs.errorDialogue._close();
              this.$router.back()
          }
      },
      async showConfirmMessage(e){
      if (e.currentTarget.value == "Grumes") {
        this.form.typeproduit = "Débités";
      }
      else {
        this.form.typeproduit = "Grumes";
      }

      if( this.fields.length > 1 ){
          const ok = await this.$refs.changeProduct.show({
              title: 'Changement de produit',
              message: "Si oui tous les champs seront vidé",
              okButton: 'oui',
              cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.changeProduct._close();
                this.changeSelect();
            } else {
               this.$refs.changeProduct._close();
            }
      }
      else {
        this.form.typeProduit = e.currentTarget.value;
        this.showGrume = this.form.typeProduit == "Grumes" ? true : false;
      }
      
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
      this.searchessences = query
      this.offsetessences = 0
    },
    onSearchLigne(query){
      this.searchligne = query
      this.offsetlignes = 0
    },
    getDataDetailLot(value, index, commande) {
    
      setTimeout( async () => {
          //controle du fait que le code barre n'est pas encore pris en compte
        if(this.fieldsLot.length>1){
          this.fieldsLotsChecked.forEach(field => {
            if(field.codebarre==value){
              return this.showDialogueLigne('codebarre déjà utilisé');
            }
        }) 

        }
            try {
              console.log('value',value, ' commande ',commande);
              this.showOverlayCodeData=true;
              if(commande='codebarre'){
                console.log('value 1',value);
                this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value }).then(response => response.data.result);
              }
              else if(commande='sequence'){
                console.log('value 2',value);
                this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {sequence : value }).then(response => response.data.result);
              }
                console.log('donnée obtenue ',this.dataresult);
                this.fieldsLot[index].codebarre = this.dataresult.codebarre;
                this.fieldsLot[index].sequence = this.dataresult.sequence;
                this.fieldsLotsChecked.push({codebarre:this.fieldsLot[index].codebarre, sequence :this.fieldsLot[index].sequence  })
              this.showOverlayCodeData=false;
            } catch (error) {
                console.log('code ',error.response.data.code);
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
            }
      }, 50);
    },
    async errorHappened(error, index, fields){
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
    async showDialogueApiError(message){
      const ok = await this.$refs.apiunreacahble.show({
              title: 'Information',
              message: message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
                this.$router.back();
            } else {
              this.$refs.codebarreinfo._close();
              this.$router.back();
            }
    },
    
  
  },
  mounted() {
   this.getCreationData();
  },

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
input:focus {
	outline: none;
  border: 1px solid #FFFFFF;
}

.set_ligne{
  border: 2px solid red
}

.change_bg{
  background:#82C138
}
.styleToSet{
border: 2px solid red;
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
.set-obligation-indicator{
  color:red; font-size: 1.4em
}
.btn-is-disabled {
  pointer-events: none; /* Disables the button completely. Better than just cursor: default; */
  opacity: 0.7;
}
 

</style>