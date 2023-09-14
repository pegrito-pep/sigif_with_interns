<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <b-row>
        
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span
                class="ml-1 font-weight-bold"
              >consultation Inventaire {{ inventaireDetail.typetitre }} N°:{{ inventaireDetail.idaac }}</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
              </a>
            </span>
          </b-col>
          <div class="mx-4 w-100" style="border: 2px solid #82C138;"></div>
        </b-row>
      </div>
      <div class="mt-4 pb-4" style="border-bottom: 4px solid #82C138;">
        <b-row>
          <b-col cols="3">
            <b-container fluid>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Type de titre:</label>
                </b-col>
                <b-col sm="6">
                  <label for="" class="data">{{ inventaireDetail.typetitre }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">N° du Titre:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data">{{ inventaireDetail.numtitre  }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code barre:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data">{{ inventaireDetail.codebarre }}</label>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col cols="5">
            <b-container fluid>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-small" class="text-muted">Entite agrée inventaire:</label>
                </b-col>
                <b-col sm="4">
                  <label for="" class="data">{{ inventaireDetail.entiteagree }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-small" class="text-muted">Type d'inventaire:</label>
                </b-col>
                <b-col sm="4">
                    <select class="m-0 p-0" v-model="inventaireDetail.typeinventaire" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option selected="selected">{{ inventaireDetail.typeinventaire }}</option>
                    </select>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-small" class="text-muted">Cerificat de conformite:</label>
                </b-col>
                <b-col sm="4">
                  <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.joindrecaution!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.joindrecaution"><b-img src="@/assets/images/Attach_128x128.png"></b-img> caution</a>
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col cols="3">
            <b-container fluid>
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-small" class="text-muted">N° du certificat:</label>
                </b-col>
                <b-col sm="4">
                  <label for="" class="data">{{ inventaireDetail.numcertificat }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-small" class="text-muted">Date de signature:</label>
                </b-col>
                <b-col sm="5">
                  <label for="" class="data">{{ inventaireDetail.datesignature }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-small" class="text-muted">Exercice fiscal:</label>
                </b-col>
                <b-col sm="5">
                  <label for="" class="data">{{ inventaireDetail.exercice }}</label>
                </b-col>
              </b-row>
            </b-container>
          </b-col>

        </b-row>
      </div>
    <b-tabs content-class="mt-3" active-nav-item-class="bg-success" nav-class="text-success">

        <!--entete des tableaux -->
            <b-tab title="opération d'inventaires" active >
        <b-container fluid v-if="section == 'opInventaires'">
          <div >
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">Liste des tiges  </h4>  <a id="export" class="text-success boder-none">  Exportation</a>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:99%">
               <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="inventaireDetail.tiges" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template v-slot:head(codebarre)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(sequence)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(nomcommercial)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(diametre)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(numbloc)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(numuc)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(numtige)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(qualite)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(position)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(zone)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(utmx)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(utmy)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(volume)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                  <span style="color:green">(m<sup>3</sup>)</span>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                    <h4 style="color: green" class="text-center">Pas de <span class="font-weight-bold">Tiges</span> trouvées!!</h4>
                </template>
                <template slot="thead-top" slot-scope="{}">
                  <tr>
                    <th></th><th></th><th></th><th></th><th></th> <th></th><th></th><th></th>
                    <th class="text-center" colspan="3" style="border-bottom: 4px solid #82C138">Position</th>
                  </tr>
              </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
         
          <template #cell(codebarre)="data">
           <b-row style="display:flex">
              <b-col class="w-50"><input v-model="data.item.codebarre" class="form-control-xs" style="width:85%"></b-col>
           </b-row>
          </template>
          <template #cell(sequence)="data">
           <b-row style="display:flex">
              <b-col class="w-50"><input v-model="data.item.numsequence" class="form-control-xs" style="width:85%"></b-col>
           </b-row>
          </template>
          <template #cell(nomcommercial)="data">
            <input v-model="data.item.nomcommercial" class="form-control-xs">
          </template>
          <template #cell(diametre)="data">
            <div class="w-100 ml-1"><input disabled v-model="data.item.diametre" class="form-control-xs" style="width:45%; text-align:right;"></div>
          </template>
          <template #cell(numbloc)="data">
             <div class="w-100 ml-1"><input disabled v-model="data.item.numbloc" class="form-control-xs" style="width:45%;"></div>
          </template>
          <template #cell(numuc)="data">
            <div class="w-100 d-flex ml-1"><input disabled v-model="data.item.numuc" class="form-control-xs" style="width:45%;"></div>
          </template>
          <template #cell(numtige)="data">
            <div class="w-100 ml-1"><input disabled v-model="data.item.numtige" class="form-control-xs" style="width:45%; text-align: right;"></div>
          </template>
          <template #cell(qualite)="data">
            <div class="w-100 d-flex  justify-content-center">
              <select disabled v-model="data.item.qualite" class="form-control-xs" style="width:100%;">
                    <option> {{ data.item.qualite }}</option>
              </select>
            </div>
          </template>
          <template #cell(zone)="data">
            <div class="w-100 d-flex  justify-content-center">
              <select disabled v-model="data.item.zone" class="form-control-xs" style="width:80%;">
                    <option> {{ data.item.zone }}</option>
              </select>
            </div>
          </template>
           <template #cell(utmx)="data">
            <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.utmx" class="form-control-xs" style="width:90%; text-align: right;"></div>
          </template>
          <template #cell(utmy)="data">
            <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.utmy" class="form-control-xs" style="width:90%; text-align: right;"></div>
          </template>
          <template #cell(volume)="data">
            <div class="d-flex justify-content-center align-items-center">
              <h5 style="font-size:0.90em">{{ data.item.volume }}</h5>
            </div>
            
          </template>
          </b-table>
               
             



          </div>
        </b-container>
        </b-tab>
        <b-tab title="suivi des imports inventaires">
        <b-container fluid v-if="section == 'suivi des imports inventaires'">
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">Tableau de rendement par essence</h4>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:99%">
            <b-table
             
              hover
              select-mode="single"
              responsive="sm"
              ref="selectableTable"
              selectable
              :items="ligneTransforamtion.essences"
              :fields="fields"
              :tbody-tr-class="rowClass"
            >
              <template #table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-1">chargement...</strong>
                </div>
              </template>

             
            </b-table>
          </div>
        </b-container>
        </b-tab>
      </b-tabs>
    </b-overlay>
  </div>
</template>

<script>
const php = require("phpjs");

export default {
  name: "detail-inventaires",
  components: {},
  data: () => ({
    inventaireDetail:{ },
    showOverlay: false,
     isBusy:false,
    isRowselected:false,
    width:"w-50",
    selectWidht:"w-75",
    section: "opInventaires",
    fields: [
      { key:'index', label:''},
        { key:'codebarre', label:'code a barres',thStyle: { width: "8%" }},
        { key:'sequence', label:'Séquence',thStyle: { width: "8%" }},
        { key:'nomcommercial', label:'Nom commercial',thStyle: { width: "11%" }},
        { key:'diametre', label:'Diamètre Tige (cm)'},
        { key:'numbloc', label:'No Bloc'},
        { key:'numuc', label:'No UC'},
        { key:'numtige', label:'No Tige'},
        { key:'qualite', label:'Qualité',thStyle: { width: "6%" }},
        { key:'zone', label:'Zone',thStyle: { width: "6%" }},
        { key:'utmx', label:'UTM X'},
        { key:'utmy', label:'UTM Y'},
        { key:'volume', label:'Volume'},

    ],
    elements: [],
    selected:{},
  }),
  computed: {},

  methods: {
    rowClass(item, type) {
    if(item !=''&&item!=null){
       return ''
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
    fermer() {
      this.$router.push({ name: "inventaire" });
    },
    async getDetailsInventaire() {
    this.showOverlay = true
    this.inventaireDetail = await this.$inventaire.get('inventaires/' +this.$route.params.id).then(response => response.data.result)
    if(this.inventaireDetail.datesignature!=null&&this.inventaireDetail.datesignature!=''){
      this.inventaireDetail.datesignature=this.inventaireDetail.datesignature.split('T')[0].replace(/-/g, "/")
    }
    this.showOverlay = false
  },

  },
  beforeMount() {
    
    this.getDetailsInventaire();
  }
};
</script>
<style scoped>
.consulter-fichier {
  color: #175131!important;
  }
.consulter-fichier:hover{
text-decoration: underline;
}
.tooltip-success{background-color: #fff!important;}
.form-control-xs {
    height: calc(1em + .300rem) !important;
    font-size: .70rem !important;
    line-height: 1.5;
    border-radius: .2rem;
    border: 1px solid darkgreen;
    width: 100%;
    font-weight: 800;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-color:light;
    border-radius: .25rem;
    /*box-shadow: inset 0 0 0 transparent;*/
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
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
.data{
  margin-left: 10px;
  font-weight: bold !important;
  font-style: 60px !important;
  color: rgb(19, 16, 16);
}
.form-control {
  height: 30px !important;
}
#toggleSideBar {
  margin-left: 20px;
  border: none;
  background-color: #fff;
}



#cover {
  background-image: url("~@/assets/images/logo_sigif_trame.png");
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}








.table-header-border {
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text {
  display: inline;
  white-space: nowrap;
  font-family: "Verdana";
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row {
  background-color: #81c138a8;
  color: White;
}
.table td,
.table th {
  padding: 5px 0;
}

.table-row-other {
  background-color: #caf09e;
}
/*style de la pagination*/
.page-item.active .page-link {
  background-color: rgb(0, 82, 44) !important;
  border-color: rgb(0, 82, 44) !important;
  color: white !important;
}
.page-link {
  color: rgb(0, 82, 44) !important;
}
</style>