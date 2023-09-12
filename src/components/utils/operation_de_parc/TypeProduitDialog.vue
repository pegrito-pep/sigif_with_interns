<template>
    <popup-reject-modal :largeur="Number('800')" size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:40px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 1.3rem"> {{ title }}</h2>
            <slot name="close">
                <button type="button" style="align-self:start"  @click="_close" class="close ml-2 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </slot>
            
        </div>
        <b-overlay rounded="sm" :show="showOverlayTypestitre">
            <slot name="content">
                <div class="p-2">
                        <b-row>
                            <b-col cols="4">
                                <span class="text-danger font-weight-bold" style="font-size:1.2rem">*</span>
                                <span class="font-weight-bold h5"> Type de produit</span> 
                            </b-col>
                            <b-col>
                                <v-select :options="typesproduits" :class="{ 'styleToSet': notSetTypeTitre }" class="custom-select-type_titre  sigif-select" v-model="typeproduit" label="libelle"></v-select>
                            </b-col>
                        </b-row>
                        <div v-if="typeproduit!=null">
                            <ul style="display:flex;margin-bottom:1px; float:right">
                                <li :class="{'disable-li':wait }"  class="mr-3" @click.prevent="goToCreation">
                                    <b-spinner small v-if="wait" class="ml-2"  style="margin-right: 5px;"></b-spinner> 
                                    <b-link style="color:#285430;font-size:1.1rem"><b-img src="@/assets/images/iconVALIDER_16x16.png"></b-img> &nbsp;OK</b-link>
                                </li>
                            </ul>
                        </div>
                    </div>
            </slot>
        </b-overlay>
    </popup-reject-modal>
</template>

<script>
import { mapGetters } from 'vuex'
import PopupRejectModal from '../PopupRejectModal.vue'
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

    },

    data: () => ({
        notSetTypeTitre:false,
        showOverlayTypestitre:false,
        typesproduits:[
            {idtypeTypeproduit: 1, libelle:"Grumes", code:'GR'},
            {idtypeTypeproduit: 2, libelle:"Débités", code:'CL'},
            {idtypeTypeproduit: 3, libelle:"Produit Spécial", code:'PS'}
        ],
        typeproduit:null,
        wait:false,
        // Parameters that change depending on the type of dialogue
        title: undefined,
        origine:undefined,
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
        
    goToCreation(){
        console.log(' origine ',this.origine);
        storage.set('typetitre',this.typeproduit)
        setTimeout(() => {
            if(this.origine=='billonages'){
                if(this.typeproduit.code=='GR'){
                    this.$router.push({ name: "create-billonnage-gr"});
                }
                else if(this.typeproduit.code=='CL'){
                    this.$router.push({ name: "create-billonnage-cl"});
                }
                else if(this.typeproduit.code=='PS'){
                    this.$router.push({ name: "create-billonnage-ps"});
                }  
            }else 
            if(this.origine=='lettres_de_voiture'){
                    console.log('1 ok');
                if(this.typeproduit.code=='GR'){
                    console.log('2 ok');
                    this.$router.push({ name: "create-lv-gr"});
                }
                else if(this.typeproduit.code=='CL'){
                    this.$router.push({ name: "create-lv-cl"});
                }
                else if(this.typeproduit.code=='PS'){
                    this.$router.push({ name: "create-lv-ps"});
                }
            }
        this.$refs.popup.close()

        }, 200);
    },
       
    

      
      
        show(opts = {}) {
            this.title = opts.title
            this.origine = opts.origine
            this.commande = opts.commande
            this.message = opts.message
           
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
        //recupération des types de titre pour la création du catalogue
        async getTypesTitres(){
            this.showOverlayTypestitre =true;
            if (!php.empty(this.$store.state.typesTitres) ) {
                    this.typesTitres = this.$store.state.typesTitres;
            } 
            else{
            try {
                this.typesTitres= await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
                this.$store.dispatch('typesTitres', this.typesTitres)
            } catch (error) {
                App.notifyError(error.message);
            }
            }
            this.showOverlayTypestitre =false;
        },
       
    },
    mounted() {
        this.getTypesTitres()
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
