<template>
    <div id="cover" class="min-vh-100">
          <div>
            <div class="d-flex" style="align-items:center">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                <ul>
                  <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li>
                </ul>
              </b-button>
              <h5 style="font-weight:bold">Rechercher</h5>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
               <b-card class="b-card">
                <b-row>
                  <b-col cols="3">
                   <b-form-group class="m-0 p-0"
                    label-align="right"
                    label-cols-sm="5"
                   >
                    <template #label>
                      <div class="label-form">
                        <span>Type de produit</span>
                      </div>
                    </template>
                    <select style="height: calc(1em + .300rem + 1px) !important;width:70%" size="sm">
                          <option value=""></option>
                          <option value="g">Grumes</option>
                          <option value="d">Débités</option>
                          <option value="ps">Produit spécial</option>
                        </select>
                   </b-form-group>
                   <b-form-group class="m-0 p-0"
                    label-align="right"
                    label-cols-sm="5"
                   >
                      <template #label>
                        <div class="label-form">
                          <span>Nom destinataire</span>
                        </div>
                      </template>
                    <b-form-input style="height: calc(1em + .300rem + 1px) !important" class="form-control p-1"></b-form-input>
                   </b-form-group>
                  </b-col>
                  <b-col cols="4">
                   <b-form-group class="m-0 p-0"
                    label-align="right"
                    label-cols="6"
                   >
                      <template #label>
                        <div class="label-form">
                          <span>Port débarq.</span>
                        </div>
                      </template>
                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:80%" class="form-control p-1"></b-input>
                   </b-form-group>
                   <b-form-group class="m-0 p-0"
                    label-align="right"
                    label-cols-sm="4"
                   >
                      <template #label>
                        <div class="label-form">
                          <span>Pays destination</span>
                        </div>
                      </template>
                      <v-select class="custom-select-type_titre" :options="paginatedPays" :filterable="false" @search="onSearchPays" @open="getPays"
                          label="nom" v-model="pays" style="width:100%"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPagePays" @click="offsetPays-=limitPays">Prev</button>
                            <button :disabled="!hasNextPagePays" @click="offsetPays+=limitPays">Next</button>
                          </li>
                        </v-select>
                   </b-form-group>
                  </b-col>
                  <b-col cols="5">
                   <b-form-group class="m-0 p-0"
                    label-align="right"
                    label-cols-sm="4"
                   >
                      <template #label>
                        <div class="label-form">
                          <span>Entité forestière</span>
                        </div>
                      </template>
                      <v-select :options="paginated" :filterable="false" @search="onSearch"
                          style="width:100%"
                          class="custom-select-type_titre" @open="getEntities" label="intitule" v-model="entite"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetEntities-=limit">Prev</button>
                            <button :disabled="!hasNextPage" @click="offsetEntities+=limit">Next</button>
                          </li>
                        </v-select>
                   </b-form-group>
                  </b-col>
                </b-row>
             

                
                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
                    
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                    </b-col>
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <!-- <b-img src="@/assets/images/picto_user_vert.png"></b-img>  -->
                  Liste des demandes de BSE</h4>
                </b-col>
              <b-col class="col-md-auto">
                <a :disabled="canCreateDemandeBSE" @click.prevent="createDemandeBSE" size="sm" :class="{'change-image-opacity': !canCreateDemandeBSE,  'not-change-image-opacity': canCreateDemandeBSE}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a @click.prevent="canUpdateDemandesBSE" :disabled="canUpdateDemandesBSE" size="sm" :class="{'change-image-opacity': !canUpdateDemandesBSE,  'not-change-image-opacity': canUpdateDemandesBSE}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateDemandesBSE}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteDemandesBSE" size="sm" :class="{'change-image-opacity': !canDeleteDemandesBSE,  'not-change-image-opacity': canDeleteDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteDemandesBSE}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a @click.prevent="showDetailsDemandesBSE" :disabled="canViewDetailsDemandesBSE" size="sm" :class="{'change-image-opacity': !canViewDetailsDemandesBSE,  'not-change-image-opacity': canViewDetailsDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsDemandesBSE}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveDemandesBSE" size="sm" :class="{'change-image-opacity': !canSaveDemandesBSE,  'not-change-image-opacity': canSaveDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveDemandesBSE}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitDemandesBSE" size="sm" :class="{'change-image-opacity': !canSubmitDemandesBSE,  'not-change-image-opacity': canSubmitDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitDemandesBSE}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintDemandesBSE" size="sm" :class="{'change-image-opacity': !canPrintDemandesBSE,  'not-change-image-opacity': canPrintDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintDemandesBSE}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>
                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass">
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(nro)="data">
                  <span>{{ ++data.index }}</span>
                </template>
                <template #head(statut)="data">
                  <div style="text-align: center;">
                    <span>{{ data.field.label }}</span>
                  </div>
                </template>
                 <!-- <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template> -->
                 <template #cell(statut)>
                    <div style="text-align: center;">
                      <span   style="color: green; font-weight:bold;"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                    </div>
                  </template>
                 <template #cell(entite)="data">
                  <div style="text-align:center">
                    <span>{{ data.item.entite.substring(0,9) +'...' }}</span>
                  </div>
                  </template>
                <!-- <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template> -->
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
  name: "demande_bse",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({

    //   checkbox 
    status: true,
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
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
        // { key: 'index', label: '' },
        { key: 'nro', label: 'Numéro',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
        { key: 'entite', label: 'Entité forestière',thStyle:{color:'green',width:'11%',fontSize:'.7rem'} },
        { key: 'sigle', label: 'Sigle',thStyle:{color:'green',width:'5%',fontSize:'.7rem'} },
        { key: 'addresseexporteur', label: 'Adresse exportateur',thStyle:{color:'green',width:'9%',fontSize:'.7rem'} },
        { key: 'typeproduit', label: 'Type de produit',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'portdebarquement', label: 'Port de débarquement',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'sitedembarquement', label: 'Site d\'embarquement',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'emaildouane', label: 'Email autorités douanières',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'paysdestination', label: 'Pays de destination',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'datedepart', label: 'Date départ',thStyle:{color:'green',fontSize:'.7rem'} },
        { key: 'statut', label: 'Statut',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
        { key: 'position', label: 'Position',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
    ],
    elements:[],
    json:{
      data:{
        listing:[]
      }
    },
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
    op_date:'2019-01-01 14:30',
    op:{
      site_concernee:'',
      date_operation:'',
      heure_operation:'',
      statut:null
    }
    ,

    // entités forestières
    entite:'',
    search:'',
    offsetEntities:0,
    limit:10,
    entitiesWithoutMinfof:[],
    showOverlay:false,

     // pays
     pays:'',
    searchPays:'',
    offsetPays:0,
    limitPays:5,
    paysAll:[],
    showOverlayPays:false,
  }),
  computed:{
    /*propriétés liées aux accèes*/
    canCreateDemandeBSE(){return true},
    canUpdateDemandesBSE(){return true},
    canDeleteDemandesBSE(){return false},
    canViewDetailsDemandesBSE(){return true},
    canSaveDemandesBSE(){return false},
    canSubmitDemandesBSE(){return true;},
    canPrintDemandesBSE(){ return false;},

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
      return this.entitiesWithoutMinfof?.filter((entity) =>
      entity.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated(){
      return this.filtered?.slice(this.offsetEntities, this.limit + this.offsetEntities)
    },
    hasNextPage() {
      const nextOffset = this.offsetEntities + this.limit
      return Boolean(
        this.filtered?.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offsetEntities - this.limit
      return Boolean(
        this.filtered?.slice(prevOffset, this.limit + prevOffset).length
      )
    },

     // pays
     filteredPays() {
      return this.paysAll.filter((pays) =>
      pays.nom.toLocaleLowerCase().includes(this.searchPays.toLocaleLowerCase())
      )
    },
    paginatedPays(){
      return this.filteredPays.slice(this.offsetPays, this.limitPays + this.offsetPays)
    },
    hasNextPagePays() {
      const nextOffset = this.offsetPays + this.limitPays
      return Boolean(
        this.filteredPays?.slice(nextOffset, this.limitPays + nextOffset).length
      )
    },
    hasPrevPagePays() {
      const prevOffset = this.offsetPays - this.limitPays
      return Boolean(
        this.filteredPays?.slice(prevOffset, this.limitPays + prevOffset).length
      )
    }
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
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
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
    this.getArrondissements()
  },
getArrondissements(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    this.$donneesReference.get("arrondissements", {params}).then(response => {
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
  async getListeDemandesBSE(){
    // this.json.data.listing=this.elements;
    this.isBusy=true
    await this.$exportations.get('bses')
      .then(response=>{
        this.elements=response.data.result.Items
        this.elements.map(elt=>{
          elt.datedepart=elt.datedepart !==null ? this.$dayjs(elt.datedepart).format('DD/MM/YYYY'):''
          return elt
        })
        this.isBusy=false
        setTimeout(()=>this.$refs.selectableTable.selectRow(0))
      })
      .catch(err=>console.log(err))
  },
  showDetailsDemandesBSE(){
    this.$router.push({name: 'demande_bse-detail'})
  },
  createDemandeBSE(){
    this.$router.push({name: 'create-demande_bse'})
  },
  onSearch(query){
    this.search = query
    this.offsetEntities = 0
  },
  async getEntities(){
    this.showOverlay=true
    if(!php.empty(this.$store.state.entiteswithoutminfof)){
      this.entitiesWithoutMinfof=this.$store.state.entiteswithoutminfof
      console.log('entrée dans le store')
      this.showOverlay=false
    }else{
      await this.$donneesReference.get('entites/entite_forestier')
        .then(response=>{
          this.entitiesWithoutMINFOF=response.data.result.items
          console.log('requête vers api')
          this.$store.dispatch('entiteswithoutminfof',this.entitiesWithoutMINFOF)
          this.showOverlay=false
        })
        .catch(err=>{
          App.notifySuccess(err.message)
        })
    }
    this.showOverlay=false
  },
  onSearchPays(query){
    this.searchPays = query
    this.offsetPays = 0
  },

  async getPays(){
    this.showOverlayPays=true
    if(!php.empty(this.$store.state.pays)){
      console.log('entrée dans le store')
      this.paysAll=this.$store.state.pays
      this.showOverlayPays=false
    }else{
      // await this.$donneesReference.get('pays',{})
      console.log('requête vers API')
      await this.$donneesReference.get('pays')
        .then(response=>{
          this.paysAll=response.data.result.items
          console.log(this.paysAll)
          this.$store.dispatch('pays',this.paysAll)
        })
        .catch(err=>console.log(err))
      this.showOverlayPays=false
    }
  },

 },
  mounted(){
    // this.getArrondissements();
    this.getListeDemandesBSE()
    // this.$refs.selectableTable.selectRow(0)
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
}
.label-form{
  margin-top:-8px;
}
.custom-select-type_titre{
        --vs-dropdown-option--active-bg: #82C138;
        --vs-dropdown-option--active-color: #fff;
            --vs-selected-color: #1f1c1c;
                /* Font */
            --vs-font-size: 0.65rem;
            --vs-line-height: 1.2;
            width:250%;
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