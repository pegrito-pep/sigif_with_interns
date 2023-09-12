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


                <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">


                <b-row>
                  <b-col cols="3">
                    <b-overlay :show="showOverlaySite" rounded="sm">
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Type de site</strong></label><br>
                        <v-select @open="getTypesSites" :options="typesSites" v-model="search.typesite"   label="libelle" class="custom-select-type_titre"></v-select>
                      </b-form-group><br>
                    </b-overlay>
                    <b-form-group  class="m-0 p-0">
                       <label for="" class="font-weight: bold m-0 p-0"><strong>Nom du site</strong></label><br>
                       <input style="height: 24px !important; border-radius:5px"  class="p-2 m-0 w-100" v-model="search.nonsite"  size="sm"  placeholder="" type="text" />
                    </b-form-group>

                 </b-col>
                 <b-col cols="3">
                     <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Régions</strong></label><br>
                        <v-select  :options="optionsRegion" v-model="search.region" :filterable="false" label="nom" class="custom-select-type_titre"></v-select>
                     </b-form-group><br>
                     <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Départements</strong></label><br>
                        <v-select :options="paginatedDep" v-model="search.departement" :filterable="false" @search="onSearchdep" label="nom" class="custom-select-type_titre">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageDep" @click="offsetdep -= limitdep">Prèc.</button>
                              <button :disabled="!hasNextPageDep" @click="offsetdep += limitdep">Suiv.</button>
                          </li>
                        </v-select>
                     </b-form-group>
                  </b-col>
                  <b-col cols="3">
                     <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Arrondissements</strong></label><br>
                        <v-select :options="paginatedArrond" v-model="search.arrondissement" :filterable="false" @search="onSearcharrond" label="intitule" class="custom-select-type_titre">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageArrond" @click="offsetarrond -= limitarrond">Prèc.</button>
                              <button :disabled="!hasNextPageArrond" @click="offsetarrond += limitarrond">Suiv.</button>
                          </li>
                        </v-select>
                     </b-form-group><br> 

                      <div class="d-flex mt-4" style="width: 99%">
                          <b-col cols="2">
                            <label for=""><strong>Actif</strong></label>
                          </b-col>
                          <b-form-checkbox  id="checkbox-1" v-model="search.statut" name="checkbox-1" value="0" unchecked-value="1"></b-form-checkbox>

                          <!--<b-col><label for="" style="float:right"><strong>Statut</strong></label></b-col>
                        <select  v-model="search.statut" class="m-0 p-0" style="width: 30%;font-size:1rem; border-radius:0.25rem; height:26px!important;" >
                          <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                            {{ status.libelle }}
                          </option>
                        </select>-->
                      </div>
                      
                  </b-col>

                  <b-col cols="3">
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                     <div>
                      <label for="" class="m-0 p-0"><strong>Entité forestière</strong></label>
                      <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                          <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                        </li>
                      </v-select>
                      <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>     
                    </div><br>
                    </b-overlay>

                      <div class="w-100 mt-2 ">
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>

                  </b-col>


                </b-row>


                <b-row>

              
                </b-row>              
              </b-card>
      </b-collapse>

            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">Liste des sites</h4>
                <b-button v-if="isMinfof" @click.prevent="handleDesactivationSet"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Desactiver en masse</b-button> 
                <b-button v-if="isRenewable"  @click.prevent="askRenewal"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/Parcs_Rupture_16x16.png"></b-img>Renouveller</b-button> 
                <b-button v-if="isToSubmitRenewable"   @click.prevent="submitRenewal"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Soumettre</b-button> 
                <b-button v-if="canHandleRenewParcRupture"  @click.prevent="approuverRenouvellement"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver</b-button> 
                <b-button v-if="canHandleRenewParcRupture" @click.prevent="rejeterRenouvellement"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Rejeter</b-button> 
              </b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateSite" @click.prevent="addSite" size="sm" :class="{'change-image-opacity': !canCreateSite,  'not-change-image-opacity': canCreateSite}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateSite" size="sm" :class="{'change-image-opacity': !canUpdateSite,  'not-change-image-opacity': canUpdateSite}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateSite}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button> 
                  <b-button :disabled="!canDeleteSite" size="sm" :class="{'change-image-opacity': !canDeleteSite,  'not-change-image-opacity': canDeleteSite}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteSite}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button @click.prevent="showDetails" :disabled="!canViewDetailsSite" size="sm"  class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button :disabled="!canActiveSite" size="sm" :class="{'change-image-opacity': !canActiveSite,  'not-change-image-opacity': canActiveSite}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canActiveSite}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                  <b-button :disabled="!canDesactiveSite" size="sm" :class="{'change-image-opacity': !canDesactiveSite,  'not-change-image-opacity': canDesactiveSite}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDesactiveSite}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>desactiver</b-button>
                  <b-button :disabled="!canVisualiserSite" size="sm" :class="{'change-image-opacity': !canVisualiserSite,  'not-change-image-opacity': canVisualiserSite}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canVisualiserSite}" src="@/assets/images/graph.png"></b-img>visualiser</b-button>
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
                <template #empty>
                  <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">site</span> trouvé !!</h4>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(auth)="data">
                  <span v-if="data.item.auth!==null"  style="color: green; font-weight:bold">
                    <a :href="data.item.auth" target="_blank" v-b-tooltip.hover title="consulter">
                      <b-img src="@/assets/images/download.png"></b-img>
                    </a>
                  </span>
                  <span v-else></span>
                </template>
                 <template #cell(statut)="data">
                  <span v-if="data.item.statut=='0'" style="font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                  <span v-else style="font-weight:bold"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img></span>

                </template>
              </b-table>

              <!--<Table
                :isBusy="isBusy"
                :onRowSelected="onRowSelected"
                :items="items"
                :fields="fields"
                :rowClass="rowClass"
                ref="selectableTable"
                selectableTable="selectableTable"
              />-->

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

          <!--AJOUT D'UN SITE -->
          <b-modal id="site-form"  ref="site-form"  hide-footer
           header-class="custom-bg"
           header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
              </template>
                <div>
                    <site-form :action="action" :title="title" @siteAdded="handleAddSite" @siteAddedAndContinue="handleSiteAddedAndContinue"/>
                </div>
          </b-modal>

          <!--MODAL DESACTIVATION DE SITES-->
          <b-modal id="modal-lg" ref="desactivation-form" size="lg" hide-footer header-class="custom-bg" header-text-variant="light">
            <template #modal-title>
              <div>
                <span class="font-weight-bold">DESACTIVATION DES SITES</span><br />
                <sub >les sites désactivés par le MINFOF ne peuvent qu'être activés par le MINFOF</sub>
                
              </div>
            </template>
              <desactivation-form   @desactivationOk="handleDesactivationOk" />
          </b-modal>
        <!--COMPOSANT DE RENOUVELLEMENT D'UN PARC RUPTURE-->
        <ask-renew-site ref="renewcomponent" @askRenewSet="handleRequestEmitted" :dto="dto"></ask-renew-site>
        <site-component ref="siteDialogue" :dto="dto"></site-component>
        <rejet-component ref="rejetDemande" @rejetAdmis="SetData"></rejet-component>

    </div>

