<template>
    <div class="for_commun_cp">
        <tab-head :fermer="fermer" title="Forêt communale n°"></tab-head>
        <b-row class="p-1 mb-1" style="border-bottom:3px solid green">
                <b-col cols="6">
                    <b-form-group class="p-0 m-0"
                        label="Type de titre"
                        label-cols="4"
                        label-align="right"
                    >
                        <select disabled style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 1px) !important;">
                            <option value="ccp">Forêt communautaire en convention définitive</option>
                        </select>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Forêt communautaire n° "
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form">0904720</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Entité forestière"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form">GIC DES ELEVEURS RURAUX</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Marteau"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form">GERM</label>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group
                        label="Superficie totale(ha)"
                        label-cols="5"
                        label-align="right"
                    >
                        <!-- <b-form-input value="20 000" disabled class="form-control-xs bg-white"></b-form-input> -->
                        <label class="label-form">3 092</label>
                    </b-form-group>
                </b-col>
        </b-row>
        <div>
            <b-row>
                <b-col>
                    <b-tabs>
                        <button class="arrow-left" @click="scroll_left">
                            <b-icon-arrow-left/>
                        </button>
                        <b-tab title="Forêt communale n° 0904720">
                            <div class="ml-1 pl-3" style="border:1px solid grey">
                                <b-row>
                                    <b-col cols="2">
                                        <b-form-group class="p-0 m-0"
                                            label="N° décret classement"
                                            label-cols="8"
                                        >
                                            <label class="label-form">098</label>
                                        </b-form-group>
                                        
                                        <b-form-group class="p-0 m-0"
                                            label="Décret de classement"
                                            label-cols="6"
                                        >
                                            <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;">
                                                <span style="font-style: italic;">classement.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="2">
                                        <b-form-group class="p-0 m-0"
                                            label="Date décret"
                                            label-cols="8"
                                        >
                                            <label class="label-form">01/01/2022</label>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col>
                                        <div class="pb-4">
                                            <b-tabs>
                                                <b-tab title="Détails des informations">
                                                    <div style="border:1px solid grey">
                                                        <div class="ml-2 mr-3" style="border-bottom:3px solid green;height: 10px;"></div>
                                                        <div class="p-3">
                                                            <div class="pb-5">
                                                                <b-row>
                                                                <b-col>
                                                                    <h6 style="border-top:2px solid green">Liste des UFE</h6>
                                                                    <b-table selectable hover :items="itemsufe" :fields="fieldsufe"
                                                                        :tbody-tr-class="rowClass" @row-selected="onRowSelected"
                                                                    >
                                                                    </b-table>
                                                                </b-col>
                                                            </b-row>
                                                            </div>
                                                            <b-row>
                                                                <b-col cols="7">
                                                                    <h6 style="border-top:2px solid green">Assiettes annuelles de coupe</h6>
                                                                    <b-table :tbody-tr-class="rowClass" selectable hover @row-selected="onRowSelected" :items="itemsparcelles" :fields="fieldsparcelles">
                                                                        <template #cell(numparcelle)="data">
                                                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.numparcelle"></b-form-input>
                                                                        </template>
                                                                        <template #cell(limites)="data">
                                                                            <!-- <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.lmites"></b-form-input> -->
                                                                            <span>{{ data.item.limites }}</span>
                                                                        </template>
                                                                        <template #cell(materialisation)="data">
                                                                            <!-- <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.materialisation"></b-form-input> -->
                                                                            <span>{{ data.item.materialisation }}</span>
                                                                        </template>
                                                                        <template #cell(superficie)="data">
                                                                            <!-- <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.superficie"></b-form-input> -->
                                                                            <span>{{ data.item.superficie }}</span>
                                                                        </template>
                                                                    </b-table>
                                                                </b-col>
                                                                <b-col>
                                                                    <h6 style="border-top:2px solid green">Répartition des superficies par arrondissement</h6>
                                                                    <b-table selectable hover :items="itemsrepartition" :fields="fieldsrepartition" :tbody-tr-class="rowClass">
                                                                        <template #cell(arrondissement)="data">
                                                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.arrondissement"></b-form-input>
                                                                        </template>
                                                                        <template #cell(superficie)="data">
                                                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;"  v-model="data.item.superficie"></b-form-input>
                                                                        </template>
                                                                    </b-table>
                                                                </b-col>
                                                            </b-row>
                                                        </div>  
                                                    </div>
                                                    
                                                </b-tab>
                                            </b-tabs>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-tab>
                        <b-tab title="Localisation Forêt communale n° 0904720">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Répartition des superficies par arrondissement</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col cols="6">
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items2" :fields="fields2"
                                    >
                                        <template #cell(arrondissement)="data">
                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;" v-model="data.item.arrondissement"></b-form-input>
                                        </template>
                                        <template #cell(departement)="data">
                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;" v-model="data.item.departement"></b-form-input>
                                        </template>
                                        <template #cell(region)="data">
                                            <b-form-input disabled size="xs" class="w-75"  style="font-size:.75rem !important;font-weight: 300;" v-model="data.item.region"></b-form-input>
                                        </template>
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Détails  des essences interdites">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Liste des essences interdites</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items4" :fields="fields4"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Détails  des essences sous management">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Liste des essences sous aménagement</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items8" :fields="fields8"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Contrat de partenariat industriel">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Liste des contrats de partenariat</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items3" :fields="fields3"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des suspensions">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Suspension du titre n° 0904720</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items9" :fields="fields9"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des retraits">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Retrait du titre n° 0904720</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col cols="5">
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items5" :fields="fields5"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des abandons">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Abandon du titre n° 0904720</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col cols="7">
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items6" :fields="fields6"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des transferts">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Transfert du titre n° 0904720</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                        :items="items7" :fields="fields7"
                                    >
                                       
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des renouvellements">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Renouvellement du titre n° 0904720</h5>
                                <div class="pl-2 pt-1" style="border-top:2px solid green">
                                    <b-row>
                                        <b-col>
                                            <b-table selectable hover @row-selected="onRowSelected"
                                    > 
                                    </b-table>
                                        </b-col>
                                    </b-row>
                                </div>
                            </div>
                        </b-tab>
                        <button class="arrow-right" @click="scroll_right">
                            <b-icon-arrow-right/>
                        </button>
                    </b-tabs>
                </b-col>
            </b-row>
        </div>
