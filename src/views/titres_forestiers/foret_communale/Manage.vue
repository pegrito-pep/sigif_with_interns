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
                  <b-col cols="1">
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="3" label="Titre no" v-model="search.titreNo"/>
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="3" label="UFA no" v-model="search.ufaNo"/>
                  </b-col>
                  
                  <b-col cols="3">
                    
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="3" label="Région" v-model="search.region"/>
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="3" label="Département" v-model="search.departement"/>
                    
                  </b-col>
                  
                  <b-col cols="3">
                    
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="4" label="Arrondissement" v-model="search.arrondissement"/>
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="2" label="Sigle" v-model="search.sigle"/>                    
                  </b-col>
                  <b-col cols="2">                    
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 pr-2">statut</label><br>
                         <select  v-model="search.statut" class="m-0 p-0" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                  </b-col>
                 <b-col class="ml-1 position-relative">
                    <div>
                      <label for="" class="m-0 p-0">entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </div>
                    <div class="w-100" style="position: absolute; bottom: 0; right:0">
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>
                  </b-col>
                    
                </b-row>
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                 Listing des titres</h4>
                 <!-- <b-button @click.prevent="showDetailsUFA"  size="sm" :class="{'change-image-opacity': !canViewDetailsUFA,  'not-change-image-opacity': canViewDetailsUFA}" class="mx-1 simple-btn"><b-img src="@/assets/images/Parcs_Rupture_16x16.png"></b-img>UFA</b-button> -->
                <b-button @click.prevent="showDetailsUFE"  size="sm" :class="{'change-image-opacity': !canViewDetailsUFE,  'not-change-image-opacity': canViewDetailsUFE}" class="mx-1 simple-btn"><b-img src="@/assets/images/Parcs_Rupture_16x16.png"></b-img>UFE</b-button>
                <b-button @click.prevent="showDetailsAAC"   size="sm" :class="{'change-image-opacity': !canViewDetailsAAC,  'not-change-image-opacity': canViewDetailsAAC}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconABATTAGE_16x16.png"></b-img>AAC</b-button>
                <b-button  size="sm" class="mx-1 simple-btn"><b-img  src="@/assets/images/Picto_tracabilite/iconINVENTAIRE_16x16.png"></b-img> Contrat de partenariat</b-button>
                </b-col>
              <b-col class="col-md-auto">
                <span class="d-flex">
                <b-button :disabled="!canCreateForetCommunale" @click.prevent="goToCreateTitreCC" size="sm" :class="{'change-image-opacity': !canCreateForetCommunale,  'not-change-image-opacity': canCreateForetCommunale}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Creer</b-button>
                <b-button :disabled="!canUpdateForetCommunale" size="sm" :class="{'change-image-opacity': !canUpdateForetCommunale,  'not-change-image-opacity': canUpdateForetCommunale}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Modifier</b-button>
                <b-button :disabled="!canDeleteForetCommunale" size="sm" :class="{'change-image-opacity': !canDeleteForetCommunale,  'not-change-image-opacity': canDeleteForetCommunale}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Supprimer</b-button>
                <b-button :disabled="!canViewDetailsForetCommunale" @click.prevent="showDetailsForetCommunale" size="sm" :class="{'change-image-opacity': !canViewDetailsForetCommunale,  'not-change-image-opacity': canViewDetailsForetCommunale}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsForetCommunale}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <a  size="sm"  class="not-change-image-opacity mx-1 simple-btn d-flex">
                  <span class="mr-1">consulter une action</span>
                  <span><ul class="m-0" style="padding-left:0.9em"><li class="collapse-open m-0 p-0"></li></ul></span>
                </a>

                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:80%">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                       <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">Titre</span> trouvé!!</h4>
                </template>
                 <!-- <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template> -->
                 <template #cell(statut)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table>

              <!-- AJOUT DE LA PAGINATION -->

              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  import { mapGetters } from 'vuex'
export default {
  name: "foret_communale",
  components:{

  },
  data: () => ({
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

    //partie recherche de l'entête 
    search:{
      numtitre: "",
	    numufa: "",
	    region: "",
	    departement: "",
	    arrondissement: "",
	    entite: "",
	    sigle: "",
	    statut: ""
     },
    entite:{
      id:1,
      libelle:''
    },
    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'typetitre', label: 'Type du titre' },
        { key: 'numtitre', label: 'Titre no' },
        { key: 'entite', label: 'Entité Forestiere' },
        { key: 'marteau', label: 'Marteau/sigleEtat' },
        { key: 'statut', label: 'Statut' }
    ],
    elements: [],
    json:{
      titres:
      [
        {typetitre: "Concession en convention provisoire" , numtitre:2004,entite:"OPELA", marteau:"BLC",statut:''},
        {typetitre: "Concession en convention provisoire" , numtitre:2002,entite:"OPELA", marteau:"BLC",statut:''},
        {typetitre: "Concession en convention provisoire" , numtitre:2001,entite:"OPELA", marteau:"BLC",statut:''},
        {typetitre: "Concession en convention provisoire" , numtitre:2000,entite:"OPELA", marteau:"BLC",statut:''},
        {typetitre: "Concession en convention provisoire" , numtitre:2000,entite:"OPELA", marteau:"BLC",statut:''},
      ]
    },
    selected:{},
    

  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateForetCommunale(){ return true; return this.hasAccess('CREER_FORET_COMMUNALE')},
    canUpdateForetCommunale(){return this.hasAccess('MODIFIER_FORET_COMMUNALE') },
    canDeleteForetCommunale(){ return this.hasAccess('SUPPRIMER_FORET_COMMUNALE')},
    canViewDetailsForetCommunale(){ return true},
    canViewDetailsUFA(){ 
      // return this.hasAccess('CONSULTER_UFA')
      return true
    },
    canViewDetailsUFE(){ 
      // return this.hasAccess('CONSULTER_UFA')
      return true
    },
    canViewDetailsAAC(){ 
      // return this.hasAccess('CONSULTER_AAC')
      return true
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
     ...mapGetters(['user'])
  },
 
 methods: {
  goToCreateTitreCC(){this.$router.push({ name: "create-titre-cc" });},
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  showDetailsUFE(){
    this.$router.push({name:'foret_communale_UFE', params: { id: this.selected[0].idtitre }})
  },
  showDetailsAAC(){
    this.$router.push({name:'foret_communale_AAC', params: { id: this.selected[0].idtitre }})
  },
  showDetailsForetCommunale(){
    this.$router.push({name: 'foret_communale_detail'})
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
    this.getTitres()
  },
  getTitres(){
    this.isBusy=true
     const params = this.getRequestParams(
       this.currentPage,
       this.pageSize
     );
     this.$titres.get("titres/CC", {params}).then(response => {
         console.log(response.data.result.items);
       this.total = response.data.result.totalItems
       this.currentPage = response.data.result.currentPage + 1
       this.elements=response.data.result.items

	    this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
     })
      .catch((error) => {
       console.log(error)
       this.isBusy=false
     });
      // this.elements=this.json.titres
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
    filterTable() {
      this.isBusy=true
      this.$titres.post("titres/cc/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
      
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
        });
    },

    resetSearcheBar(){
     this.search = {
      numtitre:"",
      numufa:"",
      region:"",
      departement:"",
      arrondissement:"",
      entite:"",
      sigle:"",
      statut:""
      }
      localStorage.removeItem('sigif2./inventaires-vente_de_coupe')
     
  },
  reset(){
    this.resetSearcheBar()
    this.getTitres()
  },

 },
 

  mounted(){
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getTitres();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
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