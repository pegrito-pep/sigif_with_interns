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
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Rechercher</li></ul>  </b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                     <b-row>
                    <b-col cols="3">
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° Quittance" v-model="search.numtitre"/>
                      <b-row>
                        <b-col cols="4"><span class="font-weight-bold">statut</span></b-col>
                        <b-col>
                            <select v-model="search.statut" class="" style="font-size:1rem; width: 80%; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i" >
                              {{ status.libelle }}
                            </option>
                          </select>
                        </b-col>
                      </b-row>
                      <b-form-group  class="m-0 p-0">

                            
                      </b-form-group>
                    </b-col>
                    <b-col cols="6" class="ml-2 d-flex">
                       <label for="">Date allant de</label>
                       <div class="m-0">
                          <b-row class="m-0">
                            <b-col>
                                <calendar v-model="search.datedebut" :format="format" :clear-button="clear" :placeholder="placeholderddebut" :pane="1"></calendar>
                            </b-col>
                            <b-col>
                                <calendar v-model="search.datefin" :format="format" :clear-button="clear" :placeholder="placeholderdfin" :pane="1"></calendar>
                            </b-col>
                          </b-row>
                        </div>      
                    </b-col>
                  </b-row>
                  <b-row align-h="end">
                    <b-col cols="2">
                        <search-bar-actions-buttons-new @search="filterTable" @reset="reset"/>
                    </b-col>
                  </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">Liste des quittances DF10</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateQuittanceDf10" @click.prevent="addQuittanceDF10" size="sm" :class="{'change-image-opacity': !canCreateQuittanceDf10,  'not-change-image-opacity': canCreateQuittanceDf10}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                  <b-button :disabled="!canEditQuittanceDf10" size="sm" :class="{'change-image-opacity': !canEditQuittanceDf10,  'not-change-image-opacity': canEditQuittanceDf10}"  class="mx-1 simple-btn"><b-img  src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button :disabled="!canDeleteQuittanceDf10" size="sm" :class="{'change-image-opacity': !canDeleteQuittanceDf10,  'not-change-image-opacity': canDeleteQuittanceDf10}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <b-button @click.prevent="showDetails" :disabled="!canViewDetailsQuittanceDf10" size="sm" :class="{'change-image-opacity': !canViewDetailsQuittanceDf10,  'not-change-image-opacity': canViewDetailsQuittanceDf10}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button @click.prevent="submitQuittanceDF10" :disabled="!canSubmitQuittanceDf10||!isToSubmit" size="sm" 
                    :class="{'change-image-opacity': !canSubmitQuittanceDf10||!isToSubmit,
                    'not-change-image-opacity': canSubmitQuittanceDf10&&isToSubmit}"  class="mx-1 simple-btn">
                    <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
                    soumettre
                  </b-button>
                  <b-button @click.prevent="aprouveQuittanceDF10" :disabled="!canAprouveQuittanceDf10||!isToAprouve" size="sm" 
                    :class="{'change-image-opacity': !canAprouveQuittanceDf10||!isToAprouve,
                    'not-change-image-opacity': canAprouveQuittanceDf10&&isToAprouve}"  class="mx-1 simple-btn">
                    <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
                    approuver
                  </b-button>
                </span>
              </b-col>
            </b-row>
            <submit-box ref="submitDialogue"></submit-box>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width: 70%">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                 <template v-slot:head(numquitance)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(datequitance)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(montant)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(entiteforestier)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(statut)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template #empty>
                  <h4 style="color: green" class="text-center">
                    Aucune
                    <span class="font-weight-bold">Quittance DF10</span> trouvée!!
                  </h4>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>

              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          <!--MODAL DE CREATION D'UNE QUITTANCE DF10 -->
          <b-modal id="modal-sm" size="sm" :title="title"  ref="quittanceDF10-form" hide-footer
           header-class="custom-bg"
           header-text-variant="light"
          >
              <template #modal-title>
                  <span class="text-center font-weight-bold">{{ title }}</span>
              </template>
              <div>
                  <quittancedf10-form :action="action"  @quittanceDF10Added="quittanceDF10Added" />
              </div>
          </b-modal>
    </div>

</template>


<script>
import Quittancedf10Form from "@/components/forms/QuittanceDf10Form.vue";
import SubmitBox from '@/components/utils/SubmitBox.vue';
  const php  = require ( 'phpjs' ) ;
  import Calendar from 'vue2-slot-calendar';
  import { mapGetters } from 'vuex'
