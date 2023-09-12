<template>
 <div id="cover">
    <div>
        <b-row>
               
            <b-col lg="6" sm="12">
                <div class="card mr-1">
                    <div class="card-header">
                        <div class="small-box" style="background-color: #65A41C; color:white">
                            <div>
                                <b-row class="d-flex justify-content-center align-items-center">
                        <b-col>
                            <div class="mx-2 my-2"><h3>Organisation</h3></div>
                        </b-col>
                        <b-col>
                            <div class="mx-2 my-2  d-flex justify-content-end align-items-end"> 
                                <select  v-model="entite.libelle" :disabled="disabled"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                                        <option selected="selected" class="font-weight-bold">{{ entite.libelle }}</option>
                                </select>
                            </div>
                        </b-col>
                     </b-row>
                            </div>
                            <b-table-simple class="m-0 p-0" hover small responsive >
                                <b-tbody >
                                    <b-tr style="font-size: 1.5rem">
                                        <b-th class="border m-0 text-center p-0">codes barres générés</b-th>
                                        <b-th class="border m-0 text-center p-0">lots de codes barres crées</b-th>            
                                    </b-tr>
                                    <!--<b-tr><td colspan="5">&nbsp;</td></b-tr>-->
                                    <b-tr style="font-size: 4rem">
                                        <b-td class="border py-0">
                                            <span class="d-inline-block w-100 font-weight-bold text-center bg-success">20 000</span>    
                                        </b-td>
                                        <b-td class="border py-0 px-2  bg-danger">
                                            <span class="d-inline-block w-100 font-weight-bold text-center">261</span>
                                        </b-td>
                                    </b-tr>
                                </b-tbody>
                            </b-table-simple>
                        </div>
                        
                    </div>
                    
                    <!-- /.card-header -->
                    <div class="card-body p-0">
                        
                    <div class="card m-0">
              <div class="card-header border-transparent d-flex justify-content-center align-items-center">
                <h3 class="card-title ">derniers lots de codes bares générés par l'organisation</h3>

             </div>
              <!-- /.card-header -->
              <div class="card-body p-0" style="display: block;">
                <div class="table-responsive">
                  <table class="table m-0">
                    <thead>
                    <tr>
                      <th>Code barre</th>
                      <th>Reférrence</th>
                      <th>Usage</th>
                      <th>Statut</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4BFHGC</a></td>
                      <td>2475-00660</td>
                      <td><span class="badge badge-success">Inventaire</span></td>
                      <td>
                        <div class="sparkbar" data-color="#00a65a" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4MD198</a></td>
                      <td>2475-00662</td>
                      <td><span class="badge badge-warning">Grume</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f39c12" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4HQSYG</a></td>
                      <td>2475-00663</td>
                      <td><span class="badge badge-danger">Lettre de voiture</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f56954" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4B8GSY</a></td>
                      <td>2475-00664</td>
                      <td><span class="badge badge-info">Grume-abbattage</span></td>
                      <td>
                        <div class="sparkbar" data-color="#00c0ef" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4PBVQ2</a></td>
                      <td>2475-01144</td>
                      <td><span class="badge badge-warning">Grume</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f39c12" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4MD819</a></td>
                      <td>2475-00564</td>
                      <td><span class="badge badge-danger">Lettre de voiture</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f56954" data-height="20">utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4MD784</a></td>
                      <td>2475-125464</td>
                      <td><span class="badge badge-success">inventaire</span></td>
                      <td>
                        <div class="sparkbar" data-color="#00a65a" data-height="20">utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4BFHGC</a></td>
                      <td>2475-00660</td>
                      <td><span class="badge badge-success">Inventaire</span></td>
                      <td>
                        <div class="sparkbar" data-color="#00a65a" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4MD198</a></td>
                      <td>2475-00662</td>
                      <td><span class="badge badge-warning">Grume</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f39c12" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    <tr>
                      <td><a href="pages/examples/invoice.html">6H4HQSYG</a></td>
                      <td>2475-00663</td>
                      <td><span class="badge badge-danger">Lettre de voiture</span></td>
                      <td>
                        <div class="sparkbar" data-color="#f56954" data-height="20">non utilisé</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!-- /.table-responsive -->
              </div>
              <!-- /.card-body -->
              <div class="card-footer clearfix" style="display: block;">
                <a href="javascript:void(0)" class="btn btn-sm btn-success float-left">Créer un lot</a>
                <a href="javascript:void(0)" class="btn btn-sm btn-secondary float-right">Consulter tous les lots</a>
              </div>
              <!-- /.card-footer -->
            </div>
                    
                    </div>

            </div>
            </b-col>
            <b-col lg="6" sm="12">
                <div class="card ml-1">
                    <div class="card-header d-flex justify-content-between">
                        <h3>Repartition des codes barres par statut</h3>
                        <div class="d-flex ">
                            <b-form-select class="form-control" size="sm" v-model="periode.mois" :options="mois" />
                            <b-form-select class="form-control" size="sm" v-model="periode.annee" :options="annees" />
                        </div>
                    </div>
                    <div class="card-body">
                        <b-overlay :show="chartDatas.recouvrement == null" rounded="sm">
                            <doughnut-chart v-if="chartDatas.recouvrement != null" :chart-data="chartDatas.recouvrement" />
                        </b-overlay>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-3">
         
            
            <b-col cols="12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between">
                        <h3>Liste des codes barres par usage</h3>
                        <!--<div class="d-flex ">
                            <b-form-select class="form-control" size="sm" v-model="annee" :options="annees" />
                        </div>-->
                    </div>
                    <div class="card-body">
                        <b-overlay :show="chartDatas.recouvrements == null" rounded="sm">
                            <bar-chart v-if="chartDatas.recouvrements != null" :chart-data="chartDatas.recouvrements" :options="{
                                legend: {
                                 display: false
                                },
                                tooltips: {
                                    callbacks: {
                                        label: function(tooltipItems, data) {
                                            return tooltipItems.yLabel + ' codes barres';
                                        }
                                    }
                                }}" 
                            />
                        </b-overlay>
                    </div>
                </div>
            </b-col>
     
        </b-row>
        <div class="container">
        <div class="row mt-5">
          <div class="col">
            <h1 class="text-center">évolution des codes barres</h1>
          </div>
        </div>
        <div class="row mt-5" v-if="arrPositive.length > 0">
          <div class="col">
            <h2 class="text-center"></h2>
            <line-chart
              :chartData="arrPositive"
              :options="chartOptions"
              :chartColors="positiveChartColors"
              label="Nombre de lots de code générés"
            />
          </div>
        </div>
      </div>
    </div>
    </div>

