<template>
  <b-overlay rounded="sm" :show="showOverlay">
    <div>
        <div class="row m-2">     
          <div class="col-lg-6 col-6">
            <!-- small box -->
            <div class="small-box" style="background-color: #65A41C; color:white">
              <div><h3 class="text-center" style="font-size: 4rem">Quotas LV</h3></div>
              <div><h3 class="text-center" style="font-size: 8.8rem">{{ quotalv }}</h3></div>
            </div>
          </div>
          <!-- ./col -->
          <div class="col-lg-6 col-6">
            <!-- small box -->
            <div class="small-box" style="background-color: #65A41C; color:white">
              <div>
                <h4 class="text-center" style="font-size: 4rem">Lettres de voitures</h4>
              </div>
              <b-table-simple class="m-0 p-0" hover small responsive >
                <b-tbody >
                    <b-tr style="font-size: 3rem">
                        <b-th class="border m-0 text-center p-0">Soumises</b-th>
                        <b-th class="border m-0 text-center p-0">Brouillons</b-th>            
                    </b-tr>
                    <!--<b-tr><td colspan="5">&nbsp;</td></b-tr>-->
                    <b-tr style="font-size: 4rem">
                        <b-td class="border py-0">
                            <span class="d-inline-block w-100 font-weight-bold text-center bg-success">{{ brouillons }}</span>    
                        </b-td>
                        <b-td class="border py-0 px-2  bg-danger">
                            <span class="d-inline-block w-100 font-weight-bold text-center">{{ soumis }}</span>
                        </b-td>
                    </b-tr>
                </b-tbody>
              </b-table-simple>
            </div>
          </div>
           <!-- ./col -->
        </div>
        <b-row class="m-2">
            <div class="col-xl-4 col-md-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="text-center" style="font-size:2rem; color: #65A41C">Entrées Parc</h4>
                </div>
                <img style="width: 100%; max-height: 240px ;" src="@/assets/images/Picto_tracabilite/iconOPEPARC_128x128.png" alt="Card image cap">
                <h3 class="text-center" style="color : white; font-size: 6rem;background-color: #65A41C;"> {{ totalEntrees }}</h3>
                <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted d-flex justify-content-between">
                  <!--<span style="font-size:2rem; color: #65A41C; width: 75%">18 depuis 07 jours</span>-->
                  <span class="d-flex justify-content-end">
                    <a href="#" class="w-30 mt-2" v-b-tooltip.hover title="consulter">
                      <i class="fa fa-eye fa-2x" style="color: green; width: 25%"></i>
                    </a>
                  </span>
                </div>
              </div>
		        </div>

          <div class="col-xl-4 col-md-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="text-center" style="font-size:2rem; color: #65A41C">Billonnages</h4>
                </div>
                <img style="width: 100%; max-height: 240px ;" src="@/assets/images/Picto_tracabilite/Parc/Parc_64x64.png" alt="Card image cap">
                <h3 class="text-center" style="color : white; font-size: 6rem;background-color: #65A41C;"> {{ totalBillonnages }}</h3>
                <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted d-flex justify-content-between">
                  <!--<span style="font-size:2rem; color: #65A41C; width: 75%">27 depuis 07 jours</span>-->
                  <span class="d-flex justify-content-end">
                    <a href="#" class="w-30 mt-2" v-b-tooltip.hover title="consulter">
                      <i class="fa fa-eye fa-2x" style="color: green; width: 25%"></i>
                    </a>
                  </span>
                </div>
              </div>
		        </div>
          <div class="col-xl-4 col-md-6">
              <div class="card">
                <div class="card-body">
                  <h4 class="text-center" style="font-size:2rem; color: #65A41C">Regularisations</h4>
                </div>
                <img style="width: 100%; max-height: 240px ;" src="@/assets/images/Picto_tracabilite/Parcs_Rupture_64x64.png" alt="Card image cap">
                <h3 class="text-center" style="color : white; font-size: 6rem;background-color: #65A41C;">{{ totalReglarisations }}</h3>
                <div class="card-footer border-top-blue-grey border-top-lighten-5 text-muted d-flex justify-content-between">
                  <!--<span style="font-size:2rem; color: #65A41C; width: 75%">0 depuis 07 jours</span>-->
                  <span class="d-flex justify-content-end">
                    <a href="#" class="w-30 mt-2">
                      <i class="fa fa-eye fa-2x" style="color: green; width: 25%"></i>
                    </a>
                  </span>
                </div>
              </div>
		        </div>
        </b-row>
    </div>
  </b-overlay>
    
</template>

<script>


export default {
  name: "admin_dashboard",
  components: {

  },
  data: () => ({
    showOverlay:false,
    brouillons:'',
    soumis:'',
    quotalv:'',
    totalEntrees:'',
    totalBillonnages:'',
    totalReglarisations:''
  }),
  computed:{

  },
 
 methods: {
    getRequestParams(page, pageSize){
        let params= {
          page: 0,
          size: pageSize || 10
        };
        if(page && page > 0) {
          params.page= page -1
        }
        return params;
    },
    async getLettresVoitures(){
      this.showOverlay=true;
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        this.$operationParc.get("lettres-voiture", {params}).then(response => {

          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.quotalv = response.data.result.quotalv
          this.brouillons= response.data.result.brouillons
          this.soumis = response.data.result.soumis
           this.getEntreeParcs();
        })
        .catch((error) => {
          console.log(error)
        });

    },
    getEntreeParcs(){
      const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
      this.$operationParc.get("entrees-parc", {params}).then(response => {
        this.totalEntrees = response.data.result.totalItems
        this.getBillonnages();
      })
    },
    getBillonnages(){
      const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
      this.$operationParc.get("billonages", {params}).then(response => {
        this.totalBillonnages = response.data.result.totalItems
        this.getRegularisations();
      })
    },
    getRegularisations(){
      const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
      this.$operationParc.get("regulations", {params}).then(response => {
        this.totalReglarisations = response.data.result.totalItems
        this.showOverlay = false;
      })
    }
  },
  

    mounted(){
      this.getLettresVoitures()
    }
  }

</script>
<style scoped>
.set-number-size{
  font-size: 4rem
}
.set-text-size{
  font-size: 2rem
}
.small-box-footer-size{
  font-size: 1rem
}
</style>