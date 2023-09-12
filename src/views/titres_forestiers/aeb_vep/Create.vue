<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>AEB</h4></b-col>
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
                    <b-col cols="3">Type du titre</b-col>
                    <b-col cols="8">
                      <select disabled v-model="form.typetitre" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option value="AEB" selected disabled> Autorisation d'enlèvement du bois / vente aux enchères</option>
                      </select>
                    </b-col>
                  </b-row>
               
                  <b-row>
                    <b-col cols="3"><span class="text-danger" style="font-weight:bold">*&nbsp;</span>Entité forrestière</b-col>
                    <b-col cols="8">
                      <select disabled class="m-0 p-0" v-model="entite.libelle"   style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="5">
                  <b-row class="m-2">
                    <b-col cols="4"><span class="text-danger" style="font-weight:bold">*&nbsp;</span>AEV / VEP N°</b-col>
                    <b-col cols="5">
                      <v-select :options="paginated" v-model="form.numtitre"  :reduce="titre => titre.numtitre" @search="onSearch" label="numtitre" class="custom-select-type_titre">
                        <template #option="{ marteau, numtitre }">
                            <span class="font-weight-bold">{{ numtitre }}</span>
                            <br />
                            <span class="text-muted"> {{ marteau }}</span>
                        </template>
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                          <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                      </li>
                      </v-select>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="4">Volume</b-col>
                    <b-col cols="5">
                      <b-form-input v-model="form.volume" name="volume" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-col>
                  </b-row>
   
                
                </b-col>
              </b-row>

              <ul class="nav nav-tabs">
                <li class="nav-item" :class="{ custumSigifTab: section === 'autorisation' }">
                    <a
                    ref="intialtabselect"
                    data-toggle="tab"
                    href="#"
                    class="nav-link"
                    style="color: inherit"
                    @click.prevent="section = 'autorisation'"
                    >Autorisation enlèvement du bois / vente aux enchères </a
                    >
                </li>
              </ul>

              <b-container class="contents" fluid v-if="section == 'autorisation'">
                <b-row class="w-100 mx-3">
                  
                  <b-col cols="5">
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° acte attribution" label-for="input-sm">
                      <b-form-input v-model="form.arreteattribution" name="numacte" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                      <template #label>
                        <span class="text-danger" style="font-weight:bold">*&nbsp;</span>Montant total de la vente
                      </template>
                      <b-form-input v-model="form.montantoffre" name="montanttotal" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                      <!-- <b-form-invalid-feedback id="montantoffre">{{ veeErrors.first('montantoffre') }}</b-form-invalid-feedback> -->
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                      <template #label>
                        <span class="text-danger" style="font-weight:bold">*&nbsp;</span>N° notification
                      </template>
                      <b-form-input v-model="form.numnotificationapprobation" name="numnotificationapprobation" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder="" />
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° quittance" label-for="input-sm">
                      <b-form-input v-model="form.numquittance" name="numquittance" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                      <template #label>
                        <span class="text-danger" style="font-weight:bold">*&nbsp;</span>N° du procès verbal
                      </template>
                      <b-form-input v-model="form.numprocesverval" name="numprocesverval" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""/>
                      <!-- <b-form-invalid-feedback id="numprocesverval">{{ veeErrors.first('numprocesverval') }}</b-form-invalid-feedback> -->
                    </b-form-group>
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
                  </b-col>

                  <b-col cols="3">
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date d'attribution" label-for="input-sm">
                      <!-- <date-picker  v-model="form.dateattribution"  format="DD-MM-YYYY"   valueType="YYYY-MM-DD" class="w-100" :clearable="false"/> -->
                      <input type="date" v-model="form.dateattribution" class="default-old-system-select-properties"/>
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date quittance" label-for="input-sm">
                      <!-- <date-picker  v-model="form.datequittance"  format="DD-MM-YYYY" placeholder=""  valueType="2022-07-18" class="w-100" :clearable="false"/> -->
                      <input type="date" v-model="form.datequittance" class="default-old-system-select-properties"/>
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label-for="input-sm">
                      <template #label>
                        <span class="text-danger" style="font-weight:bold">*&nbsp;</span>Date notification
                      </template>
                      <input type="date" v-model="form.datenotificationapprobation" class="default-old-system-select-properties"/>
                      <!-- <date-picker  v-model="form.datenotificationapprobation"  format="DD-MM-YYYY" placeholder=""  valueType="2022-07-18" class="w-100" :clearable="false"/> -->
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date fin validité" label-for="input-sm">
                      <input type="date" v-model="form.datefinvalidite" class="default-old-system-select-properties"/>
                      <!-- <date-picker  v-model="form.datefinvalidite"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/> -->
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  
                </b-row>
              </b-container>
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
  name:"titre-form-type-aeb-vep",
  components:{ ErrorDialogue, NoActionPossibleDialogue},
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
   },

   data: () => ({
      isbusy:false,
      amount: '',
      form: {
        typetitre: "AEB",
        numtitre: "", // (numero catalogue APC) string, obligatoire
        idorganisation: "", // int, obligatoire
        volume: "", // int, non obligatoire
        arreteattribution: "", // (numero acte d'attribution) string, non obligatoire
        dateattribution: "", // string (format: YYYY-MM-DD), non obligatoire
        datefinvalidite: "", // string (format: YYYY-MM-DD), non obligatoire
        montantoffre: "",  // (montant total de la vente), int, obligatoire
        numquittance: "", // string, non obligatoire
        datequittance: "", // (date caution), string (format: YYYY-MM-DD), non obligatoire
        numnotificationapprobation: "", // (numero de notification), string, obligatoire
        datenotificationapprobation: "", // (date de notification), string (format: YYYY-MM-DD), non obligatoire
        documentattribution: "", // (acte d'attribution) string (base64), non obligatoire
        documentnotification: "", // (acte de notification) string (base64), non obligatoire
        numprocesverval:"",
       
      },
      fileacteattribution:"",
      fileactenotification:"",

      entite:{
        id:1,
        libelle:''
      },

      titres:[],
      searchtitre:"",
      offset: 0,
      limit: 10,
      section: "autorisation",
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
  }),

  methods: {
    
    async selectActeAttributionFile(e){
      const fileacteattri = this.fileacteattribution =  e.target.files[0];
      this.form.documentattribution=await this.getBase64(fileacteattri)
    },
    async selectActeNotificationFile(e){
      const fileactenotification = this.fileactenotification =  e.target.files[0];
      this.form.documentnotification=await this.getBase64(fileactenotification)
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
      this.$titres.get("titres/ae?size=400", {params}).then(response => {
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
          typetitre: "AEB", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
          dateattribution: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
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
          typetitre: "AEB",superficie: "", arreteattribution: "", 
           montantoffre: "", numcautionnement: "", 
          dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
          numappeloffre: "",  documentappeloffre: "",
          numdepot: "",   documentdepot: "", numplan: "", 
          documentplan: "", numservicebraconnage: "", 
          documentservicebraconnage: "", numnotesanction: "",documentnotesanction: ""
        };

    },
    async addTitreAndContinue(){
        this.$validator.validateAll().then(result => {if (!result) {return;}

          this.submittedContinue = true
          this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
          console.log("data titre", this.form)
              this.$titres.post('titres', this.form).then(response => {
                  this.submittedContinue = false 
                  this.$emit('titreAdded',response)
                  App.notifySuccess(response.data.message)
                return this.resetFormContinue();
              }).catch(error => {
                  this.submittedContinue = false
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
      async addTitre(){
            this.$validator.validateAll().then(result => {if (!result) {return;}

            this.submitted = true
            this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
            console.log("data titres", this.form)
                this.$titres.post('titres', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('titreAdded',response)
                    this.resetForm()
                    console.log('réponse après ajout',response);
                     App.notifySuccess(response.data.message)
                   return setTimeout(() => {this.$router.push({ name: "aeb_vep" }); }, 200);
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
cursor:pointer;
}
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }

  .default-old-system-select-properties{
        border-style: solid;
        /* border-width: 1px; */
        font-weight: normal;
        color: #333333;
        border-radius: 3px;
        background-color: White;
        border: 1px solid #637A95;
        margin: 1px;
        font-family: 'verdana';
        font-size: 13px;
        border-color: #637A95;
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