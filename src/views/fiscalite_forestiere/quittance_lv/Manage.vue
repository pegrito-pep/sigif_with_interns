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
            <!--ENTETE DE RECHERCHE-->
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card m-0 p-0">
                <b-row>
                  <b-col cols="5">
                    <b-row>
                      <b-col>
                        <b-form-group
                          id="fieldset-horizontal"
                          label-cols-sm="5"
                          label-cols-lg="4"
                          content-cols-sm
                          content-cols-lg="7"
                          label="Date opération"
                          label-for="input-horizontal"
                        >
                        <div class="d-flex justify-content-between">
                          <input class="sigif-input-date" type="date" v-model="search.datedeb" format="YYYY--MM-DD"/>
                          <input class="sigif-input-date" type="date" v-model="search.datefin" format="YYYY--MM-DD"/>
                        </div>
                        </b-form-group>
                      </b-col>
           
                    </b-row>
                  </b-col>
                  <b-col cols="6">
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group
                            id="fieldset-horizontal"
                            label-cols-sm="4"
                            label-cols-lg="3"
                            content-cols-sm
                            content-cols-lg="7"
                            label="Entité Forrestière"
                            label-for="input-horizontal"
                          >
                          <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  :reduce="entite => entite.idorganisation" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                              <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                          </v-select>
                            <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option selected="selected">{{ entite.libelle }}</option>
                            </select>
                      </b-form-group>
                    </b-overlay>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="5">
                      <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="5"
                        label-cols-lg="4"
                        content-cols-sm
                        content-cols-lg="7"
                        label="N° de la quittance"
                        label-for="input-horizontal"
                      >
                        <input class="w-100 px-2 m-0 form-control-xs" style="height: 24px !important;" placeholder="" v-model="search.numquittance"/>
                      </b-form-group>
                   
                  </b-col>
                  <b-col cols="6">
                    <b-form-group
                          id="fieldset-horizontal"
                          label-cols-sm="4"
                          label-cols-lg="3"
                          content-cols-sm
                          content-cols-lg="7"
                          label="Statut"
                          label-for="input-horizontal"
                        >
                        <select  v-model="search.statut" class="m-0 p-0" style="width: 30%;font-size:1rem; border-radius:0.25rem; height:26px!important;" >
                          <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                            {{ status.libelle }}
                          </option>
                        </select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <div style="float:right; width: 320px !important" class="mt-2">
                  <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                </div>
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                Liste des quittances LV</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateQuittanceLv" @click.prevent="addQuittanceLv" size="sm" :class="{'change-image-opacity': !canCreateQuittanceLv,  'not-change-image-opacity': canCreateQuittanceLv}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                <b-button :disabled="!canEditQuittancelv" size="sm" :class="{'change-image-opacity': !canEditQuittancelv,  'not-change-image-opacity': canEditQuittancelv}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button @click.prevent="deleteQuittanceLv" :disabled="!canDeleteQuittancelv" size="sm" :class="{'change-image-opacity': !canDeleteQuittancelv,  'not-change-image-opacity': canDeleteQuittancelv}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button @click.prevent="showDetails" :disabled="!canViewDetailsQuittancelv" size="sm" :class="{'change-image-opacity': !canViewDetailsQuittancelv,  'not-change-image-opacity': canViewDetailsQuittancelv}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button v-if="isMinfof" @click.prevent="validateQuittanceLv" :disabled="!isToValidate||!canSaveQuittancelv" size="sm" :class="{'change-image-opacity': !isToValidate||!canSaveQuittancelv,  'not-change-image-opacity': canSaveQuittancelv&&canSaveQuittancelv}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                <b-button v-if="isMinfof" @click.prevent="rejectQuittanceLv" :disabled="!isToValidate||!canSaveQuittancelv" size="sm" :class="{'change-image-opacity': !isToValidate||!canSaveQuittancelv,  'not-change-image-opacity': canSaveQuittancelv&&canSaveQuittancelv}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>rejeter</b-button>
                <b-button @click.prevent="submitQuittanceLv" :disabled="!isToSubmit||!canSubmitQuittancelv" size="sm" :class="{'change-image-opacity': !isToSubmit,  'not-change-image-opacity': isToSubmit}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:60%">
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

                <template v-slot:head(numQuittanceLv)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>

                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(numQuittanceLv)="data">
                  <span  class="ml-1 d-flex justify-content-center align-items-center">{{ data.item.numQuittanceLv }}</span> 
                 </template>
                 <template #cell(iudQuittanceLv)="data">
                     <a class="mx-1 detail-permis-item" v-if="data.item.iudQuittanceLv!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="data.item.iudQuittanceLv"><b-img src="@/assets/images/Attach_128x128.png"></b-img></a>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
             <!--AJOUT D'UN ENREGISTREMENT QUITTANCE LV -->
          <b-modal id="modal-sm"  ref="quittancelv-form" hide-footer  header-class="custom-bg" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
              </template>
              <div>
                  <QuittanceLvForm @quittancelvAdded="handleAddQuittanceLV"/>
              </div>
          </b-modal>
          <unreachable-box ref="unreachableapiDialogue"></unreachable-box>
          <fiscalite-box @echecopeparc="displayError" @succesopeparc="reloadPage" ref="fiscaliteDialogue"></fiscalite-box>
          <error-dialogue ref="errorDialogue"></error-dialogue>

    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
   import QuittanceLvForm from "@/components/forms/QuittanceLvForm.vue";
  import UnreachableBox from '@/components/utils/auth/UnreachableBox.vue';
  import FiscaliteBox from '@/components/utils/fiscalite/ConfirmBoxDetail.vue';
  import ErrorDialogue from '@/components/utils/AlertBox.vue';
   
  import { mapGetters } from 'vuex'
