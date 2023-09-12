<template>
    <div id="cover" class="min-vh-100">
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
                        <div  class="label-form">
                          <span>Numéro de Certificat</span>
                        </div>
                      </template>
                      <b-input style="height: calc(1em + .300rem + 1px) !important;width:250%" class="form-control p-1" size="sm">
                        </b-input>
                      </b-form-group>
                      <b-form-group class="p-0 m-0"
                        label-align="right"
                        label-cols="6"
                      >
                      <template #label>
                        <div class="label-form">
                          <span class="label-form">Type de produit</span>
                        </div>
                      </template>
                        <select style="height: calc(1em + .300rem + 1px) !important">
                          <option value=""></option>
                          <option value="g">Grume</option>
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
                        <b-form-group class="p-0 m-0"
                          label-align="right"
                          label-cols="6"
                        >
                          <template #label>
                            <div  class="label-form">
                              <span>Entité forestière</span>
                            </div>
                          </template>
                          <v-select class="custom-select-type_titre" :options="paginated" :filterable="false" @search="onSearch"
                            @open="getEntities" v-model="entite" label="intitule"
                            
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
                Liste des Certificats en qualité d'exportateurs</h4></b-col>
               <b-col class="col-md-auto">
                <a :disabled="canCreateUtilisateur" @click.prevent="addCertificat" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
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
                 <!-- <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template> -->
                <template #cell(status)>
                      <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
           <!--FORM AJOUT D'UN QUOTA DE BOIS-->
           <b-modal  ref="certificat-form" hide-footer  header-class="custom-bg" header-text-variant="light" no-close-on-backdrop>
            <template #modal-title>
              <div>
                <span class="font-weight-bold text-uppercase">{{ title }}</span>
              </div>
            </template>
            <div>
                <certificat-form @certificatAdded="handleCertificatAdded"  :action="action"/>
            </div>
          </b-modal>
    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import CertificatForm from "@/components/forms/Exportations/CertificatForm.vue";

  import { mapGetters } from 'vuex'
export default {
  name: "certificat_exportateur",
  components:{
    CertificatForm
  },
  data: () => ({
    title:"edition des certificats",
    action:'add',
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
        // { key: 'index', label: '' },
        { key: 'nro_certificat', label: 'Numéro du Certificat',thStyle:{color:'green'} },
        { key: 'year', label: 'Année',thStyle:{color:'green'} },
        { key: 'nro_enregistrement', label: 'Numéro d\'enregistrement',thStyle:{color:'green'} },
        { key: 'societe', label: 'Société / Organisation',thStyle:{color:'green'} },
        { key: 'sigle', label: 'SIGLE',thStyle:{color:'green'} },
        { key: 'type_permis', label: 'Type de permis',thStyle:{color:'green'} },
        { key: 'date_signature', label: 'Date de signature',thStyle:{color:'green'} },
        { key: 'status', label: 'Statut',thStyle:{color:'green'} },
        { key: 'nom_fichier', label: 'Nom du fichier',thStyle:{color:'green'} },
    ],
    elements: [
    ],

    selected:{},
    json:{
      data:{
        certificats:[
        {nro_certificat:'013/CQE/MINFOF',year:'2001',nro_enregistrement:'2000/CQE',societe:'BOIS LEGAL CAMEROUN',
          sigle:'BLC',type_permis:'Grume',date_signature:'05/01/2021',status:'Validé',nom_fichier:'certificat.jpg'},
        {nro_certificat:'013/CQE/MINFOF',year:'2001',nro_enregistrement:'2000/CQE',societe:'BOIS LEGAL CAMEROUN',
          sigle:'BLC',type_permis:'Grume',date_signature:'05/01/2021',status:'Validé',nom_fichier:'certificat.jpg'},
        {nro_certificat:'013/CQE/MINFOF',year:'2001',nro_enregistrement:'2000/CQE',societe:'BOIS LEGAL CAMEROUN',
          sigle:'BLC',type_permis:'Grume',date_signature:'05/01/2021',status:'Validé',nom_fichier:'certificat.jpg'},
        {nro_certificat:'013/CQE/MINFOF',year:'2001',nro_enregistrement:'2000/CQE',societe:'BOIS LEGAL CAMEROUN',
          sigle:'BLC',type_permis:'Grume',date_signature:'05/01/2021',status:'Validé',nom_fichier:'certificat.jpg'},
        ]
      }
    },

    showOverlay:false,
    offsetEntities:0,
    limit:10,
    entititiesWithoutMINFOF:[],
    entite:'',
    search:''
    
  }),
  computed:{
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
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
     ...mapGetters(['user']),
    
    // TRAITEMENT DU V-SELECT
    filtered() {
      return this.entititiesWithoutMINFOF?.filter((entity) =>
      entity.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered?.slice(this.offsetEntities, this.limit + this.offsetEntities)
    },
    hasNextPage() {
      const nextOffset = this.offsetEntities + this.limit
      return Boolean(
        this.filtered?.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offsetEntities - this.limit
      return Boolean(
        this.filtered?.slice(prevOffset, this.limit + prevOffset).length
      )
    },
  },
 
 methods: {
  addCertificat(){
    this.action="add";
     this.$refs['certificat-form'].show();
  },
  handleCertificatAdded(){
    this.getCertificats();
    this.$refs['certificat-form'].hide();
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
  getCertificats(){
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
  getCertificats(){
    this.elements=this.json.data.certificats
  },
  showDetailsCertificat(){
    this.$router.push({name: 'certificat_exportateur_detail'})
  },
  async getEntities(){
    // console.log('getentities')
    this.showOverlay=true
    if(!php.empty(this.$store.state.entiteswithoutminfof)){
      this.entititiesWithoutMINFOF=this.$store.state.entiteswithoutminfof
      console.log('getentities')
      this.showOverlay=false
    }else{
      try {
        await this.$donneesReference.get('entites/entite_forestier')
            .then(response => {
              this.entititiesWithoutMINFOF=response.data.result.Items
             console.log(this.entititiesWithoutMINFOF)
             this.$store.dispatch('entiteswithoutminfof',this.entititiesWithoutMINFOF)
             this.showOverlay=false
          })
      } catch(error){
        this.showOverlay=false
        App.notifySuccess(error.message)
      }
      
    }
  },
    onSearch(query) {
      this.search = query
      this.offsetEntities = 0
  },

 },
 

  mounted(){
    // this.getArrondissements();
    this.getCertificats();
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