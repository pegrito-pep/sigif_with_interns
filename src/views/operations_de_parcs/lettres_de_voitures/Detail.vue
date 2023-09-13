<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
        <div>
            <b-row>
              <b-col><h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                </button><span class="ml-1 font-weight-bold">Consultation lettre de voiture N°{{ lettreV.idoperation }}</span></h4>
                  
                </b-col>
              <b-col class="col-md-auto">
                <span v-if="lettreV.statutenr=='Soumise'" class="d-flex justify-content-between">
                  <b-button v-if="isToValidate&&isMinfof" @click.prevent="validerLv" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Valider</b-button>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
                <span v-else-if="lettreV.statutenr=='Brouillon'" class="d-flex justify-content-between">
                  <b-button  @click.prevent="soumettreLv" size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Soumettre</b-button>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
                <span v-else>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
              </b-col>
            </b-row>
            <!--<tab-head
              title="Consultation lettre de voiture N°"
              :fermer="fermer"
              :toggleSideBar="toggleSideBar"
              :idElement="lettreV.idoperation "
            >
            </tab-head>-->
          </div>
          <div class="mt-4 pb-4" style="border-bottom: 2px solid #82C138;">
            <b-row>
              <b-col>
                 <b-container fluid>
                  <b-row class="my-1">
                      <b-col sm="4">
                        <span>Code Barre LV:</span>
                      </b-col>
                      <b-col sm="4">
                        <label>{{ lettreV.codebarre }}</label>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Type de bois:</span>
                      </b-col>
                      <b-col sm="8">
                         <label>{{ lettreV.libellecaslv }}</label>
                      </b-col>
                    </b-row>

                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Type de lettre de voiture:</span>
                      </b-col>
                      <b-col sm="8">
                        <label>{{ lettreV.libelletypeopeparc }}</label><span class="ml-1"> <b-badge pill variant="secondary">{{ lettreV.typeopeparc }}</b-badge></span>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Date de chargement :</span>
                      </b-col>
                      <b-col sm="8">
                        <label>{{ lettreV.datechargement }}</label>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>N° identifiant unique :</span>
                      </b-col>
                      <b-col sm="8">
                        <label v-if="lettreV.niu!=null">{{ lettreV.niu }}</label>
                        <label v-else>Non renseigné</label>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Mode de transport :</span>
                      </b-col>
                      <b-col sm="8">
                        <label>{{ lettreV.libellemodetransp }}</label>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Type de transport :</span>
                      </b-col>
                      <b-col sm="8">
                        <label>{{ lettreV.libelletypetransp }}</label>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col sm="4">
                        <span>Lettre de voiture vierge ? :</span>
                      </b-col>
                      <b-col sm="8">
                        <b-badge v-if="lettreV.estlvVierge==1" pill variant="danger">Oui</b-badge>
                        <b-badge v-else pill variant="success">Non</b-badge>
                      </b-col>
                    </b-row>
                 </b-container>
              </b-col>
              <b-col>
                <b-container fluid>
                <b-row v-if="lettreV.niuacheteur!=null" class="my-1">
                  <b-col sm="4">
                    <span for="input-small">N° unique de l'acheteur:</span>
                  </b-col>
                  <b-col sm="8">
                    <label>{{ lettreV.niuacheteur }}</label>
                  </b-col>
                </b-row>
                <b-row v-if="lettreV.nomtransporteur!=null" class="my-1">
                  <b-col sm="4">
                    <span for="input-small">Nom du transporteur:</span>
                  </b-col>
                  <b-col sm="8">
  
                    <label>{{ lettreV.nomtransporteur }}</label>
                  </b-col>
                </b-row>
                <b-row v-if="lettreV.niutransporteur!=null" class="my-1">
                  <b-col sm="4">
                    <span for="input-small">N° unique du transporteur:</span>
                  </b-col>
                  <b-col sm="8">
                    <label>{{ lettreV.niutransporteur }}</label>
                  </b-col>
                </b-row>
                <b-row v-if="lettreV.chauffeur!=null" class="my-1">
                  <b-col sm="4">
                    <span for="input-small">Nom du chauffeur:</span>
                  </b-col>
                  <b-col sm="8">
                    <label>{{ lettreV.chauffeur }}</label>
                  </b-col>
                </b-row>
                <b-row v-if="lettreV.immatriculation" class="my-1">
                  <b-col sm="4">
                    <span for="input-small">N° d'Immatriculation du véhicule:</span>
                  </b-col>
                  <b-col sm="8">
                    <label>{{ lettreV.immatriculation }}</label>
                  </b-col>
                </b-row>

                      <b-row class="my-1">
                        <b-col sm="4">
                          <span for="input-small">Site de départ:</span>
                        </b-col>
                        <b-col sm="8">
                          <label>{{ lettreV.intitulesitedepart }}</label>
                          <span class="ml-1"><b-badge pill variant="secondary">{{ lettreV.typesitedepart }}</b-badge></span>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="4">
                          <span for="input-small">Site de destination:</span>
                        </b-col>
                        <b-col sm="8">
                          <label>{{ lettreV.intitulesitedest }}</label>
                          <span class="ml-1"><b-badge pill variant="secondary">{{ lettreV.typesitedestination }}</b-badge></span>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="4">
                          <span for="input-small">Statut</span>
                        </b-col>
                        <b-col sm="8">
                          <span class="ml-1"><b-badge pill :variant="variant">{{ lettreV.statutenr }}</b-badge></span>
                        </b-col>
                      </b-row>
                </b-container>
              </b-col>
            </b-row>
       
          </div>
          <div class="m-0 px-2">
            <b-row style="border: 2px solid #82C138;">
              <b-col class="d-flex">
                <h4 class="tab-header-left-text mb-0"> Liste des élements </h4>
                <a style="cursor: pointer" @click.prevent="imprimer" :disabled="!canPrintLettreVoiture" size="sm" class="mx-2 simple-btn" :class="{'change-image-opacity': !canPrintLettreVoiture,  'not-change-image-opacity': canPrintLettreVoiture}"><b-img  src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>
                  imprimer
                </a>
                <a style="cursor: pointer" size="sm" class="mx-2 simple-btn"><b-img  src="@/assets/images/excel.png"></b-img>
                  exporter
                </a>
                <h3 v-if="lettreV.typeopeparc=='LVG'" class="mx-2"><b-badge variant>{{ lettreV.nbrgrume }} Grume<span v-if="lettreV.nbrgrume>1">s</span></b-badge></h3> 
                <h3 v-if="lettreV.typeopeparc=='LVG'" class="mx-2"><b-badge><b>{{ lettreV.volumegrume  }} m <sup>3</sup></b></b-badge></h3> 
              </b-col>
              <b-col class="col-md-auto">
                <b-row class="d-flex justify-content-center align-items-center">
                  <b-col cols="5"><label for="" class="h-100 d-flex justify-content-end align-items-end">Code Barre</label></b-col>
                  <b-col cols="7"><b-form-input v-model="search" class="mt-1 px-2 form-control-xs"></b-form-input></b-col>
                </b-row>
                <!--<div class="d-flex">
                  <label for="">Code Barre</label>
                  <b-form-input class="px-2 form-control-xs"></b-form-input>
                </div >-->

              </b-col>
            </b-row>
          </div>
          <div class="mt-4 pb-4" style="border-bottom: 4px solid #82C138;">
            <!--DEBUT SPECIFICITES LETTRE DE VOITURE GRUME-->
            <b-container fluid v-if="lettreV.typeopeparc=='LVG'">
              <div class="ml-1 mr-1">
                <b-table sticky-header="250px" :busy="isBusyBillons" hover select-mode="single" responsive="sm" :items="items"  :fields="fields" :tbody-tr-class="rowClassBillons" ref="tableGrumes" selectable @row-selected="onRowSelected" show-empty>
                   <template v-slot:head(codebarre)="data"><span v-html="data.field.label"  style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(numdf10)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(diametrepb)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(diametregb)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(abandonner)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(position)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                     <template #table-busy>
                       <div class="text-center text-success my-2">
                         <b-spinner class="align-middle"></b-spinner>
                         <strong class="ml-1">chargement...</strong>
                       </div>
                     </template>
                       <template #empty>
                         <h4 style="color:green" class="text-center">Aucun détail trouvé !!</h4>
                       </template>
                      
                       <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                       <template #cell(codebarre)="data">
                         <div>
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                         </div>
                       </template> 
                       <template #cell(sequence)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                       </template> 
                       <template #cell(essence)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.essence" />
                       </template> 
                       <template #cell(numdf10)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
                       </template> 
                       <template #cell(diametrepb)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dpb" />
                       </template> 
                       <template #cell(diametregb)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dgb" />
                       </template> 
                       <template #cell(longueur)="data">
                        <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                       </template>
                       <template #cell(volume)="data">
                          <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                       </template>
                </b-table>
                <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
              </div>
            </b-container>
            <!--FIN SPECIFICITES LETTRE DE VOITURE GRUME-->
            <!--DEBUT SPECIFICITES LETTRE DE VOITURE DEBITE-->
            <b-container fluid v-if="lettreV.typeopeparc=='LVD'">
              <div class="ml-1 mr-1 w-75">
                <b-table sticky-header="250px" :busy="isBusyDetailsDebites" hover select-mode="single" responsive="sm" :items="itemsLvd"  :fields="fieldsLvd" :tbody-tr-class="rowClassBillons" ref="tableBillons" selectable @row-selected="onRowSelected" show-empty>
                   <template v-slot:head(codebarre)="data"><span v-html="data.field.label"  style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(reference)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                   <template v-slot:head(nomcommercial)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
          
                     <template #table-busy>
                       <div class="text-center text-success my-2">
                         <b-spinner class="align-middle"></b-spinner>
                         <strong class="ml-1">chargement...</strong>
                       </div>
                     </template>
                       <template #empty>
                         <h4 style="color:green" class="text-center">Aucun détail trouvé !!</h4>
                       </template>
                      
                       <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                       <template #cell(codebarre)="data">
                         <div>
                          <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white" placeholder="" v-model="data.item.codebarre" />
                         </div>
                       </template> 
                       <template #cell(reference)="data">
                          <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white" placeholder="" v-model="data.item.reference" />
                       </template> 
                       <template #cell(nomcommercial)="data">
                          <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white" placeholder="" v-model="data.item.nomcommercial" />
                       </template> 
                       
                </b-table>
                <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />
              </div>
            </b-container>

      
          <!--FIN SPECIFICITES LETTRE DE VOITURE GRUME-->
          <!--DEBUT SPECIFICITES LETTRE DE VOITURE DEBITE-->
          <div class="m-0 px-2" v-if="lettreV.typeopeparc=='LVD'">
            <b-row style="border: 2px solid #82C138;">
              <b-col class="d-flex">
                <h4 class="tab-header-left-text mb-0"> Détail des débités </h4>
                <b-button  size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>imprimer</b-button>
                <b-button  size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/excel.png"></b-img>Exporter</b-button>
               
              </b-col>
            </b-row>
          </div>
          <b-container fluid v-if="lettreV.typeopeparc=='LVD'">
            <div class="ml-1 mr-1">
              <b-table sticky-header="250px" :busy="isBusyDetailsDebites" hover select-mode="single" responsive="sm" :items="itemsDetailsDebites"  :fields="fieldsDetailsDebites" :tbody-tr-class="rowClassBillons" ref="tableBillons" selectable @row-selected="onRowSelected" show-empty>
                 <template v-slot:head(codebarre)="data"><span v-html="data.field.label"  style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(nombrepiece)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(poids)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(superficie)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
                 <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green; font-size:0.8rem"></span></template>
        
                   <template #table-busy>
                     <div class="text-center text-success my-2">
                       <b-spinner class="align-middle"></b-spinner>
                       <strong class="ml-1">chargement...</strong>
                     </div>
                   </template>
                     <template #empty>
                       <h4 style="color:green" class="text-center">Aucun détail trouvé !!</h4>
                     </template>
                    
                     <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                     <template #cell(codebarre)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white" placeholder="" v-model="data.item.codebarre" />
                     </template> 
                     <template #cell(epaisseur)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.epaisseur" />
                     </template> 
                     <template #cell(largeur)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.largeur" />
                     </template>
                     <template #cell(longueur)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.longueur" />
                     </template> 
                     <template #cell(nombrepiece)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.nombrepiece" />
                     </template>
                     <template #cell(piods)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.piods" />
                     </template>
                     <template #cell(superficie)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.superficie" />
                     </template>
                     <template #cell(volume)="data">
                      <b-form-input disabled size="sm" class="w-75 py-0 px-2 m-0 change_bg" style="height: 20px !important; color:black; border: 1px solid white; text-align:right" placeholder="" v-model="data.item.volume" />
                     </template>      
                     
              </b-table>
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />
            </div>
          </b-container>
            
            <!--FIN SPECIFICITES LETTRE DE VOITURE DEBITE-->
            <operation-parc-box @echecopeparc="displayError" @succesopeparc="reloadPage" ref="opeparcDialogue"></operation-parc-box>
            <error-dialogue ref="errorDialogue"></error-dialogue>

          </div>
      </b-overlay>
          
  

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import OperationParcBox from '@/components/utils/operation_de_parc/ConfirmBoxDetail.vue';
  import ErrorDialogue from '@/components/utils/AlertBox.vue';
  import { mapGetters } from 'vuex';
 
