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
              <div style="padding-left: 10px;">
                <h4 class="h4-title">Type de titre</h4>
                <b-row>
                  <b-col cols="4">
                    <b-row>
                      <b-col cols="6">
                        <label>Renseigner le code barre</label>
                      </b-col>
                      <b-col>
                        <input type="text" class="default-old-system-input-properties"/>
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="6" style="margin-top: -7px;">
                    <b-row>
                      <b-col cols="3">
                        <b-button class="mx-1 simple-btn"><b-img src="@/assets/images/iconTRACABILITE_16x16.png"></b-img>&nbsp;Tracer</b-button>
                      </b-col>
                      <b-col cols="3">
                        <b-button class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Imprimer</b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </div>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
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
  name: "authenticite_document",
  components:{
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
    },
     ...mapGetters(['user'])
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

 },
 

  mounted(){
    this.getArrondissements();
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

.h4-title{
  font-weight: bolder;
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
  font-size: 0.8rem;
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

.default-old-system-input-properties{
    font-weight: normal;
    border-color: #637A95;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: White;
    color: #333333;
    border: 1px solid #637A95;
    padding: 1px 2px 1px 3px;
    margin: 1px;
    width: 170px;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'verdana';
    font-size: 13px;
    height: 20px;
}

</style>