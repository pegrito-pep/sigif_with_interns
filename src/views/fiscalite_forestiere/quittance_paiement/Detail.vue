<template>
    <div>
        <tab-head
          title="Consultation de la quittance n° "
          :fermer="fermer"
          :toggleSideBar="toggleSideBar"
          :idElement="json.nro_quittance"
        >
        </tab-head>
        <div class="p-2">
            <b-row>
                <b-col cols="8">
                    <b-row>
                        <b-col cols="4">
                            <b-form-group
                                label="Date"
                                label-cols="3"
                                label-align="right"
                            >
                                <label class="lbl">{{json.datequittance}}</label>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group
                                label="Montant payé"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="lbl">{{json.montantpaye}}</label>
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group
                                label="Montant total"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="lbl">{{json.montanttotal}}</label>
                            </b-form-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="8">
                    <b-row>
                        <b-col>
                            <b-form-group
                                label="Copie quittance"
                                label-cols="6"
                            >
                                <label class="lbl" disabled>{{ json.file }}</label>
                            </b-form-group>
                        </b-col>
                        <b-col><b-button size="xs">Télécharger</b-button></b-col>
                    </b-row>
                </b-col>
            </b-row>
        </div>
        <div class="p-2">
            <b-tabs>
                <b-tab active title="Détails Quittance DGI">
                    <div class="p-3">
                        <b-row>
                        <b-col cols="5">
                           <b-table hover foot-clone :items="json.items_quittance" :tbody-tr-class="rowClass" :fields="fields_quittance">
                                <template #head(intituledgi)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #head(montantdgi)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #foot(intituledgi)="data">
                                    <span style="color:green">Total part MINFOF</span>
                                </template>
                                <template #foot(montantdgi)="data">
                                    <span style="color:green">{{ 
                                            json.items_quittance.map(p=>p.montantdgi)
                                                .reduce((acc,val)=>{
                                                     return acc + val
                                                },0) 
                                    }}</span>
                                </template>
                           </b-table>
                        </b-col>
                    </b-row>
                    </div>
                    
                </b-tab>
                <b-tab title="Réconciliations des titres émis">
                    <div class="p-3">
                        <b-row>
                        <b-col cols="6">
                            <h5 style="font-weight: bold;">Liste des titres émis lettrés de la quittance</h5>
                            <b-table hover :fields="fields_titres" :items="json.items_titres">
                                <template #head(numtitre)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #head(naturetaxe)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #head(nrotr)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #head(montanttr)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                                <template #head(montantpaye)="data">
                                    <span v-html="data.field.label" style="color:green"></span>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    </div>
                    
                </b-tab>
            </b-tabs>
        </div>
    </div>

</template>
<script>
    import TabHead from '@/components/TabHead.vue'
    export default{
        components:{TabHead},
        name:'details_quittance-paiement',
        data(){
            return{
                fields_titres:[
                    {key:'index',label:''},
                    {key:'numtitre',label:'N° titre'},
                    {key:'naturetaxe',label:'Nature taxe'},
                    {key:'nrotr',label:'Nro TR'},
                    {key:'montanttr',label:'Montant TR'},
                    {key:'montantpaye',label:'Montant payé'},
                ],
                fields_quittance:[
                    {key:'index',label:''},
                    {key:'intituledgi',label:'Intituledgi'},
                    {key:'montantdgi',label:'Montantdgi'},
                ],
                json:{
                    datequittance:'04/01/2023',
                    montantpaye:'45 000 000',
                    montanttotal:'50 000 000',
                    items_titres:[
                        {numtitre:2000,naturetaxe:'RF',nrotr:1639,montanttr:'31500000',montantdu:'31500000',montantpaye:'31500000'}
                    ],
                    file:'approbation PGQ.pdf',
                    items_quittance:[
                        {intituledgi:'TA',montantdgi:45000000}
                    ],
                    nro_quittance:'407 Approuvé',
                    montanttotal:''
                }
            }
            
        },
        methods:{
            fermer(){
                this.$router.push({name:'fiscalite-forestiere-quittance-paiement'})
            },
            toggleSideBar() {
                var sidebar = document.querySelector("#sidebar");
                var administration = document.querySelector("#administration");
                var administrationItem = document.querySelectorAll(".administrationItem");
                var actionButton = document.querySelector("#toggleSideBar");

                if (sidebar.style.width !== "0px") {
                    sidebar.style.width = "0px";
                    sidebar.style.transition = "all 0.5s ease";
                    administration.style.backgroundColor = "white";
                    administration.style.transition = "background-color 0.2s ease";
                    for (let index = 0; index < administrationItem.length; index++) {
                    const element = administrationItem[index];
                    element.style.opacity = "0";
                    element.style.transition = "opacity 0.2s ease";
                    }
                    actionButton.innerHTML =
                    '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
                } else {
                    sidebar.style.width = "250px";
                    sidebar.style.transition = "all 0.3s ease";
                    administration.style.backgroundColor = "#82C138";
                    administration.style.transition = "background-color 0.8s ease";

                    for (let index = 0; index < administrationItem.length; index++) {
                    const element = administrationItem[index];
                    element.style.opacity = "100%";
                    element.style.transition = "opacity 1s ease";
                    }

                    actionButton.innerHTML =
                    '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
                }
            },
            rowClass(item, type) {
                if(item !=''&&item!=null){
                    if (item.isEven) return 'table-row-other'
                    if (!item || type !== 'row') return 'table-info'
                }else{
                    return 
                }
            }
        }
    }
</script>
<style scoped>
    .lbl{
        display:inline-block;
        margin-top:7px;
    }
</style>