<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="show" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
            <p id="cancel-label">Chargement...</p>
          </div>
        </template>
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button><span class="ml-1 font-weight-bold">Table de Peuplement</span></h4>
            </b-col>
            <b-col class="col-md-auto">
              <span>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn">Exporter</a>
              </span>
            </b-col>
          </b-row>
        </div>
        <div class="mt-2 pb-4">
          <div class="ml-1">
            <b-table  :busy="showOverlay" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
                  <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold"> inventaire</span> trouvé!!</h4>
              </template>
              <!-- A custom formatted header cell for field 'name' -->
              <template #head(nom)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_45)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_55)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_65)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_75)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_85)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_95)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_105)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_115)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_125)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_135)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_145)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_155)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_165)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(diam_175)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>
              <template #head(total)="data">
                <span class="text-success">{{ data.label.toUpperCase() }}</span>
              </template>

              <template #cell(nom)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.nom }}</b> </span>
              </template>
              <template #cell(diam_45)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_45 }}</b> </span>
              </template>
              <template #cell(diam_55)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_55 }}</b> </span>
              </template>
              <template #cell(diam_65)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_65 }}</b> </span>
              </template>
              <template #cell(diam_75)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_75 }}</b> </span>
              </template>
              <template #cell(diam_85)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_85 }}</b> </span>
              </template>
              <template #cell(diam_95)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_95 }}</b> </span>
              </template>
              <template #cell(diam_105)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_105 }}</b> </span>
              </template>
              <template #cell(diam_115)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_115 }}</b> </span>
              </template>
              <template #cell(diam_125)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_125 }}</b> </span>
              </template>
              <template #cell(diam_135)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_135 }}</b> </span>
              </template>
              <template #cell(diam_145)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_145 }}</b> </span>
              </template>
              <template #cell(diam_155)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_155 }}</b> </span>
              </template>
              <template #cell(diam_165)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_165 }}</b> </span>
              </template>
              <template #cell(diam_175)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diam_175 }}</b> </span>
              </template>
              <template #cell(total)="data">
                <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.total }}</b> </span>
              </template>

            </b-table>
            <div class="float-right">
              <b-button @click.prevent="exportdata" size="sm" class="mx-1" style="background:#82C138; border-color:#82C138"><b-img clas="ml-1" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Exporter</b-button>
              <b-button @click.prevent="printdata" size="sm"  class="mx-1" style="background:#82C138; border-color:#82C138"><b-img clas="ml-1" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>Imprimer</b-button>
            </div>
          </div>
        </div>
    </b-overlay>
  </div>

</template>

<script>


