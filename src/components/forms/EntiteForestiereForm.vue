<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <div>
            <b-form>
                <b-row>
                 <b-col>
                    <label class="font-weight-normal"><span style="color: red">*</span> Type d'entité forestière </label>
                    <v-select label="libelle" :options="typesEntite" v-model="entiteforrestiere.typeentite" :reduce="entite => entite.value"  @input="setformNext" class="font-weight-bold  custom-select-type_titre"></v-select>
                 </b-col>
                </b-row>
                 <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                    <div v-if="entiteforrestiere.typeentite!=''">
                      <b-card class="mt-3" header-tag="header" footer-tag="footer">
                        <template #header>
                          <!--<h3 class="mb-0 d-flex justify-content-center">IDENTIFIANT SOCIETE</h3>-->
                          <h3 class="mb-0 d-flex justify-content-center text-uppercase">éléments spécifiques</h3>
                        </template>
                          <b-row>
                            <b-col cols="4">
                              <b-form-group v-if="entiteforrestiere.typeentite=='MF'">
                                <label class="p-0 m-0 font-weight-50 font-weight-normal"><span style="color: red">*</span>Type d'entité MINFOF</label>
                                <v-select label="libelle" :options="typesEntitesMinfof" v-model="entiteforrestiere.typeentiteminfof" :reduce="typeentiteforrestiere => typeentiteforrestiere.value" class="font-weight-bold  custom-select-type_titre"></v-select>
                              </b-form-group>
                              <b-form-group v-if="entiteforrestiere.typeentite=='FC'">
                                    <label class="p-0 m-0 font-weight-50 font-weight-normal"><span style="color: red">*</span>Type d'entité juridique</label>
                                    <v-select label="libelle" :options="typesEntitesJuridique" v-model="entiteforrestiere.typeentitejuridique" :reduce="typeentite => typeentite.libelle" class="font-weight-bold  custom-select-type_titre"></v-select>
                              </b-form-group>
                              <b-form-group v-if="entiteforrestiere.typeentite=='CC'">
                                <label class="font-weight-normal">Attacher du document </label><br>
                                <b-form-file id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file>
                              </b-form-group>
                            </b-col>
                            <b-col cols="4">
                              <b-form-group>
                                  <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Code d'enregistrement</label>
                                  <b-form-input v-model="entiteforrestiere.codeenregistrement" name="code" size="sm" class="w-75 p-0 m-0 font-weight-300" placeholder="code d'enregistrement"  v-validate="{ required: true, min: 4 }" :state="validateState('code')"/>
                                  <b-form-invalid-feedback id="code">{{ veeErrors.first('code') }}</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                            <b-col cols="4">
                              <b-form-group  v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='CC'||entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                                <label class="p-0 m-0 font-weight-normal">Date du document</label><br>
                                <calendar   v-model="entiteforrestiere.datedonument" :format="format" :clear-button="clear" :placeholder="placeholderdatecertificat" :pane="1"></calendar>
                              </b-form-group>
                              <b-form-group v-if="entiteforrestiere.typeentite=='MF'">
                                <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Nom de l'entité</label>
                                <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="w-75 p-0 m-0" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                                <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                              </b-form-group>
                            </b-col>
                          </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='CC'||entiteforrestiere.typeentite=='IN'">
                          <label v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='IN'" class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Nom de l'entité</label>
                          <label v-if="entiteforrestiere.typeentite=='CC'" class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Nom de la commune</label>
                          <b-form-input v-model="entiteforrestiere.intitule" name="namementite" size="sm" class="w-75 p-0 m-0" placeholder=""  v-validate="{ required: true, }" :state="validateState('namementite')"/>
                          <b-form-invalid-feedback id="code">{{ veeErrors.first('namementite') }}</b-form-invalid-feedback>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='CC'||entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                        <label class="p-0 m-0 font-weight-normal">Marteau/sigle</label>
                        <b-form-input name="marteausigle" v-model="entiteforrestiere.sigle" size="sm" class="w-75 p-0 m-0" placeholder=""/>    
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group  v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='CC'||entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                        <label class="p-0 m-0 font-weight-normal">Numéro du document</label>
                        <b-form-input name="numerodoc" size="sm" class="w-75 p-0 m-0" placeholder="" v-model="entiteforrestiere.numdocument"/>
                        <b-form-invalid-feedback id="numerodoc">{{ veeErrors.first('numerodoc') }}</b-form-invalid-feedback>
                    </b-form-group>
                   </b-col>
                   
                   </b-row>
                   <!--specification communauté -->
                   <div v-if="entiteforrestiere.typeentite=='FC'">
                    <b-row>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Numéro de certificat d'enregistrement</label>
                          <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="entiteforrestiere.numcertificat"/>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Date du certificat d'enregistrement</label><br>
                          <calendar v-model="entiteforrestiere.datecertificat" :format="format" :clear-button="clear" :placeholder="placeholderdatecertificat" :pane="1"></calendar>
                        </b-form-group>
                      </b-col>
                      
                   </b-row>
                   <b-row>
                    <b-col cols="4">
                      <b-form-group  v-if="entiteforrestiere.typeentite=='FC'||entiteforrestiere.typeentite=='CC'||entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                        <label class="font-weight-normal">Attacher du document </label><br>
                        <b-form-file id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file>
                      </b-form-group>
                  </b-col>
                    <b-col cols="4">
                      <label class="font-weight-normal">Certificat d'enregistrement </label><br>
                      <b-form-group><b-form-file id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file></b-form-group>
                    </b-col>
                    <b-col cols="4">
                      <label class="font-weight-normal">Attaché document portant création de l'entité </label><br>
                      <b-form-group><b-form-file id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file></b-form-group>
                    </b-col>
                   </b-row>
                   </div>
                   
                   <!--specification communne -->
                   <b-row v-if="entiteforrestiere.typeentite=='CC'">
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal">Numéro du decret de classement</label>
                        <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="entiteforrestiere.numdecretclassement"/>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal">Date du decret de classement</label>
                        <calendar class="setwidth"  v-model="entiteforrestiere.datedecretclassement" :format="format" :clear-button="clear" :placeholder="placeholderdatecertificat" :pane="1"></calendar>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <label class="p-0 m-0 font-weight-normal">Attaché decret de classement</label>
                      <b-form-group><b-form-file v-model="entiteforrestiere.atacherdecretclassement" id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file></b-form-group>
                    </b-col>
                 </b-row>
                <!--Début specification operateur forrestier -->
                 <div v-if="entiteforrestiere.typeentite=='ON'||entiteforrestiere.typeentite=='IN'">
                    <b-row>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Numéro du registre de commerce</label>
                          <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="entiteforrestiere.numregcommerce"/>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Date du registre de commerce</label>
                          <calendar class="setwidth"  v-model="entiteforrestiere.dateregcommerce" :format="format" :clear-button="clear" :placeholder="placeholderdatecertificat" :pane="1"></calendar>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group><b-form-file v-model="entiteforrestiere.attacherregcommerce" id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file></b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Numéro de Contribuable</label>
                          <b-form-input size="sm" class="w-75 p-0 m-0" placeholder="" v-model="entiteforrestiere.numcontribuable"/>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                          <label class="p-0 m-0 font-weight-normal">Date de Contribuable</label>
                          <calendar class="setwidth"  v-model="entiteforrestiere.datecontribuable" :format="format" :clear-button="clear" :placeholder="placeholderdatecertificat" :pane="1"></calendar>
                        </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group><b-form-file v-model="entiteforrestiere.attachercontribuable" id="file-small" size="sm" class="w-75" placeholder="aucun fichier choisi"></b-form-file></b-form-group>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-form-group class="pl-1 mt-1"><b-form-checkbox v-model="entiteforrestiere.personnephysique">{{ entiteforrestiere.personnephysique ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                      </b-col>
                      <b-col>
                        <b-form-group class="pl-1 mt-1"><b-form-checkbox v-model="entiteforrestiere.societeexploitation">{{ entiteforrestiere.societeexploitation ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                      </b-col>
                      <b-col>
                        <b-form-group class="pl-1 mt-1"><b-form-checkbox v-model="entiteforrestiere.societeinventaire">{{ entiteforrestiere.societeinventaire ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                      </b-col>
                      <b-col>
                        <b-form-group class="pl-1 mt-1"><b-form-checkbox v-model="entiteforrestiere.societesylviculture">{{ entiteforrestiere.societesylviculture ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                      </b-col>
                      <b-col>
                        <b-form-group class="pl-1 mt-1"><b-form-checkbox v-model="entiteforrestiere.societetransformation">{{ entiteforrestiere.societetransformation ?  'n\'est pas une personne physique'  : 'est une personne physique'}}</b-form-checkbox></b-form-group>   
                      </b-col>
                    </b-row>
                 </div>
                <!--fin specification operateur forrestier -->

         

                </b-card>
                <b-card  header-tag="header" footer-tag="footer">
                  <template #header>
                    <h3 class="mb-0 d-flex justify-content-center">COORDONNEES</h3>
                  </template>  
                  <b-row>
                      <b-col>
                          <b-form-group>
                              <div>
                                  <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Région</label><br>
                                  <select v-model="form.idregion" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                      <option v-for="region in regions" :key="region.idregion" :value="region.idregion"> {{ region.intitule }}</option>
                                  </select>
                              </div>
                              <b-form-invalid-feedback id="region">{{ veeErrors.first('region') }}</b-form-invalid-feedback>
                          </b-form-group> 
                      </b-col>
                      <b-col>
                        <b-form-group>
                            <div>
                              <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Département</label><br>
                              <select :disabled="disableDep" v-model="form.iddepartement" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                  <option v-for="departement in _departements" :key="departement.iddepartement" :value="departement.iddepartement"> {{ departement.intitule }}</option>
                              </select>
                              </div>
                              <b-form-invalid-feedback id="departement">{{ veeErrors.first('departement') }}</b-form-invalid-feedback>
                          </b-form-group>
                      </b-col>
                      <b-col>
                        <b-form-group>
                            <div>
                              <label for="" class="m-0 p-0 font-weight-normal" style="font-weight-bold"><span style="color: red">*</span>Arrondissement</label><br>
                              <select :disabled="disableArrond" v-model="entiteforrestiere.idarrondissement" class="m-0 p-0"  style="width: 75%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                <option v-for="arrondissement in _arrondissements" :key="arrondissement.idarrondissement" :value="arrondissement.idarrondissement"> {{ arrondissement.intitule }}</option>
                              </select>
                            </div>
                              <b-form-invalid-feedback id="arrondissement">{{ veeErrors.first('arrondissement') }}</b-form-invalid-feedback>
                        </b-form-group>
                      </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span> Email </label>
                        <b-form-input class="p-0 m-0"  size="sm" v-model="entiteforrestiere.email" placeholder="ex: devpro.12@gmail.com" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                        <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Téléphone</label>
                        <b-form-input size="sm" class="m-0" type="tel" placeholder="ex: 693120201" v-model="entiteforrestiere.telephone"  v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                        <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Adresse</label>
                        <b-form-input name="adresse" size="sm" class="m-0" placeholder="adresse" v-model="entiteforrestiere.adresse"  v-validate="{ required: true, min: 3 }" :state="validateState('adresse')"/>
                        <b-form-invalid-feedback id="adresse">{{ veeErrors.first('adresse') }}</b-form-invalid-feedback>
                    </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Nom du responsable</label>
                        <b-form-input  name="nom"  size="sm" class="m-0" placeholder="nom du responsable" v-model="entiteforrestiere.responsable"  v-validate="{ required: true, min: 3 }" :state="validateState('nom')"/>
                        <b-form-invalid-feedback id="nom">{{ veeErrors.first('nom') }}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Téléphone du responsable</label>
                        <b-form-input name="telephone" size="sm" class="p-0 m-0" type="tel" placeholder="telephone" v-model="entiteforrestiere.telresponsable" v-validate="{ required: true, min: 9 }" :state="validateState('telephone')"/>
                        <b-form-invalid-feedback id="telephone">{{ veeErrors.first('telephone') }}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                    <b-col>
                      <b-form-group>
                        <label class="p-0 m-0 font-weight-normal"><span style="color: red">*</span>Email du responsable</label>
                        <b-form-input  class="m-0"  size="sm" v-model="entiteforrestiere.emailresponsable" placeholder="ex: devpro.12@gmail.com" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                        <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                      </b-form-group>
                    </b-col>
                  </b-row>      
                </b-card>
              </div>
            </transition>
            <hr>
            <b-button  class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" @click.prevent="addEntite" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
            <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submittedcontinue" @click.prevent="addEntiteAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submittedcontinue" small></b-spinner></b-button>
            <error-dialogue ref="errorDialogue"></error-dialogue>
          </b-form>
        </div>
    </b-overlay>
</template>

<script>
  import ErrorDialogue from '@/components/utils/AlertBox.vue';
const php = require('phpjs');
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";

export default {
    components:{
      ErrorDialogue
    },
    props: {
      action: {type: String, default: 'add'},
      title: {type: String, default: 'ajout d\'une entite'},
      editEntite: {type: Object, default: null}
    },
    computed: { 
      ...mapGetters(['user']),

        _departements() {
            return this.departements.filter(elt => elt.region.idregion == this.form.idregion)
        },
        _arrondissements() {
            return this.arrondissements.filter(elt => elt.departement.iddepartement == this.form.iddepartement)
        },
    },
    watch: {
      "form.idregion"(value) {
        if(value!==null&&value.length!==''){
            this.disableDep= false
        }
        else{
            this.disableDep= true
        }
     },
     "form.iddepartement"(value) {
        if(value!==null&&value.length!==''){
            this.disableArrond= false
        }
        else{
            this.disableArrond= true
        }
     },
   
    },

    data: () => ({
      typesEntite:[
          {libelle: "communauté",value:"FC"},{libelle: "commune",value:"CC"},
          {libelle: "Opérateur forestier",value:"ON"},{libelle: "MINFOF","value":"MF"},
          {libelle: "Autres ","value":"IN"},{libelle: "certification privée",value:"CF"},{libelle: "Particulier",value:"PA"}],
      typesEntitesJuridique:[{libelle: "GIE"},{libelle: "Association"},{libelle: "GIC"},{libelle: "Coopérative"},{libelle: "Autres"}],
      typesEntitesMinfof:[
        {libelle: "Délégation Régionale",value: "DREG"},
        {libelle: "Délégation départementale",value: "DDEP"},
        {libelle: "Poste Forrestier",value: "PFOR"},
        {libelle: "Poste Frontière",value: "PFRO"},
        {libelle: "Checkpoint"},{value: "CPT"},
        {libelle: "Port"},{value: "PORT"}
      ],
      arrondissements: [],
      departements: [], 
      regions: [],
      isActive:false,
      showOverlay:false,
      submitted:false,
      submittedcontinue:false,
        form: {
          typeentite: null,
          idregion: null,
          iddepartement: null, 
        },
        disableDep:true,
        disableArrond:true,

        format:"yyyy-MM-dd",
        clear:true,
        placeholderdatedocument:"date du document",
        placeholderdatecertificat:"date du certificat",
        entiteforrestiere: {
            adresse: "",
            atacherdocument: "",
            codeenregistrement: "",
            datecertificat: "",
            datedonument: "",
            documentcreation: "",
            email: "",
            emailresponsable: "",
            idarrondissement:"",
            intitule: "",
            numcertificat: "",
            numdocument: "",
            responsable: "",
            sigle: "",
            statut: false,
            telephone: "",
            telresponsable: "",
            typeentite: "",
            typeentitejuridique: "",
            
            numdecretclassement:"",
            datedecretclassement:"",
            atacherdecretclassement:"",
            numregcommerce:"",
            dateregcommerce:"",
            attacherregcommerce:"",
            numcontribuable:"",
            datecontribuable:"",
            attachercontribuable:"",
            personnephysique:false,
            societeexploitation: false, // boolean, non obligatoire
            societeinventaire: false, // boolean, non obligatoire
            societesylviculture: false, // boolean, non obligatoire
            societetransformation: false,

            typeentiteminfof:""
        },

        
        typesTitreSelected:false,
        CodeEnregistrement:{},
        grumeSelected:false,
        colisSelected:false,
        grumesAbbattageSelected:false,
        
        typesTitre:[ {"libelle" :"concession forrestière en convention provisoire","value":11},
                     {"libelle" :"concession forrestière en convention définitive","value":12},
                     {"libelle" :"foret communale","value":13},{"libelle" :"foret communautaire en convention provisoire","value":14},
                     {"libelle" :"foret communautaire en convention définitive","value":15},{"libelle" :"vente de coupe","value":16}],
      
       
        requiredTypeTitre:true,
        requiredCodeEnregistrement:true,
        requiredSite:true,
        requiredPermis:true,
        setTitre:false,
         titres:[
           {"libelle" :"2012","value":"2012"},{"libelle" :"41254","value":"41254"},{"libelle" :"012454","value":"012454"},
           {"libelle" :"1014254","value":"1014254"},{"libelle" :"1014255","value":"1014255"},{"libelle" :"01254","value":"01254"}
        ],

        
    }),
    methods: {
      setformNext(){

      },
       async errorHappened() {
            const ok = await this.$refs.errorDialogue.show({
               title: 'Erreur survenue',
               message: 'Une erreur est survenue lors de l\'opération',
               okButton: 'Quitter',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.errorDialogue._close();
                this.$emit('closeForm')
            } else {
               this.$refs.errorDialogue._close();
               this.resetForm()
            }
        },
        setUserStatut(statut){
            if(statut){
                this.newuser.statut=1
            }else{this.newuser.statut=0}
        },
        validateState(ref) {
          if (
              this.veeFields[ref] &&
              (this.veeFields[ref].dirty || this.veeFields[ref].validated)
          ) 
          { return !this.veeErrors.has(ref);}
              return null;
        },
        


        triggerSetTitre(){this.setTitre=true},
        validateState(ref) {
        if (
            this.veeFields[ref] &&
            (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) 
        { return !this.veeErrors.has(ref);}
            return null;
        },
        resetForm() {
            this.modal = {
               idarrondissement: null,
              intitule: null, email: "", telephone: "", responsable: "", telresponsable: "", emailresponsable: "", adresse: "",
              statut: false, documentcreation: "", typeentite: "", codeenregistrement: "",
              typeentitejuridique: "", sigle: "", numdocument: "", datedonument: "", atacherdocument: "", numcertificat: "",
              datecertificat: "",
              idarrondissement: ""
            };

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        async addEntiteAndContinue(){
          this.$validator.validateAll().then(result => {if (!result) {return;}
              this.entiteforrestiere.statut=this.isActive
              console.log('données envoyées ',this.entiteforrestiere);
              this.submittedcontinue = true
              if(this.action=="add"){
                  this.$donneesReference.post('entites', this.entiteforrestiere).then(response => {
                    this.submittedcontinue = false 
                      this.$emit('entiteAddedAndContinue')
                      this.resetForm()
                      return App.notifySuccess(response.data.message)
                  }).catch(error => {
                      this.submittedcontinue = false
                      if(error.response.data.status==500){
                      return this.doDelete()
                      }
                  })
              }
              /* if(this.action="edit"){
                  this.submitted = false
                  this.$donneesReference.put('essences/'+this.editEssence.idEssence, this.essence).then(response => {
                      this.submitted = false 
                      this.$emit('essenceEdited')
                      this.resetForm()
                      return App.notifySuccess(response.data.message)
                  }).catch(error => {
                      this.submitted = false
                      return App.alertError(error.message)
                  })
              }*/

          });
        },
        async addEntite() {
            this.$validator.validateAll().then(result => {if (!result) {return;}

                this.entiteforrestiere.statut=this.isActive
               
                this.submitted = true
                if(this.action=="add"){
                  console.log('données envoyées add',this.entiteforrestiere);
                    this.$donneesReference.post('entites', this.entiteforrestiere).then(response => {
                       this.submitted = false 
                        this.$emit('entiteAdded')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        if(error.response.data.status==500){
                        return this.doDelete()
                        }
                    })
                }
               /* if(this.action="edit"){
                    this.submitted = false
                    this.$donneesReference.put('essences/'+this.editEssence.idEssence, this.essence).then(response => {
                        this.submitted = false 
                        this.$emit('essenceEdited')
                        this.resetForm()
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        return App.alertError(error.message)
                    })
                }*/
                
            });
    },
        getLocalites() {
            this.$donneesReference.get("arrondissements?size=400").then(response => response.data).then(response => {
                this.arrondissements = response.result.items
                
                for (const dep of this.arrondissements.map(elt => elt.departement)) {
                    if (!this.departements.map(elt => elt.iddepartement).includes(dep.iddepartement)) {
                        this.departements.push(dep)
                    }
                }
                for (const reg of this.departements.map(elt => elt.region)) {
                    if (!this.regions.map(elt => elt.idregion).includes(reg.idregion)) {
                        this.regions.push(reg)
                    }
                }

                this.regions = this.regions.sort((a, b) => a.intitule > b.intitule ? 1 : -1)
            })
        },
    },
     mounted(){
        this.getLocalites()
    }
}
</script>
<style scoped>
  .setwidth{
    width: 100%;
  }
  .custom-select-type_titre{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
      --vs-selected-color: #1f1c1c;
          /* Font */
      --vs-font-size: 0.68rem;
      --vs-line-height: 1.5;
}

</style>
<style>
.custom-bg {
  background-color: rgb(0, 82, 44) !important;
}
</style>