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
                <b-form-group v-if="commande===1 || commande===2"
                    label="Exercice:"
                    label-for="nested-street"
                    label-cols-sm="3"
                    label-align-sm="right"
                >
                    <b-form-input v-model="search.exercice" class="w-50 mt-2 default-old-system-input-properties"></b-form-input>
                </b-form-group>
                <b-overlay rounded="sm" :show="showOverlayEssence">
                    <template #overlay>
                    <div class="text-center">
                        <i class="fas fa-2x fa-sync fa-spin"></i>
                        <p id="cancel-label">Chargement...</p>
                    </div>
                    </template>
                    <b-row class="my-1" v-if="commande===2">
                        <b-col cols="3">
                            Essence
                        </b-col>
                        <b-col cols="6">
                            <v-select @open="getEssences" :options="paginatedEssences" v-model="search.essence" :filterable="false"  @search="onSearchEssence" label="NOMUSUEL" class="custom-select-type_titre">
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEssence" @click="offsetEssences -= limitEssences">Prèc.</button>
                                    <button :disabled="!hasNextPageEssence" @click="offsetEssences += limitEssences">Suiv.</button>
                                </li>
                            </v-select>
                        </b-col>
                    </b-row>
                        </b-overlay>
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
    </popup-reject-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import PopupRejectModal from '../../PopupRejectModal.vue'
