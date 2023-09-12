<template>
    <div id="cover" class="min-vh-100">
          <div class="ml-1 mt-1">
             <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
            </div>

            
              <ul class="nav nav-tabs">
              <li class="nav-item" :class="{ custumSigifTab: section !== 'verifInventaires' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'inventaires'"
                  >Liste des inventaires</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: section !== 'inventaires' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="gotoVerif"
                  >Liste des vérification d'inventaires</a
                  >
              </li>
              
            </ul>
            <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"><span class="font-weight-bold">Rechercher</span></li></ul>  </b-button>
              <b-collapse id="collapse-4" v-model="visible">
                <b-card class="b-card">
                  <b-row>
                    <b-col cols="2">
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Titre n°</label><br>
                        <input type="text"  v-model="search.numtitre"  placeholder="" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                      </b-form-group>    
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">UFA n°</label><br>
                        <input type="text"  v-model="search.numtitre"  placeholder="" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                      </b-form-group>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="m-0 p-0">exercice</label><br>
                        <select  class="m-0 p-0 default-old-system-input-properties" v-model="search.exercice"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                          <option v-for="(exercice, i) in exercices" :value="exercice.libelle" :key="i">
                            {{ exercice.libelle }}
                          </option>
                        </select>
                      </b-form-group> 
                    </b-col>
                    <b-col cols="4">
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Type de titre</label><br>
                        <select v-model="search.typetitre" class="m-0 p-0" style="width: 80%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option value="1"> Autorisation d'enlevement du bois </option>
                          <option value="2"> Autorisation de récupération du bois </option>
                          <option value="3"> Permis special</option>
                          <option value="4"> Autorisation personnelle de coupe</option>
                          <option value="5">Permis de bois d'oeuvre</option>
                        </select>
                      </b-form-group>
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Type d'inventaire</label><br>
                        <select v-model="search.typetitre" class="m-0 p-0" style="width: 80%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option value="exploitation">exploitation</option>
                        </select>
                      </b-form-group>
                     
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Date de signature</label><br>
                        <input type="date" class="mx-1"  v-model="search.datedebut"  placeholder="date debut " style="width: 40%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                        <input type="date" class="mx-1" v-model="search.datefin"  placeholder="date fin" style="width: 40%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                      </b-form-group>      
                     
                    </b-col>
                    <b-col cols="3">
                  
                     
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Certificat de conformité</label><br>
                        <input type="text"  v-model="search.nuumcertificat"  placeholder="" style="width:50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                      </b-form-group>
                            
                      <b-form-group  class="mx-0 mt-2 p-0">
                        <label for="" class="m-0 p-0">Statut</label><br>
                        <select v-model="search.statut" class="m-0 p-0" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                            {{ status.libelle }}
                          </option>
                        </select>
                      </b-form-group>  
                    </b-col>
                    <b-col>
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
                      
                    </b-col>
                  </b-row>
                  <b-row class="mt-1 d-flex justify-content-end">
                    <div class="search-bar-btn-group">
                      <b-col cols="2" class="position_absolute">
                        <div class="mt-4">
                          <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                        </div>
                      </b-col>
                    </div>
                  </b-row>
                </b-card>
             </b-collapse>
             
             
             
             
             
             
             
             
             
          </div>
          <!--entete des tableaux -->
          <b-container fluid v-if="section == 'inventaires'">
              <div class="m-0 px-2 table-header-border">
                <b-overlay rounded="sm" :show="showOverlayTiges">
                  <template #overlay>
                    <div class="text-center">
                      <i class="fas fa-2x fa-sync fa-spin"></i>
                      <p id="cancel-label">Chargement...</p>
                    </div>
                  </template>
                    <b-row>
                      <b-col>
                        <h4 class="tab-header-left-text mr-2">Liste des inventaires</h4>
                        <b-button :disabled="!canVisualizeInventaire" size="sm" :class="{'change-image-opacity': !canVisualizeInventaire,  'not-change-image-opacity': canVisualizeInventaire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Visualiser</b-button>
                      </b-col>
                      <b-col>
                        <b-button :disabled="!canCreateInventaire" @click.prevent="addInventaire" size="sm" :class="{'change-image-opacity': !canCreateInventaire,  'not-change-image-opacity': canCreateInventaire}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                        <span>
                          <b-button  :disabled="!canUpdateInventaire" size="sm" :class="{'change-image-opacity': !canUpdateInventaire,  'not-change-image-opacity': canUpdateInventaire}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                          <b-button :disabled="!canDeleteInventaire" size="sm" :class="{'change-image-opacity': !canDeleteInventaire,  'not-change-image-opacity': canDeleteInventaire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                          <b-button @click.prevent="showDetails" :disabled="!canViewDetailsInventaire" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                          <b-button :disabled="!canCloseInventaire" size="sm" :class="{'change-image-opacity': !canCloseInventaire,  'not-change-image-opacity': canCloseInventaire}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Cloturer</b-button>
                          <b-button @click.prevent="seeTableStock" :disabled="!canViewTableStockInventaire" size="sm" :class="{'change-image-opacity': !canViewTableStockInventaire,  'not-change-image-opacity': canViewTableStockInventaire}" class="mx-1 simple-btn">Table de stock</b-button>
                          <b-button @click.prevent="seeTablePeuplement" :disabled="!canViewTablePeuplementInventaire" size="sm" :class="{'change-image-opacity': !canViewTablePeuplementInventaire,  'not-change-image-opacity': canViewTablePeuplementInventaire}" class="mx-1 simple-btn">Table de peuplement</b-button>
                          <b-button :disabled="!canExportTigesInventaire" @click.prevent="exportData" size="sm" :class="{'change-image-opacity': !canExportTigesInventaire,  'not-change-image-opacity': canExportTigesInventaire}" class="mx-1 simple-btn">Exporter Tiges hors limites</b-button>
                        </span>
                      </b-col>
                    </b-row>
                </b-overlay>
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
                      <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold"> inventaire</span> trouvé!!</h4>
                  </template>
                  <template slot="thead-top" slot-scope="{}">
                    <tr>
                      <th></th><th></th><th></th><th></th><th></th> <th></th>
                      <th class="text-center" colspan="6" style="border-bottom: 4px solid #82C138">Inventaire</th>
                    </tr>
                </template>
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                </b-table>

                <!--AJOUT DE LA PAGINATION -->
                <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
              </div>
          </b-container>
          
          <b-container fluid v-if="section == 'verifInventaires'">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Liste des vérifications d'inventaire</h4>
                  <a :disabled="canViewDetailsInventaire" @click.prevent="showDetailsVerification" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsInventaire}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Consulter</a>
                  <span class="ml-2 d-flex justify-content-between">
                     <sigif-form-group :sizeLabel="6" :sizeLabelLg="6" label="ID ORGANISATION" v-model="search.numufa" class="w-50"/>
                     <sigif-form-group label="N° AAC" v-model="search.numufa" class="w-50"/>
                  </span>
                </b-col>
              </b-row>
            </div>
             <!--implémentation tableau proprement dite-->
            <div class="ml-1">
                <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                  :items="itemsverifications" 
                  :fields="fieldsVerification" 
                  :tbody-tr-class="rowClass" >
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important;">{{ ++data.index }}</b> </template>
                </b-table>
                <!--AJOUT DE LA PAGINATION -->
                <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
            </div>
          </b-container>
          
          <div class="modal-dialog modal-fullscreen-sm-down">
            ...
          </div>





          <!--MODAL FULLSCREEN-->
          <b-modal id="modal-xl" size="xl" ref="tabledata" title="Extra Large Modal" hide-footer>
            <template #modal-title>
              <div>
                <h2 class="font-weight-bold">{{ tilteTable }}</h2>
              </div> 
            </template>
            <div>
                <table-data />
            </div>
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import { mapGetters } from 'vuex'
   import DatePicker from 'vue2-datepicker';
   import 'vue2-datepicker/index.css';
   import 'vue2-datepicker/locale/fr';
   import exportFromJSON from "export-from-json";

   import TableData from "@/components/datatable/TableData.vue";
      
    export default {
      name: "inventaires",
      components:{
          TableData,
          DatePicker
      },
      data: () => ({
        showOverlayTiges:false,
        section: "inventaires",
        entite:{
          idorganisation:'',
          libelle:''
        },
        showOverlayEntites:false,
        entiteswithoutminfof:[],
        searchentite:'',
        offsetEntites:0,
        limitEntites:10,
        exercices:[],
  
        isBusy:false,
        isRowselected:false,
        width:"w-50",
        selectWidht:"w-75",
        /*porpriétés data de pagination*/
        perPage: 10,
        currentPage: 1,
        total: 0,

        perPageVerif: 10,
        currentPageVerif: 1,
        totalVerif: 0,
        visible: true,
        //données du tableaux
        fields: [{ key: 'index', label: '', thStyle: { width: "2%" }  },{ key: 'entite', label: 'Entité' },{ key: 'numtitre', label: 'No titre' },{ key: 'typetitre', label: 'Type de titre' },
                { key: 'numufa', label: 'No UFA' }, { key: 'numufe', label: 'No UFE' }, { key: 'numaac', label: 'No ACC' }, { key: 'entiteagree', label: 'Entité agréee' }, 
                { key: 'datesoumission', label: 'Date soumission' },{ key: 'statut', label: 'Statut' }, { key: 'exercice', label: 'Exercice' },{ key: 'numcertificat', label: 'Certificat no' },
                { key: 'datesignature', label: 'Date signature' }],
        elements: [],
        fieldsVerification: [{ key: 'index', label: '', thStyle: { width: "2%" } },{ key: 'numtitre', label: 'No titre' },{ key: 'typetitre', label: 'Type de titre' },
                            { key: 'entite', label: 'Entité' },{ key: 'numufa', label: 'No UFA' }, { key: 'numufe', label: 'No UFE' }, 
                            { key: 'assiettee', label: 'Assiette' }, { key: 'entiteagree', label: 'Entité agréee' }, 
                            { key: 'datesoumission', label: 'Date soumission' },{ key: 'dateverification', label: 'Date de Vérification' },
                            { key: 'inscription', label: 'Inscription' }],
        elementsVerif: [],

        selected:{},
        
        search:{
          numtitre:"",
          typetitre:"",
          numufa:"",
          exercice:"",
          numcertificat:""
        },
        entite:{
          id:1,
          libelle:''
        },
        width:"w-50",
        searchSubmitted:false,
        tilteTable:"TABLE DE STOCK",
        optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
      }),
      computed:{
        ...mapGetters(['user', 'hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
              return true;
            }else{
              return false;
            }
        },
        /*propriétés liées aux accèes*/
        canCreateInventaire(){return true; this.hasAccess('CREER_INVENTAIRE') },
        canUpdateInventaire(){ return this.hasAccess('MODIFIER_INVENTAIRE')},
        canDeleteInventaire(){return this.hasAccess('SUPPRIMER_INVENTAIRE') },
        canViewDetailsInventaire(){return true; return this.hasAccess('CONSULTER_INVENTAIRE')},
        canCloseInventaire(){return this.hasAccess('CLOTURER_INVENTAIRE') },
        canViewTableStockInventaire(){return true;  return this.hasAccess('SOUMETTRE_INVENTAIRE') },
        canViewTablePeuplementInventaire(){return true;  return this.hasAccess('SOUMETTRE_INVENTAIRE')},
        canExportTigesInventaire(){ return true;return this.hasAccess('EXPORT_TIGES_INVENTAIRES')},
        canVisualizeInventaire(){return this.hasAccess('VISUALIER_DONNEES_INVENTAIRE')},
        items() { 
          return this.elements.map((a, index) => {  
            a.isFirst = index == 0        
            a.isEven = index %2 == 0        
            return a
          })
        },
        itemsverifications() { 
          return this.elementsVerif.map((a, index) => {  
            a.isFirst = index == 0        
            a.isEven = index %2 == 0        
            return a
          })
        },
        offset() {
          return (this.currentPage * this.perPage) - this.perPage
        },
        offsetVerif() {
          return (this.currentPageVerif * this.perPageVerif) - this.perPageVerif
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
      watch:{
        elements(value){
          if(value.length>0){
            setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
          }
        },
    },
    methods: {
      async exportData(){
        this.showOverlayTiges=true
        const data=await this.$inventaire.get("inventaires/export/"+this.selected[0].idaac).then(response => response.data.result.Items || [])
        console.log('data', data);
        const fileName = "tiges_hors_limite_aac="+this.selected[0].idaac;
        const exportType = exportFromJSON.types.csv;
        if (data) exportFromJSON({ data, fileName, exportType });
        setTimeout(() => {this.showOverlayTiges=false;}, 3000);
      },
      
      onSearchEntites(query){
        this.searchentite = query
        this.offsetEntites = 0
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
      addInventaire() {
        this.$router.push({ name: "create-inventaire" });
      },
      /*seeTableStock(){
        this.tilteTable="Table de stock"
        this.$refs['tabledata'].show()
      },*/
      seeTableStock(){
        this.$router.push({ name: "table_de_stock" });
      },
      seeTablePeuplement(){
        this.$router.push({ name: "table_de_peuplement" });
      },
      showDetails(){this.$router.push({name: 'detail-inventaire', params: { id: this.selected[0].idaac }});},
      showDetailsVerification(){this.$router.push({name: 'detail-verification', params: { id: this.selected[0].id }});},
      rowClass(item, type) {
        if(item !=''&&item!=null){
          if (item.isEven) return 'table-row-other'
          if (!item || type !== 'row') return 'table-info'
        }else{
          return 
        }
      },

      onRowSelected(items) {
        items.isSelected =true;
        this.isRowselected=true
        this.selected = items
        console.log('selected',this.selected[0].idaac );
      },

      reset(){console.log('to implement');},

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
        this.getInventaires()
      },
      getInventaires(){
        this.isBusy=true
          const params = this.getRequestParams(
            this.currentPage,
            this.pageSize
          );
          this.$inventaire.get("inventaires", {params}).then(response => {
              console.log(response.data.result.items);
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items

            this.elements = this.elements.map(elt =>{
              elt.datesoumission = elt.datesoumission !== null? this.$dayjs(elt.datesoumission).format("DD/MM/YYYY"): "";
              elt.datesignature = elt.datesignature !== null? this.$dayjs(elt.datesignature).format("DD/MM/YYYY"): "";
              return elt
            })
            this.isBusy=false
          })
          .catch((error) => {
            console.log(error)
            this.isBusy=false
          });
      },
      gotoVerif(){
        this.section='verifInventaires'
        this.getVerifInventaires()
      },
      getVerifInventaires(){
        this.isBusy=true
          const params = this.getRequestParams(
            this.currentPage,
            this.pageSize
          );
          this.$inventaire.get("verifications?size=100", {params}).then(response => {
              console.log(response.data.result.items);
            this.totalVerif = response.data.result.totalItems
            this.currentPageVerif = response.data.result.currentPage + 1
            this.elementsVerif=response.data.result.items

            this.elementsVerif = this.elementsVerif.map(elt =>{
              elt.datesoumission = elt.datesoumission !== null? this.$dayjs(elt.datesoumission).format("DD/MM/YYYY"): "";
              elt.dateverification = elt.dateverification !== null? this.$dayjs(elt.dateverification).format("DD/MM/YYYY"): "";
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
        console.log('search',this.search);
          this.isBusy=true
          this.$transformation.post("entrees-usinage/search", this.search).then((response) => {
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
        localStorage.removeItem('sigif2./transformation-entree_usinage')
        
      },
      reset(){
        this.resetSearcheBar()
        this.getInventaires()
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
      }
    },
    

      mounted(){
        this.entite.libelle=this.user.profil.organisation
        if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
          this.search=JSON.parse(storage.get(this.$route.path))
          this.filterTable();
        }else{this.getInventaires();}
        if(!this.isMinfof){
          this.entite.libelle=this.user.profil.organisation
          this.entite.idorganisation=this.user.idOrganisation
        }
        
        this.toggleSideBar()
      }
    }

</script>
<style scoped>
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
.custumSigifTab {
    float: left;
    background-position: top;
    box-sizing: border-box;
    white-space: nowrap;
    border-top: 1px solid #82C138;
    border-left: 1px solid #82C138;
    border-right: 1px solid #82C138;
    padding: 0px 5px 0px 7px;
    border-bottom: none;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    line-height: 19px;
    margin-top: 0px;
    background-color: #82C138;
    color:white;
}
.nav-tabs .nav-link.active{
  background: #82C138;
}

/*STYLE MODAL TABLE DE STOCK*/
.modal-fullscreen{
  max-width: 100%;
  margin: 0;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  display: flex;
  position: fixed;
  z-index: 100000;
}

</style>