<template>
    <div id="cover" class="min-vh-100">
          <div>
               <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar">
                    <span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button>
                  <span
                    class="ml-1 font-weight-bold"
                  >Consultation quittances DF10 {{ }}</span>
                </h4>
              </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor:pointer">
                    <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                  </a>
                </span>
              </b-col>
            </b-row>
        
                <!-- <b-col class="mt-3"><h4 class="tab-header-left-text mt-3">Consultation quittances DF10</h4></b-col> -->
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row class="align-item-center d-flex justify-content-center ">
                    <div  class="d-flex align-items-center justify-content-center p-5 bg-white ml-4">

                    <b-col class="" cols="6">

                        <h6 class="mt-3">No Quittance:</h6><br>
                       
                          <h6>Date quittance :</h6><br>
                           <h6>Montant:</h6><br>
                           
                             <h6>Joindre quitance:</h6>
                        
                      
                        
                    </b-col>
                  <b-col class="b-col" cols="7">
                     <h6><strong>222</strong></h6><br>
                       
                          <h6 ><strong>01/07/2022 </strong><i class="fa fa-calendar mt-1" aria-hidden="true"></i></h6><br>
                           <h6 ><strong>50.000 FCFA</strong></h6><br>
                          
                             <h6 ><strong>Quitance.pdf</strong></h6>
                   
                  </b-col>

                  </div>
                  
                  <b-col cols="2" class="b-col">
                    
                  </b-col>
                  
                </b-row>
                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
                    
                    <b-col>
                    
                    </b-col>
                    <b-col>
                     
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          
         
          <!--implémentation tableau proprement dite-->
          

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
  name: "quittance_lv",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
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
        { key: 'numquittance', label: 'N° quittance' },
        { key: 'datequittance', label: 'Date quittance FSDF' },
        { key: 'ficheQuittance', label: 'Fichier Quittance' },
        { key: 'montant', label: 'Montant' },
        { key: 'nombrelv', label: 'Nombre de LV' },
        { key: 'statut', label: 'Statut' },
    ],
    elements: [],
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
   fermer() {
      this.$router.push({ name: "quittance_df10" });
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
    this.getQuittanceLv()
  },
  getQuittanceLv(){
    this.isBusy =true
    const params = this.getRequestParams(
       this.currentPage,
       this.pageSize
       );
     this.$fiscalite.get("quittances-lv", {params}).then(response => {
           console.log("=================== Données de reference / arrondissements ==================");
         console.log(response.data.result.items);
          console.log("===========================================================");
         this.total = response.data.result.totalItems
         this.currentPage = response.data.result.currentPage + 1
         this.elements=response.data.result.items

          this.elements = this.elements.map(elt =>{
            elt.datequittance = elt.dateQuittanceLv !==null ? this.$dayjs(elt.dateQuittanceLv).format('DD MMMM YYYY') :""
           return elt
         })
 	     this.isBusy=false
         setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
     })
       .catch((error) => {
         console.log(error)
         this.isBusy=false
       });

  }

 },
 

  mounted(){
    this.getQuittanceLv();
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