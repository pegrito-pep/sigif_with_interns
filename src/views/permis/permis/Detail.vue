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
            >Consultation Demande de permis n°:{{ permisdetails.idpermis }}</span>
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
     <b-card>
      <b-row>

        <b-col cols="4">
            <div>Entité:<label class="style" for="input-small">{{ permisdetails.entite }}</label></div>
            <div> Exercice fiscal:<label class="style" for="input-small">{{ permisdetails.exercice }}</label></div>

        </b-col>

         <b-col cols="4">
           <div>Type de titre: <label class="style" for="input-small">{{ permisdetails.typetitre }}</label></div>
            <div>Vente de coupe No:<label class="style" for="input-small">{{ permisdetails.numtitre }}</label></div>
         </b-col>
          <b-col cols="4">
            <div>Type de permis:<label class="style" for="input-small">{{ permisdetails.libeletypepermis }}</label></div>
              <div>Traitement sylvicole:<label  class="style" for="input-small">{{ permisdetails.traitementsylvicole }}</label>
              </div>
          </b-col>
      </b-row>
    </b-card>



    <div class="container">
      <b-row>
        <b-col>
          <b-button
          :class="visible ? null : 'collapsed'"
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="collapse-4"
          @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
          <ul class="p-0 m-0"> 
            <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Pièces jointes</li>
          </ul>  
          </b-button>
            <div v-if="visible">
              <ul class="ml-2">
                <li class="detail-permis-item"><a href="">Attestation de mesure de superficie</a></li>
                <li class="detail-permis-item"><a href="">Carte des inventaires</a></li>
                <li class="detail-permis-item"><a href="">Attestation de respect des obligations fiscales</a></li>
              </ul>
            </div> 
        </b-col>
        <b-col>
          <b-button
          :class="visible ? null : 'collapsed'"
          :aria-expanded="visible ? 'true' : 'false'"
          aria-controls="collapse-4"
        @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
        <ul class="p-0 m-0">
          <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Document émis par le système</li>
        </ul>  
      </b-button>
      <div v-if="visible">
        <ul class="ml-2">
          <li class="detail-permis-item"><a href="">Certificat de matérialisation des limites</a></li>
          <li class="detail-permis-item"><a href="">Certificat de conformité des inventaires</a></li>
        </ul>
      </div>   
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
name: "details_demande_de_permis",
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
  permisdetails:{},

  options:["valide"],





  selected:{},


}),
computed:{

},

methods: {
fermer(){
  this.$router.back();
},

async getDetailsPermis() {
  this.showOverlay = true
  this.demandedetail = await this.$permis.get('permis/' +this.$route.params.id).then(response => response.data.result)

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
   this.getDetailsPermis();
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
.detail-permis-item{
list-style-type:none;

}
.detail-permis-item a{
color: #175131!important;
}

.detail-permis-item a:hover{
text-decoration: underline;
}
</style>