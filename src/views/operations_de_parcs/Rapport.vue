<template>
    <div id="cover">
        <b-row>
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
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingLettresVoiturePeriode" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingLettresVoiturePeriodeDetails" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing détaillé des lettres de voiture</b-link>
                                </li>
                                <li class="mr-4 ">
                                    <b-link @click.prevent="showEntreeParcDialog" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des entrées parc</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingBillonageParc" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc usine</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingGrumesMeresBillonnees" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des grumes mères billonnées</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingEvacuations" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des évacuations</b-link>
                                </li>
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingAbattageAac" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des abattages par AAC</b-link>
                                </li> -->
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingBillonnagesParcForet" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc forêt</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingEvacuationsGrume" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des évacuations grume</b-link>
                                </li>
                                <!-- <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingLettresVoiturePeriode" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture par période</b-link>
                                </li> -->
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingAbattageEssenceZone" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des abattages par essence et zone</b-link>
                                </li> -->
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingGrumeMereBillonneeEssence" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des grumes mères billonées par essence</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingBillonnagesParcUsineParEssence" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des billonages parc usine par essence</b-link>
                                </li>
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingEssencesInventoriees" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des essences inventoriées</b-link>
                                </li> -->
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingVolumesInventoriesTitre" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des volumes inventoriés par type de titre</b-link>
                                </li> -->
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingQuantitatifLVStatut" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing quantitatif des LV par statut</b-link>
                                </li>
                                <li class="mr-4 mb-2">
                                    <!-- <b-link @click.prevent="showListingLV" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lettres de voiture</b-link> -->
                                </li>
                                <!-- <li class="mr-2">
                                    <b-link  style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des titres opérationnels</b-link>
                                </li> -->
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingVolumesTransferes" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des volumes transférés</b-link>
                                </li> -->
                                <!-- <li class="mr-2">
                                    <b-link style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des sociétés agréés</b-link>
                                </li> -->
                                <li class="mr-4 mb-2">
                                    <b-link @click.prevent="showListingLotsRegularisation" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des lots de régularisation</b-link>
                                </li>
                                <!-- <li class="mr-2">
                                    <b-link @click.prevent="showListingSuperficiesTypeTitre" style="color:#285430;font-size:.9rem" href=""><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Listing des superficies exploitées par type de titre</b-link>
                                </li> -->
                            </ul>
                        </b-collapse>
            </b-col>
        </b-row>

        <!--<EntreeParcDialog ref="listingEntreeParc">
            <template #footer-buttons>
                <ul style="display:flex;margin-bottom:0">
                    <li  class="mr-3">
                        <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img> &nbsp;PDF</b-link>
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
        </EntreeParcDialog>-->
        <EntreeParcDialog ref="listingEntreeParc">
           
        </EntreeParcDialog>
       
        
    </div>
</template>
<script>
    import RejectionModal from '../../components/utils/RejectionModal.vue'
    import EntreeParcDialog from '@/components/utils/rapport/Operations_de_parc/MultiUsageDialog.vue'
    export default{
        data(){
            return{
                visible:false,
                visible8:false,
            }
        },
        components:{
            RejectionModal,
            EntreeParcDialog
        },
        methods:{
            showEntreeParcDialog(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des entrées parc',
                    commande:1
                })
            },
            // showLettreVoitureDialog(){
            //     this.$refs.listingEntreeParc.show({
            //         title:'Listing des lettres de voiture',
            //         commande:2
            //     })
            // },
            // showLettreVoitureDialogDetails(){
            //     this.$refs.listingEntreeParc.show({
            //         title:'Listing des lettres de voiture',
            //         commande:2
            //     })
            // },
            showListingBillonageParc(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des billonnages parc usine',
                    showOrganisation:true,
                    showSite:true,
                })
            },
            showListingGrumesMeresBillonnees(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des grumes mères billonnées',
                    showOrganisation:true,
                    showSite:true,
                    showEssence:true
                })
            },
            showListingEvacuations(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des Evacuations',
                    showOrganisation:true,
                    showAssiette:true,
                })
            },
            showListingAbattageAac(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des abattages par AAC',
                    commande:4
                })
            },
            showListingBillonnagesParcForet(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des billonages parc forêt',
                    showOrganisation:true,
                    showAssiette:true,
                })
            },
            showListingEvacuationsGrume(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des évacuations grume',
                    showOrganisation:true,
                    showAssiette:true,
                })
            },
            showListingLettresVoiturePeriode(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des lettres de voiture',
                    commande:3
                })
            },
            showListingLettresVoiturePeriodeDetails(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing détaillé des lettres de voiture',
                    commande:33
                })
            },
            showListingAbattageEssenceZone(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des abattages par essence et zone',
                    showOrganisation:true,
                    showEssence:true,
                    showZone:true,
                    showRegion:true,
                    showDepartement:true,
                    showArrondissement:true
                })
            },
            showListingGrumeMereBillonneeEssence(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des Grumes mères billonnées par essence',
                    showOrganisation:true,
                    showEssence:true,
                })
            },
            showListingBillonnagesParcUsineParEssence(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des Grumes mères billonnées par essence',
                    showOrganisation:true,
                    showSite:true,
                    showEssence:true,
                })
            },
            showListingVolumesInventoriesTitre(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des Volumes inventoriés par type de titre',
                    showOrganisation:true,
                    showExercice:true
                })
            },
            showListingQuantitatifLVStatut(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des Volumes inventoriés par type de titre',
                    showOrganisation:true,
                    
                })
            },
            showListingLV(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing lettres de voiture',
                    showOrganisation:true,
                    showSite:true,
                    showRapport:true
                })
            },
            showListingVolumesTransferes(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing lettres de voiture',
                    showOrganisation:true,
                    showRegion:true,
                    showEssence:true,
                    showRapport2:true
                })
            },
            showListingLotsRegularisation(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des lots de régularisation',
                    showStatut:true,
                })
            },showListingSuperficiesTypeTitre(){
                this.$refs.listingEntreeParc.show({
                    title:'Listing des lots de régularisation',
                    showTitre:true,
                })
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