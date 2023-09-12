<template>
    <div>
            <b-row class="d-flex justify-content-center align-items-center">
                <b-col cols="8">
                    <b-row class="mb-1">
                        <b-col cols="4"><label for="" class="m-0 p-0" style="font-weight:300">Unité de transformation</label></b-col>
                        <b-col cols="8">
                             <select class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                <option selected="selected">PB BLCAM</option>
                                <option>SITE DE YASSA</option>
                                <option>SITE DE BONABERI</option>
                            </select>
                        </b-col>
                    </b-row>
                    <b-row class="mb-1">
                        <b-col cols="4"><label for="" class="m-0 p-0" style="font-weight:300">Ligne de transformation</label></b-col>
                        <b-col cols="8">
                             <select class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                <option selected="selected">PB BLCAM</option>
                                <option>SITE DE YASSA</option>
                                <option>SITE DE BONABERI</option>
                            </select>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="4"><label for="" style="font-weight:300">Nom de la ligne</label></b-col>
                        <b-col cols="8">
                             <b-form-input class="form-control" size="sm" placeholder="" v-model="ligne.nomligne"/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="4">
                    <b-form-group >
                        <label for="" class="d-flex justify-content-center align-items-center" style="font-weight:300">description</label>
                        <b-form-textarea id="textarea" rows="2" max-rows="6" v-model="ligne.description"></b-form-textarea>
                    </b-form-group>
                </b-col>
            </b-row>

            
            <b-row  :id="repeaterId">
            
                <b-col>
                    <b-card style="border-top: 1px solid #28a745">
                        <template #header>
                        <b-row>
                            <b-col><h6>Tableau de rendement par essence</h6></b-col>
                            <b-col clas="col-md-auto"><a data-repeater-create  size="sm" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Ajouter</a></b-col>
                        </b-row>
                        </template>
                        <b-row>
                            <div  class="ml-1 w-100" >
                                <b-table-simple class="m-0 p-0 w-100" hover small responsive >
                                    <b-tbody >
                                        <div data-repeater-list="group">
                                        <b-tr style="font-size: 1em;">
                                            <b-th class="border m-0 text-center p-0" style="width: 70%; color:green">Nom usuel</b-th>
                                            <b-th class="border m-0 text-center p-0" style=" color:green">Rendement</b-th>            
                                        </b-tr>
                                        <!--<b-tr><td colspan="5">&nbsp;</td></b-tr>-->
                     
                                        <b-tr style="font-size: 2rem" data-repeater-item>
                                            <b-td class="border py-0">
                                                 <b-form-input size="sm" class="my-1"  style="width: 45%; height:80%"></b-form-input>   
                                            </b-td>
                                            <b-td class="border">
                                                 <b-form-input size="sm" class="my-1" style="width: 45%; height:80%"></b-form-input>
                                            </b-td>
                                            <b-button data-repeater-delete variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                                        </b-tr>
                                    
                                       </div>
                                    </b-tbody>
                                </b-table-simple>
                            </div>
                        </b-row>
         
                     </b-card>
        </b-col>

            </b-row>
            <!--<div :id="repeaterId">
                    <div data-repeater-list="group">
                        <b-row data-repeater-item class="mb-1 justify-content-center">
                            
                    
                            <b-col cols="3" class="p-0 ml-2">
                                <b-form-input name="valeur" v-model="valeur" placeholder="$t('data.logement_autres_caracteristiques_quantite')" trim></b-form-input>
                            </b-col> 
                            <b-col cols="1" class="m-0 p-0 ">
                                <b-form-group label="">
                                    <b-button data-repeater-delete variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                                </b-form-group>
                            </b-col>   
                        </b-row>   
                    </div>
                <b-button data-repeater-create class="btn btn-success btn-icon mt-2"><i class="ik ik-plus"></i></b-button>
            </div>-->





            

           
           
           <hr>
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="runPaiement">Enregistrer <b-spinner v-if="submitted" small /></b-button>
    </div>
</template>

<script>
const php = require('phpjs');


export default {
    name:"site-form",
     computed: {
       repeaterId() {
            return `repeat-added-logement-form-${php.empty(this.ligne) ? php.uniqid() : this.ligne.idLigne}`
        },
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
        ligne: {
            unite:'', ligne:'', nomligne:'', description:''
        },
        isActive:false,
        libelle:'',
        valeur:'',
        
        abandonne:false,
         fields: [{ key: "nomusuel", label: "Nom Usuel", thStyle: { width: "70%" } }, { key: "rendement", label: "Rendement" }],
         elements:[{nomusuel :"pep",rendement:15}]
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
        rowClass(item, type) {
            if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
            }else{
            return 
            }
        },
        makeRepeater() {
            setTimeout(() => {
                $(`#${this.repeaterId}`).repeater({ isFirstItemUndeletable: true  })
            }, 500);
        },
    },
    async mounted(){
        if (!php.empty(this.ligne)) {
            this.makeRepeater()
        }
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