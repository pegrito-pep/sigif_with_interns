<template>
    <div class="for_commun_cp">
        <b-overlay rounded="sm" :show="showOverlay">
            <tab-head :fermer="fermer" title="Vente de coupe"></tab-head>
            <b-row class="p-1 mb-1" style="border-bottom:3px solid green">
                    <b-col cols="6">
                        <b-form-group class="p-0 m-0"
                            label="Type de titre"
                            label-cols="4"
                            label-align="right"
                        >
                            <select class="mt-2" disabled style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 1px) !important;">
                                <option value="ccp" v-if="titreDetails!==null">{{ titreDetails.libelletypetitre }}</option>
                            </select>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label="Vente de coupe n° "
                            label-cols="4"
                            label-align="right"
                        >
                            <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.numtitre }}</label>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label="Entité forestière"
                            label-cols="4"
                            label-align="right"
                        >
                            <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.entite }}</label>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label="Marteau"
                            label-cols="4"
                            label-align="right"
                        >
                            <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.marteau }}</label>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group
                            label="Superficie totale(ha)"
                            label-cols="5"
                            label-align="right"
                        >
                            <!-- <b-form-input value="20 000" disabled class="form-control-xs bg-white"></b-form-input> -->
                            <label class="label-form"  v-if="titreDetails!==null">{{ titreDetails.superficie }}</label>
                        </b-form-group>
                    </b-col>
            </b-row>
            <div class="ml-3">
                <b-row class="wrap" ref="wrap">
                    <b-tabs id="tabs" class="w-100" >
                            <button class="arrow-left" @click="scroll_left">
                                <b-icon-arrow-left/>
                              </button>
                              <b-tab @click.prevent="section = 'initialtab'">
                                <template #title>
                                    <span>Vente de coupe n° {{ titreDetails.numtitre }}</span>
                                </template>
                                <div class="ml-1 pl-3" style="border:1px solid grey">
                                    <b-row>
                                        <b-col cols="4">
                                            <!--<b-form-group class="p-0 m-0"
                                                label="Acte d'attribution n°"
                                                label-cols="7"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null&&titreDetails.acteattribution!==null">{{ titreDetails.acteattribution }}</label>
                                                <label class="label-form" v-else>non défini</label>
                                            </b-form-group>-->
                                            <b-form-group class="p-0 m-0"
                                                label="Date Fin de validité"
                                                label-cols="6"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null">{{ $dayjs(titreDetails.datevalidite).format("DD/MM/YYYY") }}</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Offre financière"
                                                label-cols="6"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null">{{ titreDetails.offrefinanciere }}</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Notification n°"
                                                label-cols="6"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null">{{ titreDetails.numnotification }}</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Acte d'attribution"
                                                label-cols="6"
                                            >
                                                <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;" v-if="titreDetails!==null&&titreDetails.acteattribution!=null">
                                                    <span style="font-style: italic;">{{ titreDetails.acteattribution }}</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                    <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                                </div>
                                                <span v-else>Non défini</span>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Acte de notification"
                                                label-cols="6"
                                            >
                                                <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;" v-if="titreDetails!==null&&titreDetails.actenotification!=null">
                                                    <span style="font-style: italic;">{{ titreDetails.actenotification }}</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                    <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                                </div>
                                                <span v-else>Non défini</span>
                                            </b-form-group>
                                        </b-col>
                                        <b-col cols="4">
                                            <b-form-group class="p-0 m-0"
                                                label="Date d'attribution"
                                                label-cols="5"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null&&titreDetails.dateattribution!=null">{{ $dayjs(titreDetails.dateattribution).format("DD/MM/YYYY") }}</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0" label="Caution n°" label-cols="5">
                                                <label class="label-form" v-if="titreDetails!==null&&titreDetails.numcaution!==null">{{ titreDetails.numcaution }}</label>
                                                <label class="label-form" v-else>non défini</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Date caution"
                                                label-cols="5"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null&&titreDetails.datecaution!==null">{{ $dayjs(titreDetails.datecaution).format("DD/MM/YYYY") }}</label>
                                                <label class="label-form" v-else>non défini</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Date notification"
                                                label-cols="5"
                                            >
                                                <label class="label-form" v-if="titreDetails!==null&&titreDetails.datenotifcaution!==null">{{ $dayjs(titreDetails.datenotifcaution).format("DD/MM/YYYY") }}</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Caution"
                                                label-cols="5"
                                            >
                                                <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;" v-if="titreDetails!==null&&titreDetails.dateattribution!=null">
                                                    <span style="font-style: italic;">caution.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                    <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                                </div>
                                                <label class="label-form" v-else>non défini</label>
                                            </b-form-group>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-tab>
                            <b-tab @click.prevent="section = 'localisation'">
                                <template #title>
                                    <span>Localisation vente de coupe n° {{ titreDetails.numtitre }}</span>
                                </template>
                                <div class="p-3 mx-1" style="border:1px solid grey">
                                    <h5>Répartition des superficies par arrondissement</h5>
                                    <div class="pl-2 pt-1" style="border-top:2px solid green">
                                        <b-row>
                                            <b-col cols="7">
                                                <b-table selectable hover @row-selected="onRowSelected" :items="items2" :fields="fields2" :busy="isBusy" ref="selectableTable">
                                                    <template #table-busy>
                                                        <div class="text-center text-success my-2">
                                                          <b-spinner class="align-middle"></b-spinner>
                                                          <strong class="ml-1">chargement...</strong>
                                                        </div>
                                                      </template>
                                                    <template #cell(arrondissement)="data">
                                                        <b-form-input disabled size="xs" class="w-75 mx-1 px-1"  style="font-size:.75rem !important;font-weight: 300;background-color:white!important;border:1px solid white" v-model="data.item.arrondissement"></b-form-input>
                                                    </template>
                                                    <template #cell(departement)="data">
                                                        <b-form-input disabled size="xs" class="w-75 change_bg"  style="font-size:.75rem !important;font-weight: 300;border:1px solid white" v-model="data.item.departement"></b-form-input>
                                                    </template>
                                                    <template #cell(region)="data">
                                                        <b-form-input disabled size="xs" class="w-75 change_bg"  style="font-size:.75rem !important;font-weight: 300;border:1px solid white" v-model="data.item.region"></b-form-input>
                                                    </template>
                                                    <template #cell(superficie)>
                                                        <input disabled class="w-75 form-control change_bg form-control-xs "  style="font-size:.75rem !important;font-weight: 800;color:white;" v-model="titreDetails.superficie" />
                                                    </template>
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
                               
                              <button class="arrow-right" @click="scroll_right">
                                <b-icon-arrow-right/>
                              </button>

                            
                    </b-tabs>
                </b-row>
            </div>
        </b-overlay>
    </div>
