<template>
    <div id="cover" class="min-vh-100">
        <b-overlay :show="showOverlay" rounded="sm">
          <div>
        <b-row>
        
          <b-col>
            <h4 class="tab-header-left-text">
              <button id="toggleSideBar">
                <span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span
                class="ml-1 font-weight-bold"
              >consultation Profil de  type MINFOF</span>
            </h4>
          </b-col>
          <b-col class="col-md-auto">
            <span>
              <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
              </a>
            </span>
          </b-col>
          <div class="mx-4 w-100" style="border: 2px solid #82C138;"></div>
        </b-row>
      </div>
      <div>
        <multilevel-accordion :tree="tree" :marginLeft="2">
          <template slot-scope="{ tree }">
            <div @click="select(tree.text)">
              <p>{{ tree.text }}</p>
            </div>
          </template>
        </multilevel-accordion>
      </div>
        </b-overlay>

           
              
 

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  import MultilevelAccordion from "vue-multilevel-accordion";
  import tree from "./tree.js";

export default {
  name: "details-types-profils",
  components:{
    MultilevelAccordion
  },
  data: () => ({
    tree
  }),
   computed:{

   },
 
    methods: {
      fermer() {this.$router.push({ name: "types-profils" });},
      select(value){
        console.log('value', value);
      }

    },
 

    async mounted(){

    }
  }

</script>
<style scoped>

</style>