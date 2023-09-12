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
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col cols="3">
                    <b-form-group label-cols="5" label-cols-lg="4" label-size="sm" label="entité" label-for="input-sm">
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </b-form-group>
                    <b-form-group label-cols="5" label-cols-lg="4" label-size="sm" label="type de titre" label-for="input-sm">
                      <select class="m-0 p-0"   style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option v-for="(typetitre, i) in typestitres" :value="typetitre.key" :key="i">
                          {{ typetitre.libelle }}
                       </option>
                      </select>
                    </b-form-group>
                  </b-col>
                  <b-col cols="2">
                    <b-form-group label-cols="6" label-cols-lg="5" label-size="sm" label="exercice" label-for="input-sm">
                      <select class="m-0 p-0" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option v-for="(exercice, i) in exercices" :value="exercice" :key="i">{{ exercice }}</option>
                      </select>
                    </b-form-group>
                    <b-form-group label-cols="6" label-cols-lg="5" label-size="sm" label="N° du titre" label-for="input-sm">
                      <b-form-input class="form-control-xs"></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group class="d-flex" label-cols="4" label-cols-lg="3" label-size="sm" label="Période du" label-for="input-sm">
                      <calendar v-model="search.periodedebut" class="w-50" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                    </b-form-group>
                    <b-form-group label-cols="4" label-cols-lg="3" label-size="sm" label="Au" label-for="input-sm">
                      <calendar v-model="search.periodefin" :format="format" :clear-button="clear" :placeholder="placeholderdfin" :pane="1"></calendar>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="ml-2">
                    <b-form-group label-cols="9" label-cols-lg="8" label-size="sm" label="N° titre de recouvrement emis" label-for="input-sm">
                      <b-form-input class="form-control-xs"></b-form-input>
                    </b-form-group>
                    <b-form-group label-cols="4" label-cols-lg="3" label-size="sm" label="Nature taxe" label-for="input-sm">
                      <select class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option v-for="(nature, i) in naturestaxes" :value="nature.key" :key="i">{{ nature.libelle }}</option>
                      </select>
                    </b-form-group>
                  </b-col>
                </b-row>

                  <b-row align-h="end">
                    <b-col cols="2">
                        <search-bar-actions-buttons-new @search="filterTable" @reset="reset"/>
                    </b-col>
                  </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Emission des taxes</h4></b-col>
              <b-col class="col-md-auto">
                  <a size="sm"  class="mx-1 simple-btn"><b-img  src="@/assets/images/actualiser.gif"></b-img>Actualiser</a>
              </b-col>
            </b-row>
          </div>
           <div class="ml-3">
            <b-row class="wrap" ref="wrap" style="position: relative !important;" >
              <div id="tabs" class="w-100" >
                <button class="arrow-left" @click="scroll_left">
                  <b-icon-arrow-left/>
                </button>
                <b-tabs  card>
                  <b-tab @click.prevent="section = 'titres_rfa'" title="Titres de recouvrement RFA émis">
                    <div class="card-body mt-0 py-0" v-show="section == 'titres_rfa'">
                      <b-row class="mt-0"> 
                        <b-col class="my-0"> 
                          <b-row class="my-0">
                            <b-col class="mt-0">
                              <h5  class="title-fiscalite mt-0">Titres RFA</h5>
                            </b-col>
                            <b-col cols="6" cols-md-auto>
                              <b-row class="d-flex justify-content-between">
                                <b-col cols="6">
                                  <b-form-group label-cols="6" label-align="right" label-cols-lg="6" label-size="sm" label="RFA totale" label-for="input-sm">
                                    <b-form-input class="form-control-xxs"></b-form-input>
                                  </b-form-group>
                                </b-col>
                                <b-col cols="">
                                  <b-form-group label-align="right" class="px-2" label-cols="7" label-cols-lg="6" label-size="sm" label="Nombre TR RFA émis" label-for="input-sm">
                                    <b-form-input class="form-control-xxs"></b-form-input>
                                  </b-form-group>
                                </b-col>
                              </b-row>
                            </b-col>
                          </b-row>
                            <!--TABLEAU DES TITRES RFA-->
                          <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitresrfa" 
                              :fields="fieldstitresrfa" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(superficier)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template>
                              <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template>
                              <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template>
                              <template #cell(superficier)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                              </template>
                            </b-table>
                          </div>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="4">
                          <b-row>
                            <b-col>
                              <h5  class="title-fiscalite">Echeance(s) du titre de recouvrement émis</h5>
                            </b-col>
                            <!-- <b-col class="col-md-auto">
                            </b-col> -->
                          </b-row>
                          <!--TABLEAU ECHEANCE(S) DU TITRE DE RECOUVREMENT  EMIS-->
                          <div class="mx-1">
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheances" 
                            :fields="fieldsecheances" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template>
                            
                            </b-table>
                          </div>
                        </b-col>
                        <b-col>
                          <b-row>
                            <b-col><h5 class="title-fiscalite">Répartition du titre de recouvrement émis</h5></b-col>
                            <b-col class="col-md-auto">
                            </b-col>
                          </b-row>
                          <!--implémentation tableau troisieme partie proprement dite-->
                          <div class="mx-1">
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                            :items="itemstitresrecouvrements" 
                            :fields="fieldsrecouvrement" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(beneficiare)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(arrondissement)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(part)="data">
                              <span class="d-flex justify-content-center align-items-center"  v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(uniteR)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(superficier)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(beneficiare)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.beneficiare }} </span>
                            </template>
                            <template #cell(intitullearondissement)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                            </template>
                            <template #cell(superficier)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                            </template>
                            <template #cell(uniteR)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                            </template>
                            <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template>
                            
                            </b-table>
                          </div>
        
                        </b-col>
                      </b-row>
                    </div>  
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_ta'" title="Titres de recouvrement TA émis" >
                    <div class="card-body" v-if="section == 'titres_ta'">x&
                      <b-row> 
                        <b-col> 
                          <b-row>
                            <b-col cols="2"><h5  class="title-fiscalite">Titres TA</h5></b-col>
                            <b-col cols="2">
                              <b-button  size="sm" class="mx-1 simple-btn">consulter</b-button>
                              <b-button  size="sm" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer</b-button>
                            </b-col>
                          </b-row>
                            <!--TABLEAU DES TITRES TA-->
                          <div class="ml-1" >
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitresta" 
                              :fields="fieldstitresta" 
                              :tbody-tr-class="rowClass" show-empty>

                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(intituleorganisation)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(datefacture)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numpermis)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(taxeabattage)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(volume)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numufa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numufe)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <template #cell(datefacture)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.datefacture }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template>
                              <template #cell(mois)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.mois }} </span>
                              </template>
                              <template #cell(numpermis)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.numpermis }} </span>
                              </template>
                              <template #cell(taxeabattage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.taxeabattage }} </span>
                              </template>
                              <template #cell(volume)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.volume }} </span>
                              </template>
                              <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(dateattribution)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.taxeabattage }} </span>
                              </template>
                              <template #cell(numufa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.numufa }} </span>
                              </template>
                              <template #cell(numufe)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.numufe }} </span>
                              </template>
                            </b-table>
                          </div>
                        </b-col>
                      </b-row>
                    </div>  
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_tt'" title="Titres de recouvrement TT émis">
                    <div class="card-body py-0" v-if="section == 'titres_tt'">
                      <h5 class="title-fiscalite">Titres TT</h5>
                      <!--TABLEAU DES TITRES TT-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitrestt" 
                              :fields="fieldstitrestt" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(taxetransfert)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(superficier)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template>
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <template #cell(superficier)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                              </template>
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <div>
                                <h5 class="title-fiscalite">Echéance(s) TT</h5>
                              <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesTT" 
                            :fields="fieldsecheancesTT" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </div>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsTT" 
                                  :fields="fieldsrecouvrementTT" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                      
                    </div>
                  </b-tab>
                  
                  <b-tab @click.prevent="section = 'titres_tr'" title="Titres de recouvrement TR émis">
                    <div class="card-body py-0" v-if="section == 'titres_tr'">
                      <h5 class="title-fiscalite">Titres TR</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitrestr" 
                              :fields="fieldstitrestr" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(taxeregeneration)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template>
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template>
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <div>
                              <h5 class="title-fiscalite">Echéance(s) TR</h5>
                              <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesTT" 
                            :fields="fieldsecheancesTT" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                            </div>
                            <b-row>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsTR" 
                                  :fields="fieldsrecouvrementTR" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_tre'" title="Titres de recouvrement TRE émis">
                    <div class="card-body py-0" v-if="section == 'titres_tre'">
                      <h5 class="title-fiscalite">Titres TRE</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitrestre" 
                              :fields="fieldstitrestre" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(volume)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <div>
                                <h5 class="title-fiscalite">Echéance(s) TRE</h5>
                              <b-table sticky-header style="font-family:'Verdana';font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesTRE" 
                            :fields="fieldsecheancesTRE" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </div>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre émis entre bénéficiaires
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsTRE" 
                                  :fields="fieldsrecouvrementTRE" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_pv'" title="Titres de recouvrement PV émis">
                    <div class="card-body py-0" v-if="section == 'titres_pv'">
                      <h5 class="title-fiscalite">Titres PV</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitrespv" 
                              :fields="fieldstitresPV" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(superf-volume)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) PV</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesPV" 
                            :fields="fieldsecheancesPV" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsPV" 
                                  :fields="fieldsrecouvrementPV" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_fpve'" title="Titres de recouvrement FPVE émis">
                    <div class="card-body py-0" v-if="section == 'titres_fpve'">
                      <h5 class="title-fiscalite">Titres FPVE</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitresfpve" 
                              :fields="fieldstitresFPVE" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtitre)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(dateattribution)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(fraisventesencheres)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) FPVE</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesPV" 
                            :fields="fieldsecheancesPV" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsPV" 
                                  :fields="fieldsrecouvrementPV" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_se'" title="Titres de recouvrement SE émis">
                    <div class="card-body py-0" v-if="section == 'titres_se'">
                      <h5 class="title-fiscalite">Titres SE</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitresse" 
                              :fields="fieldstitresSE" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(surtaxe)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(volume)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(fraisventesencheres)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) SE</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesSE" 
                            :fields="fieldsecheancesSE" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsSE" 
                                  :fields="fieldsrecouvrementSE" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_te'" title="Titres de recouvrement TE émis">
                    <div class="card-body py-0" v-if="section == 'titres_te'">
                      <h5 class="title-fiscalite">Titres TE</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitreste" 
                              :fields="fieldstitresTE" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(surtaxe)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(volume)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(taxeexportationbse)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) TE</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesTE" 
                            :fields="fieldsecheancesTE" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsTE" 
                                  :fields="fieldsrecouvrementTE" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_te'" title="Titres de recouvrement Timbres LV">
                    <div class="card-body py-0" v-if="section == 'titres_te'">
                      <h5 class="title-fiscalite">Titres Timbres LV</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitreslv" 
                              :fields="fieldstitresLV" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(timbresLV)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(nombredetimbres)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(typefacture)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) TE</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesLV" 
                            :fields="fieldsecheancesLV" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsLV" 
                                  :fields="fieldsrecouvrementLV" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab @click.prevent="section = 'titres_te'" title="Titres de recouvrement Timbres Autorisation FLEGT">
                    <div class="card-body py-0" v-if="section == 'titres_te'">
                      <h5 class="title-fiscalite">Titres Timbres Autorisation FLEGT</h5>
                      <!--TABLEAU DES TITRES TRE-->
                      <div class="ml-1 mt-0" >
                            <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                              :items="itemstitresFLEGT" 
                              :fields="fieldstitresFLEGT" 
                              :tbody-tr-class="rowClass" show-empty>
                              <template #empty>
                                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                              </template>
                              <template v-slot:head(operateur)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(timbresFLEGT)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(nombredetimbres)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(mois)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(taxerecuperation)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template v-slot:head(dateemission)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <template v-slot:head(numtr)="data">
                                <span v-html="data.field.label" style="color:#00522C"></span>
                              </template>
                              <!-- <template v-slot:head(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(offre)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <!-- <template v-slot:head(typefacture)="data">
                                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                              </template> -->
                              <template #table-busy>
                                <div class="text-center text-success my-2">
                                  <b-spinner class="align-middle"></b-spinner>
                                  <strong class="ml-1">chargement...</strong>
                                </div>
                              </template>
                              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                              <!-- <template #cell(typetitre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                              </template>
                              <template #cell(exercice)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.exercice }} </span>
                              </template> -->
                              <!-- <template #cell(rfa)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                              </template> -->
                              <!-- <template #cell(offre)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.offre }} </span>
                              </template> -->
                              <!-- <template #cell(tonnage)="data">
                                <span class="d-flex justify-content-center align-items-center">{{ data.item.tonnage }} </span>
                              </template> -->
                            </b-table>
                      </div>
                      <div class="mt-4 p-2 pl-3" style="border:1px solid grey;border-radius:10px;">
                        <b-row>
                          <b-col cols="4">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">Echéance(s) Timbres Autorisation FLEGT</h5>
                              <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm"
                            :items="itemsecheancesFLEGT" 
                            :fields="fieldsecheancesFLEGT" 
                            :tbody-tr-class="rowClass" show-empty>
                            <template #empty>
                              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                            </template>
                            <template v-slot:head(dateechange)="data">
                              <span v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <template v-slot:head(montant)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template>
                            <!-- <template v-slot:head(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                            </template> -->
                            <template #table-busy>
                              <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                              </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                            <template #cell(dateechange)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.dateechange }} </span>
                            </template>
                            <template #cell(montant)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.montant }} </span>
                            </template>
                            <!-- <template #cell(rfa)="data">
                              <span class="d-flex justify-content-center align-items-center">{{ data.item.rfa }} </span>
                            </template> -->
                              </b-table>
                              </b-col>
                              
                            </b-row>
                          </b-col>
                          <b-col cols="8">
                            <b-row>
                              <b-col>
                                <h5 class="title-fiscalite">
                                Répartition du titre de recouvrement émis
                                </h5>
                                <b-table sticky-header style="font-family:Verdana;font-size: 13px;"  :busy="isBusy" hover  select-mode="single" responsive="sm" 
                                  :items="itemstitresrecouvrementsFLEGT" 
                                  :fields="fieldsrecouvrementFLEGT" 
                                  :tbody-tr-class="rowClass" show-empty>
                                  <template #empty>
                                    <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                                  </template>
                                  <template v-slot:head(beneficiare)="data">
                                    <span class="" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(arrondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template v-slot:head(part)="data">
                                    <span class=""  v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <!-- <template v-slot:head(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template>
                                  <template v-slot:head(rfa)="data">
                                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:#00522C"></span>
                                  </template> -->
                                  <template #table-busy>
                                    <div class="text-center text-success my-2">
                                      <b-spinner class="align-middle"></b-spinner>
                                      <strong class="ml-1">chargement...</strong>
                                    </div>
                                  </template>
                                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                  <template #cell(beneficiare)="data">
                                    <span>{{ data.item.beneficiare }} </span>
                                  </template>
                                  <!-- <template #cell(intitullearondissement)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.intitullearondissement }} </span>
                                  </template>
                                  <template #cell(superficier)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.superficier }} </span>
                                  </template>
                                  <template #cell(uniteR)="data">
                                    <span class="d-flex justify-content-center align-items-center">{{ data.item.uniteR }} </span>
                                  </template> -->
                                  <template #cell(part)="data">
                                    <span>{{ data.item.part }} </span>
                                  </template>
                                </b-table>
                              </b-col>
                            </b-row>
                          </b-col>
                        </b-row>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>         
                <button class="arrow-right" @click="scroll_right">
                  <b-icon-arrow-right/>
                </button>
              </div>
            </b-row>
    </div>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from 'vuex'
  import Calendar from 'vue2-slot-calendar';
export default {
  name: "emssion_titre_recouvrement",
  components:{
    Calendar,
  },
  
  data: () => ({
    section:'titres_rfa',
    typestitres:[
      {libelle: 'AEB', key:'AEB'},
      {libelle: 'APC', key:'APC'},
      {libelle: 'ARB', key:'ARB'},
      {libelle: 'Concéssion forrestière en convention définitive', key:'CD'},
      {libelle: 'Concéssion forrestière en convention provisoire', key:'CP'},
      {libelle: 'Foret communale', key:'FC'},
      {libelle: 'Foret communautaire en convention définitive', key:'FCD'},
      {libelle: 'Foret communautaire en convention provisoire', key:'FCP'},
      {libelle: 'PEBO', key:'PEBO'},
      {libelle: 'Permis spécial', key:'PS'},
      {libelle: 'Vente de coupe', key:'VC'}
    ],
    exercices:[2019, 2020, 2021, 2022],
    naturestaxes:[
      {libelle: 'Frais prix de vente aux enchères', key:'1'}, 
      {libelle: 'Redevance forrestière annuelle', key:'2'}, 
      {libelle: 'Surtaxe à l\'exportation', key:'3'}, 
      {libelle: 'Taxe à l\'exportation', key:'4'}, 
      {libelle: 'Taxe abattage', key:'5'}, 
      {libelle: 'Taxe de Récupération', key:'6'}, 
      {libelle: 'Taxe de régénération', key:'7'}, 
      {libelle: 'Taxe de transfert', key:'8'}, 
      {libelle: 'Taxe sur le prix de vente', key:'9'}, 
      {libelle: 'Taxe TZ', key:'10'}, 
      {libelle: 'Timbres Autorisation FLEGT', key:'11'}, 
      {libelle: 'Timbres Lettres de voitures', key:'12'}, 
      {libelle: 'Timbres Lettres de voitures CEMAC', key:'13'}, 
    ],
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: false,
        // Données de la recherche
    search:{
      exercice:"",
      typeTitre:"",
      natureTaxe:"",
      notitre:"",
      periodedebut:"",
      periodefin:"",
      datedebut:"",
      datefin:"",
    },
    /*propriétés du calendar*/
    format:"yyyy-MM-dd",
    clear:true,
    placeholderddebut:"date de début",
    placeholderdfin:"date de fin",
    value:"",

    //données du tableaux
    fieldstitresrfa: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'opérateur', thStyle:"width:10%" },{ key: 'typetitre', label: 'Type Titre' }, { key: 'numtitre', label: 'N° du Titre' }, 
       { key: 'dateattribution', label: 'Attribué le' }, { key: 'exercice', label: 'Exercice' }, { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, { key: 'rfa', label: 'RFA',thStyle:"width:10%" }, { key: 'offre', label: 'Offre',thStyle:"width:8%" }, { key: 'superficier', label: 'Superficie' }
      ],
    titresrfa:[],
    fieldsecheances: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, { key: 'rfa', label: 'RFA', thStyle:"width:25%" }, 
    ],
    elementsecheances:[],
    fieldsrecouvrement:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },{ key: 'intitullearondissement', label: 'Arrondissement' }, { key: 'part', label: 'Part' }, 
       { key: 'uniteR', label: 'Unité UR' }, { key: 'superficier', label: 'Superficie' }, { key: 'rfa', label: 'RFA' }
    ],
    elementsrecouvrement:[],
    fieldstitrestt: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:10%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:10%" }, 
       { key: 'taxetransfert', label: 'Taxe de transfert',thStyle:"width:12%" }, 
       { key: 'superficier', label: 'Superficie' },
       { key: 'numtitre', label: 'N° du Titre' }, 
       { key: 'typetitre', label: 'Type Titre' }, 
       { key: 'dateattribution', label: 'Attribué le' }, 
      ],
      // TT
    elementstitrestt: [],
    fieldsecheancesTT: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesTT:[],
    fieldsrecouvrementTT:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementTT:[],
    // TR
    fieldstitrestr: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:10%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:5%" }, 
       { key: 'taxeregeneration', label: 'Taxe de regénération',thStyle:"width:14%" }, 
       { key: 'tonnage', label: 'Tonnage' },
       { key: 'numtitre', label: 'N° du Titre' }, 
       { key: 'typetitre', label: 'Type Titre' }, 
       { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitrestr: [],
    fieldsecheancesTR: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesTR:[],
    fieldsrecouvrementTR:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementTR:[],
    // TRE
    fieldstitrestre: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:10%" }, 
       { key: 'taxerecuperation', label: 'Taxe de récupération',thStyle:"width:15%" },
       { key: 'numtitre', label: 'N° Titre' }, 
       { key: 'typetitre', label: 'Type Titre' }, 
       { key: 'volume', label: 'Volume' },
       { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitrestre: [],
    fieldsecheancesTRE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesTRE:[],
    fieldsrecouvrementTRE:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementTRE:[],
    // PV
    fieldstitresPV: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
       { key: 'numtitre', label: 'N° Titre' }, 
       { key: 'typetitre', label: 'Type Titre' },
       { key: 'superf-volume', label: 'Superficie/volume' },
       { key: 'prixvente', label: 'Prix de vente' }, 
      //  { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitrespv: [],
    fieldsecheancesPV: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesPV:[],
    fieldsrecouvrementPV:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementPV:[],
    // FPVE
    fieldstitresFPVE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
       { key: 'numtitre', label: 'N° Titre' }, 
       { key: 'typetitre', label: 'Type Titre' },
      //  { key: 'superf-volume', label: 'Superficie/volume' },
       { key: 'fraisventesencheres', label: 'Frais de vente aux enchères' }, 
       { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitresfpve: [],
    fieldsecheancesFPVE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesFPVE:[],
    fieldsrecouvrementFPVE:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementFPVE:[],
    // SE
    fieldstitresSE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
       { key: 'bse', label: 'BSE' }, 
       { key: 'surtaxe', label: 'Surtaxe exportation' },
       { key: 'volume', label: 'Volume grumes' },
      //  { key: 'fraisventesencheres', label: 'Frais de vente aux enchères' }, 
      //  { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitresse: [],
    fieldsecheancesSE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesSE:[],
    // TE
    fieldstitresTE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
      //  { key: 'bse', label: 'BSE' }, 
       { key: 'taxeexportationbse', label: 'Taxe exportation BSE' },
       { key: 'volume', label: 'Volume débités' },
      //  { key: 'fraisventesencheres', label: 'Frais de vente aux enchères' }, 
      //  { key: 'dateattribution', label: 'Attribué le' }, 
      ],
    elementstitreste: [],
    fieldsecheancesTE: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesTE:[],
    fieldsrecouvrementTE:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementTE:[],
    // LV
    fieldstitresLV: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
       { key: 'typefacture', label: 'Type facture ' }, 
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
      //  { key: 'bse', label: 'BSE' }, 
      //  { key: 'taxeexportationbse', label: 'Taxe exportation BSE' },
       { key: 'timbresLV', label: 'Timbres lettres de voiture' },
      //  { key: 'fraisventesencheres', label: 'Frais de vente aux enchères' }, 
       { key: 'nombredetimbres', label: 'Nombres de timbres' }, 
      ],
    elementstitresLV: [],
    fieldsecheancesLV: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesLV:[],
    fieldsrecouvrementLV:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementLV:[],
    // FLEGT
    fieldstitresFLEGT: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'operateur', label: 'Opérateur', thStyle:"width:10%" },
      //  { key: 'typefacture', label: 'Type facture ' }, 
       { key: 'dateemmission', label: 'Date émission ' }, 
       { key: 'numtr', label: 'TR N°' }, 
       { key: 'exercice', label: 'Exercice',thStyle:"width:5%" }, 
       { key: 'mois', label: 'Mois',thStyle:"width:15%" },
      //  { key: 'bse', label: 'BSE' }, 
      //  { key: 'taxeexportationbse', label: 'Taxe exportation BSE' },
       { key: 'timbresFLEGT', label: 'Timbres autorisation FLEGT' },
      //  { key: 'fraisventesencheres', label: 'Frais de vente aux enchères' }, 
       { key: 'nombredetimbres', label: 'Nombres de timbres' }, 
      ],
    elementstitresFLEGT: [],
    fieldsecheancesFLEGT: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'dateechange', label: 'Echéance', thStyle:"width:10%" },{ key: 'montant', label: 'Montant', thStyle:"width:25%" }, 
    ],
    elementsecheancesFLEGT:[],
    fieldsrecouvrementFLEGT:[
      { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'beneficiare', label: 'Bénéficiaire',thStyle:"width:35%" },
        { key: 'part', label: 'Part' },
    ],
    elementsrecouvrementFLEGT:[],
    selected:{},
    entite:{
      id:1,
      libelle:""
    },
    
    //SECTION TRITRES TA
    fieldstitresta: [
       { key: 'index', label: '', thStyle:"width:2%" },
       { key: 'intituleorganisation', label: 'Intitulé', thStyle:"width:10%" },{ key: 'datefacture', label: 'Date Facture' }, { key: 'exercice', label: 'Exercice' }, 
       { key: 'mois', label: 'Mois' }, { key: 'numpermis', label: 'N° du permis' }, { key: 'taxeabattage', label: 'Taxe d\'abattage' }, 
       { key: 'volume', label: 'Volume' }, { key: 'numtitre', label: 'N° du Titre',thStyle:"width:10%" }, { key: 'typetitre', label: 'Type de Titre',thStyle:"width:8%" },
      { key: 'dateattribution', label: 'Date Attribution' }, { key: 'numufa', label: 'Num ufa' }, { key: 'numufe', label: 'Num ufe' }
      ],
    titresta:[],
  }),
  watch: {
    section(value) {
        if (value == 'titres_rfa') {
            this.getTitresRFA()
        }
        if (value == 'titres_ta') {
            this.getTitresTA()
        }
        if (value == 'cautions') {
            this.getCautions()
        }
        if (value == 'depots') {
            this.getDepots()
        }
        if (value == 'indexes') {
            this.getIndexes()
        }
    },
    titresrfa(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    }
        
    },
  computed:{
    ...mapGetters(['user','hasAccess'])                                                                                                                                                                              ,   

    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    itemstitresrfa() { 
      return this.titresrfa.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsecheances() { 
      return this.elementsecheances.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemstitresrecouvrements() { 
      return this.elementsrecouvrement.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemstitresta(){
          return this.titresta.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
     ...mapGetters(['user'])
  },
 
 methods: {
      // tabs methodes
    scroll_left() {
      let content = document.querySelector("#tabs__BV_tab_controls_");
      content.scrollLeft -= 200;
      console.log("=========================");
      console.log($('#tabs__BV_tab_controls_').css('width'));
      console.log("=========================");
    },
    scroll_right() {
      let content = document.querySelector("#tabs__BV_tab_controls_");
      content.scrollLeft += 200;
    },

    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },

    onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
      if(!php.empty(items)){
        this.elementsecheances = items[0].echangeTitreRcvDtos
        this.formatcontentsecheances();
        this.elementsrecouvrement = items[0].repationTitreRcvDtos
        this.formatcontentrepartition();
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
    changePage(page) {
      this.currentPage = page
      this.getPays()
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
    reset(){
      console.log('à définir');
    },
    filterTable(){
      console.log('à définir');
    },
    formatcontent(){
      this.titresrfa.map(elt =>{
        elt.operateur = elt.operateur == null ? "" : elt.operateur.substring(0, 10) + '...'
        elt.dateattribution = elt.dateattribution !==null ? this.$dayjs(elt.dateattribution).format('DD/MM/YYYY') :""
        elt.dateemmission = elt.dateemmission !==null ? this.$dayjs(elt.dateemmission).format('DD/MM/YYYY') :""
        elt.rfa = elt.rfa == null ? "" : this.commify(elt.rfa) + ' XAF'
        elt.offre = elt.offre == null ? "" : this.commify(elt.offre) + ' XAF'
        elt.superficier = elt.superficier == null ? "" : this.commify(elt.superficier)

        

        
      } )
    },
    formatcontentsecheances(){
      this.elementsecheances.map( elt =>{
        elt.dateechange = elt.dateechange !==null ? this.$dayjs(elt.dateechange).format('DD/MM/YYYY') :""
        elt.montant = elt.montant == null ? "" : this.commify(elt.montant) + ' XAF'
        elt.rfa = elt.rfa == null ? "" : this.commify(elt.rfa) + ' XAF'
      })
    },
    formatcontentrepartition(){
      this.elementsrecouvrement.map(elt=>{
        elt.uniteR = elt.uniteR == null ? "" : this.commify(elt.uniteR) + ' XAF'
        elt.superficier = elt.superficier == null ? "" : this.commify(elt.superficier)
        elt.rfa = elt.rfa == null ? "" : this.commify(elt.rfa) + ' XAF'
      }) 
      
    },
    //fonction de parse d'un montant
    commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? " " + decimalPart : "");
    },

    getTitresRFA(){
        this.isBusy =true
        this.$fiscalite.get("emmissionTitreRec/list_titreRFA").then(response => {
            this.titresrfa=response.data.result.Data
            this.formatcontent()
            this.isBusy=false
        })
        .catch((error) => {
            console.log(error)
            this.isBusy=false
        });
    },
    
    formatcontenttitresTA(){
      this.titresta.map(elt=>{
        elt.intituleorganisation = elt.intituleorganisation == null ? "" : elt.intituleorganisation.substring(0, 10) + '...'
        elt.datefacture = elt.datefacture !==null ? this.$dayjs(elt.datefacture).format('DD/MM/YYYY') :""
        elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
        elt.taxeabattage = elt.taxeabattage == null ? "" : this.commify(elt.taxeabattage) + ' XAF'
        elt.volume = elt.volume == null ? "" : this.commify(elt.volume)
        elt.dateattribution = elt.dateattribution !==null ? this.$dayjs(elt.dateattribution).format('DD/MM/YYYY') :""
      }) 
    },
    getTitresTA(){
      this.isBusy =true
        this.$fiscalite.get("emmissionTitreRec/list_titreTA").then(response => {
            this.titresta=response.data.result.Data
            this.formatcontenttitresTA()
            this.isBusy=false
      })
      .catch((error) => {
            console.log(error)
            this.isBusy=false
      });
    },
 },

 

  mounted(){
    this.entite.libelle = this.user.profil.organisation;
    if(this.section=='titres_rfa'){
      this.getTitresRFA()
    }
  }
  }

</script>
<style scoped>
.title-fiscalite{
  font-family: 'Verdana';
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
.form-control-xxs {
  height: calc(1em + .400rem + 1px) !important;
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
  padding:0 5px;
  border-radius: .25rem;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
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
  cursor:pointer;
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>
<style>

#tabs__BV_tab_controls_{
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  padding: 0!important;
}
.contents {
  padding: 4px 2px;
}

.arrow-left{
  position: absolute;
  top: 10px;
  left: -5px;
}

.arrow-right{
  position: absolute;
  top: 10px;
  right: -5px;
}

.arrow-left, .arrow-right {
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  background-color: rgb(0, 82, 44)!important;
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