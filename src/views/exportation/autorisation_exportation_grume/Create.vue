<template>
    <div id="cover" class="min-vh-100">
        <b-overlay rounded="sm" :show="showOverlay">
            <template #overlay>
                <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p id="cancel-label">Chargement...</p>
                </div>
            </template>
            <b-row class="ml-2" style="border-bottom:2px solid green">
                <b-col class="pb-1 m-1">
                    <h4 class="tab-header-left-text">
                        <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
                        <span class="form_title">Création autorisation export grume</span>
                    </h4>
                </b-col>
                <b-col class="col-md-auto">
                    <span class="d-flex justify-content-between">
                        <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                        <a v-else @click.prevent="enregistrer" :disabled="submitted"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                        <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                    </span>
                </b-col>
            </b-row>
            <div>
                <b-row>
                    <b-col cols="7">
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">Raison sociale</span>
                            </b-col>
                            <b-col cols="7">
                                <v-select :options="paginated" :filterable="false" @search="onSearch"
                          style="width:100%"
                          class="custom-select-type_titre" @open="getEntities" label="intitule" v-model="entite"
                        >
                          <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPage" @click="offsetEntities-=limit">Prev</button>
                            <button :disabled="!hasNextPage" @click="offsetEntities+=limit">Next</button>
                          </li>
                        </v-select>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">Ref. Usine</span>
                            </b-col>
                            <b-col cols="5">
                                <input type="text" class="default-old-system-select-properties" style="width:100%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">Date de signature</span>
                            </b-col>
                            <b-col cols="5">
                                <input type="date" placeholder="dd/mm/yyyy" class="default-old-system-select-properties" style="width:60%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">Exercice</span>
                            </b-col>
                            <b-col cols="5">
                                <select  class="default-old-system-select-properties" style="width:60%">
                                    <option></option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                </select>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">N° autorisation</span>
                            </b-col>
                            <b-col cols="5">
                                <input type="text" class="default-old-system-select-properties" style="width:100%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="5">
                                <span  style="color: #333333; display: flex; justify-content: end;">Attacher certificat</span>
                            </b-col>
                            <b-col cols="5">
                                <div class="upload-container">
                                    <label>
                                      <input type="file" @change="selectAttacheCertificatFile"/>
                                      <b-img src="@/assets/images/download.png"></b-img>
                                      
                                      <span v-if="filecertificat" class="file-name">{{ filecertificat.name }}</span>
                                      <span v-else class="title">cliquer pour choisir</span>
                                    </label>
                                </div>
                                <!--<input type="file" class="default-old-system-select-properties" style="width:150%"/>-->
                            </b-col>
                        </b-row>
                        <b-row>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
            <div class="px-2">
                  <b-row style="border-bottom:1px solid green">
                      <b-col cols="3"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Volumes autorisés par essence</h4></b-col>
                      <b-col class="liens">
                        <a style="cursor: pointer" @click.prevent="ajouterProduit" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a style="cursor: pointer" @click.prevent=""  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                        <a style="cursor: pointer" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                      </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="8">
                        <b-overlay rounde="sm" :show="showOverlayEssences">
                            <b-table
                                :items="items"
                                :fields="fields"
                                :tbody-tr-class="rowClass"
                                @row-selected="onRowSelected"
                                selectable
                                ref="selectableTable"
                            >
                            <template #table-busy>
                                <div class="text-center text-success my-2">
                                    <b-spinner class="align-middle"></b-spinner>
                                    <strong class="ml-1">chargement...</strong>
                                </div>
                            </template>
                            <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>


                            
                            <template #cell(nomcommercial)="data">
                                <v-select @input="setNomScientifique(data.item.nomcommercial,data.index)" v-model="data.item.nomcommercial" :options="paginatedEssences" :filterable="false" @search="onSearchEssence" label="NOMUSUEL" class="sigif-input-view-select custom-select-type_titre">
                                    <template #option="{ NOMUSUEL,NOMSCIENTIFIQUE }">
                                      <span class="font-weight-bold">{{ NOMUSUEL }}</span><span> - {{ NOMSCIENTIFIQUE }}</span>         
                                    </template>
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPageEssences" @click="offsetessences -= limitessences">Prèc.</button>
                                        <button :disabled="!hasNextPageEssences" @click="offsetessences += limitessences">Suiv.</button>
                                    </li>
                                  </v-select>
                            </template>
                            <template #cell(nomscientifique)="data">
                                <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.nomscientifique"/>
                            </template>
                            <template #cell(volumeautorise)="data">
                                <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volumeautorise"/>
                            </template>
                            <template #cell(volumecumule)="data">
                                <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:white!important" v-model="data.item.volumecumule"/>
                            </template>
                            <template #cell(action)>
                                <b-button size="sm" class="d-flex justify-content-center"  title="enlever" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                            </template>
                            </b-table>
                        </b-overlay>
                    </b-col>
                  </b-row>
            </div>
        </b-overlay>
    </div>
