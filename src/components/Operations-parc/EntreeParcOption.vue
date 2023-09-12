<template>
    <div id="coverOp">
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
        
      </div>
        <b-row class="py-1">
          <b-col cols="4">
            <P> site: <strong>{{ entreeParc.site }}</strong></P><br>
          </b-col>
          <b-col cols="3">
            <P> Date opération: <strong>{{entreeParc.dateoper}}</strong> </P><br>
          </b-col>
          <b-col cols="3">
            <p> Heure: <strong>{{entreeParc.heureoper}}</strong> </p><br>
          </b-col>
        </b-row>
    </div>
      <!--entete des tableaux -->
      <div class="m-0 px-2 table-header-border">
        <b-row>
          <b-col><h4 class="tab-header-left-text mb-0"> Liste des produits </h4>
          <a href="#" class="m-0 p-0" style="color:#82C138">Exporter les produits</a></b-col>
        </b-row>
      </div>
      <!--implémentation tableau proprement dite-->
      <div class="ml-1" style="width:90%">
        <b-table sticky-header="400px"  :busy="isBusy" hover select-mode="single" responsive="sm" :items="items"  :fields="fieldsProduits" :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(validite)><span class="d-flex justify-content-around" style="color:green"><span class="mt-1 d-flex justify-content-between align-content-between">Validité</span><custom-select :setWidth="selectWidht" :options="options" :default="'valide'" class="select" /> </span></template>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(reference)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(lignedf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>

                <template #table-busy>
                    <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                    </div>
                </template>
                <template #empty>
                <h4 style="color:green" class="text-center">Aucun<span class="font-weight-bold">Produit</span> trouvé!!</h4>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(validite)>
                  <span style="display: flex;justify-content: center;align-items: center;" ><b-form-checkbox  checked="true" disabled></b-form-checkbox></span>
                </template> 
                <template #cell(codebarre)="data">
                  <input type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="background:#82C138; border: 1px solid white;">
                </template> 
                <template #cell(reference)="data">
                  <input type="text" v-model="data.item.reference" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template> 
                <template #cell(lignedf10)="data">
                  <input type="text" v-model="data.item.lignedf10" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template> 
                <template #cell(nomcommercial)="data">
                  <input type="text" v-model="data.item.nomcommercial" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
                </template> 
        </b-table>
        <b-button @click.prevent="postdata" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Valider 
            <b-spinner v-if="submitted" small></b-spinner>
        </b-button>
      </div>
    </b-overlay>
    <error-dialogue ref="errorDialogue"></error-dialogue>

  </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import ErrorDialogue from '@/components/utils/AlertBox.vue';

export default {
  name: "option_entree_parc",
  props: {
    idoperation: {type: Number, required: true},
    action: {type: String, required: true},
  },
  components:{
    ErrorDialogue
  },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    entreeParc:{},
    selectWidht:"w-50",
     fieldsProduits: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "validite", label: "", thStyle: { width: "20%" } },{ key: "codebarre", label: "Code à barres" },
        { key: "reference", label: "Reférence code barre" }, { key: "lignedf10", label: "Ligne DF 10" }, { key: "nomcommercial", label: "Nom commercial" },
     ],
      itemsProduits:[],
    submitted:false,
    options:["valide"],
    selected:{},
  }),
  computed:{
    items() { 
      if(php.empty(this.itemsProduits)){
        return []
      }
      return this.itemsProduits.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },
    otherItems(){ return }
  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'custo-bg_detail_-table_element'
      if (item.isOdd) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  async getDetailsEntreeParc() {
    this.showOverlay = true
    this.entreeParc = await this.$operationParc.get('entrees-parc/' +this.idoperation).then(response => response.data.result.items)
    console.log('date',this.entreeParc.dateoper);
    if(this.entreeParc.dateoper!=null&&this.entreeParc.dateoper!=''){
      this.entreeParc.dateoper=this.entreeParc.dateoper.split('T')[0].replace(/-/g, "/")
    }
    if(this.entreeParc.heureoper!=null&&this.entreeParc.heureoper!=''){
      this.entreeParc.heureoper=this.entreeParc.heureoper.split('T')[1]
       this.entreeParc.heureoper=this.entreeParc.heureoper.split('.')[0]
    }
    console.log('entree choisie',this.entreeParc);
    this.itemsProduits=this.entreeParc.produits
    this.showOverlay = false
  },
  postdata(){
    this.submitted = true; 
    if(this.action=='validate'){
        this.$operationParc.put('entrees-parc/valider/'+this.idoperation).then(response => {
        this.submitted = false; 
        this.$emit('validationOk')
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return this.errorHappened(error)
        })
    }
    if(this.action=='submit'){
        this.$operationParc.put('entrees-parc/soumettre/'+this.idoperation).then(response => {
        this.submitted = false; 
        this.$emit('soumissionOk')
            return App.notifySuccess(response.data.message)
        }).catch(error => {
            this.submitted = false
            return this.errorHappened(error)
        })
    }
    
  },
  async errorHappened(error) {
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: "erreur interne interne du serveur",
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


 },
 
  mounted() {
    this.getDetailsEntreeParc();
  }
  }

</script>
<style scoped>



#coverOp {
    background-image: url("~@/assets/images/logo_sigif_trame.png");
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
   /* height: 100vh;*/
}






/*edti style par defaut btn-bootstrap au disable*/

</style>
<style>
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  .bgGreen{
    background-color:#82C138;
  }
  .bgWhite{
    background-color:#fff;
  }

</style>