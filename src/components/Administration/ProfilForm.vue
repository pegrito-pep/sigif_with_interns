<template>
    <b-overlay :show="showOverlay" rounded="sm">
        <div>
            <!--<b-form @submit.stop.prevent="addProfil">-->
            <b-form>   
                <b-row class="d-flex justify-content-around">
                    <b-col cols="5">
                        <label><span style="color: red">*</span> Intitulé </label>
                        <b-form-input id="intitule" name="intitule" size="sm" v-model="profil.institule" placeholder="intitule" v-validate="{ required: true, min: 4}" :state="validateState('intitule')" aria-describedby="intitule" data-vv-as="intitule"></b-form-input>
                        <b-form-invalid-feedback id="intitule">{{ veeErrors.first('intitule') }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="5">
                        <label><span style="color: red">*</span> type de profil </label>
                        <v-select class="custom-select-vselect" name="typeProfil" id="typeProfil" label="libelleTypeProfil"  :options="typesUtilisateurs" v-model="profil.typeProfil" :reduce="profil => profil.idTypeProfil"  @input="loadPrivilegesProfil" :class="!requiredTypeProfil ? 'is-red' : ''"></v-select>
                        <span v-if="!requiredTypeProfil" style="color:red;">vous devez attribuer un type de profil</span>
                    </b-col>
            
                </b-row>
                <b-overlay :show="showloaderPrivileges" rounded="sm">
                    <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                        <b-row v-if="haveSelectedTypeProfil">
                        <b-col>
                            <div class="d-flex justify-content-between align-items-center">
                                
                            </div>
                            <b-row class="mx-2">
                                <b-col cols="6">
                                    <b-row class="container mt-2 justify-content-between">
                                        <b-col  cols="6" class="d-flex justify-content-center align-items-center">
                                            <b-form-group id="fieldset-1" label="Rechercher" label-for="input-1">
                                                <b-form-input v-model="searchLeft" size="sm" class="w-100"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <b-form-group class="mt-2">
                                                    <b-form-checkbox class="font-weight-bold" :disabled="submitted" v-model="allSelectedLeft" @change="toggleAllLeft">{{ allSelectedLeft ? 'Tout deselectionner' : 'Tout selectionner' }}</b-form-checkbox>
                                                </b-form-group>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-table-simple :sortable="true" class="mb-1 p-0"   hover small responsive style="border: 1px solid black!important">
                                        <b-tbody>
                                        <b-tr>
                                            <b-th class="border m-0 text-center" style="width: 25%">Selectionner les autorisations</b-th>
                                            <b-th class="border m-0 text-center">Code privilège</b-th>          
                                        </b-tr>
                                            <b-tr v-for="privilege in itemsLeft" :key="privilege.id">
                                                <b-td class="border text-center">
                                                    <b-form-checkbox v-model="privilege.selected"></b-form-checkbox>   
                                                </b-td>
                                                <b-td class="border px-2">
                                                    <span class="d-inline-block w-100 text-center font-weight-bold">{{ privilege.libelle }}</span>
                                                </b-td>
                                            </b-tr>
                                                    
                                            </b-tbody>
                                    </b-table-simple>
                                    <paginator hr="top" :offset="offsetLeft" :total="privilegesLeft.length" :limit="perPageLeft" :page="currentPageLeft" @pageChanged="(page) => {currentPageLeft = page}" @limitChanged="(limit) => {perPageLeft = limit}" />  
                                </b-col>
                                <b-col cols="6">
                                    <b-row class="container mt-2 justify-content-between">
                                        <b-col  cols="6" class="d-flex justify-content-center align-items-center">
                                            <b-form-group id="fieldset-1" label="Rechercher" label-for="input-1">
                                                <b-form-input v-model="searchRight" size="sm" class="w-100"></b-form-input>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="6">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <b-form-group class="mt-2">
                                                    <b-form-checkbox class="font-weight-bold" :disabled="submitted" v-model="allSelectedRight" @change="toggleAllRight">{{ allSelectedRight ? 'Tout deselectionner' : 'Tout selectionner' }}</b-form-checkbox>
                                                </b-form-group>
                                            </div>
                                        </b-col>
                                    </b-row>
                                    <b-table-simple :sortable="true" class="mb-1 p-0"   hover small responsive style="border: 1px solid black!important">
                                        <b-tbody>
                                            <b-tr>
                                                <b-th class="border m-0 text-center" style="width: 25%">Selectionner les autorisations</b-th>
                                                <b-th class="border m-0 text-center">Code privilège</b-th>          
                                            </b-tr>
                                            <b-tr v-for="privilege in itemsRight" :key="privilege.id">
                                                <b-td class="border text-center">
                                                    <b-form-checkbox v-model="privilege.selected"></b-form-checkbox>   
                                                </b-td>
                                                <b-td class="border px-2">
                                                    <span class="d-inline-block w-100 text-center font-weight-bold">{{ privilege.libelle }}</span>
                                                </b-td>
                                            </b-tr>
                                                    
                                        </b-tbody>
                                    </b-table-simple>
                                    <paginator hr="top" :offset="offsetRight" :total="privilegesRight.length" :limit="perPageRight" :page="currentPageRight" @pageChanged="(page) => {currentPageRight = page}" @limitChanged="(limit) => {perPage = limit}" />  
                                </b-col>
                              </b-row>
                        </b-col>
                        </b-row> 
                    </transition>
                </b-overlay>
                <hr>
                <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="addProfil" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
                <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" @click.prevent="addProfilAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small></b-spinner></b-button>
                <!--<b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" >valider <b-spinner v-if="submitted" small></b-spinner></b-button>-->
            </b-form>
            <serveur-error-box ref="errorDialogue"></serveur-error-box>
        </div>
    </b-overlay>
</template>

<script>
import ServeurErrorBox from '@/components/utils/ServeurErrorBox.vue';
const php = require('phpjs');
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
export default {
    props: {
      action: {type: String, default: 'add'},
      editProfil: {type: Object, default: null}
    },
    watch: {
        searchLeft(value) {
            this.privilegesLeft = !php.empty(value)
                ? this.truePrivilegesLeft.filter(elt =>
                    elt.libelle.toLowerCase().includes(value.toLowerCase())
                )
                : this.truePrivilegesLeft;
        },
        searchRight(value) {
            this.privilegesRight = !php.empty(value)
                ? this.truePrivilegesRight.filter(elt =>
                    elt.libelle.toLowerCase().includes(value.toLowerCase())
                )
                : this.truePrivilegesRight;
        }
    },
    computed: { 
      ...mapGetters(['user']),
      isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    selectedPrivileges() {
        return this.privileges.filter(elt => elt.selected).map(elt => elt.id)
    },
    selectedPrivilegesLeft() {
        return this.privilegesLeft.filter(elt => elt.selected).map(elt => elt.id)
    },
    selectedPrivilegesRight() {
        return this.privilegesRight.filter(elt => elt.selected).map(elt => elt.id)
    },
      /**
         * Elements affichés avec prise en charge de la pagination
         */
         itemsLeft() { 
            return php.array_slice(this.privilegesLeft, this.offsetLeft, this.perPageLeft) 
        },
        itemsRight() { 
            return php.array_slice(this.privilegesRight, this.offsetRight, this.perPageRight) 
        },
        offsetLeft() {
            return (this.currentPageLeft * this.perPageLeft) - this.perPageLeft
        },
        offsetRight() {
            return (this.currentPageRight * this.perPageRight) - this.perPageRight
        }
    },
    components: {
       ServeurErrorBox
    },
    data: () => ({
        haveSelectedTypeProfil:false,
        showOverlay:false,
        submitted: false,
        submitted2: false,
        requiredTypeProfil:true,
        showloaderPrivileges:false,
        requiredProfil:true,
        typeUserSelected:false, 
        isActive:true,
        searchLeft: null,
        searchRight:null,
        profil: {
            institule:'', typeProfil:'', privileges:[]
        },
        langues:[{"libelle": "Francais","value":"fr"},{"libelle": "Anglais","value":"en"}],
        typesUtilisateurs:[],
        privileges:[],
        privilegesLeft :[],
        privilegesRight :[],
        privilegesProfil:[],
        truePrivilegesLeft:[],
        truePrivilegesRight:[],
        currentPageLeft: 1,
        perPageLeft: 15,
        currentPageRight: 1,
        perPageRight: 15,
        allSelectedLeft: false,
        allSelectedRight: false,
        privilegesUserConnected:[],
        onlyPrivilesLibelles:[]
    }),
    methods: {
        rowClass(item, type) {
            if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
            }else{
            return 
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
        resetForm() {
            this.profil = {
               institule:null, typeProfil: null, privileges: []
            };

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        toggleAllLeft(checked) {
            this.privilegesLeft = this.privilegesLeft.map(elt => ({...elt, selected: checked}))
        },
        toggleAllRight(checked) {
            this.privilegesRight = this.privilegesRight.map(elt => ({...elt, selected: checked}))
        },
        async loadPrivilegesProfil(typeProfil){
            if(typeProfil!==null){
                this.showloaderPrivileges=true
                this.privilegesUserConnected=this.user.profil.privileges.Items

                try {
                    this.privileges = await this.$administration.get('types-profils/'+typeProfil).then((response) => response.data.result.privileges);
                 
                    for(let i=0; i<this.privileges.length; i++){
                        this.onlyPrivilesLibelles.push(this.privileges[i].libelle)
                    }
                    console.log('rien que les libellés ',this.onlyPrivilesLibelles);

                    //filtrage des privilèges pour n'envoyer que ceux parmis ceux dont possèdent l'utilisateur qui fait l'opération
                    if(this.isMinfof){
                        if(typeProfil=='0'){
                            //je veux créer un autre profil de type MINFOF => je ne peux lui donner que ce que j'ai
                            this.privileges=this.privileges.filter(elt => this.onlyPrivilesLibelles.includes(elt.libelle))
                        }
                    }else{
                        if(typeProfil=='2'){
                            //je veux créer un autre profil de type OPERATEUR  => je ne peux lui donner que ce que j'ai
                           /*  console.log('valeur ',this.onlyPrivilesLibelles.includes('CONSULTER_TYPES_DE_PRODUITS'));
                            this.privileges=this.privileges.filter(elt => this.privilegesUserConnected.includes(elt.libelle) )*/
                       
                        }
                    }
                    this.privilegesLeft=this.truePrivilegesLeft=this.privileges.splice(0, Math.trunc(this.privileges.length /2))
                    this.privilegesRight=this.truePrivilegesRight=this.privileges.splice( Math.trunc(this.privileges.length /2), this.privileges.length)
                    this.showloaderPrivileges=false
                    this.haveSelectedTypeProfil=true
                } catch (error) {
                App.notifyError(error.message);
                  this.showloaderPrivileges=false
                }
            }else{
                this.haveSelectedTypeProfil=false
                this.typeUserSelected =false;
            }
        },
        async doDelete() {
            const ok = await this.$refs.errorDialogue.show({
                title: 'Erreur !!!',
                message: 'Erreur interne du serveur',
            })
        },
        async addProfil() {
            this.$validator.validateAll().then(result => {if (!result) {return;}
                if(!this.profil.typeProfil){this.requiredTypeProfil=false; return;}
                else{this.requiredTypeProfil=true;}
                this.profil.privileges=this.selectedPrivileges
                console.log('données envoyées 4',this.profil);
                this.submitted = true
                let data={
                        institule: this.profil.institule,
                        typeProfil: this.profil.typeProfil.idTypeProfil,
                        privileges:this.selectedPrivilegesLeft.concat(this.selectedPrivilegesRight.filter((item) => this.selectedPrivilegesLeft.indexOf(item) < 0))
                    }
                    console.log('data',data);
                if(this.action=="add"){
                    
                    this.$administration.post('profils', data).then(response => {
                       // this.submitted = false 
                        this.$emit('profilAdded')
                        this.resetForm()
                        console.log('reponse après ajout', response);
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        if(error.response.data.status==500){
                        return this.doDelete()
                        }
                    })
                }
                else if(this.action="edit"){
                    console.log('entrée edition');
                    this.submitted = false
                    .$administration.put('profils/'+this.editProfil.idProfil, data).then(response => {
                        this.submitted = false 
                        this.$emit('profilEdited')
                        this.resetForm()
                        console.log('respone après edition', response);
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                        this.submitted = false
                        return App.alertError(error.message)
                    })
                }
                
            });
        },
        addProfilAndContinue(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.profil.typeProfil){this.requiredTypeProfil=false; return;}
            else{this.requiredTypeProfil=true;}
            this.profil.privileges=this.selectedPrivileges
            console.log('données envoyées',this.profil);
            this.submitted2 = true
            let data={
                    institule: this.profil.institule,
                    typeProfil: this.profil.typeProfil.idTypeProfil,
                    privileges:this.selectedPrivilegesLeft.concat(this.selectedPrivilegesRight.filter((item) => this.selectedPrivilegesLeft.indexOf(item) < 0))
                }
                console.log('data',data);
                if(this.action=="add"){
                    this.$administration.post('profils', data).then(response => {
                       // this.submitted2 = false 
                        this.$emit('profilAddedAndContinue')
                        this.resetForm()
                        console.log('respone après ajout', response);
                        return App.notifySuccess(response.data.message)
                    }).catch(error => {
                       // this.submitted2 = false
                        if(error.response.data.status==500){
                        return this.doDelete()
                        }
                    })
                }
                
            });
        },

        async getTypesProfils() {
            this.showOverlay=true;
          if(this.$store.state.typesProfils!==null&&this.$store.state.typesProfils.length>0){
            console.log('entrée 1');
            this.typesUtilisateurs=this.$store.state.typesProfils
          }else{
            
            try {
                this.$administration.get('types-profils').then(response => {
                this.typesUtilisateurs=response.data.result.Items
                this.$store.dispatch('typesProfils', this.typesUtilisateurs)
                console.log('typesUtilisateurs',this.typesUtilisateurs);
            })
               /* this.typesUtilisateurs = await this.$administration.get('profils/types-profil').then(response => response.data.result || []);
                console.log('types-utilisateurs',this.typesUtilisateurs);*/
            } catch (error) {
               App.notifyError(error.message);
            }
          }
          this.showOverlay = false;
        },
     
        
    },
    async mounted(){
        await this.getTypesProfils();      
        if (!php.empty(this.editProfil)) {
         
            
            this.profil.idProfil = this.editProfil.idProfil
            this.profil.institule = this.editProfil.intitule
            this.profil.typeProfil = this.editProfil.typeProfil
            this.profil.idTypeProfil = this.editProfil.typeProfil
            this.privilegesProfil = this.editProfil.privileges.Items
            //this.profil.typeProfil = this.typesUtilisateurs.filter(elt => elt.libelleTypeProfil ==this.editProfil.typeProfil)
         
           
            await this.loadPrivilegesProfil(this.profil.typeProfil);
           /*console.log('this.privileges ',this.privileges );
           console.log('privilegesProfil',this.privilegesProfil);*/
             this.privileges = this.privileges.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
              this.privilegesLeft = this.privilegesLeft.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
              this.privilegesRight = this.privilegesRight.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
        }
    }
}
</script>
<style scoped>
.custom-select-vselect{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
        --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 1.5;
}
.is-red{
    border:1px solid red;
}
</style>
