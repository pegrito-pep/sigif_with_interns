<template>
    <div id="cover" class="min-vh-100">
      <div class="d-flex">
        <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
      </div>

          <div>
              <b-col>
                <h4 class="tab-header-left-text"> 
                  <b-button
                    :class="visible ? null : 'collapsed'"
                    :aria-expanded="visible ? 'true' : 'false'"
                    aria-controls="collapse-4"
                    @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
                    <ul>
                      <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li>
                    </ul>
                  </b-button>Rechercher
                </h4>
              </b-col>
               <b-collapse id="collapse-4" v-model="visible">
                  <b-card class="b-card">
                    <b-row>
                      <b-col cols="3">
                        <b-form-group  class="mx-0 mt-2 p-0">
                          <label for="" class="m-0 p-0">N° du catalogue</label>
                          <input type="text"  v-model="search.numcatalogue"  placeholder="" style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                        </b-form-group>    
                        <b-form-group  class="mx-0 mt-2 p-0">
                            <label for="" class="m-0 p-0">Type de titre</label>
                            <select v-model="search.typetitre" class="m-0 p-0" style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option value="1"> Autorisation d'enlevement du bois </option>
                              <option value="2"> Autorisation de récupération du bois </option>
                              <option value="3"> Permis special</option>
                              <option value="4"> Autorisation personnelle de coupe</option>
                              <option value="5">Permis de bois d'oeuvre</option>
                            </select>
                        </b-form-group>
                      </b-col>
                      <b-col cols="3">
                        <b-form-group  class="mx-0 mt-2 p-0">
                          <label for="" class="m-0 p-0">Type de produit</label>
                          <v-select @open="getTypesProduit" style="width:75%!important" label="LIBELLE" :options="typesproduits" v-model="search.typeproduit" class="font-weight-bold custom-select-type_titre"></v-select>

                          <!--<select @change="getTypesProduit" v-model="search.typeproduit" class="m-0 p-0" style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(typeproduit, i) in typesproduits" :value="typeproduit.IDTYPE_PRODUIT" :key="i">
                              {{ typeproduit.LIBELLE }}
                            </option>
                          </select>-->
                        </b-form-group>    
                        <b-form-group  class="mx-0 mt-2 p-0">
                          <label for="" class="m-0 p-0">Statut</label><br>
                          <select v-model="search.statut" class="m-0 p-0" style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                              {{ status.libelle }}
                            </option>
                          </select>
                        </b-form-group>  
                      </b-col>
                      <b-col>
                        <b-overlay rounded="sm" :show="showOverlayEntites">
                          <template #overlay>
                            <div class="text-center">
                              <i class="fas fa-2x fa-sync fa-spin"></i>
                              <p id="cancel-label">Chargement...</p>
                            </div>
                          </template>
                         <div>
                          <label for="" class="m-0 p-0"><strong>Entité forestière</strong></label>
                          <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                              <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                            </li>
                          </v-select>
                          <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                          </select>     
                        </div><br>
                        </b-overlay>
                        <b-form-group  class="m-0 p-0">
                          <label for="" class="m-0 p-0">exercice</label><br>
                          <select  class="m-0 p-0 default-old-system-input-properties" v-model="search.exercice"  style="width: 25%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .200rem + 5px) !important;">
                            <option v-for="(exercice, i) in exercices" :value="exercice.libelle" :key="i">
                              {{ exercice.libelle }}
                            </option>
                          </select>
                          <!--<v-select style="width:30%!important" label="libelle" :options="exercices" v-model="search.exercice" class="font-weight-bold custom-select-type_titre"></v-select>-->
                        </b-form-group>
                      </b-col>
                      <!--<b-col cols="3" class="ml-2">
                          <sigif-form-group-vertical class="m-0 p-0 w-75" label='Attribué a' v-model="search.sigle"/>
                      
                          <b-form-group  class="m-0 p-0">
                            <label for="" class="m-0 p-0">exercice</label><br>
                            <v-select label="libelle" :options="exercices" v-model="search.exercice" class="font-weight-bold custom-select-type_titre"></v-select>
                          </b-form-group>
                      </b-col>-->
                    </b-row>
                    <b-row class="mt-1 d-flex justify-content-end">
                      <div class="search-bar-btn-group">
                        <b-col cols="2" class="position_absolute">
                          <div class="mt-4">
                            <search-bar-actions-buttons @search="filterTable" @reset="reset"/>
                          </div>
                        </b-col>
                      </div>
                    </b-row>
                  </b-card>
               </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text">Liste des catalogues</h4></b-col>
              <b-col class="col-md-auto">
                <b-button :disabled="!canCreatecatalogue" @click.prevent="addCatalogue" size="sm" :class="{'change-image-opacity': !canCreatecatalogue,  'not-change-image-opacity': canCreatecatalogue}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <b-button :disabled="!canUpdatecatalogue" size="sm" :class="{'change-image-opacity': !canUpdatecatalogue,  'not-change-image-opacity': canUpdatecatalogue}"  class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</b-button>
                <b-button @click.prevent="supprimerCatalogue" :disabled="!canDeletecatalogue||!canbeApprouveOrDelete" size="sm" :class="{'change-image-opacity': !canDeletecatalogue||!canbeApprouveOrDelete,  'not-change-image-opacity': canDeletecatalogue&&canbeApprouveOrDelete}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button  @click.prevent="showDetails" :disabled="!canViewDetailscatalogue" size="sm" :class="{'change-image-opacity': !canViewDetailscatalogue,  'not-change-image-opacity': canViewDetailscatalogue}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button @click.prevent="validerCatalogue" :disabled="!canApprouveCatalogue||!canbeApprouveOrDelete" size="sm" :class="{'change-image-opacity': !canApprouveCatalogue||!canbeApprouveOrDelete,  'not-change-image-opacity': canApprouveCatalogue&&canbeApprouveOrDelete}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img> Valider</b-button>
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass"  show-empty>
                <template #empty>
                  <h4 style="color:green" class="text-center">Aucun <span class="font-weight-bold">catalogue</span> trouvé!!</h4>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(typeProduit)="data">
                     <span v-if="data.item.typeProduit=='GR'">Grumes</span>
                     <span v-else>{{ data.item.typeProduit }}</span>
                 </template>
                 <template #cell(statut)="data">
                  <span v-if="data.item.statut=='0'"  >Brouillon</span>
                  <span v-else-if="data.item.statut=='2'">Approuvé</span>
              </template>
   
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  

          </div>
          <catalogue-box ref="catalogueBox" @validationcatalogueSet="handleValidation" @suppressioncatalogueSet="handleValidation"></catalogue-box>
          <TypeTitreDialog ref="typetitredialog"></TypeTitreDialog>
          <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
          
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import CatalogueBox from '@/components/utils/inventaire/CatalogueBox.vue';
  import TypeTitreDialog from '@/components/utils/inventaire/TypeTitreDialog.vue'
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

  import { mapGetters } from 'vuex'
