<template>
    <div id="cover" class="min-vh-100">
          <div class="px-3">
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar">
                    <span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button>
                  <span
                    class="ml-1 font-weight-bold"
                  >Consultation entité forestière: {{ detailEntite.intitule }}</span>
                </h4>
              </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138 ;cursor:pointer">
                    <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                  </a>
                </span>
              </b-col>
            </b-row>
            <div class="b-card mt-5">
              <b-row class="mt-1">
                <b-col sm="4">
                  <label for="input-small">Type d'entité forestière: </label>
                  <label class="style" for="input-small">
                    {{ detailEntite.organisationType.libelle }}

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Email:</label>
                  <label class="style" for="input-small">
                    {{ detailEntite.societe.email }} 

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Code d'enregistrement:</label>
                  <label class="style" for="input-small">
                     {{ detailEntite.societe.codeenreg }} 

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Téléphone:</label>
                  <label class="style" for="input-small">
                     {{ detailEntite.societe.telephone }} 

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Nom de l'entité:</label>
                  <label class="style" for="input-small">
                    {{ detailEntite.intitule}} 

                  </label>
                </b-col>

               <b-col sm="4">
                  <label for="input-small">Adresse:</label>
                  <label class="style" for="input-small"> 
                    {{ detailEntite.adresse }}  

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Marteau/sigle:</label>
                  <label class="style" for="input-small">
                     {{ detailEntite.societe.sigle }} 
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Nom du responsabe:</label>
                  <label class="style" for="input-small">
                     {{ detailEntite.societe.nomresponsable }} 

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Téléphone du responsable:</label>
                  <label class="style" for="input-small">
                    {{ detailEntite.societe.telresponsable }} 

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Numéro du document:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.societe.numdocentjur }}  -->

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Date du document</label>
                  <label class="style" for="input-small"> 
                     <!-- {{ detailEntite.societe.telresponsable }}  -->

                  </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Email du responsable:</label>
                  <label class="style" for="input-small"> 
                     {{ detailEntite.societe.emailresponsable }}
                      </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Attache du document:</label>
                  <label class="style" for="input-small">7 Extraits du dépôt des empreintes du marteau forestiers.pdf</label>
                  <button class="button_telecharger">
                    <a v-b-tooltip.hover title="Télécharger le fichier">
                      <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="rgb(19, 173, 101)" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                    </a>
                  </button>
                  <a  v-b-tooltip.hover title="Consulter le fichier" size="sm" style="cursor: pointer;" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconVISUALISER_16x16.png"></b-img></a>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Attache marteau forestiers:</label>
                  <label class="style" for="input-small">Aucun fichier choisi</label>
                </b-col>

                <b-col sm="4">
                  <b-row class="content">
                      <div class="d-flex mb-4" style="width: 180px">
                          <b-col><label for="">Personne physique</label></b-col>
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="search.status"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                      >
                      </b-form-checkbox>
                      </div>
                      
                    </b-row>
                </b-col>
                <b-col sm="4">
                  <b-row class="content">
                      <div class="d-flex mb-4" style="width: 180px">
                          <b-col><label for="">Actif</label></b-col>
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="search.status"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                      >
                      </b-form-checkbox>
                      </div>
                      
                    </b-row>
                </b-col>
                <b-col sm="4">
                  <b-row class="content">
                      <div class="d-flex mb-4" style="width: 180px">
                          <b-col><label for="">Société d'exploitaion forestière</label></b-col>
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="search.status"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                      >
                      </b-form-checkbox>
                      </div>
                      
                    </b-row>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Numéro du régistre de commerce:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Date du régistre de commerce:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Attache régistre de commerce</label>
                  <label class="style" for="input-small">
                  <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                  <button class="button_telecharger">
                    <a v-b-tooltip.hover title="Télécharger le fichier">
                      <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="rgb(19, 173, 101)" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                    </a>
                  </button>
                  <a  v-b-tooltip.hover title="Consulter le fichier" size="sm" style="cursor: pointer;" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconVISUALISER_16x16.png"></b-img></a>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Numéro agrément d'exploitation forestière:</label>
                  <label class="style" for="input-small">
                   <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Date agrément d'exploitation':</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Numéro de distribuable:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Attache agrément d'exploitation:</label>
                  <label class="style" for="input-small">3 agréments d'exploitaion forestière sfil.pdf</label>
                   <button class="button_telecharger">
                    <a v-b-tooltip.hover title="Télécharger le fichier">
                      <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="rgb(19, 173, 101)" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                    </a>
                  </button>
                  <a  v-b-tooltip.hover title="Consulter le fichier" size="sm" style="cursor: pointer;" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconVISUALISER_16x16.png"></b-img></a>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Date de contribuable:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                </b-col>

                <b-col sm="4">
                  <b-row class="content">
                      <div class="d-flex mb-4" style="width: 180px">
                          <b-col><label for="">Société inventaire</label></b-col>
                      <b-form-checkbox
                        id="checkbox-1"
                        v-model="search.status"
                        name="checkbox-1"
                        value="accepted"
                        unchecked-value="not_accepted"
                      >
                      </b-form-checkbox>
                      </div>
                    </b-row>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Attache agrément contribuable:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label>
                   <button class="button_telecharger">
                    <a v-b-tooltip.hover title="Télécharger le fichier">
                      <svg xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="rgb(19, 173, 101)" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                    </a>
                  </button>
                  <a  v-b-tooltip.hover title="Consulter le fichier" size="sm" style="cursor: pointer;" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconVISUALISER_16x16.png"></b-img></a>
                </b-col>

                <b-col sm="4">
                  <label for="input-small">Numéro agrément d'inventaire:</label>
                  <label class="style" for="input-small">
                    <!-- {{ detailEntite.arrondissement.intitule}} -->
                    </label> 
                </b-col>
                <b-col sm="4">
                  <label for="input-small">Région:</label>
                  <label class="style" for="input-small">
                      {{ detailEntite.societe.arrondissement.departement.region.intitule}}
                    </label>
                </b-col>
                 <b-col sm="4">
                  <label for="input-small">Département:</label>
                  <label class="style" for="input-small">
                     {{ detailEntite.societe.arrondissement.departement.intitule}}

                  </label>
                </b-col>

                 <b-col sm="4">
                  <label for="input-small">Arrondissement:</label>
                  <label class="style" for="input-small">
                    {{ detailEntite.societe.arrondissement.intitule}}
                    </label>
                </b-col>
            </b-row>
          </div>
  
    </div>
