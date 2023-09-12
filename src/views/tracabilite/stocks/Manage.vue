<template>
    <div id="cover" class="min-vh-100">
          <div>
            <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col  cols="6">
                    <b-overlay rounded="sm" :show="showOverlaySite">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="5"
                        label-cols-lg="4"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Site"
                        label-for="input-horizontal"
                      >
                        <v-select @open="getSites" :options="paginated" v-model="search.site" :filterable="false"  @search="onSearch" label="INTITULE" class="custom-select-type_titre">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPage" @click="offsetSites -= limitSites">Prèc.</button>
                              <button :disabled="!hasNextPage" @click="offsetSites += limitSites">Suiv.</button>
                          </li>
                        </v-select>
                      </b-form-group>
                    </b-overlay>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay rounded="sm" :show="showOverlayEntites">
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
                            content-cols-lg="7"
                            label="Entité Forrestière"
                            label-for="input-horizontal"
                          >
                          <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  :reduce="entite => entite.idorganisation" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                              <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                          </v-select>
                          <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                          </select>                                                                                   
                      </b-form-group>
                    </b-overlay>
                  </b-col>
                  
                  <!-- <b-col class="b-col" cols="3">
                   
                    <b-row class="content" align-v="start">
                        <b-col align-self="center"><label for="" >Site concerné</label></b-col>
                        <b-col><input  type="text" class="search-bar-custum-input form-control"/></b-col>
                      </b-row>
                  </b-col> -->
                  
                </b-row>
                  <div style="float:right; width: 320px !important" class="mt-2">
                  <search-bar-actions-buttons />
                </div>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">Liste des sites</h4></b-col>
              <b-col class="col-md-auto">
                <!-- <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a> -->
                <span >
                  <!-- <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a> -->
                <a @click.prevent="showDetails" :disabled="canViewDetails" size="sm" :class="{'change-image-opacity': !canViewDetails,  'not-change-image-opacity': canViewDetails}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetails}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <!-- <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a> -->
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import UserForm from '@/components/Administration/UserForm.vue';
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "stocks",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({

    //   checkbox 
    status: true,
    showOverlayEntites:false,
    entite:{
      idorganisation:'',
      libelle:''
    },
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    search: {
      site: "",
      datedeb: "",
      datefin: "",
      entite: "",
      statut: ""
    },
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    sites:[],
    searchSite:"",
    searchSite:"",
    searchentite:'',
    showOverlaySite:false,
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    allEntitesForrestieres:[
      { 
        id:1,
        libelle:'Afrique'
      },
      { 
        id:2,
        libelle:'Europe'
      },
      { 
        id:3,
        libelle:'Asie'
      }
    ],

    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'idsite', label: 'Identifiant du site' },
        { key: 'typesite', label: 'Type de site' },
        { key: 'intitulesite', label: 'Intitulé site' },
        { key: 'entite', label: 'Entité forestière' },
        { key: 'arrondissement', label: 'Arrondissement' },
      
     

    ],
    elements: [
        {idsite: "3670",typesite : "parc foret", intitulesite:"PF1_2002", entite:"BOIS LEGAL CAMEROUN", arrondissement:"ABONG-MBANG",  },
        {idsite: "3270",typesite : "parc usine", intitulesite:"PU_TEST_PAUL", entite:"BOIS LEGAL CAMEROUN", arrondissement:"BIBEY",  },
        {idsite: "3251",typesite : "parc usine", intitulesite:"PU BLCAM REG", entite:"BOIS LEGAL CAMEROUN", arrondissement:"YAOUNDE 1",  },
        {idsite: "2848",typesite : "parc usine", intitulesite:"PU MFOU", entite:"BOIS LEGAL CAMEROUN", arrondissement:"MFOU",  },
        {idsite: "2443",typesite : "parc foret", intitulesite:"PF2002TEST", entite:"BOIS LEGAL CAMEROUN", arrondissement:"ABONG-MBANG",  },
        {idsite: "2333",typesite : "parc foret", intitulesite:"PF20012", entite:"BOIS LEGAL CAMEROUN", arrondissement:"ABONG-MBANG",  },
        {idsite: "2338",typesite : "parc foret", intitulesite:"PF2001_2", entite:"BOIS LEGAL CAMEROUN", arrondissement:"ABONG-MBANG",  },
        {idsite: "2007",typesite : "parc foret", intitulesite:"PF VC 161221", entite:"BOIS LEGAL CAMEROUN", arrondissement:"LOMIE",  },
        {idsite: "1769",typesite : "parc foret", intitulesite:"PF 2002_2", entite:"BOIS LEGAL CAMEROUN", arrondissement:"ABONG-MBANG",  },
        {idsite: "1286",typesite : "parc usine", intitulesite:"PARC SEEF BASSA BELCAM", entite:"BOIS LEGAL CAMEROUN", arrondissement:"MINTA",  },
    ],

    selected:{},
    
    /*propriétes lies au traitement d'une operation de parc */
    allSitesOperations: [
            {
            title: ' Grande forèt amazioniènne',
            icon: 'fa fa-database',
            id: 1
            },
            {
            title: '  Foret de Sambissa',
            icon: 'fa fa-book',
            id: 2
            },
            {
            title: '  Foret Tropicale',
            icon: 'fas fa-dollar-sign',
            id:3
            },
            {
            title: '  Foret de Manguissa',
            icon: 'fa fa-pencil',
            id:4
            }
    ],
    op_status:[
       { value: null, text: 'Please select an option' },
       { value: 'a', text: 'This is First option' },
       { value: 'b', text: 'Selected Option' },
       { value: { C: '3PO' }, text: 'This is an option with object value' },
       { value: 'd', text: 'This one is disabled', disabled: true }
    ],
    canViewDetails:false,
    offsetSites: 0,
    limitSites: 10,
    op_date:'2019-01-01 14:30',
    op:{
      site_concernee:'',
      date_operation:'',
      heure_operation:'',
      statut:null
    }
  }),
  computed:{
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
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
     ...mapGetters(['user']),

     filtered() {
      return this.sites.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetSites, this.limitSites + this.offsetSites)
    },
    hasNextPage() {
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filtered.slice(nextOffset, this.limitSites + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filtered.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },
  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  showDetails(){
    this.$router.push({name: 'stocks-details',params:{ id: 577 }})
  },
  onSearch(query) {
      this.searchSite = query
      this.offsetSite = 0
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
  async getSites(){
      this.showOverlaySite=true
      if(!php.empty(this.$store.state.sites)){
        this.sites=this.$store.state.sites
      }
      else{
        try {
          this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
          this.$store.dispatch('sites', this.sites)
        } catch (error) {
            console.log(error.message)
        }
      }
      
      this.showOverlaySite=false
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
    },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.canViewDetails=true
    this.isRowselected=true
        this.selected = items
  },
  addUser(){this.$bvModal.show('user-form')},
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
    this.getstocks()
  },
getstocks(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    this.$donneesReference.get("stocks", {params}).then(response => {
          console.log("=================== Données de reference / arrondissements ==================");
          console.log(response.data.result.items[0]);
          console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
          elt.intitulearr = elt.intitule,
          elt.intitulereg = elt.departement.region.intitule,
          elt.codedepartement= elt.departement.codedepartment,
          elt.intituledepart = elt.departement.intitule,
          elt.cheflieu = elt.departement.region.cheflieu,
          elt.phasearr = elt.phase.libelle

          return elt
        })
	     this.isBusy=false
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });

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
    if(JSON.parse(storage.get(this.$route.path))){
      this.search=JSON.parse(storage.get(this.$route.path))
    }
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  }
  }

</script>
<style scoped>
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
  cursor:pointer;
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>