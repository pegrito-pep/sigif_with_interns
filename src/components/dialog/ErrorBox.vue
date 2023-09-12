<template>
  <div class="reset-password">
    <div class="reset-password-modal">
      <div class="content">
        <div class="header">
          <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 class="title">Error</h5>
        </div>
        <div class="body">
          <p>{{message}}</p>
        </div>
        <div class="button-ok">
          <button>
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorBox',
  components: {},
  props: ['message'],
    
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
    line-height: 2;
    padding: 0 20px;
  }
   .content .button-ok button{
     border: none;
     background-color: #fff;
   }
   .content .button-ok button:hover{
     font-style: italic;
     font-weight: 600;
   }
  .content .button-ok{
    display: flex;
    flex-direction: row-reverse;
    padding: 0 16px 16px 0;
  }

</style>
