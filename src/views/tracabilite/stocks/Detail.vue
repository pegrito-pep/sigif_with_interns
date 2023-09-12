<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
            <tab-head
            title="Site n° 2389"
            :idElement="entreeParc.idoperation"
            :fermer="fermer"
            :showNew=false
            :showDelete=false
            :showModify=false
            :showSave=false
            :toggleSideBar="toggleSideBar"
            >
            </tab-head>
      </div>
      <b-card class="b-card">
        <b-row class="mt-0">
            <b-col>
                <b-form-group class="p-0 m-0"
                    label="Type de site :"
                    label-align="right"
                    label-cols="2"
                    >
                    <span  style="display: block;margin-top: 7px;"> {{ form.typesite }} PU</span>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label="Intitulé du site site :"
                    label-align="right"
                    label-cols="2"
                    >
                    <span style="display: block;margin-top: 7px;">{{form.intitulesite}}PU TEST</span>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label="Entité forestière :"
                    label-align="right"
                    label-cols="2"
                    >
                    <span style="display: block;margin-top: 7px;">{{form.entiteforestiere}}BOIS LEGAL CAMEROUN</span>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label="Arrondissement :"
                    label-align="right"
                    label-cols="2"
                    >
                    <span style="display: block;margin-top: 7px;">{{form.arrondissement}} MBANG</span>
                </b-form-group>
            </b-col>
        </b-row>
      </b-card>
    </div>
    <div class="stats-title" style="display: flex;margin-bottom:5px;margin-left: 10px;font-size: 0.8rem;">
      <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
        Volume total: 47.816</span>
      <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
        Quantité totale :7</span>
    </div>
    <b-tabs>
        <b-tab title="Détail des grumes" style="padding: 10px;">
            <!--entete des tableaux -->
            <div class="stats-title" style="display: flex;margin-bottom:5px;font-size: 0.8rem;">
              <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
                Volume total en entrée: 47.816;Volume total en sortie: 0;Volume total:47.816;</span>
              <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
                Quantité totale en entrée: 47.816;Quantité totale en sortie: 0;Quantité totale:7;</span>
            </div>
            <div class="m-0 px-3 pt-2 table-header-border">
                <b-row>
                <b-col><h4 class="tab-header-left-text mb-0"> Liste des codes à barres grumes </h4>
                </b-col>
                </b-row>
            </div>

            <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:85%">
            <b-table sticky-header="500px"  :busy="isBusy" hover select-mode="single" responsive="sm" :items="items"  :fields="fieldsProduits" :tbody-tr-class="rowClass" >
                <template v-slot:head(mvt)><span class="d-flex justify-content-around" style="color:green"></span></template>
                <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(dateoperation)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diampb)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diamgb)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>

                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                  <template #empty>
                    <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">Entrée parc</span> trouvée!!</h4>
                  </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(validite)>
                      <span style="display: flex;justify-content: center;align-items: center;" ><b-form-checkbox  checked="true" disabled></b-form-checkbox></span>
                    </template> 
                    <template #cell(codebarre)="data">
                      <input type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                    </template> 
                    <template #cell(reference)="data">
                      <input type="text" v-model="data.item.reference" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
                    <template #cell(lignedf10)="data">
                      <input type="text" v-model="data.item.lignedf10" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
                    <template #cell(nomcommercial)="data">
                      <input type="text" v-model="data.item.nomcommercial" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
            </b-table>
          </div>
          <!--AJOUT DE LA PAGINATION -->
          <paginator
            hr="top"
            :offset="offset"
            :total="total"
            :limit="perPage"
            :page="currentPage"
            @pageChanged="changePage"
            @limitChanged="(limit) => { perPage = limit;}"
          />
        </b-tab>
        <b-tab title="Détail des débités" style="padding: 10px;">
          <!--entete des tableaux -->
          <div class="stats-title" style="display: flex;margin-bottom:5px;font-size: 0.8rem;">
              <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
                Volume total en entrée: 47.816;Volume total en sortie: 0;Volume total:47.816;</span>
              <span style="border-radius:5px;margin-right:15px;padding: 2px 5px;border: 2px solid gray;">
                Quantité totale en entrée: 47.816;Quantité totale en sortie: 0;Quantité totale:7;</span>
            </div>
          <div class="m-0 px-3 pt-2 table-header-border">
                <b-row>
                <b-col><h4 class="tab-header-left-text mb-0"> Liste des codes à barres débités </h4>
                </b-col>
                </b-row>
            </div>
             <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:85%">
            <b-table sticky-header="500px"  :busy="isBusy" hover select-mode="single" ref="selectableTable" responsive="sm" :items="items2"  :fields="fieldsProduits2" :tbody-tr-class="rowClass" >
                <template v-slot:head(mvt)><span class="d-flex justify-content-around" style="color:green"></span></template>
                <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(dateoperation)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(nbpieces)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diamgb)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>

                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                  <template #empty>
                    <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">Entrée parc</span> trouvée!!</h4>
                  </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(validite)>
                      <span style="display: flex;justify-content: center;align-items: center;" ><b-form-checkbox  checked="true" disabled></b-form-checkbox></span>
                    </template> 
                    <template #cell(codebarre)="data">
                      <input type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                    </template> 
                    <template #cell(reference)="data">
                      <input type="text" v-model="data.item.reference" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
                    <template #cell(lignedf10)="data">
                      <input type="text" v-model="data.item.lignedf10" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
                    <template #cell(nomcommercial)="data">
                      <input type="text" v-model="data.item.nomcommercial" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                    </template> 
            </b-table>
          </div>
          <!--AJOUT DE LA PAGINATION -->
          <paginator
            hr="top"
            :offset="offset"
            :total="total"
            :limit="perPage"
            :page="currentPage"
            @pageChanged="changePage"
            @limitChanged="(limit) => { perPage = limit;}"
          />
        </b-tab>
    </b-tabs>
      
      
        <error-dialogue ref="errorDialogue"></error-dialogue>
      </b-overlay>
  </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TabHead from '@/components/TabHead.vue'
  import ErrorDialogue from '@/components/utils/AlertBox.vue';

