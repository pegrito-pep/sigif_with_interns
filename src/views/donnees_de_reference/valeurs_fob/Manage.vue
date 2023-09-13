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
                <!--<b-row>

                  <b-col class="b-col" cols="3">
                    <sigif-form-group :label-cols="4" :label-cols-lg="3" label="Date signature"/>
                    <sigif-form-group :label-cols="4" :label-cols-lg="3" label=""/>
                  </b-col>
                  <b-col class="b-col" cols="3">
                    <sigif-form-group :label-cols="4" :label-cols-lg="3" label="Date effect"/>
                    <sigif-form-group :label-cols="4" :label-cols-lg="3" label=""/>
                  </b-col>
                  <b-col class="b-col" >
                    <sigif-form-group :label-cols="4" :label-cols-lg="3" label="Ref. Arrêté"/>
                  </b-col>       
                </b-row>-->
                <b-row>
                  <b-col cols="4" class="mr-2">
                    <sigif-form-group  :px="0" :py=".8" :label-cols="4" :label-cols-lg="3" label="Ref arreté" v-model="search.ref" />
                  </b-col>
                  <b-col cols="5" class="ml-2">
                    <div class="d-flex w-90 justify-content-between">
                      <label for="" style="width:22%"> Date Signature</label>
                      <b-row>
                        <b-col cols="6">
                          <date-picker  v-model="search.datesignaturedeb"   format="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                        </b-col>
                        <b-col cols="6">
                          <date-picker  v-model="search.datesignaturefin"   format="DD-MM-YYYY" placeholder="date de fin" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="4">
                    <div class="d-flex w-90 justify-content-between">
                      <label for="" style="width:30%"> Date effet</label>
                      <b-row>
                        <b-col cols="6">
                          <date-picker  v-model="search.dateeffetdeb"   format="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                        </b-col>
                        <b-col cols="6">
                          <date-picker  v-model="search.dateeffetfin"   format="DD-MM-YYYY" placeholder="date de fin" valueType="YYYY-MM-DD" class="w-100" :clearable="false" />
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
                <b-row class="mt-5 position_absolute">
                  <div class="search-bar-btn-group">
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                    </b-col>
                    <b-col>
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                    </b-col>
                  </div>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Arrêté FOB</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreateValeurFob"  @click.prevent="addValeurFob"  size="sm" :class="{'change-image-opacity': !canCreateValeurFob,  'not-change-image-opacity': canCreateValeurFob}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span >
                <b-button :disabled="!canUpdateValeurFob"  @click.prevent=""  size="sm" :class="{'change-image-opacity': !canUpdateValeurFob,  'not-change-image-opacity': canUpdateValeurFob}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <b-button :disabled="!canDeleteValeurFob" size="sm" :class="{'change-image-opacity': !canDeleteValeurFob,  'not-change-image-opacity': canDeleteValeurFob}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</b-button>
                <b-button :disabled="!canViewDetailsValeurFob" size="sm" :class="{'change-image-opacity': !canViewDetailsValeurFob,  'not-change-image-opacity': canViewDetailsValeurFob}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsValeurFob}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button :disabled="!canActiveValeurFob" size="sm" :class="{'change-image-opacity': !canActiveValeurFob,  'not-change-image-opacity': canActiveValeurFob}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canActiveValeurFob}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</b-button>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                  <template v-slot:head(arreteFob)="data">
                      <span v-html="data.field.label" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                  <template #empty>
                    <h4 style="color: green" class="text-center">
                      Aucune
                      <span class="font-weight-bold">donnée</span> trouvée!!
                    </h4>
                  </template>
                  <template #cell(arreteFob)="data">
                        <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.arreteFob }}</b> </span>
                  </template>
                
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
            <!--AJOUT D'UN ARRETE FOB -->
          <b-modal id="modal-sm"  size="sm"  ref="valeurfob-form" hide-footer 
           header-class="custom-bg"
            header-text-variant="light"
          >
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <ValeurFobForm />
              </div>
          </b-modal>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import ValeurFobForm from "@/components/forms/ValeurFobForm.vue";
   import DatePicker from 'vue2-datepicker';
   import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
  import { mapGetters } from 'vuex'
export default {
  name: "valeurfob",
  components:{
    ValeurFobForm,
    DatePicker
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
    search:{
      ref:"",
      dateeffetdeb:"",
      dateeffetfin:"",
      datesignaturedeb:"",
      datesignaturefin:""
    },

    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'arreteFob', label: 'Arrêté no' },
        { key: 'dateSignature', label: 'Date signature' },
        { key: 'dateEffet', label: 'Date effet' },
    ],
    elements: [],

    selected:{},
    
     /*propriétes lies au traitement d'une operation de parc */
    title:"Enregistrement Arreté FOB"
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    canCreateValeurFob(){ return true; return this.hasAccess('CREER_VALEUR_FOB')},
    canUpdateValeurFob(){return this.hasAccess('MODIFIER_VALEUR_FOB')},
    canDeleteValeurFob(){return this.hasAccess('SUPPRIMER_VALEUR_FOB')},
    canViewDetailsValeurFob(){return this.hasAccess('CONSULTER_VALEUR_FOB')},
    canActiveValeurFob(){return this.hasAccess('ACTIVER_VALEUR_FOB')},

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
   addValeurFob(){
     this.$refs['valeurfob-form'].show()
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
    console.log('row selected',items);
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
    // this.getValeurFob()
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

    getValeurFob(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("valeurs-fob", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        console.log('elements valeurs fob',this.elements);
        this.elements = this.elements.map((elt) => {
          elt.refArrete= elt.arreteFob !==null ? elt.arreteFob.refArrete : "";
            elt.dateSignature =
              elt.dateSignature !== null
                ? this.$dayjs(elt.dateSignature).format("DD/MM/YYYY")
                : "";
            elt.dateEffet =
              elt.dateEffet !== null
                ? this.$dayjs(elt.dateEffet).format("DD/MM/YYYY")
                : "";
            return elt;
          });

	      this.isBusy=false
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });

    },
 },
 

  mounted(){
     this.getValeurFob();
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
  background-color: rgb(0, 82, 44) !important;
}
</style>