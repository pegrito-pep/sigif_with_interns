<template>
    <popup-modal size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">Liste des anomalies détectées</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
       
        <transition enter-active-class="animated zoomIn">
            <div  class="m-2 px-2" v-if="anomalies!=''">
                <b-row>
                    <b-form-textarea style="font-size:0.7rem"
                    id="textarea"
                    v-model="anomalies"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-row>
                <div  class="m-2 px-2">
                    <a @click.prevent="downloadanomalies" style="cursor:pointer;" class="text-success d-flex justify-content-center align-items-center" id="anomalies"><i class="fas fa-file-download"></i> télécharger les anomalies</a>
                </div>
            </div>
        </transition>
        <div class="px-10 pt-2 pb-2">
            <div class="pl-2">
                <a href="#" class="link-import-file px-2"  @click="_cancel"><b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner> <span class="link-import-file" v-if="!submitted"> {{ okButton }}</span></a>
                <a href="#" class="link-import-file"   @click="_cancel">{{ cancelButton }}</a>
            </div>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from './PopupModal.vue'
const php  = require ( 'phpjs' ) ;

export default {
    name: 'ImportFile',
    components: { PopupModal },

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        submitted:false,
        result:[],
        anomalies:'',
        displaymessage:false, //propriété de gestion de l'affichage ou non du message d'erreur

    }),

    methods: {
        //methode de téléchargement du fichier d'annomalies
        downloadanomalies(){
            var content = this.anomalies;
            var file = new File(["\ufeff"+content], 'anomalies.txt', {type: "text/plain:charset=UTF-8"});
            let url = window.URL.createObjectURL(file);
            var a = document.createElement("a");
            a.style = "display: none";
            a.href = url;
            a.download = file.name;
            a.click();
            window.URL.revokeObjectURL(url);
        },
        show(opts = {}) {
            this.title = opts.title
            this.anomalies = opts.anomalies
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

     
      
        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

        _close() {
            this.$refs.popup.close()
        },
        handleFileUpload(event){
            this.file = event.target.files[0];
            this.parseFile();
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
