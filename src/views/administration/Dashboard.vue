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
        <b-row class="m-2">
            <div class="col-lg-6 col-6">
              <!-- small box -->
              <div class="small-box bg-success">
                <div class="inner">
               
                  <b-carousel
                    id="carousel-1"
                    :interval="4000"
                    :controls="onlinesUsers.length>1"
                    :indicators="onlinesUsers.length>1"
                    background="#ababab"
                    img-width="1024"
                    img-height="480"
                    style="text-shadow: 1px 1px 2px #333;"
                  
                  >
                    <!-- Slides with image only -->
                    <b-carousel-slide  v-for="user in onlinesUsers" :key="user.login">
                      <template #img>
                        <div style="width:100%; height:100%;">
                          <a href="#" class="list-group-item list-group-item-action border-0" style="background-color: lightgrey;">
                            <div class="d-flex align-items-start">
                              <img src="@/assets/images/picto_user_blanc.png" class="rounded-circle mr-1" alt="Vanessa Tucker" width="200" height="200">
                              <div class="flex-grow-2 ml-3">
                                <span style="font-size: 3rem;">{{ user.nom }} {{ user.prenom }}</span>
                                
                                <div class="small text-center"><span style="font-size: 2rem; font-style: italic;color: green">{{ user.profil.intitule }}</span> </div>
                              </div>
                            </div>
                          </a>
                        </div>
                      </template>
                    </b-carousel-slide>
                  </b-carousel>
                </div>
                <div  class="icon">
                  <i class="fa fa-circle" style="color: green;"></i>
                </div>
                <a href="#" class="small-box-footer" style="font-size: 2rem">Liste des utilisateurs connectés</a>
              </div>
            </div>
        </b-row>
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
    onlinesUsers:[]
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
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
          if(php.empty(this.onlinesUsers)){
            this.onlinesUsers.push(this.user)
          }
        })
        .catch((error) => {
          console.log('error ',error);
          this.isBusy = false;
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