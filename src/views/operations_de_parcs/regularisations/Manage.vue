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
                    <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }" >
                    </li>
                  </ul>  
                </b-button>
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
                            <input class="sigif-input-date" type="date" v-model="search.datedeb" format="YYYY-MM-DD"/>
                            <input class="sigif-input-date" type="date" v-model="search.datefin" format="YYYY-MM-DD"/>
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
              <b-col><h4 class="tab-header-left-text">Liste des regularisations des entrées de parc
              </h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="!canCreateRegularisation"  @click.prevent="CreateRegularisation"  :class="{'change-image-opacity': !canCreateRegularisation,  'not-change-image-opacity': canCreateRegularisation}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                
                  <b-button  v-if="canUpdateRegularisation" size="sm" :class="{'change-image-opacity': !canUpdateRegularisation,  'not-change-image-opacity': canUpdateRegularisation}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button v-if="canDeleteRegularisation" size="sm" :class="{'change-image-opacity': !canDeleteRegularisation,  'not-change-image-opacity': canDeleteRegularisation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button :disabled="!canViewDetailsRegularisation" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsRegularisation,  'not-change-image-opacity': canViewDetailsRegularisation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button v-if="isMinfof" @click.prevent="validateRegulatisation" :disabled="!canSaveRegularisation||!isToValidate"  size="sm"
              :class="{'change-image-opacity': !canSaveRegularisation||!isToValidate,
              'not-change-image-opacity': canSaveRegularisation&&isToValidate}" 
              class="mx-1 simple-btn"
                  >
                    <b-img src="@/assets/images/iconVALIDER_16x16.png">
                    </b-img>valider
                  </b-button>
                  <b-button 
                    @click.prevent="submitRegularisation"
                    v-if="canSubmitRegularisation && isToSubmit" 
                    size="sm" 
                    :class="{'change-image-opacity': !canSubmitRegularisation||!isToSubmit,  'not-change-image-opacity': canSubmitRegularisation&&isToSubmit}" 
                    class="mx-1 simple-btn">
                    <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
                    soumettre
                    </b-button>
                  <b-button @click="imprimerEntreeRegularisation" :disabled="!canPrintRegularisation" size="sm" :class="{'change-image-opacity': !canPrintRegularisation,  'not-change-image-opacity': canPrintRegularisation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer</b-button>
                  <b-dropdown toggle-class='customDropdown not-change-image-opacity' style="color:green;" variant='none' class="customDropdown m-md-2" id="dropdown-1" text="autre action">
                    <b-dropdown-item @click.prevent="showListingLotsRegularisation">Listing des lots de régularisation</b-dropdown-item>
                  </b-dropdown>  
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
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
              <template v-slot:head(idoperation)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(dateope)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(heureoper)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(intituleSite)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(libelletypeopeparc)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(statutenr)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
              </template>
              <template #empty>
                     <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">régularisation</span> trouvée!!</h4>
              </template>
               <template #cell(index)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ ++data.index }}</b> </span>
              </template>
              <template #cell(idoperation)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.idoperation }}</b> </span>
              </template>
              <template #cell(dateope)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.dateope }}</b> </span>
              </template>
              <template #cell(heureoper)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.heureoper }}</b> </span>
              </template>
              <template #cell(intitulesite)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.intituleSite }}</b> </span>
              </template>
              <template #cell(libelletypeopeparc)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.libelletypeopeparc }}</b> </span>
              </template>
              <template #cell(statutenr)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.statutenr }}</b> </span>
              </template>
            </b-table>
              <!--AJOUT DE LA PAGINATION -->
              <paginator 
                hr="top" 
                :offset="offset" :total="total" :limit="perPage" 
                :page="currentPage" @pageChanged="changePage" 
                @limitChanged="(limit) => {perPage = limit}" 
              />  
          </div>
          <EntreeRegDialog ref="listingEntreeReg"></EntreeRegDialog>
        </b-overlay>

 
    <OpeParcDialog ref="opeparcDialogue"></OpeParcDialog>

  </div>
    
</template>

<script>
import OpeParcDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'

  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from 'vuex'
  import EntreeParcOption from '@/components/Operations-parc/EntreeParcOption.vue'
  import EntreeRegDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
