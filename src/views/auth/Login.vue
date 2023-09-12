<template>
    <div id="cover" class="min-vh-100">
      
          <div class="index_entete d-flex justify-content-between w-100 pt-2">
            <b-col cols="2">
              <b-img src="@/assets/img/logo_sigif_grand_format-removebg-preview.png" fluid style="width: 10em;"></b-img>
            </b-col>
            <b-col cols="8" class="align-self-end" >
              <div class="mt-4" style="min-height: 10em; margin-top: 8.5rem!important;">
                <h4 class="text-uppercase anc-s text-center w-100 titre">Sigif</h4>
                <h4 class="text-uppercase anc-s w-100 titre">SYSTEME INFORMATIQUE DE GESTION DES INFORMATIONS FORESTIERES</h4>
              </div>
            </b-col>
            <b-col cols="2" class="p-2 d-flex justify-content-end">
              <b-img src="@/assets/img/minfof.png" fluid style="width: 180px; height: 156px;"></b-img>
            </b-col>
          </div>

          <div id="cover-caption">
            <div class="container">
                <div class="row text-white">
                    <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form px-4 pt-4 pb-0">
                      <h4 class="text-truncate" >Connexion - Connection</h4>
                        <div class="px-2">

                            
                              <!--form de connexion-->
                            <transition name="fade">
                                <div v-if="step == 1">
                                  <form action="" @submit.prevent="sendForm" class="login-sigf2-auth justify-content-center">
                                    <!--<form action="" @submit.prevent="handlealreadyconnected" class="login-sigf2-auth justify-content-center">-->
                                      <div class="form-group vertical-space">
                                        <label class="sr-only">login</label>
                                        <input type="text" class="form-control" placeholder="Compte - Login" v-model="login" required>
                                      </div>
                                      <div class="form-group">
                                          <label class="sr-only">Email</label>
                                          <input type="password" class="form-control" placeholder="Mot de passe - Password" v-model="password" required>
                                      </div>
                                      <div class="row login-form-color-text w-50 float-right">
                                        <b-button type="submit" class=" px-2" :disabled="submitted" style="border: none; background:none">
                                          <a  class=" px-2"><b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner> <span v-if="!submitted"> Se connecter - Sign in</span></a>
                                          <!--<a href="#" @click.prevent="sendForm" class=" px-2">Se connecter - Sign in</a>-->
                                        </b-button>
                                        
                                      </div>
                                      <div style="clear:both"></div>
                                      <div class="row login-form-color-text mt-3 mb-4">
                                        <a @click.prevent="step=2" cols="1" href="#" class="float-right px-2">Mot de passe oublié - Forgot Password</a>
                                      </div>
                                   </form>
                                </div>
                            </transition>
                            <transition name="fade">
                              <!--form de mot de passe oublie-->
                                <div v-if="step == 2">
                                  <form @submit.prevent="valider">
                                    <div class="reset-password-modal">
                                        <div class="content">
                                          <div class="header">
                                            <h5 class="title">Mot de passe oublié ?</h5>
                                            <button @click.prevent="step=1" type="button" class="close" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                          </div>
                                          <div class="body">
                                            <form @submit.prevent="resetPwd">
                                              <div class="input w-100">
                                                <label for="login" style="width:35%">Login<span class="input-star">*</span></label>
                                                <input  class="form-control login" type="text" v-model="resetPassword.login" required style="width:65%">
                                              </div>
                                              <div class="input w-100">
                                                <label class="w-30" for="email" style="width:35%">Email<span class="input-star">*</span></label>
                                                <input class="form-control login" type="email" v-model="resetPassword.email" required style="width:65%">
                                              </div>
                                              <div class="valider">
                                                <div class="">
                                                  <b-spinner small v-if="setReset" class="ml-2"  style="margin-right: 5px; color:green"></b-spinner>
                                                  <svg v-else style="margin: -5 -5px 0 0;" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="green" class="bi bi-check" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                  </svg>
                                                  <button :disabled="setReset" type="submit">Valider</button>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                    </div>
                                  </form>
                                </div>
                            </transition>
                            <!--Form de reser du mot de passe-->
                            <transition name="fade">
                              <!--form de mot de passe oublie-->
                                <div v-if="step == 3">
                                  <form @submit.prevent="changePassword" >
                                    <div class="reset-password-modal">
                                        <div class="change-password-content">
                                          <div class="header">
                                            <h5 class="title">Changer son mot de passe</h5>
                                            <button @click.prevent="step=1" type="button" class="close" aria-label="Close">
                                              <span aria-hidden="true">&times;</span>
                                            </button>
                                           
                                          </div>
                                            <b-alert variant="danger" class="text-center" :show="dismissCountDown"  fade @dismiss-count-down="countDownChanged">
                                              Lorsqu'on vous cree un compte, vous devez modifier votre mot de passe lors de votre première connexion
                                            </b-alert>
                                              <div class="mt-3" style="color: black">
                                                <p class="font-weight-bold text-left ml-4" style="font-size: 20px">Le mot de passe</p>
                                                <ul class="contraintes" style="text-align: left; font-size: 14px; color: gray, font-weight: normal;">
                                                  <li>
                                                    <span>
                                                      <svg v-if="updatePassword.password.length >= 8 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                      </svg>
                                                      <span v-if="updatePassword.password.length < 8 && updatePassword.password.length > 0" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                                                      </span>
                                                      <span v-if="!(updatePassword.password.length >= 8) && !(updatePassword.password.length < 8 && updatePassword.password.length > 0)">
                                                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                                                      </span>
                                                      Doit contenir au moins 8 caractères.</li>
                                                  <li>
                                                    <span>
                                                      <svg v-if="/\d/.test(updatePassword.password)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                      </svg>
                                                      <span v-if="(!/\d/.test(updatePassword.password) && updatePassword.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                                                      </span>
                                                      <span v-if="!(/\d/.test(updatePassword.password)) && !(!/\d/.test(updatePassword.password) && updatePassword.password.length > 0)">
                                                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                                                      </span>Doit contenir au moins un chiffre</li>
                                                  <li>
                                                    <span>
                                                      <svg v-if="/[^A-Za-z 0-9]/g.test(updatePassword.password)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                      </svg>
                                                      <span v-if="(!/[^A-Za-z 0-9]/g.test(updatePassword.password) && updatePassword.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                                                      </span>
                                                      <span v-if="!(/[^A-Za-z 0-9]/g.test(updatePassword.password)) && !(!/[^A-Za-z 0-9]/g.test(updatePassword.password) && updatePassword.password.length > 0)">
                                                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                                                      </span>Doit contenir au moins un caractère spécial, par exemple: apostrophe, parenthèse, virgule, tiret, etc.</li>
                                                  <li>
                                                    <span>
                                                      <svg v-if="(updatePassword.password === updatePassword.confirm && updatePassword.password.length > 0)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(0, 82, 44)" class="bi bi-check" viewBox="0 0 16 16">
                                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                      </svg>
                                                      <span v-if="(updatePassword.password != updatePassword.confirm && updatePassword.password.length > 0)" aria-hidden="true" style="font-size: 24px; color: red; font-weight: bold">&times;</span>
                                                      </span>
                                                      <span v-if="!(updatePassword.password === updatePassword.confirm && updatePassword.password.length > 0) && !(updatePassword.password != updatePassword.confirm && updatePassword.password.length > 0)">
                                                        <div style="border: solid 1.5px gray; height: 12px; width: 12px; background-color: white; border-radius: 50%"></div>
                                                      </span>Doit être entré de manière identique dans les deux champs</li>
                                                </ul>
                                              </div>
                                          
                                          
                                             <!--<div style="position: relative; padding: .75rem 1.25rem;margin: 1rem;border-radius: .25rem; color: #0c5460;background-color: greenyellow;">
                                                <span class="d-inline-flex ml-2">Lorsqu'on vous cree un compte, vous devez modifier votre mot de passe lors de votre première connexion</span>
                                              </div>-->
                                          <div class="mx-2">
                                            <form @submit.prevent="changePassword">
                                           
                                                <div class="d-flex px-3 pb-5">
                                                  <div class="w-50 mr-1">
                                                    <label for="">Nouveau mot de passe</label>
                                                    <b-form-input size="sm" type="password" id="input-1" v-model="updatePassword.password" trim></b-form-input>
                                                  </div>
                                                  <div class="w-50 ml-1">
                                                    <label for="">Confirmer le mot de passe</label>
                                                    <b-form-input size="sm" type="password" id="input-1" v-model="updatePassword.confirm" trim></b-form-input>
                                                  </div>
                                                </div>
                                                
                                              <div class="valider pr-3 pb-2" >
                                                <div :class="{'change-image-opacity': !valuesSetCorrectly,  'not-change-image-opacity': valuesSetCorrectly}">
                                                  <svg v-if="!submitted2" style="margin: -5 -5px 0 0;" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="green" class="bi bi-check" viewBox="0 0 16 16">
                                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                                  </svg>
                                                  <button :disabled="!valuesSetCorrectly"  type="submit"><span v-if="!submitted2">Valider</span><b-spinner small v-if="submitted2" class="ml-2"  style="margin-right: 5px;"></b-spinner></button>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                    </div>
                                  </form>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      <unreachable-box ref="unreachableapiDialogue"></unreachable-box>
      <auth-box ref="authDialogue" @sessionactivee="handleConnected"></auth-box>
      <alert-box ref="alertbox"></alert-box>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>

    </div>

