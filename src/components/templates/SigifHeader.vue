<template>
    <div>
        <AutoLogOut />
        <header class="d-flex pt-2 px-0 m-0 header-background header-height" >
            <b-col class="m-0 p-0 align-center" cols="1"><b-img src="@/assets/img/logo_sigif_grand_format-removebg-preview.png" fluid style="width: 3em;"></b-img></b-col>
            <b-col class="m-0 p-0 align-center" cols=10><p class="text-uppercase header-text">{{ $t('data.sigif_titre') }}</p></b-col>
            <b-col class="m-0 p-0 align-center" cols="1"><b-img src="@/assets/img/minfof.png" fluid style="width: 3em;"></b-img></b-col>
        </header>

        <b-navbar class="navbar-content py-0 m-0" toggleable="sm" type="light" variant="dark">

            <b-navbar-brand title="page de profil" v-if="user!=null&&user.profil!=null"  class="toUnderline old-system-props">
              <a @click.prevent="gotoprofil"><b-img class="navbar-icon-user" src="@/assets/images/picto_user_blanc.png"></b-img>  </a>  
              <a  @click.prevent="showChangePasswordForm" class="text-white" style="white-space: nowrap; padding-left: 8px;"><span class="text-uppercase">{{ user.nom }} </span><span class="text-capitalize">{{ user.prenom}} <span style="font-size: 10px!mportant">|</span> </span>
                {{ $t('data.role') }} :<span class="text-uppercase">{{ user.profil.intitule }}, {{ user ? user.profil.organisation : null }}</span>
              </a>
            </b-navbar-brand>
            <div class="icons">
                 <b-navbar-nav class="modules-nav-right-home"><b-nav-text><a @click.prevent="goToHome"  v-b-tooltip.hover :title="$t('data.accueil')" to="modules" class="text-white"><b-img src="@/assets/images/iconHOME_128x128.png"></b-img></a></b-nav-text></b-navbar-nav>
                 <b-navbar-nav class="modules-nav-right-disconnect"><b-nav-text> <a @click.prevent="logout" href="" v-b-tooltip.hover :title="$t('data.se_deconnecter')" class="text-white"><b-img src="@/assets/images/iconDECONNEXION_128x128.png" style="width: 1em; color:white"></b-img> </a></b-nav-text></b-navbar-nav>
                 <b-navbar-nav class="modules-nav-right-langue-en">
                 <b-nav-text>
                    <a v-b-tooltip.hover :title="$t('data.changer_langue')">
                      <toggle-button v-model="langue" :height=25  :labels="{checked: 'EN', unchecked: 'FR'}" @change="onSetLocale()"/>
                    </a>
                </b-nav-text>
                </b-navbar-nav>
            </div>
        </b-navbar>
        <change-password-box ref="changepasswordbox"></change-password-box>
    </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

