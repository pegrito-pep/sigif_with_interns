<template>
  <div id="cover" class="min-vh-100">
    <div>
     <div class="d-flex">
    <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
     <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
        class="p-0 m-0"
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
              <b-card class="b-card mt-0">
                <b-row>
                  <b-col cols="2" class="mx-1">
                    <b-row class="m-0 d-flex flex-column">
                        <b-col class="d-flex w-100 p-0" >
                          <label for="" style="padding-right: 0.5rem">DU</label>
                          <date-picker v-model="search.datedeb" format="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                        </b-col>
                        <b-col class="d-flex mt-2 p-0">
                            <label for="" style="padding-right: 0.5rem">AU</label>
                            <date-picker v-model="search.datefin" format="DD-MM-YYYY" placeholder="date de fin" valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                        </b-col>
                      </b-row>
                     
                  </b-col>
                  
                  <b-col cols="2"  class="mx-1">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="4" label="Login" v-model="search.login"/>
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="4" label="Poste" v-model="search.poste"/>
                  </b-col>
                                    
                  <b-col cols="4" class="ml-1 position-relative mx-1">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" label="Adresse IP" v-model="search.ip"/>
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" label="Formulaire manipulé" v-model="search.formulaire"/>
                  </b-col>

                  <b-col>
                    <div class="" style="width: 220px;" >
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>
                  </b-col>

                </b-row>
                
                
              </b-card>
            </b-collapse>

    
    </div>
    <!--entete des tableaux -->
    <div class="m-0 px-2 table-header-border">
      <b-row>
        <b-col
          ><h4 class="tab-header-left-text">
            Listes des Opérations
          </h4></b-col
        >
        <b-col class="col-md-auto">
            <a   style="cursor:pointer;"
              @click.prevent=""
              :disabled="canUpdateOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canUpdateOperationParc,
                'not-change-image-opacity': canUpdateOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
            
                :class="{ 'change-image-opacity': !canUpdateOperationParc }"
                src="@/assets/images/iconIMPRIMER_16x16.png"
              ></b-img
              >{{ $t("data.Imprimer") }}</a
            >
        </b-col>
      </b-row>
    </div>
    <!--implémentation tableau proprement dite-->
    <div class="ml-1">
      <b-table
        :busy="isBusy"
        select-mode="single"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        :items="items"
        :fields="fields"
        hover
        :tbody-tr-class="rowClass"
        show-empty
      >
        <template #table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">{{ $t("data.Chargement...") }}</strong>
          </div>
        </template>
        <template #empty>
          <h4 style="color: green" class="text-center">
            Aucune
            <span class="font-weight-bold">donnée</span> trouvée!!
          </h4>
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
    <!--MODAL POUR AJOUTER / SUPPRIMER UNE OPERATION DE PARC -->
    <b-modal id="modal-lg" size="lg" title="Large Modal">
      <b-row>
        <b-col>
          <b-row>
            <div class="form-group">
              <p class="my-4">{{ $t("data.Site concerné") }}</p>
              <v-select
                :options="allSitesOperations"
                :reduce="(site) => site.id"
                v-model="op.site_concernee"
                label="title"
              >
                <template v-slot:option="option">
                  <div class="d-flex">
                    <div class="w-10">
                      <i
                        :class="option.icon"
                        style="font-size: 36px; color: #f5365c"
                      ></i>
                    </div>
                    <div
                      class="d-flex justify-content-center align-items-center"
                    >
                      {{ option.title }}
                    </div>
                  </div>
                </template>
              </v-select>
            </div>
          </b-row>
          <b-row>
            <div class="form-group">
              <p class="my-4">Entité concernée</p>
              <v-select
                :options="[]"
                :reduce="(entite) => entite.id"
                v-model="op.entitee_concernee"
                label="title"
              >
              </v-select>
            </div>
          </b-row>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-form-group
                label="date de Début de l'opération"
                description="L'opération a commencé quand ?"
              >
                <date-pick
                  v-model="op_date"
                  :pickTime="true"
                  :use12HourClock="true"
                  :format="'YYYY-MM-DD HH:mm'"
                  :displayFormat="'YYYY.MM.DD H:mm A'"
                ></date-pick>
              </b-form-group>
            </b-col>
            <b-col></b-col>
          </b-row>
          <b-row>
            <b-form-group label="statut" description="">
              <b-form-select
                v-model="op.statut"
                :options="op_status"
                size="sm"
                class="mt-3"
              ></b-form-select>
            </b-form-group>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
