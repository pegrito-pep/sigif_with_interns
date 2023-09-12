<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Concéssion définitive</h4></b-col>
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="addTitreCD" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
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
                        <option value="CD" selected disabled> concéssion en convention définitive</option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span>Entité forrestière</b-col>
                    <b-col cols="8">
                        <v-select @input="loadTitresOrganisation" v-if="isMinfof" :options="paginatedEntites" v-model="form.organisation" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                          <template #option="{intitule ,sigle  }">
                            <span class="font-weight-bold">{{ intitule }}</span>
                            <br />
                            <span class="text-muted"> {{ sigle }}</span>
                          </template>
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                            <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                          </li>
                        </v-select>
                        <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                          <option selected="selected">{{ entite.libelle }}</option>
                        </select> 
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="3" class="font-weight-bold d-flex justify-content-end">Marteau</b-col>
                      <b-col cols="8" v-if="form.organisation!=''&&form.organisation!=null">
                        <span class="font-weight-bold">{{ form.organisation.sigle }}</span>
                      </b-col>
                    </b-row>
                </b-col>

                <b-col cols="5">
                  <b-row class="m-2">
                    <b-col cols="7" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span> Concession  en CD n°</b-col>
                    <b-col cols="5">
                      <v-select :disabled="notSetOrganisation" :options="paginatedTitres" v-model="form.cp" @search="onSearchTitres" label="numtitre" class="custom-select-type_titre">
                        <template #option="{ numtitre }">
                            <span class="font-weight-bold">{{ numtitre }}</span>
                        </template>
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageTitres" @click="offsetTitres -= limitTitres">Prèc.</button>
                          <button :disabled="!hasNextPageTitres" @click="offsetTitres += limitTitres">Suiv.</button>
                      </li>
                      </v-select>
                      <!--<input class="system-input-nom-promoteur"  v-model="form.numtitre"  size="sm"  placeholder="" type="text"/>-->
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="7" class="font-weight-bold">Superficie Total (ha)</b-col>
                    <b-col cols="5">
                      <b-form-input v-model="form.superficie" name="superficie" size="sm" class="w-90 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>


              <b-tabs id="tabs" class="w-100" >
              
                <b-tab class="contents" @click.prevent="section = 'initialtab'" title="Concession en convention définitive n°">
                  <b-row class="w-100 mx-3 d-flex justify-content-between">
                  
                    <b-col cols="4">
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="convention définitive n°" label-for="input-sm">
                       <b-form-input v-model="form.numConventiondefinitive" name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                      </b-form-group>
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Date de fin de validité" label-for="input-sm">
                        <span v-if="form.cp!=''&&form.cp!=undefined">{{ $dayjs(form.cp.datefinvaliditeprov).format("DD/MM/YYYY") }}</span>
                        <!--<b-form-input v-model="form.montantoffre" name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('montantoffre')"/>
                        <b-form-invalid-feedback id="montantoffre">{{ veeErrors.first('montantoffre') }}</b-form-invalid-feedback>-->
                      </b-form-group>
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Montant de l'offre pour calcul RFA" label-for="input-sm">
                        <span v-if="form.cp!=''&&form.cp!=undefined">{{ montantoffrerfa }}</span>
                      </b-form-group>
                      <div role="group" class="form-row form-group" id="__BVID__4063">
                        <label style="margin-top: -12px" for="input-sm" class="col-lg-6 col-6 col-form-label col-form-label-sm font-weight-normal" id="__BVID__4063__BV_label_"><span style="color: red; font-size:1rem;">*</span>Durée</label>
                        <div class="col">
                          <input v-model="form.durree" name="code" type="number" placeholder="" class="w-50 p-0 m-0 font-weight-300 form-control-xs form-control form-control-sm" id="__BVID__4064"><div data-v-473ba422="" id="montantoffre" class="invalid-feedback">
                          </div>
                        </div>
                      </div>
                      <!--<b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Durée" label-for="input-sm">
                        <b-form-input v-model="form.dureeconv"  name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" disabled/>
                      </b-form-group>-->
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="date de la notification" label-for="input-sm">
                        <b-form-input v-model="form.datenotificationapprobation"  name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" type="date" disabled/>
                      </b-form-group>
                      <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Montant total de la RFA" label-for="input-sm">
                        <span class="font-weight-bold">{{ commify(montantotalRFA) }}</span>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="attestation de conformité" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectattestationconformitefile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileattestationconformite" class="file-name">{{ fileattestationconformite.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="plan d'aménagement" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectplanamenagementfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="planamenagementfile" class="file-name">{{ planamenagementfile.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="décret d'attribution" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectdecretattributionfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="decretattributionfile" class="file-name">{{ decretattributionfile.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="cahier des charges" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectcahierchargesfile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="filecahiercharges" class="file-name">{{ filecahiercharges.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="arreté d'approbation du plan d'aménagement" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectarreteaprobationplanamenagement"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="filearreteaprobationplanamenagement" class="file-name">{{ filearreteaprobationplanamenagement.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                    </b-col>
  
                    <b-col cols="4">
                      <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date convention" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateconvention">
                      </b-form-group>
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="N° cautionnement" label-for="input-sm">
                        <b-form-input v-model="form.numcautionnement" name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                      </b-form-group>
                      <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date cautionnement" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="datecautionnement">
                      </b-form-group>
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="N° notification approbation" label-for="input-sm">
                        <b-form-input v-model="form.numnotificationapprobation" name="code" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="caution" label-class="font-weight-normal" label-for="input-sm">
                        <a v-if="form.cp!=undefined&&form.cp.iudcaution!=null" class="mx-1 detail-permis-item" b-tooltip.hover title="consulter le fichier" target="_blank" :href="form.cp.iudcaution"><b-img src="@/assets/images/Attach_128x128.png"></b-img> caution</a>
                        <input type="file" disabled />
                      </b-form-group>
                    </b-col>
  
                  </b-row>


                  <b-row class="mx-3">
                    <b-col cols="4">
                      <b-button
                        :class="visiblerapportetudes ? null : 'collapsed'"
                        :aria-expanded="visiblerapportetudes ? 'true' : 'false'"
                        aria-controls="rapport-etude-socioeconomiques"
                        @click="visiblerapportetudes=!visiblerapportetudes" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visiblerapportetudes, 'collapse-close': !visiblerapportetudes }"><span class="font-weight-bold">Rapport des études socio-économiques</span></li></ul>  
                      </b-button>
                      <b-collapse id="rapport-etude-socioeconomiques" v-model="visiblerapportetudes">
                          <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                            <b-form-input v-model="form.numraportetudesocio" name="numappeloffre" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                          </b-form-group>
                          <b-form-group label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                            <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateraportetudesocio">
                          </b-form-group>
                          <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                            <div class="upload-container">
                              <label>
                                <input type="file" @change="selectfilerapportetudesocioeconomiques"/>
                                <b-img src="@/assets/images/download.png"></b-img>
                                
                                <span v-if="rapportetudessocioeconomiquesfile" class="file-name">{{ rapportetudessocioeconomiquesfile.name }}</span>
                                <span v-else class="title">cliquer pour choisir</span>
                              </label>
                            </div>
                          </b-form-group>
                      </b-collapse>
                    </b-col>
                    <b-col cols="4">
                      <b-button
                      :class="visibleprocesverbal ? null : 'collapsed'"
                      :aria-expanded="visibleprocesverbal ? 'true' : 'false'"
                      aria-controls="collapse-braconnage"
                      @click="visibleprocesverbal=!visibleprocesverbal" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visibleprocesverbal, 'collapse-close': !visibleprocesverbal }">
                          <span class="font-weight-bold">procès verbal de la reunion de restitution de l'étude socio-économique</span></li>
                        </ul>  
                      </b-button>
                      <b-collapse id="collapse-braconnage" v-model="visibleprocesverbal">
                        <b-form-group class="w-50" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                            <b-form-input v-model="form.numaproceveretude" name="numappeloffre" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                        </b-form-group>
                        <b-form-group class="w-50" label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="form.dateproceveretude">
                        </b-form-group>
                        <b-form-group class="w-50"  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectProcesVerbalFile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileProcesverbal" class="file-name">{{ fileProcesverbal.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                        </b-form-group>
                      </b-collapse>
                    </b-col>
                    <b-col cols="4">
                      <b-button
                      :class="visiblecarteaaffectationterres ? null : 'collapsed'"
                      :aria-expanded="visiblecarteaaffectationterres ? 'true' : 'false'"
                      aria-controls="collapse-sanctions"
                      @click="visiblecarteaaffectationterres=!visiblecarteaaffectationterres" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                      <ul><li :class="{ 'collapse-open': visiblecarteaaffectationterres, 'collapse-close': !visiblecarteaaffectationterres }">
                        <span class="font-weight-bold">Carte d'affectation des terres</span></li>
                      </ul>  
                      </b-button>
                      <b-collapse id="collapse-sanctions" v-model="visiblecarteaaffectationterres">
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                        <b-form-input v-model="form.numcarteffectationterre" name="numnotesanction" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                      </b-form-group>
                      <b-form-group  label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="form.datecarteaffectationterre">
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" ref="filesanctions" @change="selectaffectationterrefile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileaffectationterre" class="file-name">{{ fileaffectationterre.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      </b-collapse>
                    </b-col>
                  </b-row>

                  <b-row class="mx-3">
                    <b-col cols="4">
                      <!--hérité CP-->
                      <b-button
                        :class="visibleappeloffre ? null : 'collapsed'"
                        :aria-expanded="visibleappeloffre ? 'true' : 'false'"
                        aria-controls="collapse-appel-offre"
                        @click="visibleappeloffre=!visibleappeloffre" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visibleappeloffre, 'collapse-close': !visibleappeloffre }"><span class="font-weight-bold">Plan d'approvisionnement alimentaire</span></li></ul>  
                      </b-button>
                      <b-collapse id="collapse-appel-offre" v-model="visibleplanapprov">
                        <b-form-group class="w-75" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                          <b-form-input disabled v-model="numeroPlan" name="numplan" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                        </b-form-group>
                        <b-form-group class="w-75" label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                          <input type="date" class="w-50 form-control quota_input_text" v-model="datePlan" />
                        </b-form-group>
                        <b-form-group  label-cols="3" label-cols-lg="3" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                          <a v-if="form.cp!=undefined&&form.cp.uidPlan!=null" class="mx-1 detail-permis-item" b-tooltip.hover title="consulter le fichier" target="_blank" :href="form.cp.uidPlan"><b-img src="@/assets/images/Attach_128x128.png"></b-img> plan d'approvisionnement</a>
                          <input type="file" disabled />
                          </b-form-group>
                      </b-collapse>

                    </b-col>
                    <b-col cols="4">
                      <b-button
                      :class="visiblenoteservicebraconnage ? null : 'collapsed'"
                      :aria-expanded="visiblenoteservicebraconnage ? 'true' : 'false'"
                      aria-controls="collapse-braconnage"
                      @click="visiblenoteservicebraconnage=!visiblenoteservicebraconnage" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                        <ul><li :class="{ 'collapse-open': visiblenoteservicebraconnage, 'collapse-close': !visiblenoteservicebraconnage }">
                          <span class="font-weight-bold">Note de service précisant l'interdiction du braconnage et du transport de la viande de brousse</span></li>
                        </ul>  
                      </b-button>
                      <b-collapse id="collapse-braconnage" v-model="visiblenoteservicebraconnage">
                      <b-form-group class="w-50" label-cols="4" label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Numéro" label-for="input-sm">
                        <b-form-input v-model="numeroNs" name="numservicebraconnage" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
  
                      </b-form-group>
                      <b-form-group class="w-50" label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="dateNs">
                      </b-form-group>
                      <b-form-group class="w-50"  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <a v-if="form.cp!=undefined&&form.cp.uidNs!=null" class="mx-1 detail-permis-item" b-tooltip.hover title="consulter le fichier" target="_blank" :href="form.cp.uidNs"><b-img src="@/assets/images/Attach_128x128.png"></b-img> document interdiction</a>
                          <input type="file" disabled />
                        </b-form-group>
                      </b-collapse>
                    </b-col>
                    <b-col cols="4">
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
                        <b-form-input v-model="numeroNsse" name="numnotesanction" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                      </b-form-group>
                      <b-form-group  label-cols="4"  label-class="font-weight-normal" label-cols-lg="4" label-size="sm" label="Date" label-for="input-sm">
                        <input type="date" class="w-50 form-control quota_input_text" v-model="dateNsse">
                      </b-form-group>
                      <b-form-group  label-cols="4" label-cols-lg="4" label-size="sm" label="document" label-class="font-weight-normal" label-for="input-sm">
                        <a v-if="form.cp!=undefined&&form.cp.uidNsse!=null" class="mx-1 detail-permis-item" b-tooltip.hover title="consulter le fichier" target="_blank" :href="form.cp.uidNsse"><b-img src="@/assets/images/Attach_128x128.png"></b-img> document sanctions</a>
                        <input type="file" disabled />
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
  name:"titre-cd-form",
  components:{ ErrorDialogue, CodeBarreInfo, CreatedBox},
   computed: {     
    ...mapGetters(['user','hasAccess']),
    notSetOrganisation(){
      return php.empty(this.form.organisation)
    },
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    valuesSetCorrectly() {
      return ( !php.empty(this.form.typetitre)&&!php.empty(this.form.cp)&&!php.empty(this.form.organisation)&&!php.empty(this.form.durree));
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
      return this.superficiecd * this.montantoffrerfa
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
    //elements tab1',
    visibleappeloffre:false,
    visiblenoteservicebraconnage:false,
    fileaffectationterre:null,
    montantoffrerfa:'',
    numcautionnement:'',
    datecautionnement:'',
    numnotifapprobplanamenagement:'',
    rapportetudessocioeconomiquesfile:null,
    fileattestationconformite:null,
    planamenagementfile:null,
    decretattributionfile:null,
    filecahiercharges:null,
    filearreteaprobationplanamenagement:null,
    numeroPlan:null,
    datePlan:null,
    uidPlan:null,
    numeroNs:null,
    dateNs: null,
    uidNs:null,
    numeroNsse:null,
    dateNsse:null,
    uidNsse:null,
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
        typetitre: "CD",
        cp:null,
        nomConccessionForestier: '', // int il sagit de l'id du titre CP
        entiteForestier: '', // int, obligatoire
        numConventiondefinitive: "",//String il sagit du numero du titre
        durree: '',//int 
        dateconvention: "",//date
        numnotificationapprobation:"",//string
        datenotificationapprobation:"",//date
        planamenagement: "", //string base64
        attestationConformite: "",//string base64
        decretattribution: "",//string base64
        cahierCharge: "",//string base64
        arreteaprobationplanamenagement:"",//string base64

        numcarteffectationterre:"",//string base64
        datecarteaffectationterre:"",//string base64
        documentcarteaffectationterre:"",//string base64

        numraportetudesocio:"",//string base64
        dateraportetudesocio:"",//string base64
        documentraportetudesocio:"",//string base64

      // carte affectation des terres utiliser pour concession cd
        numaproceveretude:"",//string base64
	      dateproceveretude:"",//string base64
	      documentproceveretude:"",//string base64

       
      },
      fileSanction:"",
      fileRegulation :"",
      fileProcesverbal:"",
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
      visiblerapportetudes: true,
      visibleprocesverbal:true,
      visiblerecepissedepot:true,
      visibleplanapprov:true,
      visiblecarteaaffectationterres:true,
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
     superficiecd:''
  }),
  watch:{
    "form.cp"(value) {
        if(!php.empty(value)){
          this.form.durree = value.dureeconv
          this.form.datenotification = value.datenotifapprobplanamenagement!=null?this.$dayjs(value.datenotifapprobplanamenagement).format("DD/MM/YYYY"):''
          this.superficiecd = value.suptitre!=null?value.suptitre:''
          this.montantoffrerfa = value.montantoffrerfa!=null?value.montantoffrerfa:''
          this.numcautionnement = value.numcautionnement!=null?value.numcautionnement:''
          this.datecautionnement =  value.datecautionnement!=null?this.$dayjs(value.datecautionnement).format("DD/MM/YYYY"):''
          this.numnotifapprobplanamenagement = value.numnotifapprobplanamenagement!=null?value.numnotifapprobplanamenagement:''
        }
        else{
          this.form.durree= ''
          this.superficiecd = ''
          this.montantoffrerfa = ''
          this.numcautionnement =''
          this.datecautionnement =''
          this.numnotifapprobplanamenagement = ''
        }
    },
    section(value){
      if(value=='localisation'){
        this.getArrondissements()
      }
    },
  },
  methods: {
    //fonction de parse d'un montant
    commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : " ");
    },
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
    async addTitreCD(){
      let data={}
      //data =this.form;
      data.typetitre = this.form.typetitre, data.durree = this.form.durree, data.superficie = this.form.superficie,
      data.nomConccessionForestier = this.form.cp.idtitre, data.entiteForestier=this.form.organisation.idorganisation
      data.dateconvention = this.form.dateconvention, data.numnotificationapprobation =this.form.numnotificationapprobation,
      data.datenotificationapprobation = this.form.datenotificationapprobation, data.planamenagement = this.form.planamenagement,
      data.attestationConformite = this.form.attestationConformite, data.decretattribution = this.form.decretattribution,
      data.cahierCharge = this.form.cahierCharge, data.arreteaprobationplanamenagement = this.form.arreteaprobationplanamenagement,
      data.numcarteffectationterre = this.form.numcarteffectationterre, data.datecarteaffectationterre = this.form.datecarteaffectationterre,
      data.documentcarteaffectationterre= this.form.documentcarteaffectationterre, data.numraportetudesocio = this.form.numraportetudesocio,
      data.dateraportetudesocio = this.form.dateraportetudesocio, data.documentraportetudesocio = this.form.documentraportetudesocio,
      data.numaproceveretude = this.form.numaproceveretude, data.dateproceveretude = this.form.dateproceveretude, data.documentproceveretude = this.form.documentproceveretude
      data.nomConccessionForestier = this.form.cp.idtitre
      if(!php.empty(this.elementslocation)&&!php.empty(this.elementslocation[0])){
        data.localisations=this.elementslocation.map( ({idarrondissement}) =>({
          idarrondissement
        }));
      } 
      console.log('data ',data);
        this.submitted =true;
        this.$titres.post('titres/cd', data).then(response => {
            this.submitted = false   
            App.notifySuccess(response.data.message)
            return this.handleCreated();
        }).catch(error => {
          console.log('error ',error);
          this.submitted = false
          this.errorHappened(error.response.data.result.toString())
        })
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    async getTitresCDData(){
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
    //CHARGEMENT DES CONVENTIONS PROVISOIRES EN FONCTION DE L'ORGANISATIION CHOISIE 
    async loadTitresOrganisation(){
      this.showOverlay = true
      await this.$titres.post("titres/cp/valide",{entite: this.form.organisation.idorganisation}).then(response =>{
        this.titres=response.data.result.Item || []
      });
      this.showOverlay = false
      if(php.empty(this.titres)){
        let message = 'Aucune convention provisoire valide trouvée pour cette organisation'
        this.errorHappened(message)
      }
    },
    //chargement autres données localisation
    async loadOtherDataLocation(index,data){
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
      this.form.fichiercaution=await this.getBase64(cautionfile)
    },
    async selectconventionexploitationfile(e){
      const conventionfile =this.fileConventionExploitation=  e.target.files[0];
      this.form.fichierconventionexploitation=await this.getBase64(conventionfile)
    },
    async selectProcesVerbalFile(e){
      const fileProcesverbal =this.fileProcesverbal=  e.target.files[0];
      this.form.documentproceveretude=await this.getBase64(fileProcesverbal)
    },
    //traitement des fichiers
    async selectfilerapportetudesocioeconomiques(e){
      const rapportetudessocioeconomiquesfile =this.rapportetudessocioeconomiquesfile= e.target.files[0];
      this.form.documentraportetudesocio=await this.getBase64(rapportetudessocioeconomiquesfile)
    },
    async selectaffectationterrefile(e){
      const affectationterrefile =this.fileaffectationterre= e.target.files[0];
      this.form.documentcarteaffectationterre=await this.getBase64(affectationterrefile)
    },
    async selectattestationconformitefile(e){
      const fileattestationconformite =this.fileattestationconformite= e.target.files[0];
      this.form.attestationConformite=await this.getBase64(fileattestationconformite)
    },
    async selectplanamenagementfile(e){
      const planamenagementfile =this.planamenagementfile= e.target.files[0];
      this.form.planamenagement=await this.getBase64(planamenagementfile)
    },
    async selectdecretattributionfile(e){
      const decretattributionfile =this.decretattributionfile= e.target.files[0];
      this.form.decretattribution=await this.getBase64(decretattributionfile)
    },
    async selectcahierchargesfile(e){
      const filecahiercharges =this.filecahiercharges= e.target.files[0];
      this.form.cahierCharge=await this.getBase64(filecahiercharges)
    },
    async selectarreteaprobationplanamenagement(e){
      const filearreteaprobationplanamenagement =this.filearreteaprobationplanamenagement= e.target.files[0];
      this.form.arreteaprobationplanamenagement=await this.getBase64(filearreteaprobationplanamenagement)
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
      this.$router.push({ name: "concession_en_cd" });
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
        if(php.empty(this.elementslocation[i].arrondissement)){
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
            // this.submitted=true;
            this.submittedContinue=true;
            // this.alertNoTile();
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
            typetitre: "CD", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
            dateattribution: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
            dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
            numappeloffre: "", dateappeloffre: "", documentappeloffre: "",
            numdepot: "",  datedepot: "", documentdepot: "", numplan: "", 
            dateplan: "", documentplan: "", numservicebraconnage: "", 
            dateservicebraconnage: "", documentservicebraconnage: "", numnotesanction: "", 
            datenotesanction: "",documentnotesanction: "", arrondissement:""
          };
      },
      

      async errorHappened(error) {
        let message=error!=undefined?error:'erreur interne interne du serveur'
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: message,
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
    await this.getTitresCDData()
    //this.getTitres();
  },

}
</script>


<style scoped>
.detail-permis-item {
  color: #175131!important;
}
.detail-permis-item:hover{
  text-decoration: underline;
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