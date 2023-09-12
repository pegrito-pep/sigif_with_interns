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
                  <b-col cols="3">
                    <sigif-form-group :sizeLabel="3" :sizeLabelLg="3" label="N° LV" v-model="search.nolv"/>
                    <b-form-group :label-cols="3" label="Site"  style="margin-top: 30px">
                         <select  v-model="search.site" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" >
                          <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                            {{ status.libelle }}
                          </option>
                        </select>
                     </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="Code barre LV" v-model="search.codebarrelv"/>
                    <sigif-form-group style="margin-top: 30px" :sizeLabel="4" :sizeLabelLg="4" label="N° lot d'entrée" v-model="search.nolotentree"/>
                  </b-col>
                  
                  <b-col cols="3">
                      <b-form-group class="p-0 m-0" :label-cols="3" label="Statut">
                         <select  v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i" >
                             {{ status.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                     <b-col class="p-0 m-0">
                        <div>
                            <b-row class="mt-3 p-0" >
                      
                        <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Du</label><date-picker  v-model="search.datedeb"   format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                        <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Au</label><date-picker  v-model="search.datefin"  format="dddd, DD MMMM YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/></b-col>
                      </b-row>


                        </div>
                    </b-col>
                  </b-col>
                    
                  <b-col cols="" style=" : top:-30px ; margin-top: 0px !important">

                    <div class="position_absolute pb-5 mb-4"> 
                       <label for="" class=" p-0">Entité forrestière</label>
                          <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 90%;font-size:1rem; border-radius:0.25rem;
                           height: calc(1em + .500rem + 2px) !important;">
                                <option selected="selected">{{ entite.libelle }}</option>
                          </select>
                    </div><br>

                     <div style="width: 220px !important" class="mt-4">
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
            {{ $t("data.Liste_des_entrées_de_parc") }}
          </h4></b-col
        >
        <b-col class="col-md-auto">
          <a
            @click.prevent="createOperationParc"
            :disabled="canCreateOperationParc"
            size="sm"
            :class="{
              'change-image-opacity': !canCreateOperationParc,
              'not-change-image-opacity': canCreateOperationParc,
            }"
            class="mx-1 simple-btn"
            ><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img
            >{{ $t("data.Créer") }}</a
          >
          <span>
            <a
              @click.prevent="callEditOperationParc"
              :disabled="canUpdateOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canUpdateOperationParc,
                'not-change-image-opacity': canUpdateOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canUpdateOperationParc }"
                src="@/assets/images/iconMODIFIER_16x16.png"
              ></b-img
              >{{ $t("data.Modifier") }}</a
            >
            <a
              :disabled="canDeleteOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canDeleteOperationParc,
                'not-change-image-opacity': canDeleteOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canDeleteOperationParc }"
                src="@/assets/images/iconSUPPRIMER_16x16.png"
              ></b-img
              >{{ $t("data.Supprimer") }}</a
            >
            <a
              :disabled="canViewDetailsOperationParc"
              @click.prevent="showDetails"
              size="sm"
              :class="{
                'change-image-opacity': !canViewDetailsOperationParc,
                'not-change-image-opacity': canViewDetailsOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{
                  'change-image-opacity': !canViewDetailsOperationParc,
                }"
                src="@/assets/images/iconVISUALISER_16x16.png"
              ></b-img
              >{{ $t("data.Consulter") }}</a
            >
            <a
              :disabled="canSaveOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canSaveOperationParc,
                'not-change-image-opacity': canSaveOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canSaveOperationParc }"
                src="@/assets/images/iconVALIDER_16x16.png"
              ></b-img
              >{{ $t("data.Valider") }}</a
            >
            <a
              :disabled="canSubmitOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canSubmitOperationParc,
                'not-change-image-opacity': canSubmitOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canSubmitOperationParc }"
                src="@/assets/images/iconSUBMIT_16x16.png"
              ></b-img
              >{{ $t("data.Soumettre") }}</a
            >
            <a
              :disabled="canPrintOperationParc"
              size="sm"
              :class="{
                'change-image-opacity': !canPrintOperationParc,
                'not-change-image-opacity': canPrintOperationParc,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canPrintOperationParc }"
                src="@/assets/images/iconIMPRIMER_16x16.png"
              ></b-img
              >{{ $t("data.Imprimer") }}</a
            >
          </span>
        </b-col>
      </b-row>
    </div>
    <!--implémentation tableau proprement dite-->
    <div class="ml-1">
      <b-table
        :busy="isBusy"
        hover
        select-mode="single"
        responsive="sm"
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        :items="items"
        :fields="fields"
        :tbody-tr-class="rowClass"
        show-empty
      >
        <template #table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">chargement...</strong>
          </div>
        </template>
        <template #empty>
          <h4 style="color: green" class="text-center">
            Aucune opération de parc de type
            <span class="font-weight-bold">entrée parc</span> trouvée!!
          </h4>
        </template>
        <template #cell(index)="data"
          ><b class="ml-1" style="color: #175131 !important">{{
            ++data.index
          }}</b>
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
  </div>
