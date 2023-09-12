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
                  <b-col cols="3">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Type d'entité</strong></label><br>
                      <v-select  :options="typesentites" v-model="search.typeentite" :reduce="typeentite => typeentite.key"  label="label" class="custom-select-type_titre"></v-select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="1">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Statut</strong></label><br>
                      <b-form-checkbox class="d-flex justify-content-center aligns-items-center"
                        id="checkbox-1"
                        v-model="search.actif"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                      ></b-form-checkbox>
                    </b-form-group>

                    
                  </b-col>
                  <b-col cols="2">
                    <SigifFormGroupVertical label="sigle" v-model="search.sigle"></SigifFormGroupVertical>
                  </b-col>
                  <b-col cols="1">
                    <SigifFormGroupVertical label="Code" v-model="search.code"></SigifFormGroupVertical>
                  </b-col>
                  <b-col cols="5">
                    <b-form-group  class="m-0 p-0">
                      <label for="" class="font-weight: bold m-0 p-0"><strong>Entité</strong></label><br>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </b-form-group>
                  </b-col>   
                </b-row>
                <b-row>
                  <b-col cols="3">
                    <b-overlay rounded="sm" :show="showOverlayPays">
                        <template #overlay>
                          <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                          </div>
                        </template>
                        <b-form-group  class="m-0 p-0">
                          <label for="" class="font-weight: bold m-0 p-0"><strong>Pays</strong></label><br>
                          <v-select @open="getPays" :options="pays" v-model="search.pays" :reduce="pay => pay.idpays"  label="nom" class="custom-select-type_titre"></v-select>
                        </b-form-group>
                    </b-overlay>  
                  </b-col>
                  <b-col cols="3">
                    <b-overlay rounded="sm" :show="showOverlayReg">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Région</strong></label><br>
                        <v-select  @open="getRegions"  :options="regions" v-model="search.region" :reduce="reg => reg.idregion"  label="intitule" class="custom-select-type_titre"></v-select>
                      </b-form-group>
                    </b-overlay> 
                  </b-col>
                  <b-col cols="3">
                    <b-overlay rounded="sm" :show="showOverlayDep">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Département</strong></label><br>
                        <v-select  @open="getDepartements"  :options="departements" v-model="search.departement" :reduce="dep => dep.iddepartement"  label="intitule" class="custom-select-type_titre"></v-select>
                      </b-form-group>
                    </b-overlay>  
                  </b-col>
                  <b-col cols="3">
                    <b-overlay rounded="sm" :show="showOverlayArrond">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0"><strong>Arrondissement</strong></label><br>
                        <v-select  @open="getArrondissements"  :options="arrondissements" v-model="search.arrondissement" :reduce="arr => arr.idarrondissement"  label="intitule" class="custom-select-type_titre"></v-select>
                      </b-form-group>
                    </b-overlay>
                  </b-col>  
                </b-row>
                <b-row class="mt-2">
                  <b-form-group 
                    label=""
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-checkbox
                    v-model="search.societeexploitation"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-4a"
                    inline
                  >
                    Société agrée exploitation
                  </b-form-checkbox>
                  </b-form-group>
                  <b-form-group 
                    label=""
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-checkbox
                      v-model="search.societeinventaire"
                      :aria-describedby="ariaDescribedby"
                      name="flavour-4b"
                      inline
                    >
                      Société agrée inventaire
                    </b-form-checkbox>
                  </b-form-group>

                  <b-form-group 
                    label=""
                    v-slot="{ ariaDescribedby }"
                  >
                    <b-form-checkbox
                    v-model="search.societesylvicole"
                    :aria-describedby="ariaDescribedby"
                    inline
                  >
                    Société sylvicole
                  </b-form-checkbox>
                  </b-form-group>
                  <b-form-group 
                    label=""
                    v-slot="{ ariaDescribedby }"
                  >
                  <b-form-checkbox
                  v-model="search.societetransformation"
                  :aria-describedby="ariaDescribedby"
                  inline
                >
                  Société de transformation
                </b-form-checkbox>
                  </b-form-group>

                </b-row>
                <b-row align-h="end">
                  <b-col cols="2" class="mr-2">
                      <search-bar-actions-buttons-new @search="filterTable" @reset="reset"/>
                  </b-col>
                </b-row>           
              </b-card>
      </b-collapse>
   </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                 Liste des entités forestières</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateEntiteForestiere" @click.prevent="addEntiteForestiere"  size="sm" :class="{'change-image-opacity': !canCreateEntiteForestiere,  'not-change-image-opacity': canCreateEntiteForestiere}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <confirm-dialogue ref="createdDialogue"></confirm-dialogue>
                <span>
                  <b-button @click.prevent="" :disabled="!canUpdateEntiteForestiere" size="sm" :class="{'change-image-opacity': !canUpdateEntiteForestiere,  'not-change-image-opacity': canUpdateEntiteForestiere}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateEntiteForestiere}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteEntiteForestiere" size="sm" :class="{'change-image-opacity': !canDeleteEntiteForestiere,  'not-change-image-opacity': canDeleteEntiteForestiere}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteEntiteForestiere}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button  @click.prevent="showDetails"  :disabled="!canViewDetailsEntiteForestiere" size="sm" :class="{'change-image-opacity': !canViewDetailsEntiteForestiere,  'not-change-image-opacity': canViewDetailsEntiteForestiere}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsEntiteForestiere}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button @click.prevent="enableEntite" :disabled="!canActiveEntiteForestiere" size="sm" :class="{'change-image-opacity': !canActiveEntiteForestiere,  'not-change-image-opacity': canActiveEntiteForestiere}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Activer</b-button>
                <b-button @click.prevent="disableEntite" :disabled="!canDesactiveEntiteForestiere" size="sm" :class="{'change-image-opacity': !canDesactiveEntiteForestiere,  'not-change-image-opacity': canDesactiveEntiteForestiere}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDesactiveEntiteForestiere}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>desactiver</b-button>
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
                <template #cell(actif)="data">
                     <span v-if="data.item.statut"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

            <!--AJOUT D'UN SITE -->
          <b-modal id="entite-form" size="xl" ref="entite-form"  hide-footer
             header-class="custom-bg" body-class="customm-bg" header-text-variant="light" no-close-on-backdrop>
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
              </template>
              <div>
                <StepFormValidation :action="action" :title="action == 'edit' ?'Edition entitéforrestière' : title"  @entiteAdded="handleAddEntite" @entiteAddedAndContinue="handleAddEntiteAndContinue" @closeForm="hideEntiteForrestiereForm"></StepFormValidation>
                <!--<EntiteForestiereForm :action="action" :title="action == 'edit' ?'Edition entitéforrestière' : title"  @entiteAdded="handleAddEntite" @entiteAddedAndContinue="handleAddEntiteAndContinue" @closeForm="hideEntiteForrestiereForm"/>-->
              </div>
          </b-modal>
  
          <manage-entite-box ref="manageEntiteDialogue"></manage-entite-box>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import StepFormValidation from "@/components/forms/donnees_de_reference/EntiteForrestierreForm.vue";
  import EntiteForestiereForm from "@/components/forms/EntiteForestiereForm.vue";
  import ConfirmDialogue from '@/components/utils/ConfirmDialogue.vue';
  import ManageEntiteBox from '@/components/utils/ManageEntiteBox.vue';
 import { mapGetters } from 'vuex'
