<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span
                class="ml-1 font-weight-bold"
              >Consultation Régularisation n°  {{ regularisation.idoperation }}</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
                  <span v-if="!isMinfof">
                    <span v-if="regularisation.statut=='Brouillon'" class="d-flex justify-content-between">
                    <b-button v-if="isToValidate" @click.prevent="validerRegularisation" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Valider</b-button>
                  </span>
                  <span v-else-if="regularisation.statut=='Validée'" class="d-flex justify-content-between">
                    <a  @click.prevent="soumettreRegularisation" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Soumettre</a>
                  </span>
                  </span>
                  <span>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                  </span>
                </b-col>
        </b-row> 
        <!--<tab-head
          :fermer="fermer"
          :idElement="regularisation.idoperation"
          title="Consultation Régularisation n°"
          :toggleSideBar="toggleSideBar"
        >
        </tab-head>-->
      </div>
          <b-card class="b-card">
            <b-row>
              <b-col cols="3">
                <P> site: <strong>{{ regularisation.site }}</strong>
                <b-badge pill variant="secondary">{{ regularisation.libelletypesite }}</b-badge> 
                </P>
              </b-col>
              <b-col cols="3">
                <P> Date opération: <strong>{{regularisation.dateoper}}</strong> </P>
              </b-col>
              <b-col cols="3" v-if="regularisation&&regularisation.heureoper!=null">
                <p> Heure: <strong>{{regularisation.heureoper}}</strong> </p>
              </b-col>
              <b-col cols="3">
                <p> Statut: 
                  <b-badge v-if="regularisation.statut=='Brouillon'" pill variant="danger">{{ regularisation.statut }}</b-badge>
                  <b-badge v-else-if="regularisation.statut=='Validée'" pill variant="secondary">{{ regularisation.statut }}</b-badge>
                  <b-badge v-else-if="regularisation.statut=='Soumise'" pill variant="success">{{ regularisation.statut }}</b-badge>
                </p>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <P> N° du certificat: <strong>{{ regularisation.numcertificatstock }}</strong>
                </P>
              </b-col>
              <b-col cols="3">
                <P> Date du certificat: <strong>{{regularisation.datecertificatstock}}</strong> </P>
              </b-col>
              <b-col cols="3" v-if="regularisation&&regularisation.documentcertificat!=null">
                <p> Fichier: 
                  <a class="mx-1 detail-permis-item" v-if="regularisation!=null&&regularisation.documentcertificat!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="regularisation.documentcertificat"><b-img src="@/assets/images/Attach_128x128.png"></b-img>certificat de stock</a>
                 </p>
              </b-col>
              <b-col cols="3">
                <P> Type de produit: 
                <b-badge v-if="regularisation.typeproduit=='GR'" pill variant="secondary">Grumes</b-badge> 
                <b-badge v-if="regularisation.typeproduit=='CL'" pill variant="secondary">Colis</b-badge> 
                </P>
              </b-col>
            </b-row>
          </b-card>
          </div>
          <!--entete des tableaux -->
          
          <div class="m-0 px-2 table-header-border">
           
            <b-row>
              <b-col><h4 class="tab-header-left-text mb-0"> Liste des produits de type </h4>
               
                </b-col>
                <b-col class="d-flex">
                  <h3  class="mx-2"><b-badge variant>{{ nombrePieces }} produits</b-badge>
                  </h3> 
                  <h3  class="mx-2"><b-badge><b>{{ volumeTotal  }} m <sup>3</sup></b></b-badge></h3> 
                </b-col>
            </b-row>
          </div>
                <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:90%">
            <div m-0 px-2 table-header-border>
              <div class="ml-1" style="width:95%" >
        <b-table v-if="regularisation.typeproduit=='GR'" sticky-header="500px"  :busy="isBusy" hover select-mode="single" ref="selectableGrumes" responsive="sm" :items="itemsGrumes"  :fields="fieldsGrumes" selectable :tbody-tr-class="rowClass" >
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(reference)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(lignedf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(diametrepb)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(diametregb)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(longueur)="data"><span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data">
              <span class="d-flex justify-content-center align-items-center">
                <span v-html="data.field.label" style="color:green"></span><span style="color:green">(m<sup>3</sup>)</span>
              </span>
            </template>

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
                <template #cell(diametrepb)="data">
                  <input type="text" v-model="data.item.diametrepb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(diametregb)="data">
                  <input type="text" v-model="data.item.diametregb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(longueur)="data">
                  <input type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(volume)="data">
                  <input type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>   
        </b-table>
        <div v-else-if="regularisation.typeproduit=='CL'">
            <b-overlay class="m-2 px-2" rounded="sm" :show="showOverlayTable">
              <div>
                <b-table :items="itemsdebites"  :fields="fieldsDebites" class="mt-1" outlined   ref="selectableDebites" select-mode="single" selectable  :tbody-tr-class="rowClass">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(reference)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(lignedf10)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(nomcommercial)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(longueurPiece)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(largeurPiece)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(epaisseurPiece)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(nombresPiece)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(volume)="data">
                    <span class="d-flex justify-content-center align-items-center">
                      <span v-html="data.field.label" style="color:green"></span><span style="color:green">(m<sup>3</sup>)</span>
                    </span>
                  </template>
             
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  
                  <template #cell(codebarre)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                  </template>
                  <template #cell(reference)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.reference" />
                  </template>
                  <template #cell(lignedf10)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.lignedf10" />
                  </template>
                  <template #cell(nomcommercial)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nomcommercial" />
                  </template>
                  <template #cell(longueurPiece)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueurPiece" />
                  </template>
                  <template #cell(largeurPiece)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.largeurPiece" />
                  </template>
                  <template #cell(epaisseurPiece)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.epaisseurPiece" />
                  </template>
                  <template #cell(nombresPiece)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nombresPiece" />
                  </template>
                  <template #cell(volume)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                  </template>
                
                </b-table>
           
             
              </div>
            </b-overlay>
        </div>
      </div>
              <!--<b-table sticky-header="400px"  :busy="isBusy" hover select-mode="single" responsive="sm" :items="items"  :fields="fieldsProduits" :tbody-tr-class="rowClass" >
 
                  <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                  <template v-slot:head(reference)="data"><span v-html="data.field.label" style="color:green"></span></template>
                  <template v-slot:head(lignedf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
                  <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>

                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                      <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
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
              </b-table>-->

              <!--AJOUT DE LA PAGINATION -->
              <paginator 
                hr="top" 
                :offset="offset" :total="total" :limit="perPage" 
                :page="currentPage" @pageChanged="changePage" 
                @limitChanged="(limit) => {perPage = limit}" 
              />
            </div>
          </div>
      </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TabHead from '@/components/TabHead.vue'
  import { mapGetters } from "vuex";
export default {
  name: "details_regularisation",
  components:{
    TabHead
  },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    showOverlayTable:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isBusyBillons:false,
    isRowselected:false,
    setSelected:0,
    urlSet:false,
    regularisation:{},
    fieldsGrumes: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "Code à barres" },
        { key: "reference", label: "Reférence" }, 
        { key: "lignedf10", label: "Ligne DF 10" },
        { key: "nomcommercial", label: "essence" },
        { key: "diametrepb", label: "Diam. pb(cm)" },
        { key: "diametregb", label: "Diam. gb(cm)" },
        { key: "longueur", label: "Longueur(m)" },
        { key: "volume", label: "Volume" },
    ],
    elementsProduits:[],
    elementsGrumes:[],
    elementsDebites:[],
    fieldsDebites: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "Code à barres" },
        { key: "reference", label: "Reférence" }, 
        { key: "lignedf10", label: "Ligne DF 10" },
        { key: "nomcommercial", label: "essence" },
        { key: "longueurPiece", label: "Longueur(m)" },
        { key: "largeurPiece", label: "Largeur(cm)" },
        { key: "epaisseurPiece", label: "Epaisseur(cm)" },
        { key: "nombresPiece", label: "Nbre de pièces" },
        { key: "volume", label: "Volume" },
    ],
    nombrePieces:'',
    volumeTotal:'',
    perPage: 10,
    currentPage: 1,
    total: 0,
    offsetSites: 0,
    limitSites: 10,
    perPageSite: 7,
    currentPageSite: 1,
    sites:[],
    searchSite:"",
  }),
  watch:{
    elementsGrumes(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableGrumes'].selectRow(0) }, 200);
      }
    },
    elementsDebites(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableDebites'].selectRow(0) }, 200);
      }
    },

  },
  computed:{
    ...mapGetters(['user','hasAccess']), 
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    itemsGrumes(){
      return this.elementsProduits.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdebites(){
      return this.elementsProduits.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
     filtered() {
      return this.sites.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase())
      )
    },

    hasNextPage() {
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filtered.slice(nextOffset, this.limitSites + nextOffset).length
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
    items.isSelected =true;
        this.selected = items
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
  async getDetailsRegularisation() {
    this.showOverlay = true
    const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    await this.$operationParc.get('regulations/' +this.$route.params.id, {params}).then(response =>{
      this.regularisation =  response.data.result.items
      console.log('régulartisation',response.data.result);
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage+1
      this.nombrePieces = response.data.result.nombrePieces
      this.volumeTotal = response.data.result.volumeTotal!=null?response.data.result.volumeTotal.toFixed(3):''
    })
      
    if(this.regularisation.dateoper!=null&&this.regularisation.dateoper!=''){
      this.regularisation.dateoper=this.regularisation.dateoper.split('T')[0].replace(/-/g, "/")
    }
    if(this.regularisation.datecertificatstock!=null&&this.regularisation.datecertificatstock!=''){
      this.regularisation.datecertificatstock=this.regularisation.datecertificatstock.split('T')[0].replace(/-/g, "/")
    }
    if(this.regularisation.heureoper!=null&&this.regularisation.heureoper!=''){
      this.regularisation.heureoper=this.regularisation.heureoper.split('T')[1]
       this.regularisation.heureoper=this.regularisation.heureoper.split('.')[0]
    }
    this.elementsProduits=this.regularisation.produits
    if(this.regularisation.typeproduit=="GR"){
      this.elementsGrumes = this.elementsProduits
    }else if(this.regularisation.typeproduit=="CL"){
      this.elementsDebites = this.elementsProduits
    }
    this.showOverlay = false
  },
  validerRegularisation(){
      this.showOverlay = true;
      this.$operationParc.put('regulations/valider/'+this.regularisation.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsRegularisation();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
    },
    soumettreRegularisation(){
      this.showOverlay = true;
      this.$operationParc.put('regulations/soumettrereg/'+this.regularisation.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsRegularisation();
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
    fermer() {this.$router.push({name: "regularisations"});},
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
      this.getDetailsRegularisation();
    },

 },
 
  beforeMount() {
    this.getDetailsRegularisation();
  }
  }

</script>
<style scoped>

.detail-permis-item {
  color: #175131!important;
}

.detail-permis-item:hover{
  text-decoration: underline;
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
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

  .detail-billonnage-bg{
    background-color: green;
  } 
  .table-row-other{
  background-color: #caf09e;
}  
</style>