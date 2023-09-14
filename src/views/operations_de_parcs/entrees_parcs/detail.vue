<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
              <b-row>
                <b-col><h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button><span class="ml-1 font-weight-bold">Consultation Entrée de parc n°{{ entreeParc.idoperation }}</span></h4>
                    
                  </b-col>
                <b-col class="col-md-auto">
                  <span v-if="!isMinfof">
                    <span v-if="entreeParc.statut=='Brouillon'" class="d-flex justify-content-between">
                    <b-button v-if="isToValidate" @click.prevent="validerEntreeparc" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Valider</b-button>
                  </span>
                  <span v-else-if="entreeParc.statut=='Validée'" class="d-flex justify-content-between">
                    <a  @click.prevent="soumettreEntreeparc" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Soumettre</a>
                  </span>
                  </span>
                  <span>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                  </span>
                </b-col>
              </b-row>
            </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="3">
            <P> site: <strong>{{ entreeParc.site }}</strong>
             <b-badge pill variant="secondary">{{ entreeParc.libelletypesite }}</b-badge> 
            </P>
          </b-col>
          <b-col cols="3">
            <P> Date opération: <strong>{{entreeParc.dateoper}}</strong> </P>
          </b-col>
          <b-col cols="3">
            <p> Heure: <strong>{{entreeParc.heureoper}}</strong> </p>
          </b-col>
          <b-col cols="3">
            <p> Statut: 
              <b-badge v-if="entreeParc.statut=='Brouillon'" pill variant="danger">{{ entreeParc.statut }}</b-badge>
              <b-badge v-else-if="entreeParc.statut=='Validée'" pill variant="secondary">{{ entreeParc.statut }}</b-badge>
              <b-badge v-else-if="entreeParc.statut=='Soumise'" pill variant="success">{{ entreeParc.statut }}</b-badge>
            </p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="3">
            <P> Type de produits: 
             <b-badge v-if="entreeParc.typeproduit=='GR'" pill variant="secondary">Grumes</b-badge> 
             <b-badge v-if="entreeParc.typeproduit=='CL'" pill variant="secondary">Colis</b-badge> 
            </P>
          </b-col>
        </b-row>
      </b-card>

    </div>
      <!--entete des tableaux -->
      <div class="m-0 px-2 table-header-border">
        <b-row>
          <b-col class="d-flex"><h4 class="tab-header-left-text mb-0"> Liste des Produits </h4>
            <h4>
              <b-button @click.prevent="exportData" variant="none">
                <b-spinner v-if="exporting" small class="mx-2"></b-spinner>
                <span v-else>exporter les produits</span>
              </b-button>
            </h4>
        </b-col>
        <b-col class="d-flex">
          <h3  class="mx-2"><b-badge variant>{{ entreeParc.pieceNombreTotal }}
            <span v-if="entreeParc.typeproduit=='GR'">grume<span v-if="entreeParc.pieceNombreTotal>1">s</span></span>
            <span v-if="entreeParc.typeproduit=='CL'">Débités</span>
            </b-badge>
          </h3> 
          <h3  class="mx-2"><b-badge><b>{{ entreeParc.volumeTotal  }} m <sup>3</sup></b></b-badge></h3> 
        </b-col>
        </b-row>
      </div>
      <!--implémentation tableau proprement dite-->
      <div class="ml-1" style="width:95%" >
        <b-table v-if="entreeParc.typeproduit=='GR'" sticky-header="500px"  :busy="isBusy" hover select-mode="single" ref="selectableGrumes" responsive="sm" :items="itemsProduits"  :fields="fieldsGrumes" selectable :tbody-tr-class="rowClass" >
            <template v-slot:head(validite)><span class="d-flex justify-content-around" style="color:green"><span class="mt-1 d-flex justify-content-between align-content-between">Validité</span><custom-select :setWidth="selectWidht" :options="options" :default="'valide'" class="select" /> </span></template>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(numdf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(dpb)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(dgb)="data"><span v-html="data.field.label" style="color:green"></span></template>
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
                <template #cell(validite)>
                  <span style="display: flex;justify-content: center;align-items: center;" ><b-form-checkbox  checked="true" disabled></b-form-checkbox></span>
                </template> 
                <template #cell(codebarre)="data">
                  <input type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                </template> 
                <template #cell(sequence)="data">
                  <input type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template> 
                <template #cell(numdf10)="data">
                  <input type="text" v-model="data.item.numdf10" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template> 
                <template #cell(essence)="data">
                  <input type="text" v-model="data.item.essence" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(dpb)="data">
                  <input type="text" v-model="data.item.dpb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(dgb)="data">
                  <input type="text" v-model="data.item.dgb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(longueur)="data">
                  <input type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>
                <template #cell(volume)="data">
                  <input type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template>   
        </b-table>
        <div v-else-if="entreeParc.typeproduit=='CL'">
            <b-overlay class="m-2 px-2" rounded="sm" :show="showOverlayCodeData">
              <div>
                <b-table :items="itemsdebites"  :fields="fieldsDebites" class="mt-1" outlined   ref="selectableDebites" select-mode="single" selectable  :tbody-tr-class="rowClass" @row-selected="onRowSelectedDebites">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(sequence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(numdf10)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(essence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(longueur)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(largeur)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(epaisseur)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(nombrePieces)="data">
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
                  <template #cell(sequence)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                  </template>
                  <template #cell(numdf10)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
                  </template>
                  <template #cell(essence)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.essence" />
                  </template>
                  <template #cell(longueur)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                  </template>
                  <template #cell(largeur)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.largeur" />
                  </template>
                  <template #cell(epaisseur)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.epaisseur" />
                  </template>
                  <template #cell(nombrePieces)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nombrePieces" />
                  </template>
                  <template #cell(volume)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                  </template>
                
                </b-table>
                <div class="px-2 table-header-border mt-5">
                  <b-row>
                      <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Détail des débités</h4></b-col>
                  </b-row>
                </div>
                <b-table sticky-header="250px" :busy="isBusyDetailsDebites" hover select-mode="single" responsive="sm" :items="itemsDetailsDebites"  :fields="fieldsDetailsDebites" :tbody-tr-class="rowClass" ref="selectableTableDetailsDebites" selectable  show-empty>
                  <template v-slot:head(codebarre)="data"><span v-html="data.field.label"  style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(nombrepiece)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(superficie)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                  <template v-slot:head(volume)><span style="color:green; font-size:0.8rem">volumeu(m<sup>3</sup>)</span></template>
         
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                      <template #empty>
                        <h4 style="color:green" class="text-center">Aucun détail trouvé !!</h4>
                      </template>
                     
                      <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      <template #cell(codebarre)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white" placeholder="" v-model="data.item.codebarre" />
                      </template> 
                      <template #cell(epaisseur)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.epaisseur" />
                      </template> 
                      <template #cell(largeur)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.largeur" />
                      </template>
                      <template #cell(longueur)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.longueur" />
                      </template> 
                      <template #cell(nombrepiece)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.nombrepiece" />
                      </template>
                      <template #cell(poids)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.poids" />
                      </template>
                      <template #cell(superficie)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.superficie" />
                      </template>
                      <template #cell(volume)="data">
                       <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.volume" />
                      </template>      
                      
               </b-table>
              </div>
            </b-overlay>
        </div>
      </div>
            <!--AJOUT DE LA PAGINATION -->
            <!--<paginator
              hr="top"
              :offset="offset"
              :total="total"
              :limit="perPage"
              :page="currentPage"
              @pageChanged="changePage"
              @limitChanged="(limit) => { perPage = limit;}"
            />-->
        <error-dialogue ref="errorDialogue"></error-dialogue>
        <infos-box ref="infosDialogue"></infos-box>
        <operation-parc-box @echecopeparc="displayError" @succesopeparc="reloadPage" ref="opeparcDialogue"></operation-parc-box>

    </b-overlay>
  </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TabHead from '@/components/TabHead.vue'
  import ErrorDialogue from '@/components/utils/AlertBox.vue';
  import Vue from 'vue'
  import excel from 'vue-excel-export'
  import OperationParcBox from '@/components/utils/operation_de_parc/ConfirmBoxDetail.vue';
  import InfosBox from '@/components/utils/ErrorBox.vue';
  import { mapGetters } from "vuex";
  import Papa from "papaparse";
  Vue.use(excel)
export default {
  name: "details_entree_parc",
  data: () => ({
    exporting:false,

    json_data: [],
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlayCodeData:false,
    isBusyDetailsDebites:false,
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    entreeParc:{},
    selectWidht:"w-50",
     fieldsGrumes: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "Code à barres" },
        { key: "sequence", label: "Reférence" }, 
        { key: "numdf10", label: "Ligne DF 10" },
        { key: "dpb", label: "Diam. petit bout(cm)" },
        { key: "dgb", label: "Diam. gros bout(cm)" },
        { key: "longueur", label: "Longueur(m)" },
        { key: "volume", label: "Volume" }
     ],
     fieldsDebites: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "Code à barres" },
        { key: "sequence", label: "Reférence" }, 
        { key: "numdf10", label: "Ligne DF 10" },
        { key: "essence", label: "Nom commercial" },
        { key: "longueur", label: "Longueur(m)" },
        { key: "largeur", label: "Largeur(cm)" },
        { key: "epaisseur", label: "Epaisseur(m)" },
        { key: "nombrePieces", label: "Nbre de pièces" },
        { key: "volume", label: "Volume" },
     ],
      elementsProduits:[],
      elementsdebites:[],
      fieldsDetailsDebites:[
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre", thStyle: { width: "10%" }},
        { key: "epaisseur", label: "epaisseur de la pièce" },
        {key:"longueur", label:"Longueur de la pièce"},
        { key: "largeur", label: "Largeur de la pièce" },
        { key: "nombrepiece", label: "Nbre de pièces", thStyle: { width: "15%" } }, 
        { key: "poids", label: "Poids", thStyle: { width: "12%" } },
        { key: "volume", label: "Volume (m3)", thStyle: { width: "9%" }  },
        { key: "superficie", label: "Superficie", thStyle: { width: "12%"} },  
      ],
      elementsdetailsdebites:[],
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
    ErrorDialogue,
    OperationParcBox,
    InfosBox
  },
  watch:{
    elementsProduits(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableGrumes'].selectRow(0) }, 200);
      }
    },
    elementsdebites(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableDebites'].selectRow(0) }, 200);
      }
    },
    elementsdetailsdebites(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTableDetailsDebites'].selectRow(0) }, 200);
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
    isToValidate(){
      if(!php.empty(this.entreeParc)&&this.entreeParc.statut=='Brouillon'){
        return true;
      }
      return false; 
    },
    itemsProduits(){
      return this.elementsProduits.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdebites(){
      return this.elementsdebites.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsDetailsDebites(){
      return this.elementsdetailsdebites.map((a, index) => {
        a.largeur = a.largeur!=null? a.largeur:0
        a.longueur = a.longueur!=null? a.longueur:0
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    items() { 
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
  exportData(){
    this.exporting =true;
    let data =[]
    if(this.entreeParc.typeproduit=='GR'){
      data=this.json_data.map(({ codebarre, sequence, numdf10, essence, dpb, dgb, longueur, volume}) => ({
              codebarre, 
              sequence, 
              numdf10, 
              essence,
              essence, 
              dpb,
              dgb,
              longueur,
              volume
            }))
    }else if(this.entreeParc.typeproduit=='CL'){
      data=this.json_data.map(({ codebarre, sequence, numdf10, essence, longueur, largeur,epaisseur,nombrePieces, volume}) => ({
              codebarre, 
              sequence, 
              numdf10, 
              essence,
              essence, 
              longueur,
              largeur,
              epaisseur,
              nombrePieces,
              volume
            }))
    }
   try {
    var blob = new Blob([Papa.unparse(data)], { type: 'text/csv;charset=utf-8;' });
      var link = document.createElement("a");

      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", 'produits.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(()=>{
        this.exporting =false;
      }, 2000)

   } catch (error) {
    alert('oops error happenned !')
    this.exporting =false;
    
   }
  },
  async displayError(error){
    this.$refs.opeparcDialogue._close();
    const ok = await this.$refs.errorDialogue.show({
          title: 'Information',
          message: error,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorDialogue._close();
        } else {
          this.$refs.errorDialogue._close();
        }
  },
  reloadPage(){
    this.$refs.opeparcDialogue._close();
    this.getDetailsEntreeParc()
  },
  soumettreEntreeparc(){
      this.alertBeforeact('1')
  },
  validerEntreeparc(){
    this.alertBeforeact('2')
  },
  async alertBeforeact(commande){
    let title, message=''
    if(commande=='1'){
      title='Soumission'
      message='ètes-vous sur de vouloir soumettre cette opération ?'
    }
    else if(commande=='2'){
      title='rejet'
      message='ètes-vous sur de vouloir valider cette opération ?'

    }
    const ok = await this.$refs.opeparcDialogue.show({
              commande:commande,
              title: commande==1?'Soumission':'Validation',
              origine:'ent',
              message:message,
              idoperation:this.entreeParc.idoperation, 
              okButton: 'Oui',
              cancelButton: "Non",
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
            
            this.$refs.opeparcDialogue._close();
          } else {
              this.$refs.opeparcDialogue._close();
          }
  },
  rowClass(item, type) {
    if (item != "" && item != null) {
      if (item.isEven) return "table-row-other";
      if (!item || type !== "row") return "table-info";
    } else {
      return;
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
      console.log('ep',this.entreeParc);
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
    if(this.entreeParc.typeproduit=='GR'){
      this.elementsProduits=this.entreeParc.produits
      this.json_data=this.elementsProduits;
    }
    else if(this.entreeParc.typeproduit=='CL'){
      if(!php.empty(this.entreeParc.produits)){
        this.elementsdebites=this.entreeParc.produits
        this.elementsdebites= 
        this.json_data=this.elementsdebites;
        this.elementsdetailsdebites =this.entreeParc.produits[0].details
      }
    }
    this.showOverlay = false
  },
  calculateSum(array, property) {
    const total = array.reduce((accumulator, object) => {
      return accumulator + object[property];
    }, 0);

    return total;
  },
    onRowSelectedDebites(items){
      this.elementsdetailsdebites =items[0].details
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
 
  beforeMount() {
    this.getDetailsEntreeParc();
  }
  }

</script>
<style scoped>
.simple-btn{
  color: rgb(130, 193, 56)!important;
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
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

</style>