<template>
    <div id="cover" class="min-vh-100">
          <div class="ml-1 mt-1">
             <div class="d-flex">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
            <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"><span class="font-weight-bold">Rechercher</span></li></ul>  </b-button>
            </div>

            
              <!-- <ul class="nav nav-tabs">
              <li class="nav-item" :class="{ custumSigifTab: section !== 'verifInventaires' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'inventaires'"
                  >Liste des inventaires</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: section !== 'inventaires' }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'verifInventaires'"
                  >Liste des vérification d'inventaires</a
                  >
              </li>
              
            </ul> -->
              <b-collapse id="collapse-4" v-model="visible" class="mx-2 mb-2">
                  <b-row>
                  <b-col cols="2">
                      <sigif-form-group-vertical label="N° Titre" v-model="search.numtitre" class="w-60"/>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0">type de titre</label><br>
                         <select v-model="search.typetitre" class="m-0 p-0" style="width: 80%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in typesTitres" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                     <sigif-form-group-vertical label="N° UFA" v-model="search.numufa" class="w-60%"/>
                    
                  </b-col>
                  <b-col cols="4">
                      <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="2" label="certificat de conformité" v-model="search.certificat"/>
                    <b-row>
                      <b-col><sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="2" label="date de début" v-model="search.datedeb"/></b-col>
                      <b-col><sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="2" label="date de fin" v-model="search.datefin"/></b-col>
                    </b-row>
                     <sigif-form-group-vertical label="Exercice" v-model="search.exercice" class="w-50"/>
                  </b-col>
                  <b-col cols="3">
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0">Type inventaire</label><br>
                         <select v-model="search.typeinv" class="m-0 p-0" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsTypeInventaire" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                     <sigif-form-group-vertical :sizeLabel="4" :sizeLabelLg="2" label="Inscription" v-model="search.inscription"/>
                      <b-form-group  class="m-0 p-0">
                        <label for="" class="font-weight: bold m-0 p-0">statut</label><br>
                         <select v-model="search.statut" class="m-0 p-0" style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="(status, i) in optionsStatus" :value="status.key" :key="i">
                             {{ status.libelle }}
                           </option>
                        </select>
                     </b-form-group>
                  </b-col>

                 <b-col class="ml-1 position-relative">
                    <div>
                      <label for="" class="m-0 p-0">entité forrestière</label>
                      <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option selected="selected">{{ entite.libelle }}</option>
                            <option>green</option>
                            <option>blue</option>
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
          <b-container fluid v-if="section == 'inventaires'">
            <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des verifications d'inventaires</h4>
                  <a :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                   <b-col cols="2"><sigif-form-group :sizeLabel="4" :sizeLabelLg="8" label="IDORGANISATIONTITTRE" v-model="search.idorga"/></b-col>
                    <b-col cols="2"><sigif-form-group :sizeLabel="4" :sizeLabelLg="4" label="AAC no" v-model="search.aac"/></b-col>    
                </b-col>
                <!-- <b-col class="col-md-auto">
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                  <span >
                    <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                  <a :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Cloturer</a>
                  <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn">Table de stock</a>
                  <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn">Table de peuplement</a>
                  </span>
                  
                </b-col> -->
              </b-row>
            </div>
            <!--implémentation tableau proprement dite-->
            <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
                    <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold">inventaire</span> trouvé!!</h4>
                </template>
                <template slot="thead-top" slot-scope="{}">
                  <tr>
                    <th></th><th></th><th></th><th></th><th></th> <th></th>
                    <th class="text-center" colspan="6" style="border-bottom: 4px solid #82C138">Inventaire</th>
                  </tr>
              </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          </b-container>
          
          <!-- <b-container fluid v-if="section == 'verifInventaires'">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des inventaires</h4>
                  <a :disabled="canViewDetailsInventaire" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsInventaire}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Visualiser</a>
                </b-col>
                <b-col class="col-md-auto">
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                  <span >
                    <a @click.prevent="callEditInventaire" :disabled="canUpdateInventaire" size="sm" :class="{'change-image-opacity': !canUpdateInventaire,  'not-change-image-opacity': canUpdateInventaire}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateInventaire}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="canDeleteInventaire" size="sm" :class="{'change-image-opacity': !canDeleteInventaire,  'not-change-image-opacity': canDeleteInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteInventaire}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                  <a :disabled="canViewDetailsInventaire" @click.prevent="showDetails()" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsInventaire}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  <a :disabled="canDeleteInventaire" size="sm" :class="{'change-image-opacity': !canDeleteInventaire,  'not-change-image-opacity': canDeleteInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteInventaire}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Cloturer</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Table de stock</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Table de peuplement</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Exporter les tiges hors limites</a>
                  </span>
                  
                </b-col>
              </b-row>
            </div> -->
             <!--implémentation tableau proprement dite-->
            <!-- <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
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
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> -->

              <!--AJOUT DE LA PAGINATION -->
              <!-- <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          </b-container>
 -->
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
export default {
  name: "inventaires",
  components:{
    DatePicker
  },
  data: () => ({
    section: "inventaires",
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    width:"w-50",
    selectWidht:"w-75",
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    //données du tableaux
    fields: [
        { key: 'index', label: '' },
        { key: 'numtitre', label: 'No titre' },
        { key: 'typetitre', label: 'Type de titre' },
        { key: 'entite', label: 'Entité' },
        { key: 'numufa', label: 'No UFA' }, 
        { key: 'numufe', label: 'No UFE' },
        { key: '', label: 'Assiette'},
        { key: 'entiteagree', label: 'Entité agréee' }, 
        { key: 'datesoumission', label: 'Date soumission' },
        { key: 'dateverification', label: 'Date de verification' },
        { key: 'statut', label: 'Statut' },
        { key: 'exercice', label: 'Exercice' },
        { key: 'numcertificat', label: 'Certificat no' },
        { key: 'datesignature', label: 'Date signature' },
     

    ],
    elements: [],

    selected:{},
    
     search:{
      numtitre:"",
      typeinv:"",
      numufa:"",
      exercice:"",
      certificat:"",
      acc:"",
      idorga:"",
      datedeb:"",
      datefin:"",
      inscription:"",
      statut:"",
    },
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"APPOUVE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}, {key:"VERIFIE", libelle:"verifié"}, {key:"LITIGIEUX", libelle:"litigieux"}, {key:"REFUSE", libelle:"refusé"}, {key:"CLOTURE", libelle:"cloturé"} ],
    optionsTypeInventaire:[{key:"", libelle: ""}, {key:"INVENTAIRE", libelle: "Inventaire"}, {key:"GRUMES", libelle: "Grumes"}, {key:"GRUMESABATTAGE", libelle: "Grumes-Abattage"}, {key:"COLIS", libelle: "Colis"}],
 typesTitres:[
            {
                idtypeTitre: 1,
                code: "CP",
                libelle: "concession forestière en convention provisoire ",
                "visibilite": 0,
                "entreParcVisible": "V"
            },
            {
                idtypeTitre: 2,
                code: "CD",
                libelle: "Concession forestière en convention définitive ",
                visibilite: 0,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 3,
                code: "CC",
                libelle: "Forêt communale",
                visibilite: 0,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 4,
                code: "FS",
                libelle: "Forêt communautaire en convention provisoire",
                visibilite: 0,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 5,
                code: "FC",
                libelle: "Forêt communautaire en convention définitive",
                visibilite: 0,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 6,
                code: "VC",
                libelle: "Vente de coupe ",
                visibilite: 0,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 7,
                code: "AR",
                libelle: "ARB",
                visibilite: 1,
                entreParcVisible: "I"
            },
            {
                idtypeTitre: 8,
                code: "BO",
                libelle: "PEBO",
                visibilite: 1,
                entreParcVisible: "V"
            },
            {
                idtypeTitre: 9,
                code: "AE",
                libelle: "AEB",
                visibilite: 1,
                entreParcVisible: "I"
            },
            {
                idtypeTitre: 10,
                code: "PS",
                libelle: "Permis Spécial",
                visibilite: 1,
                entreParcVisible: "V"
            }
        ]  
  }),
  computed:{
    ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
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
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.isRowselected=true
        this.selected = items
  },
  search(){console.log('to implement');},
  reset(){console.log('to implement');},
  callEditOperationParc(){this.$bvModal.show('modal-lg')},
   showDetails(){
    this.$router.push({
    name: 'detail-inventaire', 
    params: { id: this.selected[0].idoperation }
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
    this.getInventaires()
  },
  getInventaires(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$inventaire.get("inventaires", {params}).then(response => {
          console.log(response.data.result.items);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
           elt.datesoumission = elt.datesoumission !== null? this.$dayjs(elt.datesoumission).format("DD/MM/YYYY"): "";
           elt.datesignature = elt.datesignature !== null? this.$dayjs(elt.datesignature).format("DD/MM/YYYY"): "";
          return elt
        })
	     this.isBusy=false
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });

  },
  filterTable() {
    console.log('search',this.search);
      this.isBusy=true
      this.$transformation.post("entrees-usinage/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt =>{
          elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""

          return elt
        })
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
      idlot: "",
      site: "",
      ligne: "",
	    datedeb: "",
	    datefin: "",
	    statut: "",
	    entite: "",
    }
     localStorage.removeItem('sigif2./transformation-entree_usinage')
     
  },
  reset(){
    this.resetSearcheBar()
    this.getEntreeUsinage()
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
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getInventaires();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
     
     this.toggleSideBar()
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
.custumSigifTab {
    float: left;
    background-position: top;
    box-sizing: border-box;
    white-space: nowrap;
    border-top: 1px solid #82C138;
    border-left: 1px solid #82C138;
    border-right: 1px solid #82C138;
    padding: 0px 5px 0px 7px;
    border-bottom: none;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    line-height: 19px;
    margin-top: 0px;
    background-color: #82C138;
    color:white;
}
.nav-tabs .nav-link.active{
  background: #82C138;
}

</style>