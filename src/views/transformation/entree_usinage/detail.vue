<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
        <div>
          <!--BARRE ENTETE-->
          <tab-head 
            :toggleSideBar="toggleSideBar"
            :fermer="fermer"
            title="consultation entrée usinage N°:"
            :idElement="entreUsinage.idlot"
          />
        </div>
        <b-card class="b-card">
          <b-row>
            <b-col cols="3">
              <P> Unité de transformation :  <strong>{{ entreUsinage.site }}</strong>
              </P>
            </b-col>
            <b-col cols="3">
              <P> Ligne: <strong>{{ entreUsinage.ligne }}</strong> </P>
            </b-col>
            <b-col cols="3">
              <p> Date opération : <strong> {{ entreUsinage.dateoper }}</strong> </p>
            </b-col>
            <b-col cols="3">
              <p> Type de produit : 
                <strong v-if="entreUsinage.typeprodut=='GR'">Grumes</strong>
                <strong v-else-if="entreUsinage.typeprodut=='CL'">Grumes</strong>
                <strong v-else>Produit spécial</strong>
               </p>
            </b-col>
            <b-col cols="3">
              <p> Statut: 
                <b-badge v-if="entreUsinage.statut=='0'" pill variant="primary">Brouillon</b-badge>
                <b-badge v-else-if="entreUsinage.statut=='1'" pill variant="success">Soumis</b-badge>
              </p>
            </b-col>
          </b-row>
        </b-card>
        <!--entete des tableaux -->
      
        <div class="mt-5  table-header-border">
          
          <b-row>
            <b-col cols="8"><h4 class="tab-header-center-text ml-2 d-inline-block"> Détails du lot</h4> 
              <b-button  v-if="entreUsinage.statut=='0'" @click.prevent="soumettreEntreeUsinage"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
                <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
                soumettre
              </b-button>
              <!--<b-button  v-if="entreUsinage.statut=='SOUMIS'" @click.prevent="validerEntreeUsinage"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
                <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>
                valider
              </b-button>
              <b-button  v-if="entreUsinage.statut=='SOUMIS'" @click.prevent="rejeterEntreeUsinage"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
                <b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>
                Rejeter
              </b-button>-->
              <b-button @click.prevent="soumettreEntreeParc"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
                <b-img src="@/assets/images/excel.png"></b-img>
                exporter
              </b-button>
              <b-button class="not-change-image-opacity mx-1 simple-btn">Nombre de grume<span v-if="entreUsinage.nombregrume>1">s</span> <b-badge variant class="mx-1" style="font-size:1em">{{ entreUsinage.nombregrume }}</b-badge></b-button>
              <b-button class="not-change-image-opacity mx-1 simple-btn">Volume total <b-badge variant class="mx-1" style="font-size:1em">{{ entreUsinage.volume }} m <sup>3</sup></b-badge></b-button>
            </b-col>
            <!--<b-col class="col-md-auto">
              <h3  class="mx-2">
                <b-badge variant class="mx-1">{{ entreUsinage.nbgrumes }}Grume<span v-if="entreUsinage.nbgrumes>1">s</span></b-badge>
                <b-badge class="mx-1"><b>{{ entreUsinage.volgrumes  }} m <sup>3</sup></b> de bois obtenu</b-badge>
              </h3> 
            </b-col>-->
          </b-row>
        </div>
        <!--implémentation tableau proprement dite-->
        <div class="ml-1" style="width:99%">
          <b-table  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable
            :items="items" 
            :fields="fields" 
            :tbody-tr-class="rowClass" >
              <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(numdf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(diametrepb)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(diametregb)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template #table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-1">chargement...</strong>
                </div>
              </template>
                <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
              <template #cell(codebarre)="data">
                <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
              <template #cell(sequence)="data">
                <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
              <template #cell(numdf10)="data">
                <input disabled type="text" v-model="data.item.numdf10" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
              <template #cell(essence)="data">
                <input disabled type="text" v-model="data.item.essence" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
              <template #cell(diametrepb)="data">
                <input disabled type="text" v-model="data.item.diametrepb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template>
              <template #cell(diametregb)="data">
                <input disabled type="text" v-model="data.item.diametregb" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template>
              <template #cell(longueur)="data">
                <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
              <template #cell(volume)="data">
                <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
              </template> 
            </b-table>

        <error-dialogue ref="errorDialogue"></error-dialogue>
          
        </div>
      </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  import ErrorDialogue from '@/components/utils/AlertBox.vue';
  import { mapGetters } from 'vuex'

export default {
  name: "detail_entree_usinage",
  components:{
    ErrorDialogue
  },

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
    elements:[],
    commande:'',
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
    items(){
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
  },
 
 methods: {
   rowClass(item, type) {
      if(item !=''&&item!=null){
        return 'custo-bg_detail_-table_element'
      }else{
        return 
      }
    },
    fermer(){ this.$router.push({name: 'entree_usinage'});},
    async getDetailsEntreeUsinage() {
            this.showOverlay = true
            this.entreUsinage = await this.$transformation.get('entrees-usinage/' +this.$route.params.id).then(response => response.data.result)
            this.elements=this.entreUsinage.details
            this.elements = this.elements.map(elt => {
              elt.volume = elt.volume!=''? elt.volume.toFixed(3): 0
              return elt
            })
            
            console.log('données ',this.entreUsinage);
            //this.items.push(this.entreUsinage.details)
            this.showOverlay = false
    },
    soumettreEntreeUsinage(){
      this.showOverlay = true;
      this.$transformation.patch('entrees-usinage/'+this.entreUsinage.idlot+'/soumettre').then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsEntreeUsinage();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
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
    this.getDetailsEntreeUsinage()
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