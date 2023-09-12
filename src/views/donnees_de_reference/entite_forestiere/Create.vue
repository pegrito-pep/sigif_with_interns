<template>
    <div id="cover" class="min-vh-100">
          <b-overlay :show="showOverlay">
            <b-row class="ml-2" style="border-bottom: 2px solid green">
              <b-col class="pb-1 m-1" >
                  <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button>
                <span class="font-weight-bold">Enregistrement entité forestière </span>
                </h4>
                </b-col> 
              <b-col class="col-md-auto">
                <span>
                  <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                    <a v-else @click.prevent="sendFormCatalogue" :disabled="submitted"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
                <!--<span>
                  <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>-->
              </b-col>
            </b-row>

            <!-- CREATION PROPREMENT DITE INVENTAIRE-->
              <b-row class="mt-2">
                <b-col cols="6" class="px-3">
                  <b-row>
                    <b-col cols="5">
                      <label><span style="color: red;">*</span>Catalogue N°</label>
                    </b-col>
                    <b-col>
                      <input style="height: 24px !important;" :class="{ styleToSet: notSetCatalogue }" class="p-2 m-0 w-50" v-model="form.numcatalogue"  size="sm"  placeholder="" type="text" />
                    </b-col>
                  </b-row>
                  <b-overlay :show="showOverlayTypestitre" rounded="sm">
                    <b-row>
                      <b-col cols="5">
                        <label><span style="color: red;">*</span>Type de titre</label>
                      </b-col>
                      <b-col>
                        <v-select :class="{ styleToSet: notSetTypeTitre }" class="custom-select-type_titre  sigif-select" @input="showTypeTitreUI" :options="typesTitres" v-model="form.typetitre"  :reduce="typetitre => typetitre.code" label="libelle"></v-select>
                      </b-col>
                    </b-row>
                  </b-overlay>
                
                  
               
              </b-col>
              </b-row>
              <b-row>
                <CatalogueAEB v-if="form.typetitre=='AE'"/>
              </b-row>
          </b-overlay>

          <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
          
          <api-unreachable ref="apiunreacahble"></api-unreachable>
    </div>
    
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ApiUnreachable from '@/components/utils/ApiUnreachable.vue';
import CatalogueAEB from './CatalogueAEB.vue';

