<template>
    <div id="cover" class="min-vh-100">
      
        <!--<b-row>
          <h4 class="tab-header-left-text">Consultation d'une inspection d'abbatage 46</h4>
        </b-row>

        <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
                  <b-button
                    :class="visible ? null : 'collapsed'"
                      :aria-expanded="visible ? 'true' : 'false'"
                      aria-controls="collapse-4"
                  @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
                  <ul>
                  <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
                </h4></b-col>
              <b-col class="col-md-auto">
                <span >
                  <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
        </b-row>-->





          <div>
            <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
             <b-button
               :class="visible ? null : 'collapsed'"
                :aria-expanded="visible ? 'true' : 'false'"
                aria-controls="collapse-4"
             @click="visible=!visible" class="p-0 m-0" style="border:none; background: none; color:black">
             <ul>
              <li :class="{ 'collapse-open': visible, 'collapse-close': !visible }"></li></ul>  </b-button>
            <b-collapse id="collapse-4" v-model="visible">
              <b-card class="b-card">
                <b-row>
                  <b-col  cols="3">
                   
                    <p class= "text-sm">
                      No permis   : <input disabled placeholder=" 2003/PAO/MINFOF/SETAT/SG/DF/SDAFF" type="text" class="form-control mr-1" />
                      
                    
                      Date du permis  :  <input disabled placeholder=" 1/05/2021 " type="text" class="form-control mr-1" />
                     
                     
                     
                      No de titre : <input disabled placeholder=" 2003 " type="text" class="form-control mr-1" />
                     
                      
                      
                       </p>  
                       
                      
                     
                      
                     
                    
                  </b-col>
                  
                  <b-col   cols="3">

                    <p class="text-sm">
                      Type de titre   : <input disabled placeholder=" Concession forretière en convention définitive" type="text" class="form-control mr-1" />
                     Date de signature de mission : <input disabled placeholder=" 12/04/2022 " type="text" class="form-control mr-1" /> 
                     Date de début de mission : <input disabled placeholder=" 13/04/2022 " type="text" class="form-control mr-1" />
                     
                    </p>
                     
                   
                     
                   
                    
                  </b-col>
                  <b-col cols="3">
                     <p class="text-sm">
                     Nom des membres : <input disabled placeholder=" FOE " type="text" class="form-control mr-1" />
                     SERVICE MINFOF : <input disabled placeholder=" poste forestier " type="text" class="form-control mr-1" />
                       Date d'inspection  : <input disabled placeholder=" 13/04/2022 " type="text" class="form-control mr-1" />
                     </p>
                    

                  </b-col>
                   <b-col cols="3">
                    <p class="text-sm">
                     
                       Date de fin de mission :<input disabled placeholder="  20/04/2022 " type="text" class="form-control mr-1" />
                      Nom du chef de mission :  <input disabled placeholder=" FOE" type="text" class="form-control mr-1" />
                       No ordre de mission <input disabled placeholder=" 10 " type="text" class="form-control mr-1" />
                       
                    </p>


                     </b-col>
                  
                </b-row>
                <div class="mt-3 d-flex justify-content-end">
                    
                      <b-button class="search-bar-btn mr-1" style="color:rgb(0, 82, 44);"><a href="">Rechercher</a></b-button>
                    
                      <b-button class="search-bar-btn" style="color:rgb(0, 82, 44);"><a href="">Reinitialiser</a></b-button>
                   
                </div>
                
              </b-card>
            </b-collapse>
          </div>
          <!--entete des tableaux -->
          <div class="m-0 px-2 table-header-border">
            <b-row>
              <b-col><h4 class="tab-header-left-text"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des arbres abattus contolés</h4></b-col>
              <b-col class="col-md-auto">
                <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                <span >
                  <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                <a :disabled="canViewDetailsOperationParc" @click.prevent="detailInspectionAbbattage" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                <a :disabled="canSaveOperationParc" size="sm" :class="{'change-image-opacity': !canSaveOperationParc,  'not-change-image-opacity': canSaveOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSaveOperationParc}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>valider</a>
                <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canSubmitOperationParc}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</a>
                <a :disabled="canPrintOperationParc" size="sm" :class="{'change-image-opacity': !canPrintOperationParc,  'not-change-image-opacity': canPrintOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canPrintOperationParc}" src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer taille</a>
                </span>
                
              </b-col>
            </b-row>
          </div>
          <!--implémentation tableau proprement dite-->
          <div class="ml-1" style="width:99%">
              <b-table  :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" >
               <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(diametrepetitbout)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(diametregrosbout)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(zoneutm)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green"></span></template>
               <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template> 
                <template #cell(codebarre)="data"><b-form-input size="sm" v-model="data.item.codebarre" class="m-0 py-0 ml-1 px-1" style="width:70%"></b-form-input></template> 
                <template #cell(nomcommercial)="data"><b-form-input size="sm" v-model="data.item.nomcommercial" class="m-0 py-0 ml-1 px-1" style="width:70%"></b-form-input></template> 
                <template #cell(diametrepetitbout)="data"><b-form-input size="sm" v-model="data.item.diametrepetitbout" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%"></b-form-input></template> 
                <template #cell(diametregrosbout)="data"><b-form-input size="sm" v-model="data.item.diametregrosbout" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%"></b-form-input></template>
                <template #cell(longueur)="data"><b-form-input size="sm" v-model="data.item.diametregrosbout" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%"></b-form-input></template> 
                <template #cell(volume)="data"><b-form-input size="sm" v-model="data.item.diametregrosbout" class="m-0 py-0 ml-1" style="width:30%; padding-left:5%; padding-right:5%"></b-form-input></template> 
                <template #cell(zoneutm)="data"><b-form-input size="sm" v-model="data.item.zoneutm" class="m-0 py-0 ml-1" style="width:40%; padding-left:5%; padding-right:5%"></b-form-input></template> 
                <template #cell(utmx)="data"><b-form-input size="sm" v-model="data.item.utmx" class="m-0 py-0 ml-1" style="width:70%; padding-left:5%; padding-right:5%"></b-form-input></template> 
                <template #cell(utmy)="data"><b-form-input size="sm" v-model="data.item.utmy" class="m-0 py-0 ml-1" style="width:70%; padding-left:5%; padding-right:5%"></b-form-input></template> 
              </b-table>

              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import UserForm from '@/components/Administration/UserForm.vue';
  import SelectInput from '@/components/custom_select_input.vue';
  import FormInput from '@/components/custom_form_select.vue';
  import SimpleInput from '@/components/simple_input.vue';
  import { mapGetters } from 'vuex'
