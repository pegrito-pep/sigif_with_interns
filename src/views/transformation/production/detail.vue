<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <!--BARRE ENTETE-->
        <tab-head 
          :toggleSideBar="toggleSideBar"
          :fermer="fermer"
          title="consultation Lot de production N°:"
          :idElement="lotproduction.idlot"
        />
      </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="6">
            <b-row><P> Unité de transformation :  <strong>{{ lotproduction.site }}</strong></P></b-row>
            <b-row><P> Ligne de transformation :  <strong>{{ lotproduction.ligne }}</strong></P></b-row>
            <b-row><P> Date de production :  <strong>{{ lotproduction.dateoper }}</strong></P></b-row>
            <b-row><P> Type de produit :  <strong>{{ lotproduction.typeprodut }}</strong></P></b-row>
            <b-row><P> N° du contrat :  <strong>{{ lotproduction.numcontrat }}</strong></P></b-row>
          </b-col>
          <b-col cols="6">
            <h6 class="tab-header-left-text">Entrées usinage associées</h6>
            <div class="ml-1">
              <b-table
                :busy="isBusy"
                hover
                select-mode="single"
                responsive="sm"
                ref="selectableTable"
                selectable
                :items="itemsentreeusinage"
                :fields="fieldsentreeusinage"
                :tbody-tr-class="rowClass"
              >
              <template v-slot:head(date)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(lot)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template v-slot:head(ligne)="data">
                <span v-html="data.field.label" style="color:green"></span>
              </template>
              <template #table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-1">chargement...</strong>
                </div>
              </template>
              <template #cell(index)="data">
                <b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b>
              </template>
              <template #cell(dateoper)="data">
                <input type="text" v-model="data.item.dateoper" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
              </template>
              <template #cell(idlot)="data">
                <input type="text" v-model="data.item.idlot" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
              </template>
              <template #cell(ligne)="data">
                <input type="text" v-model="data.item.ligne" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
              </template>
        </b-table>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <!--entete des tableaux -->
    
      <div class="mt-5  table-header-border">
        
        <b-row>
          <b-col cols="8"><h4 class="tab-header-center-text ml-2 d-inline-block"> Détails du lot</h4> 
            <b-button  v-if="lotproduction.statut=='BROUILLON'" @click.prevent="soumettreLotproduction"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
              <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
              soumettre
            </b-button>

            <b-button @click.prevent="soumettrelot"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
              <b-img src="@/assets/images/excel.png"></b-img>
              exporter
            </b-button>
          </b-col>
          <!--<b-col class="col-md-auto">
            <h3  class="mx-2">
              <b-badge variant class="mx-1">{{ lotproduction.nbgrumes }}Grume<span v-if="entreUsinage.nbgrumes>1">s</span></b-badge>
              <b-badge class="mx-1"><b>{{ lotproduction.volgrumes  }} m <sup>3</sup></b> de bois obtenu</b-badge>
            </h3> 
          </b-col>-->
        </b-row>
      </div>
      <!--implémentation tableau proprement dite-->
      <div class="mx-2" style="width:85%">
        <b-table  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTabledetailslot"  selectable @row-selected="onRowSelectedDetails"
          :items="itemsdetails" 
          :fields="fieldsdetails" 
          :tbody-tr-class="rowClassDetails" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(numcolis)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span><span style=" color : green">(m<sup>3</sup>)</span></template>
            <template v-slot:head(superfice)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="bgWhite form-control-xs m-1 w-75 font-weight-bold" style="border: 1px solid white;background:white!important">
            </template> 
            <template #cell(sequence)="data">
              <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template> 
            <template #cell(numcolis)="data">
              <input disabled type="text" v-model="data.item.numcolis" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template> 
            <template #cell(essence)="data">
              <input disabled type="text" v-model="data.item.essence" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template> 
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template>
            <template #cell(superfice)="data">
              <input disabled type="text" v-model="data.item.superfice" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template>
            <template #cell(poids)="data">
              <input disabled type="text" v-model="data.item.poids" class="form-control-xs m-1 w-75" style="border: 1px solid white;background:white!important">
            </template> 
        </b-table>


        <div class="mt-5  table-header-border">
        
          <b-row>
            <b-col cols="8"><h4 class="tab-header-center-text ml-2 d-inline-block"> Pièces associées</h4> </b-col>
          </b-row>
        </div>
        <!--TABLEAU DES PIECES ASSOCIES-->
        <b-table  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablePieces" selectable
          :items="itemspieces" 
          :fields="fieldspieces" 
          :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(nbpiece)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span><span style="color:green">(m<sup>3</sup>)</span></template>
            <template v-slot:head(superficie)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(longueur)="data">
              <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(largeur)="data">
              <input disabled type="text" v-model="data.item.largeur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(epaisseur)="data">
              <input disabled type="text" v-model="data.item.epaisseur" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template> 
            <template #cell(nbpiece)="data">
              <input disabled type="text" v-model="data.item.nbpiece" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(superficie)="data">
              <input disabled type="text" v-model="data.item.superficie" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #cell(poids)="data">
              <input disabled type="text" v-model="data.item.poids" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
            </template>
            <template #custom-foot>
              <b-tr class="py-2" style="border-bottom:2px solid #82C138">
                <b-td></b-td><b-td></b-td><b-td></b-td><b-td></b-td><b-td></b-td>
                <b-td></b-td>
                <b-td class="text-center font-weight-bold" style="color: #82C138"><h5>{{ volumetotal }}</h5></b-td>
                <b-td class="text-center font-weight-bold" style="color: #82C138"><h5>{{ superficietotale }}</h5></b-td>
                <b-td class="text-center font-weight-bold" style="color: #82C138"><h5>{{ poidstotal }}</h5></b-td>
               </b-tr>
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
    lotproduction:{},
    isBusy:false,
    //données du tableaux
    fieldsentreeusinage: [ { key: 'index', label: '' },
      { key: 'dateoper', label: 'Date entrée' }, 
      { key: 'idlot', label: 'Lot entrée usinage'},
      {key : 'ligne', label :'Ligne'},
    ],
    elementsentreeusinage:[],
    fieldsdetails:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barres' }, 
      { key: 'sequence', label: 'Séquence n°'},
      {key : 'numcolis', label :'N° du colis'},
      {key : 'essence', label :'Essence'},
      {key : 'volume', label :'Volume'},
      {key : 'superfice', label :'Superficie'},
      {key : 'poids', label :'poids'},
    ],
    elementsdetails:[],
    fieldspieces:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Codes barres' }, 
      { key: 'longueur', label: 'Longueur(m)'},
      {key : 'largeur', label :'Largeur(cm)'},
      {key : 'epaisseur', label :'épaisseur(cm)'},
      {key : 'nbpiece', label :'Nb pièces'},
      {key : 'volume', label :'volume'},
      {key : 'superficie', label :'Superficie'},
      {key : 'poids', label :'poids'}
    ],
    elementspieces:[],
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
    itemsentreeusinage(){
      return this.elementsentreeusinage.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdetails(){
      return this.elementsdetails
    },
    itemspieces(){
      return this.elementspieces.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    volumetotal(){
      let vt =this.itemspieces.reduce(function(prev, cur) {
        return prev + cur.volume;
      }, 0);
      if(!php.empty(vt)){
        return vt.toFixed(3)
      }
      else{
        return 0
      }
    },
    superficietotale(){
      let st =this.itemspieces.reduce(function(prev, cur) {
        return prev + cur.superficie;
      }, 0);
      if(!php.empty(st)){
        return st.toFixed(3)
      }
      else{
        return 0
      }
    },
    poidstotal(){
      let pt=this.itemspieces.reduce(function(prev, cur) {
        return prev + cur.poids;
      }, 0);
      if(!php.empty(pt)){
        return pt.toFixed(3)
      }
      else{
        return 0
      }
    }
  },
  watch:{
    elementsdetails(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTabledetailslot'].selectRow(0) }, 200);
      }
    },
    elementspieces(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTablePieces'].selectRow(0) }, 200);
      }
    }
  },
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },

    rowClassDetails(item, type) {
      if(item !=''&&item!=null){
        return 'table-row-info'
      }else{
        return 
      }
    },
    fermer(){ this.$router.back();},
    async getDetailsLotproduction() {
      this.showOverlay = true
      this.lotproduction = await this.$transformation.get('productions/' +this.$route.params.id).then(response => response.data.result)
      if(!php.empty(this.lotproduction.usinage)){
        this.elementsentreeusinage = this.lotproduction.usinage
      }
      this.elementsdetails=this.lotproduction.details
      this.elementsdetails = this.elementsdetails.map(elt => {
        elt.volume = elt.volume!=''? elt.volume.toFixed(3): 0
        return elt
      })
      /* this.entreUsinage.volgrumes = this.elements.reduce(function(prev, cur) {
        return prev + cur.volume;
      }, 0);
      this.entreUsinage.nbgrumes = this.entreUsinage.details.length
      console.log('données ',this.entreUsinage);*/
      this.showOverlay = false
    },
    onRowSelectedDetails(items){
      console.log('items ',items);

      if(!php.empty(items)){
        this.elementspieces = items[0].pieces
      }
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
    this.getDetailsLotproduction()
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