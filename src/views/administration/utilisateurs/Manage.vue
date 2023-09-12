<template>
  <div id="cover" class="min-vh-100">
    <div>
    <div class="d-flex">
    <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
      <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
        class="p-0 m-0"
        style="border: none; background: none; color: black"
      >
        <ul>
          <li
            :class="{ 'collapse-open': visible, 'collapse-close': !visible }"
          ></li>
        </ul>
      </b-button>
      </div>
      <b-collapse id="collapse-4" v-model="visible">
         <b-card class="b-card mt-0">
                  <b-row>
                    <b-col cols="2">
                      <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" label="Nom" v-model="search.nom"/>
                      <sigif-form-group :sizeLabel="5" :sizeLabelLg="5" label="Prénom" v-model="search.prenom"/>

                    </b-col>

                    <b-col cols="3" class="ml-2">
                       <sigif-form-group :sizeLabel="6" :sizeLabelLg="4" label="compte" class="w-75" v-model="search.compte"/>
                       <b-row>
                        <b-col cols="3">statut</b-col>
                        <b-col>
                          <select v-model="search.statut" class="" style="font-size:1rem; width:64%; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option></option>
                            <option v-for="(status, i) in statusUtilisateurs" :value="status.key" :key="i">
                            {{ status.label }}
                          </option>
                          </select>
                        </b-col>
                       </b-row>      
                    </b-col>
                    <b-col cols="4" class="ml-2">
                      <b-overlay rounded="sm" :show="showOverlayEntites">
                        <template #overlay>
                          <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                          </div>
                        </template>
                        <b-row>
                          <b-col cols="4">
                            <label for="" size="sm" class="label-size"> Entité forestière</label></b-col>
                          <b-col>
                            <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                              <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                              </li>
                            </v-select>
                            <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                              <option selected="selected">{{ entite.libelle }}</option>
                            </select>                                                                                   
                          </b-col>
                        </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlayProfils">
                          <template #overlay>
                            <div class="text-center">
                              <i class="fas fa-2x fa-sync fa-spin"></i>
                              <p id="cancel-label">Chargement...</p>
                            </div>
                          </template>
                          <b-row class="mt-2">
                            <b-col cols="4">profil</b-col>
                            <b-col>
                              <v-select @open="getPofils" :options="profils" v-model="search.profil"  label="institule" class="custom-select-type_titre"></v-select>
                            </b-col>
                          </b-row>
                       </b-overlay>
                    </b-col>
                    <b-col cols="2">
                      <b-row class="ml-3">
                        <search-bar-actions-buttons @search="filterTable" @reset="reset" :submitted="searchSubmitted"/>
                      </b-row>
                    </b-col>
                  </b-row>
                 
              </b-card>
      </b-collapse>
    </div>
    <!--entete des tableaux -->
    <div class="m-0 px-2 table-header-border">
      <b-row>
        <b-col
          ><h4 class="tab-header-left-text">
            <b-img src="@/assets/images/picto_user_vert.png"></b-img
            >{{ $t("data.Gestion_des_utilisateurs") }}
          </h4></b-col
        >
        <b-col class="col-md-auto">
          <b-button :disabled="!canCreateUser"
            @click.prevent="addUser"
            size="sm"
            :class="{
                'change-image-opacity': !canCreateUser,
                'not-change-image-opacity': canCreateUser,
              }"
            
            class="mx-1 simple-btn"
            ><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img
            >{{ $t("data.Créer") }}</b-button
          >

          <span>
            <b-button
              @click.prevent="updateUserData"
              :disabled="!canUpdateUser"
              size="sm"
              :class="{
                'change-image-opacity': !canUpdateUser,
                'not-change-image-opacity': canUpdateUser,
              }"
              class="mx-1 simple-btn"
              ><b-img src="@/assets/images/iconMODIFIER_16x16.png"
              ></b-img
              >{{ $t("data.Modifier") }}</b-button>
          
            <delete-box ref="deleteDialogue"></delete-box>
            <b-button @click="doDelete"
             
              size="sm"
              :class="{
                'change-image-opacity': !canDeleteuser,
                'not-change-image-opacity': canDeleteuser,
              }"
              class="mx-1 simple-btn"
              >   <b-img
                  src="@/assets/images/iconSUPPRIMER_16x16.png"
              >   </b-img
              >{{ $t("data.Supprimer") }}
              
              </b-button>
          
             
            
            <b-button @click.prevent="showDetails" 
              
             
              :class="{
                'change-image-opacity': !canViewDetailsUser,
                'not-change-image-opacity': canViewDetailsUser,
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{
                  'change-image-opacity': !canViewDetailsUser,
                }"
                src="@/assets/images/iconVISUALISER_16x16.png"
              ></b-img
              >{{ $t("data.Consulter") }}</b-button
            >


            <b-button  @click.prevent="activeUser"
              :disabled="!canActiveUser"
              size="sm"
              :class="{
                'change-image-opacity': !canActiveUser,
                'not-change-image-opacity': canActiveUser,
              }"
              class="mx-1 simple-btn"
              ><b-img
                src="@/assets/images/iconVALIDER_16x16.png"
              ></b-img>Activer</b-button>
                <active-box ref="activeboxDialogue"></active-box>
            <b-button  @click.prevent="offlineUser"
              :disabled="!canDesactiveUser"
              size="sm"
              :class="{
                'change-image-opacity': !canDesactiveUser,
                'not-change-image-opacity': canDesactiveUser
              }"
              class="mx-1 simple-btn"
              ><b-img
                :class="{ 'change-image-opacity': !canDesactiveUser }"
                src="@/assets/images/iconSUPPRIMER_16x16.png"
              ></b-img
              >Desactiver</b-button
            >
             <offligne-box ref="offligneDialogue"></offligne-box>


            <b-button   @click.prevent="ResetUser"
              :disabled="!canResetUserPassword"
              size="sm"
              :class="{
                'change-image-opacity': !canResetUserPassword,
                'not-change-image-opacity': canResetUserPassword,
              }"
              class="mx-1 simple-btn"
              ><b-img
                src="@/assets/images/iconVALIDER_16x16.png"
              ></b-img
              >Re-initialiser le mot de passe</b-button
            >
            <reset-user ref="resetDialogue" @load="handleResetPassword"></reset-user>
          </span>
        </b-col>
      </b-row>
    </div>
    <!--implémentation tableau proprement dite-->
    <div class="ml-1">
      <b-table
        :busy="isBusy"
        select-mode="single"
        responsive="sm"
        ref="selectableTable"
        hover
        selectable
        @row-selected="onRowSelected"
        :items="items"
        :fields="fields"
        :tbody-tr-class="rowClass"
        show-empty>
        <template #empty>
            <h4 style="color:green" class="text-center">Aucun<span class="font-weight-bold">utilisateur</span> trouvé!!</h4>
        </template>
        <template #table-busy>
          <div class="text-center text-success my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="ml-1">{{ $t("data.Chargement") }}</strong>
          </div>
        </template>
        <template #cell(index)="data"
          ><b class="ml-1" style="color: #175131 !important">{{
            ++data.index
          }}</b>
        </template>
        <template #cell(statut)="data">
          <span v-if="data.item.statut=='1'" style="color: green; font-weight: bold"
            ><i class="fa fa-check fa-lg" aria-hidden="true"></i
          ></span>
          <span v-else> <b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img></span>
        </template>
      </b-table>

      <!--AJOUT DE LA PAGINATION -->
      <paginator
        hr="top"
        :offset="offset"
        :total="total"
        :limit="perPage"
        :page="currentPage"
        @pageChanged="changePage"
        @limitChanged="
          (limit) => {
            perPage = limit;
          }
        "
      />
    </div>
    <!--MODAL POUR AJOUTER / SUPPRIMER UN UTILISATEUR-->
    <b-modal
      id="user-form"
      title="Enregistrer un utilisateur"
      header-class="custom-bg"
      header-text-variant="light"
      hide-footer
    >
      <user-form @userAdded="handleAddUser" @userAddedAndContinue="handleUserAddedAndContinue"/>
    </b-modal> 
    <created-box ref="createdDialogue"></created-box>


     <!--MODAL POUR MODIFIER LES INFORMATIONS D'UN UTILISATEUR-->
    <b-modal 
        id="update-user-form"
        header-class="custom-bg"
        header-text-variant="light"
        hide-footer
      >
        <template #modal-title> <span class="font-weight-bold">Modification utilisateur {{ usertoUpdate.compte }}</span></template>
        <update-user-form :usertoUpdate="usertoUpdate" @userUpdated="handleUserUpdated"/>
      </b-modal>
  </div>
