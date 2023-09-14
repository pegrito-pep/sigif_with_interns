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
                      <v-select @open="getSites" :options="paginated" v-model="search.site" :filterable="false" :reduce="site => site.IDSITEOPER" @search="onSearch" label="INTITULE" class="custom-select-type_titre">
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
                        <select  v-model="search.statut" class="m-0 p-0" style="width: 80%;font-size:1rem; border-radius:0.25rem; height:26px!important;" >
                          <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                            {{ status.libelle }}
                          </option>
                        </select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    <b-form-group
                          id="fieldset-horizontal"
                          label-cols-sm="4"
                          label-cols-lg="5"
                          content-cols-sm
                          content-cols-lg="7"
                          label="Type de produit"
                          label-for="input-horizontal"
                        >
                        <select  v-model="search.typelv" class="m-0 p-0" style="width: 50%;font-size:1rem; border-radius:0.25rem; height:26px!important;" >
                          <option value="LVG">Grumes</option>
                          <option value="LVD">Débités</option>
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
              <b-col>
                <h6 class="m-0 p-0"><span>Quota de LV disponibles : {{ quotalv }}</span></h6>
                <h4 class="tab-header-left-text mt-0"> Liste des lettres de voiture</h4>
                
              </b-col>
              <b-col class="col-md-auto d-flex justify-content-center align-items-center">
                <a style="cursor: pointer;"  @click.prevent="addLettreLv" :disabled="canCreateLettreVoiture" size="sm" :class="{'change-image-opacity': canCreateLettreVoiture,  'not-change-image-opacity': canCreateLettreVoiture}" 
                class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span v-if="isRowselected">
                <b-button v-if="canUpdateLettreVoiture" @click.prevent="goToUpdateLettreForm" :disabled="!isToUpdate" style="cursor: pointer"  size="sm" :class="{'change-image-opacity': !isToUpdate,  'not-change-image-opacity': isToUpdate}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateLettreVoiture}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button v-if="!canDeleteLettreVoiture" size="sm" :class="{'change-image-opacity': !canDeleteLettreVoiture,  'not-change-image-opacity': canDeleteLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteLettreVoiture}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button  :disabled="!canViewDetailsLettreVoiture" style="cursor: pointer" @click.prevent="showDetails()" size="sm" :class="{'change-image-opacity': !canViewDetailsLettreVoiture,  'not-change-image-opacity': canViewDetailsLettreVoiture}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsLettreVoiture}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button style="cursor: pointer" @click.prevent="sendTovalidateLv" :disabled="!isToValidate||!isMinfof" size="sm" :class="{'change-image-opacity': !isToValidate,  'not-change-image-opacity': isToValidate}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveLettreVoiture}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>Soumettre</b-button>
                <b-button style="cursor: pointer" @click.prevent="sendToSoumettreLv" :disabled="!isToSubmit" size="sm" :class="{'change-image-opacity': !isToSubmit,  'not-change-image-opacity': isToSubmit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToSubmit}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Valider</b-button>
                <b-button style="cursor: pointer" @click.prevent="imprimer" :disabled="!canPrintLettreVoiture||!isRowselected" size="sm" class="mx-2 simple-btn" :class="{'change-image-opacity': !canPrintLettreVoiture,  'not-change-image-opacity': canPrintLettreVoiture}"><b-img  src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>
                  imprimer
                </b-button>
                </span>
                <b-dropdown toggle-class='customDropdown not-change-image-opacity' style="color:green;" variant='none' class="customDropdown m-md-2" id="dropdown-1" text="autre action">
                  <b-dropdown-item>Listing des lèttres de voiture</b-dropdown-item>
                  <b-dropdown-item @click.prevent="showListingLettresVoiturePeriode">Listing des lettres de voiture par période</b-dropdown-item>
                  <b-dropdown-divider></b-dropdown-divider>
                  <b-dropdown-item>Listing des évacuations</b-dropdown-item>
                </b-dropdown>
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
                       <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">lettre de voiture</span> trouvée!!</h4>
                </template>
                <template #cell(estLvVierge)="data">
                     <span v-if="(data.item.estlvVierge==1)" style="font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
                <template #cell(statutenr)="data">
                  <span v-if="(data.item.statutenr==0)" style="font-weight:bold">Brouillon</span>
                  <span v-else-if="(data.item.statutenr==1)" style="font-weight:bold">Soumise</span>
                  <span v-else-if="(data.item.statutenr==2)" style="font-weight:bold">Validée</span>
                  <span v-else-if="(data.item.statutenr==3)" style="font-weight:bold">Soumission en cours</span>
             </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>
             
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
            </div>
          <infos-box ref="infosbox"></infos-box>
          <OpeParcDialog ref="opeparcDialogue"></OpeParcDialog>
          <!--CHOIX DU TYPE DE PRODUIT POUR LA CREATION DE LA LV-->
          <TypeProduitDialog ref="typeproduit"></TypeProduitDialog>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from 'vuex';
