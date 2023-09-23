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
            @click="visible = !visible"
            class="p-0 m-0 pt-3"
            style="border: none; background: none; color: black"
          >
            <ul>
              <li
                :class="{ 'collapse-open': visible, 'collapse-close': !visible }"
              ></li>
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
                    <v-select @open="getSites" :options="paginated" v-model="search.site" :filterable="false"  @search="onSearch" label="INTITULE" class="custom-select-type_titre">
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
        <b-row>
          <b-col
            ><h4 class="tab-header-left-text">
              {{ $t("data.Liste_des_entrées_de_parc") }}
            </h4></b-col
          >
          <b-col class="col-md-auto">
            <b-button @click.prevent="createOperationParc" :disabled="!canCreateOperationParc" size="sm" :class="{'change-image-opacity': !canCreateOperationParc,  'not-change-image-opacity': canCreateOperationParc}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
            <span>
              <b-button :disabled="!canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
              <b-button :disabled="!canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
              <b-button  :disabled="!canViewDetailsOperationParc" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
              <span v-if="!isMinfof">
                <b-button style="cursor: pointer" @click.prevent="validateEntreeParc" :disabled="!isToValidate" size="sm" :class="{'change-image-opacity': !isToValidate,  'not-change-image-opacity': isToValidate}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                <b-button style="cursor: pointer" @click.prevent="submitEntreeParc" :disabled="!isToSubmit" size="sm" :class="{'change-image-opacity': !isToSubmit,  'not-change-image-opacity': isToSubmit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToSubmit}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
              </span>
             
              <!--<b-button @click.prevent="validateEntreeParc" v-if="canSaveOperationParc && isToValidate"  size="sm"
              :class="{'change-image-opacity': !canSaveOperationParc||!isToValidate,
              'not-change-image-opacity': canSaveOperationParc&&isToValidate}" 
              class="mx-1 simple-btn">
              <b-img src="@/assets/images/iconVALIDER_16x16.png">
              </b-img>valider
              </b-button>
              <b-button @click.prevent="submitEntreeParc" v-if="canSubmitOperationParc && isToSubmit" size="sm" 
              :class="{'change-image-opacity': !canSubmitOperationParc||!isToSubmit,
              'not-change-image-opacity': canSubmitOperationParc&&isToSubmit}"  class="mx-1 simple-btn">
              <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
              soumettre
              </b-button>-->
              <b-button @click.prevent="imprimerEntreeParcPDF"  :disabled="!canPrintOperationParc||wait" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img><b-spinner v-if="wait" small></b-spinner><span v-else>imprimer</span> </b-button>
              <b-button :disabled="!canExportOperationEntreeParc" @click.prevent="exportData" size="sm" :class="{'change-image-opacity': !canExportOperationEntreeParc,  'not-change-image-opacity': canExportOperationEntreeParc}" class="mx-1 simple-btn"><b-img src="@/assets/images/excel.png"></b-img>Exporter</b-button>
              <span>
                <b-dropdown toggle-class='customDropdown' id="dropdown" right size="sm" variant="none" text="Autres actions" menu-class="w-125">
                  <b-dropdown-item-button @click.prevent="showEntreeParcPrintDialog">Listing des entrées parcs</b-dropdown-item-button>
                </b-dropdown>
              </span>
            </span>  
          </b-col>
        </b-row>
      </div>
 
        <!--implémentation tableau proprement dite-->
      <div class="ml-1">
        <b-table :busy="isBusy" bordered sort-icon-right hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>

                  <template v-slot:head(index)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(idoperation)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(dateoper)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(heureoper)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(typeproduit)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(intitulesite)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(libelletypeopeparc)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(statutenr)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template #empty>
                        <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">Entrée parc</span> trouvée!!</h4>
                  </template>
                  <template #cell(index)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ ++data.index }}</b> </span>
                  </template>
                  <template #cell(idoperation)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.idoperation }}</b> </span>
                  </template>
                  <template #cell(dateoper)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.dateoper }}</b> </span>
                  </template>
                  <template #cell(heureoper)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.heureoper }}</b> </span>
                  </template>
                  <template #cell(typeproduit)="data">
                    <span class="d-flex justify-content-center align-items-center">
                      <b class="ml-1">{{ data.item.typeproduit }}</b> 
                    </span>
                  </template>
                  <template #cell(intituleSite)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.intituleSite }}</b> </span>
                  </template>
                  <template #cell(libelletypeopeparc)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.libelletypeopeparc }}</b> </span>
                  </template>
                  <template #cell(statutenr)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.statutenr }}</b> </span>
                  </template> 
        </b-table> 
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
          "/>

          
      </div>
    </b-overlay>
      <EntreeParcDialog ref="listingEntreeParc">
           
      </EntreeParcDialog>

    <!--MODAL DE SOUMMISSION D'UNE ENTREE PARC-->
    <b-modal id="modal-xl" ref="entree-parc-option" size="xl" :title="title"   hide-footer>
      <entree-parc-option :action="action" @validationOk="handleOptionOk" @soumissionOk="handleOptionOk" :idoperation="idoperation"></entree-parc-option>
    </b-modal>
  </div>
