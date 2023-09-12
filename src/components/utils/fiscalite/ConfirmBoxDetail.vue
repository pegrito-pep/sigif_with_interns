<template>
    <data-modal size="sm" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-2 pt-2 pb-1">
            <h4 class="text-uppercase text-center font-weight-bold">opération irreversible</h4>
            <h5 class="text-center mt-2">{{ message }}</h5>
            <b-row class="my-1" v-if="numquittance!=undefined&&date!=undefined&&montant!=undefined">
                <b-col>n° de la quittance : <span class="font-weight-bold">{{ numquittance }}</span></b-col>
                <b-col>Date : <span class="font-weight-bold">{{ date }}</span></b-col>
                <b-col>Montant : <span class="font-weight-bold">{{ montant }}</span></b-col>
            </b-row>
            <div class="btns d-flex justify-content-center">
                <button class="cancell  mr-2" style="color: ;" @click="_cancel">{{ cancelButton }} 
                   <i class="fa fa-times icon" aria-hidden="true"></i></button> 
                <button class=" cancelll ml-3 bg-danger" @click="confirm">{{ okButton }}
                    <b-spinner v-if="submitted" small></b-spinner>
                    <i v-else class="fa fa-check" aria-hidden="true"></i>
                    <i class="fa fa-folder-closed" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </data-modal>
</template>

<script>
import DataModal from '../DataModal.vue'

export default {
    name: 'opeparc-alert-box',

    components: { DataModal },

    data: () => ({
        submitted:false,
        // Parameters that change depending on the type of dialogue
        commande: undefined, // parametre permettant de spécifier l'ongle sur lequel la boite est utilisée
        title: undefined,
        message: undefined, // Main text content
        idQuittanceLv:undefined,
        numquittance:undefined,
        date:undefined,
        montant:undefined,
        origine:undefined, // permet de savoir l'onglet sur lequel on se trouve
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.commande=opts.commande
            this.title = opts.title
            this.message = opts.message
            this.origine = opts.origine
            this.idQuittanceLv = opts.idQuittanceLv
            this.numquittance = opts.numquittance
            this.date = opts.dateQuittanceLv
            this.montant = opts.montant
            this.okButton = opts.okButton
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

        confirm() {
            if(this.origine=='quittances_lv'){
                if(this.commande=='1'){
                    this.submitted = true;
                    this.$fiscalite.put('quittances-lv/soumettre/', {quittance:this.idQuittanceLv}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false
                    }) 
                }
                else if(this.commande=='2'){
                    this.submitted = true;
                    this.$fiscalite.put('quittances-lv/valider', {quittance:this.idQuittanceLv}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
                else if(this.commande=='3'){
                    this.submitted = true;
                    this.$fiscalite.put('quittances-lv/rejeter', {quittance:this.idQuittanceLv}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
                else if(this.commande=='4'){
                    this.submitted = true;
                    this.$fiscalite.delete('quittances-lv/supprimer', {quittance:this.idQuittanceLv}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false;
                        return this.$emit('echecopeparc',error.response.data.message);
                    }) 
                }  
            }
          
            
        },

        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

         _close() {
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


</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
