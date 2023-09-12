<template>
    <div>
            <b-row class="d-flex justify-content-center align-items-center">
              <b-col cols="4">
                <div>
                    <b-row>
                        <b-col cols="4"><label for="" class="m-0 p-0" style="font-weight:300">N° du permis</label></b-col>
                        <b-col cols="8">
                             <select class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                <option selected="selected">{{ permis.numpermis }}</option>
                                <option>SITE DE YASSA</option>
                                <option>SITE DE BONABERI</option>
                            </select>
                        </b-col>
                    </b-row>
                </div>
              </b-col>

              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">Date permis</label>
                        <b-form-input size="sm" class="form-control-xs" placeholder="" v-model="permis.datepermis" disabled/>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">type de titre</label>
                            <select class="m-0 p-0" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option selected="selected">{{ permis.typetitre }}</option>
                            </select>
                        </div>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° du titre</label>
                        <b-form-input size="sm" class="form-control-xs" placeholder="" v-model="permis.numtitre" disabled/>
                    </b-form-group>
              </b-col>
             <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° UFA</label>
                        <b-form-input size="sm" class="form-control-xs" placeholder="" v-model="permis.numufa" disabled/>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° UFE</label>
                        <b-form-input size="sm" class="form-control-xs" placeholder="" v-model="permis.numufe" disabled/>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° AAC</label>
                        <b-form-input size="sm" class="form-control-xs" placeholder="" v-model="permis.numaac" disabled/>
                    </b-form-group>
              </b-col>
            </b-row>
             <b-row>
                <b-col>
                    <b-card >
                 <template #header>
                    <h6 class="mb-0 font-weight-bold text-center">Coordonnées UTM</h6>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group>
                         <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Zone </label>
                        <b-form-input  name="typeentite" size="sm" class="p-0 m-0" placeholder="" v-model="modal.numquittance" />
                        <b-form-invalid-feedback id="type entite">{{ veeErrors.first('typeentite') }}</b-form-invalid-feedback>
                    </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                         <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">X</label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="modal.numquittance"/>
                    </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                         <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Y</label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="modal.numquittance"/>
                    </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
                </b-col>
                <b-col>
                    <b-card >
                 <template #header>
                    <h6 class="mb-0 font-weight-bold text-center">Grume</h6>
                </template>
                <b-row>
                    <b-col>
                        <b-form-group>
                         <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Diametre petit bout </label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="tige.dpetitbout"/>
                    </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-group>
                         <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Diametre gros bout</label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="tige.dgrosbout"/>
                    </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Longueur</label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="tige.longueur"/>
                      </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col cols="4">
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Tige abandonnée ?</label>
                            <select class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                    <option selected="selected"></option>
                                    <option>Oui</option>
                                     <option>Non</option>
                            </select>
                        </div>
                    </b-col>
                    <b-col cols="8" v-show="abandonne">
                        <b-form-group>
                        <label class="p-0 m-0 d-flex justify-content-center align-items-center" style="font-weight:300">Motif abandon</label>
                        <b-form-input size="sm" class="p-0 m-0" placeholder="" v-model="tige.motif"/>
                      </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </b-col>

            </b-row>

     
             <div class="p-4 mb-5">
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="runPaiement">
            Enregistrer
            <b-spinner v-if="submitted" small /></b-button>
          <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedcontinue" @click.prevent="addEntiteAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedcontinue" small /></b-button>
      </div>
       
       <hr>
      
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
        isActive:false,

        permis:{
            numpermis:"2002/PAO/MINFOF/SETAT/SG/DF/SDAAF",
            datepermis:"17/05/2021",
            typetitre:"CD",
            numtitre:2002,
            numufa:2002,
            numufe:1,
            numaac:1,
        },
        tige:{
            dpetitbout:"",
            dgrosbout:"",
            longueur:"",
            motif:""
        },
        abandonne:false
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
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>