</template>

<script>
const php = require("phpjs");
import EntreeParcOption from "@/components/Operations-parc/EntreeParcOption.vue";
import EntreeParcDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
import exportFromJSON from "export-from-json";
import { mapGetters } from "vuex";
import Table from '@/components/Table.vue';
export default {
  name: "entree_parcs",
  components: {
    EntreeParcOption,EntreeParcDialog,
    Table
  },
  data: () => ({
    isToValidate:false,
    isToSubmit:false,
    show: false,
    isBusy: false,
    isRowselected: false,
    entiteswithoutminfof:[],
    searchentite:'',
    showOverlayEntites:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search: {
      site: "",
      datedeb: "",
      datefin: "",
      entite: "",
      statut: ""
    },
    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"1", libelle: "Soumis"}, {key:"2", libelle: "validé"}, {key:"3", libelle: "Soumission en cours"}],
    //données du tableaux
    fields: [
      { key: "index", label: "N°" ,thStyle:"width:1%"},
      { key: "idoperation", label: "N° d'entrée" , sortable: true},
      { key: "dateoper", label: "Date Opération", sortable: true },
      { key: "heureoper", label: "heure", sortable: true },
      { key: "typeproduit", label: "Type de produit", sortable: true },
      { key: "intituleSite", label: "Site", sortable: true },
      { key: "libelletypeopeparc", label: "Type D'Opération", sortable: true },
      { key: "statutenr", label: "statut", sortable: true },
    ],
    offset: 0,
    limit: 10,
    sites:[],
    sitesnoutbs:[],
    offsetSites: 0,
    limitSites: 10,
    perPageSite: 7,
    currentPageSite: 1,
    elements: [],
    selected: {},
    searchSite:"",
    entite:{
      idorganisation:'',
      libelle:''
    },
    /*propriétes lies au traitement d'une operation de parc */
  
    op_status: [
      { value: null, text: "Please select an option" },
      { value: "a", text: "This is First option" },
      { value: "b", text: "Selected Option" },
      { value: { C: "3PO" }, text: "This is an option with object value" },
      { value: "d", text: "This one is disabled", disabled: true },
    ],
    showOverlaySite:false,
    /**propriétées de gestion des boutons valider et soumettre*/
    idoperation:'',
    title:'',
    action:'',
    wait:false
  }),
  computed: {
    ...mapGetters(['user','hasAccess'])                                                                                                                                                                              ,   
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
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
  
    filtered() {
      return this.sites.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase())
      )
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
    
    canCreateOperationParc() {
       return true; return this.hasAccess('CREER_OPERATION_ENTRE_PARC')
    },
    canUpdateOperationParc() {
       return true; return this.hasAccess('MODIFIER_OPERATION_ENTRE_PARC')
    },
    canDeleteOperationParc() {
      return true; return this.hasAccess('SUPPRIMER_OPERATION_ENTRE_PARC')
    },
    canViewDetailsOperationParc() {
      return true; return this.hasAccess('CONSULTER_OPERATION_ENTRE_PARC')
    },
    canSaveOperationParc() {
       return true;return this.hasAccess('CREER_OPERATION_ENTRE_PARC')
    },
    canSubmitOperationParc() {
      return true; return this.hasAccess('SOUMETTRE_OPERATION_ENTRE_PARC')
    },
    canPrintOperationParc() {
       if(php.empty(this.selected)){
        return false
       } else return true
      //  return this.hasAccess('IMPRIMER_OPERATION_ENTRE_PARC')
    },
    canExportOperationEntreeParc() {
       return true;return this.hasAccess('EXPORTER_OPERATION_ENTRE_PARC')
    },

    items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
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
    //impression des entrées pac sur une période
    showEntreeParcPrintDialog(){
      this.$refs.listingEntreeParc.show({
          title:'Listing des entrées parc',
          commande:1
      })
    },

    // imprimer une entrée parc
     imprimerEntreeParcPDF(){
      if(this.selected[0].typeProduit==='GR'){
        this.wait=true;
        this.$jasper.post("ItextController/imprimerentreeparc/grume", {
                        "idoperation":Number(this.selected[0].idoperation),
                    },{responseType:'blob'})
          .then((response) => { 
            if(response.status===200) {
                const blob = new Blob([response.data], {type: 'application/pdf'});
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `EntreeParc_${this.selected[0].idoperation}.pdf`;
                link.click();
                URL.revokeObjectURL(link.href)
                
                this.wait=false; 
            }else{
                console.log(response)
            }
          })
          .catch((error) => {
              console.log(error);   
              this.wait=false;
          });
        }
        if(this.selected[0].typeProduit==='CL'){
          this.wait=true;
          this.$jasper.post("ItextController/imprimerentreeparc/colis", {
                "idoperation":Number(this.selected[0].idoperation),
            },{responseType:'blob'})
            .then((response) => { 
              if(response.status===200) {
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `EntreeParc_${this.selected[0].idoperation}.pdf`;
                    link.click();
                    URL.revokeObjectURL(link.href)
                    
                    this.wait=false; 
                }else{
                    console.log(response)
                }
                })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;
            });
        }
     },
    /**METHODE DE TRAITEMENT EVENEMENT VALIDATION OK ENTREE PARC*/
    handleOptionOk(){
      this.getEntreesParcs();
      this.title=''
      this.action=''
      this.$refs['entree-parc-option'].hide()
    },
    /**METHODE DE TRAITEMENT DE LA VALIDATION D'UNE ENTREE PARC*/
    validateEntreeParc(){
      return this.$router.push({
        name: "details-entrees_parcs",
        params: { id: this.selected[0].idoperation },
      });
    },
    /**METHODE DE TRAITEMENT DE LA SOUMISSION D'UNE ENTREE PARC*/
    submitEntreeParc(){
      return this.$router.push({
        name: "details-entrees_parcs",
        params: { id: this.selected[0].idoperation },
      });
    },
    showDetails() {
      this.$router.push({
        name: "details-entrees_parcs",
        params: { id: this.selected[0].idoperation },
      });
    },
    createOperationParc() {
      this.$router.push({ name: "create-entree-parc" });
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
      console.log('items ',items);
      this.selected = items;
      if (!php.empty(this.selected[0])) {
        this.isRowselected = true;

        if(this.selected[0].statutenr=='Brouillon'){
          this.isToValidate=true
          this.isToSubmit=false
        }
        else if(this.selected[0].statutenr=='Soumise'){
          this.isToValidate=false
          this.isToSubmit=false
        }
        else{
          this.isToValidate=false
          this.isToSubmit=false
        }
      }else{ 
        this.isRowselected = false;
       }
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
      this.getEntreesParcs();
    },
    getEntreesParcs() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$operationParc
        .get("entrees-parc", { params })
        .then((response) => {
          console.log('r',response.data.result.items);
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;

          this.elements = this.elements.map((elt) => {
           // elt.type_operation = elt.parcOperationTypeopeparc.libelle;
            elt.dateoper =
              elt.dateoper !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
            elt.heureoper =
              elt.heureoper !== null
                ? this.$dayjs(elt.heureoper).format("HH:mm")
                : "";
            elt.typeproduit = elt.typeProduit=="GR" ?"Grumes": "Débités"
            //elt.siteoperation = elt.siteoperation.intitule;

            return elt;
          });
          this.isBusy = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getSites(){
      this.showOverlaySite=true
      if(!php.empty(this.$store.state.sites)){
        this.sites=this.$store.state.sites
      }
      else{
        try {
          this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
          this.$store.dispatch('sites', this.sites)
        } catch (error) {
            console.log(error.message)
        }
      }
      
      this.showOverlaySite=false
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
    },
    onSearch(query) {
      this.searchSite = query
      this.offsetSite = 0
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    reset(){
    this.resetSearcheBar()
    this.getEntreesParcs()
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
    
    filterTable(){
    let data={ site: this.search.site.IDSITEOPER, datedeb: this.search.datedeb, datefin: this.search.datefin, entite: this.entite.idorganisation, statut: this.search.statut }
    this.isBusy=true
    this.$operationParc.post("entrees-parc/search", data).then((response) => {
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage + 1
      this.elements=response.data.result.items
      
      this.elements = this.elements.map(elt =>{
        elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""
        elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
        return elt
      })
        storage.set(this.$route.path ,JSON.stringify(this.search))
		      this.isBusy=false
      })
      .catch((error) => {
         this.isBusy=false
      });
    },
    reset() {
      this.resetSearcheBar();
      this.getEntreesParcs();
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
    async exportData(){
      this.show=true
      try{
        const data=await this.$operationParc.get("entrees-parc").then(response => response.data.result.items || [])
        console.log('data', data);
        const fileName = "entrees_parcs_data";
        const exportType = exportFromJSON.types.xls;

        if (data) exportFromJSON({ data, fileName, exportType });
        setTimeout(() => {this.show=false;}, 3000);
      }catch(err){
        console.log(err.message)
      }
      this.show=false;
    }
  },

  mounted() {
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getEntreesParcs();}
    if(!this.isMinfof){
      this.disabled=true
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  },
};
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
.form-control {
  height: 30px !important;
}

#toggleSideBar {
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }
  .customDropdown {
    border: 3px dashed cyan;
    background-color: purple;
  }
</style>