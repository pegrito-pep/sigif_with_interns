<template>
    <div id="cover" class="min-vh-100">
      <b-overlay :show="showOverlay" rounded="sm">
          <div>
            <div>
              <b-row>
                <b-col><h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button><span class="ml-1 font-weight-bold">Consultation Valeur FOB n° {{ valeurFob.idvaleurfob }}</span></h4>
                    
                  </b-col>
                <b-col class="col-md-auto">
                  
                  <span>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138; cursor: pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                  </span>
                </b-col>
              </b-row>
            </div>
      <b-card class="b-card">
        <b-row>
          <b-col cols="4">
            <P> Arrete n°: <strong>{{ valeurFob.arreteFob }}</strong>
             <!--<b-badge pill variant="secondary">PF</b-badge> -->
            </P>
          </b-col>
          <b-col cols="3">
            <P> Date Signature: <strong>{{ $dayjs(valeurFob.datecrea).format("DD/MM/YYYY") }}</strong> </P>
          </b-col>
          <b-col cols="3">
            <p> Date effet <strong v-if="valeurFob.dateeffet!=null">{{ $dayjs(valeurFob.dateeffet).format("DD/MM/YYYY") }}</strong> </p>
          </b-col>

        </b-row>
        <b-row>
          <b-col cols="3" v-if="valeurFob&&valeurFob.refarrete!=null">
            <p> Fichier: 
              <a class="mx-1 detail-permis-item" v-if="valeurFob&&valeurFob.refarrete!=null" v-b-tooltip.hover title="consulter le fichier" target="_blank" :href="valeurFob.refarrete"><b-img src="@/assets/images/Attach_128x128.png"></b-img>arreté FOB</a>
            </p>
          </b-col>
        </b-row>
      </b-card>

    </div>
    <div>
      <div class="m-0 px-2 table-header-border">
          <b-row>
            <b-col><h4 class="tab-header-left-text"> Liste des valeurs FOB</h4></b-col>
          
          </b-row>
        </div>
        <!--implémentation tableau proprement dite-->
        <div class="ml-1">
            <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="tableDetailsValeursFob" selectable @row-selected="onRowSelected"
              :items="itemsVFob" 
              :fields="fieldsVFob" 
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template v-slot:head(essence)="data">
                  <span  v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(zone1)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(zone2)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(zone3)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(zone4)="data">
                  <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                </template>
                <template #empty>
                  <h4 style="color: green" class="text-center">
                    Aucune
                    <span class="font-weight-bold">donnée</span> trouvée!!
                  </h4>
                </template>
                <template #cell(essence)="data">
                    <input type="text" disabled v-model="data.item.essence" class="form-control-xs m-1" style="background:#fff; border: 1px solid white;color: black;width:98%;">
                </template> 
                <template #cell(zone1)="data">
                  <input type="text" v-model="data.item.zone1" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#fff; border: 1px solid white;color: black;width:98%;">
                </template>
                <template #cell(zone2)="data">
                  <input type="text" v-model="data.item.zone2" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#fff; border: 1px solid white;color: black;width:98%;">
                </template>
                <template #cell(zone3)="data">
                  <input type="text" v-model="data.item.zone3" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#fff; border: 1px solid white;color: black;width:98%;">
                </template>
                <template #cell(zone4)="data">
                  <input type="text" v-model="data.item.zone4" class="form-control-xs m-1 w-75 font-weight-bold" style="background:#fff; border: 1px solid white;color: black;width:98%;">
                </template>  
            </b-table>

            <!--AJOUT DE LA PAGINATION -->
            <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}"/>  
        </div>
    </div>  
    </b-overlay>
  </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import { mapGetters } from "vuex";

export default {
  name: "details_valeurs_fob",
  data: () => ({
    fieldsVFob:[
      { key: 'index', label: '' },
      { key: 'essence', label: 'Essence',thStyle:"width:50%" },
      { key: 'zone1', label: 'Zone 1' },
      { key: 'zone2', label: 'Zone 2' },
      { key: 'zone3', label: 'Zone 3' },
      { key: 'zone4', label: 'Zone 4' }
    ],
    elementsVFob:[
      {essence:"Oboto", zone1:48640, zone2:46230, zone3:44005, zone4:1},
      {essence:"Odou Sika", zone1:47600, zone2:45230, zone3:43100, zone4:1},
      {essence:"Okan", zone1:85235, zone2:81175, zone3:77115, zone4:1}
    ],
    offset: 0,
    perPage: 10,
    total: 3,
    currentPage: 1,
    isBusy:false,
    isRowselected:false,
    valeurFob:{},
  }),
  components:{
  },
  watch:{
    elementsVFob(value){
      if(!php.empty(value)){
        setTimeout(() => {this.$refs['tableDetailsValeursFob'].selectRow(0) }, 200);
      }
    },
  },
  computed:{
    ...mapGetters(['user','hasAccess']),
    itemsVFob(){
      return this.elementsVFob.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    }  
  },
 
 methods: {
  onRowSelected(items) {
    console.log('items ',items);
  },
  async displayError(error){
    this.$refs.opeparcDialogue._close();
      const ok = await this.$refs.errorDialogue.show({
        title: 'Information',
        message: error,
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
      } else {
        this.$refs.errorDialogue._close();
      }
  },
 
  rowClass(item, type) {
    if (item != "" && item != null) {
      if (item.isEven) return "table-row-other";
      if (!item || type !== "row") return "table-info";
    } else {
      return;
    }
  },
  getRequestParams(page, pageSize){
    let params= {
      page: 0,
      size: pageSize || 10
    };
    if(page && page > 0) {
      params.page= page -1
    }
    return params;
  },
  async getDetailsValeurFob() {
    this.showOverlay = true
    const params = this.getRequestParams(
      this.currentPage,
      this.pageSize
    );
    await this.$donneesReference.get('valeurs-fob/' +this.$route.params.id).then(response =>{
      console.log('response',response);
      this.valeurFob= response.data.result
      this.showOverlay = false

     /* this.total=response.data.result.totalItems
      this.currentPage=response.data.result.currentPage +1*/
    } )

    
  },


    fermer() {this.$router.back();},

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
    changePage(page) {
      this.currentPage = page;
      this.getDetailsEntreeParc();
    },

 
    async errorHappened(error) {
      const ok = await this.$refs.errorDialogue.show({
          title: 'Erreur survenue',
          message: error.message,
          okButton: 'Quitter',
      })
      //If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
          this.$refs.errorDialogue._close();
          this.$emit('closeForm')
      } else {
          this.$refs.errorDialogue._close();
          this.resetForm()
      }
    },
  
 },
 
  beforeMount() {
    this.getDetailsValeurFob();
  }
  }

</script>
<style scoped>
.detail-permis-item {
  color: #175131!important;
}

.detail-permis-item:hover{
  text-decoration: underline;
}
.simple-btn{
  color: rgb(130, 193, 56)!important;
}
.sigif-input-view{
  background:#82C138!important;
  border:1px solid white;
  font-size:0.75rem !important;
  font-weight: 300;
  height: calc(1em + .500rem + 1px) !important;
  border-radius: .2rem;
}
.simple-btn {
  background: none;
  border: none;
  color: black;
  font-weight: bold;
}

#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}






/*edti style par defaut btn-bootstrap au disable*/

</style>
<style>
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  .bgGreen{
    background-color:#82C138;
  }
  .bgWhite{
    background-color:#fff;
  }

</style>