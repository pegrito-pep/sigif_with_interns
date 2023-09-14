<template>
    <div id="cover" class="min-vh-100">
       <b-overlay :show="show" rounded="sm">
          <template #overlay>
            <div class="text-center">
              <i class="fas fa-2x fa-sync fa-spin"></i>
              <p id="cancel-label">Chargement...</p>
            </div>
          </template>
          <div>
            <div class="d-flex m-0 p-0">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            </div>

            <b-collapse id="collapse-4" v-model="visible" class="m-0 p-0">
              <b-card class="b-card mt-0">
                  <b-row>
                    <b-col cols="3">
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="3" label="Type de produit" v-model="search.numtitre"/>
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="3" label="N° Permis" v-model="search.numpermis"/>

                      <!--<sigif-form-group :sizeLabel="4" :sizeLabelLg="3" label="Essence" v-model="search.essence"/>-->
                          <b-overlay rounded="sm" :show="shoverlayEssences">
                            <template #overlay>
                              <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                              </div>
                            </template>
                            <b-form-group
                              id="fieldset-horizontal"
                              label-cols-sm="4"
                              label-cols-lg="3"
                              content-cols-sm
                              content-cols-lg="9"
                              class="m-0 p-0" label="essence">
                              
                              <v-select @open="getEssences" :options="itemsEssences" v-model="search.essence" :reduce="essence => essence.idessence"  label="nomusuel" class="custom-select-type_titre">
                                <li slot="list-footer">
                                  <b-pagination  @mouseup.native.capture.stop  :total-rows="essences.length" :per-page="perPageEssences"></b-pagination>
                                </li>
                              </v-select>
                            </b-form-group>
                          </b-overlay>  
                    </b-col>
                    <b-col cols="4" class="ml-2">
                       <sigif-form-group :sizeLabel="6" :sizeLabelLg="4" label="N° AAC" class="w-50" v-model="search.numaac"/>
                       <sigif-form-group :sizeLabel="6" :sizeLabelLg="4" label="Exercice" class="w-50" v-model="search.exercice"/>
                       <div class="m-0">
                          <b-row class="m-0">
                            <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Du</label><date-picker  v-model="search.datedeb"  bformat="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                            <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Au</label><date-picker  v-model="search.datefin"  format="DD-MM-YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/></b-col>
                          </b-row>
                        </div>      
                    </b-col>
                    <b-col cols="2" class="ml-2">
                      <sigif-form-group :sizeLabel="6" :sizeLabelLg="6" label="N° UFA" v-model="search.numufa"/>
                      <sigif-form-group :sizeLabel="6" :sizeLabelLg="6" label="N° UFE/Secteur" v-model="search.numufe"/>
                      <sigif-form-group :sizeLabel="6" :sizeLabelLg="6" label="N° DF10" v-model="search.numdf10"/>
                    </b-col>
                    <b-col cols="2">
                      <b-row class="ml-3"> 
                        <search-bar-actions-buttons @search="filterTable" @reset="reset" :submitted="searchSubmitted"/>
                      </b-row>
                    </b-col>
                  </b-row>
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des lots de tiges abbatues</h4></b-col>
              <b-col class="">
                <b-button @click.prevent="createAbbattage" :disabled="!canCreateAbbattage" size="sm" :class="{'change-image-opacity': !canCreateAbbattage,  'not-change-image-opacity': canCreateAbbattage}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                <b-button :disabled="!canUpdateAbbattage" size="sm" :class="{'change-image-opacity': !canUpdateAbbattage,  'not-change-image-opacity': canUpdateAbbattage}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteAbbattage" size="sm" :class="{'change-image-opacity': !canDeleteAbbattage,  'not-change-image-opacity': canDeleteAbbattage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canViewDetailsAbbattage" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsAbbattage,  'not-change-image-opacity': canViewDetailsAbbattage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canSubmitAbbattage" size="sm" :class="{'change-image-opacity': !canSubmitAbbattage,  'not-change-image-opacity': canSubmitAbbattage}" class="mx-1 simple-btn">Soummettre</b-button>
                <b-button :disabled="!canExportTiges" @click.prevent="exportData" size="sm" :class="{'change-image-opacity': !canExportTiges,  'not-change-image-opacity': canExportTiges}" class="mx-1 simple-btn"><b-img src="@/assets/images/excel.png"></b-img>Exporter</b-button>
                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              empty-filtered-text="0 tige trouvé"
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template v-slot:emptyfiltered="{ emptyFilteredText  }">
                  <div class="text-center">        
                    <h4>{{ emptyFilteredText }}</h4>
                  </div>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #empty>
                      <h4 style="color:green" class="text-center">Aucune  <span class="font-weight-bold">tige</span> trouvée</h4>
                </template>
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
           <!--AJOUT D'UN LOT DE TIGES D'ABBATTAGE-->
          <b-modal id="abbattage-form" size="xl" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant" hide-footer header-class="custom-bg" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <abbattage-form />
              </div>
          </b-modal>
        </b-overlay>
    </div>

</template>

<script>

import storage from '../../../plugins/fluid-storage';
import exportFromJSON from "export-from-json";
import { mapGetters } from 'vuex'
  const php  = require ( 'phpjs' ) ;
import AbbattageForm from "@/components/forms/AbbattageForm.vue";
export default {
  name: "abbatages_titres",
  components: {
    AbbattageForm
  },
  data: () => ({
    title: "création d'un lot d'abbattage",
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    show: false,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{
      numpermis: "",
      numtitre: "",
      essence: "",
	    numaac: "",
	    exercice: "",
	    numufa: "",
	    numufe: "",
	    numdf10: "",
	    datedeb: "",
	    datefin: ""
    },
    searchSubmitted:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',

    //données du tableaux
  fields: [ 
	  { key: 'index', label: '',thStyle: { width: "2%"} },{ key: 'numlot', label: 'N° DF10' ,thStyle: { width: "6%"}}, { key: 'dateabbatage', label: 'Date abbattage'},
    { key: 'datesoumission', label: 'Soumis le'}, { key: 'statut', label: 'Statut',thStyle: { width: "9%" } },{key : 'numpermis', label :'N° Permis',thStyle: { width: "10%" }}, 
    { key: 'typetitre', label : 'Type de Titre',thStyle: { width: "8%" } }, { key: 'numtitre', label: 'N°Titre' ,thStyle: { width: "8%" }}, { key: 'numufa', label: 'N° UFA',thStyle: { width: "5%" } },
	  { key: 'numufe', label : 'N° UFE',thStyle: { width: "5%" } }, { key: 'numaac', label: 'N°AAC',thStyle: { width: "5%" } }, 

	  { key: 'volume', label: 'Volume total',thStyle: { width: "8%" } }, { key: 'nbGrumes', label: 'Nbrs de Grumes',thStyle: { width: "9%" } }, { key: 'numDernGrume', label: 'Dernier N° Grume',thStyle: { width: "9%" } }
	],

  elements: [],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */

    permis:[{"libelle" :"052021/CAAC/MINFOF","value":31},{"libelle" :"052021/CAAC/MINF","value":32},
          {"libelle" :"082020/DEAC/MINFOF","value":33},{"libelle" :"102019/CAAC/MINFOF/SETAT/SG/DF/SDAFF/SAG","value":34},],
    essences: [],
    perPageEssences: 7,
    currentPageEssences: 1,
    shoverlayEssences:false
  }),
  
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateAbbattage(){ return true; return this.hasAccess('CREER_ABATTAGE_TITRE') },
    canUpdateAbbattage(){ return this.hasAccess('MODIFIER_ABATTAGE_TITRE') },
    canDeleteAbbattage(){ return this.hasAccess('SUPPRIMER_ABATTAGE_TITRE') },
    canViewDetailsAbbattage(){ return true; return this.hasAccess('CONSULTER_ABATTAGE_TITRE') },
    canSubmitAbbattage(){ return this.hasAccess('SOUMETTRE_ABATTAGE_TITRE') },
    canExportTiges(){ return true;   return this.hasAccess('EXPORTE_ABATTAGE_TIGES')},
    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
    itemsEssences() {
      return php.array_slice(this.essences, this.offsetEssence, this.perPageEssences);
    },
    offsetEssence() {
      return this.currentPageEssences * this.perPageEssences - this.perPageEssences;
    },
  },
 
 methods: {
  showDetails(){ this.$router.push({name: 'details-abbattages_titres', params: { id: this.selected[0].idabatLot }}); },
  createAbbattage(){this.$router.push({name:'create-abbattages_titres'});},
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
  callEditOperationParc(){this.$bvModal.show('modal-lg')},
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
  changePage(page) {
    this.currentPage = page
    this.getAbbattages()
  },
  getAbbattages(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$abbattage.get("tiges", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
          elt.dateabbatage = elt.dateAbattage !==null ? this.$dayjs(elt.dateAbattage).format('DD/MM/YYYY') :""
          elt.datesoumission = elt.soumission !==null ? this.$dayjs(elt.soumission).format('DD/MM/YYYY') :""
          return elt
        })

		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable']?.selectRow(0) }, 200);
      })
      .catch((error) => {
        if(error.response.data.status==500){
          return App.alertError('Erreur interne du Serveur')
        }
        return App.alertError('Impossible de joindre le serveur')
      });

  },
  resetSearcheBar(){
     this.search = {
          numpermis: '', numtitre: '',
          essence: '', numaac: '', exercice: '', numufa: '', numufe: '',numdf10: '', datedeb: '', datefin: ''
     }
     localStorage.removeItem('sigif2./abbattage-abbattage_titres')
     //storage.remouve(this.$route.path)
  },
  filterTable(){
    console.log('response',this.search);
    this.isBusy=true
    this.$abbattage.post("tiges/search", this.search).then((response) => {
      console.log('response',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
          elt.dateabbatage = elt.dateAbattage !==null ? this.$dayjs(elt.dateAbattage).format('DD/MM/YYYY') :""
          elt.datesoumission = elt.soumission !==null ? this.$dayjs(elt.soumission).format('DD/MM/YYYY') :""
          return elt
        })
        storage.set(this.$route.path ,JSON.stringify(this.search))
        this.isBusy=false
      })
      .catch((error) => {
         this.isBusy=false
          console.log('c',error.response.data);
      });
  },
  reset(){
    this.resetSearcheBar()
    this.getAbbattages()
    console.log('re-initialisation');
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
  async exportData(){
      this.show=true
      const data=await this.$abbattage.get("tiges?size=400").then(response => response.data.result.items || [])
      console.log('data', data);
      const fileName = "tiges_abattage_data";
      const exportType = exportFromJSON.types.csv;
      if (data) exportFromJSON({ data, fileName, exportType });
       setTimeout(() => {this.show=false;}, 3000); 
  },
  async getEssences(){
    this.shoverlayEssences=true
    if(!this.$store.state.essences){
      this.essences=this.$store.state.essences
    }
    else{
      try {
          this.essences = await this.$donneesReference.get("essences?size=400").then(response => response.data.result.items);
          this.$store.dispatch('essences', this.essences)
      } catch (error) {
        console.log(error.message);
      }
    }
    this.shoverlayEssences=false
  },
  },
  

    mounted(){
      if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
        this.search=JSON.parse(storage.get(this.$route.path))
        this.filterTable();
      }else{
        this.getAbbattages();}
    }
  }

</script>
<style scoped>
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
  cursor:pointer;
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

</style>
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>