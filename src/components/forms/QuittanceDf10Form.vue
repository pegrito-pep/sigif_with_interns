<template>
    <div>
            <b-row>
              <b-col>
                    <b-form-group>
                        <div class="d-flex" style="flex-wrap: wrap;">
                            <label class="w-50 d-flex align-items-center font-si"><span style="color: red;font-size: 1.2em;">*</span>N° quittance</label>
                            <b-form-input size="sm" placeholder="" name="numquittance" v-model="form.numquitance" v-validate="{ required: true}" :state="validateState('numquittance')" aria-describedby="numquittance" data-vv-as="numquittance"/>
                            <b-form-invalid-feedback id="numquittance">Veuillez renseigner ce champ</b-form-invalid-feedback>
                        </div>
                    </b-form-group>
              </b-col>
            </b-row>
             <b-row>
            <b-col>
                 <b-form-group>
                        <div class="d-flex" style="flex-wrap:wrap">
                            <label class="w-75 d-flex align-items-center"><span style="color: red;font-size: 1.5em;">*</span>Montant</label>
                            <!-- <b-form-input lazy-formatter :formatter="formatter" name="montant" :state="validateState('montant')" size="sm" v-validate="{required:true}" type="number" class="form-control" v-model="form.montant"></b-form-input> -->
                            <vue-numeric name="montant" :minus="false" class="form-control" placeholder="montant versé" required separator=" " v-model="form.montant"  :class="{'border-danger': montantToSet }"></vue-numeric>
                            <!-- <b-form-invalid-feedback id="montant">Veuillez renseigner ce champ</b-form-invalid-feedback> -->
                        </div>
                        <!-- <span v-if="montantToSet==true" class="text-danger">Bien vouloir remplir ce champ</span> -->
                </b-form-group>
                <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                    <h6 v-if='montantSet'>Quota df10 équivalent : <span class="font-weight-bold">{{ form.quota }}</span></h6>
                </transition>
            </b-col>
          </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                        <div class="d-flex" style="flex-wrap:wrap">
                            <label class="w-75 d-flex align-items-center"><span style="color: red;font-size: 1.5em;">*</span>Date</label>
                            <!-- <calendar class="setwidth"  v-model="form.datequittance" :format="format" :clear-button="clear" :placeholder="placeholder" :pane="1" :class="{'border-danger': requiredDate }"></calendar> -->
                            <b-form-input type="date"  :state="validateState('datequittance')" validate name="datequittance" placeholder="" class="form-control" size="sm" v-validate="{required:true}" v-model="form.datequittance"></b-form-input>
                            <b-form-invalid-feedback id="datequittance">Veuillez renseigner ce champ</b-form-invalid-feedback>
                        </div>
                        <!-- <span v-if="requiredDate==true">La date de la quittance est obligatoire</span> -->
                    </b-form-group>
                </b-col>

            </b-row>
           
          <b-row>
            <b-col>
                <b-form-group>
                    <label>joindre fichier quittance</label>
                    <!--<input size="sm" type="file" ref="fileProtocoleAccord" @change="selectProtocoleAccordFile" id="upload-protocole-daccord" />-->
                     <b-form-file name="file" @change="handlefilequitance" id="file-small" size="sm" placeholder="aucun fichier choisi"></b-form-file>
                     <b-form-invalid-feedback id="file">Veuillez renseigner ce champ</b-form-invalid-feedback>
                </b-form-group>
            </b-col>
          </b-row>
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="createQuitanceDf10">Enregistrer<b-spinner v-if="submitted" small></b-spinner> </b-button>
          <error-dialogue ref="errorDialogue"></error-dialogue>

    </div>
</template>

<script>
const php = require('phpjs');

import Vue from 'vue'
import VueNumeric from 'vue-numeric'
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
// Vue.use(VueNumeric)

export default {
    components:{
        ErrorDialogue,VueNumeric
    },
     computed: {},
     watch: {
    //   "form.montant"(value) {
    //     if(php.empty(value)){
    //         this.montantSet= false
           
    //     }
    //     else{
    //         this.montantSet= true
    //         this.form.quota = Math.trunc(value / 5000)
    //         value=this.commify(parseFloat(value).toFixed(2))
    //         console.log(value)
    //     }
    //  },
    //  "form.datequittance"(value){
    //     if(php.empty(value)){
    //         this.requiredDate= true
    //     }
    //     else{
    //         this.requiredDate= false
    //     }
    //  }
   
    },
    data: () => ({
        amount: '',
        submitted: false,
        form: {
            numquitance:'', datequittance:'', montant:'', quota:'',iddocument:''
        },
        format:"yyyy-MM-dd",
        clear:true,
        placeholder:"date quittance",
        value:"",
        montant:"",
        montantSet:false,
        montantToSet:false,
        quota:"",
        requiredDate:false,
        fichierquittancde:null
    }),
    methods: {
        async handlefilequitance(e){
            const fichierquittancde =e.target.files[0];
            this.form.iddocument=await this.getBase64(fichierquittancde)
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
        async createQuitanceDf10(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(php.empty(this.form.montant)){ this.montantToSet =true; return;}
            else if(!php.empty(this.form.montant)){ this.montantToSet =false; }
            if(!this.form.datequittance){this.requiredDate=true; return;}
            else if(this.form.datequittance) {this.requiredDate=false;}
            
            this.submitted = true
            console.log("donées finales", this.form)
            this.$fiscalite.post('quitancedf10', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('quittanceDF10Added',response)
                    this.resetForm()
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    console.log('erreur site',error.message)
                    this.errorHappened(error)
                })
            })
        },
        resetForm() {
            this.form = {
                numquitance:'', datequittance:'', montant:'', quota:'',iddocument:''
            };
             this.$nextTick(() => {
                this.$validator.reset();
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
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        formatter(value){
            return this.commify(parseFloat(value).toFixed(2))
        },
        commify(n){
            var parts = n.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            return numberPart.replace(thousands, ",") + (decimalPart ? "." + decimalPart : " ");
        },
        unncommify(n){
            var parts = n.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            return numberPart.replace(thousands, "") + (decimalPart ? "" + decimalPart : "");
        }
    },
}
</script>
<style >
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
.border-danger{
    border: 2px solid red;
  }
</style>