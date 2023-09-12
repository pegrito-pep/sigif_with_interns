<template>
    <div id="cover" >
      <b-overlay :show="submitted" class="submitted-content">
          <div>
            <div class="parent">
              <!--<Module
                v-for="mod in modules"
                :key="mod.id"
                :title="mod.title"
                :image="mod.image"
                :lien="mod.lien"
                :hasAccess="userModuleList[mod.id] > 0"
              />-->
              <Module
                v-for="mod in modules"
                :key="mod.id"
                :title="mod.title"
                :image="mod.image"
                :lien="mod.lien"
                :hasAccess="true"
              />
              
      

            </div>
            
          </div>
      </b-overlay>
      <ModulesFooter />
    </div>

</template>

<script>
import Module from  '../components/Module.vue';
import ModulesFooter from  '../components/ModulesFooterc.vue';
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: "Login",
  components: {
    Module,
    ModulesFooter,
  },
  data: () => ({
    login: null,
    password: null,
    submitted:false,
    userModuleList: [0, 2, 0, 0, 5, 2, 4, 8, 0, 0, 11, 12, 0, 14, 0, 0, 0, 17, 0],
    modules: [
      {
        id: 1,
        title: "ADMINSTRATION",
        image: "img/images/1Administrationb.png",
        lien:"administration-dashboard"
      },
      {
        id: 2,
        title: "DONNEES DE REFERENCE",
        image: "img/images/2Donnees_de_referenceb.png",
        lien: "donnees-reference-dashboard"
      },
      {
        id: 3,
        title: "SIG",
        image: "img/images/5SIGb.png",
      },
      {
        id: 4,
        title: "TITRES FORESTIERS",
        image: "img/images/3Titresb.png",
        lien: "titre_forestiers-concession_en_cp"
      },
      {
        id: 5,
        title: "CODES BARRES",
        image: "img/images/4Code_a_barresb.png",
        lien:"code_barres-dasboard"
      },
      {
        id: 6,
        title: "INVENTAIRES",
        image: "img/images/6Inventairesb.png",
        lien: "inventaires-tracking_limites"
      },
      {
        id: 7,
        title: "PERMIS",
        image: "img/images/7Permisb.png",
        lien: "permis-demande_de_permis"
      },
      {
        id: 8,
        title: "ABATTAGES",
        image: "img/images/9Abattagesb.png",
        lien:"abbattage-abbattage_titres",
      },
      {
        id: 9,
        title: "BOIS CEMAC",
        image: "img/images/8Bois_CEMACb.png",
        lien:"bois-cemac-entite_forestiere_cemac"
        
      },
      {
        id: 10,
        title: "OPERATIONS DE PARC",
        image: "img/images/10Operation_de_parcb.png",
        lien:"operation_parc-dashboard"
      },
      {
        id: 11,
        title: "TRANSFORMATION",
        image: "img/images/11Transformationb.png",
        lien: "transformation-lignes/list"
      },
      {
        id: 12,
        title: "FISCALITE FORESTIERE",
        image: "img/images/12Fiscaliteb.png",
        lien: "fiscalite-forestiere-emission_titre_recouvrement"
      },
      {
        id: 13,
        title: "CONTENTIEUX",
        image: "img/images/13Contentieuxb.png",
      },
      {
        id: 14,
        title: "CERTIFICATS DE LEGALITE",
        image: "img/images/14Certificat_de_legaliteb.png",
        lien: "certificats-de-legalite-demande_de_certificat"
      },
      {
        id: 15,
        title: "EXPORTATION",
        image: "img/images/15Exportationb.png",
        lien: "exportation-quota_bois_exportation"
      },
      {
        id: 16,
        title: "TRACABILITE",
        image: "img/images/16Tracabiliteb.png",
        lien: "controle-produit_provenance_cameroun"
      },
      {
        id: 17,
        title: "CONTROLE",
        image: "img/images/17Controleb.png",
        lien: "controle-inspection_abattage"
      },
      {
        id: 18,
        title: "RAPPORT",
        image: "img/images/18Rapportsb.png",
        lien: "rapport"
      },
    ],
    myDataVariable:true,
    colors:{checked: '#00FF00', unchecked: '#FF0000', disabled: '#CCCCCC'}
  }),
  computed:{
    ...mapState('locale', ['locale']),
    ...mapGetters(['user', 'permissions'])
  },
 
 methods: {
   ...mapMutations('locale', ['setLocale']),
   onSetLocale(locale) {
     console.log('locale',this.$i18n.locale);
      this.$i18n.locale = locale
      this.setLocale(locale)
    },
    sendForm() {
      console.log('entrée 1',this.login,' pass',this.password);
      this.submitted = true;
      axios
        .post("login", { login: this.login, password: this.password })
        .then((response) => {
           console.log('entrée 2');
          storage.set("access_token", response.result.access_token);
          storage.set("refresh_token", response.result.refresh_token);
          window.location.href = this.$router.options.base
          // this.$router.push({ name: "home" });
        })
        .catch((error) => {
          console.log('error',error.message);
          this.submitted = false;
          App.notifyError(error.message);
        });
    },
    logout(){
      storage.clear()
      //this.$store.dispatch('user', {})
      this.$router.push({name: 'login'})
    }
 },
 created() {
   console.log('locale created',this.locale);
    //this.$i18n.locale = this.locale
  },
  beforeMount() {
    console.log(this.modules);
    //  this.modules = this.modules.map((elt, index) =>{
    //     switch(index) {
    //       case 0:
    //         elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
    //         break
    //       case 1:
    //         elt.hasAccess = this.permissions.includes("DONNEES_REFERENCE")
    //         break
    //       case 2:
    //         elt.hasAccess = this.permissions.includes("SIG")
    //         break
    //       case 3:
    //         elt.hasAccess = this.permissions.includes("TITRE_FORESTIER")
    //         break
    //       case 4:
    //         elt.hasAccess = this.permissions.includes("CODE_BARRES")
    //         break
    //       case 5:
    //         elt.hasAccess = this.permissions.includes("INVENTAIRE")
    //         break
    //       case 6:
    //         elt.hasAccess = this.permissions.includes("PERMIS")
    //         break
    //       case 7:
    //         elt.hasAccess = this.permissions.includes("ABATTAGE")
    //         break
    //       case 8:
    //         elt.hasAccess = this.permissions.includes("BOIS_CEMAC")
    //         break
    //       case 9:
    //         elt.hasAccess = this.permissions.includes("OPERATION_PARC")
    //         break
    //       case 10:
    //         elt.hasAccess = this.permissions.includes("TRANSFORMATION")
    //         break
    //       case 11:
    //         elt.hasAccess = this.permissions.includes("FISCALITE_FORESTIERE")
    //         break
    //        case 12:
    //         elt.hasAccess = this.permissions.includes("CONTENTIEUX")
    //         break
    //       case 13:
    //         elt.hasAccess = this.permissions.includes("CERTIFICAT")
    //         break
    //       case 14:
    //         elt.hasAccess = this.permissions.includes("EXPORTATIONS")
    //         break
    //       case 15:
    //         elt.hasAccess = this.permissions.includes("TRACABILITE")
    //         break
    //       case 16:
    //         elt.hasAccess = this.permissions.includes("Contrôle")
    //         break
    //       case 17:
    //         elt.hasAccess = this.permissions.includes("RAPPORT")
    //         break
    //     }
    //       return elt
    //     })


        this.modules = this.modules.map((elt, index) =>{
        switch(index) {
          case 0:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 1:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 2:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 3:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 4:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 5:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 6:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 7:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 8:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 9:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 10:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 11:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
           case 12:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 13:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 14:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 15:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 16:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
          case 17:
            elt.hasAccess = this.permissions.includes("CREER_UTILISATEUR")
            break
        }
          return elt
        })
    
 
    

  },
}

