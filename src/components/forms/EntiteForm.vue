<template>
    <div>
            <b-row>
              <b-col>
                  <b-form-group>
                         <label class="p-0 m-0">Intitulé</label>
                        <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="modal.Intituleentite"/>
                    </b-form-group>
                   
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0">Responsable</label>
                        <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="modal.responsableentite"/>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                 <b-form-group>
                         <label class="p-0 m-0">Téléphone</label>
                        <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="modal.n"/>
                    </b-form-group>
                   
              </b-col>
              <b-col>
                 <b-form-group>
                         <label class="p-0 m-0">Email</label>
                        <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="modal.nj"/>
                    </b-form-group>
                   
              </b-col>
            </b-row>

             <b-row>
              <b-col>
                  <b-form-group>
                         <label class="p-0 m-0">Adresse</label>
                        <b-form-input type="number" size="sm" class="w-75 p-0 m-0" placeholder="" v-model="modal.numq"/>
                    </b-form-group>
                   
                   
              </b-col>
              <b-col>
                <b-form-group class="pl-1 mt-4"><b-form-checkbox :disabled="submitted" v-model="isActive" @change="setUserStatut">{{ isActive ?  'desactiver le site'  : 'activer le site'}}</b-form-checkbox></b-form-group>   
                   
              </b-col>
            </b-row>

           <b-row>
                
           </b-row>
           <hr>
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="runPaiement">Enregistrer <b-spinner v-if="submitted" small /></b-button>
    </div>
</template>

<script>
const php = require('phpjs');


export default {
    name:"site-form",
     computed: {
        //quota() {return this.calculate / 4000}
     },
     watch: {
      calculate(value) {
        if(value==0|| value.length >0){
            this.montantSet= false
        }
        else{
            this.montantSet= true
        }
        this.quota = Math.trunc(value / 4000)
     },
   
    },
    data: () => ({
        amount: '',
        submitted: false,
        modal: {
            numquittance:'', datequittance:'', montant:'', idCompte:'', payerCharge:false,
             photoRecu: ''
        },
        isActive:false
    }),
    methods: {
        async createQuittanceDF10() {
            if (php.empty(this.modal.idCompte) || php.empty(this.modal.montant)) {
                return App.error('Veuillez entrer le montant de la recharge et le compte à recharger')
            }
            const data = {
                numquittance: this.numquittance,
                datequittance: this.datequittance,
                montant: this.montant,
                idCompte: this.idCompte,
                payerCharge: this.payerCharge,
                recu: await this.$getBase64(this.photRecu)
            }
            for (const key in this.modal) {
            formData.append(key, this.modal[key])
        }
            this.submitted = true
           
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
    }
}
</script>
<style >
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
</style>