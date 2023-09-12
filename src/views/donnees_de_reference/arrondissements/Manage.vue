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
                <b-row class=" d-flex justify-content-around" style="width:80%">
                   <b-col cols="3">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Départements</strong></label><br>
                      <v-select :options="paginatedDep" v-model="search.departement" :filterable="false" @search="onSearchdep" label="nom" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageDep" @click="offsetdep -= limitdep">Prèc.</button>
                            <button :disabled="!hasNextPageDep" @click="offsetdep += limitdep">Suiv.</button>
                        </li>
                      </v-select>
                    </b-form-group>
                    
                  </b-col>
                  <b-col cols="2">
                    <sigif-form-group-vertical  :px="0" :py="0" :sizeLabel="4" :sizeLabelLg="4" :label="$t('data.Code_région')" v-model="search.coderegion"/>
                    
                  </b-col>
                  
                  <b-col cols="2" class="b-col">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Zone</strong></label><br>
                      <v-select :options="zones" v-model="search.zone" :filterable="false" label="zone" class="custom-select-type_titre"></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col >
                    <div class="d-flex mt-4" style="width: 80px">
                      <b-col><label for=""><strong>Actif</strong></label></b-col>
                  <b-form-checkbox
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="accepted"
                    unchecked-value="not_accepted"
                  >
                  </b-form-checkbox>
                  </div>
     
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="2">
                    <sigif-form-group-vertical :px="0" :py="0" v-model="search.nomarrond" :label-cols="4" :label-cols-lg="3" :label="$t('data.Nom_arrondissement_commune')"/>
                  </b-col>
                  <b-col cols="2">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Région</strong></label><br>
                      <v-select  :options="optionsRegion" v-model="search.region" :filterable="false" label="nom" class="custom-select-type_titre"></v-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="position_absolute">
                  <div class="search-bar-btn-group">
                    
                    <b-col>
                      <b-button class="search-bar-btn"  @click.prevent="filterList" style="color:rgb(0, 82, 44);"><a href="">{{ $t('data.Rechercher') }}</a></b-button>
                    </b-col>
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">{{ $t('data.Réinitialisiser') }} </a></b-button>
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> {{ $t ('data.Liste_des_arrondissements_communes') }}</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!cancreateArrondissement" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !cancreateArrondissement,  'not-change-image-opacity': cancreateArrondissement}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>{{ $t('data.Créer') }}</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateArrondissement" size="sm" :class="{'change-image-opacity': !canUpdateArrondissement,  'not-change-image-opacity': canUpdateArrondissement}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateArrondissement}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img> {{ $t('data.Modifier') }}</b-button>
                <b-button :disabled="!canDeleteArrondissement" size="sm" :class="{'change-image-opacity': !canDeleteArrondissement,  'not-change-image-opacity': canDeleteArrondissement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteArrondissement}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>{{ $t('data.Supprimer') }}</b-button>
                <b-button :disabled="!canViewDetailsArrondissement" size="sm" :class="{'change-image-opacity': !canViewDetailsArrondissement,  'not-change-image-opacity': canViewDetailsArrondissement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsArrondissement}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>{{ $t('data.Consulter') }}</b-button>
                <b-button :disabled="!canActiveArrondissement" size="sm" :class="{'change-image-opacity': !canActiveArrondissement,  'not-change-image-opacity': canActiveArrondissement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canActiveArrondissement}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>{{ $t('data.Valider') }}</b-button>
                <b-button :disabled="!canDesactiveArrondissemnt" size="sm" :class="{'change-image-opacity': !canDesactiveArrondissemnt,  'not-change-image-opacity': canDesactiveArrondissemnt}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDesactiveArrondissemnt}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>{{ $t('data.Desactiver') }}</b-button>
                <b-button :disabled="!canImportArrondissemnt" size="sm" :class="{'change-image-opacity': !canImportArrondissemnt,  'not-change-image-opacity': canImportArrondissemnt}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canImportArrondissemnt}" src="@/assets/images/excel.png"></b-img>{{ $t('Importer') }}</b-button>
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
  import departements from '@/data/departements.js'
  import arrondissements from '@/data/arrondissements.js'
  import regions from '@/data/regions.js'
  import { mapGetters } from 'vuex'
export default {
  name: "arrondissements",
  components:{

  },
  data: () => ({

    optionsDepartement:departements,
    optionsRegion:regions,
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
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'codedepartement', label: 'Code' },
        { key: 'intitulearr', label: 'Nom Arrond. / Commune' },
        { key: 'intitulereg', label: 'Région' },
        { key: 'intituledepart', label: 'Département' },
        { key: 'cheflieu', label: 'Chef lieu' },
        { key: 'actif', label: 'Actif' },
        { key: 'superficie', label: 'Superficie(km²)' }, 
        { key: 'zone', label: 'Zone d\'exploitation' },
        { key: 'phasearr', label: 'Phase' },
     

    ],
    zones: [
        { zone: 'zone 1'},
        { zone: 'zone 2'},
        { zone: 'zone 3'}],
    elements: [],
    offsetdep: 0,
    limitdep:10,
    searchdep:"",
    selected:{},

    // Données de recherche
    searchdep:"",
    search:{
      departement: "",
      nomarrond: "",
      coderegion: "",
      region: "",
      zone: "",
      status: false,
    },
    
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    cancreateArrondissement(){return this.hasAccess('CREER_ARRONDISSEMENT')},
    canUpdateArrondissement(){return this.hasAccess('MODIFIER_ARRONDISSEMENT')},
    canDeleteArrondissement(){return this.hasAccess('SUPPRIMER_ARRONDISSEMENT')},
    canViewDetailsArrondissement(){return this.hasAccess('CONSULTER_ARRONDISSEMENT')},
    canActiveArrondissement(){return this.hasAccess('ACTIVER_ARRONDISSEMENT')},
    canDesactiveArrondissemnt(){return this.hasAccess('DESACTIVER_ARRONDISSEMENT')},
    canImportArrondissemnt(){return this.hasAccess('IMPORT_ARRONDISSEMENT')},

    
    filteredDep() {
      return this.optionsDepartement.filter((dep) =>
        dep.nom.toLocaleLowerCase().includes(this.searchdep.toLocaleLowerCase())
      )
    },
    paginatedDep() {
      return this.filteredDep.slice(this.offsetdep, this.limitdep + this.offsetdep)
    },
    hasNextPageDep() {
      const nextOffset = this.offsetdep + this.limitdep
      return Boolean(
        this.filteredDep.slice(nextOffset, this.limitdep + nextOffset).length
      )
    },
    hasPrevPageDep() {   
      const prevOffset = this.offsetdep - this.limitdep
      return Boolean(
        this.filteredDep.slice(prevOffset, this.limitdep + prevOffset).length
      )
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

  filterList() {
    this.search.depart = this.search.depart.libelle;
    this.search.region = this.search.region.libelle;   
    this.search.status = this.status == 'accepted' ? true : false;

    console.log("============================");
    console.log(this.search);
    console.log("============================");
  },

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
  onSearchdep(query) {
        this.searchdep = query
        this.offsetdep = 0
    },

 },
 

  mounted(){
    this.getArrondissements();
  }
  }

</script>
<style scoped>
.position_absolute{
  position: absolute;
  top: 20px;
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }
</style>