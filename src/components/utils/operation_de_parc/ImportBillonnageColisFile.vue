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
                <div  class="m-2 px-2">
                    <a @click.prevent="downloadanomalies" style="cursor:pointer;" class="text-success d-flex justify-content-center align-items-center" id="anomalies"><i class="fas fa-file-download"></i> télécharger les anomalies</a>
                </div>
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
const php  = require ( 'phpjs' ) ;

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
            const obj = {}
            //formattage des clées comme demandé par l'api
            this.content.map(elt =>{
                elt.codebarrem = elt.CBCOLISMERE
                elt.codebarre =elt.CBCOLIS
                elt.numDf10 =elt.NUMCOLIS
                elt.idessence =elt.CODEESSENCE
                elt.essence =elt.ESSENCE
                elt.longueur =elt.LONGUEUR
                elt.largeur =elt.LARGEUR
                elt.epaisseur =elt.EPAISSEUR
                elt.nombrepiece =elt.NBPIECES
                elt.poids =elt.POIDS
                return elt;
            })
           
            let billonnageColisDto={
                pieceDtosimport: this.content.map(({ codebarrem, codebarre, longueur, largeur, epaisseur, nombrepiece, volume, superficie, poids,numDf10,idessence }) => ({
                    codebarrem, 
                    codebarre, 
                    longueur, 
                    largeur,
                    epaisseur, 
                    nombrepiece,
                    poids,
                    numDf10,
                    idessence
                }))}
                console.log('initial ',billonnageColisDto.pieceDtosimport);
                for (let i = 0; i < this.content.length; i++) {
            const cbmere = billonnageColisDto.pieceDtosimport.codebarre

            if (!obj.hasOwnProperty(cbmere)) {
                obj[cbmere] = []
            }

            obj[cbmere].push(billonnageColisDto.pieceDtosimport[i])
            }

            const result = Object.values(obj)
            billonnageColisDto.pieceDtosimport=result;
            console.log('result traité',result);
            this.submitCodes(billonnageColisDto);
        },
        async submitCodes(data){
            this.submitted=true;
            try {
                await this.$operationParc.post("billonages/import/colis", data).then(response =>{
                    this.result = response.data.Items
                    if(this.result!=undefined){
                        return this.$emit('importsuccessfull',this.result)
                    }else{
                        this.anomalies=response.data.annomalies.toString()
                        console.log('anomalies ',this.anomalies);
                        this.submitted=false;
                    }
                        
                })
            } catch (error) {
                this.submitted=false;
                console.log('anomalies détectées ',error);
            }  
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
                    this.checkValidity(this.content)
                }.bind(this)
            } );
        },
          //controle de la cohérence des données provenant du fichier importé
          checkValidity(data){
            data.forEach(elt =>{
                if(php.empty(elt.CBCOLISMERE)||php.empty(elt.CBCOLIS)||php.empty(elt.NUMCOLIS)||php.empty(elt.CODEESSENCE)|| php.empty(elt.LONGUEUR)||php.empty(elt.LARGEUR)||php.empty(elt.EPAISSEUR)||php.empty(elt.NBPIECES)
                ||php.empty(elt.POIDS)
                ||elt.CBCOLISMERE.length!==8||elt.CBCOLIS.length!==8||isNaN(elt.CODEESSENCE)||isNaN(elt.NBPIECES))
            {
             this.displaymessage=true
             return this.displaymessage
            }
            })         
        }
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
