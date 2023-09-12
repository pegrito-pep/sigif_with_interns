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
                <span class="ml-1 font-weight-bold">Détails Billonnage Colis N°{{billonnage.idoperation}}</span>
              </h4>
            </b-col>
            <b-col class="col-md-auto">
              <span>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer">
                  <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                </a>
              </span>
            </b-col>
          </b-row>
        </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="3">
            <P> site: <strong>{{ billonnage.intitulesite }}</strong>
             <b-badge pill variant="secondary">{{ billonnage.libelletypsiteoper }}</b-badge> 
            </P>
          </b-col>
          <b-col cols="3">
            <P> Date opération: <strong>{{ $dayjs(billonnage.dateoper).format('DD/MM/YYYY') }}</strong> </P>
          </b-col>
          <b-col cols="3" v-if="billonnage!=null&&billonnage.heureoper!=null">
            <p> Heure: <strong>{{ $dayjs(this.billonnage.heureoper).format('HH:MM') }}</strong> </p>
          </b-col>
          <b-col cols="3">
            <p> Statut: 
              <b-badge v-if="billonnage.statut=='Brouillon'" pill variant="danger">{{ billonnage.statut }}</b-badge>
              <b-badge v-else-if="billonnage.statut=='Validée'" pill variant="secondary">{{ billonnage.statut }}</b-badge>
              <b-badge v-else-if="billonnage.statut=='Soumise'" pill variant="success">{{ billonnage.statut }}</b-badge>
            </p>
          </b-col>
        </b-row>
      </b-card>
      <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col class="d-flex"><h4 class="tab-header-left-text mb-0"> Liste des Colis </h4>
              <h4 class="mx-2">Nombre Total : <b>{{ billonnage.nbGrumes }}</b></h4>
              <h4 class="mx-2">Volume Total : <b>{{ billonnage.volGrumes  }} m <sup>3</sup></b></h4>
              <b-button v-if="billonnage.statut=='Brouillon'" @click.prevent="validerBillonnage" size="sm"
                class="mx-1 simple-btn not-change-image-opacity" >
                <b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>
                valider
              </b-button>
              <b-button  v-if="billonnage.statut=='Validée'" @click.prevent="soumettreBillonnage"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
                <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
                soumettre
              </b-button>
            </b-col>
            <b-col class="col-md-auto">
              <h4>
                <b-badge pill variant="success">{{ volumeEntree }}  m <sup>3</sup> en entré</b-badge> / 
                <b-badge pill variant="success">{{ volumeSortie }}  m <sup>3</sup> produit</b-badge>
                <span>-</span>
                <b-badge pill variant="success">{{ colisEntrees }} colis en entrée</b-badge> / 
                <b-badge pill variant="success">{{ colisSorties }} en sortie</b-badge>
              </h4>
            </b-col>
          </b-row>
        </div>
      <!--PARTIE DES TABLEAUX-->
      <!--DEBUT COLIS MERE + PIECES-->
      <div class="d-flex justify-content-between">
        <div style="width: 47%;">
          <div class="m-4 px-2 table-header-border mt-5">
            <b-row>
                <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des colis mères</h4></b-col>
            </b-row>
          </div>
          <b-overlay :show="showOverlay" rounded="sm">
            <b-table height="50px" :items="itemscolismere"  :fields="fieldscolismere" :busy="isBusy" class="ml-4 px-2 mt-1 selectableTablecolismere" outlined   ref="selectableTablecolismere" select-mode="single" selectable @row-selected="onRowSelectedColismere" :tbody-tr-class="rowClass">
              <template v-slot:head(codebarre)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(sequence)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(numDf10)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(nomusuel)="data">
                <span v-html="data.field.label" class="" style="color:green"></span>
              </template>
              <template v-slot:head(volume)="data">
                <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
              </template>
              <template v-slot:head(superficie)="data">
                <span v-html="data.field.label" class="" style="color:green"></span>
              </template>
              <template v-slot:head(poids)="data">
                <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
              </template>
          
              
              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              
              <template #cell(codebarre)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
              </template>
              <template #cell(sequence)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
              </template>
              <template #cell(numDf10)="data">
                <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.numDf10" />
              </template>
              <template #cell(nomusuel)="data">
                <input disabled size="xs" class="w-90 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.nomusuel" />
              </template>
              <template #cell(volume)="data">
                <div class="d-flex justify-content-center align-items-center">
                    <input disabled size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black!important" v-model="data.item.volume" />
                </div>
              </template>
              <template #cell(superficie)="data">
                <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.superficie" />
              </template>
              <template #cell(poids)="data">
                <div class="d-flex justify-content-center align-items-center">
                    <input disabled size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black!important" v-model="data.item.poids" />
                </div>
              </template>
              <template #cell(action)="data">
                <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldColismere(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
              </template>
            
            </b-table>
          </b-overlay>
        </div>
        <div class="w-50">
          <div class="m-4 px-2 table-header-border mt-5">
            <b-row>
                <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Pièces associées</h4></b-col>
            </b-row>
          </div>
          <b-table sticky-header  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablePiecesColismere" selectable @row-selected="onRowSelectedPieceassocieecolismere"
            :items="itemspiecesassocieescolismerepagines" 
            :fields="fieldspieces" 
            :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(nombrepiece)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(superficie)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(longueur)="data">
              <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(largeur)="data">
              <input disabled type="text" v-model="data.item.largeur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(epaisseur)="data">
              <input disabled type="text" v-model="data.item.epaisseur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(nombrepiece)="data">
              <input disabled type="text" v-model="data.item.nombrepiece" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(superficie)="data">
              <input disabled type="text" v-model="data.item.superficie" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(poids)="data">
              <input disabled type="text" v-model="data.item.poids" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <!--AJOUT PAGINATION AUX PIECES DU COLIS FILLE-->
          </b-table>
          <paginator
              hr="top"
              :offset="offsetPiecesColisMere"
              :total="elementspiecesassocieescolismere.length || 0"
              :limit="perPagePiecesassociescolismere"
              :page="currentPagePiecesassociescolismere"
              @pageChanged="(page) => {currentPagePiecesassociescolismere = page}"
              @limitChanged="(limit) => {perPagePiecesassociescolismere = limit}"
              v-show="itemspiecesassocieescolismere.length > 10"
          />
        </div>
      </div>
      <!--FIN COLIS MERE + PIECES-->
       <!--DEBUT COLIS FILLE + PIECES-->
       <div class="d-flex justify-content-between">
        <div style="width: 47%;">
          <div class="m-4 px-2 table-header-border mt-5">
            <b-row>
              <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des colis produits</h4></b-col>
            </b-row>
          </div>
          <b-overlay :show="showOverlay" rounded="sm">
            <b-table height="50px" :items="itemscolisfille"  :fields="fieldscolisfille" :busy="isBusy" class="ml-4 px-2 mt-1 selectableTablecolismere" outlined   ref="selectableTablecolisfille" select-mode="single" selectable @row-selected="onRowSelectedColisfille" :tbody-tr-class="rowClass">
              <template v-slot:head(codebarre)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(sequence)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(numDf10)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(nomuseul)="data">
                <span v-html="data.field.label" class="" style="color:green"></span>
              </template>
              <template v-slot:head(volume)="data">
                <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
              </template>
              <template v-slot:head(superficie)="data">
                <span v-html="data.field.label" class="" style="color:green"></span>
              </template>
              <template v-slot:head(poids)="data">
                <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
              </template>           
              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              <template #cell(codebarre)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
              </template>
              <template #cell(sequence)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
              </template>
              <template #cell(numDf10)="data">
                <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.numDf10" />
              </template>
              <template #cell(nomuseul)="data">
                <input disabled size="xs" class="w-90 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.nomuseul" />
              </template>
              <template #cell(volume)="data">
                <div class="d-flex justify-content-center align-items-center">
                    <input disabled size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black!important" v-model="data.item.volume" />
                </div>
              </template>
              <template #cell(superficie)="data">
                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.superficie" />
              </template>
              <template #cell(poids)="data">
                <div class="d-flex justify-content-center align-items-center">
                    <input disabled size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black!important" v-model="data.item.poids" />
                </div>
              </template>
              <template #cell(action)="data">
                <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldColismere(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
              </template>
            </b-table>
          </b-overlay>
        </div>
        <div class="w-50">
          <div class="m-4 px-2 table-header-border mt-5">
            <b-row>
                <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Pièces associées</h4></b-col>
            </b-row>
          </div>
          <b-table sticky-header  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablePiecesColismere" selectable 
            :items="itemspiecesassocieescolispagines" 
            :fields="fieldspieces" 
            :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(nombrepiece)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(superficie)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(longueur)="data">
              <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(largeur)="data">
              <input disabled type="text" v-model="data.item.largeur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(epaisseur)="data">
              <input disabled type="text" v-model="data.item.epaisseur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(nombrepiece)="data">
              <input disabled type="text" v-model="data.item.nombrepiece" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(superficie)="data">
              <input disabled type="text" v-model="data.item.superficie" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(poids)="data">
              <input disabled type="text" v-model="data.item.poids" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <!--AJOUT PAGINATION AUX PIECES DU COLIS FILLE-->
        </b-table>
        <paginator
            hr="top"
            :offset="offsetPiecesColisFille"
            :total="elementspiecesassocieescolisfille.length || 0"
            :limit="perPagePiecesassociescolisfille"
            :page="currentPagePiecesassociescolisfille"
            @pageChanged="(page) => {currentPagePiecesassociescolisfille = page}"
            @limitChanged="(limit) => {perPagePiecesassociescolisfille = limit}"
            v-show="itemspiecesassocieescolisfille.length > 10"
          />
        </div>
      </div>
      <!--FIN COLIS FILLE + PIECES-->
      </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TabHead from '@/components/TabHead.vue'

export default {
  name: "detail-billonnage-CL",
  components:{
    TabHead
  },
  watch:{
    elementscolismere(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablecolismere'].selectRow(0) }, 200);
      }
    },
    elementscolisfille(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablecolisfille'].selectRow(0) }, 200);
      }
    }
  },
  data: () => ({
    selectedColismere:null,
    /**Elements pagination pieces colis mere*/
    currentPagePiecesassociescolismere: 1,
    perPagePiecesassociescolismere: 10,
    currentPagePiecesassociescolisfille: 1,
    perPagePiecesassociescolisfille: 10,
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isBusyBillons:false,
    isRowselected:false,
    billonnage:{},
    selectWidht:"w-50",
    elementscolismere:[],
    fieldscolismere:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'sequence', label: 'Séquence'},
      {key : 'numDf10', label :'N°colis'},
      {key : 'nomusuel', label :'Essence',thStyle:"width:19%"},
      {key : 'volume', label :'Vol(m3)'},
      {key : 'superficie', label :'Sup'},
      {key : 'poids', label :'poids'},
    ],
    fieldspieces:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'longueur', label: 'Longueur(m)'},
      {key : 'largeur', label :'Largeur(cm)'},
      {key : 'epaisseur', label :'épaisseur(cm)'},
      {key : 'nombrepiece', label :'Nb pièces'},
      {key : 'volume', label :'volume(m3)'},
      {key : 'superficie', label :'Superficie'},
      {key : 'poids', label :'poids'}
    ],
    elementspiecesassocieescolismere:[],
    //DATA DES FILLES
    elementscolisfille:[],
    fieldscolisfille:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'sequence', label: 'Séquence'},
      {key : 'numDf10', label :'N°colis'},
      {key : 'nomuseul', label :'Essence',thStyle:"width:19%"},
      {key : 'volume', label :'Vol(m3)'},
      {key : 'superficie', label :'Sup'},
      {key : 'poids', label :'poids'},
    ],
    fieldspieces:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'longueur', label: 'Longueur(m)'},
      {key : 'largeur', label :'Largeur(cm)'},
      {key : 'epaisseur', label :'épaisseur(cm)'},
      {key : 'nombrepiece', label :'Nb pièces'},
      {key : 'volume', label :'volume(m3)'},
      {key : 'superficie', label :'Superficie'},
      {key : 'poids', label :'poids'}
    ],
    elementspiecesassocieescolisfille:[],
    volumeSortie:null,
    options:["valide"],
    positions:[{libelle:"non défini"}],
    selected:{},
    setSelected:0,
    total:0,
    currentPage:1,
    perPage:10,

  }),
  computed:{
    colisSorties(){
      if(!php.empty(this.selectedColismere)){
        return this.selectedColismere.pieceFilles[0].pieces.length
      }
      return []
    },
    colisEntrees(){
      if(!php.empty(this.selectedColismere)){
        return this.selectedColismere.piecesMere.length
      }
      return []
    },
    volumeEntree(){
      if(!php.empty(this.selectedColismere)){
        return this.selectedColismere.volume
      }
      return []
    },
    
     //COLIS MERE
     itemscolismere(){
      return this.elementscolismere.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        a.volume=a.volume!=null?a.volume.toFixed(3):''
        return a;
      });
    },
    //PIECES ASSOCIEES AUX COLIS MERE
    itemspiecesassocieescolismere(){
      if(php.empty(this.elementspiecesassocieescolismere)){
        return [];
      }
      return this.elementspiecesassocieescolismere.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    //ELEMENTS COLIS FILLE
    itemscolisfille(){
      if(php.empty(this.elementscolisfille)){
        return [];
      }
      return this.elementscolisfille.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        a.volume=a.volume!=null?a.volume.toFixed(2):''
        return a;
      });
    },
      //PIECES ASSOCIEES AUX COLIS FILLE
    itemspiecesassocieescolisfille(){
        if(php.empty(this.elementspiecesassocieescolisfille)){
          return [];
        }
        return this.elementspiecesassocieescolisfille.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          a.volume=a.volume!=null?a.volume.toFixed(2):''
          return a;
        });
    },
    offsetPiecesColisFille() {
      return this.currentPagePiecesassociescolisfille * this.perPagePiecesassociescolisfille - this.perPagePiecesassociescolisfille;
    },
    itemspiecesassocieescolispagines(){
      return php.array_slice(this.itemspiecesassocieescolisfille, this.offsetPiecesColisFille, this.perPagePiecesassociescolisfille);
    },

     //éléments pagination
      offsetPiecesColisMere() {
        return this.currentPagePiecesassociescolismere * this.perPagePiecesassociescolismere - this.perPagePiecesassociescolismere;
      },
      itemspiecesassocieescolismerepagines(){
        return php.array_slice(this.itemspiecesassocieescolismere, this.offsetPiecesColisMere, this.perPagePiecesassociescolismere);
      }
  },
 
 methods: {
  onRowSelectedColisfille(items){
    if(!php.empty(items)){
      console.log('items ',items[0].pieces);
      this.elementspiecesassocieescolisfille = items[0].pieces
    }else{
      this.elementspiecesassocieescolisfille=[];
    }
  },
  onRowSelectedColismere(items){
    if(!php.empty(items)){
      console.log('items ',items[0].pieces);
      this.selectedColismere=items[0];
      this.elementspiecesassocieescolismere = items[0].piecesMere //remplissage pièces colis mère
      this.elementscolisfille = items[0].pieceFilles //remplissage colis fille du colis mère
    }else{
      this.selectedColismere=null;
      this.elementspiecesassocieescolismere=[];
      this.elementscolisfille = [];
    }
  },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
   rowClassBillons(item, type) {
    if(item !=''&&item!=null){
       return 'table-row-other'
    }else{
      return 
    }
  },
  onRowSelected(items) {
    this.isBusyBillons = true
    items.isSelected =true;
        this.selected = items
       // this.itemsBillons=this.selected[0].billons
    setTimeout(() => {this.isBusyBillons = false }, 500)
    console.log('row selected',this.selected);
  },
  validerBillonnage(){
      this.showOverlay = true;
      try {
        this.$operationParc.put('billonages/validerbillonage/'+this.billonnage.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsBillonnage();
        })  
          } catch (error) {
            this.showOverlay = false
            return this.errorHappened(error.response.data)
          }
    },
    soumettreBillonnage(){
      try {
        this.$operationParc.put('billonages/soumettre/'+this.billonnage.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsBillonnage();
        })  
          } catch (error) {
            this.showOverlay = false
            return this.errorHappened(error.response.data)
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
    async getDetailsBillonnageCL() {
      this.showOverlay = true
      await this.$operationParc.get('billonages/colis/' +this.$route.params.id).then(response =>{
        this.billonnage=response.data
        this.volumeSortie =!php.empty(this.billonnage.colis[0])?this.billonnage.colis[0].volumeTotalFille:''
        console.log('billonnage ', this.billonnage);

      })
      this.elementscolismere=this.billonnage.colis
      this.showOverlay = false
    },
    changePage(page) {
      this.currentPage = page;
      this.getDetailsBillonnageCL();
    },
    fermer() {this.$router.push({name: "billonnages"});},

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
    onRowSelectedPieceassocieecolismere(items){
      console.log('items ',items);
    }
 },
    beforeMount() {
      this.getDetailsBillonnageCL();
    },
    mounted() {
      let sidebar = document.querySelector('#sidebar');
      if (sidebar.style.width !== '0px'){
        this.toggleSideBar();
      } 
  },
  }

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
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
input:focus {
	outline: none;
  border: 1px solid #FFFFFF;
}

