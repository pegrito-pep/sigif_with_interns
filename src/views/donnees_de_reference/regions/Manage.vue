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

                <b-col cols="2">
                  <sigif-form-group  :px="0" :py="0" :label-cols="4" :label-cols-lg="3" :label="$t('data.Code')" v-model="search.coderegion"/>
                </b-col>
                <b-col cols="2">
                  <sigif-form-group  :px="0" :py="0" :label-cols="4" :label-cols-lg="3" :label="$t('data.Nom')" v-model="search.nomregion"/>
                </b-col>

                <b-col cols="3">
                  <b-form-group   label-cols="4" label-cols-lg="3" label-size="sm" :label="$t('data.Chef_lieu')" label-for="input-sm">
                    <v-select label="nom" v-model="search.cheflieu"  :options="cheflieux" class="custom-select-type_titre" ></v-select>
                  </b-form-group>
                </b-col>
                <b-col cols="3" class="b-col">
                  
                  <b-row class="content">
                    <div class="d-flex mb-4" style="width: 80px">
                        <b-col><label for="">{{ $t('data.Actif') }}</label></b-col>
                    <b-form-checkbox
                      id="checkbox-1"
                      v-model="status"
                      name="checkbox-1"
                      value="accepted"
                      unchecked-value="not_accepted"
                    >
                    </b-form-checkbox>
                    </div>
                    
                  </b-row>
                  
                </b-col>
                
              </b-row>
              <b-row class="position_absolute">
                <div class="search-bar-btn-group">
                  
                  <b-col>
                    <b-button class="search-bar-btn" @click.prevent="filterList" style="color:rgb(0, 82, 44);"><a href="">{{ $t('data.Rechercher') }}</a></b-button>
                  </b-col>
                  <b-col>
                    <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href=""> {{ $t('data.Reinitialiser') }}</a></b-button>
                  </b-col>
                </div>
              </b-row>
              
            </b-card>
          </b-collapse>
        </div>
        <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img>{{ $t('data.Liste_des_régions') }}</h4></b-col>
            <b-col class="col-md-auto">
                 <b-button :disabled="!canCreateRegion" @click.prevent="addRegion" size="sm" :class="{'change-image-opacity': !canCreateRegion,  'not-change-image-opacity': canCreateRegion}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                 <span >
                <b-button @click.prevent="" :disabled="!canUpdateRegion" size="sm" :class="{'change-image-opacity': !canUpdateRegion,  'not-change-image-opacity': canUpdateRegion}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateRegion}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>{{ $t('data.Modifier') }}</b-button>
              <b-button :disabled="!canDeleteRegion" size="sm" :class="{'change-image-opacity': !canDeleteRegion,  'not-change-image-opacity': canDeleteRegion}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteRegion}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>{{ $t('data/Supprimer') }}</b-button>
              <b-button :disabled="!canViewDetailsRegion" size="sm" :class="{'change-image-opacity': !canViewDetailsRegion,  'not-change-image-opacity': canViewDetailsRegion}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsRegion}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>{{ $t('data.Consulter') }}</b-button>
              <b-button :disabled="!canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>{{ $t('data.Valider') }}</b-button>
              <b-button :disabled="!canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>{{ $t('data.Desactiver') }}</b-button>
              <b-button :disabled="!canImportRegion" size="sm" :class="{'change-image-opacity': !canImportRegion,  'not-change-image-opacity': canImportRegion}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canImportRegion}" src="@/assets/images/excel.png"></b-img>{{ $t('data.Importer') }}</b-button>
              </span>
              
            </b-col>
          </b-row>
        </div>
        <!--implémentation tableau proprement dite-->
        <div class="ml-1">
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
               <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
               <template #cell(actif)>
                   <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
              </template>
              <template #cell(estcemac)="data">
                   <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                   <span v-else></span>
              </template>
            </b-table>

            <!--AJOUT DE LA PAGINATION -->
            <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
        </div>

            <!--AJOUT D'UNE REGION -->
          <b-modal id="region-form"  ref="region-form"  hide-footer
           header-class="custom-bg"
           body-class="customm-bg"
           header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <region-form @regionAdded="handleAddRegion" @regionAddedAndContinue="handleRegionAddedAndContinue"/>
              </div>
          </b-modal>

  </div>

