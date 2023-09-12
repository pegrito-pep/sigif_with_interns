<template>
    <data-modal size="lg" ref="popup">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 20px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-5 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="px-4 pt-2 pb-4">
            <b-card class="mx-1">
                <b-row class="mb-1">
                    <b-col cols="8">
                        <b-row>
                            <b-col cols="4">
                                <span class="text-muted"> Type de permis : </span>
                            </b-col>
                            <b-col cols="8">
                                <span class="font-weight-bold" style="font-size:1em">Concéssion forestière...( <b-badge pill variant="secondary">CD</b-badge> )</span>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="4">
                        <b-row>
                            <b-col cols="6">
                                <span class="text-muted"> N° du Titre : </span>
                            </b-col>
                            <b-col cols="6">
                                <span class="font-weight-bold" style="font-size:1em">0001322</span>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>

                <b-row class="mt-1">
                    <b-col cols="5">
                        <b-row>
                            <b-col cols="7">
                                <span class="text-muted"> Date de signature: </span>
                            </b-col>
                            <b-col cols="5">
                                <span class="font-weight-bold" style="font-size:1em">14/10/2022</span>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col cols="7">
                        <b-row>
                            <b-col cols="8">
                                <span class="text-muted"> Date fin de validité actuelle : </span>
                            </b-col>
                            <b-col cols="4">
                                <span class="font-weight-bold" style="font-size:1em">31/12/2022</span>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
                

            </b-card>
           
            <hr>
            <b-form inline>
                <label class="mr-sm-2" style="width:35%" for="inline-form-custom-select-pref">Nouvelle Date de validité</label>
                <b-form-input id="date" v-model="dateprolonguation" type="date" :min="min" size="sm" style="width: 35%"></b-form-input>       
                <button :disabled="submitted" class=" cancelll ml-3 bg-success" @click.prevent="valider">valider
                    <b-spinner small v-if="submitted"></b-spinner>
                    <i class="fa fa-check" aria-hidden="true"></i>
                    <i class="fa fa-folder-closed" aria-hidden="true"></i>
                </button>
              </b-form>

        </div>
    </data-modal>
</template>

<script>
import DataModal from '../DataModal.vue'
var date = new Date();
var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
export default {
    name: 'PermisBox',

    components: { DataModal },
    props: {
      idpermis: {type: Number, default: null, required:false}
    },
    data: () => ({
        submitted:false,
        // Parameters that change depending on the type of dialogue
        title: undefined,
        numpermis: undefined, // Main text content
        numtitre: undefined, // login
        datesignature: undefined, // nom
        dateprolonguation:undefined,
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        min: dateString,
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        valider(){
            this.$permis.post('permis/proroguerdate',{idpermis:this.idpermis, date:this.dateprolonguation} ).then(response => {
              this.submitted = false 
              this.dateprolonguation=null
              this.$emit('extended')
              return App.notifySuccess(response.data.message)
          }).catch(error => {
              this.submitted = false
              return App.alertError(error.message)
          })
        },
        show(opts = {}) {
            this.title = opts.title
            this.numpermis = opts.numpermis
            this.numtitre = opts.numtitre
            this.datesignature = opts.datesignature
            this.okButton = opts.okButton
           
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