export default {
    name:"catalogue-create-form",
    components:{ErrorDialogue, CodeBarreInfo, ApiUnreachable, CatalogueAEB},
     watch: {
      "form.numcatalogue"(oldvalue,value) {
        if(value!==null&&value.length!==''){
            this.notSetCatalogue= false
        }
        else{
            this.notSetCatalogue= true
        }
      },
      "form.typetitre"(value) {
        console.log('entre ici nom ligne 1');
        if(value!==null&&value.length!==''){
              this.notSetTypeTitre= false
          }
          else{
              this.notSetTypeTitre= true
          }
      },
      "form.typeinventaire"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(value!==null&&value.length!==''){
              this.notsetTypeInventaire= false
          }
          else{
              this.notsetTypeInventaire= true
          }
      },
      "form.exercice"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(value!==null&&value.length!==''){
            this.notSetExercice= false
          }
          else{
            this.notSetExercice= true
          }
      },
      "form.fichierInventaire"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(!php.empty(value)){
            this.notSetFichierInventaire= true
        }
        else{
          this.notSetFichierInventaire= false
        }
      },
      "form.fichierImpact"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(!php.empty(value)){
            this.notSetFichierImpact= true
        }
        else{
          this.notSetFichierImpact= false
        }
      },
      "form.origin"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(php.empty(value) && oldvalue!==value){
            this.notSetOrigin= false
          }
          else{
            this.notSetOrigin= true
          }
      },
      "form.typeproduit"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(php.empty(value) && oldvalue!==value){
            this.notSetTypeProduit= false
          }
          else{
            this.notSetTypeProduit= true
          }
      },
      "form.superficie"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(value!==null&&value.length!==''){
            this.notSetSuperficie= false
          }
          else{
            this.notSetSuperficie= true
          }
      },
      "form.etudeimpact"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(value!==null&&value.length!==''){
            this.notSetImpact= false
          }
          else{
            this.notSetImpact= true
          }
      },
      "form.promoteur"(oldvalue,value) {
        console.log('entre ici nom ligne');
        if(value!==null&&value.length!==''){
            this.notSetPromoteur= false
          }
          else{
            this.notSetPromoteur= true
          }
      },
    },
     data: () => ({
        //data catologue tpe AEB
        fieldsLocalisationAEB:[
          { key: 'index', label: '' },{ key: 'idarrondissement', label: 'Arrondissement',thStyle: { width: "20%" } },
          { key: 'departement', label: 'Département',thStyle: { width: "20%" } },
          { key: 'region', label: 'Région' },
          { key: 'localisation', label: 'Localité/Village' },{ key: 'volume', label: 'Volume',thStyle: { width: "10%" } },
          { key: 'action', label: '',thStyle: { width: "5%" } },
        ],
        elementsLocaliteAEB:[],
        fieldsproduitsAEB:[
        { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
        { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
        { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
        { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
        { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
        {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},
        {key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
        {key:'nombrepiece',label:' Nb de pièces'},
        {key:'longueur',label:'Longueur'},
        {key:'largeur',label:'largeur'},
        {key:'epaiseur',label:'épaisseur'},
        {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
      ],
      elementsProduitsAEB:[],
        notSetOrigine:false,
        submitted: false,
        submittedcontinue: false,
        showOverlay:true,
        showOverlayTypestitre:false,
        shoverlayentites:false,
        showFichierInventaire:false,
        showFichierImpact:false,
        showTypeInventaire:false,
        showSuperficie:false,
        showPromoteur:false,
        showExercice:false,
        exercices:[],
        showImpact:false,
        showVolume:false,
        showTonne:false,
        catalogue:{
          numero:""
        },
        showDetailsLots:false,
        showDetailsLots2:false,
        showDetailsLots3:false,
        showDetailsLots4:false,
        showDetailsLots5:false,
        showDetailsLots6:false,
        showDetailsLots7:false,
        showTypeProduits:false,
        showTypeTitre:false,
        showRemaining:false,
        showRemainingAR:false,
        showOrigin:false,
        showRef:false,
        showLocalisations:false,
        showLocalisationsSuperficie:false,
        showLocalisationsTonne:false,
        inventaire:{
          typetitre: "",
          numtitre:"",
          exercicefiscal:"",
          entiteagree: ""
        },
        perPage: 7,
        currentPage: 1,
        rows: 9,

        perPageEssence: 10,
        currentPageEssence: 1,
        rowsEssence: 0,
        titres:[],
        typeTitreSet:false,
        
        typesTitres:[
        ],
        searchligne:'',
        offsetlignes:0,
        limitlignes:10,
        offsetessences:0,
        limitessences:10,
        isBusy:false,
        showOverlayLocalisation:false,
        essences:[],
        sequence:'',
        form:{
          numcatalogue:'',
          typetitre:'',
          typeinventaire:'',
          typeproduit:'',
          exercice:'',
          volume:'',
          tonne:'',
          tonneProduits:'',
          superficie:'',
          etudeimpact:'',
          idarrondissement:'',
          volumeLocalisation:'',
          superficieLocalisation:'',
          tonneLocalisation:'',
          superficie:'',
          fichierInventaire:null,
          fichierImpact:null,
          ref:'',
          codebarre:'',
          idessence:'',
          utmzone:'',
          utmx:'',
          utmy:'',
          qualite:'',
          volumeProduits:'',
          diampb:'',
          diamgb:'',
          longueur:'',
          largeur:'',
          bnPieces:'',
          epaisseur:'',
          diamtige:'',
          numBloc:'',
          numUc:'',
          numTige:'',
          promoteur:'',
        },
        filerapportinventaire:null,
        attacheretudeimpact:null,
        produits:[

        ],
        localisations:[

        ],
        arrondissement:{},
        search:{
          entite:'', site:'', essence:'',typetitre:''
        },
        offsetArrondissements:0,
        limitArrondissements:10,
        exercices:[],
        entitesagrees: [],
        typesBois: [
            "Bois partant d'un site pour un autre site appartenant au même opérateur",
            "Bois de négoce",
            "Bois à l'export",
            "Lettre de voiture pour permis spéciaux",
        ],
        titres:[],
        qualites:[],
        exercices:[],
        annecourante:"",
        entitesagrees:[],
        loadData:false,
        typesinventaires: ["Exploitation"],
        
       
        fieldsproduitsARB:[
        { key: 'index', label: '',thStyle:{width:'0%'}},{ key: 'codebarre', label: 'Code barre', thStyle:{width:'7%'} },
        { key: 'sequence', label: 'Séquence',thStyle:{width:'10%'}},
        { key: 'essence', label: 'Essence',thStyle:{width:"15%"} },
        {key:'diametreTige',label:'Diamètre tige'},{key:'numBloc',label:'Numéro du bloc'},{key:'numUc',label:'Numéro de l\'UC'},
        {key:'numtige',label:'Numéro de la tige'},
        { key: 'utmZone', label: 'UTM Zone',thStyle: { width: "6%" } },
        { key: 'utmX', label: 'UTM X',thStyle: { width: "5%" } },
        {key:'utmY',label:'UTM Y',thStyle:{width:'5%'}},{key:'qualite',label:'Qualité',thStyle:{width:'7%'}},
        {key:'volume',label:'Volume(m3)', thStyle:{width:'7%'}},{key:'action',label:'',thStyle:{width:'3%'}}
      ],
       
      // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        notSetCatalogue:false,
        notSetTypeTitre:false,
        notsetTypeInventaire:false,
        notSetExercice:false,
        notSetFichierInventaire:false,
        notSetOrigin:false,
        notSetTypeProduit:false,
        notsetTypeInventaire:false,
        notSetPromoteur:false,
        notSetImpact:false,
        notSetSuperficie:false,
        notSetFichierImpact:false,
        notSetCodeBarre:false,
        notSetEssence:false,
        notSetUTMZone:false,
        notSetUTMX:false,
        notSetUTMY:false,
        notSetQualite:false,
        notSetDiampb:false,
        notSetDiamgb:false,
        notSetLongueur:false,
        notSetTonne:false,
        elementsentreelocalite:[],
        elementsentreelocaliteTonne:[],
        elementsentreelocaliteSuperficie:[],
        elementsdetailsLot:[],
        elementsdetailsLot2:[],
        elementsdetailsLot3:[],
        elementsdetailsLot4:[],
        elementsproduitsARB:[],
        elementsdetailsLot6:[],
        elementsdetailsLot7:[],
        fieldsLocalisation: [
          { key: 'index', label: '' },{ key: 'idarrondissement', label: 'Arrondissement',thStyle: { width: "20%" } },
          { key: 'departement', label: 'Département',thStyle: { width: "20%" } },
          { key: 'region', label: 'Région' },
          { key: 'localisation', label: 'Localité/Village' },{ key: 'superficie', label: 'Superficie',thStyle: { width: "10%" } },
          { key: 'action', label: '',thStyle: { width: "5%" } },
        ],
        fieldsLocalite: [
          { key: 'index', label: '' },{ key: 'idarrondissement', label: 'Arrondissement',thStyle: { width: "20%" } },
          { key: 'departement', label: 'Département',thStyle: { width: "20%" } },
          { key: 'region', label: 'Région' },
          { key: 'localisation', label: 'Localité/Village' },{ key: 'superficie', label: 'Superficie',thStyle: { width: "10%" } },
          { key: 'action', label: '',thStyle: { width: "5%" } },
        ],
        fieldsEntreesLocalitésTonne: [
          { key: 'index', label: '' },{ key: 'arrondissement', label: 'Arrondissement',thStyle: { width: "20%" } },
          { key: 'departement', label: 'Département',thStyle: { width: "20%" } },
          { key: 'region', label: 'Région' },
          { key: 'localite', label: 'Localité/Village' },{ key: 'tonne', label: 'Tonne',thStyle: { width: "10%" } },{ key: 'action', label: '',thStyle: { width: "5%" } },
        ],
        entreesArrondissements:[],
        currentItemGrume:[],
        showOverlayCodeData:false,
        // Données du tableau

        searchessences:'',
        zones: [
          { libelle: "1N", value: 1 },
          { libelle: "2N", value: 2 },
          { libelle: "3N", value: 3 },
        ], 

        fields: [{ codebarre: '', codebarresequence: '', nomcommercial: "", diametretige: '', nobloc: '', nouc: '', notige: '', qualite: {intitule: "", codequalite :""}, zone: { libelle: "", value: 1 }, utmx: '', utmy: '', volume: ''}],
        fieldsLocalites: [{ arrondissement: '', departement: '', region: "", localite: '', superficie: ''}],
    }),

    methods: {
      //chargement autres données localisation
      async loadOtherDataLocation(index, data){
        this.elementsLocaliteAEB[index].departement=data.departementdto.intitule;
        this.elementsLocaliteAEB[index].region=data.departementdto.regionDto.intitule;
      },
      //partie AEB localisation
      addFielLocalisationAEB(){
        if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeproduit)) {
            this.notSetTypeProduit=true;
            let error={ message:'Veuillez remplir le type de produit'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.origine)) {
            this.notSetOrigin=true;
            let error={ message:'Veuillez renseigner l\'origine'}
            return this.sendAlertMessage(error);
          }
          this.elementsLocaliteAEB.unshift({arrondissement: '', departement: '', region : '', localite:'',volume:''});  
      },
      addFieldProduitAEB(){
          this.getProduitsData();
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.promoteur)) {
            this.notSetPromoteur=true;
            let error={ message:'Veuillez renseigner le  promoteur'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.etudeimpact)) {
            this.notSetImpact=true;
            let error={ message:'Veuillez renseigner l\'étude d\'impact'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.superficie)) {
            this.notSetSuperificie=true;
            let error={ message:'Veuillez renseigner la superifice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierImpact)) {
            this.notSetFichierImpact=true;
            let error={ message:'Veuillez renseigner le fichier d\'impact'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsproduitsARB.unshift({codebarre: '', sequence: '',essence:'',diametreTige:'',
          numBloc:'',numUc:'',numtige:'', utmZone : '', 
          utmX:'',utmY:'',qualite:'',volume:''});
      },
      //methode d'ajout d'un catalogue
      formatPostContent(){
        if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            this.sendAlertMessage(error);
            return false;
        }
        else  if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            this.sendAlertMessage(error);
            return false;
          }
        else  if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            this.sendAlertMessage(error);
            return false;
          }
        else  if (php.empty(this.form.origine)) {
            this.notSetOrigin=true;
            let error={ message:'Veuillez renseigner l\'origine'}
            this.sendAlertMessage(error);
            return false;
          }
       
          this.form.volume=this.volumetotal;
          this.form.superficieDto=this.elementsentreelocalite
          this.elementsproduitsARB = this.elementsproduitsARB.map(elt =>{
              elt.volume=1              
              return elt
          })
          this.form.produits=this.elementsproduitsARB
          return true;
      },
      async sendFormCatalogue(){
        if(this.formatPostContent){
          this.submitted =true;
        console.log('données envoyées ',this.form);
        this.$inventaire.post('catalogues', this.form).then(response => {
              this.submitted = false 
              this.resetForm()
              App.notifySuccess(response.data.message)
              return this.$router.push({ name: "catalogues" });
          }).catch(error => {
              console.log('entrée dans le catch ', error);
              this.submitted = false
              this.errorHappened(error.response.data)
          })
        }
       
      
      },
      async errorHappened(error, index, fields){
      let message= error!=null? error.message:'erreur interne du serveur'
      const ok = await this.$refs.codebarreinfo.show({
              title: 'Information',
              message: error,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
              this.$refs.codebarreinfo._close();
            }
    },
      //traitement fichier etude d'impact
      async getBase64FileEtudeImpact(e){
        const attacheretudeimpact = this.attacheretudeimpact =  e.target.files[0];
        this.form.attacheretudeimpact=await this.getBase64(attacheretudeimpact)
      },
      //traitement fichier rapport des inventaires
      async getBase64FileInventaire(e){
        const fileinventaire = this.filerapportinventaire =  e.target.files[0];
        this.form.rapportinventaire=await this.getBase64(fileinventaire)
      },
      getBase64(file) {
          return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
          });
      },
      addFieldProduitARB(){
          this.getProduitsData();
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.promoteur)) {
            this.notSetPromoteur=true;
            let error={ message:'Veuillez renseigner le nom du promoteur'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.etudeimpact)) {
            this.notSetImpact=true;
            let error={ message:'Veuillez renseigner l\'étude d\'impact'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.superficie)) {
            this.notSetSuperificie=true;
            let error={ message:'Veuillez renseigner la superifice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierImpact)) {
            this.notSetFichierImpact=true;
            let error={ message:'Veuillez renseigner le fichier d\'impact'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsproduitsARB.unshift({codebarre: '', sequence: '',essence:'',diametreTige:'',
          numBloc:'',numUc:'',numtige:'', utmZone : '', 
          utmX:'',utmY:'',qualite:'',volume:''});
      },
       getDates(){
           let exact = 2000 + new Date().getYear() - 100;
           for (let index = 0; index < 5; index++) {
            this.exercices.push({ libelle: exact - index, value: index + 1, },)
           }
           this.inventaire.exercicefiscal=exact
        },
        processTags(value, index, key) {
          let data = {
            codebarre: "ER0102", codebarresequence: "REF0045"
          }
            setTimeout(() => {
              if (key === "codebarre") {
                this.fields[index].codebarresequence = data.codebarresequence;
              }
              else {
                this.fields[index].codebarre = data.codebarre;
              }
            }, 400);
        },
        checkFormAE(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typetitre)) {
            this.notSetTypeTitre=true;
            let error={ message:'Veuillez remplir le type de titre'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez renseigner le type de d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.origin)) {
            this.notSetOrigin=true;
            let error={ message:'Veuillez renseigner l\'origine'}
            return this.sendAlertMessage(error);
          }
        },
        resetProduits(){
          this.showDetailsLots=this.showDetailsLots3=this.showDetailsLots4=this.showDetailsLots5=
          this.showDetailsLots6=this.showDetailsLots7=false
          this.elementsdetailsLot=this.elementsdetailsLot3=this.elementsdetailsLot4=
          this.elementsdetailsLot5=this.elementsdetailsLot6=this.elementsdetailsLot7=[]
        },
        resetLocalisations(){
          this.showLocalisations=this.showLocalisationsTonne=this.showLocalisationsSuperficie=false
          this.elementsentreelocalite=this.elementsentreelocaliteSuperficie=this.elementsentreelocaliteTonne=[]
        },
        resetForm(){
          this.showTypeProduits=this.showTypeInventaire=this.showExercice=this.showOrigin=
          this.showRef=this.showVolume=this.showTonne=this.showSuperficie=this.showPromoteur=this.showImpact
          =this.showFichierInventaire=this.showFichierImpact=this.showExercice=this.showRemaining= this.showRemainingAR=false
          // this.elementsentreelocaliteTonne=this.elementsentreelocaliteSuperficie=this.elementsentreelocaliteTonne=[]
          for(let i in this.form){
            if(i!=='typetitre'){
              if(i==='numcatalogue'){
                continue
              }
              this.form[i]=''
            }
            this.form.fichierInventaire=this.form.fichierImpact=null
          }
        },
        showTypeProduitUI(){
          this.showTypeProduits=true;
        },
        showTypeProduitUI2(){
          if(this.form.typeproduit==="GR"){
            this.showTitreGrumes()
          }else if(this.form.typeproduit==='CL'){
            this.showTitreDebites()
          }else{
            this.showTitreSpecial()
          }
        },
        showTitreGrumes(){
            // this.resetForm()
            this.showOrigin=true
            this.showRemaining=true
            this.showRef=true
            this.showVolume=true
            this.resetProduits()
            this.showLocalisations=true
            this.showDetailsLots3=true
        },
        showTitreDebites(){
          this.showTitreGrumes()
          this.resetProduits()
          this.showDetailsLots4=true
        },
        showTitreSpecial(){
          this.showTitreGrumes()
          this.resetProduits()
          this.showDetailsLots=true

        },
        //controle du codebarre du détails du lot
      checkCodebarredetailLot(index, value){
        this.getSequence(index, value);
        
      },
      async getSequence(index, value){
        this.showOverlayCodeData=true;
          await this.$codesbarres.post("check/check_codebarre_catalogue", {codebarre : value},{validateStatus:()=>true})
        .then(response =>{
          console.log('response ',response);
          if(response.status===200){
            this.elementsproduitsARB[index].sequence = response.data.result.sequence
          }
          else{
            this.showOverlayCodeData=false;
            return this.showDialogueApiError(response.data.message);
          }
            this.showOverlayCodeData=false;
        })
        .catch(error =>{
            if(error.response){
              console.log(error.response)
            }else if(error.request){
              console.log(error.request)
            }else{
              console.log(error.message)
            }
           this.showOverlayCodeData=false;
        })     
      },

        showTypeTitreUI(){
          this.resetProduits()
          this.resetLocalisations()
          this.resetForm()
          if(this.form.typetitre==='AE'){
            this.showTitreAE()
          }else if(this.form.typetitre==='AR'){
            this.showTitreAR()
          }else if(this.form.typetitre==='PS'){
            this.showTitrePS()
          }else if(this.form.typetitre==='AP'){
            this.showTitreAP()
          }else if(this.form.typetitre==='BO'){
            this.showTitreBO()
          }else if(!this.form.typetitre){
            this.showDetailsLots=this.showDetailsLots2=this.showDetailsLots3=this.showDetailsLots4=this.showDetailsLots5=false
            this.showTypeProduits=this.showRemaining=this.showRef=this.showOrigin=this.showFichierInventaire=false
            this.showRemainingAR=this.showPromoteur=this.showSuperficie=this.showDetailsLots6=this.showTonne=
            this.showImpact=this.showFichierImpact=this.showVolume=this.showDetailsLots7=false
          }
        },
        showTitreAE(){
          this.showTypeProduitUI();
        },
        showTitreAR(){
          this.showRemaining=true
          this.showRemainingAR=true
          this.showImpact=true
          this.showPromoteur=
          this.showVolume=false
          this.showSuperficie=true
          this.showPromoteur=true
          this.showFichierImpact=this.showFichierInventaire=true
          this.showDetailsLots5=true
          this.showLocalisations=false
          this.showLocalisationsTonne=false
          this.showLocalisationsSuperficie=true
        },
        showTitrePS(){
          this.showRemaining=true
          this.showRemainingAR=false
          this.showFichierInventaire=true
          this.showFichierImpact=this.showImpact=false
          this.showSuperficie=false
          this.showPromoteur=false
          this.showTonne=true
          this.showDetailsLots=false
          this.showDetailsLots2=this.showDetailsLots3=this.showDetailsLots4=this.showDetailsLots5=false
          this.showDetailsLots6=true
          this.showLocalisations=this.showLocalisationsSuperficie=false
          this.showLocalisationsTonne=true
        },
        showTitreAP(){
          this.showRemaining=true
          this.showRemainingAR=false
          this.showFichierInventaire=true
          this.showFichierImpact=this.showImpact=false
          this.showSuperficie=false
          this.showPromoteur=false
          this.showTonne=false
          this.showVolume=true
          this.showDetailsLots=false
          this.showDetailsLots2=this.showDetailsLots3=this.showDetailsLots4=this.showDetailsLots5=false
          this.showDetailsLots6=false
          this.showLocalisationsSuperficie=this.showLocalisationsTonne=false
          this.showLocalisations=true
          this.showDetailsLots7=true
        },
        showTitreBO(){
          this.showRemaining=true
          this.showRemainingAR=false
          this.showFichierInventaire=true
          this.showFichierImpact=this.showImpact=false
          this.showSuperficie=false
          this.showPromoteur=false
          this.showTonne=false
          this.showVolume=false
          this.showSuperficie=true
          this.showDetailsLots=false
          this.showDetailsLots2=this.showDetailsLots3=this.showDetailsLots4=this.showDetailsLots5=false
          this.showDetailsLots6=false
          this.showLocalisations=this.showLocalisationsSuperficie=this.showLocalisationsTonne=false
          this.showLocalisations=false
          this.showLocalisationsSuperficie=true
          this.showDetailsLots7=false
          this.showDetailsLots5=true
        },
        
        async loadOtherData(index,data){
            this.showOverlayLocalisation = true;
          try{
            if(php.empty(data)){
              this.elementsentreelocalite[index].departement='';
              this.elementsentreelocalite[index].region='';
              this.showOverlayLocalisation = false;
              return
            }
            this.arrondissement=await this.$donneesReference.get(`arrondissements/${data}/departement_region`)
              .then(resp=>{
                let arr=resp.data.result
                console.log(this.arrondissement)
                this.elementsentreelocalite[index].departement=arr.departement;
                this.elementsentreelocalite[index].region=arr.region;
                console.log(this.elementsentreelocalite)
              })
          }catch(err){
            console.log(err.message)
          }
          this.showOverlayLocalisation = false;

        },
        removeAtIndex(index) {
          this.fields.splice(index, 1);
        },
         // gestion boutton suppression ligne entree usinage
        RemouveFieldEntree(index){
          this.elementsentreelocalite.splice(index, 1);
          this.form.idarrondissement=''
          this.form.tonneLocalisation=''
          this.form.departement=''
          this.form.region=''
        },
        async showDialogueApiError(message){
          const ok = await this.$refs.apiunreacahble.show({
            title: 'Information',
            message: message,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
              // this.$router.back();
          } else {
            this.$refs.codebarreinfo._close();
            // this.$router.back();
          }
        },
        RemouveFieldDetailLot(index){
          this.elementsdetailsLot.splice(index, 1);
          
        },
        async getCatalogueData(){
          if (!php.empty(this.$store.state.typesTitres) ) {
            this.typesTitres = this.$store.state.typesTitres;
          } 
          else{
            try {
              this.typesTitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
              this.$store.dispatch('typesTitres', this.typesTitres)
            } catch (error) {
                App.notifyError(error.message);
            }
          }
          console.log('types-titres ',this.typesTitres);
          this.formatContent(this.typesTitres);
          this.showOverlay=true
          this.form.exercice="2023"
          if (!php.empty(this.$store.state.arrondissementsfournis) ) {
            this.arrondissements = this.arrondissementsfournis = this.$store.state.arrondissementsfournis
          } 
          else{
            try{
                this.arrondissements = this.arrondissementsfournis = await this.$donneesReference.get("arrondissements/raw").then(response => response.data.result.Items);
                this.$store.dispatch('arrondissementsfournis', this.arrondissements)
            } catch (error){
                App.notifyError(error.message);
            }
          }
          console.log('arrondissements',this.arrondissements);
          this.showOverlay=false;
        },
        async getProduitsData(){
          this.showOverlayCodeData=true;
          if(!php.empty(this.$store.state.essences)){
            this.essences=this.$store.state.essences;
          }
          else{
            try {
                this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                console.log('essences ',this.essences);
                this.$store.dispatch('essences', this.essences)
            } catch (error) {
                console.log(error.message);
            }
          }
          if(!php.empty(this.$store.state.qualites)){
            this.qualites=this.$store.state.qualites
          }else{
            try {
                this.qualites =  await this.$inventaire.get("catalogues/qualites").then(response => response.data.result.Items);
                console.log('qualites ',this.qualites);
                this.$store.dispatch('qualites', this.qualites)
            } catch (error) {
                console.log(error.message);
            }
          }
          this.showOverlayCodeData=false;
        },
        async  setformNext(){
          if(!php.empty(this.inventaire.typetitre)){
            this.typeTitreSet =true
            this.loadData = true
            this.inventaire.numtitre=""
            this.titres= await this.$titres.get("titres/"+this.inventaire.typetitre.code+"?size=400").then(response => response.data.result.items);
            this.loadData = false
          }
        },

        formatContent(data){
          data.map((elt)=>{
              if(elt.code==='AR'){
                elt.libelle="Autorisation de récupération du bois"
              }
              if(elt.code==='BO'){
                elt.libelle="Permis de bois d'oeuvre"
              }
              if(elt.code==='AE'){
                elt.libelle="Autorisation d'enlèvement du bois"
              }
              if(elt.code==='PS'){
                elt.libelle="Permis spécial"
              }
              if(elt.code==='AP'){
                elt.libelle="Autorisation personnelle de coupe"
              }
            return elt
          })
        },

        async getDataLocalites(){
          if(!php.empty(this.$store.state.arrondissementsfournis)){
                this.arrondissements = this.$store.state.arrondissementsfournis
          }
          else{
            this.$donneesReference.get("arrondissements/raw").then(response => response.data).then(response => {
            this.arrondissements = response.result.Items
            this.$store.dispatch('arrondissementsfournis', this.arrondissements)
            })
          }
        },
      
        onSearchLigne(query){
          this.searchligne = query
          this.offsetlignes = 0
        },
        onSearch(query) {
        this.searchessences = query
        this.offsetessences = 0
      },

       fermer() {this.$router.back()},
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
        validateState(key){
            return true
        },
        deleteAllLocalites(){
          this.fields = [{ arrondissement: '', departement: '', region: "", localite: '', superficie: ''}]
        },

        AddField () {
          this.fields.push({ codebarre: '', codebarresequence: '', nomcommercial: { libelle: "", value: 0 }, diametretige: '', nobloc: '', nouc: '', notige: '', qualite: '', zone: '', utmx: '', utmy: '', volume: ''});
        },
        deleteAll(){
          this.fields = [{ codebarre: '', codebarresequence: '', nomcommercial: { libelle: "", value: 0 }, diametretige: '', nobloc: '', nouc: '', notige: '', qualite: '', zone: '', utmx: '', utmy: '', volume: ''}]
        },

        // ///////////////////////////////////////////////
        addFieldDetailLot(){
          if(this.form.typetitre==='AE'){
            this.addFieldDetailLotAE()
          }else if(this.form.typetitre==='AR'){
            this.addFieldDetailLotAR()
          }else if(this.form.typetitre==='PS'){
            this.addFieldDetailLotPS()
          }else if(this.form.typetitre==='AP'){
            this.addFieldDetailLotAP()
          }else if(this.form.typetitre==='BO'){
            this.addFieldDetailLotBO()
          }
        },

     
        addFieldDetailLotPS(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          
        },
        addFieldDetailLotAP(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          
        },
        addFieldDetailLotBO(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.superficie)) {
            this.notSetSuperficie=true;
            let error={ message:'Veuillez renseigner la superficie'}
            return this.sendAlertMessage(error);
          }

          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          
        },




         //gestion bouton ajouter entrée usinage
        addFieldEntree(){
          if(this.form.typetitre==='AE'){
            this.addFieldEntreeAE()
          }else if(this.form.typetitre==='AR'){
            this.addFieldEntreeAR()
          }else if(this.form.typetitre==='PS'){
            this.addFieldEntreePS()
          }else if(this.form.typetitre==='AP'){
            this.addFieldEntreeAP()
          }else if(this.form.typetitre==='BO'){
            this.addFieldEntreeBO()
          }
        },

        //  ////////////////////////////////addfieldentrées
        addFieldEntreeAE(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typetitre)) {
            this.notSetTypeTitre=true;
            let error={ message:'Veuillez remplir le type de produit'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeproduit)) {
            this.notSetTypeProduit=true;
            let error={ message:'Veuillez remplir le type de produit'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez renseigner le type de d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.origin)) {
            this.notSetOrigin=true;
            let error={ message:'Veuillez renseigner l\'origine'}
            return this.sendAlertMessage(error);
          }
          // if (php.empty(this.form.fichierInventaire)) {
          //   this.notSetFichierInventaire=true;
          //   let error={ message:'Veuillez renseigner le rapport inventaire'}
          //   return this.sendAlertMessage(error);
          // }
          // this.showDetailsLots=true
          this.elementsentreelocalite.unshift({arrondissement: '', departement: '', region : '', localite:'',tonne:''});
        },
        addFieldEntreeAR(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.promoteur)) {
            this.notSetPromoteur=true;
            let error={ message:'Veuillez renseigner le  promoteur'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.etudeimpact)) {
            this.notSetImpact=true;
            let error={ message:'Veuillez renseigner l\'étude d\'impact'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.superficie)) {
            this.notSetSuperificie=true;
            let error={ message:'Veuillez renseigner la superifice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierImpact)) {
            this.notSetFichierImpact=true;
            let error={ message:'Veuillez renseigner le fichier d\'impact'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsentreelocaliteSuperficie.unshift({arrondissement: '', departement: '', region : '', localite:'',tonne:''});
        },
        addFieldEntreePS(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsentreelocaliteTonne.unshift({arrondissement: '', departement: '', region : '', localite:'',tonne:''});
        },
        addFieldEntreeAP(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsentreelocaliteTonne.unshift({arrondissement: '', departement: '', region : '', localite:'',tonne:''});
        },
        addFieldEntreeBO(){
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez remplir le type d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.superficie)) {
            this.notSetSuperficie=true;
            let error={ message:'Veuillez renseigner la superficie'}
            return this.sendAlertMessage(error);
          }

          if (php.empty(this.form.fichierInventaire)) {
            this.notSetFichierInventaire=true;
            let error={ message:'Veuillez renseigner le rapport inventaire'}
            return this.sendAlertMessage(error);
          }
          // this.showDetailsLots=true
          this.elementsentreelocaliteTonne.unshift({arrondissement: '', departement: '', region : '', localite:'',tonne:''});
          console.log('entree!!!!!')
        },


        // addFieldDetailLot(){
        //   this.elementsdetailsLot.unshift({codebarre: '', sequence: '', essence : '', diamtige: '', utmzonne:'',utmx:'',utmy:'',qualite:'',tonne:''});
        // },
        checkFormAE(){
          console.log('entrée checkform')
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typetitre)) {
            this.notSetTypeTitre=true;
            let error={ message:'Veuillez remplir le type de titre'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeproduit)) {
            this.notSetTypeProduit=true;
            let error={ message:'Veuillez remplir le type de produit'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typeinventaire)) {
            this.notsetTypeInventaire=true;
            let error={ message:'Veuillez renseigner le type de d\'inventaire'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.exercice)) {
            this.notSetExercice=true;
            let error={ message:'Veuillez renseigner l\'exercice'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.origin)) {
            this.notSetOrigin=true;
            let error={ message:'Veuillez renseigner l\'origine'}
            return this.sendAlertMessage(error);
          }
          if(this.elementsdetailsLot3.length===0){
              return this.showDialogueApiError('Veuiilez entrer les valeurs des limites du catalogue')
          }
          if(this.elementsentreelocalite.length===0){
            return this.showDialogueApiError('Veuiilez entrer les valeurs des localisations')
          }
          const localisations=[]
          const produits=[]
          for(const obj of this.elementsentreelocalite){
            localisations.push({
              idarrondissement:obj.arrondissement,
              superficie:obj.tonne,
              localisation:obj.localite
            })
          }
          for(const obj of this.elementsdetailsLot3){
            produits.push({
              codebarre:obj.codebarre,
              essence:obj.essence,
              utmZone :obj.utmzone,
              utmX : obj.utmx,
              volume :obj.tonne,
              utmY :obj.utmy,
              qualite :obj.qualite,
              diametrePb :obj.diampb,
              diametreGb :obj.diamgb,
              longueur :obj.longueur

            })
          }
          const data={
            numcatalogue: this.form.numcatalogue, // string obligatoire
	          typetitre: this.form.typetitre,
            typeProduit: this.form.typeproduit ,
            typeinventaire: this.form.typeinventaire, // string, obligatoire
            exercice: this.form.exercice, // string, obligatoire
            superficie: this.form.volume, // int, non obligatoire
            promoteur: this.form.promoteur, // string, obligatoire
            volume :this.form.volume,//somme des vules de codebarres vas sans la table titreaac //obligatoire
            superficieDto :localisations,
            produits :produits
          }
          this.sendData(data)
        },

        enregistrer() {
          /*this.form.codebarres =  [];
          this.fields.forEach(field => {
            this.form.codebarres.push(field.codebarre)
          }) */
          if (php.empty(this.form.numcatalogue)) {
            this.notSetCatalogue=true;
            let error={ message:'Veuillez remplir le numéro de catalogue'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.form.typetitre)) {
            this.notSetTypeTitre=true;
            let error={ message:'Veuillez remplir le type de titre'}
            return this.sendAlertMessage(error);
          }
          if(this.form.typetitre==='AE'){
            this.checkFormAE()
          }
        },

        sendData(data){
          console.log(data)
        },

        // //////////////////////////////////////////////////////
        async sendAlertMessage(error){
          const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error.message,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
          } else {
            this.$refs.codebarreinfo._close();
          }
        },

        // /////
        onRowSelectedEntree(items) {
          console.log('row selected',items);
          items.isSelected =true;
        },

        //methode de gestion de la sélection d'une ligne du tableau des détails du lot
      onRowSelectedDetailLot(items) {
        this.indexRowSelectedDetail = items.map(item => this.currentItemGrume.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItemGrume.indexOf(item)).length;i++){
          this.indexRowSelectedDetail =items.map(item => this.currentItemGrume.indexOf(item))[i]
          console.log('i ',this.indexRowSelectedDetail);
        }    
      },
        


        setUserStatut(){},
       
        controleChange() {
            console.log("Somethings change");
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
                this.selected = items
        },
        // getDates(){
        //    let exact = 2000 + new Date().getYear() - 100;
        //    for (let index = 0; index < 5; index++) {
        //     this.exercices.push({ libelle: exact - index, value: index + 1, },)
        //    }
        //    this.annecourante=exact
        // },


    },
    computed:{
      filteredArrondissements() {
        return this.arrondissements.filter((arrondissement) =>
        arrondissement.intitule.toLocaleLowerCase().includes(this.searcharrondissement.toLocaleLowerCase())
        )
      },
      paginatedArrondissements() {
        return this.filteredArrondissements.slice(this.offsetArrondissements, this.limitArrondissements + this.offsetArrondissements)
      },
      hasNextPageArrondissements() {
        const nextOffset = this.offsetArrondissements + this.limitArrondissements
        return Boolean(
          this.filteredArrondissements.slice(nextOffset, this.limitArrondissements + nextOffset).length
        )
      },
      hasPrevPageArrondissements() {   
        const prevOffset = this.offsetArrondissements - this.limitArrondissements
        return Boolean(
          this.filteredArrondissements.slice(prevOffset, this.limitArrondissements + prevOffset).length
        )
      },
      //elements AEB
      itemsLocalitesAEB(){
        return this.elementsLocaliteAEB.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
      },
      itemsProduitsAEB(){
          return this.elementsproduitsAEB.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
      volumetotal(){
        let vt =this.elementsproduitsARB.reduce(function(prev, cur) {
          return Number(prev) +Number(cur.volume);
        }, 0);
        if(!php.empty(vt)){
          return vt.toFixed(3)
        }
        else{
          return 0
        }
      },
      itemsLocalites(){
        return this.elementsentreelocalite.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
      });
      },
      itemsLocalitesTonne(){
        return this.elementsentreelocaliteTonne.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
      });
      },
      itemsLocalitesSuperficie(){
        return this.elementsentreelocaliteSuperficie.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
      });
      },

    filteredLignes() {
      return this.entreesArrondissements.filter((ligne) =>
        ligne.intitule.toLocaleLowerCase().includes(this.searchligne.toLocaleLowerCase())
    )
    },
    paginatedLignes() {
      return this.filteredLignes.slice(this.offsetlignes, this.limitlignes + this.offsetlignes)
    },
    hasNextPageLignes() {
      const nextOffset = this.offsetlignes + this.limitlignes
      return Boolean(
        this.filteredLignes.slice(nextOffset, this.limitlignes + nextOffset).length
      )
    },
    hasPrevPageLignes() {   
        const prevOffset = this.offsetlignes - this.limitlignes
        return Boolean(
          this.filteredLignes.slice(prevOffset, this.limitlignes + prevOffset).length
        )
      },
      items() {
          return php.array_slice(this.entitesagrees, this.offset, this.perPage);
        },
        offset() {
          return this.currentPage * this.perPage - this.perPage;
        },
        itemsEssence() {
          return php.array_slice(this.essences, this.offsetEssence, this.perPageEssence);
        },
        offsetEssence() {
          return this.currentPageEssence * this.perPageEssence - this.perPageEssence;
        },
        itemsdetailsLot(){
          return this.elementsdetailsLot.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsdetailsLot2(){
          return this.elementsdetailsLot2.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsdetailsLot3(){
          return this.elementsdetailsLot3.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsdetailsLot4(){
          return this.elementsdetailsLot4.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsproduitsARB(){
          return this.elementsproduitsARB.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsdetailsLot6(){
          return this.elementsdetailsLot6.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },
        itemsdetailsLot7(){
          return this.elementsdetailsLot6.map((a, index) => {
            a.isFirst = index == 0;
            a.isEven = index % 2 == 0;
            return a;
          });
        },

      // /////////////////////Listing des essences
      filtered() {
        return this.essences.filter((essence) =>
        essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
        )
      },
      paginated() {
        return this.filtered.slice(this.offsetessences, this.limitessences + this.offsetessences)
      },
      hasNextPage() {
        const nextOffset = this.offsetessences + this.limitessences
        return Boolean(
          this.filtered.slice(nextOffset, this.limitessences + nextOffset).length
        )
      },
      hasPrevPage() {   
        const prevOffset = this.offsetessences - this.limitessences
        return Boolean(
          this.filtered.slice(prevOffset, this.limitessences + prevOffset).length
        )
      },
    },
     mounted() {
        this.getCatalogueData();
        this.getDates();
        //await this.getEssenceData();
        // this.getDates();
        // this.toggleSideBar();
    },

}
</script>


<style scoped>

.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.styleToSet{
border: 2px solid red;
}
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.2;
  }
/*.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
  --vs-controls-size: 1;
  --vs-font-size: 0.55rem;
  --vs-line-height: 0.38;
  --vs-dropdown-option-padding: 10px 15px;
  --vs-actions-padding: 0px 0 0 0px;
  }*/

.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
.liens a {
    color: rgb(0, 82, 44) !important;
    font-weight: 600;
    cursor: pointer;
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
  cursor:pointer;
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
    color:#fff;
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

#vs6__combobox {
  border: red solid 5px !important;
  height: 20px !important;
  display: none !important;
}

.sigif-select{
  width: 99%;
  font-size:1rem; 
  border-radius:0.25rem; 
  height: calc(0.8em + .500rem + 2px) !important;
}


</style>
