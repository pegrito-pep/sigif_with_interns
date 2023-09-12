<template>
  <div id="cover" class="min-vh-100">
    <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <!--<b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
              <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
                <span >Type de titre <span class="font-weight-bold"></span> </span>
              </h4>
              <b-row class="ml-2">
                <b-col cols="2">
                  <span>renseigner le code barre</span>
                </b-col>
                <b-col cols="2">
                  <input type="text" v-model="codebarre" class="default-old-system-input-properties"/>
                </b-col>
                <b-col cols="3" class="d-flex justify-content-between">
                  <a style="cursor: pointer;" @click.prevent="tracer" class="mx-1 simple-btn"><b-img src="@/assets/images/iconTRACABILITE_16x16.png" class="mx-1"></b-img>Tracer</a>
                  <a style="cursor: pointer;" @click.prevent="imprimer" class="mx-1 simple-btn"><b-img src="@/assets/images/iconIMPRIMER_16x16.png" class="mx-1"></b-img>Imprimer</a>
                  <a style="cursor: pointer;" @click.prevent="reset" class="mx-1 simple-btn"><b-img src="@/assets/images/iconACTUALISER_16x16.png" class="mx-1"></b-img>Re-initialiser</a>
                </b-col>
              </b-row>
            </b-col> 
          </b-row>-->
          <b-button
            :class="visible ? null : 'collapsed'"
            :aria-expanded="visible ? 'true' : 'false'"
            aria-controls="collapse-4"
            @click="visible = !visible"
            class="p-0 m-0 w-100"
            style="border: none; background: none; color: black"
          >
            <ul >
              <li class="m-0 p-0"
                :class="{ 'collapse-open': visible, 'collapse-close': !visible }"
              >
              <b-row class="ml-4">
                <b-col cols="9" class="py-0 my-0">
                  <span class="x12i" style="width: 50%; display:inline-flex; justify-content:center">Localisation</span>
                  <span class="x12i" style="width: 50%; display:inline-flex; justify-content:center">Description</span>
                  <hr class="mt-0 pt-1"/>
                </b-col>
                
              </b-row>
            </li>
            </ul>
          </b-button>
          <b-collapse id="collapse-4" v-model="visible" class="m-0 p-0">
            <!--PREMIERE SECTION : LOCALISATION ET DESCRIPTION-->
            <div class="my-2 py-2"  style="border-bottom: 2px solid green">
              <b-row class="ml-4">
                <!--ELEMENTS LOCALISATION-->
                <b-col cols="6">
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.site!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Site :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.site }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.site!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Type de site :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.typeSite }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.zoneUtm!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Zone UTM :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.zoneUtm }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.utmx!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">UTM X:</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.utmx }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.utmy!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">UTM Y:</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.utmy }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.region!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Région:</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.region }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.departement!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Département:</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.departement }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.localisation!=null&&produit.localisation.arrondissement!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Arrondissement:</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.localisation.arrondissement }}</span>
                    </b-col>
                  </b-row>
                </b-col>
                <!--ELEMENTS DESCRIPTION-->
                <b-col cols="6">
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.organisationAttributaire!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Organisation Attributaire :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.organisationAttributaire }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.statut!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Statut :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold"><h5><b-badge>{{ produit.description.statut }}</b-badge></h5></span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.usage!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Usage :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold"><h5><b-badge>{{ produit.description.usage }}</b-badge></h5></span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.nomComerciale!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Nom Commercial :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.nomComerciale }}</span>
                    </b-col>
                  </b-row>
                  <!--CLES DES GRUMES-->
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.diampb!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Diamètre petit bout :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.diampb }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.diamgb!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Diamètre gros bout :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.diamgb }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.longueur!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Longueur(m) :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.longueur }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.volume!=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Volume :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.volume }} m <sup>3</sup></span>
                    </b-col>
                  </b-row>
                  <!--CLES DES DEBITES-->
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.longueur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Longueur :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.longueur }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.largeur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Largeur :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.largeur }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.epaisseur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Epaisseur :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.epaisseur }}</span>
                    </b-col>
                  </b-row>
                
               
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.longueur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Nombre de pièces :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.nombrepiece }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.longueur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Superficie :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.superficie }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.longueur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Poids :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.poids }}</span>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.description!=null&&produit.description.pieces!=null&&produit.description.pieces.longueur !=null">
                    <b-col cols="4">
                      <span  style="color: #333333; display: flex; justify-content: end;">Volume :</span>
                    </b-col>
                    <b-col cols="8">
                      <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.description.pieces.volume }}</span>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </b-collapse>

        <b-button
          :class="visibleHistorique ? null : 'collapsed'"
          :aria-expanded="visibleHistorique ? 'true' : 'false'"
          aria-controls="collapse-4"
          @click="visibleHistorique = !visibleHistorique"
          class="p-0 m-0 w-100"
          style="border: none; background: none; color: black"
        >
          <ul >
            <li class="m-0 p-0"
              :class="{ 'collapse-open': visibleHistorique, 'collapse-close': !visibleHistorique }"
            >
            <b-row class="ml-4">
              <b-col cols="11" class="py-0 my-0">
                <span class="x12i" style="width: 50%; display:inline-flex; justify-content:start">Historique</span>
                <hr class="mt-0 pt-1"/>
              </b-col>
            </b-row>
          </li>
          </ul>
        </b-button>
        <b-collapse id="collapse-5" v-model="visibleHistorique" class="m-0 p-0">
           <!--DEUXIEME SECTION HISTORIQUE : INVENTAIRE ET ABATTAGE-->
          <div class="my-2 py-2"  style="border-bottom: 2px solid green">
            
            <b-row class="ml-4" style="min-height:250px">
              <!--ELEMENTS INVENTAIRE-->
              <b-col cols="6" class="pt-0">
                <a class="mx-1 mt-0 pt-0 simple-btn"><b-img src="@/assets/images/iconINVENTAIRE_16x16.png" class="mx-1"></b-img>Inventaire</a>

                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">Code barre de la tige mère :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.codebarre }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° du titre :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numtitre }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° UFA :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numUfa }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° UFE:</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numUfe }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° AAC:</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numAac }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° UC:</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numUc }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° de la Tige:</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.numTige }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">Diamètre de la Tige :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.inventaire.diamTige }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.inventaire!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">Date de soumission de l'inventaire :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ $dayjs(produit.inventaire.dateSoumission).format("DD/MM/YYYY") }}</span>
                  </b-col>
                </b-row>
              </b-col>
              <!--ELEMENTS ABATTAGE-->
              <b-col cols="6">
                <a class="mx-1 mt-0 pt-0 simple-btn"><b-img src="@/assets/images/iconABATTAGE_16x16.png" class="mx-1"></b-img>Abattages</a>

                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.abattage!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° de permis :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold"><h5><b-badge>{{ produit.abattage.abattageLot.aacPermis.numPermis }}</b-badge></h5></span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.abattage!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">Date d'abattage :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ $dayjs(produit.abattage.abattageLot.dateAbattage).format("DD/MM/YYYY") }}</span>
                  </b-col>
                </b-row>
                <b-row class="d-flex justify-content-center h6" v-if="produit!=null&&produit.abattage!=null">
                  <b-col cols="4">
                    <span  style="color: #333333; display: flex; justify-content: end;">N° du lot :</span>
                  </b-col>
                  <b-col cols="8">
                    <span  style="color: #333333; display: flex; justify-content: start; font-weight:bold">{{ produit.abattage.abattageLot.numLotAbattage }}</span>
                  </b-col>
                </b-row>
                
              </b-col>
            </b-row>
            <b-row class="d-flex justify-content-between">
              <b-col cols="5">
                <!--OPERATION DE PARC-->
                <div>
                  <a class="mx-1 mt-0 pt-0 simple-btn"><b-img src="@/assets/images/iconOPEPARC_16x16.png" class="mx-1"></b-img>Opérations de parc</a>
                  <b-table show-empty hover  select-mode="single" responsive="sm" ref="selectableTableopeparc" selectable
                    :items="itemsopeparc" 
                    :fields="fieldsopeparc" 
                    :tbody-tr-class="rowClass">
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    
                    <template v-slot:head(index)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(typeOperation)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(dateOperation)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(lieuOperation)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(typeSite)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                 
                    
                    <template #cell(index)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ ++data.index }}</b> </span>
                    </template>
                    <template #empty>
                      <span class="d-flex justify-content-center align-items-center">aucune opération de parc liée</span>
                    </template>
                    <template #cell(typeOperation)="data">
                      <span class="d-flex justify-content-center align-items-center" v-if="data.item.typeOperation=='ENT'"><b class="ml-1">Entrée parc</b> </span>
                      <span class="d-flex justify-content-center align-items-center" v-else-if="data.item.typeOperation=='BIL'"><b class="ml-1">Billonnage</b> </span>
                      <span class="d-flex justify-content-center align-items-center" v-else-if="data.item.typeOperation=='REG'"><b class="ml-1">Régularisation</b> </span>
                      <span class="d-flex justify-content-center align-items-center" v-else><b class="ml-1">Lettre de voiture</b> </span>
                    </template>
                    <template #cell(dateOperation)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.dateOperation }}</b> </span>
                    </template>
                    <template #cell(lieuOperation)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.lieuOperation }}</b> </span>
                    </template>
                    <template #cell(typeSite)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.typeSite }}</b> </span>
                    </template>
                  </b-table> 
                </div>
              </b-col>
              <b-col cols="5">
                <!--TRANSFORMATION-->
                <div>
                  <a class="mx-1 mt-0 pt-0 simple-btn"><b-img src="@/assets/images/Picto_tracabilite/iconTRANSFORMATION_16x16.png" class="mx-1"></b-img>Transformation</a>
                  <b-table show-empty hover  select-mode="single" responsive="sm" ref="selectableTabletransformation" selectable 
                    :items="itemsTransformationpagines" 
                    :fields="fieldstransformation" 
                    :tbody-tr-class="rowClass">
                    <template #table-busy>
                      <div class="text-center text-success my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong class="ml-1">chargement...</strong>
                      </div>
                    </template>
                    <template v-slot:head(index)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(idEntree)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(codebarre)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(essence)="data">
                      <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                    </template>
                  
                    
                    <template #cell(index)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.index }}</b> </span>
                    </template>
                    <template #empty>
                      <span class="d-flex justify-content-center align-items-center">aucune opération de transformation liée</span>
                    </template>
                    <template #cell(idEntree)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.idEntree }}</b> </span>
                    </template>
                    <template #cell(codebarre)="data">
                      <a @click.prevent="traceCode(data.item.codebarre)" style="color:green">{{ data.item.codebarre }}</a>
                      <!--<span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.codebarre }}</b> </span>-->
                    </template>
                    <template #cell(essence)="data">
                      <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.essence }}</b> </span>
                    </template>
                  </b-table>
                  <paginator
                    hr="top"
                    :offset="offsetTransformation"
                    :total="elementstransformation.length || 0"
                    :limit="perPageTransformation"
                    :page="currentPageTransformation"
                    @pageChanged="(page) => {currentPageTransformation = page}"
                    @limitChanged="(limit) => {perPageTransformation = limit}"
                    v-show="itemstransformation.length > 10"
                  />  
                </div>
              </b-col>
            </b-row>
          </div>
        </b-collapse>
         
        </div>
        <error-dialogue ref="errorDialogue"></error-dialogue>
       
    </b-overlay>
 
  </div>

