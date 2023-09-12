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
        <slot name="content">
            <div class="p-2">
                    <b-row v-if="showPeriod">
                        <b-col cols="4">
                            <span class="text-danger">*</span>Période des opérations du
                        </b-col>
                        <b-col>
                            <input type="date" placeholder="dd-mm-yyyy" class="default-old-system-select-properties" @change="$emit('debut',debut)" v-model="debut"/>
                        </b-col>
                        <b-col cols="1"><span class="text-danger">*</span>AU</b-col>
                        <b-col><input type="date" class="default-old-system-select-properties" @change="$emit('fin',fin)" v-model="fin"/></b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showExercice">
                        <b-col cols="2">
                            Exercice
                        </b-col>
                        <b-col cols="6">
                            <input type="number"  placeholder="exemple: 2020"/>
                        </b-col>
                    </b-row>
                    <b-overlay rounded="sm">
                        <b-row class="my-1" v-if="showOrganisation">
                            <b-col cols="2">
                                Organisation
                            </b-col>
                            <b-col cols="6">
                                <v-select v-if="!isMinfof" class="custom-select-type_titre"
                                        :options="paginatedEntities" :filterable="false" v-model="entity"
                                        @search="onSearchEntities" @open="getEntities" label="intitule"
                                    >
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPageEntities" @click="offsetEntities-=limitEntities">Prev</button>
                                    <button :disabled="!hasNextPageEntities" @click="offsetEntities+=limitEntities">Next</button>
                                        </li>
                                    </v-select>
                                <input v-else type="text" disabled value="JERUN & Cie"/>
                            </b-col>
                        </b-row>
                    </b-overlay>
                    <b-overlay :show="showOverlaySites" rounded="sm">
                        <b-row class="my-1" v-if="showSite">
                            <b-col cols="2">
                                Site
                            </b-col>
                            <b-col cols="6">
                                <v-select class="custom-select-type_titre"
                                    @open="getSites" @search="onSearchSites" label="INTITULE" :options="paginatedSites"
                                    :filterable="false"
                                    v-model="site"
                                >
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageSites" @click="this.offsetSites-=this.limitSites">Prev</button>
                                        <button :disabled="!hasNextPageSites" @click="this.offsetSites+=this.limitSites">Next</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                    </b-overlay>
                    <b-overlay rounded="sm" :show="showOverlayEssences">
                        <b-row class="my-1" v-if="showEssence">
                            <b-col cols="2">
                                Essence
                            </b-col>
                            <b-col cols="6">
                                <v-select @open="getEssences" class="custom-select-type_titre" :options="paginatedEssences" :filterable="false"
                                    @search="onSearchEssences"  label="NOMSCIENTIFIQUE"
                                    >
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageEssences" @click="offsetEssences-=limitEssences">Prev</button>
                                        <button :disabled="!hasNextPageEssences" @click="offsetEssences+=limitEssences">Next</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                    </b-overlay>
                    <b-overlay rounded="sm" :show="showOverlayEntities">
                        <b-row class="my-1" v-if="showEntite">
                            <b-col cols="4">
                                Entité forestiere
                            </b-col>
                            <b-col cols="5">
                                <v-select v-if="isMinfof" class="custom-select-type_titre"
                                    
                                    @input="$emit('entite',entity.idorganisation)"
                                    :options="paginatedEntities" :filterable="false" v-model="entity"
                                    @search="onSearchEntities" @open="getEntities" label="intitule"
                                >
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageEntities" @click="offsetEntities-=limitEntities">Prev</button>
                                <button :disabled="!hasNextPageEntities" @click="offsetEntities+=limitEntities">Next</button>
                                    </li>
                                </v-select>
                                <input v-else type="text" disabled v-model="entity.libelle"/>
                            </b-col>
                        </b-row>
                    </b-overlay>
                    <b-overlay rounded="sm" :show="showOverlayUsage">
                        <b-row class="my-1" v-if="showUsage">
                            <b-col cols="4">
                                Usage
                            </b-col>
                            <b-col cols="5">
                                <v-select class="custom-select-type_titre"
                                    @input="$emit('usage',usage.code)"
                                    v-model="usage"
                                    label="label"
                                    :options="optionsUsage" 
                                >
                                </v-select>
                            </b-col>
                        </b-row>
                    </b-overlay>
                    <b-row class="my-1" v-if="showAssiette">
                        <b-col cols="2">
                            Numéro  de l'assiette
                        </b-col>
                        <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showRapport">
                        <b-col cols="2">
                            Rapport
                        </b-col>
                        <b-col cols="6">
                            <b-form-group style="font-style: normal;">
                                <b-form-radio  name="radios" value="">Grume par entrée parc</b-form-radio>
                                <b-form-radio  name="radios" value="">Débité par entrée parc</b-form-radio>
                                <b-form-radio  name="radios" value="">Grume par destination</b-form-radio>
                                <b-form-radio  name="radios" value="">Débité par destination</b-form-radio>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    
                    <b-row class="my-1" v-if="showAssiette">
                        <b-col cols="2">
                            Numéro  de l'assiette
                        </b-col>
                        <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                    </b-row>
                    <!-- <b-row class="my-1" v-if="showEntite">
                        <b-col cols="2">
                            Entité forestiere
                        </b-col>
                        <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                    </b-row> -->
                    <b-row class="my-1" v-if="showZone">
                        <b-col cols="2">
                            Zone
                        </b-col>
                        <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showRegion">
                        <b-col cols="2">
                            Région
                        </b-col>
                        <b-col cols="6">
                            <v-select class="custom-select-type_titre" :options="regions">

                            </v-select>
                        </b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showRapport2">
                        <b-col cols="2">
                            Rapport
                        </b-col>
                        <b-col cols="6">
                            <b-form-group style="font-style: normal;">
                                <b-form-radio  name="radios2" value="">Grume par entrée parc</b-form-radio>
                                <b-form-radio  name="radios2" value="">Débité par entrée parc</b-form-radio>
                                <b-form-radio  name="radios2" value="">Grume par destination</b-form-radio>
                                <b-form-radio  name="radios2" value="">Débité par destination</b-form-radio>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showDepartement">
                        <b-col cols="2">
                            Département
                        </b-col>
                        <b-col cols="6"><v-select class="custom-select-type_titre"></v-select></b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showArrondissement">
                        <b-col cols="2">
                            Arrondissement
                        </b-col>
                        <b-col cols="6">
                            <v-select :options="paginatedArrond" v-model="arrondissement" :filterable="false" @search="onSearchArrond" label="intitule" class="custom-select-type_titre">
                          <li slot="list-footer" class="pagination">
                              <button :disabled="!hasPrevPageArrond" @click="offsetArrond -= limitArrond">Prèc.</button>
                              <button :disabled="!hasNextPageArrond" @click="offsetArrond += limitArrond">Suiv.</button>
                          </li>
                        </v-select>
                    </b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showOperation">
                        <b-col cols="3">
                            Type d'opération
                        </b-col>
                        <b-col cols="6">
                            <select class="default-old-system-select-properties">
                                <option value=""></option>
                                <option value="lvd">LVD</option>
                                <option value="lvg">LVG</option>
                            </select>
                    </b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showStatut">
                        <b-col cols="2">
                           Statut
                        </b-col>
                        <b-col cols="6">
                            <select class="default-old-system-select-properties">
                                <option value="">Brouillon</option>
                                <option value="soumis">Soumise</option>
                                <option value="valide">Validée</option>
                                <option value="soumiscours">Soumission en cours</option>
                            </select>
                        </b-col>
                    </b-row>
                    <b-row class="my-1" v-if="showTitre">
                        <b-col cols="2">
                           Type de titre
                        </b-col>
                        <b-col cols="8">
                            <b-overlay rounded="sm" :show="showOverlayTypestitre">
                                <template #overlay>
                                    <div class="text-center">
                                        <i class="fas fa-2x fa-sync fa-spin"></i>
                                        <p id="cancel-label">Chargement...</p>
                                    </div>
                                </template>
                                
                                <v-select @input="$emit('typeTitre',search.typetitre)"  @open="getTypestitres" :options="typesTitres" v-model="search.typetitre"  :reduce="typetitre => typetitre.code" label="libelle" class="custom-select-type_titre"></v-select> 
                                
                            </b-overlay>
                        </b-col>
                    </b-row>
                    <b-row class="my-1" >
                        <div v-if="showTitreSuite">
                            <b-col cols="2">
                            Titre n°
                            </b-col>
                            <b-col cols="3">
                                <input type="text" @input="$emit('nroTitre',nroTitre)" v-model="nroTitre"/>
                            </b-col>
                        </div>
                        <div v-if="showNumPermis">
                            <b-col></b-col>
                            <b-col cols="2">
                                N° permis
                            </b-col>
                            <b-col cols="4">
                                <input type="text" @input="$emit('nroPermis',nroPermis)" v-model="nroPermis"/>
                            </b-col>
                        </div>
                    </b-row>
                    <b-row class="my-1" v-if="showPosition">
                        <b-col cols="4">
                            <label style="color:inherit">Par position des tiges</label>&nbsp;
                            <input type="checkbox" v-model="acceptPosition" @change="$emit('acceptPosition',acceptPosition)"/>
                        </b-col>
                    </b-row>
                </div>
        </slot>
        <slot name="footer">
            <div class="px-4 pt-2 pb-2">
                <slot name="footer-buttons">
                    <div style="display:flex;align-items: center;">
                        <a href="#" style="color:green;margin-right:5px" class="link-import-file" @click="_close"><b-img src="@/assets/images/picto_check_vert.png"></b-img>&nbsp;{{ okButton }}</a>
                        <a href="#" style="display:flex;justify-content:space-between;align-items:center;color:green" class="link-import-file"   @click="_cancel"><b-img src="@/assets/images/picto_croix_rouge.png"></b-img>&nbsp;{{ cancelButton }}</a>
                    </div>
                </slot>
            </div>
        </slot>
    </popup-reject-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import PopupRejectModal from './PopupRejectModal.vue'
