<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
      <div>
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
              <span class="font-weight-bold">Création Lot de production</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="sendFormLotProdduction" :disabled="disable"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
            </span>
          </b-col>
        </b-row>

        
        <!-- CREATION ligne de transformation-->
          <b-row class="m-4 d-flex justify-content-around">
            <b-col cols="5">
              <b-row class="m-2">
                <b-col cols="5">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Unité de transformation</label>
                </b-col>
                <b-col cols="6">
                  <select v-model="form.utb" @change="getLignesUtb"  class="m-0 p-0 sigif-select" :class="{ styleToSet: notSetUtb }">
                    <option v-for="unite in utbs" :key="unite.IDSITEOPER" :value="unite.IDSITEOPER"> {{ unite.INTITULE }}</option>
                  </select>
                </b-col>
              </b-row>
              <b-overlay rounded="sm" :show="showOverlayLignesUtb">
                <template #overlay>
                  <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p id="cancel-label">Chargement...</p>
                  </div>
                </template>
                <b-row class="m-2">
                  <b-col cols="5">
                    <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Ligne</label>
                  </b-col>
                  <b-col cols="6">
                    <v-select style="" :class="{set_ligne: notSetLignetransformation }" v-model="form.ligne" @input="getEntresUsinageLigneAndEssences"  :options="paginatedLignes" :filterable="false" @search="onSearchLigne" label="intitule" :reduce="ligne => ligne.idligne" class="custom-select-type_titre">
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageLignes" @click="offsetlignes -= limitlignes">Prèc.</button>
                          <button :disabled="!hasNextPageLignes" @click="offsetlignes += limitlignes">Suiv.</button>
                      </li>
                    </v-select>
                  </b-col> 
                </b-row>
              </b-overlay>
              <b-row class="m-2">
                <b-col cols="5">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red;font-weight:900">*</span>Date de production</label>
                </b-col>
                <b-col cols="6">
                  <input v-model="form.dateproduction" style="width:48%" class="sigif-input-date" :class="{ 'styleToSet': notSetDateproduction }" type="date" format="YYYY-MM-DD"/>
                </b-col>
              </b-row>
              <b-row class="m-2">
                <b-col cols="5">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red;font-weight:900">*</span>Type de produit</label>
                </b-col>
                <b-col cols="6">
                  <v-select style=""  v-model="form.typeproduit"  :options="paginatedTypesproduits" :filterable="false" label="intitule" :reduce="produit => produit.idproduit" class="custom-select-type_titre  sigif-select">
                    <li slot="list-footer" class="pagination">
                        <button :disabled="!hasPrevPageTypesproduits" @click="offsetTypesproduits -= limitTypesproduits">Prèc.</button>
                        <button :disabled="!hasNextPageTypesproduits" @click="offsetTypesproduits += limitTypesproduits">Suiv.</button>
                    </li>
                  </v-select>
                </b-col>
              </b-row>
              <b-row class="m-2">
                <b-col cols="5">
                  <p for="" class="m-0" ><span style="color: red;font-weight:900">*</span><span style="font-weight:bold"> N° du contrat</span></p>
                </b-col>
                <b-col cols="6">
                  <input size="xs" class="w-100 mx-1 px-1 form-control-xs text-left"  v-model="form.numcontrat" />
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="7">
              <!-- CREATION ligne de transformation-->
              <div style="height: 150px; overflow-y: auto; overflow-x: hidden;">
                <div class="table-header-border">
                  <b-row>
                      <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Entrée Usinage assiociée</h4></b-col>
                      <b-col>
                        <a @click.prevent="addFieldEntree" class="mx-1 simple-btn" style="cursor: pointer"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="removeAllFieldsEntree" class="mx-1 simple-btn" style="cursor: pointer"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                      </b-col>
                  </b-row>
                </div>
            
              <!--TABLEAU DES ENTREES USINAGE-->
              <div>
                <b-table  height="50px" :items="itemsentree"  :fields="fieldsEntreesUsinage" :busy="isBusy" class="ml-1 px-2 mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelectedEntree" :tbody-tr-class="rowClass">
                  <template v-slot:head(choisir)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(date)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(lot)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(ligne)="data">
                    <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                  </template>
              
                  
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  
                  <template #cell(choisir)>
                    <v-select v-model="choix" @input="loadOtherData(0, choix)"  :options="entreesLignes" :filterable="false" @search="onSearchLigne" label="idlot" class="custom-select-type_titre">
                      <template #option="{ idlot,dateoper, ligne }">
                        <span class="font-weight-bold">{{ idlot }}</span><span> - {{ dateoper }}</span>
                        <br />
                        <span>{{ ligne }}</span>
                      </template>
                    </v-select>
                  </template>
                  <template #cell(date)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.dateoper" />
                  </template>
                  <template #cell(lot)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.idlot" />
                  </template>
                  <template #cell(ligne)="data">
                    <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:80%" v-model="data.item.ligne" />
                  </template>
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex"  title="enlever" @click.prevent="RemouveFieldEntree(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                
                </b-table>
              </div>  
              </div>
            </b-col>
          </b-row>
          <div style="height: 160px; overflow-y: auto; overflow-x: hidden;">
            <div class="mx-4 px-2 table-header-border mt-2">
              <b-row>
                  <b-col cols="1"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Détail du lot</h4></b-col>
                  <b-col class="liens">
                    <a @click.prevent="handleFile"   class="mx-1 simple-btn"><b-img  src="@/assets/images/excel.png"></b-img>Importer</a>
                    <a @click.prevent="addFieldDetailLot" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                    <a @click.prevent="removeAllFieldsDetailLot"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                  </b-col>
              </b-row>
            </div>
            <!--TRAITEMENT DETAILS DU LOT-->
            <div class="w-75">
              <b-overlay :show="showOverlayCodeData" rounded="sm">
                <b-table v-model="currentItemGrume"  height="50px" :items="itemsdetailsLot"  :fields="fieldsdetailsLot" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   ref="selectableTableDetailLot" select-mode="single" selectable @row-selected="onRowSelectedDetailLot" :tbody-tr-class="rowClass">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(sequence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(numcolis)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(essence)="data">
                    <span v-html="data.field.label" class="" style="color:green"></span>
                  </template>
                  <template v-slot:head(volume)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
              
                  
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  
                  <template #cell(codebarre)="data">
                    <input size="xs" @keydown.tab.prevent="checkCodebarredetailLot($event.target.value, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.codebarre" />
                  </template>
                  <template #cell(sequence)="data">
                    <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                  </template>
                  <template #cell(numcolis)="data">
                    <input size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.numcolis" />
                  </template>
                  <template #cell(essence)="data">
                    <v-select :options="paginated" v-model="data.item.essence" :filterable="false" @search="onSearch" label="nomusuel" class="custom-vselect-style" style="color:black!important; font-weight:bold">
                      <template #option="{ nomusuel }">
                        <span class="font-weight-bold text-dark">{{ nomusuel }}</span>
                      </template>
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                          <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                      </li>
                    </v-select>
                  </template>
                  <template #cell(volume)="data">
                    <div class="d-flex justify-content-center align-items-center">
                        <input disabled size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black!important" v-model="data.item.volume" />
                    </div>
                  </template>
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldDetailLot(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                
                </b-table>
              </b-overlay>
            </div>
            


          </div>
            <!--PIECES ASSOCIEES-->
          <div style="width:98%; max-height: 350px;">
              <div class="px-2 table-header-border mt-1">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Pièces associées</h4></b-col>
                    <b-col class="liens">
                      <a @click.prevent="addFieldPiecesAssocies" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a @click.prevent="remouveAllPieces"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                    </b-col>
                </b-row>
              </div>
              <b-overlay rounded="sm" :show="showOverlayCodeDatapieces">
                <b-table height="50px" v-model="currentItemPiece" :items="itemspieces"  :fields="fieldspieces" :busy="isBusy" class="mt-1" outlined   ref="selectableTablepieces" select-mode="single" selectable @row-selected="onRowSelectedPieces"  :tbody-tr-class="rowClass">
                <template v-slot:head(codebarre)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(longueur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(largeur)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(epaisseur)="data">
                  <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                </template>
                <template v-slot:head(nombrepiece)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(volume)="data">
                  <span v-html="data.field.label" style="color:green"  class="d-flex justify-content-center align-items-center"></span>
                </template>
                <template v-slot:head(superficie)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
                <template v-slot:head(poids)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
                

                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
                <template #cell(codebarre)="data">
                  <div class="d-fle justify-content-between">
                    <input disabled size="xs"  class="mx-1 w-75 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.codebarre" />
                  </div>
                </template>
                <template #cell(longueur)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.longueur" />
                </template>
                <template #cell(largeur)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.largeur" />
                </template>
                <template #cell(epaisseur)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.epaisseur" />
                </template>
                <template #cell(nombrepiece)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.nombrepiece" />
                </template>
                <template  #cell(poids)="data">
                  <input  size="xs"  @keydown.tab.prevent="calculateVolandSup"  class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.poids" />
                </template>
                <template #cell(volume)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.volume" />
                </template>
                <template #cell(superficie)="data">
                  <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left" style="color:black!important" v-model="data.item.superficie" />
                </template>
                
                <template #cell(action)="data">
                  <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldPieces(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                </template>
                <template #custom-foot>
                  <b-tr class="py-2" style="border-top:2px solid #82C138;border-bottom:2px solid #82C138">
                    <b-td></b-td><b-td></b-td><b-td></b-td><b-td></b-td><b-td></b-td><b-td></b-td>
                  
                    <b-td class=" font-weight-bold d-flex justify-content-center align-items-center" style="color: #82C138"><h5>{{ poidstotal }}</h5></b-td>
                    <b-td class="text-center font-weight-bold" style="color: #82C138"><h5>{{ volumetotal }}</h5></b-td>
                    <b-td class="text-center font-weight-bold" style="color: #82C138"><h5>{{ superficietotale  }}</h5></b-td>
                   </b-tr>
                </template>
              </b-table>
            </b-overlay>
          </div>
      </div>
      <ChangeProductBox ref="changeProduct"></ChangeProductBox>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      <error-dialogue ref="errorbox"></error-dialogue>
      <api-unreachable ref="apiunreacahble"></api-unreachable>
      <LotProductionFileComponent ref="filecomponent"></LotProductionFileComponent>
    </b-overlay>
  </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';
import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ApiUnreachable from '@/components/utils/ApiUnreachable.vue';
import LotProductionFileComponent from '@/components/utils/transformation/ImportLotProductionFIle.vue';

import { mapGetters } from 'vuex'
export default {
  name:"production-form",
  components:{ LotProductionFileComponent,ErrorDialogue,NoActionPossibleDialogue, ChangeProductBox, CodeBarreInfo, ApiUnreachable},
   computed: {
    ...mapGetters(['lignes']),
    
    //donées liées aux pièces asociées
    itemspieces(){
      return this.filteredFieldsPieces.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },

	  filteredFieldsPieces(){
      if (!this.elementsdetailsLot[this.indexRowSelectedDetail]  || !this.elementsdetailsLot[this.indexRowSelectedDetail].codebarre) {
        return []
      }
      return this.elementspieces.filter( field =>field.codebarre==this.elementsdetailsLot[this.indexRowSelectedDetail].codebarre)
    },
    volumetotal(){
      let vt =this.filteredFieldsPieces.reduce(function(prev, cur) {
        return Number(prev) +Number(cur.volume);
      }, 0);
      if(!php.empty(vt)){
        return vt.toFixed(3)
      }
      else{
        return 0
      }
    },
    superficietotale(){
      let st =this.filteredFieldsPieces.reduce(function(prev, cur) {
        return Number(prev) +  Number(cur.superficie);
      }, 0);
      if(!php.empty(st)){
        return  st.toFixed(3)
      }
      else{
        return 0
      }
    },
    poidstotal(){
      let pt=this.filteredFieldsPieces.reduce(function(prev, cur) {
        return Number(prev) + Number(cur.poids);
      }, 0);
      if(!php.empty(pt)){
        return  pt.toFixed(3)
      }
      else{
        return 0
      }
    },
    itemsentree(){
      return this.elementsentreeusinage.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdetailsLot(){
      return this.elementsdetailsLot.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    filteredFieldsDetailPieces(){
      return []


      if (!this.fieldsLot[this.indexRowSelected]  || !this.fieldsLot[this.indexRowSelected].codebarre) {
        return []
      }
      return this.fieldsDetailPieces.filter( field =>field.codebarre==this.fieldsLot[this.indexRowSelected].codebarre)
    },  
    filteredLignes() {
      return this.lignesUtb.filter((ligne) =>
        ligne.intitule.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
      )
    },
    paginatedLignes() {
      return this.filteredLignes.slice(this.offsetlignes, this.limitlignes + this.offsetlignes)
    },
    hasNextPageLignes() {
      const nextOffset = this.offsetlignes + this.limitlignes
      return Boolean(
        this.filteredLignes.slice(nextOffset, this.limitlignes + nextOffset).length
      )
    },
    hasPrevPageLignes() {   
        const prevOffset = this.offsetlignes - this.limitlignes
        return Boolean(
          this.filteredLignes.slice(prevOffset, this.limitlignes + prevOffset).length
        )
      },

    filteredTypesproduits() {
      return this.typesproduits.filter((ligne) =>
        ligne.intitule.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
      )
    },
    paginatedTypesproduits() {
      return this.filteredTypesproduits.slice(this.offsetTypesproduits, this.limitTypesproduits + this.offsetTypesproduits)
    },
    hasNextPageTypesproduits() {
      const nextOffset = this.offsetTypesproduits + this.limitTypesproduits
      return Boolean(
        this.filteredTypesproduits.slice(nextOffset, this.limitTypesproduits + nextOffset).length
      )
    },
    hasPrevPageTypesproduits() {   
      const prevOffset = this.offsetTypesproduits - this.limitTypesproduits
      return Boolean(
        this.filteredTypesproduits.slice(prevOffset, this.limitTypesproduits + prevOffset).length
      )
    },

    filtered() {
        return this.essences.filter((essence) =>
        essence.nomusuel.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
        )
      },
      paginated() {
        return this.filtered.slice(this.offsetessences, this.limitessences + this.offsetessences)
      },
      hasNextPage() {
        const nextOffset = this.offsetessences + this.limitessences
        return Boolean(
          this.filtered.slice(nextOffset, this.limitessences + nextOffset).length
        )
      },
      hasPrevPage() {   
        const prevOffset = this.offsetessences - this.limitessences
        return Boolean(
          this.filtered.slice(prevOffset, this.limitessences + prevOffset).length
        )
      },
   },
   data: () => ({
    showOverlayCodeDatapieces:false,
    currentItemGrume:[], //v-model tableau détails du lot
    currentItemPiece: [], //v-model tableau des pièces associées
    notSetUtb:false, //variable de controle remplissage champ utb
    notSetLignetransformation:false, //variable de controle remplissage champ ligne de transformation
    notSetDateproduction:false,//variable de controle remplissage champ nom de la ligne
    notSetTypeproduit:false,//variable de controle remplissage champ type de produit
    showOverlayLignesUtb: false, //overlay requète de récupérations des lignes de l'UTB
    showOverlayEntreesLigne:false, //gestion chargement entrées usinage de la ligne
    showOverlay:false,
    showOverlayEssences:false,
    submitted: false,
    choix:{},
    searchessences: '',
    searchligne:'',
    offsetessences: 0,
    limitessences: 10,
    offsetlignes: 0,
    limitlignes: 10,
    offsetTypesproduits:0,
    limitTypesproduits:10,
    showGrume: true, //propriété de controle affichage des champs pour le type de produit grumes
    essences:[],
    lignesUtb:[],
    utbs:[],
    typesproduits:[],
    showOverlayCodeData:false,
    form: {
      utb: '', // int (id du site de type utb), obligatoire
      ligne: '', // int (id de la ligne de transformation), obligatoire
	    typeproduit: "", // string,  id du type de produit, obligatoire
      dateproduction: "", // string (format : YYYY-MM-DD), obligatoire
      numcontrat:"",
    },
    entreesLignes:[], //liste des entrees usinage d'une ligne spécifique
    dto:{},
    indexRowSelected:0,
    isActive:false,
    disable:true,
    dataresult:null, //objet permettant de rassembler les informations obtenues du code barre
    isBusy:false,

    produitsTrasformations:[],
    // Données du tableau
    fieldsEntreesUsinage: [
      { key: 'index', label: '' },{ key: 'choisir', label: 'sélectionner la ligne',thStyle: { width: "25%" } },{ key: 'date', label: 'Date de l\'entrée' },
      { key: 'lot', label: 'Lot de l\'entrée' },{ key: 'ligne', label: 'Ligne',thStyle: { width: "30%" } },{ key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elementsentreeusinage:[],

    fieldsdetailsLot:[
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code barre' },{ key: 'sequence', label: 'Séquence' },{ key: 'numcolis', label: 'N° du colis' },
      { key: 'essence', label: 'Essence',thStyle: { width: "28%" } },{ key: 'volume', label: 'Volume',thStyle: { width: "13%" } },{ key: 'action', label: '',thStyle: { width: "6%" } },
    ],
    elementsdetailsLot:[],
    fieldsLotsChecked:[],
    fieldspieces:[
      { key: 'index', label: '' },{ key: 'codebarre', label: 'Code barre' },{ key: 'longueur', label: 'Longueur(m)' },{ key: 'largeur', label: 'Largeur(cm)' },
      { key: 'epaisseur', label: 'epaisseur(Cm)'}, { key: 'nombrepiece', label: 'Nb pièces'},{ key: 'poids', label: 'Poids' },
      { key: 'volume', label: 'Volume',thStyle: { width: "13%" } },{ key: 'superficie', label: 'superficie',thStyle: { width: "13%" } },
      { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elementspieces:[],
    indexRowSelectedDetail:0,
    indexRowSelectedPiece:0,
    entreeSelected:null, //entree suinage sélectionnée
    fields:[]
  }),
    watch: {
      "form.utb"(value) {
        if(value!==null&&value.length!==''){
            this.notSetUtb= false
        }
        else{
            this.notSetUtb= true
        }
      },
      "form.ligne"(value) {
        console.log('entre ici nom ligne 1                                                                                                                                                                                                                                                                                                                                                                                                                        ');
          if(value!==null&&value.length!==''){
              this.notSetLignetransformation= false
          }
          else{
              this.notSetLignetransformation= true
          }
      },
      "form.dateoper"(value) {
        console.log('entre ici nom ligne');
          if(value!==null&&value.length!==''){
              this.notsetDateoper= false
          }
          else{
              this.notsetDateoper= true
          }
      },
      "form.typeproduit"(value) {
        console.log('entre ici nom ligne');
          if(value!==null&&value.length!==''){
            this.notSetTypeproduit= false
          }
          else{
            this.notSetTypeproduit= true
          }
      },
    elementsdetailsLot(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableDetailLot'].selectRow(0) }, 200);
      }
    },
  
    },
    methods: {
      //calcul du volume et de la superficie d'une ligne
      calculateVolandSup(){
        console.log('data ',this.elementspieces[this.indexRowSelectedPiece]);
        let l =this.elementspieces[this.indexRowSelectedPiece].largeur!=0?parseFloat(this.elementspieces[this.indexRowSelectedPiece].largeur):0
        let L =this.elementspieces[this.indexRowSelectedPiece].longueur!=0?parseFloat(this.elementspieces[this.indexRowSelectedPiece].longueur):0
        let e =this.elementspieces[this.indexRowSelectedPiece].epaisseur!=0?parseFloat(this.elementspieces[this.indexRowSelectedPiece].epaisseur):0
        let sup=L*l*0.01
        let vol=L*l*0.01*e*0.01
        console.log('vol ',vol,'superficiedecimalpart ',sup);
        this.elementspieces[this.indexRowSelectedPiece].superficie=sup.toFixed(3)
        this.elementspieces[this.indexRowSelectedPiece].volume=vol.toFixed(3)
        this.elementsdetailsLot[this.indexRowSelectedDetail].volume=this.volumetotal

      },
      RemouveFieldPieces(index){
        this.elementspieces.splice(index, 1);
      },
      RemouveFieldDetailLot(index){
        this.elementsdetailsLot.splice(index, 1);
      },
      //methode de gestion de la sélection d'une ligne du tableau des détails du lot
      onRowSelectedDetailLot(items) {
        this.indexRowSelectedDetail = items.map(item => this.currentItemGrume.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemGrume.indexOf(item)).length;i++){
          this.indexRowSelectedDetail =items.map(item => this.currentItemGrume.indexOf(item))[i]
          console.log('i ',this.indexRowSelectedDetail);
        }    
      },
      //methode de gestion de la sélection d'une ligne du tableau des pièces associées
      onRowSelectedPieces(items) {
        this.indexRowSelectedPiece = items.map(item => this.currentItemPiece.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemPiece.indexOf(item)).length;i++){
          this.indexRowSelectedPiece =items.map(item => this.currentItemPiece.indexOf(item))[i]
        }    
      },
      //controle du codebarre du détails du lot
      checkCodebarredetailLot(value, commande){
        return this.getSequence(value, commande);
        let stop=false
          this.elementsdetailsLot.forEach(field => {
            if(field.codebarre==value){
              stop=true 
            }
          }) 
        if(stop){
          return this.showDialogueLigne('codebarre déjà utilisé');
        }
        else{
          this.getSequence(value, index, commande);
        }
      },
      async getSequence(value, commande){
        this.showOverlayCodeData=true;
          await this.$codesbarres.post("check/check_codebarre_lotProduction", {codebarre : value, idsiteUtb:this.form.utb, idessence:this.essences[0].idessence })
        .then(response =>{
          console.log('response ',response);
          this.result = response.data.result.annomalies
          if(this.result!=undefined){
            this.showOverlayCodeData=false;
            console.log('api 1',response.data.result.annomalies.toString());
            return this.errorHappened(response.data.result.annomalies.toString());
          }else{
            this.elementsdetailsLot[0].codebarre = response.data.result.codebarre !==null ? response.data.result.codebarre :"" ;      
            this.elementsdetailsLot[0].sequence = response.data.result.sequence !==null ? response.data.result.sequence :"" ;
            this.showOverlayCodeData=false;
          }
        })
        .catch(error =>{
          console.log('api 2',error.response);

          this.showOverlayCodeData=false;
          return this.errorHappened(error.response.data);
        } )     
      },
      handleSelected(index){
        this.indexRowSelected =index
        console.log('ligne sélectionnée ',index);
      },
      //gestion bouton ajouter entrée usinage
      addFieldEntree(){
        if(php.empty(this.form.ligne)){
          this.notSetLignetransformation= true
          return this.showDialogueLigne('Bien vouloir préalablement sélectionner une ligne de transformation');
        }
        this.elementsentreeusinage.unshift({entreeSelected: '', dateoper: '', idlot : '', ligne:''});
      },
      // gestion boutton suppression ligne entree usinage
      RemouveFieldEntree(index){
        this.elementsentreeusinage.splice(index, 1);
      },
      //suppression toutes les entrées du tableau des entrées usinage
      removeAllFieldsEntree(){
        this.fieldsEntreesUsinage = [{entreeSelected: '', dateoper: '', idlot : '', ligne: ''}]
      },
      //remplissage autres champs entrée usinage
      loadOtherData(index, data){
        console.log('index ',index, 'entrée choisie ',data);
        this.elementsentreeusinage[index].dateoper=data.dateoper;
        this.elementsentreeusinage[index].idlot=data.idlot;
        this.elementsentreeusinage[index].ligne=data.ligne;
        console.log('données finales ',this.fieldsEntreesUsinage);
      },

      onRowSelectedEntree(items) {
        console.log('row selected',items);
        items.isSelected =true;
      },
      rowClass(item, type) {
        if(item !=''&&item!=null){
          if (item.isEven) return 'table-row-other'
          if (!item || type !== 'row') return 'table-info'
        }else{
          return 
        }
      },
      //gestion bouton ajouter detail lot
      addFieldDetailLot(){
       /* if(php.empty(this.elementsentreeusinage) || !this.elementsentreeusinage[0].idlot){
          return this.showDialogueLigne('Bien vouloir ajouter au moins une entrée usinage');
        }*/
        this.elementsdetailsLot.unshift({codebarre: '', sequence: '', numcolis : '', essence: '', volume:''});
      },
      // gestion boutton suppression detail lot
      removeFieldDetailLot(index){
        this.fieldsLot.splice(index, 1);
      },
      //suppression toutes les entrées du tableau des entrées usinage
      removeAllFieldsDetailLot(){
        this.fieldsLot = [{codebarre: '', sequence: '', numcolis : '', essence: '', volume: '' }]
      },

      //gestion bouton ajouter pièces associées
      addFieldPiecesAssocies(){
        if(php.empty(this.elementsdetailsLot)){
          this.notSetLignetransformation= true
          return this.showDialogueLigne('Bien vouloir ajouter au moins 1 lot');
        }
        if(php.empty(this.elementsdetailsLot)){
          return this.showDialogueLigne('Bien vouloir remplir les données du lot');
        }

        return this.elementspieces.unshift({codebarre: this.elementsdetailsLot[this.indexRowSelected].codebarre, longueur: '', largeur : '', epaisseur: '', nbpieces: '', volume: '', superficie:'', poids:''});
         

        //traitement cas calcul volume et superficie ligne spécifique
        if(!php.empty(this.fieldsDetailPieces)){

          if(php.empty(this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].longueur) || php.empty(this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].largeur) || 
            php.empty(this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].epaisseur) || php.empty(this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].nbpieces)){
              return this.showDialogueLigne('bien vouloir remplir la longueur, a largeur, l\'epaisseur et le nombre de pièces de la ligne précédente');
          }
          this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].volume= this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].longueur * this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].largeur * this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].epaisseur *0.01 * 0.01
          this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].superficie= this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].longueur * this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].largeur * this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].nbpieces
        }
        //remplissange du champ volume du détail du lot
        if(this.fieldsDetailPieces.length>0){
          const tabIntermediaire = this.fieldsDetailPieces.filter(elt => elt.codebarre ==this.fieldsDetailPieces[this.fieldsDetailPieces.length -1].codebarre)
          for(let i=0; i<tabIntermediaire.length; i++){
            console.log('donnée 1',parseFloat(this.fieldsLot[this.indexRowSelected].volume),' donnée 2 ',parseFloat(tabIntermediaire[i].volume));
            this.fieldsLot[this.indexRowSelected].volume =parseFloat(this.fieldsLot[this.indexRowSelected].volume)  + parseFloat(tabIntermediaire[i].volume)
          }
        }
        this.fieldsDetailPieces.unshift({codebarre: this.fieldsLot[this.indexRowSelected].codebarre, longueur: '', largeur : '', epaisseur: '', nbpieces: '', volume: '', superficie:'', poids:''});
      },
      // gestion boutton suppression detail lot
      removeFieldPiecesAssocies(index){
        this.fieldsDetailPieces.splice(index, 1);
      },
      //suppression toutes les entrées du tableau des entrées usinage
      remouveAllPieces(){
        this.elementspieces = []
      },


      //recupération des entrées usinage d'une ligne spécifique
      async getEntresUsinageLigneAndEssences(){
        console.log('selection entrée usinage ',this.form.ligne);
        this.showOverlayEntreesLigne = true;
        try {
          this.entreesLignes = await this.$transformation.get("entrees-usinage/ligne/"+this.form.ligne).then(response => response.data.result);
          this.entreesLignes.map(elt =>{
            elt.dateoper = elt.dateoper.replace(/\//g, '-')
            return elt
          })
          console.log('entrées usinage ',this.entreesLignes);
          if(php.empty(this.entreesLignes)){
            this.notSetLignetransformation= true
            return this.showDialogueLigne('aucune entré usinage trouvée. veuillez chosir une autre ligne ou un autre site');
          }
         // console.log('entrées lignes', this.entreesLignes);
          this.showOverlayEntreesLigne = false;
        } catch (error) {
          this.showOverlayEntreesLigne = false;
            console.log(error.message);
        }
        //récupération des essences de la ligne
        try {
            this.essences =  await this.$transformation.get("lignes-transformation/"+this.form.ligne+"/essences").then(response => response.data.result);
            this.showOverlayEntreesLigne = false;
        } catch (error) {
            this.showOverlayEntreesLigne = false;
            console.log(error.message);
        }
      },

      //recupération des lignes de transformation d'une UTB spécifique
      async getLignesUtb(){
        console.log('entrée variation');
        this.showOverlayLignesUtb = true;
        try {
          this.lignesUtb = await this.$transformation.get("lignes-transformation/raw?siteUtb="+this.form.utb).then(response => response.data.result.Items);
         /* this.lignesUtb = await this.$transformation.get("lignes-transformation/site/"+this.form.utb+"/raw?statut=VALIDE").then(response =>   response.data.result);*/
          console.log('lignes utb', this.lignesUtb);
          this.showOverlayLignesUtb = false;
        } catch (error) {
          this.showOverlayLignesUtb = false;
            console.log(error.message);
        }
      },
      fermer() {
        this.$router.back()
      },
  
      controleChange() {
        console.log("Somethings change");
      },
      resetForm() {
        this.form = {
          utb: '', ligne: '', typeProduit: "", dateproduction: "", numcontrat:"",
        };
      },
      async sendAlertMessage(error){
          const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error.message,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
          } else {
            this.$refs.codebarreinfo._close();
          }
      },
      async sendFormLotProdduction() {
        /*this.form.codebarres =  [];
        this.fields.forEach(field => {
          this.form.codebarres.push(field.codebarre)
        }) */
        if (php.empty(this.form.utb)) {
          this.notSetUtb=true;
          let error={ message:'Veuillez remplir l\'unité de transfotmation'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.ligne)) {
          this.notSetLignetransformation=true;
          let error={ message:'Veuillez remplir la ligne de transfotmation'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateproduction)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typeproduit)) {
          this.notSetTypeproduit=true;
          let error={ message:'Veuillez choisir un type de produit'}
          return this.sendAlertMessage(error);
        }
        //formattage des données au format demandé par l'api
        this.elementsdetailsLot.map(elt =>{
          elt.idessence= elt.essence.idessence
          elt.nonusuel= elt.essence.nomusuel
          elt.reference = elt.sequence
          elt.numcolis = "/colis/"+elt.numcolis
          return elt;
        })
        for(let i=0; i<this.elementsdetailsLot.length; i++){
          let debites=[]
          for(let j=0; j<this.elementspieces.length;j++){
            if(this.elementsdetailsLot[i].codebarre ==this.elementspieces[j].codebarre){
              debites.push(this.elementspieces[j])
            }
          }
          this.elementsdetailsLot[i].debites = debites;
        }




      // console.log('données tableau 2', this.form.rendements);
      this.elementsentreeusinage.map(elt =>{ 
        elt.idlotentEntete = elt.idlot
        elt.dateoper = elt.dateoper.replace(/\//g, '-')
        return elt;
      })
   
        this.form.entreesusinage = this.elementsentreeusinage;
        this.form.details = this.elementsdetailsLot;  
        //this.form.pieces = this.fieldsDetailPieces;  
        console.log('données envoyées ',this.form);
        this.submitted =true;
        this.$transformation.post('productions', this.form).then(response => {
            this.submitted = false 
            this.resetForm()
            App.notifySuccess(response.data.message)
            return this.$router.push({ name: "productions" });
        }).catch(error => {
            console.log('entrée dans le catch');
            this.submitted = false
            this.errorHappened(error)
        })
      },
      async errorHappenedServeur() {
          const ok = await this.$refs.errorbox.show({
              title: 'Erreur survenue',
              message: "erreur interne interne du serveur",
              okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorbox._close();
          } else {
              this.$refs.errorbox._close();
              this.resetForm()
          }
      },
      async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "UTB",
              okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorDialogue._close();
              this.$router.back()
          } else {
              this.$refs.errorDialogue._close();
              this.$router.back()
          }
      },
      async showConfirmMessage(e){
      if (e.currentTarget.value == "Grumes") {
        this.form.typeproduit = "Débités";
      }
      else {
        this.form.typeproduit = "Grumes";
      }

      if( this.fields.length > 1 ){
          const ok = await this.$refs.changeProduct.show({
              title: 'Changement de produit',
              message: "Si oui tous les champs seront vidé",
              okButton: 'oui',
              cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.changeProduct._close();
                this.changeSelect();
            } else {
               this.$refs.changeProduct._close();
            }
      }
      else {
        this.form.typeProduit = e.currentTarget.value;
        this.showGrume = this.form.typeProduit == "Grumes" ? true : false;
      }
      
      },
      changeSelect() {
        if (this.form.typeProduit == "Grume") {
          this.form.typeProduit = "Débité";
          this.showGrume = false;
        }
        else {
          this.form.typeProduit = "Grume";
          this.showGrume = true;
        }
        this.deleteAll();
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
      async getEssences(){
          this.showOverlayEssences=true
          if(!this.$store.state.essences){
            this.essences=this.$store.state.essences;
          // console.log('essences 1', this.essences);
          }
          else{
            try {
                this.essences =  await this.$transformation.get("lignes-transformation/"+this.form.ligne+"/essences").then(response => response.data.result);
                console.log('essences ',this.essences);
                this.$store.dispatch('essences', this.essences)
            } catch (error) {
                console.log(error.message);
            }
          }
    
          this.showOverlayEssences=false
      },
      async getProductionData(){
        this.showOverlay=true;
        
        if(!this.$store.state.utbs){
          this.utbs=this.$store.state.utbs;
        }
        else{
          try {
                this.utbs = await this.$donneesReference.get("sites/utb").then(response => response.data.result);
                this.$store.dispatch('utbs', this.utbs)
            } catch (error) {
                console.log(error.message);
            }
        }
        if(!this.$store.state.typesproduits){
          this.typesproduits=this.$store.state.typesproduits;
        }
        else{
          try {
                this.typesproduits = await this.$donneesReference.get("produits?size=400").then(response => response.data.result.items);
                console.log('types de produits 2',this.typesproduits);
                this.$store.dispatch('typesproduitstransformation', this.typesproduits)
            } catch (error) {
              console.log(error)
              if (!error.response) {
                  // network error
                 this.showDialogueApiError('problème de connexion')
                  //this.errorStatus = 'Error: Network Error';
              } else {
                this.showDialogueApiError('Impossible de joindre le serveur')
              }
            }
        }
        if(php.empty(this.utbs)){
            this.disable=true
            //this.alertNoTile();
          }
          this.showOverlay=false;
      },
    onSearch(query) {
      this.searchessences = query
      this.offsetessences = 0
    },
    onSearchLigne(query){
      this.searchligne = query
      this.offsetlignes = 0
    },
    getDataDetailLot(value, index, commande) {
    
      setTimeout( async () => {
          //controle du fait que le code barre n'est pas encore pris en compte
        if(this.fieldsLot.length>1){
          this.fieldsLotsChecked.forEach(field => {
            if(field.codebarre==value){
              return this.showDialogueLigne('codebarre déjà utilisé');
            }
        }) 

        }
            try {
              console.log('value',value, ' commande ',commande);
              this.showOverlayCodeData=true;
              if(commande='codebarre'){
                console.log('value 1',value);
                this.dataresult =  await this.$codesbarres.post("check/codebarre-colis-production", {codebarre : value, idsiteutb: this.form.utb }).then(response => response.data.result);
              }
              else if(commande='sequence'){
                console.log('value 2',value);
                this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {sequence : value }).then(response => response.data.result);
              }
                console.log('donnée obtenue ',this.dataresult);
                this.fieldsLot[index].codebarre = this.dataresult.codebarre;
                this.fieldsLot[index].sequence = this.dataresult.sequence;
                this.fieldsLotsChecked.push({codebarre:this.fieldsLot[index].codebarre, sequence :this.fieldsLot[index].sequence  })
              this.showOverlayCodeData=false;
            } catch (error) {
                console.log('code ',error.response.data.code);
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
            }
      }, 50);
    },
    async errorHappened(error, index, fields){
      let message= error!=null? error:'erreur interne du serveur'
      const ok = await this.$refs.codebarreinfo.show({
              title: 'Information',
              message: error,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
                this.fields[index].codebarre=''
            } else {
              this.$refs.codebarreinfo._close();
              fields[index].codebarre=''
            }
    },
    async showDialogueLigne(message){
      const ok = await this.$refs.codebarreinfo.show({
              title: 'Information',
              message: message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
              this.$refs.codebarreinfo._close();
            }
    },
    async showDialogueApiError(message){
      const ok = await this.$refs.apiunreacahble.show({
        title: 'Information',
        message: message,
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.codebarreinfo._close();
          this.$router.back();
      } else {
        this.$refs.codebarreinfo._close();
        this.$router.back();
      }
    },
    handleFile(){
      /*if (php.empty(this.form.utb)) {
        this.notSetSiteoper=true;
        let error={ message:'Veuillez choisir le site de l\'opération'}
        return this.sendAlertMessage(error);
      }
      if (php.empty(this.form.lignetransformation)) {
        this.notSetDateoper=true;
        let error={ message:'Veuillez renseigner la date de l\'opération'}
        return this.sendAlertMessage(error);
      }
      if (php.empty(this.form.dateproduction)) {
        this.notSetSiteoper=true;
        let error={ message:'Veuillez choisir le site de l\'opération'}
        return this.sendAlertMessage(error);
      }
      if (php.empty(this.form.typeproduit)) {
        this.notSetDateoper=true;
        let error={ message:'Veuillez renseigner le type de produit'}
        return this.sendAlertMessage(error);
      }
      if (php.empty(this.form.numcontrat)) {
        this.notSetDateoper=true;
        let error={ message:'Veuillez renseigner le n° du contrat'}
        return this.sendAlertMessage(error);
      }*/

      let data={
        utb: this.form.utb, ligne:this.form.ligne
      }
      this.dto=data
      console.log('dto',this.dto);
      this.showUploadFile();
    },
    async showUploadFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'Production',
        okButton: 'valider',
        cancelButton: 'Annuler'

      })
    },
    handleDataImported(data){
      console.log('évènement écouté',data);
      for(let i=0;i<data.length; i++){
        this.elementsdetailsLot.push(data[i])
        for(let j=0;j<data[i].debites.length;j++){
          this.elementspieces.push(data[i].debites[j])
        }
      }
      console.log('elements detail lot',this.elementsdetailsLot );
      console.log('elements pièces',this.elementspieces );
      this.elementsdetailsLot.map(elt =>{ 
        elt.essence = elt.nonusuel
        elt.sequence = elt.reference
        return elt
      })
      this.$refs.filecomponent._close();
    },

  },
  mounted() {
    this.getProductionData()
  },

}
</script>


<style scoped>
.custom-vselect-style{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-color: black;
  --vs-border-color: #fff;
    --vs-line-height: 0.8;
    --vs-actions-padding: 0px 0px 0 0px;
  }
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
  color:black;
  font-weight: bold;
}
.sigif-select{
  width: 99%;
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(0.8em + .500rem + 2px) !important;
}
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
.sigif-transformation-input{
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.styleToSet{
  border: 2px solid red;
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
</style>