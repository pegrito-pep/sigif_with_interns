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
            <sigif-form-group label="Identifiant" :sizeLabel="6" :sizeLabelLg="5"  v-model="search.identifiant" class=""/>
          </b-col>
            <b-col cols="3">
              <b-overlay rounded="sm" :show="showOverlaySites">
                <template #overlay>
                  <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p id="cancel-label">Chargement...</p>
                  </div>
                </template>
                <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-for="input-sm">
                  <template #label><span class="x1fh d-flex justify-content-end">site</span></template>
                    <v-select @open="getSites" :options="paginatedSites" v-model="search.site" :filterable="false" label="INTITULE" @search="onSearchSite"  class="custom-select-type_titre">
                      <li slot="list-footer" class="pagination">
                        <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                        <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                      </li>
                    </v-select>
                </b-form-group>
              </b-overlay>
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
            <sigif-form-group label="intitulé ligne" :sizeLabel="6" :sizeLabelLg="5"  v-model="search.intitule" class=""/>
          </b-col>
          <b-col cols="3">
            <sigif-form-group label="motif du rejet" :sizeLabel="6" :sizeLabelLg="5"  v-model="search.motifrejet" class=""/>

          </b-col>
          <b-col clos="5"> 
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
          </b-col>
          
        </b-row>
      </b-collapse>
    </div>
    <!--entete des tableaux -->
    <div class="m-0 px-2 table-header-border">
      <b-row>
        <b-col
          ><h4 class="tab-header-left-text">
            Liste des lignes de transformation
          </h4></b-col
        >
        <b-col class="col-md-auto">
          <b-button :disabled="!canCreateLigneTransformation" @click.prevent="addLigne" size="sm" :class="{'change-image-opacity': !canCreateLigneTransformation,  'not-change-image-opacity': canCreateLigneTransformation}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
          <span >
            <b-button @click.prevent="updateLigne" :disabled="!canUpdateLigneTransformation||!isEditable" size="sm" :class="{'change-image-opacity': !canUpdateLigneTransformation||!isEditable,  'not-change-image-opacity': canUpdateLigneTransformation&&isEditable}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
            <b-button :disabled="!canDeleteLigneTransformation" size="sm" :class="{'change-image-opacity': !canDeleteLigneTransformation,  'not-change-image-opacity': canDeleteLigneTransformation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
            <b-button :disabled="!canViewDetailsLigneTransformation" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsLigneTransformation,  'not-change-image-opacity': canViewDetailsLigneTransformation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
            <!--<b-button :disabled="!canSaveLigneTransformation" size="sm" :class="{'change-image-opacity': !canSaveLigneTransformation,  'not-change-image-opacity': canSaveLigneTransformation}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>-->
            <b-button :disabled="!canSubmitLigneTransformation" @click.prevent="submitLigneTransformation" size="sm" :class="{'change-image-opacity': !canSubmitLigneTransformation,  'not-change-image-opacity': canSubmitLigneTransformation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
            <b-button :disabled="!canApprouveLigneTransformation||!isMinfof" @click.prevent="approuverLignetransformation" size="sm" :class="{'change-image-opacity': !canApprouveLigneTransformation||!isMinfof,  'not-change-image-opacity': canApprouveLigneTransformation&&isMinfof}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver</b-button>
            <b-button :disabled="!canRejectLigneTransformation||!isMinfof"  @click.prevent="rejeterLignetransformation" size="sm" :class="{'change-image-opacity': !canRejectLigneTransformation,  'not-change-image-opacity': canRejectLigneTransformation}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Rejeter</b-button>
          </span>    
        </b-col>
      </b-row>
    </div>
    <!--implémentation tableau proprement dite-->
    <div class="ml-1">
      <b-table
        bordered 
        sort-icon-left 
        :busy="isBusy"
        select-mode="single"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        :items="items"
        :fields="fields"
        :tbody-tr-class="rowClass"
      show-empty>
        <template #table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">chargement...</strong>
          </div>
        </template>
        <template #empty>
          <h4 style="color: green" class="text-center">
            Pas de 
            <span class="font-weight-bold">Lignes</span> trouvés!!
          </h4>
        </template>
        <template #cell(index)="data"
          ><b class="ml-1" style="color: #175131 !important">{{
            ++data.index
          }}</b>
        </template>
        <template #cell(statut)="data">
          <span v-if="data.item.statut=='0'" class="text-uppercase">brouillon</span>
          <span v-else-if="data.item.statut=='1'" class="text-uppercase">soumis</span> 
          <span v-else-if="data.item.statut=='2'" class="text-uppercase">validé</span> 
          <span v-else-if="data.item.statut=='3'" class="text-uppercase">rejeté</span> 
        </template>
      </b-table>
      <!--AJOUT DE LA PAGINATION -->
      <paginator
        hr="top"
        :offset="offset"
        :total="total"
        :limit="perPage"
        :page="currentPage"
        @pageChanged="changePage"
        @limitChanged="
          (limit) => {
            perPage = limit;
          }
        "
      />
    </div>
      <transformation-box ref="transformationDialogue"></transformation-box>
  </div>
