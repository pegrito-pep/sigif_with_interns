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
                  <b-col cols="5">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="4" px="0.5" py="0.6" label="Code type bénéficiaire" reduceSize="w-50"/>
                  </b-col>
                  <b-col cols="5">
                    <sigif-form-group :sizeLabel="5" :sizeLabelLg="4" px="0.5" py="0.6" label="Libellé type bénéficiaire" reduceSize="w-50"/>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-between">
                  <b-col cols="5">
                    <b-form-group   label-cols="5" label-cols-lg="4" label-size="sm" label="Unité de répartition" label-for="input-sm">
                        <v-select label="libelle"  :options="allEntitesForrestieres" class="custom-select-type_titre" ></v-select>
                    </b-form-group>
                  </b-col>

                  <b-col cols="3" >
                     <div>
                        <b-button class="search-bar-btn mr-4" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                        <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                    </div>
                  </b-col>
                </b-row>
                
              </b-card>
            </b-collapse>
          </div>
          <!--VISUALISATION DES TABLEAUX-->
          <b-row>
            <!--partie de gauche-->
            <b-col>
              <div class="m-0 px-2 table-header-border">
                <b-row>
                  <!-- tableau 1 -->
                  <b-col>
                    <b-row>
                      <b-col><h4 class="tab-header-left-text"> Liste des types de bénéficiaires</h4></b-col>
                      <b-col class="col-md-auto">
                        <span>
                          <a :disabled="canViewDetailsOperationParc" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                        </span>
                      </b-col>
                    </b-row>
                    
                  </b-col>
                </b-row>
                <div class="ml-1">
                  <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelectedTypeBeneficiaire"
                    :items="itemsTypesBeneficiaires" 
                    :fields="fieldsTypesBeneficiaires" 
                    :tbody-tr-class="rowClass">
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template v-slot:head(code)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(intitule)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template #cell(code)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.code }}</b> </span>
                    </template>
                    <template #cell(intitule)="data">
                      <span><b class="ml-1">{{ data.item.intitule }}</b> </span>
                    </template>
                  </b-table>

                  <!--AJOUT DE LA PAGINATION -->
                  <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
                </div>
              </div>
            </b-col>
            <!--partie de droite-->
            <b-col>
              <div class="m-0 px-2 table-header-border">
                <b-row>
                  <!-- tableau 1 -->
                  <b-col>
                    <b-col><h4 class="tab-header-left-text"> Unités ou métriques de Répartition</h4></b-col></b-col>
                </b-row>
                <div class="ml-1">
                  <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelectedTypeBeneficiaire"
                    :items="itemsUnitesRepartition" 
                    :fields="fieldsUnitesRepartition" 
                    :tbody-tr-class="rowClass" show-empty>
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template #empty>
                        <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">donnée</span> trouvée!!</h4>
                  </template>
                    <template v-slot:head(codeur)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(libelle)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template #cell(codeur)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.codeur }}</b> </span>
                    </template>
                    <template #cell(libelle)="data">
                      <span><b class="ml-1">{{ data.item.libelle }}</b> </span>
                    </template>
                  </b-table>
 
                </div>
              </div>
            </b-col>
       
          </b-row>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import UserForm from '@/components/Administration/UserForm.vue';
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "types_beneficiaires",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
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
 

    //données du tableaux
    fieldsTypesBeneficiaires: [
        { key: 'code', label: 'Code' ,thStyle:"width:35%" },
        { key: 'intitule', label: 'Intitulé' },
    ],
    elementsTypesBeneficiaires:[],
    fieldsUnitesRepartition: [
        { key: 'codeur', label: 'Codeur',thStyle:"width:35%" },
        { key: 'libelle', label: 'Libelle' }, 
    ],
    elementsUnitesRepartition: [
    ],

    selected:{},
  }),
  computed:{
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    itemsTypesBeneficiaires() { 
      return this.elementsTypesBeneficiaires.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsUnitesRepartition(){
      return this.elementsUnitesRepartition.map((a, index) => {  
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
  watch:{
    elementsTypesBeneficiaires(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
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

  onRowSelectedTypeBeneficiaire(items) {
    items.isSelected =true;
    this.isRowselected=true
    this.selected = items
    console.log('items',items);
    this.elementsUnitesRepartition=items[0].unitesRepartition||[]
    
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
    this.getTypeBeneficiaire()
  },
getTypeBeneficiaire(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$donneesReference.get("beneficiaires", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elementsTypesBeneficiaires=response.data.result.items
	     this.isBusy=false
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
    this.getTypeBeneficiaire();
  }
  }

</script>
<style scoped>
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
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