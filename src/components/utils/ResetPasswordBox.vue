<template>
    <data-modal-reset-password size="lg" ref="popup">
        <b-overlay rounded="sm" :show="isBusy"></b-overlay>
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-4 pt-2 pb-4">
            <div class="d-flex align-center justify-content-center">
               
            </div>
            <b-row class="mb-0">
                <div>
                    <b-form-group label="Ancien Mot de Passe:" label-for="nested-city" label-cols-sm="7" >
                        <b-form-input type="password" id="nested-city" class="form-control-xs" v-model="data.ancpassword"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Nouveau mot de passe:" label-for="nested-state" label-cols-sm="7">
                        <b-form-input type="password" id="nested-state" class="form-control-xs" v-model="data.password"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Repeter Nouveau Mot de Passe:" label-for="nested-country" label-cols-sm="7">
                        <b-form-input type="password" id="nested-country" class="form-control-xs" v-model="data.confirm"></b-form-input>
                    </b-form-group>
                </div>
            </b-row>
            <div class="btns d-flex justify-content-end">
                <a @click="changePassword" style="color: green; cursor: pointer">{{ okButton }}</a>
            </div>
        </div>
    </data-modal-reset-password >
</template>

<script>
import DataModalResetPassword from './DataModalResetPassword.vue'

import { mapGetters } from "vuex";
export default {
    name: 'Created',

    components: { DataModalResetPassword  },

    data: () => ({
        isBusy:false,
        data:{
            ancpassword:"",
            login:"",
            password:"",
            confirm:""  
        },
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        compte: undefined, // login
        nom: undefined, // nom
        prenom: undefined, // prenom
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    computed: {
        ...mapGetters(['user']),
    },
    methods: {
        show(opts = {}) {
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
                this.message = opts.message
                this.okButton = opts.okButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
        changePassword(opts = {}) {
            this.isBusy=true
            this.data.login=this.user.login
            console.log('user ',this.data);
            this.$auth.put('password/change',this.data).then(response => {
                this.isBusy = true 
                this.$refs.popup.close()
                return App.notifySuccess(response.data.message)
            })
            .catch((error) => {
                if(error.response.data.code=='404'){
                    this.isBusy=false
                    this.resulSet=2
                }
                
            });
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

         _close() {
            this.$refs.popup.close()
        },
    },
}
</script>

<style scoped>

.header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-image: url('~@/assets/images/image.png');
    height: 40;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px 10px;
}

.close {
    font-size: 30px;
}


.btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
}
.ok-btn {
    border: none;
    height: 40px;
    text-align: center;
    background-color: rgb(0, 82, 44) !important;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancell {
    border: none;
    width: 80px;
    height: 30px;
    text-align: center;
    background: rgba(57, 139, 15, 0.884);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancelll {
    border: none;
    width: 80px;
    height: 30px;
    text-align: center;
    background: rgba(102, 201, 53, 0.37);
    color: rgb(14, 13, 13);
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.check { 
    background: #ee05118a;
    height: 60px;
    width: 60px;
    border-radius:  50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon{

    color: rgb(245, 237, 237);
}


</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
