<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
      <div>
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
              <span class="font-weight-bold">Création Entrée usinage </span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
              <a v-else @click.prevent="sendFormEntreeUsinage" :disabled="disable"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
            </span>
          </b-col>
        </b-row>
        <!-- CREATION ligne de transformation-->
        <div>
          <b-row class="mx-4 d-flex justify-content-around">
            <b-col cols="6">
              <b-row class="m-2">
                <b-col cols="4">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Unité de tranformation</label>
                </b-col>
                <b-col cols="7">
                  <select v-model="form.utb" @change="getLignes"  class="m-0 p-0" :class="{ 'styleToSet': notSetUtb }"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(0.9em + .200rem + 2px) !important;">
                    <option v-for="(unite, i) in utbs" :value="unite.IDSITEOPER" :key="i">
                      {{ unite.INTITULE }}
                    </option>
                  </select>
                </b-col>
              </b-row>
              <b-overlay :show="showOverlayLigne" rounded="sm">
              <b-row class="m-2">
                
                  <b-col cols="4">
                    <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Ligne</label>
                  </b-col>
                  <b-col cols="7">
                    <v-select v-model="form.lignetransformation"  :options="paginatedLignes" :filterable="false" @search="onSearchLigne" label="intitule" :reduce="ligne => ligne.idligne" class="custom-select-type_titre" :class="{ 'styleToSet': notSetLignetransformation }">
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageLignes" @click="offsetlignes -= limitlignes">Prèc.</button>
                          <button :disabled="!hasNextPageLignes" @click="offsetlignes += limitlignes">Suiv.</button>
                      </li>
                    </v-select>
                  </b-col> 
              </b-row>
            </b-overlay>

            </b-col>
            <b-col cols="4">
              <b-row class="m-2">
                <b-col cols="4">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red;font-weight:900">*</span>Date opération</label>
                </b-col>
                <b-col cols="7">
                  <input style="width:48%" class="sigif-input-date" :class="{ 'styleToSet': notSetDateoper }" type="date" v-model="form.dateoper" format="YYYY-MM-DD"/>
                </b-col>
              </b-row>
              <b-row class="m-2">
                <b-col cols="4">
                  <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red;font-weight:900">*</span>Type de produit</label>
                </b-col>
                <b-col cols="7">
                  <select :class="{ 'styleToSet': notSetTypeproduit }" name="typeproduits" v-model="form.typeproduit" class="m-0 p-0 "   style="width:48%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem) !important;">
                    <option v-for="(type, index) in typesproduits" :value="type.IDTYPE_PRODUIT" :key="index" :selected="index==0" >
                      {{ type.LIBELLE }}
                    </option>
                  </select>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
            <div class="m-4 px-2 table-header-border mt-5">
              <b-row>
                  <b-col cols="1"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Détail du lot</h4></b-col>
                  <b-col class="liens">
                    <a @click.prevent="addField" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                    <a @click.prevent="RemouveFields" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout Supprimer</a>
                    <a style="cursor: pointer;" @click.prevent="handleFile" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                  </b-col>
              </b-row>
            </div>
            <div :class="{ 'widthfifty': form.typeproduit!='GR', 'widthseventyfive': form.typeproduit=='GR' }">
              <b-overlay rounded="sm" :show="showOverlayCodeData">
                <b-table v-if="form.typeproduit=='GR'" height="50px" :items="itemsgrumes"  :fields="fieldsgrumes" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelectedGrumes" :tbody-tr-class="rowClass">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(sequence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(nomcommercial)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(numdf10)="data">
                    <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                  </template>
                  <template v-slot:head(diampb)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(diamgb)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(longueur)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  <template v-slot:head(volume)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  <template #cell(codebarre)="data">
                    <input size="xs" @keydown.tab.prevent="checkCodebarre($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important" v-model="data.item.codebarre" />
                  </template>
                  <template #cell(sequence)="data">
                    <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important; width:85%" v-model="data.item.sequence" />
                  </template>
                  <template #cell(numdf10)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important" v-model="data.item.numdf10" />
                  </template>
                  <template #cell(nomcommercial)="data">
                    <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important; width:85%" v-model="data.item.nomcommercial" />
                  </template>
                  <template #cell(diampb)="data">
                    <input disabled size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left  font-weight-bold"  style="color:black!important" v-model="data.item.diampb" />
                  </template>
                  <template #cell(diamgb)="data">
                    <input disabled size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left"  style="color:black!important " v-model="data.item.diamgb" />
                  </template>
                  <template #cell(longueur)="data">
                    <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold  font-weight-bold"  style="color:black!important" v-model="data.item.longueur" />
                  </template>
                  <template #cell(volume)="data">
                    <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left  font-weight-bold"  style="color:black!important" v-model="data.item.volume" />
                  </template>
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFields(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                
                </b-table>
                <b-table v-else height="50px" :items="items"  :fields="fields" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   ref="selectableTableOther" select-mode="single" selectable @row-selected="onRowSelectedOther" :tbody-tr-class="rowClass">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(sequence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(nomcommercial)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(numdf10)="data">
                    <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                  </template>
                
                  <template v-slot:head(volume)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  
                  <template #cell(codebarre)="data">
                    <input size="xs" @keydown.tab.prevent="checkCodebarre($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                  </template>
                  <template #cell(sequence)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                  </template>
                  <template #cell(numdf10)="data">
                    <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
                  </template>
                  <template #cell(nomcommercial)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nomcommercial" />
                  </template>
                  <template #cell(volume)="data">
                    <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                  </template>
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFields(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                
                </b-table>
              </b-overlay>
            </div>

        </div>
      </div>
      <ChangeProductBox ref="changeProduct"></ChangeProductBox>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      <error-dialogue ref="errorbox"></error-dialogue>
      <file-component ref="filecomponent" @importsuccessfull="handleDataImported" :dto="dto"></file-component>

    </b-overlay>
  </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';
import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import FileComponent from '@/components/utils/transformation/ImportEntreeUsinageFile.vue';

import { mapGetters } from 'vuex'
export default {
  name:"entree-usinage-form",
  components:{ ErrorDialogue,NoActionPossibleDialogue, ChangeProductBox, CodeBarreInfo,FileComponent},
   computed: {
    ...mapGetters(['user','hasAccess']),
    itemsgrumes(){
      return this.elementsgrumes.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    items(){
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    filteredLignes() {
      return this.lignes.filter((ligne) =>
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
   data: () => ({
    dto:{}, //props envoyée pour l'import des entrées usinage
    notSetUtb:false, //variable de controle remplissage champ utb
    notSetLignetransformation:false, //variable de controle remplissage champ ligne de transformation
    notSetDateoper:false,//variable de controle remplissage champ nom de la ligne
    notSetTypeproduit:false,//variable de controle remplissage champ type de produit
    showOverlay:true,
    showOverlayEssences:false,
    showOverlayCodeData:false,
    submitted: false,
    searchessences: '',
    searchligne:'',
    offsetessences: 0,
    limitessences: 10,
    offsetlignes: 0,
    limitlignes: 10,
    showGrume: true, //propriété de controle affichage des champs pour le type de produit grumes
    essences:[],
    lignes:[],
    sites:[],
    utbs:[],
    typesproduits:[],
    showOverlayLigne:false,
    showOverlayCodeData:false,
    form: {
      utb: '', // int (id du site de type utb), obligatoire
      lignetransformation: '', // int (id de la ligne de transformation), obligatoire
	    typeproduit: "", // string,  id du type de produit, obligatoire
      dateoper: "", // string (format : YYYY-MM-DD), obligatoire
	    codebarres: [] // tableaux des codebarre a ajouter, est obligatoire
    },
    isActive:false,
    disable:true,
    dataresult:null, //objet permettant de rassembler les informations obtenues du code barre
    isBusy:false,

    produitsTrasformations:[],
    // Données du tableau
    fields: [ 
        { key: 'index', label: '' },
        { key: 'codebarre', label: 'Codebarre'}, 
        { key: 'sequence', label: 'Séquence' },
        { key: 'numdf10', label: 'N° DF10' },
        { key: 'nomcommercial', label: 'Essence' },
        { key: 'Volume', label: 'Volume' },
        { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elements:[],
    fieldsgrumes: [ 
        { key: 'index', label: '' },
        { key: 'codebarre', label: 'Codebarre'}, 
        { key: 'sequence', label: 'Séquence' },
        { key: 'numdf10', label: 'N° DF10' },
        { key: 'nomcommercial', label: 'Essence',thStyle: { width: "15%" } },
        { key: 'diampb', label: 'Diamètre petit bout',thStyle: { width: "15%" } },
        { key: 'diamgb', label: 'Diamètre gros bout',thStyle: { width: "15%" } },
        { key: 'longueur', label: 'Longueur'},
        { key: 'Volume', label: 'Volume'},
        { key: 'action', label: '',thStyle: { width: "5%" } },
    ],
    elementsgrumes:[]
  }),
    watch: {
      "form.utb"(value) {
        if(!php.empty(value)){
            this.notSetUtb= false
        }
        else{
            this.notSetUtb= true
        }
    },
    "form.lignetransformation"(value) {
      if(!php.empty(value)){
        this.notSetLignetransformation= false
      } 
      else{
            this.notSetLignetransformation= true
      }
    },
    "form.dateoper"(value) {
      if(!php.empty(value)){
        this.notsetDateoper= false
      } 
      else{
            this.notsetDateoper= true
      }
    },
    "form.typeproduit"(value){
      if(!php.empty(value)){
        this.notSetTypeproduit= false
      } 
      else{
        this.notSetTypeproduit= true
      }
    },
    elementsgrumes(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTablegrumes'].selectRow(0) }, 200);
      }
    },
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableOther'].selectRow(0) }, 200);
      }
    }  
  
    },
    methods: {
      async getLignes(){
        this.showOverlayLigne=true;
        try {
          this.lignes = await this.$transformation.get("lignes-transformation/raw?siteUtb="+this.form.utb).then(response => response.data.result.Items);
          console.log('lignes ',this.lignes);
        // this.$store.dispatch('lignes', this.lignes)
        } catch (error) {
          console.log(error.message);
        }
        this.showOverlayLigne=false;
      },
      handleFile(){
        if (php.empty(this.form.utb)) {
          this.notSetUtb=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.lignetransformation)) {
          this.notSetLigneTransformation=true;
          let error={ message:'Veuillez choisir une ligne'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateoper)) {
          this.notSetDateoper=true;
          let error={ message:'Veuillez renseigner la date de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.typeproduit)) {
          this.notSetTypeproduit=true;
          let error={ message:'Veuillez choisir le type de produit'}
          return this.sendAlertMessage(error);
        }
      
        let data={
          utb: this.form.utb, lignetransformation:this.form.lignetransformation, typeproduit: this.form.typeproduit, dateoper:this.form.dateoper
        }
        this.dto=data
        this.showUploadFile();
      },
      async showUploadFile(){
        const ok = await this.$refs.filecomponent.show({
          title:'entrée usinage',
          okButton: 'valider',
          cancelButton: 'Annuler'

        })
      },
      //méthode de gestion e l'upload de fichier csv
      addField(){
        if (php.empty(this.form.utb)) {
          this.notSetUtb=true;
          let error={ message:'Veuillez choisir le site de l\'opération'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.lignetransformation)) {
          this.notSetLigneTransformation=true;
          let error={ message:'Veuillez choisir une ligne'}
          return this.sendAlertMessage(error);
        }
        if(this.form.typeproduit=='GR'){
          this.elementsgrumes.unshift({codebarre: '', reference: '', lignedf10: "", nomcommercial:'', dpb:'',dgb:'',longueur:'',volume:'', });
        }
        else{
          this.elements.unshift({codebarre: '', reference: '', lignedf10: "", nomcommercial:'',volume:''});
        }
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
      RemouveFields(index){
        if(this.form.typeproduit=='GR'){
          this.elementsgrumes=[]
        }else{
          this.elements=[]
        }
      },
      RemouveAllFieldsGrumes(){
        this.elementsgrumes=[];
      },
      async checkCodebarre(value,index, commande){
          this.showOverlayCodeData=true;
            if(commande='codebarre'){
              console.log('value 1',value);
              if(this.form.typeproduit=='GR'){
                await this.$codesbarres.post("check/check_codebarre_entreeUsine", {codebarre : value, idsiteUtb:this.form.utb, typeproduit:this.form.typeproduit })
                .then(response =>{
                  let anomalies={} 
                  anomalies.message=response.data.result.annomalies
                  if(anomalies.message!=undefined){
                    this.showOverlayCodeData=false;
                    return this.errorHappened(anomalies)
                  }else{
                    this.dataresult =response.data.result
                    this.elementsgrumes[index].sequence=this.dataresult.sequence
                    this.elementsgrumes[index].numdf10=this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
                    this.elementsgrumes[index].nomcommercial=this.dataresult.nomcommercial !==null ? this.dataresult.nomcommercial :"" ;
                    this.elementsgrumes[index].diampb=this.dataresult.diampb !==null ? this.dataresult.diampb :"" ;
                    this.elementsgrumes[index].diamgb=this.dataresult.diamgb !==null ? this.dataresult.diamgb :"" ;
                    this.elementsgrumes[index].longueur=this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
                    this.elementsgrumes[index].volume=this.dataresult.volume !==null ? this.dataresult.volume :"" ;
                  }
                  
                  this.showOverlayCodeData=false;

                })
                .catch(error =>{
                  console.log('execution du catch aussi 1',error);
                  this.showOverlayCodeData=false;
                  this.errorHappened(error);
                } )
              }
              if(this.form.typeproduit=='CL'){
                await this.$codesbarres.post("check/check_codebarre_entreeUsine", {codebarre : value, idsiteUtb:this.form.utb, typeproduit:this.form.typeproduit })

                .then(response =>{
                  this.dataresult =response.data.result
                  this.elementsdebites[index].sequence=this.dataresult.Items[0].reference
                  this.elementsdebites[index].numdf10=this.dataresult.Items[0].numDf10 !==null ? this.dataresult.Items[0].numDf10 :"" ;
                  this.elementsdebites[index].nomcommercial=this.dataresult.Items[0].nonusuel !==null ? this.dataresult.Items[0].nonusuel :"" ;
                  this.elementsdebites[index].epaisseur=this.dataresult.Items[0].epaisseur !==null ? this.dataresult.Items[0].epaisseur :"" ;
                  this.elementsdebites[index].largeur=this.dataresult.Items[0].largeur !==null ? this.dataresult.Items[0].largeur :"" ;
                  this.elementsdebites[index].longueur=this.dataresult.Items[0].longueur !==null ? this.dataresult.Items[0].longueur :"" ;
                  this.elementsdebites[index].nombrepiece=this.dataresult.Items[0].volume !==null ? this.dataresult.Items[0].volume :"" ;
                  this.showOverlayCodeData=false;
                })
                .catch(error =>{
                  console.log('execution du catch aussi 2',error);
                  this.showOverlayCodeData=false;
                  this.errorHappened(error.response.data);
                })
              }
              
            }     
        },
        handleDataImported(data){
          for(let i=0;i<data.length; i++){
            if(this.form.typeproduit=='GR'){
              this.elementsgrumes.push(data[i])
            }else{
              this.elements.push(data[i])
            }
          }
          this.$refs.filecomponent._close();
        },
        rowClass(item, type) {
          if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
          }else{
            return 
          }
        },
        onRowSelectedGrumes(items) {
          console.log('row selected',items);
          items.isSelected =true;
        },
        onRowSelectedOther(items) {
          console.log('row selected',items);
          items.isSelected =true;
        },
        fermer() {
          this.$router.back()
        },
        resetForm() {
          this.form = {
            utb: '', lignetransformation: '', typeproduit: "", dateoper: "",codebarres: []
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
        async sendFormEntreeUsinage() {
          this.form.codebarres =  [];
          if(this.form.typeproduit =='GR'){
              this.elementsgrumes.forEach(field => {
              this.form.codebarres.push(field.codebarre)
            }) 
          }else {
            this.elements.forEach(field => {
              this.form.codebarres.push(field.codebarre)
            }) 
          }
          
          if (php.empty(this.form.utb)) {
            this.notSetUtb=true;
            let error={ message:'Veuillez remplir l\'unité de transfotmation'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.lignetransformation)) {
            this.notSetLignetransformation=true;
            let error={ message:'Veuillez remplir la ligne de transformation'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.dateoper)) {
            this.notSetDateoper=true;
            let error={ message:'Veuillez renseigner la date'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeproduit)) {
            this.notSetTypeproduit=true;
            let error={ message:'Veuillez choisir un type de produit'}
            return this.sendAlertMessage(error);
          }
        // console.log('données tableau 2', this.form.rendements);
          console.log('données envoyées ',this.form);
          this.submitted =true;
          this.$transformation.post('entrees-usinage', this.form).then(response => {
              this.submitted = false 
              this.resetForm()
              App.notifySuccess(response.data.message)
              return this.$router.push({ name: "entree_usinage" });
          }).catch(error => {
              console.log('entrée dans le catch');
              this.submitted = false
              this.errorHappened(error)
          })
        },
        async errorHappenedServeur(error) {
          let message=error.message!=undefined ?error.message :'erreur interne du serveur'
            const ok = await this.$refs.errorbox.show({
                title: 'Erreur survenue',
                message: message,
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
          const ok = await this.$refs.codebarreinfo.show({
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
                this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                this.$store.dispatch('essences', this.essences)
            } catch (error) {
                console.log(error.message);
            }
          }
    
          this.showOverlayEssences=false
      },
      async getEntreeUsinageData(){
        this.showOverlay=true;
        if(!this.$store.state.sites){
          this.sites=this.$store.state.sites;
          this.utbs=this.sites.filter(elt => elt.IDORGASITEPUUTB ==this.user.idOrganisation&&elt.TYPESITEOPER=='UTB')
        }
        else{
          try {
              this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
              this.$store.dispatch('sites', this.sites)
              this.utbs=this.sites.filter(elt =>elt.IDORGASITEPUUTB ==this.user.idOrganisation&&elt.TYPESITEOPER=='UTB')
            } catch (error) {
                console.log(error.message);
            }
        }
        if(!this.$store.state.typesproduits){
          this.typesproduits=this.$store.state.typesproduits;
        }
        else{
          try {
                this.typesproduits = await this.$donneesReference.get("types-produits/raw").then(response => response.data.result);
                this.$store.dispatch('typesproduits', this.typesproduits)
            } catch (error) {
                console.log(error.message);
            }
        }
        /*if(!php.empty(this.$store.state.lignes)){
          this.lignes=this.$store.state.lignes;

        }
        else{
          try {
            this.lignes = await this.$transformation.get("lignes-transformation/raw").then(response => response.data.result.Items);
            this.$store.dispatch('lignes', this.lignes)
          } catch (error) {
            console.log(error.message);
          }
        }*/
        console.log('utbs ',this.utbs);
        this.showOverlay=false;
      },
    //recupération des lignes de l'utb sélectiionnée
    /*async getLignesUtb(){
        console.log('entrée variation',this.form.utb);
        this.showOverlayLignesUtb = true;
        try {
          this.lignesUtb = await this.$transformation.get("lignes-transformation/site/"+this.form.utb+"/raw?statut=VALIDE").then(response =>   response.data.result);
          console.log('lignes utb', this.lignesUtb);
          this.showOverlayLignesUtb = false;
        } catch (error) {
          this.showOverlayLignesUtb = false;
            console.log(error.message);
        }
      },*/
    onSearch(query) {
      this.searchessences = query
      this.offsetessences = 0
    },
    onSearchLigne(query){
      this.searchligne = query
      this.offsetlignes = 0
    },
    processTags(value, index, key) {

      setTimeout( async () => {
          if (key === "codebarre") {
            try {
              this.showOverlayCodeData=true;
                this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : this.fields[index].codebarre }).then(response => response.data.result);
                console.log('donnée obtenue ',this.dataresult);
                this.fields[index].codebarre = this.dataresult.codebarre;
                this.fields[index].sequence = this.dataresult.sequence;
                this.fields[index].essence = this.dataresult.nomcommercial;
                this.fields[index].diampb = this.dataresult.diampb;
                this.fields[index].diamgb = this.dataresult.diamgb;
                this.fields[index].longueur = this.dataresult.longueur;
                this.fields[index].volume = this.dataresult.volume;
              this.showOverlayCodeData=false;
              
            } catch (error) {
                console.log('code ',error.response.data.code);
                this.showOverlayCodeData=false;
                this.errorHappened(error.response.data, index);
            }
          }
          if (key === "sequence") {
            this.fields[index].codebarre = data.codebarre;
          }
      }, 50);
    },
    async errorHappened(error, index){
      let message=error.message!=undefined ?error.message :'erreur interne du serveur'
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
    }
  },
  mounted() {
      this.getEntreeUsinageData()
  },

}
</script>


<style scoped>
.widthfifty{
  width: 50%;
}
.widthseventyfive{
  width: 80%;
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

</style>