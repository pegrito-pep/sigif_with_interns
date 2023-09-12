<template>
  <div id="cover" class="min-vh-100">
        <b-overlay :show="showOverlay">
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span >Création du catalogue N° <span class="font-weight-bold">{{ form.numcatalogue }}</span> </span>
              </h4>
              </b-col> 
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="sendFormCatalogue" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- CREATION PROPREMENT DITE CATALOGUE-->
            <b-row class="mt-2">
              <b-col cols="5">
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Type de Titre </h6></b-col>
                  <b-col cols="7">
                    <select disabled :class="{ styleToSet: notSetTypeInventaire }" class="m-0 p-0 default-old-system-input-properties w-100"   style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option selected>Autorisation d'enlèvement du bois</option>
                    </select>
                  </b-col>
                </b-row>

                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Catalogue N° </h6></b-col>
                  <b-col cols="7">
                    <input class="default-old-system-input-properties" :class="{ styleToSet: notSetNumCatalogue }" v-model="form.numcatalogue"  size="sm"  placeholder="" type="text"/>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Type de produit</h6></b-col>
                  <b-col cols="7">
                    <select v-model="form.typeProduit" :class="{styleToSet:notSetTypeProduit}" class="m-0 p-0 default-old-system-input-properties" 
                    style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option value=""></option>
                      <option value="GR">Grumes</option>
                      <option value="CL">Débités</option>
                      <option value="PS">Produit spécial</option>
                    </select>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Type d'inventaire</h6></b-col>
                  <b-col cols="7">
                    <select :class="{ styleToSet: notSetTypeInventaire }" class="m-0 p-0 default-old-system-input-properties" v-model="form.typeinventaire"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option></option>
                      <option value="EXPLOITATION">Exploitation</option>
                    </select>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Exercice</h6></b-col>
                  <b-col cols="7">
                    <select :class="{ styleToSet: notSetExercice }" class="m-0 p-0 default-old-system-input-properties" v-model="form.exercice"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option v-for="(exercice, i) in exercices" :value="exercice.libelle" :key="i">
                        {{ exercice.libelle }}
                      </option>
                    </select>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"><span style="color: red; font-size:1.5rem">*</span> Origine</h6></b-col>
                  <b-col cols="7">
                    <select :class="{ styleToSet: notSetOrigine }" class="m-0 p-0 default-old-system-input-properties" v-model="form.origine"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                      <option></option>
                      <option value="1">Saisie</option>
                      <option value="2">Abandon</option>
                      <option value="3">Echouage</option>
                    </select>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"> Référence de saisie</h6></b-col>
                  <b-col cols="7">
                    <input class="system-input-nom-promoteur"  v-model="form.referencesaisir"  size="sm"  placeholder="" type="text"/>
                  </b-col>
                </b-row>
                <b-row class="my-2">
                  <b-col cols="5" class="d-flex justify-content-end"><h6 class="font-weight-bold"> Volume(m <sup>3</sup>)</h6></b-col>
                  <b-col cols="7">
                    <input class="system-input-nom-promoteur"  v-model="form.volume"  size="sm"  placeholder="" type="text"/>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="7">
                <div style="height: 300px; overflow-y: auto; overflow-x: hidden;">
                  <div class="table-header-border">
                    <b-row>
                        <b-col cols="5"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Localisation</h4></b-col>
                        <b-col>
                          <a @click.prevent="addFielLocalisationAEB" class="mx-1 simple-btn" style="cursor: pointer"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                          <a @click.prevent="removeAllFieldsLocalisationAEB" class="mx-1 simple-btn" style="cursor: pointer"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                        </b-col>
                    </b-row>
                  </div>
                  <!--TABLEAU DES LOCALISATIONS superficie-->
                  <b-overlay rounded="sm" :show="showOverlayLocalisation">
                    <b-table :items="itemsLocalisationAEB"  :fields="fieldsLocalisationAEB" class="ml-1 px-2 mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelectedLocation" :tbody-tr-class="rowClass">
                      <template v-slot:head(index)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(idarrondissement)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(departement)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(region)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template v-slot:head(localisation)="data">
                        <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                      </template>
                      <template v-slot:head(volume)="data">
                        <span v-html="data.field.label" style="color:green"></span>
                      </template>
                      <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      <template #cell(idarrondissement)="data">
                        <v-select v-model="data.item.idarrondissement" :options="paginatedArrondissements"
                        @input="loadOtherDataLocation(0, data.item.idarrondissement)"  :filterable="false" @search="onSearchLocalisation" :reduce="elt=>elt.idarrondissement" label="intitule" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageArrondissements" @click="offsetArrondissements -= limitArrondissements">Prèc.</button>
                            <button :disabled="!hasNextPageArrondissements" @click="offsetArrondissements += limitArrondissements">Suiv.</button>
                          </li>
                        </v-select>
                      </template>
                      <template #cell(departement)="data">
                        <input disabled size="xs" class="w-100 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.departement" />
                      </template>
                      <template #cell(region)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.region" />
                      </template>
                      <template #cell(localisation)="data">
                        <input  size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:80%" v-model="data.item.localisation" />
                      </template>
                      <template #cell(volume)="data">
                        <input  size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:80%" v-model="data.item.volume" />
                      </template>
                      <template #cell(action)="data">
                        <b-button size="sm" class="d-flex"  title="enlever" @click.prevent="RemouveFieldLocalisation(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                      </template>
                    </b-table>
                  </b-overlay>
                </div>
              </b-col>
            </b-row>
            <div>
              <div class="mx-4 px-2 table-header-border mt-2">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des produits</h4></b-col>
                    <b-col class="liens">
                      <a @click.prevent="loadFile"   class="mx-2 simple-btn"><b-img  src="@/assets/images/excel.png"></b-img>Importer</a>
                      <a :disabled="form.typeProduit==''" @click.prevent="addFieldProduitAEB" class="mx-2 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a @click.prevent="remouveAllFieldsProduitsAEB"  class="mx-2 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                    </b-col>
                </b-row>
              </div>
              <!--TABLEAU PRODUITS ARB-->
              <div class="">
                <b-overlay :show="showOverlayCodeData" rounded="sm">
                  <b-table v-if="form.typeProduit=='GR'" max-height="700px" v-model="currentItemGrume" :items="itemsProduitsAEBGrumes"  
                    :fields="fieldsproduitsAEBGrumes" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   
                    ref="selectableTableDetailLot" select-mode="single" selectable 
                    @row-selected="onRowSelectedProduitsAEB" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(essence)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmZone)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmX)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmY)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(qualite)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(longeur)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(diametrePb)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(diametreGb)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(volume)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>

                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <input size="xs" @keydown.tab.prevent="getSequence(data.index, data.item.codebarre)" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:98%" v-model="data.item.codebarre" />
                    </template>
                    <template #cell(sequence)="data">
                      <input size="xs" class="mx-1 w-75 d-flex justify-content-center px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                    </template>
                    <template #cell(essence)="data">
                      <v-select :options="paginated" v-model="data.item.essence" :reduce="essence => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetessences -= limitessences">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offsetessences += limitessences">Suiv.</button>
                        </li>
                      </v-select>
                    </template>
                   
                    <template #cell(utmZone)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmZone">
                            <option value=""></option>
                            <option value="32N">32N</option>
                            <option value="33N">33N</option>
                          </select>
                      </div>
                    </template>
                    <template #cell(utmX)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmX" />
                      </div>
                    </template>
                    <template #cell(utmY)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmY" />
                      </div>
                    </template>
                    <template #cell(qualite)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.qualite" >
                          <option value=""></option>
                          <option v-for="(q,i) in qualites" :key="i" :value="q.idqualite">{{ q.intitule }}</option>
                        </select>
                      </div>
                    </template>
                    <template #cell(longeur)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.longeur" />
                      </div>
                    </template>
                    <template #cell(diametrePb)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.diametrePb" />
                      </div>
                    </template>
                    <template #cell(diametreGb)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.diametreGb" />
                      </div>
                    </template>
                    <template #cell(volume)="data">
                      <input size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.volume" />
                    </template>
                    <template #cell(action)="data">
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldProduit(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  </b-table>
                  <b-table v-else-if="form.typeProduit=='CL'" max-height="700px" v-model="currentItemGrume" :items="itemsProduitsAEBDebites"  
                    :fields="fieldsproduitsAEBDebites" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   
                    ref="selectableTableDetailLot" select-mode="single" selectable 
                    @row-selected="onRowSelectedProduitsAEB" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(essence)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmZone)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmX)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmY)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(qualite)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(nombrepiece)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>

                    <template v-slot:head(longeur)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(largeur)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(epaisseur)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(volume)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>

                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <input size="xs" @keydown.tab.prevent="getSequence(data.index, data.item.codebarre)" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:98%" v-model="data.item.codebarre" />
                    </template>
                    <template #cell(sequence)="data">
                      <input size="xs" class="mx-1 w-75 d-flex justify-content-center px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                    </template>
                    <template #cell(essence)="data">
                      <v-select :options="paginated" v-model="data.item.essence" :reduce="essence => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetessences -= limitessences">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offsetessences += limitessences">Suiv.</button>
                        </li>
                      </v-select>
                    </template>
                   
                    <template #cell(utmZone)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmZone">
                            <option value=""></option>
                            <option value="32N">32N</option>
                            <option value="33N">33N</option>
                          </select>
                      </div>
                    </template>
                    <template #cell(utmX)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmX" />
                      </div>
                    </template>
                    <template #cell(utmY)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmY" />
                      </div>
                    </template>
                    <template #cell(qualite)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.qualite" >
                          <option value=""></option>
                          <option v-for="(q,i) in qualites" :key="i" :value="q.idqualite">{{ q.intitule }}</option>
                        </select>
                      </div>
                    </template>

                    <template #cell(nombrepiece)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.nombrepiece" />
                      </div>
                    </template>
                    <template #cell(longeur)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.longeur" />
                      </div>
                    </template>
                    <template #cell(largeur)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.largeur" />
                      </div>
                    </template>
                    <template #cell(epaisseur)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.epaisseur" />
                      </div>
                    </template>
    
                    <template #cell(volume)="data">
                      <input size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.volume" />
                    </template>
                    <template #cell(action)="data">
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldProduit(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  </b-table>
                  <b-table v-else-if="form.typeProduit=='PS'" max-height="700px" v-model="currentItemGrume" :items="itemsProduitsAEBProduitSpecial"  
                    :fields="fieldsproduitsAEBProduitSpecial" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   
                    ref="selectableTableDetailLot" select-mode="single" selectable 
                    @row-selected="onRowSelectedProduitsAEB" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(essence)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmZone)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmX)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmY)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(qualite)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(volume)="data">
                      <span v-html="data.field.label" class="" style="color:green"></span>
                    </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <input size="xs" @keydown.tab.prevent="getSequence(data.index, data.item.codebarre)" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important; width:98%" v-model="data.item.codebarre" />
                    </template>
                    <template #cell(sequence)="data">
                      <input size="xs" class="mx-1 w-75 d-flex justify-content-center px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.sequence" />
                    </template>
                    <template #cell(essence)="data">
                      <v-select :options="paginated" v-model="data.item.essence" :reduce="essence => essence.IDESSENCE" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetessences -= limitessences">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offsetessences += limitessences">Suiv.</button>
                        </li>
                      </v-select>
                    </template>
                   
                    <template #cell(utmZone)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmZone">
                            <option value=""></option>
                            <option value="32N">32N</option>
                            <option value="33N">33N</option>
                          </select>
                      </div>
                    </template>
                    <template #cell(utmX)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmX" />
                      </div>
                    </template>
                    <template #cell(utmY)="data">
                      <div class="d-flex justify-content-center align-items-center">
                          <input  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.utmY" />
                      </div>
                    </template>
                    <template #cell(qualite)="data">
                      <div class="d-flex justify-content-center align-items-center">
                        <select  size="xs" class="w-75 mx-1 sigif-input-view px-1 text-left"  style="color:black !important" v-model="data.item.qualite" >
                          <option value=""></option>
                          <option v-for="(q,i) in qualites" :key="i" :value="q.idqualite">{{ q.intitule }}</option>
                        </select>
                      </div>
                    </template>
                    <template #cell(volume)="data">
                      <input size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.volume" />
                    </template>
                    <template #cell(action)="data">
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldProduit(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  </b-table>
                </b-overlay>
              </div>
            </div>
        </b-overlay>
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
        <AlertInfo ref="alertinfo"></AlertInfo>
        <api-unreachable ref="apiunreacahble"></api-unreachable>
  </div>
  
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import AlertInfo from '@/components/utils/ErrorBox.vue';

import ApiUnreachable from '@/components/utils/ApiUnreachable.vue';


export default {
  name:"create-catalogue-arb",
  components:{ErrorDialogue, CodeBarreInfo, ApiUnreachable,AlertInfo},
   watch: {
    "form.numcatalogue"(value) {
      if(!php.empty(value)){
          this.notSetNumCatalogue= false
      }
      else{
        this.notSetNumCatalogue= true
      }
    },
    "form.typetitre"(value){
      if(!php.empty(value)){
        this.notSetTypeTitre= false
      }
      else{
        this.notSetTypeTitre= true
      }
    },
    "form.typeProduit"(value){
      if(!php.empty(value)){
        this.notSetTypeProduit= false
      }
      else{
        this.notSetTypeProduit= true
      }
    },
    "form.typeinventaire"(value){
      if(!php.empty(value)){
          this.notsetTypeInventaire= false
        }
        else{
          this.notsetTypeInventaire= true
        }
    },
    "form.exercice"(value) {
      if(!php.empty(value)){
          this.notSetExercice= false
        }
        else{
          this.notSetExercice= true
        }
    },
    "form.origine"(value) {
      if(!php.empty(value)){
          this.notSetOrigine= false
        }
        else{
          this.notSetOrigine= true
        }
    }, 
  },
   data: () => ({
    searchArrondissement:'',
      showOverlay:false,
      arrondissements:[],
      //data catologue tpe AEB
      fieldsLocalisationAEB:[
        { key: 'index', label: '' },{ key: 'idarrondissement', label: 'Arrondissement',thStyle: { width: "20%" } },
        { key: 'departement', label: 'Département',thStyle: { width: "20%" } },
        { key: 'region', label: 'Région' },
        { key: 'localisation', label: 'Localité/Village' },{ key: 'volume', label: 'Volume',thStyle: { width: "10%" } },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      elementsLocalisationAEB:[],
      //debités
      fieldsproduitsAEBDebites:[
        { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
        { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
        { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
      
        { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
        { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
        {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},{key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
        {key:'nombrepiece',label:'NBde Pièces'},{key:'longeur',label:'Longueur(m)'},{key:'largeur',label:'Lageur(cm)'},
        {key:'epaisseur',label:'Epaisseur(cm)'},
        {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
      ],
      elementsproduitsAEBDebites:[],
      //grumes
      fieldsproduitsAEBGrumes:[
        { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
        { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
        { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
        { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
        { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
        {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},{key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
        {key:'longeur',label:'Longueur (m)'},
        {key:'diametrePb',label:'Diamètre Pb'},{key:'diametreGb',label:'Diamètre Gb'},
        {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
      ],
      elementsproduitsAEBGrumes:[],
      //produit spécial
      fieldsproduitsAEBProduitSpecial:[
        { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
        { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
        { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
        { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
        { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
        {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},{key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
        {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
      ],
      elementsproduitsAEBProduitSpecial:[],

      exercices:[],
      submitted:false, 

      notSetNumCatalogue:false,
   
      notSetTypeInventaire:false,
      notSetTypeProduit:false, 
      notSetExercice:false, 
      notSetOrigine:false,
      notSetEtudeImpact:false,
      notSetFichierInventaire:false,
      notSetFichierEtudeImpact:false,
    
      typesTitres:[
      ],
      searchligne:'',
      offsetlignes:0,
      limitlignes:7,
      offsetessences:0,
      limitessences:10,
      searchessences:'',
      isBusy:false,
      showOverlayLocalisation:false,
      essences:[],
      sequence:'',
      form:{
        numcatalogue:'',
        typetitre:'',
        typeinventaire:'',
        exercice:'',
        volume:'',
        superficie:'',
        referencesaisir:'',
        volume:''
      },
      arrondissement:{},

      offsetArrondissements:0,
      limitArrondissements:10,
      exercices:[],
    
      titres:[],
      qualites:[],
      exercices:[],
      annecourante:"",
      entitesagrees:[],
      loadData:false,
      typesinventaires: ["Exploitation"],
      currentItemGrume:[],
      showOverlayCodeData:false,
  }),

  methods: {
    remouveAllFieldsProduitsAEB(){
      this.elementsproduitsAEB = [];
    },
    addFieldProduitAEB(){
          this.getProduitsData();
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeProduit)) {
            this.notsetTypeProduit=true;
            let error={ message:'Veuillez remplir le type de produit'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.origine)) {
            this.notSetOrigine=true;
            let error={ message:'bien vouloir choisir une origine'}
            return this.sendAlertMessage(error);
          }
          
         
          //controle du fait qu'au moin une localisaion soit ajoutée
          if(php.empty(this.elementsLocalisationAEB)){
            let error={ message:'Veuillez ajouter au moins une localisation'}
            return this.sendAlertMessage(error);
          }
          else if(!php.empty(this.elementsLocalisationAEB)){
            if(php.empty(this.elementsLocalisationAEB[0].idarrondissement) ||php.empty(this.elementsLocalisationAEB[0].idarrondissement)){
              let error={ message:'vous devez correctement renseigner la localisation'}
              return this.sendAlertMessage(error);
            }
          }
          if(this.form.typeProduit=='GR'){
            this.elementsproduitsAEBGrumes.unshift({codebarre: '', sequence: '',essence:'', utmZone : '', 
                                          utmX:'',utmY:'',qualite:'',
                                          longeur:'',diametrePb:'',diametreGb:'',
                                          volume:''});
          }else if(this.form.typeProduit=='CL'){
            this.elementsproduitsAEBDebites.unshift({codebarre: '', sequence: '',essence:'', utmZone : '', 
                                          utmX:'',utmY:'',qualite:'',
                                          nombrepiece:'',longeur:'',largeur:'',epaisseur:'',
                                          volume:''});
          }else if(this.form.typeProduit=='PS'){
            this.elementsproduitsAEBProduitSpecial.unshift({codebarre: '', sequence: '',essence:'', utmZone : '', 
                                          utmX:'',utmY:'',qualite:'',
                                          volume:''});
          }
          
          
    },
    
    RemouveFieldProduit(index){
      if(this.form.typeProduit=='GR'){
          this.elementsproduitsAEBGrumes.splice(index, 1);
      }else if(this.form.typeProduit=='CL'){
        this.elementsproduitsAEBDebites.splice(index, 1);
      }else if(this.form.typeProduit=='PS'){
        this.elementsproduitsAEBProduitSpecial.splice(index, 1);
      }
    },
    RemouveFieldLocalisation(index){
      this.elementsLocalisationAEB.splice(index, 1);
    },
    removeAllFieldsLocalisationAEB(){
      this.elementsLocalisationAEB =[]
    },
    onSearchLocalisation(query){
      this.searchArrondissement = query
      this.offsetArrondissements = 0    
    },  
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },
    onRowSelectedLocation(items){
      console.log('row selected',items);
      items.isSelected =true;
    },
    onRowSelectedProduitsAEB(items){
      console.log('row selected',items);
      items.isSelected =true;
    },


    //chargement autres données localisation
    async loadOtherDataLocation(index,data){
      console.log('data',data);
        this.showOverlayLocalisation = true;
        try{
          if(php.empty(data)){
            this.elementsLocalisationAEB[index].departement='';
            this.elementsLocalisationAEB[index].region='';
            this.showOverlayLocalisation = false;
            return
          }
          this.arrondissement=await this.$donneesReference.get(`arrondissements/${data}/departement_region`)
            .then(resp=>{
              let arr=resp.data.result
              console.log(this.arrondissement)
              this.elementsLocalisationAEB[index].departement=arr.departement;
              this.elementsLocalisationAEB[index].region=arr.region;
            })
        }catch(err){
          console.log(err.message)
        }
        this.showOverlayLocalisation = false;

    },
    
    //partie AEB localisation
    addFielLocalisationAEB(){
        if (php.empty(this.form.numcatalogue)) {
          this.notSetCatalogue=true;
          let error={ message:'Veuillez remplir le numéro de catalogue'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typeProduit)) {
          this.notsetTypeProduit=true;
          let error={ message:'Veuillez choisir le type de profuit'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typeinventaire)) {
          this.notsetTypeInventaire=true;
          let error={ message:'Veuillez remplir le type d\'inventaire'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.exercice)) {
          this.notSetExercice=true;
          let error={ message:'Veuillez renseigner l\'exercice'}
          return this.sendAlertMessage(error);
        }
        this.elementsLocalisationAEB.unshift({idarrondissement: '', departement: '', region : '', localisation:'',volume:''});  
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
    //methode d'ajout d'un catalogue
    formatPostContent(){      
      if (php.empty(this.form.numcatalogue)) {
          this.notSetCatalogue=true;
          let error={ message:'Veuillez remplir le numéro de catalogue'}
          this.sendAlertMessage(error);
          return false;
      }
      else  if (php.empty(this.form.typeProduit)) {
          this.notsetTypeProduit=true;
          let error={ message:'Veuillez choisir un type de produit'}
          this.sendAlertMessage(error);
          return false;
        }
      else  if (php.empty(this.form.typeinventaire)) {
          this.notsetTypeInventaire=true;
          let error={ message:'Veuillez remplir le type d\'inventaire'}
          this.sendAlertMessage(error);
          return false;
        }
      else  if (php.empty(this.form.exercice)) {
          this.notSetExercice=true;
          let error={ message:'Veuillez renseigner l\'exercice'}
          this.sendAlertMessage(error);
          return false;
        }
        this.form.volume=this.volumetotal;
        return true;
    },
    async sendFormCatalogue(){
      let data={}
      if(this.formatPostContent){
        this.submitted =true;
        data.numcatalogue = this.form.numcatalogue; data.typetitre = this.form.typetitre.idtypeTitre;
        data.typeProduit = this.form.typeProduit; 
        data.typeinventaire = this.form.typeinventaire; 
        data.exercice = this.form.exercice;
        data.origine = this.form.origine;
        data.referencesaisir = this.form.referencesaisir;
        data.volume = this.form.volume;

        data.superficieDto = this.elementsLocalisationAEB;
        if(this.form.typeProduit=='GR'){
          this.elementsproduitsAEBGrumes = this.elementsproduitsAEBGrumes.map(elt =>{
                elt.longeur = parseFloat(elt.longeur)
                elt.diametrePb = parseFloat(elt.diametrePb)
                elt.diametreGb = parseFloat(elt.diametreGb)

                return elt
          })

            data.produitAEgrume = this.elementsproduitsAEBGrumes;
        }else if(this.form.typeProduit=='CL'){
          this.elementsproduitsAEBDebites = this.elementsproduitsAEBDebites.map(elt =>{
            elt.largeur = parseFloat(elt.largeur)
            elt.epaisseur = parseFloat(elt.epaisseur)   
            elt.nombrepiece = parseFloat(elt.nombrepiece)   
            elt.longeur = parseFloat(elt.longeur)
            
            return elt
          })
            data.produitAEdebite = this.elementsproduitsAEBDebites;
        }else if(this.form.typeProduit=='PS'){
            data.produits = this.elementsproduitsAEBProduitSpecial;
        }
        
        console.log('data ',data);
      this.$inventaire.post('catalogues', data).then(response => {
            this.submitted = false 
           App.notifySuccess(response.data.message)
           return this.$router.push({ name: "catalogues" });
        }).catch(error => {
          console.log('error ',error);
            this.submitted = false
            
            this.errorHappened(error.response.data)
        })
      }
     
   
    },
    async errorHappened(error, index, fields){
    let message= error!=null? error.message:'erreur interne du serveur'
    const ok = await this.$refs.alertinfo.show({
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


     getDates(){
         let exact = 2000 + new Date().getYear() - 100;
         for (let index = 0; index < 5; index++) {
          this.exercices.push({ libelle: exact - index, value: index + 1, },)
         }
         this.form.exercice=exact
      },

    async getSequence(index, value){
      this.showOverlayCodeData=true;
        await this.$codesbarres.post("check/check_codebarre_catalogue", {codebarre : value},{validateStatus:()=>true})
      .then(response =>{
        console.log('response ',response);
        if(response.status===200){
          if(this.form.typeProduit=='GR'){
            this.elementsproduitsAEBGrumes[0].sequence = response.data.result.sequence
          }else if(this.form.typeProduit=='CL'){
            this.elementsproduitsAEBDebites[0].sequence = response.data.result.sequence
          }else if(this.form.typeProduit=='PS'){
            this.elementsproduitsAEBProduitSpecial[0].sequence = response.data.result.sequence
          }
         // this.elementsproduitsAEB[index].sequence = response.data.result.sequence
        }
        else{
          this.showOverlayCodeData=false;
          return this.showDialogueApiError(response.data.message);
        }
          this.showOverlayCodeData=false;
      })
      .catch(error =>{
          if(error.response){
            console.log(error.response)
          }else if(error.request){
            console.log(error.request)
          }else{
            console.log(error.message)
          }
         this.showOverlayCodeData=false;
      })     
    },

     
      async showDialogueApiError(message){
        const ok = await this.$refs.apiunreacahble.show({
          title: 'Information',
          message: message,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.codebarreinfo._close();
            // this.$router.back();
        } else {
          this.$refs.codebarreinfo._close();
          if(this.form.typeProduit=='GR'){
            this.elementsproduitsAEBGrumes[0].codebarre=''
          }else if(this.form.typeProduit=='CL'){
            this.elementsproduitsAEBDebites[0].codebarre=''
          }
          // this.$router.back();
        }
      },

      async getCatalogueData(){
          if (!php.empty(this.$store.state.typesTitres) ) {
            this.typesTitres = this.$store.state.typesTitres;
          } 
          else{
            try {
              this.typesTitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
              this.$store.dispatch('typesTitres', this.typesTitres)
            } catch (error) {
                App.notifyError(error.message);
            }
          }
          this.formatContent(this.typesTitres);
          this.showOverlay=true
          this.form.exercice="2023"
          if (!php.empty(this.$store.state.arrondissementsfournis) ) {
            this.arrondissements = this.arrondissementsfournis = this.$store.state.arrondissementsfournis
          } 
          else{
            try{
                this.arrondissements = this.arrondissementsfournis = await this.$donneesReference.get("arrondissements/raw").then(response => response.data.result.Items);
                this.$store.dispatch('arrondissementsfournis', this.arrondissements)
            } catch (error){
                App.alertError(error.response.data.message);
            }
          }
          this.showOverlay=false;
        },
      async getProduitsData(){
        this.showOverlayCodeData=true;
        if(!php.empty(this.$store.state.essences)){
          this.essences=this.$store.state.essences;
        }
        else{
          try {
              this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
              console.log('essences ',this.essences);
              this.$store.dispatch('essences', this.essences)
          } catch (error) {
              console.log(error.message);
          }
        }
        if(!php.empty(this.$store.state.qualites)){
          this.qualites=this.$store.state.qualites
        }else{
          try {
              this.qualites =  await this.$inventaire.get("catalogues/qualites").then(response => response.data.result.Items);
              console.log('qualites ',this.qualites);
              this.$store.dispatch('qualites', this.qualites)
          } catch (error) {
              console.log(error.message);
          }
        }
        this.showOverlayCodeData=false;
      },
      async  setformNext(){
        if(!php.empty(this.inventaire.typetitre)){
          this.typeTitreSet =true
          this.loadData = true
          this.inventaire.numtitre=""
          this.titres= await this.$titres.get("titres/"+this.inventaire.typetitre.code+"?size=400").then(response => response.data.result.items);
          this.loadData = false
        }
      },

      formatContent(data){
        data.map((elt)=>{
            if(elt.code==='AR'){
              elt.libelle="Autorisation de récupération du bois"
            }
            if(elt.code==='BO'){
              elt.libelle="Permis de bois d'oeuvre"
            }
            if(elt.code==='AE'){
              elt.libelle="Autorisation d'enlèvement du bois"
            }
            if(elt.code==='PS'){
              elt.libelle="Permis spécial"
            }
            if(elt.code==='AP'){
              elt.libelle="Autorisation personnelle de coupe"
            }
          return elt
        })
      },

      onSearch(query) {
      this.searchessences = query
      this.offsetessences = 0
    },

     fermer() {this.$router.back()},
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
     
      enregistrer() {
        /*this.form.codebarres =  [];
        this.fields.forEach(field => {
          this.form.codebarres.push(field.codebarre)
        }) */
        if (php.empty(this.form.numcatalogue)) {
          this.notSetCatalogue=true;
          let error={ message:'Veuillez remplir le numéro de catalogue'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typetitre)) {
          this.notSetTypeTitre=true;
          let error={ message:'Veuillez remplir le type de titre'}
          return this.sendAlertMessage(error);
        }
        if(this.form.typetitre==='AE'){
          this.checkFormAE()
        }
      },
  },
  computed:{
    valuesSetCorrectly() {
      
      return ( !php.empty(this.form.numcatalogue)&&!php.empty(this.form.typetitre)&&
              !php.empty(this.form.typeProduit)&&!php.empty(this.form.typeinventaire)
              &&!php.empty(this.form.exercice)&&!php.empty(this.form.origine)

              &&!php.empty(this.elementsLocalisationAEB)&&!php.empty(this.elementsLocalisationAEB[0].idarrondissement)
              &&!php.empty(this.elementsLocalisationAEB[0].localisation)&&!php.empty(this.elementsLocalisationAEB[0].volume)&&
              !php.empty(this.elementsproduitsAEBGrumes)||!php.empty(this.elementsproduitsAEBDebites)||!php.empty(this.elementsproduitsAEBProduitSpecial)
      );
    },
    filteredArrondissements() {
      return this.arrondissements.filter((arrondissement) =>
      arrondissement.intitule.toLocaleLowerCase().includes(this.searchArrondissement.toLocaleLowerCase())
      )
    },
    paginatedArrondissements(){
      return this.filteredArrondissements.slice(this.offsetArrondissements, this.limitArrondissements + this.offsetArrondissements)
    },
    hasNextPageArrondissements(){
      const nextOffset = this.offsetArrondissements + this.limitArrondissements
      return Boolean(
        this.filteredArrondissements.slice(nextOffset, this.limitArrondissements + nextOffset).length
      )
    },
    hasPrevPageArrondissements() {   
      const prevOffset = this.offsetArrondissements - this.limitArrondissements
      return Boolean(
        this.filteredArrondissements.slice(prevOffset, this.limitArrondissements + prevOffset).length
      )
    },
    //elements AEB 
    itemsLocalisationAEB(){
      return this.elementsLocalisationAEB.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsProduitsAEBGrumes(){
        return this.elementsproduitsAEBGrumes.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
    },
    itemsProduitsAEBDebites(){
        return this.elementsproduitsAEBDebites.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
    },
    itemsProduitsAEBProduitSpecial(){
        return this.elementsproduitsAEBProduitSpecial.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
    },
    volumetotal(){
      let vt =this.elementsproduitsAEB.reduce(function(prev, cur) {
        return Number(prev) +Number(cur.volume);
      }, 0);
      if(!php.empty(vt)){
        return vt.toFixed(3)
      }
      else{
        return 0
      }
    },
   
    // /////////////////////Listing des essences
    filtered() {
      return this.essences.filter((essence) =>
      essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
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
   mounted() {
      this.getCatalogueData();
      this.getDates();
      let typetitre= storage.get('typetitre')!=null?storage.get('typetitre'):''
      console.log('typetitre ',typetitre);
      if(typetitre!=''){
        this.form.typetitre=typetitre
      }else{
        this.$router.push({ name: "catalogues"});
      }
    },

}
</script>


<style scoped>

.system-input-etude-impact{
  font-weight: normal;
  border-color: #637A95;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: White;
  color: #333333;
  border: 1px solid #637A95;
  padding: 1px 2px 1px 3px;
  margin: 1px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;

}
.system-input-nom-promoteur{
  font-weight: normal;
  border-color: #637A95;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: White;
  color: #333333;
  border: 1px solid #637A95;
  padding: 1px 2px 1px 3px;
  margin: 1px;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;
  height: 20px;
}
.default-old-system-input-properties{
  font-weight: normal;
  border-color: #637A95;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: White;
  color: #333333;
  border: 1px solid #637A95;
  padding: 1px 2px 1px 3px;
  margin: 1px;
  width: 170px;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;
  height: 20px;
}
.catalogue-input-form{
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(1em + .500rem + 2px) !important;
}
.catalogue-form{
  width: 50%;
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(1em + .500rem + 2px) !important;
}
.sigif-input-view{
background:#82C138!important;
border:1px solid white;
font-size:0.75rem !important;
font-weight: 300;
height: calc(1em + .500rem + 1px) !important;
border-radius: .2rem;
}
.styleToSet{
border: 2px solid red;
}
.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
      /* Font */
  --vs-font-size: 0.65rem;
  --vs-line-height: 1.2;
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
    cursor:pointer;
  }
.custumSigifTab {
  float: left;
  background-position: top;
  box-sizing: border-box;
  white-space: nowrap;
  border-top: 1px solid #82C138;
  border-left: 1px solid #82C138;
  border-right: 1px solid #82C138;
  padding: 0px 5px 0px 7px;
  border-bottom: none;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  line-height: 19px;
  margin-top: 0px;
  background-color: #82C138;
  color:#fff;
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

  #vs6__combobox {
    border: red solid 5px !important;
    height: 20px !important;
    display: none !important;
  }

  .sigif-select{
    width: 99%;
    font-size:1rem; 
    border-radius:0.25rem; 
    height: calc(0.8em + .500rem + 2px) !important;
  }


</style>
