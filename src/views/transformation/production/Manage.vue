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
            <b-collapse id="collapse-4" v-model="visible" class="mx-3 px-3">
              <b-row class="d-flex justify-content-between">
                <b-col cols="4">
                  <sigif-form-group label="Identifiant du lot" :sizeLabel="6" :sizeLabelLg="5"  v-model="search.idlot" class=""/>
                </b-col>
                <b-col cols="3">
                <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-for="input-sm">
                  <template #label><span class="x1fh d-flex justify-content-end">ligne</span></template>
                    <v-select  v-model="search.ligne" :filterable="false" label="INTITULE"  class="custom-select-type_titre">
                      
                    </v-select>
                </b-form-group>
                </b-col>
                <b-col clos="5"> 
       
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group
                            id="fieldset-horizontal"
                            label-cols-sm="3"
                            label-cols-lg="2"
                            content-cols-sm
                            content-cols-lg="8"
                            lebel=""
                            label-for="input-horizontal"
                          >
                          <template #label><span class="x1fh d-flex justify-content-end">entité</span></template>

                          <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
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
              <b-row class="d-flex justify-content-between">
                <b-col cols="4">
                  <b-form-group
                          id="fieldset-horizontal"
                          label-cols-sm="6"
                          label-cols-lg="5"
                          content-cols-sm
                          content-cols-lg="6"
                          label="Date opération"
                          label-for="input-horizontal"
                        >
                        <template #label>
                          <span class="x1fh">date opération</span>
                        </template>
                        <div class="d-flex justify-content-between">
                          <input style="width:48%" class="sigif-input-date" type="date" v-model="search.datedeb" format="YYYY-MM-DD"/>
                          <input style="width:48%" class="sigif-input-date" type="date" v-model="search.datefin" format="YYYY-MM-DD"/>
                        </div>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-for="input-sm">
                  <template #label><span class="x1fh d-flex justify-content-end">site</span></template>
                    <v-select  v-model="search.ligne" :filterable="false" label="INTITULE"  class="custom-select-type_titre">
                      
                    </v-select>
                </b-form-group>
                </b-col>
                <b-col clos="5"> 
       
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group
                            id="fieldset-horizontal"
                            label-cols-sm="3"
                            label-cols-lg="2"
                            content-cols-sm
                            content-cols-lg="8"
                            lebel=""
                            label-for="input-horizontal"
                          >
                          <template #label><span class="x1fh d-flex justify-content-end">statut</span></template>

                          <select v-if="isMinfof" v-model="search.statut" class="m-0 p-0" style="width: 30%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatutMinfof" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                          <select v-else v-model="search.statut" class="m-0 p-0" style="width: 30%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                        <div style="float:right; width: 250px !important" class="">
                          <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                        </div>                                                                                 
                      </b-form-group>
                    </b-overlay>
      
                </b-col>
                
              </b-row>
                
                
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">Lots de production</h4></b-col>
              <b-col class="col-md-auto">
                 <a @click.prevent="createProduction"  :disabled="!canCreateProduction"  size="sm" :class="{'change-image-opacity': !canCreateProduction,  'not-change-image-opacity': canCreateProduction}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <b-button @click.prevent="updateLot" :disabled="!canUpdateLotProduction||!isEditable" size="sm" :class="{'change-image-opacity': !canUpdateLotProduction||!isEditable,  'not-change-image-opacity': canUpdateLotProduction&&isEditable}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>

                  <!--<b-button :disabled="!canUpdateProduction" size="sm" :class="{'change-image-opacity': !canUpdateProduction,  'not-change-image-opacity': canUpdateProduction}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>-->
                  <b-button :disabled="!canDeletProduction" size="sm" :class="{'change-image-opacity': !canDeletProduction,  'not-change-image-opacity': canDeletProduction}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button :disabled="!canViewDetailsProduction" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsProduction,  'not-change-image-opacity': canViewDetailsProduction}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button :disabled="!canSubmitProduction||isMinfof" @click.prevent="soumettreLotProduction" size="sm" :class="{'change-image-opacity': !canSubmitProduction||isMinfof,  'not-change-image-opacity': canSubmitProduction}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  bordered sort-icon-left :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
                    Pas de 
                    <span class="font-weight-bold">Lots</span> trouvés!!
                  </h4>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(statut)="data">
                  <span v-if="data.item.statut=='0'" pill variant="danger">BROUILLON</span>
                  <span v-else-if="data.item.statut=='1'" pill variant="success">SOUMIS</span> 
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
      <transformation-box ref="transformationDialogue"></transformation-box>

    </div>
</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import TransformationBox from '@/components/utils/transformation/ConfirmBoxDetail.vue';

  import { mapGetters } from 'vuex'
