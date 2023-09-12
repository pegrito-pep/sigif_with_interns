<template>
  <div class="reset-password">
    <div class="reset-password-modal">
      <div class="content">
        <div class="header">
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="title">Confirmation</h5>
        </div>
        <div class="body">
          <p>Vous avez ouvert une session à partir d'un autre terminal. voulez-vous la fermer ?</p>
        </div>
        <div class="d-flex button-block">
          <div class="button-ok">
            <button>
              <span><svg style="margin: 0px -5px 0 0;" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="green" class="bi bi-check" viewBox="0 0 16 16">
              <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
            </svg>
            </span>
              <span style="margin-left: 5px;">OUI</span>
            </button>
          </div>
          <div class="button-non">
            <button style="display: flex;">
              <div><span class="btn-close">&times;</span></div>
              <span style="margin-top: 10px;">NON</span>
            </button>
            
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationBox',
  components: {},
  props: {
    message: String,
  },
    
  data(){
    return {
      message: this.message
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .close span{
    background-color: transparent;
  }

  .button-block{
    flex-direction: row-reverse;
  }
  .button-non{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-close{
    font-size:  30px;
    font-weight: bold;
    color: red;
    margin-right: 5px;
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
  }

  .header{
    display: flex;
    width: 100%;
    padding: 0 10px;
    background-image: url('~@/assets/images/image.png');
    height: 40;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px 10px;
  }
  .header h5{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 3px 0 0 8px;
    font-weight: 900;
  }

  .header button{
    height: 30px;
    width: 30px;
    display: flex;
    justify-content:center;
    align-items: center;
    background-color: #ff1100;
    border-radius: 50%;
    color: white;
  }

  .content .body{
    height: 160px;
    background-image: url('~@/assets/images/logo_sigif_dialog.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    padding: 0 16px;
  }

  .content .body p{
    font-size: 18px;
    margin-top: 20px;
    text-align: center;
    line-height: 1.5;
    padding: 0 20px;
  }
   .content .button-ok button, .content .button-non button{
     border: none;
     background-color: #fff;
   }
   .content .button-ok button:hover, .content .button-non button:hover{
     font-style: italic;
     font-weight: 600;
   }
  .content .button-ok, .content .button-non{
    display: flex;
    flex-direction: row-reverse;
    padding: 0 16px 16px 0;
  }

</style>
