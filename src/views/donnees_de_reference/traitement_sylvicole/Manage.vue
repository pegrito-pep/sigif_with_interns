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
                  <b-col class="b-col" cols="4">
                    <sigif-form-group v-model="search.nomtraitement"  :label-cols="6" :label-cols-lg="3" :reduceSize="largeur"  label="Nom traitement"/>
                  </b-col>
                  <b-col class="b-col" cols="2">
                    <sigif-form-group v-model="search.code" :label-cols="8" :label-cols-lg="6" label="Code"/>
                  </b-col>
                  <b-col cols="3" class="b-col">
                       <div class="d-flex mb-4" style="width: 80px">
                          <b-col><label for="">Actif</label></b-col>
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
                <b-row class="position_absolute">
                  <div class="search-bar-btn-group">
                    <b-col>
                      <b-button class="search-bar-btn" @click.prevent="filterList" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
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
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Traitements sylvicoles</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateTraitementSyvicoles"  @click.prevent="addTraitement" size="sm" :class="{'change-image-opacity': !canCreateTraitementSyvicoles,  'not-change-image-opacity': canCreateTraitementSyvicoles}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateTraitementSyvicoles" size="sm" :class="{'change-image-opacity': !canUpdateTraitementSyvicoles,  'not-change-image-opacity': canUpdateTraitementSyvicoles}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateTraitementSyvicoles}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteTraitementSyvicoles" size="sm" :class="{'change-image-opacity': !canDeleteTraitementSyvicoles,  'not-change-image-opacity': canDeleteTraitementSyvicoles}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteTraitementSyvicoles}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canViewDetailsTraitementSyvicoles" size="sm" :class="{'change-image-opacity': !canViewDetailsTraitementSyvicoles,  'not-change-image-opacity': canViewDetailsTraitementSyvicoles}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsTraitementSyvicoles}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canActiveTraitementSyvicoles" size="sm" :class="{'change-image-opacity': !canActiveTraitementSyvicoles,  'not-change-image-opacity': canActiveTraitementSyvicoles}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canActiveTraitementSyvicoles}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>Activer</b-button>
                <b-button :disabled="!canDesactiverTraitementSyvicoles" size="sm" :class="{'change-image-opacity': !canDesactiverTraitementSyvicoles,  'not-change-image-opacity': canDesactiverTraitementSyvicoles}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDesactiverTraitementSyvicoles}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Desactiver</b-button>
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
                  <h4 style="color: green" class="text-center">
                    Aucune
                    <span class="font-weight-bold"> donnée</span> trouvée!!
                  </h4>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          
             <!--AJOUT D'UN traitement sylvicole -->
          <b-modal id="site-form"  ref="traitement-form"  hide-footer
           header-class="custom-bg"
           body-class="light"
           header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <traitement-form :action="action" :title="title" @traitementadded="handleAddTraitement" @traitementaddedandcontinue="handleAddTraiementAndContinue"/>
              </div>
          </b-modal>
    </div>

</template>


    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  // import { mapGetters } from 'vuex'
  import traitementForm from "@/components/forms/traitementForm.vue";

  import { mapGetters } from 'vuex'
export default {
  name: "traitement_sylvicole",
  components:{
    traitementForm,
  },
  data: () => ({
    // checkbox
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
    largeur:"w-75",
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
        { key: 'codetravsyl', label: 'Code' },
        { key: 'nomtraitement', label: 'Nom traitement' },
       
        { key: 'actif', label: 'Actif' },
       
     

    ],
    elements: [],
    selected:{},
    // Données de recherche
    search:{
      nomtraitement: '',
      code: '',
      status: false,
    },
    
    /*propriétes lies au traitement d'une operation de parc */
    
    /*propriétes lies au traitement d'une operation de parc */
    title:"Ajout d'un traitement sylvivole",
    action:"add"
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateTraitementSyvicoles(){ return true; return this.hasAccess('CREER_TRAITEMENTS_SYVICOLES')},
    canUpdateTraitementSyvicoles(){return this.hasAccess('MODIFIER_TRAITEMENTS_SYVICOLES')},
    canDeleteTraitementSyvicoles(){return this.hasAccess('SUPPRIMER_TRAITEMENTS_SYVICOLES')},
    canViewDetailsTraitementSyvicoles(){return this.hasAccess('CONSULTER_TRAITEMENTS_SYVICOLES')},
    canActiveTraitementSyvicoles(){return this.hasAccess('ACTIVER_TRAITEMENTS_SYVICOLES')},
    canDesactiverTraitementSyvicoles(){return this.hasAccess('DESACTIVER_TRAITEMENTS_SYVICOLES')},

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
    addTraitement(){
      this.title="Ajout d'un traitement sylvivole"
      this.action="add"
      this.$refs['traitement-form'].show()
   },
    filterList() { 
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
    handleAddTraitement(){
      this.getTraitementSylvicole();
      this.$refs['traitement-form'].hide()
    },
    handleAddTraiementAndContinue(){
      this.$refs['traitement-form'].hide();
      this.getTraitementSylvicole();
      setTimeout(() => {this.$refs['traitement-form'].show(); }, 500);
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
    this.getTraitementSylvicole()
  },
  getTraitementSylvicole(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("traitements-sylvicoles", {params}).then(response => {
          console.log("=================== Données de reference ==================");
          console.log(response.data.result.items);
          console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
          // elt.continent=elt.continent.libelle
          // elt.estcemac = elt.estcemac == 1 ? true : false

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
    this.getTraitementSylvicole();
  }
  }

</script>
<style>
  .custom-bg {
    background: rgb(0, 82, 44) !important;
  }
</style>
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

</style>