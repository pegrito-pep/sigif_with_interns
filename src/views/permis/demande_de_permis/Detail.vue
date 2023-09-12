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
              <span v-if="fromEmition" class="ml-1 font-weight-bold">Emition du permis pour la demande :{{ demandedetail.idpermis }}</span>
              <span v-if="fromSubmitOperateur" class="ml-1 font-weight-bold">Soumission de la demande de permis :{{ demandedetail.idpermis }}</span>
              <span v-if="fromVerification" class="ml-1 font-weight-bold">Vérification de la demande de permis :{{ demandedetail.idpermis }}</span>
              <span v-if="fromVerificationminfof" class="ml-1 font-weight-bold">Vérification de la demande de permis :{{ demandedetail.idpermis }}</span>
              <span v-if="fromRecommandation" class="ml-1 font-weight-bold">Recommandation de la demande de permis :{{ demandedetail.idpermis }}</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <!--OPTIONS MINFOF-->
              <span v-if="isMinfof">
                <!--<a v-if="fromRecommandation&&demandedetail!=null&&demandedetail.statut=='3'" @click.prevent="recommandToMinfof" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                  <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Recommander
                </a>-->
                <!--EMISSION DU PERMIS PAR LE MINFOF-->
                <span v-if="fromRecommandation&&demandedetail!=null&&demandedetail.statut=='5'">
                  <a  @click.prevent="validerAuMinfof" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Valider
                  </a>
                  <a @click.prevent="rejeterDemandeDelegationDep" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconREJETER_16x16.png"></b-img>Rejeter
                  </a>
                </span>
                <!--APPROBATION DU PERMIS-->
                <a v-if="fromApprobation&&isMinfof&&demandedetail.statut==6" @click.prevent="approuverPermis" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                  <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver
                </a>
                <!--EMITION DU PERMIS PAR LE MINFOF-->
                <a v-if="fromEmition&&isMinfof&&demandedetail.statut==5" @click.prevent="emettrePermis" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                  <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Emettre
                </a>
                <!--RECOMMANDATION AU DELEGUE REGIONAL-->
                <span v-if="fromVerificationminfof&&demandedetail!=null&&demandedetail.statut=='3'">
                  <a  @click.prevent="recommandToMinfof" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Valider
                  </a>
                  <a @click.prevent="rejeterDemandeDelegationDep" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconREJETER_16x16.png"></b-img>Rejeter
                  </a>
                </span>
                <!--SOUMISSION AU DELEGUE DEPARTEMENTAL-->
                <span v-if="fromVerificationminfof&&demandedetail!=null&&demandedetail.statut=='2'">
                  <a  @click.prevent="validerDemandeDelegationDep" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Valider
                  </a>
                  <a @click.prevent="rejeterDemandeDelegationDep" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                    <b-img src="@/assets/images/iconREJETER_16x16.png"></b-img>Rejeter
                  </a>
                </span>
              </span>
              <!--RECOMMANDATION DELEGUE DEPARTEMENTAL-->
              <a v-if="isMinfof&&demandedetail.statut==3" @click.prevent="recommendToRegional" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Recommander
              </a>
              <!--SOUMISSION OPERATEUR-->
              <a v-if="fromSubmitOperateur" @click.prevent="submitFromOperator" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Soumettre
              </a>
              <!--VERIFICATION PAR L'OPERATEUR-->
              <span v-if="fromVerification">
                <a  @click.prevent="verifFromOperator" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                  <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Valider
                </a>
                <a @click.prevent="rejeterPermis" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                  <b-img src="@/assets/images/iconREJETER_16x16.png"></b-img>Rejeter
                </a>
              </span>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:rgb(0, 82, 44);; cursor:pointer">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
              </a>
            </span>
          </b-col>
        </b-row>
      </div>
       <b-card>
        <b-row>

          <b-col cols="4">
              <div>Entité:<label class="style" for="input-small">{{ demandedetail.entite }}</label></div>
              <div> Exercice fiscal:<label class="style" for="input-small">{{ demandedetail.exercice }}</label></div>
              <div v-if="demandedetail!=null&&demandedetail.typetitre=='Vente de coupe '">Vente de coupe No:<label class="style" for="input-small">{{ demandedetail.numtitre }}</label></div>
              <div v-if="demandedetail!=null&&demandedetail.typetitre=='Concession forestière en convention définitive'">Concession forestière en convention définitive N°:<label class="style" for="input-small">{{ demandedetail.numtitre }}</label></div>
              <div> 
                <h5>
                  <span class="mx-1">Statut: </span>
                  <b-badge pill variant="danger" v-if="demandedetail.statut==0">Projet</b-badge>
                  <b-badge pill variant="secondary" v-if="demandedetail.statut==1">Vérifié par l'opérateur</b-badge>
                  <b-badge pill variant="primary" v-if="demandedetail.statut==2">Soumis</b-badge>
                  <b-badge pill variant="secondary" v-if="demandedetail.statut==3">Vérifié par le délégué</b-badge>
                  <b-badge pill variant="secondary" v-if="demandedetail.statut==4&&demandedetail.position!='MINFOF'">Recommandé à <span>{{ demandedetail.position }}</span></b-badge>
                  <b-badge pill variant="secondary" v-if="demandedetail.statut==4&&demandedetail.position=='MINFOF'">Recommandé au MINFOF</b-badge>
                  <b-badge pill variant="secondary" v-if="demandedetail.statut==5">Vérifié par le MINFOF</b-badge>
                  <b-badge pill variant="light" v-if="demandedetail.statut==6">En cours d'approbation</b-badge>
                  <b-badge pill variant="success" v-if="demandedetail.statut==7">Approuvé</b-badge>
                  <b-badge pill variant="danger" v-if="demandedetail.statut==8">Rejété</b-badge>
                  <b-badge pill variant="danger" v-if="demandedetail.statut==9">Tracking mis à jour dans le SIG</b-badge>
                </h5>
              </div>
          </b-col>

           <b-col cols="4">
             <div>Type de titre: <label class="style" for="input-small">{{ demandedetail.typetitre }}</label></div>
             <div v-if="demandedetail!=null&&demandedetail.numUfa!=null">UFA n° <label class="style" for="input-small">{{ demandedetail.numUfa }}</label></div>
             <div v-if="demandedetail!=null&&demandedetail.numUfe!=null">n° UFE <label class="style" for="input-small">{{ demandedetail.numUfe }}</label></div>
             <div v-if="demandedetail!=null&&demandedetail.numAac!=null">Assiètte n°<label class="style" for="input-small">{{ demandedetail.numAac }}</label></div>
            </b-col>
           <b-col cols="4"><div>Type de permis:<label class="style" for="input-small">{{ demandedetail.typepermis }}</label></div>
                <div>Traitement sylvicole:<label  class="style" for="input-small">{{ demandedetail.traitementSylvicole }}</label>
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
            aria-controls="collapse-5"
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
      <permis-box @echecdemandepermis="displayError" @succesdemandepermis="reloadPage" ref="permisDialogue"></permis-box>

    </div>
    

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import PermisBox from '@/components/utils/permis/ConfirmBoxDetail.vue';
  import { mapGetters } from 'vuex'

