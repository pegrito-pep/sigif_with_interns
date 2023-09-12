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
                  <b-col cols="3" class="m-0">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" class="m-0" label="Numéro LV" v-model="search.nolv"/><br>
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" class="m-0" label="Type de LV" v-model="search.typelv"/><br>
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5"  label="Immatriculation" v-model="search.immatriculation"/>
                  </b-col>
                  <b-col cols="3" class="m-0">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" class="m-0" label='Site départ'  v-model="search.sitedepart"/><br>
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" class="m-0" label='Site destination' v-model="search.sitedestination"/><br>
                     <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" label='Transporteur'  v-model="search.transporteur"/>
                     
                  </b-col>
                  <b-col cols="3">
                     <div>
                        <b-row class="">
                          <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Du</label><date-picker  v-model="search.datedeb"   format="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                          <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Au</label><date-picker  v-model="search.datefin"  format="DD-MM-YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/></b-col>
                        </b-row>
                     </div>
                     <div class="mt-1">
                        <b-form-group  class="mt-3">
                          <label for="" class="font-weight: bold" style="width: 35%">statut</label>
                          <select v-model="search.statut" class="" style="width: 64%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                        </b-form-group>   
                     </div> 
                      <sigif-form-group :sizeLabel="5" :sizeLabelLg="4" label="Code Barre" v-model="search.codebarre"/>
                    
                  </b-col>
                  <b-col cols="" class="ml-1 position-relative">
                  
                    <div>
                      <label for="" class="m-0 p-0">Entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                            <option>green</option>
                            <option>blue</option>
                      </select>
                    </div>
                    <div style="width: 220px; margin-top: 130px">
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
              <b-col>
                <h6 class="m-0 p-0"><span>Nombre de LV disponibles : {{ total }}</span></h6>
                <h4 class="tab-header-left-text mt-0"> Liste des lettres de voiture</h4></b-col>
              <b-col class="col-md-auto d-flex justify-content-center align-items-center">
                <a :disabled="canCreateLettreVoiture" size="sm" :class="{'change-image-opacity': !canCreateLettreVoiture,  'not-change-image-opacity': canCreateLettreVoiture}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span v-if="isRowselected">
                  <a @click.prevent="callEditLettreVoiture" :disabled="canUpdateLettreVoiture" size="sm" :class="{'change-image-opacity': !canUpdateLettreVoiture,  'not-change-image-opacity': canUpdateLettreVoiture}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateLettreVoiture}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteLettreVoiture" size="sm" :class="{'change-image-opacity': !canDeleteLettreVoiture,  'not-change-image-opacity': canDeleteLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteLettreVoiture}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a :disabled="canViewDetailsLettreVoiture" @click.prevent="showDetails()" size="sm" :class="{'change-image-opacity': !canViewDetailsLettreVoiture,  'not-change-image-opacity': canViewDetailsLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsLettreVoiture}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveLettreVoiture" size="sm" :class="{'change-image-opacity': !canSaveLettreVoiture,  'not-change-image-opacity': canSaveLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveLettreVoiture}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitLettreVoiture" size="sm" :class="{'change-image-opacity': !canSubmitLettreVoiture,  'not-change-image-opacity': canSubmitLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitLettreVoiture}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintLettreVoiture" size="sm" :class="{'change-image-opacity': !canPrintLettreVoiture,  'not-change-image-opacity': canPrintLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintLettreVoiture}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer</a>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
            <div class="ml-1">
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
                       <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">lettre de voiture</span> trouvée!!</h4>
                </template>
                <template #cell(estLvVierge)="data">
                     <span v-if="data.item.estLvVierge==null" style=" font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>

              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
            </div>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from 'vuex'