import departements from '@/data/departements.js'
import arrondissements from '@/data/arrondissements.js'
const php  = require ( 'phpjs' ) ;

export default {
    name: 'ImportFile',

    components: { PopupRejectModal },
    computed:{
        ...mapGetters(['user','hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
                return true;
            }else{
                return false;
            }
        },
        
        filteredEntities(){
            return this.entitiesWithoutMinfof.filter(entity=>
                entity.intitule.toLocaleLowerCase().includes(this.searchEntities.toLocaleLowerCase())
            )
        },
        paginatedEntities(){
            return this.filteredEntities.slice(this.offsetEntities, this.limitEntities + this.offsetEntities)
        },
        hasNextPageEntities() {
        const nextOffset = this.offsetEntities + this.limitEntities
        return Boolean(
            this.filteredEntities?.slice(nextOffset, this.limitEntities + nextOffset).length
        )
        },
        hasPrevPageEntities() {
        const prevOffset = this.offsetEntities - this.limitEntities
        return Boolean(
            this.filteredEntities?.slice(prevOffset, this.limitEntities + prevOffset).length
        )
        },

        // sites
        filteredSites(){
            return this.sites.filter(entity=>
                entity.INTITULE.toLocaleLowerCase().includes(this.searchSites.toLocaleLowerCase())
            )
        },
        paginatedSites(){
            return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetEntities)
        },
        hasNextPageSites() {
        const nextOffset = this.offsetSites + this.limitSites
        return Boolean(
            this.filteredSites?.slice(nextOffset, this.limitSites + nextOffset).length
        )
        },
        hasPrevPageSites() {
        const prevOffset = this.offsetSites - this.limitSites
        return Boolean(
            this.filteredSites?.slice(prevOffset, this.limitSites + prevOffset).length
        )
        },

        // essences
    filteredEssences(){
      return this.essences?.filter((essence) =>
      essence.NOMSCIENTIFIQUE.toLocaleLowerCase().includes(this.searchEssences.toLocaleLowerCase())
      )
    },
    paginatedEssences(){
      return this.filteredEssences.slice(this.offsetEssences,this.offsetEssences + this.limitEssences)
    },
    hasNextPageEssences() {
      const nextOffset = this.offsetEssences + this.limitEssences
      return Boolean(
        this.filteredEssences?.slice(nextOffset, this.limitEssences + nextOffset).length
      )
    },
    hasPrevPageEssences() {
      const prevOffset = this.offsetEssences - this.limitEssences
      return Boolean(
        this.filteredEssences?.slice(prevOffset, this.limitEssences + prevOffset).length
      )
    },

    // arrondissements
    filteredArrond() {
      return this.arrondissements.filter((arrond) =>
        arrond.intitule.toLocaleLowerCase().includes(this.searchArrond.toLocaleLowerCase())
      )
    },
    paginatedArrond() {
      return this.filteredArrond.slice(this.offsetArrond, this.limitArrond + this.offsetArrond)
    },
    hasNextPageArrond() {
          const nextOffset = this.offsetArrond + this.limitArrond
          return Boolean(
            this.filteredArrond.slice(nextOffset, this.limitArrond + nextOffset).length
          )
        },
    hasPrevPageArrond() {   
          const prevOffset = this.offsetArrond - this.limitArrond
          return Boolean(
            this.filteredArrond.slice(prevOffset, this.limitArrond + prevOffset).length
          )
    },
    },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        motifrejet:'',

        nroTitre:'',
        nroPermis:'',

        file: undefined, //file object that the user selected
        content: [], // JSON representative of the cs file
        parsed: false,//indicateur marquant le fait que le fichier a été analysé,
        debut:'',
        fin:'',
        showOrganisation:false,
        showPosition:false,
        showNumPermis:false,
        showExercice:false,
        showSite:false,
        showEssence:false,
        showEntite:false,
        showStatut:false,
        showAssiette:false,
        showOperation:false,
        showZone:false,
        showRegion:false,
        showDepartement:false,
        showArrondissement:false,
        showRapport2:false,
        showRapport:false,
        showTitre:false,
        showTitreSuite:false,
        showUsage:false,
        showPeriod:true,
        usage:'',
        optionsUsage:[
            {label:'Grume',code:0},
            {label:'Colis',code:1},
            {label:'Bois CEMAC - Grume',code:2},
            {label:'Grume - Abattage',code:3},
            {label:'Lettre de voiture',code:4},
            {label:'Permis',code:5},
            {label:'Bois CEMAC - Colis',code:6},
            {label:'Notif primitive',code:7},
            {label:'Autorisation FLEGT',code:8},
        ],
        // regions:['ADAMAOUA','CENTRE','EST','EXTREME-NORD','LITTORAL','NORD','NORD-OUEST','OUEST','SUD','SUD-OUEST'],

        // entities for v-select
         // entités forestières
        entity:{
            idorganisation:'',
            libelle:''
        },
        searchEntities:'',
        offsetEntities:0,
        limitEntities:10,
        entitiesWithoutMinfof:[],
        showOverlayEntities:false,

        // Usage
        showOverlayUsage:false,

        showOverlayTypestitre:false,
        typesTitres:[],

        // sites v-select
         site:'',
        searchSites:'',
        offsetSites:0,
        limitSites:10,
        sites:[],
        showOverlaySites:false,

        // essences v-select
        essence:'',
        searchEssences:'',
        offsetEssences:0,
        limitEssences:10,
        essences:[],
        showOverlayEssences:false,

        search:{
            entite:'', site:'', essence:'',typetitre:''
        },
        acceptPosition:false,
        // arrondissements
        // essences v-select
        arrondissement:'',
        searchArrond:'',
        offsetArrond:0,
        limitArrond:10,
        arrondissements:arrondissements,
        showOverlayArrondissements:false,
        }),
        mounted(){
            // this.$emit('dates',{debut,fin})
            if(!this.isMinfof){
            this.entity.libelle=this.user.profil.organisation
            this.entity.idorganisation=this.user.idOrganisation
            this.$emit('entite',this.entity.idorganisation)
        }
        },

    methods: {
        show(opts = {}) {
            this.showOrganisation=opts.showOrganisation
            this.showExercice=opts.showExercice
            this.showPeriod=opts.showPeriod
            this.showSite=opts.showSite
            this.showEssence=opts.showEssence
            this.showEntite=opts.showEntite
            this.showAssiette=opts.showAssiette
            this.showUsage=opts.showUsage
            this.showAssiette=opts.showAssiette
            this.showOperation=opts.showOperation
            this.showStatut=opts.showStatut
            this.showRapport=opts.showRapport
            this.showRapport2=opts.showRapport2
            this.showTitre=opts.showTitre
            this.showPosition=opts.showPosition
            this.showNumPermis=opts.showNumPermis
            this.showTitreSuite=opts.showTitreSuite
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton,
            this.showZone=opts.showZone
            this.showRegion=opts.showRegion
            this.showDepartement=opts.showDepartement
            this.showArrondissement=opts.showArrondissement
            // this.$emit('change-date',{debut:this.debut,fin:this.fin})
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

        reset(){
           this.debut='' 
           this.fin=''
           this.search.entity=''
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
            this.reset()
        },
        // handleFileUpload(event){
        //     this.$emit('fileupload',event)
        // }
        // entities
        async getEntities(){
            this.showOverlayEntities=true
            if(!php.empty(this.$store.state.entiteswithoutminfof)){
                this.entitiesWithoutMinfof=this.$store.state.entiteswithoutminfof
                console.log('entrée ds le store')
                // console.log(this.$store.state.entiteswithoutminfof)
                this.showOverlayEntities=false
            }else{
                await this.$donneesReference.get('entites/entite_forestier')
                .then(response=>{
                    this.entitiesWithoutMINFOF=response.data.result.items
                    console.log('requête vers api')
                    this.$store.dispatch('entiteswithoutminfof',this.entitiesWithoutMINFOF)
                    this.showOverlayEntities=false
                    })
                .catch(err=>{
                    this.showOverlayEntities=false
                    App.notifySuccess(err.message)
                })
            }
        },
        // sites
        onSearchEntities(query){
            this.searchEntities=query
            this.offsetEntities=0
        },
        async getSites(){
            this.showOverlaySites=true
            if(!php.empty(this.$store.state.sites)){
                this.sites=this.$store.state.sites
                console.log('entrée ds le store')
                this.showOverlaySites=false
            }else{
                await this.$donneesReference.get("sites/all")
                .then(response=>{
                    this.sites=response.data.result
                    console.log('requête vers api')
                    this.$store.dispatch('sites',this.sites)
                    this.showOverlaySites=false
                    })
                .catch(err=>{
                    this.showOverlaySites=false
                    App.notifySuccess(err.message)
                })
            }
        },
        onSearchSites(query){
            this.searchSites=query
            this.offsetSites=0
        },
        // essences
        async getEssences(){
            this.showOverlayEssences=true
            if(!php.empty(this.$store.state.essences)){
            console.log('entree store')
            this.essences=this.$store.state.essences
            this.showOverlayEssences=false
            }else{
            console.log('requête api')
            await this.$donneesReference.get('essences/raw')
                .then(response=>{
                this.essences=response.data.result
                this.$store.dispatch('essences',this.essences)
                }).catch(err=>console.log(err))
                this.showOverlayEssences=false
            }
        },
        onSearchEssences(query){
            this.onSearchEssences=query
            this.offsetEssences=0
        },
        // arrondissements
        onSearchArrond(query) {
            this.searchArrond = query
            this.offsetArrond = 0
        },

        //listing des essences
        async getTypestitres(){
            this.showOverlayTypestitre=true;
            if (!php.empty(this.$store.state.typesTitres) ) {
                this.typesTitres = this.$store.state.typesTitres;
                this.showOverlayTypestitre=false;
            } 
            else {
                try {
                    this.typesTitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
                    this.$store.dispatch('typesTitres', this.typesTitres)
                    this.showOverlayTypestitre=false;
                } catch (error) {
                    App.notifyError(error.message);
                }
            }
        },

    },
}
</script>

<style scoped>
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


</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
