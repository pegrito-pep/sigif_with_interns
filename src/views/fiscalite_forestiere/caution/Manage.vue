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
              <b-card class="b-card mt-0">
                <b-row>
                  <b-col cols="3">
                  <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="Montant" v-model="search.Montant"/>
                  <sigif-form-group class="mt-4" :sizeLabel="4" :sizeLabelLg="4" label="Caution no" v-model="search.Cautionno"/>
                  <sigif-form-group class="mt-4" :sizeLabel="4" :sizeLabelLg="4" label="Exercice" v-model="search.Exercice"/>
                  </b-col>
                  <b-col cols="3">
                  <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="Compris entre" v-model="search.Comprisentre"/>
                  <sigif-form-group class="mt-4" :sizeLabel="4" :sizeLabelLg="4" label="Emetteur" v-model="search.Emetteur"/>
                  <sigif-form-group class="mt-4" :sizeLabel="4" :sizeLabelLg="4" label="Et" v-model="search.Et"/>
                  </b-col>

                  <b-col cols="3">
                      <!--<p class="w-100 p-0 m-0">Periode de cautions</p>-->
                      <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Période du</label><date-picker  v-model="search.datedeb"   format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100 mt-0" :clearable="false" /></b-col>
                      <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Au</label><date-picker  v-model="search.datefin"  format="dddd, DD MMMM YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100 mt-3" :clearable="false"/></b-col>
                      <!-- date de Signature -->
                    <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Date Signature</label><date-picker  v-model="search.datesign"   format="dddd, DD MMMM YYYY" placeholder="date de signature" valueType="YYYY-MM-DD" class="w-100 mt-3" :clearable="false" /></b-col>
                  </b-col>
                  
                  <b-col class="m-0"  style="margin-top: -20px !important">
                    
                      <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Date de validité</label><date-picker  v-model="search.datevalid"   format="dddd, DD MMMM YYYY" placeholder="date de validité" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                      <!--<p class="w-100 p-0 m-0">Periode de validité</p>-->
                      <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Date de validité comprise entre</label><date-picker  v-model="search.datevaliddeb"   format="dddd, DD MMMM YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                      <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Et le</label><date-picker  v-model="search.datevalidfin"  format="dddd, DD MMMM YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/></b-col>
                   
                   
                    <div style="width: 220px !important" class="mt-3" >
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>
                  </b-col>

                </b-row>
                
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text"> Liste des cautions</h4>
                <b-button :disabled="!canCreateCaution" @click.prevent="addCaution" size="sm" :class="{'change-image-opacity': !canCreateCaution,  'not-change-image-opacity': canCreateCaution}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <b-button :disabled="!canEditCaution" size="sm" :class="{'change-image-opacity': !canEditCaution,  'not-change-image-opacity': canEditCaution}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Modifier</b-button>
                <b-button :disabled="!canDeleteCaution" size="sm" class="mx-1 simple-btn">  
                  <b-img src="@/assets/images/iconSUPPRIMER_16x16.png" :class="{'change-image-opacity': !canDeleteCaution, 'not-change-image-opacity': canDeleteCaution,
                  }"></b-img>{{ $t("data.Supprimer") }}</b-button>
                <b-button @click.prevent="showDetails"  :disabled="!canViewdetailsCaution" class="mx-1 simple-btn"
                  ><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>{{ $t("data.Consulter") }}</b-button>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-2">
              <b-table :busy="isBusy" bordered sort-icon-left hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                       <h4 style="color:green" class="text-center">Aucune occurence de <span class="font-weight-bold">Caution</span> trouvée!!</h4>
                </template>
                <template v-slot:head(nomsignataire1)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>
                <template v-slot:head(typetitre)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>
                <template v-slot:head(numtitre)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>
                <template v-slot:head(numcaution)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>
                <template v-slot:head(nomsignataire2)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
                </template>

                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(typetitre)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.typetitre }} </span>
                </template>
                <template #cell(numtitre)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.numtitre }} </span>
                </template>
                <template #cell(numcaution)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.numcaution }} </span>
                </template>
                 <template #cell(nomsignataire1)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.nomsignataire1 }} </span>
                </template>
                <template #cell(nomsignataire2)="data">
                  <span class="d-flex justify-content-center align-items-center">{{ data.item.nomsignataire2 }} </span>
                </template>
              </b-table>
             
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>


            <!--AJOUT D'UNE CAUTION -->
          <b-modal id="modal-sm"  ref="caution-form" hide-footer  header-class="custom-bg"   header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <Caution @cautionAdded="handleAddCaution"/>
              </div>
          </b-modal>

    </div>

