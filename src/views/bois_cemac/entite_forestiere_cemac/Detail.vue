<template>
    <div id="cover" class="min-vh-100">
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
              >Consultation Entité forestière: BOIS DU CONGO</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
              </a>
            </span>
          </b-col>
        </b-row >
      </div>
          <b-card class="b-card">
            <b-row class="py-5">
              <b-col cols="3">

               <P> Code d'enregistrement: <strong>CEO259</strong></P><br>
               <p> Nom Entité: <strong>BOIS DU CONGO</strong></p><br>
                <p>Marteau/Sigle: <strong>BDC</strong><br></p>

              </b-col>
                <b-col cols="3">
                  <P> Email: <strong>12/03/2022</strong> </P><br>
                   <p> Telephone: <strong>12/03/2022</strong></p><br>
                    <p> Adresse: <strong>365</strong></p><br>

              </b-col>
                <b-col cols="3">
                  <p> Nom du responsable: <strong>FOE</strong> </p><br>
                   <p>Pays: <strong>REPUBLIQUE DU CONGO</strong></p><br>
                     <p> Heure: <strong>08:38:30</strong> </p><br>

              </b-col>
                <b-col cols="3">

                    <a  href="#" style="color:#82C138"><i class="fa fa-download" aria-hidden="true"></i>Télécharger</a>

              </b-col>

            </b-row>


          </b-card>

          </div>
          <!--entete des tableaux -->
          
       
                <!--implémentation tableau proprement dite-->
        
  
      </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;


export default {
  name: "details_regularisation",
  components:{

  },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isBusyBillons:false,
    isRowselected:false,
    setSelected:0,
    
    regularisation:{},
     itemsProduits:[],
    fieldsProduits: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "validite", label: "", thStyle: { width: "20%" } },{ key: "codebarre", label: "Code à barres" },
        { key: "reference", label: "Reférence code barre" }, { key: "lignedf10", label: "Ligne DF 10" }, 
        { key: "nomcommercial", label: "Nom commercial" }
    ],

  }),
  computed:{
     items() { 
      return this.itemsProduits.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },

  },
 
 methods: {
      fermer() {
      this.$router.back() 
      },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'custo-bg_detail_-table_element'
      if (item.isOdd) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },

   onRowSelected(items) {
    items.isSelected =true;
        this.selected = items
  },
  async getDetailsEntiteForestiereCemac() {
    this.showOverlay = true
    this.regularisation = await this.$operationParc.get('entite_forestiere_cemac/' +this.$route.params.id).then(response => response.data.result)

    if(this.regularisation.dateoper!=null&&this.regularisation.dateoper!=''){
      this.regularisation.dateoper=this.regularisation.dateoper.split('T')[0].replace(/-/g, "/")
    }
    if(this.regularisation.datecertificatstock!=null&&this.regularisation.datecertificatstock!=''){
      this.regularisation.datecertificatstock=this.regularisation.datecertificatstock.split('T')[0].replace(/-/g, "/")
    }
    if(this.regularisation.heureoper!=null&&this.regularisation.heureoper!=''){
      this.regularisation.heureoper=this.regularisation.heureoper.split('T')[1]
       this.regularisation.heureoper=this.regularisation.heureoper.split('.')[0]
    }
    this.itemsProduits=this.regularisation.produits
    this.showOverlay = false
  },
 

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
    this.getdetailsEntiteForestiereCemac();
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

  .detail-billonnage-bg{
    background-color: green;
  } 
  .table-row-other{
  background-color: #caf09e;
}  
</style>