</script>


<style scoped>


#cover{

    background-image: url('~@/assets/img/img-bg-modules.png');
    background-size: cover;
    height: 100%;
    height: 100%;
    text-align: center;
    align-items: center;
    position: relative;
    

}
.submitted-content{
  height: calc(100vh - 105px - 40px); /* La hauteur de la page moins la hauteur du header et du footer */
}
.submitted-content > div {
  display: flex;
  justify-content: center;
  align-content: center;
  height: 50%;
  transform: translateY(40%);
}


.parent {
  margin: 0 10%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-shrink: row;
}

@media screen and (max-width: 2500px) {
  .parent{
    margin: 0 15%;
  }
}
@media screen and (max-width: 1700px) {
  .parent{
    margin: 0 10%;
  }
}
@media screen and (max-width: 1500px) {
  .parent{
    margin: 0 4%;
  }
}
@media screen and (max-width: 1300px) {
  .parent{
    margin: 0 0%;
  }
}
@media screen and (max-width: 1130px) {
  .parent{
    margin: 0 5%;
  }
}
@media screen and (max-width: 1100px) {
  .parent{
    margin: 0 5%;
  }
}
@media screen and (max-width: 1000px) {
  .parent{
    margin: 0 2%;
  }
  .submitted-content{
    height: calc(100vh - 240px); /* La hauteur de la page moins la hauteur du header et du footer */
  }
}


@media screen and (max-width: 740px) {
  .submitted-content > div {
    transform: translateY(20%);
  }
  .parent{
    margin: 0 1%;
  }

}

@media screen and (max-width: 870px) {
  
  #cover{
    overflow-y: scroll;
  }
  .submitted-content > div {
    transform: translateY(20%);
  }
}

@media screen and (max-width: 580px) {
  .submitted-content > div {
    transform: translateY(8%);
  }
  
}







.module > .image img{
  height: 100%;
  width: 100%;
}
</style>