export default {
  name: "catalogues",
  components:{CatalogueBox, TypeTitreDialog, CodeBarreInfo},
  data: () => ({
    entite:{
      idorganisation:'',
      libelle:''
    },
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
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    optionsStatus:[{key:"", libelle: ""}, {key:"0", libelle: "Brouillon"}, {key:"2", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
    search:{
      entite: "",
      typetitre: "", 
      typeproduit: "", 
      numcatalogue: "", 
      exercice: "", 
      position: "", 
      statut: ""         
    },

    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'numcatalogue', label: 'Catalogue no' },
        { key: 'typetitre', label: 'Type de titre' },
        { key: 'exercice', label: 'Exercice' },
        { key: 'typeProduit', label: 'Type de produit' }, 
        { key: 'statut', label: 'Statut', thStyle: { width: "8%" } },
        { key: 'attribuer', label: 'Attribué à' },
    ],
    elements: [],
    selected:{},
    exercices:[],
    typesproduits:[],
    //elements cration catalogue
    showOverlayTypestitre:false,
    notSetTypeTitre:false,
    typetitre:null,
    typesTitresCatalogues:[
      {idtypeTitre: 9, libelle:"Autorisation d'enlèvement du bois"},
      {idtypeTitre: 7, libelle:"Autorisation de récupération du bois"},
      {idtypeTitre: 10, libelle:"Permis Spécial"},
      {idtypeTitre: 11, libelle:"Autorisation personnelle de coupe"},
      {idtypeTitre: 8, libelle:"Permis de bois d'oeuvre"},
    ],
    submitted:false
  }),
  watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
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
    canCreatecatalogue(){return true; this.hasAccess('CREER_CATALOGUE')},
    canUpdatecatalogue(){return true; this.hasAccess('MODIFIER_CATALOGUE')},
    canDeletecatalogue(){return true; this.hasAccess('SUPPRIMER_CATALOGUE')},
    canViewDetailscatalogue(){return true; this.hasAccess('DETAIL_CATALOGUE')},
    canApprouveCatalogue(){return true; this.hasAccess('APPROUVER_CATALOGUE')},
    canbeApprouveOrDelete(){ 
      if(!php.empty(this.selected[0])&&this.selected[0].statut=='0' ){
        return true;
      }
      else{
        return false
      } 
    }, 
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
    }
  },
 
 methods: {
  showDetails() {
    this.$router.push({
      name: "details-catalogue",
      params: { id: this.selected[0].idcatalogue },
    });
  },
  
  handleValidation(response){
    this.$refs.catalogueBox._close();
    this.displayMessageFunction(response.data.message)
   // App.alertSuccess(response.data.message)
    this.getCatalogues();
  },
  async displayMessageFunction(message){
    const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: message,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
          } else {
            this.$refs.codebarreinfo._close();
          }
  },
  async getTypesProduit(){
    console.log('entrée type de produit');
    if(!php.empty(this.$store.state.typesproduits)){
          this.typesproduits=this.$store.state.typesproduits;
    }
    else{
      try {
            this.typesproduits = await this.$donneesReference.get("types-produits/raw").then(response => response.data.result);
            this.$store.dispatch('typesproduits', this.typesproduits)
        } catch (error) {
            console.log(error.message);
        }
    }
  },
   //methode de validation d'un catalogue
   async validerCatalogue() {
            const ok = await this.$refs.catalogueBox.show({
              commande:'validation',
               title: 'Validation',
               message:"Catalogue à valider : ",
               numcatalogue:this.selected[0].numcatalogue,
               idcatalogue:this.selected[0].idcatalogue,
               typetitre:this.selected[0].typetitre,
               organisation:this.selected[0].attribuer,
               okButton: 'Oui',
               cancelButton: "Non",
            })
    },

    //suppression de catalogue
    async supprimerCatalogue(){
      const ok = await this.$refs.catalogueBox.show({
              commande:'suppression',
               title: 'Suppression',
               message:"Catalogue à supprimer : ",
               numcatalogue:this.selected[0].numcatalogue,
               idcatalogue:this.selected[0].idcatalogue,
               typetitre:this.selected[0].typetitre,
               organisation:this.selected[0].attribuer,
               okButton: 'Oui',
               cancelButton: "Non",
            })
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
    if(!php.empty(items)){
        this.selected = items;
    }
  },
  addCatalogue(){
    return this.$refs.typetitredialog.show(
      {title:'Choix du type de titre'}
      )
     
  },
  getCatalogues(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
      this.$inventaire.get("catalogues", {params}).then(response => {
          console.log(response.data.result.items);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        console.log('elements ',this.elements);
        this.isBusy=false     
      })
      .catch((error) => {
        console.log('error ',error)
        this.isBusy=false
       
          if(error.response.data.code==403){
            return App.alertError('Vous n\'ètes pas authorisé à effectuer cette action')
          }
          else if(error.response.data.code==400){
              return App.alertError(error.response.data.message)
          }
          else if(error.response.data.code==500){
              return App.alertError('Erreur interne du Serveur')
          }
          else return App.alertError('Impossible de joindre le serveur')
        });
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
          this.getCatalogues()
        },
        filterTable(){
          let data={ 
              typetitre:this.search.typetitre,
              typeproduit:!php.empty(this.search.typeproduit)?this.search.typeproduit.IDTYPE_PRODUIT:'',
              numcatalogue:this.search.numcatalogue,
              exercice:this.search.exercice,
              statut:this.search.statut,
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
          console.log('response',data);
          this.isBusy=true
          this.$inventaire.post("catalogues/search", data).then((response) => {
            console.log('response entrées',response);
              this.total = response.data.result.totalItems
              this.currentPage = response.data.result.currentPage + 1
              this.elements=response.data.result.items
            
              this.elements = this.elements.map(elt =>{
                elt.type_operation=elt.parcOperationTypeopeparc.libelle
                elt.dateope = elt.dateope !==null ? this.$dayjs(elt.dateope).format('DD/MM/YYYY') :""
                elt.heureoper = elt.heureoper !==null ?  this.$dayjs(elt.heureoper).format('HH:mm') : ""
                elt.siteoperation=elt.siteoperation.intitule
                elt.status = elt.statutenr == 1 ? 'soumise' :"en cours"

                return elt
              })
              storage.set(this.$route.path ,JSON.stringify(this.search))
                this.isBusy=false
            })
            .catch((error) => {
              this.isBusy=false
              if(!php.empty(error)){
                App.alertError(error.response.data.message)
              }
            });
        },
        reset(){
          this.resetSearcheBar()
          this.getCatalogues()
        },
        resetSearcheBar(){
          this.search = {
            entite: "",
            typetitre: "", 
            typeproduit: "", 
            numcatalogue: "", 
            exercice: "", 
            position: "", 
            statut: "" 
          }
          storage.remove(this.$route.path)
        },
        getDates(){
          let exact = 2000 + new Date().getYear() - 100;
          for (let index = 0; index < 5; index++) {
          this.exercices.push({ libelle: exact - index, value: index + 1, },)
          }
          this.search.exercice=exact
        },
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
      }
 },
    mounted(){
    // return this.displayMessageFunction('catalogue validé avec succès')
      this.getDates();
      this.getCatalogues();
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
.inventaire-sigif-input{
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
    line-height: 1.5;
    border-radius: .2rem;
    border: 1px solid darkgreen;
    width: 100%;
    font-weight: 800;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: .25rem;
    /*box-shadow: inset 0 0 0 transparent;*/
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
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
  cursor:pointer;
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

</style>