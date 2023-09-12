<template>
    <div id="cover" class="min-vh-100">
          <div>
            <b-row class="ml-2" style="border-bottom: 2px solid green">
              <b-col class="pb-1 m-1" >
                  <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button>
                <span >Ajout d'un Profil </span>
                </h4>
                </b-col> 
                
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
          </div>
          <div>
              <b-form @submit.stop.prevent="addProfil">

                <b-row class="d-flex justify-content-around">
                    <b-col cols="5">
                        <label><span style="color: red">*</span> Intitulé </label>
                        <b-form-input id="intitule" name="intitule" size="sm" v-model="profil.institule" placeholder="intitule" v-validate="{ required: true, min: 4}" :state="validateState('intitule')" aria-describedby="intitule" data-vv-as="intitule"></b-form-input>
                        <b-form-invalid-feedback id="intitule">{{ veeErrors.first('intitule') }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col cols="5">
                        <label><span style="color: red">*</span> type de profil </label>
                        <v-select name="typeProfil" id="typeProfil" label="libelleTypeProfil"  :options="typesUtilisateurs" v-model="profil.typeProfil"  @input="loadPrivilegesProfil" :class="!requiredTypeProfil ? 'is-red' : ''"></v-select>
                        <span v-if="!requiredTypeProfil" style="color:red;">vous devez attribuer un type de profil</span>
                    </b-col>
            
                </b-row>
                <b-overlay :show="showloaderPrivileges" rounded="sm">
                    <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                        <b-row v-if="haveSelectedTypeProfil">
                        <b-col>
                            <div class="d-flex justify-content-between align-items-center">
                                <b-row class="container mt-2 justify-content-between">
                                    <b-col  cols="1" class="d-flex justify-content-center align-items-center"> Rechercher</b-col>
                                    <b-col cols="3" class="d-flex  justify-content-center align-items-center">
                                        <div class="w-100"><b-form-input v-model="search" size="sm" class="w-100"></b-form-input></div> 
                                    </b-col>
                                    <b-col cols="3" class="d-flex  justify-content-center align-items-center">
                                      <h4><span class="font-weight-bold">{{ selectedPrivileges.length }}</span> éléments sélectionnés</h4>
                                  </b-col>
                                    <b-col cols="5">
                                        <div class="d-flex flex-row-reverse">
                                            <b-form-group class="mt-2">
                                                <b-form-checkbox class="font-weight-bold" :disabled="submitted" v-model="allSelected" @change="toggleAll">{{ allSelected ? 'Tout deselectionner' : 'Tout selectionner' }}</b-form-checkbox>
                                            </b-form-group>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                            <div class="mb-0 mt-2" >
                            <b-row class="mx-2">
                              <b-col>
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
                              <b-col>
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
    
                            </div>
                        </b-col>
                        </b-row> 
                    </transition>
                </b-overlay>
                <hr>
                <b-button type="submit" class="float-right mt-2" style="background: rgb(0, 82, 44) !important;" :disabled="submitted" >valider <b-spinner v-if="submitted" small /></b-button>
              </b-form>  
          </div>
    </div>

</template>

<script>
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
          search(value) {
              this.privileges = !php.empty(value)
                  ? this.truePrivileges.filter(elt =>
                      elt.libelle.toLowerCase().includes(value.toLowerCase())
                  )
                  : this.truePrivileges;
          }
      },
      computed: { 
        ...mapGetters(['user']),
        selectedPrivileges() {
            return this.privilegesLeft.filter(elt => elt.selected).map(elt => elt.id).concat(this.privilegesRight.filter(elt => elt.selected).map(elt => elt.id))
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
      data: () => ({
          haveSelectedTypeProfil:false,
          showOverlay:false,
          submitted: false,
          requiredTypeProfil:true,
          showloaderPrivileges:false,
          requiredProfil:true,
          typeUserSelected:false, 
          isActive:true,
          search: null,
          profil: {
              institule:'', typeProfil:'', privileges:[]
          },
          langues:[{"libelle": "Francais","value":"fr"},{"libelle": "Anglais","value":"en"}],
          typesUtilisateurs:[],
          privileges:[],
          privilegesLeft :[],
          privilegesRight :[],
          privilegesProfil:[],
          truePrivileges:[],
          currentPageLeft: 1,
          perPageLeft: 15,
          currentPageRight: 1,
          perPageRight: 15,
          allSelected: false,
      }),
      methods: {
        fermer() {
          this.$router.back();
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
        toggleAll(checked) {
            this.privileges = this.privileges.map(elt => ({...elt, selected: checked}))
        },
        async loadPrivilegesProfil(typeProfil){
              console.log('typeProfil',typeProfil);
              if(typeProfil!==null){
                  this.showloaderPrivileges=true
                  try {
                      this.privileges = await this.$administration.get('types-profils/'+typeProfil.idTypeProfil).then((response) => response.data.result.privileges);    
                      this.privilegesLeft=this.privileges.splice(0, Math.trunc(this.privileges.length /2))
                      this.privilegesRight=this.privileges.splice( Math.trunc(this.privileges.length /2), this.privileges.length)
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
          async addProfil() {
              this.$validator.validateAll().then(result => {if (!result) {return;}
              if(!this.profil.typeProfil){this.requiredTypeProfil=false; return;}
              else{this.requiredTypeProfil=true;}
              this.profil.privileges=this.selectedPrivileges
              
              //this.profil.typeProfil=this.profil.typeProfil.idTypeProfil
              console.log('données envoyées',this.profil);
              this.submitted = true
              let data={
                      institule: this.profil.institule,
                      typeProfil: this.profil.typeProfil[0].idTypeProfil,
                      privileges: this.profil.privileges
                  }
                  console.log('data',data);
              if(this.action=="add"){
                  this.$administration.post('profils', data).then(response => {
                      this.submitted = false 
                      this.$emit('profilAdded')
                      this.resetForm()
                      console.log('respone après ajout', response);
                      return App.notifySuccess(response.data.message)
                  }).catch(error => {
                      this.submitted = false
                      return App.alertError(error.message)
                  })
              }
             else if(this.action="edit"){
                this.$administration.put('profils/'+this.editProfil.idProfil, data).then(response => {
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
          async getTypesProfils() {
              this.showOverlay=true;
            if(this.$store.state.typesProfils!==null&&this.$store.state.typesProfils.length>0){
              console.log('entrée 1');
              this.typesUtilisateurs=this.$store.state.typesProfils
            }else{
              
              try {
                  this.$administration.get('types-profils/all').then(response => {
                  this.typesUtilisateurs=response.data.result
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
          async getDetailProfil() {
              this.showloaderPrivileges = true;
              this.privilegesProfil = await this.$administration
                  .get("profils/" + this.editProfil.idProfil)
                  .then((response) => response.data.result.privileges);
                 
                 // this.privileges=this.privileges.map(elt => ({...elt, selected: false}))
              this.showloaderPrivileges = false;
          },
      },
      async mounted(){
          await this.getTypesProfils();      
          if (this.editProfil!=null) {
              this.profil.institule = this.editProfil.institule
              this.profil.typeProfil = this.editProfil.idProfil
              this.profil.typeProfil = this.typesUtilisateurs.filter(elt => elt.libelleTypeProfil ==this.editProfil.typeProfil)
             
              await this.loadPrivilegesProfil(this.profil.typeProfil[0]);
              await this.getDetailProfil();
              console.log('this.privileges ',this.privileges );
               //console.log('privilegesProfil',this.privilegesProfil);
              this.privileges = this.privileges.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
              this.privilegesLeft = this.privilegesLeft.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
              this.privilegesRight = this.privilegesRight.map(elt => ({...elt, selected: this.privilegesProfil.includes(elt.libelle)}))
          }
      }
  }
  </script>
  <style scoped>
  .is-red{
      border:1px solid red;
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
  </style>
  <style>
    .custom-control-input:checked~.custom-control-label::before {
        color: #fff;
        border-color: green;
        background-color: green;
        box-shadow: none;
    }
    </style>