<template>
  <div>
  <b-form @submit.stop.prevent="addLotCodeBarre">
    <b-row>
      <b-col>
        <b-form-group>
          <label class="p-0 m-0">Nombre de code à barres</label>
          <b-form-input  name="nbrcodebar" size="sm" class="w-100 p-0 m-0" placeholder v-model="modal.nbrcodebar"  :state="validateState('nbrcodebar')" v-validate="{ required: true}" aria-describedby="nbrcodebar" data-vv-as="nbrcodebar"/>
          <b-form-invalid-feedback id="nbrcodebar"
          >Le nombre de code est requis</b-form-invalid-feedback>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group>
          <div>
            <label for class="m-0 p-0 font-weight-300">Usage</label>
            <b-form-select id="usage" name="usage" v-model="modal.usage" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" v-validate="{ required: true}" :state="validateState('usage')" aria-describedby="usage" data-vv-as="usage">
            </b-form-select>
          <b-form-invalid-feedback id="usage">L'usage est requis</b-form-invalid-feedback>
          </div>
        </b-form-group>          
      </b-col>
    </b-row>

    <b-row>
        <b-col cols="12">
        <b-form-group>
          <div>
            <label for class="m-0 p-0 font-weight-300">Site CEMAC</label>
            <b-form-select id="sitecemac" name="sitecemac" v-model="modal.sitecemac" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;" v-validate="{ required: true}" :state="validateState('sitecemac')" aria-describedby="sitecemac" data-vv-as="sitecemac">
            </b-form-select>
          <b-form-invalid-feedback id="sitecemac">Le site CEMAC est requis</b-form-invalid-feedback>
          </div>
        </b-form-group>          
        </b-col>
    </b-row>

        <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="addLotCodeBarre">Enregistrer <b-spinner v-if="submitted" small /></b-button>
        <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" @click.prevent="addLotCodeBarreAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small /></b-button>
      <b-spinner v-if="submitted" small />
  </b-form>
  </div>
</template>

<script>
const php = require("phpjs");
import { mapGetters } from "vuex";
import Vue from "vue";
import VeeValidate from "vee-validate";
Vue.use(VeeValidate);
export default {
  name: "site-form",
  computed: {
          ...mapGetters(["user"])
  },
  watch: {
    calculate(value) {
      if (value == 0 || value.length > 0) {
        this.montantSet = false;
      } else {
        this.montantSet = true;
      }
      this.quota = Math.trunc(value / 4000);
    }
  },
  data: () => ({
    amount: "",
    submitted: false,   
    submitted2: false,
    modal: {
      nbrcodebar:"",
      sitecemac:"",
      usage:"",
    },
    isActive: false,

    state: {
      nbrcodebar: null,
      usage: null,
      sitecemac: null,

    }
  }),
  methods: {
        validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },


   
    async addLotCodeBarre() {
      this.state.nbrcodebar = this.modal.nbrcodebar == null
      this.state.usage = this.modal.usage == null
      this.state.sitecemac = this.modal.sitecemac == null

      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }

        if (!this.modal.nbrcodebar) {
          this.requirednbrcodebar = false;
          return;
        } else {
          this.requirednbrcodebar = true;
        }
        if (!this.modal.sitecemac) {
          this.requiredsitecemac = false;
          return;
        } else {
          this.requiredsitecemac = true;
        }
        console.log("données envoyées", this.modal);
        this.modal.nbrcodebar = this.modal.nbrcodebar.idnbrcodebar;
        this.submitted = true;

        this.$fiscalite
          .post("utilisateurs", this.modal)
          .then(response => {
            this.submitted = false;
            this.$emit("userAdded");
            this.resetForm();
            console.log("respone après ajout", response);
            return App.notifySuccess(response.data.message);
          })
          .catch(error => {
            this.submitted = false;
            return App.alertError(error.message);
          });
      });
    },
    async addLotCodeBarreAndContinue() {
      this.state.nbrcodebar = this.modal.nbrcodebar == null
      this.state.usage = this.modal.usage == null
      this.state.sitecemac = this.modal.sitecemac == null

      this.$validator.validateAll().then(result => {
        if (!result) {
          return;
        }
        if (!this.modal.nbrcodebar) {
          this.requirednbrcodebar = false;
          return;
        } else {
          this.requirednbrcodebar = true;
        }
        if (!this.modal.sitecemac) {
          this.requiredsitecemac = false;
          return;
        } else {
          this.requiredsitecemac = true;
        }
        console.log("données envoyées", this.modal);
        this.modal.nbrcodebar = this.modal.nbrcodebar.idnbrcodebar;
        this.submitted = true;

        this.$fiscalite
          .post("utilisateurs", this.modal)
          .then(response => {
            this.submitted = false;
            this.$emit("userAdded");
            this.resetForm();
            console.log("respone après ajout", response);
            return App.notifySuccess(response.data.message);
          })
          .catch(error => {
            this.submitted = false;
            return App.alertError(error.message);
          });
      });
    },
    // async getTypesProfils() {
    //   this.showOverlay = true;
    //   if (
    //     this.$store.state.typesProfils !== null &&
    //     this.$store.state.typesProfils.length > 0
    //   ) {
    //     this.typesUtilisateurs = this.$store.state.typesProfils;
    //   } else {
    //     try {
    //       this.$administration.get("profils/types-profil").then(response => {
    //         this.typesUtilisateurs = response.data.result;
    //         this.$store.dispatch("typeProfils", this.typesUtilisateurs);
    //       });
    //     } catch (error) {
    //       App.notifyError(error.message);
    //     }
    //   }
    //   this.showOverlay = false;
    // }
  },
 };
</script>
<style >
.setwidth > input {
  width: 154px !important;
}
.custom-file-input ~ .custom-file-label[data-browse]::after {
  content: "choisir";
}
</style>