export default {
  name: "quittance_df10",
  components:{
    Calendar,
    Quittancedf10Form,
    SubmitBox
  },
  data: () => ({
    title:'création quittance DF10',
    action:'add',
    headerBgVariant: "success",
    bodyBgVariant: "light",
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    /*porpriétés zone de recherche*/
    search:{
        numquittance:"",
        statut:"",
        datedebut:"",
        datefin:""
    },
    /*propirétés du calendar*/
    format:"yyyy-MM-dd",
    clear:true,
    placeholderddebut:"date de début",
    placeholderdfin:"date de fin",
    value:"",
    title:"Création quittance DF10",
    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'numquitance', label: 'N° quittance' },
        { key: 'datequitance', label: 'Date quittance' },
        { key: 'montant', label: 'Montant' },
        { key: 'entiteforestier', label: 'Entité forrestière' },
        { key: 'statut', label: 'Statut' },
    ],
    elements: [],
    selected:{},
    isToSubmit:false, //variable associée au boutton de soummission d'une qittance DF10
    isToAprouve:false //variable associée au boutton approuver d'une qittance DF10
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateQuittanceDf10(){ return true; this.hasAccess('CREER_QUITTANCE_DF10') },
    canEditQuittanceDf10(){ this.hasAccess('MODIFIER_QUITTANCE_DF10') },
    canDeleteQuittanceDf10(){ this.hasAccess('SUPPRIMER_QUITTANCE_DF10') },
    canViewDetailsQuittanceDf10(){ this.hasAccess('CONSULTER_QUITTANCE_DF10') },
    canSubmitQuittanceDf10(){ return true; this.hasAccess('SOUMETTRE_QUITTANCE_DF10') },
    canAprouveQuittanceDf10(){ return true; this.hasAccess('APPROUVER_QUITTANCE_DF10') },
    

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
     ...mapGetters(['user'])
  },
 
 methods: {
  //méthode de gestion de l'ajout d'une quittance DF10
  quittanceDF10Added(){
    this.getQuittanceDF10();
    this.$refs['quittanceDF10-form'].hide();
  },
  showDetails(){ this.$router.push({name: 'details-quittance_df10', params: { id: this.selected[0].numlot }}); },
  addQuittanceDF10(){
    this.$refs['quittanceDF10-form'].show()
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
      console.log("row selected", items);
      items.isSelected = true;
      this.isRowselected = true;
      
      this.selected = items;
      if (!php.empty(this.selected[0])) {
        if(this.selected[0].statut=='Brouillon'){
          this.isToSubmit=true
          this.isToAprouve=false
        }
        else if(this.selected[0].statut=='Soumise'){
          this.isToSubmit=false
          this.isToAprouve=true
        }
        else{
          this.isToSubmit=false
          this.isToAprouve=false
        }
        
      }
    },
    //TRAITEMENT SOUMISSION QUITTANCE DF10
    async submitQuittanceDF10() {
      const ok = await this.$refs.submitDialogue.show({
          title: 'soumission',
          message: 'etes-vous sur de vouloir soumettre la quittance DF10 :',
          detail1:'N° quittance',
          detail2:'Date',
          detail3:'Montant',
          infos1: this.selected[0].numquitance,
          infos2: this.selected[0].datequitance,
          infos3: this.selected[0].montant,
          okButton: 'Oui',
          cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        this.$fiscalite.put('quitancedf10/soumettre/'+this.selected[0].numquitance, ).then(response => {
              this.submitted = false 
              this.getQuittanceDF10();
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              this.submitted = false
              return App.alertError(error.message)
          })
          this.$refs.submitDialogue._close();
      } else {
          this.$refs.submitDialogue._close();
      }
    },

   //TRAITEMENT APPROBATION  / REjet quittance
   async aprouveQuittanceDF10() {
      const ok = await this.$refs.submitDialogue.show({
          title: 'APPROBATION',
          message: 'etes-vous sur de vouloir approuver la quittance DF10 :',
          detail1:'N° quittance',
          detail2:'Date',
          detail3:'Montant',
          infos1: this.selected[0].numquitance,
          infos2: this.selected[0].datequitance,
          infos3: this.selected[0].montant,
          okButton: 'Oui',
          cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        this.$fiscalite.put('quitancedf10/approuver/'+this.selected[0].numquitance, ).then(response => {
              this.submitted = false 
              this.getQuittanceDF10();
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              this.submitted = false
              return App.alertError(error.message)
          })
          this.$refs.submitDialogue._close();
      } else {
          this.$refs.submitDialogue._close();
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
        this.getQuittanceDF10()
    },
    getQuittanceDF10(){
        this.isBusy =true
        const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
        );
        this.$fiscalite.get("quitancedf10", {params}).then(response => {
            console.log("=================== fiscalités / quittance df10 ==================");
            console.log(response.data.result.Items);
            this.total = response.data.result.TotalsElements
            this.currentPage = response.data.result.CurrentPage + 1
            this.elements=response.data.result.Items

            this.elements = this.elements.map(elt =>{
                elt.datequitance = elt.datequitance !==null ? this.$dayjs(elt.datequitance).format('DD/MM/YYYY') :""
            return elt
            })
            this.isBusy=false
            setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
        })
        .catch((error) => {
            console.log(error)
            this.isBusy=false
        });
    },
    resetSearcheBar(){
        this.search = {
            numpermis: '', numtitre: '',
            essence: '', numaac: '', exercice: '', numufa: '', numufe: '',numdf10: '', datedeb: '', datefin: ''
        }
        localStorage.removeItem('sigif2./abbattage-abbattage_titres')
        //storage.remouve(this.$route.path)
    },
    filterTable(){
        console.log('response',this.search);
        this.isBusy=true
        this.$abbattage.post("tiges/search", this.search).then((response) => {
        console.log('response',response);
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
        
            this.elements = this.elements.map(elt =>{
              elt.datequitance = elt.datequitance !==null ? this.$dayjs(elt.datequitance).format('DD/MM/YYYY') :""
            return elt
            })
            storage.set(this.$route.path ,JSON.stringify(this.search))
            this.isBusy=false
        })
        .catch((error) => {
            this.isBusy=false
            console.log('c',error.response.data);
        });
    },
    reset(){
        this.resetSearcheBar()
        this.getQuittanceDF10()
        console.log('re-initialisation');
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

  validateForm(){
    this.$router.push({name: 'validate-quittance_df10'})
  }


 },
 

  mounted(){
    this.getQuittanceDF10();
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

<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}
</style>
