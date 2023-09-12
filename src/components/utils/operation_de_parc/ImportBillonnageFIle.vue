<template>
    <popup-modal size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">Fichier d'import des {{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="d-flex py-2">
            <h6 class="mt-1 mx-1"><span class="text-danger">*</span>Fichier CSV</h6>
            <input type="file" accept=".csv" @change="handleFileUpload( $event )" />
        </div>
        <h5 v-if="displaymessage" class="text-danger d-flex justify-content-center align-items-center">Fichier invalide</h5>
        <transition enter-active-class="animated zoomIn">
            <div  class="m-2 px-2" v-if="anomalies!=''">
                <h6 class="font-weight-bold text-danger">Liste des anomalies détectées</h6>
                <b-row>
                    <b-form-textarea style="font-size:0.7rem"
                    id="textarea"
                    v-model="anomalies"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-row>
            </div>
        </transition>
        <div class="px-10 pt-2 pb-2">
            <div class="pl-2">
                <a href="#" class="link-import-file px-2"  @click="confirm"><b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner> <span class="link-import-file" v-if="!submitted"> {{ okButton }}</span></a>
                <!--<a v-if="submitted" href="#" class="link-import-file" @click="_confirm">{{ okButton }}</a>-->
                <a href="#" class="link-import-file"   @click="_cancel">{{ cancelButton }}</a>
            </div>
        </div>
    </popup-modal>
</template>

<script>
import PopupModal from '../PopupModal.vue'
import Papa from 'papaparse';

export default {
    name: 'ImportFile',
    props: {
        dto: {type: Object, required: true},
    },
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

        file: undefined, //file object that the user selected
        content: [], // JSON representative of the cs file
        parsed: false, //indicateur marquant le fait que le fichier a été analysé
        displaymessage:false, //propriété de gestion de l'affichage ou non du message d'erreur
        submitted:false,
        entreeparcDto:null,
        content:null,
        result:[],
        anomalies:'',
        displaymessage:false, //propriété de gestion de l'affichage ou non du message d'erreur

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
            
            let grumesimport=[]

            const obj = {}
            //formattage des clées comme demandé par l'api
            this.content.map(elt =>{
                elt.cbmere = elt.CB_MERE
                elt.codebarre =elt.CODE_BARRE
                elt.dpb =elt.DIAMPB
                elt.dgb =elt.DIAMGB
                elt.longueur =elt.LONGUEUR
                elt.volume = this.setVolume(elt.DIAMGB, elt.DIAMPB, elt.LONGUEUR)
                elt.abandonne =elt.ABANDONNE
                elt.position =elt.POSITION

                return elt;
            })
            let extract =this.content.map(({ cbmere, codebarre, dpb, dgb, longueur, volume, abandonne, position }) => ({
                    cbmere, 
                    codebarre, 
                    dpb, 
                    dgb,
                    longueur, 
                    volume,
                    abandonne,
                    position
                }))
            console.log('extract ',extract);
            for (let i = 0; i < extract.length; i++) {
            const cbmere = extract[i].cbmere

            if (!obj.hasOwnProperty(cbmere)) {
                obj[cbmere] = []
            }

            obj[cbmere].push(extract[i])
            }

            const result = Object.values(obj)
            console.log('result ',result);
            
          let billonnageDto={siteoper: this.dto.site, dateoper: this.dto.date, grumesimport: result}
            this.submitCodes(billonnageDto);
            //this.resolvePromise(true)
        },
        async submitCodes(data){
            try {
                await this.$operationParc.post("billonages/check_billonage", data).then(response =>{
                    this.result = response.data.result.Items
                    if(this.result!=undefined){
                        return this.$emit('importsuccessfull',this.result)
                    }else{
                        this.anomalies=response.data.result.annomalies.toString()
                        console.log('anomalies ',this.anomalies);
                        this.submitted=false;
                    }
                        
                })
            } catch (error) {
                this.submitted=false;
                console.log('anomalies détectées ',error);
            }  
        },
        setVolume(diamgb, diampb, long){
            const coef = parseFloat(0.786215)

            const dpb = !isNaN(parseFloat(diampb)) ? parseFloat(diampb)  : 0
            const dgb = !isNaN(parseFloat(diamgb)) ? parseFloat(diamgb)  : 0
            const longueur = !isNaN(parseFloat(long)) ? parseFloat(long)  : 0
        
            return (dpb*dgb*0.0001*longueur*coef).toFixed(3)
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
      //méthode de gestion e l'upload de fichier csv
        parseFile(){
            Papa.parse( this.file, {
                header: true,
                skipEmptyLines: true,
                complete: function( results ){
                    this.content = results.data;
                    console.log('content ',this.content);
                    //this.checkValidity(this.content)
                }.bind(this)
            } );
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
