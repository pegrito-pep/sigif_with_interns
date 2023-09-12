<template>
    <div>
      <div v-if="hasAccess">
        <b-link :to="lien" >
        <div class="module">
          <h4 class="titre">{{ title }}</h4>
          <div class="image">
              <img  alt="" :src="image"/> 
          </div>
        </div>

      </b-link>
      </div>
      <div v-else>
        <b-link to="modules">
          <div class="moduleNav">
            <h4 class="titreNav"></h4>
            <div class="image">
                <img  alt="" src=""/> 
            </div>
          </div>
        </b-link>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        image: String,
        title: String,
        lien: String,
        hasAccess:Boolean
    },
    computed: { 
      ...mapGetters(['user']),
      canAccessModule(){
       // console.log('acces',this.hasAccess);
        return true}
    },
    data() {
       return {

       } 
    },
    mounted() {
     // console.log('user', this.title);
    }
}
</script>

<style scoped>
.module{
  padding: 8px;
  margin: 10px;
  min-height: 120px;
  max-height: 120px;
  min-width: 180px;
  max-width: 180px;
  cursor: pointer;
  border-radius: 6px;
  background-color: #00522C;
  overflow: hidden;
  flex-grow: 1;
}
.module:hover{
    /* background-color: #cecece; */
    background-color: rgba(5, 156, 98, 0.89);
    /* background-color: #000; */
}
.titre{
  font-weight: 400;
  color:white;
  font-size: 13px;
}

.titre:hover{
    text-decoration: underline !important;
}

.module > .image{
  height: 140px;
  width: 140px;
  margin: 0 auto;
  margin-top: -30px;
}

.module > .image img{
  height: 100%;
  width: 100%;
}

.moduleNav{
  padding: 8px;
  margin: 10px;
  min-height: 120px;
  max-height: 120px;
  min-width: 180px;
  max-width: 180px;
  border-radius: 6px;
  cursor:pointer;
  background-color: #00522C;
  overflow: hidden;
  flex-grow: 1;
}

.titreNav{
  font-weight: 400;
  color:white;
  font-size: 13px;
}

.titreNav:hover{
    text-decoration: underline !important;
}

.moduleNav > .image{
  height: 140px;
  width: 140px;
  margin: 0 auto;
  margin-top: -30px;
}

@media screen and (max-width: 1200px) {
  .module{
    min-height: 100px;
    max-height: 100px;
    min-width: 160px;
    max-width: 160px;
  }
  .module > .image{
    height: 100px;
    width: 100px;
    margin-top: -20px;
  }

  
}

@media screen and (max-width: 1130px) {
  .module{
    min-height: 100px;
    max-height: 100px;
    min-width: 160px;
    max-width: 160px;
  }
  .module > .image{
    height: 100px;
    width: 100px;
    margin-top: -20px;
  }
  
}


@media screen and (max-width: 935px) {
  .module{
    min-height: 100px;
    max-height: 100px;
    min-width: 120px;
    max-width: 120px;
  }
  .module > .image{
    height: 60px;
    width: 60px;
    margin-top: 0px;
  }
  .titre{
    font-size: 10px;
  }
  
}

@media screen and (max-width: 580px) {
  .module{
    min-height: 85px;
    max-height: 85px;
    min-width: 100px;
    max-width: 100px;
  }
  .module > .image{
    height: 50px;
    width: 50px;
    margin-top: 0px;
  }
}
</style>



