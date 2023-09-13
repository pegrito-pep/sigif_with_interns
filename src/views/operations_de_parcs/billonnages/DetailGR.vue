<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button><span class="ml-1 font-weight-bold">Consultation Billonnage n° {{ billonnage.idoperation }}</span></h4>
            </b-col>
            <b-col class="col-md-auto">
              <span >
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!--<tab-head
            title="Consultation Billonnage n° "
            :idElement="(billonnage.idoperation).toString()"
            :fermer="fermer"
            :toggleSideBar="toggleSideBar"
          >
          </tab-head>-->
        </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="3">
            <P> site: <strong>{{ billonnage.intitulesite }}</strong>
             <b-badge pill variant="secondary">{{ billonnage.libelletypsiteoper }}</b-badge> 
            </P>
          </b-col>
          <b-col cols="3">
            <P> Date opération: <strong>{{ $dayjs(billonnage.dateoper).format('DD/MM/YYYY') }}</strong> </P>
          </b-col>
          <b-col cols="3" v-if="billonnage!=null&&billonnage.heureoper!=''">
            <p> Heure: <strong>  {{ $dayjs(this.billonnage.heureoper).format('HH:MM') }}</strong> </p>
          </b-col>
          <b-col cols="3">
            <p> Statut: 
              <b-badge v-if="billonnage.statut=='Brouillon'" pill variant="danger">{{ billonnage.statut }}</b-badge>
              <b-badge v-else-if="billonnage.statut=='Validée'" pill variant="secondary">{{ billonnage.statut }}</b-badge>
              <b-badge v-else-if="billonnage.statut=='Soumise'" pill variant="success">{{ billonnage.statut }}</b-badge>
            </p>
          </b-col>
        </b-row>
      </b-card>
      <!--entete des tableaux -->
        <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col class="d-flex"><h4 class="tab-header-left-text mb-0"> Liste des Grumes </h4>
            <h4 class="mx-2">Nombre Total : <b>{{ billonnage.nbGrumes }}</b></h4>
            <h4 class="mx-2">Volume Total : <b>{{ billonnage.volGrumes  }} m <sup>3</sup></b></h4>
            <b-button v-if="billonnage.statut=='Brouillon'" @click.prevent="validerBillonnage" size="sm"
              class="mx-1 simple-btn not-change-image-opacity" >
              <b-img  src="@/assets/images/iconVALIDER_16x16.png"></b-img>
              valider
            </b-button>
            <b-button  v-if="billonnage.statut=='Validée'" @click.prevent="soumettreBillonnage"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
              <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
              soumettre
            </b-button>
            </b-col>
          </b-row>
        </div>
      <!--implémentation tableau proprement dite-->
        <div class="ml-1">
             <b-table sticky-header="250px" :busy="isBusy" hover select-mode="single" responsive="sm" :items="itemsGrumes"  :fields="fieldsGrumes" :tbody-tr-class="rowClass" ref="tableGrumes" selectable @row-selected="onRowSelected">
                <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(reference)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(lignedf10)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diametrepb)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(diametregb)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template v-slot:head(volume)="data">
                    <span class="d-flex justify-content-center align-items-center">
                      <span v-html="data.field.label" style="color:green"></span><span style="color:green">(m<sup>3</sup>)</span>
                    </span>
                  </template>  
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <input type="text" disabled v-model="data.item.codebarre" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;color: inherit">
                    </template> 
                    <template #cell(reference)="data">
                      <input type="text" disabled v-model="data.item.sequence" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;color: inherit">
                    </template> 
                   <template #cell(lignedf10)="data">
                      <input type="text" disabled v-model="data.item.numdf10" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;color: inherit">
                    </template> 
                    <template #cell(essence)="data">
                      <input type="text" disabled v-model="data.item.essence" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;color: inherit">
                    </template> 
                    <template #cell(diametrepb)="data">
                      <input type="text" disabled v-model="data.item.dpb" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;text-align: right;color: inherit">
                    </template> 
                    <template #cell(diametregb)="data">
                      <input type="text" disabled v-model="data.item.dgb" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;text-align: right;color: inherit">
                    </template> 
                    <template #cell(longueur)="data">
                      <input type="text" disabled v-model="data.item.longueur" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;text-align: right;color: inherit">
                    </template>
                    <template #cell(volume)="data">
                      <input type="text" disabled v-model="data.item.volume" class="form-control-xs m-1 w-75" style="background:#82C138; border: 1px solid white;text-align: right;color: inherit">
                    </template> 
                </b-table>
          </div>
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col class="d-flex"><h4 class="tab-header-left-text mb-0"> Liste des Billons </h4>
                <h3  class="mx-2"><b-badge variant>{{ billonnage.nbBillons }}<span v-if="billonnage.nbBillons>1">s</span>Grume</b-badge></h3> 
                <h3  class="mx-2"><b-badge><b>{{ billonnage.volBillons  }} m <sup>3</sup></b></b-badge></h3> 
                <a href="" v-b-tooltip.hover.top="'Exporter les billons'"><h4><b-img src="@/assets/images/excel.png"></b-img></h4></a>
              </b-col>
            </b-row>
          </div>
          <!--<div style="border-top:5px solid #82C138; min-height: 40px; border-bottom:5px solid #82C138;"></div>-->
          <div class="ml-1 mr-1">
             <b-table sticky-header="250px" :busy="isBusyBillons" hover select-mode="single" responsive="sm" :items="itemsBillons"  :fields="fieldsBillons" :tbody-tr-class="rowClassBillons" ref="tableBillons" selectable @row-selected="onRowSelected" show-empty>
                <template v-slot:head(codebarre)="data"><span v-html="data.field.label"  style="color:green; margin-left:40%; font-size:0.7rem"></span></template>
                <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(numbillon)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(diametrepb)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(diametregb)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span><span style="color:green">(m<sup>3</sup>)</span></template>
                <template v-slot:head(abandonner)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                <template v-slot:head(position)="data"><span v-html="data.field.label" style="color:green; font-size:0.7rem"></span></template>
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                    <template #empty>
                      <h4 style="color:green" class="text-center">Pas de billon rattaché à cette grumme !!</h4>
                    </template>
                   
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    <template #cell(codebarre)="data">
                      <div class="d-flex">
                        <input type="text" disabled v-model="data.item.cbmere" class="form-control-xs m-1 w-50" style="background:#fff; border: 1px solid white;color: black" />
                        <input type="text" disabled v-model="data.item.codebarre" class="form-control-xs m-1 w-50" style="background:#fff; border: 1px solid white;color: black">
                      </div>
                      
                    </template> 
                    <template #cell(sequence)="data">
                      <input type="text" disabled v-model="data.item.sequence" class="form-control-xs m-1 w-75" style="border: 1px solid white;color: black">
                    </template> 
                   <template #cell(lignedf10)="data">
                      <input type="text" disabled v-model="data.item.numdf10" class="form-control-xs m-1 w-75" style="background:red; border: 1px solid white;color: black">
                    </template> 
                    <template #cell(essence)="data">
                      <input type="text" disabled v-model="data.item.essence" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;color: black">
                    </template> 
                    <template #cell(numbillon)="data">
                      <input type="text" disabled v-model="data.item.numdf10" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;color: black">
                    </template> 
                    <template #cell(diametrepb)="data">
                      <input type="text" disabled v-model="data.item.dpb" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;text-align: right;color: black">
                    </template> 
                    <template #cell(diametregb)="data">
                      <input type="text" disabled v-model="data.item.dgb" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;text-align: right;color: black">
                    </template> 
                    <template #cell(longueur)="data">
                      <input type="text" disabled v-model="data.item.longueur" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;text-align: right;color: black">
                    </template>
                    <template #cell(volume)="data">
                      <input type="text" disabled v-model="data.item.volume" class="form-control-xs m-1 w-75" style="background:#fff; border: 1px solid white;text-align: right">
                    </template>
                    <template #cell(abandonner)="data">
                      <span disabled style="display: flex;justify-content: center;align-items: center;" ><b-form-checkbox  :checked="data.item.abandonner==0 ? 'true' : 'false'" disabled></b-form-checkbox></span>
                    </template>
                    <template #cell(position)="data">
                      <span>
                        <select name="" id="" disabled><option :value="data.item.position"></option></select>
                      </span>
                    </template>   
             </b-table>
          </div>
           <!--AJOUT DE LA PAGINATION -->
          <paginator
            hr="top"
            :offset="offset"
            :total="total"
            :limit="perPage"
            :page="currentPage"
            @pageChanged="changePage"
            @limitChanged="(limit) => { perPage = limit;}"
          />
      </b-overlay>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import TabHead from '@/components/TabHead.vue'