const php = require("phpjs");

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
        wait:false,
        showOverlayEntite:false,
        showOverlayEssence:false,
        searchEssence:'',
        typesTitres:[],
        showOverlayTypestitre:false,
        searchentite:'',
        essences:[],
        offsetEssences: 0,
        limitEssences: 10,
        search:{
            entite:'',
            exercice:'',
            typetitre:'',
            csa:false,
            cfea:false,
            cpav:false,
            tv:false
        },
        entite:{
            idorganisation:'',
            libelle:''
        },
        showOverlayEntites:false,
        entiteswithoutminfof:[],
        offsetEntites:0, 
        limitEntites:10,
        disabled:false,
        // Parameters that change depending on the type of dialogue
        title: undefined,
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
        //listing des essences
        async getEssences(){
            this.showOverlayEssences=true;
            if (!php.empty(this.$store.state.essences) ) {
                this.essences = this.$store.state.essences;
                this.showOverlayEssences=false;
                console.log('in the store',this.essences)
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
        viewExcel(){
            this.postData22()
        },
        postData(){
            this.wait=true;
            this.$jasper.post("abattage/essence/pdf", {
                "exercice": this.search.exercice,
            },{responseType:'blob'}).then((response) => { 
                if(response.status==200) {
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing des essences inventoriées.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    this.wait=false;
                   this.resetData() //on re-initialise les champs du formulaire
                   
                }  

            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;

            });
        },
        postData2(){
            this.wait=true;
            this.$jasper.post("abattage/essence/avec-titre/pdf", {
                "exercice": Number(this.search.exercice),
                "idessence":Number(this.search.essence.IDESSENCE)
                // "exercice": 2023,
                // "idorganisation": 95,
                // "typetitre": "CP"
            },{responseType:'blob'}).then((response) => { 
                if(response.status==200) {
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing d\'une essence inventoriee.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    this.wait=false;
                   this.resetData() //on re-initialise les champs du formulaire
                   
                }  
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;

            });
        },
        postData22(){
            this.search.datedebut=new Date(this.search.datedebut).toLocaleDateString()
            this.search.datefin=new Date(this.search.datefin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("ItextController/listeTitrePdf/excel", {
                "exercice": Number(this.search.exercice),
                "idorganisation": Number(this.search.entite),
                "typetitre": this.search.typetitre
                // "exercice": 2023,
                // "idorganisation": 95,
                // "typetitre": "CP"
            },{responseType:'blob'}).then((response) => { 
                if(response.status==200) {
                    const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing des titres valides.xls';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    this.wait=false;
                   this.resetData() //on re-initialise les champs du formulaire
                   
                }  
            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;

            });
        },
        viewPdf(){
            if(this.commande==1){
                this.postData();
            }
            if(this.commande==2){
                this.postData2()
            }
        },
        resetData(){
          for(let t in this.search){
            this.search[t]=''
          }
        },
        showTitre(){
            console.log(this.search.typetitre)
            console.log(this.entite.idorganisation)
        },
        //listing des essences
        async getTypestitres(){
            
            this.showOverlayTypestitre=true;
            if(false){

            }
            // if (!php.empty(this.$store.state.typesTitres) ) {
            //     this.typesTitres = this.$store.state.typesTitres;
            //     this.showOverlayTypestitre=false;
            // } 
            else{
                if(this.isMinfof){
                    this.entite.idorganisation=this.search.entite.idorganisation
                }
                if(this.entite.idorganisation){
                    try {
                    this.typesTitres= await this.$abbattage.get("tiges/abattage_permis_approuver?idorganisation="+this.entite.idorganisation)
                        .then(response => {
                            // const tab=response.data.result.Items
                            const tab=response.data.result.Items.filter(elt=>elt.statut==="1").map(elt=>{
                                if(elt.typetitre==='CD'){
                                    elt.label='Concession forestière en Convention Définitive'
                                }
                                if(elt.typetitre==='CP'){
                                    elt.label='Concession forestière en Convention Provisoire'
                                }
                                if(elt.typetitre==='CC'){
                                    elt.label='Forêt communale'
                                }
                                if(elt.typetitre==='FS'){
                                    elt.label='Forêt communautaire en convention provisoire'
                                }
                                if(elt.typetitre==='FC'){
                                    elt.label='Forêt communautaire en convention définitive'
                                }
                                if(elt.typetitre==='VC'){
                                    elt.label='Vente de coupe'
                                }
                                if(elt.typetitre==='AR'){
                                    elt.label='ARB'
                                }
                                if(elt.typetitre==='BO'){
                                    elt.label='PEBO'
                                }
                                if(elt.typetitre==='AE'){
                                    elt.label='AEB'
                                }
                                if(elt.typetitre==='PS'){
                                    elt.label='Permis Spécial'
                                }
                                if(elt.typetitre==='AP'){
                                    elt.label='APC'
                                }
                                return {
                                    code:elt.typetitre,
                                    label:elt.label,
                                }
                            })
                            const uniqueIds=[]
                            return tab.filter(elt=>{
                                const isDuplicate=uniqueIds.includes(elt.code)
                                if(!isDuplicate){
                                    uniqueIds.push(elt.code)
                                    return true
                                }
                                return false
                            })
                        });
                    // this.$store.dispatch('typesTitres', this.typesTitres)
                    this.showOverlayTypestitre=false;
                } catch (error) {
                    this.showOverlayTypestitre=false
                    App.notifyError(error.message);
                }
                }
                
            }
        },
        onSearchEssence(query){
            this.searchEssence = query
            this.offsetEssences = 0
        },  
        //listing des sites
        async getSites(){
            this.showOverlaySite=true
            if(!php.empty(this.$store.state.sites)){
                this.sites=this.$store.state.sites
            }
            else{
                try {
                    this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
                    this.$store.dispatch('sites', this.sites)
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
        //liste des entités forrestières
        async getEntites(){
            this.showOverlayEntites=true;
            if (!php.empty(this.$store.state.entiteswithoutminfof)) {
                this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
            } 
            // else {
            //     try {
            //     this.entiteswithoutminfof= await this.$donneesReference.get("entites/all").then(response => response.data.result);
            //     this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
            //     } catch (error) {
            //     App.notifyError(error.message);
            //     }
            // }
            this.showOverlayEntites=false;
        },
        onSearchEntites(query){
            this.searchentite = query
            this.offsetEntites = 0
        },
        show(opts = {}) {
            this.resetData()
            this.title = opts.title
            this.commande = opts.commande
            this.message = opts.message
            this.okButton = opts.okButton
            this.showZone=opts.showZone,
            this.showRegion=opts.showRegion,
            this.showDepartement=opts.showDepartement
            this.showArrondissement=opts.showArrondissement
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
        }
    },
    mounted() {
        if(!this.isMinfof){
            this.entite.libelle=this.user.profil.organisation
            this.entite.idorganisation=this.user.idOrganisation
        }
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

</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
