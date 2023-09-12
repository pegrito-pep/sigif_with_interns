<template>
  <div>
    <b-overlay :show="showOverlay" rounded="sm">
    <b-row>
      <b-col>
        <b-form-group>
          <div>
            <label for class="m-0 p-0 font-weight-300">type de produit</label>
            <select
              class="m-0 p-0"
              style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
            >
               <option v-for="typeproduit in typesProduits" :key="typeproduit.idtypeProduit" :value="typeproduit.idtypeProduit"> {{ typeproduit.libelle }}</option>
            </select>
          </div>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group>
          <div>
            <label for class="m-0 p-0 font-weight-300">Essence</label>
            <select
              class="m-0 p-0"
              style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"
            >
              <option v-for="essence in essences" :key="essence.idessence" :value="essences.idessence"> {{ essence.nomusuel }}</option>
            </select>
          </div>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <b-form-group>
          <label class="p-0 m-0">Nom du produit</label>
          <b-form-input size="sm" class="w-100 p-0 m-0" placeholder v-model="modal.numquittance" />
        </b-form-group>

        <b-form-group>
          <label class="p-0 m-0">code du produit</label>
          <b-form-input size="sm" class="w-100 p-0 m-0" placeholder v-model="modal.numquittance" />
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group>
          <label class="p-0 m-0">Description</label>
        <b-form-textarea placeholder="saissisez ici.." style="height: 6.5em !important"></b-form-textarea>
        </b-form-group>
          
      </b-col>
    </b-row>

    <b-row>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>

    <b-row>
      <b-col cols="12">
        <b-col>
          <label for="input-small" class>Fichiers des spécifications du produit:</label>
          <div class>
            <input type="file" />
          </div>
        </b-col>
      </b-col>
    </b-row>
    <br />

    <b-row>
      <b-form-group class="pl-1 mt-1">
        <b-form-checkbox
          :disabled="submitted"
          v-model="isActive"
        >{{ isActive ? 'desactiver le produit' : 'activer le produit'}}</b-form-checkbox>
      </b-form-group>
    </b-row>
    <hr />
     <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="addEntite" >Enregistrer <b-spinner v-if="submitted" small /></b-button>
                <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedcontinue" @click.prevent="addEntiteAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedcontinue" small /></b-button>
    </b-overlay>
  </div>
</template>

<script>
const php = require("phpjs");

export default {
  name: "produit-form",
  computed: {
    //quota() {return this.calculate / 4000}
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
    typesProduits:[],
    essences:[],
    showOverlay:true,
    modal: {
      numquittance: "",
      datequittance: "",
      montant: "",
      idCompte: "",
      payerCharge: false,
      photoRecu: ""
    },
    isActive: false
  }),
  methods: {
    async createQuittanceDF10() {
      if (php.empty(this.modal.idCompte) || php.empty(this.modal.montant)) {
        return App.error(
          "Veuillez entrer le montant de la recharge et le compte à recharger"
        );
      }
      const data = {
        numquittance: this.numquittance,
        datequittance: this.datequittance,
        montant: this.montant,
        idCompte: this.idCompte,
        payerCharge: this.payerCharge,
        recu: await this.$getBase64(this.photRecu)
      };
      for (const key in this.modal) {
        formData.append(key, this.modal[key]);
      }
      this.submitted = true;

      /*axios.post('occupations', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                this.submitted = false 
                this.$emit('payed')
                return App.notifySuccess(response.message)
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
            })*/
    },
     async getTypesProduitData(){
      console.log('entrée ici');

            try {
                 this.typesProduits = await this.$donneesReference.get("types-produits?size=400").then(response => response.data.result.items);
            } catch (error) {
                console.log(error.message);
            }
            try {
                 this.essences = await this.$donneesReference.get("essences?size=400").then(response => response.data.result.items);
            } catch (error) {
                console.log(error.message);
            }
          
            this.showOverlay=false;
      },
     
  },
   async mounted() {
        await this.getTypesProduitData()
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
</style>