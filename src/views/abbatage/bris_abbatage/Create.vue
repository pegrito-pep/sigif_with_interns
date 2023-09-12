<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span >Lot bris abattage <span class="font-weight-bold"></span> </span>
              </h4>
              </b-col> 
              
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="enregistrer"  size="sm" style="cursor: pointer"  class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <div class="container1 mx-3 mt-3">
            <b-overlay :show="showOverlayFeuilletsDF10" rounded="sm">
              <b-row style="border-bottom: solid 2px green; " class="d-flex justify-content-between">
                <b-col cols="4">
                  <div class="ml-2">
                    <label for=""><span style="color: red">*</span>Numéro de permis</label>
                    <v-select @input="getFeuilletsPermis" :options="paginatedPermis" v-model="form.numpermis" :reduce="permis =>permis.idpermis" :filterable="false" @search="onSearchPermis" label="numpermis" class="custom-select-type_titre" :class="{'border-danger-date': notSetNumpermis }">
                      <li slot="list-footer" class="pagination">
                        <button :disabled="!hasPrevPagePermis" @click="offsetPermis -= limitPermis">Prèc.</button>
                        <button :disabled="!hasNextPagePermis" @click="offsetPermis += limitPermis">Suiv.</button>
                      </li>
                      <template #option="{ numpermis, idpermis }">
                        <span class="font-weight-bold">{{ numpermis }}</span>
                        <br />
                        <span class="text-muted">{{ idpermis }}</span>
                      </template>
                    </v-select>
                    <span v-if="notSetNumpermis==true" class="text-danger">bien vouloir renseigner ce champ</span>
                  </div>
                </b-col>
                <b-col cols="3">
                    <div class="ml-2">
                      <label for=""><span style="color: red">*</span>Numéro DF10</label>
                      <v-select :options="paginatedDF10" v-model="form.numdf10"  :filterable="false" @search="onSearchDF10" :reduce="df10 =>df10.numerodf10" label="numerodf10" class="custom-select-type_titre" :class="{'border-danger-date': notSetNumdf10 }">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageDF10" @click="offsetDF10 -= limitDF10">Prèc.</button>
                            <button :disabled="!hasNextPageDF10" @click="offsetDF10 += limitDF10">Suiv.</button>
                        </li>
                        <template #option="{ numerodf10, codebarre }">
                          <span class="font-weight-bold">{{ numerodf10 }}</span>
                          <br />
                          <span class="text-muted">{{ codebarre }}</span>
                        </template>
                      </v-select>
                    <span v-if="notSetNumdf10==true" class="text-danger">bien vouloir renseigner ce champ</span>
                    </div>
                </b-col>
                <b-col class="ml-5" cols="3">
                    <label for=""><span style="color: red">*</span>Date abattage</label>
                    <b-form-group label="" description="">
                        <date-picker v-model="form.dateabatage" placeholder="Selectionner une date" format="YYYY-MM-DD" valueType="YYYY-MM-DD" class="w-75" :class="{'border-danger-date': notSetDateAbattage }" :clearable="false" />
                    </b-form-group>
                </b-col>
              </b-row>
            </b-overlay>
              <div class="m-0 px-2 table-header-border">
                <b-row>
                  <b-col cols="2"><h4 class="tab-header-left-text"> Tige abbatue</h4></b-col>
                  <b-col class="ml-1 liens">
                    <a style="cursor: pointer;" @click.prevent="AddField" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                    <a style="cursor: pointer;" @click.prevent="deleteAll" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                    <a style="cursor: pointer;" @click.prevent="resetTigesFields" class="mx-1 simple-btn">Reinitialiser</a>
                  </b-col>
                </b-row>
              </div>
              <div>
                <b-overlay :show="showOverlayCodeData" rounded="sm">
                  <template #overlay>
                    <div class="text-center">
                      <i class="fas fa-2x fa-sync fa-spin"></i>
                      <p id="cancel-label">Chargement...</p>
                    </div>
                  </template>
                  <b-row class="mx-1 p-2 m-1">
                    <b-col >
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Code barre bris abattage" label-for="input-sm">
                        <b-form-input @keydown.tab.prevent="getDataDetailsGrume($event.target.value)" v-model="form.codebarre" name="codebarre" size="sm" class="w-75 px-2 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true}" :state="validateState('codebarre')" aria-describedby="codebarre" data-vv-as="codebarre"/>
                        <b-form-invalid-feedback id="codebarre">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Séquence CB" label-for="input-sm">
                        <b-form-input  v-model="form.sequence" disabled name="sequencecb" size="sm" class="w-75 px-2 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true}" :state="validateState('sequence')" aria-describedby="sequence" data-vv-as="sequence"/>
                        <b-form-invalid-feedback id="sequence">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Nom Essence" label-for="input-sm">
                        <v-select :options="paginated" style="width:73%" v-model="form.essence"  :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre" :class="{'border-danger-date': requiredEssence }">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                              <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                          </li>
                        </v-select>
                        <span v-if="requiredEssence==true" class="text-danger">bien vouloir renseigner ce champ</span>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Diamètre petit bout" label-for="input-sm">
                        <b-form-input v-model="form.diampb" name="diampb" size="sm" class="w-50 px-2 m-0 font-weight-300 form-control-xs" placeholder="" v-validate="{ required: true}" :state="validateState('diampb')" aria-describedby="diampb" data-vv-as="diampb"/>
                        <b-form-invalid-feedback id="diampb">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Diamètre gros bout" label-for="input-sm">
                        <b-form-input v-model="form.diamgb" name="diamgb" size="sm" class="w-50 px-2 m-0 font-weight-300 form-control-xs" placeholder="" v-validate="{ required: true}" :state="validateState('diamgb')" aria-describedby="diamgb" data-vv-as="diamgb"/>
                        <b-form-invalid-feedback id="diamgb">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Longueur" label-for="input-sm">
                        <b-form-input v-model="form.longeur" name="longeur" size="sm" class="w-50 px-2 m-0 font-weight-300 form-control-xs" placeholder="" v-validate="{ required: true}" :state="validateState('longeur')" aria-describedby="longeur" data-vv-as="longeur"/>
                        <b-form-invalid-feedback id="longeur">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group label-cols="2" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="UTM x" label-for="input-sm">
                        <b-form-input v-model="form.utmx" name="utmx" size="sm" class="w-25 px-2 m-0 font-weight-300 form-control-xs" placeholder="" v-validate="{ required: true}" :state="validateState('utmx')" aria-describedby="utmx" data-vv-as="utmx"/>
                        <b-form-invalid-feedback id="utmx">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                      <b-form-group label-cols="2" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="UTM y" label-for="input-sm">
                        <b-form-input v-model="form.utmy" name="utmy" size="sm" class="w-25 px-2 m-0 font-weight-300 form-control-xs" placeholder="" v-validate="{ required: true}" :state="validateState('utmy')" aria-describedby="utmy" data-vv-as="utmy"/>
                        <b-form-invalid-feedback id="utmy">donnée obligatoire</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-overlay>
              </div>
    

          </div>
        </div>
      </b-overlay>    
       
          <ChangeProductBox ref="changeProduct"></ChangeProductBox>
          <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
          <!--entete des tableaux -->
          <div class="mt-5 px-2 table-header-border">
            <b-row>
              <b-col cols="3"><h4 class="tab-header-left-text"> Liste des bris abattages</h4></b-col>
              <b-col class="ml-1">
                 <a @click.prevent="setFieldsToUpdate" style="cursor: pointer;" class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Modifier</a>
                 <a style="cursor: pointer;" class="mx-1 simple-btn ml-2"><b-img  src="@/assets/images/excel.png"></b-img>Importer</a>
                 <span>
                   <a style="cursor: pointer;"  class="mx-1 simple-btn">Télécharger le modèle d'import</a>
                   <a style="cursor: pointer;"  class="mx-1 simple-btn"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                 </span>
              </b-col>
            </b-row>
            <div class="mx-1">
              <b-table :items="items" :fields="entetes" :busy="isBusy" class="mt-3" outlined select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                <template v-slot:head(index)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>  
                <template v-slot:head(diampb)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                  </template>
                  <template v-slot:head(diamgb)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                  </template>
                  <template v-slot:head(longeur)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                  </template>

                  <template #cell(index)="data"><b class="d-flex justify-content-center align-items-center" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  <template #cell(diampb)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diampb }}</b> </span>
                  </template>
                  <template #cell(diamgb)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diamgb }}</b> </span>
                  </template>
                  <template #cell(longeur)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.longeur }}</b> </span>
                  </template>
              </b-table>
            </div>
          </div>
              
        
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

  import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
  name: "create_bris_abattage",
  components: {
    ChangeProductBox,
    CodeBarreInfo,
  },
  data: () => ({
    submitted:false,
    permis:[],
    searchpermis:'',
    offsetPermis: 0,
    limitPermis: 10,

    showOverlayFeuilletsDF10: false, //overlay de gestion du chargement des numéros de feuillets 
    numsdf10 : [],
    searchnumdf10:'',
    offsetDF10: 0,
    limitDF10: 10,
    elements: [],
    isBusy:false,
    isRowselected:false,
    /*propriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    search:'',

    showOverlayCodeData:false,
    showOverlay :true, //overlay de chargement des données de creation
    perPageSite: 10,
    currentPageSite: 1,
    rowsSite: 0,
    sites:[],
    essences:[],
    offset: 0,
    limit: 10,
    visible: true,


    heure: '08:20',

   

    form: {
      numpermis: '', 
	    dateabatage:"",
      numdf10:'',
      essence:'',
      codebarre: "",
      sequence:"",
      diampb:'',
	    diamgb:'',
      utmx:'',
      utmy:'',
      longeur:'',
      volume : ''
    },
    fieldsBrisAbattages:[],
    typeProduit: [
      { libelle: "Grume", value: 1 },
      { libelle: "Débité", value: 2 }
    ], 
    selected:{},
    entetes: [ 
      { key: 'index', label: 'N°',thStyle: { width: "2%" } },
      { key: 'codebarre', label: 'Code barre' ,thStyle: { width: "6%" }}, 
      { key: 'essence', label: 'Nom essence' ,thStyle: { width: "11%" }},
      { key: 'sequence', label: 'Sequence' ,thStyle: { width: "7%" }}, 
      { key: 'utmx', label: 'UTMx',thStyle: { width: "3%" } },
      {key : 'utmy', label :'UTMy',thStyle: { width: "3%" }}, 
      { key: 'diampb', label : 'Diamètre petit bout(en cm)',thStyle: { width: "12%" } },
      { key: 'diamgb', label: 'Diamètre Gros bout(en cm)' ,thStyle: { width: "12%" }}, 
      { key: 'longeur', label: 'Longueur(en m)',thStyle: { width: "10%" } }, 
      { key: 'volume', label: 'Volume ',thStyle: { width: "7%" } }
    ],
    notSetNumpermis:false,
    notSetDateAbattage:false,
    notSetNumdf10:false,
    requiredEssence:false
  }),
  watch:{
    "form.numpermis"(value){
      if(value!==null&&value.length!==''){
        this.notSetNumpermis= false
          
      }
      else{
        this.notSetNumpermis= true
      }
    },
    "form.numdf10"(value){
      if(value!==null&&value.length!==''){
        this.notSetNumdf10= false
          
      }
      else{
        this.notSetNumdf10= true
      }
    },
    "form.dateabatage"(value){
      if(value!==null&&value.length!==''){
        this.notSetDateAbattage= false
          
      }
      else{
        this.notSetDateAbattage= true
      }
    },
    "form.essence"(value){
      if(value!==null&&value.length!==''){
        this.requiredEssence= false
          
      }
      else{
        this.requiredEssence= true
      }
    }

  },
  computed:{
      items() { 
        return this.elements.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
      },
      filtered() {
        return this.essences.filter((essence) => essence.NOMUSUEL.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
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
      //traitement des numéros de permis
      filteredPermis() {
        return this.permis.filter((permi) => permi.idpermis)
        return this.permis.filter((permi) => permi.idpermis.includes(this.searchpermis))
      },
      paginatedPermis() {
        return this.filteredPermis.slice(this.offsetPermis, this.limitPermis + this.offsetPermis)
      },
      hasNextPagePermis() {
        const nextOffset = this.offsetPermis + this.limitPermis
        return Boolean(
          this.filteredPermis.slice(nextOffset, this.limitPermis + nextOffset).length
        )
      },
      hasPrevPagePermis() {   
        const prevOffset = this.offsetPermis - this.limitPermis
        return Boolean(
          this.filteredPermis.slice(prevOffset, this.limitPermis + prevOffset).length
        )
      },
      //traitement des df10
      filteredDF10() {
        return this.numsdf10.filter((df10) => df10.numerodf10)
        return this.numsdf10.filter((df10) => df10.numerodf10.includes(this.searchnumdf10))
      },
      paginatedDF10() {
        return this.filteredDF10.slice(this.offsetDF10, this.limitDF10 + this.offsetDF10)
      },
      hasNextPageDF10() {
        const nextOffset = this.offsetDF10 + this.limitDF10
        return Boolean(
          this.filteredDF10.slice(nextOffset, this.limitDF10 + nextOffset).length
        )
      },
      hasPrevPageDF10() {   
        const prevOffset = this.offsetDF10 - this.limitDF10
        return Boolean(
          this.filteredDF10.slice(prevOffset, this.limitDF10 + prevOffset).length
        )
      },

      

      /*propriétés liées aux accèes*/
      canCreateOperationParc(){return true},
      canUpdateOperationParc(){return true},
      canDeleteOperationParc(){return false},
      canViewDetailsOperationParc(){return true},
      canSaveOperationParc(){return false},
      canSubmitOperationParc(){return true;},
      canPrintOperationParc(){ return false;}, 

      items1() { 
        return this.elements1.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
      },
 
    },
 
    methods: {
      AddField () {
        this.$validator.validateAll().then(result => {if (!result) {return;}
        if(php.empty(this.form.essence)){
          this.requiredEssence=true;
          return;
        }
        else{ this.requiredEssence=false; }
           /* if(!this.form.es){this.requiredTysite=true; return;}
            else{this.requiredTysite=false;}*/
            this.setVolume(); //calcul du volume
            //insertion de l'entrée dans le tableau du bas
            this.elements.unshift({codebarre: this.form.codebarre, essence: this.form.essence.NOMUSUEL, idessence: this.form.essence.IDESSENCE, sequence: this.form.sequence, utmx: this.form.utmx, utmy: this.form.utmy, diampb: this.form.diampb, diamgb: this.form.diamgb, longeur: this.form.longeur, volume: this.form.volume },);
            //re-initialisation champ form ajout unitaire
            this.resetTigesFields();
        })
      },
      resetTigesFields(){
        this.form.codebarre='', this.form.sequence='', this.form.diampb='', this.form.diamgb='', this.form.longeur='', this.form.essence='', this.form.utmx='', this.form.utmy=''
      },
      async getDataDetailsGrume(value) {
          //controle du fait que le code barre n'est pas encore pris en compte
        if(this.fieldsBrisAbattages.length>1){
            this.fieldsBrisAbattages.forEach(field => {
              if(field.codebarre==value){
                return this.showDialogueLigne('codebarre déjà utilisé');
              }
            }) 
        }
          this.showOverlayCodeData=true;
          this.dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre : value}).then(response => response.data.result)
            .catch(error =>{
              this.showOverlayCodeData=false;
              this.errorHappened(error.response.data);
            } )
              console.log('donnée obtenue ',this.dataresult);
              this.form.sequence = this.dataresult.sequence;
              this.showOverlayCodeData=false;
      },
       //recupération des numéros de feuillet d'un permis donné
       async getFeuilletsPermis(){
        if(!php.empty(this.form.numpermis)){
          this.showOverlayFeuilletsDF10 = true;
        try {
          this.numsdf10 = await this.$abbattage.get("feuilletDf10/"+this.form.numpermis+'?size=100').then(response => response.data.result.Items);
          console.log('df10 trouvés', this.numsdf10);
          if(php.empty(this.numsdf10)){
            this.form.numpermis='';
           
            let error='aucun feuillet trouvé. CHOISIR UN AUTRE PERMIS';
            this.sendAlertMessage(error);
          }
            this.showOverlayFeuilletsDF10 = false;
          } catch (error) {
              this.showOverlayFeuilletsDF10 = false;
              console.log(error.message);
          }
        }
        
      },
      async showConfirmMessage(e){
        if (e.currentTarget.value == "Grume") {
          this.form.typeProduit = "Débité";
        }
        else {
          this.form.typeProduit = "Grume";
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
          this.showGrume = this.form.typeProduit == "Grume" ? true : false;
        }
        
      },
      //methode de calcul du volume
      setVolume(){
        const coef = parseFloat(0.19625)
        this.form.diampb = parseFloat(this.form.diampb) !=null ? parseFloat(this.form.diampb)  : 0
        this.form.diamgb = parseFloat(this.form.diamgb) !=null ? parseFloat(this.form.diamgb)  : 0
        this.form.longeur = parseFloat(this.form.longeur) !=null ? parseFloat(this.form.longeur)  : 0
        const dpb = this.form.diampb
        const dgb = this.form.diamgb
        const longeur = this.form.longeur
        console.log('vol ',dpb*dgb*longeur);
        this.form.volume=(dpb *dgb*0.0001*longeur * coef).toFixed(3)
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

      removeAtIndex(index) {
        this.fields.splice(index, 1);
      },
   
      deleteAll(){
        this.fields = [{codebarre: '', codebarresequence: '', nomcommercial: { libelle: "", value: 0 }, lignedf10: "", diametrepetit: 0, diametregros: 0, longueur: 0, volume: 0, epaisseur: 0, largeur: 0, nbrpiece: 0 }]
      },

      processTags(value, index, key) {
            let data = {
              codebarre: "ER0102", codebarresequence: "REF0045"
            }
            setTimeout( async () => {
                if (key === "codebarre") {
                  this.fields[index].codebarresequence = data.codebarresequence;
                }
                if (key === "sequence") {
                  this.fields[index].codebarre = data.codebarre;
                }
                else {
                  const ok = await this.$refs.codebarreinfo.show({
                    title: 'Information',
                    message: "Entrez un code barre de type bris valide !",
                  })
                  //If you throw an error, the method will terminate here unless you surround it wil try/catch
                  if (ok) {
                      this.$refs.codebarreinfo._close();
                      this.changeSelect();
                  } else {
                    this.$refs.codebarreinfo._close();
                  }
                }
              }, 400);
      },

      async getCreationData(){

          /* if(!this.$store.state.sites){
            this.sites=this.$store.state.sites;
          }
          else{
            try {
                  this.sites = await this.$donneesReference.get("sites?size=1000").then(response => response.data.result.items);
                  this.rowsSite = this.sites.length / this.perPageSite;
                  this.$store.dispatch('changeSites', this.sites);;
              } catch (error) {
                  console.log(error.message);
              }
          }*/
          if(!this.$store.state.essences){
            this.essences=this.$store.state.essences;
          }
          else{
            try {
                  this.essences = await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                  this.$store.dispatch('essences', this.essences)
                  
              } catch (error) {
                  console.log(error.message);
              }
          }
          try {
            this.permis = await this.$permis.get("permis?size=100").then(response => response.data.result.items);
            console.log('permis ',this.permis);
          } catch (error) {
              console.log(error.message);
          }
          this.showOverlay=false;
      },
      rowClass(item, type) {
        if(item !=''&&item!=null){
          if (item.isEven) return 'table-row-other'
          if (!item || type !== 'row') return 'table-info'
        }else{
          return 
        }
      },    
      onSearch(query) {
        this.search = query
        this.offset = 0
      },      
      fermer(){
        this.router.push({ name :"entree_parcs"})
      },
      enregistrer(){ 
        this.form.brisabattage = this.elements;
        

        if (php.empty(this.form.numpermis)) {
          this.notSetNumpermis=true;
          let error={ message:'Veuillez choisir le permis du lot'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.numdf10)) {
          this.notSetNumdf10=true;
          let error={ message:'Veuillez choisir le N° df10 correspondant'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateabatage)) {
          this.notSetDateAbattage=true;
          let error={ message:'Veuillez renseigner la date abattage'}
          return this.sendAlertMessage(error);
        }

        console.log('données envoyées ',this.form);
            this.submitted = true 
        this.$abbattage.post('brisAbattage', this.form).then(response => {
            this.submitted = false 
            App.notifySuccess(response.data.message)
            return this.$router.push({ name: "bris_abbattages" });
        }).catch(error => {
            console.log('entrée dans le catch');
            this.submitted = false
            this.errorHappened(error)
        })
      },
      async sendAlertMessage(error){
          const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
              this.notSetNumpermis= true
          } else {
            this.$refs.codebarreinfo._close();
            this.notSetNumpermis= true
          }
      },
      //methode de traitement des erreurs obtenues
      async errorHappened(error, index, fields){
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
        this.selected = items[0]
      },
      setFieldsToUpdate(){
        this.form.codebarre =this.selected.codebarre;
        this.form.sequence =this.selected.sequence;
        this.form.essence =this.selected.essence;
        this.form.utmx =this.selected.utmx;
        this.form.utmy =this.selected.utmy;
        this.form.diampb =this.selected.diampb;
        this.form.diamgb =this.selected.diamgb;
        this.form.longeur =this.selected.longeur;
        this.elements = this.elements.filter( elt =>elt.codebarre != this.form.codebarre )
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
        this.getEntreesParcs()
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
      onSearchPermis(query){
        this.searchpermis = query
        this.offsetPermis = 0
      },
      onSearchDF10(query){
        this.searchnumdf10 = query
        this.offsetDF10 = 0
      },
      validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) 
        { return !this.veeErrors.has(ref);}
            return null;
      },

    },
  

  mounted(){
    this.form.typeProduit='Grume';

    this.getCreationData();
  }
}

</script>
<style scoped>

.form-control-xs {
  height: calc(.8em + .500rem + 2px) !important;
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
.border-danger-date{
  border: 2px solid red;
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 1rem;
    --vs-line-height: 1;
  }

  label { font-weight: bold !important}

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
  .custom-bg{ background: rgb(0, 82, 44) !important;}
</style>