</template>

<script>
const php = require("phpjs");
import UserForm from "@/components/Administration/UserForm.vue";
import UpdateUserForm from "@/components/Administration/UpdateUserForm.vue";
import ConfirmDialogue from '@/components/utils/ConfirmDialogue.vue';
import DeleteBox from '@/components/utils/DeleteBox.vue';
import OffligneBox from '@/components/utils/OffligneBox.vue';
import ActiveBox from '@/components/utils/ActiveBox.vue';
import ResetUser from '@/components/utils/ResetUser.vue';
import CreatedBox from '@/components/utils/Created.vue';
import { mapGetters } from "vuex";
export default {
  name: "utilisateur",
  components: {
    UserForm,
   UpdateUserForm,
    ConfirmDialogue,
    CreatedBox,
    DeleteBox,
    ActiveBox,
    OffligneBox,
    ResetUser,
  },
  data: () => ({
    usertoUpdate:null, //utilisateur à modifier
    //données liées à l'entete de recherche
    showOverlayEntites:false,
    profils:[],
    entiteswithoutminfof:[],
    searchentite:'',
    offsetEntites:0,
    limitEntites:10,
    showOverlayProfils:false,
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant: "success",
    bodyBgVariant: "light",
    isBusy: false,
    isRowselected: false,
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
     search:{
        nom: "",
        prenom: "",
        login: "",
        statut: "",
        entite: "",
        profil: "",
    },
    entite:{
      id:1,
      libelle:''
    },
     statusUtilisateurs: [
      { key: "0", label: "inactif"},
      { key: "1", label: "actif" }
    ],
     profils:[],
     fields: [
      { key: "index", label: "" },
      { key: "compte", label: "Compte" },
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prénom" },
      { key: "intitulelangue", label: "Langue" },
      { key: "email", label: "Email" },
      { key: "intituleprofil", label: "Profil" },
      { key: "entite", label: "Entité" },
      { key: "statut", label: "Statut" },
    ],
    elements: [],

    searchSubmitted:false,

    selected:{},
  }),
  computed: {
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    canCreateUser() {
      return this.hasAccess('CREER_UTILISATEUR')
    },
    canUpdateUser() {
      return this.hasAccess('MODIFIER_UTILISATEUR')
    },
    canDeleteuser() {
      return this.hasAccess('SUPPRIMER_UTILISATEUR')
    },
    canViewDetailsUser() {
      return this.hasAccess('CONSULTER_UTILISATEUR')
    },
    canActiveUser() {
      if(this.hasAccess('ACTIVER_UTILISATEUR')&&!php.empty(this.selected[0])&&this.selected[0].statut=='0'){
        return true
      }
      else{
        return false
      }
    },
    canDesactiveUser() {
      if(this.hasAccess('DESACTIVER_UTILISATEUR')&&!php.empty(this.selected[0])&&this.selected[0].statut=='1'){
        return true
      }
      else{
        return false
      }
    },
    canResetUserPassword() {
      return this.hasAccess('REINITIALISER_LE_MOT_DE_PASSE_UTILISATEUR')
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

    items() {
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    offset() {
      return this.currentPage * this.perPage - this.perPage;
    },
    ...mapGetters(["user"]),
  },
  watch:{
    elements(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
  },
  methods: {
    showDetails(){ this.$router.push({name: 'details_utilisateurs', params: { id: this.selected[0].login }}); },
    rowClass(item, type) {
      if (item != "" && item != null) {
        if (item.isEven) return "table-row-other";
        if (!item || type !== "row") return "table-info";
      } else {
        return;
      }
    },
    handleAddUser() {
      this.getUsers();
      this.$bvModal.hide("user-form");
      this.handleCreated();
    },
    handleUserAddedAndContinue(){
      this.$bvModal.hide("user-form");
      this.getUsers();
      setTimeout(() => {this.$bvModal.show("user-form"); }, 500);
    },
    onRowSelected(items) {
      console.log("row selected", items);
      items.isSelected = true;
      this.isRowselected = true;
      this.selected = items;
    },
    addUser() {
      this.$bvModal.show("user-form");
    },

   updateUserData(){
      if(!php.empty(this.selected[0])){this.usertoUpdate=this.selected[0]  }
      this.$bvModal.show("update-user-form");
    },
    handleUserUpdated(){
      this.getUsers();
      this.$bvModal.hide("update-user-form");
    },
     offlineUser() {
      this.$bvModal.show("user-form");
    },

    getRequestParams(page, pageSize) {
      let params = {
        page: 0,
        size: pageSize || 10,
      };
      if (page && page > 0) {
        params.page = page - 1;
      }
      return params;
    },
    changePage(page) {
      this.currentPage = page;
      this.getUsers();
    },
    getUsers() {
      this.isBusy = true;
      const params = this.getRequestParams(this.currentPage, this.pageSize);
      this.$administration
        .get("utilisateurs", { params })
        .then((response) => {
          this.total = response.data.result.totalItems;
          this.currentPage = response.data.result.currentPage + 1;
          this.elements = response.data.result.items;

          this.elements = this.elements.map((elt) => {
            elt.compte = elt.login;
            elt.intitulelangue = elt.langue == "fr" ? "francais" : "Anglais";
            elt.intituleprofil = elt.profil.institule;
            elt.entite = this.user.profil.organisation;

            return elt;
          });
          this.profils=this.elements.map(a => a.profil)
          this.isBusy = false;
        })
        .catch((error) => {
          this.isBusy = false;
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          else if(error.response.data.status==403){
            return App.alertError('Vous n\'avez pas le droit de consulter cete page')
          }
          return App.alertError('Impossible de joindre le serveur')
        });
    },
     filterTable() {
      let data={ 
            //entite: this.isMinfof?this.search.entite.idorganisation:this.entite.idorganisation, 
            nom: this.search.nom, 
            prenom: this.search.prenom,
            nomprofil:this.search.profil.idProfil,
            compte:this.search.compte,
            statut:this.search.statut
          }
          if(this.isMinfof){
            if(!php.empty(this.search.entite)){
              data.entite = this.search.entite.idorganisation
            }else{
              data.entite =""
            }
          }else{
            data.entite = this.entite.idorganisation
          }
          console.log('data ',data);
      this.isBusy=true
      this.$administration.post("utilisateurs/search", data).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map((elt) => {
            elt.compte = elt.login;
            elt.intitulelangue = elt.langue == "fr" ? "francais" : "Anglais";
            elt.intituleprofil = elt.profil.institule;
            elt.entite = this.user.profil.organisation;

            return elt;
          });
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
        });
    },
    async getEntites(){
      this.showOverlayEntites=true;
      if (!php.empty(this.$store.state.entiteswithoutminfof)) {
        this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
      } 
      else {
        try {
          this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=800").then(response => response.data.result.items);
          this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayEntites=false;
    },
    async getPofils(){
      this.showOverlayProfils=true;
      if (!php.empty(this.$store.state.profils)) {
        this.profils = this.$store.state.profils;
        this.showOverlayProfils=false;

      } 
      else {
        try {
          this.profils= await this.$administration.get("profils?size=800").then(response => response.data.result.items);
          console.log('profils ',this.profils);
          this.$store.dispatch('profils', this.profils)
          this.showOverlayProfils=false;

        } catch (error) {
          App.notifyError(error.message);
        }
      }
      this.showOverlayProfils=false;
    },
    onSearchEntites(query){
      this.searchentite = query
      this.offsetEntites = 0
    },
    resetSearcheBar(){
     this.search = {
        nom: "",
        prenom: "",
        login: "",
        statut: "",
        entite: "",
        profil: "",
      }
      storage.remove(this.$route.path)
    },

    reset(){
    this.resetSearcheBar()
    this.getUsers()
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
  },
   async handleCreated() {
            const ok = await this.$refs.createdDialogue.show({
               title: 'Enregistrement',
               message: 'Utilisateur enregistré avec succès',
               okButton: 'Nouvel enregistrement',
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.createdDialogue._close();
                this.$bvModal.show("user-form");
            } else {
               this.$refs.createdDialogue._close();
            }
   },

    async doDelete() {
            const ok = await this.$refs.deleteDialogue.show({
               title: 'Suppression utilisateur',
               message: 'Informations de l\'utilisateur à supprimer',
               compte:this.selected[0].login,
               nom:this.selected[0].nom,
               prenom:this.selected[0].prenom,
                okButton: 'oui',
              cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.deleteDialogue._close();
                this.$bvModal.show("user-form");
            } else {
               this.$refs.deleteDialogue._close();
            }
   },
   async OffligneBox() {
            const ok = await this.$refs.createdDialogue.show({
               title: 'désactiver un utilisateur',
               message: 'Etes-vous sur désactiver utilisateur de login '+this.selected[0].login+' ?',
               okButton: 'oui',
              cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
               alert('You have successfully delete this page.')
            } else {
               alert('You chose not to delete this page. Doing nothing now.')
            }

   },
    async offlineUser() {
            const ok = await this.$refs.offligneDialogue.show({
               title: 'Désactivation',
               message: 'voulez-vous désactiver l\'utilisateur:',
               compte: this.selected[0].login,
               nom: this.selected[0].nom,
               prenom: this.selected[0].prenom,
              okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$administration.put('utilisateurs/desactiver/'+this.selected[0].login, ).then(response => {
                    this.submitted = false 
                    this.getUsers();
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    return App.alertError(error.message)
                })
                this.$refs.offligneDialogue._close();
            } else {
               this.$refs.offligneDialogue._close();
            }
   },

    async activeUser() {
            const ok = await this.$refs.activeboxDialogue.show({
               title: 'Activation',
               message:"voulez-vous vraiment Activer l\'utilisateur:",
               compte:this.selected[0].login,
               nom:this.selected[0].nom,
               prenom:this.selected[0].prenom,
              // message: 'voulez-vous Activer l\'utilisateur:'+ this.selected[0].nom + ' ' + this.selected[0].prenom,
                
               okButton: 'Oui',
               cancelButton: "Non",
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              this.$administration.put('utilisateurs/activer/'+this.selected[0].login, ).then(response => {
                    this.submitted = false 
                    this.getUsers();
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    return App.alertError(error.message)
                })
                this.$refs.activeboxDialogue._close();
            } else {
               this.$refs.activeboxDialogue._close();
            }
   },

   
    async ResetUser() {
            const ok = await this.$refs.resetDialogue.show({
               title: 'Reinitialisation',
               message: 'Voulez-vous vraiment re-initialiser le mot de passe de l\'utilisateur: ',
               compte:this.selected[0].login,
               email:this.selected[0].email,
               nom:this.selected[0].nom,
               prenom:this.selected[0].prenom,
               okButton: 'Oui',
               cancelButton: "Non", 
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                
            } else {
               this.$refs.resetDialogue._close();
            }
   },
   //gestion évènement mot de passe re-initialisé avec 
   handleResetPassword(){
    this.$refs.resetDialogue._close();
    this.getUsers()
   }

  },

  mounted() {
    if (
      JSON.parse(
        storage.get(this.$route.path) !== "" &&
          JSON.parse(storage.get(this.$route.path) !== null)
      )
    ) {
      this.search = JSON.parse(storage.get(this.$route.path));
      this.filterTable();
    } else {
      this.getUsers();
    }
    if(!this.isMinfof){
      this.entite.libelle=this.user.profil.organisation
      this.entite.idorganisation=this.user.idOrganisation
    }
  },
};
</script>
<style scoped>

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

.position_absolute {
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card {
  background-color: transparent !important;
}
.b-col {
  margin-right: 16px;
}
.b-col .content {
  display: flex;
  flex-direction: column;
}

#cover {
  background-image: url("~@/assets/images/logo_sigif_trame.png");
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}

.collapse-close {
  list-style-type: disclosure-closed;
}
.collapse-open {
  list-style-type: disclosure-open;
}

/*style barre de recherche */
.search-bar-btn-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn {
  border: none;
  border-radius: 6px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover {
  background-color: rgba(0, 82, 44, 0.89);
  border: none;
}
.search-bar-btn a {
  color: white;
}
.search-bar-btn a:hover {
  font-weight: 600;
  font-style: italic;
}

.search-bar-custum-input {
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
  cursor:pointer
}

.simple-btn:hover {
  background: none;
  border: none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white !important;
  border-color: white !important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44) !important;
  border-color: white !important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover {
  cursor: pointer;
  color: #82c138;
}
.change-image-opacity {
  opacity: 0.15;
}
.not-change-image-opacity {
  opacity: 1;
}

.label-size{
  padding-top: calc(.25rem + 1px);
  padding-bottom: calc(.25rem + 1px);
  font-size: .875rem;
  line-height: 1.5;
}
</style>

<style>
.custom-bg {
  background: rgb(0, 82, 44) !important;
}

</style>
