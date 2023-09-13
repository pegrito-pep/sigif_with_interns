<template>
    <div id="cover" class="min-vh-100">

       <b-overlay :show="show" rounded="sm">
          <template #overlay>
            <div class="text-center">
              <i class="fas fa-2x fa-sync fa-spin"></i>
              <p id="cancel-label">Chargement...</p>
            </div>
          </template>
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
                          label="Datre opération"
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
                            <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
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
                    <b-overlay rounded="sm" :show="showOverlaySite">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group
                        id="fieldset-horizontal"
                        label-cols-sm="5"
                        label-cols-lg="4"
                        content-cols-sm
                        content-cols-lg="7"
                        label="Site"
                        label-for="input-horizontal"
                      >
                      <v-select @open="getSites" :options="paginated" v-model="search.site" :filterable="false" @search="onSearch" label="INTITULE" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPage" @click="offsetSites -= limitSites">Prèc.</button>
                          <button :disabled="!hasNextPage" @click="offsetSites += limitSites">Suiv.</button>
                        </li>
                      </v-select>
                      </b-form-group>
                    </b-overlay>
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
            <b-row class="d-flex justify-content-center align-items-center">
              <b-col><h4 class="tab-header-left-text"> Liste des billonnages</h4></b-col>
              <b-col class="col-md-auto">
                  <b-button v-if="!isMinfof" :disabled="isAnnullable" @click.prevent="askAnnulation"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/picto_retour_vert.png"></b-img>demander une annulation</b-button> 
                  <b-button  @click.prevent="createBillonnage" :disabled="!canCreateBillonnage" size="sm" :class="{'change-image-opacity': !canCreateBillonnage,  'not-change-image-opacity': canCreateBillonnage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                  <b-button :disabled="!canUpdateBillonnage" size="sm" :class="{'change-image-opacity': !canUpdateBillonnage,  'not-change-image-opacity': canUpdateBillonnage}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button :disabled="!canDeleteBillonnage" size="sm" :class="{'change-image-opacity': !canDeleteBillonnage,  'not-change-image-opacity': canDeleteBillonnage}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteBillonnage}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button :disabled="!canViewDetailsBillonnage" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsBillonnage,  'not-change-image-opacity': canViewDetailsBillonnage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button v-if="isMinfof" :disabled="!canSaveBillonnage" size="sm" :class="{'change-image-opacity': !canSaveBillonnage,  'not-change-image-opacity': canSaveBillonnage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                  <b-button v-if="!isMinfof" :disabled="!canSubmitBillonnage" size="sm" :class="{'change-image-opacity': !canSubmitBillonnage,  'not-change-image-opacity': canSubmitBillonnage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                  <b-button @click.prevent="imprimerBillonnagePDF"  :disabled="!canPrintBillonnage"  size="sm" :class="{'change-image-opacity': !canPrintBillonnage,  'not-change-image-opacity': canPrintBillonnage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer</b-button>
                  <b-button :disabled="!canExportBillonnages" @click.prevent="exportData" size="sm" :class="{'change-image-opacity': !canExportBillonnages,  'not-change-image-opacity': canExportBillonnages}" class="mx-1 simple-btn"><b-img src="@/assets/images/excel.png"></b-img>Exporter</b-button>
                  <b-dropdown toggle-class='customDropdown not-change-image-opacity' style="color:green;" variant='none' class="customDropdown m-md-2" id="dropdown-1" text="autre action">
                    <b-dropdown-item>Listing des billonnages </b-dropdown-item>
                      <b-dropdown-item>Listing des billonnages par parc usine et par éssence</b-dropdown-item>
                      <b-dropdown-divider></b-dropdown-divider>
                      <b-dropdown-item>Listing des grumes mères billonnées</b-dropdown-item>
                  </b-dropdown>
              
             
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-2">
              <b-table :busy="isBusy" bordered sort-icon-left hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #head(idoperation)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #head(dateoper)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #head(heureoper)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #head(intitulesite)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #head(libelletypeopeparc)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #head(statut)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(typeproduit)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #empty>
                       <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">billonnage</span> trouvée!!</h4>
                </template>
                 <template #cell(index)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ ++data.index }}</b> </span>
                </template>
                <template #cell(idoperation)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.idoperation }}</b> </span>
                </template>
                <template #cell(dateoper)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.dateoper }}</b> </span>
                </template>
                <template #cell(heureoper)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.heureoper }}</b> </span>
                </template>
                <template #cell(intitulesite)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.intitulesite }}</b> </span>
                </template>
                <template #cell(typeproduit)="data">
                  <span class="d-flex justify-content-center align-items-center">
                    <b class="ml-1">{{ data.item.typeproduit }}</b> 
                  </span>
                </template>
                <template #cell(libelletypeopeparc)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.libelletypeopeparc }}</b> </span>
                </template>
                <template #cell(statut)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.statut }}</b> </span>
                </template>
              </b-table>
              <BillonnageDialog ref="listingEntreeParc"></BillonnageDialog>
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          <TypeProduitDialog ref="typeproduit"></TypeProduitDialog>
      </b-overlay>

    </div>

</template>
<script>
import DatePicker from 'vue2-datepicker';
import BillonnageDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
import exportFromJSON from "export-from-json";
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
  const php  = require ( 'phpjs' ) ;
  import TypeProduitDialog from '@/components/utils/operation_de_parc/TypeProduitDialog.vue'

  import { mapGetters } from 'vuex'
export default {
  name: "billonnages",
  components: {
    DatePicker,BillonnageDialog,TypeProduitDialog
  },
  data: () => ({
    /**debut propriétes lées à l'ajout de billon */
    newBillon:{date: '', heure: ''},
    isBusy:false,
    isRowselected:false,
    show:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{
      site: "",
      datedeb: "",
	    datefin: "",
	    entite: "",
	    statut: ""
    },
    entite:{
      idorganisation:'',
      libelle:''
    },
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites: 0,
    limitEntites: 10,
    showOverlaySite:false,
    showOverlayEntites:false,
    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumis"}, {key:"2", libelle: "validé"}, {key:"3", libelle: "Soumission en cours"}],

    //données du tableaux
    fields: [ { key: 'index', label: '' },{ key: 'idoperation', label: 'N° d\'entrée', sortable: true }, { key: 'dateoper', label: 'Date Opération', sortable: true },
              { key: 'heureoper', label: 'heure', sortable: true }, { key: 'intitulesite', label: 'Site opération', sortable: true },{ key: "typeproduit", label: "Type de produit", sortable: true }, 
              { key: 'libelletypeopeparc', label: 'Type Opération', sortable: true }, { key: 'statut', label: 'statut', sortable: true }],
              
    elements: [],
    selected:{},
    sites:[],
    offsetSites: 0,
    limitSites: 10,
    searchSite:''
    /*propriétes lies au traitement d'une operation de parc */
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    isAnnullable(){
      if(!php.empty(this.selected[0])&&this.selected[0].statut!='Brouillon' ){
        return true;
      }
      else{
        return false
      }
    },
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    canCreateBillonnage(){ return true;  return this.hasAccess('CREER_BILLONNAGE') },
    canUpdateBillonnage(){ return this.hasAccess('MODIFIER_BILLONNAGE') },
    canViewDetailsBillonnage(){ return true; return this.hasAccess('SUPPRIMER_BILLONNAGE') },
    canSaveBillonnage(){ return this.hasAccess('CREER_BILLONNAGE') },
    canSubmitBillonnage(){ return this.hasAccess('SOUMETTRE_BILLONNAGE') },
    canDeleteBillonnage(){ return this.hasAccess('SUPPRIMER_BILLONNAGE')  },
    canPrintBillonnage(){ 
      if(php.empty(this.selected)){
        return false
       } else return true
      return this.hasAccess('IMPRIMER_BILLONNAGE'); 
    },
    canExportBillonnages(){ return true;  return this.hasAccess('EXPORTER_OPERATION_BILLONNAGE')},
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
    hasPrevPageEntites() {   
      const prevOffset = this.offsetEntites - this.limitEntites
      return Boolean(
        this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
      )
    },
    filtered() {
      return this.sites.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetSites, this.limitSites + this.offsetSites)
    },
    hasNextPage() {
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filtered.slice(nextOffset, this.limitSites + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filtered.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },
  },
  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  methods: {

    imprimerBillonnagePDF(){
      this.$refs.listingEntreeParc.show({
        title:'Impression d\'un billonnage',
        commande:8,
        idoperation:this.selected[0].idoperation,
        showDate:false,
      })
    },

    async askAnnulation(){
      const ok = await this.$refs.transformationDialogue.show({
        title: 'Annulation',
        message:"lot sélectionnée: ",
        site:this.selected[0].intitulesite,
        date:this.selected[0].dateoper,
        okButton: 'Oui',
        cancelButton: "Non",
    })
    //If you throw an error, the method will terminate here unless you surround it wil try/catch
    if (ok) {
      this.$operationParc.patch('lignes-transformation/'+this.selected[0].idligne+'/soumettre').then(response => {
            this.submitted = false 
            this.getLignesTransformation();
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return App.alertError(error.message)
        })
        this.$refs.transformationDialogue._close();
    } else {
        this.$refs.transformationDialogue._close();
    }  
    },
    showDetails(){
      if(this.selected[0].typeProduit=='Gr'){
        this.$router.push({name: 'detail-billonnage-GR', params: { id: this.selected[0].idoperation }}); 
      } 
      else if(this.selected[0].typeProduit=='Cl'){
        this.$router.push({name: 'detail-billonnage-CL', params: { id: this.selected[0].idoperation }}); 
      }
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
      console.log('row selected ',items);
      items.isSelected =true;
      this.isRowselected=true
      this.selected = items
    },
    onSearch(query) {
      this.searchSite = query
      this.offsetSite = 0
    },
    async getSites(){
      
      this.showOverlaySite=true
      if(!php.empty(this.$store.state.sitesnoutbs)){
        this.sites=this.$store.state.sitesnoutbs
      }
      else{
        try {
          await this.$donneesReference.get("sites/no-utb").then(response => {
            this.sites=response.data.result
            console.log('getSites')
          });
          this.$store.dispatch('sitesnoutbs', this.sites)
        } catch (error) {
            console.log(error.message)
        }
      }
      // console.log('sites ',this.sites);
      this.showOverlaySite=false
    },
    createBillonnage() {
      return this.$refs.typeproduit.show(
        {
          title:'Choix du type de produit',
          origine:'billonages'
        }
      )
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (this.$store.state.entiteswithoutminfof !== null &&this.$store.state.entiteswithoutminfof.length > 0) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.Items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
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
      this.getBillonnages()
    },
    getBillonnages(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$operationParc.get("billonages", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

        this.elements = this.elements.map(elt =>{
          //elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""
          elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""

          return elt
        })
		      this.isBusy=false
      })
      .catch((error) => {
        console.log('error ',error);
        App.alertError(error.message || 'érreur interne du serveur')

        //App.notifiy(error.message)
      });

    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
  filterTable(){
    let data={ site: this.search.site.IDSITEOPER, datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.entite.idorganisation, statut: this.search.statut }
    console.log('response',this.search);
    this.isBusy=true
    this.$operationParc.post("billonages/search", data).then((response) => {
      console.log('response entrées',response);
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage + 1
      this.elements=response.data.result.items
      
      this.elements = this.elements.map(elt =>{
        elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""
        elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
        return elt
      })
        storage.set(this.$route.path ,JSON.stringify(this.search))
		      this.isBusy=false
      })
      .catch((error) => {
         this.isBusy=false
      });
  },
  reset(){
    this.resetSearcheBar()
    this.getBillonnages()
  },
  resetSearcheBar(){
    this.search = {
       site: "",
      datedeb: "",
	    datefin: "",
	    entite: "",
	    statut: ""
    }
    localStorage.removeItem('sigif2./billonnages')
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
  async exportData(){
      this.show=true
      const data=await this.$operationParc.get("billonages?size=400").then(response => response.data.result.items || [])
      console.log('data', data);
      const fileName = "billonage_data";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
       setTimeout(() => {this.show=false;}, 3000);
       
    }
  },
  

  mounted(){
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getBillonnages();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  },

  }

</script>
<style scoped	>
.customDropdown {
  color:green
}
.customDropdown::hover{
  color:white;
  font-weight:bold;
  background:green
}
.sigif-input-date{
  width: 45%;
  height: 26px;
  padding: 1px 3px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-control{
  height: 30px !important;
}
#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
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
  border-radius:  6px;
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
 /* background-color: rgb(0, 82, 44)!important;*/
  border-color: white!important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover{
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table td, .table th {
  padding: 5px 0;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}

</style>