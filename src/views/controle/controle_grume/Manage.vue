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
          <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Rechercher</li></ul>  </b-button>
        </div>
        <b-collapse id="collapse-4" v-model="visible">
          <b-card class="b-card">
                 <b-row>
                  <b-col cols="3">
                    <b-form-group label="date début">
                      <calendar v-model="search.datedebut" :format="format" :clear-button="clearfin" :placeholder="placeholderdebut" :pane="1"></calendar>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group label="date de fin">
                      <calendar v-model="search.datefin" :format="format" :clear-button="clearfin" :placeholder="placeholderdfin" :pane="1"></calendar>
                    </b-form-group>
                  </b-col>
                  <b-col cols="5">
                    <div>
                      <label for="" class="m-1 p-0">Entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </div>
                  </b-col>
                  </b-row>
              <b-row align-h="end">
                <b-col cols="2" class="mr-2">
                    <search-bar-actions-buttons-new @search="filterTable" @reset="reset"/>
                </b-col>
              </b-row>
            
          </b-card>
        </b-collapse>
      </div>

          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des contrôles de grumes</h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>
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
                <template #empty>
                  <h4 style="color: green" class="text-center">
                    Aucun
                    <span class="font-weight-bold">résultat</span> trouvé!!
                  </h4>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import Calendar from 'vue2-slot-calendar';
  import { mapGetters } from 'vuex'
export default {
  name: "controle_grume",
  components:{
    Calendar
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
    
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'idcontrGrume', label: 'N° Controle' },
        { key: 'datecontrole', label: 'Date controle' },
        { key: 'entite', label: 'Entité forrestière',thStyle: { width: "35%" } },
        { key: 'lieucontrole', label: 'Lieu de Controle' }
    ],
    elements: [
    ],
    selected:{},
    
    /*propriétes lies à l'implémentation de la recherche */
    search:{
      entite:"",
      datedebut:"",
      datefin:"", 
    },
    entite:{
      id:1,
      libelle:''
    },
    format:"yyyy-MM-dd",
    cleardebut:true,
    clearfin:true,
    placeholderdebut:"date de début",
    placeholderdfin:"date de fin",
    value:"",
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
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
    this.getControleGrumes()
  },
 getControleGrumes(){
    this.isBusy =true
    const params = this.getRequestParams(
       this.currentPage,
       this.pageSize
       );
     this.$controle.get("controles-grumes", {params}).then(response => {
           console.log("=================== Données controle / controles grumes ==================");
         console.log(response.data.result.items);
          console.log("===========================================================");
         this.total = response.data.result.totalItems
         this.currentPage = response.data.result.currentPage + 1
         this.elements=response.data.result.items

          this.elements = this.elements.map(elt =>{
            elt.entite=this.user.profil.organisation;
            elt.datecontrole = elt.datecontrole !==null ? this.$dayjs(elt.datecontrole).format("DD/MM/YYYY") :""
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
  filterTable() {
    console.log('entrée recherche', this.search);
    this.search.datedeb=this.search.datedebut
    this.isBusy=true
    this.$controle.post("controles-grumes/search", this.search).then((response) => {
      console.log('réponse', response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        this.elements = this.elements.map(elt =>{
          elt.datecontrole = elt.datecontrole !==null ? this.$dayjs(elt.datecontrole).format("DD/MM/YYYY") :""
          return elt
        })
        storage.set(this.$route.path ,JSON.stringify(this.search))
        this.isBusy=false
      })
      .catch((error) => {
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
  resetSearcheBar(){
    this.search = {
      entite:"",
      datedebut:"",
      datefin:"", 
    }
    storage.remove(this.$route.path)  
  },
  reset(){
    this.resetSearcheBar()
    this.getControleGrumes()
  },

 },
 mounted() {
    this.entite.libelle = this.user.profil.organisation;
    if (
      JSON.parse(
        storage.get(this.$route.path) !== "" &&
          JSON.parse(storage.get(this.$route.path) !== null)
      )
    ) {
      this.search = JSON.parse(storage.get(this.$route.path));
      this.filterTable();
    } else {
      this.getControleGrumes();
    }
    if (this.entite.libelle !== "MINFOF") {
      this.disabled = true;
    }
  },
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