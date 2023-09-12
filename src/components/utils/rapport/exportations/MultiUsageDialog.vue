<template>
    <popup-reject-modal :largeur="Number('600')" size="lg" ref="popup">
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
                    <b-row class="my-1">
                        <b-col cols="4">
                            Exercice
                        </b-col>
                        <b-col cols="6">
                            <input v-model="search.exercice" class="default-old-system-input-properties" />
                        </b-col>
                    </b-row>
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                        <template #overlay>
                        <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                        </div>
                        </template>
                        <b-row class="my-1" >
                            <b-col cols="4" >Entité forrestière</b-col>
                            <b-col cols="6">
                                <v-select v-if="isMinfof" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  label="intitule" class="custom-select-type_titre">
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
                    <b-overlay rounded="sm" :show="showOverlayEssence">
                        <template #overlay>
                        <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                        </div>
                        </template>
                        <b-row class="my-1">
                            <b-col cols="4">
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
                    <b-row class="my-1">
                        <b-col cols="4">
                            Pays de destination
                        </b-col>
                        <b-col cols="6">
                            <v-select :options="paginatedDestinations" v-model="search.destination" label="paysDestination"   :filterable="false"  @search="onSearchDestination" class="custom-select-type_titre">
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageDestinations" @click="offsetDestinations -= limitDestinations">Prèc.</button>
                                    <button :disabled="!hasNextPageDestinations" @click="offsetDestinations += limitDestinations">Suiv.</button>
                                </li>
                            </v-select>
                        </b-col>
                    </b-row>
                    <b-row class="my-1" >
                        <b-col cols="4">
                            Port d'embarquement
                        </b-col>
                        <b-col cols="6">
                            <v-select :options="paginatedEmbarquement" v-model="search.embarquement" label="paysEmbarquement"   :filterable="false"  @search="onSearchEmbarquement" class="custom-select-type_titre">
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEmbarquement" @click="offsetEmbarquement -= limitEmbarquement">Prèc.</button>
                                    <button :disabled="!hasNextPageEmbarquement" @click="offsetEmbarquement += limitEmbarquement">Suiv.</button>
                                </li>
                            </v-select>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col cols="4">
                            Port de débarquement
                        </b-col>
                        <b-col cols="6">
                            <v-select :options="paginatedDebarquement" v-model="search.debarquement" label="idaac" :reduce="elt=>elt.idaac"  :filterable="false"  @search="onSearchDebarquement" class="custom-select-type_titre">
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageDebarquement" @click="offsetDebarquement -= limitDebarquement">Prèc.</button>
                                    <button :disabled="!hasNextPageDebarquement" @click="offsetDebarquement += limitDebarquement">Suiv.</button>
                                </li>
                            </v-select>
                        </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col cols="4">
                            Type de produit
                        </b-col>
                        <b-col cols="6">
                            <select class="w-50 default-old-system-input-properties" v-model="search.produit">
                                <option value=""></option>
                                <option value="GR">Grumes</option>
                                <option value="CL">Débités</option>
                                <option value="PS">Produit spécial</option>
                            </select>
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
                            <li class="mr-3">
                                <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconIMPRIMER_16x16.png"></b-img>&nbsp;Excel</b-link>
                            </li>
                            <li class="mr-3">
                                <b-link style="color:#285430;font-size:.9rem"><b-img src="@/assets/images/iconACTUALISER_16x16.png"></b-img>&nbsp;Réinitialiser</b-link>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </slot>
            <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
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
        
        // entités
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
        },


        // pays de destination
        filteredDestinations() {
            return this.destinations.filter((entite) =>
                entite.paysDestination.toLocaleLowerCase().includes(this.searchDestination.toLocaleLowerCase())
            )
        },
        paginatedDestinations() {
        return this.filteredDestinations.slice(this.offsetDestinations, this.limitDestinations + this.offsetDestinations)
        },
        hasNextPageDestinations() {
            const nextOffset = this.offsetDestinations + this.limitDestinations
            return Boolean(
                this.filteredDestinations.slice(nextOffset, this.limitDestinations + nextOffset).length
            )
        },
        hasPrevPageDestinations(){   
            const prevOffset = this.offsetDestinations - this.limitDestinations
            return Boolean(
                this.filteredDestinations.slice(prevOffset, this.limitDestinations + prevOffset).length
            )
        },

        // pays d'embarquement
        filteredEmbarquement() {
            // console.log(this.embarquements)
            return this.embarquements.filter((entite) =>
                entite.paysEmbarquement.toLocaleLowerCase().includes(this.searchEmbarquement.toLocaleLowerCase())
            )
        },
        paginatedEmbarquement() {
            // console.log(this.embarquements)
            return this.filteredEmbarquement.slice(this.offsetEmbarquement, this.limitEmbarquement + this.offsetEmbarquement)
        },
        hasNextPageEmbarquement() {
            const nextOffset = this.offsetEmbarquement + this.limitEmbarquement
            return Boolean(
                this.filteredEmbarquement.slice(nextOffset, this.limitEmbarquement + nextOffset).length
            )
        },
        hasPrevPageEmbarquement(){   
            const prevOffset = this.offsetEmbarquement - this.limitEmbarquement
            return Boolean(
                this.filteredEmbarquement.slice(prevOffset, this.limitEmbarquement + prevOffset).length
            )
        },
        // pays débarquement
        filteredDebarquement() {
            return this.debarquements.filter((entite) =>
                entite.intitule.toLocaleLowerCase().includes(this.searchDebarquement.toLocaleLowerCase())
            )
        },
        paginatedDebarquement() {
        return this.filteredEmbarquement.slice(this.offsetDebarquement, this.limitDebarquement + this.offsetDebarquement)
        },
        hasNextPageDebarquement() {
            const nextOffset = this.offsetDebarquement + this.limitDebarquement
            return Boolean(
                this.filteredEmbarquement.slice(nextOffset, this.limitEmbarquement + nextOffset).length
            )
        },
        hasPrevPageDebarquement(){   
            const prevOffset = this.offsetDebarquement - this.limitDebarquement
            return Boolean(
                this.filteredDebarquement.slice(prevOffset, this.limitDebarquement + prevOffset).length
            )
        }
    },

    data: () => ({
        showOverlayEssence:false,
        showDate:true,
        showOverlayEssence2:false,
        showOverlayData:false,
        showOverlayDestinations:false,
        showOverlayEmbarquement:false,
        showOverlayDebarquement:false,
        essences:[],
        arrondissements:[],
        arrondissements2:[],
        departements:[],
        regions:[],
        titres:[],
        typesTitres:[],
        essences2:[],
        assiettes:[],
        destinations:[],
        debarquements:[],
        embarquements:[],
        offsetEssences: 0,
        limitEssences: 10,
        offsetDestinations: 0,
        limitDestinations: 10,
        offsetDebarquements: 0,
        limitDebarquements: 10,
        offsetEmbarquement: 0,
        limitEmbarquement: 10,
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
        searchDestination:'',
        searchEmbarquement:'',
        searchDebarquement:'',
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
            exercice:'',entite:'',destination:'',embarquement:''
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

        postData(){
            // this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            // this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("ItextController/listingBSE", {
                "exercice":this.search.exercice,
                "idorganisation": Number(this.search.entite),
                "idessence":Number(this.search.essence),
                "idsiteEmbarquement":Number(this.search.embarquement.embarquement),
                "port":this.search.embarquement.paysEmbarquement,
                "typeProduit":this.search.produit,
                // "idorganisation":this.search.entite,
                // "datedebut": this.search.datedebut,
                // "datefin":this.search.datefin,
                // "idessence": Number(this.search.essence),
                // "idsiteoper":Number(this.search.site)
            },{responseType:'blob'}).then((response) => { 
                // console.log('exécution ok 1',response.data); 
                console.log(this.search)
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type:'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing BSE.pdf';
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

        viewPdf(){
                this.postData()
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
            this.showOverlayAssiette=true
            try{
                let tab=await this.$abbattage.get('tiges/abattage_permis_approuver?idorganisation='+this.entite.idorganisation)
                    .then(resp=>{
                        if(resp.status===200){
                            console.log(resp)
                            return resp.data.result.Items
                        }
                    })
                this.assiettes=[...new Set(tab.map(elt=>elt.idaac))]
            }catch(error){
                console.log(error.message)
            }
            this.showOverlayAssiette=false
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
        onSearchDestination(query){
            this.searchDestination = query
            this.offsetDestinations = 0
        },
        onSearchEmbarquement(query){
            this.searchEmbarquement = query
            this.offsetEmbarquement = 0
        },
        onSearchDebarquement(query){
            this.searchDebarquement= query
            this.offsetDebarquements = 0
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
                const tab=await this.$exportations.get('bses/detailler')
                    .then(resp=>resp.data.result.Items)
                const unique1Ids=[]
                this.embarquements=tab.map(elt=>{
                    return{
                        embarquement:elt.portembarquement,
                        paysEmbarquement:elt.intitulleportembarquement
                }})
                
                this.embarquements=this.embarquements.filter(elt=>{
                    const isDuplicate=unique1Ids.includes(elt.embarquement)
                    if(!isDuplicate){
                        unique1Ids.push(elt.embarquement)
                        return true
                    }
                    return false
                })
                this.destinations=tab.map(elt=>{
                        return {destination:elt.paysDestination,
                        paysDestination:elt.nompaysdest}
                })
                const uniqueIds=[]
                this.destinations=this.destinations.filter(elt=>{
                    const isDuplicate=uniqueIds.includes(elt.destination)
                    if(!isDuplicate){
                        uniqueIds.push(elt.destination)
                        return true
                    }
                    return false
                })
                console.log(this.embarquements)
                this.showOverlayData=false;
            }catch(error){
                console.log('error',error.message)
                this.showOverlayData=false
                return this.sendAlertMessage({message:error.message})
            }  
            // this.showOverlayData=false
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
.default-old-system-input-properties{
    font-weight: normal;
    border-color: #637A95;
    border-width: 1px;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: White;
    color: #333333;
    border: 1px solid #637A95;
    padding: 1px 2px 1px 3px;
    width: 170px;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'verdana';
    font-size: 13px;
    height: 20px;
    }

</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
