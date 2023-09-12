<template>
    <div id="cover" class="min-vh-100">
          <div>
             <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row class="d-flex justify-content-between">
                  <b-col cols="3">
                    <sigif-form-group v-model="search.numtracking"  :sizeLabel="4" :sizeLabelLg="4" fontWeight="bold" label="N° tracking" :reduceSize="width"/>
                    <sigif-form-group  v-model="search.numtitre" :sizeLabel="4" :sizeLabelLg="4" fontWeight="bold" label="N° du titre" :reduceSize="width"/>
                    <sigif-form-group  v-model="search.exercice" :sizeLabel="4" :sizeLabelLg="4" fontWeight="bold" label="Exercice" :reduceSize="width"/>
                  </b-col>
                  <b-col cols="5" class="ml-2">
                    <b-overlay rounded="sm" :show="showOverlayTypestitres">
                      <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label="Type de titre" label-for="input-sm">
                        <v-select  @open="getTypestitres" :options="typesTitres" v-model="search.typetitre"  label="libelle" class="custom-select-type_titre">
                          
                        </v-select>
                        <!--<select @change.prevent="getTypestitres" v-model="search.typetitre" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(typeTitre, i) in typesTitres" :value="typeTitre.code" :key="i">
                              {{ typeTitre.label }}
                            </option>
                        </select>-->
                      </b-form-group>
                    </b-overlay>
      
                     <b-form-group   label-cols="3" label-cols-lg="3" label-size="sm" label="Statut" label-for="input-sm">
                         <select v-model="search.statut" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option value=""></option>
                            <option v-for="(statut, i) in optionsStatus" :value="statut.key" :key="i">
                              {{ statut.libelle }}
                            </option>
                          </select>
                     </b-form-group>
                     <sigif-form-group :sizeLabel="3" :sizeLabelLg="3" reduceSize="w-50" fontWeight="bold" label="Position" v-model="search.position"/>

                  </b-col>
                  <b-col cols="3" class="ml-1 position-relative">
                    <div>
                      <label for="">Entité forrestière</label>
                      <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                          <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                        </li>
                      </v-select>
                      <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select> 
                    </div>
                    <div class="w-100" style="position: absolute; bottom: 0; right:0">
                        <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </div>
                  </b-col>
              
                </b-row>
              
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col class="d-flex">
                <h4 class="tab-header-left-text mr-2">Liste des opérations de tracking</h4>
                <a :disabled="canVisualizeTracking" size="sm" :class="{'change-image-opacity': !canVisualizeTracking,  'not-change-image-opacity': canVisualizeTracking}"  class="mx-1 simple-btn"><b-img  src="@/assets/images/graph.png"></b-img>Visualiser</a>
              </b-col>
              <b-col class="col-md-auto">
                <span>
                  <b-button :disabled="!canCreateTracking"  @click.prevent="addTrackingLimite"  size="sm" :class="{'change-image-opacity': !canCreateTracking,  'not-change-image-opacity': canCreateTracking}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                  <b-button @click.prevent="setEditTracking" size="sm"   class="mx-1 simple-btn"><b-img  src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                  <b-button @click.prevent="doDeleteTracking" size="sm"  class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                  <delete-tracking-box ref="deleteDialogue"></delete-tracking-box>
                  <b-button :disabled="!canViewDetailTracking" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailTracking,  'not-change-image-opacity': canViewDetailTracking}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                </span>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template #table-busy >
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                  <h4 style="color: green" class="text-center">
                    Aucune
                    <span class="font-weight-bold"> opération de Tracking</span> trouvée!!
                  </h4>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  <template #cell(idtracking)="data">
                    <span>{{ data.item.idtracking }}</span>
                  </template>
                  <template #cell(file)="data">
                    <span v-if="data.item.file!==null"  style="color: green; font-weight:bold">
                      <a :href="data.item.file" target="_blank" v-b-tooltip.hover title="consulter">
                        <b-img src="@/assets/images/download.png"></b-img>
                      </a>
                      
                    </span>
                    <span v-else></span>
                  </template>
                 <template #cell(titreno)="data">
                     <span>{{ data.item.numtitre }}</span>
                </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
             <!--AJOUT D'UN ENREGISTREMENT TRACKING -->
          <b-modal id="modal-sm"    ref="trackinglimite-form" hide-footer  header-class="custom-bg" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
                  
              </template>
              <div>
                  <TrackingLimiteForm :editTracking="editTracking" :action="action"  @trackingAdded="handleAddTracking" @trackingAddedAndContinue="handleTrackingAddedAndContinue" />
              </div>
          </b-modal>

    </div>
