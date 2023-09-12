<template>
    <popup-modal :largeur="480" ref="popup">
       <b-overlay rounded="sm" :show="isBusy">
            <div class="header d-flex justify-content-between pb-3" style="height:35px;">
                <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
                <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <b-form inline class="m-2 p-2">
                <label class="mr-sm-2" for="inline-form-custom-select-pref">Code à barres</label>
                <b-form-input class="form-control-xs" v-model="codebarre"></b-form-input>
                <a class="ml-2 setHoover"  style="color: #82C138" @click="find"><b-img src="@/assets/images/picto_loupe.png"></b-img>charger</a>
            </b-form>
            <transition name="fade">
                <div v-if="resulSet=='1'">
                    <h4 class="font-weight-bold text-center">Informations</h4>
                    <b-row>
                        <b-col cols="4" class="ml-2">
                            <h6>Séquence :</h6>
                            <h6>Entité</h6>
                            <h6>Usage</h6>
                            <h6>Date de création</h6>
                            <h6>Statut</h6>
                        </b-col>
                        <b-col cols="6" style="font-size: 0.9rem">
                            <h6>{{ sequence }}</h6>
                            <span>{{ entite }}</span>
                            <h6>{{ usage }}</h6>
                            <h6>{{ datecreation }}</h6>
                            <h6>
                                <b-badge variant="success" v-if="statut=='UTILISE'">{{ statut }}</b-badge>
                                <b-badge variant="danger" v-else>{{ statut }}</b-badge>
                            </h6>
                        </b-col>
                    </b-row>
                </div>
                
            </transition>
            <transition name="fade">
                <div v-if="resulSet=='2'" class="container alert alert-danger w-75">
                    <div class="row">
                        <div class="col text-center font-weight-bold">Aucune information trouvée!!!</div>
                    </div>
                </div>
            </transition>
       </b-overlay> 
    </popup-modal>
</template>

<script>

import PopupModal from './PopupModal.vue'

export default {
    name: 'Created',
    
    components: { PopupModal },

    data: () => ({
        isBusy:false, //propriete overlay
        title:undefined, //entete
        // Parameters that change depending on the type of dialogue
        sequence: undefined,
        codebarre:undefined,
        entite: undefined, // Main text content
        usage: undefined, // login
        datecreation: undefined, // nom
        statut: undefined, // prenom
        resulSet:0,
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
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
        find(opts = {}) {
            this.isBusy=true
            this.$codesbarres.get("lot-codebarre/"+this.codebarre+"/suivi").then(response => {
                console.log('code', response.code);
                this.sequence = response.data.result.sequence
                this.codebarre = response.data.result.codebarre
                this.entite = response.data.result.entite
                this.usage = response.data.result.usage
                this.datecreation = response.data.result.datecreation;
                this.datecreation = this.$dayjs(this.datecreation).format('DD-MM-YYYY');
                this.statut = response.data.result.statut
                this.isBusy=false
                this.resulSet=1
            })
            .catch((error) => {
                if(error.response.data.code=='404'){
                    console.log('entrée ici');
                    this.isBusy=false
                    this.resulSet=2
                }
                
            });
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },
         _close() {
            this.sequence = ""
            this.codebarre = ""
            this.entite = ""
            this.usage = ""
            this.datecreation = ""
            this.statut = ""
            this.isBusy=false
            this.resulSet=0
            this.$refs.popup.close()
        },
    },
}
</script>

<style scoped>


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
    font-size: 30px;
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
.setHoover:hover{
    cursor: pointer
  }
</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
