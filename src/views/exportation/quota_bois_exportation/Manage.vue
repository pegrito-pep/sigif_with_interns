<template>
    <div id="cover" class="min-vh-100">
          <div class="m-0 p-0">
            <div>
              <div class="d-flex" style="align-items:center">
                <button id="toggleSideBar" @click="toggleSideBar">
                  <i class="fa fa-arrow-left" style="font-size: 18px"></i>
                </button>
                <b-button
                    :class="visible ? null : 'collapsed'"
                      :aria-expanded="visible ? 'true' : 'false'"
                      aria-controls="collapse-4"
                  @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                  <ul>
                    <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">
                    </li>
                  </ul>
              </b-button>
              <h4 style="font-weight:bold">Rechercher</h4>
              </div>
              <b-collapse id="collapse-4" v-model="visible">
                <b-card class="b-card">
                  <b-row class="mt-0">
                      <b-col cols="3">
                        <b-form-group class="p-0 m-0"
                          label-align="right"
                          label-cols="6"
                        >
                        <template #label>
                          <div class="label-form">
                            <span class="label-form">Type de produit</span>
                          </div>
                        </template>
                          <select style="height: calc(1em + .300rem + 1px) !important" size="sm">
                            <option value=""></option>
                            <option value="gr">Grume</option>
                            <option value="d">Débité</option>
                            <option value="ps">Produits spéciaux</option>
                          </select>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                          label-align="right"
                          label-cols="6"
                        >
                        <template #label>
                          <div class="label-form">
                            <span class="label-form">Date de la signature</span>
                          </div>
                        </template>
                        <input type="date" style="height: calc(1em + .500rem + 1px) !important;width:100%;" />
                        </b-form-group>

                        <b-overlay :show="showOverlay" rounded="sm">
                          <template #overlay>
                            <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p>Chargement...</p>
                          </div>
                          </template>
                          <b-form-group class="p-0 m-0"
                            label-align="right"
                            label-cols="6"
                          >
                          <template #label>
                            <div  class="label-form">
                              <span>Entité forestière</span>
                            </div>
                          </template>
                          <v-select @open="getEntities" v-model="entite" label="intitule" :options="paginated" class="custom-select-type_titre"
                            :filterable="false" @search="onSearch"
                          >
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPage" @click="offsetEntities-=limit">Prev</button>
                              <button :disabled="!hasNextPage" @click="offsetEntities+=limit">Prev</button>
                            </li>
                          </v-select>
                          </b-form-group>
                      </b-overlay>
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
                <b-col><h4 class="tab-header-left-text">
                  <!-- <b-img src="@/assets/images/picto_user_vert.png"></b-img>  -->
                  Liste des Quotas de bois à l'exportation</h4></b-col>
                 <b-col class="col-md-auto">
                  <a :disabled="canCreateQuota" @click.prevent="addQuota" size="sm" :class="{'change-image-opacity': !canCreateQuota,  'not-change-image-opacity': canCreateQuota}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                  <span >
                    <!-- <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a> -->
                  <!-- <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a> -->
                  <a @click.prevent="showDetailsCertificat" :disabled="canViewDetailsCertificat" size="sm" :class="{'change-image-opacity': !canViewDetailsCertificat,  'not-change-image-opacity': canViewDetailsCertificat}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsCertificat}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  <!-- <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a> -->
                  <!-- <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a> -->
                  <!-- <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a> -->
                  </span>
                  
                </b-col> 
              </b-row>
            </div>
            <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" >
                <template #empty>
                      <h4 style="color:green" class="text-center">Aucun quota de bois <span class="font-weight-bold">à Exportation</span> trouvé</h4>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(statut)="data">
                      <span v-if="data.item.statut==0"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(volumeattribuer)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.volumeattribuer }} </span> 
                </template>

                
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />
          </div>

            <!--FORM AJOUT D'UN QUOTA DE BOIS-->
            <b-modal ref="quotabois-form" hide-footer  header-class="custom-bg" header-text-variant="light" no-close-on-backdrop>
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
              </template>
              <div>
                  <quota-bois-form @quotaAdded="handleQuotaAdded"  :action="action"/>
              </div>
            </b-modal>
    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import QuotaBoisForm from "@/components/forms/Exportations/QuotaBoisForm.vue";
  import { mapGetters } from 'vuex'