</template>

<script>
import AlertBox from '@/components/utils/auth/AlertBoxAuth.vue';
import UnreachableBox from '@/components/utils/auth/UnreachableBox.vue';
import AuthBox from '@/components/utils/auth/ConfirmBoxDetail.vue';
import storage from '../../plugins/fluid-storage';

import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

export default {
  name: "Login",
  components: {
    UnreachableBox,
    AlertBox,
    AuthBox,
    CodeBarreInfo
  },
  data: () => ({
    resetPassword:{login:'', email:''},
    setReset:false,
    step:1,
    login: null,
    password: null,
    submitted:false,
    submitted2:false,

    //data forgot password modal
    showForgotPassword:false,
    email:"",
    //data change password
    updatePassword: {login:'', password: '', confirm:''},

    dismissSecs: 5,
    dismissCountDown: 0,
  }),
  computed:{

    valuesSetCorrectly() {
      var pattern = /\d/;
      var specials = /[^A-Za-z 0-9]/g;
      return ((this.updatePassword.password.length >= 8) && 
        (pattern.test(this.updatePassword.password)) && 
        (this.updatePassword.password.trim() === this.updatePassword.confirm.trim()) &&
        specials.test(this.updatePassword.password)
      );
    },

    statePassword() {
        return this.updatePassword.password >= 8
    },
    stateConfirmPassword() {
        return this.updatePassword.confirm >= 8
    },
    invalidFeedbackPassword() {
      const pattern = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
      if (!pattern.test(this.updatePassword.password)) {
        return ''
        /*return 'Votre mot de passe doit contenir 1 chiffre, 1 majuscule, 1 minuscule, 1 caractère special, 8 lettres '*/
      }
      return ''
    },
    invalidFeedbackConfirmPassword() {
      const pattern = /^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!-_]).*$/;
      if (!pattern.test(this.updatePassword.confirm)) {
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
    async showAlertBox(message, classSet,errorset){
      const ok = await this.$refs.alertbox.show({
               title: 'Information',
               message:message,
               classSet:classSet,
               errorSet:errorset
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                  this.$refs.alertbox._close();
                  this.step=1
                } else {
                  this.$refs.alertbox._close();
                  this.step=1
                }
    },
    //re-initialisation du mot de passe de l'utilisateur
    resetPwd(){
      this.setReset =true;
      this.$auth.put('password/reset', this.resetPassword).then(response => {
        console.log('response ',response);
        this.resetPassword={login:'', email:'' }
        this.showAlertBox(response.data.message, 'text-success',false)
        this.setReset =false;
      }).catch(error => {
        this.resetPassword={login:'', email:'' }
        this.showAlertBox(error.response.data.message, 'text-danger',true)
        this.setReset =false;

      })
    },
    //gestion du cas api inaccéssible
    async unreachableapi() {
      let message='Impossible de joindre le serveur';
            const ok = await this.$refs.unreachableapiDialogue.show({
               commande:'',
               title: 'ERREUR',
               message:message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {} else {
              console.log(storage)
              storage.clear()
              this.$store.dispatch('LogOut')
              this.$refs.authDialogue._close();
            }
    },
    //gestion du cas utilisateur connecté sur un autre appareil
    async handlealreadyconnected(langue) {
      let message=langue=='fr'?'Vous avez ouvert une session à partir d\'un autre terminal, voulez-vous la fermer':'You are logged to from another device. You want to close ?'
        let  okBouton =langue=='fr'?'Oui':'YES'
        let  cancelButton =langue=='fr'?'Non':'NO'
            const ok = await this.$refs.authDialogue.show({
               commande:'',
               title: 'CONFIRMATION',
               message:message,
               login: this.login, 
               password: this.password,
               okButton: okBouton,
               cancelButton: cancelButton,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {} else {
              console.log(storage)
              storage.clear()
              this.$store.dispatch('LogOut')
              this.$refs.authDialogue._close();
            }
    },
    //gestion de la reconnexion avec succès
    handleConnected(){
      this.$refs.authDialogue._close();
      this.$router.push({ name: "modules" });
    },
    
    sendForm() {
      storage.set('access_token','eyJhbGciOiJIUzM4NCJ9.eyJsb2dpbiI6IkFXT05PIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTY4NjU2NzAyNywiaXNzIjoic2lnaWYiLCJleHAiOjE2ODc0MzEwMjcsIm9yZ2FuaXNhdGlvbiI6MCwidHlwZW9yZ2FuaXNhdGlvbiI6Ik1GIn0.5nx4IZRlyqdDoamFvG5srawNPtyUj2J4JfR9LJCyd4DdnnBkJKcw5C_63GQ-mw5-')
      this.$router.push({ name: "modules" });
      
      this.submitted = true
      storage.set('login',this.login)
      this.$auth.post("login", { login: this.login, password: this.password }).then((response) => {
        storage.set("access_token", response.data.result.access_token);
        storage.set("refresh_token", response.data.result.refresh_token);

        this.$auth.get('login', { headers: {'Authorization': `Bearer ${response.data.result.access_token}`}}).then((response) => {
          this.$store.dispatch('user', response.data.result)
          this.$router.push({ name: "modules" });
        })
      })
      .catch((error) => {
         console.log(error)
         if(error.code=='ERR_NETWORK'){
          this.submitted=false;
          return this.unreachableapi();
          //return App.alertError('impossible de joindre le serveur') 
         }
         //gestion du cas utilisateur déjà connecté
         if(error.response.data.status==400){
           this.handlealreadyconnected(error.response.data.result.langue);
         }
         //gestion du cas doit modifier son mot de passe
         else if(error.response.data.code===800) {
            App.notifyError(error.response.data.message);
            this.step=3
         }
          else{
            App.alertError(error.response.data.message || 'érreur interne du serveur')
          }
        this.submitted = false; 
        
      });
   },
    valider(){
      this.updatePassword.login= storage.get('login')
      this.$auth.put('password/change', this.updatePassword).then(response => {
        App.notifySuccess(response.message)
        this.$router.push({name: 'login'})
      }).catch(error => {
        this.submitted = false
        App.notifyError(error.message)    
      })
    },
    changePassword(){
      this.updatePassword.login=storage.get('login')
      this.submitted2=true
      this.$auth.put("password/change", this.updatePassword).then((response) => {
        console.log('reponse changement de mot de passe',response);
        console.log('elements envoyées pour connexion',this.updatePassword);
        this.$auth.post("login", { login: this.updatePassword.login, password: this.updatePassword.password }).then((response) => {
          if(response.code==400){
            console.log('entrée mauvais format password');
            return App.notifyError(response.message);
          }
        storage.set("access_token", response.data.result.access_token);
        storage.set("refresh_token", response.data.result.refresh_token);

        this.$auth.get('login', { headers: {'Authorization': `Bearer ${response.data.result.access_token}`}}).then((response) => {
          this.$store.dispatch('user', response.data.result)
        this.$router.push({ name: "modules" });
      }) ;
        console.log('entrée ici cp 3');
        
      }).catch((error) => {
        console.log('entrée ici mauvais format password 1');
         this.submitted2 = false;
        App.notifyError(error.message);
      });

        //this.$router.push({ name: "modules" });
      }).catch(error => {
        this.submitted2 = false
        App.notifyError(error.response.data.message)    
      })
    },
     async handleCreated() {
            const ok = await this.$refs.createdDialogue.show({
               title: 'Enregistrement',
               message: 'Utilisateur enregistré avec succès',
               okButton: 'Nouvel enregistrement',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.createdDialogue._close();
                this.$bvModal.show("user-form");
            } else {
               this.$refs.createdDialogue._close();
            }
   },
   /**methodes liées au b-alert */
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    },
    async alertDisconnect(){
          const provenance = this.$route.query.alreadyconnected || null;
          window.history.replaceState(
              {},
              "",
              window.location.href.split("?")[0]
            ); 
          if (provenance) {
            const ok = await this.$refs.codebarreinfo.show({
                  title: 'Information',
                  message: 'Votre session a été intérrompue depuis un autre poste de travail',
            })
             
          }
    },
  },
  mounted(){
   this.alertDisconnect()

  }
}

</script>
<style scoped>
.index-container{
  height:100vh
}

.anc-s{
  color: White;
  font-size: 2rem;
  font-weight: bold;
}

.titre{
  font-size: 36px;
}

.login-box-add{
  min-height:200px;
}
.login-form-color-text{
  color: white;
}
.login-form-color-text a{
  text-decoration: none;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  color: inherit;
}


.login-form-color-text a:hover{
  font-weight: 600;
  font-style: italic;
  text-decoration: underline;
}

#cover {
    background-image: url('~@/assets/img/1.jpg');
    background-size: cover;
    height: 100%;
    height: 100%;
    text-align: center;
    align-items: center;
    position: relative;
}

#cover-caption {
    width: 100%;
    position: relative;
    z-index: 1;
}

/* only used for background overlay not needed for centering */
.login-sigf2-auth:before {
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.363);
    z-index: -1;
    border-radius: 10px;
    
}
.vertical-space{
  padding-bottom: 32px;
}

/*style partie reset password*/
.reset-password .close span{
    background-color: transparent;
  }
  .reset-password-modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh; 
    overflow: auto; 
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .content{
    margin: 10% auto 0 auto;
    transform: translate(0, -50%);
    width: 400px;
    background-color: #fff;
    border-radius: 10px;
    background-image: url('~@/assets/images/logo_sigif_dialog.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
  }
  .change-password-content{
    margin: 10% auto 0 auto;
    transform: translate(0, -50%);
    width: 800px;
    background-color: #fff;
    border-radius: 10px;
    background-image: url('~@/assets/images/logo_sigif_dialog.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
  }
  .change-image-opacity {
    opacity: 0.15;
  }
  .not-change-image-opacity {
    opacity: 1;
  }


  .header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px 16px;
    background-image: url('~@/assets/img/image.png');
    height: 40;
  }
.reset-password-modal label{
  color: black
}

  .reset-password-modal .input{
    display: flex;
    flex-direction: row;
  }

  .reset-password-modal .input:nth-child(2){
    margin-top: 16px;
  }
  .reset-password-modal label{
    display: flex;
    flex-direction: row;
    font-weight: normal;
    margin: 16px 10px 0 0;
  }

  .reset-password-modal .body{
    margin-top: 16px;
    padding: 16px;
  }
  .input-star{
    color: red;
  }
  .header .title{
    color: black;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .reset-password-modal .valider{
    margin-top: 16px;
    display: flex;
    flex-direction: row-reverse;
  }
  .reset-password-modal .valider button{
    border: none;
    color: rgb(15, 128, 15);
    background-color: #fff;
  }

  /**css change password modal */
  .set-new-password .content{
    margin: 10% auto 0 auto;
    transform: translate(0, -50%);
    width: 500px;
    background-color: #fff;
    border-radius: 10px;
    background-image: url('~@/assets/images/logo_sigif_dialog.png');
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
  }

  /*css reservé aux transitons*/
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