</template>
<script>
  const php  = require ( 'phpjs' ) ;

export default{
    data(){
        return{
            showOverlay:false,
            showOverlayEssences:false,
            submitted:false,
            filecertificat:null,
            form:{
                entite:''
            },
            fields:[
                    {key:'index',label:'',thStyle:{color:'green',width:'3%'}},
                    {key:'nomcommercial',label:'Nom commercial',thStyle:{color:'green',width:'35%'}},
                    {key:'nomscientifique',label:'Nom scientifique',thStyle:{color:'green'}},
                    {key:'volumeautorise',label:'Volume autorisé',thStyle:{color:'green',width:'15%'}},
                    {key:'volumecumule',label:'Volume cumulé',thStyle:{color:'green',width:'15%'}},
            ],
            elements:[],
            offsetentite:0,
            limitentite:10,
            entiteswithoutminfof:[],
            searchentite:'',

            essences:[],
            offsetessences:0,
            limitessences:10,
            searchessence:'',
            // entités forestières
            entite:'',
            search:'',
            offsetEntities:0,
            limit:10,
            entitiesWithoutMinfof:[],
            showOverlay:false,
        }
    },
    computed:{
        items(){
            return this.elements.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            });
        },
        filtered() {
      return this.entitiesWithoutMinfof?.filter((entity) =>
      entity.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase())
      )
    },
    paginated(){
      return this.filtered?.slice(this.offsetEntities, this.limit + this.offsetEntities)
    },
    hasNextPage() {
      const nextOffset = this.offsetEntities + this.limit
      return Boolean(
        this.filtered?.slice(nextOffset, this.limit + nextOffset).length
      )
    },
    hasPrevPage() {
      const prevOffset = this.offsetEntities - this.limit
      return Boolean(
        this.filtered?.slice(prevOffset, this.limit + prevOffset).length
      )
    },


        filteredEssences() {
          return this.essences.filter((essence) =>
          essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessence.toLocaleLowerCase())
          )
        },
        paginatedEssences() {
          return this.filteredEssences.slice(this.offsetessences, this.limitessences + this.offsetessences)
        },
        hasNextPageEssences() {
          const nextOffset = this.offsetessences + this.limitessences
          return Boolean(
            this.filteredEssences.slice(nextOffset, this.limitessences + nextOffset).length
          )
        },
        hasPrevPageEssences() {   
          const prevOffset = this.offsetessences - this.limitessences
          return Boolean(
            this.filteredEssences.slice(prevOffset, this.limitessences + prevOffset).length
          )
        },
    },
    watch:{
    elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    }
  },
    methods:{
        setNomScientifique(value, index){
            console.log('value',value);
            this.elements[index].nomscientifique =value.NOMSCIENTIFIQUE
        },
        toggleSideBar(){
            var sidebar = document.querySelector('#sidebar');
            var administration = document.querySelector('#administration');
            var administrationItem = document.querySelectorAll('.administrationItem');
            var actionButton = document.querySelector("#toggleSideBar");
            if (sidebar.style.width !== '0px'){
            sidebar.style.width = '0px';
            sidebar.style.transition = 'all 0.5s ease';
            administration.style.backgroundColor = 'white';
            administration.style.transition = 'background-color 0.2s ease';
            for (let index = 0; index < administrationItem.length; index++) {
                const element = administrationItem[index];
                element.style.opacity = '0';
                element.style.transition = 'opacity 0.2s ease';
            }
            actionButton.innerHTML = '<i class="fa fa-arrow-right fa-1x" style="font-size: 18px"></i>';

            }
            else {
                sidebar.style.width = '250px';
                sidebar.style.transition = 'all 0.3s ease';
                administration.style.backgroundColor = '#82C138';
                administration.style.transition = 'background-color 0.8s ease';
                for (let index = 0; index < administrationItem.length; index++) {
                    const element = administrationItem[index];
                    element.style.opacity = '100%';
                    element.style.transition = 'opacity 1s ease';
                }
                actionButton.innerHTML = '<i class="fa fa-arrow-left" style="font-size: 18px"></i>';
            }
        },
        fermer(){
           this.$router.push({name: 'autorisation_exportation_grume'}) 
        },
        ajouterProduit(){
            this.getEssences();
            this.elements.unshift({nomcommercial:'',nomscientifique:'', volumeautorise:'',volumecumule:'' })
        },
        async getEssences(){
          this.showOverlayEssences=true
          if(!php.empty(this.$store.state.essences)){
            this.essences=this.$store.state.essences;
            console.log('essences 1',this.essences);
          }
          else{
            try {
                this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                this.$store.dispatch('essences', this.essences)
                console.log('essences 2',this.essences);
                
            } catch (error) {
                console.log(error.message);
            }
          }
     
          this.showOverlayEssences=false
      },
      onSearchEssence(query) {
        this.searchessence = query
        this.offsetessences = 0
      },
      onSearchEntite(query){
        this.searchentite = query
        this.offsetentite = 0
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
        async selectAttacheCertificatFile(e){
            const filecertificat = this.filecertificat =  e.target.files[0];
            this.form.fileactenotification=await this.getBase64(filecertificat)
        },
        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        },
        async getCreationData(){
            this.showOverlay=true;
            if (!phpjs.empty(this.$store.state.entiteswithoutminfof)) {
                this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
                this.showOverlay=false;
            } 
            else {
                try {
                    this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.Items);
                    this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
                    this.showOverlay=false;
                } catch (error) {
                    App.notifyError(error.message);
                }
            }
        },
        onSearch(query){
    this.search = query
    this.offsetEntities = 0
  },
  async getEntities(){
    this.showOverlay=true
    if(!php.empty(this.$store.state.entiteswithoutminfof)){
      this.entitiesWithoutMinfof=this.$store.state.entiteswithoutminfof
      console.log('entrée dans le store')
      this.showOverlay=false
    }else{
      await this.$donneesReference.get('entites/entite_forestier')
        .then(response=>{
          this.entitiesWithoutMINFOF=response.data.result.items
          console.log('requête vers api')
          this.$store.dispatch('entiteswithoutminfof',this.entitiesWithoutMINFOF)
          this.showOverlay=false
        })
        .catch(err=>{
          App.notifySuccess(err.message)
        })
    }
    this.showOverlay=false
  },
    },
    mounted(){
       this.getCreationData();
    }
}
</script>

