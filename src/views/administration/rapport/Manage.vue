<template>
  <div id="cover">
      <!-- ADMINISTRATION -->
      <b-row>
          <b-col cols="4">
                  <b-button
                          :class="visible ? null : 'collapsed'"
                              :aria-expanded="visible ? 'true' : 'false'"
                              aria-controls="collapse"
                          @click="visible=!visible" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Administration
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse" v-model="visible" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-5">
                                  <b-link @click.prevent="showListingUtilisateurs" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des utilisateurs</b-link>
                              </li>
                              <li>
                                  <b-link @click.prevent="showListingProfils" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des profils</b-link>
                              </li>
                          </ul>
                      </b-collapse>
              </b-col>
      </b-row>
      <!-- DONNES DE REFERENCE -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible1 ? null : 'collapsed'"
                              :aria-expanded="visible1 ? 'true' : 'false'"
                              aria-controls="collapse1"
                          @click="visible1=!visible1" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible1, 'collapse-close': !visible1 }">Données de référence
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse1" v-model="visible1" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des essences</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des sites</b-link>
                              </li>
                              <li>
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des sociétés agréées</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- TITRES FORESTIERS -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible2 ? null : 'collapsed'"
                              :aria-expanded="visible2 ? 'true' : 'false'"
                              aria-controls="collapse2"
                          @click="visible2=!visible2" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible2, 'collapse-close': !visible2 }">Titres forestiers
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse2" v-model="visible2" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des titres valides</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- CODES BARRES -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                      <b-button
                          :class="visible3 ? null : 'collapsed'"
                              :aria-expanded="visible3 ? 'true' : 'false'"
                              aria-controls="collapse3"
                          @click="visible3=!visible3" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible3, 'collapse-close': !visible3 }">Codes barres
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse3" v-model="visible3" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingCodebarres" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes de codes barres</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- INVENTAIRES -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible4 ? null : 'collapsed'"
                              :aria-expanded="visible4 ? 'true' : 'false'"
                              aria-controls="collapse4"
                          @click="visible4=!visible4" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible4, 'collapse-close': !visible4 }">Inventaires
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse4" v-model="visible4" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des inventaires</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- PERMIS -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible5 ? 'true' : 'false'"
                              aria-controls="collapse5"
                          @click="visible5=!visible5" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible5, 'collapse-close': !visible5 }">Permis
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse5" v-model="visible5" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des permis</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- ABATTAGES -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible6 ? 'true' : 'false'"
                              aria-controls="collapse6"
                          @click="visible6=!visible6" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible6, 'collapse-close': !visible6 }">Abattages
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse6" v-model="visible6" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des abattages</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- BOIS CEMAC -->
      <!-- <b-row>
          <b-col cols="7" style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible7 ? 'true' : 'false'"
                              aria-controls="collapse7"
                          @click="visible7=!visible7" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible7, 'collapse-close': !visible7 }">Bois CEMAC
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse7" v-model="visible7" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes de codes barres</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voitures</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des entrées parcs</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- OPERATIONS DE PARC -->
      <!-- <b-row>
          <b-col style="margin-top:-15px">
                      <b-button
                              :aria-expanded="visible8 ? 'true' : 'false'"
                              aria-controls="collapse8"
                          @click="visible8=!visible8" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible8, 'collapse-close': !visible8 }">Opérations de parc
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse8" v-model="visible8" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;flex-wrap: wrap;">
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingLettreVoiture" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showEntreeParc" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des entrées parc</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingBillonageParc" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc usine</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingGrumesMeresBillonnees" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des grumes mères billonnées</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingEvacuations" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des évacuations</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingAbattageAac" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des abattages par AAC</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingBillonnagesParcForet" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc forêt</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingEvacuationsGrume" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des évacuations grume</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingLettresVoiturePeriode" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture par période</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingAbattageEssenceZone" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des abattages par essence et zone</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingGrumeMereBillonneeEssence" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des grumes mères billonées par essence</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingBillonnagesParcUsineParEssence" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc usine par essence</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des essences inventoriées</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingVolumesInventoriesTitre" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des volumes inventoriés par type de titre</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingQuantitatifLVStatut" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing quantitatif des LV par statut</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingLV" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link  style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des titres opérationnels</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingVolumesTransferes" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des volumes transférés</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des sociétés agréés</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingLotsRegularisation" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lots de régularisation</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link @click.prevent="showListingSuperficiesTypeTitre" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des superficies exploitées par type de titre</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- TRANSFORMATIONS -->
      <!-- <b-row>
          <b-col cols="7" style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible9 ? 'true' : 'false'"
                              aria-controls="collapse9"
                          @click="visible9=!visible9" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible9, 'collapse-close': !visible9 }">Transformation
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse9" v-model="visible9" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing de production</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des grumes entrées usine</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des productions par UTB</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- FISCALITE FORESTIERE -->
      <!-- <b-row>
          <b-col style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible10 ? 'true' : 'false'"
                              aria-controls="collapse10"
                          @click="visible10=!visible10" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible10, 'collapse-close': !visible10 }">Fiscalité forestière
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse10" v-model="visible10" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing de la situation fiscale des entités</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des moratoires</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des cautions</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des paiements de taxe</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des états des sommes dues</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing par type de taxe</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- CONTENTIEUX -->
      <!-- <b-row>
          <b-col style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible11 ? 'true' : 'false'"
                              aria-controls="collapse11"
                          @click="visible11=!visible11" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible11, 'collapse-close': !visible11 }">Contentieux
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse11" v-model="visible11" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex; flex-wrap: wrap;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des décisions du tribunal</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des procès verbaux</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des Notifications primitives</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes de transaction</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des transactions</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des notifications définitives</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- CERTIFICATS DE LEGALITE -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible12 ? null : 'collapsed'"
                              :aria-expanded="visible12 ? 'true' : 'false'"
                              aria-controls="collapse12"
                          @click="visible12=!visible12" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible12, 'collapse-close': !visible12 }">Certificats de légalité
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse12" v-model="visible12" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des certificats de légalité</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- EXPORTATIONS -->
      <!-- <b-row>
          <b-col style="margin-top:-15px">
                  <b-button
                              :aria-expanded="visible13 ? 'true' : 'false'"
                              aria-controls="collapse13"
                          @click="visible13=!visible13" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible13, 'collapse-close': !visible13 }">Exportations
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse13" v-model="visible13" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex; flex-wrap: wrap;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des exportations</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes d'autorisation FLEGT</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des autorisations FLEGT</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des demandes de BSE</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des BSE</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des permis CITES</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des certificats en qualité d'exportateur</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des Quotas de bois à l'exportation</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- TRACABILITE -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible14 ? null : 'collapsed'"
                              :aria-expanded="visible14 ? 'true' : 'false'"
                              aria-controls="collapse14"
                          @click="visible14=!visible14" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible14, 'collapse-close': !visible14 }">Traçabilité
                              </li>
                          </ul>
                      </b-button>
          </b-col>
      </b-row> -->
      <!-- CONTROLE -->
      <!-- <b-row>
          <b-col cols="6" style="margin-top:-15px">
                  <b-button
                          :class="visible1 ? null : 'collapsed'"
                              :aria-expanded="visible15 ? 'true' : 'false'"
                              aria-controls="collapse15"
                          @click="visible15=!visible15" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                          <ul style="margin:0">
                              <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                  :class="{ 'collapse-open': visible15, 'collapse-close': !visible15 }">Contrôle
                              </li>
                          </ul>
                      </b-button>
                      <b-collapse id="collapse15" v-model="visible15" class="p-0 m-0">
                          <ul style="margin-left:1px;display: flex;">
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des contrôles</b-link>
                              </li>
                              <li class="mr-2">
                                  <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des inspections d'abattages</b-link>
                              </li>
                          </ul>
                      </b-collapse>
          </b-col>
      </b-row> -->
      <!-- <RejectionModal ref="listingEntreeParc" @debut="showDebut" @fin="showFin" @usage="showUsage" @entite="showEntite"> -->
          <!-- <template #content>
              <div class="p-2">
                  <b-row>
                      <b-col cols="4">
                          <span class="text-danger">*</span>Période des opérations du
                      </b-col>
                      <b-col>
                          <input type="date" class="default-old-system-select-properties"/>
                      </b-col>
                      <b-col cols="1"><span class="text-danger">*</span>AU</b-col>
                      <b-col><input type="date" class="default-old-system-select-properties"/></b-col>
                  </b-row>
                  <b-row class="my-1">
                      <b-col cols="2">
                          Organisation
                      </b-col>
                      <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                  </b-row>
                  <b-row class="my-1">
                      <b-col cols="2">
                          Site
                      </b-col>
                      <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                  </b-row>
                  <b-row class="my-1">
                      <b-col cols="2">
                          Essence
                      </b-col>
                      <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                  </b-row>
              </div>
          </template> -->
          <!-- <template #footer-buttons>
              <ul style="display:flex;margin-bottom:0">
                  <li  class="mr-3">
                      <b-link @click="loadPdf" style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img> &nbsp;PDF</b-link>
                  </li>
                  <li  class="mr-3">
                      <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Word</b-link>
                  </li>
                  <li class="mr-3">
                      <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Excel</b-link>
                  </li>
                  <li class="mr-3">
                      <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconACTUALISER_16x16.png"></b-img>&nbsp;Réinitialiser</b-link>
                  </li>
              </ul>
          </template>
      </RejectionModal> -->
     <AdministrationDialog ref="administration">

     </AdministrationDialog>
      
  </div>
