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
                <a href="#" :class="{'disable': stop }"  class="link-import-file px-2"  @click="confirm"><b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner> <span v-if="!submitted"> {{ okButton }}</span></a>
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

    components: { PopupModal },
    computed:{
        stop(){ 
            if(php.empty(this.content)||this.displaymessage ){
                return true;
            }else{
                return false;
            }
        }
    },
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
        submitted:false,
        entreeparcDto:null,
        anomalies:'',
        result:[],
        //stop:true,
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
            //let regularisationDto={site: this.dto.site,typeproduit: this.dto.typeproduit,date: this.dto.date}
            let data={};
            
            if(!this.stop){

                    this.content.map(elt =>{
                        // elt.codebarre =elt.CODE_BARRE,
                        // elt.essence = parseFloat(elt.CODE_ESENCE),
                        // elt.libelleessence =elt.ESSENCE,
                        // elt.diametreTige =parseFloat(elt.DIAMETRE_TIGE),
                        // elt.numBloc =parseFloat(elt.BLOC),
                        // elt.numUc =elt.UNITE_DE_COMPTAGE,
                        // elt.numtige = parseFloat(elt.NUM_TIGE),
                        // elt.utmZone =parseFloat(elt.UTM_ZONE),
                        // elt.utmX =parseFloat(elt.UTMX),
                        // elt.utmY =parseFloat(elt.UTMY),
                        // elt.libellequalite =elt.QUALITE, 
                        // elt.qualite = parseFloat(elt.ID_QUALITE) 
                        elt.codebarre =elt.CODEBARRE,
                        elt.sequence=elt.SEQUENCE,
                        elt.essence = (elt.ESSENCE),
                        elt.diametreTige =parseFloat(elt.DIAMETRE),
                        elt.numBloc =(elt.BLOC),
                        elt.numUc =parseFloat(elt.UNITEDECOMPTAGE),
                        elt.numtige = parseFloat(elt.NUMTIGE),
                        elt.qualite =elt.QUALITE, 
                        elt.utmX =parseFloat(elt.UTMX),
                        elt.utmY =parseFloat(elt.UTMY) 

                        return elt 
                    })
                    data= this.content
                    console.log(data)
                this.submitdata(data);
            }
        },
        async submitdata(data){
            this.submitted=true;
            try {
            //     await this.$inventaire.post("catalogues/import",{produits:data}).then(response =>{
            //         console.log('response ',response);
            //     this.result = response.data.result
            //     if(this.result!=undefined){
            //         return this.$emit('importsuccessfull',this.result)
            //     }else{
            //         this.anomalies=response.data.result.annomalies.toString()
            //         console.log('anomalies ',this.anomalies);
            //         this.submitted=false;
            //     }
                    
            // })
            this.$emit('importsuccessfull',data)
            } catch (error) {
                this.submitted=false;
                console.log('execution du catch aussi 1', error);
            }
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
        resetAllData(){
            this.title='',
            this.message='',
            this.okButton= '',
            this.cancelButton= 'Fermer',
            this.file= null, 
            this.content= [], 
            this.parsed= false, 
            this.submitted=false,
            this.entreeparcDto=null,
            this.content=null,
            this.result=[],
            this.anomalies=''
            this.displaymessage=false 
        },
        handleFileUpload(event){
            this.file={}
            this.displaymessage=false
            if(!php.empty(event.target.files[0])){
                this.file = event.target.files[0];
                this.parseFile();
            }
            
        },
      //méthode de gestion e l'upload de fichier csv
        parseFile(){
            Papa.parse( this.file, {
                header: true,
                skipEmptyLines: true,
                complete: function( results ){
                    this.content = results.data;
                    console.log('content ',this.content);
                    // this.checkValidity(this.content)
                }.bind(this)
            } );
        },
        //controle de la cohérence des données provenant du fichier importé
        checkValidity(data){
            data.forEach(elt =>{
                if(php.empty(elt.CODE_BARRE)||php.empty(elt.ESSENCE)||php.empty(elt.CODE_ESENCE)||php.empty(elt.DIAMETRE_TIGE)|| php.empty(elt.BLOC)||php.empty(elt.UNITE_DE_COMPTAGE)||php.empty(elt.NUM_TIGE)||php.empty(elt.UTM_ZONE)
                ||php.empty(elt.UTMX)||php.empty(elt.UTMY)||php.empty(elt.QUALITE)
                ||elt.CODE_BARRE.length!==8||isNaN(elt.CODE_ESENCE)||isNaN(elt.BLOC)||isNaN(elt.UTMX)
                ||isNaN(elt.UTMY)||isNaN(elt.ID_QUALITE)||isNaN(elt.NUM_TIGE)||isNaN(elt.DIAMETRE_TIGE)
                ){
                this.displaymessage=true
                return this.displaymessage
                }
            })         
        }
    },
}
</script>

<style scoped>
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