export default {
  name: "regularisations",
  components: {
    EntreeParcOption,EntreeRegDialog,
    OpeParcDialog
  },
  data: () => ({
    offsetEntites: 0,
    limitEntites: 10,
    searchentite:'',
    entiteswithoutminfof:[],
    showOverlayEntites:false,
    isRowselected:false,
     isBusy:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    show:false,
    isToValidate:false,
    isToSubmit:false,
    visible: true,
    search:{},
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    showOverlaySite:false,
    sites:[],
    offsetSites: 0,
    limitSites: 10,
    //données du tableaux
    fields: [ { key: 'index', label: '' },{ key: 'idoperation', label: 'Entrée No' }, { key: 'dateope', label: 'Date Opération' },
              { key: 'heureoper', label: 'heure' }, { key: 'intituleSite', label: 'Site' }, 
              { key: 'libelletypeopeparc', label: 'Type Opération' }, { key: 'statutenr', label: 'statut' }],
    elements: [],
    selected:{},
    submitted:false,
    /*propriétes lies au traitement d'une operation de parc */
    optionsEntites:[],
    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumis"}, {key:"2", libelle: "validé"}, {key:"3", libelle: "Soumission en cours"}],
    search:{
      site:"",
      entite:'',
      statut:"",
	    datedeb: "",
	    datefin: ""
    },
    entite:{
      idorganisation:'',
      libelle:''
    },
    searchSubmitted:false,
    searchsite:"",

    /**propriétées de gestion des boutons valider et soumettre*/
    idoperation:'',
    title:'',
    action:''
  }),
  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
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
    canCreateRegularisation(){ return true; return this.hasAccess('CREER_REGULARISATIONS') },
    canUpdateRegularisation(){  return this.hasAccess('MODIFIER_REGULARISATIONS') },
    canDeleteRegularisation(){  return this.hasAccess('SUPPRIMER_REGULARISATIONS') },
    canViewDetailsRegularisation(){ return true; return this.hasAccess('CONSULTER_REGULARISATIONS') },
    canSaveRegularisation(){  return true;return this.hasAccess('CREER_REGULARISATIONS') },
    canSubmitRegularisation(){ return true; return this.hasAccess('SOUMETTRE_REGULARISATIONS') },
    canPrintRegularisation(){  
      if(php.empty(this.selected)){
        return false
       } else return true
      return true; return this.hasAccess('IMPRIMER_REGULARISATIONS') 
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
    filtered() {
        return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase()))
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
  },
 
 methods: {
  onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
  //lising des lots de régularisation
  showListingLotsRegularisation(){
    this.$refs.opeparcDialogue.show({
        title:'Listing des lots de régularisation',
        showStatut:true,
    })
  },
  showDetails(){ this.$router.push({name: 'details-regularisations', params: { id: this.selected[0].idoperation }}); },
  imprimerEntreeRegularisation(){
    this.$refs.listingEntreeReg.show({
      title:'Impression d\'une entrée régularisation',
        commande:6,
        idoperation:this.selected[0].idoperation
    })
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
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },

  CreateRegularisation() {
      this.$router.push({ name: "create-regularisations" });
    },
  onRowSelected(items) {
    items.isSelected = true;
      this.isRowselected = true;
      
      this.selected = items;
      // console.log(items)

      if(!php.empty(this.selected[0])){
      
        if(this.selected[0].statutenr=='Brouillon'){
          this.isToValidate=true
          this.isToSubmit=false
        }
        else if(this.selected[0].statutenr=='Validée'){
          this.isToValidate=false
          this.isToSubmit=true
        }
        else{
          this.isToValidate=false
          this.isToSubmit=false
        }
      }
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
    this.getRegularisations()
  },
   getRegularisations(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$operationParc.get("regulations", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        this.elements = this.elements.map(elt =>{
          elt.dateope =
              elt.dateope !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
            elt.heureoper =
              elt.heureoper !== null
                ? this.$dayjs(elt.heureoper).format("HH:mm")
                : "";

          return elt
        })
		      this.isBusy=false
      })
      .catch((error) => {
        console.log(error)
      });

  },

  filterTable(){
    let data={ site: this.search.site.IDSITEOPER, datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.entite.idorganisation, statut: this.search.statut }
    console.log('response',this.search);
    this.isBusy=true
    this.$operationParc.post("regulations/search", data).then((response) => {
      console.log('response entrées',response);
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage + 1
      this.elements=response.data.result.items
      
      this.elements = this.elements.map(elt =>{
        elt.dateope =
            elt.dateope !== null
              ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
              : "";
          elt.heureoper =
            elt.heureoper !== null
              ? this.$dayjs(elt.heureoper).format("HH:mm")
              : "";

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
    this.getRegularisations()
  },
  resetSearcheBar() {
    this.search = {
      site: "",
      datedeb: "",
      datefin: "",
      entite: "",
      statut: ""
    };
    localStorage.removeItem("sigif2./entree_parcs");
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
  onSearch(query) {
      this.searchsite = query
      this.offsetSites = 0
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
    }

   
 
 },
  mounted(){
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getRegularisations();}
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
  color:#82C138;
  cursor:pointer;
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