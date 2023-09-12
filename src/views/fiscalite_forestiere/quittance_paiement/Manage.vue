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
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Rechercher</li></ul></b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                      label="Date"
                      label-cols="2"
                      label-align="right"
                    >
                      <calendar style="height:calc(1em + .400rem + 1px)" v-model="search.date" :format="format" :clear-button="clear"  :pane="1"></calendar>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                      label="Montant"
                      label-cols="6"
                      label-align="right"
                    >
                            <vue-numeric style="height:calc(1em + .800rem + 1px)" size="normal" name="montant" :minus="false" class="form-control" required separator=" " v-model="search.montant"></vue-numeric>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                      label="Compris entre"
                      label-cols="6"
                      label-align="right"
                    >
                            <vue-numeric style="height:calc(1em + .800rem + 1px)" size="normal" name="montant" :minus="false" class="form-control" required separator=" " v-model="search.montantmin"></vue-numeric>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                      label="Et"
                      label-cols="6"
                      label-align="right"
                    >
                            <vue-numeric style="height:calc(1em + .800rem + 1px)" size="normal" name="montant" :minus="false" class="form-control" required separator=" " v-model="search.montantmax"></vue-numeric>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="3">
                    <b-form-group
                      label="Du"
                      label-cols="2"
                      label-align="right"
                    >
                      <calendar style="height:calc(1em + .400rem + 1px)" v-model="search.periodedebut" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3">
                    <b-form-group
                      label="Au"
                      label-cols="3"
                      label-align="right"
                    >
                    <calendar style="height:calc(1em + .400rem + 1px)" v-model="search.periodefin" :format="format" :clear-button="clear" :placeholder="placeholderdfin" :pane="1"></calendar>
                    </b-form-group>
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
              <b-col><h4 class="tab-header-left-text"> Liste des quittances de paiement</h4></b-col>
              <b-col class="col-md-auto">
                <b-button size="xs" @click.prevent="showDetail">Détails</b-button>
                <b-button :disabled="!canCreatedQuittancePaiement" @click.prevent="createQuittance" size="sm" :class="{'change-image-opacity': !canCreatedQuittancePaiement,  'not-change-image-opacity': canCreatedQuittancePaiement}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button @click.prevent="" :disabled="!canUpdateQuittancePaiement" size="sm" :class="{'change-image-opacity': !canUpdateQuittancePaiement,  'not-change-image-opacity': canUpdateQuittancePaiement}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateQuittancePaiement}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button :disabled="!canDeleteQuittancePaiement" size="sm" :class="{'change-image-opacity': !canDeleteQuittancePaiement,  'not-change-image-opacity': canDeleteQuittancePaiement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteQuittancePaiement}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button :disabled="!canViewDetailsQuittancePaiement" size="sm" :class="{'change-image-opacity': !canViewDetailsQuittancePaiement,  'not-change-image-opacity': canViewDetailsQuittancePaiement}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsQuittancePaiement}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
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
          <b-row>
            <b-col cols="6">
              <!--implémentation tableau deuxieme partie proprement dite-->
              <div class="ml-1">
                  <b-table  :busy="isBusy" hover  select-mode="single" responsive ref="selectableTableTitres" selectable @row-selected="onRowSelectedTitres"
                    :items="itemsTitres" 
                    :fields="fieldsTitres" 
                    :tbody-tr-class="rowClass" >
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(actif)>
                        <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                    </template>
                    <template #cell(estcemac)="data">
                        <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                        <span v-else></span>
                    </template>
                  </b-table>

              </div>
            </b-col>
            <b-col>
          <!--implémentation tableau troisieme partie proprement dite-->
          <div class="ml-1 mr-1 w-90">
              <b-table  :busy="isBusy" hover  select-mode="single"  responsive ref="selectableTableBeneficiaires" selectable @row-selected="onRowSelected"
                :items="itemsBeneficiaires" 
                :fields="fieldsbeneficiaires" 
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

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import Calendar from 'vue2-slot-calendar';
  import VueNumeric from 'vue-numeric';
  import { mapGetters } from 'vuex'
