<template>
    <div>
            <b-row>
                <b-form-group class="pl-1 mt-1"><b-form-checkbox :disabled="submitted" v-model="isActive" @change="setUserStatut">{{ isActive ?  'Lettre de voiture non vierge'  : 'Lettre de voiture vierge'}}</b-form-checkbox></b-form-group>   
           </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                        <div>
                      <label for="" class="m-0 p-0" style="font-weight:300">Type DDEDFDFDFD bois</label>
                      <select v-model="form.typebois" @change="controleChange" class="m-0 p-0"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                            <option v-for="bois in typesBois" :key="bois" :value="bois"> {{ bois }}</option>
                      </select>
                    </div>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                        <div>
                      <label for="" class="m-0 p-0" style="font-weight:300">Type de LV</label>
                      <select v-model="form.typelv" @change="controleChange" class="m-0 p-0"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                            <option v-for="lettre in listLettre" :key="lettre" :value="lettre"> {{ lettre }}</option>
                      </select>
                    </div>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                    <b-col class="m-0 p-0"><label for="" class="m-0 p-0" style="font-weight:300">Date de changement</label><date-picker v-model="form.datedeb"   format="dddd, DD MMMM YYYY" placeholder="Date du changement" valueType="YYYY-MM-DD" class="w-50" :clearable="false" /></b-col>
              </b-col>
              <b-col>
                    <b-form-group>
                        <div>
                      <label for="" class="m-0 p-0" style="font-weight:300">Mode de transport</label>
                      <select v-model="form.modetransport" @change="controleChange" class="m-0 p-0"  style="width: 50%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                            <option selected="selected">En conventionnel</option>
                            <option>En conteneur</option>
                      </select>
                    </div>
                    </b-form-group>
              </b-col>
            </b-row>

             <b-row>
                <b-col>
                    <b-form-group>
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Type de transport</label>
                            <select v-model="form.typetransport" @change="controleChange" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                                    <option selected="selected">Terrestre</option>
                                    <option>Maritime</option>
                                    <option>Ferroviaire</option>
                            </select>
                        </div>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">Nom du transporteur</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="form.nomtransporteur"/>
                    </b-form-group>
              </b-col>
              
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° unique du transporteur</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="form.numtransporteur"/>
                    </b-form-group>
              </b-col>
              <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">Nom du chauffeur</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="form.nomchauffeur"/>
                    </b-form-group>
              </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° immatriculation véhicule</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="form.immatriculationvoiture"/>
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group>
                         <label class="p-0 m-0" style="font-weight:300">N° wagon</label>
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="form.numwagon"/>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group>
                        <div>
                            <label for="" class="m-0 p-0" style="font-weight:300">Site départ</label>
                            <select v-model="form.sitedepart" @change="controleChange" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                                    <option selected="selected">PB BLCAM</option>
                                    <option>SITE DE YASSA</option>
                                    <option>SITE DE BONABERI</option>
                            </select>
                        </div>
                    </b-form-group>
                </b-col>
                <b-col class="m-0 p-0">
                        <b-form-group class="m-0 p-0">
                            <div>
                                <label for="" class="m-0 p-0" style="font-weight:300">Site destination</label>
                                <select v-model="form.sitedestination" @change="controleChange" class="m-0 p-0"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                                        <option selected="selected">PB BLCAM</option>
                                        <option>SITE DE YASSA</option>
                                        <option>SITE DE BONABERI</option>
                                </select>
                            </div>
                        </b-form-group>
                </b-col>
            </b-row>
            
            <b-col class="m-0 p-0">
                    <b-form-group >
                        <div class="m-0 p-0 mt-2" style="display: flex !important; flex-direction: column !important;" >
                            <label for="" class="m-0 p-0" style="font-weight:300">Commentaire</label>
                            <textarea v-model="form.commentaire" name="commentaire" id="commentaire" cols="30" rows="4" placeholder="Saisir un commentaire..."></textarea>
                        </div>
                        
                    </b-form-group>
            </b-col>
            
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-card  v-if="form.typesiteoper=='Parc usine'" class="pb-0">
                    <template #header>
                        <h6 class="mb-0 font-weight-bold text-center">Autorisation d'enregistrement du site</h6>
                    </template>
                    <b-row>
                        <b-form-group>
                            <label class="p-0 m-0" style="font-weight:300">Attacher certificat</label>
                            <input type="file" size="sm" class="w-100 p-0 m-0" placeholder="" @change="modal.attachcertificat" />
                        </b-form-group>
                    </b-row>
                </b-card>
            </transition>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-card  v-if="form.typesiteoper=='Parc rupture'" class="pb-0">
                    <template #header>
                        <h6 class="mb-0 font-weight-bold text-center">Autorisation d'enregistrement du site</h6>
                    </template>
                    <b-row>
                        <b-form-group>
                            <label class="p-0 m-0" style="font-weight:300">Attacher autorisation</label>
                            <input type="file" size="sm" class="w-100 p-0 m-0" placeholder="" @change="modal.attachautorisation" />
                        </b-form-group>
                    </b-row>
                </b-card>
            </transition>
            <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOut zoomOut">
                <b-card  v-if="form.typesiteoper=='Parc port' | form.typesiteoper=='Unité de transformation de bois'" class="pb-0">
                    <template #header>
                        <h6 class="mb-0 font-weight-bold text-center">Autorisation d'enregistrement du site</h6>
                    </template>
                    <b-row>
                        <b-form-group>
                            <label class="p-0 m-0" style="font-weight:300">Attacher certificat d'exportateur</label>
                            <input type="file" size="sm" class="w-100 p-0 m-0" placeholder="" @change="modal.attachautorisation" />
                        </b-form-group>
                    </b-row>
                </b-card>
            </transition>

            <div class="m-0 px-2 table-header-border">
                <b-row>
                    <b-col><h4 class="tab-header-left-text" style="font-size: 14px !important;"> Liste des éléments</h4></b-col>
                    <b-col class="col-md-auto liens">
                        <a @click.prevent="AddField1" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <span >
                        <a class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                        <a class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                        </span>
                    </b-col>
                </b-row>
                
            </div>

                <b-row class="w-75">
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Code à barre</label>
                    </b-col>
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Code à barre séquence</label>
                    </b-col>
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Nom commercial</label>
                    </b-col>
                    <b-col cols="3">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Actions</label>
                    </b-col>
                    
                </b-row>
                <b-row class="w-75 mb-2" v-for="field in fields1" :key="field">
                    <b-col cols="3">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.codebarre" />
                    </b-col>
                    <b-col cols="3">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.codebarresequence" />
                    </b-col>
                    <b-col cols="3">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.nomcommercial" />
                    </b-col>
                    <b-col class="liens">
                        <a class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                    </b-col>
                </b-row>

               <div class="m-0 px-2 table-header-border mt-5">
                <b-row>
                    <b-col><h4 class="tab-header-left-text" style="font-size: 14px !important;">Détails des débités</h4></b-col>
                    <b-col class="col-md-auto liens">
                        <a @click.prevent="AddField2" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <span >
                        <a class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                        <a class="mx-1 simple-btn"><b-img src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                        </span>
                    </b-col>
                </b-row>
            </div>

                <b-row>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Code barre</label>
                    </b-col>
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Epaisseur(cm)</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Largeur(cm)</label>
                    </b-col>
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Longueur pièce(cm)</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Nbre pièce</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Poids</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Superficie</label>
                    </b-col>
                    <b-col cols="1">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Volume(m3)</label>
                    </b-col>
                    <b-col cols="2">
                        <label class="p-0 m-0" style="font-weight:600; color: black;">Actions</label>
                    </b-col>
                </b-row>
                <b-row class="mb-2" v-for="field in fields2" :key="field">
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.codebarre" />
                    </b-col>
                    <b-col cols="2">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.epaisseur" />
                    </b-col>
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.largeur" />
                    </b-col>
                    <b-col cols="2">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.longueurpiece" />
                    </b-col>
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.nombrepiece" />
                    </b-col>
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.poids" />
                    </b-col>
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.superficie" />
                    </b-col>
                    <b-col cols="1">
                        <b-form-input size="sm" class="w-100 p-0 m-0" style="height: 24px !important;" placeholder="" v-model="field.volume" />
                    </b-col>
                    <b-col class="liens" cols="2">
                        <a class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                    </b-col>
                </b-row>
          <b-button class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" @click.prevent="addLettre">Enregistrer <b-spinner v-if="submitted" small /></b-button>
    </div>
    