export default {
  name: "lettres-de-voitures",
  components: {

  },
  data: () => ({
    isRowselected:false,
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    search:{
      datedeb: "",
	    datefin: "",
	    entite: "",
	    statut: "",
      typelv: "LVD",
	    immatriculation: "",
	    sitedepart: "",
	    sitedestination: "",
	    codebarre: "",
	    transporteur: ""
    },
      entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"SOUMISSION EN COURS", libelle: "soumission en cours"}],
    visible: true,
    fields: [ { key: 'index', label: '' },{ key: 'idoperation', label: 'N° LV' }, { key: 'codebarre', label: 'Code à barre LV' }, , { key: 'estLvVierge', label: 'LV vierge?' }, 
              { key: 'type_lettre_voiture', label: 'Type de LV' }, { key: 'dateope', label: 'Date ' }, { key: 'immatriculation', label: 'N° D\'immatricualtion ' },
              { key: 'sitedepart', label: 'Site de départ' },{ key: 'sitedestination', label: 'Site de destination' }, { key: 'status', label: 'statut' }],
    elements: [],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */
    searchSubmitted:false,

    }),
  computed:{
    ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateLettreVoiture(){return false},
    canUpdateLettreVoiture(){return true},
    canDeleteLettreVoiture(){return false},
    canViewDetailsLettreVoiture(){return true},
    canSaveLettreVoiture(){return false},
    canSubmitLettreVoiture(){return true;},
    canPrintLettreVoiture(){ return false;},
    /*items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },*/
    rows() {
        return this.items.length
    },
    totalPages(){
      return this.rows/this.perPage
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
  },
 
 methods: {
  showDetails(){ this.$router.push({name: 'detail-lettres-voiture', params: { id: this.selected[0].idoperation }}); },
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
  showDetails(){
    this.$router.push({
    name: 'detail-lettres-voiture', 
    params: { id: this.selected[0].idoperation }
});
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
    this.getLettresVoituresCemac()
  },
   getLettresVoituresCemac(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$boisCemac.get("lettres-voiture", {params}).then(response => {

        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

      this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope = this.$dayjs(elt.dateope).format('DD/MMMM/YYYY')
          elt.type_lettre_voiture=elt.parcOperationTypeopeparc.libelle
          elt.sitedepart=elt.sitedepart!==null ? elt.sitedepart.intitule :""  
          elt.sitedestination=elt.sitedestination!==null ? elt.sitedestination.intitule :""
          elt.status = elt.statutenr == 1 ? 'soumise' :"Brouillon"

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
      });

    },
    filterTable(){
    if(!this.disabled){
      this.search.entite = this.entite.libelle
    }
    console.log('response',this.search);
    this.isBusy=true
    this.$operationParc.post("lettres-voiture/search", this.search).then((response) => {
      console.log('response entrées',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
          this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope =  elt.dateope !==null ? this.$dayjs(elt.dateope).format('DD/MM/YYYY') :""
          elt.type_lettre_voiture=elt.parcOperationTypeopeparc.libelle
          elt.sitedepart=elt.sitedepart!==null ? elt.sitedepart.intitule :""  
          elt.sitedestination=elt.sitedestination!==null ? elt.sitedestination.intitule :""
          elt.status = elt.statutenr == 1 ? 'soumise' :"Brouillon"

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
         this.isBusy=false
      });
  },
  resetSearcheBar(){
     this.search = {
      entite:'',
      statut:"",
	    datedeb: "",
	    datefin: "",
      typelv:"",
      transporteur:"",
      immatriculation:"",
      codebarre:"",
      sitedepart:"",
      sitedestination:"",
          entite: '', statut: '',
          datedeb: '', datefin: '', typelv: '', transporteur: '', immatriculation: '',codebarre: '', sitedepart: '', sitedepart: ''
     }
     localStorage.removeItem('sigif2./bois-cemac-lettres_de_voiture_cemac')
  },
  reset(){
    this.resetSearcheBar()
    this.getLettresVoituresCemac()
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
    }else{this.getLettresVoituresCemac();}
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
  bottom: 30px;
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
  border-radius:  6px;
  margin-top: 10px;
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
  cursor: pointer;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table td, .table th {
  padding: 5px 0;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}


</style>