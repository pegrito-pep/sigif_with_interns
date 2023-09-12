<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlay">
            <b-row>
                <b-col>
                    <b-form-group>
                        <label style="font-weight:300" class="m-0 p-0"><span style="color:red">*</span>Sélectionner le permis</label>
                        <select name="permis"  v-model="form.permis"  class="m-0 p-0" :class="{'border-danger': requiredPermis }"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option value=""></option>
                            <option v-for="p in permis" :key="p.idpermis" :value="p.idpermis"> {{ p.numpermis }}</option>
                        </select>
                        <span v-if="requiredPermis==true">Bien vouloir sélectionner le permis</span>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                        <label style="font-weight:300" class="m-0 p-0">Quantité à créer</label>
                        <b-form-input type="number" size="sm" name="qte" class="w-100 px-4 m-0" placeholder="" v-model="form.quandite"  v-validate="{ required: true}" :state="validateState('qte')" aria-describedby="qte" data-vv-as="qte"/>
                        <b-form-invalid-feedback id="qte">donnée obligatoire</b-form-invalid-feedback>
                    </b-form-group>
                </b-col>
            </b-row>
            <hr>
            <b-button @click.prevent="addFeuillet" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" ><b-icon icon="check-square-fill"></b-icon> Créer <b-spinner v-if="submitted" small></b-spinner></b-button>
        </b-overlay>
        <error-dialogue ref="errorDialogue"></error-dialogue>
    </div>
</template>
<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';

import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
    export default{
        components:{
            ErrorDialogue
        },
        data(){
            return{
                showOverlay:true,
                form:{
                    permis: '', 
                    quandite:''
                },
                submitted: false,
                requiredPermis:false,
                permis:[]
            }
        },
        methods:{
            async addFeuillet(){
                if(!this.form.permis){this.requiredPermis=true; return;}
                else{this.requiredPermis=false;}
                this.$validator.validateAll().then(result => {if (!result) {return;}
                console.log('données envoyées ',this.form);
                this.submitted = true 
                this.$abbattage.post('feuilletDf10', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('feuilletAdded',response)
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
                    this.$emit('closeForm')
                } else {
                this.$refs.errorDialogue._close();
                this.resetForm()
                }
            },
            async getPermis(){
                try {
                    this.showOverlay=true;
                    this.permis =  await this.$permis.get("permis").then(response => response.data.result.items);
                    this.showOverlay=false;
                }catch(error){
                    console.log(error);
                }
            },
            resetForm() {
                this.form = {
                    permis: '', 
                    quandite:''
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
        },   
        mounted(){
            this.getPermis();
        },
    }
</script>

<style scoped>
    option:hover {
      background-color: green;
    }
    .border-danger{
        border: 2px solid red;
    }
</style>