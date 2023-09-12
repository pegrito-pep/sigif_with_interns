<template>
    <div id="cover" class="min-vh-100">
          <div>
            <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                     <b-row>
                    <b-col cols="3">
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="Operateur" v-model="search.operateur"/>
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="Montant" v-model="search.montant"/>
              <!-- <b-row>
                        <b-col cols="4"><span class="font-weight-bold">statut</span></b-col>
                        <b-col>
                            <select v-model="search.statut" class="" style="font-size:1rem; width: 80%; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in permis" :value="status.key" :key="i" >
                              {{ status.libelle }}
                            </option>
                          </select>
                        </b-col>
                  </b-row> -->
                      <b-form-group  class="m-0 p-0">

                            
                      </b-form-group>
                    </b-col>
                    <b-col cols="5" class="ml-2 d-flex">
                       <label for="">Periode allant de</label>
                          <b-row class="m-0">
                            <b-col>
                                <calendar v-model="search.periodedebut" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                            </b-col>
                            <b-col>
                                <calendar v-model="search.periodefin" :format="format" :clear-button="clear" :placeholder="placeholderdfin" :pane="1"></calendar>
                            </b-col>
                          </b-row>
                       <label for="">Compris entre</label>
                          <b-row class="m-0">
                            <b-col>
                                <calendar v-model="search.datedebut" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                            </b-col>
                            <b-col>
                                <calendar v-model="search.datefin" :format="format" :clear-button="clear" :placeholder="placeholderdfin" :pane="1"></calendar>
                            </b-col>
                          </b-row>
                        </b-col>
                    <b-col cols="3" class="ml-2 d-flex">
                       <label for="">Date</label>
                       <calendar v-model="search.date" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                    </b-col>
                  </b-row>
                  <b-row align-h="end">
                    <b-col cols="2">
                        <search-bar-actions-buttons-new />
                    </b-col>
                  </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des Enregistrements de bois réelement exportés</h4></b-col>
              <b-col class="col-md-auto">
                <b-button size="xs" @click.prevent="showDetail">Détails</b-button>
                <b-button :disabled="!canCreatedQuittancePaiement" @click.prevent="createQuittance" size="sm" :class="{'change-image-opacity': !canCreatedQuittancePaiement,  'not-change-image-opacity': canCreatedQuittancePaiement}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateQuittancePaiement" size="sm" :class="{'change-image-opacity': !canUpdateQuittancePaiement,  'not-change-image-opacity': canUpdateQuittancePaiement}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateQuittancePaiement}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteQuittancePaiement" size="sm" :class="{'change-image-opacity': !canDeleteQuittancePaiement,  'not-change-image-opacity': canDeleteQuittancePaiement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteQuittancePaiement}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button @click.prevent="showDetailsBoisExp" :disabled="!canViewDetailsQuittancePaiement" size="sm" :class="{'change-image-opacity': !canViewDetailsQuittancePaiement,  'not-change-image-opacity': canViewDetailsQuittancePaiement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsQuittancePaiement}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canSubmitQuittancePaiement" size="sm" :class="{'change-image-opacity': !canSubmitQuittancePaiement,  'not-change-image-opacity': canSubmitQuittancePaiement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitQuittancePaiement}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <b-row> 
            <b-col>           
              <!--implémentation tableau premiere partie proprement dite-->
              <div class="ml-1" style="width:60%">
                  <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                    :items="items" 
                    :fields="fields" 
                    :tbody-tr-class="rowClass" >
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template v-slot:head(date)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                    </template>
                    <template v-slot:head(numquittance)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                    </template>
                    <template #cell(date)="data">
                      <span class="d-flex justify-content-center align-items-center">{{ data.item.date }} </span>
                    </template>
                    <template #cell(numquittance)="data">
                      <span class="d-flex justify-content-center align-items-center">{{ data.item.numquittance }} </span>
                    </template>
                  </b-table>

              </div>
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-between">
            <b-col cols="4">
              <!--implémentation tableau deuxieme partie proprement dite-->
              <div class="ml-1" style="overflow-x:auto;position: relative; width: 550px;">
        
                  <b-table style="position: relative; width: 955px;" :busy="isBusy" hover  select-mode="single" responsive ref="selectableTableBses" selectable @row-selected="onRowSelectedBse"
                    :items="itemsBses" 
                    :fields="fieldsBses" 
                    :tbody-tr-class="rowClass" >
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>

                  </b-table>

              </div>
            </b-col>
            <b-col cols="7">
          <!--implémentation tableau troisieme partie proprement dite-->
              <div class="ml-1" style="overflow-x:auto;position: relative; width: 600px;">
                <b-table style="position: relative; width: 955px;"  :busy="isBusy" hover  select-mode="single"  responsive ref="selectableTableDetailsBses" selectable @row-selected="onRowSelected"
                    :items="itemsdetailsBses" 
                    :fields="fieldsdetailsbses" 
                    :tbody-tr-class="rowClass" show-empty>
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template #empty>
                      <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold"> donnée</span> trouvé!!</h4>
                    </template>
                    <template #cell(arrondissement)="data">
                      <b-form-input disabled size="xs" class="w-75" style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.arrondissement"></b-form-input>
                    </template>
                    <template #cell(uniteur)="data">
                      <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.uniteur"></b-form-input>
                    </template>
                    <template #cell(valeurur)="data">
                      <b-form-input disabled size="xs" style="font-size:.75rem !important;font-weight: 300;" v-model="data.item.valeurur"></b-form-input>
                    </template>
                </b-table>
              </div>
        </b-col>
      </b-row>
      <api-unreachable ref="apiunreacheable"/>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import Calendar from 'vue2-slot-calendar';
  import { mapGetters } from 'vuex'
  import ApiUnreachable from '@/components/utils/ImportFIle.vue';

