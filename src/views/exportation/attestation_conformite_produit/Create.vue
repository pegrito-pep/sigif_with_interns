<template>
    <div>
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
                        <h6 style="font-weight:bold">39 CB n° : Z5Z027T</h6>
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
                                    <label class="label-italic">U8TCII0J</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                    <label class="label-italic">16/05/2021</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                    <label class="label-italic">2</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                    <label class="label-italic">3</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                    <label class="label-italic">5,589</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="p-2 ml-2 pt-3" style="border-bottom:2px solid green">
                        <b-row>
                        <b-col cols="3">
                            <b-form-group class="p-0 m-0"
                                    label-cols="7"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date de délivrance ANRF</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">07/05/2021</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                        <b-col cols="8">
                            <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Copie attestation de redevance non fiscale</span>
                                        </div>
                                    </template>
                                    <div style="display:flex;justify-content: space-between;">
                                        <label disabled class="label-italic">attestation redevance.pdf</label>
                                        <b-button disabled style="background-color:grey;align-self:flex-end">Mettre à jour...</b-button>
                                        <b-form-file id="form-file" plain hidden></b-form-file>
                                        <label style="font-style:italic;color:green" for="form-file">Télécharger</label>
                                    </div>
                                    
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                        <div style="overflow-x:auto;position: relative; width: 1300px;">
                            <b-table :items="items" :fields="fields" selectable @row-selected="onRowSelected"
                                :tbody-tr-class="rowClass" style="position: relative; width: 145%;"
                            >

                            </b-table>
                        </div>
                    </div>
                </b-tab>
                <b-tab title="BSE">
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
                                        <label class="label-italic">UC8TCI</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">16/05/2021</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">16/05/2021</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">Grumes</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">Maritime</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">En conventionnel</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">5,589</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">3</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                <label class="label-italic">3</label>
                                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">BELGIQUE</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">BE</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">BRUSSELS WOOD</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">BOIS LEGAL CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">7852 BRUXELLES</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">Port de DOUALA</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">BOIS LEGAL CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">35135 MFOU</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                <label class="label-italic">Port de BRUXELLES</label>
                                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group> 
                        </b-col>
                    </b-row>
                   </div>
                </b-tab>
            </b-tabs>
        </b-col>
    </b-row>
    </div>
</template>
<script>
    export default{
        name:'detail-bois-exporte',
        data(){
            return{
                fields:[
                    {key:'nrocontrat',label:'N° contrat',thStyle:{color:'green'}},
                    {key:'codebarre',label:'Codebarre BSE',thStyle:{color:'green'}},
                    {key:'nomcommercial',label:'Nom Commercial',thStyle:{color:'green'}},
                    {key:'diametregrosbout',label:'Diamètre gros bout',thStyle:{color:'green'}},
                    {key:'diametrepetitbout',label:'Diamètre petit bout',thStyle:{color:'green'}},
                    {key:'longueur',label:'Longueur',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                ],
                selected:{},
                elements:[],
                json:{
                    data:{
                        listingBSE:[
                            {nrocontrat:'CT002',codebarre:'LES1IFOUL',nomcommercial:'tali',dateconnaissement:'26/05/2021',
                            diametregrosbout:65,diametrepetitbout:60,longueur:65,volume:2.92,
                            poids:1,
                            }
                        ]
                    }
                },
                options:[
                    {text:'Fiscalite',value:'fiscalité',disabled:true},
                    {text:'Contentieux',value:'contentieux',disabled:true}
                ],
                selected:true
            }
        },
        methods:{
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
            console.log('row selected',items);
            items.isSelected =true;
            this.isRowselected=true
                this.selected = items
        },
        items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
        },
        mounted(){
            this.elements=this.json.data.listingBSE
        }
    }
</script>
<style>
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
    }
</style>