</template>

<script>
const php  = require ( 'phpjs' ) ;
 import RegionForm from "@/components/forms/RegionForm.vue";
import UserForm from '@/components/Administration/UserForm.vue';
import SelectInput from '@/components/custom_select_input.vue';
import FormInput from '@/components/custom_form_select.vue';
import SimpleInput from '@/components/simple_input.vue';
import { mapGetters } from 'vuex'
export default {
name: "regions",
components:{
  UserForm,
  SelectInput,
  FormInput,
  SimpleInput,
  RegionForm,
},
data: () => ({

  //   checkbox 
  status: true,
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
  //données du tableaux
  fields: [
      { key: 'index', label: '' },
      { key: 'coderegion', label: 'Code région' },
      { key: 'intitule', label: 'Nom région' },
      { key: 'cheflieu', label: 'Chef lieu' },
      { key: 'superficie', label: 'Superficie(km²)' }, 
      { key: 'actif', label: 'Actif' }],
  elements: [],

  selected:{},
  cheflieux:[{ nom: 'YAOUNDE'},{ nom: 'EBOLOWA'},{ nom: 'BERTOUA'},{ nom: 'BAFOUSSAM'},{ nom: 'DOUALA'},{ nom: 'MAROUA'},{ nom: 'GAROUA'},{ nom: 'NGAOUNDERE'},{ nom: 'BAMENDA'},{ nom: 'BUEA'}],
  // Données pour la recherche
  search:{
    coderegion: '',
    nomregion: '',
    cheflieu: '',
    status: false,
  },
  
}),
computed:{
  ...mapGetters(['user','hasAccess']),
  /*propriétés liées aux accèes*/
  canCreateRegion(){return true; return this.hasAccess('CREER_REGION')},
  canUpdateRegion(){return this.hasAccess('MODIFIER_REGION')},
  canDeleteRegion(){return this.hasAccess('SUPPRIMER_REGION')},
  canViewDetailsRegion(){return this.hasAccess('CONSULTER_REGION')},
  canActiveRegion(){return this.hasAccess('ACTIVER_REGION')},
  canDesactiveRegion(){return this.hasAccess('DESACTIVER_REGION')},
  canImportRegion(){return this.hasAccess('IMPORT_REGION')},

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

   addRegion(){
     this.$refs['region-form'].show()
   },

 filterList() {
  this.search.cheflieu = this.search.cheflieu.libelle;
  this.search.status = this.status == 'accepted' ? true : false;

  console.log("============================");
  console.log(this.search);
  console.log("============================");
},

rowClass(item, type) {
  if(item !=''&&item!=null){
    if (item.isEven) return 'table-row-other'
    if (!item || type !== 'row') return 'table-info'
  }else{
    return 
  }
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
addUser(){this.$bvModal.show('user-form')},
callEditOperationParc(){this.$bvModal.show('modal-lg')},
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
getPays(){
   this.isBusy=true
    const params = this.getRequestParams(
      this.currentPage,
      this.pageSize
    );
  this.$donneesReference.get("regions", {params}).then(response => {
        console.log("=================== Données de reference / region ==================");
        console.log(response.data.result.items[0]);
        console.log("===========================================================");
      this.total = response.data.result.totalItems
      this.currentPage = response.data.result.currentPage + 1
      this.elements=response.data.result.items

       this.elements = this.elements.map(elt =>{
      //   elt.continent=elt.continent.libelle
      //   elt.estcemac = elt.estcemac == 1 ? true : false

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
  this.getPays();
}
}

</script>
<style scoped>
.position_absolute{
position: absolute;
top: 15px;
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