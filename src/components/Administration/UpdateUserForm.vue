<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <div>
            
                <b-row>
                     <b-col cols="12">
                      <label for="" class="m-0 p-0" style="font-weight:300">Entité forrestière</label>
                      <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="newuser.entite" @search="onSearchEntites"  :reduce="entite => entite.idorganisation" label="intitule" class="custom-select-type_titre">
                        <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                          <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                        </li>
                      </v-select>
                      <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                        <option selected="selected">{{ entite.libelle }}</option>
                      </select>
                    
                     </b-col>
                  </b-row><br>
            <!--<b-form @submit.stop.prevent="addUser">-->
                <b-form>
                <b-row>
                    <b-col>
                        <label><span style="color: red ">*</span> <span>Nom </span> </label>
                        <b-form-input name="nom" id="nom"  size="sm" placeholder="nom" v-model="newuser.nom" v-validate="{ required: true, min: 3 }" :state="validateState('nom')" aria-describedby="nom" data-vv-as="nom"></b-form-input>
                        <b-form-invalid-feedback id="nom">{{ veeErrors.first('nom') }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col>
                        <label><span style="color: red">*</span>  <span>Prenom </span> </label>
                        <b-form-input  size="sm" id="prenom" name="prenom" v-model="newuser.prenom" placeholder="prenom" v-validate="{ required: true}" :state="validateState('prenom')" aria-describedby="prenom" data-vv-as="prenom"></b-form-input>
                        <b-form-invalid-feedback id="prenom">{{ veeErrors.first('prenom') }}</b-form-invalid-feedback>
                    </b-col>
                    
                </b-row>
                <b-col>
                    <label><span style="color: red">*</span> <span>Email</span>  </label>
                    <b-form-input id="email" name="email" size="sm" v-model="newuser.email" placeholder="email" type="email" v-validate="'required|email'" :state="validateState('email')" aria-describedby="email" data-vv-as="email"></b-form-input>
                    <b-form-invalid-feedback id="prenom">{{ veeErrors.first('email') }}</b-form-invalid-feedback>
                </b-col>
                <b-row>
                    <b-col>
                        <label><span style="color: red">*</span> <span >Compte </span> </label>
                        <b-form-input id="login" name="login" size="sm" v-model="newuser.compte" placeholder="login" v-validate="{ required: true, min: 3}" :state="validateState('login')" aria-describedby="login" data-vv-as="login"></b-form-input>
                        <b-form-invalid-feedback id="login">{{ veeErrors.first('login') }}</b-form-invalid-feedback>
                    </b-col>
                   
                    <b-col>
                        <label><span style="color: red">*</span> Langue </label>
                        <b-form-select name="langue" id="langue"  size="sm" v-model="newuser.langue" :options="langues" value-field="value" text-field="libelle" v-validate="{ required: true}" :state="validateState('langue')" aria-describedby="langue" data-vv-as="langue"/>
                        <b-form-invalid-feedback id="langue">{{ veeErrors.first('langue') }}</b-form-invalid-feedback>
                    </b-col>
            
                </b-row>
 
                    <b-row>
                        <b-col>
                            <label><span style="color: red">*</span> type d'utilisateur </label>
                            <v-select name="typeProfil" id="typeProfil" label="libelleTypeProfil"  :options="typesUtilisateurs" :reduce="typeprofil => typeprofil.idTypeProfil" v-model="newuser.typeProfil" :class="!requiredTypeProfil ? 'is-red' : ''"></v-select>
                            <span v-if="!requiredTypeProfil" style="color:red;">vous devez attribuer un type de profil à cet utilisateur</span>
                        </b-col>
                        <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                                <b-col v-if="typeUserSelected" cols="6">
                                    <label><span style="color: red">*</span> Profil </label>
                                    <v-select label="intitule" :options="profilsTypeList" v-model="newuser.idprofil" :reduce="profil => profil.idprofil" :class="!requiredProfil ? 'is-red' : ''"></v-select>
                                    <span v-if="!requiredProfil" style="color:red;">vous devez attribuer un profil à cet utilisateur</span>
                                </b-col>
                        </transition>
                    </b-row>
      

                <b-row>
                    <b-form-group class="pl-1 mt-1"><b-form-checkbox :disabled="submitted" v-model="isActive" @change="setUserStatut">{{ isActive ?  'automatiquement activer cet utilisateur'  : 'ne pas activer l\'utilisateur'}}</b-form-checkbox></b-form-group>   
                </b-row>
                <hr>
                <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="updateUserData" >valider <b-spinner v-if="submitted" small></b-spinner></b-button>
            </b-form>
            <serveur-error-box ref="errorDialogue"></serveur-error-box>

        </div>
    </b-overlay>
</template>

<script>
const php = require('phpjs');
import { mapGetters } from 'vuex'
import Vue from 'vue'
import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
export default {
    props: { usertoUpdate: {type: Object, default: null}, },
    computed: { 
      ...mapGetters(['user']),
    typeUserSelected(){
        if(!php.empty(this.newuser.typeProfil)){
            return true;
        }else{
            return false
        }
    },
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
    },
    components: {
        ServeurErrorBox
    },
    data: () => ({
        entiteswithoutminfof:[],
        offsetEntites:0,
        limitEntites:10,
        entite:{idorganisation:'', libelle:''},
        showOverlay:false,
        submitted: false,
        submitted2: false,
        requiredTypeProfil:true,
        requiredProfil:true,
        profilsTypeList:[],
        isActive:true,
        newuser: {
            nom:'', prenom:'', compte:'', email:'', typeProfil:'',idprofil:'', langue: '',statut:1
        },
        langues:[{"libelle": "Francais","value":"fr"},{"libelle": "Anglais","value":"en"}],
        typesUtilisateurs:[],
        profil:null,
        searchentite:''
        
    }),
    methods: {
        async updateUserData(){
            this.submitted = true
            let data= {
                compte: this.newuser.compte,
                nom: this.newuser.compte,
                prenom: this.newuser.prenom,
                email: this.newuser.email,
                langue: this.newuser.langue,
                typeProfil: this.newuser.typeProfil,
                profil: this.newuser.idprofil
            }
            console.log('données envoyées ',data);
            this.$administration.put('utilisateurs/modifier',data).then(response => {
                console.log('réponse ',response);
                
                this.submitted = false 
                this.$emit('userUpdated',response)
                this.resetForm()
                return App.notifySuccess(response.data.message)
            }).catch(error => {
                console.log('error ',error);
                this.submitted = false 
                if(error.response.data.status==500){
                    return this.erreur500()
                }else{
                    return this.erreur(error.response.data.message)
                }
            })
      
        },
        async erreur500() {
            const ok = await this.$refs.errorDialogue.show({
                title: 'Erreur !!!',
                message: 'Erreur interne du serveur',
            })
        },
        async erreur(message) {
            let raison =message!=undefined?message:'Impossible de joindre le serveur'
            const ok = await this.$refs.errorDialogue.show({
                title: 'Erreur !!!',
                message: raison,
            })
        },
        async getEntites(){
            this.showOverlay = true;
            if (!php.empty(this.$store.state.entiteswithoutminfof)) {
                this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
            } 
            else {
                try {
                this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.items);
                this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
                } catch (error) {
                App.notifyError(error.message);
                }
            }
            this.showOverlay=false;
        },
        onSearchEntites(query){
            this.searchentite = query
            this.offsetEntites = 0
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
        resetForm() {
            this.newuser = {
               compte:null, nom: null, prenom: null, email:null, langue:null, idprofil: null, typeProfil:null, statut:1
            };

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
 
        async getTypesProfilsAndProfils(){
            this.showOverlay=true;
          if(!php.empty(this.$store.state.typesProfils)){
            this.typesUtilisateurs=this.$store.state.typesProfils
          }
          else{
            try {
                this.$administration.get('types-profils').then(response => {
                this.typesUtilisateurs=response.data.result.Items
                this.$store.dispatch('typesProfils', this.typesUtilisateurs)
                
            })
            } catch (error) {
               App.notifyError(error.message);
            }
          }
          try { 
                this.$administration.get('profils/createByUser').then(response => {
                console.log('response ',response);
                this.profilsTypeList=response.data.result.Items
                this.showOverlay=false;
               

                this.$store.dispatch('profils', this.profils) 
                })
                } catch (error) {
                    App.notifyError(error.message);
                }
                this.loadData()
                //this.newuser=this.usertoUpdate

               
        },
        loadData(){
            this.newuser.compte = this.usertoUpdate.compte;
            this.newuser.nom = this.usertoUpdate.nom;
            this.newuser.prenom = this.usertoUpdate.prenom;
            this.newuser.email = this.usertoUpdate.email;
            this.newuser.langue = this.usertoUpdate.langue;
            this.newuser.idprofil = typeof this.usertoUpdate.profil==='object'?this.usertoUpdate.profil.idProfil :this.usertoUpdate.idprofil;
            this.newuser.typeProfil = typeof this.usertoUpdate.profil==='object'?this.usertoUpdate.profil.typeProfil :this.usertoUpdate.typeProfil;
            if(this.isMinfof){
                this.newuser.entite= this.usertoUpdate.idOrganisation
            }
        }
    },
    async mounted(){
        await this.getTypesProfilsAndProfils();

        if(!this.isMinfof){
            this.entite.libelle=this.user.profil.organisation
            this.entite.idorganisation=this.user.idOrganisation
        }
        else{
            await this.getEntites()
        }
        

    }
}


</script>
<style>
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
.is-red{
    border:1px solid red;
}
.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
}
</style>
