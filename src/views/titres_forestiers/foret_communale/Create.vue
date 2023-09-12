<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Forêt Communale</h4></b-col>
            <b-col class="col-md-auto">
              <span >
                <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN VENTE DE COUPE-->
          <div>
              <b-row class="m-4">

                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3">Type du titre</b-col>
                    <b-col cols="8">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="CC" selected disabled>Forêt communale</option>
                      </select>
                    </b-col>
                  </b-row>
               
                  <b-row>
                    <b-col cols="3">Entité forrestière</b-col>
                    <b-col cols="8">
                      <select disabled class="m-0 p-0" v-model="entite.libelle"   style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="4">
                  <b-row class="m-2">
                    <b-col cols="6"> Forêt communale N°</b-col>
                    <b-col cols="5">
                      <v-select :options="paginatedT" v-model="form.numtitre" :filterable="false" @search="onSearchTitre" :reduce="titre => titre.numtitre" label="numtitre" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageT" @click="offsetT -= limitT">Prèc.</button>
                            <button :disabled="!hasNextPageT" @click="offsetT += limitT">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="6">Superficie Totale (ha)</b-col>
                    <b-col cols="5">
                      <b-form-input v-model="form.superficie" name="superficie" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('superficie')"/>
                      <b-form-invalid-feedback id="superficie">{{ veeErrors.first('superficie') }}</b-form-invalid-feedback>
                    </b-col>
                  </b-row>
   
                </b-col>
              </b-row>

              <ul class="nav nav-tabs">
                <li class="nav-item" :class="{ custumSigifTab: section === 'cc' }">
                    <a
                    ref="intialtabselect"
                    data-toggle="tab"
                    href="#"
                    class="nav-link"
                    style="color: inherit"
                    @click.prevent="section = 'cc'"
                    >Forêt communale N° </a>
                </li>
                <li class="nav-item" :class="{ custumSigifTab: section === 'Localisation' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Localisation'"
                  >Localisation</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: section === 'detail_essences_interdites' }">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link"
                style="color: inherit"
                @click.prevent="section = 'detail_essences_interdites'"
                >Détail des esences interdites</a
                >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: section === 'detail_essences_sous_amenagement' }">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link"
                style="color: inherit"
                @click.prevent="section = 'detail_essences_sous_amenagement'"
                >Détail des esences sous aménagement</a
                >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: section === 'contrat' }">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link"
                style="color: inherit"
                @click.prevent="section = 'contrat'"
                >Contrat de partenariat industriel</a
                >
              </li>
              </ul>

              <b-container class="contents" fluid v-if="section == 'cc'">
                <b-row class="w-100 mx-3 d-flex justify-content-around">
                  <b-col cols="4">  
                    <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° du decret de classement" label-for="input-sm">
                      <b-form-input v-model="form.numdecretclassement" name="numdecretclassement" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('numdecretclassement')"/>
                      <b-form-invalid-feedback id="numdecretclassement">{{ veeErrors.first('numdecretclassement') }}</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date décret" label-for="input-sm">
                      <date-picker  v-model="form.datedecret"  format="DD-MM-YYYY" placeholder="2022-12-22"  valueType="YYYY-MM-DD" class="w-50" :clearable="false"/>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="pièce jointe décret" label-class="font-weight-normal" label-for="input-sm">
                      <div class="upload-container">
                        <label>
                          <input type="file" @change="selectdecretfile"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          
                          <span v-if="filedecret" class="file-name">{{ filedecret.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-button
                      :class="visiblearreteapprobation ? null : 'collapsed'"
                      :aria-expanded="visiblearreteapprobation ? 'true' : 'false'"
                      aria-controls="collapse-appel-offre"
                      @click="visiblearreteapprobation=!visiblearreteapprobation" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                      <ul><li :class="{ 'collapse-open': visiblearreteapprobation, 'collapse-close': !visiblearreteapprobation }"><span class="font-weight-bold">Avis d'appel d'offres</span></li></ul>  
                    </b-button>
                  </b-col>
                </b-row>
            
                  <b-collapse id="collapse-appel-offre" v-model="visiblearreteapprobation">
                    <b-row class="w-100 mx-3 d-flex justify-content-around">
                      <b-col cols="4">  
                        <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="Numéro" label-for="input-sm">
                          <b-form-input v-model="form.numarrete" name="numarrete" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('numarrete')"/>
                          <b-form-invalid-feedback id="numarrete">{{ veeErrors.first('numarrete') }}</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date arrété" label-for="input-sm">
                          <date-picker  v-model="form.datearrete"  format="DD-MM-YYYY" placeholder="2022-12-22"  valueType="YYYY-MM-DD" class="w-50" :clearable="false"/>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="pièce jointe décret" label-class="font-weight-normal" label-for="input-sm">
                          <div class="upload-container">
                            <label>
                              <input type="file" @change="selectdocarrete"/>
                              <b-img src="@/assets/images/download.png"></b-img>
                              
                              <span v-if="filearrete" class="file-name">{{ filearrete.name }}</span>
                              <span v-else class="title">cliquer pour choisir</span>
                            </label>
                          </div>
                        </b-form-group>
                      </b-col>
                    </b-row>
    
                  </b-collapse>
              </b-container>
              <b-container v-if="section == 'Localisation'" class="contents" title="Localisation vente de coupe N°">
                <b-row style="border-bottom: 2px solid green">
                  <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Répartittion des superficies par Arrondissement</h3></b-col>
                  <b-col class="col-md-auto liens">
                      <span>
                        <a @click.prevent="AddFieldLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAllLocalisation" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                      </span>
                  </b-col>
                </b-row>
                  <b-row class="w-100 mx-3">
                    <b-col class="" cols="4">
                        <label class="p-0 m-0 w-100 d-flex justify-content-center align-items-center" style="font-weight:600; color: black; font-size: 16px;">Arrondissement</label>
                    </b-col>
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Département</label>
                    </b-col>
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">region</label>
                    </b-col>
                  </b-row>
                  <b-row class="w-100  m-0 pt-3 px-3" v-for="(field, index) in fieldsLocation" :key="index">
                  <span style="position: absolute; left: 10px;">{{ index + 1 }}</span>
                  <b-col cols="3">
                    <v-select :options="paginated" @input="setOtherData" v-model="field.arrondissement" :filterable="false" @search="onSearch" label="intitule" class="custom-select-type_titre">
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                          <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                      </li>
                  </v-select>
                  </b-col>
                  <b-col cols="1"></b-col>
                  <b-col cols="2">
                      <select name="departement" v-model="field.departement" disabled class="m-0 p-0 "  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem + 0px) !important;">
                        <option :value="field.departement">{{ field.departement }}</option>
                      </select>
                  </b-col>
                  <b-col cols="1"></b-col>
                  <b-col cols="2">
                    <select name="region" v-model="field.region" disabled class="m-0 p-0 "  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem + 0px) !important;">
                      <option :value="field.region">{{ field.region }}</option>
                    </select>
                  </b-col>
                  <b-col cols="1"></b-col>
                 
                    <b-col cols="1">
                      <b-row>
                        <b-col cols="1">
                          <a @click.prevent="removeAtIndexLocations(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
              </b-container>
              <b-container v-if="section == 'detail_essences_interdites'" class="contents" title="Détail des essences interdites">
                <b-row style="border-bottom: 2px solid green">
                  <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Liste des essences interdites</h3></b-col>
                  <b-col class="col-md-auto liens">
                      <span>
                        <a @click.prevent="addFieldEssenceInterdites" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAllEssencesInterdites" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                      </span>
                  </b-col>
                </b-row>
                  <b-row class="w-100 mx-1">
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Nom Commercial</label>
                    </b-col>
                  </b-row>
                  <b-row class="w-100  m-0 pt-2 px-1" v-for="(field, index) in fielsEssencesInterdites" :key="index">
                  <span style="position: absolute; left: 10px;">{{ index + 1 }}</span>
                  <b-col cols="2">
                      <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.essence" />
                  </b-col>
                  <b-col cols="1">
                    <b-row>
                      <b-col cols="1">
                        <a @click.prevent="removeAtIndexEssenceInterdite(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
              <b-container v-if="section == 'detail_essences_sous_amenagement'" class="contents" title="Contrat des partenariat industriel">
                <b-row style="border-bottom: 2px solid green">
                  <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Liste des essences sous aménagement</h3></b-col>
                  <b-col class="col-md-auto liens">
                      <span>
                        <a @click.prevent="addFieldEssenceSousAmenagement" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAllEssencesSousAmenagement" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                      </span>
                  </b-col>
                </b-row>
                  <b-row class="w-100 mx-1">
                    <b-col cols="5">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Nom Commercial</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Diametre</label>
                  </b-col>
                  </b-row>
                  <b-row class="w-100  m-0 pt-2 px-1" v-for="(field, index) in fielsEssencesSousAmenagement" :key="index">
                  <span style="position: absolute; left: 10px;">{{ index + 1 }}</span>
                  <b-col cols="5">
                      <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.nomcommercial" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.diametre" />
                </b-col>
                  <b-col cols="1">
                    <b-row>
                      <b-col cols="1">
                        <a @click.prevent="removeAtIndexEssenceSousAmenagement(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-container>
              <b-container v-if="section == 'contrat'" class="contents" title="Contrat des partenariat industriel">
                <b-row style="border-bottom: 2px solid green">
                  <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Liste de contrats de partenairat</h3></b-col>
                  <b-col class="col-md-auto liens">
                      <span>
                        <a @click.prevent="addFieldContrat" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAllContrats" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                      </span>
                  </b-col>
                </b-row>
                  <b-row class="w-100 mx-1">
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Raison sociale</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">sigle</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">N° de contrat</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Date du contrat</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Acte  N°</label>
                    </b-col>
                    <b-col cols="2">
                      <label class="p-0 m-0" style="font-weight:600; color: black;">Date Acte  N°</label>
                    </b-col>
                  </b-row>
                  <b-row class="w-100  m-0 pt-2 px-1" v-for="(field, index) in fielsContrat" :key="index">
                  <span style="position: absolute; left: 10px;">{{ index + 1 }}</span>
                  <b-col cols="2">
                      <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.raisonsocilae" />
                  </b-col>
                  <b-col cols="1">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.sigle" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.numcontrat" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.datecontrat" />
                    <!--<date-picker  v-model="field.datecontrat" style="height: 24px !important;"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-75" :clearable="false"/>-->
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="ex: 2022-01-19" v-model="field.numacte" />
                  </b-col>
                  <b-col cols="2">
                    <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="ex: 2022-05-15" v-model="field.dateacte" />
                    <!--<date-picker   v-model="field.dateacte" style="height: 24px !important;"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-75" :clearable="false"/>-->
                  </b-col>
                 
                    <b-col cols="1">
                      <b-row>
                        <b-col cols="1">
                          <a @click.prevent="removeAtIndexContrats(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                        </b-col>
                      </b-row>
                    </b-col>
                  </b-row>
              </b-container>
      
              <div class="p-4 mb-5">
                <b-button @click.prevent="addTitre" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
                <b-button @click.prevent="addTitreAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedContinue" >
                  Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedContinue" small></b-spinner></b-button>
                
                <error-dialogue ref="errorDialogue"></error-dialogue>
              </div>
          </div>
        </div>
      </b-overlay>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';

