<template>
    <div>
        <div class="row m-2">     
          <div class="col-lg-6 col-6">
            <!-- small box -->
            <b-overlay :show="totalUtilisateurs == null" rounded="sm">
              <div v-if="totalUtilisateurs != null" class="small-box bg-success">
                <div class="inner">
                  <h3 class="set-number-size">{{ totalUtilisateurs }}</h3>
  
                  <p class="set-text-size">Utilisateur<span v-if="totalUtilisateurs>1">s</span> enregistré<span v-if="totalUtilisateurs>1">s</span> </p>
                </div>
                <div class="icon">
                  <i class="fa fa-user"></i>
                </div>
                <a href="#" @click.prevent="gotoUsers" class="small-box-footer small-box-footer-size">consulter <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </b-overlay>
            
          </div>
          <!-- ./col -->
          <div class="col-lg-6 col-6">
            <!-- small box -->
            <b-overlay :show="totalProfils == null" rounded="sm">
              <div v-if="totalProfils != null" class="small-box bg-success">
                <div class="inner">
                  <h3 class="set-number-size">{{ totalProfils }}<sup style="font-size: 20px"></sup></h3>
  
                  <p class="set-text-size">Profil<span v-if="totalProfils>1">s</span>   d'utilisateurs crée <span v-if="totalProfils>1">s</span></p>
                </div>
                <div class="icon">
                  <i class="fa fa-users"></i>
                </div>
                <a href="#" @click.prevent="gotoProfils" class="small-box-footer small-box-footer-size">consulter <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </b-overlay>
          </div>
        </div>
        <b-overlay :show="totalUtilisateurs == null" rounded="sm">
        <div v-if="totalUtilisateurs != null">
          <h4 class="mx-2">Liste des utilisateurs connectés</h4>
          <b-row  class="m-2">
              <div class="col-lg-6 col-6">
                <b-table v-if="isMinfof"
                  select-mode="single"
                  responsive="sm"
                  ref="selectableTable"
                  sticky-header
                  head-variant="light"
                  :items="userConnected"
                  :fields="fieldsMinfof"
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
                    <template #cell(nomcomplet)="data">
                      <span style="font-size: .7rem;">{{ data.item.nomcomplet }}</span>
                    </template>
                    <template #cell(profil)="data">
                      <span style="font-size: .7rem;">{{ data.item.profil }}</span>
                    </template>
                    <template #cell(organisation)="data">
                      <span style="font-size: .7rem;">{{ data.item.organisation }}</span>
                    </template>
                    <template #cell(statut)>
                      <b-button small variant="success" class="rounded"></b-button>
                    </template>
                </b-table>
                <b-table v-else
                  select-mode="single"
                  responsive="sm"
                  ref="selectableTable"
                  sticky-header
                  head-variant="light"
                  :items="userConnected"
                  :fields="fields"
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
                    <template #cell(nomcomplet)="data">
                      <span style="font-size: .7rem;">{{ data.item.nomcomplet }}</span>
                    </template>
                    <template #cell(profil)="data">
                      <span style="font-size: .7rem;">{{ data.item.profil }}</span>
                    </template>
                    <template #cell(statut)>
                      <b-button small variant="success" class="rounded"></b-button>
                    </template>
                </b-table>
              </div>
          </b-row>
        </div>
          

          </b-overlay>
          
    </div>
</template>

<script>

import { mapGetters } from "vuex";
const php  = require ( 'phpjs' ) ;

export default {

  name: "admin_dashboard",
  
  components: {

  },
  data: () => ({
    totalUtilisateurs:null,
    totalProfils:null,
    onlinesUsers:[],
    fields:[
      { nomcomplet: "compte", label: "Nom" },
      { profil: "compte", label: "Profil" },
      { statut: "compte", label: "statut" },
    ],
    fieldsMinfof:[
      { nomcomplet: "compte", label: "Nom" },
      { profil: "compte", label: "Profil" },
      { statut: "compte", label: "statut" },
      { key: "organisation", label: "organisation" },
    ],
    userConnected:[]
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
  },
 
 methods: {
    async getStats(){
      this.$administration
        .get("dashboard/infos")
        .then((response) => {
          console.log('response ',response);
          this.totalUtilisateurs = response.data.result.registers;
          this.totalProfils = response.data.result.profils;
          this.onlinesUsers = response.data.result.utilisateurs;
          for(let i =0; i<this.onlinesUsers.length;i++){
            let u ={
              nomcomplet: this.onlinesUsers[i].nom + ' '+this.onlinesUsers[i].prenom,
              profil: this.onlinesUsers[i].profil.intitule,
              statut: this.onlinesUsers[i].statut,
              organisation:this.onlinesUsers[i].libelletypeOrganisation
            }
            this.userConnected.push(u)
          }
          if(php.empty(this.onlinesUsers)){
            //this.onlinesUsers.push(this.user)
          }
        })
        .catch((error) => {
          console.log('error ',error);
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
          return App.alertError('Impossible de joindre le serveur')
        });
    
    }, 
    gotoUsers(){
      this.$router.push({name: 'utilisateurs'}); 
    },
    gotoProfils(){
      this.$router.push({name: 'profils'}); 
    },
    gotoTypesprofils(){
      this.$router.push({name: 'modeles_fichiers'}); 
    },
    gotoModelesfichiers(){
      this.$router.push({name: 'modeles_fichiers'}); 
    }
  },
  
  beforeMount() {
    this.getStats()
  }

  }

</script>
<style scoped>
.set-number-size{
  font-size: 4rem
}
.set-text-size{
  font-size: 2rem
}
.small-box-footer-size{
  font-size: 1rem
}
</style>