import ChangePasswordBox from '@/components/utils/auth/ChangePasswordBox.vue';
import UnreachableBox from '@/components/utils/auth/UnreachableBox.vue';
import AutoLogOut from '../../views/auth/AutoLogOut.vue';
import AuthBox from '@/components/utils/auth/ConfirmBoxDetail.vue';
export default {
    name: "SigifHeader",
    components:{
      AutoLogOut,UnreachableBox,AuthBox,
      ChangePasswordBox,
    },
    data(){
        return {
          langue: '',
        }
    },
    computed: { 
      ...mapGetters(['user']),
      ...mapState('locale', ['locale']),
    },
    methods:{
     //gestion du cas api inaccéssible
    async unreachableapi() {
      let message='Impossible de joindre le serveur';
            const ok = await this.$refs.unreachableapiDialogue.show({
               commande:'',
               title: 'ERREUR',
               message:message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              console.log('reachable')
            } else {
              console.log(storage)
              // storage.clear()
              // this.$store.dispatch('LogOut')
              this.$refs.authDialogue._close();
            }
    },
      //chamgement du mot de passe
      async showChangePasswordForm(){
        const ok = await this.$refs.changepasswordbox.show({
               title: 'Changement de mot de passe',           
               okButton: 'valider',
               cancelButton: "Non",
            })
      },
      //redirection vers la page de profil
      gotoprofil(){
        this.$router.push({name: 'mon-profil'})
      },
      async showResetPasswordForm(){
        const ok = await this.$refs.resetpasswordbox.show({
               title: 'Changement de mot de passe',           
               okButton: 'Enregistrer',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.createdDialogue._close();
            } else {
               this.$refs.createdDialogue._close();
            }
      },
      logout(){
          let token=storage.get('access_token')
          App.confirm(`ètes-vous sur de vouloir vous déconnecter ?`, { confirm: () => {

            this.$auth.get('login/deconnexion',{ headers: {'Authorization': `Bearer ${token}`}}).then((response) => {
              storage.clear()
              this.$store.dispatch('LogOut')
              this.$router.push({name: 'login'})
              console.log('response ',response.data.message);
              return App.notifySuccess(response.data.message)

            })
            .catch((error) => {
              if(error.code=='ERR_NETWORK'){
                this.submitted=false;
                return this.unreachableapi(); 
              }
              if(error.response.data.message =='Token invalide'){
                storage.clear()
              }
              return App.alertError(error.response.data.message || 'Impossible d\'acceder au seveur')
            });
          }})
      },
      ...mapMutations('locale', ['setLocale']),
      onSetLocale(){
        this.langue=!this.langue
        if(this.langue){
          console.log('locale 2',this.langue);
          let locale="fr"
          this.$i18n.locale = locale
         // this.setLocale(locale)
        }else{
          console.log('locale 1',this.langue);
          let locale="en"
          this.$i18n.locale = locale

        }
        
      },
      goToHome(){this.$router.push({name: 'modules'})}
    },
    mounted() {
      if(this.user.langue =='fr'){
        this.langue=true
      }
      else  if(this.user.langue =='en'){
        this.langue=false
      }else{
        this.langue=true
        console.log('entrée autre');
      }
    }
}
</script>

<style scoped>
.old-system-props{
  font-family: 'Verdana';
  font-weight: normal;
  font-size: 13px;
  white-space: nowrap;
}
.toUnderline :hover{
  text-decoration: underline;
}
.header-height{
  height: 65px;
  overflow: hidden;
}
.align-center{
    display: flex;
    justify-content: center;
    align-items: center;
}

header{
    background-image: url('~@/assets/images/image.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}

.header-text{
    color: #00522C;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 2em;
    font-weight: bold;
    text-align: center;
}
.navbar-user{
    word-wrap: none;
}
.navbar-content{
  padding-left: 3.5%;
  padding-right: 2.3%;
  background-color: rgb(0, 82, 44)!important;
  color: white!important;
  height: 40px;
}
.icons{
  display: flex;
  justify-content: flex-end;
  width: 92%;
}


.modules-nav-right-home, .modules-nav-right-disconnect, .modules-nav-right-langue-fr, .modules-nav-right-langue-en{
  padding: 0 10px;
}

@media screen and (max-width: 1610px) {
  .header-text{
    font-size: 1.6em !important;
  }

}

@media screen and (max-width: 1280px) {
  .header-text{
    font-size: 1.4em !important;
  }

}
@media screen and (max-width: 1125px) {
  .header-text{
    font-size: 1.2em !important;
  }

}


@media screen and (max-width: 870px) {
  .header-text{
    font-size: 1.2em !important;
  }

}

@media screen and (max-width: 600px) {
  .header-text{
    font-size: .8em !important;
  }
  
}
@media screen and (max-width: 770px) {
  .navbar-user{
    display: none;
  }
}

@media screen and (max-width: 576px) {
  .icons{
    width: 90%;
    /* margin-top: -40px; */
  }
  .navbar-icon-user{
    margin-top: -12px;
  }
}

</style>