</template>
 

<script>
const php = require("phpjs");
  import Table from '@/components/Table.vue'
  import SiteForm from "@/components/forms/SiteForm.vue";
  import DesactivationForm from "@/components/forms/donnees_de_reference/DesactivationForm.vue";
  import regions from '@/data/regions.js'
  import departements from '@/data/departements.js'
  import arrondissements from '@/data/arrondissements.js'
  import { mapGetters } from 'vuex'
import AskRenewSite from '@/components/utils/donnes_de_reference/AskRenewSite.vue';
import SiteComponent from '@/components/utils/donnes_de_reference/Site.vue';
import RejetComponent from '@/components/utils/donnes_de_reference/RejetDemande.vue';


export default {
  name: "sites",
  components:{
    SiteComponent,
    RejetComponent,
    AskRenewSite,
    DesactivationForm,
    SiteForm,Table
  },
  data: () => ({
    showOverlaySite:false,
    dto:{}, //objet contenant les infos du PU à renouveller
    // checkkbox
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
      typesite: "",
      region: "",
      departement: "",
	    arrondissement: "",
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

    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumis"},
     {key:"2", libelle: "Approuvé"}, {key:"3", libelle: "Rejeté"}],
    optionsArrondissement:arrondissements,
    optionsRegion:regions,
    optionsDepartement:departements,
    search:{},
    options:[
      { value: null, text: 'Please select an option' },
      { value: 'brouillon', text: 'brouillon' },
      { value: 'soumise', text: 'soumise' },
      { value: 'validée', text: 'validée' },
      { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    offsetdep: 0,
    limitdep:10,
    searchdep:"",
    offsetarrond: 0,
    limitarrond: 10,
    searcharrond:"",
    //données du tableaux
    fields: [
        { key: 'index', label: '', thStyle:"width:auto" },
        { key: 'intitule', label: 'Nom du site',thStyle:{width: '20%'} },
        { key: 'auth', label: 'Autorisation' },
        { key: 'typesite', label: 'type de site' },
        { key: 'stautRenouv', label: 'Statut Renouvellement' }, 
        { key: 'zone', label: 'Zone' },    
        { key: 'x', label: 'UTM X' },   
        { key: 'y', label: 'UTM Y' },   
        { key: 'arrondissement', label: 'Arrondissement' },   
        { key: 'entite', label: 'Entité' },   
        { key: 'statut', label: 'Actif' }, 
    ],
    elements: [],
    typesSites:[],

    selected:{},

    entite:{
      idorganisation:'',
      libelle:''
    },
    showOverlayEntites:false,
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
    // Données de recherche
    search: {
      typesite:"",
      nonsite:"",
      region:"",
      departement:"",//numero du certificat de conformité
      arrondissement:"",
      invalide:"",
      statut:"",
      statutRenouv:"",
      entiteForestiere: "",
    },
    
    /*propriétes lies au traitement d'une operation de parc */
     action:"add",
    title:"Ajout d'un site"
  }),
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  computed:{
     ...mapGetters(['user', 'hasAccess']),
    isMinfof(){ 
        if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
          return true;
        }else{
          return false;
        }
    },
    //controle bouton renouvellement d'un parc rupture
    isRenewable(){
      if(this.isMinfof){
        return false;
      }else{
        //if(this.hasAccess('RENOUVELLER_PARC_RUPTURE')){
          if(!php.empty(this.selected[0])&&this.selected[0].invalide==true&&this.selected[0].typesite=='PRU'&&(this.selected[0].stautRenouv==null||this.selected[0].stautRenouv=="REJETER")){
            return true;
          }
          else{
            return false
          }
       /* }else{
          return false;
        }*/
      }
    },
    //controle bouton soumission parc rupture
    isToSubmitRenewable(){
      if(this.isMinfof){
        return false;
      }else{
        //if(this.hasAccess('SOUMETTRE_PARC_RUPTURE')){
          if(!php.empty(this.selected[0])&&this.selected[0].invalide==true&&this.selected[0].stautRenouv=='BROUILLON'){
            return true;
          }
          else{
            return false
          }
        /*}else{
          return false;
        }*/
      }
    },
    //controle bouton approbation d'un parc rupture
    canHandleRenewParcRupture(){    
      if(!this.isMinfof){
        return false;
      }else{
       // if(this.hasAccess('TRAITER_PARC_RUPTURE')){
          if(!php.empty(this.selected[0])&&this.selected[0].stautRenouv=='SOUMIS'&&this.selected[0].typesite=='PRU'){
            return true;
          }
          else{
            return false
          }
       /* }else{
          return false;
        }*/
      }
    },
    /*propriétés liées aux accèes*/
    canCreateSite(){return true;return this.hasAccess('CREER_SITE')},
    canUpdateSite(){return this.hasAccess('MODIFIER_SITE')},
    canDeleteSite(){return this.hasAccess('SUPPRIMER_SITE')},
    canViewDetailsSite(){ return true; return this.hasAccess('CONSULTER_SITE')},
    canActiveSite(){return this.hasAccess('ACTIVER_SITE')},
    canDesactiveSite(){return this.hasAccess('DESACTIVER_SITE')},
    canVisualiserSite(){return this.hasAccess('VISUALISER_SITE')},
    filteredDep() {
      return this.optionsDepartement.filter((dep) =>
        dep.nom.toLocaleLowerCase().includes(this.searchdep.toLocaleLowerCase())
      )
    },
    paginatedDep() {
      return this.filteredDep.slice(this.offsetdep, this.limitdep + this.offsetdep)
    },
    hasNextPageDep() {
          const nextOffset = this.offsetdep + this.limitdep
          return Boolean(
            this.filteredDep.slice(nextOffset, this.limitdep + nextOffset).length
          )
        },
    hasPrevPageDep() {   
          const prevOffset = this.offsetdep - this.limitdep
          return Boolean(
            this.filteredDep.slice(prevOffset, this.limitdep + prevOffset).length
          )
    },
    filteredArrond() {
      return this.optionsArrondissement.filter((arrond) =>
        arrond.intitule.toLocaleLowerCase().includes(this.searcharrond.toLocaleLowerCase())
      )
    },
    paginatedArrond() {
      return this.filteredArrond.slice(this.offsetarrond, this.limitarrond + this.offsetarrond)
    },
    hasNextPageArrond() {
          const nextOffset = this.offsetarrond + this.limitarrond
          return Boolean(
            this.filteredArrond.slice(nextOffset, this.limitarrond + nextOffset).length
          )
        },
    hasPrevPageArrond() {   
          const prevOffset = this.offsetarrond - this.limitarrond
          return Boolean(
            this.filteredArrond.slice(prevOffset, this.limitarrond + prevOffset).length
          )
    },
    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset(){
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
    hasPrevPageEntites(){   
      const prevOffset = this.offsetEntites - this.limitEntites
      return Boolean(
        this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
      )
    }
  },
 
 methods: {
    //methode d'approbation du renouvellement d'un parc rupture
  async submitRenewal(){
    const ok = await this.$refs.siteDialogue.show({
      //commande:'entreeUsinage',
        title: 'Soumission',
        message:"ètes-vous sur de vouloir soumettre cette demande ?",
        numfacture:this.selected[0].nunumbordereaux,
        intitule:this.selected[0].intitule,
        organisation:this.selected[0].organisation,
        okButton: 'Oui',
        cancelButton: "Non",
    })
    //If you throw an error, the method will terminate here unless you surround it wil try/catch
    if (ok) {
      this.$donneesReference.put('sites/renouvellemnt/soumettre/'+this.selected[0].iddemandeRenouv).then(response => {
            this.submitted = false 
            this.getSites();
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return App.alertError(error.response.data.message)
        })
        this.$refs.siteDialogue._close();
    } else {
        this.$refs.siteDialogue._close();
    }
  },
   //mise à jour de l'interface après rejet d'une demande de renouvellement d'un parc rupture
   SetData(){
    this.getSites();
    this.$refs.rejetDemande._close();
   },
  //methode d'approbation du renouvellement d'un parc rupture
  async approuverRenouvellement(){
    const ok = await this.$refs.siteDialogue.show({
      //commande:'entreeUsinage',
        title: 'Approbation',
        message:"ètes-vous sur de vouloir approuver cette demande de renouvellement ?",
        numfacture:this.selected[0].nunumbordereaux,
        intitule:this.selected[0].intitule,
        organisation:this.selected[0].organisation,
        okButton: 'Oui',
        cancelButton: "Non",
    })
    //If you throw an error, the method will terminate here unless you surround it wil try/catch
    if (ok) {
      this.$donneesReference.patch('sites/renouvellemnt/aprouver/'+this.selected[0].iddemandeRenouv).then(response => {
            this.submitted = false 
            this.getSites();
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return App.alertError(error.message)
        })
        this.$refs.siteDialogue._close();
    } else {
        this.$refs.siteDialogue._close();
    }
  },
  //methode de rejet d'une demande de renouvellement
  async rejeterRenouvellement(){
    const ok = await this.$refs.rejetDemande.show({
        commande:'3',
        title: 'Rejet',
        idRenouvellement:this.selected[0].iddemandeRenouv,
        message:"ètes-vous sur de vouloir rejeter cette demande de renouvellement ?",
        numfacture:this.selected[0].nunumbordereaux,
        intitule:this.selected[0].intitule,
        organisation:this.selected[0].organisation,
        okButton: 'Oui',
        cancelButton: "Non",
    })
  },
  //gestion du cas demande de renouvellement émis
  handleRequestEmitted(){
    this.$refs.renewcomponent._close();
    this.getSites();
  },
  async askRenewal(){
    let data={
        idsite:this.selected[0].idsiteoper ,
        intitulesite: this.selected[0].intitule 
    }
      this.dto=data
      console.log('dto ',this.dto);
    const ok = await this.$refs.renewcomponent.show({
      title:'Site',
      okButton: 'valider',
      cancelButton: 'Annuler'

    })
  },
  handleDesactivationSet(){
    this.$refs['desactivation-form'].show()
  },
   addSite(){
     this.$refs['site-form'].show()
   },
   showDetails(){ this.$router.push({name: 'details-site', params: { id: this.selected[0].idsiteoper }}); },
   filterList() {
    this.search.departement = this.search.departement.libelle;
    this.search.region = this.search.region.libelle;
    this.search.arrond = this.search.arrond.libelle;
    this.search.entiteForestiere = this.search.entiteForestiere.libelle;
    this.search.typesite = this.search.typesite.libelle;   
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
    handleAddSite() {
      this.getSites();
      this.$bvModal.hide("site-form");
    },
    handleDesactivationOk(){
        this.getSites();
        this.$refs['desactivation-form'].hide();
    },
    handleSiteAddedAndContinue(){
      this.$bvModal.hide("site-form");
      this.getSites();
      setTimeout(() => {this.$bvModal.show("site-form"); }, 500);
    },
    onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
      if(!php.empty(items)){
        this.selected = items;
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
      this.getSites()
    },
    getSites(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("sites", {params}).then(response => {
        console.log("=================== Données de reference / site ==================");
        console.log(response.data.result.items);
        console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
           elt.x = elt.x == null ? "" : this.commify(elt.x)
           elt.y = elt.y == null ? "" : this.commify(elt.y)
           elt.arrond=elt.arrondissement.intitule
           elt.organisation = elt.entite
           elt.entite = elt.entite.substring(0, 7) + '...'
           elt.auth=elt.downloadautorisation

          return elt
        })
	     this.isBusy=false
      })
      .catch((error) => {
        this.isBusy= false;
        return App.alertError(error.response.data.message || "érreur interne du serveur")
      });

    },
    //methode de parsage d'une valeur numérique
    commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : " ");
    },
    filterTable() {
      let data={ 
        typesite:this.search.typesite,
        nonsite:this.search.nonsite,
        region:this.search.region,
        departement:this.search.departement,
        arrondissement:!php.empty(this.search.arrondissement)?this.search.arrondissement.idarrondissement:'',
        invalide:this.search.actif,
        statut:this.search.statut,
        statutRenouv:this.search.statutRenouv,
      }
      if(this.isMinfof){
            if(!php.empty(this.search.entite)){
              data.entite = this.search.entite.idorganisation
            }else{
              data.entite =""
            }
          }else{
            data.entite = this.entite.idorganisation
          }
        this.isBusy=true
        this.$donneesReference.post("sites/search", data).then((response) => {
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
            this.elements = this.elements.map(elt =>{
              elt.x = elt.x == null ? "" : this.commify(elt.x)
              elt.y = elt.y == null ? "" : this.commify(elt.y)
              elt.arrond=elt.arrondissement.intitule
              elt.organisation = elt.entite
              elt.entite = elt.entite.substring(0, 7) + '...'
              elt.auth=elt.downloadautorisation

              return elt
            })
            storage.set(this.$route.path ,JSON.stringify(this.search))
            this.isBusy=false
          })
          .catch((error) => {
            return App.alertError(error.response.data.message || "érreur interne du serveur")
          });
    },
    resetSearcheBar(){
      this.search = {
        typesite: "",
        nomsite: "",
        region: "",
        departement: "",
        arrond: "",
        entiteForestiere: ""
      }
      storage.remove(this.$route.path)
    },
    reset(){
      this.resetSearcheBar()
      this.getSites()
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
    async getTypesSites(){
      this.showOverlaySite=true
      if(!php.empty(this.$store.state.typesSites)){
        this.typesSites= this.$store.state.typesSites
      }
      else{
        try {
            this.typesSites =  await this.$donneesReference.get("sites/types").then(response => response.data.result);
              this.$store.dispatch('typesSites', this.typesSites)
        } catch (error) {
            console.log('error.message');
            this.showOverlaySite=false
           // App.alertError(error.response.data.message || "érreur interne du serveur")
        }
      }
      this.showOverlaySite=false
    },
    onSearchdep(query) {
        this.searchdep = query
        this.offsetdep = 0
    },
    onSearcharrond(query) {
        this.searcharrond = query
        this.offsetarrond = 0
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=800").then(response => response.data.result.items);
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

 },
 
mounted() {
  this.entite.libelle = this.user.profil.organisation;
  if (
    JSON.parse(
      storage.get(this.$route.path) !== "" &&
        JSON.parse(storage.get(this.$route.path) !== null)
    )
  ) {
    this.search = JSON.parse(storage.get(this.$route.path));
    this.filterTable();
  } else {
    this.getSites();
  }
  if(!this.isMinfof){
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
  }
},
};

</script>
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }

</style>

<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}
</style>
