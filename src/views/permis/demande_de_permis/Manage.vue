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
                  <b-col cols="2">
                    <sigif-form-group fontWeight="bold" :sizeLabel="6" :sizeLabelLg="5" class="m-0" label="Identifiant" v-model="search.id"/>
                    <sigif-form-group fontWeight="bold" :sizeLabel="6" :sizeLabelLg="5"  class="m-0" label="Sigle" v-model="search.sigle"/>                    
                    <b-row>
                      <b-col cols="5"><label for="">Statut</label></b-col>
                      <b-col cols="6">
                        <select v-model="search.statut" class="m-0 p-0 permis-header-select-search">
                          <option v-for="(statut, i) in statuts " :key="i" :value="statut.value">{{ statut.libelle }}</option>
                        </select>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5"><label for="">Exercice</label></b-col>
                      <b-col cols="6"><select v-model="search.exercice"  name="" id="" class="m-0 p-0 permis-header-select-search">
                        <option></option>
                        <option v-for="(exercice, i) in exercices " :key="i" :value="exercice">{{ exercice }}</option>
                      </select></b-col>
                    </b-row>
                    
                  </b-col>
                 
                  <b-col cols="7">
                    <b-overlay rounded="sm" :show="showOverlayTitres">
                      <template #overlay>
                      <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                      </div>
                      </template>
                      <b-row>
                        <b-col cols="5" class="d-flex justify-content-end"><label for="">N° du titre</label></b-col>
                        <b-col cols="6">
                          <v-select  @open="getTitres" :options="paginatedTitres" v-model="search.numtitre" @search="onSearchTitre" label="numtitre" class="w-75 custom-select-type_titre">
                            <template #option="{ typetitre,numtitre}">
                              <span class="font-weight-bold">{{ numtitre }}</span><span> - {{ typetitre }}</span>
                              <!--<br />
                              <span>{{ numtitre }}</span>-->
                            </template>
                            <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageTitres" @click="offsetTitres -= limitTitres">Prèc.</button>
                            <button :disabled="!hasNextPageTitres" @click="offsetTitres += limitTitres">Suiv.</button>
                            </li>
                          </v-select>
                        </b-col>
                      </b-row>
                    </b-overlay>
                    <b-row>
                      <b-col cols="5" class="d-flex justify-content-end"><label for="">Type de permis</label></b-col>
                      <b-col cols="6"><select v-model="search.typepermis"  name="" id="" class="m-0 p-0" style="width: 99%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option></option>
                        <option v-for="(typetitre, i) in typestitres " :key="i" :value="typetitre.code">{{ typetitre.libelle }}</option>
                      </select></b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="5" class="d-flex justify-content-end"><label for="">Statut de la demande</label></b-col>
                      <b-col cols="6"><select v-model="search.statutdemande" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option v-for="(statut, i) in statutsdemande" :value="statut.key" :key="i">
                        {{ statut.libelle }}
                      </option>
                    </select></b-col>
                    </b-row>
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                      <template #overlay>
                      <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                      </div>
                      </template>
                      <b-row>
                        <b-col cols="5" class="d-flex justify-content-end"><label for="">Position de la demande</label></b-col>
                        <b-col cols="6">
                          <v-select @open="getEntites" :options="entitesminfof" label="INTITULE" v-model="search.position" class="w-100 custom-select-type_titre"></v-select>
                        </b-col>
                      </b-row>
                    </b-overlay>
                    <b-row>
                      <b-col cols="5" class="d-flex justify-content-end"><label for="">Date signature</label></b-col>
                      <b-col cols="6" class="d-flex justify-content-between">
                        <input v-model="search.datesignature" type="date" name="" id="datesignature" style="width: 35%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                        <input v-model="search.datefin" type="date" name="" id="datefin" style="width: 35%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;"/>
                      </b-col>
                    </b-row>
                      <b-row>
                        
                      </b-row>
                  </b-col>
                  <b-col cols="2">
                    <label for="" class="m-0 p-0">Entité forestière</label>
                    <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                      <li slot="list-footer" class="pagination">
                        <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                        <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                      </li>
                    </v-select>
                    <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option selected="selected">{{ entite.libelle }}</option>
                    </select>
                      <div class="" style="margin-top: 60px">
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
              <b-col cols="4">
               
                <h4 class="tab-header-left-text mt-0"> Liste des demandes permis</h4></b-col> 
              <b-col class="9">
                <b-button :disabled="!canCreateDemndePermis" @click.prevent="addDemandePermis" size="sm" :class="{'change-image-opacity': !canCreateDemndePermis,  'not-change-image-opacity': canCreateDemndePermis}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</b-button>
                <span>
                <b-button :disabled="!canDeleteDemndePermis" size="sm" :class="{'change-image-opacity': !canDeleteDemndePermis,  'not-change-image-opacity': canDeleteDemndePermis}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteDemndePermis}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</b-button>
                <b-button @click.prevent="showDetails" :disabled="!canViewDetailsDemndePermis" size="sm" :class="{'change-image-opacity': !canViewDetailsDemndePermis,  'not-change-image-opacity': canViewDetailsDemndePermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                <b-button v-if="canSubmitDemandePermis" @click.prevent="goTosubmitDemande" :disabled="!isToSubmit" size="sm" :class="{'change-image-opacity': !isToSubmit,  'not-change-image-opacity': isToSubmit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToSubmit}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>soumettre</b-button>
                <b-button v-if="canVerifyDemade" @click.prevent="goToVerifDemande" :disabled="!isToVerify" size="sm" :class="{'change-image-opacity': !isToVerify,  'not-change-image-opacity': isToVerify}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVERIFIER_16x16.png"></b-img>vérifier</b-button>
                <b-button v-if="isMinfof" @click.prevent="goToRecommendDemande" :disabled="!isToRecommend" size="sm" :class="{'change-image-opacity': !isToRecommend,  'not-change-image-opacity': isToRecommend}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToRecommend}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Recommander</b-button>
                <b-button v-if="isMinfof&&canEmitPermis" @click.prevent="goToEmitPermis" :disabled="!isToEmit" size="sm" :class="{'change-image-opacity': !isToEmit,  'not-change-image-opacity': isToEmit}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToEmit}" src="@/assets/images/iconSUBMIT_16x16.png"></b-img>Emettre</b-button>
                
                <b-button v-if="isMinfof&&canApprouvePermis" @click.prevent="goToApprouvePermis" :disabled="!isToApprouve" size="sm" :class="{'change-image-opacity': !isToApprouve,  'not-change-image-opacity': isToApprouve}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !isToApprouve}" src="@/assets/images/iconVALIDER_16x16.png"></b-img>Approuver</b-button>                
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
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                  <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold">demande </span> trouvée!!</h4>
                </template>
                 <template #cell(idpermis)="data"><b class="ml-1" style="color: #175131!important">{{ data.item.idpermis }}</b> </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(statut)="data">
                  <span v-if="data.item.statut==0">projet</span>
                  <span v-if="data.item.statut==1">Vérifié par l'opérateur</span>
                  <span v-if="data.item.statut==2">Soumis</span>
                  <span v-if="data.item.statut==3">Vérifié par le délégué</span>
                  <span v-if="data.item.statut==4">Recommandé</span>
                  <span v-if="data.item.statut==5">Vérifié par le MINFOF</span>
                  <span v-if="data.item.statut==6">En cours d'approbation</span>
                  <span v-if="data.item.statut==7">Approuvé</span>
                  <span v-if="data.item.statut==8">Rejeté</span>
                  <span v-if="data.item.statut==8">Tracking mis à jour dans le SIG</span>
                </template> 
              </b-table>
            
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
            </div>

             <!--FORM AJOUT D'UNE DEMANDE DE PERMIS-->
          <b-modal size="lg" ref="demandepermis-form" hide-footer  header-class="custom-bg" header-text-variant="light">
              <template #modal-title>
                <div>
                  <span class="font-weight-bold">{{ title }}</span>
                </div>
              </template>
              <div>
                <DemandePermisForm @demandePermisAdded="handleAddDemandePermis" @demandePermisAddedAndContinue="handleAddDemandePermisAndContinue" :editDemandePemis="editDemandePermis" :action="action"/>
              </div>
          </b-modal>
          <unreachable-box ref="unreachableapiDialogue"></unreachable-box>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import DemandePermisForm from "@/components/forms/permis/DemandePermisForm.vue";
  import UnreachableBox from '@/components/utils/auth/UnreachableBox.vue';

  import { mapGetters } from 'vuex'