export default {
  name: "details_demande_de_permis",
  components:{
    PermisBox
  },
  data: () => ({
    fromSubmitOperateur:false,
    fromVerification:false,
    fromEmition:false,
    fromApprobation:false,
    fromRecommandation:false,
    fromVerificationminfof:false,
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
     visible: true,
    isRowselected:false,
    demandedetail:{},

    options:["valide"],
    selected:{},
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    isMinfof(){
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
  },
 
 methods: {
  async displayError(error){
    this.$refs.permisDialogue._close();
    const ok = await this.$refs.errorDialogue.show({
          title: 'Information',
          message: error,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorDialogue._close();
        } else {
          this.$refs.errorDialogue._close();
        }
  },
  reloadPage(){
    this.$refs.permisDialogue._close();
    storage.remove('commandePermis'); 
    if(!this.isMinfof){
      this.getDetailsDemandePermis()
    }else{
      this.$router.back();
    }
  },
  approuverPermis(){
    this.alertBeforeact('6')
  },
  emettrePermis(){
    this.alertBeforeact('5')
  },
  validerAuMinfof(){
    this.alertBeforeact('4')
  },
  /*recommandToMinfof(){
    this.alertBeforeact('4')
  },*/
  recommendToRegional(){
    this.alertBeforeact('4')
  },
  rejeterDemandeDelegationDep(){
    this.alertBeforeact('0')
  },
  verifFromOperator(){
    this.alertBeforeact('1')
  },
  //soumission d'une demande de permis par un opérateur
  submitFromOperator(){
    this.alertBeforeact('2')
  },
  rejeterPermis(){
    this.alertBeforeact('0')
  },
  async alertBeforeact(commande){
    let title,fromSoumission,fromRecommandation, fromRejet,largeur, message=''
    if(commande=='3'){
      title='ètes-vous sur de vouloir valider cette vérification ?'
      message='ètes-vous sur de vouloir valider cette opération ?'
      fromRejet=''
      largeur=700
      fromSoumission=''
      fromRecommandation=''
    }
    if(commande=='2'){
      title='attention cette opération est irreversible: voulez-vous soumettre cette demande ?'
      message=''
      fromRejet=''
      largeur=800
      fromSoumission=true
      fromRecommandation=''
    }
    else if(commande=='1'){
      title='ètes-vous sur de vouloir valider cette vérification ?'
      message='ètes-vous sur de vouloir valider cette opération ?'
      fromRejet=''
      largeur=700
      fromSoumission=''
      fromRecommandation=''
    }
    else if(commande=='0'){
      title='attention cette opération est irreversible: voulez-vous rejeter cette demande ?'
      fromRejet=true
      largeur=800
      fromSoumission=''
      fromRecommandation=''
    }
    else if(commande=='4'){
      title='attention cette opération est irreversible: voulez-vous recommander cette demande ?'
      fromRejet=''
      largeur=800
      fromSoumission=''
      fromRecommandation=true
    }
    else if(commande=='5'){
      title='ètes-vous sur de vouloir emettre un permis pour cette demande ?'
      message=''
      fromRejet=''
      largeur=700
      fromSoumission=''
      fromRecommandation=''
    }
    else if(commande=='6'){
      title='ètes-vous sur de vouloir approuver cette demande ?'
      message=''
      fromRejet=''
      largeur=700
      fromSoumission=''
      fromRecommandation=''
    }
    const ok = await this.$refs.permisDialogue.show({
      commande:commande,
      title: title,
      largeur:largeur,
      origine:'demande',
      idpermis:this.demandedetail.idpermis, 
      message:'',
      fromSoumission:fromSoumission,
      fromRecommandation:fromRecommandation,
      fromRejet:fromRejet,
      okButton: 'Oui',
      cancelButton: "Non",
    })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
            
            this.$refs.permisDialogue._close();
          } else {
              this.$refs.permisDialogue._close();
          }
  },
  fermer(){
    this.$router.back();
  },

  async getDetailsDemandePermis() {
    this.showOverlay = true
    this.demandedetail = await this.$permis.get('demandes-permis/' +this.$route.params.id).then(response => response.data.result)

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
     this.getDetailsDemandePermis();
     let commandeDemandePermis = storage.get('commandePermis')
     if (!commandeDemandePermis || commandeDemandePermis == null || commandeDemandePermis == ''){
      this.router.push({name : 'demande_de_permis'}) 
     }else{
      if(commandeDemandePermis=='soumission'){
        this.fromSubmitOperateur = true;
      }else if(commandeDemandePermis=='verification'){
        this.fromVerification =true;
      }else if(commandeDemandePermis=='recommandation'){
        this.fromRecommandation = true;
      }else if(commandeDemandePermis=='verificationminfof'){
        this.fromVerificationminfof = true;
      }else if(commandeDemandePermis=='emission'){
        this.fromEmition = true;
      }else if(commandeDemandePermis=='approbation'){
        this.fromApprobation = true;
      }
      
     }
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