</template>

<script>
import LineChart from "@/components/charts/NewLineChart.vue";
import BarChart from '../../../components/charts/BarChart.vue'
import DoughnutChart from '../../../components/charts/DoughnutChart.vue'
import PieChart from '../../../components/charts/PieChart.vue'
const php = require('phpjs')
import moment from "moment";
const {mois:_mois, annees:_annees, periodeCourante:_periodeCourante} = require('../../../helpers/date')
  import { mapGetters } from 'vuex'
export default {
  components: { DoughnutChart, BarChart, PieChart, LineChart },
    name: 'Dashbord',
    data: () => ({
        disabled:false,
        entite:{
            id:1,
            libelle:''
        },
        utilises: 0,
        nonutilises: 0,
        bloques: 0,
        suspendus: 0,
        recetteMensuelle: 0,
        totalRecette: 0,
        totalDepense: 0,
        grosImpayer: [],
        dernieresRecettes: [],

        chartDatas: {
            logements: null,
            locataires: null,
            batiments: null,
            recouvrement: null,
            recouvrements: null,
        },
        periode: {annee: null, mois: null},
        annee: null,

        //elements line chart
        arrPositive: [],
        positiveChartColors: {
            borderColor: "#00FF00",
            pointBorderColor: "#000000",
            pointBackgroundColor: "#FFF",
            backgroundColor: "#74A57F"
        },
        chartOptions: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    watch: {
        periodeCourante(value, oldValue) {
            if (null != oldValue) {
                this.getStatsRecouvrements()
            }
        },
        annee(value, oldValue) {
            if (null != oldValue) {
                this.getStatsRecouvrementsAnnuel()
            }
        }
    },
    computed: {
        ...mapGetters(['user']),
        tauxOccupationLogement() {
            if (this.nbrLogement == 0) {
                return 0
            }
            return Math.floor((this.nbrLogementOccuper * 100) / this.nbrLogement)
        },
        tauxLocataireActif() {
            if (this.nbrLocataire == 0) {
                return 0
            }
            return Math.floor((this.nbrLocataireActif * 100) / this.nbrLocataire)
        },
        nbrLogementOccuper() {
            return this.nbrLogement - this.nbrLogementLibre
        },

        mois() {
            return _mois(this.periode.annee).map(elt => ({...elt, text: php.ucfirst(elt.text)}))
        },
        periodeCourante() {
            return _periodeCourante(this.periode)
        },
        annees: () => _annees(),
    },
    beforeMount() {
        this.annee = parseInt(this.$dayjs().format('YYYY'))
        this.periode = {
            mois: parseInt(this.$dayjs().format('M')) - 1,
            annee: this.annee
        }
        this.getStats()
    },
    methods: {

        async getStats() {
            await this.getStatsRecouvrements()
            await this.getStatsRecouvrementsAnnuel()
            await this.getCodeEvolution()
        },
        async getCodeEvolution(){
          const data = await this.$codesbarres.get("stats/evolution").then(response => response.data.result);;
          data.forEach(d => {
            const date = moment(d.PERIODE, "MM-YYYY").format("MM/YYYY");
            const {
              positive,
            } = d;
            this.arrPositive.push({ date, total: d.NBR});
            
          });
        },
        async getStatsLogements() {
            const result = await axios.get('stats/logements').then(response => response.result)

            this.nbrLogement = result.nbrLogement
            this.nbrLogementLibre = result.nbrLogementLibre   
            
            this.chartDatas.logements = {
                labels: ['Libres', 'Occupés'],
                datasets: [{
                    backgroundColor: ['rgba(237,28,36,0.6)', 'rgba(88,216,163,1)'],
                    data: [this.nbrLogementLibre, this.nbrLogementOccuper]
                }]
            }
        },
       
        async getStatsRecouvrements() {
            this.chartDatas.recouvrement = null   
            //const result = await axios.get('stats/recouvrements?periode='+this.periodeCourante).then(response => response.result)

            /*this.montantAttendu = result.montantAttendu
            this.montantPercu = result.montantPercu*/
            this.utilises = 21000
            this.nonutilises = 22500
            this.bloques = 991
            this.suspendus = 4500
            
            this.chartDatas.recouvrement = {
                 labels: ['Utilisés', 'Non Utilisés','Bloqués', 'Suspendus'],
                datasets: [{
                    backgroundColor: ['rgba(0,255,0,1.0)', 'rgba(0,0,0,0.4)', 'rgba(255,0,0,1.0)', 'rgba(0,0,0,1.0)'],
                    data: [this.utilises, this.nonutilises,this.bloques, this.suspendus]
                }]
            }
        },
        async getStatsRecouvrementsAnnuel() {
            this.chartDatas.recouvrements = null   
           // const result = await axios.get('stats/recouvrements-annuel?annee='+this.annee).then(response => response.result)

            this.chartDatas.recouvrements = {
              labels: [ "Inventaire", "Grumes", "Colis", "Grumes-Abbattage"],
              datasets: [
                {
                  label: '',
                  backgroundColor: ['rgba(237,28,36,0.6)','rgba(0,255,0,0.6)','rgba(237,28,36,1.0)','rgba(237,28,36,0.6)'],
                  pointBackgroundColor: 'white',
                  borderWidth: 1,
                  pointBorderColor: '#249EBF',
                  data: [500, 2500,1500,1000],
                      
                },
              ]
			      }
        },


        
 
    },
    mounted() {
        this.entite.libelle=this.user.profil.organisation
        if(this.entite.libelle!=="MINFOF"){
            this.disabled=true
        }
    },
}
</script>
<style scoped>
.action-btns{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 40px;
    opacity: 0;
    transition: .1s ease-in;
}
.annonce-item:hover .action-btns{
    opacity: 1;
}
.action-btns .barre{
    margin: 0 5px;
    height: 80%;
    width: 2px;
    background: #efefef;
}
.action-btns button{
    background: transparent;
    border: none;
}
.action-btns button i{
    font-size: .95rem;
    color: #5c5c5c;
}
 #cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}
</style>