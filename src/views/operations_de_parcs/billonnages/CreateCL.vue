<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
      <div>
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
              <span class="font-weight-bold">Création Billonnage des colis</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
              <b-button v-else  @click.prevent="postData" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
            </span>
            <!--<span>
              <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="postData" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
            </span>-->
          </b-col>
        </b-row>
        <!-- CREATION ligne de transformation-->
        <div>
          <div class="container1 mx-3 mt-1">
            <b-row class="d-flex d-flex justify-content-between">
                <b-col cols="3">
                  <label for=""><span class="set-obligation-indicator">*</span> Site concerné</label>
                    <v-select :options="paginatedSites" v-model="form.siteoper" :filterable="false" @search="onSearch" label="INTITULE" :reduce="site => site.IDSITEOPER" class="custom-select-type_titre" :class="{'styleToSet': notSetSiteoper }">
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                          <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                      </li>
                    </v-select>
                    <span v-if="notSetSiteoper" class="text-danger">bien vouloir remplir ce champ</span>
                </b-col>
                <b-col cols="3">
                  <label for="" class=""><span class="set-obligation-indicator">*</span> Date opération</label>
                  <b-form-group label="" description="" >
                    <input class="sigif-input-date" type="date" v-model="form.dateoper" format="YYYY--MM-DD"  :class="{'styleToSet': notSetDateoper }"/><br>
                      <span v-if="notSetDateoper" class="text-danger">bien vouloir remplir ce champ</span>
                  </b-form-group>
                </b-col>
                <b-col cols="3">
                  <label for="">heure</label>
                  <b-form-group label="" description="">
                    <input type="time" v-model="form.heureoper" id="appt" name="appt" >
                  </b-form-group>
                </b-col>
            </b-row>
            
          </div>
            <div style="height: 250px; overflow-y: auto; overflow-x: hidden;">
             
              <div class="d-flex justify-content-between">
                <div style="width: 47%;">
                  <div class="m-4 px-2 table-header-border mt-5">
                    <b-row>
                        <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des colis mères</h4></b-col>
                        <b-col class="liens">
                          <a @click.prevent="addFieldColismere" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                          <a @click.prevent="removeAllFieldsGrumes"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                          <a @click.prevent="showImportSection"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                        </b-col>
                    </b-row>
                  </div>
                  <b-overlay :show="showOverlayCodeDatacolismere" rounded="sm">
                    <b-table v-model="currentItemColismere" height="50px" :items="itemscolis"  :fields="fieldscolis" :busy="isBusy" class="ml-4 px-2 mt-1 selectableTablecolismere" outlined   ref="selectableTablecolismere" select-mode="single" selectable @row-selected="onRowSelectedColismere" :tbody-tr-class="rowClass">
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
                      <template v-slot:head(superficie)="data">
                        <span v-html="data.field.label" class="" style="color:green"></span>
                      </template>
                      <template v-slot:head(poids)="data">
                        <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                      </template>
                  
                      
                      <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      
                      <template #cell(codebarre)="data">
                        <input size="xs" @keydown.tab.prevent="getDetailscodebarremere($event.target.value,indexRowColismere,'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                      </template>
                      <template #cell(sequence)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                      </template>
                      <template #cell(numcolis)="data">
                        <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.numcolis" />
                      </template>
                      <template #cell(essence)="data">
                        <input disabled size="xs" class="w-90 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.essence" />
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
                  <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablePiecesColismere" selectable @row-selected="onRowSelectedPieceassocieecolismere"
                    :items="itemspiecesassocieescolismere" 
                    :fields="fieldspieces" 
                    :tbody-tr-class="rowClass" show-empty>
                    <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                    <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                    <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                    <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                    <template v-slot:head(nbpiece)="data"><span v-html="data.field.label" style="color:green"></span></template>
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
                    <template #cell(nbpiece)="data">
                      <input disabled type="text" v-model="data.item.nbpiece" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
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
      
                </b-table>
                </div>
              </div>
            </div>
             <!--EDITION DU COLIS FILLE ET SES PIECES-->
             <div class="d-flex justify-content-between">
              <div style="width: 47%;">
                <div class="m-4 px-2 table-header-border mt-5">
                  <b-row>
                      <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des colis filles</h4></b-col>
                      <b-col class="liens">
                        <a @click.prevent="addFieldColisfille" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="removeAllFieldsGrumes"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                      </b-col>
                  </b-row>
                </div>
                <b-overlay :show="showOverlayCodeDatacolisfille" rounded="sm">
                  <b-table v-model="currentItemColisfille" height="50px" :items="itemscolisfille"  :fields="fieldscolisfille" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   ref="selectableTablecolisfille" select-mode="single" selectable @row-selected="onRowSelectedColisfille" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <div class="d-flex justify-content-between">
                        <span style="color:green">cbmere</span>
                        <span v-html="data.field.label" style="color:green"></span>
                      </div>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span class="d-flex justify-content-end" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(numcolis)="data">
                      <span class="d-flex justify-content-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(essence)="data">
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
                      <div class="d-flex justify-content-between">
                        <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:45%" v-model="data.item.cbmere" />
                        <input size="xs" @keydown.tab.prevent="checkCodebarreColisfille($event.target.value,indexRowColisfille, 'codebarre')" class="mx-1 px-1 sigif-input-view text-left"  style="color:white!important; width:45%" v-model="data.item.codebarre" />
                      </div>
                    </template>
                    <template #cell(sequence)="data">
                      <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important; float:right" v-model="data.item.sequence" />
                    </template>
                    <template #cell(numcolis)="data">
                      <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:black!important;float:right" v-model="data.item.numcolis" />
                    </template>
                    <template #cell(essence)="data">
                      <input disabled size="xs" class="w-90 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.essence" />
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
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldColisfille(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  
                  </b-table>
                </b-overlay>
              </div>
              <div class="w-50">
                <div class="m-4 px-2 table-header-border mt-5">
                  <b-row>
                      <b-col cols="3"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Pièces associées</h4></b-col>
                      <b-col class="liens">
                        <a @click.prevent="addFieldPieceColisfille" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="removeAllFieldsPiecesFilles"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                      </b-col>
                  </b-row>
                </div>
                <div class="ml-1" style="overflow-x:auto;position: relative; width: 790px;">
                  <b-table v-model="currentItemPiecesColisfille" :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablePiecesColisfille" selectable
                  @row-selected="onRowSelectedTablePiecesColisfille"
                  :items="itemspiecesassocieescolisfille"  :fields="fieldspiecescolisfille" 
                  :tbody-tr-class="rowClass" show-empty style="position: relative; width: 115%;">
                  <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                  <template v-slot:head(longueur)="data"><span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span></template>
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
                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> ajoutée!!</h4>
                  </template>
                  <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
                  <template #cell(codebarre)="data">
                    <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-90 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                  </template> 
                  <template #cell(longueur)="data">
                    <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="float:right; background:#82C138; border: 1px solid white;">
                  </template> 
                  <template #cell(largeur)="data">
                    <input disabled type="text" v-model="data.item.largeur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                  </template> 
                  <template #cell(epaisseur)="data">
                    <input disabled type="text" v-model="data.item.epaisseur"  class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                  </template> 
                  <template #cell(nombrepiece)="data">
                    <input type="number" v-model="data.item.nombrepiece" @keydown.tab.prevent="calculatevolandsup(data.item.nombrepiece)" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
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
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldPieceColisfille(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                </b-table> 
              </div>                  
              </div>
            </div>
          <div>
        </div>
      </div>
    </div>
      <ChangeProductBox ref="changeProduct"></ChangeProductBox>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      <error-dialogue ref="errorbox"></error-dialogue>
      <api-unreachable ref="apiunreacahble"></api-unreachable>
      <file-component ref="filecomponent" @importsuccessfull="handleDataImported" :dto="dto"></file-component>
      <created-box ref="createdDialogue"></created-box>
      <display-error ref="errorscreationinfo"></display-error>

      
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
import { mapGetters } from 'vuex'
import FileComponent from '@/components/utils/operation_de_parc/ImportBillonnageColisFile.vue';
import CreatedBox from '@/components/utils/Created.vue';
import DisplayError from '@/components/utils/operation_de_parc/DisplayError.vue';

export default {
  name:"billonnage-colis-form",
  components:{DisplayError,CreatedBox, ErrorDialogue,NoActionPossibleDialogue, ChangeProductBox, CodeBarreInfo, ApiUnreachable, FileComponent},

  computed: {
      //CONTROLE DU BOUTOPN ENREGISTRER POUR S'ASSURER QU'IL NE S'ACTIVE QUE QUAND LES DONNEES SONT ENTIEREMENT REMPLIS
      valuesSetCorrectly(){
        return ( !php.empty(this.form.siteoper)&&!php.empty(this.form.dateoper)
                &&!php.empty(this.elementspiecesassocieescolisfille)
               );
      },
     //COLIS FILLE
      itemscolisfille(){
        return this.elementscolisfille.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
    },
    //PIECES ASSOCIEES FILTREES AU COLIS FILLE
    filteredpiecesassocieescolisfille(){
      if (!this.elementscolisfille[this.indexRowColisfille]  || !this.elementscolisfille[this.indexRowColisfille].codebarre) {
        return []
      }
      return this.elementspiecesassocieescolisfille.filter( field =>field.codebarre==this.elementscolisfille[this.indexRowColisfille].codebarre)
    },
    //PIECES ASSOCIEES AUX COLIS FILLE
    itemspiecesassocieescolisfille(){
      if(php.empty(this.filteredpiecesassocieescolisfille)){
        return [];
      }
      return this.filteredpiecesassocieescolisfille.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    //COLIS MERE
    itemscolis(){
      return this.elementscolismere.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
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

    filteredSites() {
        return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase()))
    },
    paginatedSites() {
      return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetSites)
    },
    hasNextPageSites() {
      const nextOffset = this.offsetSites + this.limitSites
      return Boolean(
        this.filteredSites.slice(nextOffset, this.limitSites + nextOffset).length
      )
    },
    hasPrevPageSites() {   
      const prevOffset = this.offsetSites - this.limitSites
      return Boolean(
        this.filteredSites.slice(prevOffset, this.limitSites + prevOffset).length
      )
    },

   

   },
   watch: {
    "form.siteoper"(value) {
      if(!php.empty(value)){
          this.notSetSiteoper= false
      }
      else{
          this.notSetSiteoper= true
      }
    },
    "form.dateoper"(value) {
      if(!php.empty(value)){
          this.notSetDateoper= false
      }
      else{
          this.notSetDateoper= true
      }
    },
    elementscolismere(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablecolismere'].selectRow(0) }, 200);
      }
    },
    elementspiecesassocieescolismere(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablePiecesColismere'].selectRow(0) }, 200);
      }
    },
    elementscolisfille(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablecolisfille'].selectRow(0) }, 200);
      }
    },
    elementspiecesassocieescolisfille(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablePiecesColisfille'].selectRow(0) }, 200);
      }
    }
  
    },
   data: () => ({
    showOverlay:false,
    //traitements colis mere
    currentItemColismere:[],//v-model du tableau du colis mere
    indexRowColismere:0,
    selectedcolismere:[],
    showOverlayCodeDatacolismere:false, //chargemet des données du colis mère
    elementscolismereChecked:[],//tableau d'objets chargé de s'assurer qu'on n'utilise pas un code barre colis mere deux fois
    fieldscolis:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'sequence', label: 'Séquence'},
      {key : 'numcolis', label :'N°colis'},
      {key : 'essence', label :'Essence',thStyle:"width:19%"},
      {key : 'volume', label :'Vol(m3)'},
      {key : 'superficie', label :'Sup'},
      {key : 'poids', label :'poids'},
      { key: 'action', label: '',thStyle: { width: "5%" } }
    ],
    elementscolismere:[],
    //traitements pieces
    currentItemPiecesColismere:[], 
    indexRowPieceColismere:0,
    selectedPieceColismere:null,
    fieldspieces:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'longueur', label: 'Longueur(m)'},
      {key : 'largeur', label :'Largeur(cm)'},
      {key : 'epaisseur', label :'épaisseur(cm)'},
      {key : 'nbpiece', label :'Nb pièces'},
      {key : 'volume', label :'volume(m3)'},
      {key : 'superficie', label :'Superficie'},
      {key : 'poids', label :'poids'}
    ],
    elementspiecesassocieescolismere:[],

    //TRAITEMENT COLIS FILLE
    currentItemColisfille:[],
    indexRowColisfille:0,
    selectedcolisfille:null,
    showOverlayCodeDatacolisfille:false,
    currentItemPiecesColisfille:[],
    selectedPieceColisfille:null,
    indexRowPieceColisfille:0,
    fieldscolisfille:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre',thStyle:"width:20%" }, 
      { key: 'sequence', label: 'Séquence'},
      {key : 'numcolis', label :'N°colis'},
      {key : 'essence', label :'Essence',thStyle:"width:19%"},
      {key : 'volume', label :'Vol(m3)'},
      {key : 'superficie', label :'Sup'},
      {key : 'poids', label :'poids'},
      { key: 'action', label: '',thStyle: { width: "5%" } }
    ],
    elementscolisfille:[],
    elementscolisfilleChecked:[],
    //traitements pieces associées colis filles
    fieldspiecescolisfille:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barre' }, 
      { key: 'longueur', label: 'Longueur(m)'},
      {key : 'largeur', label :'Largeur(cm)'},
      {key : 'epaisseur', label :'épaisseur(cm)'},
      {key : 'nombrepiece', label :'Nb pièces'},
      {key : 'volume', label :'volume(m3)'},
      {key : 'superficie', label :'Superficie'},
      {key : 'poids', label :'poids'},
      {key : 'numDf10', label :'',thStyle: { display: "none" } },
       
      { key: 'action', label: '',thStyle: { width: "5%" }}
    ],
    elementspiecesassocieescolisfille:[],
    form: {
      siteoper:'', //id du site de l'opération
      dateoper:'',
      heureoper: ''
    },
    sites:[],
    searchsite:'',
    offsetSites:0, 
    limitSites:10,
    notSetSiteoper:false,
    notSetDateoper:false,
    notsetGrume:false,
    isActive:false,
    disable:true,
    dataresult:null, //objet permettant de rassembler les informations obtenues du code barre
    isBusy:false,
    submitted:false,
    //data pour l'import
    dto:{}
  }),
  methods: {
    onRowSelectedTablePiecesColisfille(items){
      this.selectedPieceColisfille = items;
      this.indexRowPieceColisfille = items.map(item => this.currentItemPiecesColisfille.indexOf(item));
      for(let i=0; i<items.map(item => this.currentItemPiecesColisfille.indexOf(item)).length;i++){
        this.indexRowPieceColisfille =items.map(item => this.currentItemPiecesColisfille.indexOf(item))[i]
      }
    },
    checkDataConsistency(){
      let condition =true;
      const group = this.elementspiecesassocieescolisfille.reduce((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = [];
        }
        acc[item.id].push(item);
        return acc;
      }, {})

      for (let [id, data] of Object.entries(group)) {
        let nbPiecesInitial = this.elementspiecesassocieescolismere.filter(elt => elt.id==id)[0].nbpiece
        console.log('nbPiecesInitial ',nbPiecesInitial);
        let nbTotalPiecesObtenus =data.reduce(function(prev, cur) {
          return parseFloat(prev) + parseFloat(cur.nombrepiece);
         }, 0);
        console.log('nbTotalPiecesObtenus ',nbTotalPiecesObtenus);
        if (parseFloat(nbPiecesInitial)!=parseFloat(nbTotalPiecesObtenus)) {
          condition=false;
        }
      }
      return condition;
 //console.log('group ',group);
    },
    //TRAITEMENT AJOUT D'UNE PIECE ASSOCIEE AU COLIS FILLE
    addFieldPieceColisfille(){
      if(php.empty(this.selectedPieceColismere)||php.empty(this.selectedPieceColismere[0].codebarre)){
        return this.showDialogueLigne('Bien vouloir renseigner et choisir un colis mère');
      }
      else if(php.empty(this.selectedcolisfille)||php.empty(this.selectedcolisfille[0].codebarre)){
        return this.showDialogueLigne('Bien vouloir renseigner / choisir le colis à billoner');
      }
      this.elementspiecesassocieescolisfille.unshift({
        id:this.selectedPieceColismere[0].id,
        codebarrem:this.selectedcolismere[0].codebarre,
        codebarre:this.selectedcolisfille[0].codebarre, 
        numDf10:this.selectedcolisfille[0].numcolis, 
        longueur:this.selectedPieceColismere[0].longueur, largeur: this.selectedPieceColismere[0].largeur, 
        epaisseur: this.selectedPieceColismere[0].epaisseur, nombrepiece:'',
        volume:'', superficie:'', poids:this.selectedPieceColismere[0].poids
      })
    },
    //SUPPRESSION D'UNE LIGNE DANS TABLEAU PIECES ASSOCIEES AU COLIS FILLE
    RemouveFieldPieceColisfille(index){
      this.elementspiecesassocieescolisfille.splice(index, 1);
    },
    //CONTROLE DU NOMBRE DE PIECES ENTREE PUR QU'IL SOIT COHERENT
    checknbpiecefield(value){
      for(let i=0;i<this.elementspiecesassocieescolismere.length;i++){
        console.log('elt[i] ',this.elementspiecesassocieescolismere[i]);

         let data = this.elementspiecesassocieescolisfille.filter( 
          (elt) => elt.id == this.elementspiecesassocieescolismere[i].id
         )
         let nbtotal =data.reduce(function(prev, cur) {
          return parseFloat(prev) + parseFloat(cur.nombrepiece);
         }, 0);
         console.log('nbotal ',nbtotal,'eltmeresel ',this.elementspiecesassocieescolismere[i].nbpiece);
         if(parseFloat(nbtotal)>this.elementspiecesassocieescolismere[i].nbpiece){
           let valeurmax = parseFloat(this.elementspiecesassocieescolismere[i].nbpiece) - (parseFloat(nbtotal) - parseFloat(value))
           // return this.showDialogueLigne('valeur pas acceptée: veuillez entrer un chiffre inféreur ou égale à :'+valeurmax);
            //return this.showDialogueLigne('valeur pas acceptée: QUOTA ATEINT');
            return false;
         }
         return true;
      }
    },
    //CALCUL VOLUME ET SUPERFICIE PIECES COLIS FILLE
    calculatevolandsup(value){
      //console.log('value ',value);
      if(!this.checknbpiecefield(value)){
        return this.showDialogueLigne('valeur pas acceptée: QUOTA ATEINT');
      }
      let L= this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].longueur!=''?parseFloat(this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].longueur):'';
      let l= this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].largeur!=''?parseFloat(this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].largeur):'';
      let e= this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].epaisseur!=''?parseFloat(this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].epaisseur):'';
      let nbpiece= this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].nombrepiece!=''?parseFloat(this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].nombrepiece):'';
      let vol =L*l*e*0.01*0.01
      let sup =L*l*nbpiece*0.01
      this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].volume=vol.toFixed(3);
      this.elementspiecesassocieescolisfille[this.indexRowPieceColisfille].superficie=sup.toFixed(3);
      //mise à jour volume colis fille
      let data = this.elementspiecesassocieescolisfille.filter( 
        (elt) => elt.codebarre==this.elementscolisfille[this.indexRowColisfille].codebarre
      )
      this.elementscolisfille[this.indexRowColisfille].volume =this.updateVolumeColisfille(data)
      this.elementscolisfille[this.indexRowColisfille].superficie =this.updateSuperficieColisfille(data)
      this.elementscolisfille[this.indexRowColisfille].poids =this.selectedPieceColismere[0].poids;
    },
    //CALCUL SUPERFICIE D'UNE LIGNE DU COLIS FILLE
    updateSuperficieColisfille(data){
      let st =this.elementspiecesassocieescolisfille.filter( 
        (elt) => elt.codebarre==this.elementscolisfille[this.indexRowColisfille].codebarre
      ).reduce(function(prev, cur) {
        return prev + cur.superficie;
      }, 0);
      if(!php.empty(st)){
        return parseFloat(st) 
      }
      else{
        return 0
      }
    },
    //CALCUL DU VOLUME D'UNE LIGNE DU COLIS FILLE
    updateVolumeColisfille(data){
      let vt =this.elementspiecesassocieescolisfille.filter( 
        (elt) => elt.codebarre==this.elementscolisfille[this.indexRowColisfille].codebarre
      ).reduce(function(prev, cur) {
        return prev + cur.volume;
      }, 0);
      if(!php.empty(vt)){
        return parseFloat(vt) 
      }
      else{
        return 0
      }
    },
    
    //INFORMATIONS DETAILLEES CODE BARRE MERE
    async getDetailscodebarremere(value, index, commande) {
        //controle du fait que le code barre n'est pas encore pris en compte
        if(this.elementscolismere.length>1){
          let stop=false
            this.elementscolismereChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.checkCodebarremere(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarremere(value, index, commande);
        }
    },
    async checkCodebarremere(value,index, commande){
      this.showOverlayCodeDatacolismere=true;
      if(commande='codebarre'){
      
          await this.$operationParc.post("billonages/infoColis", {codebarre : value})
          .then(response =>{
            this.dataresult =response.data.result
            console.log('dataresult ',this.dataresult);
            this.elementscolismere[index].sequence=this.dataresult.sequence
            this.elementscolismere[index].numcolis=this.dataresult.numDf10 !==null ? this.dataresult.numDf10 :"" ;
            this.elementscolismere[index].essence=this.dataresult.essence !==null ? this.dataresult.essence :"" ;
            this.elementscolismere[index].idessence=this.dataresult.idessence !==null ? this.dataresult.idessence :"" ;
            this.elementscolismere[index].volume=this.dataresult.volumetotal !==null ? this.dataresult.volumetotal :"" ;
            this.elementscolismere[index].superficie=this.dataresult.superficeTotal !==null ? this.dataresult.superficeTotal :"" ;
            this.elementscolismere[index].poids=this.dataresult.poids !==null ? this.dataresult.poids :"" ;
            this.elementscolismereChecked.unshift(this.dataresult)
            this.elementspiecesassocieescolismere = this.dataresult.pieces
            this.$refs['selectableTablecolismere'].selectRow(this.indexRowColismere);

            return this.showOverlayCodeDatacolismere=false;

          } )
          .catch(error =>{
            console.log('execution du catch aussi 1',error);
            this.showOverlayCodeDatacolismere=false;
            this.errorHappened(error.response.data);
          } )   
      }  
    },
    
    onRowSelectedPieceassocieecolismere(items){
      this.selectedPieceColismere = items;

      this.indexRowPieceColismere = items.map(item => this.currentItemPiecesColismere.indexOf(item));
      for(let i=0; i<items.map(item => this.currentItemPiecesColismere.indexOf(item)).length;i++){
        this.indexRowPieceColismere =items.map(item => this.currentItemPiecesColismere.indexOf(item))[i]
        console.log('i ',this.indexRowPieceColismere);
      }
    },
    //CONTROLE DU CODE BARRE COLIS FILLE
    checkCodebarreColisfille(value, index, commande){
       //controle du fait que le code barre n'est pas encore pris en compte
       if(this.elementscolisfille.length>1){
          let stop=false
            this.elementscolisfilleChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.sendtoverification(value, index, commande);
          }
            
        }
        else{
          this.sendtoverification(value, index, commande);
        }
    },
    async sendtoverification(value,index, commande){
          this.showOverlayCodeDatacolisfille=true;
            if(commande='codebarre'){
           
                await this.$codesbarres.post("check/colis", {codebarre : value})
                .then(response =>{
                  console.log('response ',response);
                  this.dataresult =response.data.result
                  if(this.dataresult!=undefined){
                    this.elementscolisfille[this.indexRowColisfille].sequence = this.dataresult.sequence;
                    this.elementscolisfilleChecked.unshift(this.dataresult)
                    return this.showOverlayCodeDatacolisfille=false;
                  }
                  else{
                    this.showOverlayCodeDatacolisfille=false;
                    this.errorHappened(response.data);
                  }
                })
                .catch(error =>{
                  if(error.code=='ERR_NETWORK'){
                      this.showOverlayCodeDatacolisfille=false;
                     return App.alertError('impossible de joindre le serveur') 
                      return this.unreachableapi();
                  }
                  console.log('execution du catch aussi 1',error);
                  if(error&&error.response.data!=undefenided){
                    this.showOverlayCodeDatacolisfille=false;
                    this.errorHappened(error.response.data);
                  }
                  
                } )   
           }  
    },


    //AJOUT DU COLIS FILLE PAR SAISIE DU CODEBARRE
    onRowSelectedColisfille(items){
      this.selectedcolisfille = items
      console.log('selected ',this.selectedcolisfille);

      this.indexRowColisfille = items.map(item => this.currentItemColisfille.indexOf(item));
          for(let i=0; i<items.map(item => this.currentItemColisfille.indexOf(item)).length;i++){
            this.indexRowColisfille =items.map(item => this.currentItemColisfille.indexOf(item))[i]
            console.log('i ',this.indexRowColisfille);
        } 
     
    },
    addFieldColisfille(){
      if(php.empty(this.selectedcolismere)||php.empty(this.selectedcolismere[0].codebarre)){
        return this.showDialogueLigne('Bien vouloir renseigner et choisir un codebarre colis mère');
      }

      this.elementscolisfille.unshift({cbmere: this.selectedcolismere[0].codebarre, codebarre: '', sequence: '', essence:this.selectedcolismere[0].essence, 
              essence: this.selectedcolismere[0].essence,  
              numcolis: this.selectedcolismere[0].numcolis+'/'+(this.elementscolisfille.length+1), dpb: '', dgb: '', longueur: '', volume: ''});
    },
    RemouveFieldColisfille(index){
      this.elementscolisfille.splice(index, 1);
    },
    addFieldColismere () {
        /*if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
   
        if(!php.empty(this.elementsdebites)&&php.empty(this.elementsdebites[this.indexRowSelected].codebarre)){
          this.notsetGrume= true;
          return this.showDialogueLigne('Bien vouloir renseigner le code barre');
        }*/
        console.log('entrée');
        this.elementscolismere.unshift({codebarre: '', sequence: '', numcolis:'', essence: "", volume: '', superficie: '', poids: ''});
        console.log('entrée 2');
        
        //document.getElementById("codebarre").focus();
      },
      RemouveFieldColismere(index){
        this.elementscolismere.splice(index, 1);
      },
      //ligne colis tableau mere selectionnée
      onRowSelectedColismere(items){
        console.log('items ',items);
        this.selectedcolismere = items
        this.indexRowColismere = items.map(item => this.currentItemColismere.indexOf(item));
          for(let i=0; i<items.map(item => this.currentItemColismere.indexOf(item)).length;i++){
            this.indexRowColismere =items.map(item => this.currentItemColismere.indexOf(item))[i]
            console.log('i ',this.indexRowColismere);
        } 
        if(!php.empty(items)){
          this.elementspiecesassocieescolismere = items[0].pieces
            console.log('selected ',this.selectedcolismere);
      
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


      async checkCodebarrebillonnage(value, index, commande) {
        //controle du fait que le code barre n'est pas encore pris en compte
        if(this.elementsdebites.length>1){
          let stop=false
            this.elementsDebitesChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.checkCodebarre(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarre(value, index, commande);
        }
      },
      async checkCodebarre(value,index, commande){
          this.showOverlayCodeDatagrumes=true;
            if(commande='codebarre'){
           
                await this.$codesbarres.post("check/check_codebarreM_billon", {codebarre : value, idsite:this.form.siteoper })
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsdebites[index].sequence=this.dataresult.sequence
                  this.elementsdebites[index].numdf10=this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
                  this.elementsdebites[index].nomcommercial=this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
                  this.elementsdebites[index].idessence=this.dataresult.idessence !==null ? this.dataresult.idessence :"" ;
                  this.elementsdebites[index].dpb=this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
                  this.elementsdebites[index].dgb=this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
                  this.elementsdebites[index].longueur=this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
                  this.elementsdebites[index].volume=this.dataresult.volume !==null ? this.dataresult.volume :"" ;
                  this.elementsGrumesChecked.unshift(this.dataresult)
                  this.showOverlayCodeDatagrumes=false;

                } )
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeDatagrumes=false;
                  this.errorHappened(error.response.data);
                } )   
           }  
      },
      async checkCodebarrefille(value, index, commande){
        //controle du fait que le code barre n'est pas encore pris en compte
        if(this.elementsbillons.length>1){
          let stop=false
            this.elementsbillonsChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.checkCodebarrebillon(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarrebillon(value, index, commande);
        }
      },
      async checkCodebarrebillon(value,index, commande){
          this.showOverlayCodeDatabillons=true;
            if(commande='codebarre'){
           
                await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value})
                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsbillons[index].sequence=this.dataresult.sequence
                  this.showOverlayCodeDatabillons=false;

                } )
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeDatabillons=false;
                  this.errorHappened(error.response.data);
                } )   
           }  
      },
      

      async getDataDetailsGrume(value, index, commande) {
        console.log('comming here from blur');
        //controle du fait que le code barre n'est pas encore pris en compte
        if(this.fieldsGrumes.length>1){
          this.fieldsGrumesChecked.forEach(field => {
            if(field.codebarre==value){
              return this.showDialogueLigne('codebarre déjà utilisé');
            }
          }) 

        }
     
            console.log('value',value, ' commande ',commande);
            this.showOverlayCodeData=true;
            if(commande='codebarre'){
              this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value})
              .then(response => response.data.result)
              .catch(error =>{
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
              } )
              //this.dataresult =  await this.$codesbarres.post("check/codebarre-colis-production", {codebarre : value, idsiteutb: this.form.utb }).then(response => response.data.result);
            }
            else if(commande='sequence'){
              this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {sequence : value })
              .then(response => response.data.result)
              .catch(error =>{
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index, this.fieldsLot);
              } )
            }
              console.log('donnée obtenue ',this.dataresult);

              this.fieldsGrumes[index].codebarre = this.dataresult.codebarre;
              this.fieldsGrumes[index].sequence = this.dataresult.sequence;
              this.fieldsGrumes[index].numdf10 = this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
              this.fieldsGrumes[index].essence = this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
              this.fieldsGrumes[index].idessence = this.dataresult.idessence !==null ? this.dataresult.idessence :"" ;
              this.fieldsGrumes[index].dpb = this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
              this.fieldsGrumes[index].dgb = this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
              this.fieldsGrumes[index].longueur = this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
              this.fieldsGrumesChecked.push({codebarre:this.fieldsGrumes[index].codebarre, sequence :this.fieldsGrumes[index].sequence  })
            this.showOverlayCodeData=false;
      },
      handleSelected(index){
        this.indexRowSelected =index
        console.log('ligne sélectionnée ',index);
      },
      handleSelectedBillons(index){
        this.indexRowSelectedBillons =index
      },
      async getCreationData(){
        this.showOverlay=true;
      
        if(!php.empty(this.$store.state.sitesnoutbs) ){
          this.sites=this.$store.state.sitesnoutbs;
        }
        else{
          try {
              this.sites =  await this.$donneesReference.get("sites/all").then(response => response.data.result);
              this.$store.dispatch('sitesnoutbs', this.sites)
          } catch (error) {
            console.log(error.message);
          }
        }
        this.showOverlay=false;
      },
      RemouveFieldGrumes(index){
        this.elementsdebites.splice(index, 1);
      },
      RemouveFieldBillons(index){
        this.elementsbillons.splice(index, 1);
      },
      removeAllFieldsGrumes(){
        this.fieldsGrumes = [{codebarre: '', sequence: '', essence:'', lignedf10: "", dpb: 0, dgb: 0, longueur: 0, volume: 0 }]
      },

      remouveAllBillons(){
        this.elementsbillons = []
      },

       //début méthodes liées à l'import
       async custoFile(){
        const ok = await this.$refs.filecomponent.show({
          title:'Billonnage',
          okButton: 'valider',
          cancelButton: 'Annuler'

          })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          let grumes=[]
          this.content.data.forEach(elt =>{
              let grume = {
                cbmere:elt.CB_MERE,
                codebarre:elt.CODE_BARRE,
                sequence:"",
                idessence:1800,
                numdf10:"1",
                dpb:elt.DIAMPB,
                dgb:elt.DIAMGB,
                longueur:elt.LONGUEUR,
                volume:2.4,
                abandonne:elt.ABANDONNE,
                position:elt.POSITION
              }
              grumes.push(grume)
            })
            let billonnageDto={siteoper: this.form.siteoper,dateoper: this.form.dateoper, grumes: grumes}
            if(php.empty(this.form.heure)){
              billonnageDto.heure=''
            }
            else{
              billonnageDto.heureoper=this.form.dateoper+'T'+this.form.heureoper+':00'
            }
            console.log('données finales ',billonnageDto);
          //this.$refs.filecomponent._close();

          //.uploadsection=true
        } else {
          this.$refs.filecomponent._close();
        }
      },
      showImportSection(){
      if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        let data={
          site: this.form.siteoper, date:this.form.dateoper
        }
        if(php.empty(this.form.heureoper)){data.heure=''}
        else{data.heureoper=this.form.date+'T'+this.form.heure+':00'}
        this.dto=data
        console.log('dto',this.dto);
      this.showUploadFile();
    },
      async showUploadFile(){
        const ok = await this.$refs.filecomponent.show({
          title:'Billonnage',
          okButton: 'valider',
          cancelButton: 'Annuler'

        })
      },
      handleDataImported(data){
        console.log('évènement écouté');
        for(let i=0;i<data.length; i++){
          this.elementscolismere.push(data[i])
          this.elementscolismere = this.elementscolismere.map(elt =>{
            elt.numcolis = elt.numDf10!=''?elt.numDf10:''
            return elt;
          })
          console.log('cc ',this.elementscolismere);
          this.elementscolisfille = this.elementscolismere[0].colisfilles;
          this.elementscolisfille = this.elementscolisfille.map(elt =>{
            elt.numcolis = elt.numDf10!=''?elt.numDf10:''
            return elt;
          })
          this.elementspiecesassocieescolismere =this.elementscolismere[0].colisMeres;
          this.elementspiecesassocieescolisfille = this.elementscolisfille[0].pieces
          /*this.elementspiecesassocieescolisfille = this.elementspiecesassocieescolisfille.map(elt =>{
            elt.superficie=elt.longueur
            elt.volume =this.updateVolumeColisfille()
          })*/
        }
        

        /*this.elementsdebites.map(elt =>{ 
          elt.codebarre = elt.cbmere
          elt.nomcommercial = elt.essence
          return elt
        })*/
        this.$refs.filecomponent._close();
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

      fermer() {
        this.$router.back()
      },
  
      controleChange() {
        console.log("Somethings change");
      },
      resetForm() {
        this.form = {
          utb: '', lignetransformation: '', typeProduit: "", dateproduction: "", numcontrat:"",
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
      async postData() {
        if (php.empty(this.form.siteoper)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if(!php.empty(this.elementspiecesassocieescolisfille)){
          this.elementspiecesassocieescolisfille.forEach(elt => {
            if(php.empty(elt.codebarre)||php.empty(elt.longueur)|| php.empty(elt.largeur)||php.empty(elt.epaisseur)||php.empty(elt.nombrepiece)||php.empty(elt.volume)||php.empty(elt.superficie)||php.empty(elt.poids)){
              let error={ message:'Veuillez renseigner correctement les données des colis'}
              return this.sendAlertMessage(error);
            }
          }) 
        }
        let controleRepartition=this.checkDataConsistency()
        if(!controleRepartition){
            return this.showDialogueLigne('pièces de colis mal reparties');
        }
          let data={siteoper: this.form.siteoper ,dateoper: this.form.dateoper, 
            pieceDtos:this.elementspiecesassocieescolisfille.map(({ codebarrem, codebarre, longueur, largeur, epaisseur, nombrepiece, volume, superficie, poids,numDf10  }) => ({
              codebarrem, 
              codebarre, 
              longueur, 
              largeur,
              epaisseur, 
              nombrepiece,
              volume,
              superficie,
              poids,
              numDf10
            }))
          }
          if(php.empty(this.form.heureoper)){
              data.heureoper=''
          }
          else{
            data.heureoper=this.form.dateoper+'T'+this.form.heureoper+':00'
          }
          console.log('données envoyées ',data);
            this.submitted = true 
          this.$operationParc.post('billonages/CL', data).then(response => {
              this.submitted = false 
              console.log('entrée dans le response ',response);

              //this.resetForm()
              App.notifySuccess(response.data.message);
              return this.handleCreated();
          }).catch(error => {
              console.log('entrée dans le catch ',error);
              this.submitted = false
              this.displayError(error.response.data.result.toString())
             // this.errorHappened(error)
          })
      },

      async displayError(annomalies){
        let message=annomalies!=undefined?annomalies:'erreur interne du serveur'
        const ok = await this.$refs.errorscreationinfo.show({
              title: 'Information',
              anomalies:message,
              filename:'annomalies_billonnage_colis'
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.errorscreationinfo._close();
            } else {
              this.$refs.errorscreationinfo._close();
            }
    },
      async handleCreated() {
        const ok = await this.$refs.createdDialogue.show({
            title: 'Enregistrement',
            message: 'Opération éffectuée avec succès',
            okButton: 'Nouvel enregistrement',
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.createdDialogue._close();
            this.resetForm();
        } else {
            this.$refs.createdDialogue._close();
            this.$router.back();
        }
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
                this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value }).then(response => response.data.result);
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
      let message=error.message!=undefined?error.message:'érreur interne du serveur'
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
    
  
  },
  mounted(){
   this.getCreationData();
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