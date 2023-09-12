<template>
  <div>
    <b-overlay :show="showOverlay" rounded="sm">
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Operateur</label>
            <select disabled class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                <option selected="selected">{{ entite.libelle }}</option>
            </select>
          </b-form-group>

        </b-col>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Exercice</label>
            <select v-model="form.exercice" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
              <option></option>
              <option v-for="(exercice, i) in exercices" :value="exercice" :key="i" >
                {{ exercice}}
            </option>
          </select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <div>
              <label for class="m-0 p-0 font-weight-300" style="font-weight:300">Type de titre</label>
              <v-select @input="getTitres" :options="typestitres" v-model="form.typetitre"  :filterable="false"  :reduce="typetitre =>typetitre.code" label="libelle" class="custom-select-type_titre" ></v-select>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            <label for class="m-0 p-0 font-weight-300" style="font-weight:300">N° du Titre</label>
            <v-select :options="paginatedTitres" v-model="form.numtitre"  :filterable="false" @search="onSearchTitre" :reduce="titre =>titre.numtitre" label="numtitre" class="custom-select-type_titre" >
              <li slot="list-footer" class="pagination">
                  <button :disabled="!hasPrevPageTitres" @click="offsetTitres -= limitTitres">Prèc.</button>
                  <button :disabled="!hasNextPageTitres" @click="offsetTitres += limitTitres">Suiv.</button>
              </li>
            </v-select>
          </div>
        </b-col>
        <b-col>
          <label class="p-0 m-0" style="font-weight:300">Emetteur</label>
            <select v-model="form.exercice" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
              <option></option>
              <option v-for="(exercice, i) in exercices" :value="exercice" :key="i" >
                {{ exercice}}
            </option>
          </select>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-col class="mt-2 mb-2">
            <label for="input-small" class style="font-weight:800">Description Caution:</label>
          </b-col>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Numcaution</label>
            <b-form-input v-model="form.numcaution" size="sm" class="w-100 p-0 m-0" placeholder  />
          </b-form-group>

          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Montant</label>
            <v-numeric currency=" " separator="," v-model="form.montant" style="border-radius: 5px;"></v-numeric>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group>
            <b-col >
              <label for="" style="font-weight:300">Datesignature</label>
              <date-picker v-model="form.datesignature" format="YYYY-MM-DD" placeholder="date signature" valueType="YYYY-MM-DD" class="w-100 mt-0" :clearable="false" />
            </b-col>
            <b-col>
              <label for="" style="font-weight:300">DateValidite</label>
              <date-picker v-model="form.datevalidite"  format="YYYY-MM-DD" placeholder="date validité"  valueType="YYYY-MM-DD" class="w-100 mt-0" :clearable="false"/>
            </b-col>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Nomsignataire1</label>
            <b-form-input v-model="form.nomsignatire1" size="sm" class="w-100 m-0 form-control" placeholder />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group>
            <label class="p-0 m-0" style="font-weight:300">Nomsignataire2</label>
            <b-form-input v-model="form.nomsignatire2" size="sm" class="w-100 m-0 form-control" placeholder />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
          <b-col>
            <b-form-group class="pl-1">
              <b-col>
                <label  style="font-weight:300">Date de renvoi</label>
                <date-picker v-model="form.daterenvoi" format="YYYY-MM-DD" placeholder="date renvoi" valueType="YYYY-MM-DD" class="w-100 mt-0" :clearable="false" />
              </b-col>
            </b-form-group>
          </b-col>
        <b-col>
          <b-form-group>
            <label style="font-weight:300">joindre fichier caution</label>
            <b-form-file v-model="file" @input="selectCautionFile" id="file-small" size="sm" placeholder="aucun fichier choisi"></b-form-file>
          </b-form-group>
        </b-col>
      </b-row>
      <hr />
      <b-button
        class="float-right mt-2"
        style="background: rgb(0, 82, 44) !important;"
        :disabled="submitted"
        @click.prevent="sendData"
      >
        Enregistrer
        <b-spinner v-if="submitted" small />
      </b-button>
    </b-overlay>
       
    <error-dialogue ref="errorDialogue"></error-dialogue>
  </div>