</template>

<script>
const php = require("phpjs");

import { mapGetters } from "vuex";
export default {
  name: "entree_parcs",
  components: {},
  data: () => ({
    isBusy: false,
    isRowselected: false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search: {
      site:"",
      entite:"",
      statut:"",
      datedeb:"",
      datefin:"",
    },

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    //données du tableaux
    fields: [
      { key: "index", label: "" },
      { key: "idoperation", label: "N° d'entrée" },
      { key: "dateope", label: "Date Opération" },
      { key: "heureoper", label: "heure" },
      { key: "siteoperation", label: "Site" },
      { key: "type_operation", label: "Type Opération" },
      { key: "status", label: "statut" },
    ],
    elements: [],
    selected: {},
      entite:{
      id:1,
      libelle:''
    },
    /*propriétes lies au traitement d'une operation de parc */
    allSitesOperations: [
      {
        title: " Grande forèt amazioniènne",
        icon: "fa fa-database",
        id: 1,
      },
      {
        title: "  Foret de Sambissa",
        icon: "fa fa-book",
        id: 2,
      },
      {
        title: "  Foret Tropicale",
        icon: "fas fa-dollar-sign",
        id: 3,
      },
      {
        title: "  Foret de Manguissa",
        icon: "fa fa-pencil",
        id: 4,
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
  computed: {
    ...mapGetters(["user"]),
    /*propriétés liées aux accèes*/
    canCreateOperationParc() {
      return true;
    },
    canUpdateOperationParc() {
      return true;
    },
    canDeleteOperationParc() {
      return false;
    },
    canViewDetailsOperationParc() {
      return true;
    },
    canSaveOperationParc() {
      return false;
    },
    canSubmitOperationParc() {
      return true;
    },
    canPrintOperationParc() {
      return false;
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
      console.log("row selected", items);
      items.isSelected = true;
      this.isRowselected = true;
      this.selected = items;
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
      this.getEntreesParcsCemac();
    },
    getEntreesParcsCemac() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$boisCemac
        .get("entrees-parc", { params })
        .then((response) => {
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;

          this.elements = this.elements.map((elt) => {
            elt.type_operation = elt.parcOperationTypeopeparc.libelle;
            elt.dateope =
              elt.dateope !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
            elt.heureoper =
              elt.heureoper !== null
                ? this.$dayjs(elt.heureoper).format("HH:mm")
                : "";
            elt.siteoperation = elt.siteoperation.intitule;
            elt.status = elt.statutenr == 1 ? "soumise" : "en cours";

            return elt;
          });
          this.isBusy = false;
          setTimeout(() => {
            this.$refs["selectableTable"].selectRow(0);
          }, 200);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetSearcheBar() {
      this.search = {
        numpermis: "",
        numtitre: "",
        essence: "",
        numaac: "",
        exercice: "",
        numufa: "",
        numufe: "",
        numdf10: "",
        datedeb: "",
        datefin: "",
      };
      localStorage.removeItem("sigif2./entree_parcs");
    },
    filterTable() {
      if (!this.disabled) {
        this.search.entite = this.entite.libelle;
      }
      console.log("response", this.search);
      this.isBusy = true;
      this.$boisCemac
        .post("entrees-parc/search", this.search)
        .then((response) => {
          console.log("response entrées", response);
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;

          this.elements = this.elements.map((elt) => {
            elt.type_operation = elt.parcOperationTypeopeparc.libelle;
            elt.dateope =
              elt.dateope !== null
                ? this.$dayjs(elt.dateope).format("DD/MM/YYYY")
                : "";
            elt.heureoper =
              elt.heureoper !== null
                ? this.$dayjs(elt.heureoper).format("HH:mm")
                : "";
            elt.siteoperation = elt.siteoperation.intitule;
            elt.status = elt.statutenr == 1 ? "soumise" : "en cours";

            return elt;
          });
          this.isBusy = false;
          setTimeout(() => {
            this.$refs["selectableTable"].selectRow(0);
          }, 200);
        })
        .catch((error) => {
          this.isBusy = false;
          console.log("c", error.response.data);
        });
    },
    reset() {
      this.resetSearcheBar();
      this.getEntreesParcsCemac();
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
  },

  mounted() {
    this.entite.libelle = this.user.profil.organisation;
    if (
      JSON.parse(
        storage.get(this.$route.path) !== "" &&
          JSON.parse(storage.get(this.$route.path) !== null)
      )
    ) {
      this.search = JSON.parse(storage.get(this.$route.path));
      this.filterTable();
    } else {
      this.getEntreesParcsCemac();
    }
    if (this.entite.libelle !== "MINFOF") {
      this.disabled = true;
    }
  },
};
</script>
<style scoped>
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
</style>