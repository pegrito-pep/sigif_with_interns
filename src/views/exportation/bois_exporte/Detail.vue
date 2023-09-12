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
                <b-tab title="Enregistrement bois réellement exportés">
                    <div class="p-2 pb-0">
                        <h6 style="font-weight:bold">Consultation enregistrement  bois exportés : 17 Soumis</h6>
                    </div>
                    <div>
                        <b-row>
                            <b-col cols="4">
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date enregistrement</span>
                                        </div>
                                    </template>
                                    <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker> 
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date rejet</span>
                                        </div>
                                    </template>
                                    <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker> 
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="5"
                                >
                                    <template #label>
                                    <div  class="label-form">
                                        <span>Motif rejet</span>
                                    </div>
                                    </template>
                                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm">
                                    </b-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
                <b-tab title="BSE des bois réellement exportés">
                    <div class="p-2 ml-2">
                        <b-row>
                            <b-col>
                                <div class="pb-1" style="display:flex; align-items: center;border-bottom: 3px solid #82C138;">
                                    <h5 class="p-0 m-0" style="font-weight:bold">BSE</h5>
                                    <a :disabled="canCreateBSE" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateBSE,  'not-change-image-opacity': canCreateBSE}" class="mx-2 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Ajouter</a>
                                    <a class="link mx-2">Bois réellement exportés</a>
                                </div>
                            </b-col>
                        </b-row>
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
                                        <label class="label-italic">fojeph@gmail.com</label>
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
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom transitaire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Transporteur maritime</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom navire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Copie connaissement</span>
                                            </div>
                                        </template>
                                        <b-form-file disabled plain style="width:120%"></b-form-file>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Copie déclaration EX1</span>
                                            </div>
                                        </template>
                                        <b-form-file disabled style="width:120%" plain></b-form-file>
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
                                                <span>Montant droits</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span></span>
                                            </div>Montant SE
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date BSE</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Adresse</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
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
                                        <label class="label-italic">fojeph@gmail.com</label>
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
                                                <span>Port exportation</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
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
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Sigle</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">fojeph@gmail.com</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="pl-2 pt-0">
                        <h5 style="font-weight:bold">Liste des BSE</h5>
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
                    {key:'datedepart',label:'Date départ',thStyle:{color:'green'}},
                    {key:'codebarre',label:'Codebarre BSE',thStyle:{color:'green'}},
                    {key:'nroconnaissement',label:'N° connaissement',thStyle:{color:'green'}},
                    {key:'dateconnaissement',label:'Date connaissement',thStyle:{color:'green'}},
                    {key:'nrodeclarationex1',label:'N° déclaration EX1',thStyle:{color:'green'}},
                    {key:'datedeclarationex1',label:'Date déclaration EX1',thStyle:{color:'green'}},
                    {key:'montantdroits',label:'Montant droits',thStyle:{color:'green'}},
                    {key:'montantse',label:'Monant SE',thStyle:{color:'green'}},
                    {key:'nomtransitaire',label:'Nom transitaire',thStyle:{color:'green'}},
                    {key:'transporteurmaritime',label:'Transporteur maritime',thStyle:{color:'green'}},
                    {key:'nomnavire',label:'Nom navire',thStyle:{color:'green'}},
                    {key:'nomexportateur',label:'Nom exportateur',thStyle:{color:'green'}},
                ],
                selected:{},
                elements:[],
                json:{
                    data:{
                        listingBSE:[
                            {datedepart:'25/05/2021',codebarre:'W9M1',nroconnaissement:'commess',dateconnaissement:'26/05/2021',
                            nrodeclarationex1:'ex1mess',datedeclarationex1:'18/05/2021',montantdroits:1542,montantse:47589,
                            nomtransitaire:'tr mess',transporteurmaritime:'trans mess',nomnavire:'navire mess',nomexportateur:'BOIS LEGAL CAMEROUN'
                            }
                        ]
                    }
                }
            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'bois_exporte'})
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
</style>