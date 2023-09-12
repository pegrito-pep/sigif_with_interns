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
                    <sigif-form-group v-model="search.essence"  :label-cols="6" :label-cols-lg="3"  label="Intitulé"/>
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
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des essences</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateEssence" @click.prevent="addEssence" size="sm" :class="{'change-image-opacity': !canCreateEssence,  'not-change-image-opacity': canCreateEssence}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateEssence" size="sm" :class="{'change-image-opacity': !canUpdateEssence,  'not-change-image-opacity': canUpdateEssence}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateEssence}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteEssence" size="sm" :class="{'change-image-opacity': !canDeleteEssence,  'not-change-image-opacity': canDeleteEssence}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteEssence}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canViewDetailsEssence" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsEssence,  'not-change-image-opacity': canViewDetailsEssence}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsEssence}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canActiveEssence" size="sm" :class="{'change-image-opacity': !canActiveEssence,  'not-change-image-opacity': canActiveEssence}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canActiveEssence}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>Activer</b-button>
                <b-button :disabled="!canDesactiveEssence" size="sm" :class="{'change-image-opacity': !canDesactiveEssence,  'not-change-image-opacity': canDesactiveEssence}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDesactiveEssence}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Desactiver</b-button>
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
                  <template #cell(intexploitation)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <span v-if="data.item.intexploitation=='true'"><b-img src="@/assets/images/picto_check_vert.png"></b-img></span>
                          <span v-else><b-img src="@/assets/images/picto_croix_rouge.png"></b-img></span>
                      </div>
                      
                  </template>
                  <template #cell(actif)="data">
                      <span v-if="data.item.invalide !=='true'"><b-img src="@/assets/images/picto_check_vert.png"></b-img></span>
                      <span v-else><b-img src="@/assets/images/picto_croix_rouge.png"></b-img></span>
                  </template>
                  <template #cell(intexportgrume)="data">
                    <div class="d-flex justify-content-center align-items-center">
                      <span v-if="data.item.intexportgrume=='true'"><b-img src="@/assets/images/picto_check_vert.png"></b-img></span>
                      <span v-else><b-img src="@/assets/images/picto_croix_rouge.png"></b-img></span>
                    </div>
                      
                  </template>
                 
                 
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

            <!--AJOUT D'UNE ESSENCE -->
          <b-modal id="essence-form"  ref="essence-form"  hide-footer header-class="custom-bg" body-class="light" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div> 
              </template>
              <div>
                  <essence-form :action="action" :title="title" @essenceAdded="handleAddEssence" @essenceAddedAndContinue="handleAddEssenceAndContinue"/>
              </div>
          </b-modal>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   
   import EssenceForm from "@/components/forms/EssenceForm.vue";

  import { mapGetters } from 'vuex'
export default {
  name: "essence",
  components:{
    EssenceForm,
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
        libelle:'Mfoundi'
      },
      { 
        id:2,
        libelle:'Mbam'
      },
      { 
        id:3,
        libelle:'Lékié'
      }
    ],

    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'catEssence', label: 'Catégorie essence' },
        { key: 'nomusuel', label: 'Nom commercial' },
        { key: 'nomscientifique', label: 'Nom scientifique' },
        { key: 'codesh', label: 'C. SH',thStyle: { width: "5%" } },
        { key: 'codedouanier', label: 'C. douanier' },
        { key: 'codecemacgrume', label: 'C. CEMAC grume' },
        { key: 'codecemacdebite', label: 'C. CEMAC débité' },
        { key: 'codeminfof', label: 'C. MINFOF' },
        { key: 'dme', label: 'DME' },
        { key: 'intexportgrume', label: 'I. Export grume' },
        { key: 'actif', label: 'Actif' },
        { key: 'intexploitation', label: 'I. à Exploitation' },
        { key: 'quotas', label: 'Quota' },
     ],
    elements: [
    ],

    selected:{},

    // Données de recherche
    search: {
      essence: "",
    },

      
    /*propriétes lie a lajout dune essence */
    title:"Ajout d'une essence",
    action:"add",

  }),
  
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateEssence(){ return true; return this.hasAccess('CREER_ESSENCE')},
    canUpdateEssence(){return this.hasAccess('MODIFIER_ESSENCE')},
    canDeleteEssence(){return this.hasAccess('SUPPRIMER_ESSENCE')},
    canViewDetailsEssence(){return this.hasAccess('CONSULTER_ESSENCE')},
    canActiveEssence(){return this.hasAccess('ACTIVER_ESSENCE')},
    canDesactiveEssence(){return this.hasAccess('DESACTIVER_ESSENCE')},

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
     addEssence(){
      this.action="add"
      this.title="Ajout d'une essence"
     this.$refs['essence-form'].show()
   },

   showDetails(){ this.$router.push({name: 'details-essences'})},

   filterList() {
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
    handleAddEssence(){
      this.getEssence();
      this.$bvModal.hide('essence-form')
    },
    handleAddEssenceAndContinue(){
      this.$bvModal.hide("essence-form");
      this.getUsers();
      setTimeout(() => {this.$bvModal.show("essence-form"); }, 500);
    },

    



    onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
          this.selected = items
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
      this.getEssence()
    },
    getEssence(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("essences", {params}).then(response => {
          console.log("=================== Données de reference / essences  ==================");
          console.log(response.data.result.items);
          console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        this.elements = this.elements.map(elt =>{
            elt.catEssence = elt.catEssence.libelle
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
    this.getEssence();
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