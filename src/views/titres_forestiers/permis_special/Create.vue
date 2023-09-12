<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Permis Spécial</h4></b-col>
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
                        <option value="PS" selected disabled> Permis spécial</option>
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
                    <b-col cols="6"> Catalogue du permis spécial N°</b-col>
                    <b-col cols="4">
                      <v-select :options="paginated" v-model="form.numtitre" :filterable="false" @search="onSearch" :reduce="titre => titre.numtitre" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="6">Quota accordé</b-col>
                    <b-col cols="4">
                      <b-form-input v-model="form.quota" name="quota" size="sm" class="p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('quota')"/>
                      <b-form-invalid-feedback id="quota">{{ veeErrors.first('quota') }}</b-form-invalid-feedback>
                    </b-col>
                  </b-row>
   
                </b-col>
              </b-row>

              <ul class="nav nav-tabs">
                <li class="nav-item" :class="{ custumSigifTab: section === 'apc' }">
                    <a
                    ref="intialtabselect"
                    data-toggle="tab"
                    href="#"
                    class="nav-link"
                    style="color: inherit"
                    @click.prevent="section = 'ps'"
                    >Permis spécial n° </a>
                </li>
              </ul>

              <b-container class="contents" fluid v-if="section == 'ps'">
                <b-row class="w-100 mx-3 d-flex justify-content-between">
                  <b-col cols="4">
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° notification" label-for="input-sm">
                      <b-form-input v-model="form.numnotification" name="numnotification" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('numnotification')"/>
                      <b-form-invalid-feedback id="numnotification">{{ veeErrors.first('numnotification') }}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° quittance" label-for="input-sm">
                      <b-form-input v-model="form.numquittance" name="numquittance" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('numquittance')"/>
                      <b-form-invalid-feedback id="numquittance">{{ veeErrors.first('numquittance') }}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="N° acte attribution" label-for="input-sm">
                      <b-form-input v-model="form.numacte" name="numacte" size="sm" class="w-50 p-0 m-0 font-weight-300 form-control-xs" placeholder=""  v-validate="{ required: true, min: 4 }" :state="validateState('numacte')"/>
                      <b-form-invalid-feedback id="numacte">{{ veeErrors.first('numacte') }}</b-form-invalid-feedback>
                    </b-form-group>
                    <b-form-group label-cols="5" label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Montant Total de la TR" label-for="input-sm">
                        <h6>{{form.motantotal }}</h6>
                    </b-form-group>
                  </b-col>

                  <b-col cols="3">
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date d'attribution" label-for="input-sm">
                      <date-picker  v-model="form.dateattribution"  format="DD-MM-YYYY" placeholder="2022-12-22"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date fin validité" label-for="input-sm">
                      <date-picker  v-model="form.datefinvalidite"  format="DD-MM-YYYY" placeholder=""  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/>
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date quittance" label-for="input-sm">
                      <date-picker  v-model="form.datequittance"  format="DD-MM-YYYY" placeholder=""  valueType="2022-07-18" class="w-100" :clearable="false"/>
                    </b-form-group>
                    <b-form-group label-cols="5"  label-class="font-weight-normal" label-cols-lg="5" label-size="sm" label="Date notification" label-for="input-sm">
                      <date-picker  v-model="form.datenotification"  format="DD-MM-YYYY" placeholder=""  valueType="2022-07-18" class="w-100" :clearable="false"/>
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
                    <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="rapport inventaire" label-class="font-weight-normal" label-for="input-sm">
                      <div class="upload-container">
                        <label>
                          <input type="file" @change="selectfilerapportinventaires"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          
                          <span v-if="filerapportinventaires" class="file-name">{{ filerapportinventaires.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-form-group>
                    <b-form-group  label-cols="5" label-cols-lg="5" label-size="sm" label="Quittance" label-class="font-weight-normal" label-for="input-sm">
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
              </b-container>
      
              <div class="p-4 mb-5">
                <b-button @click.prevent="addTitre" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
                <b-button @click.prevent="addTitreAndContinue" v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedContinue" >
                  Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedContinue" small></b-spinner></b-button>
                
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
        typetitre: "PS",
        numtitre: "", // string, obligatoire
        idorganisation: 3, // int, obligatoire
        quota:"",
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
      filerapportinventaires:null,
      filequittance:null,
      entite:{
        id:1,
        libelle:''
      },

      titres:[],
      searchtitre:"",
      offset: 0,
      limit: 10,
      section: "apc",
      submitted:false,
      submittedContinue:false,
  }),

  methods: {
    
    async selectActeAttributionFile(e){
      const fileacteattri = this.fileacteattribution =  e.target.files[0];
      this.form.fileacteattribution=await this.getBase64(fileacteattri)
    },
    async selectActeNotificationFile(e){
      const fileactenotification = this.fileactenotification =  e.target.files[0];
      this.form.fileactenotification=await this.getBase64(fileactenotification)
    },
    async selectfilerapportinventaires(e){
      const filerapportinventaires = this.filerapportinventaires =  e.target.files[0];
      this.form.filerapportinventaires=await this.getBase64(filerapportinventaires)
    },
    async selectFileQuittance(e){
      const filequittance = this.filequittance =  e.target.files[0];
      this.form.filequittance=await this.getBase64(filequittance)
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
      this.$titres.get("titres/ps?size=400", {params}).then(response => {
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