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
                   <b-col cols="3">
                    <sigif-form-group :sizeLabel="2" :sizeLabelLg="4" label="Nom du fichier" v-model="search.nomfichier"/>
                  </b-col>
                </b-row>
                <b-row class="position_absolute">
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
              <b-col><h4 class="tab-header-left-text"> Liste des modèles d'imports</h4></b-col>
              <b-col class="col-md-auto">
                
                <span >
                  <a  @click.prevent="showDetails"  size="sm" :class="{'change-image-opacity': !canViewModeleFichier,  'not-change-image-opacity': canViewModeleFichier}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>

                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1 w-50">
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

                 <template  #cell(nomfichier)="data">

                   <a v-b-tooltip.hover title="Télécharger" :href="data.item.downloadurl"><b-img src="@/assets/images/Attach_128x128.png"></b-img></a>

                   <a class=" text-dark ml-3" :href="data.item.downloadurl">{{ data.item.intituleModelImport }}.csv</a>
                   
              
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b></template>

              </b-table>
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' );
  import { mapGetters } from "vuex";
export default {
  name: "entree_parcs",
  data: () => ({
    isBusy:false,
    isRowselected:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    entite:{
      id:1,
      libelle:''
    }, 
    search:{
      nomfichier:""
    },
    //données du tableaux
    fields: [ 
              { key: 'intituleModelImport', label: 'Nom du modèle d\' import' },
              { key: 'nomfichier', label: 'Nom du fichier' },
             
             ],
    elements: [
  
    ],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */

   
  }),
  computed:{
    ...mapGetters(['user', 'hasAccess']),
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    /*propriétés liées aux accèes*/
    canViewModeleFichier(){ return true;  return this.hasAccess('CONSULTER_MODELES_FICHIERS')},
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
     showDetails(){ this.$router.push({name: 'details_fichiers', params: { id: this.selected[0].idmodelImport }}); },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
    getModelFichier(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$administration.get("modeles-import", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

        this.elements = this.elements.map(elt =>{
          return elt
        })
		      this.isBusy=false
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        this.isBusy = false;
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          else if(error.response.data.status==403){
            return App.alertError('Vous n\'avez pas le droit de consulter cete page')
          }
          return App.alertError('Impossible de joindre le serveur')
      });

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
    this.getModelFichier()
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
    if (
      JSON.parse(
        storage.get(this.$route.path) !== "" &&
          JSON.parse(storage.get(this.$route.path) !== null)
      )
      ) {
        this.search = JSON.parse(storage.get(this.$route.path));
        this.filterTable();
      } else {
        this.getModelFichier();
      }
      if(!this.isMinfof){
        this.entite.libelle=this.user.profil.organisation
        this.entite.idorganisation=this.user.idOrganisation
      }
  }

  }

</script>
<style scoped>
.position_absolute{
  position: absolute;
  top: 18px;
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

</style>