<template>
    <data-modal-reset-password size="lg" ref="popup" :largeur="650">
        <b-overlay rounded="sm" :show="isBusy"></b-overlay>
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-4 pt-2 pb-4">


           <div class="mt-3" style="color: black">
                <p class="font-weight-bold text-left ml-4" style="font-size: 20px">Le mot de passe</p>
                <ul class="contraintes" style="text-align: left; font-size: 14px; color: gray, font-weight: normal;">
                  <li>
                    <span>
                      <svg v-if="data.password.length >= 8 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                      <span v-if="data.password.length < 8 && data.password.length > 0" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                      </span>
                      <span v-if="!(data.password.length >= 8) && !(data.password.length < 8 && data.password.length > 0)">
                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                      </span>
                      Doit contenir au moins 8 caractères.</li>
                  <li>
                    <span>
                      <svg v-if="/\d/.test(data.password)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                      <span v-if="(!/\d/.test(data.password) && data.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                      </span>
                      <span v-if="!(/\d/.test(data.password)) && !(!/\d/.test(data.password) && data.password.length > 0)">
                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                      </span>Doit contenir au moins un chiffre</li>
                  <li>
                    <span>
                      <svg v-if="/[^A-Za-z 0-9]/g.test(data.password)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                      <span v-if="(!/[^A-Za-z 0-9]/g.test(data.password) && data.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                      </span>
                      <span v-if="!(/[^A-Za-z 0-9]/g.test(data.password)) && !(!/[^A-Za-z 0-9]/g.test(data.password) && data.password.length > 0)">
                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                      </span>Doit contenir au moins un caractère spécial, par exemple: apostrophe, parenthèse, virgule, tiret, etc.</li>
                  <li>
                    <span>
                      <svg v-if="(data.password === data.confirm && data.password.length > 0)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                      </svg>
                      <span v-if="(data.password != data.confirm && data.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                      </span>
                      <span v-if="!(data.password === data.confirm && data.password.length > 0) && !(data.password != data.confirm && data.password.length > 0)">
                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                      </span>Doit être entré de manière identique dans les deux champs</li>
                </ul>
              </div>
          

            <b-row class="mb-0">
                <div>
                    <b-form-group label="Ancien Mot de Passe:" label-for="nested-city" label-cols-sm="7" >
                        <b-form-input type="password" id="nested-city" class="form-control-xs" v-model="data.lastpassword"></b-form-input>
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
                <b-button style="background: rgb(0, 82, 44) !important; " :disabled="!valuesSetCorrectly||submitted" @click.prevent="changePassword">Enregistrer 
                    <b-spinner v-if="submitted" small></b-spinner>
                </b-button>

                <!--<a @click.prevent="changePassword" style="color: green; cursor: pointer">
                    <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                    {{ okButton }}
                </a>-->
            </div>
            <un-authorize-box ref="unAuthorizeDialogue"></un-authorize-box>
            <infos-box ref="infosDialogue"></infos-box>
        </div>
    </data-modal-reset-password>
</template>

<script>
import DataModalResetPassword from '../DataModalResetPassword.vue'
import UnAuthorizeBox from '@/components/utils/UnAuthorizeBox.vue';
import InfosBox from '@/components/utils/InfosBox.vue';


import { mapGetters } from "vuex";
export default {
    name: 'Created',

    components: { DataModalResetPassword, UnAuthorizeBox, InfosBox  },

    data: () => ({
        isBusy:false,
        submitted:false,
        data:{
            lastpassword:"",
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

    computed:{
        ...mapGetters(['user']),
        valuesSetCorrectly() {
        var pattern = /\d/;
        var specials = /[^A-Za-z 0-9]/g;
        return ((this.data.password.length >= 8) && 
            (pattern.test(this.data.password)) && 
            (this.data.password.trim() === this.data.confirm.trim()) &&
            specials.test(this.data.password)
        );
        },
        statePassword() {
            return this.data.password >= 8
        },
        stateConfirmPassword() {
            return this.data.confirm >= 8
        },
        invalidFeedbackPassword() {
            const pattern = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
            if (!pattern.test(this.data.password)) {
                return ''
                /*return 'Votre mot de passe doit contenir 1 chiffre, 1 majuscule, 1 minuscule, 1 caractère special, 8 lettres '*/
            }
            return ''
        },
        invalidFeedbackConfirmPassword() {
        const pattern = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
        if (!pattern.test(this.data.confirm)) {
            return ''
        }
        return ''
        },
        correctData(){
            if(this.invalidFeedbackConfirmPassword==''&&this.invalidFeedbackPassword==''){
                return false
            }else{
                return true
            }
        }
    },
    methods: {
        show(opts = {}) {
            if (opts.cancelButton) {
                this.title= opts.title
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
        //fonction qui renvoit true si le mot de passe respecte toutes les règles
        checkpPassword(){
            var pattern = /\d/;
            var specials = /[^A-Za-z 0-9]/g;
            return ((this.data.password.length >= 8) && 
                (pattern.test(this.data.password)) && 
                (this.data.password.trim() === this.data.confirm.trim()) &&
                specials.test(this.data.password)
            );
        },
        async changePassword() {
            this.submitted=true
            console.log('user ',this.data);
            let token=storage.get('access_token')
            this.$auth.put('password/change_my',this.data, { headers: {'Authorization': `Bearer ${token}`}}).then(response => {
                this.submitted = false 
                //this.$emit('passwordchange',response.data.message)

                this.$auth.get('login/deconnexion').then((response) => {
                    storage.clear()
                    this.$store.dispatch('LogOut')
                    this.$router.push({name: 'login'})
                    return App.notifySuccess(response.data.message)

                })
                .catch((error) => {
                return App.alertError(error.message || 'Impossible d\'acceder au seveur')
                });

            })
            .catch((error) => {
                if(error.response.data.code=='403'){
                    this.submitted=false
                    this.showUnAuthorizeBox();
                }
                if(error.response.data.code=='404'){
                    this.submitted=false
                }else{
                    this.displayErrorMessage(error)
                }
            });
        },
        async displayErrorMessage(error){
            let message = error.response.data.message!=undefined?error.response.data.message:'erreur interne du serveur'
            const ok = await this.$refs.infosDialogue.show({
                  title: 'Information',
                  message: message,
            })
        },
        //methode permettant d'illustrer le non autorisé 
      async showUnAuthorizeBox() {
            const ok = await this.$refs.unAuthorizeDialogue.show({
               title: 'Enregistrement',
               message: 'Vous n\'avez pas le droit d\'éffectuer cette opération',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.unAuthorizeDialogue._close();
                this.$refs.popup._close();
            } else {
                this.$refs.unAuthorizeDialogue._close();
                this.$refs.popup._close();
            }
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

.contraintes li {
  /* height: 0px !important; */
  overflow-y: hidden !important;
  display: flex;
  align-items: center;
}
.contraintes span {
  margin-right: 5px;
}
</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
