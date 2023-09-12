<template>
    <data-modal size="sm" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-2 pt-2 pb-1">

            <h6 class="text-center mt-2">{{ message }}</h6>
            <div class="btns d-flex justify-content-center">
                <button :disabled="submitted" class="cancell  mr-2" style="color: ;" @click="confirm">
                    <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                    <i v-else class="fa fa-check" aria-hidden="true"></i>
                    {{ okButton }} 
                </button> 
                <button class=" cancelll ml-3 bg-danger" @click="_cancel">
                   <i class="fa fa-times icon" aria-hidden="true"></i>
                    {{ cancelButton }}
                </button>
            </div>


        </div>
    </data-modal>
</template>

<script>
import DataModal from '../DataModal.vue'

export default {
    name: 'transformation-alert-box',

    components: { DataModal },

    data: () => ({
        submitted:false,
        // Parameters that change depending on the type of dialogue
        commande: undefined, // parametre permettant de spécifier l'ongle sur lequel la boite est utilisée
        title: undefined,
        message: undefined, // Main text content
        login: undefined, // login
        password: undefined, // nom
        langue:undefined,
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
            this.login = opts.login
            this.password = opts.password
            this.langue = opts.langue
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

        async confirm() {
            this.submitted =true;
            try {
                await this.$auth.post("login", { login: this.login, password: this.password, reconnexion:true })
                   .then((response) => {
                    storage.set("access_token", response.data.result.access_token);
                    storage.set("refresh_token", response.data.result.refresh_token);
                    this.$auth.get('login', { headers: {'Authorization': `Bearer ${response.data.result.access_token}`}}).then((response) => {
                        this.$store.dispatch('user', response.data.result)
                        return this.$emit('sessionactivee',this.result)
                       // this.$router.push({ name: "modules" });
                    })
                        
                })
            } catch (error) {
                this.submitted=false;
                console.log('error ',error);
                if(error.response.data.code==400){
                    return App.alertError(error.response.data.message)
                }
                else if(error.response.data.code==500){
                    return App.alertError('Erreur interne du Serveur')
                }
                else return App.alertError('Impossible de joindre le serveur')
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
.link-import-file{
    font-family: 'Verdana';
    font-size: 14px;
    text-align: right;
    color: #333333;
    padding: 0px 6px 10px 0px;
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
