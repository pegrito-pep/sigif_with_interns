<template>
    <div id="cover" class="min-vh-100">
        <b-overlay :show="isBusy" rounded="sm">
        
          <!--entete des tableaux -->
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col><h4 class="tab-header-left-text"> Liste des types de profil</h4></b-col>
                <b-col class="col-md-auto">
                  <span >
                    <a @click.prevent="setEditTypeProfil" :disabled="canUpdateTypeProfil" size="sm" :class="{'change-image-opacity': !canUpdateTypeProfil,  'not-change-image-opacity': canUpdateTypeProfil}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateTypeProfil}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="canViewDetailsTypeProfil" size="sm" :class="{'change-image-opacity': !canViewDetailsTypeProfil,  'not-change-image-opacity': canViewDetailsTypeProfil}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsTypeProfil}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  </span>
                  
                </b-col>
              </b-row>
              </div>
          <!--implémentation tableau proprement dite-->
          <div class="mx-1" style="width:70%">
              <b-table v-if="items.length >0" :busy="isBusy"  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
              </b-table>
          </div>
        </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from "vuex";
export default {
  name: "types-profils",
  components:{

    },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    showOverlay:false,
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
    allProfiles:[],

    //données du tableaux
    fields: [ { key: 'index', label: '',thStyle: { width: "2%" } }, { key: 'libelleTypeProfil', label: 'Intitulé',thStyle: { width: "60%" }, }],
    elements: [],

  }),
  computed:{
    ...mapGetters(['user', 'hasAccess']),
    /*propriétés liées aux accèes*/
    canUpdateTypeProfil(){ return true},
    canViewDetailsTypeProfil(){return true},

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
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  onRowSelected(item) {
    this.profil=item[0]
    item.isSelected =true;
    this.isRowselected=true
  },

  setEditProfil(){
    this.action="edit"
    this.editProfile=this.profil
    this.$bvModal.show('profil-form')},
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
      this.getProfils()
    },
   async getTyProfils(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      await this.$administration.get("types-profils", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.Items
        console.log('types de profil',this.elements);
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        this.isBusy=false
        if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          else if(error.response.data.status==403){
            return App.alertError('Vous n\'avez pas le droit de consulter cete page')
          }
        return App.alertError('Impossible de joindre le serveur')
      }
      );

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
 

  async mounted(){
    await this.getTyProfils();
    //await this.getTypesProfils()
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
  color:#82C138;
  cursor:pointer;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>