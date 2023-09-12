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
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="N° du titre" v-model="search.identifiant"/>
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="N° UFA" v-model="search.notitre" />
                  
                  </b-col>
                  <b-col cols="3">
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="Région" v-model="search.region"/>
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="Département" v-model="search.departement" />
                  </b-col>
                  <b-col cols="3">
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="Arrondissement" v-model="search.arrondissement"/>
                    <sigif-form-group class="m-0" :sizeLabel="6" :sizeLabelLg="5" label="sigle" v-model="search.sigle" />
                  </b-col>
                  <b-col cols="2">
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
                        <search-bar-actions-buttons @search="filterTable" @reset="resetSearcheBar"/>
                      </div>
                  </b-col>
                </b-row>
              </b-card>
            </b-collapse>

           </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des titres
                <!-- <span v-if="isRowselected"> -->
                  <b-button @click.prevent="showDetailsUFA"  size="sm" :class="{'change-image-opacity': !canViewDetailsUFA,  'not-change-image-opacity': canViewDetailsUFA}" class="mx-1 simple-btn"><b-img src="@/assets/images/Parcs_Rupture_16x16.png"></b-img>UFA</b-button>
                  <b-button @click.prevent="showDetailsAAC"   size="sm" :class="{'change-image-opacity': !canViewDetailsAAC,  'not-change-image-opacity': canViewDetailsAAC}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconABATTAGE_16x16.png"></b-img>AAC</b-button>
                  <b-button @click.prevent="showDetailsCCP"   size="sm" :class="{'change-image-opacity': !canViewDetailsCCP,  'not-change-image-opacity': canViewDetailsAAC}" class="mx-1 simple-btn"><b-img src="@/assets/images/Picto_tracabilite/iconINVENTAIRE_16x16.png"></b-img>CCP</b-button>
                <!-- </span> -->
              </h4></b-col>
              <b-col class="col-md-auto">
                <b-button @click.prevent="goToCreateConcession" :disabled="!canCreateConcessionProvisoire" size="sm" :class="{'change-image-opacity': !canCreateConcessionProvisoire,  'not-change-image-opacity': canCreateConcessionProvisoire}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="!canUpdateConseccionProvisoire" :disabled="canUpdateConseccionProvisoire" size="sm" :class="{'change-image-opacity': !canUpdateConseccionProvisoire,  'not-change-image-opacity': canUpdateConseccionProvisoire}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button :disabled="!canDeleteConcessionProvisoire" size="sm" :class="{'change-image-opacity': !canDeleteConcessionProvisoire,  'not-change-image-opacity': canDeleteConcessionProvisoire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button @click.prevent="showDetails" :disabled="!canViewDetailsConcessionProvisoire" size="sm" :class="{'change-image-opacity': !canViewDetailsConcessionProvisoire,  'not-change-image-opacity': canViewDetailsConcessionProvisoire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
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
              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              <template #empty>
                    <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">Titre</span> trouvé!!</h4>
              </template>
              <template #cell(marteau)="data">
                <span class="d-flex justify-content-center align-items-center">{{ data.item.marteau }} </span>
              </template>
              <template #cell(valid)="data">
                  <span v-if="data.item.valid=='1'" style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                  <span v-else style="color: green; font-weight:bold"><b-img src="@/assets/images/actualiser.gif"></b-img></span>
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
  name: "entite-forestiere",
  components: {
    
  },
  data: () => ({
    isBusy:false,
    isRowselected:false,
    canViewDetailsAAC:true,
    canViewDetailsUFA:true,
    canViewDetailsCCP:true,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
     search:{},
       search:{
      
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

    // la recherche dans les entêtes

    search:{
      numtitre:"",
      numufa:"",
      region:"",
      departement:"",
      arrondissement:"",
      entite:"",
      sigle:"",
      statut:""
     },
      entite:{
      id:1,
      libelle:''
    },
    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],

    //données du tableaux
fields: [ 
	
    { key: 'index', label: '',thStyle: { width: "0%" } },
    { key: 'libelletypetitre', label : 'Type de Titre',thStyle: { width: "30%" } },
    { key: 'numtitre', label: 'N°Titre' ,thStyle: { width: "6%" }}, 
    { key: 'entite', label: 'Entité forestiere',thStyle: { width: "30%" } },
    { key: 'marteau', label: 'Marteau / sigle',thStyle: { width: "15%" } },
    { key: 'valid', label: 'Statut',thStyle: { width: "5%" } },
	
	],

elements: [],
    selected:{},

    // Données pour la recherche

    search : {
      datedeb: '',
      datefin: '',
    },
    /*propriétes lies au traitement d'une operation de parc */

  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateConcessionProvisoire(){return true; return this.hasAccess('CREER_CONCESSION_PROVISOIRE') },
    canUpdateConseccionProvisoire(){ return this.hasAccess('MODIFIER_CONCESSION_PROVISOIRE')},
    canDeleteConcessionProvisoire(){ return this.hasAccess('SUPPRIMER_CONCESSION_PROVISOIRE')},
    canViewDetailsConcessionProvisoire(){ return true; return this.hasAccess('CONSULTER_CONCESSION_PROVISOIRE')},
    
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
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
 methods: {
  showDetails(){ this.$router.push({name: 'concession_en_cp_detail', params: { id: this.selected[0].idtitre }});},
  showDetailsUFA(){
    this.$router.push({name:'concession_en_cp_UFA', params: { id: this.selected[0].idtitre }})
  },
  showDetailsAAC(){
    this.$router.push({name:'concession_en_cp_AAC', params: { id: this.selected[0].idtitre }})
  },
  showDetailsCCP(){
    this.$router.push({name:'concession_en_cp_CCP'})
  },
    goToCreateConcession(){this.$router.push({ name: "create-titre-cp-convention" });},
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
          console.log(this.selected[0].valid)
          if(this.selected && this.selected[0] && this.selected[0].valid!=="1"){
            console.log('valid',this.selected[0].valid)
            this.canViewDetailsAAC=this.canViewDetailsUFA=this.canViewDetailsCCP=false
          }else if(this.selected && this.selected[0] && this.selected[0].valid==="1"){
            this.canViewDetailsAAC=this.canViewDetailsUFA=this.canViewDetailsCCP=true
          }
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
      this.getTitres()
    },
    getTitres(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        this.$titres.get("titres/CP", {params}).then(response => {
            console.log("data",response.data.result.items);
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items

        this.isBusy=false
        })
        .catch((error) => {
          console.log(error)
          this.isBusy=false
        });

    },
    filterTable() {
      this.isBusy=true
      this.$titres.post("titres/cp/search", this.search).then((response) => {
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
      storage.remove(this.$route.path);
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
        this.filterTable();
      }else{
         this.getTitres();
      }
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