</div>
</template>
<script>
    import  TabHead from '@/components/TabHead'
    export default{
        name:'foret_commun_cp',
        components:{
            TabHead
        },
        data(){
            return{
                fieldsrepartition:[
                    {key:'arrondissement',label:'Arrondissement',thStyle:{color:'green'}},
                    {key:'superficie',label:'Superficie',thStyle:{color:'green'}},
                ],
                fieldsparcelles:[
                    {key:'numparcelle',label:'Parcelle n°',thStyle:{color:'green'}},
                    {key:'limites',label:'limites',thStyle:{color:'green'}},
                    {key:'materialisation',label:'Matérialisation',thStyle:{color:'green'}},
                    {key:'superficie',label:'Superficie',thStyle:{color:'green'}},
                ],
                fields2:[
                    {key:'arrondissement',label:'Arrondissement',thStyle:{color:'green'}},
                    {key:'departement',label:'Département',thStyle:{color:'green'}},
                    {key:'region',label:'Région',thStyle:{color:'green'}},
                ],
                fields3:[
                    {key:'raisonsociale',label:'Raison sociale',thStyle:{color:'green'}},
                    {key:'sigle',label:'Sigle',thStyle:{color:'green'}},
                    {key:'numcontrat',label:'Contrat n°',thStyle:{color:'green'}},
                    {key:'datecontrat',label:'Date du contrat',thStyle:{color:'green'}},
                    {key:'numacteapprobation',label:'Acte approbation n°',thStyle:{color:'green'}},
                    {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields5:[
                    {key:'numretrait',label:'N° du retrait',thStyle:{color:'green'}},
                    {key:'dateacteretrait',label:'date de l\'acte de retrait',thStyle:{color:'green'}},
                    {key:'motif',label:'motif',thStyle:{color:'green'}},
                    // {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                    // {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields4:[
                    {key:'nomcommercial',label:'Nom commercial',thStyle:{color:'green'}},
                    // {key:'nomcommercial',label:'Nom commercial',thStyle:{color:'green'}},
                    // {key:'dateactesuspension',label:'date de l\'acte de suspension',thStyle:{color:'green'}},
                    // {key:'motif',label:'motif',thStyle:{color:'green'}},
                    // {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                    // {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields8:[
                    {key:'nomcommercial',label:'Nom commercial',thStyle:{color:'green'}},
                    {key:'diametre',label:'Diametre',thStyle:{color:'green'}},
                    // {key:'dateactesuspension',label:'date de l\'acte de suspension',thStyle:{color:'green'}},
                    // {key:'motif',label:'motif',thStyle:{color:'green'}},
                    // {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                    // {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields6:[
                    {key:'numabandon',label:'N° abandon',thStyle:{color:'green',width:'50%'}},
                    {key:'datenotificationabandon',label:'date de notification d\'abandon',thStyle:{color:'green'}},
                    {key:'motif',label:'motif',thStyle:{color:'green'}},
                    {key:'redevance',label:'redevance abandon',thStyle:{color:'green'}},
                    // {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields7:[
                    {key:'numtransfett',label:'N° du transfert ',thStyle:{color:'green'}},
                    {key:'datenotificationtransfert',label:'date de notification de transfert',thStyle:{color:'green'}},
                    {key:'motif',label:'motif',thStyle:{color:'green'}},
                    {key:'montant',label:'montance de la quittance',thStyle:{color:'green'}},
                    {key:'datevente',label:'date vente',thStyle:{color:'green'}},
                    {key:'taxe',label:'Taxe de transfert',thStyle:{color:'green'}},
                    {key:'numquittance',label:'N° de la quittance',thStyle:{color:'green'}},
                    {key:'datequittance',label:'Date de la quittance',thStyle:{color:'green'}},
                    {key:'cedeur',label:'Cédeur',thStyle:{color:'green'}},
                    {key:'acquereur',label:'Acquéreur',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fieldsufe:[
                    {key:'numufe',label:'UFE n°',thStyle:{color:'green'}},
                    {key:'anneeouverture',label:'Année d\'ouverture',thStyle:{color:'green'}},
                    {key:'derniereannee',label:'Dernirèe année',thStyle:{color:'green'}},
                    {key:'limites3',label:'Limites',thStyle:{color:'green'}},
                    {key:'approbation',label:'Approbation plan gestion quinq.',thStyle:{color:'green'}},
                    {key:'parcellaire',label:'Parcellaire du bloc d\'aménagement',thStyle:{color:'green'}},
                    {key:'plangestion',label:'Plan de gestion quinquennal',thStyle:{color:'green'}},
                    {key:'superifice',label:'Superficie',thStyle:{color:'green'}},
                    // {key:'cedeur',label:'Cédeur',thStyle:{color:'green'}},
                    // {key:'acquereur',label:'Acquéreur',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields9:[
                    {key:'numsuspension',label:'N° de la suspension',thStyle:{color:'green'}},
                    {key:'dateactesuspension',label:'date de l\'acte de suspension',thStyle:{color:'green'}},
                    {key:'motif',label:'motif',thStyle:{color:'green'}},
                    {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                    {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                elements:[],
                json:{
                    data:[
                        {
                            arrondissement:'MBAM',
                            departement:'VALLEE DU NTEM',
                            region:'SUD',
                            numparcelle:1,
                            superficie:200,
                            limites:'limites.jpg',
                            materialisation:'materialisation.pdf'
                        },
                    ]
                }
            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'foret_communale' })
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
            scroll_left() {
                let content = document.querySelector("#tabs__BV_tab_controls_");
                content.scrollLeft -= 200;
                console.log("=========================");
                console.log($('#tabs__BV_tab_controls_').css('width'));
                console.log("=========================");
            },
            scroll_right() {
            let content = document.querySelector("#tabs__BV_tab_controls_");
            content.scrollLeft += 200;
            },
        },
        computed:{
            itemsrepartition(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })
            },
            itemsparcelles(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items2(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items3(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items4(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items5(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items6(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items7(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items8(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            itemsufe(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
            items9(){
                return this.elements.map((a, index) => {
                    a.isFirst = index == 0;
                    a.isEven = index % 2 == 0;
                    return a;
            })},
        },
        mounted(){
            this.elements=this.json.data
            $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
            window.addEventListener('resize', () => {
                 $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
            })
        }
    }
</script>
<style>
.foret_commun_cp{
    font-size: .8rem;
}
    
    .label-form{
        margin-top:7px;
        display: inline-block;  
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