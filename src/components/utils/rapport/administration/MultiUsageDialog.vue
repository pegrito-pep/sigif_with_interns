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
                        <b-overlay rounded="sm" :show="showOverlayEntites">
                            <template #overlay>
                                <div class="text-center">
                                    <i class="fas fa-2x fa-sync fa-spin"></i>
                                    <p id="cancel-label">Chargement...</p>
                                </div>
                            </template>
                            <b-row class="my-1" v-if="commande==1">
                                <b-col cols="3">Entité forestière</b-col>
                                <b-col>
                                    <v-select v-if="isMinfof" @input="getProfils" @open="getEntites" :options="paginatedEntites" v-model="search.entite" @search="onSearchEntites"  label="intitule" class="custom-select-type_titre">
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
                        <b-overlay rounded="sm" :show="showOverlayProfils">
                            <template #overlay>
                                <div class="text-center">
                                    <i class="fas fa-2x fa-sync fa-spin"></i>
                                    <p id="cancel-label">Chargement...</p>
                                </div>
                            </template>
                            <b-row class="my-1" v-if="commande==1">
                                <b-col cols="3">Profil</b-col>
                                <b-col>
                                    <v-select  :options="paginatedProfils" v-model="search.profil" @search="onSearchProfils"  label="intitule" class="custom-select-type_titre">
                                        <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageProfils" @click="offsetProfils -= limitProfils">Prèc.</button>
                                        <button :disabled="!hasNextPageProfils" @click="offsetProfils += limitProfils">Suiv.</button>
                                        </li>
                                    </v-select> 
                                </b-col>
                            </b-row>
                            <b-row >
                                <b-col cols="3">
                                    Type d'utilisateur
                                </b-col>
                                <b-col>
                                    <select class="w-50 default-old-system-input-properties">
                                        <option value=""></option>
                                        <option v-for="(elt,i) in users" :key="i">{{ users[i] }}</option>
                                    </select>
                                </b-col>
                            </b-row>
                            <b-row class="my-1">
                                <b-col cols="3">
                                    Langue
                                </b-col>
                                <b-col>
                                    <select class="w-50 default-old-system-input-properties">
                                        <option value=""></option>
                                        <option value="fr">Français</option>
                                        <option value="en">Anglais</option>
                                    </select>
                                </b-col>
                            </b-row>
                            <b-row class="my-1">
                                <b-col cols="3">
                                    Actif
                                </b-col>
                                <b-col>
                                    <input type="checkbox" />
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
        </b-overlay>
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
    </popup-reject-modal>
    
</template>

<script>
import { mapGetters } from 'vuex'
import PopupRejectModal from '../../PopupRejectModal.vue'
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
const php = require("phpjs");

export default {
    name: 'adminrapport',

    components: { PopupRejectModal,CodeBarreInfo},
    computed:{
        ...mapGetters(['user','hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
                return true;
            }else{
                return false;
            }
        },
        // entities
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

        // profils
        filteredProfils() {
            return this.profils.filter((entite) =>
                entite.intitule.toLocaleLowerCase().includes(this.searchProfils.toLocaleLowerCase())
            )
        },
        paginatedProfils() {
        return this.filteredProfils.slice(this.offsetProfils, this.limitProfils + this.offsetProfils)
        },
        hasNextPageProfils() {
            const nextOffset = this.offsetProfils + this.limitProfils
            return Boolean(
                this.filteredProfils.slice(nextOffset, this.limitProfils + nextOffset).length
            )
        },
        hasPrevPageProfils(){   
            const prevOffset = this.offsetProfils - this.limitProfils
            return Boolean(
                this.filteredProfils.slice(prevOffset, this.limitProfils + prevOffset).length
            )
        }
    },

    data: () => ({
        showDate:false,
        showOverlayData:false,
        showOverlayEntites:false,
        showOverlayProfils:false,
        entiteswithoutminfof:[],
        profils:[],
        offsetEntites:0, 
        limitEntites:10,
        offsetProfils:0, 
        limitProfils:10,
        statuts:[
            "Brouillon",
            "Soumise",
            "Validée",
            "Soumission en cours",
        ],
        users:[
            'MINFOF',
            'OPERATEUR',
            'INVITE',
            'AUTRE',
            'ADMINISTRATEUR',
            'OPERATEUR CEMAC',
        ],
        entite:{
            idorganisation:'',
            libelle:''
        },
        searchentite:'',
        searchProfils:'',
        search:{
            entite:'', site:'', essence:'',statut:'',operation:'',datedebut:'',datefin:'',assiette:'',usage:'',region:'',
            departement:'',arrondissement:'',typetitre:'',numtitre:'',exercice:'',profil:''
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
        async getProfils(){
            this.showOverlayProfils=true
            try{
                this.profils=await this.$administration.get('profils')
                    .then(resp=>resp.data.result.items)
                this.showOverlayProfils=false
            }catch(error){
                this.showOverlayProfils=false
                App.notifyError(error.message);
            }
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
        onSearchProfils(query){
            this.searchProfils = query
            this.offsetProfils = 0
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
                
            }catch(error){
            }  
            this.showOverlayData=false
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