export default {
  name: "departement",
  components:{
    UserForm,
    SelectInput,
    FormInput,
    SimpleInput,
  },
  data: () => ({
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
    options:[
      { value: null, text: 'Please select an option' },
          { value: 'brouillon', text: 'brouillon' },
          { value: 'soumise', text: 'soumise' },
          { value: 'validée', text: 'validée' },
          { value: 'soumission en cours', text: 'soumission en cours' },
    ],


    //données du tableaux
fields: [ 
	{ key: 'index', label: '',thStyle: { width: "2%" }  },{ key: 'codebarre', label: 'Code Barre' }, { key: 'nomcommercial', label: 'Nom commercial'},
	{key : 'diametrepetitbout', label :'Diametre petit bout'}, { key: 'diametregrosbout', label : 'Diametre gros bout' }, 
	{ key: 'longueur', label: 'Longueur(m)' }, { key: 'volume', label: 'volume(m3)' },
	{ key: 'zoneutm', label : 'Zone UTM' }, { key: 'utmx', label: 'UTM X' }, { key: 'utmy', label: 'UTM Y' }],

element: {	
      // datedemande : this.$dayjs("2021-02-19T23:00:00.000+00:00").format('DD MMMM YYYY'), 
      datedemande : "2021-02-19T23:00:00.000+00:00", 
      nbcodesbarres: 21000, 
      usage: { id : 1, typeusage : "inventaire"},
      typetitre: { id : 7145, libelle : "convention forrestierre en convention définitive"},
      titre: 2150,
      numufa: 14,
      numufe:2,
      assiette: 5,
      codebarres: [
        {codebarre :"N3KMPY81", nomcommercial: "Nom Ikumbi", diametrepetitbout: 50, diametregrosbout: 74, longueur: 20, volume: 13.345, zoneutm: '32N', utmx: 548236,utmy: 325412},
        {codebarre :"N3KMPY81", nomcommercial: "Nom Ikumbi", diametrepetitbout: 80, diametregrosbout: 90, longueur: 20, volume: 13.345, zoneutm: '32N', utmx: 548236,utmy: 325412},
        {codebarre :"N3KMPY81", nomcommercial: "Nom Ikumbi", diametrepetitbout: 80, diametregrosbout: 90, longueur: 20, volume: 13.345, zoneutm: '32N', utmx: 548236,utmy: 325412},
		  ]		
  },
  selected:{},

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
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    items() { 
      return this.element.codebarres
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
     ...mapGetters(['user'])
  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
       return 'custo-bg_detail_-table_element'
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
  addUser(){this.$bvModal.show('user-form')},
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
   //this.getDepartement()
  },
  /*getArrondissements(){
      this.isBusy=true
        const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
      this.$donneesReference.get("arrondissements", {params}).then(response => {
            console.log("=================== Données de reference / arrondissements ==================");
            console.log(response.data.result.items[0]);
            console.log("===========================================================");
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items

          this.elements = this.elements.map(elt =>{
            elt.intitulearr = elt.intitule,
            elt.intitulereg = elt.departement.region.intitule,
            elt.codedepartement= elt.departement.codedepartment,
            elt.intituledepart = elt.departement.intitule,
            elt.cheflieu = elt.departement.region.cheflieu,
            elt.phasearr = elt.phase.libelle

            return elt
          })
        this.isBusy=false
          setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
        .catch((error) => {
          console.log(error)
          this.isBusy=false
        });

  },*/
  
  detailInspectionAbbattage(){
    this.$router.push({name:"details_inspection_abattage"})
  }
 },
 

  mounted(){
    //this.getDepartement();
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
<style>
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
</style>