<template>
    <div id="cover" class="min-vh-100">
          <div>
              <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar">
                    <span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button>
                  <span
                    class="ml-1 font-weight-bold"
                  >Consultation du lot code à barre  n°  {{ lotCodes.numlot }}</span>
                </h4>
              </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor:pointer">
                    <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                  </a>
                </span>
              </b-col>
            </b-row>
              <b-row class="align-item-center d-flex justify-content-center ">
                    <div  class="d-flex align-items-center justify-content-center ml-4 w-50">

                   <b-row class="align-item-center d-flex justify-content-center ">
                    <div  class="d-flex align-items-center justify-content-center p-5 ml-4">

                    <b-col class="" cols="6">

                        <h6>Date de demande:</h6><br>
                         <h6>Nombre de codes à barres: </h6><br>
                          <h6>Usage:</h6><br>
                           <h6>Site CEMAC:</h6><br>
                        
                    </b-col>
                  <b-col class="b-col" cols="7">
                     <h6><strong v-if="lotCodes.datedemande !==null">{{ this.$dayjs(lotCodes.datedemande).format('DD-MM-YYYY') }}</strong> <i class="fa fa-calendar mt-1" aria-hidden="true"></i></h6><br>
                         <h6><strong>{{ lotCodes.nombre }}</strong></h6><br>
                          <h6 ><strong>{{ lotCodes.usage }}</strong></h6><br>
                           <h6 ><strong v-if="lotCodes.typetitre !==null">{{ lotCodes.typetitre }} </strong><strong v-else>PARC06</strong></h6><br>
                  </b-col>

                  </div>
                  
                  <b-col cols="2" class="b-col"></b-col>
                  
                </b-row>

                  </div>
                  
                  <b-col cols="2" class="b-col"> </b-col>
                  
                </b-row>

            

        
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des codes barres pour ce lot</h4></b-col>
              <b-col class="col-md-auto">
                <span >
                <a 
                :disabled="canPrintOperationParc"
                size="sm"
                :class="{'change-image-opacity': !canPrintOperationParc, 
                'not-change-image-opacity': canPrintOperationParc}"
                class="mx-1 simple-btn">
                <b-img
                :class="{'change-image-opacity': !canPrintOperationParc}"
                src="@/assets/images/iconIMPRIMER_16x16.png"></b-img></a>
                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:30%">
              <b-table class="" :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" >
              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>
         
          </div>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

import { mapGetters } from 'vuex';
export default {
  name: "details-codes_barres",
  components: {

  },
  data: () => ({
    showOverlay:false,
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    lotCodes:{},
    codes:[],
     //données du tableaux
  fields: [ 
	{ key: 'index', label: '' },
  { key: 'codebarre', label: 'Code à barre' },
  { key: 'reference', label: 'Reférence' },
  { key: 'statut', label: 'statut' },
],


  selected:{},

  }),
  computed:{
     ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateOperationParc(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewCodeBarre(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    items() { 
      return this.codes.map((a, index) => {  
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
  fermer() {
    this.$router.back();
  },
  async getDetailsCodeBarres() {
    this.showOverlay = true
    this.lotCodes = await this.$codesbarres.get('lot-codebarre/'+this.$route.params.id).then(response => response.data.result)
    this.codes=this.lotCodes.codes
    this.showOverlay = false
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
 /* beforeMount() {
    this.getDetailsCodeBarres();
  }*/
  mounted() {
    this.getDetailsCodeBarres();
  }

  


   
  }

</script>
<style scoped>
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
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>