import Calendar from 'vue2-slot-calendar';
import InfosBox from '@/components/utils/InfosBox.vue';
import OpeParcDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
import TypeProduitDialog from '@/components/utils/operation_de_parc/TypeProduitDialog.vue'


export default {
  name: "lettres-de-voitures",
  data: () => ({
    isToValidate:false,
    isToSubmit:false,
    isToUpdate:false,
    isRowselected:false,
    title: "Création lettre de voiture",
    isBusy:false,
    showOverlay:false,
    showOverlaySite:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    quotalv:'',
    brouillons:'',
    total: 0,
    format:"yyyy-MM-dd",
    clear:true,
    placeholderddebut:"2022-08-09",
    showOverlayEntites:false,
    search:{
      datedeb: "",
      datefin: "",
      entite: "",
      statut: "",
      typeproduit:"",
      typelv: "",
      immatriculation: "",
      sitedepart: "",
      sitedestination: "",
      codebarre: "",
      transporteur: ""
    },
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,
    perPageSiteDepart: 7,
    currentPageSiteDepart: 1,
    rowsSiteDepart: 9,
    searchdest: '',
    offsetdest: 0,
    limitdest: 10,
    sites:[],
    sitesDepart:[],
    sitesDestination:[],
    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumise"}, {key:"3", libelle: "validée"}, {key:"4", libelle: "Soumission en cours"}],
    visible: true,
    fields: [ { key: 'index', label: '' },{ key: 'idoperation', label: 'N° LV' }, { key: 'codebarre', label: 'Code à barre LV' }, , { key: 'estLvVierge', label: 'LV vierge?' }, 
              { key: 'libelletypeopeparc', label: 'Type de LV' }, { key: 'dateope', label: 'Date ' }, { key: 'immatriculation', label: 'N° D\'immatricualtion ' },
              { key: 'intitulesitedepart', label: 'Site de départ' },{ key: 'intitulesitedest', label: 'Site de destination' }, { key: 'statutenr', label: 'statut' }],
    typesLettres:[{intitule : "lettre de voiture  << débité >>", value:"LVD"},{intitule : "lettre de voiture  << Grume >> ", value:"LVG"}],
    elements: [],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */
    searchSubmitted:false,
   
    }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    /*isRowselected(){
      if(!php.empty(this.selected)){
        return true;
      }
      return false
      return !php.empty(this.selected)
    },*/
    canCreateLettreVoiture(){return this.hasAccess('CREER_LETTRES_DE_VOITURE')},
    canUpdateLettreVoiture(){
      return true;
      if(this.hasAccess('MODIFIER_LETTRES_DE_VOITURE')&&!php.empty(this.selected[0])&&(this.selected[0].statutenr=='0'||this.selected[0].statutenr=='2')){
        return true
      }
      else{
        return false
      }    
    },
    canDeleteLettreVoiture(){return this.hasAccess('SUPPRIMER_LETTRES_DE_VOITURE')},
    canViewDetailsLettreVoiture(){ return true; return this.hasAccess('CONSULTER_LETTRES_DE_VOITURE')},
    canSaveLettreVoiture(){ return true; return this.hasAccess('CREER_LETTRES_DE_VOITURE')},
    canSubmitLettreVoiture(){ return true; return this.hasAccess('SOUMETTRE_LETTRES_DE_VOITURE');},
    canPrintLettreVoiture(){return true; return this.hasAccess('IMPRIMER_LETTRES_DE_VOITURE');},
     itemsSitesDepart() {
          return php.array_slice(this.sites, this.offsetSitesDepart, this.perPageSiteDepart);
        },
        offsetSitesDepart() {
          return this.currentPageSiteDepart * this.perPageSiteDepart - this.perPageSiteDepart;
        },
        tailleSitesDepart(){
          return this.sitesDepart.length
        },
        filtered() {
          return this.sites.filter((site) =>
            site.INTITULE.toLocaleLowerCase().includes(this.searchdest.toLocaleLowerCase())
          )
        },
        paginated() {
          return this.filtered.slice(this.offsetdest, this.limitdest + this.offsetdest)
        },
        hasNextPage() {
          const nextOffset = this.offsetdest + this.limitdest
          return Boolean(
            this.filtered.slice(nextOffset, this.limitdest + nextOffset).length
          )
        },
        hasPrevPage() {   
          const prevOffset = this.offsetdest - this.limitdest
          return Boolean(
            this.filtered.slice(prevOffset, this.limitdest + prevOffset).length
          )
        },

        rows() {
            return this.items.length
        },
        totalPages(){
          return this.rows/this.perPage
        },
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
  watch:{
  elements(value){
    if(!php.empty(value)){
     setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    }
  },
 },
 components:{
  Calendar,
  InfosBox,
  OpeParcDialog,
  TypeProduitDialog
 },
 methods: {
  /**METHODE DE TRAITEMENT DE LA VALIDATION D'UNE ENTREE PARC*/
  sendTovalidateLv(){
    this.$router.push({ name: 'detail-lettres-voiture',  params: { id: this.selected[0].idoperation }});
  },
  /**METHODE DE TRAITEMENT DE LA SOUMISSION D'UNE ENTREE PARC*/
  sendToSoumettreLv(){
    this.$router.push({ name: 'detail-lettres-voiture',  params: { id: this.selected[0].idoperation }});
  },
  onRowSelected(items) {
      items.isSelected = true;
      this.selected = items;
      if (!php.empty(this.selected[0])) {
        this.isRowselected =true;
        if(this.selected[0].statutenr=='0'){
          this.isToValidate=false
          this.isToSubmit=true
          this.isToUpdate=true
        }
        else if(this.selected[0].statutenr=='1'){
          this.isToValidate=true
          this.isToSubmit=false
          this.isToUpdate=false
        }
        else if(this.selected[0].statutenr=='2'){
          this.isToValidate=false
          this.isToSubmit=false
          this.isToUpdate=true
        }
        else{
          this.isToValidate=false
          this.isToSubmit=false
          this.isToUpdate=false
        }
      }
      else{
        this.isRowselected =false;

      }
  },
  goToUpdateLettreForm(){
    if(this.selected[0].typeopeparc=='LVD'){
      this.$router.push({name: 'edit-lvd', params: { id: this.selected[0].idoperation }}); 
    } 
    else if(this.selected[0].typeopeparc=='LVG'){
      this.$router.push({name: 'edit-lvg', params: { id: this.selected[0].idoperation }}); 
    }
  },
  //gestion impréssion listing lettres de voiture par période
  showListingLettresVoiturePeriode(){
      this.$refs.opeparcDialogue.show({
          title:'Listing des lettres de voiture par période',
          commande:3
      })
  },
  imprimer(){
    let url=''
    if(this.selected.typeopeparc=='LVG'){
      url=this.$JasperReport+'/JasperReport/lvg/'+this.selected.idoperation;
    } 
    else if(this.selected.typeopeparc=='LVD'){
      url=this.$JasperReport+'/JasperReport/lvd/'+this.selected.idoperation;
    } 
    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('target', '_blank');
    a.click();
  },
 async addLettreLv() {
    //if(this.quotalv==0){
    if(this.quotalv<0){
      
      const ok = await this.$refs.infosbox.show({
        title: 'ERREUR',
        raison:1,
        message: "Vous ne disposez pas d'un quota de lettre de voitures",
        showOptions:false,
        okButton: 'oui',
        cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.infosbox._close();
      } else {
          this.$refs.infosbox._close();
      }
    }
    else if(this.brouillons<this.quotalv){
      const ok = await this.$refs.infosbox.show({
        title: 'ERREUR',
        raison:1,
        message: "Bien vouloir  soumetre les lettres de voitures brouillons déjà crées",
        showOptions:false,
        okButton: 'oui',
        cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.infosbox._close();
      } else {
          this.$refs.infosbox._close();
      }
    }
    else{
      return this.$refs.typeproduit.show(
        {
          title:'Choix du type de produit',
          origine:'lettres_de_voiture'

        }
      )
      //this.$router.push({ name: "create-lettre_voiture" }); 
    }
  },
  // showDetails(){ this.$router.push({name: 'detail-lettres-voiture', params: { id: this.selected[0].idoperation }}); },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },

  showDetails(){  
    this.$router.push({ name: 'detail-lettres-voiture',  params: { id: this.selected[0].idoperation }});
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
    this.getLettresVoitures()
  },

    async getLettresVoitures(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        this.$operationParc.get("lettres-voiture", {params}).then(response => {

          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.quotalv = response.data.result.quotalv
          this.brouillons= response.data.result.brouillons
          this.elements = this.elements.map(elt =>{

            elt.dateope = elt.dateope !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
           // elt.status = elt.statutenr == 1 ? 'soumise' :"Brouillon"

            return elt
          })
            this.isBusy=false
        })
        .catch((error) => {
          console.log(error)
        });

    },
    filterTable(){
        if(!this.disabled){
          this.search.entite = this.entite.libelle
        }
        let searchToSubmit={
          datedeb: this.search.datedeb,
          datefin: this.search.datefin,
          entite: this.search.entite,
          statut: this.search.statut,
          typelv: this.search.typelv,
          immatriculation: this.search.immatriculation,
          codebarre: this.search.codebarre,
          transporteur: this.search.transporteur,
        }
        if(this.search.sitedepart){
          searchToSubmit.sitedepart = this.search.sitedepart.idsiteoper
        }
        if(this.search.sitedestination){
          searchToSubmit.sitedestination = this.search.sitedestination.idsiteoper
        }
        this.isBusy=true
        this.$operationParc.post("lettres-voiture/search", searchToSubmit).then((response) => {

          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.quotalv = response.data.result.quotalv
          this.brouillons= response.data.result.brouillons
          this.elements = this.elements.map(elt =>{

            elt.dateope = elt.dateope !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
           // elt.status = elt.statutenr == 1 ? 'soumise' :"Brouillon"

            return elt
          })
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
        });
    },
    resetSearcheBar(){
      this.search = {
        datedeb: "",
        datefin: "",
        entite: "",
        statut: "",
        typelv: "",
        immatriculation: "",
        sitedepart: "",
        sitedestination: "",
        codebarre: "",
        transporteur: ""
      }
      localStorage.removeItem('sigif2./lettres-voiture')
    },
    reset(){
      this.resetSearcheBar()
      this.getLettresVoitures()
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
    async getSites(){
      this.showOverlaySite=true
      if(!php.empty(this.$store.state.sitesnoutbs)){
        this.sites=this.$store.state.sitesnoutbs
      }
      else{
        try {
            this.sites = await this.$donneesReference.get("sites/no-utb").then(response => response.data.result);
            this.$store.dispatch('sitesnoutbs', this.sites)
        } catch (error) {
            console.log(error.message)
        }
      }
    this.showOverlaySite=false
    },
    //notification de lettre de voiture ajoutée avec succès
    showAlert() {
        const Toast = this.$swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 4000,
          width: '25em',
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Enregistrement éffectué avec succès'
        })
    },
    onSearch(query) {
      this.searchdest = query
      this.offsetdest = 0
    },
  
 },
  mounted(){
    // debut  gestion ajout d'une lettre de voiture */
    if(this.$cookies.isKey('creation-lettre-voiture')){
      this.showAlert();
      this.$cookies.remove('creation-lettre-voiture')
    }
    /*** fin  gestion ajout d'une lettre de voiture */
    this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getLettresVoitures();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  }

}

</script>
<style scoped>
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
.form-control-xs {
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
  line-height: 1.5;
  border-radius: .2rem;
  border: 1px solid darkgreen;
  width: 100%;
  font-weight: 800;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: .25rem;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}

#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}


.position_absolute{
  position: absolute;
  bottom: 30px;
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
  margin-top: 10px;
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
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
  cursor: not-allowed!important;
}
.not-change-image-opacity:hover{
  color:#82C138;
  cursor:pointer!important;
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
<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}
</style>