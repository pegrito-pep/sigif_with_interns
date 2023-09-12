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
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button><h4 class="tab-header-left-text mt-3">
            Liste des demandes de transactions
          </h4>
            </div>
              <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                 

                <b-row>
                   
                    <b-col cols="2">
                         <sigif-form-group-vertical :px="1" :py=".9" class="m-0" :label="$t('Num Pv')" v-model="search.numpv"/>
                    <sigif-form-group-vertical :px="1" :py=".9" class="mt-3" label="No" v-model="search.amende" />
                   

                    </b-col>
                     <b-col cols="2">
                         <sigif-form-group-vertical  :px="1" :py=".9" class="mt-0 p-0" label='No titre recouvrement' v-model="search.identifiant" />
                    <b-form-group class="m-0-0 p-0">
                          <div><label for="" class=" p-0" style="display: inline-block">Statut du dossier</label></div> 
                          <select v-model="search.statut" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                    </b-form-group>

                     </b-col>
                      <b-col cols="2">
                          <b-col>
                        <label for="" class="m-0 p-0">Du</label>
                        <date-picker  v-model="search.datedeb" format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                      </b-col> 
                       <b-col style="margin-top: 17px !important;" class="m-0 mt-1 p-0 "> 
                        <label for="" class="m-0 p-0">Au</label>
                        <date-picker  v-model="search.datefin" format="dddd, DD MMMM YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                      </b-col>


                      </b-col>
                    

                      
                      <b-col cols="2">

                     
                        
                      <div  class="ml-4"  style="margin-top: 99px">
                        <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                      </div>

                       </b-col>



                      <!-- <b-col cols="2">

                      </b-col>

                     
                        
                      <div  class="d-flex justify-content-end " cols="2" style="margin-top: 60px">
                        <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                      </div> -->

                      


                </b-row>

              </b-card>
            </b-collapse>

    </div>
    <!--entete des tableaux -->
    <div class="m-0 px-2 table-header-border">
      <b-row>
        <b-col
          ><h4 class="tab-header-left-text">
            Liste des demandes de transactions
          </h4>
          </b-col
        >
        <b-col class="col-md-auto">
          <a
            :disabled="canCreateOperationParc"
            size="sm"
            :class="{
              'change-image-opacity': !canCreateOperationParc,
              'not-change-image-opacity': canCreateOperationParc,
            }"
            class="mx-1 simple-btn"
            ><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a
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
              >modifier</a
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
              >supprimer</a
            >
            <a
              :disabled="canViewDetailsLigneTransformation"
              @click.prevent="showDetails"
              size="sm"
              :class="{
                'change-image-opacity': !canViewDetailsLigneTransformation,
                'not-change-image-opacity': canViewDetailsLigneTransformation,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{
                  'change-image-opacity': !canViewDetailsLigneTransformation,
                }"
                src="@/assets/images/iconVISUALISER_16x16.png"
              ></b-img
              >consulter</a
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
              >valider</a
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
              >soumettre</a
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
              >imprimer</a
            >

           
              <a
              :disabled="canViewDetailsLigneTransformation"
              @click.prevent="showDetails"
              size="sm"
              :class="{
                'change-image-opacity': !canViewDetailsLigneTransformation,
                'not-change-image-opacity': canViewDetailsLigneTransformation,
              }"
              class="mx-1 simple-btn"
              >
              Annuler validation</a
            >
             <a
              :disabled="canViewDetailsLigneTransformation"
              @click.prevent="showDetails"
              size="sm"
              :class="{
                'change-image-opacity': !canViewDetailsLigneTransformation,
                'not-change-image-opacity': canViewDetailsLigneTransformation,
              }"
              class="mx-1 simple-btn"
              >
              cloturer pv</a
            >




            
          </span>
        </b-col>
      </b-row>
    </div>

    
        <div class="m-0 py-3 table-header-border  ">
      <b-row class="d-flex justify-content-between w-60">


        <div class="ml-5">
           <a   class="mx-1 simple-btn text-aligns-center"> notification primitives d'amende</a>
        </div>
          
          
        
        <div class=" d-flex justify-content-end mr-5">
          <a  class="mx-1 simple-btn" >Dossiers</a >
        
        </div>

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
  import { mapGetters } from 'vuex'
export default {
  name: "lignes_transformation",
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
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    //données du tableaux
    fields: [
      { key: "index", label: "" },
      { key: "codebarre", label: "Code barre" },
      { key: "intitule", label: "Numero du pv" },
      { key: "entite", label: "Montant principal" },
      { key: "uniteproduction", label: "Dommages et interets" },
      { key: "description", label: "Statut" },
      { key: "motifrejet", label: "no" },
      { key: "statut", label: "Signé le" },
      { key: "statut2", label: "Clos?" },
     
    ],
     

    elements: [
    ],
    selected: {},

  }),
  computed: {
    // ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateOperationParc() {
      return false;
    },
    canUpdateOperationParc() {
      return true;
    },
    canDeleteOperationParc() {
      return false;
    },
    canViewDetailsLigneTransformation() {
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
    filterTable() {
      this.isBusy=true
      this.$transformation.post("Site/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt => elt);
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
      identifiant: "",
      intitule: "",
      description: "",
	    motifrejet: "",
	    unite: "",
	    statut: "",
	    entite: "",
    }
     localStorage.removeItem('sigif2./transformation-lignes_de_transformation')
     
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
      this.getLignesTransformation();
    },
    getProcesVerbal() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$transformation
        .get("poces_verbal", { params })
        .then((response) => {
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;

          this.elements = this.elements.map(elt => elt);
          this.isBusy = false;


         setTimeout(() => {
            this.$refs["selectableTable"].selectRow(0);
          }, 200);
        })
        .catch((error) => {
          console.log(error);
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

  },

  mounted(){
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getLignesTransformation();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
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
</style>
