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
            <div class="pr-5">
                <b-form-group
                        label="Exercice:"
                        label-for="nested-street"
                        label-cols-sm="3"
                        label-align-sm="right"
                    >
                        <b-form-input v-model="search.exercice" class="w-50 mt-2 default-old-system-input-properties"></b-form-input>
                </b-form-group>
                <b-overlay rounded="sm" :show="showOverlayEntite">
                        <template #overlay>
                        <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                        </div>
                        </template>
                        <b-form-group
                            label="Entité forrestière"
                            label-for="nested-street"
                            label-cols-sm="3"
                            label-align-sm="right"
                        >
                            <v-select v-if="isMinfof" @input="getData"  @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"   label="intitule" class="my-2 custom-select-type_titre">
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                    <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                </li>
                            </v-select>
                            <select v-else  class="my-2 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                <option selected="selected">{{ entite.libelle }}</option>
                            </select> 
                        </b-form-group>
                </b-overlay>
            <b-overlay rounded="sm" :show="showOverlayData">
                <div class="p-2">
                    <b-overlay rounded="sm" :show="showOverlayTypestitre">
                        <template #overlay>
                            <div class="text-center">
                                <i class="fas fa-2x fa-sync fa-spin"></i>
                                <p id="cancel-label">Chargement...</p>
                            </div>
                        </template>
                        <b-form-group
                            label="Type de titre"
                            label-for="nested-street"
                            label-cols-sm="3"
                            label-align-sm="right"
                        >
                            <select v-model="search.typetitre" @change="showNumTitre"  class="w-100 default-old-system-input-properties">
                                <option value=""></option>
                                <option v-for="(type,i) in typesTitres2" :key="i" :value="type.typetitre">{{ type.label }}</option>
                            </select>
                        </b-form-group>
                    </b-overlay>
                    <b-overlay rounded="sm" :show="showOverlayTitres"></b-overlay>
                        <b-form-group
                            label="Numéro titre:"
                            label-for="nested-street"
                            label-cols-sm="3"
                            label-align-sm="right"
                        >
                        <select type="text"  v-model="search.numtitre" class="default-old-system-input-properties">
                            <option value=""></option>
                            <option v-for="(numtitre,i) in titres" :key="i" :value="numtitre">{{ numtitre }}</option>
                        </select>
                        </b-form-group>
                    
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
            </b-overlay>
            </div>
            
        </slot>
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

    components: { PopupRejectModal,CodeBarreInfo },
    computed:{
        ...mapGetters(['user','hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
                return true;
            }else{
                return false;
            }
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
        showOverlayData:false,
        typesTitres:[],
        showOverlayTypestitre:false,
        showOverlayTitres:false,
        searchentite:'',
        titres:[],
        search:{
            entite:'',
            exercice:'',
            typetitre:'',
            csa:false,
            cfea:false,
            cpav:false,
            tv:false,
            numtitre:''
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
        typesTitres2:[],
    }),

    methods: {
        showNumTitre(){
            console.log(this.tab)
            this.titres=this.tab.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
            this.titres=[...new Set(this.titres)]
            console.log(this.titres)
        },
        postData(){
            this.wait=true;
            this.$jasper.post("ItextController/listingPermis", {
                "exercice": this.search.exercice,
                "idorganisation": Number(this.search.entite),
                "typetitre":this.search.typetitre,
                "numtitre":this.search.numtitre
            },{responseType:'blob'}).then((response) => { 
                console.log('exécution ok 1',response.data); 
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing des permis.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)
                    this.wait=false;
                    console.log(response.data);   
                }  

            })
            .catch((error) => {
                console.log(error);   
                this.wait=false;
                // if(error.response.data)
                return this.sendAlertMessage({message:'Une erreur est survenue'})
            });
        },
        viewPdf(){
            this.postData();
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
        showTitre(){
            console.log(this.search.typesTitres)
        },
        //listing des essences
        async getTypestitres(){
            this.showOverlayTypestitre=true;
            if (!php.empty(this.$store.state.typesTitres) ) {
                this.typesTitres = this.$store.state.typesTitres;
                this.showOverlayTypestitre=false;
            } 
            else{
                try {
                    this.typesTitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
                    this.$store.dispatch('typesTitres', this.typesTitres)
                    this.showOverlayTypestitre=false;
                } catch (error) {
                    App.notifyError(error.message);
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
        show(opts = {}) {
            this.resetData()
            this.title = opts.title
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

        resetData(){
            for(let i in this.search){
                this.search[i]=''
            }
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
                    if(this.isMinfof){
                        this.entite.idorganisation=this.search.entite.idorganisation
                        // console.log('minfof')
                    }
                    if(this.entite.idorganisation){
                        this.tab=await this.$abbattage.get(`tiges/abattage_permis_approuver?idorganisation=${this.entite.idorganisation}`)
                        .then(resp=>{
                        let tab1=resp.data.result.Items
                        this.typesTitres2=tab1.filter(elt=>elt.statut==='1').map(elt=>{
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
                                typetitre:elt.typetitre,
                                label:elt.label,
                                numtitre:elt.numtitre
                            }
                        })
                        // this.typesTitres2=[...new Set(this.typesTitres2)]
                        const uniqueIds=[]
                        const unique=this.typesTitres2.filter(elt=>{
                            const isDuplicate=uniqueIds.includes(elt.typetitre)
                            if(!isDuplicate){
                                uniqueIds.push(elt.typetitre)
                                return true
                            }
                            return false
                        })
                        console.log('unique',unique)
                        this.typesTitres2=unique.map(elt=>{
                            return{
                                typetitre:elt.typetitre,
                                label:elt.label,
                                numtitre:elt.numtitre
                            }
                        })
                        console.log(this.typesTitres2)
                        this.showOverlayData=false
                        return tab1
                    })
                    }else{
                        this.showOverlayData=false
                    }
                }catch(error){
                    console.log(error)
                    this.showOverlayData=false
                }
            
        }
    },
    mounted() {
        if(!this.isMinfof){
            this.entite.libelle=this.user.profil.organisation
            this.entite.idorganisation=this.user.idOrganisation
        }
        this.getData()
        // console.log('mounted')
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