</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';

const php = require("phpjs");
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
  name: "caution-form",
  components:{
    ErrorDialogue
  },
  computed: {
    ...mapGetters(['user']),


    filteredTitres() {
      return this.titres.filter((titre) =>
      titre.numtitre.includes(this.searchtitre)
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

    filteredTypeTitre() {
        return this.typestitres.filter((typetitre) => typetitre.libelle)
      },
      paginatedTypeTitre() {
        return this.filteredTypeTitre.slice(this.offsetTypeTitre, this.limitTypeTitre + this.offsetTypeTitre)
      },
      hasNextPageTypeTitre() {
        const nextOffset = this.offsetTypeTitre + this.limitTypeTitre
        return Boolean(
          this.filteredTypeTitre.slice(nextOffset, this.limitTypeTitre + nextOffset).length
        )
      },
      hasPrevPageTypeTitre() {   
        const prevOffset = this.offsetTypeTitre - this.limitTypeTitre
        return Boolean(
          this.filteredTypeTitre.slice(prevOffset, this.limitTypeTitre + prevOffset).length
        )
      },
  },
  data: () => ({
    showOverlay:false,
    searchtypetitre:null,
    offsetTypetitre: 0,
    limitTypetitre: 10,
    typestitres: [],

    offsetTitres: 0,
    limitTitres: 10,
    searchtitre:'',
    titres: [],
    submitted: false,
    entite:{
      id:1,
      libelle:''
    },
    exercices:[2019, 2020, 2021, 2022, 2023],
    isActive: false,
    form:{
      numtitre : "",
      typetitre : "",
      exercice : "",
      emmeteur: "",
      numcaution: "",
      datesignature: "",
      datevalidite: "",
      nomsignatire1: "",
      nomsignatire2: "",
      montant: '',
      document: ''
    },
    file:null
  }),
  methods: {
    async sendData(){
      this.$validator.validateAll().then(result => {if (!result) {return;}
        console.log('données envoyées ',this.form);
        this.submitted = true 
        this.$fiscalite.post('cautions', this.form).then(response => {
            this.submitted = false 
            this.$emit('cautionAdded',response)
            this.resetForm()
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            console.log('erreur',error.response.data.message)
            this.errorHappened(error.response.data.message)
        })
      })
    },
    async errorHappened(error) {
        const ok = await this.$refs.errorDialogue.show({
        title: 'Erreur survenue',
        message: error,
        okButton: 'Quitter',
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorDialogue._close();
        } else {
        this.$refs.errorDialogue._close();
        this.resetForm()
        }
    },
    resetForm() {
      this.form = {
        numtitre : "", typetitre : "", exercice : "", emmeteur: "", numcaution: "", datesignature: "", datevalidite: "",
        nomsignatire1: "", nomsignatire2: "", montant: '', document: ''
      };
      this.$nextTick(() => {
          this.$validator.reset();
      });
    }, 
    async selectCautionFile(){
      this.form.document=await this.getBase64(this.file)
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) 
      { return !this.veeErrors.has(ref);}
          return null;
    },
    async getTitres(){
      this.showOverlay= true;
      try {
          this.titres= await this.$titres.get("titres/"+this.form.typetitre).then(response => response.data.result.items || [])
      } catch (error) {
          this.showOverlay= false;
          this.errorHappened(error)
      }
      this.showOverlay= false;
      console.log('taille',this.typestitres);
    },
    async getTypesTitres(){
      this.showOverlay= true;
      try {
          this.typestitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items || [])
      } catch (error) {
          this.showOverlay= false;
          this.errorHappened(error)
      }
      this.showOverlay= false;
      console.log('taille',this.typestitres);
    },
    onSearchTypetitre(query){
        this.searchtypetitre = query
        this.offsetTypetitre = 0
    },
    onSearchTitre(query){
      this.searchtitre = query
      this.offsetTitres = 0
    } 
  },
  async mounted(){
    this.entite.libelle = this.user.profil.organisation;
    await this.getTypesTitres();
  }
};
</script>
<style >
.setwidth > input {
  width: 154px !important;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: "choisir";
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