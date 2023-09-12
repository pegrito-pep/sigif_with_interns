<template>
    <div class="for_commun_cp">
        <tab-head :fermer="fermer" title="ARB"></tab-head>
        <b-row class="p-1 mb-1" style="border-bottom:3px solid green">
                <b-col cols="6">
                    <b-form-group class="p-0 m-0"
                        label="Type de titre"
                        label-cols="4"
                        label-align="right"
                    >
                        <select disabled style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 1px) !important;">
                            <option value="ccp">Catalogue du PEBO n°</option>
                        </select>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label-cols="4"
                        label-align="right"
                    >
                    <template #label>
                      <span style="color:red">*</span><span>Catalogue du PEBO n°</span>
                    </template>
                        <label class="label-form">CEVPB</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Entité forestière"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form">EEP SARL</label>
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                        label="Marteau"
                        label-cols="4"
                        label-align="right"
                    >
                        <label class="label-form">EEP</label>
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
                        <b-tab title="Permis de bois d'oeuvere n° 0904720">
                            <div class="ml-1 pl-3" style="border:1px solid grey">
                                <b-row>
                                    <b-col cols="4">
                                        <b-form-group class="p-0 m-0"
                                            label="Acte d'attribution n°"
                                            label-cols="8"
                                        >
                                            <label class="label-form">098</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Fin de validité"
                                            label-cols="7"
                                        >
                                            <label class="label-form">26/12/2021</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Montant de la vente"
                                            label-cols="7"
                                        >
                                            <label class="label-form">5 010 600</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Notification n°"
                                            label-cols="7"
                                        >
                                            <label class="label-form">2</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Acte d'attribution"
                                            label-cols="6"
                                        >
                                            <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;">
                                                <span style="font-style: italic;">attribution.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                            </div>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Acte de notification"
                                            label-cols="6"
                                        >
                                            <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;">
                                                <span style="font-style: italic;">notification.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                            </div>
                                        </b-form-group>
                                    </b-col>
                                    <b-col cols="4">
                                        <b-form-group class="p-0 m-0"
                                            label="Date d'attribution"
                                            label-cols="8"
                                        >
                                            <label class="label-form">01/01/2022</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Quittance n°"
                                            label-cols="8"
                                        >
                                            <label class="label-form">01/01/2022</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Date quittance"
                                            label-cols="8"
                                        >
                                            <label class="label-form">01/01/2022</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Date notification"
                                            label-cols="8"
                                        >
                                            <label class="label-form">01/01/2022</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Quittance"
                                            label-cols="5"
                                        >
                                            <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;">
                                                <span style="font-style: italic;">quittance.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                            </div>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Rapport inventaire"
                                            label-cols="8"
                                        >
                                            <label class="label-form">1</label>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </div>
                        </b-tab>
                        <b-tab title="Liste des suspensions">
                            <div class="p-3 mx-1" style="border:1px solid grey">
                                <h5>Suspension du titre n° 0904720</h5>
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
                    {key:'numsuspension',label:'N° de la suspension',thStyle:{color:'green'}},
                    {key:'dateactesuspension',label:'date de l\'acte de suspension',thStyle:{color:'green'}},
                    {key:'motif',label:'motif',thStyle:{color:'green'}},
                    {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                    {key:'datefinsuspension',label:'Date fin de suspension',thStyle:{color:'green'}},
                    // {key:'dateacteapprobation',label:'Date acte approbation',thStyle:{color:'green'}},
                ],
                fields6:[
                    {key:'numabandon',label:'N° abandon',thStyle:{color:'green'}},
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
                this.$router.push({name: 'permis_de_bois_d_oeuvre'})
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
            }
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
        },
        mounted(){
            this.elements=this.json.data
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