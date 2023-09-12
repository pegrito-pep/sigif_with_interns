<template>
    <popup-reject-modal :largeur="Number('700')" size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:25px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 1rem"> {{ title }}</h2>
            <slot name="close">
                <button type="button" style="align-self:start"  @click="_close" class="close ml-2 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </slot>
            
        </div>
        <b-overlay rounded="sm" :show="showOverlayData">
            <slot name="content">
                <div class="p-2">
                        <b-row v-if="showDate">
                            <b-col cols="4">
                                <span class="text-danger">*</span>Période des opérations du
                            </b-col>
                            <b-col>
                                <input  v-model="search.datedebut" type="date" class="default-old-system-select-properties"/>
                            </b-col>
                            <b-col cols="1"><span class="text-danger">*</span>AU</b-col>
                            <b-col><input  v-model="search.datefin" type="date" class="default-old-system-select-properties"/></b-col>
                        </b-row>
                        <b-row v-if="commande===7">
                            <b-col cols="3">Exercice</b-col>
                            <b-col>
                                <input type="text" v-model="search.exercice" class=" default-old-system-input-properties" />
                            </b-col>
                        </b-row>
                        <b-overlay rounded="sm" :show="showOverlayEntites">
                            <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                            </template>
                            <b-row class="my-1" v-if="commande==1||commande==2 ||commande===3 || commande===33 || commande===4 || commande==5 || commande==0 || commande==6 || commande==7 || commande===8">
                                <b-col cols="3" v-if="commande==1 || commande===3 ||commande===33 || commande===4 || commande==5 || commande===0 || commande===6 || commande==7 || commande===8">Organisation</b-col>
                                <b-col cols="3" v-if="commande==2">Entité forrestière</b-col>
                                <b-col cols="6">
                                    <v-select v-if="isMinfof" @open="getEntites" @input="getAssiettes"  :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  label="intitule" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                        <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                        </li>
                                    </v-select>
                                    <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                        <option selected="selected">{{ entite.libelle }}</option>
                                    </select>  
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlaySite">
                            <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                            </template>
                            <b-row class="my-1" v-if="commande==1">
                                <b-col cols="3">
                                    Site
                                </b-col>
                                <b-col cols="6">
                                    <v-select @open="getSites" :options="paginated" v-model="search.site" :reduce="site  => site.idsite" :filterable="false"  @search="onSearchSite" label="intitulesite" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPage" @click="offsetSites -= limitSites">Prèc.</button>
                                            <button :disabled="!hasNextPage" @click="offsetSites += limitSites">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlayUsage">
                            <b-row class="my-1" v-if="commande==5">
                                <b-col cols="4">
                                    Usage
                                </b-col>
                                <b-col cols="5">
                                    <v-select class="custom-select-type_titre"
                                        :reduce="elt=>elt.code"
                                        v-model="search.usage"
                                        label="label"
                                        :options="optionsUsage" 
                                    >
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlayAssiette">
                            <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                            </template>
                            <b-row class="my-1" v-if="commande==4">
                                <b-col cols="3">
                                    Numéro de l'assiette
                                </b-col>
                                <b-col cols="6">
                                    <v-select :options="paginatedAssiettes" v-model="search.assiette" label="idaac" :reduce="elt=>elt.idaac"  :filterable="false"  @search="onSearchAssiette" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPageAssiette" @click="offsetAssiettes -= limitAssiettes">Prèc.</button>
                                            <button :disabled="!hasNextPageAssiette" @click="offsetAssiettes += limitAssiettes">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlayEssence">
                            <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                            </template>
                            <b-row class="my-1" v-if="commande==1 || commande===4 || commande==7">
                                <b-col cols="3">
                                    Essence
                                </b-col>
                                <b-col cols="6">
                                    <v-select @open="getEssences" :options="paginatedEssences" v-model="search.essence" :reduce="essence  => essence.IDESSENCE" :filterable="false"  @search="onSearchEssence" label="NOMUSUEL" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPageEssence" @click="offsetEssences -= limitEssences">Prèc.</button>
                                            <button :disabled="!hasNextPageEssence" @click="offsetEssences += limitEssences">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-overlay rounded="sm" :show="showOverlayEssence2">
                            <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                            </template>
                            <b-row class="my-1" v-if="commande===0">
                                <b-col cols="3">
                                    Essence
                                </b-col>
                                <b-col cols="6">
                                    <v-select @open="getEssences2" :options="paginatedEssences2" v-model="search.essence" :reduce="essence  => essence.idessence" :filterable="false"  @search="onSearchEssence2" label="essence" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPageEssence2" @click="offsetEssences2 -= limitEssences2">Prèc.</button>
                                            <button :disabled="!hasNextPageEssence2" @click="offsetEssences2 += limitEssences2">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-row class="my-1" v-if="commande==3 || commande===33">
                                <b-col cols="3">
                                    Type d'opération
                                </b-col>
                                <b-col cols="6">
                                    <select class="default-old-system-input-properties" v-model="search.operation">
                                        <option value=""></option>
                                        <option value="LVG">Lettre de voiture &lt;&lt;grume&gt;&gt;</option>
                                        <option value="LVD">Lettre de voiture &lt;&lt;débités&gt;&gt;</option>
                                    </select>
                                </b-col>
                            </b-row>
                        <b-row class="my-1" v-if="commande==3 || commande===33">
                            <b-col cols="3">
                                Statut
                            </b-col>
                            <b-col cols="6">
                                <select v-model="search.statut" class="default-old-system-input-properties">
                                    <option value=""></option>
                                    <option v-for="(statut,i) in statuts" :key="i" :value="i">{{ statut }}</option>
                                </select>
                            </b-col>
                        </b-row>
                        <b-row class="my-1" v-if="commande==7">
                            <b-col cols="3">
                                Type de titre
                            </b-col>
                            <b-col cols="6">
                                <v-select :options="paginatedTypesTitres" @input="showNumTitre" v-model="search.typetitre" label="libelle" :reduce="elt=>elt.code"  :filterable="false"  @search="onSearchTypesTitres" class="custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageTypesTitres" @click="offsetTypesTitres -= limitTypesTitres">Prèc.</button>
                                        <button :disabled="!hasNextPageTypesTitres" @click="offsetTypesTitres += limitTypesTitres">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-overlay :show="showOverlayTitres" rounded="sm">
                            <b-row class="my-1" v-if="commande==7">
                                <b-col cols="3">
                                    Numéro de titre
                                </b-col>
                                <b-col cols="6">
                                    <v-select :options="paginatedTitres" v-model="search.numtitre"   :filterable="false"  @search="onSearchTitre" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPageTitres" @click="offsetTitres -= limitTitres">Prèc.</button>
                                            <button :disabled="!hasNextPageTitres" @click="offsetTitres += limitTitres">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-col>
                            </b-row>
                        </b-overlay>
                        <b-row class="my-1" v-if="commande==7">
                            <b-col cols="3">
                                Région
                            </b-col>
                            <b-col cols="6">
                                <v-select :options="paginatedRegions" @input="showDepartements" v-model="search.region" label="intitule" :reduce="elt=>elt.idregion"  :filterable="false"  @search="onSearchRegion" class="custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageRegion" @click="offsetRegion -= limitAssiettes">Prèc.</button>
                                        <button :disabled="!hasNextPageRegion" @click="offsetRegion += limitAssiettes">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row class="my-1" v-if="commande==7">
                            <b-col cols="3">
                                Département
                            </b-col>
                            <b-col cols="6">
                                <v-select :options="paginatedDepartement" @input="showArrondissements" v-model="search.departement" label="intitule" :reduce="elt=>elt.iddepartement"  :filterable="false"  @search="onSearchDepartement" class="custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageDepartement" @click="offsetDepartement -= limitDepartement">Prèc.</button>
                                        <button :disabled="!hasNextPageDepartement" @click="offsetDepartement += limitDepartement">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row class="my-1" v-if="commande==7">
                            <b-col cols="3">
                                Arrondissement/Commune
                            </b-col>
                            <b-col cols="6">
                                <v-select :options="paginatedArrondissement" v-model="search.arrondissement" label="intitule" :reduce="elt=>elt.idarrondissement"  :filterable="false"  @search="onSearchArrondissement" class="custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageArrondissement" @click="offsetArrondissement -= limitArrondissement">Prèc.</button>
                                        <button :disabled="!hasNextPageArrondissement" @click="offsetArrondissement += limitArrondissement">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row class="my-1" v-if="commande==7">
                            <b-col cols="3">
                                Entité agréée aux inventaires
                            </b-col>
                            <b-col cols="6">
                                <v-select class="custom-select-type_titre">
                                    <!-- <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageAssiette" @click="offsetAssiettes -= limitAssiettes">Prèc.</button>
                                        <button :disabled="!hasNextPageAssiette" @click="offsetAssiettes += limitAssiettes">Suiv.</button>
                                    </li> -->
                                </v-select>
                            </b-col>
                        </b-row>
                        <div>
                            <ul style="display:flex;margin-bottom:0">
                                <li :class="{'disable-li':wait }"  class="mr-3" @click.prevent="viewPdf">
                                    <b-spinner small v-if="wait" class="ml-2"  style="margin-right: 5px;"></b-spinner> 
                                    <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img> &nbsp;PDF</b-link>
                                </li>
                                <li  class="mr-3">
                                    <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Word</b-link>
                                </li>
                                <li class="mr-3" @click.prevent="viewExcel">
                                    <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Excel</b-link>
                                </li>
                                <li class="mr-3">
                                    <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconACTUALISER_16x16.png"></b-img>&nbsp;Réinitialiser</b-link>
                                </li>
                            </ul>
                        </div>
                    </div>
            </slot>
        </b-overlay>
           
            <!--<slot name="footer">
                <div class="px-4 pt-2 pb-2">
                    <slot name="footer-buttons">
                        <div style="display:flex;align-items: center;">
                            <a href="#" style="color:green;margin-right:5px" class="link-import-file" @click="_close"><b-img src="@/assets/images/picto_check_vert.png"></b-img>&nbsp;{{ okButton }}</a>
                            <a href="#" style="display:flex;justify-content:space-between;align-items:center;color:green" class="link-import-file"   @click="_cancel"><b-img src="@/assets/images/picto_croix_rouge.png"></b-img>&nbsp;{{ cancelButton }}</a>
                        </div>
                    </slot>
                </div>
            </slot>-->
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
    </popup-reject-modal>
    
