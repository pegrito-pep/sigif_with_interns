<template>
  <div id="cover">
      <b-row>
          <b-col style="margin-top:-15px">
            <b-button
                            :aria-expanded="visible8 ? 'true' : 'false'"
                            aria-controls="collapse8"
                        @click="visible8=!visible8" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                        <ul style="margin:0">
                            <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                :class="{ 'collapse-open': visible8, 'collapse-close': !visible8 }">Titres forrestiers
                            </li>
                        </ul>
            </b-button>
            <b-collapse id="collapse8" v-model="visible8" class="p-0 m-0">
                <ul style="margin-left:1px;display: flex;flex-wrap: wrap;">
                    <li class="mr-2">
                        <b-link @click.prevent="printTitresOperationnels" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des titres opérationnels</b-link>
                    </li>
                    <li class="mr-2">
                        <b-link @click.prevent="printTitresValides" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des titres valides</b-link>
                    </li>
                </ul>
            </b-collapse>
          </b-col>
      </b-row>

      <TitreDialog ref="titredialog"></TitreDialog>
  </div>
</template>
<script>

  import TitreDialog from '@/components/utils/rapport/Titres_forrestiers/MultiUsageDialog.vue'
  export default{
      name:"raport_titres_forrestiers",
      data(){
          return{
              visible8:false,
              commande:''
          }
      },
      components:{
          TitreDialog
      },
      methods:{
          printTitresOperationnels(){
            this.$refs.titredialog.show({
                  title:'Listing des titres opérationnels',
                  commande:1
            })
          },
          printTitresValides(){
            this.$refs.titredialog.show({
                  title:'Listing des titres valides',
                  commande:2
            })
          }
         
      }
  }
</script>
<style scoped>
  #cover{
      background-image: url('@/assets/images/logo_sigif_trame.png');
      background-size: 40vw 80vh;
      background-position: center;
      background-repeat: no-repeat;
      height: 100vh;
  }
  ul,li{
      list-style-type: none;
  }
  .collapse-open{
      list-style-type: disclosure-open;
  }
  .collapse-close{
      list-style-type: disclosure-closed;
  }
  
  .default-old-system-select-properties{
      border-style: solid;
      /* border-width: 1px; */
      font-weight: normal;
      color: #333333;
      border-radius: 3px;
      background-color: White;
      border: 1px solid #637A95;
      margin: 1px;
      font-family: 'verdana';
      font-size: 13px;
      border-color: #637A95;
  }
  .custom-select-type_titre{
      --vs-dropdown-option--active-bg: #82C138;
      --vs-dropdown-option--active-color: #fff;
          --vs-selected-color: #1f1c1c;
              /* Font */
          --vs-font-size: 0.65rem;
          --vs-line-height: 1.2;
  }
</style>