export default {
  name: "quotas_bois_exportation",
  components:{
    QuotaBoisForm,
  },
  data: () => ({
    action:"add",
    title:"Enregistrement des Quotas",
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
        { key: 'numero', label: 'Numéro',thStyle:{color:'green'} },
        { key: 'nomcommertiale', label: 'Nom commercial',thStyle:{color:'green'} },
        { key: 'libelletypeproduit', label: 'Type de Produit',thStyle:{color:'green'} },
        { key: 'intituleorg', label: 'Entité forestière',thStyle:{color:'green'}  },
        { key: 'sigle', label: 'SIGLE',thStyle:{color:'green'} },
        { key: 'exercice', label: 'Exercice',thStyle:{color:'green'} },
        { key: 'volumeattribuer', label: 'Volume attribué',thStyle:{color:'green'} },
        { key: 'datattributiion', label: 'Date attribution',thStyle:{color:'green'} }, 
        { key: 'datefinvalid', label: 'Date fin validité',thStyle:{color:'green'} },
        { key: 'statut', label: 'Statut',thStyle:{color:'green'} },
        { key: 'nom_fichier', label: ' Nom du fichier',thStyle:{color:'green'} },
    ],
    elements: [],
    selected:{},
    showOverlay:false,
    options:[],
    entite:'',
    entitiesWithoutMINFOF:[],
    search: '',
    offsetEntities: 0,
    limit: 10,
  }),
  computed:{
    /*propriétés liées aux accèes*/
    canCreateQuota(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canViewDetailsCertificat(){return true},
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

    // TRAITEMENT DU V-SELECT
    filtered() {
      return this.entitiesWithoutMINFOF.filter((entity) =>
      entity.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetEntities, this.limit + this.offsetEntities)
    },
    hasNextPage() {
      const nextOffset = this.offsetEntities + this.limit
      return Boolean(
        this.filtered.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offsetEntities - this.limit
      return Boolean(
        this.filtered.slice(prevOffset, this.limit + prevOffset).length
      )
    },

     ...mapGetters(['user'])
  },

  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
 
 methods: {
  addQuota(){
    this.action="add";
     this.$refs['quotabois-form'].show();
  },
  handleQuotaAdded(){
    this.getQuotas();
    this.$refs['quotabois-form'].hide();
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
    this.getQuotas()
  },
  getQuotas(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    this.$exportations.get("QuotasExportes").then(response => {
          console.log("=================== Données de reference / arrondissements ==================");
          console.log(response.data.result.Items);
          console.log("===========================================================");
        this.total = response.data.result.totalselements
        this.currentPage = response.data.result.currentpage + 1
        this.elements=response.data.result.Items

        this.elements = this.elements.map(elt =>{
          elt.intituleorg = elt.intituleorg == null ? "" : elt.intituleorg.substring(0, 15) + '...'
          elt.datattributiion = this.$dayjs(elt.datattributiion).format('DD/MM/YYYY')
          elt.datefinvalid = this.$dayjs(elt.datefinvalid).format('DD/MM/YYYY')
          elt.nom_fichier = elt.fichier == null ? "" : elt.fichier.substring(0, 15) + '...'
          elt.status = elt.statutenr == 0 ? 'actif' :"inactif"

           return elt
        })
	     this.isBusy=false
      
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
  async getEntities(){
    // console.log('getentities')
    this.showOverlay=true
    if(!php.empty(this.$store.state.entiteswithoutminfof)){
      this.entitiesWithoutMINFOF=this.$store.state.entiteswithoutminfof
      console.log('getentities')
      this.showOverlay=false
    }else{
      try {
        await this.$donneesReference.get('entites/entite_forestier')
            .then(response => {
              this.entitiesWithoutMINFOF=response.data.result.Items
             console.log(this.entitiesWithoutMINFOF)
             this.$store.dispatch('entiteswithoutminfof',this.entitiesWithoutMINFOF)
          })
      } catch(error){
        // App.notifySuccess(error.message)
      }
      this.showOverlay=false
    }
  },
  onSearch(query) {
  this.search = query
  this.offsetEntities = 0
},
    
  },
  
  mounted(){
    this.getQuotas();
  }
  }

</script>
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>
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