</template>

<script>
import { mapGetters } from 'vuex'
import PopupRejectModal from '../../PopupRejectModal.vue'
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
const php = require("phpjs");

export default {
    name: 'ImportFile',

    components: { PopupRejectModal, CodeBarreInfo},
    computed:{
        ...mapGetters(['user','hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
                return true;
            }else{
                return false;
            }
        },
         //essences
         filteredEssences() {
            return this.essences.filter((essence) =>
            essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchEssence.toLocaleLowerCase())
            )
        },
        paginatedEssences() {
            return this.filteredEssences.slice(this.offsetEssences, this.limitEssences + this.offsetEssences)
        },
        hasNextPageEssence() {
            const nextOffset = this.offsetEssences + this.limitEssences
            return Boolean(
                this.filteredEssences.slice(nextOffset, this.limitEssences + nextOffset).length
            )
        },
        hasPrevPageEssence() {   
            const prevOffset = this.offsetEssences - this.limitEssences
            return Boolean(
                this.filteredEssences.slice(prevOffset, this.limitEssences + prevOffset).length
            )
        },
         //essences 2
         filteredEssences2() {
            return this.essences2.filter((essence) =>
            essence.essence.toLocaleLowerCase().includes(this.searchEssence.toLocaleLowerCase())
            )
        },
        paginatedEssences2() {
            return this.filteredEssences2.slice(this.offsetEssences2, this.limitEssences2 + this.offsetEssences2)
        },
        hasNextPageEssence2() {
            const nextOffset = this.offsetEssences2 + this.limitEssences2
            return Boolean(
                this.filteredEssences2.slice(nextOffset, this.limitEssences2 + nextOffset).length
            )
        },
        hasPrevPageEssence2() {   
            const prevOffset = this.offsetEssences2 - this.limitEssences2
            return Boolean(
                this.filteredEssences2.slice(prevOffset, this.limitEssences2 + prevOffset).length
            )
        },

        // liste des assiettes
        filteredAssiettes() {
            return this.assiettes.filter((assiette) =>
            assiette.toString().toLocaleLowerCase().includes(this.searchAssiette.toLocaleLowerCase())
            )
        },
        paginatedAssiettes() {
            return this.filteredAssiettes.slice(this.offsetAssiettes, this.limitAssiettes + this.offsetAssiettes)
        },
        hasNextPageAssiette() {
            const nextOffset = this.offsetAssiettes + this.limitAssiettes
            return Boolean(
                this.filteredAssiettes.slice(nextOffset, this.limitAssiettes+ nextOffset).length
            )
        },
        hasPrevPageAssiette() {   
            const prevOffset = this.offsetAssiettes - this.limitAssiettes
            return Boolean(
                this.filteredAssiettes.slice(prevOffset, this.limitAssiettes + prevOffset).length
            )
        },


        //sites
        filtered() {
            return this.sites.filter((site) =>
                site.intitulesite.toLocaleLowerCase().includes(this.searchSite.toLocaleLowerCase())
            )
        },
        paginated() {
            return this.filtered.slice(this.offsetSites, this.limitSites + this.offsetSites)
        },
        hasNextPage() {
            const nextOffset = this.offsetSites + this.limitSites
            return Boolean(
                this.filtered.slice(nextOffset, this.limitSites + nextOffset).length
            )
        },
        hasPrevPage() {   
            const prevOffset = this.offsetSites - this.limitSites
            return Boolean(
                this.filtered.slice(prevOffset, this.limitSites + prevOffset).length
            )
        },
        //types de titres
        filteredTypesTitres() {
            return this.typesTitres.filter((site) =>
                site.libelle.toLocaleLowerCase().includes(this.searchTypesTitres.toLocaleLowerCase())
            )
        },
        paginatedTypesTitres() {
            return this.filteredTypesTitres.slice(this.offsetTypesTitres, this.limitTypesTitres + this.offsetTypesTitres)
        },
        hasNextPageTypesTitres() {
            const nextOffset = this.offsetTypesTitres + this.limitTypesTitres
            return Boolean(
                this.filteredTypesTitres.slice(nextOffset, this.limitTypesTitres + nextOffset).length
            )
        },
        hasPrevPageTypesTitres() {   
            const prevOffset = this.offsetTypesTitres - this.limitTypesTitres
            return Boolean(
                this.filteredTypesTitres.slice(prevOffset, this.limitTypesTitres + prevOffset).length
            )
        },

        // titres
        filteredTitres() {
            return this.titres.filter((site) =>
                site.toLocaleLowerCase().includes(this.searchTitre.toLocaleLowerCase())
            )
        },
        paginatedTitres() {
            return this.filteredTitres.slice(this.offsetTitres, this.limitTitres + this.offsetTitres)
        },
        hasNextPageTitres() {
            const nextOffset = this.offsetTitres + this.limitTitres
            return Boolean(
                this.filteredTitres.slice(nextOffset, this.limitTitres + nextOffset).length
            )
        },
        hasPrevPageTitres() {   
            const prevOffset = this.offsetTitres - this.limitTitres
            return Boolean(
                this.filteredTitres.slice(prevOffset, this.limitTitres + prevOffset).length
            )
        },

        // arrondissements
        filteredArrondissements() {
            return this.arrondissements2.filter((site) =>
                site.intitule.toLocaleLowerCase().includes(this.searchArrondissement.toLocaleLowerCase())
            )
        },
        paginatedArrondissement() {
            return this.filteredArrondissements.slice(this.offsetArrondissement, this.limitArrondissement + this.offsetArrondissement)
        },
        hasNextPageArrondissement() {
            const nextOffset = this.offsetArrondissement + this.limitArrondissement
            return Boolean(
                this.filteredArrondissements.slice(nextOffset, this.limitArrondissement + nextOffset).length
            )
        },
        hasPrevPageArrondissement() {   
            const prevOffset = this.offsetArrondissement - this.limitArrondissement
            return Boolean(
                this.filteredArrondissements.slice(prevOffset, this.limitArrondissement + prevOffset).length
            )
        },
        // départements
        filteredDepartements() {
            return this.departements2.filter((site) =>
                site.intitule.toLocaleLowerCase().includes(this.searchDepartement.toLocaleLowerCase())
            )
        },
        paginatedDepartement() {
            return this.filteredDepartements.slice(this.offsetDepartement, this.limitDepartement + this.offsetDepartement)
        },
        hasNextPageDepartement() {
            const nextOffset = this.offsetDepartement + this.limitDepartement
            return Boolean(
                this.filteredDepartements.slice(nextOffset, this.limitDepartement + nextOffset).length
            )
        },
        hasPrevPageDepartement() {   
            const prevOffset = this.offsetDepartement - this.limitDepartement
            return Boolean(
                this.filteredDepartements.slice(prevOffset, this.limitDepartement + prevOffset).length
            )
        },
        // régions
        filteredRegions() {
            return this.regions.filter((site) =>
                site.intitule.toLocaleLowerCase().includes(this.searchDepartement.toLocaleLowerCase())
            )
        },
        paginatedRegions() {
            return this.filteredRegions.slice(this.offsetRegion, this.limitRegion + this.offsetRegion)
        },
        hasNextPageRegion() {
            const nextOffset = this.offsetRegion + this.limitRegion
            return Boolean(
                this.filteredRegions.slice(nextOffset, this.limitRegion + nextOffset).length
            )
        },
        hasPrevPageRegion() {   
            const prevOffset = this.offsetRegion - this.limitRegion
            return Boolean(
                this.filteredRegions.slice(prevOffset, this.limitRegion + prevOffset).length
            )
        },


        filteredEntites() {
            return this.entiteswithoutminfof.filter((entite) =>
                entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
            )
        },
        paginatedEntites() {
        return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
        },
        hasNextPageEntites() {
            const nextOffset = this.offsetEntites + this.limitEntites
            return Boolean(
                this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
            )
        },
        hasPrevPageEntites(){   
            const prevOffset = this.offsetEntites - this.limitEntites
            return Boolean(
                this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
            )
        }
    },

    data: () => ({
        showOverlayEssence:false,
        showDate:true,
        showOverlayEssence2:false,
        showOverlayData:false,
        showOverlayUsage:false,
        essences:[],
        arrondissements:[],
        arrondissements2:[],
        departements:[],
        regions:[],
        titres:[],
        typesTitres:[],
        essences2:[],
        assiettes:[],
        offsetEssences: 0,
        limitEssences: 10,
        offsetArrondissement: 0,
        limitArrondissement: 10,
        offsetDepartement: 0,
        limitDepartement: 10,
        offsetRegion: 0,
        limitRegion: 10,
        offsetTitres: 0,
        limitTitres: 10,
        offsetTypesTitres: 0,
        limitTypesTitres: 10,
        offsetEssences2: 0,
        limitEssences2: 10,
        offsetAssiettes: 0,
        limitAssiettes: 10,
        searchEssence:'',
        searchTypesTitres:'',
        searchAssiette:'',
        showOverlaySite:false,
        showOverlayAssiette:false,
        showOverlayTitres:false,
        sites:[],
        departements:[],
        departements2:[],
        offsetSites: 0,
        limitSites: 10,
        searchSite:'',
        searchTitre:'',
        searchDepartement:'',
        searchRegion:'',
        searchArrondissement:'',
        showOverlayEntites:false,
        entiteswithoutminfof:[],
        offsetEntites:0, 
        limitEntites:10,
        statuts:[
            "Brouillon",
            "Soumise",
            "Validée",
            "Soumission en cours",
        ],
        optionsUsage:[
            {label:'Inventaire',code:0},
            {label:'Grume',code:1},
            {label:'Colis',code:2},
            {label:'Bois CEMAC - Grume',code:3},
            {label:'Grume abattage',code:4},
            {label:'Lettre de voiture',code:5},
            {label:'Permis',code:6},
            {label:'Bois CEMAC - Colis',code:10},
            {label:'Notif primitive',code:11},
            {label:'Autorisation FLEGT',code:13},
            {label:'Certificat de mat',code:15},
            {label:'Certificat de conf',code:16},
            {label:'BSE',code:14},
            {label:'Feuillet DF10',code:17},
        ],
        entite:{
            idorganisation:'',
            libelle:''
        },
        searchentite:'',
        search:{
            entite:'', site:'', essence:'',statut:'',operation:'',datedebut:'',datefin:'',assiette:'',usage:'',region:'',
            departement:'',arrondissement:'',typetitre:'',numtitre:'',exercice:''
        },
        disabled:false,
        wait:false,

        // Parameters that change depending on the type of dialogue
        title: undefined,
        idoperation:undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        commande:undefined,
        motifrejet:'',
        
    }),

    methods: {
        showNumTitre(){
            console.log(this.search.numtitre)
            if(this.search.typetitre==='CD'){
                this.showTitresCD()
            }
            if(this.search.typetitre==='CP'){
                this.showTitresCP()
            }
            if(this.search.typetitre==='CD'){
                this.showTitresCD()
            }
            if(this.search.typetitre==='CC'){
                this.showTitresCC()
            }
            if(this.search.typetitre==='FS'){
                this.showTitresFS()
            }
            if(this.search.typetitre==='FC'){
                this.showTitresFC()
            }
            if(this.search.typetitre==='VC'){
                this.showTitresVC()
            }
            if(this.search.typetitre==='AR'){
                this.showTitresAR()
            }
            if(this.search.typetitre==='BO'){
                this.showTitresBO()
            }
            if(this.search.typetitre==='AE'){
                this.showTitresAE()
            }
            if(this.search.typetitre==='PS'){
                this.showTitresPS()
            }
            if(this.search.typetitre==='AP'){
                // console.log('APC')
                this.showTitresAPC()
            }
        },

        async showTitresCD(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/CD?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(this.titres.length===0){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresCP(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/CP?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(this.titres.length===0){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresCC(){
            this.showOverlayTitres=true
            // console.log(this.search.typetitre)
            try{
                this.titres=await this.$titres.get('titres/CC?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                    })
                console.log('titres',this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresFS(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/FS?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresFC(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/FC?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresVC(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/VC?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresAR(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/AR?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresBO(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/BO?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresAE(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/AE?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresPS(){
            this.showOverlayTitres=true
            try{
                this.titres=await this.$titres.get('titres/PS?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },
        async showTitresAPC(){
            this.showOverlayTitres=true
            console.log('APC')
            try{
                this.titres=await this.$titres.get('titres/AP?size=400')
                    .then(resp=>{
                        let t=resp.data.result.items
                        if(!php.empty(t))
                            return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                        else {
                            console.log('tableau vide')
                            return t
                        }
                        // return t.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
                    })
                console.log(this.titres)
                this.showOverlayTitres=false
                if(php.empty(this.titres)){
                    return this.sendAlertMessage({message:'Aucun titre de ce type n\'a été trouvé'})
                }
            }catch(error){
                console.log(error.message)
                this.showOverlayTitres=false
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            }
        },

        showDepartements(){
            console.log('region',this.search.region)
            // console.log('departement',this.search.departement)

            this.departements2=this.departements.filter(elt=>elt.idregion===Number(this.search.region))
        },
        showArrondissements(){
            console.log('département',this.search.departement)
            // console.log(this.arrondissements)
            this.arrondissements2=this.arrondissements.filter(elt=>elt.iddepartement===Number(this.search.departement))
        },
        
        postData3(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("ItextController/listeLVPdf", {
                "datedebut": this.search.datedebut,
                "datefin":this.search.datefin,
                "idorganisation":Number(this.search.entite.idorganisation),
                "typeoperation": this.search.operation,
                "statut":this.search.statut
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                // console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    // console.log(response)
                }
            })
            .catch((error) => {
                console.log(error);   
                this.wait=false;
            });
        },
        postData34(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            console.log(this.search.entite)
            this.$jasper.post("ItextController/listeLVPdf/detail/excel", {
                "datedebut": this.search.datedebut,
                "datefin":this.search.datefin,
                "idorganisation":Number(this.search.entite),
                "typeoperation": this.search.operation,
                "statut":this.search.statut
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                // console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing.xls';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    // console.log(response)
                }
            })
            .catch((error) => {
                console.log(error);   
                this.wait=false;
            });
        },
        postData33(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("ItextController/listeLVPdf/detail", {
                "datedebut": this.search.datedebut,
                "datefin":this.search.datefin,
                "idorganisation":Number(this.search.entite),
                "typeoperation": this.search.operation,
                "statut":this.search.statut
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                // console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    // console.log(response)
                }
            })
            .catch((error) => {
                console.log(error);   
                this.wait=false;
            });
        },

        postData(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("ItextController/listingEntreeParc", {
                "idorganisation":this.entite.idorganisation,
                "datedebut": this.search.datedebut,
                "datefin":this.search.datefin,
                "idessence": Number(this.search.essence),
                "idsiteoper":Number(this.search.site)
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type:'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing entrées parc.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    // console.log(response)
                }
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;
            });
        },
        postData4(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("abattage/aac/pdf", {
                "idorganisations": Number(this.search.entite),
                "datedebut": this.search.datedebut,
                "datefin": this.search.datefin,
                "idaacs": Number(this.search.assiette),
                "idessences": Number(this.search.essence)
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing abattage aac.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;
            });
        },
        postData5(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("demande-cb/pdf", {
                "datedebut": this.search.datedebut,
                "datefin": this.search.datefin,
                "idorganisation": this.search.entite,
                "usagecb":this.search.usage
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing demandes codes barres.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;
            });
        },
        async postData0(){
            console.log(this.idoperation)
            this.wait=true
            const obj=await this.$operationParc.get(`entrees-parc/${this.idoperation}`)
                .then(resp=>{
                    if(resp.status===200)
                        return resp.data
                })
                .catch(err=>console.log(err))
            console.log(obj)
            
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString()
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation
            if(obj){
                if(obj.typeproduit==='GR'){
                    this.$jasper.post("ItextController/imprimerentreeparc/grume", {
                        "idorganisation":Number(this.search.entite),
                        "idoperation":Number(this.idoperation),
                        "idessence":Number(this.search.essence),
                        // "idorganisation":94,
                        // "idoperation":788,
                        // "idessence":1122
                    },{responseType:'blob'})
                    .then((response) => { 
                        console.log('exécution ok 1',response.data); 
                        // console.log('Search',this.search)
                        if(response.status===200) {
                            // console.log('res data:',response.data)
                            const blob = new Blob([response.data], {type: 'application/pdf'});
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = 'Imprimer une entrée parc.pdf';
                            link.click();
                            URL.revokeObjectURL(link.href)
                            /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                            var fileLink = document.createElement('a');
                            console.log('exécution ok 2');   
                            fileLink.href = fileURL;
                            fileLink.setAttribute('download', 'file.pdf');
                            document.body.appendChild(fileLink);
                            fileLink.click();*/
                            this.wait=false;
                            // console.log(response.data);   
                        }else{
                            console.log(response)
                        }
                        })
                    .catch((error) => {
                        console.log(error);   
                        this.wait=false;
                    });
                }
                if(obj.typeproduit==='CL'){
                    this.$jasper.post("ItextController/imprimerentreeparcColis", {
                        // "idorganisation":Number(this.entite.idorganisation),
                        // "idsiteoper": Number(obj.idsite),
                        // "statut":"1",
                        // "idoperation":788,
                        // "idessence":1122
                        "idorganisation":111,
                        "idsiteoper": 538,
                        "statut":"1",
                        "idoperation":3023,
                        "idessence":1800
                    },{responseType:'blob'})
                    .then((response) => { 
                        // console.log('exécution ok 1',response.data); 
                        console.log(this.search)
                        if(response.status==200) {
                            // console.log('res data:',response.data)
                            const blob = new Blob([response.data], {type: 'application/pdf'});
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(blob);
                            link.download = 'Imprimer entree parc colis.pdf';
                            link.click();
                            URL.revokeObjectURL(link.href)
                            /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                            var fileLink = document.createElement('a');
                            console.log('exécution ok 2');   
                            fileLink.href = fileURL;
                            fileLink.setAttribute('download', 'file.pdf');
                            document.body.appendChild(fileLink);
                            fileLink.click();*/
                            this.wait=false;
                            // console.log(response.data);   
                        }else{
                            console.log(response)
                        }
                        })
                    .catch((error) => {
                        console.log('exécution bad 1');   
                        this.wait=false;
                    });
                }
            }
        },
        async postData6(){
            console.log(this.idoperation)
            this.wait=true
            const obj=await this.$operationParc.get(`regulations/${this.idoperation}`)
                .then(resp=>{
                    if(resp.status===200)
                        return resp.data
                })
                .catch(err=>console.log(err))
            console.log(obj)
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation
            if(obj){
                this.$jasper.post("ItextController/imprimerlotregularisation", {
                    // "idorganisation":Number(this.search.entite),
                    // "idoperation":Number(this.idoperation),
                    // "idessence":Number(this.search.essence),
                    "idorganisation":105,
                    "idoperation":50008
                },{responseType:'blob'})
                .then((response) => { 
                    console.log('exécution ok 1',response.data); 
                    // console.log('Search',this.search)
                    if(response.status===200) {
                        // console.log('res data:',response.data)
                        const blob = new Blob([response.data], {type: 'application/pdf'});
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'Imprimer une entrée régularisation.pdf';
                        link.click();
                        URL.revokeObjectURL(link.href)
                        /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                        var fileLink = document.createElement('a');
                        console.log('exécution ok 2');   
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.pdf');
                        document.body.appendChild(fileLink);
                        fileLink.click();*/
                        this.wait=false;
                        // console.log(response.data);   
                    }else{
                        console.log(response)
                    }
                    })
                .catch((error) => {
                    console.log(error);   
                    this.wait=false;
                });
            
            }
        },
        async postData8(){
            console.log(this.idoperation)
            this.wait=true
            const obj=await this.$operationParc.get(`billonages/${this.idoperation}`)
                .then(resp=>{
                    if(resp.status===200)
                        return resp.data
                })
                .catch(err=>console.log(err))
            console.log(obj)
            
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString()
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation
            if(obj){
                this.$jasper.post("ItextController/imprimerbillonnage", {
                    "idorganisation":Number(this.search.entite),
                    "idoperation":Number(this.idoperation),
                    // "idorganisation":94,
                    // "idoperation":788,
                    // "idessence":1122
                },{responseType:'blob'})
                .then((response) => { 
                    console.log('exécution ok 1',response.data); 
                    // console.log('Search',this.search)
                    if(response.status===200) {
                        // console.log('res data:',response.data)
                        const blob = new Blob([response.data], {type: 'application/pdf'});
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(blob);
                        link.download = 'Imprimer un billonnage .pdf';
                        link.click();
                        URL.revokeObjectURL(link.href)
                        /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                        var fileLink = document.createElement('a');
                        console.log('exécution ok 2');   
                        fileLink.href = fileURL;
                        fileLink.setAttribute('download', 'file.pdf');
                        document.body.appendChild(fileLink);
                        fileLink.click();*/
                        this.wait=false;
                        // console.log(response.data);   
                    }else{
                        console.log(response)
                    }
                    })
                .catch((error) => {
                    console.log(error);   
                    this.wait=false;
                });
            }
        },
        postData7(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            console.log(this.search)
            this.$jasper.post("ItextController/listingdesInventaires", {
                "exercice":this.search.exercice,
                "idregionk" :  Number(this.search.region),
                "idarrondissement" : Number(this.search.arrondissement),
                "idorganisation": this.isMinfof ? Number(this.search.entite.idorganisation):Number(this.entite.idorganisation),
                "numtitre":Number(this.search.numtitre),
                "typetitre":this.search.typetitre,
                "idessence":Number(this.search.essence)
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type:'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing des inventaires.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    /*var fileURL = window.URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}));
                    var fileLink = document.createElement('a');
                    console.log('exécution ok 2');   
                    fileLink.href = fileURL;
                    fileLink.setAttribute('download', 'file.pdf');
                    document.body.appendChild(fileLink);
                    fileLink.click();*/
                    this.wait=false;
                    // console.log(response.data);   
                }else{
                    // console.log(response)
                }
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;
            });
        },

        viewExcel(){
            this.postData34()
        },

        viewPdf(){
            if(this.commande===0){
                this.postData0()
            }
            // if(this.commande===1){
            //     this.postData()
            // }
            if(this.commande===3){
                this.postData3();
            }
            if(this.commande===33){
                this.postData33();
            }
            if(this.commmande===1){
                this.postData1()
            }
            if(this.commande===4){
                this.postData4()
            }
            if(this.commande===5){
                this.postData5()
            }
            if(this.commande===6){
                this.postData6()
            }
            if(this.commande===7){
                this.postData7()
            }
            if(this.commande===8){
                this.postData8()
            }
        },
        //listing des essences
        async getEssences(){
            this.showOverlayEssences=true;
            if (!php.empty(this.$store.state.essences) ) {
                this.essences = this.$store.state.essences;
                this.showOverlayEssences=false;
            } 
            else {
                try {
                    this.essences= await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                    this.$store.dispatch('essences', this.essences)
                    this.showOverlayEssences=false;
                } catch (error) {
                    App.notifyError(error.message);
                }
            }
        },
        onSearchEssence(query){
            this.searchEssence = query
            this.offsetEssences = 0
        }, 
        
        async getEssences2(){
            this.showOverlayEssence2=true;
            try {
                const essencesTab= await this.$operationParc.get("entrees-parc/"+this.idoperation).then(response => response.data.produits);
                const uniqueIds=[]
                const unique=essencesTab.filter(elt=>{
                    const isDuplicate=uniqueIds.includes(elt.idessence)
                    if(!isDuplicate){
                        uniqueIds.push(elt.idessence)
                        return true
                    }
                    return false
                })
                this.essences2=unique.map(elt=>{
                    return{
                        idessence:elt.idessence,
                        essence:elt.essence
                    }
                })
                // this.$store.dispatch('essences', this.essences)
                console.log(essencesTab)
                this.showOverlayEssence2=false;
            } catch (error) {
                this.showOverlayEssence2=false;
                App.notifyError(error.message);
            }
            this.showOverlayEssence2=false;
        },
        onSearchEssence2(q){
            this.searchEssence = q
            this.offsetEssences2 = 0
        },


        // listing des assiettes
        async getAssiettes(){
            if(this.commande===3){
                return
            }
            this.showOverlayAssiette=true
            if(this.isMinfof){
                this.entite.idorganisation=this.search.entite.idorganisation
                this.showOverlayAssiette=true
            }
            if(this.entite.idorganisation){
                try{
                let tab=await this.$abbattage.get('tiges/abattage_permis_approuver?idorganisation='+this.entite.idorganisation)
                    .then(resp=>{
                        if(resp.status===200){
                            console.log(resp)
                            return resp.data.result.Items
                        }
                    })
                this.assiettes=[...new Set(tab.map(elt=>elt.idaac))]
                this.showOverlayAssiette=false
                }catch(error){
                    console.log(error.message)
                    this.showOverlayAssiette=false
                }
            }else{
                this.showOverlayAssiette=false
            }
        },
        onSearchAssiette(query){
            this.searchAssiette = query
            this.offsetAssiettes = 0
        },

        //listing des sites
        async getSites(){
            this.showOverlaySite=true
            if(false){
                // this.sites=this.$store.state.sites
            }
            else{
                try {
                    if(!this.isMinfof){
                        this.entite.idorganisation=this.search.entite
                    }
                    this.sites = await this.$donneesReference.get("sites/listesiteorg/"+this.entite.idorganisation).then(response => response.data.result.Items);
                    // this.$store.dispatch('sites', this.sites)
                } catch (error) {
                    console.log(error.message)
                }
            }
            this.showOverlaySite=false
        },
        onSearchSite(query){
            this.searchSite = query
            this.offsetSites = 0
        },
        onSearchTypesTitres(query){
            this.searchTypesTitres = query
            this.offsetTypesTitres = 0
        },
        onSearchTitre(query){
            this.searchTitre = query
            this.offsetTitre = 0
        },
        onSearchRegion(query){
            this.searchRegion = query
            this.offsetTitre = 0
        },
        onSearchDepartement(query){
            this.searchDepartement = query
            this.offsetDepartement = 0
        },
        onSearchArrondissement(query){
            this.searchArrondissement = query
            this.offsetArrondissement = 0
        },
        //liste des entités forrestières
        async getEntites(){
            this.showOverlayEntites=true;
            if (!php.empty(this.$store.state.entiteswithoutminfof)) {
                this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
                this.showOverlayEntites=false
            } 
            else {
                try {
                this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier?size=1000").then(response => response.data.result.items);
                this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
                } catch (error) {
                App.notifyError(error.message);
                }
            }
            this.showOverlayEntites=false;
        },
        onSearchEntites(query){
            this.searchentite = query
            this.offsetEntites = 0
        },
        resetData(){
            for(let i in this.search){
                this.search[i]=''
            }
        },
        show(opts = {}) {
            this.resetData()
            this.title = opts.title
            this.commande = opts.commande
            if(typeof opts.showDate =='undefined'){
                this.showDate=true
            }else{
                this.showDate=opts.showDate
            }
            this.message = opts.message
            this.okButton = opts.okButton
            this.showZone=opts.showZone,
            this.showRegion=opts.showRegion,
            this.showDepartement=opts.showDepartement
            this.showArrondissement=opts.showArrondissement
            this.idoperation=opts.idoperation
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.$refs.popup.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.$refs.popup.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

        _close() {
            this.$refs.popup.close()
        },
        handleFileUpload(event){
            this.$emit('fileupload',event)
        },
        async getData(){
            this.showOverlayData=true
            try{
                if(!php.empty(this.$store.state.typesTitres)){
                    this.typesTitres=this.$store.state.typesTitres
                }else{
                    this.typesTitres=await this.$donneesReference.get('types-titre?size=200')
                        .then(resp=>{
                            if(resp.status===200){
                                return resp.data.result.items
                            }
                        })
                    this.$store.dispatch('typesTitres',this.typesTitres)
                }
                
                if(!php.empty(this.$store.state.arrondissementsfournis)){
                    this.arrondissements = this.$store.state.arrondissementsfournis
                }else{
                    this.$donneesReference.get("arrondissements/raw").then(response => response.data).then(response => {
                    this.arrondissements = response.result.Items
                    this.$store.dispatch('arrondissementsfournis', this.arrondissements)
                    })
                }
                for (const dep of this.arrondissements.map(elt => elt.departementdto)) {
                        if (!this.departements.map(elt => elt.iddepartement).includes(dep.iddepartement)) {
                            this.departements.push(dep)
                        }
                }
                for (const reg of this.departements.map(elt => elt.regionDto)) {
                    if (!this.regions.map(elt => elt.idregion).includes(reg.idregion)) {
                        this.regions.push(reg)
                    }
                }
                this.regions = this.regions.sort((a, b) => a.intitule > b.intitule ? 1 : -1)
                this.arrondissements2=this.arrondissements
                this.departements2=this.departements
                //     let tab=await this.$abbattage.get('tiges/abattage_permis_approuver?idorganisation='+this.entite.idorganisation)
                //     .then(resp=>{
                //         if(resp.status===200){
                //             console.log(resp)
                //             return resp.data.result.Items
                //         }
                //     })
                // this.assiettes=[...new Set(tab.map(elt=>elt.idaac))]
                this.getAssiettes()
                this.showOverlayData=false;
            }catch(error){
                console.log('error',error.message)
                this.showOverlayData=false
                return this.sendAlertMessage({message:error.message})
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
        }
        },
    mounted() {
        // console.log(this.commande)
        if(!this.isMinfof){
            this.entite.libelle=this.user.profil.organisation
            this.entite.idorganisation=this.user.idOrganisation
        }
        this.getData()
    },
}
</script>

<style scoped>

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
  
.disable-li{
  pointer-events:none; 
  opacity:0.6;      
}

ul li{
    list-style-type: none;
}
.link-import-file{
    font-family: 'Verdana';
    font-size: 13px;
    text-align: right;
    color: #333333;
    padding: 0px 6px 0px 0px;
    font-weight: normal;
}
.link-import-file:hover{
    color: #82c138;  
}

.header{
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-image: url('~@/assets/images/image.png');
    height: 40;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 5px 10px;
}

.close {
    font-size: 20px;
}


.btns {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    
}
.ok-btn {
    border: none;
    height: 40px;
    text-align: center;
    background-color: rgb(0, 82, 44) !important;
    color: white;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancell {
    border: none;
    width: 80px;
    height: 30px;
    text-align: center;
    background: rgba(57, 139, 15, 0.884);
    color: rgb(255, 255, 255);
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.cancelll {
    border: none;
    width: 80px;
    height: 30px;
    text-align: center;
    background: rgba(102, 201, 53, 0.37);
    color: rgb(14, 13, 13);
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}

.check { 
    background: #ee05118a;
    height: 60px;
    width: 60px;
    border-radius:  50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon{

    color: rgb(245, 237, 237);
}
.footer{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 40;
    padding: 0;
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

</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
