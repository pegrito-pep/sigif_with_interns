<template>
    <div id="cover" class="min-vh-100">
      
        <!-- <b-overlay :show="showOverlay" rounded="sm"> -->
          <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text" style>
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">Consultation model import no: Abbatage </span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
          </div>
          
        <!-- </b-overlay> -->
         <div class="container mt-3">




          <b-row>
            <b-col class="mt-4" cols="6">
              <span class="text-muted"><strong>Nom du fichier: </strong></span> <strong> Abattage</strong><br>
              <br>
              <span class="text-muted"><strong>Fichiers csv: </strong></span><strong>Abattage.csv</strong>
                <b-button @click.prevent="changeFile" class="label-file mx-1">Mettre à jour ...</b-button>
              <br>
              <br>
              <b-col sm="4">
                  <div class="d-flex justify-content-between">
                    <label for="" class="data text-success">Télécharger</label>
                    <a id="tooltip-button-show-event"><i class="fa fa-download"></i></a>
                    <b-tooltip placement="right" ref="tooltip" target="tooltip-button-show-event" variant="success" class="tooltip-success">
                      <strong>Télécharger!</strong>
                    </b-tooltip>
                  </div>
                  
                </b-col>

            </b-col>
            <reset-csv-box ref="csvDialogue"></reset-csv-box>


                  </b-row>
         
                </div>
          <!--entete des tableaux -->
       

        
          <!--implémentation tableau proprement dite-->
         
          </div>

  

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import ResetCsvBox from '@/components/utils/ResetCsvBox.vue';
export default {
  name: "detail_entree_usinage",
  components: {
    ResetCsvBox
  },
  data: () => ({
    showOverlay:false,
    detailSite:{},
    isBusy:false,
    //données du tableaux
    fields: [ { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code Barre' }, 
      { key: 'sequence', label: 'séquence'},
      {key : 'numdf10', label :'No DF10'},
      { key: 'essence', label : 'Essence' }, 
      { key: 'diametrepb', label : 'Diamètre petit bout' }, 
      { key: 'diametregb', label : 'Diamètre gros bout' }, 
      { key: 'longueur', label : 'Longueur(m)' }, 
      { key: 'volume', label : 'Volume (m3)' }, 
      
    ],
    items:[],
    selected:{},
  }),
  computed:{
    canCreateUtilisateur(){
      return true
    },
    canUpdateOperationParc(){return true},
    canSubmitOperationParc(){return true}
  },
 
 methods: {
     fermer() {
      this.$router.back()
     },
    rowClass(item, type) {
      if(item !=''&&item!=null){
        return 'custo-bg_detail_-table_element'
      }else{
        return 
      }
    },
    async changeFile() {
            const ok = await this.$refs.csvDialogue.show({
               title: 'Activation',      
               okButton: 'Ok',
               cancelButton: "Annuler",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.createdDialogue._close();
                this.$bvModal.show("user-form");
            } else {
               this.$refs.createdDialogue._close();
            }
   },
  async getDetailsSite() {
    this.showOverlay = true
    this.detailSite = await this.$donneesReference.get('sites/' +this.$route.params.id).then(response => response.data.result)
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
  mounted(){
    const actualBtn = document.getElementById('actual-btn');
    const fileChosen = document.getElementById('file-chosen');
    actualBtn.addEventListener('change', function(){
      fileChosen.textContent = this.files[0].name
    })
  }
  }

</script>
<style scoped>
  .simple-btn{
    background:none;
    border:none;
    color:black;
    font-weight: bold;
    cursor:pointer;
  }
 
 .label-file {
  background-color: #95B6D4;
  color: black;
  padding: 0.2rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: bold;

}


</style>
