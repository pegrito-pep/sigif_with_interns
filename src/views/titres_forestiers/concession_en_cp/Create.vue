<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Concéssion provisoire</h4></b-col>
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="addTitreCP" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN CP-->
          <div>
              <b-row class="m-4">
                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span>Type de titre</b-col>
                    <b-col cols="6">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="CP" selected disabled> concéssion en convention provisoire</option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span> Entité forrestière</b-col>
                    <b-col cols="6">
                      <v-select :options="paginatedEntites" v-model="form.organisation" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                            <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="5">
                  <b-row class="m-2">
                    <b-col cols="7" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span> Concession forrestière n°</b-col>
                    <b-col cols="5">
                      <input class="system-input-nom-promoteur"  v-model="form.numtitre"  size="sm"  placeholder="" type="text"/>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="7">Superficie Total (ha)</b-col>
                    <b-col cols="5">
                      <b-form-input v-model="form.superficie" name="superficie" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>


              <b-tabs id="tabs" class="w-100" >
              
                <b-tab class="contents" @click.prevent="section = 'initialtab'" title="Concession en convention provisoire">
                  <b-row class="w-100 mx-3 d-flex justify-content-between">
                  
                    <b-col cols="4">
                      <div role="group" class="form-row form-group" id="__BVID__4063">
                        <label style="margin-top: -12px" for="input-sm" class="col-lg-4 col-4 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4063__BV_label_"><span style="color: red; font-size:1rem;">*</span>Arreté d'attribution</label>
                        <div class="col">
                          <input v-model="form.arreteattribution" name="code" type="text" placeholder="" class="w-50 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4064"><div data-v-473ba422="" id="montantoffre" class="invalid-feedback">
                          </div>
                        </div>
                      </div>
                      <div role="group" class="form-row form-group" id="__BVID__4064">
                        <label for="input-sm" style="margin-top: -12px" class="col-lg-4 col-4 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4064__BV_label_"><span style="color: red; font-size:1.5rem;">*</span> Montant Offre</label>
                        <div class="col">
                          <input v-model="form.montantoffre" name="montantoffre" type="text" placeholder="" class="w-50 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4064"><div data-v-473ba422="" id="montantoffre" class="invalid-feedback">
                          </div>
                        </div>
                      </div>
                  
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="N° cautionnement" label-for="input-sm">
                        <b-form-input v-model="form.numcautionnement" name="numcautionnement" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                      </b-form-group>
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Montant total de la RFA" label-for="input-sm">
                          <span class="font-weight-bold">{{ montantotalRFA }}</span>
                      </b-form-group>
                      <b-button
                        :class="visibleappeloffre ? null : 'collapsed'"
                        :aria-expanded="visibleappeloffre ? 'true' : 'false'"
                        aria-controls="collapse-appel-offre"
                        @click="visibleappeloffre=!visibleappeloffre" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visibleappeloffre, 'collapse-close': !visibleappeloffre }"><span class="font-weight-bold">Avis d'appel d'offres</span></li></ul>  
                      </b-button>
                      <b-collapse id="collapse-appel-offre" v-model="visibleappeloffre">
                        <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                          <b-form-input v-model="form.numappeloffre" name="numappeloffre" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                        </b-form-group>
                        <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                          <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateappeloffre">
                        </b-form-group>
                        <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                          <div class="upload-container">
                            <label>
                              <input type="file" @change="selectappeloffre"/>
                              <b-img src="@/assets/images/download.png"></b-img>
                              
                              <span v-if="fileAppelOffre" class="file-name">{{ fileAppelOffre.name }}</span>
                              <span v-else class="title">cliquer pour choisir</span>
                            </label>
                          </div>
                          <!--<input type="file" @change="selectappeloffre" id="fileappeloffre"/>-->
                        </b-form-group>
                      </b-collapse>
                    </b-col>
  
                    <b-col cols="4">
                      <b-form-group label-cols="8"  label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date de cautionnement" label-for="input-sm">
                        <input type="date" class="w-75 form-control quota_input_text" v-model="form.datecautionnement">
                      </b-form-group>
                      <div role="group" class="form-row form-group" id="__BVID__4066">
                        <label style="margin-top: -12px" for="input-sm" class="col-lg-6 col-6 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4066__BV_label_"><span style="color: red; font-size:1.5rem;">*</span>Date d'attribution</label>
                        <div class="col">
                          <input v-model="form.dateattributionprov" name="dateattribution" type="date" placeholder="" class="w-75 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4066"><div data-v-473ba422="" id="dateattribution" class="invalid-feedback">
                          </div>
                        </div>
                      </div>
                      <div role="group" class="form-row form-group" id="__BVID__4067">
                        <label style="margin-top: -12px" for="input-sm" class="col-lg-6 col-8 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4067__BV_label_"><span style="color: red; font-size:1.5rem;">*</span>Date fin cautionnement</label>
                        <div class="col">
                          <input v-model="form.datefincautionnement" name="datefincautionnement" type="date" placeholder="" class="w-75 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4067"><div data-v-473ba422="" id="datefincautionnement" class="invalid-feedback">
                          </div>
                        </div>
                      </div>

                    
                      
                      <b-form-group style="visibility:hidden" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Durée de la convention" label-for="input-sm">
                        <!--<b-form-input v-model="form.dureeconvention" name="" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" />-->
                      </b-form-group>
  
                      <b-button
                        :class="visiblerecepissedepot ? null : 'collapsed'"
                        :aria-expanded="visiblerecepissedepot ? 'true' : 'false'"
                        aria-controls="collapse-appel-offre"
                        @click="visiblerecepissedepot=!visiblerecepissedepot" class="p-0 m-0" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visiblerecepissedepot, 'collapse-close': !visiblerecepissedepot }"><span class="font-weight-bold">Récépissé du dépot des dossiers</span></li></ul>  
                      </b-button>
                      <b-collapse id="collapse-appel-offre" v-model="visiblerecepissedepot">
                        <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                          <b-form-input v-model="form.numdepot" name="numdepot" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                        </b-form-group>
                        <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                          <!--<date-picker  v-model="form.datedepot"  format="DD-MM-YYYY" placeholder="ex: 2021-10-21"  valueType="YYYY-MM-DD" class="w-50" :clearable="false"/>-->
                          <input type="date" class="w-50 form-control quota_input_text" v-model="form.datedepot">
                        </b-form-group>
                        <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                          <div class="upload-container">
                            <label>
                              <input type="file" @change="selectrecepissedepot"/>
                              <b-img src="@/assets/images/download.png"></b-img>
                              
                              <span v-if="fileRecepisse" class="file-name">{{ fileRecepisse.name }}</span>
                              <span v-else class="title">cliquer pour choisir</span>
                            </label>
                          </div>
                        </b-form-group>
                      </b-collapse>
                    </b-col>
  
                    <b-col cols="4">
                      <div role="group" class="form-row form-group" id="__BVID__4069">
                        <label style="margin-top: -12px" for="input-sm" class="col-lg-4 col-4 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4069__BV_label_"><span style="color: red; font-size:1.5rem;">*</span>Durée Convention</label>
                        <div class="col">
                          <input v-model="form.dureeconvention" name="dureeconvention" type="text" placeholder="" class="w-50 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4069"><div data-v-473ba422="" id="dureeconvention" class="invalid-feedback">
                          </div>
                        </div>
                      </div>                     
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="Joindre convention" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectconventionexploitationfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileConventionExploitation" class="file-name">{{ fileConventionExploitation.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="Joindre la caution" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectcautionfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileCaution" class="file-name">{{ fileCaution.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
      
                      <b-form-group style="visibility:hidden" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Durée de la convention" label-for="input-sm">
                        <!--<b-form-input v-model="form.dureeconvention" name="" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder="" />-->
                      </b-form-group>
                      <b-button
                        :class="visibleplanapprov ? null : 'collapsed'"
                        :aria-expanded="visibleplanapprov ? 'true' : 'false'"
                        aria-controls="collapse-appel-offre"
                        @click="visibleplanapprov=!visibleplanapprov" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visibleplanapprov, 'collapse-close': !visibleplanapprov }"><span class="font-weight-bold">Plan d'approvissionnement alimentaire</span></li></ul>  
                      </b-button>
                      <b-collapse id="collapse-appel-offre" v-model="visibleplanapprov">
                        <b-form-group class="w-75" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                          <b-form-input v-model="form.numplan" name="numplan" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                        </b-form-group>
                        <b-form-group class="w-75" label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                          <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateplan">
                        </b-form-group>
                        <b-form-group  label-cols="3" label-cols-lg="3" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                          <div class="upload-container">
                            <label>
                              <input type="file" @change="selectfileapprov"/>
                              <b-img src="@/assets/images/download.png"></b-img>
                              
                              <span v-if="fileApprov" class="file-name">{{ fileApprov.name }}</span>
                              <span v-else class="title">cliquer pour choisir</span>
                            </label>
                          </div>
                        </b-form-group>
                      </b-collapse>
                    </b-col>
  
                  </b-row>
                  <b-row class="mx-3">
                    <b-col cols="8">
                      <b-button
                      :class="visiblenoteservicebraconnage ? null : 'collapsed'"
                      :aria-expanded="visiblenoteservicebraconnage ? 'true' : 'false'"
                      aria-controls="collapse-braconnage"
                      @click="visiblenoteservicebraconnage=!visiblenoteservicebraconnage" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visiblenoteservicebraconnage, 'collapse-close': !visiblenoteservicebraconnage }">
                          <span class="font-weight-bold">Note de service précisant l'interdiction du braconnage et du transport de la viand de brousse</span></li>
                        </ul>  
                      </b-button>
                      <b-collapse id="collapse-braconnage" v-model="visiblenoteservicebraconnage">
                      <b-form-group class="w-50" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                        <b-form-input v-model="form.numservicebraconnage" name="numservicebraconnage" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
  
                      </b-form-group>
                      <b-form-group class="w-50" label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateservicebraconnage">
                      </b-form-group>
                      <b-form-group class="w-50"  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <!--<input type="file" @change="selectbraconnageregulationfile" id="fileregulationbraconnage"/>-->
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectbraconnageregulationfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileRegulation" class="file-name">{{ fileRegulation.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      </b-collapse>
                    </b-col>
                    <b-col>
                      <b-button
                      :class="visiblenoteservicesanctions ? null : 'collapsed'"
                      :aria-expanded="visiblenoteservicesanctions ? 'true' : 'false'"
                      aria-controls="collapse-sanctions"
                      @click="visiblenoteservicesanctions=!visiblenoteservicesanctions" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                      <ul><li :class="{ 'collapse-open': visiblenoteservicesanctions, 'collapse-close': !visiblenoteservicesanctions }">
                        <span class="font-weight-bold">Note de service prévoyant les sanctions éventuelles</span></li>
                      </ul>  
                      </b-button>
                      <b-collapse id="collapse-sanctions" v-model="visiblenoteservicesanctions">
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                        <b-form-input v-model="form.numnotesanction" name="numnotesanction" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                      </b-form-group>
                      <b-form-group  label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="form.datenotesanction">
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" ref="filesanctions" @change="selectsanctionfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileSanction" class="file-name">{{ fileSanction.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      </b-collapse>
                    </b-col>
                  </b-row>
                   
                </b-tab>
                <b-tab class="contents" @click.prevent="section = 'localisation'" title="Localisation Concession en convention provisoire">
                  <b-row style="border-bottom: 2px solid green">
                    <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Répartition des superficies par Arrondissement</h3></b-col>
                    <b-col class="col-md-auto liens">
                        <span>
                          <a @click.prevent="AddFieldLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                          <a @click.prevent="RemouveAllFieldsLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                        </span>
                    </b-col>
                  </b-row>
                  <div style="width:60%">
                    <b-overlay rounded="sm" :show="showOverlayLocalisation">
                      <b-table height="50px" :items="itemslocation"  :fields="fieldslocalisation" :busy="showOverlayLocalisation" class="mt-1" outlined   ref="selectableTablelocation" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                        <template #cell(idarrondissement)="data">
                          <div style="width:80%">
                            <v-select v-model="data.item.idarrondissement" :options="paginatedArrondissements"
                              @input="loadOtherDataLocation(0, data.item.idarrondissement)"  :filterable="false" @search="onSearchLocalisation" :reduce="elt=>elt.idarrondissement" label="intitule" class="custom-select-type_titre  sigif-select" style="color:black!important; font-weight:bold">
                              <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPageArrondissements" @click="offsetArrondissements -= limitArrondissements">Prèc.</button>
                                <button :disabled="!hasNextPageArrondissements" @click="offsetArrondissements += limitArrondissements">Suiv.</button>
                              </li>
                            </v-select>
                          </div>
                        </template>
                        <template #cell(departement)="data">
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.departement" />
                        </template>
                        <template #cell(region)="data">
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.region" />
                        </template>
                        <template #cell(action)="data">
                          <b-button size="sm" class="d-flex justify-content-center" v-b-tooltip.hover title="enlever" @click.prevent="RemouveFieldLocalisation(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                        </template>
                      </b-table>
                    </b-overlay>
                  </div>
                </b-tab>
                <b-tab class="contents" @click.prevent="section = 'contrat'" title="Contrat de partenariat industriel">
                  <b-row style="border-bottom: 2px solid green">
                    <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Répartittion des superficies par Arrondissement</h3></b-col>
                    <b-col class="col-md-auto liens">
                        <span>
                          <a @click.prevent="AddFieldContrat" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                          <a @click.prevent="RemouveAllFieldsContrat" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                        </span>
                    </b-col>
                  </b-row>
                  <div style="width:96%">
                    <b-table height="50px" :items="itemscontrat"  :fields="fieldscontrat" :busy="isBusy" class="mt-1" outlined   ref="selectableTablecontrat" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                      <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      <template #cell(organisation)="data">
                        <div style="width:99%">
                          <v-select @input="setOtherFieldsContrat(data.item.arrondissement)" :options="paginatedArrondissements" v-model="data.item.arrondissement" @search="onSearchArrondissement" label="libelle" class="custom-select-type_titre">
                            <template #option="{ libelle, nomdepartement, nomregion }">
                                <span class="font-weight-bold" style="color: black!important">{{ libelle }}</span>
                                <br />
                                <span class="text-muted"> {{ nomdepartement }}/ {{ nomregion }}</span>
                            </template>
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageArrondissements" @click="offsetArrondissements -= limitArrondissements">Prèc.</button>
                              <button :disabled="!hasNextPageArrondissements" @click="offsetArrondissements += limitArrondissements">Suiv.</button>
                            </li>
                          </v-select>
                        </div>
                        
                      </template>
                      <template #cell(sigle)="data">
                        <h5 class="font-weight-bold text-white">{{ data.item.sigle }}</h5>
                      </template>
                      <template #cell(numcontrat)="data">
                        <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numcontrat" />
                      </template>
                      <template #cell(datecontrat)="data">
                        <input type="date" size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.datecontrat" />
                      </template>
                      <template #cell(numacteapprobation)="data">
                        <input  size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numacteapprobation" />
                      </template>
                      <template #cell(dateacteapprobation)="data">
                        <input type="date" size="xs" class="w-50 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dateacteapprobation" />
                      </template>
                      <template #cell(action)="data">
                        <b-button size="sm" class="d-flex justify-content-center" v-b-tooltip.hover title="enlever" @click.prevent="RemouveFieldLocalisation(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                      </template>
                    </b-table>
                  </div>
                </b-tab>
               
                
             
                
                
               
                
             
              </b-tabs>
              <!--<div class="p-4 mb-5">
                <b-button @click.prevent="addTitre" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
                <b-button @click.prevent="addTitreAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedContinue" >
                  Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedContinue" small></b-spinner></b-button>
              </div>-->
              <error-dialogue ref="errorDialogue"></error-dialogue>

          </div>
        </div>
      </b-overlay>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      <created-box ref="createdDialogue"></created-box>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import CreatedBox from '@/components/utils/Created.vue';

