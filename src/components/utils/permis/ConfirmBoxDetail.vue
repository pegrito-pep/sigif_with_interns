<template>
    <data-modal size="sm" ref="popup" :largeur="largeur">
        <div class="header d-flex justify-content-between pb-3" style="height:35px;">
            <h2 class="mt-0 font-weight-bold " style="font-size: 18px">{{ title }}</h2>
            <button type="button"  @click="_close" class="close ml-2 d-flex justify-content-end" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <form action="" @submit.prevent="confirm">
            <div class="px-2 pt-2 pb-1">
                <!--ELEMENTS RECOMMANDATION DELEGUE-->
                <div v-if="fromRecommandation">
                    <b-row>
                        <b-col cols="3"><span class="d-flex justify-content-end">Emetteur</span></b-col>
                        <b-col><input v-model="emetteur" type="text" disabled class="disable-sigif-input"></b-col>
                    </b-row>
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                        <template #overlay>
                        <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                        </div>
                        </template>
                        <b-row>
                            <b-col cols="3" class="d-flex justify-content-end"><span style="color: red; font-size:1rem">*</span>Destinataire</b-col>
                            <b-col cols="8">
                                <v-select  @open="getEntites" :options="paginatedEntites" v-model="destinataire" @search="onSearchEntites"  :reduce="entite => entite.IDORGANISATION" label="INTITULE" class="w-75 custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                    <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3"><span class="d-flex justify-content-end">Objet</span></b-col>
                            <b-col cols="8">
                                <input type="textarea" v-model="objet" class="my-1 w-50"  name="txtname" rows="7" cols="100" maxlength="600"/>
                            </b-col>
                        </b-row>
                    </b-overlay>
                </div>
                <!--ELEMENTS SOUMISSION OPERATEUR-->
                <div v-if="fromSoumission">
                    <b-row>
                        <b-col cols="3"><span class="d-flex justify-content-end">Emetteur</span></b-col>
                        <b-col><input v-model="emetteur" type="text" disabled class="disable-sigif-input"></b-col>
                    </b-row>
                    <b-overlay rounded="sm" :show="showOverlayEntites">
                        <template #overlay>
                        <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                        </div>
                        </template>
                        <b-row>
                            <b-col cols="3" class="d-flex justify-content-end"><span style="color: red; font-size:1rem">*</span>Destinataire</b-col>
                            <b-col cols="8">
                                <v-select  @open="getEntites" :options="paginatedEntites" v-model="destinataire" @search="onSearchEntites"  :reduce="entite => entite.IDORGANISATION" label="INTITULE" class="w-75 custom-select-type_titre">
                                    <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                    <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                    </li>
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="3"><span class="d-flex justify-content-end">Objet</span></b-col>
                            <b-col cols="8">
                                <input type="textarea" v-model="objet" class="my-1 w-50"  name="txtname" rows="7" cols="100" maxlength="600"/>
                            </b-col>
                        </b-row>
                    </b-overlay>
                </div>
                <!--ELEMENTS REJET-->
                <div v-if="fromRejet">
                    <b-row>
                        <b-col cols="3"><span style="color: red; font-size:1rem">*</span>Motif du rejet</b-col>
                        <b-col cols="8">
                            <input required type="textarea" v-model="motifrejet" class="my-1 w-50"  name="txtname" rows="6" cols="100" maxlength="600"/>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3"><span style="color: red; font-size:1rem">*</span>Acte de rejet</b-col>
                        <b-col cols="8">
                            <input required type="file" @change="selectFileActeRejet"/>
                        </b-col>
                    </b-row>
                </div>
                <div class="btns d-flex justify-content-start mt-2">
                    <b-button type="submit" class=" cancelll ml-3 ok-option">
                        <b-spinner v-if="submitted" small></b-spinner>
                        <i v-else class="fa fa-check fa-lg" aria-hidden="true"></i>
                        <i class="fa fa-folder-closed" aria-hidden="true"></i>
                        <span style="font-weight: normal"> {{ okButton }}</span>
                    </b-button>
                    <button class="cancelll mt-1" @click="_cancel">
                    <i class="fa fa-times icon fa-lg cancel-option" aria-hidden="true"></i>
                    <span style="font-weight: normal;color:rgb(0, 82, 44) !important"> {{ cancelButton }}</span>
                    </button>
                </div>
            </div>
        </form>
    </data-modal>
</template>

<script>
import DataModal from '../DataModal.vue'
const php = require("phpjs");
import { mapGetters } from "vuex";

