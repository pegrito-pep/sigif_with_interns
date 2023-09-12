<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
        <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">consultation du tracking N°:345</span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span >
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
          </div>
          <div class="mt-5 pb-4">
            <b-row>
              <b-col cols="4">
                 <b-container fluid>
                     <div class="mt-4 pb-3" style="border-bottom: 4px solid #82C138;">
                  <b-row class="my-1">
                      <b-col sm="4">
                        Entité:
                       
                      </b-col>
                      <b-col sm="8">
                        <strong>{{ detailTracking.entite }}</strong>
                       
                      </b-col>
                    </b-row>
                    </div>
                    <b-row class="my-2">
                      <b-col sm="4">
                        Date certificat:

                        <label for="input-small"></label>
                      </b-col>
                      <b-col sm="8">
                        <strong>{{ detailTracking.datecertificat }}</strong>
                       
                      </b-col>
                    </b-row>
                  

                   
                     <b-row class="my-1">
                      <b-col sm="4">
                        Exercice:
                       
                      </b-col>
                      <b-col sm="8">
                        <strong>{{ detailTracking.exercice }}</strong>
                       
                      </b-col>
                    </b-row>
                     <b-row class="my-1">
                      <b-col sm="4">
                        Vente coupe no:
                       
                      </b-col>
                      <b-col sm="8">
                          <strong>{{ detailTracking.exercice }}</strong>
                      </b-col>
                    </b-row>
                     <b-row class="my-1">
                      <b-col sm="4">
                        Zone:
                        
                      </b-col>
                      <b-col sm="8"><strong>{{ detailTracking.zone }}</strong></b-col>
                    </b-row>
                     <b-row class="my-1">
                      <b-col sm="4">
                        Code barre:
                      </b-col>
                      <b-col sm="8"><strong>{{ detailTracking.codebarre }}</strong></b-col>
                    </b-row>
                     <b-row class="my-1">
                      <b-col sm="4">
                        Sequence no:
                      </b-col>
                      <b-col sm="8"><strong>{{ detailTracking.numsequence }}</strong></b-col>
                    </b-row>
                   
                 </b-container>
              </b-col>
              <b-col clos="8">
              <b-container fluid>
                <div class="mt-4 pb-3" style="border-bottom: 4px solid #82C138;">
                  <b-row class="my-1 ">
                      <b-col sm="4">Type de titre:<strong>{{ detailTracking.typetitre }}</strong></b-col>
                  </b-row>
                </div>
                <b-row class="my-1">
                  <b-col sm="4">
                    Certificat de matérialisation : <a v-if="detailTracking.tracking!==null" :href="detailTracking.tracking" target="_blank" v-b-tooltip.hover title="consulter">
                      <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                    </a>
                    
                  </b-col>
                </b-row>
                    <b-row class="my-1">
                      <b-col sm="8">
                         <div class="d-flex w-100">
                            <span>ATTESTATION DE MESURE DE SUPERFICIE :</span>
                            <a v-if="detailTracking.document!==null" :href="detailTracking.document" target="_blank" v-b-tooltip.hover title="consulter">
                              <svg style="width: 20px; height:20px" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img" fill="#2d2d2d" viewBox="0 0 24 24" class="icon-1mwsL css-1xqhio eac13zx0" aria-hidden="true"><path d="M14.504 3a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h3.085l-9.594 9.594a.5.5 0 000 .707l.707.708a.5.5 0 00.707 0l9.594-9.595V9.5a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6z"></path><path d="M5 3.002a2 2 0 00-2 2v13.996a2 2 0 001.996 2.004h14a2 2 0 002-2v-6.5a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v6.5L5 18.998V5.002L11.5 5a.495.495 0 00.496-.498v-1a.5.5 0 00-.5-.5H5z"></path></svg>
                            </a>
                            <span v-else class="mx-2">non rattaché</span>
                        </div>
                      </b-col>
                    </b-row>
            </b-container>
              
              </b-col>
            </b-row>
          </div>
      </b-overlay>
          
  

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

export default {
  name: "detail-tracking",

  data: () => ({
    detailTracking:{},
    showOverlay:false
  }),
  computed:{
  },
 
 methods: {
     fermer(){ this.$router.push({name: 'tracking_limites'});},
     async getDetailsTracking() {
            this.showOverlay = true
            this.detailTracking = await this.$inventaire.get('tracking/' +this.$route.params.id).then(response => response.data.result)
            if(this.detailTracking.datecertificat!=null&&this.detailTracking.datecertificat!=''){
              this.detailTracking.datecertificat=this.detailTracking.datecertificat.split('T')[0].replace(/-/g, "/")
            }
            this.showOverlay = false
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
  beforeMount() {
        this.getDetailsTracking()
  },
  }

</script>
<style scoped>
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
  bottom: 30px;
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


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius:  6px;
  margin-top: 10px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
  background-color: rgba(0, 82, 44, 0.89);
  border:none;
}
.search-bar-btn a{
  color:white
}
.search-bar-btn a:hover{
  font-weight: 600;
  font-style: italic;
  
}

.search-bar-custum-input{
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
}

.simple-btn{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
  cursor:pointer;
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
  cursor: not-allowed;
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

.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table td, .table th {
  padding: 5px 0;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
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
</style>