export default {
  name: "detail-billonnage-GR",
  components:{
    TabHead
  },
  data: () => ({
    /**données liées au modal d'ajout d'un utilisateur */
    showOverlay:false,
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isBusyBillons:false,
    isRowselected:false,
    billonnage:{},
    selectWidht:"w-50",
    fieldsGrumes: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "codes à barres" },{ key: "reference", label: "Référence" },
        { key: "lignedf10", label: "Ligne DF 10" }, { key: "essence", label: "Essence", thStyle: { width: "30%" } }, { key: "diametrepb", label: "Diamètre petit bout(cm)" },
        { key: "diametregb", label: "Diamètre gros bout(cm)" }, { key: "longueur", label: "Longueur(m)" },
        { key: "volume", label: "Volume" }
    ],
    itemsGrumes:[],
    fieldsBillons: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre", thStyle: { width: "16%" }},{ key: "sequence", label: "Séquence" },
        { key: "essence", label: "Essence", thStyle: { width: "15%" } }, { key: "numbillon", label: "N° Billon", thStyle: { width: "9%" } }, { key: "diametrepb", label: "Diamètre Petit bout(cm)", thStyle: { width: "10%" } },
        { key: "diametregb", label: "Diamètre Gros bout(cm)", thStyle: { width: "12%" } }, 
        { key: "longueur", label: "Longueur(m)", thStyle: { width: "9%" } }, { key: "volume", label: "Volume", thStyle: { width: "9%" }  }, { key: "abandonner", label: "Abandonné ?"  },
        { key: "position", label: "Position" },
    ],
    itemsBillons:[],
    options:["valide"],
    positions:[{libelle:"non défini"}],
    selected:{},
    setSelected:0,
    total:0,
    currentPage:1,
    perPage:10,

  }),
  computed:{
    items() { 
      return this.itemsProduits.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      console.log('entree row class');
      if(this.setSelected==0){this.$refs['tableGrumes'].selectRow(0);this.setSelected=this.setSelected+1}
      
       return 'table-row-other'
    }else{
      return 
    }
  },
   rowClassBillons(item, type) {
    if(item !=''&&item!=null){
       return 'table-row-other'
    }else{
      return 
    }
  },

   onRowSelected(items) {
    this.isBusyBillons = true
    items.isSelected =true;
        this.selected = items
       // this.itemsBillons=this.selected[0].billons
    setTimeout(() => {this.isBusyBillons = false }, 500)
    console.log('row selected',this.selected);
  },
  validerBillonnage(){
      this.showOverlay = true;
      try {
        this.$operationParc.put('billonages/validerbillonage/'+this.billonnage.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsBillonnage();
        })  
          } catch (error) {
            this.showOverlay = false
            return this.errorHappened(error.response.data)
          }
    },
    soumettreBillonnage(){
      try {
        this.$operationParc.put('billonages/soumettre/'+this.billonnage.idoperation).then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsBillonnage();
        })  
          } catch (error) {
            this.showOverlay = false
            return this.errorHappened(error.response.data)
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
  async getDetailsBillonnage() {
    this.showOverlay = true
    const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
    );
    await this.$operationParc.get('billonages/' +this.$route.params.id, {params}).then(response =>{
      console.log('response ',response.data.items);
      this.billonnage=response.data.items
      this.total=response.data.totalItems
      this.currentPage=response.data.currentPage +1
    } )
    console.log('date ',this.$dayjs(this.billonnage.dateoper).format('DD/MM/YYYY'));
    console.log('heure ',this.$dayjs(this.billonnage.heureoper).format('HH:MM'));
   /* if(this.billonnage.dateoper!=null&&this.billonnage.dateoper!=''){
      this.billonnage.dateoper=this.billonnage.dateoper.split('T')[0].replace(/-/g, "/")
    }
    if(this.billonnage.heureoper!=null&&this.billonnage.heureoper!=''){
      this.billonnage.heureoper=this.billonnage.heureoper.split('T')[1]
       this.billonnage.heureoper=this.billonnage.heureoper.split('.')[0]
    }*/
    this.billonnage.volGrumes =  this.billonnage.volGrumes !=null ? this.billonnage.volGrumes.toFixed(3) :''
    this.billonnage.volBillons =  this.billonnage.volBillons !=null ? this.billonnage.volBillons.toFixed(3) :''
    this.itemsGrumes=this.billonnage.grummes
    this.itemsBillons=this.billonnage.billons
    console.log('grumes ',this.itemsGrumes,' itembillons ',this.itemsBillons);
    this.itemsBillons.map(elt => {
      elt.volume =elt.volume !=null ? elt.volume.toFixed(3) :''
    })
    
    this.showOverlay = false
  },
  changePage(page) {
      this.currentPage = page;
      this.getDetailsBillonnage();
    },
  fermer() {this.$router.push({name: "billonnages"});},

  toggleSideBar() {
      var sidebar = document.querySelector("#sidebar");
      var administration = document.querySelector("#administration");
      var administrationItem = document.querySelectorAll(".administrationItem");
      var actionButton = document.querySelector("#toggleSideBar");

      if (sidebar.style.width !== "0px") {
        sidebar.style.width = "0px";
        sidebar.style.transition = "all 0.5s ease";
        administration.style.backgroundColor = "white";
        administration.style.transition = "background-color 0.2s ease";
        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "0";
          element.style.transition = "opacity 0.2s ease";
        }
        actionButton.innerHTML =
          '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
      } else {
        sidebar.style.width = "250px";
        sidebar.style.transition = "all 0.3s ease";
        administration.style.backgroundColor = "#82C138";
        administration.style.transition = "background-color 0.8s ease";

        for (let index = 0; index < administrationItem.length; index++) {
          const element = administrationItem[index];
          element.style.opacity = "100%";
          element.style.transition = "opacity 1s ease";
        }

        actionButton.innerHTML =
          '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
      }
  }

 },
 
  beforeMount() {
    this.getDetailsBillonnage();
  }
  }

</script>
<style scoped>
.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}






/*edti style par defaut btn-bootstrap au disable*/

</style>
<style>

  .detail-billonnage-bg{
    background-color: green;
  } 
  .table-row-other{
  background-color: #caf09e;
}  
</style>