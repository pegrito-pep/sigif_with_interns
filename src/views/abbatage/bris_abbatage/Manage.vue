<template>
    <div id="cover" class="min-vh-100">
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
              <b-card class="b-card">
                <b-row>
                  <b-col cols="2">
                    <div class="m-0">
                      <b-row class="m-0 d-flex flex-column">
                        <b-col class="d-flex"
                          ><label for="" style="padding-right: 0.5rem">Du</label
                          ><date-picker
                            v-model="search.datedeb"
                            format="dddd, DD MMMM YYYY"
                            placeholder="date de début"
                            valueType="YYYY-MM-DD"
                            class="w-100"
                            :clearable="false"
                        /></b-col>
                        <b-col class="d-flex mt-2"
                          ><label for="" style="padding-right: 0.5rem">Au</label
                          ><date-picker
                            v-model="search.datefin"
                            format="dddd, DD MMMM YYYY"
                            placeholder="date de fin"
                            valueType="YYYY-MM-DD"
                            class="w-100"
                            :clearable="false"
                        /></b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col cols="3">
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° DF10" v-model="search.numfd10"/>
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° du permis"  v-model="search.numpermis"/>
                  </b-col>
                  <b-col cols="2">
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° UFA" v-model="search.numufa"/>
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° UFE"  v-model="search.numufe"/>
                  </b-col>
                  <b-col cols="2">
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° Titre" v-model="search.numtitre"/>
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° AAC" v-model="search.numaac"/>
                  </b-col>
                </b-row>
                <b-row class="ml-3"> 
                  <b-col cols="2" offset-md="9">
                    <search-bar-actions-buttons @search="filterTable" @reset="reset" />
                  </b-col>
                </b-row>
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des lots de bris d'abbattage</h4></b-col>
              <b-col class="col-md-auto">
                <b-button @click.prevent="createAbbattage" :disabled="!canCreateBrisAbbattage" size="sm" :class="{'change-image-opacity': !canCreateBrisAbbattage,  'not-change-image-opacity': canCreateBrisAbbattage}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                <b-button :disabled="!canUpdateBrisAbbattage" size="sm" :class="{'change-image-opacity': !canUpdateBrisAbbattage,  'not-change-image-opacity': canUpdateBrisAbbattage}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteBrisAbbattage" size="sm" :class="{'change-image-opacity': !canDeleteBrisAbbattage,  'not-change-image-opacity': canDeleteBrisAbbattage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canViewDetailsBrisAbbattage" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsBrisAbbattage,  'not-change-image-opacity': canViewDetailsBrisAbbattage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canSubmitBrisAbbattage" size="sm" :class="{'change-image-opacity': !canSubmitBrisAbbattage,  'not-change-image-opacity': canSubmitBrisAbbattage}" class="mx-1 simple-btn">Soummettre</b-button>
                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table :busy="isBusy"  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(typetitre)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.typetitre }}</b> </span>
                </template>
                <template #cell(volume)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.volume }}</b> </span>
                </template>
                <template #cell(nbGrumes)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.nbGrumes }}</b> </span>
                </template>
                <template #cell(numDernGrume)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.numDernGrume }}</b> </span>
                </template>
              </b-table>
          
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  import { mapGetters } from 'vuex'
export default {
  name: "bris_abbatages",
  components: {
 
  },
  data: () => ({
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    options:[
      { value: null, text: 'Please select an option' },
      { value: 'brouillon', text: 'brouillon' },
      { value: 'soumise', text: 'soumise' },
      { value: 'validée', text: 'validée' },
      { value: 'soumission en cours', text: 'soumission en cours' },
    ],
  
    //données du tableaux
    fields: [ 
      { key: 'index', label: '',thStyle: { width: "2%" } },
      { key: 'numlot', label: 'N° DF10' ,thStyle: { width: "6%" }}, 
      { key: 'dateAbattage', label: 'Date abbattage' ,thStyle: { width: "11%" }},
      { key: 'soumis', label: 'Soumis le' ,thStyle: { width: "8%" }}, 
      { key: 'statut', label: 'Statut',thStyle: { width: "6%" } },
      {key : 'numpermis', label :'N° Permis',thStyle: { width: "9%" }}, 
      { key: 'typetitre', label : 'Type de Titre',thStyle: { width: "8%" } },
      { key: 'numtitre', label: 'N°Titre' ,thStyle: { width: "6%" }}, 
      { key: 'numufa', label: 'N° UFA',thStyle: { width: "5%" } },
      { key: 'numufe', label : 'N° UFE',thStyle: { width: "5%" } },
      { key: 'numaac', label: 'N°AAC',thStyle: { width: "5%" } }, 
      { key: 'volume', label: 'Volume total',thStyle: { width: "8%" } },
      { key: 'nbGrumes', label: 'Nbrs de Grumes',thStyle: { width: "9%" } },
       { key: 'numDernGrume', label: 'Dernier N° Grume' }
    ],

    elements: [],
    selected:{},

    // Données pour la recherche

    search : {
      datedeb: '',
      datefin: '',
      numtitre:'',
      numpermis:'',
      numafa:'',
      numufe:'',
      numaac:'',
    },

  }),
  computed:{
    /*propriétés liées aux accèes*/
     ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateBrisAbbattage(){ return this.hasAccess('CREER_ABATTAGE_ARB') },
    canUpdateBrisAbbattage(){ return this.hasAccess('MODIFIER_ABATTAGE_ARB') },
    canDeleteBrisAbbattage(){ return this.hasAccess('SUPPRIMER_ABATTAGE_ARB') },
    canViewDetailsBrisAbbattage(){return true; return this.hasAccess('CONSULTER_ABATTAGE_ARB') },
    canSubmitBrisAbbattage(){ return this.hasAccess('SOUMETTRE_ABATTAGE_ARB') },

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
  },
 
 methods: {
    showDetails(){ this.$router.push({name: 'bris_abbattages_detail', params: { id: this.selected[0].idabatLot }}); },
    createAbbattage(){this.$router.push({ name: "create-bris_abbattage" });},
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
  changePage(page) {
    this.currentPage = page
    this.getBrisAbbattage()
  },
  getBrisAbbattage(){

     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$abbattage.get("brisAbattage", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
          elt.dateAbattage = elt.dateAbattage !==null ? this.$dayjs(elt.dateAbattage).format('DD/MM/YYYY') :""
          elt.soumis = elt.soumis !==null ? this.$dayjs(elt.soumis).format('DD/MM/YYYY') :""
          elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
          return elt
        })

		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
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
    this.getBrisAbbattage()
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
  },
  

  mounted(){
    this.getBrisAbbattage();
  }
  }

</script>
<style scoped>

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


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  width: 180px;
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

</style>