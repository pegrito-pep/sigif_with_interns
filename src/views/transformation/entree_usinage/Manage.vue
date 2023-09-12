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
                    <b-overlay rounded="sm" :show="showOverlayLignes">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                      <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-for="input-sm">
                        <template #label><span class="x1fh d-flex justify-content-end">ligne</span></template>
                          <v-select @open="getLignes" v-model="search.ligne"  :options="paginatedLignes" :filterable="false" @search="onSearchLigne" label="intitule" :reduce="ligne => ligne.idligne" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPageLignes" @click="offsetlignes -= limitlignes">Prèc.</button>
                                <button :disabled="!hasNextPageLignes" @click="offsetlignes += limitlignes">Suiv.</button>
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
                    <b-form-group
                      id="fieldset-horizontal"
                      label-cols-sm="6"
                      label-cols-lg="4"
                      content-cols-sm
                      content-cols-lg="7"
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
              <b-col><h4 class="tab-header-left-text"> Lots d'entrée d'usinage du site</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateEntreUsinage" @click.prevent="addEntreeUsinage" size="sm" :class="{'change-image-opacity': !canCreateEntreUsinage,  'not-change-image-opacity': canCreateEntreUsinage}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span v-if="isRowselected">
                  <b-button @click.prevent="updateEntree" :disabled="!canUpdateEntreUsinage||!isEditable" size="sm" :class="{'change-image-opacity': !canUpdateEntreUsinage||!isEditable,  'not-change-image-opacity': canUpdateEntreUsinage&&isEditable}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button :disabled="!canDeleteEntreUsinage" size="sm" :class="{'change-image-opacity': !canDeleteEntreUsinage,  'not-change-image-opacity': canDeleteEntreUsinage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button :disabled="!canViewDetailsEntreeUsinage" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsEntreeUsinage,  'not-change-image-opacity': canViewDetailsEntreeUsinage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <!--<b-button :disabled="!canSaveEntreeUsinage" size="sm" :class="{'change-image-opacity': !canSaveEntreeUsinage,  'not-change-image-opacity': canSaveEntreeUsinage}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                  <b-button :disabled="!canRejectEntreeUsinage" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canRejectEntreeUsinage,  'not-change-image-opacity': canRejectEntreeUsinage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Rejeter</b-button>-->
                  <b-button :disabled="!canSubmitEntreeUsinage||isMinfof" @click.prevent="submitEntreeUsinage" size="sm" :class="{'change-image-opacity': !canSubmitEntreeUsinage||isMinfof,  'not-change-image-opacity': canSubmitEntreeUsinage}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                 
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  bordered sort-icon-left :busy="isBusy"  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
                    Aucune
                    <span class="font-weight-bold">Entrée usinage</span> trouvée!!
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
  name: "entree",
  components:{
    TransformationBox
  },
  data: () => ({
    isBusy:false,
    showOverlayLignes:false,
    showOverlaySites:false,
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
    entite:{
      id:1,
      libelle:''
    },
    entites:[],
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    optionsStatutMinfof:[{key:"", libelle: ""}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    
    //données du tableaux
    fields: [ { key: 'index', label: '' },{ key: 'idlot', label: 'Identifiant du lot' },{ key: 'dateoper', label: 'Date d\'opération' },
              { key: 'entite', label: 'Entité' },{ key: 'site', label: 'Site' },{ key: 'ligne', label: 'Ligne' },{ key: 'statut', label: 'Statut' },
            ],

    showOverlayEntites:false,
    offsetEntites:0,
    limitEntites:10,
    searchentite:'',
    elements: [],
    selected:{},
    sites:[],
    utbs:[],
    offsetSites:0,
    limitSites:10,
    searchsite:'',
    lignes:[],
    offsetlignes:0,
    limitlignes:10,
    searchligne:'',
    //  /*propriétes lies au traitement d'une operation de parc */
    title:"Ajout d'une entree Usinage"

  }),
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
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
    //lignes
    filteredLignes() {
      return this.lignes.filter((ligne) =>
        ligne.intitule.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
      )
    },
    paginatedLignes() {
      return this.filteredLignes.slice(this.offsetlignes, this.limitlignes + this.offsetlignes)
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
        this.filteredLignes.slice(nextOffset, this.limitSites + nextOffset).length
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
    isRowselected(){
      return !php.empty(this.selected)
    },
    /*propriétés liées aux accèes*/
    canCreateEntreUsinage(){ return true; return this.hasAccess('CREER_ENTREE_USINAGE_SITE') },
    canUpdateEntreUsinage(){ return true; return this.hasAccess('MODIFIER_ENTREE_USINAGE_SITE') },
    canDeleteEntreUsinage(){ return this.hasAccess('SUPPRIMER_ENTREE_USINAGE_SITE') },
    canViewDetailsEntreeUsinage(){ return true; return this.hasAccess('CONSULTER_ENTREE_USINAGE_SITE') },
    canSaveEntreeUsinage(){ return this.hasAccess('VALIDER_ENTREE_USINAGE_SITE') },
    canSubmitEntreeUsinage(){ 
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='0' ){
        return true;
      }
      else{
        return false
      }
    },
    canApprouveEntreeUsinage(){
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='1' ){
        return true;
      }
      else{
        return false
      }
    },
    canRejectEntreeUsinage(){
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
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
     
  },
  
 methods: {
  updateEntree(){
    this.$router.push({
      name: "edition_entree_usinage",
      params: { id: this.selected[0].idlot },
    });
  },
  async submitEntreeUsinage(){
    const ok = await this.$refs.transformationDialogue.show({
      commande:'entreeUsinage',
        title: 'Soumission',
        message:"Entrée usinage à soumettre : ",
        entite:this.selected[0].entite,
        site:this.selected[0].site,
        ligne:this.selected[0].ligne,
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
  //methode de soumission d'une entrée usinage
    async submitEntreeUsinage() {
            const ok = await this.$refs.transformationDialogue.show({
              commande:'entreeUsinage',
               title: 'Soumission',
               message:"Entrée usinage à soumettre : ",
               entite:this.selected[0].entite,
               site:this.selected[0].site,
               ligne:this.selected[0].ligne,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$transformation.patch('entrees-usinage/'+this.selected[0].idlot+'/soumettre').then(response => {
                    this.submitted = false 
                    this.getEntreeUsinage();
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
    async approuveEntreeUsinage() {
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
              this.$transformation.patch('entrees-usinage/'+this.selected[0].idlot+'/approuver').then(response => {
                    this.submitted = false 
                    this.getEntreeUsinage();
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
    async rejectEntreeUsinage() {
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
              this.$transformation.patch('entrees-usinage/'+this.selected[0].idlot+'/rejeter').then(response => {
                    this.submitted = false 
                    this.getEntreeUsinage();
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
  addEntreeUsinage(){
    this.$router.push({ name: "creer-entree_usinage" });
  },
  showDetails(){ this.$router.push({name: 'detail_entree_usinage', params: { id: this.selected[0].idlot }}); },
  
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
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
    this.getEntreeUsinage()
  },
  getEntreeUsinage(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$transformation.get("entrees-usinage", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
          elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""

          return elt
        })
		    this.isBusy=false
      })
      .catch((error) => {
        console.log(error)
      });

  },
  filterTable() {
    let data={ datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.search.entite.idorganisation,
       statut: this.search.statut, idlot:this.search.idlot, ligne: this.search.ligne,site: this.search.site.IDSITEOPER }
    console.log('response',this.search);
    this.isBusy=true
    this.$transformation.post("entrees-usinage/search", data).then((response) => {
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage + 1
      this.elements=response.data.result.items
      
      this.elements = this.elements.map(elt =>{
        elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""
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
      idlot: "",
      site: "",
      ligne: "",
	    datedeb: "",
	    datefin: "",
	    statut: "",
	    entite: "",
    }
     localStorage.removeItem('sigif2./transformation-entree_usinage')
     
  },
  reset(){
    this.resetSearcheBar()
    this.getEntreeUsinage()
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

  async getLignes(){
    this.showOverlayLignes=true;
    if(!php.empty(this.$store.state.lignes)){
      this.lignes=this.$store.state.lignes;
    }
    else{
      try {
        this.lignes = await this.$transformation.get("lignes-transformation/raw").then(response => response.data.result.Items);
        this.$store.dispatch('lignes', this.lignes)
      } catch (error) {
        console.log(error.message);
      }
    }
    this.showOverlayLignes=false;
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
  onSearchLigne(query){
    this.searchligne = query
    this.offsetlignes = 0
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
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getEntreeUsinage();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  }
    
}

</script>
<style scoped>

.x1fh {
  font-family: 'Verdana';
  font-size: 13px;
  color: #333333;
  padding: 0px 0px 0px 0px;
  font-weight: normal;
  text-align: right;
  white-space: nowrap;
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
  color:#82C138;
  cursor:pointer;
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
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>
