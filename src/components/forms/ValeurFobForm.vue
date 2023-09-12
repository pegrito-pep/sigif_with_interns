<template>
    <div>
            <b-row>
              <b-col>
                   <b-form-group>
                         <label class="p-0 m-0">Arreté No</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" placeholder="" v-model="modal.numquittance"/>
                    </b-form-group>
              
                    <b-form-group>
                         <label class="p-0 m-0">Nom du site</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" placeholder="" v-model="modal.numquittance"/>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                   <b-col>
                        <label for="" class="mt-2 p-0">Date signature</label>
                        <date-picker 
                       
                         format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                      </b-col>
              </b-col>
             
            </b-row>

             <b-row>
              <b-col>
                    <b-col>
                        <label for="" class="mt-2 p-0">Date effet</label>
                        <date-picker 
                       
                         format="dddd, DD MMMM YYYY" placeholder="date effet" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                      </b-col>
              </b-col>
            
            </b-row><br>

           <b-row>
               <label for="input-small" class="font-weight-bold">Arreté:</label>
                          <div class="">
                            <input type="file" />
                          </div>
               
           </b-row>
           <hr>
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="runPaiement">Enregistrer <b-spinner v-if="submitted" small /></b-button>
    </div>
</template>

<script>
const php = require('phpjs');


export default {
    name:"valeurfob-form",
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
