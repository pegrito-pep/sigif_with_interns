<template>
    <div id="cover" class="min-vh-100">
          <div>
              <b-overlay rounded="sm" :show="showOverlay">
                <div>
                  <b-row>
                    <b-col><h4 class="tab-header-left-text">
                      <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                      </button><span class="ml-1 font-weight-bold">Consultation Quittance LV :{{ quittancelv.idquittancelv }}</span></h4>
                        
                      </b-col>
                    <b-col class="col-md-auto">
                      <span v-if="quittancelv.statut=='Soumis'" class="d-flex justify-content-between">

                      <b-button v-if="isToValidate&&isMinfof" @click.prevent="validerQuittanceLv" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver</b-button>
                      <b-button v-if="isToValidate&&isMinfof" @click.prevent="rejeterQuittanceLv" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>rejeter</b-button>
                        <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                      </span>
                      <span v-else-if="quittancelv.statut=='Brouillon'" class="d-flex justify-content-between">
                        <a  @click.prevent="soumettreQuittanceLv" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Soumettre</a>
                        <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                      </span>
                      <span v-else>
                        <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                      </span>
                    </b-col>
                  </b-row>
                </div>
                <b-card class="b-card">
                  <b-row>
                    <b-col cols="6">
                      <P> Entité Forrestière :
                        <strong >{{ user.profil.organisation }}</strong>
                      </P>
                    </b-col>
                    <b-col cols="3">
                      <p> Montant : <strong>{{quittancelv.montant}}</strong> </p>
                    </b-col>
                    <b-col cols="3">
                      <p> Pièce jointe : 
                        <a class="mx-1 detail-fiscalite-link" v-if="quittancelv!=null&&quittancelv.iudquittancelv!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="quittancelv.iudquittancelv"><b-img src="@/assets/images/Attach_128x128.png"></b-img> document quittance</a>
                      </p>
                    </b-col>
                    
                  </b-row>
                  <b-row>
                    <b-col cols="6">
                      <p> N° Quittance : 
                        <strong>{{ quittancelv.numquittance }}</strong>
                      </p>
                    </b-col>
                    <b-col cols="3">
                      <P> Date Quittance FSDF : <strong>{{ $dayjs(quittancelv.datequittancelv).format('DD/MM/YYYY') }}</strong> </P>
                    </b-col>
                    <b-col cols="3">
                      <p> Nombre de LV : 
                        <strong>{{quittancelv.nmblv}}</strong>
                      </p>
                    </b-col>
                    <b-col cols="2">
                      <p> Statut : 
                        <b-badge v-if="quittancelv.statut=='Brouillon'" pill variant="danger">{{ quittancelv.statut }}</b-badge>
                        <b-badge v-if="quittancelv.statut=='Rejeté'" pill variant="danger">{{ quittancelv.statut }}</b-badge>
                        <b-badge v-else-if="quittancelv.statut=='Approuvé'" pill variant="secondary">{{ quittancelv.statut }}</b-badge>
                        <b-badge v-else-if="quittancelv.statut=='Soumis'" pill variant="success">{{ quittancelv.statut }}</b-badge>
                      </p>
                    </b-col>
                  </b-row>
                </b-card>
              </b-overlay>
                <!--<b-col class="mt-3"><h4 class="tab-header-left-text mt-3">Consultation quittances LV: 18</h4></b-col>
                <b-collapse id="collapse-4" v-model="visible">
                <b-card class="b-card">
                  <b-row class="align-item-center d-flex justify-content-center ">
                      <div  class="d-flex align-items-center justify-content-center p-5 bg-white ml-4">

                      <b-col class="" cols="6">

                          <h6>Entité forèstiere:</h6><br>
                          <h6>No Quittance: </h6><br>
                            <h6>Date quittance FSDF:</h6><br>
                            <h6>Montant:</h6><br>
                              <h6>Nombre de LV:</h6><br>
                              <h6>Joindre quitance:</h6>
                          
                        
                          
                      </b-col>
                    <b-col class="b-col" cols="7">
                      <h6><strong>{{ user.profil.organisation }}</strong></h6><br>
                          <h6><strong>{{ quittancelv.numquittance }}</strong></h6><br>
                            <h6><strong>{{ $dayjs(quittancelv.datequittancelv).format('DD/MM/YYYY')          }}</strong><i class="fa fa-calendar mt-1" aria-hidden="true"></i></h6><br>
                            <h6><strong>{{ quittancelv.montant }}</strong></h6><br>
                              <h6><strong>{{ quittancelv.nmblv }}</strong></h6><br>
                              <h6>
                                <a class="mx-1 detail-permis-item" v-if="quittancelv!=null&&quittancelv.iudquittancelv!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="quittancelv.iudquittancelv"><b-img src="@/assets/images/Attach_128x128.png"></b-img> document quittance</a>
                              </h6>
                    
                    </b-col>

                    </div>
                    
                    <b-col cols="2" class="b-col">
                      
                    </b-col>
                    
                  </b-row>
                  <b-row class="mt-5 position_absolute">
                    <div class="search-bar-btn-group">
                      
                      <b-col>
                      
                      </b-col>
                      <b-col>
                      
                      </b-col>
                    </div>
                  </b-row>
                  
                </b-card>
                </b-collapse>-->
          </div>
        <fiscalite-box @echecopeparc="displayError" @succesopeparc="reloadPage" ref="fiscaliteDialogue"></fiscalite-box>
        <error-dialogue ref="errorDialogue"></error-dialogue>
        
    </div>

