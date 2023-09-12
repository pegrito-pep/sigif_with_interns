<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
            <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
            </div>
         
              <b-card class="b-card">
                <div class="d-flex">
                  <h2 class="h2">Rendement matière</h2>
                  <b-button   size="sm" 
                    class="mx-2 mt-2 simple-btn"><b-img  src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Réinitialiser</b-button>
                  <b-button :disabled="submitted"  size="sm" @click.prevent="showRendement" class="mx-2 mt-2 simple-btn">
                    <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                    <b-img  src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Visualiser
                  </b-button>
                </div>
                <b-row class="w-75 d-flex justify-content-center">
                  <b-col cols="4">
                      <span class="font-weight-bold" style="color: #333333; display: flex; justify-content: end;">Entité Forrestière</span>
                  </b-col>
                  <b-col cols="6">
                      <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  :reduce="entite => entite.idorganisation" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                          <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                        </li>
                      </v-select>
                      <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>                                                                                   
                  </b-col>
                </b-row>
                <b-row class="w-75 mt-1 pt-2 d-flex justify-content-center">
                  <b-col cols="4">
                      <span class="font-weight-bold" style="color: #333333; display: flex; justify-content: end;">Unité de transformation</span>
                  </b-col>
                  <b-col cols="6">
                    <v-select @input="getLignesUtbs" :options="paginatedUtbs" v-model="search.siteUtb" @search="onSearchUtb" label="INTITULE" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageUtbs" @click="offsetUtbs -= limitUtbs">Prèc.</button>
                          <button :disabled="!hasNextPageUtbs" @click="offsetUtbs += limitUtbs">Suiv.</button>
                        </li>
                    </v-select>                                                                                   
                  </b-col>
                </b-row>
                
                <b-row class="w-75 mt-1 pt-2 d-flex justify-content-center">
                  <b-col cols="4">
                      <span class="font-weight-bold" style="color: #333333; display: flex; justify-content: end;">Ligne de production</span>
                  </b-col>
                  <b-col cols="6">
                    <v-select :disabled="siteselected" :options="paginatedLignes" v-model="search.ligne" @search="onSearchLigne" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageLigne" @click="offsetLigne -= limitLigne">Prèc.</button>
                          <button :disabled="!hasNextPageLigne" @click="offsetLigne += limitLigne">Suiv.</button>
                        </li>
                    </v-select>                                                                                   
                  </b-col>
                </b-row>
                <b-row class="w-75 mt-1 pt-2 d-flex justify-content-center">
                  <b-col cols="4">
                      <span class="font-weight-bold" style="color: #333333; display: flex; justify-content: end;">Date allant du</span>
                  </b-col>
                  <b-col cols="6">
                    <input type="date" class="sigif-input-date" v-model="search.dateDebut">
                    <span class="font-weight-bold mx-2"> au</span>
                    <input type="date" class="sigif-input-date" v-model="search.dateFin">
                  </b-col>
                </b-row>
                              
                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
               
                  </div>
                </b-row>
                
              </b-card>
          
          </div> 
      </b-overlay>
      <div v-if="elements.length>0">
        <h4 style="width:46%" class="d-flex justify-content-end">récapitulatif du résultat</h4>
        <b-table style="font-size:5rem" stacked :items="elements"></b-table>
      </div>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>

    </div>
  </template>

<script>
  const php  = require ( 'phpjs' ) ;
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
  
  import { mapGetters } from 'vuex'
