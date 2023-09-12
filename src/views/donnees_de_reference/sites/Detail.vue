<template>
    <div id="cover" class="min-vh-100">
      
        <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text" style>
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">Description site</span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
          </div>
         <div class="container mt-3">
          <b-row>
            <b-col class="mt-4" cols="4">
              <span class="text-muted"><strong>Type de site: </strong></span> <strong>{{ detailSite.libelletypesite }}<b-badge pill variant="secondary">{{ detailSite.typesite }}</b-badge></strong><br>
              <br>
              <span class="text-muted"><strong>Nom du site: </strong></span><strong>{{ detailSite.intitule }}</strong><br>
              <br>
               <P class="mt-0"><span class="text-muted"><strong>Entité forestière: </strong></span><strong>{{ detailSite.entite }}</strong></P>
               <p v-if="detailSite.downloadautorisation!==null">
                <span class="text-muted"><strong>Autorisation d'enregistrement du site: </strong></span>
                  <a  :href="detailSite.downloadautorisation" target="_blank" v-b-tooltip.hover title="consulter">
                  <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                </a>
               </p>
               <p v-if="detailSite.downloadcertifenreg!==null">
                <span class="text-muted"><strong>Attaché Certificat exportateur du site: </strong></span>
                  <a  :href="detailSite.downloadcertifenreg" target="_blank" v-b-tooltip.hover title="consulter">
                  <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                </a>
               </p>
               <p v-if="detailSite.downloadactesuspension!==null">
                <span class="text-muted"><strong>Acte de suspension du site: </strong></span>
                  <a  :href="detailSite.downloadactesuspension" target="_blank" v-b-tooltip.hover title="consulter">
                  <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                </a>
               </p>
               <p v-if="detailSite.downloadactecreation!==null">
                <span class="text-muted"><strong>Acte de création du site: </strong></span>
                  <a  :href="detailSite.downloadactecreation" target="_blank" v-b-tooltip.hover title="consulter">
                  <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                </a>
               </p>
               
              <br><br>
            </b-col>
             <b-col class="mt-4" cols="4">
              <span class="text-muted"><strong>Région : </strong></span><strong>{{ detailSite.region }}</strong><br><br>
              <span class="text-muted"><strong>Arrondissement: </strong></span><strong>{{ detailSite.arrondissement }}</strong><br><br>
              <span class="text-muted"><strong>Département: </strong></span><strong>{{ detailSite.departement }}</strong><br><br>
              
              
             </b-col>
             <b-col cols="4">
                <b-card>
                    <template #header>
                        <h6 class="mb-0 font-weight-bold text-center">Coordonnées UTM</h6>
                    </template>
                    <b-row>
                        <b-col>
                            <b-form-group>
                            <label class="p-0 m-0 d-flex justify-content-center align-items-center text-muted" style="font-weight:bold">Zone </label>
                          <P class="d-flex justify-content-center"> <strong>{{ detailSite.zone }}</strong></P>
                        </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                            <label class="p-0 m-0 d-flex justify-content-center align-items-center text-muted" style="font-weight:bold">X</label>
                          
                            <P class="d-flex justify-content-center"><strong>{{ detailSite.x }}</strong></P>
                        </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                            <label class="p-0 m-0 d-flex justify-content-center align-items-center text-muted" style="font-weight:bold">Y</label>
                          
                            <P class="d-flex justify-content-center"> <strong>{{ detailSite.y }}</strong></P>
                        </b-form-group>
                        </b-col>
                    </b-row>
                </b-card>
             </b-col>
          </b-row>
         </div>
            <!--TABLEAU LISTING DES DEMANDES DE RENOUVELLEMENT-->
            <div v-if="detailSite.typesite=='PRU'">
              <div class="m-0 px-2 table-header-border">
                <b-row>
                  <b-col>
                    <h4 class="tab-header-left-text">Liste des demandes de renouvellement éffectuées pour ce site</h4>
                    <b-button v-if="isToSubmitRenewable"   @click.prevent="submitRenewal"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Soumettre</b-button> 
                    <b-button v-if="canHandleRenewParcRupture"  @click.prevent="approuverRenouvellement"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver</b-button> 
                    <b-button v-if="canHandleRenewParcRupture" @click.prevent="rejeterRenouvellement"  size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Rejeter</b-button>  
                  </b-col>
                </b-row>
              </div>
              <div class="ml-1">
                  <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected" 
                    :items="items" 
                    :fields="fields" 
                    :tbody-tr-class="rowClass" show-empty>
                    <template #empty>
                      <h4 style="color: green" class="text-center">
                        Aucune
                        <span class="font-weight-bold">demande de renouvellement </span> trouvée!!
                      </h4>
                    </template>
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template v-slot:head(iudrenouvelement)="data">
                      <span v-html="data.field.label" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template #cell(index)="data">
                      <h4><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b></h4>  
                    </template>
                    <template #cell(bordereauxRenouvellement)="data">
                      <h4>{{ data.item.bordereauxRenouvellement }}</h4>  
                    </template>
                    <template #cell(datevalidation)="data">
                      <h4>{{ data.item.datevalidation }}</h4>  
                    </template>
                    <template #cell(motifRejet)="data">
                      <h4 style="margin: 0 auto;"><span style="height: 50px">{{ data.item.motifRejet }}</span></h4>  
                    </template>
                    <template #cell(iudrenouvelement)="data">
                      <h4 style="margin: 0 auto"><a style="height: 50px" class="d-flex justify-content-center align-items-center" v-if="data.item.iudrenouvelement!==null" :href="data.item.iudrenouvelement" target="_blank" v-b-tooltip.hover title="Voir la quittance">
                        <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                      </a></h4>  
                    </template>
                   
                    <template #cell(statut)="data">
                      <h4><b-badge pill variant="primary" v-if="data.item.statut=='BROUILLON'">Brouillon</b-badge></h4>
                      <h4><b-badge pill variant="secondary" v-if="data.item.statut=='SOUMIS'">Soumis</b-badge></h4>
                      <h4><b-badge pill variant="success" v-if="data.item.statut=='APPROUVER'">Approuvée</b-badge></h4>
                      <h4><b-badge pill variant="danger" v-if="data.item.statut=='REJETER'">rejettée</b-badge></h4>
                    </template>
                  </b-table>
    
                
    
                  <!--AJOUT DE LA PAGINATION -->
                  <!--<paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  -->
              </div>
            </div>
          
        </b-overlay>
               <site-component ref="siteDialogue"></site-component>
              <rejet-component ref="rejetDemande" @rejetAdmis="SetData"></rejet-component>
              
          </div>

  

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import SiteComponent from '@/components/utils/donnes_de_reference/Site.vue';
  import RejetComponent from '@/components/utils/donnes_de_reference/RejetDemande.vue';

  import { mapGetters } from 'vuex'