export default {
  name: "quittance_paiement",
  components:{
    Calendar,VueNumeric
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
    dataquittances: [
				{
					intitule:"bois legal cameroun",
					date: "2021-05-12T23:00:00.000+00:00",
					numquittance: 407,
					montantpaye:45000000,
					statut: "approuvé",
					quittances:[
						{
							numtitre:2000,
							naturetaxe:"RF",
							numtr:"1659",
							montant:31500000,
							montandu:0,
							montanttr:31500000,
							beneficiaires:
							[
								{
								  beneficiaire:"Etat du Cameroun",
								  arrondissement:"",
								  montantpart:31500000,
								  uniteur:"",
								  valeurur:50
								},
								{
								  beneficiaire:"Feicom",
								  arrondissement:"",
								  montantpart:5670000,
								  uniteur:"",
								  valeurur:18
								},
								{
								  beneficiaire:"Communes",
								  arrondissement:"Abong-mbang",
								  montantpart:8505000,
								  uniteur:"",
								  valeurur:30000
								},
							]
						},
						{
							numtitre:2000,
							naturetaxe:"RF",
							numtr:"1660",
							montant:13500000,
							montandu:18000000,
							montanttr:31500000,
							beneficiaires:
							[]
						},
						
					],
				
				}
			 ],
    dataTitres:[],
    beneficiaires:[],
        
    //données du tableaux
    fields: [
        { key: 'intitule', label: 'Intitulé',thStyle: { width: "16%" }  },
        { key: 'date', label: 'Date',thStyle: { width: "9%" } },
        { key: 'numquittance', label: 'Numquittance' }, 
        { key: 'montantpaye', label: 'Montant payé' }, 
        { key: 'statut', label: 'Statut' },
    ],
    fieldsTitres: [
      { key: 'numtitre', label: 'No titre',thStyle: { width: "10%" } },
      { key: 'naturetaxe', label: 'Nature taxe',thStyle: { width: "15%" } },
      { key: 'numtr', label: 'N° TR',thStyle: { width: "10%" } },
      { key: 'montant', label: 'Montant Payé',thStyle: { width: "20%" } },
      { key: 'montandu', label: 'Montant dû',thStyle: { width: "22%" }}, 
      { key: 'montanttr', label: 'Montant TR',thStyle: { width: "23%" } }
    ],
    fieldsbeneficiaires: [
        { key: 'beneficiaire', label: 'Beneficiare',thStyle: { width: "26%" } },
        { key: 'arrondissement', label: 'Arrondissement',thStyle: { width: "28%" } },
        { key: 'montantpart', label: 'Montantpart',thStyle: { width: "28%" } },
        { key: 'uniteur', label: 'UniteUR',thStyle: { width: "20%" } },
        { key: 'valeurur', label: 'valeur',thStyle: { width: "15%" } },
    ],

    elements: [
    ],

    selected:{},

    // Données de la recherche
    search:{
      operateur:"",
      date:"",
      montant:"",
      montantmin:"",
      montantmax:"",
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
  dataquittances(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
    }
  },
  dataTitres(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableTitres'].selectRow(0) }, 200);
      }
  }
 },
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreatedQuittancePaiement(){return true; this.hasAccess('CREER_QUITTANCE_PAIEMENT')},
    canUpdateQuittancePaiement(){this.hasAccess('MODIFIER_QUITTANCE_PAIEMENT')},
    canDeleteQuittancePaiement(){this.hasAccess('SUPPRIMER_QUITTANCE_PAIEMENT')},
    canViewDetailsQuittancePaiement(){this.hasAccess('CONSULTER_QUITTANCE_PAIEMENT')},
    canSubmitQuittancePaiement(){this.hasAccess('SOUMETTRE_QUITTANCE_PAIEMENT')},

    items() { 
      return this.dataquittances.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsTitres(){
      return this.dataTitres.map((a, index) =>{
        a.isFirst = index=0
        a.isEven = index%2==0
        return a
      })
    },
    itemsBeneficiaires(){
      return this.beneficiaires.map((a, index) =>{
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
    this.dataquittances.map(elt =>{
      elt.intitule = elt.intitule == null ? "" : elt.intitule.substring(0, 15) + '...'
      elt.date = elt.date !==null ? this.$dayjs(elt.date).format('DD/MM/YYYY') :""
      elt.montantpaye = elt.montantpaye == null ? "" : parseFloat(elt.montantpaye).toFixed(2)
      elt.montantpaye = elt.montantpaye == null ? "" : this.commify(elt.montantpaye)
      return elt;
    })
  },
  formatContentDataTitres(){
    this.dataTitres.map(elt =>{
      elt.montant = elt.montant == null ? "" : parseFloat(elt.montant).toFixed(2)
      elt.montant = elt.montant == null ? "" : this.commify(elt.montant)

      elt.montandu = elt.montandu == null ? "" : parseFloat(elt.montandu).toFixed(2)
      elt.montandu = elt.montandu == null ? "" : this.commify(elt.montandu)
      elt.montant = elt.montant == null ? "" : parseFloat(elt.montant).toFixed(2)
      elt.montanttr = elt.montanttr == null ? "" : parseFloat(elt.montanttr).toFixed(2)
      elt.montanttr = elt.montanttr == null ? "" : this.commify(elt.montanttr)
      return elt;
    })
  },
  formatContentDataBeneiciaires(){
    this.beneficiaires.map(elt =>{
      elt.montantpart = elt.montantpart == null ? "" : parseFloat(elt.montantpart).toFixed(2)
      elt.montantpart = elt.montantpart == null ? "" : this.commify(elt.montantpart)+' XAF'

      elt.valeurur = elt.valeurur == null ? "" : parseFloat(elt.valeurur).toFixed(2)
      elt.valeurur = elt.valeurur == null ? "" : this.commify(elt.valeurur)


      return elt;
    })
  },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.isRowselected=true
        this.selected = items
  },
  onRowSelectedTitres(items){
    console.log('row selected',items);
    if(!php.empty(items)){
      this.beneficiaires = items[0].beneficiaires
      this.formatContentDataBeneiciaires();
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

 },
 

  mounted(){
    this.dataTitres=this.dataquittances[0].quittances
    console.log('datatitr',this.dataTitres);
    this.formatContentData();
    this.formatContentDataTitres();
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