export default {
  name: "RENDEMENT_MATIERE",
  components:{
    CodeBarreInfo
  },
  data: () => ({
    submitted:false,
    showOverlay:false,
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
    elements:[],
    sitesUtbs:[],
    searchsite:'',
    offsetUtbs:0,
    limitUtbs:10,

    lignes:[],
    searchligne:'',
    offsetLigne:0,
    limitLigne:10,
    entite:{
      idorganisation:'',
      libelle:''
    },

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
        { key: 'index', label: '' },
        { key: 'arreteno', label: 'Arrêté no' },
        { key: 'datesig', label: 'Date signature' },
        { key: 'dateeff', label: 'Date effect' },
    ],
    elements: [
      // { arreteno: '54541', datesig: '12/01/2012', dateeff: '12/01/2013', },
      // { arreteno: '54541', datesig: '12/01/2012', dateeff: '12/01/2013', },
      // { arreteno: '54541', datesig: '12/01/2012', dateeff: '12/01/2013', },
      // { arreteno: '54541', datesig: '12/01/2012', dateeff: '12/01/2013', },
      // { arreteno: '54541', datesig: '12/01/2012', dateeff: '12/01/2013', },
    ],

    selected:{},

    // Données de la rechercche
    search: {
      entite:'',
      siteUtb:'',
      ligne:'',
      dateDebut:"",
      dateFin:""
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
   
  }),
  computed:{
    filteredLignes() { 
      return this.lignes.filter((ligne) =>
        ligne.intitule.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
      )
    },
    paginatedLignes() {
      return this.filteredLignes.slice(this.offsetLigne, this.limitLigne + this.offsetLigne)
    },
    hasNextPageLigne() {
      const nextOffset = this.offsetLigne + this.limitLigne
      return Boolean(
        this.filteredLignes.slice(nextOffset, this.limitLigne + nextOffset).length
      )
    },
    hasPrevPageLigne(){   
      const prevOffset = this.offsetLigne - this.limitLigne
      return Boolean(
        this.filteredLignes.slice(prevOffset, this.limitLigne + prevOffset).length
      )
    },
    siteselected(){
      return(php.empty(this.search.siteUtb))
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
    filteredUtbs() { 
      return this.sitesUtbs.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase())
      )
    },
    paginatedUtbs() {
      return this.filteredUtbs.slice(this.offsetUtbs, this.limitUtbs + this.offsetUtbs)
    },
    hasNextPageUtbs() {
      const nextOffset = this.offsetUtbs + this.limitUtbs
      return Boolean(
        this.filteredUtbs.slice(nextOffset, this.limitUtbs + nextOffset).length
      )
    },
    hasPrevPageUtbs(){   
      const prevOffset = this.offsetUtbs - this.limitUtbs
      return Boolean(
        this.filteredUtbs.slice(prevOffset, this.limitUtbs + prevOffset).length
      )
    },

    filteredEntites() {
      return this.entiteswithoutminfof.filter((entite) =>
        entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
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
  showRendement(){
    this.submitted =true;
    this.$transformation.post('rendements', {
      entite:this.isMinfof?this.search.entite.idOrganisation:this.entite.idOrganisation,
      siteUtb:this.search.siteUtb.IDSITEOPER,
      ligne:this.search.ligne.idligne,
      dateDebut:this.search.dateDebut,
      dateFin:this.search.dateFin
    }).then(response => {
      console.log('response ',response);
        this.submitted = false 
        this.elements=response.data.result.Rendement
        if(this.elements.length==0){
          this.notifNoData('Aucun résultat obtenu')
        }
    }).catch(error => {
        console.log('entrée dans le catch');
        this.submitted = false
        this.errorHappened(error)
    })
  },
  async notifNoData(message){
    const ok = await this.$refs.codebarreinfo.show({
      title: 'Information',
      message: message,
    })
    //If you throw an error, the method will terminate here unless you surround it wil try/catch
    if (ok) {
        this.$refs.codebarreinfo._close();
    } else {
      this.$refs.codebarreinfo._close();
    }
  },
  async getLignesUtbs(){
        this.showOverlay=true;
        try {
          this.lignes = await this.$transformation.get("lignes-transformation/raw?siteUtb="+this.search.siteUtb.IDSITEOPER).then(response => response.data.result.Items);
          console.log('lignes ',this.lignes);
        // this.$store.dispatch('lignes', this.lignes)
        } catch (error) {
          console.log(error.message);
        }
        this.showOverlay=false;
      },
  async getInitialData(){
    this.showOverlay=true;
    if(this.isMinfof){
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
    }
    try {
    
          this.sitesUtbs= await this.$donneesReference.get("sites/utb").then(response => response.data.result);
          console.log('utbs ',this.sitesUtbs);
        } catch (error) {
          App.notifyError(error.message);
        }
      this.showOverlay=false;
  },
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
    this.getValeurFob()
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
  onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
  },
  onSearchUtb(query){
      this.searchsite = query
      this.offsetUtbs = 0
  },
  onSearchLigne(query){
    this.searchligne = query
    this.offsetLigne = 0
  },
 },
 

  mounted(){
    this.entite.libelle=this.user.profil.organisation
    this.entite.idorganisation=this.user.idOrganisation
    this.getInitialData();
  }
  }

</script>
<style scoped>
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

.sigif-input-date{
  width: 45%;
  height: 26px;
  padding: 1px 3px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
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