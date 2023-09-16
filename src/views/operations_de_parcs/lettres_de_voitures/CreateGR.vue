<template>
  <div id="cover" class="min-vh-100">

     <b-overlay :show="shoverlaySites" rounded="sm">
        <template #overlay>
          <div class="text-center">
            <i class="fas fa-2x fa-sync fa-spin"></i>
            <p id="cancel-label">Chargement...</p>
          </div>
        </template>

          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
              <span class="form_title">Création Lettre de voiture </span>
              </h4>
              </b-col> 
              <!--<b-col v-if="lettrev.typelv=='LVG'" class="d-flex justify-content-center align-items-center" cols="6">
                  <span class=" form_title"> Titre N°<span class="font-weight-bold"> 2000</span><span class="text-muted"> ( concéssion forrestière en covention définitive )</span></span>
              </b-col>-->
            <b-col class="col-md-auto">
              <span class="d-flex justify-content-between">
                <a v-if="lettrev.lvvierge=='true'" class="d-flex justify-content-center align-items-center mt-1">
                  <input type="number" v-model="lettrev.nbr" class="p-1" style="width: 60px; height:26px; border-radius: 1em"/><span style="color:black; font-weight: bold;">quantité</span> 
                </a>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="enregistrer" :disabled="submitted"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!--ENTETE CREATION Lv -->

            <div>
              <b-row>
                <!--ELEMENTS DE GAUCHE-->
                <b-col cols="6">
                  <b-row class="mx-2">
                    <b-col cols="4">
                          <span  class="m-0 py-2" style="color: #333333;">{{ 'Lettre de voiture vièrge'}}</span>
                    </b-col>
                    <b-col cols="8">
                      <div class="mt-1">
                        <b-form-checkbox  v-model="lettrev.lvvierge" name="checkbox-1" value="true"
                        unchecked-value="false"  id="statut"></b-form-checkbox>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Type de bois</span>
                    </b-col>
                    <b-col cols="8">
                        <select v-model="lettrev.caslv" :class="{ styleToSet: notSetcaslv }" class="default-old-system-select-properties w-100">
                          <option value=""></option>
                          <option v-for="caslv in typesBois" :key="caslv.valeur"  :value="caslv.valeur"> {{ caslv.libelle }}</option>
                        </select>
                    </b-col>
                  </b-row>
                  <b-row class="my-1">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Type de LV</span>
                    </b-col>
                    <b-col cols="8">
                        <select disabled v-model="lettrev.typelv" :class="{ 'styleToSet': notSetTypelv }" class="default-old-system-select-properties w-75">
                          <option value=""></option>
                        <option v-for="typelv in typelvs" :key="typelv.value"  :value="typelv.value"> {{ typelv.intitule }}</option>
                        </select>
                    </b-col>
                  </b-row>
                 
                  <b-row v-if="lettrev.lvvierge=='false'" class="my-1">
                    <b-col  cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Date de chargement</span>
                    </b-col>
                    <b-col  cols="8">
                      <input class="sigif-input-date" type="date" v-model="lettrev.datechargement" format="YYYY-MM-DD"  :class="{'styleToSet': notSetDatechargement }"/><br>
                    </b-col>
                  </b-row>
                  <b-row v-if="lettrev.lvvierge=='false'" class="my-1">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Mode de transport</span>
                    </b-col>
                    <b-col cols="8">
                      <select v-model="lettrev.modetransport"  :class="{ 'styleToSet': notSetmodetransport }" class="default-old-system-select-properties w-50">
                          <option value=""></option>
                        <option v-for="mode in modesTransport" :key="mode.value"  :value="mode.value"> {{ mode.libelle }}</option>
                      </select>
                    </b-col>
                  </b-row>
                  <!--DEBUT MODE DE TRANSPORT EN CONTENEUR-->
                  <span v-if="lettrev.modetransport=='ECR'">
                    <b-row class="my-1" >
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> N° de plomb</span>
                      </b-col>
                      <b-col cols="8">
                          <b-form-input v-model="lettrev.numplomb" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> N° du conteneur</span>
                      </b-col>
                      <b-col cols="8">
                          <b-form-input v-model="lettrev.numconteneur" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1" >
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Taille du conteneur</span>
                      </b-col>
                      <b-col cols="8">
                        <select v-model="lettrev.tailleconteneur" :class="{ 'styleToSet': notSetcaslv }" class="default-old-system-select-properties w-50">
                          <option value=""></option>
                          <option v-for="taille in taillesconteneur" :key="taille"  :value="taille"> {{ taille }}</option>
                        </select>
                      </b-col>
                    </b-row>
                    <b-row class="my-1" >
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> N° du rapport d'empottage</span>
                      </b-col>
                      <b-col cols="8">
                          <b-form-input v-model="lettrev.numrapportempottage" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </b-row>
                  </span>
                  <!--FIN MODE TRANSPORT EN CONTENEUR-->

                  <b-row v-if="lettrev.lvvierge=='false'" class="my-1">
                    <b-col cols="4">
                      <span style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Type de transport</span>
                    </b-col>
                    <b-col cols="8">
                        <select v-model="lettrev.typetransport" class="default-old-system-select-properties w-50">
                          <option value=""></option>
                        <option v-for="typetransport in typesTransports" :key="typetransport.libelle"  :value="typetransport.value"> {{ typetransport.libelle }}</option>
                        </select>
                    </b-col>
                  </b-row>
                  <b-row class="my-1" v-if="lettrev.typetransport=='VFL'">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;"> commentaire</span>
                    </b-col>
                    <b-col cols="8">
                        <input type="textarea" v-model="lettrev.commentaire" class="my-1 w-50"  name="txtname" rows="6" cols="100" maxlength="600"/>
                    </b-col>
                  </b-row>
                  <b-row class="my-1" v-if="lettrev.caslv=='OD'">
                    <b-col cols="4">
                      <span style="color: #333333; display: flex; justify-content: end;"> Particulier</span>
                    </b-col>
                    <b-col  cols="8">
                      <b-form-checkbox value=true  unchecked-value=false v-model="lettrev.particulier"></b-form-checkbox>
                    </b-col>
                  </b-row>
                  <!--DEBUT SEULEMENT SI PARTICULIER-->
                  <b-overlay :show="showOverlayParticulier" rounded="sm">
                    <b-row v-if="lettrev.particulier=='true'" class="my-1">
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Arrondissement</span>
                      </b-col>
                      <b-col cols="8">
                        <v-select v-model="lettrev.arrondissement" :options="paginatedarrondissements" :filterable="false" @search="onSearchArrondissement" label="intitule" class="custom-select-type_titre  w-50" :reduce="arrond => arrond.idarrondissement">
                            <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPagearrondissements" @click="(offsetarrondissements -= limitarrondissements)">Prèc.</button>
                                <button :disabled="!hasNextPagearrondissements" @click="(offsetarrondissements += limitarrondissements)">Suiv.</button>
                            </li>
                        </v-select>
                      </b-col>
                    </b-row>
                    <b-row v-if="lettrev.particulier=='true'" class="my-1">
                      <b-col cols="4">
                        <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Localité</span>
                      </b-col>
                      <b-col cols="8">
                        <b-form-input v-model="lettrev.localite" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </b-row>
                  </b-overlay>
                  <!--FIN SEULEMENT SI PARTICULIER-->
                </b-col>
                <!--ELEMENTS DE DROITE-->
                <b-col cols="6">
                  <b-row class="my-1" v-if="lettrev.caslv=='OD'">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"> N° unique acheteur(NIU)</span>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="lettrev.niuachetteur" class="form-control-xs my-1 w-50"></b-form-input>
                    </b-col>
                  </b-row>
                
                  <!--DEBUT N'APPARAIT QUE SI LA LV N'EST PAS VIERGE-->
                  <b-row class="my-1" v-if="lettrev.lvvierge=='false'">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"> Nom du transporteur</span>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="lettrev.nomtransporteur" class="form-control-xs my-1 w-50"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row v-if="lettrev.lvvierge=='false'"  class="my-1">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"> N° unique du transporteur (NIU)</span>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="lettrev.niutransporteur" class="form-control-xs my-1 w-50"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row  class="my-1" v-if="lettrev.lvvierge=='false'">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Nom du chauffeur</span>
                    </b-col>
                    <b-col cols="7">
                        <b-form-input v-model="lettrev.chauffeur" class="form-control-xs my-1 w-50"></b-form-input>
                    </b-col>
                  </b-row>
                  <b-row class="my-1" >
                    <span v-if="lettrev.typetransport=='R'" class="d-flex w-100">
                      <b-col cols="5">
                        <span  style="color: #333333; display: flex; justify-content: start;"> N° d'immatriculation du véhicule</span>
                      </b-col>
                      <b-col cols="7">
                          <b-form-input v-model="lettrev.immatriculation" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </span>
                    <span v-else-if="lettrev.typetransport=='VF'||lettrev.typetransport=='VFL'" class="d-flex w-100">
                      <b-col cols="5">
                        <span  style="color: #333333; display: flex; justify-content: end;"> N° du wagon</span>
                      </b-col>
                      <b-col cols="7">
                          <b-form-input v-model="lettrev.numwagon" class="form-control-xs my-1 w-50"></b-form-input>
                      </b-col>
                    </span>
                    
                  </b-row>
                  <b-row v-if="lettrev.caslv!=''" class="my-1">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Site de départ</span>
                    </b-col>
                    <b-col cols="7">
                      <v-select @input="loadSitesDestination" v-model="lettrev.sitedepart" :options="paginatedSitesdepart" :filterable="false" @search="onSearchSitedepart" label="INTITULE" class="custom-select-type_titre  w-50" :reduce="site => site.IDSITEOPER"  :class="{'styleToSet': notSetSitedepart }">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageSitesdepart" @click="(offsetdep -= limitdep)">Prèc.</button>
                              <button :disabled="!hasNextPageSitesdepart" @click="(offsetdep += limitdep)">Suiv.</button>
                          </li>
                      </v-select>
                    </b-col>
                  </b-row>
                  <b-row v-if="lettrev.caslv!=''" class="my-1">
                    <b-col cols="5">
                      <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span> Site de destination</span>
                    </b-col>
                    <b-col cols="7">
                      <v-select :disabled="notsetSiteDepart" v-model="lettrev.sitedestination" :options="paginatedSitesdestination" :filterable="false" @search="onSearchSitedestination" label="INTITULE" class="custom-select-type_titre  w-50" :reduce="site => site.IDSITEOPER" :class="{'styleToSet': notSetSitedestination }">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageSitesdestination" @click="(offsetdest -= limitdest)">Prèc.</button>
                              <button :disabled="!hasNextPageSitesdestination" @click="(offsetdest += limitdest)">Suiv.</button>
                          </li>
                      </v-select>
                    </b-col>
                  </b-row>
                </b-col>
         
              </b-row>
            </div>
          
            <!--GESTION TABLEAU DES CODES BARRES-->
            <div v-if="lettrev.lvvierge=='false'" style="height: 600px; overflow-y: auto; overflow-x: hidden;">
              <div class="m-4 px-2 table-header-border mt-5">
                <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des éléments</h4></b-col>
                    <b-col class="liens">
                      <a style="cursor: pointer" @click.prevent="addFieldGrume" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                      <a style="cursor: pointer" @click.prevent="removeAllFieldsGrumes"  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Tout supprimer</a>
                      <a style="cursor: pointer" @click.prevent="showImportSection" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                    </b-col>
                </b-row>
              </div>
              <b-overlay class="m-4 px-2" rounded="sm" :show="showOverlayCodeData">
                <b-table v-if="lettrev.typelv=='LVG'" height="50px" :items="itemsgrumes"  :fields="fieldsgrumes" class="mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                  <template v-slot:head(codebarre)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(sequence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(essence)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(numdf10)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(dpb)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(dgb)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(longueur)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  <template v-slot:head(volume)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  
                  <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                  
                  <template #cell(codebarre)="data">
                    <input :disabled="isToDisable" size="xs" @keydown.tab.prevent="checkCodebarreLv($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.codebarre" />
                  </template>
                  <template #cell(sequence)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.sequence" />
                  </template>
                  <template #cell(numdf10)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.numdf10" />
                  </template>
                  <template #cell(essence)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.essence" />
                  </template>
                  <template #cell(dpb)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dpb" />
                  </template>
                  <template #cell(dgb)="data">
                    <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.dgb" />
                  </template>
                  <template #cell(longueur)="data">
                    <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.longueur" />
                  </template>
                  <template #cell(volume)="data">
                    <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volume" />
                  </template>
                  <template #cell(action)="data">
                    <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFieldGrumes(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                  </template>
                
                </b-table>
              
              </b-overlay>
            </div>
     </b-overlay>
     <error-dialogue ref="errorbox"></error-dialogue>
     <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
     <file-component ref="filecomponent" @importsuccessfullgrumes="handleDataImportedGrumes" @importsuccessfulldebites="handleDataImportedDebite" :dto="dto"></file-component>
     <display-error ref="errorscreationinfo"></display-error>

  </div>

</template>

<script>
const php = require('phpjs');
import Calendar from 'vue2-slot-calendar';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import arrondissements from '@/data/arrondissements.js'
import { mapGetters } from 'vuex';
import FileComponent from '@/components/utils/operation_de_parc/ImportLettreVoitureFIle.vue';
import DisplayError from '@/components/utils/operation_de_parc/DisplayError.vue';

export default {
  name:"lettrelv-form",
  components:{
    Calendar,
    CodeBarreInfo,
    ErrorDialogue,
    FileComponent,
    DisplayError
  },
   computed: {
    ...mapGetters(['user','hasAccess']),
    isToDisable(){ 
      if(!php.empty(this.selected)){
        return php.empty(this.selected.sequence)
      }
      else{
        return false;
      }

    },
    notsetSiteDepart(){
      return php.empty(this.lettrev.sitedepart)
    },
    modeconteneur(){
      return (this.lettrev.modetransport=='ECR')
    },
    itemsgrumes(){
      return this.elementsgrumes.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdebites(){
      return this.elementsdebites.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsdetailsdebites(){
      return this.elementsdetailsdebites.map((a, index) => {
        a.largeur = a.largeur!=null? a.largeur*100:0
        a.longueur = a.longueur!=null? a.longueur*100:0
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
      filteredSitesdepart() {
        return this.sitesdepart.filter((site) =>
          site.INTITULE.toLocaleLowerCase().includes(this.searchsitedepart.toLocaleLowerCase())
        )
      },
      paginatedSitesdepart() {
        return this.filteredSitesdepart.slice(this.offsetdep, this.limitdep + this.offsetdep)
      },
      hasNextPageSitesdepart() {
        const nextOffset = this.offsetdep + this.limitdep
        return Boolean(
          this.filteredSitesdepart.slice(nextOffset, this.limitdep + nextOffset).length
        )
      },
      hasPrevPageSitesdepart() {   
        const prevOffset = this.offsetdep - this.limitdep
        return Boolean(
          this.filteredSitesdepart.slice(prevOffset, this.limitdep + prevOffset).length
        )
      },

      filteredSitesdestination() {
        return this.sitesDestination.filter((site) =>
          site.INTITULE.toLocaleLowerCase().includes(this.searchsitedestination.toLocaleLowerCase())
        )
      },
      paginatedSitesdestination() {
        return this.filteredSitesdestination.slice(this.offsetdest, this.limitdest + this.offsetdest)
      },
      hasNextPageSitesdestination() {
        const nextOffset = this.offsetdest + this.limitdest
        return Boolean(
          this.filteredSitesdestination.slice(nextOffset, this.limitdest + nextOffset).length
        )
      },
      hasPrevPageSitesdestination() {   
        const prevOffset = this.offsetdest - this.limitdest
        return Boolean(
          this.filteredSitesdestination.slice(prevOffset, this.limitdest + prevOffset).length
        )
      },

      filteredCode() {
        return this.codes.filter((code) => code.codebarre.toLocaleLowerCase().includes(this.searchcode.toLocaleLowerCase()))
      },
      paginatedCode() {
        return this.filteredCode.slice(this.offsetcode, this.limitcode + this.offsetcode)
      },
      hasNextPageCode() {
        const nextOffset = this.offsetcode + this.limitcode
        return Boolean(
          this.filteredCode.slice(nextOffset, this.limitcode + nextOffset).length
        )
      },
      hasPrevPageCode() {   
        const prevOffset = this.offsetcode - this.limitcode
        return Boolean(
          this.filteredCode.slice(prevOffset, this.limitcode + prevOffset).length
        )
      },

      filteredarrondissements() {
        return this.arrondissements.filter((arrond) => arrond.intitule.toLocaleLowerCase().includes(this.searcharrondissement.toLocaleLowerCase()))
      },
      paginatedarrondissements() {
        return this.filteredarrondissements.slice(this.offsetarrondissements, this.limitarrondissements + this.offsetarrondissements)
      },
      hasNextPagearrondissements() {
        const nextOffset = this.limitarrondissements + this.limitarrondissements
        return Boolean(
          this.filteredarrondissements.slice(nextOffset, this.limitarrondissements + nextOffset).length
        )
      },
      hasPrevPagearrondissements() {   
        const prevOffset = this.offsetarrondissements - this.limitarrondissements
        return Boolean(
          this.filteredarrondissements.slice(prevOffset, this.limitarrondissements + prevOffset).length
        )
      },
     

   },

   watch: {
    elementsgrumes(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTablegrumes'].selectRow(0) }, 200);
      }
    },
    elementsdebites(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTabledebites'].selectRow(0) }, 200);
      }
    }, 
    "lettrev.caslv"(value) {
      if(value!==null&&value.length!==''){
          this.notSetcaslv= false
      }
      else{
          this.notSetcaslv= true
      }
    },
    "lettrev.typelv"(value) {
      if(value!==null&&value.length!==''){
          this.notSetTypelv= false
      }
      else{
          this.notSetTypelv= true
      }
    },
    "lettrev.sitedepart"(value) {
      if(!php.empty(value)){
          this.notSetSitedepart= false
      }
      else{
          this.notSetSitedepart= true
      }
    },
    "lettrev.sitedestination"(value) {
      if(!php.empty(value)){
          this.notSetSitedestination= false
      }
      else{
          this.notSetSitedestination= true
      }
    },
    "lettrev.datechargement"(value) {
      if(value!==null&&value.length!==''){
          this.notSetDatechargement= false
      }
      else{
          this.notSetDatechargement= true
      }
    },
    "lettrev.modetransport"(value) {
      if(value!==null&&value.length!==''){
        this.notSetmodetransport= false
      }
      else{
        this.notSetmodetransport= true
      }
    },
    "lettrev.sitedepart"(value) {
      if(php.empty(value)){
        this.sitesDestination=[];
        this.lettrev.sitedestination= ''
      }
    }
  },
   data: () => ({
      isFirstIndex:0,
      notSetTypelv:false,
      notSetSitedepart:false,
      notSetSitedestination:false,
      elementsgrumes: [],
      elementsdebites:[],
      searcharrondissement:'',
      arrondissements: arrondissements,
      offsetarrondissements:0,
      limitarrondissements: 10,
      showOverlayParticulier: false, // overlay de chargement des arrondissements
      showOverlayCodeData: false, //overlay de gestion du chargement des donnés codesbarres
      offsetcode:0,
      limitcode: 10,
      searchcode:'',
      codes:[],
      submitted: false,
      submittedcontinue: false,
      shoverlaySites:false, 
      loadData:false,
      lettrev:{
        localite:'',
        arrondissement:'',
        particulier:"",
        lvvierge: 'false',
        nbr:1,
        typelv: "LVG",
        caslv: "",
        modetransport:"",
        typetransport:"",
        datechargement:"",
        chauffeur:"",
        numwagon:"",
        niutransporteur: "",
        immatriculation:"",
        sitedepart: "",
        sitedestination: "",
        numplomb:'',
        numconteneur:'',
        tailleconteneur:'',
        numrapportempottage:'',
        commentaire:""
      },
      taillesconteneur:['20 pieds','40 pieds'],
      format:"yyyy-MM-dd",
      clear:true,
      placeholderddebut:"2022-08-09",
      fieldsgrumes: [ 
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Séquence' },
        { key: 'numdf10', label: 'N° grume' }, { key: 'essence', label: 'Nom commercial',thStyle:"width:20%" },
        { key: 'dpb', label: 'Diamètre petit bout' }, { key: 'dgb', label: 'Diamètre gros bout' },
        { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" }, { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      fieldsdebites: [ 
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' }, { key: 'sequence', label: 'Séquence' },
        { key: 'essence', label: 'Nom commercial',thStyle:"width:20%" },
        { key: 'longueur', label: 'longueur(m)',thStyle:"width:8%" },
        { key: 'epaisseur', label: 'épaisseur(cm)',thStyle:"width:8%" },
        { key: 'nbpieces', label: 'Nombre de pièces',thStyle:"width:14%" },
         { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      elementsdebites:[],
      fieldsdetailsdebites: [
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code à barre' },
        { key: 'epaisseur', label: 'épaisseur(cm)' }, { key: 'largeur', label: 'Largeur(cm)',thStyle:"width:14%" },
        { key: 'Longueur', label: 'Longueur de la pièce (cm)',thStyle:"width:18%" }, { key: 'nmbpiece', label: 'Nombre de pièces' },
        { key: 'poids', label: 'Poids'}, { key: 'superficie', label: 'Superficie',thStyle:"width:8%" },
        { key: 'volume', label: 'Volume(m³)',thStyle:"width:8%" },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      fieldsGrumesChecked: [],

      sites:[],
      sitesdepart:[],
      sitesDestination:[],
      offsetdest: 0,
      limitdest: 10,
      offsetdep: 0,
      limitdep: 10,
      searchsitedepart:'',
      searchsitedestination:'',

      show: false,

      perPageSiteDestination: 7,
      currentPageSiteDestination: 1,
      rowSiteDestination: 9,
      sites:[],
      modesTransport:[{libelle:"En conventionnel", value:'ECL'},{libelle:"En conteneur", value:'ECR'}],
      typesTransports:[{libelle:"Terrestre", value:'R'},{libelle:"Ferroviaire", value:'VF'},{libelle:"Aérien", value:'Aérien'},{libelle:"Maritime", value:'VFL'}],
      listeZone: [ "3N", "2N"],
      typesBois: [{libelle:"Bois partant d'un site pour un autre site appartenant au même opérateur", valeur:'MO'},
                  {libelle:"Bois de négoce", valeur:'OD'},
                  {libelle:"Bois à l'export", valeur:'BE'},
                  {libelle:"Lettre de voiture pour permis spéciaux", valeur:'PS'}],
      typelvs:[{intitule : "lettre de voiture << débité >>", value:"LVD"},{intitule : "lettre de voiture << Grume >>", value:"LVG"}],
      // Données du tableau

      fieldsGrumes: [],
      fieldsGrumesChecked:[],
      elementsgrumes:[],
      elementsdebites:[],
      zones: [
        { libelle: "1N", value: 1 },
        { libelle: "2N", value: 2 },
        { libelle: "3N", value: 3 },
      ], 
      notSetDatechargement:false,
      notSetcaslv: false, 
      notSettypelv:false,
      notSetmodetransport: false,
      indexRowSelected:0,
      dto:{}

  }),

  methods: {
    showImportSection(){
      if (php.empty(this.lettrev.typelv)) {
          this.notSetTypelv=true;
          let error={ message:'Veuillez choisir le type de lettre de voiture'}
          return this.sendAlertMessage(error);
        }
        if(php.empty(this.lettrev.sitedepart)) {
          this.notSetSitedepart=true;
          let error={ message:'Veuillez renseigner le site de départ'}
          return this.sendAlertMessage(error);
        }
        if(php.empty(this.lettrev.sitedestination)) {
          this.notSetSitedestination=true;
          let error={ message:'Veuillez renseigner le site de destination'}
          return this.sendAlertMessage(error);
        }
        let data={
          typelv: this.lettrev.typelv, sitedepart: this.lettrev.sitedepart, sitedestination: this.lettrev.sitedestination,
        }
        this.dto=data
        this.showUploadFile();
    },
    async showUploadFile(){
      const ok = await this.$refs.filecomponent.show({
        title:'lettre de voiture',
        okButton: 'valider',
        cancelButton: 'Annuler'

      })
    },
    handleDataImportedGrumes(data){
      for(let i=0;i<data.length; i++){
        this.elementsgrumes.push(data[i])
      }
      this.$refs.filecomponent._close();
    },
    handleDataImportedDebite(data){
      console.log('import débités ok',data);
      for(let i=0;i<data.length; i++){
        this.elementsdebites.push(data[i])
      }
      this.$refs.filecomponent._close();
    },
    loadTypesTransport(){
      console.log('entrée mode sélectionné', this.lettrev.modetransport);
    },
    async getCodebarres(){
      this.shoverlayCode=true
      if(!php.empty(this.$store.state.freecodes)){
        this.codesbarres=this.$store.state.codesbarresgrumes
        this.shoverlayCode=false
      }
      else{
        try {
            this.codes  = await this.$operationParc.get("lettres-voiture/codebarreLv").then(response => response.data.result.items);
            this.$store.dispatch('codesbarresgrumes', this.codesbarresgrumes)
            this.shoverlayCode=false
        } catch (error) {
            console.log(error.message);
        }
      }
      
    },
    addFieldDetailsDebites(){
      this.elementsdetailsdebites.unshift({codebarre: '', epaisseur: '', largeur:'', longueur:'',epaisseur:'',nmbpiece:'', poids:'',volume:'', });
    },
    addFieldGrume (){
        if (php.empty(this.lettrev.typelv)) {
          this.notSetTypelv=true;
          let error={ message:'Veuillez choisir le type de lettre de voiture'}
          return this.sendAlertMessage(error);
        }
        if(this.lettrev.typelv=='LVG'){
          this.elementsgrumes.unshift({codebarre: '', reference: '', lignedf10: "", essence:'', dpb:'',dgb:'',longueur:'',volume:'', });
        }
      },
      async sendAlertMessage(error){
        const ok = await this.$refs.codebarreinfo.show({
          title: 'Information',
          message: error.message,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.codebarreinfo._close();
        } else {
          this.$refs.codebarreinfo._close();
        }
      },
      RemouveFieldGrumes(index){
        this.elementsgrumes.splice(index, 1);
      },
      RemouveAllFieldsGrumes(){
        this.elementsgrumes=[];
      },
      async checkCodebarreLv(value,index, commande){
          this.showOverlayCodeData=true;
            if(commande='codebarre'){
              if(this.lettrev.typelv=='LVG'){
                await this.$codesbarres.post("check/check_codebarre_lettre_voiture", {codebarre : value, typelv:this.lettrev.typelv, sitedepart: this.lettrev.sitedepart })
                .then(response =>{
                  this.dataresult =response.data.result
                  console.log('dataresult ',this.dataresult);
                  this.elementsgrumes[index].sequence=this.dataresult.sequence
                  this.elementsgrumes[index].numdf10=this.dataresult.numdf10 !==null ? this.dataresult.numdf10 :"" ;
                  this.elementsgrumes[index].essence=this.dataresult.essence !==null ? this.dataresult.essence :"" ;
                  this.elementsgrumes[index].dpb=this.dataresult.dpb !==null ? this.dataresult.dpb :"" ;
                  this.elementsgrumes[index].dgb=this.dataresult.dgb !==null ? this.dataresult.dgb :"" ;
                  this.elementsgrumes[index].longueur=this.dataresult.longueur !==null ? this.dataresult.longueur :"" ;
                  this.elementsgrumes[index].volume=this.dataresult.volume !==null ? this.dataresult.volume :"" ;
                  this.isFirstIndex++;
                  //this.addFieldGrume()
                  this.showOverlayCodeData=false;
                })
                .catch(error =>{
                  console.log('execution du catch aussi 1',error.response.data);
                  this.showOverlayCodeData=false;
                  this.errorHappened(error.response.data);
                } )
              }
        
              
            }
      },
      /**Méthode de Récupération des détails du code barre */
      async getDataDetailsGrume(value, index, commande) {
      //controle du fait que le code barre n'est pas encore pris en compte
        if(this.fieldsGrumes.length>1){
          let stop=false
            this.fieldsGrumesChecked.forEach(field => {
              if(field.codebarre==value){
                stop=true 
              }
            }) 
          if(stop){
            return this.showDialogueLigne('codebarre déjà utilisé');
          }
          else{
            this.checkCodebarre(value, index, commande);
          }
            
        }
        else{
          this.checkCodebarre(value, index, commande);
        }
    },
    removeAtIndexGrumes(index) {
        this.fieldsGrumes.splice(index, 1);
    },
    removeAllFieldsGrumes(){
      this.fieldsGrumes = []
    },
    rowClass(item, type) {
      if(item !=''&&item!=null){
        if (item.isEven) return 'table-row-other'
        if (!item || type !== 'row') return 'table-info'
      }else{
        return 
      }
    },
    onRowSelected(items) {
      console.log('row selected',items);
      items.isSelected =true;
      this.isRowselected=true
          this.selected = items[0]
    },
    onRowSelectedDebites(debites){
      this.isRowselected=true
      console.log('évaluation ',debites);
      if(!php.empty(debites)&&!php.empty(debites.detailsdebites)){
        this.elementsdetailsdebites =debites.detailsdebites
      }
    },
    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) 
      { return !this.veeErrors.has(ref);}
          return null;
    },
    triggerSetTitre(){this.setTitre=true},
    validateState(ref) {
      if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) 
      { return !this.veeErrors.has(ref);}
          return null;
    },
    handleSelected(index){
      this.indexRowSelected =index
      console.log('ligne sélectionnée ',index);
    },      

    removeAtIndex(index) {
      this.fields.splice(index, 1);
    },

    AddFichierAssocie () {
      this.fields.push( {codebarre: '', sequence: '', essence: "", numdf10: "", dpb: '', dgb: '', longueur: '', volume: '',});
    },

    
    deleteAll(){
      this.fields = [ {codebarre: '', sequence: '', essence: "", numdf10: "", dpb: '', dgb: '', longueur: '', volume: '',}]
    },

    async getSites(){
      this.shoverlaySites=true
      if(!php.empty(this.$store.state.sites)){
        this.sites=this.$store.state.sites
        this.shoverlaySites=false
      }
      else{
        try {
            this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
            //sitees de départ: tous les sites de l'organisation connectée sauf les UTBS et les checkpoints d minfof
            this.sitesDepart = this.sites.filter(elt =>{elt.IDORGANISATION ==this.user.idOrganisation,elt.TYPESITEOPER != "UTB"})
           
            this.$store.dispatch('sites', this.sites)
            this.shoverlaySites=false
        } catch (error) {
            console.log(error.message);
        }
      }
      if(!php.empty(this.sites)){
        this.sites.forEach(site => {
         if(site.IDORGANISATION ==this.user.idOrganisation&&site.TYPESITEOPER !=="UTB"){
            this.sitesdepart.push(site)
          }
        }) 
      }
      
    },
    loadSitesDestination(){
      if(!php.empty(this.sites)){
        //gestion du cas spécifique MO
        if(this.lettrev.caslv=='MO'){
          this.sites.forEach(site => {
          if(site.IDORGANISATION ==this.user.idOrganisation&&site.TYPESITEOPER !=="UTB"&&site.IDSITEOPER!=this.lettrev.sitedepart){
            this.sitesDestination.push(site)
          }
        }) 
        }else{
          this.sites.forEach(site => {
            if(site.TYPESITEOPER!== "MIN"&&site.TYPESITEOPER!== "UTB"){
            this.sitesDestination.push(site)
          }
        }) 
        }
        
      }
    },
    onSearchSitedepart(query){
      this.searchsitedepart = query
      this.offsetdep = 0
    },
    onSearchSitedestination(query){
      this.searchsitedestination = query
      this.offsetdest = 0
    },
    onSearchcode(query){
      this.searchcode = query
      this.offsetcode = 0
    },
    onSearchArrondissement(query){
      this.searcharrondissement = query
      this.offsetarrondissements = 0
    },
    lettreStatut(statut){
        if(statut){
            this.lettrev.lvvierge=true
        }else{this.newuser.lvvierge=false}
    },
    removeAtIndex(index) {
      this.fields.splice(index, 1);
    },

    async  setformNext(){
      console.log('to define');
    },
    fermer() {this.$router.back()},
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
 
      

    setUserStatut(){},
    
    controleChange() {
        console.log("Somethings change");
    },
    resetForm() {
      this.lettrev = { 
        lvvierge: '',typelv: "", caslv: 1, datechargement: "", 	modetransport: "", 
        typetransport: "", 	nomtransporteur: "",	niutransporteur: "",   niuachetteur: "", 
        chauffeur: "", 	immatriculation: "",	sitedepart: '', 	sitedestination: '', 
        numwagon: "", container: "", commentaire:""
      };

    },
    async enregistrer() {

      if (php.empty(this.lettrev.caslv)) {
          this.notSetcaslv=true;
          let error={ message:'Veuillez choisir le type de bois'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.lettrev.typelv)) {
          this.notSettypelv=true;
          let error={ message:'Veuillez choisir le type de lettre de voiture'}
          return this.sendAlertMessage(error);
        }
        //TRAITEMENT CAS LETTRE DE VOITURE VIERGE
        if(this.lettrev.lvvierge=='false'){
          if (php.empty(this.lettrev.datechargement)) {
            this.notSetDatechargement=true;
            let error={ message:'Veuillez renseigner la date'}
            return this.sendAlertMessage(error);
          }
          if (php.empty(this.lettrev.modetransport)) {
            this.notSetmodetransport=true;
            let error={ message:'Veuillez choisir le mode de transport'}
            return this.sendAlertMessage(error);
          }

          let codebarres= []
          if(this.lettrev.typelv=='LVG'){
            this.elementsgrumes.forEach(elt =>{
              codebarres.push(elt.codebarre)
            })
            this.lettrev.grumes=codebarres
          }
        }
        console.log('lettre de voiture ',this.lettrev);
          this.submitted = true 
          this.$operationParc.post('lettres-voiture', this.lettrev).then(response => {
            let result = response.data.result.Items
              if(result!=undefined){
                this.submitted = false 
                this.resetForm()
                App.notifySuccess(response.data.message)
                return this.$router.push({ name: "lettres-voiture" });
              }else{
                  //this.anomalies=response.data.result.annomalies.toString()
                this.displayError(response.data.result.annomalies.toString())
                return this.submitted=false;
              }  
          }).catch(error => {
              console.log('entrée dans le catch',error);
              this.submitted = false
             // this.errorHappened(error.response.data)
          })
    },
    async sendAlertMessage(error){
        const ok = await this.$refs.codebarreinfo.show({
          title: 'Information',
          message: error.message,
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.codebarreinfo._close();
        } else {
          this.$refs.codebarreinfo._close();
        }
    },
    async errorHappened(error, index, fields){
    const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error.message,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
              
          } else {
            this.$refs.codebarreinfo._close();
           
          }
    },
    async errorHappenedServeur() {
        const ok = await this.$refs.errorbox.show({
            title: 'Erreur survenue',
            message: "erreur interne interne du serveur",
            okButton: 'Quitter',
        })
        //If you throw an error, the method will terminate here unless you surround it wil try/catch
        if (ok) {
            this.$refs.errorbox._close();
        } else {
            this.$refs.errorbox._close();
            this.resetForm()
        }
    },
    //methodes d'erreur de création
    async displayError(annomalies){
        let message=annomalies!=undefined?annomalies:'erreur interne du serveur'
        const ok = await this.$refs.errorscreationinfo.show({
              title: 'Information',
              anomalies:message
            })
            if (ok) {
                this.$refs.errorscreationinfo._close();
            } else {
              this.$refs.errorscreationinfo._close();
            }
      },
  },
   async mounted() {
    this.getSites();
    //this.toggleSideBar()
  },

}
</script>


<style scoped>

.resizeWidthParent{
  overflow-x:auto;
  position: relative;
   width: 1600px;
}
.resizeWidthChild{
  position: relative;
  width: 2000px;
}
.sigif-input-date{
  width: 45%;
  height: 26px;
  padding: 1px 3px;
  padding-left: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #555;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.styleToSet{
  border: 2px solid red;
}
.form_title{
font-family: 'Verdana';
font-size: 16px;
font-weight: bold;
color: #333333;
}

.xf{
margin-right: 3px;
font-family: 'Verdana';
font-weight: normal;
font-size: 13px;
color: Red;
}

.default-old-system-select-properties{
border-style: solid;
/* border-width: 1px; */
font-weight: normal;
color: #333333;
border-radius: 3px;
background-color: White;
border: 1px solid #637A95;
margin: 1px;
font-family: 'verdana';
font-size: 13px;
border-color: #637A95;
}

.custom-select-type_titre{

--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
      /* Font */
  --vs-font-size: 0.65rem;
  --vs-line-height: 1.2;
}
.change_bg{
  background:#82C138
}



.form-control-xs {
height: calc(.7em + .500rem + 2px) !important;
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
.custum-date-height{

display: inline-block;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;

  padding-left: 1px;
  font-size: 14px;
  line-height: 0.1;
  color: #555;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 5em;
height: 1px;
/*height: calc(.1em + .500rem + 2px) !important;*/
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


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius: 6px;
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
}

.simple-btn:hover{
  background:none;
  border:none;
}
.custumSigifTab {
  float: left;
  background-position: top;
  box-sizing: border-box;
  white-space: nowrap;
  border-top: 1px solid #82C138;
  border-left: 1px solid #82C138;
  border-right: 1px solid #82C138;
  padding: 0px 5px 0px 7px;
  border-bottom: none;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  line-height: 19px;
  margin-top: 0px;
  background-color: #82C138;
  color:#fff;
}
/*edti style par defaut btn-bootstrap au disable*/
.page-item.active .page-link {  
  background-color: rgb(0, 82, 44)!important;  
  border-color: rgb(0, 82, 44)!important; 
  color: white !important;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}
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

#vs6__combobox {
  border: red solid 5px !important;
  height: 20px !important;
  display: none !important;
}

</style>
