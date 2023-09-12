<template>
  <div id="cover">
      <!-- EXPORTATIONS -->
      <b-row>
          <b-col style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible13 ? 'true' : 'false'"
                              aria-controls="collapse13"
                          @click="visible13=!visible13" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible13, 'collapse-close': !visible13 }">Exportations
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse13" v-model="visible13" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex; flex-wrap: wrap;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des exportations</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes d'autorisation FLEGT</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des autorisations FLEGT</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes de BSE</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingBSE" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des BSE</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des permis CITES</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des certificats en qualité d'exportateur</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des Quotas de bois à l'exportation</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row>
      <ExportationsDialog ref="listingEntreeParc">
           
      </ExportationsDialog>
      
  </div>
</template>
<script>
  // import RejectionModal from '../../components/utils/RejectionModal.vue'
  import ExportationsDialog from '@/components/utils/rapport/exportations/MultiUsageDialog.vue'
  export default{
      data(){
          return{
              visible13:false
          }
      },
      components:{ExportationsDialog},
      methods:{
          showListingBSE(){
              this.$refs.listingEntreeParc.show({
                title:'Listing des BSE',
                showDate:false
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