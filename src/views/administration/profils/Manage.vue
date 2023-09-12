<template>
    <div id="cover" class="min-vh-100">
        <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
             <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }" ></li></ul>  </b-button>
            </div>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col class="b-col" cols="3">
                    <b-form-group
                    id="fieldset-1"
                    label="intitule"
                    label-for="input-1">
                      <b-form-input class="form-control-xs" id="input-1" v-model="search.intitule"  trim></b-form-input>
                  </b-form-group>
                  </b-col>

                  
                  <b-col cols="3" class="b-col">
                    <b-overlay rounded="sm" :show="showOverlayTypesProflis">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                        <b-form-group id="fieldset-1" :label="$t('data.type_de_profil')" label-for="input-1">
                          <v-select v-model="search.typeprofil" @open="getTypesProfils" label="libelleTypeProfil"  :options="allProfiles" class="custom-select-type_titre"></v-select>
                        </b-form-group>
                    </b-overlay>
                  </b-col>
                  
                  <b-col cols="3" class="b-col">
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                        <b-form-group
                          id="fieldset-1"
                          :label="$t('data.Entité_forestière')"
                          label-for="input-1"
                        >
                          <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                              <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                          </v-select>
                          <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                          </select>
                        </b-form-group>
                    </b-overlay> 

                  </b-col>
                  
                  <b-col cols="2">
                    <b-row class="ml-3">
                      <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                    </b-row>
                  </b-col>
                </b-row>
              </b-card>
            </b-collapse>
          </div>
        </b-overlay>

          <!--entete des tableaux -->
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col><h4 class="tab-header-left-text">{{ $t('data.Profils') }}</h4></b-col>
                <b-col class="col-md-auto">
                  <b-button :disabled="!canCreateProfil" @click.prevent="addProfil" size="sm" :class="{'change-image-opacity': !canCreateProfil,  'not-change-image-opacity': canCreateProfil}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>{{ $t('data.Créer') }}</b-button>
                  <span>
                    <b-button :disabled="!canUpdateProfil"  @click.prevent="setEditProfil" size="sm" :class="{'change-image-opacity': !canUpdateProfil,  'not-change-image-opacity': canUpdateProfil}"  class="mx-1 simple-btn"><b-img  src="@/assets/images/iconMODIFIER_16x16.png"></b-img>{{ $t('data.Modifier') }}</b-button>
                    <b-button :disabled="!canDeleteProfil" @click.prevent="doDelete" size="sm" :class="{'change-image-opacity': !canDeleteProfil,  'not-change-image-opacity': canDeleteProfil}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>{{ $t('data.Supprimer') }}</b-button>
                    <delete-box ref="deleteDialogue"></delete-box>
                    <b-button :disabled="!canViewDetailsProfil" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsProfil,  'not-change-image-opacity': canViewDetailsProfil}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>{{ $t('data.Consulter') }}</b-button>
                  </span>
                  
                </b-col>
              </b-row>
              </div>
          <!--implémentation tableau proprement dite-->
          <div class="mx-1">
              <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                  <template #empty>
                    <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">profil</span> trouvé!!</h4>
                  </template>
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                      
                    </div>
                  </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>
            <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          <!--MODAL POUR AJOUTER / MODIFIER  UN PROFIL -->
          <b-modal id="profil-form" size="xl"  :title="title" :header-bg-variant="headerBgVariant" :body-bg-variant="bodyBgVariant"  no-close-on-backdrop hide-footer header-class="custom-bg" header-text-variant="light" @hidden="resetModal">
            <profil-form  @profilAdded="handleAddedProfil" @profilAddedAndContinue="handleProfilAddedAndContinue" @profilEdited="handleAddedProfil"  :editProfil="editProfil" :action="action"  />
          </b-modal>
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import ProfilForm from '@/components/Administration/ProfilForm.vue';
  import DeleteBox from '@/components/utils/DeleteprofilBox.vue';

  import { mapGetters } from "vuex";