<style scoped>
.sigif-input-view{
    background:#82C138!important;
    border:1px solid white;
    font-size:0.75rem !important;
    font-weight: 300;
    height: calc(1em + .500rem + 1px) !important;
    border-radius: .2rem;
  }
  .sigif-input-view-select{
    background:#82C138!important;
    color:black!important;
    border:1px solid white;
    font-size:0.75rem !important;
    font-weight: 300;
    height: calc(1em + .500rem + 1px) !important;
    border-radius: .2rem;
  }
 #cover{
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
 }
 .upload-container label input {
    display: none;
  }
 .form_title{
        font-family: 'Verdana';
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }
    .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
    }

    .simple-btn:hover{
        background:none;
        border:none;
    }
    .custom-select-type_titre{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
        --vs-selected-color: #1f1c1c;
            /* Font */
        --vs-font-size: 0.65rem;
        --vs-line-height: 1.2;
    }
    .default-old-system-select-properties{
        border-style: solid;
        /* border-width: 1px; */
        font-weight: normal;
        color: #333333;
        border-radius: 3px;
        background-color: White;
        border: 1px solid #637A95;
        margin: 1px;
        font-family: 'verdana';
        font-size: 13px;
        border-color: #637A95;
    }
    .pagination {
        display: flex;
        margin: 0.25rem 0.25rem 0;
      }
      .pagination button {
        flex-grow: 1;
      }
      .pagination button:hover {
        cursor: pointer;
      }
</style>