const php = require("phpjs");

export default {
  name: "mouchard",
  data: () => ({
    isBusy: false,
    isRowselected: false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    options: [
      { value: null, text: "Please select an option" },
      { value: "brouillon", text: "brouillon" },
      { value: "soumise", text: "soumise" },
      { value: "validée", text: "validée" },
      { value: "soumission en cours", text: "soumission en cours" },
    ],

    entite:{
      id:1,
      libelle:''
    },

    // Données pour la recherche
    search : {
      ip: "",
    poste: "",
    formulaire: "",
    datedeb: "",
    datefin: "",
    login: "",
     
    }, 
    searchSubmitted:false,
    disabled:false,

    //données du tableaux
    fields: [
      { key: "LOGIN", label: "Login" },
      { key: "DATE_MANIP", label: "Date" },
      { key: "POSTE", label: "Poste" },
      { key: "FORMULAIRE_MANIP", label: "Formulaire manipulé" },
      { key: "ADRESSEIP", label: "Adresse IP" },
      { key: "NOM_TABLE", label: "Table" },
      { key: "NATURE_OPERATION", label: "Action" },
      { key: "IDENREGISTREMENT", label: "Donnée"},
    ],
    elements: [],
    selected: {},
    /*propriétes lies au traitement d'une operation de parc */
    allSitesOperations: [
      {
        title: " Grande forèt amazioniènne",
        icon: "fa fa-database",
        id: 1,
      },
      
    ],
    op_status: [
      { value: null, text: "Please select an option" },
      { value: "a", text: "This is First option" },
      { value: "b", text: "Selected Option" },
      { value: { C: "3PO" }, text: "This is an option with object value" },
      { value: "d", text: "This one is disabled", disabled: true },
    ],
    op_date: "2019-01-01 14:30",
    op: {
      site_concernee: "",
      date_operation: "",
      heure_operation: "",
      statut: null,
    },
  }),
  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  computed: {
    
    canPrintMouchard() {
      return this.hasAccess('IMPRIMER_MOUCHARD')
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
  },

  methods: {
    rowClass(item, type) {
      if (item != "" && item != null) {
        if (item.isEven) return "table-row-other";
        if (!item || type !== "row") return "table-info";
      } else {
        return;
      }
    },
   onRowSelected(items) {
    this.isRowselected=true
        this.selected = items
        console.log('ligne sélectionnée',this.selected);
  },
    callEditOperationParc() {
      this.$bvModal.show("modal-lg");
    },

    
  reset(){
    this.resetSearcheBar()
    this.getRegularisations()
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
      this.getMouchard();
    },

    getMouchard() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$administration
        .get("mouchard", { params })
        .then((response) => {
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;
          console.log('éléments ',this.elements);
          this.isBusy = false;
        })
        .catch((error) => {
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          return App.alertError('Impossible de joindre le serveur')
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
      resetSearcheBar(){
        this.search = {
          ip: "",
          poste: "",
          formulaire: "",
          datedeb: "",
          datefin: "",
          login: "",
        }
        localStorage.removeItem('sigif2./administration-mouchard')
      },
      filterTable(){
        if(!this.disabled){
          this.search.entite = this.entite.libelle
        }
        console.log('response',this.search);
        this.isBusy=true
        this.$administration.post("mouchard/search", this.search).then((response) => {
          console.log('response entrées',response);
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
          
            this.elements = this.elements.map(elt =>{
              
            })

            storage.set(this.$route.path ,JSON.stringify(this.search))
              this.isBusy=false
          })
          .catch((error) => {
            this.isBusy=false
              console.log('c',error.response.data);
          });
      }

  },
  

  mounted() {
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getMouchard();}
    
    
  },
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
</style>