</template>

<script>
const php = require("phpjs");
  import { mapGetters } from 'vuex'
  import TransformationBox from '@/components/utils/transformation/ConfirmBoxDetail.vue';

export default {
  name: "lignes_transformation",
  components:{
    TransformationBox
  },
  data: () => ({
    isBusy: false,
    isRowselected: false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{
      identifiant: "",
      intitule: "",
      description: "",
	    motifrejet: "",
	    unite: "",
	    statut: "",
	    entite: "",
    },
    entite:{
      id:1,
      libelle:''
    },
    entites:[],
    showOverlayEntites:false,
    offsetEntites:0,
    limitEntites:10,
    searchentite:'',
    showOverlaySites:false,
    searchsite:'',
    utbs:[],
    offsetSites:0,
    limitSites:10,
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumis"}, {key:"2", libelle: "validé"}, {key:"3", libelle: "rejeté"}],
    optionsStatutMinfof:[{key:"", libelle: ""}, {key:"1", libelle: "Soumis"}, {key:"2", libelle: "validé"}, {key:"3", libelle: "rejeté"}],
    //données du tableaux
    fields: [
      { key: "index", label: "" },
      { key: "idligne", label: "Identifiant" },
      { key: "intitule", label: "Intitulé de la ligne", sortable: true},
      { key: "entite", label: "Entité",sortable: true },
      { key: "uniteproduction", label: "Unité de transformation",sortable: true },
      { key: "description", label: "Description",sortable: true },
      { key: "motifrejet", label: "Motif de rejet",sortable: true },
      { key: "statut", label: "Statut",sortable: true },
    ],
    elements: [],
    selected: {},
    /* elements form ajout ligne de transformation */
    headerBgVariant: "success",
    bodyBgVariant: "light",
    title:"Ajout d'une ligne de transformation"
  }),
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  computed: {
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
    /*propriétés liées aux accèes*/
    canCreateLigneTransformation(){ return true; return this.hasAccess('CREER_LIGNES_DE_TRANSFORMATION') },
    canUpdateLigneTransformation(){ return true; return this.hasAccess('MODIFIER_LIGNES_DE_TRANSFORMATION') },
    canDeleteLigneTransformation(){ return this.hasAccess('SUPPRIMER_LIGNES_DE_TRANSFORMATION') },
    canViewDetailsLigneTransformation(){ return true; return this.hasAccess('CONSULTER_LIGNES_DE_TRANSFORMATION') },
    canSaveLigneTransformation(){ return this.hasAccess('VALIDER_LIGNES_DE_TRANSFORMATION') },

    canSubmitLigneTransformation(){ 
      /*if(this.hasAccess('SOUMETTRE_LIGNES_DE_TRANSFORMATION') && this.selected[0].statut=='BROUILLON' ){*/
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='0' ){
        return true;
      }
      else{
        return false
      }
    },
    canApprouveLigneTransformation(){
      /*if(this.hasAccess('APPROUVER_ENTREE_USINAGE_SITE') && this.selected[0].statut=='SOUMIS' ){*/
        if(!php.empty(this.selected[0])&&this.selected[0].statut=='1' ){
        return true;
      }
      else{
        return false
      }
    },
    canRejectLigneTransformation(){
      /*if(this.hasAccess('REJETER_ENTREE_USINAGE_SITE') && this.selected[0].statut=='SOUMIS' ){*/
        if(!php.empty(this.selected[0])&&this.selected[0].statut=='1' ){
        return true;
      }
      else{
        return false
      }
    },

    items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },

    //utbs
    //sites
    filteredSites() {
      return this.utbs.filter((site) =>
      site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase())
      )
    },
    paginatedSites() {
      return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetSites)
    },
    hasNextPageSites() {
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filteredSites.slice(nextOffset, this.limitSites + nextOffset).length
      )
    },
    hasPrevPageSites() {   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filteredSites.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },

    //Entités
    filteredEntites() {
      return this.entites.filter((entite) =>
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
    approuverLignetransformation(){
      this.alertBeforeact('1')
    },
    rejeterLignetransformation(){
      this.alertBeforeact('2')
    },
    async alertBeforeact(commande){
      let title, message=''
      if(commande=='1'){
        title='approbation'
        message='ètes-vous sur de vouloir approuver cette ligne ?'
      }
      else if(commande=='2'){
        title='rejet'
        message='ètes-vous sur de vouloir rejetter cette ligne ?'

      }
      const ok = await this.$refs.transformationDialogue.show({
               commande:'ligne de transformation',
               title: title,
               message:message,
               entite:this.selected[0].organisation,
               site:this.selected[0].uniteproduction,
               ligne:this.selected[0].intitule,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              if(commande=='1'){
                this.showOverlay = true;
                this.$transformation.patch('lignes-transformation/'+this.selected[0].idligne+'/approuver').then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getLignesTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              else if(commande=='2'){
                this.showOverlay = true;
                this.$transformation.patch('lignes-transformation/'+this.selected[0].idligne+'/rejeter').then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getLignesTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              this.$refs.transformationDialogue._close();
            } else {
               this.$refs.transformationDialogue._close();
            }
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entites = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entites= await this.$donneesReference.get("entites/entite_forestier?size=1000").then(response => response.data.result.items);
          this.$store.dispatch('entiteswithoutminfof', this.entites)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
    },
    async getSites(){
    this.showOverlaySites=true;
    if(!this.$store.state.sites){
      this.sites=this.$store.state.sites;
      this.utbs=this.sites.filter(elt => elt.IDORGASITEPUUTB ==this.user.idOrganisation&&elt.TYPESITEOPER=='UTB')
    this.showOverlaySites=false;

    }
    else{
      try {
          this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
          this.$store.dispatch('sites', this.sites)
          this.utbs=this.sites.filter(elt =>elt.IDORGASITEPUUTB ==this.user.idOrganisation&&elt.TYPESITEOPER=='UTB')
          this.showOverlaySites=false;
        } catch (error) {
            console.log(error.message);
        }
    }
    },
    //methode de soumission d'une ligne de transformation
    async submitLigneTransformation() {
            const ok = await this.$refs.transformationDialogue.show({
              commande:'entreeUsinage',
               title: 'Soumission',
               message:"ètes-vous sur de vouloir soumettre la ligne : ",
               entite:this.selected[0].organisation,
               site:this.selected[0].uniteproduction,
               ligne:this.selected[0].intitule,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$transformation.patch('lignes-transformation/'+this.selected[0].idligne+'/soumettre').then(response => {
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
    //methode d'approbation d'une entrée usinage
    async approuveLigneTransformation() {
            const ok = await this.$refs.transformationDialogue.show({
               commande:'entreeUsinage',
               title: 'Approbation',
               message:"Entrée usinage à soumettre : ",
               entite:this.selected[0].entite,
               site:this.selected[0].site,
               ligne:this.selected[0].ligne,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$transformation.patch('lignes-transformation/'+this.selected[0].idligne+'/approuver').then(response => {
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
    //methode de rejet d'une entrée usinage
    async rejectLigneTransformation() {
            const ok = await this.$refs.transformationDialogue.show({
               commande:'entreeUsinage',
               title: 'Approbation',
               message:"Entrée usinage à soumettre : ",
               entite:this.selected[0].entite,
               site:this.selected[0].site,
               ligne:this.selected[0].ligne,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$transformation.patch('lignes-transformation/'+this.selected[0].idligne+'/rejeter').then(response => {
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
    addLigne() {
      this.$router.push({ name: "create-lignes_de_transformation" });
      //this.$refs['lettreLv-form'].show()
  },
    filterTable() {
      let data={ datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.search.entite.idorganisation, statut: this.search.statut, 
      identifiant:this.search.identifiant, intitule: this.search.intitule, description:this.search.description, motifrejet:this.search.motifrejet }

      this.isBusy=true
      this.$transformation.post("lignes-transformation/search", data).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.formatContent(this.elements)
            /*this.elements = this.elements.map(elt =>{
            elt.entite = elt.entite == null ? "" : elt.entite.substring(0, 15) + '...'
            elt.description = elt.description == null ? "" : elt.description.substring(0, 20) + '...'

            return elt;
          });*/
          storage.set(this.$route.path ,JSON.stringify(this.search))  
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
        });
    },
    createLigne(){
      this.$bvModal.show("ligne-form");
    },
    resetSearcheBar(){
     this.search = {
      identifiant: "",
      intitule: "",
      description: "",
	    motifrejet: "",
	    unite: "",
	    statut: "",
	    entite: "",
    }
     storage.remove(this.$route.path)
     
  },

    reset(){
    this.resetSearcheBar()
    this.getLignesTransformation()
  },

    showDetails() {
      this.$router.push({
        name: "detail_lignes_de_transformation",
        params: { id: this.selected[0].idligne },
      });
    },
    updateLigne(){
      this.$router.push({
        name: "modification_ligne_de_transformation",
        params: { id: this.selected[0].idligne },
      });
    },
    rowClass(item, type) {
      if (item != "" && item != null) {
        if (item.isEven) return "table-row-other";
        if (!item || type !== "row") return "table-info";
      } else {
        return;
      }
    },
    onRowSelected(items) {
      items.isSelected = true;
      this.isRowselected = true;
      if(!php.empty(items)){
        this.selected = items;
        console.log('items ', this.selected[0]);
      }
    },
    callEditOperationParc() {
      this.$bvModal.show("modal-lg");
    },
    getRequestParams(page, pageSize) {
      let params = {
        page: 0,
        size: pageSize || 10,
      };
      if (page && page > 0) {
        params.page = page - 1;
      }
      return params;
    },
    changePage(page) {
      this.currentPage = page;
      this.getLignesTransformation();
    },
    getLignesTransformation() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$transformation
        .get("lignes-transformation", { params })
        .then((response) => {
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;
          this.formatContent(this.elements)
          this.isBusy = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //permet de formatter le contenu du tableau à sa convenance
      formatContent(data){
        data = data.map(elt =>{
            elt.organisation = elt.entite == null ? "" : elt.entite
            elt.entite = elt.entite == null ? "" : elt.entite.substring(0, 15) + '...'
            elt.description = elt.description == null ? "" : elt.description.substring(0, 20) + '...'
            return elt;
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
      onSearchSite(query){
        this.searchsite = query
        this.offsetSites = 0
      },
      onSearchEntites(query){
        this.searchentite = query
        this.offsetEntites = 0
      }
  },

  mounted(){
     this.entite
     .libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getLignesTransformation();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  }

};
</script>
<style scoped>
.position_absolute {
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card {
  background-color: transparent !important;
}
.b-col {
  margin-right: 16px;
}
.b-col .content {
  display: flex;
  flex-direction: column;
}

#cover {
  background-image: url("~@/assets/images/logo_sigif_trame.png");
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.collapse-close {
  list-style-type: disclosure-closed;
}
.collapse-open {
  list-style-type: disclosure-open;
}

/*style barre de recherche */
.search-bar-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn {
  border: none;
  border-radius: 6px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover {
  background-color: rgba(0, 82, 44, 0.89);
  border: none;
}
.search-bar-btn a {
  color: white;
}
.search-bar-btn a:hover {
  font-weight: 600;
  font-style: italic;
}

.search-bar-custum-input {
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
}

.simple-btn:hover {
  background: none;
  border: none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white !important;
  border-color: white !important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44) !important;
  border-color: white !important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover {
  color: #82c138;
}
.change-image-opacity {
  opacity: 0.15;
}
.not-change-image-opacity {
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
<style>

</style>