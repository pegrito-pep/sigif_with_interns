<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Vente de coupe</h4></b-col>
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="addTitreVC" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN VENTE DE COUPE-->
          <div>
              <b-row class="m-4">

                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span>Type du titre</b-col>
                    <b-col cols="8">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="VC" selected disabled>Vente de coupe</option>
                      </select>
                    </b-col>
                  </b-row>
               
                  <b-row>
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span>Entité forrestière</b-col>
                    <b-col cols="8">
                      <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="form.organisation" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
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

                <b-col cols="4">
                  <b-row class="m-2">
                    <b-col cols="6" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span> Vente de coupe N°</b-col>
                    <b-col cols="5">
                      <input class="system-input-nom-promoteur"  v-model="form.numTitre"  size="sm"  placeholder="" type="text"/>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="6" class="font-weight-bold">Superficie Totale (ha)</b-col>
                    <b-col cols="5">
                      <b-form-input type="number" v-model="form.superficieTotal" name="superficie" size="sm" class="system-input-nom-promoteur p-0 m-0 font-weight-300" placeholder=""  v-validate="{ required: true, min: 1 }" :state="validateState('superficie')"/>
                      <b-form-invalid-feedback id="superficie">{{ veeErrors.first('superficie') }}</b-form-invalid-feedback>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>

              <b-tabs id="tabs" class="w-100" >
              
                <b-tab class="contents" @click.prevent="section = 'vc'" title="Vente de coupe n°">
                  <b-row class="w-100 mx-3 d-flex justify-content-between">
                    <b-col cols="4">
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° acte attribution" label-for="input-sm">
                        <b-form-input v-model="form.numArreteattribution" name="arreteattribution" size="sm" class="w-50 p-0 font-weight-300 default-old-system-input-properties" placeholder=""  v-validate="{ required: true, min: 1 }" :state="validateState('arreteattribution')"/>
                        <b-form-invalid-feedback id="arreteattribution">{{ veeErrors.first('arreteattribution') }}</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° caution" label-for="input-sm">
                        <b-form-input v-model="form.numcautionnement" name="numcautionnement" size="sm" class="w-50 p-0 m-0 font-weight-300 default-old-system-input-properties" placeholder=""  v-validate="{ required: true, min: 1 }" :state="validateState('numcautionnement')"/>
                        <b-form-invalid-feedback id="numcautionnement">{{ veeErrors.first('numcautionnement') }}</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° notification" label-for="input-sm">
                        <b-form-input v-model="form.numnotificationapprobation" name="numnotificationapprobation" size="sm" class="w-50 p-0 m-0 font-weight-300 default-old-system-input-properties" placeholder=""  v-validate="{ required: true, min: 1 }" :state="validateState('numnotificationapprobation')"/>
                        <b-form-invalid-feedback id="numnotificationapprobation">{{ veeErrors.first('numnotificationapprobation') }}</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Offre financière" label-for="input-sm">
                        <b-form-input type="number" v-model="form.offreFinancier" name="montantoffre" size="sm" class="w-50 py-0 px-1 m-0 font-weight-300 default-old-system-input-properties" placeholder=""  v-validate="{ required: true, min: 1 }" :state="validateState('montantoffre')"/>
                        <b-form-invalid-feedback id="montantoffre">{{ veeErrors.first('montantoffre') }}</b-form-invalid-feedback>  
                      </b-form-group>
                      <b-form-group v-if="form.offreFinancier!=''" label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Offre financière Totale" label-for="input-sm">
                        <h6 class="font-weight-bold">{{ commify(offrefinancieretotale) }}</h6>
                      </b-form-group>
                    </b-col>
  
                    <b-col cols="3">
                      <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date d'attribution" label-for="input-sm">
                          <input class="sigif-input-date" type="date" v-model="form.dateattribution" format="YYYY-MM-DD"/>
  
                        <!--<date-picker  v-model="form.dateattribution"  format="DD-MM-YYYY" placeholder="2022-12-22"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>-->
                      </b-form-group>
                      <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date fin validité" label-for="input-sm">
                        <span class="font-weight-bold">{{ form.datefinvalidite }}</span>
                        <!--<input disabled class="sigif-input-date" type="date" v-model="form.datefinvalidite" format="YYYY-MM-DD" />-->
                      </b-form-group>
                      <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date caution" label-for="input-sm">
                        <input class="sigif-input-date" type="date" v-model="form.datecautionnement" format="YYYY-MM-DD" />
                        <!--<date-picker  v-model="form.datecautionnement"  format="DD-MM-YYYY" placeholder=""  valueType="2022-07-18" class="w-100" :clearable="false"/>-->
                      </b-form-group>
                      <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date notification" label-for="input-sm">
                        <input class="sigif-input-date" type="date" v-model="form.datenotificationapprobation" format="YYYY-MM-DD" />
                      </b-form-group>
                     
                    </b-col>
  
                    <b-col cols="4">
  
                      <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="acte attribution" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectActeAttributionFile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileacteattribution" class="file-name">{{ fileacteattribution.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="Acte de Notification" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectActeNotificationFile"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="fileactenotification" class="file-name">{{ fileactenotification.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                      <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="Pièce jointe caution" label-class="font-weight-normal" label-for="input-sm">
                        <div class="upload-container">
                          <label>
                            <input type="file" @change="selectFileCaution"/>
                            <b-img src="@/assets/images/download.png"></b-img>
                            
                            <span v-if="filecaution" class="file-name">{{ filecaution.name }}</span>
                            <span v-else class="title">cliquer pour choisir</span>
                          </label>
                        </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                   
                </b-tab>
                <b-tab class="contents" @click.prevent="section = 'Localisation'" title="Localisation vente de coupe N°">
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
                      <b-table height="50px" :items="itemslocation"  :fields="fieldslocalisation" :busy="isbusyLocation" class="mt-1" outlined   ref="selectableTablelocation" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
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
                    <b-row class="w-100  m-0 pt-2 px-1" v-for="(field, index) in elementsContrat" :key="index">
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
                </b-tab>
              </b-tabs>
      
              <div class="p-4 mb-5">
                <error-dialogue ref="errorDialogue"></error-dialogue>
                <created-box ref="createdDialogue"></created-box>
              </div>
          </div>
        </div>
      </b-overlay>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CreatedBox from '@/components/utils/Created.vue';

const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"vente-coupe-form",
  components:{ ErrorDialogue, CreatedBox},
   computed: {
    ...mapGetters(['user','hasAccess']),
    offrefinancieretotale(){
      return (parseFloat(this.form.offreFinancier) * parseFloat(this.form.superficieTotal))
    },
    valuesSetCorrectly() {
      return ( !php.empty(this.form.typetitre)&&!php.empty(this.form.numTitre)&&!php.empty(this.form.organisation));
    },
    itemslocation() { 
      return this.elementslocation.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
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
    hasPrevPageEntites(){   
      const prevOffset = this.offsetEntites - this.limitEntites
      return Boolean(
        this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
      )
    },

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
   },
   watch:{
    section(value){
      if(value=='Localisation'){
        this.getArrondissements()
      }
    },
    "form.dateattribution"(value) {
      if(!php.empty(value)){
        console.log('value ',value);
          let jour=value.split('-')[2]
          let mois=value.split('-')[1]
          let anneefin=parseFloat(value.split('-')[0]) + 3
        console.log('jour ',jour,' mois ',mois, ' année ', anneefin);

          this.form.datefinvalidite= anneefin+'-'+mois+'-'+jour
        console.log('datefinvalidite  ',this.form.datefinvalidite);

        }
        else{

        }
    },
  },
   data: () => ({
      isbusy:false,
      isbusyLocation:false,
      amount: '',
      entiteswithoutminfof:[],
      offsetEntites: 0,
      limitEntites: 10,
      form: {
        typetitre: "VC",
        numTitre: "", // (numero de la VC) string, obligatoire
        entiteForestiere: '', // int, obligatoire
        superficieTotal: '', // int, non obligatoire
        numnotificationapprobation:"",//string
        datenotificationapprobation:"",//date
        datecautionnement:"",
        offreFinancier :'',//int
        numArreteattribution :"",//String
        dateattribution:"",//date
        fichierAttribution:"",//String base64
        fichierActeNotification :"",//String base64
        localisations:[
          {
            idarrondissement :'',
          }
        ]
      },
      fileacteattribution:null,
      fileactenotification:null,
      filecaution:"",
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
      elementsContrat:[],
      showOverlayEntites:false,
      entiteswithoutminfof:[],
      searchentite:'',
      //tab location
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
   }),

  methods: {
    onSearchLocalisation(query){
      this.searcharrond = query
      this.offsetArrondissements = 0    
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
          message: 'Vente de coupe crée avec succès',
          okButton: 'Nouvel enregistrement',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.createdDialogue._close();
          this.resetForm();
          this.section='vc'
      } else {
          this.$refs.createdDialogue._close();
          this.$router.back();
      }
   },
    async addTitreVC(){
      let data={}
      data =this.form;
      data.entiteForestiere=this.form.organisation.idorganisation
      data.localisations=this.elementslocation;
        
        console.log('data ',data);
        this.submitted =true;

        this.$titres.post('titres/venteCoupe', data).then(response => {
            this.submitted = false   
           App.notifySuccess(response.data.message)
           return this.handleCreated();
        }).catch(error => {
          console.log('error ',error);
          if(error.response.data.status==400){
              this.submitted = false
              return this.errorHappened(error.response.data.result[0])
          }
            this.submitted = false
            this.errorHappened(error.response.data.result[0])
        })
    },
    onSearchArrondissement(query){
      this.searcharrond = query
      this.offsetArrondissements = 0
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
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
    },
    AddFieldLocalisation () {
      this.fieldsLocation.push({ idarrondissement: "", departement: "", region:""});
    },
    deleteAllLocations(){
      this.fieldsLocation = [{ idarrondissement: "", departement: "", region: ""}]
    },
    addFieldContrat () {
      this.elementsContrat.push({ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""});
    },
    deleteAllContrats(){
      this.elementsContrat = [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", acteapprobation:"", dateacte: ""}]
    },
    removeAtIndexLocations(index) {
      this.fieldsLocation.splice(index, 1);
    },
    removeAtIndexContrats(index) {
      this.elementsContrat.splice(index, 1);
    },
    async selectActeAttributionFile(e){
      const fileacteattri = this.fileacteattribution =  e.target.files[0];
      this.form.fichierAttribution=await this.getBase64(fileacteattri)
    },
    async selectActeNotificationFile(e){
      const fileactenotification = this.fileactenotification =  e.target.files[0];
      this.form.fichierActeNotification=await this.getBase64(fileactenotification)
    },
    async selectFileCaution(e){
      const filecautiion = this.filecaution =  e.target.files[0];
      this.form.filecaution=await this.getBase64(filecautiion)
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
          typetitre: "VC", numtitre: "", idorganisation: "",  superficie: "",  arreteattribution: "",
          dateattribution: "", montantoffre: "",   numcautionnement: "", datecautionnement: "", numnotificationapprobation: "", 
          datenotificationapprobation: "", documentattribution: "", 
          documentnotification: "", 
        };

    },
  
    async errorHappened(apimessage) {
        let message = apimessage!=''?apimessage:'erreur interne du serveur'
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
    onSearchTitre(query) {
      this.searchtitre = query
      this.offsetT = 0
    },
    async getTitresVCData(){
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
      console.log('arronduissements ',this.arrondissements);
      this.isbusyLocation=false
    }, 
  },
   mounted() {
    this.$refs["intialtabselect"].click()
    this.entite.libelle=this.user.profil.organisation
    this.getTitresVCData();
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
.sigif-input-date{
  width: 90%;
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