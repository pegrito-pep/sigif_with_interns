<template>
    <popup-modal size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-4 pt-2 pb-4">
            <div class="d-flex align-center justify-content-center">
               
            </div>
            <p class="text-center mt-2 font-weight-bold">{{ message }}</p>
            <b-row>
                <b-col><h6><span class="font-weight-bold"> compte :</span><span>{{ compte }}</span>  </h6></b-col>
                <b-col><h6><span class="font-weight-bold"> nom :</span><span>{{ nom }}</span>  </h6></b-col>
                <b-col><h6><span class="font-weight-bold"> prenom :</span><span>{{ prenom }}</span>  </h6></b-col>
            </b-row>
            <hr>
            <div class="btns d-flex justify-content-center">
                <button class="cancell  mr-2" style="color: ;" @click="_cancel">{{ cancelButton }} 
                   <i class="fa fa-times icon" aria-hidden="true"></i></button> 
                   <!--<button class=" cancelll ml-3 bg-danger" @click="_confirm">{{ okButton }}-->
                   <button :disabled="wait" class=" cancelll ml-3 bg-danger" @click="setReset">{{ okButton }}
                    <b-spinner small v-if="wait" class="ml-2"  style="margin-right: 5px;"></b-spinner> 
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
        wait:false,
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        compte: undefined, // login de l'utilisateur sélectionné
        email:undefined, //email de l'utilisateur
        nom: undefined, // nom de l'utilisateur sélectionné
        prenom: undefined, // Prenom de l'utilsiateur sélectionné
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.email = opts.email
            this.compte = opts.compte
            this.nom = opts.nom
            this.prenom = opts.prenom
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
        //méthode de re-initialisation du mot de passe de l'utilisateur
        setReset(){
            this.wait =true
            this.$auth.put('password/reset',{login: this.compte, email:this.email } ).then(response => {
                this.wait = false 
                this.$emit('load');
                return App.notifySuccess(response.data.message)
            }).catch(error => {
                this.submitted = false
                return App.alertError(error.message)
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


</style>

<style>
.window {
    padding: 0px !important;
    border-radius: 10px !important;
}
</style>
