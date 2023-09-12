<template>
    <popup-modal size="sm" ref="popup">
        <div class="header pb-1" style="height:35px;">
            <div class="d-flex">
                <b-button v-if="raison==0" variant="danger" class="rounded-button"><i class="ik ik-x" style="font-size: 14px"></i> </b-button>
                <b-button v-if="raison==1" variant="danger" class="rounded-button"><i class="fa fa-question" style="font-size: 14px" aria-hidden="true"></i> </b-button>
                <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            </div>
            
            
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <p class="text-center mt-4"  show>
            <span class="h5 d-inline-flex ml-2 text-danger text-wrap">{{ message }}</span>
        </p> 
        <div class="px-4 pt-2 pb-2">
            
           <div class="btns d-flex justify-content-center" v-if="showOptions">
                <button class="cancell  mr-2" style="color: ;" @click="_cancel">{{ cancelButton }} 
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
    name: 'InfosBox',

    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        raison:undefined, //permet de controler l'icone à afficher
        showOptions:undefined, //decide de si les options sont affichées ou pas
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
            this.raison=opts.raison
            this.showOptions=opts.showOptions
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
.rounded-button{
    width: 20px;
    height: 20px;
    padding: 3px 0px;
    border-radius: 7px;
    text-align: center;
    font-size: 6px;
    line-height: 0.82857;
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
</style>
