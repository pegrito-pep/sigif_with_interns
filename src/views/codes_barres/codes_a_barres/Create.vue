<template>

    <b-overlay :show="showOverlay" rounded="sm">
        <div>
            <b-form  @submit.stop.prevent="addUser">
                <b-row>
                    <b-col>
                        <label><span style="color: red">*</span> Nombre de code à barres </label>
                        <b-form-input name="nom" id="nom"  size="sm" placeholder="100" v-model="lotCodeBarres.nbr" v-validate="{ required: true, min: 3 }" :state="validateState('nom')" aria-describedby="nom" data-vv-as="nom"></b-form-input>
                        <b-form-invalid-feedback id="nom">{{ veeErrors.first('nom') }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col>
                        <label><span style="color: red">*</span> usage </label>
                        <b-form-select name="langue" id="langue"  size="sm" v-model="lotCodeBarres.usage" :options="usages" @change="setNextAction" value-field="value" text-field="libelle" v-validate="{ required: true}" :state="validateState('langue')" aria-describedby="langue" data-vv-as="langue"/>
                        <b-form-invalid-feedback id="langue">{{ veeErrors.first('langue') }}</b-form-invalid-feedback>
                    </b-col>
                    
                </b-row>
              
              
                <b-row>
                    <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                      <b-col v-if="inventaireSelected">
                            <label><span style="color: red">*</span> Type de titre </label>
                            <v-select label="libelle" :options="typesTitres" v-model="lotCodeBarres.typetitre" :reduce="typeTitre => typeTitre.value" :class="!requiredtypeTitre ? 'is-red' : ''"  class="custom-select-type_titre" style="background-color:green;" @input="triggerSetTitre"></v-select>
                            <span v-if="!requiredtypeTitre" style="color:red;">vous devez attribuer un profil à cet utilisateur</span>
                      </b-col>
                      <b-col v-if="grumeSelected || colisSelected">
                          <label><span style="color: red">*</span> Site </label>
                          <v-select label="libelle" :options="sites"  v-model="lotCodeBarres.site" :reduce="site => site.value" :class="!requiredSite ? 'is-red' : ''" class="custom-select-type_titre" style="background-color:#4CBB17;"></v-select>
                          <span v-if="!requiredSite" style="color:red;">vous devez attribuer un profil à cet utilisateur</span>
                      </b-col>
                      <b-col v-if="grumesAbbattageSelected">
                          <label><span style="color: red">*</span> Permis </label>
                          <v-select label="libelle" :options="permis" v-model="lotCodeBarres.permis" :reduce="permis => permis.value" :class="!requiredPermis ? 'is-red' : ''" class="custom-select-type_titre" style="background-color:#4F7942;"></v-select>
                          <span v-if="!requiredPermis" style="color:red;">vous devez attribuer un profil à cet utilisateur</span>
                      </b-col>
                    </transition>
                </b-row>
                <b-row>
                  <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                      <b-col v-if="inventaireSelected&&setTitre">
                            <label><span style="color: red">*</span>Titre </label>
                            <v-select label="libelle" :options="titres" v-model="lotCodeBarres.titre" :reduce="typeTitre => typeTitre.value" :class="!requiredtypeTitre ? 'is-red' : ''"  class="custom-select-type_titre" style="background-color:#008000"></v-select>
                            <span v-if="!requiredtypeTitre" style="color:red;">vous devez attribuer un profil à cet utilisateur</span>
                      </b-col>
                    </transition>
                </b-row>
                <hr>
                <!-- <b-button type="submit" class="float-right mt-2" variant="danger" :disabled="submitted" >valider <b-spinner v-if="submitted" small /></b-button>  -->
                 <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted">Enregistrer <b-spinner v-if="submitted" small /></b-button>
        <b-button v-b-tooltip.hover.top="'Donne la possibilité d\'effectuer un nouvel enregistrement'" type="submit" class="float-right mt-2 mr-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted2" @click.prevent="addLotCodeBarreAndContinue">Enregistrer et continuer <i class="fa fa-arrow-alt-circle-right ml-1" style="color: white"></i><b-spinner v-if="submitted2" small /></b-button>
      <b-spinner v-if="submitted" small />
            </b-form>
        </div>
    </b-overlay>
</template>

<script>
const php = require('phpjs');
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
export default {
    props: {

    },
    computed: { 
      ...mapGetters(['user']),
    },
    components: {

    },
    data: () => ({
        inventaireSelected:false,
        grumeSelected:false,
        colisSelected:false,
        grumesAbbattageSelected:false,
        lotCodeBarres: {
            nbr:'', usage:'', typetitre:null, site:null, permis:null,titre:null, langue: '',statut:1
        },
        usages:[{"libelle": "inventaire","value":1},{"libelle": "Grumes","value":2},{"libelle": "Colis","value":3},{"libelle": "Grumes -Abbattage","value":4}],
        typesTitres:[{"libelle" :"concession forrestière en convention provisoire","value":11},
                     {"libelle" :"concession forrestière en convention définitive","value":12},
                     {"libelle" :"foret communale","value":13},{"libelle" :"foret communautaire en convention provisoire","value":14},
                     {"libelle" :"foret communautaire en convention définitive","value":15},{"libelle" :"vente de coupe","value":16}],
        sites:[{"libelle" :"UTB BLCAM DOUALA","value":21},{"libelle" :"PF BLCAM","value":22},
        {"libelle" :"PR BLCAM DOUALA","value":23},{"libelle" :"PF2001","value":24},],
        permis:[{"libelle" :"052021/CAAC/MINFOF/SETAT/SG/DF/SDAFF/SAG","value":31},{"libelle" :"052021/CAAC/MINFOF/SETAT/SG/DF/SDAFF/PAG","value":32},
        {"libelle" :"082020/DEAC/MINFOF/SETAT/SG/DF/SDAFF/SAG","value":33},{"libelle" :"102019/CAAC/MINFOF/SETAT/SG/DF/SDAFF/SAG","value":34},],
       
        requiredtypeTitre:true,
        requiredSite:true,
        requiredPermis:true,
        setTitre:false,
         titres:[
           {"libelle" :"2012","value":"2012"},{"libelle" :"41254","value":"41254"},{"libelle" :"012454","value":"012454"},
           {"libelle" :"1014254","value":"1014254"},{"libelle" :"1014255","value":"1014255"},{"libelle" :"01254","value":"01254"}
        ],

        
    }),
    methods: {
        setNextAction(value){
          if(value==1){this.inventaireSelected=true;this.grumeSelected=false;this.colisSelected=false;this.grumesAbbattageSelected=false}
          if(value==2){this.inventaireSelected=false;this.grumeSelected=true;this.colisSelected=false;this.grumesAbbattageSelected=false}
          if(value==3){this.inventaireSelected=false;this.grumeSelected=false;this.colisSelected=true;this.grumesAbbattageSelected=false}
          if(value==4){this.inventaireSelected=false;this.grumeSelected=false;this.colisSelected=false;this.grumesAbbattageSelected=true}
        }, 
         addlotCodeBarre(){ this.$router.push({name: '', params: { id: this.selected[0].idoperation }}); },
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
            this.newuser = {
               compte:null, nom: null, prenom: null, email:null, langue:null, profil: null, typeProfil:null, statut:1
            };

            this.$nextTick(() => {
                this.$validator.reset();
            });
        },
        loadTypesProfils(typeProfil){
            if(typeProfil!==null){
                this.typeUserSelected =true;
                this.profilsTypeList=typeProfil.profilList;
            }else{
                this.typeUserSelected =false;
            }
        },
        async addUser() {
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.newuser.typeProfil){this.requiredTypeProfil=false; return;}
            else{this.requiredTypeProfil=true;}
            if(!this.newuser.profil){this.requiredProfil=false; return;}
            else{this.requiredProfil=true;}
            console.log('données envoyées',this.newuser);
            this.newuser.typeProfil=this.newuser.typeProfil.idTypeProfil
            this.submitted = true
            
                this.$administration.post('utilisateurs', this.newuser).then(response => {
                    this.submitted = false 
                    this.$emit('userAdded')
                    this.resetForm()
                    console.log('respone après ajout', response);
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    return App.alertError(error.message)
                })
        });
            
        },
        async getTypesProfils() {
            this.showOverlay=true;
          if(this.$store.state.typesProfils!==null&&this.$store.state.typesProfils.length>0){
            this.typesUtilisateurs=this.$store.state.typesProfils
          }else{
            try {
                this.$administration.get('profils/types-profil').then(response => {
                this.typesUtilisateurs=response.data.result
                this.$store.dispatch('typeProfils', this.typesUtilisateurs)
                
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
        this.newuser.langue=this.user.langue;
        console.log('newUser',this.newuser);
    }


}
</script>
<style scoped>
  .custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #eeeeee;
    --vs-selected-color: #eeeeee;
  }


.is-red{
    border:1px solid red;
}
</style>