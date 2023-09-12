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
                  <select v-model="search.typeProduit" style="height: calc(1em + .300rem + 1px) !important;width:70%" size="sm">
                        <option value=""></option>
                        <option value="GR">Grumes</option>
                        <option value="CL">Débités</option>
                        <option value="PS">Produit spécial</option>
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
                  <b-form-input v-model="search.nomDestinataire" style="height: calc(1em + .300rem + 1px) !important" class="form-control p-1"></b-form-input>
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
                  <b-input v-model="search.portDebarquement" style="height: calc(1em + .300rem + 1px) !important;width:80%" class="form-control p-1"></b-input>
                 </b-form-group>
                 <b-overlay rounded="sm" :show="showOverlayPays">
                  <template #overlay>
                    <div class="text-center">
                      <i class="fas fa-2x fa-sync fa-spin"></i>
                      <p id="cancel-label">Chargement...</p>
                    </div>
                  </template>
                 <b-form-group class="m-0 p-0"
                  label-align="right"
                  label-cols-sm="4"
                 >
                    <template #label>
                      <div class="label-form">
                        <span>Pays destination</span>
                      </div>
                    </template>
                    <v-select v-model="search.paysDestination" class="custom-select-type_titre" :options="paginatedPays" :filterable="false" @search="onSearchPays" @open="getPays"
                        label="nom" style="width:100%"
                      >
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPagePays" @click="offsetPays-=limitPays">Prev</button>
                          <button :disabled="!hasNextPagePays" @click="offsetPays+=limitPays">Next</button>
                        </li>
                      </v-select>
                 </b-form-group>
                 </b-overlay>
                </b-col>
                <b-col cols="5" class="my-1">
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
                        <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  :reduce="entite => entite.IDORGANISATION" label="INTITULE" class="custom-select-type_titre">
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
                 <!--<b-form-group class="m-0 p-0"
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
                 </b-form-group>-->
                </b-col>
               
              </b-row>
              <div class="d-flex justify-content-end " style="margin-top: 60px;width:25%;float:right">
                <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
              </div>
              
             <!-- <b-row class="d-flex justify-content-end">
                <div class="search-bar-btn-group">
                  <b-col  mt-2>
                    <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                  </b-col>
                  <b-col>
                    <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                  </b-col>
                </div>
              </b-row>-->
            </b-card>
          </b-collapse>
        </div>
        <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col><h4 class="tab-header-left-text">Liste des demandes de BSE</h4></b-col>
            <b-col class="col-md-auto">
              <a :disabled="canCreateDemandeBSE" @click.prevent="createDemandeBSE" size="sm" :class="{'change-image-opacity': !canCreateDemandeBSE,  'not-change-image-opacity': canCreateDemandeBSE}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
              <span >
                <!--<a @click.prevent="callEditBSE" :disabled="canUpdateBSE" size="sm" :class="{'change-image-opacity': !canUpdateBSE,  'not-change-image-opacity': canUpdateBSE}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateBSE}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
              <a :disabled="canDeleteBSE" size="sm" :class="{'change-image-opacity': !canDeleteBSE,  'not-change-image-opacity': canDeleteBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteBSE}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>-->
              <a @click.prevent="showDetailsDemandesBSE" :disabled="canViewDetailsDemandesBSE" size="sm" :class="{'change-image-opacity': !canViewDetailsDemandesBSE,  'not-change-image-opacity': canViewDetailsDemandesBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsDemandesBSE}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
              <!--<a :disabled="canSaveBSE" size="sm" :class="{'change-image-opacity': !canSaveBSE,  'not-change-image-opacity': canSaveBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveBSE}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
              <a :disabled="canSubmitBSE" size="sm" :class="{'change-image-opacity': !canSubmitBSE,  'not-change-image-opacity': canSubmitBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitBSE}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
              <a :disabled="canPrintBSE" size="sm" :class="{'change-image-opacity': !canPrintBSE,  'not-change-image-opacity': canPrintBSE}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintBSE}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>-->
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
                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
              </template>
               <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
               <template #cell(statut)="data">
                   <span v-if="data.item.statut==7" style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                   <span v-else  style="color: red; font-weight:bold"><i class="fa fa-times fa-lg" aria-hidden="true"></i></span>
              </template>
              <template #cell(entite)="data">
                <span :title="data.item.entite">{{ data.item.entitesimplifiee }}</span>
              </template>
              <template #cell(position)="data">
                <span :title="data.item.position">{{ data.item.positionsimplifiee }}</span>
              </template>
              
            </b-table>

            <!--AJOUT DE LA PAGINATION -->
            <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
        </div>

  </div>

</template>


<script>
const php  = require ( 'phpjs' ) ;

