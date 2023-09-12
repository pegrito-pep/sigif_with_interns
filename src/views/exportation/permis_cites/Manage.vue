<template>
    <div id="cover" class="min-vh-100">
          <div>
            <div class="d-flex" style="align-items:center">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
              <h5 style="font-weight:bold">Rechercher</h5>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row class="mt-0">
                    <b-col cols="4">
                      <b-form-group class="p-0 m-0"
                        label="Correspondance"
                        label-align="right"
                        label-cols="7"
                      >
                      <template #label>
                        <div class="label">
                          <span>Correspondance</span>
                        </div>
                      </template>
                      <div style="width:180%">
                        <b-form-radio-group
                        :options="['Tout','N\'importe quel']"
                        class="pt-2"
                      ></b-form-radio-group>
                      </div>
                      </b-form-group>
                      <b-form-group class="p-0 m-0"
                        label-align="right"
                        label-cols="7"
                      >
                      <template #label>
                        <div class="label-form">
                          <span >Type de produit</span>
                        </div>
                      </template>
                        <select style="width: 120%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" size="sm">
                          <option value=""></option>
                          <option value="gr">Grume</option>
                          <option value="d">Débité</option>
                          <option value="ps">Produits spéciaux</option>
                        </select>
                      </b-form-group>
                      <b-form-group class="p-0 m-0"
                        label-align="right"
                        label-cols="7"
                      >
                      <template #label>
                        <div class="label-form">
                          <span>Date de la signature</span>
                        </div>
                      </template>
                      <input type="date" style="height: calc(1em + .500rem + 1px) !important;width:120%" class="form-control" size="sm" />
                      </b-form-group>
                      <b-overlay :show="showOverlay" rounded="sm">
                        <b-form-group class="p-0 m-0"
                          label-align="right"
                          label-cols="7"
                        >
                        <template #label>
                          <div  class="label-form">
                            <span>Entité forestière</span>
                          </div>
                        </template>
                        <v-select :options="paginated" :filterable="false" @search="onSearch"
                          class="custom-select-type_titre" @open="getEntities" label="intitule" v-model="entite"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetEntities-=limit">Prev</button>
                            <button :disabled="!hasNextPage" @click="offsetEntities+=limit">Next</button>
                          </li>
                        </v-select>
                        </b-form-group>
                    </b-overlay>
                    <b-overlay rounded="sm" :show="showOverlayEssences">
                      <b-form-group class="p-0 m-0"
                        label-align="right"
                        label-cols="7"
                      >
                      <template #label>
                        <div  class="label-form">
                          <span>Nom usuel</span>
                        </div>
                      </template>
                        <v-select :reduce="essence => essence.IDESSENCE" @open="getEssences" class="custom-select-type_titre" :options="paginatedEssences" :filterable="false"
                          @search="onSearchEssences"  label="NOMSCIENTIFIQUE"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEssences" @click="offsetEssences-=limitEssences">Prev</button>
                            <button :disabled="!hasNextPageEssences" @click="offsetEssences+=limitEssences">Next</button>
                          </li>
                        </v-select>
                      </b-form-group>
                    </b-overlay>
                      <b-overlay :show="showOverlayPays">
                        <b-form-group class="p-0 m-0"
                          label-align="right"
                          label-cols="7"
                        >
                        <template #label>
                          <div  class="label-form">
                            <span>Nom pays destination</span>
                          </div>
                        </template>
                        <v-select class="custom-select-type_titre" :options="paginatedPays" :filterable="false" @search="onSearchPays" @open="getPays"
                          label="nom" v-model="pays"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPagePays" @click="offsetPays-=limitPays">Prev</button>
                            <button :disabled="!hasNextPagePays" @click="offsetPays+=limitPays">Next</button>
                          </li>
                        </v-select>
                        </b-form-group>
                    </b-overlay>
                    </b-col>
                </b-row>

                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
                    
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                    </b-col>
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Enregistrement Permis CITES</h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="canCreateUtilisateur" @click.prevent="addPermisCITES" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a @click.prevent="showDetailsPermisCITES" :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="overflow-x:auto;position: relative; width: 1300px;">
              <b-table   :busy="isBusy" hover  select-mode="single" responsive ref="selectableTable" 
                selectable @row-selected="onRowSelected" style="position: relative; width: 165%;" 
                :items="items" 
                :fields="fields"
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <!-- <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template> -->
                 <!-- <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template> -->
                <template #cell(dateattribution)="data">
                  {{ data.item.dateattribution }}
                </template>
                <template #cell(datedebut)="data">
                  {{ data.item.datedebut }}
                </template>
                <template #cell(nomfichier)="data">
                  {{ data.item.fichier ===null ? '': data.item.nomfichier}}
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import UserForm from '@/components/Administration/UserForm.vue';
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "permis_cites",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({

    //   checkbox 
    status: true,
    isBusy:false,
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
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    allEntitesForrestieres:[
      { 
        id:1,
        libelle:'Afrique'
      },
      { 
        id:2,
        libelle:'Europe'
      },
      { 
        id:3,
        libelle:'Asie'
      }
    ],

    //données du tableaux
    fields: [
        { key: 'numcites', label: 'Nro CITES',thStyle:{fontSize:'.7rem',color:"green",width:"5%"} },
        { key: 'numtimbrecites', label: 'N° Timbre',thStyle:{fontSize:'.7rem',color:"green",width:"5%"} },
        { key: 'numfeuillet', label: 'N° Feuillet',thStyle:{fontSize:'.7rem',color:"green",width:"5%"} },
        { key: 'sigle', label: 'Marteau/Sigle',thStyle:{fontSize:'.7rem',color:"green",width:"7%"} },
        { key: 'entite', label: 'Entité agrée',thStyle:{fontSize:'.7rem',color:"green",width:"5%"} },
        { key: 'numpermis', label: 'Permis',thStyle:{fontSize:'.7rem',color:"green",width:"4%"} },
        { key: 'paysprovenance', label: 'Origine' ,thStyle:{fontSize:'.7rem',color:"green",width:"4%"}},
        { key: 'paysdestination', label: 'Destination',thStyle:{fontSize:'.7rem',color:"green",width:"6%"} }, 
        { key: 'typeproduit', label: 'Type',thStyle:{fontSize:'.7rem',color:"green",width:"3%"} },
        { key: 'essence', label: 'Nom usuel',thStyle:{fontSize:'.7rem',color:"green",width:"5%"} },
        { key: 'quantite', label: 'Quantité' ,thStyle:{fontSize:'.7rem',color:"green",width:"4%"}},
        { key: 'quotasannuel', label: 'Quotas annuels',thStyle:{fontSize:'.7rem',color:"green",width:"6%"} },
        {key:'datesignaturecite',label:'Date attribution',thStyle:{fontSize:'.7rem',color:"green",width:"8%"}},
        {key:'datedebut',label:'Date début',thStyle:{fontSize:'.7rem',color:"green",width:"5%",width:"5%"}},
        {key:'datefin',label:'N° de l\'expediteur',thStyle:{fontSize:'.7rem',color:"green",width:"6%"}},
        {key:'numpieces',label:'Nombre de pièces',thStyle:{fontSize:'.7rem',color:"green",width:"6%"}},
        {key:'volumetotal',label:'Volume total',thStyle:{fontSize:'.7rem',color:"green",width:"5%"}},
        {key:'status',label:'Statut',thStyle:{fontSize:'.7rem',color:"green",width:"3%"}},
        {key:'nomfichier',label:'Nom fichier',thStyle:{fontSize:'.7rem',color:"green",width:"5%"}},
     

    ],
    elements: [
    ],

    selected:{},
    
    /*propriétes lies au traitement d'une operation de parc */
    allSitesOperations: [
            {
            title: ' Grande forèt amazioniènne',
            icon: 'fa fa-database',
            id: 1
            },
            {
            title: '  Foret de Sambissa',
            icon: 'fa fa-book',
            id: 2
            },
            {
            title: '  Foret Tropicale',
            icon: 'fas fa-dollar-sign',
            id:3
            },
            {
            title: '  Foret de Manguissa',
            icon: 'fa fa-pencil',
            id:4
            }
    ],
    op_status:[
       { value: null, text: 'Please select an option' },
       { value: 'a', text: 'This is First option' },
       { value: 'b', text: 'Selected Option' },
       { value: { C: '3PO' }, text: 'This is an option with object value' },
       { value: 'd', text: 'This one is disabled', disabled: true }
    ],
    op_date:'2019-01-01 14:30',
    op:{
      site_concernee:'',
      date_operation:'',
      heure_operation:'',
      statut:null
    },
    // entités forestières
    entite:'',
    search:'',
    offsetEntities:0,
    limit:10,
    entitiesWithoutMinfof:[],
    showOverlay:false,

    // pays
    pays:'',
    searchPays:'',
    offsetPays:0,
    limitPays:5,
    paysAll:[],
    showOverlayPays:false,

    // essences
    showOverlayEssences:false,
    essences:[],
    searchEssences:'',
    offsetEssences:0,
    limitEssences:10,

  }),
  computed:{
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
     ...mapGetters(['user']),



     filtered() {
      return this.entitiesWithoutMinfof?.filter((entity) =>
      entity.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated(){
      return this.filtered?.slice(this.offsetEntities, this.limit + this.offsetEntities)
    },
    hasNextPage() {
      const nextOffset = this.offsetEntities + this.limit
      return Boolean(
        this.filtered?.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offsetEntities - this.limit
      return Boolean(
        this.filtered?.slice(prevOffset, this.limit + prevOffset).length
      )
    },

    // pays
    filteredPays() {
      return this.paysAll?.filter((pays) =>
      pays.nom.toLocaleLowerCase().includes(this.searchPays.toLocaleLowerCase())
      )
    },
    paginatedPays(){
      return this.filteredPays?.slice(this.offsetPays, this.limitPays + this.offsetPays)
    },
    hasNextPagePays() {
      const nextOffset = this.offsetPays + this.limitPays
      return Boolean(
        this.filteredPays?.slice(nextOffset, this.limitPays + nextOffset).length
      )
    },
    hasPrevPagePays() {
      const prevOffset = this.offsetPays - this.limitPays
      return Boolean(
        this.filteredPays?.slice(prevOffset, this.limitPays + prevOffset).length
      )
    },

    // essences
    filteredEssences(){
      return this.essences?.filter((essence) =>
      essence.NOMSCIENTIFIQUE.toLocaleLowerCase().includes(this.searchEssences.toLocaleLowerCase())
      )
    },
    paginatedEssences(){
      return this.filteredEssences.slice(this.offsetEssences,this.offsetEssences + this.limitEssences)
    },
    hasNextPageEssences() {
      const nextOffset = this.offsetEssences + this.limitEssences
      return Boolean(
        this.filteredEssences?.slice(nextOffset, this.limitEssences + nextOffset).length
      )
    },
    hasPrevPageEssences() {
      const prevOffset = this.offsetEssences - this.limitEssences
      return Boolean(
        this.filteredEssences?.slice(prevOffset, this.limitEssences + prevOffset).length
      )
    }

  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
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
    this.getArrondissements()
  },
getArrondissements(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    this.$donneesReference.get("arrondissements", {params}).then(response => {
          console.log("=================== Données de reference / arrondissements ==================");
          console.log(response.data.result.items[0]);
          console.log("===========================================================");
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
          elt.intitulearr = elt.intitule,
          elt.intitulereg = elt.departement.region.intitule,
          elt.codedepartement= elt.departement.codedepartment,
          elt.intituledepart = elt.departement.intitule,
          elt.cheflieu = elt.departement.region.cheflieu,
          elt.phasearr = elt.phase.libelle

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
  showDetailsPermisCITES(){
    this.$router.push({name: 'permis_cites-detail'})
  },
  addPermisCITES(){
    this.$router.push({name: 'create-permis_cites'})
  },
  getPermisCITES(){
    this.isBusy=true;
    this.$exportations.get('cites')
      .then(response=>{
        this.elements=response.data.result.Items
        console.log(response)
        this.elements.map(elt=>{
          elt.datesignaturecite = elt.datesignaturecite !==null ? this.$dayjs(elt.datesignaturecite).format('DD/MM/YYYY') :""
          elt.datedebut = elt.datedebut !==null ? this.$dayjs(elt.datedebut).format('DD/MM/YYYY') :""
          elt.datefin = elt.datefin !==null ? this.$dayjs(elt.datefin).format('DD/MM/YYYY') :""
          return elt
        })
        this.isBusy=false
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch(error=>console.log(error))
  },
  onSearch(query){
    this.search = query
    this.offsetEntities = 0
  },
  onSearchPays(query){
    this.searchPays = query
    this.offsetPays = 0
  },
  onSearchEssences(query){
    this.onSearchEssences=query
    this.offsetEssences=0
  },
  async getEntities(){
    this.showOverlay=true
    if(!php.empty(this.$store.state.entiteswithoutminfof)){
      this.entitiesWithoutMinfof=this.$store.state.entiteswithoutminfof
      console.log('entrée dans le store')
      this.showOverlay=false
    }else{
      await this.$donneesReference.get('entites/entite_forestier')
        .then(response=>{
          this.entitiesWithoutMINFOF=response.data.result.items
          console.log('requête vers api')
          this.$store.dispatch('entiteswithoutminfof',this.entitiesWithoutMINFOF)
          this.showOverlay=false
        })
        .catch(err=>{
          App.notifySuccess(err.message)
        })
    }
    this.showOverlay=false
  },

  async getPays(){
    this.showOverlayPays=true
    if(!php.empty(this.$store.state.pays)){
      console.log('entrée dans le store')
      this.paysAll=this.$store.state.pays
      this.showOverlayPays=false
    }else{
      // await this.$donneesReference.get('pays',{})
      console.log('requête vers API')
      await this.$donneesReference.get('pays')
        .then(response=>{
          this.paysAll=response.data.result.items
          console.log(this.paysAll)
          this.$store.dispatch('pays',this.paysAll)
        })
        .catch(err=>console.log(err))
      this.showOverlayPays=false
    }
  },
 async getEssences(){
    this.showOverlayEssences=true
    if(!php.empty(this.$store.state.essences)){
      console.log('entree store')
      this.essences=this.$store.state.essences
      this.showOverlayEssences=false
    }else{
      console.log('requête api')
      await this.$donneesReference.get('essences/raw')
        .then(response=>{
          this.essences=response.data.result
          this.$store.dispatch('essences',this.essences)
        }).catch(err=>console.log(err))
        this.showOverlayEssences=false
    }
  }

 },
 

  mounted(){
    // this.getArrondissements();
    this.getPermisCITES()
   
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
.label-form{
  margin-top:-8px;
}

.custom-select-type_titre{
        --vs-dropdown-option--active-bg: #82C138;
        --vs-dropdown-option--active-color: #fff;
            --vs-selected-color: #1f1c1c;
                /* Font */
            --vs-font-size: 0.65rem;
            --vs-line-height: 1.2;
            width:250%;
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