const php  = require ( 'phpjs' ) ;
import exportFromJSON from "export-from-json";
export default {
name: "table_stock",

data: () => ({
  showOverlay:false,
  fields: [{ key: 'index', label: '', thStyle: { width: "2%" }  },
  { key: 'nom', label: 'ESSENCES' },
  { key: 'diam_45', label: 'DIAM_45' },
  { key: 'diam_55', label: 'DIAM_55' },
  { key: 'diam_65', label: 'DIAM_65' }, 
  { key: 'diam_75', label: 'DIAM_75' },
  { key: 'diam_85', label: 'DIAM_85' },
  { key: 'diam_95', label: 'DIAM_95' }, 
  { key: 'diam_105', label: 'DIAM_105' },
  { key: 'diam_115', label: 'DIAM_115' }, 
  { key: 'diam_125', label: 'DIAM_125' },
  { key: 'diam_135', label: 'DIAM_135' },
  { key: 'diam_145', label: 'DIAM_145' },
  { key: 'diam_155', label: 'DIAM_155' },
  { key: 'diam_165', label: 'DIAM_165' },
  { key: 'diam_175', label: 'DIAM_175' },
  { key: 'total', label: 'TOTAL' },
  ],
  show:false,
  elements: [],
  elements1: [
	{
		"nom": "Azobé",
		"diametres":[
			{"diam_50":1},
      {"diam_60":0},
      {"diam_70":0},
      {"diam_80":1},
      {"diam_90":0},
      {"diam_100":11},
      {"diam_110":0},
      {"diam_120":8},
      {"diam_130":1},
      {"diam_140":1},
      {"diam_150":1},
      {"diam_160":1},
      {"diam_170":1},
      {"diam_180":1},
		]
		
	},
	{
		"nom": "PADOUC",
		"diametres":[
			{"diam_50":1},
      {"diam_60":1},
      {"diam_70":4},
      {"diam_80":1},
      {"diam_90":1},
      {"diam_100":1},
      {"diam_110":7},
      {"diam_120":1},
      {"diam_130":1},
      {"diam_140":0},
      {"diam_150":1},
      {"diam_160":0},
      {"diam_170":1},
      {"diam_180":0}
		]
	},
  {
		"nom": "Nom naga",
		"diametres":[
			{"diam_50":1},
      {"diam_60":1},
      {"diam_70":1},
      {"diam_80":1},
      {"diam_90":1},
      {"diam_100":1},
      {"diam_110":1},
      {"diam_120":1},
      {"diam_130":1},
      {"diam_140":1},
      {"diam_150":1},
      {"diam_160":1},
      {"diam_170":1},
      {"diam_180":1}
		]
	}
	
  ],
  elementsToExport:[],
  selected:{},
  isRowselected:false
}),
computed:{
  items() { 
    return this.elements.map((a, index) => {  
      a.isFirst = index == 0        
      a.isEven = index %2 == 0        
      return a
    })
  },
},

methods: {
    fermer(){ this.$router.back()},
    exportdata(){
        this.show=true
        //const data=this.elements
        const data=this.elementsToExport
        const fileName = "table_peuplement";
        const exportType = exportFromJSON.types.csv;
        if (data) exportFromJSON({data, fileName, exportType });
        setTimeout(() => {this.show=false;}, 3000);
    },
    async getData() {
            this.showOverlay = true
            //this.elements = await this.$inventaire.get('tracking/table-peuplement').then(response => response.data.result)
            this.elements = await this.$inventaire.get('tracking/table-peuplement-exercice').then(response => response.data.result.res[0])
            console.log('eéléments ',this.elements[0].diametres[0]);
              this.elements=this.elements.map(elt =>{
                elt.diam_45 = elt.diametres[0].diam_45
                elt.diam_55 = elt.diametres[0].diam_55
                elt.diam_65 = elt.diametres[0].diam_65
                elt.diam_75 = elt.diametres[0].diam_75
                elt.diam_85 = elt.diametres[0].diam_85
                elt.diam_95 = elt.diametres[0].diam_95
                elt.diam_105 = elt.diametres[0].diam_105
                elt.diam_115 = elt.diametres[0].diam_115
                elt.diam_125 = elt.diametres[0].diam_125
                elt.diam_135 = elt.diametres[0].diam_135
                elt.diam_145 = elt.diametres[0].diam_145
                elt.diam_155 = elt.diametres[0].diam_155
                elt.diam_165 = elt.diametres[0].diam_165
                elt.diam_175 = elt.diametres[0].diam_175
                elt.total = parseFloat( elt.diam_45)+ parseFloat( elt.diam_55)+ parseFloat( elt.diam_65) + parseFloat( elt.diam_75)
                           +parseFloat( elt.diam_85)+ parseFloat( elt.diam_95)+ parseFloat( elt.diam_105) + parseFloat( elt.diam_115)+
                           parseFloat( elt.diam_125)+ parseFloat( elt.diam_135)+ parseFloat( elt.diam_145) + parseFloat( elt.diam_155)+
                           parseFloat( elt.diam_165)+ parseFloat( elt.diam_175)
                console.log('elt ',elt);
                let obinter = {ESSENCES:elt.nom, DIAM_45:elt.DIAM_45, DIAM_55:elt.diam_55, DIAM_65:elt.diam_65, 
                              DIAM_75:elt.diam_75,
                            DIAM_85:elt.diam_85, DIAM_95:elt.diam_95, DIAM_105:elt.diam_105, 
                            DIAM_115:elt.diam_115,
                            DIAM_125:elt.diam_125, 
                            DIAM_135:elt.diam_135, 
                            DIAM_145:elt.diam_145,DIAM_155:elt.diam_155, DIAM_165:elt.diam_165,
                            DIAM_175:elt.diam_175, TOTAL:elt.total}
                this.elementsToExport.push(obinter)
                return elt
              })
             // console.log('this.dataTableStock ',this.dataTableStock)
    
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
      items.isSelected =true;
      this.isRowselected=true
      this.selected = items
          console.log('selected',this.selected[0].idaac );
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
mounted() {
  this.getData()

  /*this.elements =this.elements1;
  this.elements=this.elements.map(elt =>{
                elt.diam_50 = elt.diametres[0].diam_50
                elt.diam_60 = elt.diametres[1].diam_60
                elt.diam_70 = elt.diametres[2].diam_70
                elt.diam_80 = elt.diametres[3].diam_80
                elt.diam_90 = elt.diametres[4].diam_90
                elt.diam_100 = elt.diametres[5].diam_100
                elt.diam_110 = elt.diametres[6].diam_110
                elt.diam_120 = elt.diametres[7].diam_120
                elt.diam_130 = elt.diametres[8].diam_130
                elt.diam_140 = elt.diametres[9].diam_140
                elt.diam_150 = elt.diametres[10].diam_150
                elt.diam_160 = elt.diametres[11].diam_160
                elt.diam_170 = elt.diametres[12].diam_170
                elt.diam_180 = elt.diametres[13].diam_180
                elt.total = parseFloat( elt.diam_50)+ parseFloat( elt.diam_60)+ parseFloat( elt.diam_70) + parseFloat( elt.diam_80)
                           +parseFloat( elt.diam_90)+ parseFloat( elt.diam_100)+ parseFloat( elt.diam_110) + parseFloat( elt.diam_120)+
                           parseFloat( elt.diam_130)+ parseFloat( elt.diam_140)+ parseFloat( elt.diam_150) + parseFloat( elt.diam_160)+
                           parseFloat( elt.diam_170)+ parseFloat( elt.diam_180)
                console.log('elt ',elt);
                let obinter = {ESSENCES:elt.nom, DIAM_50:elt.DIAM_50, DIAM_60:elt.diam_60, DIAM_70:elt.diam_70, 
                              DIAM_80:elt.diam_80,
                            DIAM_90:elt.diam_90, DIAM_100:elt.diam_100, DIAM_110:elt.diam_110, 
                            DIAM_120:elt.diam_120,
                            DIAM_130:elt.diam_130, 
                            DIAM_140:elt.diam_140,DIAM_150:elt.diam_150, DIAM_160:elt.diam_160,
                            DIAM_170:elt.diam_170, DIAM_180:elt.diam_180, TOTAL:elt.total}
                this.elementsToExport.push(obinter)
                return elt
              }) */
},
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
bottom: 30px;
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
margin-top: 10px;
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
cursor:pointer;
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