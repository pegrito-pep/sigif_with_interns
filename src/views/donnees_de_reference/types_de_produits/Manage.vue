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

                  <b-col cols="4" >
                    <sigif-form-group :sizeLabel="6" :sizeLabelLg="5" label="Nom commercial"/>
                    <sigif-form-group :sizeLabel="6" :sizeLabelLg="5" label="Intitulé du type produit"/>
                  </b-col>
                  <b-col cols="3">
                    <sigif-form-group class="pl-3" :sizeLabel="6" :sizeLabelLg="5" label="Type produit"/>
                    <sigif-form-group class="pl-3" :sizeLabel="6" :sizeLabelLg="5" label="Code produit"/>
                  </b-col>
                  
                  
                  
                  
                </b-row>
                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
                    
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                    </b-col>
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">Liste des types de produits </h4></b-col>
              <b-col class="col-md-auto">
                <span >
                <b-button :disabled="!canCreateTypeProduit" size="sm" @click.prevent="addTypeProduit" class="mx-1 simple-btn" :class="{'change-image-opacity': !canCreateTypeProduit, 'not-change-image-opacity': canCreateTypeProduit}"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>créer</b-button>
                </span>
                <span >
                <b-button @click.prevent="" :disabled="!canUpdateTypeProduit" size="sm" :class="{'change-image-opacity': !canUpdateTypeProduit,  'not-change-image-opacity': canUpdateTypeProduit}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateTypeProduit}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteTypeProduit" size="sm" :class="{'change-image-opacity': !canDeleteTypeProduit,  'not-change-image-opacity': canDeleteTypeProduit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteTypeProduit}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canviewDetailsTypeProduit" size="sm" :class="{'change-image-opacity': !canviewDetailsTypeProduit,  'not-change-image-opacity': canviewDetailsTypeProduit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canviewDetailsTypeProduit}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="mx-1">
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
                 <template #cell(invalide)="data"> 
                  <span v-if="!data.item.invalide" style="font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                  <span v-else><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
            <!--AJOUT D'UN type produit -->
          <b-modal id="modal-sm"  ref="typeproduit-form" hide-footer  header-class="custom-bg" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <TypeProduitForm />
              </div>
          </b-modal>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TypeProduitForm from "@/components/forms/TypeProduitForm.vue";

  import { mapGetters } from 'vuex'
export default {
  name: "typeproduit",
  components:{
    TypeProduitForm,
  },
  data: () => ({
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
        { key: 'idproduit', label: 'Code du produit' },
        { key: 'typeProduit', label: 'Type de produit' },
        { key: 'intitule', label: 'Intitulé du produit' },
        { key: 'continent', label: 'Nom commercial' },
        { key: 'description', label: 'Description' }, 
        { key: 'invalide', label: 'Actif' },
     

    ],
    elements: [],

    selected:{},
    
      
    /*propriétes lies au traitement d'une operation de parc */
    title:"Enregistrement d'un produit"
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateTypeProduit(){ return true; return this.hasAccess('CREER_TYPE_PRODUIT')},
    canUpdateTypeProduit(){return this.hasAccess('MODIFIER_TYPE_PRODUIT')},
    canDeleteTypeProduit(){return this.hasAccess('SUPPRIMER_TYPE_PRODUIT')},
    canViewDetailsTypeProduit(){return this.hasAccess('CONSULTER_TYPE_PRODUIT')},

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
   addTypeProduit(){
     this.$refs['typeproduit-form'].show()
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
    this.getTypeProduit()
  },
getTypeProduit(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("produits", {params}).then(response => {
          console.log("=================== Données de reference ==================");
          console.log(response.data.result.items);
          console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
          elt.continent=elt.continent.libelle
          elt.estcemac = elt.estcemac == 1 ? true : false

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
    this.getTypeProduit();
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
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>