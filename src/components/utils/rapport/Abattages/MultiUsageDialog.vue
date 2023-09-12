<template>
    <popup-reject-modal :largeur="Number('800')" size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:25px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 1rem"> {{ title }}</h2>
            <slot name="close">
                <button type="button" style="align-self:start"  @click="_close" class="close ml-2 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </slot>
            
        </div>
        <slot name="content">
            <b-overlay rounded="sm" :show="showOverlayData">
                <div class="p-2">
                    <b-row>
                        <b-col cols="7">
                            <b-row>
                                <b-col cols="4">
                                    <label style="font-weight:normal;"><span style="color:red">*</span>Période du</label>
                                </b-col>
                                <b-col>
                                    <input type="date" v-model="search.debut" class="default-old-system-input-properties"/>
                                </b-col>
                            </b-row>
                            <b-overlay rounded="sm" :show="showOverlayEntites">
                                <b-row>
                                    <b-col cols="4">
                                        <label style="font-weight:normal;">Entité</label>
                                    </b-col>
                                    <!-- <b-overlay rounded="sm" :show="showOverlayEntites"> -->
                                        <b-col>
                                            <v-select v-if="isMinfof" @input="showTypesTitres"  @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"   label="intitule" class="custom-select-type_titre">
                                                <li slot="list-footer" class="pagination">
                                                        <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                                        <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                                </li>
                                            </v-select>
                                            <select v-else class="m-0 p-0" v-model="entite.libelle" disabled  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                                <option selected="selected">{{ entite.libelle }}</option>
                                            </select> 
                                        </b-col>
                                    <!-- </b-overlay> -->
                                </b-row>
                            </b-overlay>
                            <b-row>
                                <b-col cols="4"><label style="font-weight:normal;">Titre n°</label></b-col>
                                <b-col>
                                    <select type="text" v-model="search.numtitre" class="default-old-system-input-properties">
                                        <option value=""></option>
                                        <option v-for="(numtitre,i) in titres" :key="i">{{ numtitre }}</option>
                                    </select>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col cols="5">
                                    <label style="font-weight:normal;" for="position">Position par tige</label>
                                </b-col>
                                <b-col cols="1">
                                    <input type="checkbox" id="position" v-model="search.position"/>
                                </b-col>
                                
                            </b-row>
                        </b-col>
                        <b-col cols="5">
                            <b-row>
                                <b-col cols="3">
                                    <label style="font-weight:normal;"><span style="color:red">*</span>AU</label>
                                </b-col>
                                <b-col>
                                    <input type="date" v-model="search.fin" class="default-old-system-input-properties"/>
                                </b-col>
                            </b-row> 
                            <b-row>
                                <b-col cols="3">
                                    <label style="font-weight:normal;">Type de titre</label>
                                </b-col>
                                <b-col>
                                    <!-- <v-select @input="showTitre" @open="getTypestitres" :options="typesTitres" 
                                        v-model="search.typetitre"  :reduce="typetitre => typetitre.code"
                                        label="libelle" class="custom-select-type_titre">
                                    </v-select> -->
                                    <select v-model="search.typetitre" @change="getInfos" class="default-old-system-input-properties">
                                        <option value=""></option>
                                        <option v-for="(type,i) in typesTitres2" :key="i">{{ type }}</option>
                                    </select>
                                </b-col>
                            </b-row>
                            <b-overlay rounded="sm" :show="showOverlay">
                                <b-row>
                                    <b-col cols="3"><label style="font-weight:normal;">N° du permis</label></b-col>
                                    <b-col>
                                        <select  v-model="search.numpermis" class="default-old-system-input-properties">
                                            <option value=""></option>
                                            <option v-for="(numpermis,i) in permis" :key="i">{{ numpermis }}</option>
                                        </select>
                                    </b-col>
                                </b-row>
                            </b-overlay>
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
            </b-overlay>
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
        showOverlay:false,
        showOverlayEntites:false,
        showOverlayEssence:false,
        showOverlayData:false,
        tab:[],
        typesTitres:[],
        typesTitres2:[],
        titres:[],
        permis:[],
        showOverlayTypestitres:false,
        searchentite:'',
        search:{
            debut:'',
            fin:'',
            entite:'',
            typetitre:'',
            numtitre:'',
            numpermis:'',
            position:false
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

        showTypesTitres(){
            this.getData()
        },

        getInfos(){
            console.log(this.search.typetitre)
            this.showOverlay=true
            let tab2=this.tab.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numtitre)
            this.titres=[...new Set(tab2)]
            let tab3=this.tab.filter(elt=>elt.typetitre===this.search.typetitre).map(elt=>elt.numpermis)
            this.permis=[...new Set(tab3)]
            this.showOverlay=false
        },
        postData(){
            this.search.debut=new Date(this.search.debut).toLocaleDateString(), 
            this.search.fin=new Date(this.search.fin).toLocaleDateString(), 
            this.search.entite=this.isMinfof?this.search.entite:this.entite.idorganisation,
            this.wait=true;
            this.$jasper.post("abattage/pdf", {
                "idorganisation": Number(this.search.entite),
                "datedebut": this.search.debut,
                "datefin": this.search.fin,
                "typetitre": this.search.typetitre,
                "numpermis": this.search.numpermis,
                "numtitre": Number(this.search.numtitre)

            },{responseType:'blob'}).then((response) => { 
                console.log('exécution ok 1',response); 
                if(response.status==200) {
                    // console.log('res data:',response.data)
                    const blob = new Blob([response.data], {type: 'application/pdf'});
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'Listing.pdf';
                    link.click();
                    URL.revokeObjectURL(link.href)

                    this.wait=false;
                    console.log(response);   
                }  

            })
            .catch((error) => {
                console.log('exécution bad 1');   
                this.wait=false;

            });
        },
        viewPdf(){
            if(this.commande===1){
                this.postData();
            }
        },
        showTitre(){
            console.log(search.typesTitres)
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
        
        // async getSites(){
        //     this.showOverlaySite=true
        //     if(!php.empty(this.$store.state.sites)){
        //         this.sites=this.$store.state.sites
        //     }
        //     else{
        //         try {
        //             this.sites = await this.$donneesReference.get("sites/all").then(response => response.data.result);
        //             this.$store.dispatch('sites', this.sites)
        //         } catch (error) {
        //             console.log(error.message)
        //         }
        //     }
        //     this.showOverlaySite=false
        // },
        // onSearchSite(query){
        //     this.searchSite = query
        //     this.offsetSites = 0
        // },
        //liste des entités forrestières
        async getEntites(){
            this.showOverlayEntites=true;
            if (this.$store.state.entiteswithoutminfof !== null &&this.$store.state.entiteswithoutminfof.length > 0) {
                this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
            } 
            else {
                try {
                    this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.items);
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

        async getData(){
            this.showOverlayData=true
            try{
                if(this.isMinfof){
                    console.log(this.isMinfof)
                    this.entite.idorganisation=this.search.entite.idorganisation
                    // console.log(this.search.entite)
                }
                if(this.entite.idorganisation){
                    this.tab=await this.$abbattage.get(`tiges/abattage_permis_approuver?idorganisation=${this.entite.idorganisation}`)
                    .then(resp=>{
                        let tab1=resp.data.result.Items
                        this.typesTitres2=tab1.map(elt=>{
                            return elt.typetitre
                        })
                        this.typesTitres2=[...new Set(this.typesTitres2)]
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