</div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

export default {
  name: "details-entite_forestiere",
  components: {},
  data: () => ({
    showOverlay:false,
    detailEntite:{},
     isBusy:false,


      fields: [ { key: 'index', label: '' },
      { key: 'codeb', label: 'Code Barre' }, 
      { key: 'sequence', label: 'séquence'},
      {key : 'numdf10', label :'No DF10'},
      { key: 'essence', label : 'Essence' }, 
      { key: 'diametrepb', label : 'Diamètre petit bout' }, 
      { key: 'diametregb', label : 'Diamètre gros bout' }, 
      { key: 'longueur', label : 'Longueur(m)' }, 
      { key: 'volume', label : 'Volume (m3)' }, 
      
    ],

    numPemis :[{libelle :"0585/ASEBG/MINFOF/SETAT"}],
    abbattage:{idabatLot: 1518, numpermis: "0585/ASEBG/MINFOF/SETAT", numtitre:'AEBGDF', numufa: 1, numufe: 5, numaac: 7, numdfd10: 202121, datepermis: "21/06/2022", typetitre: "CD",
    volume:'50.92',nombregrumes:7,derniernumgrumme:4, dateabattage:"05/04/2019" },
       search: {},
  }),
  computed:{
    /*propriétés liées aux accès*/
    canExportLot(){return true},
 
  },

  mounted() {
    this.getDetailsEntite()
  },
 
 methods: {

  async getDetailsEntite() {
    this.showOverlay = true
    this.detailEntite= await this.$donneesReference.get('entites/' +this.$route.params.id).then(response => response.data.result)
    this.showOverlay = false
  },
  fermer() {this.$router.push({name: "entite_forestiere"});},

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
      actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

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
      
      actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
    }
  },
  },
 

}

</script>

<style scoped>



.button_telecharger{
  border: none !important;
  background: transparent !important;
  height: 40px;
  width: 40px;
  padding: 8px;
  cursor: pointer;
}
label{
  font-weight: normal !important;
}
.style{
  margin-left: 10px;
  font-weight: bold !important;
  font-style: 60px !important;
  color: rgb(19, 16, 16);
  padding: 3px 10px;
}

.form-control{
  height: 30px !important;
}

#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}

.b-card{
  background-color: transparent !important;
}
.b-col{
  margin-right: 16px;
}
.b-col .content{
  display: flex;
  flex-direction: column;
}


#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    overflow-x: hidden !important;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */




.simple-btn{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
  height: 45px;
  width: 45px;
}

.simple-btn:hover{
  background:none;
  border:none;
}
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white!important;
  border-color: white!important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44)!important;
  border-color: white!important;
  cursor: pointer;
}
.not-change-image-opacity:hover{
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}

#wrap:after {
    content:"";
    position:relative;
    margin-left:-20px;
    pointer-events:none;
    top: 15px;
    right:5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #8E97AF transparent transparent transparent;
}

.form-control{
  height: 30px !important;
}

#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
.position_absolute{
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card{
  background-color: transparent !important;
}
.b-col{
  margin-right: 16px;
}
.b-col .content{
  display: flex;
  flex-direction: column;
}
#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


</style>