export default {
  name: "detail-lettres_de_voiture",
  components: {
    OperationParcBox,
    ErrorDialogue
  },
  data: () => ({
    //isToValidate:false,
    lettreV:{},
    isBusyBillons:false,
    showOverlay:false,
    typesLv:[],
    typesB:[],
    lettre:{},
    search: null,
    isBusyDetailsDebites:false,
    fieldsDetailsDebites:[
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre", thStyle: { width: "10%" }},
        { key: "epaisseur", label: "epaisseur" },
        { key: "largeur", label: "largeur" },
        {key:"longueur", label:"Longueur de la pièce"},
        { key: "nombrepiece", label: "Nbre de pièces", thStyle: { width: "15%" } }, 
        { key: "piods", label: "Poids", thStyle: { width: "12%" } },
        { key: "superficie", label: "Superficie", thStyle: { width: "12%" } },  
        { key: "volume", label: "Volume (m3)", thStyle: { width: "9%" }  }, ],
    itemsDetailsDebites:[],
    bois:{},
    fields: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre", thStyle: { width: "10%" }},{ key: "sequence", label: "Séquence" },
        {key:"numdf10", label:" N° de la grume"},
        { key: "essence", label: "Nom Commercial", thStyle: { width: "15%" } }, 
        { key: "diametrepb", label: "Diamètre Petit bout", thStyle: { width: "12%" } },
        { key: "diametregb", label: "Diamètre Gros bout", thStyle: { width: "12%" } }, 
        { key: "longueur", label: "Longueur(m)", thStyle: { width: "9%" } }, 
        { key: "volume", label: "Volume (m3)", thStyle: { width: "9%" }  }, 
    ],
    fieldsLvd: [
        { key: "index", label: "", thStyle: { width: "2%" } },
        { key: "codebarre", label: "code barre", thStyle: { width: "10%" }},
        { key: "reference", label: "Séquence", thStyle: { width: "15%" }  },
        { key: "nomcommercial", label: "Nom Commercial", thStyle: { width: "25%" }}, 
    ],
    itemsLvd:[],
    trueItemsLvd:[],
    elements:[],
    trueElements:[],
    perPage: 10,
    currentPage: 1,
    total: 0
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    /*propriétés liées aux accèes*/
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
    variant(){
      if(this.lettreV.statutenr=='Validée'){
        return 'success'
      }else if(this.lettreV.statutenr=='Brouillon'){
        return 'danger'
      }else{
        return 'secondary'
      }
    },
    isToValidate(){
      if(!php.empty(this.lettreV)&&this.lettreV.statutenr=='Soumise'){
        return true;
      }
      return false; 
    },
    canPrintLettreVoiture(){return true; return this.hasAccess('IMPRIMER_LETTRES_DE_VOITURE');},
    items() { 
      //return this.elements.map((a, index) => {  
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0 
        a.isOdd = index %2 !== 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
   
  },
  watch:{
    elements(value){
      if(!php.empty(value)){
      setTimeout(() => {this.$refs['tableGrumes'].selectRow(0) }, 200);
      }
    },
    search(value) {
        if(this.lettreV.typeopeparc=='LVG'){
            this.elements = !php.empty(value)
            ? this.elements.filter(elt =>
                elt.codebarre.toLowerCase().includes(value.toLowerCase()) 
                )
            : this.trueElements;
        }else if(this.lettreV.typeopeparc=='LVD'){
            this.itemsLvd = !php.empty(value)
            ? this.itemsLvd.filter(elt =>
                elt.codebarre.toLowerCase().includes(value.toLowerCase()) 
                )
            : this.trueItemsLvd;
        }
      
    
    }
 },
 methods: {
  async displayError(error){
    this.$refs.opeparcDialogue._close();
    const ok = await this.$refs.errorDialogue.show({
          title: 'Information',
          message: error,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorDialogue._close();
        } else {
          this.$refs.errorDialogue._close();
        }
  },
  reloadPage(){
    this.$refs.opeparcDialogue._close();
    storage.remove('commandedetailLv'); 
    this.getDetailsLettre()
  },
  soumettreLv(){
      this.alertBeforeact('1')
    },
    validerLv(){
      this.alertBeforeact('2')
    },
    async alertBeforeact(commande){
      let title, message=''
      if(commande=='1'){
        title='Soumission'
        message='ètes-vous sur de vouloir soumettre cette opération ?'
      }
      else if(commande=='2'){
        title='rejet'
        message='ètes-vous sur de vouloir valider cette opération ?'

      }
      const ok = await this.$refs.opeparcDialogue.show({
        commande:commande,
        title: commande==1?'Soumission':'Validation',
        origine:'lv',
        message:message,
        idoperation:this.lettreV.idoperation, 
        okButton: 'Oui',
        cancelButton: "Non",
      })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
              
              this.$refs.opeparcDialogue._close();
            } else {
               this.$refs.opeparcDialogue._close();
            }
    },
  imprimer(){
    let url=''
    if(this.lettreV.typeopeparc=='LVG'){
      url=this.$JasperReport+'/JasperReport/lvg/'+this.lettreV.idoperation;
    } 
    else if(this.lettreV.typeopeparc=='LVD'){
      url=this.$JasperReport+'/JasperReport/lvd/'+this.lettreV.idoperation;
    } 
    var a = document.createElement('a');
    a.href = url;
    a.setAttribute('target', '_blank');
    a.click();
  },
     fermer(){ this.$router.push({name: 'lettres-voiture'});},
     async getDetailsLettre() {
      const params = this.getRequestParams(
          this.currentPage,
          this.pageSize
        );
        this.showOverlay = true
        this.lettreV = await this.$operationParc.get('lettres-voiture/' +this.$route.params.id, {params}).then(response => response.data.result)
        this.total = this.lettreV.listeElements.totalItems
        this.currentPage = this.lettreV.listeElements.currentPage + 1
        if(this.lettreV.dateoper!=null&&this.lettreV.dateoper!=''){
          this.lettreV.dateoper=this.lettreV.dateoper.split('T')[0].replace(/-/g, "/")
        }
        if(this.lettreV.datechargement!=null&&this.lettreV.datechargement!=''){
          this.lettreV.datechargement=this.lettreV.datechargement.split('T')[0].replace(/-/g, "/")
        }
        if(this.lettreV.heureoper!=null&&this.lettreV.heureoper!=''){
          this.lettreV.heureoper=this.lettreV.heureoper.split('T')[1]
          this.lettreV.heureoper=this.lettreV.heureoper.split('.')[0]
        }
        if(this.lettreV.typeopeparc=='LVG'){
          if(this.lettreV.listeElements.details.length>0){
          this.elements=this.trueElements=this.lettreV.listeElements.details
        } 
        } 
        if(this.lettreV.typeopeparc=='LVD'){
          if(this.lettreV.listeElements.details.length>0){
            this.itemsLvd= this.lettreV.listeElements.details
            this.itemsDetailsDebites= this.lettreV.listeElements.details[0].debites
        } 
          
        }       
        this.lettreV.volumegrume = this.lettreV.volumegrume!=null?this.lettreV.volumegrume.toFixed(3):''
        this.showOverlay = false
     },
      getRequestParams(page, pageSize){
        let params= {
          page: 0,
          size: pageSize || 10
        };
        if(page && page > 0) {
          params.page= page -1
        }
        return params;
      },
      changePage(page) {
        this.currentPage = page
        this.getDetailsLettre()
      },

     onRowSelected(items) {
      if(this.lettreV.typeopeparc=='LVD'){
        this.itemsDetailsDebites= items[0].debites
      }
      console.log('row selected',items);
    },
    rowClassBillons(item, type) {
    if(item !=''&&item!=null){
       return ''
    }else{
      return 
    }
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
    this.getDetailsLettre()
  },
  }

</script>
<style scoped>

.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.form-control{
  height: 30px !important;
}
#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
.change_bg{
  background:#82C138
}
.form-control-xs {
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
  line-height: 1.5;
  border-radius: .2rem;
  border: 1px solid darkgreen;
  width: 100%;
  font-weight: 800;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: .25rem;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
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

.simple-btn {
  background: none;
  border: none;
  color: #82C138;
  font-weight: bold;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

/*style barre de recherche */


.search-bar-custum-input{
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
}

 .disabled {
    pointer-events:none;
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
 }


</style>