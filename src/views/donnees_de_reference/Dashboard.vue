<template>
  <div id="cover">
      <div class="container">
        <div class="row mt-5">
          <div class="col">
            <h1 class="text-center">évolution des entités</h1>
          </div>
        </div>
        <div class="row mt-5" v-if="arrPositive.length > 0">
          <div class="col">
            <h2 class="text-center"></h2>
            <line-chart
              :chartData="arrPositive"
              :options="chartOptions"
              :chartColors="positiveChartColors"
              label="Nombre d'entitées crées"
            />
          </div>
        </div>
      </div>
</div>
  
</template>

<script>
import moment from "moment";

import LineChart from "@/components/charts/NewLineChart.vue";


export default {
  components: {
    LineChart
  },
  data() {
    return {
      arrPositive: [],
      positiveChartColors: {
        borderColor: "#077187",
        pointBorderColor: "#0E1428",
        pointBackgroundColor: "#AFD6AC",
        backgroundColor: "#74A57F"
      },
     
      
     
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  beforeMount() {
      this.getStats()
    },
  methods: {

    async getStats() {
        await this.getEntitesEvolution()
    },
    async getEntitesEvolution(){
      const data = await this.$donneesReference.get("entites/evolution").then(response => response.data.result);;
      data.forEach(d => {
        const date = moment(d.PERIODE, "MM-YYYY").format("MM/YYYY");
        const {
          positive,
        } = d;
        this.arrPositive.push({ date, total: d.NBR});
        
      });
    },
},
  /*async created() {
    const data = await this.$donneesReference.get("entites/evolution").then(response => response.data.result);;
    data.forEach(d => {
      const date = moment(d.PERIODE, "MM-YYYY").format("MM/YYYY");
      const {
        positive,
      } = d;
      this.arrPositive.push({ date, total: d.NBR});
      
    });
  }*/
};
</script>
<style scoped>
  #cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}
</style>