.set_ligne{
  border: 2px solid red
}

.change_bg{
  background:#82C138
}
.styleToSet{
border: 2px solid red;
}
.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
}
.liens a {
  color: rgb(0, 82, 44) !important;
  font-weight: 600;
  cursor: pointer;
}
.form-control{
height: 30px !important;
}

#toggleSideBar{
margin-left: 20px;
border: none;
background-color: #fff;
}
.position_absolute{
position: absolute;
bottom: 20px;
right: 35px;
}
.b-card{
background-color: transparent !important;
}
.b-col{
margin-right: 16px;
}
.b-col .content{
display: flex;
flex-direction: column;
}


#cover {
  background-image: url('~@/assets/images/logo_sigif_trame.png');
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.collapse-close{
list-style-type: disclosure-closed;
}
.collapse-open{
list-style-type: disclosure-open;
}


/*style barre de recherche */
.search-bar-btn-group{
display: flex;
justify-content: center;
align-items: center;
}

.search-bar-btn{
border:none;
border-radius: 6px;
padding: 6px 20px;
background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
background-color: rgba(0, 82, 44, 0.89);
border:none;
}
.search-bar-btn a{
color:white
}
.search-bar-btn a:hover{
font-weight: 600;
font-style: italic;

}

.search-bar-custum-input{
background-color: #fff;
background-clip: border-box;
border: 1px solid #ced4da;
border-radius: .25rem;
}

.simple-btn{
background:none;
border:none;
color:black;
font-weight: bold;
}

.simple-btn:hover{
background:none;
border:none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
color: #6c757d;
background-color: white!important;
border-color: white!important;
}
.change-image-opacity:hover {
color: #6c757d;
background-color: rgb(0, 82, 44)!important;
border-color: white!important;
cursor: not-allowed;
}
.not-change-image-opacity:hover{
color:#82C138;
}
.change-image-opacity{
opacity: 0.15;
}
.not-change-image-opacity{
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
.form-control-xs {
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
  line-height: 1.5;
  border-radius: .2rem;
  border: 1px solid darkgreen;
  width: 100%;
  font-weight: 800;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: .25rem;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.set-obligation-indicator{
  color:red; font-size: 1.4em
}
.btn-is-disabled {
  pointer-events: none; /* Disables the button completely. Better than just cursor: default; */
  opacity: 0.7;
}
 

</style>