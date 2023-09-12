<template>
   <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <b-row>
          <b-col
            ><h4 class="tab-header-left-text" style>
              <button id="toggleSideBar" @click="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px"
                  >&times;</span
                ></button
              ><span>Consultation du profil</span><span class="ml-1 font-weight-bold"> {{ profilDetail.intitule }}</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <a
                @click.prevent="fermer"
                size="sm"
                class="mx-1 simple-btn"
                style="cursor: pointer"
                ><b-img src="@/assets/images/picto_retour_vert.png"></b-img
                >Fermer</a
              >
            </span>
          </b-col>
        </b-row>
      </div>
    </b-overlay>
    <div class="ml-4 w-50">
      
      <b-row class="m-2">
        <b-col cols="6">
          <h4>Type de profil :  
            <span class="font-weight-bold">{{ profilDetail.libelleTypeProfil  }}</span>
          </h4>
        </b-col>
        <b-col>
          <h4 class="m-0">
            <b-badge variant class="mx-1" style="font-size:1em">{{ totalPrivileges }} droits attribué<span v-if="totalPrivileges>1">s</span></b-badge>
          </h4>          
        </b-col>
      </b-row>
    </div>

    <div>
      <h4 class="text-center font-weight-bold">Classification des droits par module</h4>
    </div>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1" v-if="miniAdminitrationTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-1 variant="success" class="text-uppercase">Administration</b-button>
        </b-card-header>
        <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniAdminitrationTable.length" :key="i">
              <b-list-group-item v-for="j in miniAdminitrationTable[i-1]" :key="j">{{ j }}</b-list-group-item>
            </b-list-group>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniDonneesderefenreceTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="success" class="text-uppercase">Données de reférence</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" visible accordion="my-accordion" role="tabpanel">
          <b-card-body class="d-flex justify-content-between align-items-center" style="flex-wrap:wrap">
            <b-list-group v-for="i in miniDonneesderefenreceTable.length" :key="i">
              <b-list-group-item v-for="j in miniDonneesderefenreceTable[i-1]" :key="j">{{ j }}</b-list-group-item>
          </b-list-group>
        </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniTitresTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-3 variant="success" class="text-uppercase">Titres forrestiers</b-button>
        </b-card-header>
          <b-collapse id="accordion-3" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniTitresTable.length" :key="i">
                <b-list-group-item v-for="j in miniTitresTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniCodebarresTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-4 variant="success" class="text-uppercase">codes barres</b-button>
        </b-card-header>
          <b-collapse id="accordion-4" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniCodebarresTable.length" :key="i">
                <b-list-group-item v-for="j in miniCodebarresTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniInventaireTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-5 variant="success" class="text-uppercase">inventaires</b-button>
        </b-card-header>
          <b-collapse id="accordion-5" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniInventaireTable.length" :key="i">
                <b-list-group-item v-for="j in miniInventaireTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniPermisTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-6 variant="success" class="text-uppercase">permis</b-button>
        </b-card-header>
          <b-collapse id="accordion-6" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniPermisTable.length" :key="i">
                <b-list-group-item v-for="j in miniPermisTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniAbbattageTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-7 variant="success" class="text-uppercase">Abattages</b-button>
        </b-card-header>
          <b-collapse id="accordion-7" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniAbbattageTable.length" :key="i">
                <b-list-group-item v-for="j in miniAbbattageTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniBoiscemacTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-19 variant="success" class="text-uppercase">bois cemac</b-button>
        </b-card-header>
          <b-collapse id="accordion-19" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniBoiscemacTable.length" :key="i">
                <b-list-group-item v-for="j in miniBoiscemacTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniOperationdeparcTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-8 variant="success" class="text-uppercase">opérations de parc</b-button>
        </b-card-header>
          <b-collapse id="accordion-8" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniOperationdeparcTable.length" :key="i">
                <b-list-group-item v-for="j in miniOperationdeparcTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniTransformationTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-9 variant="success" class="text-uppercase">transformation</b-button>
        </b-card-header>
          <b-collapse id="accordion-9" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniTransformationTable.length" :key="i">
                <b-list-group-item v-for="j in miniTransformationTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniFiscaliteTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-10 variant="success" class="text-uppercase">fiscalité forrestière</b-button>
        </b-card-header>
          <b-collapse id="accordion-10" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniFiscaliteTable.length" :key="i">
                <b-list-group-item v-for="j in miniFiscaliteTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniContentieuxTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-11 variant="success" class="text-uppercase">contentieux</b-button>
        </b-card-header>
          <b-collapse id="accordion-11" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniContentieuxTable.length" :key="i">
                <b-list-group-item v-for="j in miniContentieuxTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniCertificatTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-12 variant="success" class="text-uppercase">certificats de légalité</b-button>
        </b-card-header>
          <b-collapse id="accordion-12" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniCertificatTable.length" :key="i">
                <b-list-group-item v-for="j in miniCertificatTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniExportationTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-13 variant="success" class="text-uppercase">exportations</b-button>
        </b-card-header>
          <b-collapse id="accordion-13" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniExportationTable.length" :key="i">
                <b-list-group-item v-for="j in miniExportationTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniTracabiliteTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-14 variant="success" class="text-uppercase">tracabilité</b-button>
        </b-card-header>
          <b-collapse id="accordion-14" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniTracabiliteTable.length" :key="i">
                <b-list-group-item v-for="j in miniTracabiliteTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniControleTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-15 variant="success" class="text-uppercase">controle</b-button>
        </b-card-header>
          <b-collapse id="accordion-15" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniControleTable.length" :key="i">
                <b-list-group-item v-for="j in miniControleTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniSigTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-17 variant="success" class="text-uppercase">sig</b-button>
        </b-card-header>
          <b-collapse id="accordion-17" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniSigTable.length" :key="i">
                <b-list-group-item v-for="j in miniSigTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
      <b-card no-body class="mb-1" v-if="miniRapportTable.length>0">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button block v-b-toggle.accordion-18 variant="success" class="text-uppercase">rapport</b-button>
        </b-card-header>
          <b-collapse id="accordion-18" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="d-flex justify-content-between">
              <b-list-group v-for="i in miniRapportTable.length" :key="i">
                <b-list-group-item v-for="j in miniRapportTable[i-1]" :key="j">{{ j }}</b-list-group-item>
              </b-list-group>
            </b-card-body>
          </b-collapse>
      </b-card>
    </div>


  </div>