export default {
  name: "productions",
  components:{
    TransformationBox
  },
  data: () => ({
    showOverlayEntites:false,
    showOverlayLignes:false,
    lignes : [],
    offsetlignes: 0,
    limitlignes: 10,
    //   checkbox 
    production:{},
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
      datedeb: "",
      datefin: "",
	    entite: "",
	    statut: "",
      idlot: "",
	    ligne: "",
	    site: ""
    },
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
        { key: 'idlot', label: 'Identifiant du lot', sortable: true },
        { key: 'dateoper', label: 'Date de production', sortable: true },
        { key: 'entite', label: 'Entité', sortable: true },
        { key: 'site', label: 'Site de production', sortable: true },
        { key: 'ligne', label: 'Ligne', sortable: true },
        { key: 'statut', label: 'Statut', sortable: true },
    ],
    elements: [],
    selected:{},
    search:{
      datedeb: "",
      datefin: "",
      entite: "",
      statut: "",
      idlot: "",
      ligne: "",
      site: ""
    },
    searchligne:null,
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    isEditable(){
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='0'||!php.empty(this.selected[0])&&this.selected[0].statut=='3'){
        return true;
      }
      else{
        return false;
      }
    },
    filteredLignes() {
      return this.lignes.filter((ligne) =>
        ligne.INTITULE.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
      )
    },
    paginatedLignes() {
      return this.lignes.slice(this.offsetlignes, this.limitlignes + this.offsetlignes)
    },
    hasNextPageLignes() {
      const nextOffset = this.offsetlignes + this.limitlignes
      return Boolean(
        this.filteredLignes.slice(nextOffset, this.limitlignes + nextOffset).length
      )
    },
    hasPrevPageLignes() {   
        const prevOffset = this.offsetlignes - this.limitlignes
        return Boolean(
          this.filteredLignes.slice(prevOffset, this.limitlignes + prevOffset).length
        )
    },
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateProduction(){ return true; return this.hasAccess('CREER_PRODUCTION') },
    canUpdateLotProduction(){ return true; return this.hasAccess('MODIFIER_PRODUCTION') },
    canDeletProduction(){ return this.hasAccess('SUPPRIMER_PRODUCTION') },
    canViewDetailsProduction(){ return true; return this.hasAccess('CONSULTER_PRODUCTION') },
    canSaveProduction(){ return this.hasAccess('CREER_PRODUCTION') },
    canSubmitProduction(){ 
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='0' ){
        return true;
      }
      else{
        return false
      } },

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
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  methods: {
    //methode de soumission d'un lot de production
    async soumettreLotProduction() {
            const ok = await this.$refs.transformationDialogue.show({
              commande:'LotDeProduction',
               title: 'Soumission',
               message:"Lot de production à soumettre : ",
               entite:this.selected[0].organisation,
               site:this.selected[0].site,
               ligne:this.selected[0].ligne,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$transformation.patch('productions/'+this.selected[0].idlot+'/soumettre').then(response => {
                    this.submitted = false 
                    this.getProductions();
                    App.notifySuccess(response.data.message)
                    return this.$refs.transformationDialogue._close();
                }).catch(error => {
                    this.submitted = false
                    return App.alertError(error.message)
                })
            } else {
               this.$refs.transformationDialogue._close();
            }
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (this.$store.state.entites !== null &&this.$store.state.entites.length > 0) {
        this.entites = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=1000").then(response => response.data.result.Items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
    },
    //recupération des lignes de l'organisation connectée ; la requète est esnvoyé lorsqu'on essaie de selectionner un ligne pour la première fois
    async getLignes(){
      this.showOverlayLignes = true;
      try {
        this.lignes = await this.$transformation.get("lignes-transformation/raw").then(response =>   response.data.result);
        console.log('lignes ',this.lignes);
        this.showOverlayLignes = false;
      } catch (error) {
        this.showOverlayLignes = false;
      }
    },
    showDetails(){ this.$router.push({name: 'detail-production', params: { id: this.selected[0].idlot }}); },
    updateLot(){
      this.$router.push({
        name: "modification_lot_production",
        params: { id: this.selected[0].idlot },
      });
    },
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },

    createProduction() {
        this.$router.push({ name: "create-productions" });
      },

    onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
      if(!php.empty(items)){
        this.selected = items;
      }
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
      this.getProductions()
    },
    getProductions(){
        this.isBusy=true
        const params = this.getRequestParams( this.currentPage,this.pageSize);
        this.$transformation.get("productions", {params}).then(response => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items

          this.formatContent(this.elements)
          this.isBusy=false
        })
        .catch((error) => {
          console.log(error)
        });

    },
    formatContent(data){
      data = data.map(elt =>{
        elt.organisation = elt.entite == null ? "" : elt.entite
        elt.entite = elt.entite == null ? "" : elt.entite.substring(0, 15) + '...'
        elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""

        return elt;
      });
    },
    filterTable() {
      let data={ datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.search.entite.idorganisation, statut: this.search.statut, 
      identifiant:this.search.identifiant, intitule: this.search.intitule, description:this.search.description, motifrejet:this.search.motifrejet }
        this.isBusy=true
        this.$transformation.post("productions/search", data).then((response) => {
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.formatContent(this.elements);
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
        idlot: "",
        site: "",
        ligne: "",
        datedeb: "",
        datefin: "",
        statut: "",
        entite: "",
      }
      localStorage.removeItem('sigif2./transformation-productions')
      
    },
    reset(){
      this.resetSearcheBar()
      this.getProductions()
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
    onSearchLigne(query){
        this.searchligne = query
        this.offsetlignes = 0
    },

  },
 

  mounted(){
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getProductions();}
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
.sigif-input-date{
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

</style>