export default {
  name: "entite_forestiere",
  components:{
    StepFormValidation,
    EntiteForestiereForm,
    ConfirmDialogue,
    ManageEntiteBox
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
    search:{},
     search:{
        typeentite: "",
        nomentite: "",
        actif: false,
        sigle: "",
        code: "",
        pays: "",
        arrondissement: "",
        departement: "",
        region: "",
        societeexploitation: false,
        societeinventaire: false,
        societesylvicole: false,
        societetransformation: false
    },
    selectedCheck:[],
    typesentites:[{ key: 'communaute', label: 'Communauté' },
                  { key: 'commune', label: 'Commune' },
                  { key: 'operateur forrestier', label: 'Opérateur Forrestier' },
                  { key: 'MINFOF', label: 'MINFOF' },
                  { key: 'Autres', label: 'Autres' },
                  { key: 'Particulier', label: 'Particulier' },
                  { key: 'Certification Privée', label: 'Certification Privée' }],
    optionscheckoxes: [
          { text: 'Société agrée exploitation', value: 'true' },
          { text: 'Société agrée inventaire', value: 'Société agrée inventaire' },
          { text: 'Société sylvicole', value: 'Société sylvicole' },
          { text: 'Société de transformation', value: 'Société de transformation' }
        ],
    entite:{
      id:1,
      libelle:''
    },
    pays:[],
    regions:[],
    departements:[],
    arrondissements:[],
    showOverlayPays:false,
    showOverlayReg:false,
    showOverlayDep:false,
    showOverlayArrond:false,
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
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
        { key: 'raisonsociale', label: 'Nom entité' },
        { key: 'typeorganisation', label: 'Type entité' },
        { key: 'numregcommerce', label: 'Numéro du registre de commerce' },
        { key: 'numcontribuable', label: 'Numéro de contribuable' }, 
        { key: 'arrondissement', label: 'Arrondissement' },
        { key: 'departement', label: 'Département' },
        { key: 'region', label: 'Région',thStyle: { width: "7%" } },
        { key: 'actif', label: 'Actif',thStyle: { width: "5%" } },
        { key: 'email', label: 'Email' },
     

    ],
    elements: [],
    selected:{},
    entite:{
      id:1,
      libelle:''
    },
    

      
    /*propriétes lies au traitement d'une operation de parc */
    action:"add",
    title:"Ajout d'une entite forestiere"
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateEntiteForestiere(){return true; return this.hasAccess('CREER_ENTITE_FORESTIERE')},
    canUpdateEntiteForestiere(){return this.hasAccess('MODIFIER_ENTITE_FORESTIERE')},
    canDeleteEntiteForestiere(){return this.hasAccess('SUPPRIMER_ENTITE_FORESTIERE')},
    canViewDetailsEntiteForestiere(){return this.hasAccess('CONSULTER_ENTITE_FORESTIERE')},
    canActiveEntiteForestiere(){ return true;  return this.hasAccess('ACTIVER_ENTITE_FORESTIERE')},
    canDesactiveEntiteForestiere(){ return true; return this.hasAccess('DESACTIVER_ENTITE_FORESTIERE')},

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
    ...mapGetters(['user','hasAccess'])
  },
 
 methods: {
  async disableEntite() {
      const ok = await this.$refs.manageEntiteDialogue.show({
          title: 'Désactivation',
          message: 'voulez-vous désactiver l\'entite d\'informations :',
          raisonsociale: this.selected[0].raisonsociale,
          typeorganisation: this.selected[0].typeorganisation,
          email: this.selected[0].email,
          okButton: 'Oui',
          cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        this.$donneesReference.put('entites/'+this.selected[0].idsociete+'/desactiver').then(response => {
              this.getEntiteForestieres();
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              return App.alertError(error.message)
          })
          this.$refs.manageEntiteDialogue._close();
      } else {
          this.$refs.manageEntiteDialogue._close();
      }
   },

    async enableEntite() {
      const ok = await this.$refs.manageEntiteDialogue.show({
          title: 'Activation',
          message:"voulez-vous vraiment Activer l\'entite d\'informations :",
          raisonsociale: this.selected[0].raisonsociale,
          typeorganisation: this.selected[0].typeorganisation,
          email: this.selected[0].email,
          okButton: 'Oui',
          cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        this.$donneesReference.put('entites/'+this.selected[0].idsociete+'/activer').then(response => {
              this.getEntiteForestieres();
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              return App.alertError(error.message)
          })
          this.$refs.manageEntiteDialogue._close();
      } else {
          this.$refs.manageEntiteDialogue._close();
      }
   },
   hideEntiteForrestiereForm(){
     this.$refs['entite-form'].hide()
   },
   addEntiteForestiere(){
    this.action="add"
    this.ttile="Ajout d'une entité forrestière"
     this.$refs['entite-form'].show()
   },
  showDetails(){ this.$router.push({name: 'details-entite_forestiere', params: { id: this.selected[0].idsociete }}); },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  handleAddEntite(){
    this.getEntiteForestieres();
    this.$refs['entite-form'].hide();
  },
  handleAddEntiteAndContinue(){
    this.$bvModal.hide("entite-form");
      this.getUsers();
      setTimeout(() => {this.$bvModal.show("entite-form"); }, 500);
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
    this.getEntiteForestieres()
  },
  getEntiteForestieres(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("entites", {params}).then(response => {
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
  async handleCreated() {
            const ok = await this.$refs.createdDialogue.show({
               title: 'Enregistrement',
               message: 'Entité enregistrée avec succès',
               okButton: 'Nouvel enregistrement',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.createdDialogue._close();
                this.$bvModal.show("user-form");
            } else {
               this.$refs.createdDialogue._close();
            }
   },
   async getPays(){
          this.showOverlayPays=true
          if(!this.$store.state.pays){
            this.pays= this.$store.state.pays
          }
          else{
            try {
                this.pays =  await this.$donneesReference.get("pays").then(response => response.data.result.items);
                console.log(this.pays);
                  this.$store.dispatch('pays', this.pays)
            } catch (error) {
                console.log(error.message);
            }
          }
     
          this.showOverlayPays=false
  },
  async getRegions(){
      this.showOverlayReg=true
      if(!this.$store.state.regions){
        this.regions= this.$store.state.regions
      }
      else{
        try {
            this.regions =  await this.$donneesReference.get("regions?size=800").then(response => response.data.result.items);
              this.$store.dispatch('regions', this.regions)
        } catch (error) {
            console.log(error.message);
        }
      }
      this.showOverlayReg=false
  },
  async getDepartements(){
      this.showOverlayDep=true
      if(!this.$store.state.pays){
        this.departements= this.$store.state.departements
      }
      else{
        try {
            this.departements =  await this.$donneesReference.get("departements").then(response => response.data.result.items);
              this.$store.dispatch('departements', this.departements)
        } catch (error) {
            console.log(error.message);
        }
      }
      this.showOverlayDep=false
  },
  async getArrondissements(){
      this.showOverlayArrond=true
      if(!this.$store.state.arrondissements){
        this.arrondissements= this.$store.state.arrondissements
      }
      else{
        try {
            this.arrondissements =  await this.$donneesReference.get("arrondissements?size=800").then(response => response.data.result.items);
              this.$store.dispatch('arrondissements', this.arrondissements)
        } catch (error) {
            console.log(error.message);
        }
      }
      this.showOverlayArrond=false
  },
  filterTable() {
    this.isBusy=true
    console.log('selected ',this.selectedCheck);
    this.$donneesReference.post("entites/search", this.search).then((response) => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

        storage.set(this.$route.path ,JSON.stringify(this.search))
        this.isBusy=false
      })
      .catch((error) => {
        this.isBusy=false
      });
  },
  resetSearcheBar(){
    this.search = {
        typeentite: "",
        nomentite: "",
        actif: false,
        sigle: "",
        code: "",
        pays: "",
        arrondissement: "",
        departement: "",
        region: "",
        societeexploitation: false,
        societeinventaire: false,
        societesylvicole: false,
        societetransformation: false
    }
    storage.remove(this.$route.path)  
  },
  reset(){
    this.resetSearcheBar()
    this.getEntiteForestieres()
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
      this.getEntiteForestieres();
    }
    if (this.entite.libelle !== "MINFOF") {
      this.disabled = true;
    }
  },
};

// this.getEntiteForestieres();
  

</script>
<style scoped>

.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
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
  background-color: #82c138
}
</style>

<style>
.customm-bg {
  background-color: #e3e3e3
}
</style>