<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row>
            <b-col>
              <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar">
                  <span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button>
                <span
                  class="ml-1 font-weight-bold"
                >Consultation lot N° {{ detail.idabatLot }}</span>
              </h4>
            </b-col>
            <b-col class="col-md-auto">
              <span>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138">
                  <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                </a>
              </span>
            </b-col>
          </b-row>
          <b-card>
            <b-row class="mt-1">
              <b-col sm="4">
                <span for="input-small">N° du permis:</span>
                <label class="style" for="input-small">{{ detail.numpermis }}</label>
              </b-col>

              <b-col sm="3">
                <span for="input-small">Date abattage:</span>
                <label class="style" for="input-small">{{ detail.dateAbattage }}</label>
              </b-col>

              <b-col sm="3">
                <span for="input-small">Volume:</span>
                <label class="style" for="input-small">{{ detail.volume }}</label>
              </b-col>

              <b-col sm="4">
                <span for="input-small">Nombre grume:</span>
                <label class="style" for="input-small">{{ detail.nbGrumes }}</label>
              </b-col>

              <b-col sm="3">
                <span for="input-small">N° dernier grume:</span>
                <label class="style" for="input-small">{{ detail.numDernGrume }}</label>
              </b-col>

              <b-col sm="2">
                <span for="input-small">N° UFE:</span>
                <label  class="style" for="input-small">{{ detail.numufe }}</label>
              </b-col>

              <b-col sm="3">
                <span for="input-small">N° UFA:</span>
                <label class="style" for="input-small">{{ detail.numufa }}</label>
              </b-col>
          
            </b-row>
            <b-row class="mt-1">
              <b-col sm="4">
                <span for="input-small">Type de titre :</span>
                <span class="ml-1"><span class="text-muted">{{ detail.libelletypetitre }} </span> <b-badge pill variant="secondary">{{ detail.typetitre }}</b-badge></span>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col cols="4" class="d-flex">
              <h4 class="tab-header-left-text mr-2"> Liste des bris d'abattage</h4>
              <a :disabled="canExportLot" size="sm" :class="{'not-change-image-opacity': canExportLot,  'change-image-opacity': !canExportLot}" class="mx-1 simple-btn" style="color:green; white-space: nowrap;"><i class="fa fa-file-export"></i>Exporter</a>
              <a :disabled="canExportLot" size="sm" :class="{'not-change-image-opacity': canExportLot,  'change-image-opacity': !canExportLot}" class="mx-1 simple-btn" style="color:green; white-space: nowrap;"><i class="fa fa-print"></i>Imprimer</a>
            </b-col>
          </b-row>
        </div>
        <!--implémentation tableau proprement dite-->
        <div class="ml-1">
            <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
            :items="items" 
            :fields="fields" 
            :tbody-tr-class="rowClass" >
              <template #table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-1">chargement...</strong>
                </div>
              </template>
              <template v-slot:head(diampb)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template v-slot:head(diamgb)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template v-slot:head(longueur)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template v-slot:head(volume)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              <template #cell(diampb)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diampb }}</b> </span>
              </template>
              <template #cell(diamgb)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diamgb }}</b> </span>
              </template>
              <template #cell(longueur)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.longueur }}</b> </span>
              </template>
              <template #cell(volume)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.volume }}</b> </span>
              </template>
            </b-table>
            <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
        </div>
      </b-overlay>
    
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

export default {
  name: "abbatages_titres",
  components: {
 
  },
  data: () => ({

    detail:null,
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,


    //données du tableaux
    fields: [ 
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre', thStyle: { width: "10%"} },
      { key: 'nomcommercial', label: 'Nom essence' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'utmy', label: 'UTMx' },
      { key: 'utmx', label: 'UTMy' },
      { key: 'diampb', label :'Diamètre petit bout', thStyle: { width: "12%"}}, 
      { key: 'diamgb', label: 'Diametre gros bout' },
      { key: 'longueur', label: 'longueur' },
      { key: 'volume', label : 'volume(en m)' },,
    ],
    elements:[],
    selected:{},
 
  }),
  computed:{
    /*propriétés liées aux accès*/
    canExportLot(){return true},

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
  fermer() {this.$router.back();},
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
    this.getBrisAbbattage()
  },
 async getDetailsBrisAbbattage() {
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
    this.showOverlay = true
    this.detail = await this.$abbattage.get('brisAbattage/' +this.$route.params.id, {params}).then(response => response.data.result)
    if(this.detail!=null){
      this.detail.dateAbattage =this.$dayjs(this.detail.dateAbattage).format('DD/MM/YYYY')
      this.detail.soumis =this.$dayjs(this.detail.soumis).format('DD/MM/YYYY')
      this.elements = this.detail.listbris.Items
      this.total = this.detail.listbris.TotalElements
      this.currentPage = this.detail.listbris.CurrentPage + 1
    }
    console.log('total ',this.total, 'currentPage ',this.currentPage);
    console.log('détail ',this.detail);
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
    this.getDetailsBrisAbbattage();
  }
}

</script>

<style scoped>

.style{
  margin-left: 10px;
  font-weight: bold !important;
  font-style: 60px !important;
  color: rgb(19, 16, 16);
  padding: 3px 10px;
}

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
  cursor: pointer;
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

#wrap:after {
    content:"";
    position:relative;
    margin-left:-20px;
    pointer-events:none;
    top: 15px;
    right:5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #8E97AF transparent transparent transparent;
}

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
  width: 180px;
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