<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
          <div>
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar">
                    <span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button>
                  <span
                    class="ml-1 font-weight-bold"
                  >Concession provisoire</span>
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
            <b-card>
              <b-row class="p-1 mb-1" style="border-bottom:3px solid green">
                <b-col cols="6">
                    <b-form-group class="p-0 m-0"
                        label="Type de titre"
                        label-cols="4"
                        label-align="right"
                    >
                        <select class="mt-2" disabled style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 1px) !important;">
                            <option v-if="titreDetails!==null">{{ titreDetails.libelletypetitre }}</option>
                        </select>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Concéssion forrestière en CP n° "
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.numtitre }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Entité forestière"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.entite }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Marteau"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.marteau }}</label>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group
                        label="Superficie totale(ha)"
                        label-cols="5"
                        label-align="right"
                    >
                        <label class="label-form mt-2"  v-if="titreDetails!==null">{{ titreDetails.superficie }}</label>
                    </b-form-group>
                </b-col>
              </b-row>
            </b-card>
            <div class="ml-3">
              <b-row class="wrap" ref="wrap">
                  <b-tabs id="tabs" class="w-100" >
                    <button class="arrow-left" @click="scroll_left">
                      <b-icon-arrow-left/>
                    </button>
                    <b-tab class="contents" @click.prevent="section = 'initialtab'">
                      <template #title>
                        <span v-if="titreDetails!==null">Concession en convention provisoire n° {{ titreDetails.numtitre }}</span>
                      </template>
                        <b-row class="mt-1">
                          <b-col sm="3">
                            <label for="input-small">Arreté attribution
                              <span class="font-weight-bold" v-if="titreDetails!=null&&titreDetails.arretedist!=null">{{ titreDetails.arretedist }}</span> 
                            </label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Date d'Attribution(prov.):</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.dateattribution!=null">{{ $dayjs(titreDetails.dateattribution).format("DD/MM/YYYY") }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>

                          <b-col sm="3">
                            <label for="input-small">Date de fin de validité:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.datefinvalidite!=null">{{ $dayjs(titreDetails.datefinvalidite).format("DD/MM/YYYY") }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Montant de l'offre </label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.montantoffrerfa!=null">{{ formatAmount(titreDetails.montantoffrerfa) }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">N° Cautionnement:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.numcautionnement!=null">{{ titreDetails.numcautionnement }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Date de Cautionnement:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.datecousionnement!=null">{{ $dayjs(titreDetails.datecousionnement).format("DD/MM/YYYY") }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Date fin de Cautionnement:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.datecousionnement!=null">{{ $dayjs(titreDetails.datecousionnement).format("DD/MM/YYYY") }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Montant total de a RFA </label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.mnttotalrfa!=null">{{ formatAmount(titreDetails.mnttotalrfa) }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">Durée de la convention:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.durreconvention!=null">{{ titreDetails.durreconvention }}</label>
                            <label  for="input-small" v-else>non défini</label>
                          </b-col>
                          <b-col sm="3">
                            <label for="input-small">N° de la notification approbation:</label>
                            <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.numnotifcaution!=null">{{ titreDetails.numnotifcaution }}</label>
                          </b-col>

                          <b-col sm="3" class="d-block">
                            <label for="input-small" class="">Caution:
                              <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.joindrecaution!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.joindrecaution"><b-img src="@/assets/images/Attach_128x128.png"></b-img> caution</a>
                            </label>
                          </b-col>
                          <b-col sm="3" class="d-block">
                            <label for="input-small" class="">convention d'exploitation:
                              <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.joindreconvexpl!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.joindreconvexpl"><b-img src="@/assets/images/Attach_128x128.png"></b-img> caution</a>
                            </label>
                          </b-col>                 
                        </b-row>
                          <b-row>
                            <b-col cols="4">
                              <b-button
                                  :class="visible ? null : 'collapsed'"
                                    :aria-expanded="visible ? 'true' : 'false'"
                                    aria-controls="collapse-4"
                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                <ul>
                                  <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Avis d'appel d'offres</li></ul>
                              </b-button>
                              <b-collapse id="collapse-4" v-model="visible">
                                <b-col>
                                    <label for="input-small">Numéro:</label>
                                    <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.avisappeloffre!=null">{{ titreDetails.detailinfo.avisappeloffre.numero }}</label>
                                  </b-col>
                                  <b-col>
                                    <label for="input-small">Date de signature:</label>
                                    <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.avisappeloffre!=null">{{ $dayjs(titreDetails.detailinfo.avisappeloffre.date_signature).format("DD/MM/YYYY") }}</label>
                                  </b-col>
                                  <b-col>
                                    <label for="input-small" class="">Document:</label>
                                      <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.detailinfo.avisappeloffre!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.detailinfo.avisappeloffre.document"><b-img src="@/assets/images/Attach_128x128.png"></b-img>document</a>
                                  </b-col>
                              </b-collapse>
                            </b-col>
                            <b-col cols="4">
                              <b-button
                                  :class="visible ? null : 'collapsed'"
                                    :aria-expanded="visible ? 'true' : 'false'"
                                    aria-controls="collapse-4"
                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                <ul>
                                  <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">récépissé du dépot des dossiers</li></ul>
                              </b-button>
                              <b-collapse id="collapse-4" v-model="visible">
                                <b-col>
                                    <label for="input-small">Numéro:</label>
                                    <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.recepissedepot!=null">{{ titreDetails.detailinfo.recepissedepot.numero }}</label>
                                  </b-col>
                                  <b-col>
                                    <label for="input-small">Date de signature:</label>
                                    <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.recepissedepot!=null">{{ $dayjs(titreDetails.detailinfo.recepissedepot.date_signature).format("DD/MM/YYYY") }}</label>
                                  </b-col>
                                  <b-col>
                                    <label for="input-small" class="">Document:
                                      <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.detailinfo.recepissedepot!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.detailinfo.recepissedepot.document"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Document</a>
                                    </label>
                                    
                                  </b-col>
                              </b-collapse>
                            </b-col>
                            <b-col cols="4">
                              <b-button
                                  :class="visible ? null : 'collapsed'"
                                    :aria-expanded="visible ? 'true' : 'false'"
                                    aria-controls="collapse-4"
                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                <ul>
                                  <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Plan d'approvisionnement alimentaire</li></ul>
                              </b-button>
                              <b-collapse id="collapse-4" v-model="visible">
                                <b-col>
                                  <label for="input-small">Numéro:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.planreapprovisionnement!=null">{{ titreDetails.detailinfo.planreapprovisionnement.numero }}</label>
                                </b-col>
                                <b-col>
                                  <label for="input-small">Date de signature:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.planreapprovisionnement!=null">{{ $dayjs(titreDetails.detailinfo.planreapprovisionnement.date_signature).format("DD/MM/YYYY") }}</label>
                                </b-col>
                                <b-col >
                                  <label for="input-small" class="">Document:
                                    <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.detailinfo.planreapprovisionnement!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.detailinfo.planreapprovisionnement.document"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Document</a>
                                  </label>
                                </b-col>
                              </b-collapse>
                            </b-col>
                          </b-row>
                          <b-row>
                      
                            <b-col cols="4">
                              <b-button
                                  :class="visible ? null : 'collapsed'"
                                    :aria-expanded="visible ? 'true' : 'false'"
                                    aria-controls="collapse-4"
                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                <ul>
                                  <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Note de service précisant l'interdiction du braconnage et du transport de viande de brousse</li></ul>
                              </b-button>
                              <b-collapse id="collapse-4" v-model="visible">
                                <b-col>
                                  <label for="input-small">Numéro:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.noteserviceinterdictionbraco!=null">{{ titreDetails.detailinfo.noteserviceinterdictionbraco.numero }}</label>
                                </b-col>
                                <b-col>
                                  <label for="input-small">Date de signature:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.noteserviceinterdictionbraco!=null">{{ $dayjs(titreDetails.detailinfo.noteserviceinterdictionbraco.date_signature).format("DD/MM/YYYY") }}</label>
                                </b-col>
                                <b-col>
                                  <label for="input-small" class="">Document:
                                    <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.detailinfo.noteserviceinterdictionbraco!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.detailinfo.noteserviceinterdictionbraco.document"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Document</a>
                                  </label>
                                </b-col>
                              </b-collapse>
                            </b-col>
                            <b-col cols="4">
                              <b-button
                                  :class="visible ? null : 'collapsed'"
                                    :aria-expanded="visible ? 'true' : 'false'"
                                    aria-controls="collapse-4"
                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border: none; background: none; color:black !important;" >
                                <ul>
                                  <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Note de service prévoyant les sanctions éventuelles</li></ul>
                              </b-button>
                              <b-collapse id="collapse-4" v-model="visible">
                                <b-col>
                                  <label for="input-small">Numéro:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.noteservicesanctions!=null">{{ titreDetails.detailinfo.noteservicesanctions.numero }}</label>
                                </b-col>
                                <b-col>
                                  <label for="input-small">Date de signature:</label>
                                  <label class="style" for="input-small" v-if="titreDetails!=null&&titreDetails.detailinfo.noteservicesanctions!=null">{{ $dayjs(titreDetails.detailinfo.noteservicesanctions.date_signature).format("DD/MM/YYYY") }}</label>
                                </b-col>
                                <b-col>
                                  <label for="input-small" class="">Document:
                                    <a class="mx-1 detail-permis-item" v-if="titreDetails!=null&&titreDetails.detailinfo.noteservicesanctions!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="titreDetails.detailinfo.noteservicesanctions.document"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Document</a>
                                  </label>
                                </b-col>
                              </b-collapse>
                            </b-col>
                          </b-row>
                          <h3 class="h3 mt-5 w-100">Détails des informations</h3>
                          <b-card class="w-100" style="background-color: transparent;">
                              <b-row class="mt-1">
                                <b-col cols="6">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2"> Liste des UFA</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableufa" selectable @row-selected="onRowSelectedufa"
                                      :items="itemsufa" 
                                      :fields="fieldsufa" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        <template #cell(numufa)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="" v-model="data.item.numufa" />
                                        </template>
                                        <template #cell(superfier)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right" :value="formatAmount(data.item.superfier)" />
                                        </template>
                                        <template #cell(limite)="data">
                                          <span v-if="data.item!=null&&data.item.limite!=null"><a v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="data.item.limite"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Limites</a></span>
                                        </template>
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>

                                <b-col cols="6">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Répartition des superficies pas arrondissement</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablelocalisationufa" selectable @row-selected="onRowSelected"
                                      :items="itemslocalisationufa" 
                                      :fields="fieldslocalisationufa" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        
                                        <template #cell(arrondissement)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="background-color:white!important" v-model="data.item.arrondissement" />
                                        </template>
                                        <template #cell(superficie)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right" :value="formatAmount(data.item.superficie)" />
                                        </template>
                                      
        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                            
                                <b-col cols="8" class="mt-5" style="overflow-x:auto;position: relative; width: 500px;">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Assiettes annuelles de coupes</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1"  style="position: relative; width: 700px;">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableaac" selectable @row-selected="onRowSelectedassiette"
                                      :items="itemsassiettes" 
                                      :fields="fieldsassiettes" 
                                      :tbody-tr-class="rowClass" show-empty>
                                        <template #empty>
                                          <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvé!!</h4>
                                        </template>
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(numaac)="data">
                                          <input disabled size="xs" class="w-50 mx-1 px-1 sigif-input-view text-right" :value="data.item.numaac" />
                                        </template>
                                        <template #cell(limite)="data">
                                          <a class="detail-permis-item" v-if="data.item!=null&&data.item.limite!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="data.item.limite"><b-img src="@/assets/images/Attach_128x128.png"></b-img> Limite</a>
                                        </template>
                                        <template #cell(materialisation)="data">
                                          <a class="detail-permis-item" v-if="data.item!=null&&data.item.materialisation!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="data.item.materialisation"><b-img src="@/assets/images/Attach_128x128.png"></b-img>Matérialisation</a>
                                        </template>
                                        <template #cell(superfier)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right" :value="data.item.superfier" />
                                        </template>  
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                                <b-col cols="4" class="mt-5">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Répartition des superficies pas arrondissement</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablelocaliteaac" selectable @row-selected="onRowSelected"
                                      :items="itemslocalisationassiette" 
                                      :fields="fieldslocalisationassiette" 
                                      :tbody-tr-class="rowClass" show-empty>
                                      <template #empty>
                                        <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvé!!</h4>
                                      </template>
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(arrondissement)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="background-color:white!important" v-model="data.item.arrondissement" />
                                        </template>
                                        <template #cell(superficie)="data">
                                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right" :value="formatAmount(data.item.superficie)" />
                                        </template>
                                      
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                              </b-row>
                            </b-card>
                       
                    </b-tab>
                    <b-tab class="contents">
                      <template #title>
                        <span v-if="titreDetails!==null">Localisation Concession en convention provisoire n°  {{ titreDetails.numtitre }}</span>
                      </template>
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col cols="6">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Répartition des superficies pas arrondissement</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items6" 
                                      :fields="fields6" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Détail des essences interdites">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col cols="6">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Liste des essences interdites</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items7" 
                                      :fields="fields7" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Détail des essences sous aménagement">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col cols="6">
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Détail des essences sous aménagement</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items8" 
                                      :fields="fields8" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Contrat des partenariat industriel">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col>
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Liste des contrats de partenariat</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items9" 
                                      :fields="fields9" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Liste des suspensions">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col>
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Suspension du titre n°</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items10" 
                                      :fields="fields10" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Liste des retraits">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col>
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Retrait du titre n°</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items11" 
                                      :fields="fields11" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Liste des abandons">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col>
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Abandon du titre n°</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items12" 
                                      :fields="fields12" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Liste des transferts">
                        <b-card class="w-100">
                          <b-row class="w-100">
                            <b-col>
                                  <!--entete des tableaux -->
                                  <div class="m-0 px-2 table-header-border-bottom">
                                    <b-row>
                                      <b-col cols="">
                                        <h6 style="font-size: 16px !important;" class="tab-header-left-text mr-2">Transfert du titre n°</h6>
                                      </b-col>
                                    </b-row>
                                  </div>
                                  <!--implémentation tableau proprement dite-->
                                  <div class="ml-1">
                                      <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                                      :items="items13" 
                                      :fields="fields13" 
                                      :tbody-tr-class="rowClass" >
                                        <template #table-busy>
                                          <div class="text-center text-success my-2">
                                            <b-spinner class="align-middle"></b-spinner>
                                            <strong class="ml-1">chargement...</strong>
                                          </div>
                                        </template>
                                        <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                                        
                                      </b-table>
                                      <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />-->  
                                  </div>
                                </b-col>
                          </b-row>
                        </b-card>
                    </b-tab>
                    <b-tab class="contents" title="Liste des renouvellements">
                        Renouvellement du titre numéro
                    </b-tab>
                    
                    <button class="arrow-right" @click="scroll_right">
                      <b-icon-arrow-right/>
                    </button>
                  </b-tabs>
                </b-row> 
            </div>
          </div>
      </b-overlay>
</div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

export default {
  name: "abbatages_titres",
  components: {},
  props:{
    title:String
  },
  data: () => ({
    section: 'initialtab',
    titreDetails:null,
    showOverlay:false,
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,


    //données du tableaux
    fieldsufa: [ 
      { key: 'numufa', label: 'Numéro UFA', thStyle: { width: "33.33%"} },
      { key: 'superfier', label: "Superficie de l'UFA", thStyle: { width: "33.33%"} },
      { key: 'limite', label: 'Limites', thStyle: { width: "33.33%"} },
    ],

    fieldslocalisationufa: [ 
      { key: 'arrondissement', label: 'Arrondissement', thStyle: { width: "33.33%"} },
      { key: 'superficie', label: "Superficie", thStyle: { width: "33.33%"} },
    ],
    fieldsassiettes: [ 
      { key: 'numaac', label: 'Numéro UFA', thStyle: { width: "20%"} },
      { key: 'limite', label: 'Limites', thStyle: { width: "30%"} },
      { key: 'materialisation', label: 'Matérialisation' },
      { key: 'superfier', label: "Superficie de l'UFA", thStyle: { width: "20%"} },
    ],

    fieldslocalisationassiette: [ 
      { key: 'arrondissement', label: 'Arrondissement', thStyle: { width: "33.33%"} },
      { key: 'superficie', label: "Superficie", thStyle: { width: "33.33%"} },
    ],
    fields6: [ 
      { key: 'arrondissement', label: 'Arrondissement', thStyle: { width: "33.33%"} },
      { key: 'departement', label: "Département", thStyle: { width: "33.33%"} },
      { key: 'region', label: "Région", thStyle: { width: "33.33%"} },
    ],

    fields7: [ 
      { key: 'nomcommercial', label: 'Nom commercial', },
    ],

    fields8: [ 
      { key: 'nomcommercial', label: 'Nom commercial', },
    ],

    fields9: [ 
      { key: 'rasionsocial', label: 'Raison sociale', },
      { key: 'sigle', label: 'Sigle', },
      { key: 'nocontrat', label: 'Contrat no', },
      { key: 'datecontrat', label: 'Date du contrat', },
      { key: 'noapprobation', label: 'Acte approbation no', },
      { key: 'dateapprobation', label: 'Date acte approbation', },
    ],

    fields10: [ 
      { key: 'nosuspension', label: 'N° de la suspension', },
      { key: 'dateactesuspension', label: "Date d'acte de suspension", },
      { key: 'motif', label: 'Motif', },
      { key: 'datedebutsuspension', label: 'Date début suspension', },
      { key: 'datefinsuspension', label: 'Date fin suspension', },
    ],

    fields11: [ 
      { key: 'noretrait', label: 'N° de retrait', },
      { key: 'dateacteretrait', label: "Date d'acte de retrait", },
      { key: 'motif', label: 'Motif', },
    ],

    fields12: [ 
      { key: 'noabandon', label: "N° d'abandon", },
      { key: 'datenotificationabandon', label: "Date de notification d'abandon", },
      { key: 'motif', label: 'Motif', },
      { key: 'redevanceabandon', label: 'Redevance abandon', },
    ],

    fields13: [ 
      { key: 'notransfert', label: "N° du transfert", },
      { key: 'datenotificationabandon', label: "Date de notification du transfert", },
      { key: 'motif', label: 'Motif', },
      { key: 'montantquittance', label: 'Montant de la quittance', },
      { key: 'datevente', label: 'Date de vente', },
      { key: 'taxetransfert', label: 'Taxe de transfert', },
      { key: 'noquittance', label: 'N° de la quittance', },
      { key: 'datequittance', label: 'Date de la quittance', },
      { key: 'cedeur', label: 'Cédeur', },
    ],
	
    elementsufe:[],
    elementsufa:[],
    elementsassiettes:[],
    elementslocalisation:[],
    elementslocalisationassiette:[],
     elements3:[],

     elements4:[
      { arrondissement: "YOKO", superficie: "252" },
      { arrondissement: "YOKO", superficie: "252" },
      { arrondissement: "YOKO", superficie: "252" },
      { arrondissement: "YOKO", superficie: "252" },
    ],

    elements5:[
      { noufe: "3", anneeoverture: "2017", derniereannee: '2021', limite: "Limite", gestioquinquenal: "Approbation plan de gestion quinquenal", parcellaire: "Parcellaire du bloc d'aménagement", planquinquenal: "Plan de gestion quinquenal", superficie: "102" },
      { noufe: "3", anneeoverture: "2017", derniereannee: '2021', limite: "Limite", gestioquinquenal: "Approbation plan de gestion quinquenal", parcellaire: "Parcellaire du bloc d'aménagement", planquinquenal: "Plan de gestion quinquenal", superficie: "102" },
      { noufe: "3", anneeoverture: "2017", derniereannee: '2021', limite: "Limite", gestioquinquenal: "Approbation plan de gestion quinquenal", parcellaire: "Parcellaire du bloc d'aménagement", planquinquenal: "Plan de gestion quinquenal", superficie: "102" },
    ],

     elements6:[
      { arrondissement: "YOKO", departement: "MENOUA", region: 'OUEST'},
      { arrondissement: "YOKO", departement: "MENOUA", region: 'OUEST'},
      { arrondissement: "YOKO", departement: "MENOUA", region: 'OUEST'},
    ],

    elements7:[
      { nomcommercial: "YOKO"},
    ],

    elements8:[
      { nomcommercial: "YOKO"},
    ],
    elements9:[],
    elements10:[],
    elements11:[],
    elements12:[],
    elements13:[],


    selected:{},

  }),
  computed:{
    /*propriétés liées aux accès*/
    canExportLot(){return true},

    itemsufa() { 
      return this.elementsufa.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemslocalisationufa() { 
      return this.elementslocalisation.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsassiettes() { 
      return this.elementsassiettes.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemslocalisationassiette() { 
      return this.elementslocalisationassiette.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items6() { 
      return this.elements6.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items7() { 
      return this.elements7.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items8() { 
      return this.elements8.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items9() { 
      return this.elements9.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items10() { 
      return this.elements10.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items11() { 
      return this.elements11.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items12() { 
      return this.elements12.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    items13() { 
      return this.elements13.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
  },
  watch: {
    section(value) {
        if (value == 'initialtab') {
            this.getInitialData()
        }
        if (value == 'localisation') {
            console.log('entrée tab localisation');
            this.getLocalisation()
        }
        
    },
    itemsufa(value){
        if(value.length>0){
            setTimeout(() => {this.$refs['selectableTableufa'].selectRow(0) }, 200);
        }
    },
    itemslocalisationufa(value){
        if(value.length>0){
            setTimeout(() => {this.$refs['selectableTablelocalisationufa'].selectRow(0) }, 200);
        }
    },
    itemsassiettes(value){
        if(value.length>0){
            setTimeout(() => {this.$refs['selectableTableaac'].selectRow(0) }, 200);
        }
    },
    itemslocalisationassiette(value){
        if(value.length>0){
            setTimeout(() => {this.$refs['selectableTablelocaliteaac'].selectRow(0) }, 200);
        }
    },
  },
 methods: {

    // tabs methodes
    scroll_left() {
      let content = document.querySelector("#tabs__BV_tab_controls_");
      console.log(content)
      content.scrollLeft -= 200;
      console.log("=========================");
      console.log($('#tabs__BV_tab_controls_').css('width'));
      console.log("=========================");
    },
    scroll_right() {
      let content = document.querySelector("#tabs__BV_tab_controls_");
      content.scrollLeft += 200;
    },
    async getInitialData() {
      console.log('entrée requetage');

      this.showOverlay = true
        this.titreDetails = await this.$titres.get('titre_convenssion/detail_cp/' +this.$route.params.id).then(response => response.data.result)
        this.elementsufa = this.titreDetails.ufaDtos
       // this.elementslocalisation = this.titreDetails.ufaDtos.repartsuparrond
        this.elementsassiettes = this.titreDetails.aacDtos
        //this.elementslocalisationassiette = this.titreDetails.aacDtos.repartsuparrond
      this.showOverlay = false
      console.log('titre détails ',this.titreDetails);
    },
    async getLocalisation(){
        this.isBusy=true;
        this.elements = await this.$titres.get('titres/vente_de_coupe/' +this.$route.params.id+'/localisation').then(response => response.data.result.Items)
        this.isBusy=false
    },

    fermer() {this.$router.back();},
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },
    onRowSelectedufa(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
          this.selected = items
      if(!php.empty(this.selected)){
        this.elementslocalisation=this.selected[0].repartsuparrond
      }
      
    },
    onRowSelectedassiette(items) {
      console.log('row selected',items);
      items.isSelected =true;
          this.selectedassiette = items
      if(!php.empty(this.selectedassiette)){
        this.elementslocalisationassiette=this.selectedassiette[0].repartsuparrond
      }
      
    },
    onRowSelected(items) {
      console.log('row selected',items);
      /*items.isSelected =true;
      this.isRowselected=true
          this.selected = items
      if(!php.empty(this.selected)){
        this.elementslocalisation=this.selected[0].repartsuparrond
      }*/
      
    },
    formatAmount(n){
      var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : " ");
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
        actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

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
        
        actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
    },
  },
  mounted() {
    $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
    window.addEventListener('resize', () => {
      $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
    })
  },
  beforeMount() {
    this.getInitialData();
  }

}

</script>

<style scoped>
.label-form{
  margin-top:7px;
  display: inline-block; 
  font-weight: bold!important; 
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.detail-permis-item {
  color: #175131!important;
  }
.detail-permis-item:hover{
text-decoration: underline;
}
label{
  font-weight: normal !important;
}
.style{
  margin-left: 10px;
  font-weight: bold !important;
  font-style: 60px !important;
  color: rgb(19, 16, 16);
  padding: 3px 10px;
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
    overflow-x: hidden !important;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */




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
  cursor: pointer;
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

#wrap:after {
    content:"";
    position:relative;
    margin-left:-20px;
    pointer-events:none;
    top: 15px;
    right:5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #8E97AF transparent transparent transparent;
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
  width: 180px;
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