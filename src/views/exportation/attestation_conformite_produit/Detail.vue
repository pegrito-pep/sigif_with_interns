<template>
    <div>
    <b-overlay rounded="sm" :show="showOverlay">
        <b-row>
        <b-col></b-col>
        <b-col class="col-md-auto">
            <a @click.prevent="fermer" class="mx-1 simple-btn">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
            </a>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-tabs>
                <b-tab title="Demande d'ACP">
                    <div class="p-2 pb-0">
                        <h6 style="font-weight:bold"><span v-if="acpdetails!=null"> {{ acpdetails.numDemandeAcp }} CB n° : {{ acpdetails.codebarre }}</span></h6>
                    </div>
                    <div class="pl-2 pb-2 ml-2" style="border-bottom:2px solid green">
                        <b-row>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Codebarre BSE</span>
                                        </div>
                                    </template>
                                    <label class="label-italic" v-if="acpdetails!=null&&acpdetails.codebarreBse">{{ acpdetails.codebarreBse }}</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date demande</span>
                                        </div>
                                    </template>
                                    <label class="label-italic" v-if="acpdetails!=null&&acpdetails.dateDemandeAcp">{{ $dayjs(acpdetails.dateDemandeAcp).format("DD/MM/YYYY") }}</label>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Nombre unités</span>
                                        </div>
                                    </template>
                                    <label class="label-italic" v-if="acpdetails!=null&&acpdetails.nombreUnites">{{ acpdetails.nombreUnites }}</label>

                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Poids total </span>
                                        </div>
                                    </template>
                                    <label class="label-italic"  v-if="acpdetails!=null&&acpdetails.poidsTotal">{{ acpdetails.poidsTotal }}</label>
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Volume total</span>
                                        </div>
                                    </template>
                                    <label class="label-italic" v-if="acpdetails!=null&&acpdetails.volumeTotal">{{ acpdetails.volumeTotal }}</label>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="p-2 ml-2 pt-3" style="border-bottom:2px solid green">
                        <b-row>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                    label-cols="7"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date de délivrance ANRF</span>
                                        </div>
                                    </template>
                                    <label class="label-italic" v-if="acpdetails!=null&&acpdetails.datedelivranceAnrf">{{ $dayjs(acpdetails.datedelivranceAnrf).format("DD/MM/YYYY") }}</label>
                            </b-form-group>
                        </b-col>
                        <b-col cols="7">
                            <b-form-group class="p-0 m-0"
                                    label-cols="7"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Copie attestation de redevance non fiscale</span>
                                        </div>
                                    </template>
                                    <div style="display:flex;justify-content: space-between;">
                                        <label disabled class="label-italic">
                                            <a class="mx-1 detail-permis-item" v-if="acpdetails!=null&&acpdetails.copieAttestationNonRd!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="acpdetails.copieAttestationNonRd"><b-img src="@/assets/images/Attach_128x128.png"></b-img> attestation redevance.pdf</a>
                                        </label>
                                    </div>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    </div>
                    <div class="pl-3 pt-1">
                        <b-row>
                            <b-col cols="3">
                                <a style="color:green;font-size:.8rem;">Vérifier approvisionnement et légalité</a>
                            </b-col>
                            <b-col cols="2">
                                <b-form-group
                                    label="Fiscalité"
                                    label-cols="4"
                                >
                                    <b-form-checkbox class="mt-2" disabled v-model="selected"></b-form-checkbox>
                                </b-form-group>
                            </b-col>
                            <b-col cols="2">
                                <b-form-group
                                    label="Contentieux"
                                    label-cols="5"
                                >
                                    <b-form-checkbox class="mt-2" disabled v-model="selected"></b-form-checkbox>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="pl-2 pt-0 mt-5">
                        <h5 style="font-weight:bold">Liste des produits</h5>
                    </div>
                    <div class="ml-2" style="border-bottom:2px solid green;border-top:2px solid green">
                        <div>
                            <b-table :items="items" :fields="fields" selectable @row-selected="onRowSelected" ref="selectableTable"
                                :tbody-tr-class="rowClass">
                            </b-table>
                        </div>
                    </div>
                </b-tab>
                <b-tab @click.prevent="loadBseData" title="BSE">
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Codebarre BSE</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.codebarreBse">{{ bsedetails.codebarreBse }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date signature</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.dateSignature">{{ $dayjs(bsedetails.dateSignature).format("DD/MM/YYYY") }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date départ</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.datedepart">{{ $dayjs(bsedetails.datedepart).format("DD/MM/YYYY") }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code type produits</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.typeproduit">{{ bsedetails.typeproduit }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Moyen de transport</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.moyenTransport!=''">{{ bsedetails.moyenTransport }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Conditionnement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.modeConditionnement!=''">{{ bsedetails.modeConditionnement }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Volume total</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.volumeTotals!=''">{{ bsedetails.volumeTotals }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Poids total</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.poidTotals!=''">{{ bsedetails.poidTotals }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col>
                            <b-form-group class="p-0 m-0"
                                label-cols="5"
                                label-align="right"
                            >
                                <template #label>
                                    <div class="label-form">
                                        <span>Nombre unités</span>
                                    </div>
                                </template>
                                <label class="label-italic" v-if="bsedetails!=null&&bsedetails.nombreUnite!=''">{{ bsedetails.nombreUnite }}</label>
                            </b-form-group>
                        </b-col>
                    </b-row>
                   </div>
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays récolté</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.paysOrigine!=''">{{ bsedetails.paysOrigine }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code ISO Pays récolté</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.codeIsoPaysOrigine!=''">{{ bsedetails.codeIsoPaysOrigine }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays destination</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.paysdestination!=''">{{ bsedetails.paysdestination }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays exportation</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.paysOrigine!=''">{{ bsedetails.paysOrigine }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code ISO exportation</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.codeIsoPaysOrigine!=''">{{ bsedetails.codeIsoPaysOrigine }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code ISO destination</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.codeIsoPaysDestination!=''">{{ bsedetails.codeIsoPaysDestination }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                    </b-row>
                   </div>
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Destinataire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.codeIsoPaysDestination!=''">BRUSSELS WOOD</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom exportateur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.entite!=''">{{ bsedetails.entite }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Adresse destinataire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.adresseDestinataire!=''">{{ bsedetails.adresseDestinataire }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Port embarquement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.portdebarquement!=''">{{ bsedetails.portdebarquement }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Expéditeur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.entite!=''">{{ bsedetails.entite }}</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Adresse expéditeur</span> 
                                            </div>
                                        </template>
                                        <label class="label-italic" v-if="bsedetails!=null&&bsedetails.entite!=''">{{ bsedetails.entite }}</label>
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col>
                            <b-form-group class="p-0 m-0"
                                label-cols="5"
                                label-align="right"
                            >
                                <template #label>
                                    <div class="label-form">
                                        <span>Port débarquement</span>
                                    </div>
                                </template>
                                <label class="label-italic" v-if="bsedetails!=null&&bsedetails.portdebarquement!=''">{{ bsedetails.portdebarquement }}</label>
                            </b-form-group> 
                        </b-col>
                    </b-row>
                   </div>
                </b-tab>
            </b-tabs>
        </b-col>
    </b-row>
    </b-overlay>    
    
    </div>
</template>
<script>
    const php  = require ( 'phpjs' ) ;

    export default{
        name:'detail-acp',
        watch:{
            elements(value){
                if(!php.empty(value)){
                    setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
                }
            },
        },
        computed:{
            items() { 
                return this.elements.map((a, index) => {  
                    a.isFirst = index == 0        
                    a.isEven = index %2 == 0        
                    return a
                })
            },
        },
        data(){
            return{
                fields:[
                    {key:'numContrat',label:'N° contrat',thStyle:{color:'green'}},
                    {key:'codebarre',label:'Codebarre BSE',thStyle:{color:'green'}},
                    {key:'nonCommercial',label:'Nom Commercial',thStyle:{color:'green'}},
                    {key:'diamGb',label:'Diam. gros bout',thStyle:{color:'green'}},
                    {key:'diamPb',label:'Diam. petit bout',thStyle:{color:'green'}},
                    {key:'longueur',label:'Longueur',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                ],
                showOverlay:false,
                selected:{},
                elements:[],
                acpdetails:null,
                bsedetails:null,
                options:[
                    {text:'Fiscalite',value:'fiscalité',disabled:true},
                    {text:'Contentieux',value:'contentieux',disabled:true}
                ],
                selected:true
            }
        },
        methods:{
            async loadBseData(){
              console.log('données BSE');
              this.showOverlay=true;
              await this.$exportations.get('bses/' +this.acpdetails.idBse).then(response =>{
                this.bsedetails= response.data.result
              })
              this.elements=this.acpdetails.listesProduits;
              this.showOverlay = false  
            },
            async getDetailsACP(){
                this.showOverlay = true
                await this.$exportations.get('Acp/' +this.$route.params.id).then(response =>{
                    this.acpdetails= response.data.result
                })
                this.elements=this.acpdetails.listesProduits;
                this.showOverlay = false
            },
            fermer(){
                this.$router.push({name: 'attestation_conformite_produit'})
            },
            canCreateBSE(){
                return false
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
                items.isSelected =true;
                this.isRowselected=true
                this.selected = items
            },
           
        },
        /*mounted(){
            this.elements=this.json.data.listingBSE
        },*/
        beforeMount() {
            this.getDetailsACP();
        }

    }
</script>
<style>
    .detail-permis-item {
        color: #175131!important;
    }
    .detail-permis-item:hover{
        text-decoration: underline;
    }
    .not-change-image-opacity:hover{
        cursor:pointer;
        color:#82C138;
    }
    .change-image-opacity{
        opacity: 0.15;
    }
    .not-change-image-opacity{
        opacity: 1;
    }
    .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }
    
    .label-form{
        margin-top:-8px;
    }
    .link{
        color:green;
    }
    a.link:hover{
        font-style: italic;
    }
    a:hover{
        color:black;
    }
    .nav-tabs .nav-link.active {
        background-color: rgb(0, 82, 44)!important;
        font-weight: bold;
        color: white !important;
        border-color:  rgb(0, 82, 44)!important;
        }
    .nav-tabs .nav-link {
    color: grey;
    }
    .label-italic{
        font-style: italic;
        font-weight: bold;
    }
</style>