<template>
  <div id="cover">
    <b-row>
            <b-col cols="6" style="margin-top:-15px">
                    <b-button
                            :class="visible4 ? null : 'collapsed'"
                                :aria-expanded="visible4 ? 'true' : 'false'"
                                aria-controls="collapse4"
                            @click="visible4=!visible4" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                            <ul style="margin:0">
                                <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                    :class="{ 'collapse-open': visible4, 'collapse-close': !visible4 }">Inventaires
                                </li>
                            </ul>
                        </b-button>
                        <b-collapse id="collapse4" v-model="visible4" class="p-0 m-0">
                            <ul style="margin-left:1px;display: flex;">
                                <li class="mr-2">
                                    <b-link @click.prevent="showListingInventaires" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des inventaires</b-link>
                                </li>
                                <li class="mr-2">
                                    <b-link @click.prevent="showListingEssences" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des essences inventoriées</b-link>
                                </li>
                                <li class="mr-2">
                                    <b-link @click.prevent="showListingDetailEssence" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing d'une essence inventoriée</b-link>
                                </li>
                            </ul>
                        </b-collapse>
            </b-col>
        </b-row>

      
      <EntreeParcDialog ref="listingEntreeParc">
         
      </EntreeParcDialog>
      <InventaireDialog ref="inventairedialog"></InventaireDialog>
      
  </div>
</template>
<script>
  // import RejectionModal from '../../components/utils/RejectionModal.vue'
  import EntreeParcDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
  import InventaireDialog from '@/components/utils/rapport/Inventaires/InventaireDialog.vue'
  export default{
      data(){
          return{
              visible:false,
              visible4:false,
          }
      },
      components:{
          EntreeParcDialog,
          InventaireDialog
      },
      methods:{
        showListingDetailEssence(){
            this.$refs.inventairedialog.show({
                  title:'Listing d\'une essence inventoriée',
                  commande:2,
              })
        },
          showListingInventaires(){
              this.$refs.listingEntreeParc.show({
                  title:'Listing des inventaires',
                  commande:7,
                  showDate:false
              })
          },
          showListingEssences(){
              this.$refs.inventairedialog.show({
                  title:'Listing des essences inventoriées',
                  commande:1,
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