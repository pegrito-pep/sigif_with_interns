<template>
 
  <div class="reset-password">
    <div class="reset-password-modal">
      <div class="content">
        <div class="header">
          <h5 class="title">Mot de passe oublié ?</h5>
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="body">
          <form @submit.prevent="valider">
            <div class="input">
              <label for="login">Login<span class="input-star">*</span></label>
              <input class="form-control login" type="text" v-model="login" required>
            </div>
            <div class="input">
              <label for="email">Email<span class="input-star">*</span></label>
              <input class="form-control login" type="text" v-model="email" required>
            </div>
            <div class="valider">
              <div class="">
                <svg style="margin: -5 -5px 0 0;" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="green" class="bi bi-check" viewBox="0 0 16 16">
                  <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                </svg>
                <button type="submit">Valider</button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorBox from "../components/ErrorBox.vue"
export default {
  name: 'ResetPassword',
  components: {
    ErrorBox,
  },

  data(){
    return {
      login: "",
      email: "",
    }
  },
  methods: {
    valider() {
      console.log("==================================");
      console.log({login: this.login, email: this.email});
      console.log("==================================");
    }
  }
}
</script>

<style scoped>
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
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
  }

  .header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 4px 10px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-image: url(/img/images/image.png);
    height: 40;
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
    margin: 12px 10px 0 0;
  }

  .reset-password-modal .body{
    padding: 30px 16px 16px 16px;
    background-image: url(/img/images/logo_sigif_dialog.png);
    background-size: contain;
    background-position: top center;
    background-repeat: no-repeat;
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
</style>
