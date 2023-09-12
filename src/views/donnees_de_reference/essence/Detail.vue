<template>
    <div id="cover" class="min-vh-100">
      
        <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">CONSULTATION ESSENCES : ABAM DELOA</span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
          </div>
          
        </b-overlay>
         <div  class="mt-4 pb-4 justify-content-center" style=" border-top: 4px solid #82C138;">

        <b-row class="mt-4">
          <b-col cols="12">
            <b-container fluid>
            <b-row>
                <b-col>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Catégorie Essences:</label>
                </b-col>
                <b-col sm="6">
                  <label for="" class="data font-weight-bold">Essence speciale AYOUS</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Nom Commercial:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">ABAM DELAO</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Nom scientifique:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">SYNSEPALUM DULCIFICUM</label>
                </b-col>
              <b-row class="my-1 pl-2">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Actif:</label>
                </b-col>
                <b-col sm="7">
                <b-badge variant="success">Oui</b-badge>
                </b-col>
              </b-row>
              </b-row>
                </b-col>

                <b-col>
                 <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code CEMAC grume:</label>
                </b-col>
                <b-col sm="6">
                  <label for="" class="data font-weight-bold">1923</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code CEMAC debité:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">1923</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code MINFOF:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">1923</label>
                </b-col>
              </b-row>                          
                </b-col>
            <b-col>
                 <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code douanier/Tarifaire:</label>
                </b-col>
                <b-col sm="6">
                  <label for="" class="data font-weight-bold">1923</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code SH:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">1923</label>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Code DME:</label>
                </b-col>
                <b-col sm="7">
                  <label for="" class="data font-weight-bold">50</label>
                </b-col>
              </b-row>
            </b-col>
            
            <b-col>
              <b-row class="d-flex my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Interdiction d'export pour grume:</label>
                </b-col>
                <b-col >
                <b-badge variant="success">Oui</b-badge>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Interdit à l'exploitation:</label>
                </b-col>
                <b-col sm="7">
                <b-badge variant="danger">Non</b-badge>
                </b-col>
              </b-row>
              <b-row class="my-1">
                <b-col sm="5">
                  <label for="input-small" class="text-muted">Quota autorisé?:</label>
                </b-col>
                <b-col sm="7">
                <b-badge variant="danger">Non</b-badge>
                </b-col>
              </b-row>
            </b-col>

            </b-row>
            </b-container>
          </b-col>
              </b-row>
                </div>
          <!-- entete des tableaux -->
        
          <!-- <div class="mt-5  table-header-border">
           
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Détails du lot</h4> </b-col>
              
              <b-col class="col-md-auto">
                
                <a :disabled="canCreateUtilisateur"  size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/excel.png"></b-img> Importer</a>
                <a @click.prevent="showDetails" :disabled="canViewCodeBarre" size="sm" :class="{'change-image-opacity': !canViewCodeBarre,  'not-change-image-opacity': canViewCodeBarre}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewCodeBarre}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Consulter</a>
                <span >
                  <a :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}"></b-img>Actualiser</a>
                
               
               
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Exporter</a>
                
                </span>
                
              </b-col>
            </b-row>
          </div> -->
          <!--implémentation tableau proprement dite-->
          <!-- <div class="ml-1" style="width:99%">
            <b-table  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" >
                <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diametrepetitbout)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diametregrosbout)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(zoneutm)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
                <template #cell(codebarre)="data"><b-form-input size="sm" v-model="data.item.codebarre" class="m-0 py-0 ml-1 px-1" style="width:70%"></b-form-input></template> 
                <template #cell(essence)="data"><b-form-input size="sm" v-model="data.item.essence" class="m-0 py-0 ml-1 px-1" style="width:50%; border:1px solid white; background :#82C138"></b-form-input></template> 
                 <template #cell(numdf10)="data"><b-form-input size="sm" v-model="data.item.numdf10" class="m-0 py-0 ml-1 px-1" style="width:70%; border:1px solid white; background :#82C138"></b-form-input></template> 
                <template #cell(sequence)="data"><b-form-input size="sm" v-model="data.item.sequence" class="m-0 py-0 ml-1 px-1" style="width:70%"></b-form-input></template> 
                <template #cell(diametrepb)="data"><b-form-input size="sm" v-model="data.item.diametrepb" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%; border:1px solid white; background :#82C138"></b-form-input></template> 
                <template #cell(diametregb)="data"><b-form-input size="sm" v-model="data.item.diametregb" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%; border:1px solid white; background :#82C138"></b-form-input></template>
                <template #cell(longueur)="data"><b-form-input size="sm" v-model="data.item.longueur" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%; border:1px solid white; background :#82C138"></b-form-input></template> 
                <template #cell(volume)="data"><b-form-input size="sm" v-model="data.item.volume" class="m-0 py-0 ml-1" style="width:50%; padding-left:5%; padding-right:5%; border:1px solid white; background :#82C138"></b-form-input></template> 
              </b-table>

            
          </div> -->

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

export default {
  name: "detail_entree_usinage",

  data: () => ({
    showOverlay:false,
    entreUsinage:{},
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
  async getDetailsSite() {
    this.showOverlay = true
    this.lotCodes = await this.$site.get('DetailsSite/' +this.$route.params.id).then(response => response.data.result)
    console.log('DetailsSite',this.lotsCodes );
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
    this.getEntreeUsinage()
  },
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