<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>ARB</h4></b-col>
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <b-button v-else  @click.prevent="enregistrer" :disabled="!valuesSetCorrectly" size="sm" :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
              <!--<span >
                <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>-->
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN CP-->
          <div>
              <b-row class="m-4">

                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3" class="font-weight-bold">Type du titre</b-col>
                    <b-col cols="8">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="ARB" selected disabled>Autorisation de récupération du bois</option>
                      </select>
                    </b-col>
                  </b-row>
               
                  <b-row>
                    <b-col cols="3" class="font-weight-bold"><span style="color: red; font-size:1rem">*</span>Entité forrestière</b-col>
                    <b-col cols="8">
                        <v-select @input="loadCatalogues" v-if="isMinfof" :options="paginatedEntites" v-model="form.organisation" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
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
                    <b-col cols="6" class="font-weight-bold"> Catalogue ARB N°</b-col>
                    <b-col cols="4">
                      <v-select :disabled="notSetOrganisation" :options="paginated" v-model="form.numtitre" :filterable="false" @search="onSearch" :reduce="titre => titre.numtitre" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="6" class="font-weight-bold">Superficie Totale (ha)</b-col>
                    <b-col cols="4">
                      <input type="number" v-model="form.superficie" name="superficie" size="sm" class="py-0 px-1 m-0 font-weight-300 sigif-old-system-input-arb" placeholder="" />
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>

              <error-dialogue ref="errorDialogue"></error-dialogue>
              <no-action-possible-dialogue ref="noactionpossibledialogue"></no-action-possible-dialogue>
          </div>
          <b-tabs id="tabs" class="w-100" >
            <b-tab class="contents" @click.prevent="section = 'arb'" title="Autorisation de récupération du bois n°">
              <b-row class="w-100 mx-3 d-flex justify-content-between">
                <b-col cols="4">
                  <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label-for="input-sm">
                    <template #label>
                      <div>
                        <span class="font-weight-bold">Acte d'attribution N°</span>
                      </div>
                    </template>
                    <input v-model="form.numacte" name="numacte" size="sm" class="w-75 py-0 px-1 m-0 font-weight-300 sigif-old-system-input-arb" placeholder="" />
                  </b-form-group>
                  <b-form-group  label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm"  label-for="input-sm">
                    <!--<template #label><span class="font-weight-bold">Montant Total de la vente</span><span style="color:red">*</span></template>-->
                    <template #label>
                      <div style="margin-top:-1em">
                        <span class="font-weight-bold">Montant Total de la vente</span><span class="sigif-required-asterix"> *</span>
                      </div>
                    </template>
                    <input type="number" v-model="form.motantotal" name="motantotal" size="sm" class="w-75 py-0 px-1 m-0 font-weight-300 sigif-old-system-input-arb" placeholder=""/>
                  </b-form-group>
                  <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° notification" label-for="input-sm">
                    <template #label>
                      <div style="margin-top:-1em">
                        <span class="font-weight-bold">Notification N°</span><span class="sigif-required-asterix"> *</span>
                      </div>
                    </template>
                    <input v-model="form.numnotificationapprobation" name="numnotification" size="sm" class="w-75 py-0 px-1 m-0 font-weight-300 sigif-old-system-input-arb" placeholder="" />
                  </b-form-group>
                  <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="6" label-size="sm" label="N° notification" label-for="input-sm">
                    <template #label>
                      <div>
                        <span class="font-weight-bold">N° de la quittance</span>
                      </div>
                    </template>
                    <input v-model="form.numquittance" name="numquittance" size="sm" class="w-75 py-0 px-1 m-0 font-weight-300 sigif-old-system-input-arb" placeholder="" />
                  </b-form-group>
                
                </b-col>
                <b-col cols="3">
                  <b-form-group label-cols="6" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° notification" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Date d'attribution</span></div>
                    </template>
                    <input type="date" v-model="form.dateattribution" class="sigif-old-system-input-arb">
                  </b-form-group>
             
                  <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Fin de validité</span></div>
                    </template>
                    <input type="date" v-model="form.datefinvalidite" class="sigif-old-system-input-arb">
                  </b-form-group>
                  <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Date quittance</span></div>
                    </template>
                    <input type="date" v-model="form.datefinvalidite" class="sigif-old-system-input-arb">
                  </b-form-group>
                  <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                    <template #label>
                      <div style="margin-top:-1em"><span class="font-weight-bold">Date notification</span><span class="sigif-required-asterix">*</span></div>
                    </template>
                    <input type="date" v-model="form.datenotificationapprobation" class="sigif-old-system-input-arb">
                  </b-form-group>
                </b-col>

                <b-col cols="4">
                  <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label-class="font-weight-normal" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Acte d'attribution</span></div>
                    </template>
                    <div class="upload-container">
                      <label>
                        <input type="file" @change="selectActeAttributionFile"/>
                        <b-img src="@/assets/images/download.png"></b-img>
                        
                        <span v-if="fileacteattribution" class="file-name">{{ fileacteattribution.name }}</span>
                        <span v-else class="title">cliquer pour choisir</span>
                      </label>
                    </div>
                  </b-form-group>
                  <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label-class="font-weight-normal" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Acte de notification</span></div>
                    </template>
                    <div class="upload-container">
                      <label>
                        <input type="file" @change="selectActeNotificationFile"/>
                        <b-img src="@/assets/images/download.png"></b-img>
                        
                        <span v-if="fileactenotification" class="file-name">{{ fileactenotification.name }}</span>
                        <span v-else class="title">cliquer pour choisir</span>
                      </label>
                    </div>
                  </b-form-group>
                  <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label-class="font-weight-normal" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Catalogue</span></div>
                    </template>
                    <div class="upload-container">
                      <label>
                        <input type="file" @change="selectfilecatalogue"/>
                        <b-img src="@/assets/images/download.png"></b-img>
                        
                        <span v-if="filecatalogue" class="file-name">{{ filecatalogue.name }}</span>
                        <span v-else class="title">cliquer pour choisir</span>
                      </label>
                    </div>
                  </b-form-group>
                  <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label-class="font-weight-normal" label-for="input-sm">
                    <template #label>
                      <div><span class="font-weight-bold">Quittance</span></div>
                    </template>
                    <div class="upload-container">
                      <label>
                        <input type="file" @change="selectFileQuittance"/>
                        <b-img src="@/assets/images/download.png"></b-img>
                        
                        <span v-if="filequittance" class="file-name">{{ filequittance.name }}</span>
                        <span v-else class="title">cliquer pour choisir</span>
                      </label>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
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
        </div>
      </b-overlay>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';

