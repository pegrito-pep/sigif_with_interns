<template>
    <div id="cover" class="min-vh-100">
          <div>
            <div class="d-flex m-0 p-0">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            </div>

            <b-collapse id="collapse-4" v-model="visible" class="m-0 p-0">
              <b-card class="b-card">
                <b-row>
                  <b-col cols="2">
                    <div class="m-0">
                      <b-row class="m-0 d-flex flex-column">
                        <b-col class="d-flex"
                          ><label for="" style="padding-right: 0.5rem">Du</label
                          ><date-picker
                            v-model="search.datedeb"
                            format="dddd, DD MMMM YYYY"
                            placeholder="date de début"
                            valueType="YYYY-MM-DD"
                            class="w-100"
                            :clearable="false"
                        /></b-col>
                        <b-col class="d-flex mt-2"
                          ><label for="" style="padding-right: 0.5rem">Au</label
                          ><date-picker
                            v-model="search.datefin"
                            format="dddd, DD MMMM YYYY"
                            placeholder="date de fin"
                            valueType="YYYY-MM-DD"
                            class="w-100"
                            :clearable="false"
                        /></b-col>
                      </b-row>
                    </div>
                  </b-col>
           
           
               
                </b-row>
                <b-row class="ml-3"> 
                  <b-col cols="2" offset-md="9">
                    <search-bar-actions-buttons @search="filterTable" @reset="reset" />
                  </b-col>
                </b-row>
              </b-card>
            </b-collapse>
          </div>
          <div>
            <span class="mx-2" style="color: Black;font-size: medium;font-weight: bold;">Votre quota actuel est de {{ quotaactuel }}</span>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des feuillets Df10</h4></b-col>
              <b-col class="col-md-auto">
                <b-button @click.prevent="showSimulate" :disabled="!canCreateFeuillet" size="sm" :class="{'change-image-opacity': !canCreateFeuillet,  'not-change-image-opacity': canCreateFeuillet}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Simulate</b-button>
                <b-button @click.prevent="addFeuillet" :disabled="!canCreateFeuillet" size="sm" :class="{'change-image-opacity': !canCreateFeuillet,  'not-change-image-opacity': canCreateFeuillet}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1 w-50">
              <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" show-empty>
              <template v-slot:head(numfeuillet)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template v-slot:head(imprimer)="data">
                <span class="d-flex justify-content-center align-items-center" v-html="data.field.label"></span>
              </template>
              <template #empty>
                    <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">Titre</span> trouvé!!</h4>
              </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template  #cell(imprimer)="data">
                  <a @click.prevent="handleDownload(data.item.numfeuillet)" class="xal d-flex justify-content-center align-items-center" v-b-tooltip.hover href="#"><b-img src="@/assets/images/Attach_128x128.png"></b-img>Télécharger</a>
                </template>
                <template #cell(numfeuillet)="data">
                  <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.numfeuillet }}</b> </span>
                </template>
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          <infos-box ref="infosbox"></infos-box>

          <!--AJOUT D'UN FEUILLET DF10 -->
          <b-modal id="feuilletdf10-form"  ref="feuilletdf10-form"  hide-footer
            header-class="custom-bg"
            header-text-variant="light"
          >
            <template #modal-title>
              <div>
                <span class="font-weight-bold">{{ title }}</span>
              </div>
            </template>
              <div>
                  <feuilletdf10-form  @feuilletAdded="handleAddFeuillet" />
              </div>
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import Feuilletdf10Form from "@/components/forms/Feuilletd10Form.vue";
  import { mapGetters } from 'vuex'
  import InfosBox from '@/components/utils/InfosBox.vue';