</template>
<script>
import Caution from "@/components/forms/fiscalite_forrestiere/CautionForm.vue";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
  const php  = require ( 'phpjs' ) ;

  import { mapGetters } from 'vuex'
export default {
  name: "cautions",
  components: {
    DatePicker,
    Caution,  
  },
  data: () => ({
    /**debut propriétes lées à l'ajout de billon */
    newBillon:{date: '', heure: ''},
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{},
    entite:{
      id:1,
      libelle:''
    },
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],
    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],

    //données du tableaux
    fields: [ 
      { key: 'exercice', label: 'Exercice' },
      { key: 'operateur', label: 'Operateur', thStyle:"width:8%" }, 
      { key: 'typetitre', label: 'Type titre', },
      { key: 'numtitre', label: 'Numtitre', }, 
      { key: 'numcaution', label: 'Num Caution', }, 
      { key: 'montant', label: 'Montant', }, 
      { key: 'emetteur', label: 'Emetteur'},
      { key: 'datesignature', label: 'Date Signature', thStyle:"width:8%"},
      { key: 'datevalidite', label: 'Date Validite', thStyle:"width:9%"},
      { key: 'nomsignataire1', label: 'Nom signataire'},
      { key: 'nomsignataire2', labal: 'Nomsignataire'},
      { key: 'statut', label: 'statut' }
      ],
    elements: [],
    selected:{},
    title:"Enregistrement de la Caution",
  }),
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {
            this.$refs.selectableTable.selectRow(0);
          }, 200);
      }
    }
  },
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateCaution(){return true;  this.hasAccess('CREER_CAUTION') },
    canEditCaution(){ this.hasAccess('MODIFIER_CAUTION') },
    canDeleteCaution(){ this.hasAccess('SUPPRIMER_CAUTION') },
    canViewdetailsCaution(){ return true; this.hasAccess('CONSULTER_CAUTION')},

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
   addCaution(){
    this.$refs['caution-form'].show()
   },
   handleAddCaution(){
    this.getCautions();
    this.$refs['caution-form'].hide();
   },
   showDetails(){ this.$router.push({name: 'detail_caution', params: { id: this.selected[0].idcaution }}); },
   rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  onRowSelected(items) {
    console.log('row selected');
    items.isSelected =true;
    this.isRowselected=true
        this.selected = items
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
    this.getBillonnages()
  },
  getCautions(){
        this.isBusy =true
        this.$fiscalite.get("cautions/list_caution").then(response => {
          console.log('response ',response);
            this.elements=response.data.result.Data
            this.total=this.elements.length
            this.elements.map( elt =>{
              elt.operateur = elt.operateur == null ? "" : elt.operateur.substring(0, 10) + '...'
              elt.datesignature = elt.datesignature !==null ? this.$dayjs(elt.datesignature).format('DD/MM/YYYY') :""
              elt.datevalidite = elt.datevalidite !==null ? this.$dayjs(elt.datevalidite).format('DD/MM/YYYY') :""
              elt.montant = elt.montant == null ? "" : this.commify(elt.montant)
            })
            this.isBusy=false
        })
        .catch((error) => {
            console.log(error)
            this.isBusy=false
        });
    },
     //fonction de parse d'un montant
  commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? " " + decimalPart : " ");
  },
  filterTable(){
    if(!this.disabled){
      this.search.entite = this.entite.libelle
    }
    console.log('response',this.search);
    this.isBusy=true
    this.$operationParc.post("billonages/search", this.search).then((response) => {
      console.log('response entrées',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.type_operation=elt.parcOperationTypeopeparc.libelle
          elt.dateope = elt.dateope !==null ? this.$dayjs(elt.dateope).format('DD/MM/YYYY') :""
          elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
          elt.siteoperation=elt.siteoperation.intitule
          elt.status = elt.statutenr == 1 ? 'soumise' :"en cours"

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
         this.isBusy=false
          console.log('c',error.response.data);
      });
  },
  reset(){
    this.resetSearcheBar()
    this.getCautions()
  },
  resetSearcheBar(){
     this.search = {
        numpermis: '', numtitre: '',
        essence: '', numaac: '', exercice: '', numufa: '', numufe: '',numdf10: '', datedeb: '', datefin: ''
     }
     localStorage.removeItem('sigif2./billonnages')
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
    this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{
       this.getCautions();
    }
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
  },

  }

</script>
<style scoped	>
.form-control{
  height: 30px !important;
}
#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
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
  border-radius:  6px;
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
 /* background-color: rgb(0, 82, 44)!important;*/
  border-color: white!important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover{
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table td, .table th {
  padding: 5px 0;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}

</style>
<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}
</style>