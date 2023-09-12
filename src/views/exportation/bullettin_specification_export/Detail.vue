<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlay">
            <b-row>
                <b-col>
                    <div class="p-1">
                        <b-row>
                            <b-col>
                                <h5 style="font-weight:bold">Consultation du BSE n° : <span v-if="bsdetail!=null">{{ bsdetail.idbseEntete }}</span></h5>
                            </b-col>
                            <b-col class="col-md-auto">
                                <span>
                                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                                </span>
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="5">
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Entité forestière</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.entite!=null">{{ bsdetail.entite }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>SIGLE</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.sigle!=null">{{ bsdetail.sigle }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Exercice</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.exercice!=''">{{ bsdetail.exercice }}</label>
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
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.addresseexporteur!=null">{{ bsdetail.addresseexporteur }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Type de produit</span>
                            </div>
                        </template>
                        <select v-if="bsdetail!=null" v-model="bsdetail.typeproduit" disabled style="height: calc(1em + .300rem + 1px) !important;width:50%" class="form-control p-0" size="sm">
                            <option value="Débités">Débités</option>
                            <option value="Grumes">Grumes</option>
                            <option value="Produit spéciaux">Produit spéciaux</option>
                        </select>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Numéro d'enregistrement</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.numEnregistrement!=null"><b-badge variant="secondary">{{ bsdetail.numEnregistrement }}</b-badge></label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Date de la demande</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.dateDemande!=null">{{ $dayjs(bsdetail.dateDemande).format("DD/MM/YYYY") }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Numéro du contrat</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.numContrat!=''">{{ bsdetail.numContrat }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Pays d'origine</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.paysOrigine!=''">{{ bsdetail.paysOrigine }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Pays de destination</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.paysdestination!=''">{{ bsdetail.paysdestination }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Site d'exportation</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.siteExportation!=''">{{ bsdetail.siteExportation }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Port de débarquement</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.portdebarquement!=''">{{ bsdetail.portdebarquement }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="5"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span style="color:red">*</span><span>Moyen de transport</span>
                            </div>
                        </template>
                        <select v-if="bsdetail!=null" v-model="bsdetail.moyenTransport" disabled style="height: calc(1em + .300rem + 1px) !important;width:50%" class="form-control p-0" size="sm">
                            <option value="Maritime">Maritime</option>
                            <option value="Térrestre">Térrestre</option>
                            <option value="Aérien">Aérien</option>
                        </select>
                    </b-form-group>
                </b-col>
                <b-col cols="5">
                    <b-form-group class="p-0 m-0"
                        label-cols="7"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Email autorités douanières destination</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null&&bsdetail.emaildouane!=''">{{ bsdetail.emaildouane }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="7"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Mode de conditionnement</span>
                            </div>
                        </template>
                        <select v-if="bsdetail!=null" v-model="bsdetail.modeConditionnement" disabled style="height: calc(1em + .300rem + 1px) !important;width:75%" class="form-control p-0" size="sm">
                            <option value="En conventionnel">En conventionnel</option>
                            <option value="En conteneur">En conteneur</option>
                        </select>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="7"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Nom du destinataire</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null">{{ bsdetail.nomDestinataire }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="7"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Adresse du destinataire</span>
                            </div>
                        </template>
                        <label class="label-italic" v-if="bsdetail!=null">{{ bsdetail.adresseDestinataire }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                            label-cols="7"
                            label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span style="color:red">*</span><span>BSE n°</span>
                            </div>
                        </template>
                        <label for="" class="" v-if="bsdetail!=null&&bsdetail.numBse!=null"><b-badge>{{ bsdetail.numBse }}</b-badge></label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                            label-cols="7"
                            label-align="right"
                        >
                        <template #label>
                            <div class="label-form">
                                <span style="color:red">*</span><span>Signé le</span>
                            </div>
                        </template>
                        <label class="label-italic">{{ $dayjs(bsdetail.dateSignature).format("DD/MM/YYYY") }}</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                            label-cols="7"
                            label-align="right"
                        >
                        <template #label>
                            <div class="label-form">
                                <span style="color:red">*</span><span>Bulletin de spécification à l'export</span>
                            </div>
                        </template>
                        <a class="detail-permis-item" v-if="bsdetail!=null&&bsdetail.bulletinSpecification!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="bsdetail.bulletinSpecification"><b-img src="@/assets/images/Attach_128x128.png"></b-img> bulletin</a>
                        <b-form-file plain style="width:150%;" size="sm"></b-form-file>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="pl-1 m-1">
                <h6 style="font-weight:bold">Liste des produits</h6>
            </div>
            <div class="pl-3">
                <div style="border-top:2px solid green;border-bottom:2px solid green">
                    <b-row>
                        <b-col cols="9">
                            <b-table v-if="bsdetail!=null&&bsdetail.typeproduit=='Grumes'" selectable hover @row-selected="onRowSelected" 
                                :items="itemsgrumes" :fields="fieldsgrumes" :tbody-tr-class="rowClass"
                                select-mode="single" responsive="sm" ref="selectableTable"
                            >
                                <template #cell(codebarre)="data">
                                    <input type="text" v-model="data.item.codebarre" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(essence)="data">
                                    <input type="text" v-model="data.item.essence" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(diamPb)="data">
                                    <input type="text" v-model="data.item.diamPb" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(diamGb)="data">
                                    <input type="text" v-model="data.item.diamGb" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(longueur)="data">
                                    <input type="text" v-model="data.item.longueur" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(codeCemac)="data">
                                    <input type="text" v-model="data.item.codeCemac" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(codeSH)="data">
                                    <input type="text" v-model="data.item.codeSH" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(poids)="data">
                                    <input type="text" v-model="data.item.poids" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                                <template #cell(volume)="data">
                                    <input type="text" v-model="data.item.volume" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#82C138; border: 1px solid white;">
                                </template>
                            </b-table>
                            <b-table v-else-if="bsdetail!=null&&bsdetail.typeproduit=='dévités'" selectable hover @row-selected="onRowSelected" 
                                :items="items" :fields="fields" :tbody-tr-class="rowClass"
                                select-mode="single" responsive="sm" ref="selectableTable"
                            >
                                <template #cell(codebarres)="data">
                                    <b-form-input size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.codebarres"></b-form-input>
                                </template>
                                <template #cell(essences)="data">
                                    <b-form-input size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.essences"></b-form-input>
                                </template>
                                <template #cell(codecemac)="data">
                                    <b-form-input size="xs" class="w-50"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.codecemac"></b-form-input>
                                </template>
                                <template #cell(codesh)="data">
                                    <b-form-input size="xs" class="w-50"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.codesh"></b-form-input>
                                </template>
                                <template #cell(poids)="data">
                                    <b-form-input size="xs" class="w-50"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.poids"></b-form-input>
                                </template>
                                <template #cell(volume)="data">
                                    <b-form-input size="xs" class="w-50"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.volume"></b-form-input>
                                </template>
                            </b-table>
                        </b-col>
                </b-row>
                </div>
            </div>
        </b-overlay>
    </div>
</template>
<script>
  const php  = require ( 'phpjs' ) ;

    export default{
        data(){
            return{
                bsdetail:null,
                showOverlay:false,
                checked:true,
                elements:[],
                elements2:[],
                fieldsgrumes:[
                    {key:'codebarre',label:'Codes barres',thStyle:{color:'green',width:'11%'}},
                    {key:'essence',label:'Essences',thStyle:{color:'green',width:'18%'}},
                    {key:'diamPb',label:'Damètre petit bout',thStyle:{color:'green',width:'14%'}},
                    {key:'diamGb',label:'Damètre gros bout',thStyle:{color:'green',width:'15%'}},
                    {key:'longueur',label:'Longueur(m)',thStyle:{color:'green'}},
                    {key:'codeCemac',label:'Code CEMAC',thStyle:{color:'green'}},
                    {key:'codeSH',label:'CodeSH',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                ],
                fieldsdebites:[
                    {key:'codebarre',label:'Codes barres',thStyle:{color:'green'}},
                    {key:'essence',label:'Essences',thStyle:{color:'green'}},
                    {key:'numcolis',label:'N° du colis',thStyle:{color:'green'}},
                    {key:'longueur',label:'Longueur(m)',thStyle:{color:'green'}},
                    {key:'largeur',label:'largeur(cm)',thStyle:{color:'green'}},
                    {key:'epaisseur',label:'epaisseur',thStyle:{color:'green'}},
                    {key:'nbpieces',label:'Nombre de pièces',thStyle:{color:'green'}},
                    {key:'codeCemac',label:'Code CEMAC',thStyle:{color:'green'}},
                    {key:'codeSH',label:'CodeSH',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                ],
                /*json:{
                    data:{
                        listing:[
                            {codebarres:'3EOMBO',essences:'Fraké Limbu',codecemac:1320,codesh:'320',poids:3,volume:4},
                            {codebarres:'3EOMBO',essences:'Fraké Limbu',codecemac:1320,codesh:'320',poids:2,volume:3},
                        ]
                    }
                }*/
            }   
        },
        watch:{
          elements(value){
            if(!php.empty(value)){
                setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
            }
          },
        },
        methods:{
            fermer(){
                this.$router.back()
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
                console.log('row selected');
                items.isSelected =true;
                this.isRowselected=true
                this.selected = items
            },
            async getDetailsBse() {
                this.showOverlay = true
                await this.$exportations.get('bulletinExport/' +this.$route.params.id).then(response =>{
                    this.bsdetail= response.data.result
                })
                this.elements=this.bsdetail.produits;
                console.log('elements ',this.elements);
                this.showOverlay = false
            },
        },
        computed:{
            itemsgrumes() { 
                return this.elements.map((a, index) => {  
                    a.isFirst = index == 0        
                    a.isEven = index %2 == 0        
                    return a
                })
            },
            itemsdebites() { 
                return this.elements.map((a, index) => {  
                    a.isFirst = index == 0        
                    a.isEven = index %2 == 0        
                    return a
                })
            },
            items2() { 
                return this.elements2.map((a, index) => {  
                    a.isFirst = index == 0        
                    a.isEven = index %2 == 0        
                    return a
                })
            },
        },
        beforeMount() {
            this.getDetailsBse();
        }
    }
</script>
<style>
.sigif-input-view{
    background:#82C138!important;
    border:1px solid white;
    font-size:0.75rem !important;
    font-weight: 300;
    height: calc(1em + .500rem + 1px) !important;
    border-radius: .2rem;
  }
 .detail-permis-item {
    color: #175131!important;
 }
 .label-form{
        margin-top:-8px;
    }
    .simple-btn{
    background:none;
    border:none;
    color:black;
    font-weight: bold;
    cursor:pointer;
  }</style>