</template>

<script>
const php = require('phpjs');


export default {
    name:"lettrelv-form",
     computed: {
       _departements() {
            return this.departements.filter(elt => elt.region.idregion == this.form.idregion)
        },
        _arrondissements() {
            return this.arrondissements.filter(elt => elt.departement.iddepartement == this.form.iddepartement)
        },
     },

     watch: {
      "form.idregion"(value) {
        if(value!==null&&value.length!==''){
            this.disableDep= false
        }
        else{
            this.disableDep= true
        }
     },
     "form.iddepartement"(value) {
        if(value!==null&&value.length!==''){
            this.disableArrond= false
        }
        else{
            this.disableArrond= true
        }
     },
   
    },
     data: () => ({
        amount: '',
        submitted: false,
        form: {
            typesiteoper: "Permis spécial",
            intitule:'',
            utmzone: "3N",
            utmx: "",
            utmy: "",
            attachautorisation: "",
            exerciceFiscal: "2022",

            idregion: null,
            iddepartement: null,
            idarrondissement: null,
        },
        isActive:false,
        disableDep:true,
        disableArrond:true,

        isBusy:false,
        
        typesBois: [
            "Bois partant d'un site pour un autre site appartenant au même opérateur",
            "Bois de négoce",
            "Bois à l'export",
            "Lettre de voiture pour permis spéciaux",
        ],
        listLettre: [
            "Lettre de voiture 'débités'",
            "Lettre de voiture 'grume'"
        ],

        // Données du tableau

        fields1: [{ codebarre: '',codebarresequence: '', nomcommercial: '' }],
        fields2: [{ codebarre: "" , epaisseur:"", largeur:"",longueurpiece:"", nombrepiece: '', poids: '', superficie: '', volume: ''}, ],
    }),

    methods: {

        AddField1 () {
            this.fields1.push({ codebarre: '',codebarresequence: '', nomcommercial: '', });
        },
        AddField2 () {
            this.fields2.push({codebarre: "" , epaisseur:"", largeur:"",longueurpiece:"", nombrepiece: '', poids: '', superficie: '', volume: ''},);
        },
        

        setUserStatut(){},
       
        controleChange() {
            console.log("Somethings change");
        },
        resetForm() {
            this.form = {
               typesiteoper: "Permis spécial", intitule:'', utmzone: "3N",utmx: "", utmy: "", attachautorisation: "", exerciceFiscal: "2022",
                idregion: null, iddepartement: null,idarrondissement: null,
            };

        },
        async addLettre() {
            this.form.statut=this.isActive
            this.submitted = true
           
            this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('lettreAdded')
                    this.resetForm()
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    return App.alertError(error.message)
                })
        },
        rowClass(item, type) {
            if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
            }else{
            return 
            }
        },
        onRowSelected(items) {
            console.log('row selected',items);
            items.isSelected =true;
            this.isRowselected=true
                this.selected = items
        },
    },
     mounted() {
        //this.getLocalites()
    },

}
</script>
<style scoped >
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
.liens a {
    color: rgb(0, 82, 44) !important;
    font-weight: 600;
    cursor: pointer;
}
</style>