export default {
  name: "profils",
  components:{
        ProfilForm,
        DeleteBox
        
    },
  data: () => ({
    /**données liées à la barre de recherche*/
    showOverlayEntites:false,
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    showOverlay:false,
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
    allProfiles:[],

    //données du tableaux
    fields: [ { key: 'index', label: '',thStyle: { width: "5%" } }, 
              { key: 'intitule', label: 'Intitulé',thStyle: { width: "40%" }, }, 
              { key: 'organisation', label: 'Entité',thStyle: { width: "25%" }, },
              { key: 'libelleTypeProfil', label: 'Type de Profil',thStyle: { width: "15%" }, }],
    elements: [],
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
    search:{
      intitule:"",
      typeprofil:"",
      entite:""
    }, 
    entite:{
      id:1,
      libelle:''
    }, 
    profil:{},
    editProfil:null,
    action:'add',
    title:"Ajout d'un profil d'utilisateur",
    showOverlayTypesProflis:false
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
    canCreateProfil(){ return this.hasAccess('CREER_PROFIL')},
    canUpdateProfil(){ return this.hasAccess('MODIFIER_PROFIL')},
    canDeleteProfil(){ return this.hasAccess('SUPPRIMER_PROFIL')},
    canViewDetailsProfil(){return this.hasAccess('CONSULTER_PROFIL')},

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
      async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=800").then(response => response.data.result.items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
      },
      onSearchEntites(query){
        this.searchentite = query
        this.offsetEntites = 0
      },
      showDetails(){ this.$router.push({name: 'details-profil', params: { id: this.profil.idProfil }}); },
      addProfil() {
        this.$bvModal.show('profil-form')
          //this.$router.push({ name: "profil-form" });
      },
      rowClass(item, type) {
        if(item !=''&&item!=null){
          if (item.isEven) return 'table-row-other'
          if (!item || type !== 'row') return 'table-info'
        }else{
          return 
        }
      },
      async doDelete() {
        const ok = await this.$refs.deleteDialogue.show({
          title: 'Suppression du profil',
          message: '',
          nom:this.profil.typeProfil,
          intitule:this.profil.institule,
            okButton: 'oui',
          cancelButton: "Non",
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.deleteDialogue._close();
            this.$administration.delete(`profils/${this.profil.idProfil}`).then(response => {
                this.getProfils();
                return App.notifySuccess(response.data.message)
            }).catch(error => {
              App.notifyError(error.message);
            })
        } else {
          this.$refs.deleteDialogue._close();
        }
      },
      onRowSelected(item) {
        this.profil=item[0]
        item.isSelected =true;
        this.isRowselected=true
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
      deleteProfil(){
        console.log('profil',this.profil);
        this.$swal({
        title: 'etes-vous sur de vouloir supprimer le profil ' +`${this.profil.institule}`+ '?',
        showDenyButton: true,
        confirmButtonText: 'Oui',
        denyButtonText: `Non`,
        }).then((result) =>  {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            console.log('1');
            this.$administration.delete(`profils/${this.profil.idProfil}`).then(response => {
                        this.getProfils();
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                      App.notifyError(error.message);
                    })
          } else if (result.isDenied) {
            //Swal.fire('Changes are not saved', '', 'info')
          }
        });
      },
      setEditProfil(){
        this.action="edit"
        this.editProfil=this.profil
        this.title="édition du profil "+this.editProfil.institule
        //this.$router.push({ name: "profil-form" });
        this.$bvModal.show('profil-form')
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
        this.getProfils()
      },
      async getProfils(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        await this.$administration.get("profils", {params}).then(response => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
         
            this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          else if(error.response.data.status==403){
            return App.alertError('Vous n\'avez pas le droit de consulter cete page')
          }
          return App.alertError('Impossible de joindre le serveur')
        });

      },
      async getTypesProfils() {
              this.showOverlayTypesProflis=true;
            if(!php.empty(this.$store.state.typesProfils)){
              this.allProfiles=this.$store.state.typesProfils
              this.showOverlayTypesProflis=false; 
            }else{
              try {
                await this.$administration.get('types-profils').then(response => {
                    console.log('result',response.data.result.Items);
                    this.allProfiles=response.data.result.Items                                                                                                        
                    this.$store.dispatch('typesProfils', this.allProfiles)
                    this.showOverlayTypesProflis=false; 
                })
              } catch (error) {
                App.notifyError(error.message);
                this.showOverlayTypesProflis=false;
              }
            }
            this.showOverlay = false;
      },
      filterTable(){
        let data={ 
            intitule: this.search.intitule, 
            typeProfil: this.search.typeprofil!=null?this.search.typeprofil.idTypeProfil:'',
          }
          if(this.isMinfof){
            if(!php.empty(this.search.entite)){
              data.entite = this.search.entite.idorganisation
            }else{
              data.entite =""
            }
          }else{
            data.entite = this.entite.idorganisation
          }
          this.isBusy=true
          this.$administration.post("profils/search", data).then((response) => {
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
            storage.set(this.$route.path ,JSON.stringify(this.search))
            this.isBusy=false
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
    resetSearcheBar(){
      this.search = {
        intitule: "",
        typeprofil: "",
        entite: "",
      }
      storage.remove(this.$route.path)
    },
    reset(){
      this.resetSearcheBar()
      this.getProfils()
    },
      /*addProfil(){this.$bvModal.show('profil-form')},*/
      async handleAddedProfil(){
        await this.getProfils();
        this.$bvModal.hide('profil-form');  
      },
      async handleProfilAddedAndContinue(){
        await this.getProfils();
        this.$bvModal.hide('profil-form');
        setTimeout(() => {this.$bvModal.show("profil-form"); }, 500);
      },
      resetModal(){
        this.editProfil=null;
        //this.action='add';
        this.title="Ajout d'un profil d'utilisateur";
      },
      
    },
    async mounted(){
      if (
      JSON.parse(
        storage.get(this.$route.path) !== "" &&
          JSON.parse(storage.get(this.$route.path) !== null)
      )
      ) {
        this.search = JSON.parse(storage.get(this.$route.path));
        this.filterTable();
      } else {
        this.getProfils();
      }
      if(!this.isMinfof){
        this.entite.libelle=this.user.profil.organisation
        this.entite.idorganisation=this.user.idOrganisation
      }

    }
  }

</script>
<style scoped>

.pagination {
  display: flex;
  margin: 0.25rem 0.25rem 0;
}
.pagination button {
  flex-grow: 1;
}
.pagination button:hover {
  cursor: pointer;
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
  background-color: white !important;
  border-color: white !important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44) !important;
  border-color: white !important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover {
  cursor: pointer;
  color: #82c138;
}
.change-image-opacity {
  opacity: 0.15;
}
.not-change-image-opacity {
  opacity: 1;
}
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }

</style>
<style>
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
}
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>