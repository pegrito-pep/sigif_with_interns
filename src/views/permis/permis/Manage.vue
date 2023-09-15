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
                        <b-col cols="5" class="d-flex justify-content-end"><label for="">N° du permis</label></b-col>
                        <b-col cols="6">
                          <input type="text" v-model="search.numpermis" class="form-control-xs"  placeholder=""/>
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
              <b-col>
                <h4 class="tab-header-left-text mt-0"> Liste des permis</h4>
                <b-button @click.prevent="renouvelerPermmis" :disabled="canRenouvelerPermis" size="sm" class="mx-1 simple-btn"><b-img  src="@/assets/images/picto_retour_vert.png"></b-img>renouvellement</b-button>
                <b-button @click.prevent="imprimerCertificat" :disabled="!canPrintPermis||!isRowselected" size="sm" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>
                  <span v-if="!waitState">imprimer</span><b-spinner small v-if="waitState" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                </b-button>
              </b-col>
              <b-col class="col-md-auto">
                <span class="d-flex">
                  <b-button :disabled="!canCreatePermis" @click.prevent="goToCreateConcession" size="sm" :class="{'change-image-opacity': !canCreatePermis,  'not-change-image-opacity': canCreatePermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Creer</b-button>
                  <b-button :disabled="!canUpdatePermis" size="sm" :class="{'change-image-opacity': !canUpdatePermis,  'not-change-image-opacity': canUpdatePermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Modifier</b-button>
                  <b-button :disabled="!canDeletePermis"  size="sm" :class="{'change-image-opacity': !canDeletePermis,  'not-change-image-opacity': canDeletePermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Supprimer</b-button>
                  <b-button :disabled="!canViewDetailsPermis" @click.prevent="showDetails" size="sm" :class="{'change-image-opacity': !canViewDetailsPermis,  'not-change-image-opacity': canViewDetailsPermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</b-button>
                  <b-button :disabled="!canVerifyPermis" @click.prevent="verifyPermis" size="sm" :class="{'change-image-opacity': !canVerifyPermis,  'not-change-image-opacity': canVerifyPermis}" class="mx-1 simple-btn"><b-img src="@/assets/images/iconVERIFIER_16x16.png"></b-img>vérifier</b-button>
                  <!-- <a  size="sm"  class="not-change-image-opacity mx-1 simple-btn d-flex">
                    <span class="mr-1">consulter une action</span>
                    <span>
                      <ul class="m-0" style="padding-left:0.9em">
                        <li class="collapse-open m-0 p-0"></li>
                      </ul>
                    </span>
                  </a> -->
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
                       <h4 style="color:green" class="text-center">Aucun<span class="font-weight-bold">résultat</span></h4>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(urlfichierpermis)="data">
                  <span v-if="data.item.iudpermis!=''&&data.item.iudpermis!=null"><a v-b-tooltip.hover title="consulter le permis" target="_blank" :href="data.item.iudpermis"><b-img src="@/assets/images/Attach_128x128.png"></b-img></a></span>
                  <span v-else></span>
               </template> 
                 <template #cell(statut)="data">
                     <span v-if="data.item.statut=='APPROUVER'">
                     <b-img src="@/assets/images/picto_check_vert.png"></b-img></span>
                     <span v-else><b-img src="@/assets/images/picto_croix_rouge.png"></b-img></span>
                  </template>
                
              </b-table>
            
              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
            </div>
            <permis-box ref="permisDialogue" @extended="handlePermisExtended" :idpermis="idpermis"></permis-box>

            <b-modal id="certificat-recouvrement" size="xl" title="ETATS" no-close-on-backdrop cancel-title="fermer" ok-variant="success" ok-title="Imprimer" >
             
              <h3 class="text-center mb-3">Certificat de recouvrement au <b>{{ currentDate() }}</b></h3>
              <b-table-simple class="m-0 p-0" hover small responsive style="border: 1px solid black!important">
                  <b-thead>
                      <b-tr>
                          <b-th  class="m-0 p-0 text-center">code</b-th>
                          <b-th class="border m-0 p-0 text-center">appelation</b-th>
                          <b-th class="border m-0 p-0 text-center" style="width: 30%;">DME</b-th>
                          <b-th class="border m-0 p-0 text-center" style="width: 16%">DMA</b-th>
                          <b-th class="border m-0 p-0 text-center" style="width: 16%">NP</b-th>
                          <b-th class="border m-0 p-0 text-center" style="width: 16%">Vol</b-th>
                      </b-tr>
     
                  </b-thead>
                  <b-tbody>
                      <b-tr v-for="(codebarre, i) in codebarres" :key="i">
                          <b-td class="border py-0 text-center">{{ codebarre.code }}</b-td>
                          <b-td class="border py-0 text-center" style="width: 9%">{{ codebarre.appelation }}</b-td>
                          <b-td class="border py-0 text-center">{{ codebarre.dme }}</b-td>
                          <b-td class="border py-0 text-center">{{ codebarre.dma }}</b-td>
                          <b-td class="border py-0 text-center" style="width: 9%">{{ codebarre.np }}</b-td>
                          <b-td class="border py-0 text-center">{{ commify(codebarre.vol) }}</b-td>
                      </b-tr>
                  </b-tbody>
              </b-table-simple>
      
          </b-modal>

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  var moment = require('moment');
  import { mapGetters } from 'vuex'

  import PermisBox from '@/components/utils/permis/ExtendPermisBox.vue';