export default {
  name: "details_entree_parc",
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    entreeParc:{},
    elements: [],
    form:{

    },
    selectWidht:"w-50",
     fieldsProduits: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "dateoperation", label: "Date opération" },
        { key: "codebarre", label: "Code à barre" }, { key: "nomcommercial", label: "Nom commercial" },{ key: "diampb", label: "Diamètre petit bout"},
        { key: "diamgb", label: "Diamètre gros bout"},{ key: "longueur", label: "Longueur(m)"},
        { key: "mvt", label: "Mouvement"},{ key: "volume", label: "Volume (m3)"},
     ],
     fieldsProduits2: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "dateoperation", label: "Date opération" },
        { key: "codebarre", label: "Code à barre" }, { key: "essence", label: "Essence" },{ key: "nbpieces", label: "Nombre de pièces"},
        { key: "longueur", label: "Longueur(m)"},{ key: "largeur", label: "Largeur(cm)"},{ key: "epaisseur", label: "Epaisseur (cm)"},
        { key: "mvt", label: "Mouvement"},
     ],
      itemsProduits:[],
     otherFields: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre"},{ key: "epaisseur", label: "Epaisseur de la pièce" },
        { key: "longueur", label: "Longueur de la pièce" }, { key: "largeur", label: "Largeur de la pièce" }, { key: "nbpieces", label: "Nbrede pièces" },
        { key: "poids", label: "Poids", thStyle: { width: "9%" } }, { key: "volume", label: "Volume (m3)" }, { key: "surface", label: "Surface" },
     ],
    options:["valide"],
    selected:{},
    offset:0,
    limit:10,
    total:0,
    currentPage:1,
    perPage:10,
    offsetSites: 0,
    limitSites: 10,
    perPageSite: 7,
    currentPageSite: 1,
    sites:[],
    searchSite:"",
    submitted:false
  }),
  components:{
    TabHead,
    ErrorDialogue
  },
  computed:{
    items() { 
      return this.itemsProduits.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },
    items2() { 
      return this.itemsProduits.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },
    otherItems(){ return },

   
  },
 
 methods: {
  async getDetailsStocks(){
    this.showOverlay=true
    try{
      const stocksDetails=await this.$tracabilite.get('traçalabiliter/stock/'+this.$route.params.id)
      .then(response=>{
        this.elements=response.data.result.entree
      })
    }catch(error){
      console.log(error)
    }
    this.showOverlay=false
  },
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'custo-bg_detail_-table_element'
        if (item.isOdd) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
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
    async getDetailsEntreeParc() {
      this.showOverlay = true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      await this.$operationParc.get('entrees-parc/' +this.$route.params.id, {params}).then(response =>{
        this.entreeParc= response.data.result.items
        this.total=response.data.result.totalItems
        this.currentPage=response.data.result.currentPage +1
      } )

      

      if(this.entreeParc.dateoper!=null&&this.entreeParc.dateoper!=''){
        this.entreeParc.dateoper=this.entreeParc.dateoper.split('T')[0].replace(/-/g, "/")
      }
      if(this.entreeParc.heureoper!=null&&this.entreeParc.heureoper!=''){
        this.entreeParc.heureoper=this.entreeParc.heureoper.split('T')[1]
        this.entreeParc.heureoper=this.entreeParc.heureoper.split('.')[0]
      }
      this.itemsProduits=this.entreeParc.produits
      this.showOverlay = false
    },
    fermer() {this.$router.push({name: "entree_parcs"});},

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
    changePage(page) {
      this.currentPage = page;
      this.getDetailsEntreeParc();
    },
    validerEntreeParc(){
      this.showOverlay = true;
      this.$operationParc.put('entrees-parc/valider/'+this.entreeParc.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsEntreeParc();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
    },
    soumettreEntreeParc(){
      this.showOverlay = true;
      this.$operationParc.put('entrees-parc/soumettre/'+this.entreeParc.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsEntreeParc();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
    },
 
    async errorHappened(error) {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur survenue',
          message: error.message,
          okButton: 'Quitter',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
          this.$emit('closeForm')
      } else {
          this.$refs.errorDialogue._close();
          this.resetForm()
      }
    },
  
 },
 watch:{
  elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
 },
 
  beforeMount() {
    // this.getDetailsEntreeParc();
    this.getDetailsStocks()
  }
  }

</script>
<style scoped>

.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}






/*edti style par defaut btn-bootstrap au disable*/

</style>
<style>
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  .bgGreen{
    background-color:#82C138;
  }
  .bgWhite{
    background-color:#fff;
  }
  .nav-tabs .nav-link.active {
  background-color: rgb(0, 82, 44)!important;
  font-weight: bold;
  color: white !important;
  border-color:  rgb(0, 82, 44)!important;
}
.nav-tabs .nav-link {
  color: grey;
}

</style>