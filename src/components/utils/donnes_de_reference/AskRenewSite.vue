<template>
    <popup-modal size="lg" ref="popup" :largeur="500">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
         
            <h2 class="mt-0" style="font-size: 20px"> Site:<span class="font-weight-bold ml-2">{{ dto.intitulesite }}</span></h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="py-2 px-2">
            <b-row class="ml-1">
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols-sm="6"
                    label-cols-lg="5"
                    content-cols-sm
                    content-cols-lg="5"
                    label-for="input-horizontal"
                >
                        <template #label>
                            <label for=""><span class="text-danger">*</span>N° du document</label>
                        </template>          
                        <input type="text" v-model="bordereauxRenouvellement" class="px-2 default-old-system-select-properties"/>
                </b-form-group>
            </b-row>
            <b-row class="ml-1">
                <b-form-group
                    id="fieldset-horizontal"
                    label-cols-sm="4"
                    label-cols-lg="3"
                    content-cols-sm
                    content-cols-lg="5"
                    label-for="input-horizontal"
                >
                    <template #label>
                        <label><span class="text-danger">*</span>Pièce jointe</label>
                    </template>          
                    <input type="file" class="ml-3 custom-input-file" @change="handleFileUpload( $event )" />
                </b-form-group>
            </b-row>
          
        </div>
        <div class="btns d-flex justify-content-end pb-2 mr-2">
            <button class=" cancelll ml-3 bg-secondary" @click="_cancel">{{ cancelButton }}<i class="fa fa-folder-closed" aria-hidden="true"></i></button>
            <button  class=" cancelll ml-3 bg-success" @click="confirm">
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <span v-else>{{ okButton }}</span>
            </button>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from '../DataModal.vue'

const php = require('phpjs');

export default {
    name: 'ask-renew-site',
    props: {
        dto: {type: Object, required: true},
    },
    components: { PopupModal },
    computed:{
     stop(){ 
        if(php.empty(this.bordereauxRenouvellement)||php.empty(this.file)){
            return true;
        }else{
            return false;
        }
     }
    },
    data: () => ({
        submitted:false,
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        bordereauxRenouvellement:'',
        file: undefined, //file object that the user selected
    }),

    methods: {
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
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
                await this.$donneesReference.post("sites/renouvellemnt", {idsiteoper:this.dto.idsite, bordereauxRenouvellement: this.bordereauxRenouvellement, fichier: this.file})
                   .then((response) => {
                    console.log('response ',response);
                    App.notifySuccess(response.data.message)
                    return this.$emit('askRenewSet',this.result)
                   
                })
            } catch (error) {
                this.submitted=false;
                console.log('error ',error);
                if(error.response.data.code==404){
                    return App.alertError(error.response.data.message)
                }
                else if(error.response.data.code==500){
                    return App.alertError('Erreur interne du Serveur')
                }
                else return App.alertError('Impossible de joindre le serveur')
            }  
        },

        async handleFileUpload(e){
            const quittance =e.target.files[0];
            this.file=await this.getBase64(quittance)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        resetAllData(){
            this.bordereauxRenouvellement='',
            this.file= null
        },
        _cancel() {
            this.resetAllData();
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

        _close() {
            this.resetAllData();
            this.$refs.popup.close()
        },
    },
}
</script>

<style scoped>

.custom-input-file{
    /* border-width: 1px; */
    font-weight: normal;
    color: #333333;

    font-family: 'verdana';
    font-size: 13px;
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
.disable{
    pointer-events:none;
    opacity:0.5
}
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