</template>

<script>
const php  = require ( 'phpjs' ) ;


import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import ConfirmDialogue from '@/components/utils/ConfirmDialogue.vue';
import ErrorDialogue from '@/components/utils/AlertBox.vue';


import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";

export default {
name: "modal-trace-codebarre",
components: {
  ChangeProductBox,
  CodeBarreInfo,
  ErrorDialogue
},
props: {
  codebarre: {type: String, required: true},
},
watch:{
    elementsopeparc(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTableopeparc'].selectRow(0) }, 200);
      }
    },
    elementstransformation(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['selectableTabletransformation'].selectRow(0) }, 200);
      }
    },
  },
  
data: () => ({
  showOverlay:false,
  visible:true,
  visibleHistorique:true,
  fieldsopeparc: [
    { key: "typeOperation", label: "Type d'opération" },
    { key: "dateOperation", label: "Date de l'opération"},
    { key: "lieuOperation", label: "Lieu de l'opération"},
    { key: "typeSite", label: "Type de Site"}
  ],
  elementsopeparc:[],
  fieldstransformation:[
    { key: "index", label: "N°" ,thStyle:"width:1%"},
    { key: "idEntree", label: "Id entrée" },
    { key: "codebarre", label: "Code barre"},
    { key: "essence", label: "Essence"}
  ],
  elementstransformation:[],
  produit:null,
  currentPageTransformation: 1,
  perPageTransformation: 10,

}),
computed:{
    //PIECES ASSOCIEES AUX COLIS FILLE
    itemstransformation(){
        if(php.empty(this.elementstransformation)){
          return [];
        }
        return this.elementstransformation.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
    },
    offsetTransformation() {
      return this.currentPageTransformation * this.perPageTransformation - this.perPageTransformation;
    },
    itemsTransformationpagines(){
      return php.array_slice(this.itemstransformation, this.offsetTransformation, this.perPageTransformation);
    },
  itemsopeparc(){
    return this.elementsopeparc.map((a, index) => {
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
  elementsgrumes(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTablegrumes'].selectRow(0) }, 200);
    }
  },
  elementsdebites(value){
    if(value.length>0){
      setTimeout(() => {this.$refs['selectableTabledebites'].selectRow(0) }, 200);
    }
  }  
},
methods: {
  reset(){
    this.showOverlay =true;
    this.codebarre = ''
    this.produit=''
    this.elementsopeparc = []
    this.elementstransformation = []
    setTimeout( () =>{
      this.showOverlay =false;
    }, 500)
  },
  tracer(){
    this.showOverlay =true;
    this.$tracalabilite.post('tracalabiliter/produitProvenanceCameroun',{codebarre: this.codebarre}).then((response) => {
      //console.log('response.',response);
      this.produit = response.data.result
      this.elementsopeparc = !php.empty(this.produit.operationParcs)? this.produit.operationParcs :[] 
      if(!php.empty(this.elementsopeparc)){
        this.elementsopeparc = this.elementsopeparc.map(elt =>{
          elt.dateOperation = elt.dateOperation !==null ? this.$dayjs(elt.dateOperation).format('DD/MM/YYYY') :""
          return elt;
        });
      }
      this.elementstransformation = !php.empty(this.produit.transformation)? this.produit.transformation :[]
      this.showOverlay =false;
    }).catch((error) => {
      this.showOverlay =false;
      this.errorHappened(error.response.data.message)
        console.warn('Not good man :(', error);
    })
  },
  async errorHappened(error) {
      let message=error!=undefined?error:'erreur interne interne du serveur'
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur survenue',
          message: message,
          okButton: 'Quitter',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
          this.codebarre=''
      } else {
          this.$refs.errorDialogue._close();
          this.codebarre=''
      }
  },
  
  fermer(){
    this.$router.back()
  },
//methode d'ajout d'une entrée parc
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  handleSelected(index){
    this.indexRowSelected =index
    console.log('ligne sélectionnée ',index);
  },
  onSearch(query) {
    this.searchsite = query
    this.offsetSites = 0
  },
  tracer(){
    console.log('in',this.codebarre);
    this.showOverlay =true;
    this.$tracalabilite.post('tracalabiliter/produitProvenanceCameroun',{codebarre: this.codebarre}).then((response) => {
      this.produit = response.data.result
      this.elementsopeparc = !php.empty(this.produit.operationParcs)? this.produit.operationParcs :[] 
      if(!php.empty(this.elementsopeparc)){
        this.elementsopeparc = this.elementsopeparc.map(elt =>{
          elt.dateOperation = elt.dateOperation !==null ? this.$dayjs(elt.dateOperation).format('DD/MM/YYYY') :""
          return elt;
        });
      }
      this.elementstransformation = !php.empty(this.produit.transformation)? this.produit.transformation :[]
      this.showOverlay =false;
    }).catch((error) => {
      this.showOverlay =false;
      this.errorHappened(error.response.data.message)
        console.warn('error set', error);
    })
  },
},


mounted(){
  this.tracer()
}
}

</script>
<style scoped>
 .x12i{
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  font-family: 'Verdana';
  font-size: 20px;
  font-weight: bold;
  color: #333333;
 }
.default-old-system-input-properties{
  font-weight: normal;
  border-color: #637A95;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  border-radius: 3px;
  background-color: White;
  color: #333333;
  border: 1px solid #637A95;
  padding: 1px 2px 1px 3px;
  margin: 1px;
  width: 170px;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: 'verdana';
  font-size: 13px;
  height: 20px;
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
.change_bg{
background:#82C138
}
.b-col{
margin-right: 16px;
}
.b-col .content{
display: flex;
flex-direction: column;
}

.h4-title{
  font-weight: bolder;
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
.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
      /* Font */
  --vs-font-size: 0.65rem;
  --vs-line-height: 1.2;
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
.set-obligation-indicator{
  color:red; font-size: 1.4em
}

.border-danger{
  --vs-controls-color: #f50a0a;
  --vs-border-color: #f50a0a;
}
.styleToSet{
  border: 2px solid red;
}

</style>
<style>
.custom-bg{ background: rgb(0, 82, 44) !important;}
</style>