export default {
  name: "quittance_paiement",
  components:{
    Calendar,
    ApiUnreachable
  },
  data: () => ({
  

    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    dataBoisexportes: [
				{
					numenregistrement:"17",
					dateenregistrement: "2021-05-14T23:00:00.000+00:00",
					statut: "soumis",
					bses:[
						{
							datedepart:"2021-05-25T23:00:00.000+00:00",
							montantdroit:"1542",
							montantse:"47859",
							codebarrebse:'W9M1VO2T',
							nomexportateur:'BOIS LEGAL CAMEROUN',
							sigle:'BLC',
							portexportateur:'PORT DE DOUALA',
							detailsbse:
							[
								{
								  codebarrebse:"W9M1VO2T",
								  codebarre:"LES4PXT0",
								  volume:2.551,
								  poids:0,
								  nomessence:'Tali',
								  codecemac:1346,
								  codesh:'1346',
								},
                {
								  codebarrebse:"W9M1VO2T",
								  codebarre:"LESFQMR3",
								  volume:2.434,
								  poids:0,
								  nomessence:'Tali',
								  codecemac:1346,
								  codesh:'1346',
								}
								
							]
						},
					],
				
				},
        {
          numenregistrement:"18",
					dateenregistrement: "2021-05-16T23:00:00.000+00:00",
					statut: "soumis",
          bses:[
						{
							datedepart:"2021-05-25T23:00:00.000+00:00",
							montantdroit:"1542",
							montantse:"47859",
							codebarrebse:'W9M1VO2T',
							nomexportateur:'BOIS LEGAL CAMEROUN',
							sigle:'BLC',
							portexportateur:'PORT DE DOUALA',
							detailsbse:[]
						},
					]
        }
    ],
    dataBses:[],
    detailsBses:[],
        
    //données du tableaux
    fields: [
        { key: 'numenregistrement', label: 'N° Enregistrement' },
        { key: 'dateenregistrement', label: 'Date  enregistrement'},
        { key: 'statut', label: 'Statut' },
    ],
    fieldsBses: [
      { key: 'datedepart', label: 'Date départ',thStyle: { width: "11%" } },
      { key: 'montantdroit', label: 'Montant droits',thStyle: { width: "16%" } },
      { key: 'montantse', label: 'Montant SE',thStyle: { width: "14%" } },
      { key: 'codebarrebse', label: 'Codebarre BSE',thStyle: { width: "16%" } },
      { key: 'nomexportateur', label: 'Nom exportateur',thStyle: { width: "18%" }}, 
      { key: 'sigle', label: 'Sigle',thStyle: { width: "5%" } },
      { key: 'portexportateur', label: 'Port exportation',thStyle: { width: "31%" } }
    ],
    fieldsdetailsbses: [
        { key: 'codebarrebse', label: 'Codebarre BSE',thStyle: { width: "15%" } },
        { key: 'codebarre', label: 'Codebarre',thStyle: { width: "15%" } },
        { key: 'poids', label: 'Poids',thStyle: { width: "28%" } },
        { key: 'nomessence', label: 'Nom Essence',thStyle: { width: "20%" } },
        { key: 'codecemac', label: 'Code CEMAC',thStyle: { width: "12%" } },
        { key: 'codesh', label: 'Code SH',thStyle: { width: "12%" } },
    ],

    elements: [
    ],

    selected:{},

    // Données de la recherche
    search:{
      operateur:"",
      date:"",
      montant:"",
      periodedebut:"",
      periodefin:"",
      datedebut:"",
      datefin:"",
    },
    /*propirétés du calendar*/
    format:"yyyy-MM-dd",
    clear:true,
    placeholderddebut:"date de début",
    placeholderdfin:"date de fin",
    value:"",
    title:"Création quittance de paiement",
    
  }),
 watch:{
  detailsBses(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTableDetailsBses'].selectRow(0) }, 200);
    }
  },
  dataBses(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableBses'].selectRow(0) }, 200);
      }
  }
 },
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreatedQuittancePaiement(){return true; this.hasAccess('CREER_QUITTANCE_PAIEMENT')},
    canUpdateQuittancePaiement(){this.hasAccess('MODIFIER_QUITTANCE_PAIEMENT')},
    canDeleteQuittancePaiement(){this.hasAccess('SUPPRIMER_QUITTANCE_PAIEMENT')},
    canViewDetailsQuittancePaiement(){ return true; this.hasAccess('CONSULTER_QUITTANCE_PAIEMENT')},
    canSubmitQuittancePaiement(){this.hasAccess('SOUMETTRE_QUITTANCE_PAIEMENT')},

    items() { 
      return this.dataBoisexportes.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsBses(){
      return this.dataBses.map((a, index) =>{
        a.isFirst = index=0
        a.isEven = index%2==0
        return a
      })
    },
    itemsdetailsBses(){
      return this.detailsBses.map((a, index) =>{
        a.isFirst = index=0
        a.isEven = index%2==0
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
     ...mapGetters(['user'])
  },
 
 methods: {
  async showDialogueBox(){
    const ok = await this.$refs.apiunreacheable.show({
              title: 'Information',
              message: 'API NON JOIGNABLE',
              okButton:'VALIDER',
              cancelButton: 'Fermer', 
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
              this.$refs.codebarreinfo._close();
            }
  },
  showDetail(){
    this.$router.push({name:"detail_quittance-paiement"})
  },
  createQuittance(){
    this.$router.push({ name: "create-quittance-paiement" });
  },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  formatContentData(){
    this.dataBoisexportes.map(elt =>{
      //elt.intitule = elt.intitule == null ? "" : elt.intitule.substring(0, 15) + '...'
      elt.dateenregistrement = elt.dateenregistrement !==null ? this.$dayjs(elt.dateenregistrement).format('DD/MM/YYYY') :""
     /* elt.montantpaye = elt.montantpaye == null ? "" : parseFloat(elt.montantpaye).toFixed(2)
      elt.montantpaye = elt.montantpaye == null ? "" : this.commify(elt.montantpaye)*/
      return elt;
    })
  },
  formatContentDataBse(){
    this.dataBses.map(elt =>{
      elt.datedepart = elt.datedepart !==null ? this.$dayjs(elt.datedepart).format('DD/MM/YYYY') :""
      elt.montantdroit = elt.montantdroit == null ? "" : parseFloat(elt.montantdroit).toFixed(2)
      elt.montantse = elt.montantse == null ? "" : this.commify(elt.montantse)
      elt.montantse = elt.montantse == null ? "" : parseFloat(elt.montantse).toFixed(2)

      elt.nomexportateur = elt.nomexportateur == null ? "" : elt.nomexportateur.substring(0, 15) + '...'
      return elt;
    })
  },


  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.isRowselected=true
        this.selected = items
  },
  onRowSelectedBse(items){
    console.log('row selected',items);
    if(!php.empty(items)){
      this.detailsBses = items[0].detailsbse
      //this.formatContentDataBeneiciaires();
    }
    
  },

  getRequestParams(page, pageSize){
      let params= {
        page: 0,
        size: pageSize || 10
      };
      if(page && page > 0) {
        params.page= page -1
      }
      return params;
  },
  changePage(page) {
    this.currentPage = page
    this.getPays()
  },
 //fonction de parse d'un montant
  commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : " ");
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
      actionButton.innerHTML = '<i class="fa fa-arrow-right fa-1x" style="font-size: 18px"></i>';

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
      
      actionButton.innerHTML = '<i class="fa fa-arrow-left" style="font-size: 18px"></i>';
    }
  },
  showDetailsBoisExp(){
    this.$router.push({name: 'bois_exporte-detail'})
  }

 },
 

  mounted(){
    this.dataBses=this.dataBoisexportes[0].bses

    this.formatContentData();
    this.formatContentDataBse();
    setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    

    //*this.formatContentDataTitres();*/
  }
  }

</script>
<style scoped>
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