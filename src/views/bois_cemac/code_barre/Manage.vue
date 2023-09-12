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
            <b-collapse id="collapse-4" v-model="visible" class="m-3 p-3">
                  <b-row>
                  <b-col cols="2">
                      <sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="N° du lot" v-model="search.numlot" :reduceSize="width"/>
                      <sigif-form-group :sizeLabel="2" :sizeLabelLg="4" label="Titre" v-model="search.titre" class="w-75"/>
                  </b-col>
                  <b-col cols="3">
                     <sigif-form-group :sizeLabel="2" :sizeLabelLg="4" label="Site" v-model="search.site" />

                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0" style="width:35%">Usage</label>
                         <select v-model="search.usage" class="m-0 p-0" style="width: 63%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(usage, i) in optionsUsage" :value="usage.key" :key="i">
                             {{ usage.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                  </b-col>

                  <b-col cols="4">
                    <b-form-group>
                      <label for="" class="w-100 text-center" style="font-weight: 400">Date de la demande</label>
                    </b-form-group>
                      <b-row class="m-0">
                          <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Du</label><date-picker  v-model="search.datedeb"   format="DD-MM-YYYY" placeholder="date de début" valueType="YYYY-MM-DD" class="w-100" :clearable="false" /></b-col>
                          <b-col class="d-flex"><label for="" style="padding-right: 0.5rem">Au</label><date-picker  v-model="search.datefin"  format="DD-MM-YYYY" placeholder="date de fin"  valueType="YYYY-MM-DD" class="w-100" :clearable="false"/></b-col>
                      </b-row>
                  </b-col>
                 <b-col class="ml-1 position-relative">
                    <div>
                      <label for="" class="m-0 p-0">entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    </div>
                    <div class="w-100" style="position: absolute; bottom: 0; right:0">
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>
                  </b-col>
                </b-row>
              </b-collapse>
              </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"> Liste des lots de code à barres</h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="cancreateLotCodeBarre" @click.prevent="addLotCodeBarre" size="sm" :class="{'change-image-opacity': !cancreateLotCodeBarre,  'not-change-image-opacity': cancreateLotCodeBarre}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a :disabled="canDisableLot" size="sm" :class="{'change-image-opacity': !canDisableLot,  'not-change-image-opacity': canDisableLot}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDisableLot}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Désactiver</a>
                <a @click.prevent="showDetails" :disabled="canViewCodeBarre" size="sm" :class="{'change-image-opacity': !canViewCodeBarre,  'not-change-image-opacity': canViewCodeBarre}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewCodeBarre}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Consulter</a>
                <a  size="sm" :class="{'change-image-opacity': !canViewCodeBarre,  'not-change-image-opacity': canViewCodeBarre}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewCodeBarre}" src="@/assets/images/iconSUIVRE_16x16.png"></b-img>Suivi</a>
                <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>Imprimer</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn">Exporter</a>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
          <h4 style="color: green" class="text-center">
            Pas de 
            <span class="font-weight-bold">Codes</span> trouvés!!
          </h4>
        </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          <!--MODAL POUR AJOUTER UN CODE BARRE-->
          <b-modal id="modal-sm"  ref="codebarform" hide-footer  header-class="custom-bg"
      header-text-variant="light"
          >
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <CodeBarForm/>
              </div>
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
    import { mapGetters } from 'vuex'
    // import CodeBarForm from "@/views/codes_barres/codes_a_barres/Create.vue";
  import CodeBarForm from "@/components/forms/CodeBarForm.vue";

export default {
  name: "entree_parcs",
  components: {
    CodeBarForm
  },
  data: () => ({
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{
      entite: "",
	    numlot: "",
	    site: "",
	    usage: "",
	    titre: "",
	    datedeb: "",
	    datefin: ""
    },
    searchSubmitted:false,

    //données du tableaux
fields: [ 
	{ key: 'index', label: '' },{ key: 'numlot', label: 'N° du Lot' }, { key: 'datedemande', label: 'Date de la demande' },{key : 'site', label :'Site'},
    { key: 'typetitre', label: 'Type de titre' }, { key: 'titre', label: 'Titre' }, 
    { key: 'permis', label : 'Permis' }, { key: 'nombre', label: 'Nbrs de code à barre' }, { key: 'usage', label: 'Usage' },
	{ key: 'nonutiliser', label : 'Non utilisés' },{ key: 'utiliser', label : 'Utilisés' }, { key: 'desactiver', label: 'Désactivées' }],

elements: [],
   entite:{
      id:1,
      libelle:''
    },
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    width:"w-50",
    sizeLabelLg:'4',
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    searchSubmitted:false,
    disabled:false,
    //données du tableaux
    selected:{},
    width:"w-50",
    optionsUsage:[{key:"lettres de grumes", libelle: "lettres de grumes"}, {key:"Grume-abbattage", libelle: "Grume-abbattage"}, {key:"Lettre de voiture", libelle: "Lettre de voiture"}, {key:"Inventaire", libelle: "Inventaires"}],
    title:"Creation lot de code à barres",

  }),
  computed:{

    ...mapGetters(['user']),
    
    /*propriétés liées aux accèes*/
    canDisableLot(){return true;},
    cancreateLotCodeBarre(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewCodeBarre(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

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
     addLotCodeBarre(){
     this.$refs['codebarform'].show()
   },

  showDetails(){ this.$router.push({name: 'details_code_barres', params: { id: this.selected[0].numlot }}); },
  // createLotCodeBarre(){
  //   this.$bvModal.show('code_bar-form')
  // },
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
    this.getCodesBarresCemac()
  },
  getCodesBarresCemac(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );

      this.$boisCemac.get("codebarre", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
      
        this.elements = this.elements.map(elt =>{
          elt.permis = elt.permis == null ? "" : elt.permis.substring(0, 10) + '...'
          elt.typetitre = elt.typetitre == null ? "" : elt.typetitre.substring(0, 10) + '...'
          elt.datedemande = this.$dayjs(elt.datedemande).format('DD/MM/YY')+" "+this.$dayjs(elt.datedemande).format('HH:mm:ss')

          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
      });

  },
  filterTable() {
      this.isBusy=true
      this.$codesbarres.post("lot-codebarre/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt =>{
            elt.permis = elt.permis == null ? "" : elt.permis.substring(0, 10) + '...'
            elt.typetitre = elt.typetitre == null ? "" : elt.typetitre.substring(0, 10) + '...'
            elt.datedemande = this.$dayjs(elt.datedemande).format('DD-MM-YY')+" "+this.$dayjs(elt.datedemande).format('HH:mm:ss')

          return elt
        });
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
        });
    },

    resetSearcheBar(){
     this.search = {
      entite: "",
	    numlot: "",
	    site: "",
	    usage: "",
	    titre: "",
	    datedeb: "",
	    datefin: ""
    }
     localStorage.removeItem('sigif2./code_barres')
     
  },

    reset(){
    this.resetSearcheBar()
    this.getCodesBarres()
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
  handleAddLotCodeBar(){
    console.log('nouveau lot de code bar ajouté');
  }
  },
  

  mounted(){
    this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getCodesBarresCemac();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }

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
  cursor:pointer;
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