export default {
  name: "quittance_lv",
  components:{
    QuittanceLvForm,
    UnreachableBox,
    FiscaliteBox,
    ErrorDialogue,
  },
  data: () => ({
    entite:{
      idorganisation:'',
      libelle:''
    },
    isToValidate:false,
    isToSubmit:false,
    offsetEntites:0,
    limitEntites:10,
    entiteswithoutminfof:[],
    searchentite:'',
    showOverlayEntites:false,
    //   checkbox 
    status: true,
    optionsStatus:[{key:"Brouillon", libelle: "Brouillon"}, {key:"Soumis", libelle: "Soumis"}, {key:"1", libelle: "Soumis"}, {key:"Approuvé", libelle: "Approuvé"}, {key:"Rejeté", libelle: "Rejeté"}],

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
       entite:"",
    	 datedeb: "",
       datefin: "",
       numquittance: "",     
      },
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'numQuittanceLv', label: 'N° quittance' },
        { key: 'datequittance', label: 'Date quittance FSDF' },
        { key: 'iudQuittanceLv', label: 'Fichier Quittance' },
        { key: 'montant', label: 'Montant' },
        { key: 'nombreLv', label: 'Nombre de LV' },
        { key: 'statut', label: 'Statut' },
    ],
    elements: [],
    selected:{},
    title:"Création quittance LV"
  }),
  computed:{
     ...mapGetters(['user','hasAccess'])                                                                                                                                                                              ,   
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
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
    /*propriétés liées aux accèes*/
    canCreateQuittanceLv(){ return true; this.hasAccess('CREER_QUITTANCE') },
    canEditQuittancelv(){ this.hasAccess('MODIFIER_QUITTANCE') },
    canDeleteQuittancelv(){ return true; this.hasAccess('SUPPRIMER_QUITTANCE') },
    canViewDetailsQuittancelv(){ return true; this.hasAccess('CONSULTER_QUITTANCE') },
    canSaveQuittancelv(){return true; this.hasAccess('VALIDER_QUITTANCE') },
    canSubmitQuittancelv(){return true; this.hasAccess('SOUMETTRE_QUITTANCE') },

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
  async displayError(error){
    this.$refs.fiscaliteDialogue._close();
    const ok = await this.$refs.errorDialogue.show({
          title: 'Information',
          message: error,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorDialogue._close();
        } else {
          this.$refs.errorDialogue._close();
        }
  },
  reloadPage(){
    this.$refs.fiscaliteDialogue._close();
    this.getQuittanceLv();
  },
  showDetails(){ 
    this.$router.push({name: 'quittance_lv_detail', params: { id: this.selected[0].idQuittanceLv }}); 
  },
  /**SUPPRESSION D'UNE QUITTANCE LV*/
  async deleteQuittanceLv(){
      let message='ètes-vous sur de vouloir supprimer cette quittance ?'
        const ok = await this.$refs.fiscaliteDialogue.show({
          commande:'4',
          title: 'Suppréssion',
          origine:'quittances_lv',
          message:message,
          idQuittanceLv:this.selected[0].idQuittanceLv,
          numquittance:this.selected[0].numQuittanceLv, 
          dateQuittanceLv: this.selected[0].dateQuittanceLv !==null ? this.$dayjs(this.selected[0].dateQuittanceLv).format('YYYY-MM-DD') :"", 
          montant: this.selected[0].montant == null ? "" : this.commify(this.selected[0].montant), 
          okButton: 'Oui',
          cancelButton: "Non",
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          this.$refs.fiscaliteDialogue._close();
        } else {
          this.$refs.fiscaliteDialogue._close();
        }
  },
  /*METHODE DE REJET D'UNE QUITTTANCE LV*/
  rejectQuittanceLv(){
    this.$router.push({name: 'quittance_lv_detail', params: { id: this.selected[0].idQuittanceLv }}); 
  },
   /**METHODE DE TRAITEMENT DE LA VALIDATION D'UNE QUITTANCE LV*/
   validateQuittanceLv(){
      this.$router.push({name: 'quittance_lv_detail', params: { id: this.selected[0].idQuittanceLv }}); 
   },
    /**METHODE DE TRAITEMENT DE LA SOUMISSION D'UNE QUITTANCE LV*/
   submitQuittanceLv(){
      this.$router.push({name: 'quittance_lv_detail', params: { id: this.selected[0].idQuittanceLv }}); 
   },
  addQuittanceLv(){
     this.$refs['quittancelv-form'].show();
  },
  handleAddQuittanceLV(){
    this.getQuittanceLv();
    this.$refs['quittancelv-form'].hide();
  },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },

  filterTable(){
    if(!this.disabled){
      this.search.entite = this.entite.libelle
    }
    console.log('response',this.search);
    this.isBusy=true
    this.$fiscalite.post("quittances-lv/search", this.search).then((response) => {
      console.log('response entrées',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope = elt.dateope !==null ? this.$dayjs(elt.dateope).format('DD/MM/YYYY') :""
          elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
          elt.siteoperation=elt.siteoperation.intitule
          elt.status = elt.statutenr == 1 ? 'soumise' :"en cours"

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
         this.isBusy=false
          console.log('c',error.response.data);
      });
  },
  async getEntites(){
      this.showOverlayEntites=true;
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
      this.showOverlayEntites=false;
    },

    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
   
  reset(){
    this.resetSearcheBar();
    this.getQuittanceLv();
  },

   resetSearcheBar(){
     this.search = {
       datedeb: "",
       datefin: "",
       numquittance: "",
               
     }
     localStorage.removeItem('sigif2./quittances-lv')
  },


  onRowSelected(items) {
      items.isSelected = true;
      
      this.selected = items;
      if (!php.empty(this.selected[0])) {
        this.isRowselected = true;

        if(this.selected[0].statut=='Brouillon'){
          this.isToValidate=false
          this.isToSubmit=true
        }
        else if(this.selected[0].statut=='Soumis'){
      console.log('selected 2',this.selected);

          this.isToValidate=true
          this.isToSubmit=false
        }
        else{
          this.isToValidate=false
          this.isToSubmit=false
        }
      }else{ 
        this.isRowselected = false;
       }
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
            elt.datequittance = elt.dateQuittanceLv !==null ? this.$dayjs(elt.dateQuittanceLv).format('YYYY-MM-DD') :""
           return elt
         })
 	     this.isBusy=false
         setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
     })
       .catch((error) => {
         console.log(error)
         if(error.code=='ERR_NETWORK'){
          this.isBusy=false;
          return this.unreachableapi();
          //return App.alertError('impossible de joindre le serveur') 
         }
         this.isBusy=false
       });
  },
  //gestion du cas api inaccéssible
  async unreachableapi() {
      let message='Impossible de joindre le serveur';
      const ok = await this.$refs.unreachableapiDialogue.show({
          commande:'',
          title: 'ERREUR',
          message:message,
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {} else {
        this.$refs.unreachableapiDialogue._close();
      }
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
  //METHODE DE FORMATAGE D'UN MONTANT
  commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? " " + decimalPart : "");
    },

 },
 

  mounted(){
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getQuittanceLv();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
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
  background: rgb(0, 82, 44) !important;
}

</style>