</template>
<script>
    import  TabHead from '@/components/TabHead'
    export default{
        name:'vente_de_coupe_details',
        components:{
            TabHead
        },
        data(){
            return{
                section: 'initialtab',
                isBusy:false,
                showOverlay:false,
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
                    {key:'arrondissement',label:'Arrondissement'},
                    {key:'departement',label:'Département', thStyle: { width: "33.33%"}},
                    {key:'region',label:'Région'},
                    {key:'superficie',label:'Superficie'},
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
        
                titreDetails:null
            }
        },
        watch: {
            section(value) {
                if (value == 'initialtab') {
                    this.getInitialData()
                }
                if (value == 'localisation') {
                    console.log('entrée tab localisation');
                    this.getLocalisation()
                }
                
            },
            items2(value){
                if(value.length>0){
                    setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
                }
            }

        },
        methods:{
            fermer(){
                this.$router.back();
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
            async getInitialData() {
                this.showOverlay = true
                this.titreDetails = await this.$titres.get('titres/vente_de_coupe/' +this.$route.params.id).then(response => response.data.result)
                this.showOverlay = false
            },
            async getLocalisation(){
                this.isBusy=true;
                this.elements = await this.$titres.get('titres/vente_de_coupe/' +this.$route.params.id+'/localisation').then(response => response.data.result.Items)
                this.isBusy=false
            },
            scroll_left() {
                let content = document.querySelector("#tabs__BV_tab_controls_");
                console.log(content)
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
        },
        mounted() {
            $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
            window.addEventListener('resize', () => {
            $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
            })
        },
        beforeMount() {
            this.getInitialData();
        }
    }
</script>
<style>
.change_bg{
    background:#82C138!important;
  }
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
/* style des tabs */


.wrap {
    overflow: hidden;
    width: 100%;
    flex-direction: row;
    padding: 0 !important;
  }
  .tabs {
    position: relative;
  }
  
  </style>
  <style>
  
  #tabs__BV_tab_controls_{
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    padding: 0!important;
  }
  .contents {
    padding: 40px 20px;
  }
  
  .arrow-left{
    position: absolute;
    top: 10px;
    left: -5px;
  }
  
  .arrow-right{
    position: absolute;
    top: 10px;
    right: -5px;
  }
  
  .arrow-left, .arrow-right {
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 50%;
    background-color: rgb(0, 82, 44)!important;
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