const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"titre-cp-convention-form",
  components:{ ErrorDialogue, CodeBarreInfo, CreatedBox},
   computed: {     
    ...mapGetters(['user','hasAccess']),
    valuesSetCorrectly() {
      return ( !php.empty(this.form.typetitre)&&!php.empty(this.form.numtitre)&&!php.empty(this.form.organisation)&&
      !php.empty(this.form.arreteattribution)&&!php.empty(this.form.montantoffre)&&!php.empty(this.form.dateattributionprov)&&
      !php.empty(this.form.dureeconvention)&&!php.empty(this.form.dureeconvention));
    },
    filteredEntites() {
        return this.entiteswithoutminfof.filter((entite) =>
            entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
        )
    },
    paginatedEntites() {
        return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
    },
    hasNextPageEntites() {
        const nextOffset = this.offsetEntites + this.limitEntites
        return Boolean(
            this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
        )
    },
    hasPrevPageEntites() {   
        const prevOffset = this.offsetEntites - this.limitEntites
        return Boolean(
            this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
        )
    },
    itemslocation() { 
      return this.elementslocation.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemscontrat(){
      return this.elementscontrat.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    filteredArrondissements() {
      return this.arrondissements.filter((arrondissement) =>
      arrondissement.intitule.toLocaleLowerCase().includes(this.searcharrond.toLocaleLowerCase())
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
    montantotalRFA(){
      return this.form.superficie * this.form.montantoffre
    },
    filteredTitres() {
          return this.titres.filter((titre) =>
            titre.numtitre.toLocaleLowerCase().includes(this.searchtitre.toLocaleLowerCase())
          )
    },
    paginatedTitres() {
      return this.filteredTitres.slice(this.offsetTitres, this.limitTitres + this.offsetTitres)
    },
    hasNextPageTitres() {
      const nextOffset = this.offsetTitres + this.limitTitres
      return Boolean(
        this.filteredTitres.slice(nextOffset, this.limitTitres + nextOffset).length
      )
    },
    hasPrevPageTitres() {   
      const prevOffset = this.offsetTitres - this.limitTitres
      return Boolean(
        this.filteredTitres.slice(prevOffset, this.limitTitres + prevOffset).length
      )
    },


    filtered() {
          return this.arrondissements.filter((arrond) =>
            arrond.intitule.toLocaleLowerCase().includes(this.searcharrond.toLocaleLowerCase())
          )
    },
    paginated() {
      return this.filtered.slice(this.offset, this.limit + this.offset)
    },
    hasNextPage() {
      const nextOffset = this.offset + this.limit
      return Boolean(
        this.filtered.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offset - this.limit
      return Boolean(
        this.filtered.slice(prevOffset, this.limit + prevOffset).length
      )
    },
    itemslocation() { 
      return this.elementslocation.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
   },

   data: () => ({
    isBusy:false,
    isbusyLocation:false,
     section: 'initialtab',
     arrondissements:[],
     showOverlayLocalisation:false,
     fieldslocalisation:[
        { key: 'index', label: '',thStyle: { width: "2%" } },
        { key: 'idarrondissement', label : 'Arrondissement',thStyle: { width: "40%" } },
        { key: 'departement', label: 'Département' ,thStyle: { width: "35%" }}, 
        { key: 'region', label: 'région',thStyle: { width: "25%" } },
        { key: 'action', label: '',thStyle: { width: "5%" } },
     ],
    elementslocation:[{ idarrondissement: '',departement: '', region: '' }],
    arrondissements:[],
    searcharrond:'',
    offsetArrondissements:0,
    limitArrondissements:10,
    arrondissement:null,
    showOverlayLocalisation:false,

      amount: '',

      elementslocation:[{ arrondissement: '',departement: '', region: '' }],
      elementsLocationSelected:[],
      fieldscontrat:[
        { key: 'index', label: '',thStyle: { width: "1%" } },
        { key: 'organisation', label : 'Raison Sociale',thStyle: { width: "28%" } },
        { key: 'sigle', label: 'Sigle' ,thStyle: { width: "6%" }}, 
        { key: 'numcontrat', label: 'N° du contrat',thStyle: { width: "12%" } },
        { key: 'datecontrat', label: 'Date du contrat',thStyle: { width: "13%" } },
        { key: 'numacteapprobation', label: 'Acte d\'approbation n°',thStyle: { width: "19%" } },
        { key: 'dateacteapprobation', label: 'Date Acte d\'approbation n°' },
        { key: 'action', label: '',thStyle: { width: "3%" } },
      ],
      elementscontrat:[],
      selected:null,
      form: {
        typetitre: "CP",
        numtitre: "", // string, obligatoire
        organisation: "", // int, obligatoire
        superficie: "", // int, non obligatoire
        arreteattribution: "", // string, non obligatoire
        dateattributionprov: "", // string (format: YYYY-MM-DD), non obligatoire
        montantoffre: "",
        numcautionnement: "", // string, non obligatoire
        datecautionnement: "", // string (format: YYYY-MM-DD), non obligatoire
        datefincautionnement: "", // string (format: YYYY-MM-DD), non obligatoire
        dureeconvention: "",
        fichiercaution: "", // string (base64), non obligatoire
        fichierconventionexploitation: "", // string (base64), non obligatoire
        numappeloffre: "", // string, non obligatoire
        dateappeloffre: "", // string (format: YYYY-MM-DD), non obligatoire
        documentappeloffre: "", // string (base64), non obligatoire
        numdepot: "", // string, non obligatoire
        datedepot: "", // string (format: YYYY-MM-DD), non obligatoire
        documentdepot: "", // string (base64), non obligatoire
        numplan: "", // string, non obligatoire
        dateplan: "", // string (format: YYYY-MM-DD), non obligatoire
        documentplan: "", // string (base64), non obligatoire
        numservicebraconnage: "", // string, non obligatoire
        dateservicebraconnage: "", // string (format: YYYY-MM-DD), non obligatoire
        documentservicebraconnage: "", // string (base64), non obligatoire
        numnotesanction: "", // string, non obligatoire
        datenotesanction: "", // string (format: YYYY-MM-DD), non obligatoire
        documentnotesanction: "", // string (base64), non obligatoire

        arrondissement:"",

       
      },
      fileSanction:"",
      fileRegulation :"",
      fileConventionExploitation:"",
      fileCaution:"",
      fileAppelOffre:"",
      fileRecepisse:"",
      fileApprov:"",
      entite:{
        id:1,
        libelle:''
      },

      titres:[],
      searcharrond:"",
      searchtitre:"",
      offset: 0,
      limit: 10,
      offsetTitres: 0,
      limitTitres: 10,
      section: "concession",
      submitted:false,
      submittedContinue:false,
      visibleappeloffre: true,
      visiblerecepissedepot:true,
      visibleplanapprov:true,
      visiblenoteservicebraconnage:true,
      visiblenoteservicesanctions:false,

      // Données du tableau
      fieldsLocation: [{ arrondissement: '',departement: '', region: '' }],
      fielsContrat: [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", numacte:"", dateacte: ""}],
      entiteswithoutminfof:[],
      titres:[],
      showOverlay:true,
      offsetEntites: 0,
     limitEntites: 10,
     searchentite:'',
  }),
  watch:{
    section(value){
      if(value=='localisation'){
        this.getArrondissements()
      }
    },
  },
  methods: {
    async handleCreated() {
      const ok = await this.$refs.createdDialogue.show({
          title: 'Enregistrement',
          message: 'Titre crée avec succès',
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
    async addTitreCP(){
      let data={}
      data.typetitre = this.form.typetitre, data.numtitre = this.form.numtitre, data.entiteForestier = this.form.organisation.idorganisation,
      data.superficie = this.form.superficie, data.arreteattribution = this.form.arreteattribution, data.dateattributionprov = this.form.dateattributionprov,
      data.montantoffre = this.form.montantoffre, data.numcautionnement = this.form.numcautionnement, data.datecautionnement = this.form.datecautionnement,
      data.datefincautionnement = this.form.datefincautionnement, data.dureeconvention =this.form.dureeconvention
      if(!php.empty(this.elementslocation)){
        data.localisations=this.elementslocation.map( ({idarrondissement}) =>({
          idarrondissement
        }));
      }
      
      data.joindrecaution= this.form.joindrecaution, data.fichierconventionexploitation = this.form.fichierconventionexploitation,
      data.numappeloffre = this.form.numappeloffre, data.dateappeloffre = this.form.dateappeloffre, data.documentappeloffre = this.form.documentappeloffre
      data.numdepot = this.form.numdepot, data.datedepot = this.form.datedepot, data.documentdepot = this.form.documentdepot,
      data.numplan = this.form.numplan, data.dateplan = this.form.dateplan, data.documentplan = this.form.documentplan,
      data.numservicebraconnage = this.form.numservicebraconnage, data.dateservicebraconnage = this.form.dateservicebraconnage,
      data.documentservicebraconnage = this.form.documentservicebraconnage, data.numnotesanction = this.form.numnotesanction,
      data.datenotesanction = this.form.datenotesanction, data.documentnotesanction = this.form.documentnotesanction
           
      this.submitted =true;
        this.$titres.post('titres/cp', data).then(response => {
            this.submitted = false   
           App.notifySuccess(response.data.message)
           return this.handleCreated();
           return this.$router.push({ name: "concession_en_cp" });
        }).catch(error => {
          console.log('error ',error);
          if(error.response.status==400){
            return this.errorHappened('données incomplètes')
          }
          this.submitted = false
          this.errorHappened(error.response.data.message)
        })
      
     
    
    },
   
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    async getTitresCPData(){
        if (!php.empty(this.$store.state.entiteswithoutminfof)) {
              this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
        } 
        else {
            try {
              this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=500").then(response => response.data.result.items);
              this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
            } catch (error) {
            App.notifyError(error.message);
            }
        }
        this.showOverlay=false;
    }, 
    //chargement autres données localisation
    async loadOtherDataLocation(index,data){
      console.log('data',data);
        this.showOverlayLocalisation = true;
        try{
          if(php.empty(data)){
            this.elementslocation[index].departement='';
            this.elementslocation[index].region='';
            this.showOverlayLocalisation = false;
            return
          }
          this.arrondissement=await this.$donneesReference.get(`arrondissements/${data}/departement_region`)
            .then(resp=>{
              let arr=resp.data.result
              console.log(this.arrondissement)
              this.elementslocation[index].departement=arr.departement;
              this.elementslocation[index].region=arr.region;
            })
        }catch(err){
          console.log(err.message)
        }
        this.showOverlayLocalisation = false;
    },
    async selectcautionfile(e){
      const cautionfile = this.fileCaution =  e.target.files[0];
      this.form.joindrecaution=await this.getBase64(cautionfile)
    },
    async selectconventionexploitationfile(e){
      const conventionfile =this.fileConventionExploitation=  e.target.files[0];
      this.form.fichierconventionexploitation=await this.getBase64(conventionfile)
    },
    async selectappeloffre(e){
      const appeloffrefile =this.fileAppelOffre= e.target.files[0];
      this.form.documentappeloffre=await this.getBase64(appeloffrefile)
    },
    async selectrecepissedepot(e){
      const recepdepotfile =this.fileRecepisse=  e.target.files[0];
      this.form.documentdepot=await this.getBase64(recepdepotfile)
    },
    async selectfileapprov(e){
      const planpprovfile =this.fileApprov= e.target.files[0];
      this.form.documentplan=await this.getBase64(planpprovfile)
    },

    async selectbraconnageregulationfile(e){
      const braconnagefile =this.fileRegulation= e.target.files[0];
      this.form.documentservicebraconnage=await this.getBase64(braconnagefile)
    },
    async selectsanctionfile(e){
      //this.fileProtocoleAccord = this.$refs.fileProtocoleAccord.files[0];
      const docsanction =this.fileSanction=e.target.files[0];
      this.form.documentnotesanction=await this.getBase64(docsanction)
    },

    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) 
      { return !this.veeErrors.has(ref);}
          return null;
    },
    fermer() {
        this.$router.back()
    },

    AddFieldLocalisation (){
      if(this.elementslocation.length<1){
        this.elementslocation.unshift({ arrondissement: "", departement: "", region:""});
        return setTimeout(() => {this.$refs['selectableTablelocation'].selectRow(0) }, 200);
      }
      else{
       for(let i=0; i<this.elementslocation.length; i++){
        if(php.empty(this.elementslocation[i].arrondissement)){
          return this.showDialogueLigne('Bien vouloir choisir l\'arrondissement')
        }
       }
        this.elementslocation.unshift({ arrondissement: "", departement: "", region:""});
        setTimeout(() => {this.$refs['selectableTablelocation'].selectRow(0) }, 200);
      }
      
    },
    setOtherFieldsLocation(arrondissement){
      if(!php.empty(arrondissement)){
        this.elementslocation[0].departement=arrondissement.nomdepartement
        this.elementslocation[0].region=arrondissement.nomregion
        this.elementsLocationSelected.unshift({idarrondissement:arrondissement.idarrondissement})
      }else{
        this.elementslocationt[0].departement=''
        this.elementslocation[0].region=''
      }
    },
    RemouveFieldLocalisation(index){
      this.elementslocation.splice(index, 1);
    },
    RemouveAllFieldsLocalisation(){
      this.elementslocation=[];
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
    onSearchLocalisation(query){
      this.searcharrond = query
      this.offsetArrondissements = 0    
    }, 
    AddFieldContrat(){
      if(this.elementscontrat.length<1){
        this.elementscontrat.unshift({ organisation: "", sigle: "", numcontrat:"", datecontrat:"", numacteapprobation:"", dateacteapprobation:""});
        return setTimeout(() => {this.$refs['selectableTablelocation'].selectRow(0) }, 200);
      }
      else{
       for(let i=0; i<this.elementslocation.length; i++){
        if(php.empty(this.elementslocation[i].idarrondissement)){
          return this.showDialogueLigne('Bien vouloir choisir l\'organisation')
        }
       }
        this.elementslocation.unshift({ arrondissement: "", departement: "", region:""});
        setTimeout(() => {this.$refs['selectableTablecontrat'].selectRow(0) }, 200);
      }
      
    },
    setOtherFieldsContrat(organisation){
      if(!php.empty(organisation)){
        this.elementscontrat[0].sigle=organisation.sigle
      }else{
        this.elementscontrat[0].sigle=''
      }
    },
    RemouveFieldContrat(index){
      this.elementscontrat.splice(index, 1);
    },
    RemouveAllFieldsContrat(){
      this.elementscontrat=[];
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
    /**Récupération des titres de type Permis de bois d'oeuvre*/
    getTitres(){
      this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$titres.get("titres/cp?size=400", {params}).then(response => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.titres=response.data.result.items
          if(php.empty(this.titres)){
            this.submitted=true;
            this.submittedContinue=true;
            this.alertNoTile();
          }
        this.isBusy=false
      })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });

    },   
    
    async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "Permis Spécial",
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
    async getArrondissements(){
      this.isbusyLocation=true
      if (!php.empty(this.$store.state.arrondissements)) {
        this.arrondissements = this.$store.state.arrondissements;
      } 
      else {
        try {
          this.arrondissements= await this.$donneesReference.get("arrondissements?size=400").then(response => response.data.result.items);
          this.$store.dispatch('arrondissements', this.arrondissements)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      console.log('arrondissements ',this.arrondissements);
      this.isbusyLocation=false
    }, 
    onSearchArrondissement(query){
      this.searcharrond = query
      this.offsetArrondissements = 0
    }, 

    getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
    },
     
      controleChange() {
          console.log("Somethings change");
      },
      resetForm() {
          this.form = {
            typetitre: "CP", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
            dateattributionprov: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
            dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
            numappeloffre: "", dateappeloffre: "", documentappeloffre: "",
            numdepot: "",  datedepot: "", documentdepot: "", numplan: "", 
            dateplan: "", documentplan: "", numservicebraconnage: "", 
            dateservicebraconnage: "", documentservicebraconnage: "", numnotesanction: "", 
            datenotesanction: "",documentnotesanction: "", arrondissement:""
          };
      },
      resetFormContinue() {
          this.form = {
            typetitre: "CP",superficie: "", arreteattribution: "", 
             montantoffre: "", numcautionnement: "",
            dureeconvention: "", numappeloffre: "",  
            numdepot: "",  datedepot: "", numplan: "", 
             documentplan: "", numservicebraconnage: "", 
             documentservicebraconnage: "", 
            documentnotesanction: ""
          };
      },

      async errorHappened(error) {
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: "erreur interne interne du serveur",
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
          this.selected = items     
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
      onSearchTitres(query) {
        this.searchtitre = query
        this.offsetTitres = 0
      },
      onSearch(query) {
        this.searcharrond = query
        this.offset = 0
      },
     
  },
   async mounted() {
    await this.getTitresCPData()
    //this.getTitres();
  },

}
</script>


<style scoped>

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
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.quota_input_text{
  height: calc(1.2rem + 2px);
  padding: .25rem .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .2rem;
}

.upload-container label input {
  display: none;
}

.setheight{
  padding: 1px 1px;

}
.nav-tabs .nav-link.active {
  background-color: rgb(0, 82, 44)!important;
  font-weight: bold;
  color: white !important;
  border-color:  rgb(0, 82, 44)!important;
}
.contents {
  padding: 10px 5px;
}

.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
}
.form-control-xs {
  height: calc(1.2rem + 2px) !important;
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
  padding:5px 5px!important;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
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
/* style des tabs */


.wrap {
  overflow: hidden;
  width: 100%;
  flex-direction: row;
  padding: 0 !important;
}
.tabs {
  position: relative;
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
  padding: 40px 20px;
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