</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import TrackingLimiteForm from "@/components/forms/inventaires/TrackingLimiteForm.vue";
   import DeleteTrackingBox from '@/components/utils/DeleteTrackingBox.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "form_trackings_limites",
  components:{
    TrackingLimiteForm,
    DeleteTrackingBox
  },
  data: () => ({
    entite:{
      idorganisation:'',
      libelle:''
    },
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
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
    search:{
      typetitre: "",
      numtracking: "",
      numtitre: "",
      exercice: "",
      position: "",
      entite: "",
      statut: ""
    },
    showOverlayTypestitres:false,
    searchSubmitted:false,
    disabled:false,

    typesTitres: [],

    //données du tableaux
    fields: [
      { key: 'index', label: '' },
      { key: 'idtracking', label: 'Tracking no', thStyle: { width: "8%" } },
      { key: 'file', label: '', thStyle: { width: "3%" } },
      { key: 'titreno', label: 'Titre no', thStyle: { width: "10%" } },
      { key: 'exercice', label: 'Exercice', thStyle: { width: "6%" }},
      { key: 'libelletypetitre', label: 'Type titre', thStyle: { width: "20%" }  }, 
      { key: 'entite', label: 'Entité', thStyle: { width: "20%" }  },
      { key: 'statut', label: 'Statut', thStyle: { width: "13%" }  },
      { key: 'position', label: 'Postion', thStyle: { width: "19%" } },
    ],
    elements: [],
    selected:{},
    /*propriétes lies au traitement d'une operation de parc */
    optionsStatus:[{key:"0", libelle: "Brouillon"},{key:"1", libelle: "vérifié"}, {key:"2", libelle: "Soumis"}, 
                   {key:"3", libelle: "vérifié par la déléguation"},{key:"7", libelle: "Approuvé"},{key:"8", libelle: "Rejeté"}
                   ,{key:"9", libelle: "mis à jour"} ],
 
    tracking:"",
    title:"Ajout d'un tracking",
    action:"add",
    editTracking:null,
      /*propriétes lies au traitement d'une operation de parc */
    title:"Enregistrement du tracking"
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    filteredEntites() {
          return this.entiteswithoutminfof.filter((entite) =>
            entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
          )
        },
        paginatedEntites() {
          return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
        },
        hasNextPageEntites() {
          const nextOffset = this.offsetEntites + this.limitEntites
          return Boolean(
            this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
          )
        },
        hasPrevPageEntites(){   
          const prevOffset = this.offsetEntites - this.limitEntites
          return Boolean(
            this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
          )
        },
    /*propriétés liées aux accèes*/
    canVisualizeTracking(){return this.hasAccess('CREER_UTILISATEUR')},
    canCreateTracking(){return true;  return this.hasAccess('CREER_UTILISATEUR')},
    canViewDetailTracking(){return true; return this.hasAccess('CREER_UTILISATEUR')},

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
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
 methods: {
  onSearchEntites(query){
    this.searchentite = query
    this.offsetEntites = 0
  },
  async getTypestitres(){
    console.log('1');
    this.showOverlayTypestitres = true;
    if (!php.empty(this.$store.state.typesTitres) ) {
      this.typesTitres = this.$store.state.typesTitres;
    } 
    else{
      try {
        this.typesTitres= await this.$donneesReference.get("types-titre?with_titre=true").then(response => response.data.result.items);
        this.$store.dispatch('typesTitres', this.typesTitres)
        console.log('typestitres ',this.typesTitres);
      } catch (error) {
        App.notifyError(error.message);
      }
    }
    this.showOverlayTypestitres = false;

  },
  async doDeleteTracking() {
      const ok = await this.$refs.deleteDialogue.show({
        title: 'Suppression du Tracking N°',
        numtracking: this.tracking.idtracking,
        numtitre: this.tracking.numtitre,
        exercice: this.tracking.exercice,
        typetitre: this.tracking.typetitre,
        okButton: 'oui',
        cancelButton: "Non",
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.deleteDialogue._close();
          this.$inventaire.delete(`tracking/${this.tracking.idtracking}`).then(response => {
              this.getTrackingLimites();
              return App.notifySuccess(response.data.message)
          }).catch(error => {
            App.notifyError(error.message);
          })
      } else {
        this.$refs.deleteDialogue._close();
      }
  },
  handleAddTracking() {
      this.getTrackingLimites();
      this.$refs['trackinglimite-form'].hide();
    },
    handleTrackingAddedAndContinue(){
      // this.$bvModal.hide("site-form");
      // this.getSites();
      // setTimeout(() => {this.$bvModal.show("site-form"); }, 500);
    },

    

     reset(){
      this.resetSearcheBar()
      this.getTrackingLimites()
    },

    resetSearcheBar(){
      this.search = {
        typetitre: "",
        numtracking: "",
        numtitre: "",
        exercice: "",
        position: "",
        entite: "",
        statut: ""
      }
      localStorage.removeItem('sigif2./inventaires-tracking_limites')
    },
    addTrackingLimite(){
      this.$refs['trackinglimite-form'].show()
    },
    setEditTracking(){
        this.action="edit"
        this.editTracking=this.tracking
        this.title="édition du tracking "+this.editTracking.idtracking
        this.$refs['trackinglimite-form'].show()
    },
    showDetails(){this.$router.push({name: 'details_tracking_limites', params: { id: this.selected[0].idtracking }});},
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
      this.tracking=items[0]
      items.isSelected =true;
      this.isRowselected=true
          this.selected = items
    },
    setVisualization(){
      console.log('to developp');
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
      this.getTrackingLimites()
    },
    getTrackingLimites(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        this.$inventaire.get("tracking", {params}).then(response => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          console.log('elements ',this.elements);
          this.elements = this.elements.map(elt =>{
              elt.entite=elt.entite.length>19?elt.entite.substring(0,19) + '...':elt.entite;
              elt.file=elt.tracking;
              elt.typetitre = elt.typetitre.libelle
              return elt
            })
  
            this.isBusy=false
        })
        .catch((error) => {
          console.log(error)
          this.isBusy=false
        });

    },
    filterTable(){
      let data={ typetitre: this.search.typetitre.code, numtracking: this.search.numtracking, numtitre: this.search.numtitre, exercice: this.search.exercice, 
                 position: this.search.position, entite:this.isMinfof?this.entite.idorganisation:this.user.idOrganisation,
                statut: this.search.statut }

        console.log('données',this.search);
        this.isBusy=true
        this.$inventaire.post("tracking/search", data).then((response) => {
          console.log('response entrées',response);
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
          
            storage.set(this.$route.path ,JSON.stringify(this.search))
              this.isBusy=false
          })
          .catch((error) => {
            this.isBusy=false
              console.log('c',error.response.data);
          });
      },
  },
  
    mounted(){
      // this.getTrackingLimites();
      this.entite.libelle=this.user.profil.organisation
      if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
        this.search=JSON.parse(storage.get(this.$route.path))
        this.filterTable();
      }else{this.getTrackingLimites();}
      if(!this.isMinfof){
        this.disabled=true
        this.entite.libelle=this.user.profil.organisation
        this.entite.idorganisation=this.user.idOrganisation
      }
    }
  }

</script>
<style scoped>
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
  flex-direction: row !important;;
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

  .form-control-xs {
    height: calc(1em + .500rem + 2px) !important;
    padding: .150rem .25rem !important;
    font-size: .75rem !important;
    line-height: 1.5;
    border-radius: .2rem;
    border-color: darkgreen
}

element.style {
    padding-top: 0px;
}
label:not(.form-check-label):not(.custom-file-label) {
    font-weight: 700;
}
.form-row>.col, .form-row>[class*=col-] {
    padding-right: 5px;
    padding-left: 5px;
}
</style>
<style>
.col-form-label-sm {
    padding-top: 0!important
}
.custum-vselect-border{
   --vs-border-color:  darkgreen;
   padding:0!important;
   }

</style>
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>