export default {
  name: "detail_entree_usinage",
  components:{
    SiteComponent,
    RejetComponent
  },
  data: () => ({
    showOverlay:false,
    detailSite:{},
    isBusy:false,
    //données du tableaux
    fields: [
        { key: 'index', label: 'Index', thStyle:"width:auto" },
        { key: 'bordereauxRenouvellement', label: 'N° de bordereau' },
        { key: 'datevalidation', label: 'Date de validation' },
        { key: 'motifRejet', label: 'Motif du rejet', thStyle:{width:'30%'}},   
        { key: 'statut', label: 'Statut' },    
        { key: 'iudrenouvelement', label: 'Recu de paiement' },   
    ],
    elements: [],
    selected:{},
    /*propriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
  }),
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  computed:{
    ...mapGetters(['user', 'hasAccess']),
    isMinfof(){ 
        if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
          return true;
        }else{
          return false;
        }
    },
    //controle bouton soumission parc rupture
    isToSubmitRenewable(){
      if(this.isMinfof){
        return false;
      }else{
        if(this.hasAccess('SOUMETTRE_PARC_RUPTURE')){
          if(!php.empty(this.selected[0])&&this.selected[0].statut=='BROUILLON'){
            return true;
          }
          else{
            return false
          }
        }else{
          return false;
        }
      }
    },
     //controle bouton approbation d'un parc rupture
     canHandleRenewParcRupture(){    
      if(!this.isMinfof){
        return false;
      }else{
       // if(this.hasAccess('TRAITER_PARC_RUPTURE')){
          if(!php.empty(this.selected[0])&&this.selected[0].statut=='SOUMIS'&&this.detailSite.typesite=='PRU'){
            return true;
          }
          else{
            return false
          }
       /* }else{
          return false;
        }*/
      }
    },
    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
  },
 
 methods: {
  //methode de rejet d'une demande de renouvellement
  async rejeterRenouvellement(){
    const ok = await this.$refs.rejetDemande.show({
        commande:'3',
        title: 'Rejet',
        idRenouvellement:this.detailSite.iddemandeRenouv,
        message:"ètes-vous sur de vouloir rejeter cette demande de renouvellement ?",
        numfacture:this.detailSite.nunumbordereaux,
        intitule:this.detailSite.nunumbordereaux,
        organisation:this.detailSite.entite,
        okButton: 'Oui',
        cancelButton: "Non",
    })
  },
  //mise à jour de l'interface après rejet d'une demande de renouvellement d'un parc rupture
  SetData(){
    this.getDetailsSite();
    this.$refs.rejetDemande._close();
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.isRowselected=true
    this.selected = items
  },
  async handleDemande(commande){
      //commande => 1=soumision, 2=approbation, 3=rejet
      let title, message=''
      if(commande=='1'){
        title='Soumission'
        message='ètes-vous sur de vouloir soumettre cette demande ?'
      }
      else if(commande=='2'){
        title='Approbation'
        message='ètes-vous sur de vouloir approuver cette demande ?'

      }
      else if(commande=='3'){
        title='Rejet'
        message='ètes-vous sur de vouloir rejetter cette demande ?'

      }
      const ok = await this.$refs.siteDialogue.show({
               commande:'1',
               title: title,
               message:message,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              if(commande=='1'){
                this.showOverlay = true;
                this.$donneesReference.patch('sites/renouvellemnt/soumettre/'+this.selected[0].idRenouvellement).then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getDetailLigneTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              else if(commande=='2'){
                this.showOverlay = true;
                this.$donneesReference.patch('sites/renouvellemnt/aprouver/'+this.selected[0].idRenouvellement).then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getDetailLigneTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              else if(commande=='3'){
                this.showOverlay = true;
                this.$donneesReference.patch('sites/renouvellemnt/rejeter/'+this.selected[0].idRenouvellement, {}).then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getDetailLigneTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              this.$refs.transformationDialogue._close();
            } else {
               this.$refs.transformationDialogue._close();
            }
    },

    async errorHappened(error) {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur survenue',
          message: error.message,
          okButton: 'Quitter',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
          this.$emit('closeForm')
      } else {
          this.$refs.errorDialogue._close();
          this.resetForm()
      }
    },
  fermer() {
    this.$router.back()
  },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
      if(!php.empty(items)){
        this.selected = items;
      }
    },
  async getDetailsSite() {
    this.showOverlay = true
    this.detailSite = await this.$donneesReference.get('sites/' +this.$route.params.id).then(response => response.data.result)
    if(this.detailSite.typesite=='PRU'){
      this.elements = this.detailSite.renouvellemnts
      this.elements = this.elements.map(elt =>{
        elt.datevalidation = elt.datevalidation !==null ? this.$dayjs(elt.datevalidation).format('DD/MM/YYYY') :""
        return elt
      })
    }
    this.showOverlay = false
  },

   toggleSideBar(){
    var sidebar = document.querySelector('#sidebar');
    var administration = document.querySelector('#administration');
    var administrationItem = document.querySelectorAll('.administrationItem');
    var actionButton = document.querySelector("#toggleSideBar");

    if (sidebar.style.width !== '0px'){
      sidebar.style.width = '0px';
      sidebar.style.transition = 'all 0.5s ease';
      administration.style.backgroundColor = 'white';
      administration.style.transition = 'background-color 0.2s ease';
      for (let index = 0; index < administrationItem.length; index++) {
        const element = administrationItem[index];
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.2s ease';
      }
      actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

    }
    else {
      sidebar.style.width = '250px';
      sidebar.style.transition = 'all 0.3s ease';
      administration.style.backgroundColor = '#82C138';
      administration.style.transition = 'background-color 0.8s ease';

      for (let index = 0; index < administrationItem.length; index++) {
        const element = administrationItem[index];
        element.style.opacity = '100%';
        element.style.transition = 'opacity 1s ease';
      }
      
      actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
    }
    
  },
 },
 
  beforeMount() {
    this.getDetailsSite()
  },
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

.simple-btn{
    background:none;
    border:none;
    color:black;
    font-weight: bold;
    cursor:pointer;
  }
</style>
<style>
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  #toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
</style>