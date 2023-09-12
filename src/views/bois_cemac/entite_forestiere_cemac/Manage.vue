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
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des entités forestières</h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="canCreateUtilisateur" @click.prevent="addEntiteForestiere" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a  @click.prevent="showDetails" :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>
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
           Aucune<span class="font-weight-bold">entié forrestière CEMAC</span> trouvé!!
          </h4>
        </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

             <!--AJOUT D'UNE entite forrestiere cemac -->
          <b-modal id="entite-cemac-form" size="lg" ref="entite-cemac-form"  hide-footer
             header-class="custom-bg" body-class="customm-bg"
             
             header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <EntiteForestiereCemacForm @entiteAdded="handleAddEntite" @closeForm="hideEntiteForestiereCemacForm"/>
              </div>
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import UserForm from '@/components/Administration/UserForm.vue';
  import EntiteForestiereCemacForm from "@/components/forms/EntiteForestiereCemacForm.vue";
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "entite_forestiere",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
    EntiteForestiereCemacForm
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
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],


    //données du tableaux
    fields: [
       
        { key: 'nom', label: 'Nom entité' },
        { key: 'actif', label: 'Actif' },
        { key: 'email', label: 'Email' },
        { key: 'telephone', label: 'Téléphone' }, 
        { key: 'adresse', label: 'Adresse' },
       

    ],
    elements: [


    ],

    selected:{},

     entite:{
      id:1,
      libelle:''
    },
    
    /*propriétes lies au traitement d'une operation de parc */

     title:"Enregistrement d'une entité forestière(CEMAC)"

  }),

  computed:{
    ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
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
     ...mapGetters(['user'])
  },
 
 methods: {
   showDetails(){ this.$router.push({name: 'details_entite_forestiere_cemac', params: { id: this.selected[0].numlot }}); },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  addEntiteForestiere(){
     this.$refs['entite-cemac-form'].show()
   },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
   async getPays(){
          this.showOverlayPays=true
          if(!this.$store.state.pays){
            this.pays= this.$store.state.pays
          }
          else{
            try {
                this.pays =  await this.$donneesReference.get("pays").then(response => response.data.result.items);
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
    this.getEntiteForestieresCemac()
  },
getEntiteForestieresCemac(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$boisCemac.get("entites", {params}).then(response => {
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
     filterTable() {
      this.isBusy=true
      this.$boisCemac.post("entites/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
     
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
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
      societesylvicole: false
    }
     localStorage.removeItem('sigif2./code_barres')
     
  },

    reset(){
    this.resetSearcheBar()
    this.getEntiteForestieresCemac()
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
      this.getEntiteForestieresCemac();
    }
    if (this.entite.libelle !== "MINFOF") {
      this.disabled = true;
    }
  },
};

  
    // this.getEntiteForestieres();
  

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