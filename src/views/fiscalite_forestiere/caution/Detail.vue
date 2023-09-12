<template>
    <div id="cover" class="min-vh-100" >
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
              <b-row>
                <b-col>
                  <h4 class="tab-header-left-text">
                    <button id="toggleSideBar" @click="toggleSideBar">
                      <span aria-hidden="true" style="font-size: 30px">&times;</span>
                    </button>
                    <span
                      class="ml-1 font-weight-bold"
                    >Consultation de la caution N° : {{ detailcaution.numcaution }}
                    <b-badge v-if="detailcaution.statut=='Approuvé'" href="#" variant="success">{{ detailcaution.statut }}</b-badge>
                    <b-badge v-else href="#">{{ detailcaution.statut }}</b-badge>
                  </span>
                  </h4>
                </b-col>
                <b-col class="col-md-auto">
                  <span>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor:pointer">
                      <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                    </a>
                  </span>
                </b-col>
              </b-row>
            </div>
            <div>
                <div style="border-bottom: 2px solid green">
                  <b-row align-h="center">
                    <b-col cols="6">
                      <b-row>
                        <b-col cols="3"><h5>Opérateur</h5></b-col>
                        <b-col cols="9"><h5 class="font-weight-bold">{{ detailcaution.operateur }}</h5></b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="3"><h5>Type de titre : </h5></b-col>
                        <b-col cols="9"><h5 class="font-weight-bold">{{ detailcaution.typetitre }} <b-badge  href="#">{{ detailcaution.typetitre }}</b-badge></h5></b-col>
                      </b-row>
                    </b-col>
                    <b-col cols="4">
                      <b-row>
                        <b-col cols="3"><h5>N° du titre</h5></b-col>
                        <b-col cols="9"><h5 class="font-weight-bold">{{ detailcaution.numtitre }}</h5></b-col>
                      </b-row>
                      <b-row>
                        <b-col cols="3"><h5>Exercice : </h5></b-col>
                        <b-col cols="9"><h5 class="font-weight-bold">{{ detailcaution.exercice }}</h5></b-col>
                      </b-row>
                    </b-col>
                  </b-row>
                </div>


                <b-row align-h="center" class="w-100 m-2">
                  <b-col cols="4">
                    <b-row>
                      <b-col cols="5"><h5>Emetteur </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.emmeteur }} </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Numcaution </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.numcaution }} </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Montant </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.montant }}  </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Date Signature </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.datesignature }} </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Date validité </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.datevalidite }} </h5></b-col>
                    </b-row>
                    
                  </b-col>
                  <b-col cols="5">
                    <b-row>
                      <b-col cols="5"><h5>Nom signataire 1 </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.nomsignataire1 }} </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Nom Signataire 2 </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.nomsignataire2 }} </h5></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>document de la caution: </h5></b-col>
                      <b-col cols="5">
                        <a v-if="detailcaution.documentcaution!==null&&detailcaution.documentcaution!==''" :href="detailcaution.documentcaution" target="_blank" v-b-tooltip.hover title="consulter">
                          <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                        </a>
                        <h5 v-else>Non Défini</h5>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><h5>Date de renvoi: </h5></b-col>
                      <b-col cols="5"><h5 class="font-weight-bold">{{ detailcaution.iudcaution }} </h5></b-col>
                    </b-row>
                  </b-col>
                
                </b-row>
            </div>

          </div>
          
       
          
      </b-overlay>
    </div>
    

</template>

<script>
  const php  = require ( 'phpjs' ) ;


export default {
  name: "details_caution",
  components:{

  },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
     visible: true,
    isRowselected:false,
    detailcaution:{},
  }),
  computed:{

  },
 
 methods: {


  async getDetailsCaution() {
    this.showOverlay = true
    this.detailcaution = await this.$fiscalite.get('cautions/' +this.$route.params.id).then(response => response.data.result.Data)
    console.log('date',this.detailcaution);
    if(this.detailcaution.datesignature!=''&&this.detailcaution.datesignature!=null){
      this.detailcaution.datesignature= this.$dayjs(this.detailcaution.datesignature).format('DD/MM/YYYY');
    }
    if(this.detailcaution.datevalidite!=''&&this.detailcaution.datevalidite!=null){
      this.detailcaution.datevalidite= this.$dayjs(this.detailcaution.datevalidite).format('DD/MM/YYYY');
    }
    if(this.detailcaution.montant!=''&&this.detailcaution.montant!=null){
      this.detailcaution.montant= this.commify(this.detailcaution.montant);
    }
    this.detailcaution.documentcaution=''

    this.showOverlay = false
  },
  commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? " " + decimalPart : "");
  },
  fermer() {this.$router.back();},

  toggleSideBar() {
      var sidebar = document.querySelector("#sidebar");
      var administration = document.querySelector("#administration");
      var administrationItem = document.querySelectorAll(".administrationItem");
      var actionButton = document.querySelector("#toggleSideBar");

      if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.transition = "all 0.5s ease";
        administration.style.backgroundColor = "white";
        administration.style.transition = "background-color 0.2s ease";
        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "0";
          element.style.transition = "opacity 0.2s ease";
        }
        actionButton.innerHTML =
          '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
      } else {
        sidebar.style.width = "250px";
        sidebar.style.transition = "all 0.3s ease";
        administration.style.backgroundColor = "#82C138";
        administration.style.transition = "background-color 0.8s ease";

        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "100%";
          element.style.transition = "opacity 1s ease";
        }

        actionButton.innerHTML =
          '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
  }

 },
 
  beforeMount() {
     this.getDetailsCaution();
  }
  }

</script>
<style scoped>



#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}






/*edti style par defaut btn-bootstrap au disable*/

</style>
<style>
.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}
</style>