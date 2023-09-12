<template>
  <!-- <b-overlay :show="showOverlay" rounded="sm"> -->
    <div>
      <b-overlay rounded="sm" :show="showOverlay">
        <b-form >
          <div class="container">
            <!--DEBUT ENTITE FORRESTIERE-->
            <div class="row">
              <b-col cols="2" class="align-self-start"></b-col>
              <div class="col align-self-center">
                <b-row>
                  <b-col cols="3"><label for="" style="font-weight:300"> Entité </label></b-col>
                  <b-col cols="9">
                    <select class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 99%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option selected="selected">{{ entite.libelle }}</option>
                    </select>
                  </b-col>
              </b-row>
              </div>
              <b-col cols="2" class=" align-self-end"></b-col>
            </div>
            <!--FIN ENTITE FORRESTIERE-->
            <!--DEBUT TYPE DE TITRE-->
              <div class="row">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label for="" style="font-weight:300"><span style="color: red">*</span> Type de Titre </label></b-col>
                    <b-col cols="9">
                      <select @change="loadTitres" v-model="demandePermis.typetitre" class="m-0 p-0 permis-form-select" style="width:99%">
                        <option v-for="(typetitre, i) in typesTitres " :key="i" :value="typetitre.code">{{ typetitre.libeletypetitre }}</option>
                      </select>
                    </b-col>
                </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
            <!--FIN TYPE DE TITRE-->
          </div>
          <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
            <div class="mt-2" v-if="typetitreSet">
              <div class="row">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label for="" style="font-weight:300">Type de permis</label></b-col>
                    <b-col cols="9">
                      <input class="permis-form-control-disable w-75" v-model="demandePermis.typepermis" size="sm" disabled/>
                    </b-col>
                </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label for="" style="font-weight:300"><span style="color: red">*</span>Exercice Fiscal</label></b-col>
                    <b-col cols="9">
                      <input class="permis-form-control-disable w-50" v-model="demandePermis.exercice" size="sm" disabled/>
                    </b-col>
                </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'||demandePermis.typetitre=='FC'">
                <b-col cols="1" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="4">
                      <label for="" style="font-weight:300" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'"><span style="color: red">*</span>Concession forestière n°</label>
                      <label for="" style="font-weight:300" v-if="demandePermis.typetitre=='FC'"><span style="color: red">*</span>forêt communale n°</label>
                    </b-col>
                    <b-col cols="8">
                      <select @change="loadNumUfas" v-model="demandePermis.numtitre" class="m-0 p-0 permis-form-select" style="width:50%">
                        <option v-for="(titre, i) in titres " :key="i" :value="titre">{{ titre.numtitre }}</option>
                      </select>
                    </b-col>
                </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <!--CAS SPECIFIQUE VENTE DE COUPE-->
                <div class="row" v-if="demandePermis.typetitre=='VC'">
                  <b-col cols="1" class="align-self-start"></b-col>
                  <div class="col align-self-center">
                    <b-row>
                      <b-col cols="4">
                        <label for="" style="font-weight:300" ><span style="color: red">*</span>Vente de coupe n°</label>
                      </b-col>
                      <b-col cols="8">
                        <select v-model="demandePermis.idtitre" class="m-0 p-0 permis-form-select" style="width:50%">
                          <option v-for="(titre, i) in titres " :key="i" :value="titre.idtitre">{{ titre.numtitre }}</option>
                        </select>
                      </b-col>
                  </b-row>
                  </div>
                  <b-col cols="2" class=" align-self-end"></b-col>
                </div>
              <div class="row" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span>UFA N°</label></b-col>
                    <b-col cols="9">
                      <select @change="loadNumUfes" class="m-0 p-0 permis-form-select" style="width:25%">
                        <option v-for="(numufa, i) in titresUfa " :key="i" :value="numufa">{{ numufa }}</option>
                      </select>
                    </b-col>
                  </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'||demandePermis.typetitre=='FC'">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span>UFE N°</label></b-col>
                    <b-col cols="9">
                      <select @change="loadNumAacs" class="m-0 p-0 permis-form-select" style="width:25%">
                        <option v-for="(numufe, i) in titresUfes " :key="i" :value="numufe">{{ numufe }}</option>
                      </select>
                    </b-col>
                  </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'||demandePermis.typetitre=='FC'">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span>Assiète N°</label></b-col>
                    <b-col cols="9">
                      <select  class="m-0 p-0 permis-form-select" v-model="demandePermis.idaac" style="width:25%">
                        <option v-for="(aac, i) in titresAac " :key="i" :value="aac.idaac">{{ aac.numaac }}</option>
                      </select>
                    </b-col>
                  </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row">
                <b-col cols="1" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="4"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Traitement sylvicole </label></b-col>
                    <b-col cols="8">
                      <v-select :options="paginatedTraitements" v-model="demandePermis.traitementsylvicole" :filterable="false" @search="onSearch" label="libeletravsyl" :reduce="(soustraitant) => soustraitant.idtravsyl" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageTraitements" @click="offsetTraitements -= limitTraitements">Prèc.</button>
                            <button :disabled="!hasNextPageTraitements" @click="offsetTraitements += limitTraitements">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row">
                <b-col cols="2" class="align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="3"><label class="d-flex justify-content-end" style="font-weight:300"> Sous Traitant </label></b-col>
                    <b-col cols="9">
                      <v-select :options="paginated" v-model="demandePermis.soustraitant" :filterable="false" @search="onSearch" label="raisonsociale" :reduce="(entite) => entite.idorganisation" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                            <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                        </li>
                      </v-select>
                    </b-col>
                  </b-row>
                </div>
                <b-col cols="2" class=" align-self-end"></b-col>
              </div>
              <div class="row mt-1" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Lettre d'approbation du contrat de sous traitance </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFilelettreapprobcontsoutraitan }">
                        <label>
                          <input type="file" @change="selectFileLettreAprobationContratSoustraitance"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="lettreapprobationcontratsoustraitance" class="file-name">{{ lettreapprobationcontratsoustraitance.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span> 
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>  
              <div class="row mt-1">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Attestation des mesures de superficie </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileAttestationmesure }">
                        <label>
                          <input type="file" @change="selectFileAttestationmesure"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="attestationmesure" class="file-name">{{ attestationmesure.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span> 
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>

              <div v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'||demandePermis.typetitre=='VC'" class="row mt-1">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Attestation de dépot de cautionnement </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileCautionnement }">
                        <label>
                          <input type="file" @change="selectFileAttestationcaution"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="attestationcaution" class="file-name">{{ attestationcaution.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="row mt-1">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Attestation de respect des obligations fiscales </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileAttestationobligation }">
                        <label>
                          <input type="file" @change="selectFileAttestationobligation"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="attestationobligation" class="file-name">{{ attestationobligation.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="row mt-1">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Carte des inventaires </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileCarteinventaire }">
                        <label>
                          <input type="file" @change="selectFileCarteinventaire"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="carteinventaire" class="file-name">{{ carteinventaire.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="row mt-1" v-if="demandePermis.typetitre=='CP'||demandePermis.typetitre=='CD'">
                <b-col cols="1" class=" align-self-start"></b-col>
                <div class="col align-self-center">
                  <b-row>
                    <b-col cols="6"><label class="d-flex justify-content-end" style="font-weight:300"><span style="color: red">*</span> Contrat de sous traitance </label></b-col>
                    <b-col cols="6">
                      <div class="upload-container" :class="{'border-danger-date': notsetFileContratSoustraitance }">
                        <label>
                          <input type="file" @change="selectFileContratSoustraitance"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          <span v-if="contratsoustraitance" class="file-name">{{ contratsoustraitance.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span> 
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>  
          </div>
          </transition>
          <hr/>
              <b-button v-b-tooltip.hover.top="'Enregistrer votre occurence'" type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; "   @click.prevent="addDemandePermis">Enregistrer <b-spinner v-if="submitted" small> </b-spinner></b-button>
              <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " disabled @click.prevent="addDemandePermisAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>
        </b-form>
      </b-overlay>
      <serveur-error-box ref="errorDialogue"></serveur-error-box>
      <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>

    </div>
  <!-- </b-overlay> -->
</template>

<script>
  const php = require("phpjs");
  import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

  import { mapGetters } from "vuex";
  import Vue from "vue";
  import VeeValidate from "vee-validate";
  Vue.use(VeeValidate);
export default {
  components: {
    ServeurErrorBox,
    CodeBarreInfo
  },
  props: {
    action: {type: String, default: 'add'},
    editDemandePemis: {type: Object, default: null}
  },
  data: () => ({
    typespermis:[
      {key: 'PAO', libelle: 'Permis annuel d\'opération',equi:'CP' },
      {key: 'CAC', libelle: 'Certificat d\'assiette annuelle de coupe', equi:'CD' },
      {key: 'PAO', libelle: 'Permis annuel d\'opération',equi:'FC' },
      {key: 'CVC', libelle: 'Certificat de vente de coupe',equi:'VC' },
      {key: 'PAO', libelle: 'Permis annuel d\'opération',equi:'FCP' },
      {key: 'CAE', libelle: 'Certificat annuel d\'exploitation',equi:'FCD' },
      {key: 'PEPS', libelle: 'Permis d\'exploitation des produits forestiers spéciaux',equi:'PSE' },
      {key: 'PEBO', libelle: 'Permis d\'exploitation des Bois d\'oeuvre',equi:'PEBO' },
      {key: 'PRB', libelle: 'Permis de récupération de bois',equi:'ARB' },
      {key: 'AP', libelle: 'Autorisation personnelle',equi:'APC' }
    ],
    titres: [],
    showOverlay:false,
    typetitreSet:false,//controle affichage progressif du formulaire
    numtitres:[],
    titresUfa: [],
    titresUfes:[],
    titresAac:[],
    demandePermis: {
      typetitre: "",
      idtitre:"",
      typepermis:"",
	    exercice: "", // string
	    traitementsylvicole: "", // int (l'id du traitement sylvicole)
      soustraitant: "", // int (l'id de l'organisation sous traitante)
      idtitre:"",//// int (l'id du titre de type VC)
      attestationmesure: "", // attestation des mesures de supperficie
	    carteinventaire: "", // carte des inventaires
      attestationobligation: "", // attestation de respect des obligations fiscales
      attestationcaution: "", // attestation de dépôt de cautionnement / Quittance paiement RFA	
    },
    attestationmesure: null,
    lettreapprobationcontratsoustraitance:null,
    contratsoustraitance:null, 
    carteinventaire: "", 
    attestationobligation: "",
    attestationcaution: "",
    entite:{
      id:1,
      libelle:''
    },
   
    typesTitres:[],
    entiteswithoutminfof: [],
    traitements:[],
    soustraitants:[],
    exercices:[],
    titres:[],
    submitted:false,
    submitted2:false,
    searchentite:"",
    offsetentite: 0,
    limitentite: 10,
    offsetTraitements: 0,
    limitTraitements: 10,
    typetitreSet:false,
 
    requiredtypeTitre: true,
    requiredSite: true,
    requiredPermis: true,
    setTitre: false,
    notsetFileAttestationmesure:false,
    notsetFileCautionnement:false,
    notsetFileAttestationobligation:false,
    notsetFileCarteinventaire:false,
    notsetFilelettreapprobcontsoutraitan:false,
    notsetFileContratSoustraitance:false,
  }),
  computed: {
    ...mapGetters(["user"]),

    filteredTraitements() {
      return this.traitements
      return this.entites.filter((entite) =>
      entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
      )
    },
    paginatedTraitements() {
      return this.filteredTraitements.slice(this.offsetTraitements, this.limitTraitements + this.offsetTraitements)
    },
    hasNextPageTraitements() {
      const nextOffset = this.offsetTraitements + this.limitTraitements
      return Boolean(
        this.filteredTraitements.slice(nextOffset, this.limitTraitements + nextOffset).length
      )
    },
    hasPrevPageTraitements() {   
      const prevOffset = this.offsetTraitements - this.limitTraitements
      return Boolean(
        this.filteredTraitements.slice(prevOffset, this.limitTraitements + prevOffset).length
      )
    },

    filtered() {
      return this.entiteswithoutminfof.filter((entite) =>
      entite.raisonsociale.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
      )
    },
    paginated() {
      return this.filtered.slice(this.offsetentite, this.limitentite + this.offsetentite)
    },
    hasNextPage() {
      const nextOffset = this.offsetentite + this.limitentite
      return Boolean(
        this.filtered.slice(nextOffset, this.limitentite + nextOffset).length
      )
    },
    hasPrevPage() {   
      const prevOffset = this.offsetentite - this.limitentite
      return Boolean(
        this.filtered.slice(prevOffset, this.limitentite + prevOffset).length
      )
    },
  },
  methods: {
    loadNumUfas(){
      this.titresUfa=this.demandePermis.numtitre.numufa
      this.titresUfes=this.demandePermis.numtitre.numufe
      this.titresAac=this.demandePermis.numtitre.titreaac
      this.demandePermis.idtitre=this.demandePermis.numtitre.idtitre
    },
    loadNumUfes(){
      this.titresUfes=this.demandePermis.numtitre.numufe
      //this.titresAac=this.demandePermis.numtitre.numaac
    },
    loadNumAacs(){
      //this.titresAac=this.demandePermis.numtitre.numaac
    },
     async loadTitres(){
      let exact = 2000 + new Date().getYear() - 100;
      this.demandePermis.exercice=exact
      this.showOverlay=true;
      this.setTypePermisAndTitres();
      this.typetitreSet=true
      this.titres= await this.$titres.get("titres/list_titre_idaac_approuver/"+this.demandePermis.typetitre).then(response => response.data.result.code || [])
      this.showOverlay=false;
      if(php.empty(this.titres)){
        const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: 'aucun titre trouvé',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
          } else {
            this.$refs.codebarreinfo._close();
          }
      }
    },
    //méthode de chargement des autres données lorsqu'un type de titre
    loadOtherData(){
      this.setTypePermisCorrespondent()
      this.typetitreSet=true
    },
    
  async selectFileAttestationmesure(e){
    const fileattes = this.attestationmesure =  e.target.files[0];
    this.demandePermis.attestationmesure =await this.getBase64(fileattes)
  },
  async selectFileCarteinventaire(e){
    const carteinventaire = this.carteinventaire =  e.target.files[0];
    this.demandePermis.carteinventaire =await this.getBase64(carteinventaire)
  },
  async selectFileAttestationobligation(e){
    const attestationobligation = this.attestationobligation =  e.target.files[0];
    this.demandePermis.attestationobligation =await this.getBase64(attestationobligation)
  },
  async selectFileAttestationcaution(e){
    const attestationcaution = this.attestationcaution =  e.target.files[0];
    this.demandePermis.attestationcaution=await this.getBase64(attestationcaution)
  },
  async selectFileLettreAprobationContratSoustraitance(e){
    const lettreapprobationcontratsoustraitance = this.lettreapprobationcontratsoustraitance =  e.target.files[0];
    this.demandePermis.lettreapprobcontsoutraitan=await this.getBase64(lettreapprobationcontratsoustraitance)
  },
  async selectFileContratSoustraitance(e){
    const contratsoustraitance = this.contratsoustraitance =  e.target.files[0];
    this.demandePermis.contratsoutraitant=await this.getBase64(contratsoustraitance)
  },
  getBase64(file){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
  },
  triggerSetTitre() {
      this.setTitre = true;
  },
  validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
  },
  resetForm() {
    this.demandePermis = {
      typetitre: null,
      exercice: null,
      traitementsylvicole: null,
      idtitre: null,
      soustraitant: null,
      attestationmesure: null,
      carteinventaire: null,
      attestationobligation: null,
      attestationcaution: null,
    };
  },
  async setTypePermisAndTitres(){
    this.showOverlay= true;
    if(this.demandePermis.typetitre=="CD" ||this.demandePermis.typetitre=="FC"){
      this.demandePermis.typepermis="Permis annuel d'opération"
    }
    if(this.demandePermis.typetitre=="CP"){
      this.demandePermis.typepermis="Certificat d'assiète annuelle"
    }
    if(this.demandePermis.typetitre=="VC"){
      console.log('entrée exécution 3');
      this.demandePermis.typepermis="Certificat de vente de coupe"
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

  async doDelete(error) {
    let message = error.message!=undefined?error.message:'érreur interne du serveur'
    const ok = await this.$refs.errorDialogue.show({
        title: 'Erreur !!!',
        message: message,
    })
  },
  async addDemandePermis() {
      this.submitted = true
      if(this.action=="add"){
        console.log('data',this.demandePermis);
        this.$permis.post('demandes-permis', this.demandePermis).then(response => {
              this.submitted = false 
              this.$emit('demandePermisAdded')
              this.resetForm()
              console.log('respone après ajout', response);
              return App.notifySuccess(response.data.message)
          }).catch(error => {
            this.submitted = false
            console.log('error ',error.response);
            if(error.status==500){
              return this.doDelete()
            }else{
              console.log('error ',error.response.data.message);
              return this.doDelete(error.response.data)

            }
          })
      }
          /*if(this.action="edit"){
              this.submitted = false
              this.$permis.put('demandes-permis/'+this.demandePermis.idDemande, this.demandePermis).then(response => {
                  this.submitted = false 
                  this.$emit('demandePermisEdited')
                  this.resetForm()
                  console.log('respone après edition', response);
                  return App.notifySuccess(response.data.message)
              }).catch(error => {
                  this.submitted = false
                  return App.alertError(error.message)
              })
          } */           
  },
  async addDemandePermisAndContinue() {
          this.submitted = true
              console.log('data',this.demandePermis);
          if(this.action=="add"){
            this.$permis.post('demandes-permis', this.demandePermis).then(response => {
                  this.submitted = false 
                  this.$emit('demandePermisAddedAndContinue')
                  this.resetForm()
                  console.log('respone après ajout', response);
                  return App.notifySuccess(response.data.message)
              }).catch(error => {
                  this.submitted = false
                  return App.alertError(error.message)
              })
          }
          if(this.action="edit"){
              this.submitted = false
              this.$permis.put('demandes-permis/'+this.demandePermis.idDemande, this.demandePermis).then(response => {
                  this.submitted = false 
                  this.$emit('demandePermisEdited')
                  this.resetForm()
                  console.log('respone après edition', response);
                  return App.notifySuccess(response.data.message)
              }).catch(error => {
                  this.submitted = false
                  return App.alertError(error.message)
              })
          }
  },
  validateState(ref) {
    if (
      this.veeFields[ref] &&
      (this.veeFields[ref].dirty || this.veeFields[ref].validated)
    ) {
      return !this.veeErrors.has(ref);
    }
    return null;
  },
  async getData() {
    this.showOverlay = true;
    if (
      this.$store.state.traitements !== null &&
      this.$store.state.traitements.length > 0
    ) {
      this.traitements = this.$store.state.traitements;
      console.log('traitements 1',this.traitements);


    } else {
      try {
        this.traitements= await this.$donneesReference.get("traitements-sylvicoles/list_id_libele_trvs").then(response => response.data.result.Items);
        console.log('traitements ',this.traitements);
        this.$store.dispatch('traitements', this.traitements)
      } catch (error) {
        App.notifyError(error.message);
      }
    }
    
    if (this.$store.state.entiteswithoutminfof !== null &&this.$store.state.entiteswithoutminfof.length > 0) {
    
      this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      console.log('entites 1', this.entiteswithoutminfof);
    } else {
      
      try {

        this.entiteswithoutminfof= await this.$donneesReference.get("entites/row").then(response => response.data.result.Items);
      console.log('entites 2', this.entiteswithoutminfof);
        
        this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
      } catch (error) {
        App.notifyError(error.message);
      }
    
    }
    //recupération des types de titre
      try {
        this.typesTitres= await this.$titres.get("titres/list_typetitre_idaac_approuver").then(response => response.data.result.code);
        console.log('typesTitres', this.typesTitres);
      } catch (error) {
        App.notifyError(error.message);
      }
    this.showOverlay = false;
  },

  onSearch(query) {
    this.searchentite = query
    this.offsetentite = 0
  },
    setTypePermisCorrespondent(){
        if(this.demandePermis.typetitre=='CP' || this.demandePermis.typetitre=='FC'||this.demandePermis.typetitre=='FCP' ){
          this.demandePermis.typepermis="Permis annuel d'opération"
        }
        else if(this.demandePermis.typetitre=='CD'){
          this.demandePermis.typepermis="Certificat d'assiette annuelle de coupe"
        }
        else if(this.demandePermis.typetitre=='VC'){
          this.demandePermis.typepermis="Certificat de vente de coupe"
        }
        else if(this.demandePermis.typetitre=='FCD'){
          this.demandePermis.typepermis="Certificat annuel d'exploitation"
        }
        else if(this.demandePermis.typetitre=='PSE'){
          this.demandePermis.typepermis="Permis d\'exploitation des produits forestiers spéciaux"
        }
        else if(this.demandePermis.typetitre=='PEBO'){
          this.demandePermis.typepermis="Permis d\'exploitation des Bois d\'oeuvre"
        }
        else if(this.demandePermis.typetitre=='ARB'){
          this.demandePermis.typepermis="Permis de récupération de bois"
        }
        else if(this.demandePermis.typetitre=='APC'){
          this.demandePermis.typepermis="Autorisation personnelle"
        }
    },
  },
  async mounted() {
    this.entite.libelle = this.user.profil.organisation;
    await this.getData();

    if (this.editDemandePemis!=null) {
            if(this.editTracking.typetitre=="concession forrestière en convention provisoire"){
                this.tracking.typetitre="CP"
            }
            if(this.editTracking.typetitre=="Concession forestière en convention définitive"){
                this.tracking.typetitre="CD"
            }
            if(this.editTracking.typetitre=="foret communale"){
                this.tracking.typetitre="FC"
            }
            if(this.editTracking.typetitre=="foret communautaire en convention provisoire"){
                this.tracking.typetitre="FCP"
            }
            if(this.editTracking.typetitre=="foret communautaire en convention définitive"){
                this.tracking.typetitre="FCD"
            }
            if(this.editTracking.typetitre=="vente de coupe"){
                this.tracking.typetitre="VC"
            }
            this.tracking.typetitre = this.editTracking.typetitre
            this.tracking.numconcession = this.editTracking.numtitre
            this.typetitreSet=true
            this.tracking.exercice = this.editTracking.exercice
    }
    
  }
};
</script>
<style>
.upload-container label input {
  display: none;
}

.permis-form-control-disable {
  height: calc(1em + .500rem + 2px) !important;
  font-size: 1rem !important;
  border: 1px solid White;
  background-image: none;
  font-weight: 400;
  line-height: 1.5;
  color: #6E7587;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
}
.permis-form-select{
  border-style: solid;
  border-width: 1px;
  font-weight: normal;
  color: #333333;
  border-radius: 3px;
  background-color: White;
  border: 1px solid #637A95;
  margin: 1px;
  font-family: 'verdana';
  font-size: 13px;
  border-color: #637A95;
  height: calc(1em + .500rem + 2px) !important;
}
option{
  font-size: 0.9rem;
}

.is-red {
  border: 1px solid red;
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