export default {
  name: "demandepermis",
   components:{
    DemandePermisForm,
    UnreachableBox
  },
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  data: () => ({
    statuts:[
      {libelle:"Non attribué", value:0},
      {libelle:"cloturé", value:1},
      {libelle:"Approuvé", value:2},
      {libelle:"Actif", value:3},
      {libelle:"Suspendu", value:4}
    ],
    searchentite:'',
    showOverlayEntites:false,
    offsetEntites:0,
    limitEntites:10,
    entites:[],
    searchtitre:'',
    showOverlayTitres:false,
    offsetTitres:0,
    limitTitres:10,
    titres:[],
    isToApprouve:false,
    isToSubmit:false,
    isToVerify:false,
    isToVerifyMinfof:false,
    isToVerifyByMinfof:false,
    isToEmit:false,
    isToRecommend:false,
    isRowselected:false,
    isBusy:false,
    isRowselected:false,
    showOverlayTypepermis:false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    search:{
      id: "", // int
	    entite: "", // int (l'id de l'organisation)
	    typepermis: "", // string (le code du type de permis)
	    numtitre: "", // int
	    exercice: "", // string
	    position: "", // int (l'id de l'organisation)
	    numpermis: "", // int
	    sigle: "", // string
	    datesignature: "", // date au format YYYY-MM-DD
      datefin:"",
	    statutdemande: "", // string
      statut: "", // string (parmis les valeur : ROJET, VERIFIER_PAR_L_OPERATEUR, SOUMIS, VERIFIER_PAR_LE_DELEGUE, RECOMMANDDER, VERIFIER_PAR_LE_MINFOF, EN_COURS_D_APPROBATION, APPROUVER, REJETER, TRACKING_MIS_A_JOUR_DANS_LE_SIG)idpermis: "",
    },
    exercices:[2019,2020,2021,2022,2023],
    typestitres:[
      {code:'CP', libelle:'concession forestière en convention provisoire'},
      {code:'CD', libelle:'Concession forestière en convention définitive'},
      {code:'CC', libelle:'Forêt communale'},
      {code:'FS', libelle:'Forêt communautaire en convention provisoire'},
      {code:'FC', libelle:'Forêt communautaire en convention définitive'},
      {code:'VC', libelle:'Vente de coupe'},
      {code:'AR', libelle:'Autorisation de Récupération du bois'},
      {code:'BO', libelle:'PEBO'},
      {code:'AEB', libelle:'Autorisation d\'exploitation du bois'},
      {code:'PS', libelle:'Permis Spécial'},
      {code:'AP', libelle:'APC'},
    ],
    typespermis: [],
    entite:{
      id:'',
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,
    statutsdemande:[
      {key:"", libelle: ""}, 
      {key:"0", libelle: "PROJET"}, 
      {key:"1", libelle: "VERIFIER PAR L'OPERATEUR"},
      {key:"2", libelle: "SOUMIS"}, 
      {key:"3", libelle: "VERIFIE PAR LE DELEGUE"}, 
      {key:"4", libelle: "RECOMMANDER"},
      {key:"5", libelle: "VERIFIE PAR LE MINFOF"},  
      {key:"6", libelle: "En Cours D'approbation"}, 
      {key:"7", libelle: "Approuvé"}, 
      {key:"8", libelle: "Rejeté"},
      {key:"9", libelle: "TRACKING MIS A JOUR DANS LE SIG"},
    ],
    //données du tableaux
    fields: [ { key: 'idpermis', label: 'Id' },
              { key: 'entite', label: 'Entité' },
              { key: 'sigle', label: 'Marteau/sigle' },
              { key: 'typepermis', label: 'type de permis' },
              { key: 'numtitre', label: 'Titre n°' },
              { key: 'exercice', label: 'Exercice' },
              { key: 'statut', label: 'Statut de la demande' },
              { key: 'intituleposition', label: 'Position de la demande' },
],
    elements: [],
    selected:{},

    action:"add",
    editDemandePermis:null,
       /*propriétes lies au traitement d'une operation de parc */
    title:"Creation demande permis "
  }),
  computed:{
    filteredTitres() {
      return this.titres.filter((titre) =>
        titre.numtitre.toLocaleLowerCase()
      )
    },
    paginatedTitres() {
      return this.filteredTitres.slice(this.offsetTitres, this.limitTitres + this.offsetTitres)
    },
    hasNextPageTitres() {
      const nextOffset = this.offsetTitres + this.limitTitres
      return Boolean(
        this.filteredTitres.slice(nextOffset, this.limitTitres + nextOffset).length
      )
    },
    hasPrevPageTitres(){   
      const prevOffset = this.offsetTitres - this.limitTitres
      return Boolean(
        this.filteredTitres.slice(prevOffset, this.limitTitres + prevOffset).length
      )
    },
    entitesminfof() {
      return this.entites.filter((entite) => entite.TYPEORGANISATION=='MF')
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
    ...mapGetters(['user','hasAccess']),
    isMinfof(){
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    /*propriétés liées aux accèes*/
    canCreateDemndePermis(){return true; return this.hasAccess('CREER_DEMANDE_PERMIS') },
    canUpdateDemndePermis(){ return this.hasAccess('MODIFIER_DEMANDE_PERMIS')},
    canDeleteDemndePermis(){ return this.hasAccess('SUPPRIMER_DEMANDE_PERMIS')},
    canViewDetailsDemndePermis(){ return true; return this.hasAccess('CONSULTER_DEMANDE_PERMIS') },
    canSubmitDemandePermis(){ return true; return this.hasAccess('SOUMETTRE_DEMANDE_PERMIS')},
    canVerifyDemade(){return true;},
    canEmitPermis(){return true;},
    canApprouvePermis(){return true;},
    /*items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },*/
    rows() {
        return this.items.length
    },
    totalPages(){
      return this.rows/this.perPage
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
  },
 
 methods: {
  filterTable() {
      let data={ id:this.search.id, entite: this.entite.IDORGANISATION!=undefined?this.entite.IDORGANISATION:this.entite.IDORGANISATION, 
        typepermis: this.search.typepermis, numtitre: this.search.numtitre.idtitre, exercice: this.search.exercice, 
        position: this.search.position.IDORGANISATION, numpermis:this.search.numpermis, sigle:this.search.sigle,
        datesignature:this.search.datesignature, datefin:this.search.datefin, statutdemande:this.search.statutdemande, statut:this.search.statut  }
      this.isBusy=true
      this.$permis.post("demandes-permis/search", data).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt =>{
            if(elt.intituleposition != null&&elt.intituleposition.length>15){
                elt.intituleposition = elt.intituleposition.substring(0, 15) + '...'
            }
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
    async getTitres(){
      this.showOverlayTitres=true;
      if (!php.empty(this.$store.state.titres)) {
          this.titres = this.$store.state.titres;
      } 
      else {
          try {
          this.titres= await this.$titres.get("titres?size=1000").then(response => response.data.result.items);
          console.log('titres ',this.titres);
          this.$store.dispatch('titres', this.titres)
          } catch (error) {
          App.notifyError(error.message);
          }
      }
      this.showOverlayTitres=false;
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entites)) {
          this.entites = this.$store.state.entites;
      } 
      else {
          try {
          this.entites= await this.$donneesReference.get("entites/all").then(response => response.data.result);
          console.log('entites ',this.entites);
          this.$store.dispatch('entites', this.entites)
          } catch (error) {
          App.notifyError(error.message);
          }
      }
      this.showOverlayEntites=false;
    },
    onSearchTitre(query){
      this.searchtitre = query
      this.offsetTitre = 0
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
  goToApprouvePermis(){
    storage.set('commandePermis','approbation')
    this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }});
  },
  goToEmitPermis(){
    storage.set('commandePermis','emission')
    this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }});
  },
  goToRecommendDemande(){
    storage.set('commandePermis','recommandation')
    this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }});
  },
  //vérification demande de permis
  goToVerifDemande(){
    storage.set('commandePermis','verification')
    this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }});
  },
  //submitDemandePermis
  goTosubmitDemande(){
    storage.set('commandePermis','soumission')
    this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }});
  },
  //gestion du cas api inaccéssible
  async unreachableapi() {
      let message='Impossible de joindre le serveur';
            const ok = await this.$refs.unreachableapiDialogue.show({
               commande:'',
               title: 'ERREUR',
               message:message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {} else {
              console.log(storage)
              storage.clear()
              this.$store.dispatch('LogOut')
              this.$refs.authDialogue._close();
            }
  },
  showDetails(){ this.$router.push({name: 'details_demande_de_permis', params: { id: this.selected[0].idpermis }}); },

   handleAddDemandePermis(){
    this.getDemandesPermis();
    this.$refs['demandepermis-form'].hide();  
  },
  async handleAddDemandePermisAndContinue(){
    this.$refs['demandepermis-form'].hide(); 
    this.getDemandesPermis();
      setTimeout(() => {this.$refs['demandepermis-form'].show(); }, 500);
  },

   addDemandePermis(){
    this.action="add";
     this.$refs['demandepermis-form'].show();
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
    this.isRowselected=true
    this.selected = items;
      if (!php.empty(this.selected[0])) {
        this.isRowselected =true;
        if(this.selected[0].statut==0){
          this.isToSubmit=false
          this.isToVerify =true
          this.isToVerifyMinfof =false
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =false

        }else if(this.selected[0].statut==1){
          this.isToSubmit=true
          this.isToVerify =false
          this.isToVerifyMinfof =false
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==2){
          this.isToSubmit=false
          this.isToVerify =true
          //this.isToVerifyMinfof =true
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =false

        }
        else if(this.selected[0].statut==3){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToVerifyMinfof =false
          this.isToRecommend =true
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==4){
          this.isToSubmit=false
          this.isToVerify =true
          this.isToRecommend =false
          this.isToVerifyByMinfof =false
          this.isToEmit =false
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==5){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToEmit =true
          this.isToApprouve =false
        }
        else if(this.selected[0].statut==6){
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToEmit =false
          this.isToApprouve =true
        }
        else{
          this.isToSubmit=false
          this.isToVerify =false
          this.isToRecommend =false
          this.isToVerifyByMinfof =false
          this.isToEmit =false
          this.isToApprouve =false
        }
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
  changePage(page) {
    this.currentPage = page
    this.getDemandesPermis()
  },
   getDemandesPermis(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$permis.get("demandes-permis", {params}).then(response => {
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        
        this.elements = this.elements.map(elt =>{
          if(elt.intituleposition != null&&elt.intituleposition.length>15){
            console.log('lenght ',elt.intituleposition.length);
              elt.intituleposition = elt.intituleposition.substring(0, 15) + '...'
          }
          return elt
        })
		      this.isBusy=false
      })
      .catch((error) => {
        this.isBusy=false
        if(error.code=='ERR_NETWORK'){
          this.submitted=false;
          return this.unreachableapi();
         }
      });

    },
    async getTypesPermis(){
      this.showOverlayTypepermis=true
      if(!php.empty(storage.get('types-permis'))){
        this.typespermis= storage.get('types-permis')
      }
      else{
        try {
            this.typespermis =  await this.$donneesReference.get("constantes/types-permis?size=100").then(response => response.data.result.items);
            storage.set('types-permis',this.typespermis)
        }catch (error) {
          console.log(error.message);
        }
      }
      this.showOverlayTypepermis=false
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
      actionButton.innerHTML = '<i class="fa fa-arrow-right" style="font-size: 18px"></i>';

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

    resetSearcheBar(){
      this.search = {
        id: "", // int
        entite: "", // int (l'id de l'organisation)
        typepermis: "", // string (le code du type de permis)
        numtitre: "", // int
        exercice: "", // string
        position: "", // int (l'id de l'organisation)
        numpermis: "", // int
        sigle: "", // string
        datesignature: "", // date au format YYYY-MM-DD
        datefin: "", // date au format YYYY-MM-DD
        statutdemande: "", // string
        statut: "" // string (parmi
      }
      storage.remove(this.$route.path)  
     
    },
    reset(){
      this.resetSearcheBar()
      this.getDemandesPermis()
    },



 },
 mounted(){
  this.entite.libelle=this.user.profil.organisation
  if(this.entite.libelle!=="MINFOF"){
    this.disabled=true
  }
  if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
    this.search=JSON.parse(storage.get(this.$route.path))
    this.filterTable();
  }else{
    //this.getpermis();
  }
    this.entite.libelle=this.user.profil.organisation
  if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
    this.search=JSON.parse(storage.get(this.$route.path))
    this.filterTable();
  }else{this.getDemandesPermis();}
}
  
  }

</script>
<style scoped>

.permis-header-select-search{
  width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(0.8em + .300rem + 2px) !important;
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

</style>
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>