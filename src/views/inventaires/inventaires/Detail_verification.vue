<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <b-row>
        
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span
                class="ml-1 font-weight-bold"
              >consultation Vérifications inventaires </span>
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
                  <label for="" class="data">{{ verificationDetail.typetitre }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">N° du Titre:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data">{{ verificationDetail.numtitre }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
               
               
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
                  <label for="" class="data">{{ verificationDetail.entiteagree }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="4">
                  <label for="input-small" class="text-muted">Type d'inventaire:</label>
                </b-col>
                <b-col sm="4">
                    <select class="m-0 p-0" v-model="verificationDetail.typeinventaire" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option selected="selected">{{ verificationDetail.typeinventaire }}</option>
                    </select>
                </b-col>
              </b-row>
              <b-row class="my-1">
               
                <b-col sm="4">
                  <div class="d-flex justify-content-between">
                    <label for="" class="data">ccti.pdf</label>
                    <b-button id="tooltip-button-show-event"><i class="fa fa-download"></i></b-button>
                    <b-tooltip placement="right" ref="tooltip" target="tooltip-button-show-event" variant="success" class="tooltip-success">
                      <strong>Télécharger!</strong>
                    </b-tooltip>
                  </div>
                  
                </b-col>
              </b-row>
            </b-container>
          </b-col>
          <b-col cols="3">
            <b-container fluid>

              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-small" class="text-muted">Date de vérification:</label>
                </b-col>
                <b-col sm="5">
                  <label for="" class="data">{{ verificationDetail.dateverification }}</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="6">
                  <label for="input-small" class="text-muted">Exercice fiscal:</label>
                </b-col>
                <b-col sm="5">
                  <label for="" class="data">{{ verificationDetail.exercice }}</label>
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
                      <h4 class="tab-header-left-text">Liste des tiges  </h4>  <a id="export" class="text-success boder-none">  Exporter</a>
                    </b-col>
                    <b-col><a id="export" class="text-success boder-none"> Fichier des anomalies de vérification</a></b-col>
                  </b-row>
                </div>
                <!--implémentation tableau proprement dite-->
                <div class="ml-1" style="width:99%">
                    <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                      :items="verificationDetail.tiges" 
                      :fields="fields" 
                      :tbody-tr-class="rowClass" show-empty>
                      <template v-slot:head(codeabarresequence)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(nomcommercial)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(diametretige)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(nobloc)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(nouc)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(notige)="data">
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
                    <b-row>
                        <b-col class="w-50"><input v-model="data.item.codebarre" class="form-control-xs" style="width:85%"></b-col>
                    </b-row>
                  </template>
                  <template #cell(numsequence)="data">
                    <b-row>
                        <b-col class="w-50"><input v-model="data.item.numsequence" class="form-control-xs" style="width:85%"></b-col>
                    </b-row>
                  </template>
                  <template #cell(nomcommercial)="data">
                    <input v-model="data.item.nomcommercial" class="form-control-xs">
                  </template>
                  <template #cell(diametretige)="data">
                    <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.diametretige" class="form-control-xs" style="width:45%; text-align:right;"></div>
                  </template>
                  <template #cell(nobloc)="data">
                    <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.nobloc" class="form-control-xs" style="width:45%;"></div>
                  </template>
                  <template #cell(nouc)="data">
                    <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.nouc" class="form-control-xs" style="width:45%;"></div>
                  </template>
                  <template #cell(notige)="data">
                    <div class="w-100 d-flex  justify-content-center"><input disabled v-model="data.item.notige" class="form-control-xs" style="width:45%; text-align: right;"></div>
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
  name: "detail-billons",
  components: {},
  data: () => ({
    verificationDetail:{},
    showOverlay: false,
     isBusy:false,
    isRowselected:false,
    width:"w-50",
    selectWidht:"w-75",
    section: "opInventaires",
    fields: [
      { key:'index', label:''},
        { key:'codebarre', label:'code a barre',thStyle: { width: "8%" }},
        { key:'codebarre', label:'code a barre',thStyle: { width: "8%" }},
        { key:'nomcommercial', label:'Nom commercial',thStyle: { width: "11%" }},
        { key:'diametretige', label:'Diamètre Tige'},
        { key:'nobloc', label:'No Bloc'},
        { key:'nouc', label:'No UC'},
        { key:'notige', label:'No Tige'},
        { key:'qualite', label:'Qualité',thStyle: { width: "6%" }},
        { key:'zone', label:'Zone',thStyle: { width: "6%" }},
        { key:'utmx', label:'UTM X'},
        { key:'utmy', label:'UTM Y'},
        { key:'volume', label:'Volume(m3)'},

    ],
    elements: []
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
    async getDetailsVerification() {
    this.showOverlay = true
    this.verificationDetail = await this.$inventaire.get('verifications/' +this.$route.params.id).then(response => response.data.result)
    if(this.verificationDetail.datesignature!=null&&this.verificationDetail.datesignature!=''){
      this.verificationDetail.datesignature=this.verificationDetail.datesignature.split('T')[0].replace(/-/g, "/")
    }
    if(this.verificationDetail.dateverification!=null&&this.verificationDetail.dateverification!=''){
      this.verificationDetail.dateverification=this.verificationDetail.dateverification.split('T')[0].replace(/-/g, "/")
    }
    console.log('verif inventaire',this.verificationDetail);
    this.showOverlay = false
  },

    toggleSideBar() {
      var sidebar = document.querySelector("#sidebar");
      var administration = document.querySelector("#administration");
      var administrationItem = document.querySelectorAll(".administrationItem");
      var actionButton = document.querySelector("#toggleSideBar");

      if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.transition = "all 0.5s ease";
        administration.style.backgroundColor = "white";
        administration.style.transition = "background-color 0.2s ease";
        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "0";
          element.style.transition = "opacity 0.2s ease";
        }
        actionButton.innerHTML =
          '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
      } else {
        sidebar.style.width = "250px";
        sidebar.style.transition = "all 0.3s ease";
        administration.style.backgroundColor = "#82C138";
        administration.style.transition = "background-color 0.8s ease";

        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "100%";
          element.style.transition = "opacity 1s ease";
        }

        actionButton.innerHTML =
          '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
    }
  },
  beforeMount() {
    setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    this.getDetailsVerification();
  }
};
</script>
<style scoped>

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