</template>
<script>
  // import RejectionModal from '@/components/utils/RejectionModal.vue'
  import AdministrationDialog from '@/components/utils/rapport/administration/MultiUsageDialog.vue'
  export default{
      data(){
          return{
              // visible:false,
              // visible1:false,
              // visible2:false,
              visible:false,
          //     visible4:false,
          //     visible5:false,
          //     visible6:false,
          //     visible7:false,
          //     visible8:false,
          //     visible9:false,
          //     visible10:false,
          //     visible11:false,
          //     visible12:false,
          //     visible13:false,
          //     visible14:false,
          //     visible15:false,
          pdf:{
              datedebut:'',
              datefin:'',
              idorganisation:'',
              usage:'',
          }
          }
      },
      components:{AdministrationDialog},
      methods:{
          showListingUtilisateurs(){
              this.$refs.administration.show({
                  title:'Listing des utilisateurs',
                  commande:1,
              })
          },
          showListingProfils(){
              this.$refs.administration.show({
                  title:'Listing des profils',
                  commande:2,
              })
          },
          showDebut(d){
              this.pdf.datedebut=this.$dayjs(new Date(d)).format('DD/MM/YYYY')
              // console.log(this.pdf.debut)
          },
          showFin(d){
              this.pdf.datefin=this.$dayjs(new Date(d)).format('DD/MM/YYYY')
              // console.log(this.pdf.fin)
          },
          showEntite(e){
              this.pdf.idorganisation=e
              // console.log(e)
          },  
          showUsage(usage){
              this.pdf.usage=usage
          },
         
          loadPdf(){
              console.log({"pdf":this.pdf})
          }
      }
  }
</script>
<style scoped>
  #cover{
      background-image: url('@/assets/images/logo_sigif_trame.png');
      background-size: 40vw 80vh;
      background-position: center;
      background-repeat: no-repeat;
      height: 100vh;
  }
  ul,li{
      list-style-type: none;
  }
  .collapse-open{
      list-style-type: disclosure-open;
  }
  .collapse-close{
      list-style-type: disclosure-closed;
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
</style>