<template>
    <popup-modal size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <b-alert variant="" class="text-center" show>
                        <i class="fa fa-exclamation-triangle zz" style="font-size:50px;"></i> <br>
                        <span class="h4 d-inline-flex ml-2">Voulez-vous vraiment supprimer ce profil? </span>
                    </b-alert> 
        <div class="px-4 pt-2 pb-2 ml-5">
            
            <p class="text-center mt-1 h4">{{ message }}</p>
            <b-row class="mb-0">
                <b-col>
                    <span class="text-muted"> Type : </span><br><span class="font-weight-bold mr-1" style="font-size:1.3em">{{ nom }}</span>
                </b-col>
                <b-col>
                    <span class="text-muted"> Intitulé : </span><br><span class="font-weight-bold mr-1" style="font-size:1.3em">{{ intitule }}</span>
                </b-col>
              
            </b-row>
             
            <hr>
            <div class="btns d-flex justify-content-center mr-3">
                <button class="cancell  mr-" style="color: ;" @click="_cancel">{{ cancelButton }} 
                   <i class="fa fa-times icon" aria-hidden="true"></i></button> 
                <button class=" cancelll ml-3 bg-danger" @click="_confirm">{{ okButton }}

                    <i class="fa fa-check" aria-hidden="true"></i>
                     <i class="fa fa-folder-closed" aria-hidden="true"></i>
                    
                    </button>

                   
            </div>

            
           
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'

export default {
    name: 'Created',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        compte: undefined, // login
        nom: undefined, // nom
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        intitule:undefined,
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.nom = opts.nom
            this.intitule = opts.intitule
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

</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
.zz{

    color: rgb(255, 217, 0);

}
</style>
