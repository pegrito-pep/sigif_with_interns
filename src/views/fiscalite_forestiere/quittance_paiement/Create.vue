<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Enregstrement de la quittance</h4></b-col>
            <b-col class="col-md-auto">
              <span >
                <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN CP-->
          <div>
              <b-row class="m-4">

                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="3"><span class="text-danger">*</span> Date</b-col>
                    <b-col cols="8">
                      <date-picker v-model="form.date" format="YYYY-MM-DD" placeholder="date signature" valueType="YYYY-MM-DD" class="w-50 mt-0" :clearable="false" />
                    </b-col>
                  </b-row>
               
                  <b-row>
                    <b-col cols="3"><span class="text-danger">*</span>Copie quittance</b-col>
                    <b-col cols="8">
                      <div class="upload-container">
                        <label>
                          <input type="file" @change="selectfilequittance"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          
                          <span v-if="filequittance" class="file-name">{{ filequittance.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="4">
                  <b-row class="m-2">
                    <b-col cols="4">Montant Total</b-col>
                    <b-col cols="6">
                      <v-numeric currency=" " separator="," v-model="form.montanttotal" style="border-radius: 5px;"></v-numeric>  
                    </b-col>
                  </b-row>
   
                </b-col>
              </b-row>
              <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a
                      ref="initialtab"
                      data-toggle="tab"
                      href="#"
                      class="nav-link"
                      style="color: inherit"
                      @click.prevent="section = 'details_taxe'"
                    >Détails quittance DGI</a>
                </li>
                <li class="nav-item" >
                    <a
                      data-toggle="tab"
                      href="#"
                      class="nav-link"
                      style="color: inherit"
                      @click.prevent="section = 'reconciliation_titres'"
                    >Réconciliation des titres émis</a>
                </li>
                
              </ul>
              <!--entete des tableaux -->
              <b-container fluid v-if="section == 'details_taxe'">
                <div class="m-0 px-2 table-header-border">
                  <b-row>
                    <b-col cols="3"><h4 class="tab-header-left-text"> Détails Taxes Forrestières</h4></b-col>
                    <b-col class="ml-1 liens">
                      <a style="cursor: pointer;" @click.prevent="AddField" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a style="cursor: pointer;" @click.prevent="deleteField" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                      <a style="cursor: pointer;" @click.prevent="resetQuittanceFields" class="mx-1 simple-btn">Reinitialiser</a>
                    </b-col>
                  </b-row>
                </div>
                <div>
                  <b-row class="mx-1 p-2 m-1">
                      <b-col cols="6">
                        <b-form-group label-cols="3" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="intituledgi" label-for="input-sm">
                          <b-form-input  v-model="form.intituledgi" name="intituledgi" size="sm" class="w-75 px-2 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true}" :state="validateState('intituledgi')" aria-describedby="intituledgi" data-vv-as="intituledgi"/>
                          <b-form-invalid-feedback id="intituledgi">donnée obligatoire</b-form-invalid-feedback>
                        </b-form-group>
                        <b-form-group label-cols="3" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="montantdgi" label-for="input-sm">
                          <b-form-input  v-model="form.montantdgi"  name="montantdgi" size="sm" class="w-25 px-2 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true}" :state="validateState('montantdgi')" aria-describedby="montantdgi" data-vv-as="montantdgi"/>
                          <b-form-invalid-feedback id="montantdgi">donnée obligatoire</b-form-invalid-feedback>
                        </b-form-group>
              
                      </b-col>
                  </b-row>
                  <div class="mx-1" style="width: 35%">
                    <b-table :items="itemsdgi" :fields="entetesdgi" class="mt-3" outlined select-mode="single" selectable @row-selected="onRowSelectedQuittance" :tbody-tr-class="rowClass" show-empty>
                      <template v-slot:head(index)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>  
                      <template v-slot:head(intituledgi)="data">
                          <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(montantdgi)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>

                      <template #empty>
                        <span style="color:green" class="text-center d-flex justify-content-center align-items-center">Aucune <span class="font-weight-bold mx-1"> donnée</span> ajoutée pour le moment!!</span>
                </template>

                      <template #cell(index)="data"><b class="d-flex justify-content-center align-items-center" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      <template #cell(intituledgi)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.intituledgi }}</b> </span>
                      </template>
                      <template #cell(montantdgi)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.montantdgi }}</b> </span>
                      </template>

                    
                      
                    </b-table>
                  </div>
                </div>
              </b-container>
              <b-container fluid v-if="section == 'reconciliation_titres'">
                <div class="m-0 px-2 table-header-border">
                  <b-row>
                    <b-col cols="6"><h4 class="tab-header-left-text"> Réconciliation des Titres de recouvrement émis</h4></b-col>
                    <b-col class="ml-1 liens">
                      <a style="cursor: pointer;" @click.prevent="addFieldRecouvrement" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Sélectionner</a>
                      <a style="cursor: pointer;" @click.prevent="deleteField" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Déselectionner</a>
                      <a style="cursor: pointer;" @click.prevent="resetQuittanceFields" class="mx-1 simple-btn">Déselectionner Tout</a>
                    </b-col>
                  </b-row>
                </div>
                <div>
                  <b-row class="mx-1 p-2 m-1 d-flex justify-content-between">
                    <b-col cols="4">
                      <b-form-group label-cols="3" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="type titre" label-for="input-sm">
                      <select v-model="form.typetitre"
                        class="m-0 p-0"
                        style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
                      >
                      <option @input="getTitres" v-for="typetitre in typestitres" :key="typetitre.key" :value="typetitre.key"> {{ typetitre.libelle }}</option>
                      </select>
                      </b-form-group>
                      <b-form-group label-cols="3" label-class="font-weight-normal" label-cols-lg="2" label-size="sm" label="TR N°" label-for="input-sm">
                        <select v-model="form.numtr"
                          class="m-0 p-0"
                          style="width: 25%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
                        >
                          <option v-for="(numtr,i) in numtrs" :key="i" :value="numtr"> {{ numtr }}</option>
                        </select>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3">
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="3" label-size="sm" label="num titre" label-for="input-sm">
                        <select v-model="form.numtitre"
                          class="m-0 p-0"
                          style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
                        >
                          <option v-for="(titre,i) in titres" :key="i" :value="titre.numtitre"> {{ titre.numtitre }}</option>

                        </select>
                      </b-form-group>
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="3" label-size="sm" label="Montant TR" label-for="input-sm">
                        <v-numeric currency=" " separator="," v-model="form.montanttr" style="border-radius: 5px;"></v-numeric>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3">
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="3" label-size="sm" label="Nature taxe" label-for="input-sm">
                        <select v-model="form.naturetaxe"
                          class="m-0 p-0"
                          style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
                        >
                          <option v-for="(nature,i) in naturestitres" :key="i" :value="nature.value"> {{ nature.libelle }}</option>
                        </select>
                      </b-form-group>
                      <b-form-group label-cols="4" label-class="font-weight-normal" label-cols-lg="3" label-size="sm" label="Montant dû" label-for="input-sm">
                        <v-numeric currency=" " separator="," v-model="form.montantdu" style="border-radius: 5px;"></v-numeric>
                      </b-form-group>
                    </b-col>
                  </b-row>  
                  <div class="mx-1" style="width: 70%">
                    <b-table :items="itemsrecouvrement" :fields="entetesrecouvrement" class="mt-3" outlined select-mode="single" selectable @row-selected="onRowSelectedQuittance" :tbody-tr-class="rowClass" show-empty>
                      <template v-slot:head(index)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>  
                      <template v-slot:head(numtitre)="data">
                          <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(naturetaxe)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(numtr)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(montanttr)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(montantpaye)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>
                      <template v-slot:head(montantdu)="data">
                        <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                      </template>

                      <template #empty>
                        <span style="color:green" class="text-center d-flex justify-content-center align-items-center">Aucune <span class="font-weight-bold mx-1"> donnée</span> ajoutée pour le moment!!</span>
                      </template>

                      <template #cell(index)="data"><b class="d-flex justify-content-center align-items-center" style="color: #175131!important">{{ ++data.index }}</b> </template>
                      <template #cell(numtitre)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.numtitre }}</b> </span>
                      </template>
                      <template #cell(naturetaxe)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.naturetaxe }}</b> </span>
                      </template>
                      <template #cell(numtr)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.numtr }}</b> </span>
                      </template>
                      <template #cell(montanttr)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.montanttr }}</b> </span>
                      </template>
                      <template #cell(montantpaye)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.montantpaye }}</b> </span>
                      </template>
                      <template #cell(montantdu)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.montantdu }}</b> </span>
                      </template>
                  
                    
                      
                    </b-table>
                  </div>       
                </div>
              </b-container>

                <!--<b-tabs content-class="mt-3">
                  <b-tab title="Détails quittance DGI" active>
                    
                  </b-tab>
                  <b-tab title="Réconciliation des titres émis">
                    
                  </b-tab>

                </b-tabs>-->
              <div>                
                <error-dialogue ref="errorDialogue"></error-dialogue>
                <no-action-possible-dialogue ref="noactionpossibledialogue"></no-action-possible-dialogue>
              </div>
          </div>
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
  name:"titre-ps-form",
  components:{ ErrorDialogue,
                NoActionPossibleDialogue},
   computed: {
    ...mapGetters(['user','hasAccess']),
    itemsdgi() { 
        return this.elements.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
    },
    itemsrecouvrement() { 
        return this.elementsrecouvrement.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
    },
   },
   watch:{

   },

   data: () => ({
      isbusy:false,
      amount: '',
      form: {
        date:'',
        montanttotal:'',
        filequittance:null,
        typetire:'',
        numtitre:'',
        montanttr:'',
        montantdu:''
      },
      typestitres:[{key:'CP', libelle:'concession forrestière en convention provisoire'},
                   {key:'CD', libelle:'concession forrestière en convention définitive'},
                   {key:'VC', libelle:'vente de coupe'},
      ],
      titres:[
        {
          numtitre:'2001',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2002',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2003',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2021',
          typetitre:{
            key:'vc', 
            libelle:'vente de coupe'
          }
        },

      ],
      filequittance:null,
      entetesdgi: [ 
      { key: 'index', label: 'N°',thStyle: { width: "1%" } },
      { key: 'intituledgi', label: 'intituledgi' ,thStyle: { width: "5%" }}, 
      { key: 'montantdgi', label: 'montantdgi' ,thStyle: { width: "6%" }},
    ],
    elements:[],
    entetesrecouvrement:[ 
      { key: 'index', label: 'N°',thStyle: { width: "1%" } },
      { key: 'numtitre', label: 'N° Titre' ,thStyle: { width: "5%" }}, 
      { key: 'naturetaxe', label: 'Nature Taxe' ,thStyle: { width: "5%" }},
      { key: 'numtr', label: 'N° TR' ,thStyle: { width: "5%" }}, 
      { key: 'montanttr', label: 'Montant TR' ,thStyle: { width: "5%" }},
      { key: 'montantpaye', label: 'Montant Payé' ,thStyle: { width: "5%" }}, 
      { key: 'montantdu', label: 'Montant dû' ,thStyle: { width: "6%" }},
    ],
    elementsrecouvrement:[],
    section: "details_quittance_dgi",
    selected:null,
    naturestitres:[
      {value: 1, libelle: "Taxe d'abattages"},
      {value: 2, libelle: "Taxe foncière"},
    ],
    numtrs:[ 120, 121, 122, 127],
    section:'details_taxe'    
  }),

  methods: {
    addFieldRecouvrement(){
      this.$validator.validateAll().then(result => {if (!result) {return;}
        //insertion de l'entrée dans le tableau du bas
        this.elementsrecouvrement.unshift({numtitre: this.form.numtitre, naturetaxe: this.form.naturetaxe, numtr: this.form.numtr, montanttr: this.form.montanttr, montantpaye: this.form.montantpaye, montantdu: this.form.montantdu, },);
        //re-initialisation champ form ajout unitaire
        this.resetRecouvrementFields();
      })
    },
    AddField () {
        this.$validator.validateAll().then(result => {if (!result) {return;}
            //insertion de l'entrée dans le tableau du bas
            this.elements.unshift({intituledgi: this.form.intituledgi, montantdgi: this.form.montantdgi },);
            //re-initialisation champ form ajout unitaire
            this.resetQuittanceFields();
        })
      },

    async selectfilequittance(e){
      const filequittance = this.filequittance =  e.target.files[0];
      this.form.filequittance=await this.getBase64(filequittance)
    },
    deleteField(){

    },
    resetQuittanceFields(){
      this.form.intituledgi='', this.form.montantdgi=''
      //this.elements = [{intituledgi: '', montantdgi: ''}]
    },
    resetRecouvrementFields(){
      this.form.numtitre='', this.form.naturetaxe='', this.form.numtr='', this.form.montanttr='',
      this.form.montantpaye='', this.form.montantdu=''
    },
    validateState(ref){
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) { 
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    onRowSelectedQuittance(items) {
        console.log('row selected',items);
        items.isSelected =true;
        this.isRowselected=true
        this.selected = items[0]
      },
    fermer() {
      this.$router.back()
    },
     //fonction de parse d'un montant
     commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? " " + decimalPart : "");
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
    /**Récupération des titres d'un type de titres spécifiques*/
    async getTitres(){
            this.showOverlay= true;
            const params = this.getRequestParams(0,20);
            
            try {
                this.titres= await this.$titres.get("titres/"+this.form.typetitre, {params}).then(response => response.data.result.items || [])
            } catch (error) {
                this.showOverlay= false;
                console.log('data',error.response.data);
                this.errorHappened(error)
            }

            if(this.titres.length>0){
                this.typetitreSet=true;
            }
            this.showOverlay= false;
            console.log('taille',this.titres.length);
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

      this.submitted = true
      this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
      console.log("data site", this.form)
          this.$titres.post('titres', this.form).then(response => {
              this.submitted = false 
              this.$emit('titreAdded',response)
              this.resetForm()
              return   App.notifySuccess(response.data.message)
              return setTimeout(() => {this.$router.push({ name: "concession_en_cp" }); }, 2000);
          }).catch(error => {
              this.submitted = false
              console.log('erreur titre',error.message)
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
    async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "Vente de coupe",
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
                  return setTimeout(() => {this.$router.push({ name: "arb" }); }, 2000);
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
    onSearch(query) {
      this.searchtitre = query
      this.offset = 0
    },
  },
   mounted() {
    this.$refs["initialtab"].click()
   // this.entite.libelle=this.user.profil.organisation
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