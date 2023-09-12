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
                  >Consultation lot d'abbattage  n°  {{ abbattage.idabatLot }}</span>
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
            <b-row>

          <b-col cols="3">
              <div>
                   No permis:<strong>0546/MINFOF/SETA</strong><br>
                   No UFA:<strong>1</strong><br>
                   Volume total:<strong>50.92</strong>
               
                  
                </div>
          </b-col>


           <b-col cols="3">
             <div>
               No titre:<strong>AEBGDF</strong><br>
               No UFE:<strong>7</strong><br>
              Nombre de grumes:<strong>5</strong>
               
               
                </div>

           </b-col>


            <b-col cols="3">
                 <div>
              Date permis:<strong>21/06/2022</strong><br>
               No AAC:<strong>7</strong><br>
              Dernier No grumes:<strong>4</strong>
                
                </div>

            </b-col>

             <b-col cols="3">
              <div>
                 Type de titre: <strong>CD</strong><br>
               No DFD10: <strong>202121</strong><br>
              Date abbatage: <strong>05/04/2021</strong>

              </div>

              </b-col>



        </b-row>

         </b-card>

          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col cols="4"><h4 class="tab-header-left-text mr-2"> Liste des tiges abbatues</h4>
              <a @click.prevent="exportLot" :disabled="canExportLot" size="sm" :class="{'not-change-image-opacity': canExportLot,  'change-image-opacity': !canExportLot}" class="mx-1 simple-btn" style="color:green"><i class="fa fa-file-export"></i>Exporter le lot</a></b-col>
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
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(numordre)="data">
                  <input type="text" v-model="data.item.numordre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                </template> 
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
export default {
  name: "abbatages_titres",
  components: {
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({

    numPemis :[{libelle :"0585/ASEBG/MINFOF/SETAT"}],
    abbattage:{idabatLot: 1518,numpermis:"0585/ASEBG/MINFOF/SETAT", numtitre:'AEBGDF', numufa:1,numufe:5,numaac:7,numdfd10:202121, datepermis:"21/06/2022",typetitre:"CD",
    volume:'50.92',nombregrumes:7,derniernumgrumme:4, dateabattage:"05/04/2019" },






    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,


    //données du tableaux
fields: [ 
	{ key: 'index', label: '' },{ key: 'numordre', label: 'N° d\'ordre',thStyle: { width: "10%"} }, { key: 'codebaretige', label: 'Code barre tige' },
    { key: 'codebarreabbattage', label: 'Code Barre abbattage' }, { key: 'numsequentiel', label: 'N° Sequentiel' },{key : 'essence', label :'essence',thStyle: { width: "8%"}}, 
    { key: 'diametrepetitbout', label : 'Diamètre petit bout' }, { key: 'diametregrosbout', label: 'Diametre gros but' }, { key: 'longueur', label: 'longueur' },
	{ key: 'volume', label : 'volume(en m)' }, { key: 'rejet', label: 'rejet' }, { key: 'motifrejet', label: 'Motif de rejet' }],
	
	
	elements:[
		{numordre :"25072021/", codebaretige: "3DZ836H3", codebarreabbattage: "HRA4VJ3J", numsequentiel: "4520-00001", essence: "Fraké/limbe"
		,diametrepetitbout: 70,diametregrosbout: 90,longueur: 12,volume: 11.04,rejet: "NON",motifrejet:""},
    {numordre :"25072021/", codebaretige: "3DZ836H3", codebarreabbattage: "HRA4VJ3J", numsequentiel: "4520-00001", essence: "Fraké/limbe"
		,diametrepetitbout: 70,diametregrosbout: 90,longueur: 12,volume: 11.04,rejet: "NON",motifrejet:""},
    {numordre :"25072021/", codebaretige: "3DZ836H3", codebarreabbattage: "HRA4VJ3J", numsequentiel: "4520-00001", essence: "Fraké/limbe"
		,diametrepetitbout: 70,diametregrosbout: 90,longueur: 12,volume: 11.04,rejet: "NON",motifrejet:""}
	],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */
    allSitesOperations: [
            {
            title: ' Grande forèt amazioniènne',
            icon: 'fa fa-database',
            id: 1
            },
            {
            title: '  Foret de Sambissa',
            icon: 'fa fa-book',
            id: 2
            },
            {
            title: '  Foret Tropicale',
            icon: 'fas fa-dollar-sign',
            id:3
            },
            {
            title: '  Foret de Manguissa',
            icon: 'fa fa-pencil',
            id:4
            }
    ],
    op_status:[
       { value: null, text: 'Please select an option' },
       { value: 'a', text: 'This is First option' },
       { value: 'b', text: 'Selected Option' },
       { value: { C: '3PO' }, text: 'This is an option with object value' },
       { value: 'd', text: 'This one is disabled', disabled: true }
    ],
    op_date:'2019-01-01 14:30',
    op:{
      site_concernee:'',
      date_operation:'',
      heure_operation:'',
      statut:null
    }
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
  fermer() {this.$router.push({name: "abbattages_titres"});},
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

 async getDetailsAbbattage() {
    this.showOverlay = true
    this.abbattageDetail = await this.$abbattage.get('tiges/' +this.$route.params.id).then(response => response.data.result)
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
    this.getDetailsAbbattage();
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

</style>