export default {
  name: "Logins",
  components:{
    PermisBox
  },
  data: () => ({
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
    idpermis:0,
    isToExtendPermis: false, //variable de gestion de l'option proroger permis
    isBusy:false,
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
    exercices:[],
    positions: [{ idposition: '1', label: 'MINFOF'}],
    typespermis: [],
    entite:{
      id:1,
      libelle:''
    },
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
    statuts:[
      {libelle:"Non attribué", value:0},
      {libelle:"cloturé", value:1},
      {libelle:"Approuvé", value:2},
      {libelle:"Actif", value:3},
      {libelle:"Suspendu", value:4}
    ],
    optionsstatut:[{key:"", libelle: ""}, {key:"statut", libelle: "VERIFIER PAR L'OPERATEUR"}, 
    {key:"statut", libelle: "APPROUVER"}, {key:"VALIDE", libelle: "SOUMIS"}, {key:"statut", libelle: "REJETER"},
    
    {key:"statut", libelle: "EN COURS D'APPROBATION"}, 
    {key:"statut", libelle: "VERIFIE PAR LE MINFOF"},  
    {key:"statut", libelle: "VERIFIE PAR LE DELEGUE"}, 
     
    {key:"statut", libelle: "TRACKING MIS A JOUR DANS LE SIG"},
     {key:"statut", libelle: "RECOMMANDER"}],
  

    //données du tableaux
    fields: [ { key: 'index', label: '' },{ key: 'codebarre', label: 'Code barre' },{ key: 'urlfichierpermis', label: '',thStyle:"width:4%" },{ key: 'entite', label: 'Entité' },{ key: 'sigle', label: 'Marteau/sigle' },
              { key: 'libeletypepermis', label: 'type de permis' },{ key: 'numpermis', label: 'N° de permis' },{ key: 'numtitre', label: 'N° du titre' },{ key: 'statut', label: 'Statut' },
              { key: 'exercice', label: 'Exercice' },{ key: 'datesignature', label: 'Date de Signature' },{ key: 'datefinvalidite', label: 'Date Fin de validité' },],
    elements: [],
    selected:{},
    waitState:false,  
    codebarres:[
      {
        code: 1108,
        appelation:'Bossé clair',
        dme:80,
        dma:'',
        np:'315',
        vol:2451281.371
      },
      {
        code: 1122,
        appelation:'Bossé clair',
        dme:80,
        dma:'11',
        np:'315',
        vol:2451281.184
      },
      {
        code: 1136,
        appelation:'Bossé clair',
        dme:80,
        dma:'',
        np:'315',
        vol:2451281.110
      },
      {
        code: 1144,
        appelation:'Bossé clair',
        dme:80,
        dma:147,
        np:'315',
        vol:2451281.041
      }
    ],
    
    /*propriétes lies au traitement d'une operation de parc */

  }),
  computed:{
    isMinfof(){
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
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
    /*propriétés liées aux accèes*/
    canViewDetailsPermis(){return this.hasAccess('CONSULTER_PERMIS')},
    canRenouvelerPermis(){true},
    canextendPermis(){ return true; return this.hasAccess('PROROGER_PERMIS') },
    canUpdatePermis(){ return true; return this.hasAccess('PROROGER_PERMIS') },
    canDeletePermis(){ return true; return this.hasAccess('PROROGER_PERMIS') },
    canVerifyPermis(){ return true; return this.hasAccess('PROROGER_PERMIS') },
    canCreatePermis(){ return true; return this.hasAccess('PROROGER_PERMIS') },
    canPrintPermis(){ return true; return this.hasAccess('IMPRIMER_PERMIS') },
    
    isRowselected(){
      return !php.empty(this.selected)
    },

    items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
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
  },
  },
  methods: {
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
    imprimerCertificat(){
      let url = this.$JasperReport+'/JasperReport/recollement/'+this.selected.idpermis;
      var a = document.createElement('a');
      a.href = url;
      a.setAttribute('target', '_blank');
      a.click();
    },
    showDetails(){ this.$router.push({name: 'detail-permis', params: { id: this.selected[0].idpermis }}); },

    handlePermisExtended(){
      this.$refs.permisDialogue._close();
      this.getpermis()
    },
    async extendPermis(){
      const ok = await this.$refs.permisDialogue.show({
          title: 'prorogation de date',
          numpermis: this.selected[0].numpermis,
          numtitre: this.selected[0].numtitre,
          datesignature: this.selected[0].datesignature,
      })
    },
    //fonction de parse d'un montant
    renouvelerPermmis(){
      this.$router.push({name:'permis-new'})
    },
    commify(n){
        var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : "");
    },
    currentDate() {
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        return date;
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
          this.selected = items[0]
      if(!php.empty(this.selected)){
        let datefinvalidite=new Date(this.selected.datefinvalidite)
        const todaysDate = new Date();
        console.log('datefinvalidite',datefinvalidite,' date du jour ',todaysDate);
        if(datefinvalidite.getTime() <= todaysDate.getTime()) {
          this.isToExtendPermis=true;
          this.idpermis=Number(this.selected.idpermis)
          console.log('idpermis',this.selected);
        }else{
          this.isToExtendPermis=false;
        }
      }
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
      this.getpermis()
    },
    verifyPermis(){
      this.$router.push({name: 'permis-verify'})
    },
    getpermis(){
      this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$permis.get("permis", {params}).then(response => {
        
        console.log('response',response);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items
        this.elements = this.elements.map(elt =>{
          if(elt.intituleposition != null&&elt.intituleposition.length>15){
            elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
            elt.typepermis = elt.typepermis == null ? "" : elt.typepermis.substring(0, 26) + '...'
          }
          elt.datesignature = elt.datesignature !==null ? this.$dayjs(elt.datesignature).format('YYYY-MM-DD') :""
          elt.datefinvalidite = elt.datefinvalidite !==null ? this.$dayjs(elt.datefinvalidite).format('YYYY-MM-DD') :""
          return elt
        })
            
          this.isBusy=false
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
    filterTable() {
        let data={ id:this.search.id, entite: this.entite.IDORGANISATION!=undefined?this.entite.IDORGANISATION:this.entite.IDORGANISATION, 
          typepermis: this.search.typepermis, numtitre: this.search.numtitre.idtitre, exercice: this.search.exercice, 
          position: this.search.position.IDORGANISATION, numpermis:this.search.numpermis, sigle:this.search.sigle,
          datesignature:this.search.datesignature, datefin:this.search.datefin, statutdemande:this.search.statutdemande, statut:this.search.statut  }
        this.isBusy=true
        this.$permis.post("permis/search", data).then((response) => {
            this.total = response.data.result.totalItems
            this.currentPage = response.data.result.currentPage + 1
            this.elements=response.data.result.items
            this.elements = this.elements.map(elt =>{
              if(elt.intituleposition != null&&elt.intituleposition.length>15){
                elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
                elt.typepermis = elt.typepermis == null ? "" : elt.typepermis.substring(0, 26) + '...'
              }
              elt.datesignature = elt.datesignature !==null ? this.$dayjs(elt.datesignature).format('YYYY-MM-DD') :""
              elt.datefinvalidite = elt.datefinvalidite !==null ? this.$dayjs(elt.datefinvalidite).format('YYYY-MM-DD') :""
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
      /*this.$titres.post("titres/cd/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt =>{
          if(elt.intituleposition != null&&elt.intituleposition.length>15){
            elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
            elt.typepermis = elt.typepermis == null ? "" : elt.typepermis.substring(0, 26) + '...'
          }
          elt.datesignature = elt.datesignature !==null ? this.$dayjs(elt.datesignature).format('YYYY-MM-DD') :""
          elt.datefinvalidite = elt.datefinvalidite !==null ? this.$dayjs(elt.datefinvalidite).format('YYYY-MM-DD') :""
          return elt
        })              
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
        });*/
    

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
        this.getpermis()
      },

    async getTypesPermis(){
      this.showOverlayTypepermis=true
      if(!php.empty(storage.get('types-permis'))){
        console.log('entrée 1');
        this.typespermis= storage.get('types-permis')
      }
      else{
        console.log('entrée 2');
        try {
            this.typespermis =  await this.$donneesReference.get("constantes/types-permis?size=100").then(response => response.data.result.items);
            console.log('types permis', this.typespermis);
            storage.set('types-permis',this.typespermis)
        }catch (error) {
          console.log(error.message);
        }
      }
      this.showOverlayTypepermis=false
    },
    getDates(){
        let exact = 2000 + new Date().getYear() - 100;
        for (let index = 0; index < 5; index++) {
        this.exercices.push(exact-index)
        }
        this.search.exercice=exact
    },
  },
  mounted(){
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{
      this.getpermis();
    }
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
    this.elements = this.elements.map(elt =>{
      elt.numpermis = elt.numpermis == null ? "" : elt.numpermis.substring(0, 10) + '...'
      elt.typepermis = elt.typepermis == null ? "" : elt.typepermis.substring(0, 26) + '...'
      elt.datesignature = elt.datesignature !==null ? this.$dayjs(elt.datesignature).format('YYYY-MM-DD') :""
      elt.datefinvalidite = elt.datefinvalidite !==null ? this.$dayjs(elt.datefinvalidite).format('YYYY-MM-DD') :""
        
        
      return elt
    })

    this.getDates();
  }
  }

</script>
<style scoped>
.permis-header-select-search{
  width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(0.8em + .300rem + 2px) !important;
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