</template>

<script>
const php = require("phpjs");

export default {
  name: "detail_profil",

  data: () => ({
    ADMINISTRATION:[],
    miniAdminitrationTable:[],
    DONNEES_REFERENCE:[],
    miniDonneesderefenreceTable:[],
    TITRE:[],
    miniTitresTable:[],
    CODEBARRES:[],
    miniCodebarresTable:[],
    INVENTAIRE:[],
    miniInventaireTable:[],
    PERMIS:[],
    miniPermisTable:[],
    ABATTAGE:[],
    miniAbbattageTable:[],
    BOIS_CEMAC:[],
    miniBoiscemacTable:[],
    OPERATION_PARC:[],
    miniOperationdeparcTable:[],
    TRANSFORMATION:[],
    miniTransformationTable:[],
    FISCALITE:[],
    miniFiscaliteTable:[],
    CONTENTIEUX:[],
    miniContentieuxTable:[],
    CERTIFICAT:[],
    miniCertificatTable:[],
    EXPORTATION:[],
    miniExportationTable:[],
    TRACABILITE:[],
    miniTracabiliteTable:[],
    CONTROLES:[],
    miniControleTable:[],
    SIG:[],
    miniSigTable:[],
    RAPPORT:[],
    miniRapportTable:[],
    totalprivileles:'',
    showOverlay: false,
    user: {},
    isBusy: false,
    //données du tableaux
    checked:true,
    profilDetail:{
      intitule:"geographe",
      typeProfil:{
        intitule:"Opérateur",
      },

      
    },
    totalPrivileges:"",
    objetPrivileges:null,

    //elements pagination
    perPage: 10,
    currentPage: 1,
    total: 0,

  }),
  fields: [
    { key: "index", label: "" },
    { key: "code_privilege", label: "Libellé_privilège" },
    { key: "supprimer", label: "" },
    { key: "n", label: "Nom" },
  ],
  computed: {
    tailleAdministration(){return Math.ceil(this.ADMINISTRATION.length/4)},
    tailledonnereferences(){return Math.ceil(this.DONNEES_REFERENCE.length/4)},
    tailleTitres(){return Math.ceil(this.TITRE.length/4)},
    tailleCodebarres(){return Math.ceil(this.CODEBARRES.length/4)},
    tailleInventaire(){return Math.ceil(this.INVENTAIRE.length/4)},
    taillePermis(){return Math.ceil(this.PERMIS.length/4)},
    tailleAbbattage(){return Math.ceil(this.ABATTAGE.length/4)},
    tailleBoiscemac(){return Math.ceil(this.BOIS_CEMAC.length/4)},
    tailleOperationParc(){return Math.ceil(this.OPERATION_PARC.length/4)},
    tailleTransformation(){return Math.ceil(this.TRANSFORMATION.length/4)},
    tailleFiscalite(){return Math.ceil(this.FISCALITE.length/4)},
    tailleContentieux(){return Math.ceil(this.CONTENTIEUX.length/4)},
    tailleCertificat(){return Math.ceil(this.CERTIFICAT.length/4)},
    tailleExportation(){return Math.ceil(this.EXPORTATION.length/4)},
    tailleTracabilite(){return Math.ceil(this.TRACABILITE.length/4)},
    tailleControle(){return Math.ceil(this.CONTROLES.length/4)},
    tailleSig(){return Math.ceil(this.SIG.length/4)},
    tailleRapport(){return Math.ceil(this.RAPPORT.length/4)},

    items() { 
      return this.privileges.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
  },

  methods: {
    fermer() {
      this.$router.back();
    },
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },

    async getDetailProfil() {
      this.showOverlay = true;
      this.profilDetail = await this.$administration
        .get("profils/" + this.$route.params.id)
        .then((response) => response.data.result);
      this.objetPrivileges=this.profilDetail.privileges
      this.totalPrivileges = this.objetPrivileges.totalsPrivilege[0]
      //console.log('taille totale ',this.objetPrivileges.totalsPrivilege[0]);
      this.ADMINISTRATION= !php.empty(this.objetPrivileges.ADMINISTRATION)?this.objetPrivileges.ADMINISTRATION:[]
        while(this.ADMINISTRATION.length) {
          this.miniAdminitrationTable.push(this.ADMINISTRATION.splice(0,4))
        }
      this.DONNEES_REFERENCE= !php.empty(this.objetPrivileges.DONNEES_REFERENCE)?this.objetPrivileges.DONNEES_REFERENCE:[]
        while(this.DONNEES_REFERENCE.length) {
          this.miniDonneesderefenreceTable.push(this.DONNEES_REFERENCE.splice(0,4))
        }
      this.TITRE= !php.empty(this.objetPrivileges.TITRE)?this.objetPrivileges.TITRE:[]
        while(this.TITRE.length) {
          this.miniTitresTable.push(this.TITRE.splice(0,4))
        }
      this.INVENTAIRE= !php.empty(this.objetPrivileges.INVENTAIRE)?this.objetPrivileges.INVENTAIRE:[]
        while(this.INVENTAIRE.length) {
          this.miniInventaireTable.push(this.INVENTAIRE.splice(0,4))
        }  
      this.ABATTAGE= !php.empty(this.objetPrivileges.ABATTAGE)?this.objetPrivileges.ABATTAGE:[]
        while(this.ABATTAGE.length) {
          this.miniAbbattageTable.push(this.ABATTAGE.splice(0,4))
        }
      this.PERMIS= !php.empty(this.objetPrivileges.PERMIS)?this.objetPrivileges.PERMIS:[]
        while(this.PERMIS.length) {
          this.miniPermisTable.push(this.PERMIS.splice(0,4))
        }
      this.CODEBARRES= !php.empty(this.objetPrivileges.CODEBARRES)?this.objetPrivileges.CODEBARRES:[]
        while(this.CODEBARRES.length) {
          this.miniCodebarresTable.push(this.CODEBARRES.splice(0,4))
        }
      this.BOIS_CEMAC= !php.empty(this.objetPrivileges.BOIS_CEMAC)?this.objetPrivileges.BOIS_CEMAC:[]
        while(this.BOIS_CEMAC.length) {
          this.miniBoiscemacTable.push(this.BOIS_CEMAC.splice(0,4))
        }
      this.OPERATION_PARC= !php.empty(this.objetPrivileges.OPERATION_PARC)?this.objetPrivileges.OPERATION_PARC:[]
        while(this.OPERATION_PARC.length) {
          this.miniOperationdeparcTable.push(this.OPERATION_PARC.splice(0,4))
        }
      this.TRANSFORMATION= !php.empty(this.objetPrivileges.TRANSFORMATION)?this.objetPrivileges.TRANSFORMATION:[]
        while(this.TRANSFORMATION.length) {
          this.miniTransformationTable.push(this.TRANSFORMATION.splice(0,4))
        }
      this.FISCALITE= !php.empty(this.objetPrivileges.FISCALITE)?this.objetPrivileges.FISCALITE:[]
        while(this.FISCALITE.length) {
          this.miniFiscaliteTable.push(this.FISCALITE.splice(0,4))
        }
      this.CONTENTIEUX= !php.empty(this.objetPrivileges.CONTENTIEUX)?this.objetPrivileges.CONTENTIEUX:[]
        while(this.CONTENTIEUX.length) {
          this.miniContentieuxTable.push(this.CONTENTIEUX.splice(0,4))
        }
      this.CERTIFICAT= !php.empty(this.objetPrivileges.CERTIFICAT)?this.objetPrivileges.CERTIFICAT:[]
        while(this.CERTIFICAT.length) {
          this.miniCertificatTable.push(this.CERTIFICAT.splice(0,4))
        }
      this.EXPORTATION= !php.empty(this.objetPrivileges.EXPORTATION)?this.objetPrivileges.EXPORTATION:[]
        while(this.EXPORTATION.length) {
          this.miniExportationTable.push(this.EXPORTATION.splice(0,4))
        }
      this.TRACABILITE= !php.empty(this.objetPrivileges.TRACABILITE)?this.objetPrivileges.TRACABILITE:[]
        while(this.TRACABILITE.length) {
          this.miniTracabiliteTable.push(this.TRACABILITE.splice(0,4))
        }
      this.CONTROLES= !php.empty(this.objetPrivileges.CONTROLES)?this.objetPrivileges.CONTROLES:[]
        while(this.CONTROLES.length) {
          this.miniControleTable.push(this.CONTROLES.splice(0,4))
        }
      this.SIG= !php.empty(this.objetPrivileges.SIG)?this.objetPrivileges.SIG:[]
        while(this.SIG.length) {
          this.miniSigTable.push(this.SIG.splice(0,4))
        }
      this.RAPPORT= !php.empty(this.objetPrivileges.RAPPORT)?this.objetPrivileges.RAPPORT:[]
        while(this.RAPPORT.length) {
          this.miniRapportTable.push(this.RAPPORT.splice(0,4))
        }

      this.showOverlay = false;
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
    },
  },

  beforeMount() {
    this.getDetailProfil();
  },
};
</script>
<style scoped>
.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor: pointer;
}
.custom {
  color: #82c138;
}
</style>
<style>
.custo-bg_detail_-table_element {
  background-color: #82c138;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: end;
    background-repeat: no-repeat;
    height: 100vh;
}
#toggleSideBar {
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
</style>