const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"titre-ps-form",
  components:{ ErrorDialogue},
   computed: {
    ...mapGetters(['user','hasAccess']),
    filtered() {
          return this.titres.filter((titre) =>
          titre.numtitre.toLocaleLowerCase().includes(this.searchtitre.toLocaleLowerCase())
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

        filteredT() {
          return this.titres.filter((titre) =>
          titre.numtitre.toLocaleLowerCase().includes(this.searchtitre.toLocaleLowerCase())
          )
        },
        paginatedT() {
          return this.filteredT.slice(this.offsetT, this.limitT + this.offsetT)
        },
        hasNextPageT() {
          const nextOffset = this.offsetT + this.limitT
          return Boolean(
            this.filteredT.slice(nextOffset, this.limitT + nextOffset).length
          )
        },
        hasPrevPageT() {   
          const prevOffset = this.offsetT - this.limitT
          return Boolean(
            this.filteredT.slice(prevOffset, this.limitT + prevOffset).length
          )
        },
   },

   data: () => ({
      isbusy:false,
      amount: '',
      form: {
        typetitre: "CC",
        numtitre: "", // string, obligatoire
        idorganisation: 3, // int, obligatoire
        superficie:"",
        numdecretclassement: "",
        datedecret: "",
        numarrete: "",
        datearrete: "",
      },
      filedecret:null,
      filearrete:null,
      filecaution:"",
      visiblearreteapprobation:true,
      entite:{
        id:1,
        libelle:''
      },

      titres:[],
      searchtitre:"",
      offset: 0,
      limit: 10,
      offsetT: 0,
      limitT: 10,
      section: "vc",
      submitted:false,
      submittedContinue:false,
      fieldsLocation: [{ arrondissement: '',departement: '', region: '' }],
      fielsContrat: [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", numacte:"", dateacte: ""}],
      
      fielsEssencesInterdites: [{ nomcommercial: "",}],
      fielsEssencesSousAmenagement: [{ nomcommercial: "",diametre:""}],
  }),

  methods: {

    AddFieldLocalisation () {
      this.fieldsLocation.push({ arrondissement: "", departement: "", region:""});
    },
    deleteAllLocations(){
      this.fieldsLocation = [{ arrondissement: "", departement: "", region: ""}]
    },
    addFieldContrat () {
      this.fielsContrat.push({ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""});
    },
    addFieldEssenceInterdites () {
      this.fielsEssencesInterdites.push({ nomcommercial: ""});
    },
    addFieldEssenceSousAmenagement () {
      this.fielsEssencesSousAmenagement.push({ nomcommercial: "", diametre: ""});
    },
    
    deleteAllContrats(){
      this.fielsContrat = [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""}]
    },
    deleteAllEssencesInterdites(){
      this.fielsEssencesInterdites = [{ nomcommercial: ""}]
    },
    deleteAllEssencesSousAmenagement(){
      this.fielsEssencesSousAmenagement = [{ nomcommercial: "", diametre: ""}]
    },
    removeAtIndexLocations(index) {
      this.fieldsLocation.splice(index, 1);
    },
    removeAtIndexContrats(index) {
      this.fielsContrat.splice(index, 1);
    },
    removeAtIndexEssenceInterdite(index) {
      this.fielsEssencesInterdites.splice(index, 1);
    },
    removeAtIndexEssenceSousAmenagement(index) {
      this.fielsEssencesSousAmenagement.splice(index, 1);
    },
    async selectdecretfile(e){
      const filedecret = this.filedecret =  e.target.files[0];
      this.form.filedecret=await this.getBase64(filedecret)
    },
    async selectdocarrete(e){
      const filearrete = this.filearrete =  e.target.files[0];
      this.form.filearrete =await this.getBase64(filearrete)
    },


    validateState(ref){
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
      this.$titres.get("titres/cc?size=400", {params}).then(response => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.titres=response.data.result.items
          if(php.empty(this.titres)){
            console.log('aucun titre trouvé !!!');
          }
        this.isBusy=false
      })
        .catch((error) => {
          console.log(error)
          this.isBusy=false
        });

    },  

    getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
    },

    resetForm() {
        this.form = {
          typetitre: "CP", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
          dateattribution: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
          dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
          numappeloffre: "", dateappeloffre: "", documentappeloffre: "",
          numdepot: "",  datedepot: "", documentdepot: "", numplan: "", 
          dateplan: "", documentplan: "", numservicebraconnage: "", 
          dateservicebraconnage: "", documentservicebraconnage: "", numnotesanction: "", 
          datenotesanction: "",documentnotesanction: "", arrondissement:""
        };

    },
    async addTitreAndContinue(){
          this.$validator.validateAll().then(result => {if (!result) {return;}
              this.form.idorganisation=this.user.idOrganisation 

          this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
          console.log('données envoyées',this.form);
          this.submittedContinue = true
            this.$titres.post('titres', this.form).then(response => {
            this.submitted2 = false 
            this.$emit('titreAddedAndContinue',response)
            this.resetForm()
            return console.log('respone après ajout', response); 
            }).catch(error => {
              this.submittedContinue = false
              console.log('erreur',error.message)
              this.errorHappened(error)
            })
          })
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
    async addTitre(){
          this.$validator.validateAll().then(result => {if (!result) {return;}

          this.submitted = true
          this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
          console.log("data site", this.form)
              this.$titres.post('titres', this.form).then(response => {
                  this.submitted = false 
                  this.$emit('titreAdded',response)
                  this.resetForm()
                    App.notifySuccess(response.data.message)
                  return setTimeout(() => {this.$router.push({ name: "concession_en_cp" }); }, 200);
              }).catch(error => {
                  this.submitted = false
                  console.log('erreur titre',error.message)
                  this.errorHappened(error)
              })
          })
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
    onSearchTitre(query) {
      this.searchtitre = query
      this.offsetT = 0
    },
  },
   mounted() {
    this.$refs["intialtabselect"].click()
    this.entite.libelle=this.user.profil.organisation
    this.getTitres()
  },

}
</script>


<style scoped>



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

</style>