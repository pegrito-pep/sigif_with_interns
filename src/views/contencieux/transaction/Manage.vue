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
            </div><h4 class="tab-header-left-text mt-0 ml-4"> Liste des transactions</h4>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col cols="2">
                    <sigif-form-group-vertical :px="1" :py=".9" class="mt-1" :label="$t('No PV')" v-model="search.identifiant"/>

                    
                              <b-form-group class=" p-0">
                        
                          <div><label for="" class="m-0 p-0" style="display: inline-block">Statut</label></div> 
                          <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                    </b-form-group>
                    
                  
                  </b-col>
                  <b-col cols="2">
                    

                          <b-col>
                        <label for="" class="m-0 p-0">Du</label>
                        <date-picker  v-model="search.datedeb" format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                      </b-col>
                        <b-col >
                        <label for="" class="mt- p-0">Au</label>
                        <date-picker  v-model="search.datefin" format="dddd, DD MMMM YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                      </b-col>


             

                  </b-col>
                
               
                  <b-col cols="2">
                      <label for="" class="mt- p-0">Entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%; font-size: 1rem; border-radius:0.25rem; height: 30px !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                        <option>green</option>
                        <option>blue</option>
                      </select>
                      
                     
                      <div class="mt-4">
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
               
                <h4 class="tab-header-left-text mt-0"> Liste des transactions</h4></b-col>
              <b-col class="col-md-auto d-flex justify-content-center align-items-center">
                <a :disabled="canCreateLettreVoiture" size="sm" :class="{'change-image-opacity': !canCreateLettreVoiture,  'not-change-image-opacity': canCreateLettreVoiture}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span v-if="isRowselected">
                  <a @click.prevent="callEditLettreVoiture" :disabled="canUpdateLettreVoiture" size="sm" :class="{'change-image-opacity': !canUpdateLettreVoiture,  'not-change-image-opacity': canUpdateLettreVoiture}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateLettreVoiture}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteLettreVoiture" size="sm" :class="{'change-image-opacity': !canDeleteLettreVoiture,  'not-change-image-opacity': canDeleteLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteLettreVoiture}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a :disabled="canViewDetailsLettreVoiture" size="sm" :class="{'change-image-opacity': !canViewDetailsLettreVoiture,  'not-change-image-opacity': canViewDetailsLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsLettreVoiture}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
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
              :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(estLvVierge)="data">
                     <span v-if="data.item.estLvVierge==null" style="backgroung: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>
            
              <!--AJOUT DE LA PAGINATION -->
              <!-- <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />   -->
            </div>
          <!--MODAL POUR AJOUTER / SUPPRIMER UNE OPERATION DE PARC -->
          <b-modal id="modal-lg" size="lg" title="Large Modal">
            <b-row>
              <b-col>
                  <b-row>
                      <div class="form-group">
                        <p class="my-4">Site concerné</p>
                          <v-select :options="allSitesOperations" :reduce="site => site.id" v-model="op.site_concernee" label="title">
                                  <template v-slot:option="option">
                                      <div class="d-flex">
                                          <div class="w-10">
                                              <i :class="option.icon" style="font-size: 36px; color: #f5365c;"></i>
                                          </div>
                                          <div class="d-flex justify-content-center align-items-center">
                                              {{ option.title }}
                                          </div>
                                      </div>
                                  </template>
                          </v-select>
                      </div>
                  </b-row>
                  <b-row>
                    <div class="form-group">
                        <p class="my-4">Entité concernée</p>
                          <v-select :options="allEntitesForrestieres" :reduce="entite => entite.id" v-model="op.entitee_concernee" label="title">
                              
                          </v-select>
                      </div>
                  </b-row>
              </b-col>
              <b-col>
                <b-row>
                    <b-col>
                      <b-form-group label="date de Début de l'opération" description="L'opération a commencé quand ?">
                          <date-pick v-model="op_date" :pickTime="true" :use12HourClock="true" :format="'YYYY-MM-DD HH:mm'" :displayFormat="'YYYY.MM.DD H:mm A'" ></date-pick>
                      </b-form-group> 
                    </b-col>
                    <b-col></b-col>
                </b-row>
                <b-row>
                  <b-form-group
                      label="statut"
                      description=""
                    >
                      <b-form-select v-model="op.statut" :options="op_status" size="sm" class="mt-3"></b-form-select>
                    </b-form-group>
                </b-row>
              </b-col>
            </b-row>
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from 'vuex'
export default {
  name: "Logins",

  data: () => ({
    isRowselected:false,
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
  

    //données du tableaux
    fields: [  
              { key: 'dateope', label: 'no notif' },
              { key: 'dateope2', label: 'date notif' },
              { key: 'dateope3', label: 'Entité forestière' },
              { key: 'dateope4', label: 'notification' },
              { key: 'dateope6', label: 'no levée de suspension' },
              { key: 'dateope7', label: 'Date de levé' },
              { key: 'dateope8', label: 'levée' },
              { key: 'dateope9', label: 'Statut' },
],
    elements: [  
    
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
    canCreateLettreVoiture(){return false},
    canUpdateLettreVoiture(){return true},
    canDeleteLettreVoiturec(){return false},
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
      return php.array_slice(this.elements.map((a, index) => {
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      }), 
      this.offset, this.perPage) 
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
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
  onRowSelected(items) {
    this.isRowselected=true
        this.selected = items
        console.log('ligne sélectionnée',this.selected);
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
    this.getpermis()
  },
   getpermis(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$operationParc.get("permis", {params}).then(response => {
        console.log('response',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

        this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope = this.$dayjs(elt.dateope).format('DD/MMMM/YYYY')
          elt.type_lettre_voiture=elt.parcOperationTypeopeparc.libelle
          elt.sitedepart=elt.sitedepart.intitule
          elt.sitedestination=elt.sitedestination.intitule
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
      actionButton.innerHTML = '<i class="fa fa-arrow-right" style="font-size: 18px"></i>';

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
      //this.getpermis();
    }
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
  }
  }

</script>
<style scoped>



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