</template>


<script>
  const php  = require ( 'phpjs' ) ;
  import FiscaliteBox from '@/components/utils/fiscalite/ConfirmBoxDetail.vue';
  import ErrorDialogue from '@/components/utils/AlertBox.vue';
  
  import { mapGetters } from 'vuex'
export default {
  name: "quittance_lv_details",
  components:{
    FiscaliteBox,
    ErrorDialogue
  },
  data: () => ({
    showOverlay:false,
    quittancelv:{},
    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
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
     isToValidate(){
      if(!php.empty(this.quittancelv)&&this.quittancelv.statut=='Soumis'){
        return true;
      }
      return false; 
    },
  },
 
 methods: {
  async displayError(error){
    this.$refs.opeparcDialogue._close();
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
    this.$refs.fiscaliteDialogue._close();
    this.getDetailsQuittancesLV();
  },
  soumettreQuittanceLv(){
    this.alertBeforeact('1')
  },
  validerQuittanceLv(){
    this.alertBeforeact('2')
  },
  rejeterQuittanceLv(){
    this.alertBeforeact('3')
  },
  async alertBeforeact(commande){
      let title, message=''
      if(commande=='1'){
        title='Soumission'
        message='ètes-vous sur de vouloir soumettre cette quittance ?'
      }
      else if(commande=='2'){
        title='Approver'
        message='ètes-vous sur de vouloir approuver cette quittance ?'

      }
      else if(commande=='3'){
        title='rejet'
        message='ètes-vous sur de vouloir rejetter cette quittance ?'

      }
        const ok = await this.$refs.fiscaliteDialogue.show({
            commande:commande,
            title: commande==1?'Soumission':'Validation',
            origine:'quittances_lv',
            message:message,
            idQuittanceLv:this.quittancelv.idquittancelv, 
            okButton: 'Oui',
            cancelButton: "Non",
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
          this.$refs.fiscaliteDialogue._close();
        } else {
          this.$refs.fiscaliteDialogue._close();
        }
  },
  async getDetailsQuittancesLV() {
    this.showOverlay = true
    await this.$fiscalite.get('quittances-lv/' +this.$route.params.id).then(response =>{
      console.log('result ',response.data.result);
      this.quittancelv= response.data.result
    })
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
  },
  fermer() {this.$router.push({name: "quittance_lv"});},

 },
 

  beforeMount() {
    this.getDetailsQuittancesLV();
  }
}

</script>
<style scoped>
.detail-fiscalite-link {
  color: #175131!important;
}
.detail-fiscalite-link:hover{
  text-decoration: underline;
}
.position_absolute{
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card{
  background-color: transparent !important;
}
.b-col{
  margin-right: 16px;
}
.b-col .content{
  display: flex;
  flex-direction: column;
}


#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius: 6px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
  background-color: rgba(0, 82, 44, 0.89);
  border:none;
}
.search-bar-btn a{
  color:white
}
.search-bar-btn a:hover{
  font-weight: 600;
  font-style: italic;
  
}

.search-bar-custum-input{
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
}

.simple-btn{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
}

.simple-btn:hover{
  background:none;
  border:none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white!important;
  border-color: white!important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44)!important;
  border-color: white!important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover{
  cursor:pointer;
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>