export default {
  name: "feuillets_df10",
  components: {
    InfosBox,
    Feuilletdf10Form
  },
  data: () => ({
    isBusy:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    quotaactuel:0,
    visible: true,
    search:{
      datedeb:'',
      datefin:''
    },
    //données du tableaux
    fields: [ 
      { key: 'index', label: '',thStyle: { width: "1%"} }, 
      { key: 'numfeuillet', label: 'N° du feuillet',thStyle: { width: "9%" } }, 
      { key: 'datecrea', label: 'Date de création',thStyle: { width: "20%" } },
      { key: 'codebarre', label: 'Code barre',thStyle: { width: "9%" } },
      { key: 'imprimer', label: 'Imprimer',thStyle: { width: "9%" } },
    ],
    elements: [],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */
    title:'Ajout d\'un Feuillet',


  }),
  computed:{
    ...mapGetters(['user', 'hasAccess']),

    /*propriétés liées aux accèes*/
    canCreateFeuillet(){return true},
    canUpdateFeuillet(){ return this.hasAccess('UPDATE_FEUILLET') },
    canDeleteFeuillet(){ return this.hasAccess('DELETE_FEUILLET') },
    canViewDetailsFeuillet(){ return this.hasAccess('VIEW_DETAILS_FEUILLET') },
    canActiveFeuillet(){ return this.hasAccess('ACTIVE_FEUILLET') },
    canDesactiveFeuillet(){ return this.hasAccess('DESACTIVE_FEUILLET') },
    canVisualiserFeuillet(){ return this.hasAccess('VISUALIZE_FEUILLET') },

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
  watch:{
    elements(value){
      if(!php.empty(value)){
      setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    }
  },
 methods: {
  // downloadFile(){
  //   fetch('https://code.jquery.com/jquery-3.6.3.min.js',{
  //     method:'GET',
  //     mode:'cors',
  //     referrerPolicy: 'no-referrer'
  //   }).then(res=>res.blob())
  //     .then(res=>{
  //       console.log(res)
  //       const aElmt=document.createElement('a')
  //       aElmt.setAttribute('download','analytics')
  //       const href=URL.createObjectURL(res)
  //       aElmt.href=href
  //       aElmt.click()
  //       URL.revokeObjectURL(href)
  //     })
  //     .catch(err=>console.log(err.message))
  // },
  // download(){
  //   this.downloadFile()
  //   // console.log('lien cliqué')
  // },
  //impression du carnet de chantier
  handleDownload(numfeuillet){
    console.log('arrivée 1');

    /*let url = this.$JasperReport+'/JasperReport/carnetdf10/'+numfeuillet
    axios({
            url: url, // File URL Goes Here
            method: 'GET',
            responseType: 'blob',
          }).then((res) => {
              console.log('arrivée 2');
              var FILE =res
              //var FILE = window.URL.createObjectURL(new Blob([res]));
              console.log('arrivée 3');
              
              var docUrl = document.createElement('x');
              docUrl.href = FILE;
              docUrl.setAttribute('download', 'feuillet.pdf');
              document.body.appendChild(docUrl);
              docUrl.click();
        });*/
    console.log('num sélectionné ',numfeuillet);
    // let url = this.$JasperReport+'/JasperReport/carnetdf10/1403';
    let url = this.$JasperReport+'/JasperReport/carnetdf10/'+numfeuillet;
    /* JUST FOR TEST */
    fetch(url,{
      method:'GET',
      mode:'cors',
      referrerPolicy: 'no-referrer'
    }).then(res=>res.blob())
      .then(res=>{
        // console.log(res)
        const aElmt=document.createElement('a')
        aElmt.setAttribute('download','carnetdf10')
        const href=URL.createObjectURL(res)
        aElmt.href=href
        aElmt.target='_self'
        aElmt.click()
        URL.revokeObjectURL(href)
      })
      .catch(err=>console.log(err.message))
    var a = document.createElement('a');
    a.href = url;
    a.download;
    //a.setAttribute('target', '_blank');
    a.click();
  },
  showSimulate(){
    this.$router.push({'name': 'feuillet2_df_10'})
  },

  //traitement de l'évènement feuillet df10 ajouté
  handleAddFeuillet(){
    this.getFeuillets();
    this.$refs['feuilletdf10-form'].hide()
  },
  async addFeuillet(){
    if(this.quotaactuel==0){
      const ok = await this.$refs.infosbox.show({
        title: 'INFORMATION',
        raison:1,
        message: "Vous ne disposez pas d'un quota de feuillets",
        showOptions:false,
        okButton: 'oui',
        cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.infosbox._close();
      } else {
          this.$refs.infosbox._close();
      }
    }
    this.$refs['feuilletdf10-form'].show()
  },
  async getPermis(){
    try {
      const permis =  await this.$permis.get().then(response => response.data.result.items);
      // console.log(this.pays);
      // this.$store.dispatch('pays', this.pays)
      return permis;
    }
    catch (error) {
     console.log(error.message);
    }
  },
  viewDetailAbbattage(){
     this.$router.push({name :"details-abbattages_titres"})
  },
  createOperationParc(){this.$router.push({ name: "create-entree-parc" });},
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
        this.selected = items[0]
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
    this.getFeuillets()
  },
  filterTable(){
    console.log('recherche à implémenter feuillets df10');
  },
  reset(){
    console.log('reset champs de la recherche');
  },
  getFeuillets(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$abbattage.get("feuilletDf10", {params}).then(response => {

        this.total = response.data.result.TotalsElements
        this.currentPage = response.data.result.CurrentPage + 1
        this.elements=response.data.result.Items
        this.quotaactuel = response.data.result.Quota
        this.elements = this.elements.map(elt =>{
          elt.datecrea = elt.datecrea !==null ? this.$dayjs(elt.datecrea).format("DD/MM/YYYY")+' '+this.$dayjs(elt.datecrea).format('HH:mm:ss') :""
          return elt
        })
       // console.log('feuillets ',this.elements);
		      this.isBusy=false
       //setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
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
    this.getFeuillets();
  }
  }

</script>
<style scoped>
.xal{
  font-family: 'Verdana';
  font-weight: normal;
  font-size: 13px;
  white-space: nowrap;
  color: #175131;
}
.xal:hover{
  text-decoration: underline;
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
<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}
</style>