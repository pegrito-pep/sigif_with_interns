
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
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col cols="2">
                    <sigif-form-group-vertical class="m-0" :label="$t('Titre no')" v-model="search.identifiant"/>
                    <sigif-form-group-vertical class="m-0" label="UFA" v-model="search.notitre" />
                  
                  </b-col>
                  <b-col cols="2">
                    <b-form-group class="m-0 p-0">
                          <div><label for="" class="m-0 p-0" style="display: inline-block">Région</label></div> 
                          <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                    </b-form-group>
                    <b-form-group  class="m-0 p-0">
                        <label for="" class="m-0 p-0">Département</label>
                         <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                    </b-form-group>
                   
                  </b-col>
                  <b-col cols="2">
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="m-0 p-0">Arrondissement</label>
                         <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                    </b-form-group>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="m-0 p-0">Sigle</label>
                         <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                    </b-form-group>
                    
                  </b-col>
                  <b-col cols="2" class="m position-relative">
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="m-0 p-0">Statut</label>
                         <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                    </b-form-group>
                    
                  </b-col>
                  <b-col cols="2">
                      <label for="" class="m-0 p-0">Entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%; font-size: 1rem; border-radius:0.25rem; height: 30px !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                        <option>green</option>
                        <option>blue</option>
                      </select>
                      <div class="" style="margin-top: 10px">
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
              <b-col><h4 class="tab-header-left-text"> Liste des titres</h4></b-col>
              <b-col class="col-md-auto">
                <a @click.prevent="gotToCreatePBO" :disabled="!canCreatePBO" size="sm" style="cursor: pointer" :class="{'change-image-opacity': !canCreatePBO,  'not-change-image-opacity': canCreatePBO}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a :disabled="!canEditPBO" size="sm" :class="{'change-image-opacity': !canEditPBO,  'not-change-image-opacity': canEditPBO}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="!canDeletePBO" size="sm" :class="{'change-image-opacity': !canDeletePBO,  'not-change-image-opacity': canDeletePBO}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                  <a :disabled="!canViewDetailsPBO" style="cursor: pointer" @click.prevent="showDetailsPBO" size="sm" :class="{'change-image-opacity': !canViewDetailsPBO,  'not-change-image-opacity': canViewDetailsPBO}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
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
                <template #empty>
                       <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">Titre</span> trouvé!!</h4>
                </template>
                  <!-- <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template> -->
                  <template #cell(statut)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
              </b-table>
              <!--<b-table v-else :fields="fields"  :items="items" show-empty empty-text="Aucune entrée parc enregistré pour le moment" >
                <template v-slot:empty="scope">
                  <h4 class="text-center font-weight-bold">{{ scope.emptyText }}</h4>
                </template>
                <template v-slot:emptyfiltered="scope">
                  <h4>{{ scope.emptyFilteredText }}</h4>
                </template>
              </b-table>-->
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  
  import { mapGetters } from 'vuex'
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
export default {
  name: "abbatages_titres",
  components: {
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
     search:{},
       search:{
      identifiant: "",
      intitule: "",
      description: "",
	    motifrejet: "",
	    unite: "",
	    statut: "",
	    entite: "",
    },
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
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
        libelle:'bois legal'
      },
      { 
        id:2,
        libelle:'bibinga'
      },
      { 
        id:3,
        libelle:'bois blanc'
      }
    ],

    //données du tableaux
fields: [ 
	// { key: 'index', label: '',thStyle: { width: "2%" } },
  
    { key: 'tytitre', label : 'Type de Titre',thStyle: { width: "8%" } },
     { key: 'num_titre', label: 'N°Titre' ,thStyle: { width: "6%" }}, 
     { key: 'num_ufa', label: 'Entité forestiere',thStyle: { width: "5%" } },
      { key: 'statut', label: 'Statut',thStyle: { width: "5%" } },
	
	],

elements: [
	{tytitre: "autorisation d'enlèvement" , num_titre:"AEBGUGICFA", num_ufa:"UNION COEUR DES FORETS",num_ufaa:"moojkh"},
  {tytitre: "autorisation d'enlèvement" , num_titre:"AEB1985", num_ufa:"LES COMMUNES D'AKOM 2",num_ufaa:"moojkh"},
  {tytitre: "autorisation d'enlèvement" , num_titre:"AEB0903472", num_ufa:"LA SOCIETE FORESTIÈRE",num_ufaa:"moojkh"},
  {tytitre: "autorisation d'enlèvement" , num_titre:"AEBFCBIPINDI", num_ufa:"COMMUNE BIPINDI LOLODORF",num_ufaa:"moojkh"},
  {tytitre: "autorisation d'enlèvement" , num_titre:"AEB0903316", num_ufa:"SOCIETE SEXTRANSBOIS",num_ufaa:"moojkh"},
  
],
    selected:{},

    // Données pour la recherche

    search : {
      datedeb: '',
      datefin: '',
    },
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
  }),
  computed:{
    ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreatePBO(){return true},
    canEditPBO(){return true},
    canDeletePBO(){return false},
    canViewDetailsPBO(){return true},

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
  getTitres(){
    this.isBusy=true
     const params = this.getRequestParams(
       this.currentPage,
       this.pageSize
     );
     this.$titres.get("titres/bo", {params}).then(response => {
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
  filterTable() {
      this.isBusy=true
      this.$titres.post("titres/bo/search", this.search).then((response) => {
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

  gotToCreatePBO(){this.$router.push({ name: "create-titre-pbo" });},
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  showDetailsPBO(){
    this.$router.push({name:'permis_de_bois_d_oeuvre-detail'})
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
    this.getEntreesParcs()
  },
  getAebVep(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$operationParc.get("entrees-parc", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope = elt.dateope !==null ? this.$dayjs(elt.dateope).format('DD MMMM YYYY') :""
          elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
          elt.siteoperation=elt.siteoperation.intitule
          elt.status = elt.statutenr == 1 ? 'soumise' :"en cours"

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
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
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      // this.filterTable();
    }else{this.getTitres();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
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