export default {
    name: 'permis-box',

    components: { DataModal },
    computed:{
        ...mapGetters(['user','hasAccess']),  
        entitesminfof() {
            return this.entites.filter((entite) => entite.TYPEORGANISATION=='MF')
        },
        filteredEntites() {
            return this.entitesminfof.filter((entite) =>
                entite.INTITULE.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
            )
        },
        paginatedEntites() {
            return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
        },
        hasNextPageEntites() {
            const nextOffset = this.offsetEntites + this.limitEntites
            return Boolean(
                this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
            )
        },
        hasPrevPageEntites(){   
            const prevOffset = this.offsetEntites - this.limitEntites
            return Boolean(
                this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
            )
        },
    },
    data: () => ({
        destinataire:'',
        objet:'',
        offsetEntites: 0,
        limitEntites: 10,
        searchentite:'',
        showOverlayEntites:false,
        fromRecommandation:false,
        entites:[],
        emetteur:'',
        fromSoumission:false,
        motifrejet:'',
        acterejet:'',
        submitted:false,
        fromRejet:false,
        // Parameters that change depending on the type of dialogue
        commande: undefined, // parametre permettant de spécifier l'ongle sur lequel la boite est utilisée
        title: undefined,
        message: undefined, // Main text content
        idpermis:undefined,
        origine:undefined, // permet de savoir l'onglet sur lequel on se trouve
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Fermer', // text for cancel button
        largeur:undefined,
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
    }),

    methods: {
        async getEntites(){
            this.showOverlayEntites=true;
            if (!php.empty(this.$store.state.entites)) {
                this.entites = this.$store.state.entites;
            } 
            else {
                try {
                this.entites= await this.$donneesReference.get("entites/all").then(response => response.data.result);
                console.log('entites ',this.entites);
                this.$store.dispatch('entites', this.entites)
                } catch (error) {
                App.notifyError(error.message);
                }
            }
            this.showOverlayEntites=false;
        },
        onSearchEntites(query){
            this.searchentite = query
            this.offsetEntites = 0
        },
        show(opts = {}) {
            this.commande=opts.commande
            this.title = opts.title
            this.message = opts.message
            this.message = opts.message
            this.largeur = opts.largeur
            this.fromRecommandation =opts.fromRecommandation
            this.fromSoumission = opts.fromSoumission
            this.fromRejet = opts.fromRejet
            this.origine = opts.origine
            this.idpermis = opts.idpermis
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
            if(this.origine=='demande'){
                if(this.commande=='0'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/rejecter_demandepermis/'+this.idpermis,{motifrejet:this.motifrejet, uidrejet:this.acterejet}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false
                    }) 
                }
                else if(this.commande=='1'||this.commande=='3'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/verifier_demandepermis/'+this.idpermis).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false
                    }) 
                }
                else if(this.commande=='2'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/'+this.idpermis+'/soumettre',{position:this.destinataire,objet:this.objet}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
                //recommandation
                else if(this.commande=='4'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/'+this.idpermis+'/recommander',{position:this.destinataire}).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
                //emition du permis
                else if(this.commande=='5'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/emettre_demandepermis/'+this.idpermis).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
                //approbation du permis
                else if(this.commande=='6'){
                    this.submitted = true;
                    this.$permis.patch('demandes-permis/approuver_demandepermis/'+this.idpermis).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesdemandepermis',response.data.message);
                        }else{
                            return this.$emit('echecdemandepermis',response.data.message);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                }
            }else if(this.origine=='lv'){
                if(this.commande=='1'){
                    this.submitted = true;
                    this.$operationParc.put('lettres-voiture/soumettre/'+this.idoperation).then(response => {
                        this.submitted = false;
                        console.log('response ',response.data.success);
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            console.log('ms ',response.data.message);
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false
                        console.log('error ',error.response.data.message);
                        return this.$emit('echecopeparc',error.response.data.message);
                    }) 
                }
                else if(this.commande=='2'){
                    this.submitted = true;
                    this.$operationParc.put('lettres-voiture/valider/'+this.idoperation).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('succesopeparc',error.response.data);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                } 
            }else if(this.origine=='bil'){
                 if(this.commande=='suppression'){
                    await this.$operationParc.delete('billonages/supprimmer/'+this.idoperation)
                    .then((response) => {
                        this.submitted =false;
                        return this.$emit('suppressionbillonnageSet',response)  
                    })
                }
                else if(this.commande=='1'){
                    this.submitted = true;
                    this.$operationParc.put('billonages/soumettre/'+this.idoperation).then(response => {
                        this.submitted = false;
                        console.log('response ',response.data.success);
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            console.log('ms ',response.data.message);
                            return this.$emit('echecopeparc',response.data.message);
                        }
                    }).catch(error => {
                        this.submitted = false
                        console.log('error ',error.response.data.message);
                        return this.$emit('echecopeparc',error.response.data.message);
                    }) 
                }
                else if(this.commande=='2'){
                    this.submitted = true;
                    this.$operationParc.put('billonages/valider/'+this.idoperation).then(response => {
                        this.submitted = false;
                        if(response.data.success){
                            App.notifySuccess(response.data.message)
                            return this.$emit('succesopeparc',response.data.message);
                        }else{
                            return this.$emit('succesopeparc',error.response.data);
                        }
                        //App.notifySuccess(response.data.message)
                        return this.$emit('succesopeparc',error.response.data);
                    }).catch(error => {
                        this.submitted = false;

                    }) 
                } 
            }
            
        },
        async selectFileActeRejet(e){
            const acterejet = this.acterejet =  e.target.files[0];
            this.acterejet=await this.getBase64(acterejet)
        },
        getBase64(file){
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        _cancel() {
            this.$refs.popup.close()
            this.resolvePromise(false)
        },

         _close() {
            this.$refs.popup.close()
        },
    },
    mounted(){
        this.emetteur = this.user.profil.organisation
    }
}
</script>

<style scoped>
.disable-sigif-input{
    color: #6E7587;
    background-color: White;
    border: 1px solid White;
    background-image: none;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'verdana';
    font-size: 13px;
}
.pagination {
    display: flex;
    margin: 0.25rem 0.25rem 0;
  }
  .pagination button {
    flex-grow: 1;
  }
  .pagination button:hover {
    cursor: pointer;
  }
.cancel-option{
    color:#dc3545!important; 
    font-weight:bold
}
.ok-option{
 color:rgb(0, 82, 44) !important
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
    background: none;
    color: rgba(102, 201, 53, 0.37);
    border: none;
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
    background: none;
    color: rgba(102, 201, 53, 0.37);
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