const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"titre-arb-form",
  components:{ ErrorDialogue,NoActionPossibleDialogue},
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
    valuesSetCorrectly(){
      return (!php.empty(this.form.organisation)&&!php.empty(this.form.motantotal)
      &&!php.empty(this.form.numnotificationapprobation)&&!php.empty(this.form.datenotificationapprobation));
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
      itemscontrat(){
        return this.elementscontrat.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
      },
  },
  watch:{
    elementscontrat(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTablecontrat'].selectRow(0) }, 200);
      }
    },
  },
   data: () => ({
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
      isbusy:false,
      isBusy:false,
      amount: '',
      form: {
        typetitre: "ARB",
        numtitre: "", // string, obligatoire
        idorganisation: 3, // int, obligatoire
        superficie:"",
        motantotal:"",
        numacte:"",
        datefinvalidite:"",
        numnotification:"",
        dateattribution:"",
        datenotification:"",
        numquittance:"",
        numproces:"",
        fileacteattribution:""
      },
      fileacteattribution:null,
      fileactenotification:null,
      filecatalogue:null,
      filequittance:null,
      entite:{
        id:1,
        libelle:''
      },
      entiteswithoutminfof:[],
      offsetEntites:0,
      limitEntites:10,
      titres:[],
      searchtitre:"",
      offset: 0,
      limit: 10,
      section: "arb",
      submitted:false,
      submittedContinue:false,
      fielsContrat: [{ raisonsociale: "", sigle: "", numcontrat:"",datecontrat:"", numacte:"", dateacte: ""}],

  }),

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
    async addTitreAR(){
      let data={}
      //data =this.form;
      data.typetitre = this.form.typetitre, 
      data.numcatalogue = this.form.numcatalogue, 
      data.numtitre = this.form.numtitre,
      data.idorganisation = this.form.organisation.idorganisation, 
      data.superficie = this.form.superficie, 
      data.arreteattribution =this.form.arreteattribution,
      data.dateattribution = this.form.dateattribution, 
      data.datefinvalidite = this.form.datefinvalidite,
      data.montantoffre = this.form.montantoffre,
      data.numcautionnement = this.form.numcautionnement,
      data.numnotificationapprobation = this.form.numnotificationapprobation, 
      data.datenotificationapprobation = this.form.datenotificationapprobation,
      data.documentattribution = this.form.documentattribution, 
      data.documentnotification = this.form.documentnotification

      if(!php.empty(this.elementslocation)&&!php.empty(this.elementslocation[0])){
        data.localisations=this.elementslocation.map( ({idarrondissement}) =>({
          idarrondissement
        }));
      } 
      console.log('data ',data);
        this.submitted =true;
        this.$titres.post('titres', data).then(response => {
            this.submitted = false   
            App.notifySuccess(response.data.message)
            return this.handleCreated();
        }).catch(error => {
          console.log('error ',error);
          this.submitted = false
          this.errorHappened(error.response.data.result.toString())
        })
    },

    //CHARGEMENT DES CATALOGUES ARB EN FONCTION L'ORGANISATION CONNECTEE
    async loadCatalogues(){
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
    AddFieldContrat(){
      if(this.elementscontrat.length<1){
        this.elementscontrat.unshift({ organisation: "", sigle: "", numcontrat:"", datecontrat:"", numacteapprobation:"", dateacteapprobation:""});
        return setTimeout(() => {this.$refs['selectableTablecontrat'].selectRow(0) }, 200);
      }
      else{
       for(let i=0; i<this.elementscontrat.length; i++){
        if(php.empty(this.elementscontrat[i].idorganisation)){
          return this.showDialogueLigne('Bien vouloir choisir l\'organisation')
        }
       }
        this.elementscontrat.unshift({ arrondissement: "", departement: "", region:""});
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
    async selectActeAttributionFile(e){
      const fileacteattri = this.fileacteattribution =  e.target.files[0];
      this.form.fileacteattribution=await this.getBase64(fileacteattri)
    },
    async selectActeNotificationFile(e){
      const fileactenotification = this.fileactenotification =  e.target.files[0];
      this.form.fileactenotification=await this.getBase64(fileactenotification)
    },
    async selectfilecatalogue(e){
      const filecatalog = this.filecatalogue =  e.target.files[0];
      this.form.filecatalogue=await this.getBase64(filecatalog)
    },
    async selectFileQuittance(e){
      const filequittance = this.filequittance =  e.target.files[0];
      this.form.filequittance=await this.getBase64(filequittance)
    },
    
    validateState(ref){
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) { 
        return !this.veeErrors.has(ref);
      }
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
      this.$titres.get("titres/ar?size=400", {params}).then(response => {
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
    onSearch(query) {
      this.searchtitre = query
      this.offset = 0
    },
  },
  mounted() {
    //this.$refs["intialtabselect"].click()
    this.entite.libelle=this.user.profil.organisation
    this.form.organisation = this.user.profil.idorganisation
   // this.getTitresARBData()
  },

}
</script>


<style scoped>

.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
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
.sigif-required-asterix{
  color:red;font-size:1.5rem;font-weight:bolder;margin-bottom:-1rem
}
.sigif-old-system-input-arb{
	background-color: White;
	color: #333333;
	border: 1px solid #637A95;
	padding: 1px 2px 1px 3px;
	margin: 1px;
	font-weight: normal;
	border-radius: 3px;
	overflow-x: hidden;
	overflow-y: auto;
	font-family: 'verdana';
	font-size: 13px;
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