import { mapGetters } from 'vuex'
export default {
name: "specification_export",
components:{

},
data: () => ({
  //   checkbox 
  status: true,
  search:{
    typeProduit:"",//string
    nomDestinataire:"",//String
    portDebarquement:"",//Long
    paysDestination:"",//Long
    entite:""//Long
  },
  showOverlayEntites:false,
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
  //données du tableaux
  fields: [
      { key: 'idbseEntete', label: 'N°',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
      { key: 'entite', label: 'Entité forestière',thStyle:{color:'green',width:'16%',fontSize:'.7rem'} },
      { key: 'sigle', label: 'Sigle',thStyle:{color:'green',width:'5%',fontSize:'.7rem'} },
      { key: 'addresseexporteur', label: 'Adresse exportateur',thStyle:{color:'green',width:'9%',fontSize:'.7rem'} },
      { key: 'typeproduit', label: 'Type de produit',thStyle:{color:'green',fontSize:'.7rem'} },
      { key: 'portdebarquement', label: 'Port de débarquement',thStyle:{color:'green',fontSize:'.7rem'} },
      { key: 'sitedembarquement', label: 'Site d\'embarquement',thStyle:{color:'green',fontSize:'.7rem'} },
      { key: 'emaildouane', label: 'Email autorités douanières',thStyle:{color:'green',fontSize:'.7rem'} },
      { key: 'paysdestination', label: 'Pays de destination',thStyle:{color:'green',fontSize:'.7rem'} },
      { key: 'datedepart', label: 'Date départ',thStyle:{color:'green',fontSize:'.7rem',width:'8%'} },
      { key: 'statut', label: 'Statut',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
      { key: 'position', label: 'Position',thStyle:{color:'green',width:'7%',fontSize:'.7rem'} },
  ],
  elements: [],
  selected:{},
  // entités forestières
  entites:[],
  entite:'',
  searchentite:'',
  offsetEntites:0,
  limitEntites:0,
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
  entite:{
    idOrganisation:'',
    libelle:''
  },
  isToVerify:true,
  isToSubmit:false,
  isToEmit :false,
  isToActive:false
}),
computed:{
  /*propriétés liées aux accèes*/
  canCreateDemandeBSE(){return true},
  canUpdateBSE(){return true},
  canDeleteBSE(){return false},
  canViewDetailsDemandesBSE(){return true},
  canSaveBSE(){return false},
  canSubmitBSE(){return true;},
  canPrintBSE(){ return false;},

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
   ...mapGetters(['user','hasAccess'])                                                                                                                                                                              ,   
  /*propriétés liées aux accèes*/
  isMinfof(){ 
    if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
      return true;
    }else{
      return false;
    }
  },
  filteredEntites() {
    return this.entites.filter((entite) =>
      entite.INTITULE.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
    )
  },
  paginatedEntites() {
    return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
  },
  hasNextPageEntites() {
    const nextOffset = this.offsetEntites + this.limitEntites
    return Boolean(
      this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
    )
  },
  hasPrevPageEntites(){   
    const prevOffset = this.offsetEntites - this.limitEntites
    return Boolean(
      this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
    )
  },

  // pays
  filteredPays() {
    return this.paysAll?.filter((pays) =>
    pays.nom.toLocaleLowerCase().includes(this.searchPays.toLocaleLowerCase())
    )
  },
  paginatedPays(){
    return this.filteredPays?.slice(this.offsetPays, this.limitPays + this.offsetPays)
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
watch:{
  elements(value){
    if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    }
  },
},
methods: {
  onRowSelected(items) {
    this.isRowselected=true
    this.selected = items;
      if (!php.empty(this.selected[0])) {
        this.isRowselected =true;
        if(this.selected[0].statut==0){
          this.isToVerify =true
          this.isToSubmit=false
          this.isToEmit =false
          this.isToActive =false

        }else if(this.selected[0].statut==1){
          this.isToSubmit=true
          this.isToVerify =false
          this.isToVerifyMinfof =false
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==2){
          this.isToSubmit=false
          this.isToVerify =true
          //this.isToVerifyMinfof =true
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =false

        }
        else if(this.selected[0].statut==3){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToVerifyMinfof =false
          this.isToRecommend =true
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==4){
          this.isToSubmit=false
          this.isToVerify =true
          this.isToRecommend =false
          this.isToVerifyByMinfof =false
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==5){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToEmit =true
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==6){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =true
        }
        else{
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToVerifyByMinfof =false
          this.isToEmit =false
          this.isToApprouve =false
        }
      }
  },
  showDetailsDemandesBSE(){
    this.$router.push({
      name: "demande_bse_detail",
      params: { id: this.selected[0].idbseEntete },
    });
  },
  createDemandeBSE(){
    this.$router.push({name: 'create-demande_bse'})
  },
  filterTable(){
  let data={ typeProduit: this.search.typeProduit, nomDestinataire: this.search.nomDestinataire, portDebarquement: this.search.portDebarquement, paysDestination: this.search.paysDestination.idpays, 
  }
  if(this.isMinfof){
    data.entite= this.search.entite.IDORGANISATION 
  }else{
    data.entite=this.user.idOrganisation
  }
  this.isBusy=true
  this.$exportations.post("bses/search", data).then((response) => {
    this.total = response.data.result.totalItems
    this.currentPage = response.data.result.currentPage + 1
    this.elements=response.data.result.items
    
    this.elements = this.elements.map(elt =>{
      if(elt.entite != null&&elt.entite.length>10){
          elt.entitesimplifiee = elt.entite.substring(0, 30) + '...'
      }
      if(elt.position != null&&elt.position.length>14){
          elt.positionsimplifiee = elt.position.substring(0, 10) + '...'
      }
      elt.datedepart = elt.datedepart !==null ? this.$dayjs(elt.datedepart).format('DD/MM/YYYY') :""

      return elt
    })
      storage.set(this.$route.path ,JSON.stringify(this.search))
        this.isBusy=false
    })
    .catch((error) => {
       this.isBusy=false
    });
  },
  reset() {
    this.resetSearcheBar();
    this.getDemandesBses();
  },
  resetSearcheBar() {
    this.search = {
      typeProduit:"",//string
      nomDestinataire:"",//String
      portDebarquement:"",//Long
      paysDestination:"",//Long
      entite:""//Long
    };
    storage.remove(this.$route.path);
  },
  getPays(){
    this.showOverlayPays=true
      this.$donneesReference.get("pays?size=5000").then(response => {
          console.log("=================== Données de reference ==================");
          console.log(response.data.result.items);
          console.log("===========================================================");
          this.paysAll=response.data.result.items
          this.showOverlayPays=false
      })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });
  },
  onSearchEntites(query){
    this.searchentite = query
    this.offsetEntites = 0
  },
rowClass(item, type) {
  if(item !=''&&item!=null){
    if (item.isEven) return 'table-row-other'
    if (!item || type !== 'row') return 'table-info'
  }else{
    return 
  }
},
onSearchEntites(query){
    this.searchentite = query
    this.offsetEntites = 0
  },
onRowSelected(items) {
    items.isSelected = true;
    this.selected = items;
    /*if (!php.empty(this.selected[0])) {
      this.isRowselected = true;

      if(this.selected[0].statutenr=='Brouillon'){
        this.isToValidate=false
        this.isToSubmit=true
      }
      else if(this.selected[0].statutenr=='Soumise'){
        this.isToValidate=true
        this.isToSubmit=false
      }
      else{
        this.isToValidate=false
        this.isToSubmit=false
      }
    }else{ 
      this.isRowselected = false;
     }*/
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
  this.getArrondissements()
},
getDemandesBses(){
   this.isBusy=true
    const params = this.getRequestParams(
      this.currentPage,
      this.pageSize
    );
  this.$exportations.get("bses", {params}).then(response => {
      this.total = response.data.result.totalselements
      this.currentPage = response.data.result.currentpage + 1
      this.elements=response.data.result.Items

      this.elements = this.elements.map(elt =>{
        if(elt.entite != null&&elt.entite.length>10){
            elt.entitesimplifiee = elt.entite.substring(0, 30) + '...'
        }
        if(elt.position != null&&elt.position.length>14){
            elt.positionsimplifiee = elt.position.substring(0, 10) + '...'
        }
        else{
           elt.positionsimplifiee = elt.position
        }
        elt.datedepart = elt.datedepart !==null ? this.$dayjs(elt.datedepart).format('DD/MM/YYYY') :""

        return elt
      })
      console.log('elements ',this.elements);
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


onSearch(query){
  this.search = query
  this.offsetEntities = 0
},
async getEntities(){
  this.showOverlay=true
  if(!php.empty(this.$store.state.entites)){
    this.entites=this.$store.state.entites
    this.showOverlay=false
  }else{
    await this.$donneesReference.get('entites/all')
      .then(response=>{
        this.entites=response.data.result
        this.$store.dispatch('entiteswithoutminfof',this.entites)
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


},


mounted(){
  var sidebar = document.querySelector('#sidebar');
  if (sidebar.style.width !== '0px'){
    this.toggleSideBar();
  }
  this.entite.libelle=this.user.profil.organisation
if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
  this.search=JSON.parse(storage.get(this.$route.path))
  this.filterTable();
}else{this.getDemandesBses();}
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
.label-form{
  font-weight: bold;
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