<template>
  <div id="cover" class="min-vh-100">
    <b-overlay :show="showOverlay" rounded="sm">
      <div>
        <!--BARRE ENTETE-->
        <div style="border-bottom:3px solid green" class="ml-2">
          <b-row>
            <b-col><h6 class="" style>
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button><span class="ml-1 font-weight-bold">consultation du Catalogue N°: <span v-if="catalogue!=null&&catalogue.numcatalogue!=null">{{catalogue.numcatalogue}}</span> </span></h6>
            </b-col>
            <b-col class="col-md-auto">
              <span>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
        </div>
        <!--<tab-head
          :toggleSideBar="toggleSideBar"
          :fermer="fermer"
          title="consultation du Catalogue N°:"
          :idElement="catalogue.numcatalogue"
        />-->
      </div>
        <b-row>
          <b-col cols="6">
            <b-row v-if="catalogue!==null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Catalogue N° :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.numcatalogue }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.typetitre!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Type de titre :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.libelletypetitre }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.typeProduit!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Type de produit :</h6></b-col>
              <b-col cols="7">
                <b-badge class="text-uppercase" v-if="catalogue.typeProduit=='GR'" pill variant="secondary">Grumes</b-badge>
                <b-badge class="text-uppercase" v-if="catalogue.typeProduit=='CL'" pill variant="secondary">Débités</b-badge>
                <b-badge class="text-uppercase" v-if="catalogue.typeProduit=='PS'" pill variant="secondary">Produit spécial</b-badge>
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.typeinventaire!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6>Type d'inventaire :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.typeinventaire }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Exercice :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.exercice }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.tonne!=null&&catalogue.tonne!=0">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Tonne :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.exercice }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.produitOrigin!=null&&catalogue.produitOrigin!=0">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Origine :</h6></b-col>
              <b-col cols="7">
                <b-badge class="text-uppercase" v-if="catalogue.produitOrigin==1" pill variant="primary">Saisie</b-badge><strong>{{ catalogue.origine }}</strong>
                <b-badge class="text-uppercase" v-if="catalogue.produitOrigin==2" pill variant="primary">Abandon</b-badge><strong>{{ catalogue.origine }}</strong>
                <b-badge class="text-uppercase" v-if="catalogue.produitOrigin==3" pill variant="primary">échouage</b-badge><strong>{{ catalogue.origine }}</strong>
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.referenceSaisir!=null&&catalogue.referenceSaisir!=0">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Rérérende de saisie :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.referenceSaisir }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.promoteur!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Nom du promoteur du déboisement :</h6></b-col>
              <b-col cols="7"><strong>{{ catalogue.promoteur   }}</strong></b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.etudeimpact!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> etude d'impact :</h6></b-col>
              <b-col cols="7"> 
                <p class="anyclass">{{ catalogue.etudeimpact }}</p> 
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.superficie!=null&&catalogue.superficie!=0">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Superficie :</h6></b-col>
              <b-col cols="7">
                <strong>{{ catalogue.superficie }}</strong>
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.iudrapinv!=null&&catalogue.iudrapinv!=0">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Rapport des inventaires :</h6></b-col>
              <b-col cols="7">
                <a class="mx-1 diplay-file-on-details" v-if="catalogue!=null&&catalogue.iudrapinv!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="catalogue.iudrapinv"><b-img src="@/assets/images/Attach_128x128.png"></b-img>rapport d'inventaire</a>
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null&&catalogue.etudeimpact!=null&&catalogue.etudeimpact!=0||catalogue!==null&&catalogue.etudeimpactfichier!=null">
              <b-col cols="5" class="d-flex justify-content-end"><h6> Etude d'impact :</h6></b-col>
              <b-col cols="7">
                <a class="mx-1 diplay-file-on-details" v-if="catalogue!=null&&catalogue.etudeimpactfichier!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="catalogue.etudeimpactfichier"><b-img src="@/assets/images/Attach_128x128.png"></b-img>etude d'impact</a>
              </b-col>
            </b-row>
            <b-row v-if="catalogue!==null">
              <b-col cols="5" class="d-flex justify-content-end"><h6>Statut</h6></b-col>
              <b-col cols="7">
                <b-badge class="text-uppercase" v-if="catalogue.statut==0" pill variant="danger">Brouillon</b-badge>
                <b-badge class="text-uppercase" v-else-if="catalogue.statut==2" pill variant="success">Approuvé</b-badge>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="6">
                <!--LOCALISATION ARB-->
              <div class="ml-1" v-if="catalogue!==null&&catalogue.typetitre=='AR'">
                <h6  class="tab-header-left-text">Localisation Autorisation de récupération du bois</h6>
                <b-table
                  :busy="isBusy"
                  hover
                  select-mode="single"
                  responsive="sm"
                  ref="selectableTableLocalisation"
                  selectable
                  :items="itemsLocalisationARB"
                  :fields="fieldsLocalisationARB"
                  :tbody-tr-class="rowClass"
                >
                <template v-slot:head(arrondissement)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(departement)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(region)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(localisation)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
                <template v-slot:head(superficie)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(index)="data">
                  <b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b>
                </template>
                
                <template #cell(arrondissement)="data">
                  <input disabled type="text" v-model="data.item.arrondissement" class="form-control-xs m-1 w-75"  style="border: 1px solid white; background:white!important">
                </template>
                <template #cell(departement)="data">
                    <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important;"> {{ data.item.departement }}</span>
                </template>
                <template #cell(region)="data">
                  <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important"> {{ data.item.region }}</span>
                </template>
                <template #cell(localisation)="data">
                  <input disabled type="text" v-model="data.item.localisation" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                </template>
                <template #cell(superficie)="data">
                  <input disabled type="text" v-model="data.item.superficie" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                </template>
                </b-table>
              </div>
                
              <!--LOCALISATION AEB-->
              <div class="ml-1" v-if="catalogue!==null&&catalogue.typetitre=='AE'">
                <h6 class="tab-header-left-text">Localisation Autorisation d'enlèvement du bois</h6>
                <b-table
                  :busy="isBusy"
                  hover
                  select-mode="single"
                  responsive="sm"
                  ref="selectableTableLocalisation"
                  selectable
                  :items="itemsLocalisationAEB"
                  :fields="fieldsLocalisationAEB"
                  :tbody-tr-class="rowClass"
                >
                <template v-slot:head(arrondissement)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(departement)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(region)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(localisation)="data">
                  <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                </template>
                <template v-slot:head(volume)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #cell(index)="data">
                  <b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b>
                </template>
                
                <template #cell(arrondissement)="data">
                  <input disabled type="text" v-model="data.item.arrondissement" class="form-control-xs m-1 w-75"  style="border: 1px solid white; background:white!important">
                </template>
                <template #cell(departement)="data">
                    <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important;"> {{ data.item.departement }}</span>
                </template>
                <template #cell(region)="data">
                  <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important"> {{ data.item.region }}</span>
                </template>
                <template #cell(localisation)="data">
                  <input disabled type="text" v-model="data.item.localisation" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                </template>
                <template #cell(volume)="data">
                  <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                </template>
                </b-table>
              </div>
              <!--LOCALISATION PS-->
              <div class="ml-1" v-if="catalogue!==null&&catalogue.typetitre=='PS'">
                <h6 class="tab-header-left-text">Localisation Permis spécial</h6>
                <b-table
                  :busy="isBusy"
                  hover
                  select-mode="single"
                  responsive="sm"
                  ref="selectableTableLocalisation"
                  selectable
                  :items="itemsLocalisationPS"
                  :fields="fieldsLocalisationPS"
                  :tbody-tr-class="rowClass"
                >
                  <template v-slot:head(arrondissement)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(departement)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(region)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(localisation)="data">
                    <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                  </template>
                  <template v-slot:head(tonne)="data">
                    <span v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template #table-busy>
                    <div class="text-center text-success my-2">
                      <b-spinner class="align-middle"></b-spinner>
                      <strong class="ml-1">chargement...</strong>
                    </div>
                  </template>
                  <template #cell(index)="data">
                    <b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b>
                  </template>
                  <template #cell(arrondissement)="data">
                    <input disabled type="text" v-model="data.item.arrondissement" class="form-control-xs m-1 w-75"  style="border: 1px solid white; background:white!important">
                  </template>
                  <template #cell(departement)="data">
                      <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important;"> {{ data.item.departement }}</span>
                  </template>
                  <template #cell(region)="data">
                    <span class="mt-2 text-uppercase font-weight-bold d-flex justify-content-center align-items-center" style="color:white!important"> {{ data.item.region }}</span>
                  </template>
                  <template #cell(localisation)="data">
                    <input disabled type="text" v-model="data.item.localisation" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                  </template>
                  <template #cell(tonne)="data">
                    <input disabled type="text" v-model="data.item.tonne" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
                  </template>
                </b-table>
              </div>
          </b-col>
        </b-row>
   
      <!--entete des tableaux -->
    
      <div class="mt-5  table-header-border">
        <b-row>
          <b-col cols="8"><h4 class="tab-header-center-text ml-2 d-inline-block">Liste des produits</h4> 
              <b-button  v-if="catalogue!==null&&catalogue.statut=='0'" @click.prevent="validerCatalogue"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
              <b-img src="@/assets/images/iconSUBMIT_16x16.png"></b-img>
              valider
            </b-button>

            <b-button @click.prevent="exportDataCatalogue"  size="sm" class="not-change-image-opacity mx-1 simple-btn">
              <b-img src="@/assets/images/excel.png"></b-img>
              exporter
            </b-button>
          </b-col>
        
        </b-row>
      </div>
      <!--implémentation tableau proprement dite-->
        <!--TABLEAU DES PRODUITS DU TYPE ARB-->
      <div class="mx-2" v-if="catalogue!==null&&catalogue.typetitre=='AR'">
        <b-table   :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableProduit"  selectable 
          :items="itemsARB" 
          :fields="fieldsProduitsARB" 
          :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(libelleessence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(diametreTige)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(numBloc)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(numUc)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(numtige)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(utmzone)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green" class="d-flex justify-content-center"></span></template>
            <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(qualite)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold"> donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
        
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template> 
            <template #cell(sequence)="data">
              <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template> 
            <template #cell(libelleessence)="data">
              <input disabled type="text" v-model="data.item.libelleessence" class="form-control-xs m-1 w-90"  style="border: 1px solid white; background:white!important; float:right">
            </template> 
            <template #cell(diametreTige)="data">
              <input disabled type="text" v-model="data.item.diametreTige" class="form-control-xs m-1 w-75 text-right"  style="border: 1px solid white;">
            </template> 
            
            <template #cell(numBloc)="data">
              <input disabled type="text" v-model="data.item.numBloc" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(numUc)="data">
              <input disabled type="text" v-model="data.item.numUc" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(numtige)="data">
              <input disabled type="text" v-model="data.item.numtige" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
            </template>
            <template #cell(utmZone)="data">
                <select disabled v-model="data.item.utmZone" size="xs" class="w-75 catalogue-select mx-1 form-control-xs  px-1 text-left"  style="color:white !important; background:#82C138!important;">
                  <option :value="data.item.utmZone" selected style="color: white!important">{{ data.item.utmZone }}</option>
                </select>
            </template>
            <template #cell(utmX)="data">
              <input disabled type="text" v-model="data.item.utmX" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
            </template>
            <template #cell(utmY)="data">
              <input disabled type="text" v-model="data.item.utmY" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
            </template>
            <template #cell(qualite)="data">
              <input disabled type="text" v-model="data.item.qualite" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>    
        </b-table>
        <paginator
            hr="top"
            :offset="offsetARB"
            :total="elementsproduitsARB.length || 0"
            :limit="perPageARB"
            :page="currentPageARB"
            @pageChanged="(page) => {currentPageARB = page}"
            @limitChanged="(limit) => {perPageARB = limit}"
             v-show="itemsProduitsARB.length > 10"
          />
      </div>
      <!--TABLEAU DES PRODUITS DU TYPE AEB-->
      <div v-if="catalogue!==null&&catalogue.typetitre=='AE'" class="mx-2">
            <!--TABLEAU DES PRODUITS DU TYPE AEB GRUMES-->
          <b-table v-if="catalogue.typeProduit=='GR'" :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableProduit"  selectable 
          :items="itemsAEB" 
          :fields="fieldsProduitsAEBGrumes" 
          :tbody-tr-class="rowClass" show-empty>
            <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(libelleessence)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(utmzone)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green" class="d-flex justify-content-center"></span></template>
            <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(qualite)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(diametrePb)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(diametreGb)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
            <template #table-busy>
              <div class="text-center text-success my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong class="ml-1">chargement...</strong>
              </div>
            </template>
            <template #empty>
              <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold"> donnée</span> trouvée!!</h4>
            </template>
            <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
        
            <template #cell(codebarre)="data">
              <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template> 
            <template #cell(sequence)="data">
              <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template> 
            <template #cell(libelleessence)="data">
              <input disabled type="text" v-model="data.item.libelleessence" class="form-control-xs m-1 w-90"  style="border: 1px solid white; background:white!important; float:right">
            </template> 
            <template #cell(utmZone)="data">
              <select disabled v-model="data.item.utmZone" size="xs" class="w-75 catalogue-select mx-1 form-control-xs  px-1 text-left"  style="color:white !important; background:#82C138!important;">
                <option :value="data.item.utmZone" selected style="color: white!important">{{ data.item.utmZone }}</option>
              </select>
          </template>
          <template #cell(utmX)="data">
            <input disabled type="text" v-model="data.item.utmX" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
          </template>
          <template #cell(utmY)="data">
            <input disabled type="text" v-model="data.item.utmY" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
          </template>
            <template #cell(qualite)="data">
              <input disabled type="text" v-model="data.item.qualite" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(longueur)="data">
              <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(diametrePb)="data">
              <input disabled type="text" v-model="data.item.diametrePb" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(diametreGb)="data">
              <input disabled type="text" v-model="data.item.diametreGb" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
            <template #cell(volume)="data">
              <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>    
          </b-table>
           <!--TABLEAU DES PRODUITS DU TYPE AEB DEBITES-->
           <b-table v-if="catalogue.typeProduit=='CL'" :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableProduit"  selectable 
           :items="itemsAEB" 
           :fields="fieldsProduitsAEBDebites" 
           :tbody-tr-class="rowClass" show-empty>
             <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(utmzone)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green" class="d-flex justify-content-center"></span></template>
             <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(qualite)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(nombrePieces)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(longueur)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(largeur)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(epaisseur)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
             <template #table-busy>
               <div class="text-center text-success my-2">
                 <b-spinner class="align-middle"></b-spinner>
                 <strong class="ml-1">chargement...</strong>
               </div>
             </template>
             <template #empty>
               <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold"> donnée</span> trouvée!!</h4>
             </template>
             <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
         
             <template #cell(codebarre)="data">
               <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template> 
             <template #cell(sequence)="data">
               <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template> 
             <template #cell(essence)="data">
               <input disabled type="text" v-model="data.item.essence" class="form-control-xs m-1 w-90"  style="border: 1px solid white; background:white!important; float:right">
             </template> 
             <template #cell(utmZone)="data">
               <select disabled v-model="data.item.utmZone" size="xs" class="w-75 catalogue-select mx-1 form-control-xs  px-1 text-left"  style="color:white !important; background:#82C138!important;">
                 <option :value="data.item.utmZone" selected style="color: white!important">{{ data.item.utmZone }}</option>
               </select>
           </template>
           <template #cell(utmX)="data">
             <input disabled type="text" v-model="data.item.utmX" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
           </template>
           <template #cell(utmY)="data">
             <input disabled type="text" v-model="data.item.utmY" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
           </template>
             <template #cell(qualite)="data">
               <input disabled type="text" v-model="data.item.qualite" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template>
             <template #cell(nombrePieces)="data">
              <input disabled type="text" v-model="data.item.nombrePieces" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
            </template>
             <template #cell(longueur)="data">
               <input disabled type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template>
             <template #cell(largeur)="data">
               <input disabled type="text" v-model="data.item.largeur" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template>
             <template #cell(epaisseur)="data">
               <input disabled type="text" v-model="data.item.epaisseur" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template>
             <template #cell(volume)="data">
               <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
             </template>    
           </b-table>
            <!--TABLEAU DES PRODUITS DU TYPE AEB PS-->
            <b-table v-if="catalogue.typeProduit=='PS'" :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableProduit"  selectable 
            :items="itemsAEB" 
            :fields="fieldsProduitsAEBProduitSpecial" 
            :tbody-tr-class="rowClass" show-empty>
              <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(libelleessence)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(utmzone)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green" class="d-flex justify-content-center"></span></template>
              <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template v-slot:head(qualite)="data"><span v-html="data.field.label" style="color:green"></span></template>
          
              <template v-slot:head(volume)="data"><span v-html="data.field.label" style="color:green"></span></template>
              <template #table-busy>
                <div class="text-center text-success my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong class="ml-1">chargement...</strong>
                </div>
              </template>
              <template #empty>
                <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold"> donnée</span> trouvée!!</h4>
              </template>
              <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>
          
              <template #cell(codebarre)="data">
                <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
              </template> 
              <template #cell(sequence)="data">
                <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
              </template> 
              <template #cell(libelleessence)="data">
                <input disabled type="text" v-model="data.item.libelleessence" class="form-control-xs m-1 w-90"  style="border: 1px solid white; background:white!important; float:right">
              </template> 
              <template #cell(utmZone)="data">
                <select disabled v-model="data.item.utmZone" size="xs" class="w-75 catalogue-select mx-1 form-control-xs  px-1 text-left"  style="color:white !important; background:#82C138!important;">
                  <option :value="data.item.utmZone" selected style="color: white!important">{{ data.item.utmZone }}</option>
                </select>
            </template>
            <template #cell(utmX)="data">
              <input disabled type="text" v-model="data.item.utmX" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
            </template>
            <template #cell(utmY)="data">
              <input disabled type="text" v-model="data.item.utmY" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
            </template>
              <template #cell(qualite)="data">
                <input disabled type="text" v-model="data.item.qualite" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
              </template>
             
              <template #cell(volume)="data">
                <input disabled type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
              </template>    
            </b-table>
      <paginator
            hr="top"
            :offset="offsetAEB"
            :total="elementsproduitsAEB.length || 0"
            :limit="perPageAEB"
            :page="currentPageAEB"
            @pageChanged="(page) => {currentPageAEB = page}"
            @limitChanged="(limit) => {perPageAEB = limit}"
             v-show="itemsProduitsAEB.length > 10"
          />
      </div>
      <!--TABLEAU DES PRODUITS DU TYPE AEB-->
      <div v-if="catalogue!==null&&catalogue.typetitre=='PS'" class="mx-2">
        <!--TABLEAU DES PRODUITS DU TYPE PS-->
        <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTableProduit"  selectable 
        :items="itemsPS" 
        :fields="fieldsProduitsPS" 
        :tbody-tr-class="rowClass" show-empty>
          <template v-slot:head(codebarre)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(sequence)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(essence)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(diametreTige)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(utmzone)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(utmx)="data"><span v-html="data.field.label" style="color:green" class="d-flex justify-content-center"></span></template>
          <template v-slot:head(utmy)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(qualite)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template v-slot:head(tonne)="data"><span v-html="data.field.label" style="color:green"></span></template>
          <template #table-busy>
            <div class="text-center text-success my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong class="ml-1">chargement...</strong>
            </div>
          </template>
          <template #empty>
            <h4 style="color:green" class="text-center">Aucune <span class="font-weight-bold"> donnée</span> trouvée!!</h4>
          </template>
          <template #cell(index)="data"><b class="ml-1 mt-2 pt-2 font-weight-bold" style="color: #175131!important; font-size:1rem">{{ ++data.index }}</b> </template>

          <template #cell(codebarre)="data">
            <input disabled type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
          </template> 
          <template #cell(sequence)="data">
            <input disabled type="text" v-model="data.item.sequence" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
          </template> 
          <template #cell(essence)="data">
            <input disabled type="text" v-model="data.item.essence" class="form-control-xs m-1 w-90"  style="border: 1px solid white; background:white!important; float:right">
          </template> 
          <template #cell(diametreTige)="data">
            <input disabled type="text" v-model="data.item.diametreTige" class="form-control-xs m-1 w-75 text-right"  style="border: 1px solid white;">
          </template> 
          <template #cell(utmZone)="data">
              <select disabled v-model="data.item.utmZone" size="xs" class="w-75 catalogue-select mx-1 form-control-xs  px-1 text-left"  style="color:white !important; background:#82C138!important;">
                <option :value="data.item.utmZone" selected style="color: white!important">{{ data.item.utmZone }}</option>
              </select>
          </template>
          <template #cell(utmX)="data">
            <input disabled type="text" v-model="data.item.utmX" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
          </template>
          <template #cell(utmY)="data">
            <input disabled type="text" v-model="data.item.utmY" class="form-control-xs m-1 w-75  text-right"  style="border: 1px solid white;">
          </template>
          <template #cell(qualite)="data">
            <input disabled type="text" v-model="data.item.qualite" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
          </template>
          <template #cell(tonne)="data">
            <input disabled type="text" v-model="data.item.tonne" class="form-control-xs m-1 w-75"  style="border: 1px solid white;">
          </template>    
        </b-table>
        <paginator
            hr="top"
            :offset="offsetPS"
            :total="elementsproduitsPS.length || 0"
            :limit="perPagePS"
            :page="currentPagePS"
            @pageChanged="(page) => {currentPagePS = page}"
            @limitChanged="(limit) => {perPagePS = limit}"
            v-show="itemsProduitsPS.length > 10"
          />
        </div>
      <error-dialogue ref="errorDialogue"></error-dialogue>
    </b-overlay>
  </div>
</template>
<script>
  const php  = require ( 'phpjs' ) ;

  import ErrorDialogue from '@/components/utils/AlertBox.vue';
  import { mapGetters } from 'vuex'

export default {
  name: "detail-catalogue",
  components:{
    ErrorDialogue,
  },

  data: () => ({
     //PS
    currentPagePS: 1,
    perPagePS: 10,
    fieldsLocalisationPS: [
      { key: 'index', label: '' },
      { key: 'arrondissement', label: 'Arrondissement' },
      { key: 'departement', label: 'Département' },
      { key: 'region', label: 'Région' },
      { key: 'localisation', label: 'localité/village' }, 
      { key: 'tonne', label: 'Tonne', thStyle: { width: "8%" } },
    ],
    elementslocalisationPS:[],
    fieldsProduitsPS:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'essence', label: 'Essence', thStyle: { width: "9%" } },
      { key: 'diametreTige', label: 'Diamètre de la tige' },
      { key: 'utmZone', label: 'UTM Zone', thStyle: { width: "9%" }  },
      { key: 'utmX', label: 'UTM X' }, 
      { key: 'utmY', label: 'UTM Y' },
      { key: 'qualite', label: 'Qualité' }, 
      { key: 'tonne', label: 'Tonne' }
    ],
    elementsproduitsPS:[],
    
    //AEB
    currentPageAEB: 1,
    perPageAEB: 10,
    fieldsLocalisationAEB: [
      { key: 'index', label: '' },
      { key: 'arrondissement', label: 'Arrondissement' },
      { key: 'departement', label: 'Département' },
      { key: 'region', label: 'Région' },
      { key: 'localisation', label: 'localité/village' }, 
      { key: 'volume', label: 'Volume', thStyle: { width: "8%" } },
    ],
    elementslocalisationAEB:[],
    fieldsProduitsAEBGrumes:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'libelleessence', label: 'Essence', thStyle: { width: "9%" } },
      { key: 'utmZone', label: 'UTM Zone', thStyle: { width: "9%" }  },
      { key: 'utmX', label: 'UTM X' }, 
      { key: 'utmY', label: 'UTM Y' },
      { key: 'qualite', label: 'Qualité' }, 
      { key: 'longueur', label: 'Longueur(m)' },
      { key: 'diametrePb', label: 'diamètre Pb' },
      { key: 'diametreGb', label: 'diamètre Gb' }, 
      { key: 'volume', label: 'Volume' },
    ],
    elementsproduitsAEB:[],
    fieldsProduitsAEBDebites:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'essence', label: 'Essence', thStyle: { width: "9%" } },
      { key: 'utmZone', label: 'UTM Zone', thStyle: { width: "9%" }  },
      { key: 'utmX', label: 'UTM X' }, 
      { key: 'utmY', label: 'UTM Y' },
      { key: 'qualite', label: 'Qualité' }, 
      { key: 'nombrePieces', label: 'Nb de pièces' }, 
      { key: 'longueur', label: 'Longueur' },
      { key: 'largeur', label: 'Largeur' },
      { key: 'epaisseur', label: 'Epaisseur' }, 
      { key: 'volume', label: 'Volume' },
    ],
    fieldsProduitsAEBProduitSpecial:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'libelleessence', label: 'Essence', thStyle: { width: "9%" } },
      { key: 'utmZone', label: 'UTM Zone', thStyle: { width: "9%" }  },
      { key: 'utmX', label: 'UTM X' }, 
      { key: 'utmY', label: 'UTM Y' },
      { key: 'qualite', label: 'Qualité' }, 
      { key: 'volume', label: 'Volume' },
    ],
    showOverlay:false,
    lotproduction:{},
    isBusy:false,
 
    //ARB
    currentPageARB: 1,
    perPageARB: 10,
    fieldsLocalisationARB: [
      { key: 'index', label: '' },
      { key: 'arrondissement', label: 'Arrondissement' },
      { key: 'departement', label: 'Département' },
      { key: 'region', label: 'Région' },
      { key: 'localisation', label: 'localité/village' }, 
      { key: 'superficie', label: 'superficie', thStyle: { width: "8%" } },
    ],
    elementslocalisationARB:[],
   
    fieldsProduitsARB:[
      { key: 'index', label: '' },
      { key: 'codebarre', label: 'Code barre' },
      { key: 'sequence', label: 'Séquence' },
      { key: 'libelleessence', label: 'Essence', thStyle: { width: "9%" } },
      { key: 'diametreTige', label: 'Diametre de la tige' }, 
      { key: 'numBloc', label: 'Numéro du bloc'},
      { key: 'numUc', label: 'Numéro de l\'UC' },
      { key: 'numtige', label: 'Numéro de la tige' },
      { key: 'utmZone', label: 'UTM Zone', thStyle: { width: "9%" }  },
      { key: 'utmX', label: 'UTM X' }, 
      { key: 'utmY', label: 'UTM Y' },
      { key: 'qualite', label: 'Qualité' }, 
      { key: 'volume', label: 'Volume' },
    ],
    elementsproduitsARB:[],
    commande:'',
    selected:{},
    catalogue:null
  }),
  computed:{
    ...mapGetters(['user','hasAccess']),
    //PS
    itemsPS() {
      return php.array_slice(this.itemsProduitsPS, this.offsetPS, this.perPagePS);
    },
    offsetPS() {
      return this.currentPagePS * this.perPagePS - this.perPagePS;
    },
    itemsLocalisationPS(){
      return this.elementslocalisationPS.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsProduitsPS(){
      return this.elementsproduitsPS.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    //ARB
    itemsARB() {
      return php.array_slice(this.itemsProduitsARB, this.offsetARB, this.perPageARB);
    },
    offsetARB() {
      return this.currentPageARB * this.perPageARB - this.perPageARB;
    },
    itemsLocalisationARB(){
      return this.elementslocalisationARB.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsProduitsARB(){
      return this.elementsproduitsARB.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    //AEB
    itemsAEB() {
      return php.array_slice(this.itemsProduitsAEB, this.offsetAEB, this.perPageAEB);
    },
    offsetAEB() {
      return this.currentPageAEB * this.perPageAEB - this.perPageAEB;
    },
    itemsLocalisationAEB(){
      return this.elementslocalisationAEB.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    itemsProduitsAEB(){
      return this.elementsproduitsAEB.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    isMinfof(){ 
      if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
        return true;
      }else{
        return false;
      }
    },
  },
  watch:{
    elementslocalisationPS(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTableLocalisation'].selectRow(0) }, 200);
      }
    },
    elementsproduitsPS(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableProduit'].selectRow(0) }, 200);
      }
    },
    elementslocalisationARB(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTableLocalisation'].selectRow(0) }, 200);
      }
    },
    elementsproduitsARB(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableProduit'].selectRow(0) }, 200);
      }
    },
    elementslocalisationAEB(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTableLocalisation'].selectRow(0) }, 200);
      }
    },
    elementsproduitsAEB(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTableProduit'].selectRow(0) }, 200);
      }
    }
  },
 methods: {

  //export des données du catalogue au format CSV
  exportDataCatalogue(){

  },
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  onRowSelectedProduits(items) {
    console.log('row selected',items);
  },
  fermer(){ this.$router.back();},
    async getDetailsCatalogue() {
      this.showOverlay = true
      try {
        this.catalogue = await this.$inventaire.get('catalogues/' +this.$route.params.id).then(response => response.data.result.Items)
        console.log('catalogue ',this.catalogue);
        if(this.catalogue.typetitre=='AR'){
          this.elementsproduitsARB =this.catalogue.produitboar
          this.elementslocalisationARB =this.catalogue.superficieDto
        }
        else if(this.catalogue.typetitre=='AE'){
          if(this.catalogue.typeProduit=='PS'){
            this.elementsproduitsAEB =this.catalogue.produits
          }else
          if(this.catalogue.typeProduit=='GR'){
            this.elementsproduitsAEB =this.catalogue.produitAEgrume
          }
          else{
            this.elementsproduitsAEB =this.catalogue.produitAEdebite
          }
          this.elementslocalisationAEB =this.catalogue.superficieDto
        }
        else if(this.catalogue.typetitre=='PS'){
          this.elementsproduitsPS =this.catalogue.produits
          this.elementslocalisationPS =this.catalogue.superficieDto
        }
        this.showOverlay = false
      } catch (error) {
          this.showOverlay = false
          console.log('error ',error);
          if(error.response.data.status==500){
            return App.alertError('Erreur interne du Serveur')
          }
      }     
    },
   
    validerCatalogue(){
      this.showOverlay = true;
      this.$inventaire.put('catalogues/'+this.$route.params.id+'/valider').then(response => {
           App.notifySuccess(response.data.message)
           return this.getDetailsCatalogue();
      }).catch(error => {
          this.showOverlay = false
          return this.errorHappened(error.response.data)
      }) 
    },
    async errorHappened(error) {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur survenue',
          message: error.message,
          okButton: 'Quitter',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
          this.$emit('closeForm')
      } else {
          this.$refs.errorDialogue._close();
          this.resetForm()
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
    this.getDetailsCatalogue()
  },
  }

</script>
<style scoped>
.diplay-file-on-details {
  color: #175131!important;
  }
.diplay-file-on-details:hover{
text-decoration: underline;
}
.catalogue-select{
  min-width: 90px!important;
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
  font-weight: 800;
  line-height: 1.5;
  border-radius: .25rem;
  margin: .25rem!important;
}
.anyclass {
  max-height:150px;
  overflow-y: scroll;
}
.simple-btn{
  background:none;
  border:none;
  color:black;
  font-weight: bold;
  cursor:pointer;
}
#cover {
  background-image: url('~@/assets/images/logo_sigif_trame.png');
  background-size: 40vw 80vh;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
}
</style>