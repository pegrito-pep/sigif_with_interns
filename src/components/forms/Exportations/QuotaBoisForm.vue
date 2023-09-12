<template>
  <!-- <b-overlay :show="showOverlay" rounded="sm"> -->
    <div>
      <b-overlay rounded="sm" :show="showOverlay">
        <form >
          <div class="container">
            <!--DEBUT ENTITE FORRESTIERE-->
                <b-row>
                  <b-col>
                    <b-form-group>
                      <label class="p-0 m-0" style="font-weight:300"><span class="required-field">*</span>Entité forrestière</label>
                      <v-select :options="paginated" v-model="quota.entite" :filterable="false" @search="onSearch" label="intitule" :reduce="(entite) => entite.idorganisation" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                        </li>
                      </v-select>
                  </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="2"><label for="" style="font-weight:300"> Sigle :</label></b-col>
                  <b-col cols="9">
                    <span>ZTN</span>
                  </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                    <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> Exercice Fiscal</label>
                    <v-select label="libelle" v-model="quota.exercice" :options="exercices" :reduce="(exercice) => exercice.libelle" class="font-weight-bold custom-select-type_titre"></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> N° du quota</label>
                    <input type="text" class="form-control quota_input_text" v-model="quota.numquota">
                </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                      <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> Date signature</label>
                      <input type="date" class="form-control quota_input_text" v-model="quota.datesignatutre">

                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <b-form-group>
                    <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> Date de fin validité</label>
                    <input type="date" class="form-control quota_input_text" v-model="quota.datevalid">
                </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300">Attaché autorisation d'exportation </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileAutorisationExportation}">
                        <label>
                          <input type="file" @change="selectFileAutorisationExportation"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="autorisationExportation" class="file-name">{{ autorisationExportation.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span> 
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                  <fieldset class="scheduler-border">
                    <legend class="scheduler-border">Essence</legend>
                    <b-row>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0" style="font-weight:300"><span class="required-field">*</span>  Nom commercial</label>
                          <v-select :options="filteredEssences" v-model="quota.idessence" :filterable="false" @search="onSearch" label="NOMUSUEL" :reduce="(essence) => essence.IDESSENCE" class="custom-select-type_titre">
                            <!--<li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                                <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                            </li>-->
                          </v-select>
                      </b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="6">
                        <b-form-group>
                          <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> Type de produit</label>
                          <v-select label="LIBELLE" :options="typesproduits" :reduce="(typeproduit) => typeproduit.IDTYPE_PRODUIT" v-model="quota.typeproduit"  class="font-weight-bold custom-select-type_titre"></v-select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="6">
                        <b-form-group>
                          <label for="" class="m-0 p-0" style="font-weight:300"><span class="required-field">*</span> Volume attribué</label>
                          <input type="text" class="form-control quota_input_text" v-model="quota.volume">
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </fieldset>
                </div>
              </b-row>
            <!--FIN ENTITE FORRESTIERE-->
          </div>
          <hr/>
              <b-button v-b-tooltip.hover.top="'Enregistrer votre occurence'" type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; "   @click.prevent="addQuota">Enregistrer <b-spinner v-if="submitted" small> </b-spinner></b-button>
              <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " disabled @click.prevent="addDemandePermisAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedcontinue" small></b-spinner></b-button>
        </form>
      </b-overlay>
      <serveur-error-box ref="errorDialogue"></serveur-error-box>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>

    </div>
  <!-- </b-overlay> -->
</template>

<script>
  const php = require("phpjs");
  import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

  import { mapGetters } from "vuex";
  import Vue from "vue";
  import VeeValidate from "vee-validate";
  Vue.use(VeeValidate);
export default {
  components: {
    ServeurErrorBox,
    CodeBarreInfo
  },
  props: {
    action: {type: String, default: 'add'},
    editDemandePemis: {type: Object, default: null}
  },
  data: () => ({
    showOverlay:false,
    entiteswithoutminfof:[],
    typesproduits:[],
    essences:[],
    offsetentite:0, 
    limitentite:10,
    
		notsetFileAutorisationExportation:false,					       
		autorisationExportation:null,							
    quota:{
      entite: "", //id organisation 
      exercice: "",
      numquota: "",
      datesignatutre: "",
      datevalid: "",
      idessence: '',//id de l'essence
      volume: '',
      typeproduit: "",//id produit
      autorisationexploitation:"",
    },
    exercices:[],
    submitted:false,
    submittedcontinue:false
  }),
  computed: {
    ...mapGetters(["user"]),
    filteredEssences(){
      return this.essences.filter(elt => elt.QUOTAS=='1')
    },
    filtered() {
      return this.entiteswithoutminfof
      return this.entites.filter((entite) =>
      entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetentite, this.limitentite + this.offsetentite)
    },
    hasNextPage() {
      const nextOffset = this.offsetentite + this.limitentite
      return Boolean(
        this.filtered.slice(nextOffset, this.limitentite + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offsetentite - this.limitentite
      return Boolean(
        this.filtered.slice(prevOffset, this.limitentite + prevOffset).length
      )
    },
  },
  methods: {
    getDates(){
      let exact = 2000 + new Date().getYear() - 100;
      for (let index = 0; index < 5; index++) {
      this.exercices.push({ libelle: exact - index, value: index + 1, },)
      }
      this.quota.exercicefiscal=exact
    },
  async selectFileAutorisationExportation(e){
    const autorisationExportation = this.autorisationExportation =  e.target.files[0];
    this.quota.autorisationexploitation=await this.getBase64(autorisationExportation)
  },
  getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
  },
  triggerSetTitre() {
      this.setTitre = true;
  },
  validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
  },
  resetForm() {
    this.quota = {
      typetitre: null,
      exercice: null,
      traitementsylvicole: null,
      numvc: null,
      soustraitant: null,
      attestationmesure: null,
      carteinventaire: null,
      attestationobligation: null,
      attestationcaution: null,
    };
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

  async doDelete(error) {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur !!!',
          message: error,
      })
  },
  async addQuota() {
      this.submitted = true
      if(this.action=="add"){
        console.log('data',this.quota);
        this.$exportation.post('QuotasExportes', this.quota).then(response => {
              this.submitted = false 
              this.$emit('quotaAdded')
              this.resetForm()
              console.log('respone après ajout', response);
              return App.notifySuccess(response.data.message)
          }).catch(error => {
            this.submitted = false
            console.log('error ',error.response);
            if(error.response.data.status==500){
              return this.doDelete('erreur interne du serveur')
            }else{
              console.log('error ',error.response.data.message);
              return this.doDelete(error.response.data.message)

            }
          })
      }
    /*if(this.action="edit"){
        this.submitted = false
        this.$permis.put('demandes-permis/'+this.demandePermis.idDemande, this.demandePermis).then(response => {
            this.submitted = false 
            this.$emit('demandePermisEdited')
            this.resetForm()
            console.log('respone après edition', response);
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return App.alertError(error.message)
        })
    } */           
  },
  async addDemandePermisAndContinue() {
          this.submitted = true
              console.log('data',this.demandePermis);
          if(this.action=="add"){
            this.$permis.post('demandes-permis', this.demandePermis).then(response => {
                  this.submitted = false 
                  this.$emit('demandePermisAddedAndContinue')
                  this.resetForm()
                  console.log('respone après ajout', response);
                  return App.notifySuccess(response.data.message)
              }).catch(error => {
                  this.submitted = false
                  return App.alertError(error.message)
              })
          }
          if(this.action="edit"){
              this.submitted = false
              this.$permis.put('demandes-permis/'+this.demandePermis.idDemande, this.demandePermis).then(response => {
                  this.submitted = false 
                  this.$emit('demandePermisEdited')
                  this.resetForm()
                  console.log('respone après edition', response);
                  return App.notifySuccess(response.data.message)
              }).catch(error => {
                  this.submitted = false
                  return App.alertError(error.message)
              })
          }
  },
  validateState(ref) {
    if (
      this.veeFields[ref] &&
      (this.veeFields[ref].dirty || this.veeFields[ref].validated)
    ) {
      return !this.veeErrors.has(ref);
    }
    return null;
  },
  async getData() {
    this.showOverlay = true;
    if (this.$store.state.typesproduits !== null &&this.$store.state.typesproduits.length > 0) {
      this.typesproduits = this.$store.state.typesproduits;
      console.log('traitements 1',this.typesproduits);
    } else
    {
      try {
        this.typesproduits= await this.$donneesReference.get("types-produits/raw").then(response => response.data.result);
        this.$store.dispatch('typesproduits', this.typesproduits)
      } catch (error) {
        App.notifyError(error.message);
      }
    }
    
    if (this.$store.state.entiteswithoutminfof !== null &&this.$store.state.entiteswithoutminfof.length > 0) {
      this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
    } else {
      
      try {
        this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.Items);
        this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
      } catch (error) {
        App.notifyError(error.message);
      }
    }
    if (this.$store.state.essences !== null &&this.$store.state.essences.length > 0) {
      this.essences = this.$store.state.essences;
    } else {
      
      try {
        this.essences= await this.$donneesReference.get("essences/raw").then(response => response.data.result);
        
        console.log('entrée essence requétées',this.essences );
        this.$store.dispatch('essences', this.essences)
      } catch (error) {
        App.notifyError(error.message);
      }
    }
    this.showOverlay = false;
  },

  onSearch(query) {
    this.searchentite = query
    this.offsetentite = 0
  },

  },
  async mounted() {
    let d=0;
    for(let i=0; i<this.essences.length; i++){
      console.log('quota ',this.essences[i].QUOTAS);
      if(this.essences[i].QUOTAS==1){
        d++
      }
    }
    console.log('d ',d);
    this.getDates();
    await this.getData(); 
  }
};
</script>
<style>
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


.required-field{
  color:red;
  font-size:1.5rem;
}
.upload-container label input {
  display: none;
}

.permis-form-control-disable {
  height: calc(1em + .500rem + 2px) !important;
  font-size: 1rem !important;
  border: 1px solid White;
  background-image: none;
  font-weight: 400;
  line-height: 1.5;
  color: #6E7587;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.quota_input_text{
  height: calc(1.5rem + 2px);
  padding: .25rem .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .2rem;
}
fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow:  0px 0px 0px 0px #000;
          box-shadow:  0px 0px 0px 0px #000;
}
legend.scheduler-border {
      font-size: 1.2em !important;
      font-weight: bold !important;
      text-align: left !important;
      width:auto;
      padding:0 10px;
      border-bottom:none;
  }
</style>