<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
      <div>
        <tab-head 
            :toggleSideBar="toggleSideBar"
            :fermer="fermer"
            title="Consultation Ligne de transformation"     
        />
      </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="3">
            <P> Unité de transformation :  <strong>{{ ligneTransformation.uniteproduction }}</strong>
            </P>
          </b-col>
          <b-col cols="3">
            <P> Type de transformation : <strong>{{ ligneTransformation.typeTransformation }}</strong> </P>
          </b-col>
          <b-col cols="3">
            <p> Nom de la ligne : <strong> {{ ligneTransformation.intitule }}</strong> </p>
          </b-col>
          <b-col cols="3" v-if="ligneTransformation.description!=''&&ligneTransformation.description!=null">
            <p> Description : 
              <span>{{ ligneTransformation.description }} </span>
            </p>
          </b-col>
          <b-col cols="3">
            <p> Statut: 
              <b-badge v-if="ligneTransformation.statut=='0'" pill variant="primary">Brouillon</b-badge>
              <b-badge v-else-if="ligneTransformation.statut=='1'" pill variant="secondary">Soumis</b-badge>
              <b-badge v-else-if="ligneTransformation.statut=='2'" pill variant="success">Validé</b-badge>
              <b-badge v-else-if="ligneTransformation.statut=='3'" pill variant="danger">Rejeté</b-badge>
            </p>
          </b-col>
        </b-row>
      </b-card>
      <!--entete des tableaux -->
      <div class="m-0 px-2 table-header-border">
        <b-row>
          <b-col>
            <h4 class="tab-header-left-text mr-4">Tableau de rendement par essence</h4>
            <a  v-if="ligneTransformation.statut=='0'" @click.prevent="soumettreLigneTransformation"  size="sm" class="simple-link">
              <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
              soumettre
            </a>
            <a  v-if="ligneTransformation.statut=='1'&&isMinfof" @click.prevent="approuverLignetransformation"  size="sm" class="simple-link">
              <b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img>
              aprouver
            </a>
            <a  v-if="ligneTransformation.statut=='1'&&isMinfof" @click.prevent="rejeterLignetransformation"  size="sm" class="simple-link">
              <b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>
              rejetter
            </a>
            <a size="sm" class="simple-link">
              <b-img src="@/assets/images/excel.png"></b-img>
              exporter
            </a>
          </b-col>
        </b-row>
      </div>
      <!--implémentation tableau proprement dite-->
      <div class="ml-1" style="width:99%">
        <b-table
          :busy="isBusy"
          hover
          select-mode="single"
          responsive="sm"
          ref="selectableTable"
          selectable
          :items="ligneTransformation.essences"
          :fields="fields"
          :tbody-tr-class="rowClass"
        >


          <template #table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong class="ml-1">chargement...</strong>
            </div>
          </template>

          <template #cell(nomusuel)="data">
            <!--<b-form-input
              size="sm"
              v-model="data.item.nomusuel"
              class="m-0 py-0 ml-1 px-1 form-control-xs"
              disabled
              style="width:30%"
            ></b-form-input>-->
            <input type="text" v-model="data.item.nomusuel" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
          </template>
          <template #cell(rendement)="data">
            <input type="text" v-model="data.item.rendement" class="form-control-xs m-1 w-75" :class="{'bgGreen': data.item.isEven,  'bgWhite': data.item.isOdd}" style="border: 1px solid white;">
          </template>
        </b-table>

      </div>
    </b-overlay>
    <transformation-box ref="transformationDialogue"></transformation-box>
  </div>
</template>

<script>
  import TransformationBox from '@/components/utils/transformation/ConfirmBoxDetail.vue';
const php = require("phpjs");
import { mapGetters } from 'vuex'

export default {
  name: "detail-ligne-transformation",
  components:{
    TransformationBox
  },
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
  data: () => ({

    ligneTransformation:{},
    showOverlay:false,
    isBusy:false,
    fields: [ 
      { key: 'nomusuel', label: 'Nom usuel',thStyle: { width: "80%" } }, 
      { key: 'rendement', label: 'Rendement(%)',thStyle: { width: "20%" }}  
    ],
    elements:[]
  }),
  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },

  methods: {
    rowClass(item, type) {
      if (item != "" && item != null) {
        if (item.isEven) return "table-row-other";
        if (!item || type !== "row") return "table-info";
      } else {
        return;
      }
    },
    approuverLignetransformation(){
      this.alertBeforeact('1')
    },
    rejeterLignetransformation(){
      this.alertBeforeact('2')
    },
    soumettreLigneTransformation(){
      this.alertBeforeact('3')
    },
    async alertBeforeact(commande){
      let title, message=''
      if(commande=='1'){
        title='approbation'
        message='ètes-vous sur de vouloir approuver cette ligne ?'
      }
      else if(commande=='2'){
        title='rejet'
        message='ètes-vous sur de vouloir rejetter cette ligne ?'

      }
      else if(commande=='3'){
        title='Soumission'
        message='ètes-vous sur de vouloir soumettre cette ligne ?'

      }
      const ok = await this.$refs.transformationDialogue.show({
               commande:'ligne de transformation',
               title: title,
               message:message,
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              if(commande=='1'){
                this.showOverlay = true;
                this.$transformation.patch('lignes-transformation/'+this.ligneTransformation.idligne+'/approuver').then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getDetailLigneTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              else if(commande=='2'){
                this.showOverlay = true;
                this.$transformation.patch('lignes-transformation/'+this.ligneTransformation.idligne+'/rejeter').then(response => {
                    App.notifySuccess(response.data.message)
                    return this.getDetailLigneTransformation();
                }).catch(error => {
                    this.showOverlay = false
                    return this.errorHappened(error.response.data)
                }) 
              }
              else if(commande=='3'){
                this.showOverlay = true;
                this.$transformation.patch('lignes-transformation/'+this.ligneTransformation.idligne+'/soumettre').then(response => {
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
    /*soumettreLigneTransformation(){
      this.showOverlay = true;
      this.$transformation.patch('lignes-transformation/'+this.ligneTransformation.idligne+'/soumettre').then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailLigneTransformation();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
    },*/
    fermer(){ this.$router.back() },
    async getDetailLigneTransformation(){
      this.showOverlay = true
      this.ligneTransformation = await this.$transformation.get('lignes-transformation/' +this.$route.params.id).then(response => response.data.result)
      //this.items.push(this.entreUsinage.details)
      console.log('this.ligneTransforamtion',this.ligneTransformation)
      this.elements=this.ligneTransformation.essences
      if(!php.empty(this.elements)){
        this.elements = this.elements.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
        return a;
        });
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
    this.getDetailLigneTransformation()
  },
};
</script>
<style>
.simple-link{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
  cursor:pointer;
}
.simple-link:hover{
  color:#82C138;
}
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  #toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
</style>