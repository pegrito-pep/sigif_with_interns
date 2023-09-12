<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row>
            <b-col>
              <h4 class="tab-header-left-text">
                <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span></button>
                <span class="font-weight-bold">Ligne de transformation</span>
              </h4>
            </b-col>
            <b-col class="col-md-auto">
              <span >
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="sendFormLigne" :disabled="disable"  size="sm"   class="mx-1 px-1 simple-btn" style="cursor: pointer"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- CREATION ligne de transformation-->
          <div>
            <b-row class="m-4 d-flex justify-content-around">
              <b-col cols="6">
                <b-row class="m-2">
                  <b-col cols="4">
                    <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Unité de tranformation</label>
                  </b-col>
                  <b-col cols="7">
                    <!--<select v-model="form.utb"  class="m-0 p-0" :class="{ styleToSet: notSetUtb }"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option v-for="unite in utbs" :key="unite.IDSITEOPER" :value="unite.IDSITEOPER"> {{ unite.INTITULE }}</option>
                    </select>-->
                    <v-select v-model="form.utb"  :options="paginatedSites" :filterable="false" :reduce="site  => site.IDSITEOPER" @search="onSearchSite" label="INTITULE" class="custom-select-type_titre" :class="{'styleToSet': notSetSiteoper }">
                      <li slot="list-footer" class="pagination">
                          <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                          <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                      </li>
                    </v-select>
                  </b-col>
                </b-row>
                <b-row class="m-2">
                  <b-col cols="4">
                    <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red; font-size:1em;font-weight:900">*</span>Type de transformation</label>
                  </b-col>
                  <b-col cols="7">
                    <select v-model="form.lignetransformation" class="m-0 p-0" :class="{ 'styleToSet': notSetTypeTransformation }"  style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .300rem 2px) !important;">
                      <option v-for="ligne in produitsTransformations" :key="ligne.IDPRODUIT" :value="ligne.IDPRODUIT"> {{ ligne.INTITULE }}</option>
                    </select>
                  </b-col>
                </b-row>
                <b-row class="m-2">
                  <b-col cols="4">
                    <label for="" class="m-0 p-0" style="font-weight:900"><span style="color: red;font-weight:900">*</span>Nom de la ligne</label>
                  </b-col>
                  <b-col cols="7">
                    <input class="w-100 px-2 m-0 form-control-xs" :class="{ 'styleToSet': notSetNomLigne }" style="height: 24px !important;" placeholder="" v-model="form.nomligne"/>
                  </b-col>
                </b-row>
              </b-col>
              <b-col cols="4">
                <b-form-group>
                  <label class="p-0 m-0" style="font-weight:300">Description</label>
                  <b-form-textarea v-model="form.description"  placeholder="saisissez ici.." style="height: 4.5em !important"></b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <div class="w-75 mx-4 px-4">
              <div class="px-2 table-header-border mt-5">
                <b-row>
                    <b-col><h4 class="tab-header-left-text" style="font-size: 14px !important;">Tableau de rendement par essence</h4></b-col>
                    <b-col class="col-md-auto liens">
                        <a @click.prevent="AddField" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                    </b-col>
                </b-row>
              </div>

              <b-table height="50px" class="mx-1 mt-1" v-model="currentItem" :items="items"  :fields="fieldsEsssence" :busy="isBusy"  outlined   ref="selectableTable" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                <template v-slot:head(nomusuel)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template v-slot:head(rendement)="data">
                  <span v-html="data.field.label" style="color:green"></span>
                </template>
                <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                <template #cell(nomusuel)="data">
                  <v-select :options="paginatedEssences" v-model="data.item.nomusuel"  :filterable="false" @search="onSearch" label="NOMUSUEL" style="max-width: 400px!important" class="custom-select-type_titre">
                    <template #option="{ NOMUSUEL }">
                      <span class="font-weight-bold text-dark">{{ NOMUSUEL }}</span>
                    </template>
                    <li slot="list-footer" class="pagination">
                        <button :disabled="!hasPrevPage" @click="offsetessences -= limitessences">Prèc.</button>
                        <button :disabled="!hasNextPage" @click="offsetessences += limitessences">Suiv.</button>
                    </li>
                  </v-select>
                </template>
                <template #cell(rendement)="data">
                  <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="color:black!important" v-model="data.item.rendement" />
                </template>
                
                <template #cell(action)="data">
                  <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveField(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                </template>
              </b-table>
            </div>
              
          </div>
        </div>
            <error-dialogue ref="errorDialogue"></error-dialogue>
            <no-action-possible-dialogue ref="noactionpossibledialogue"></no-action-possible-dialogue>
            <alert-box ref="alertbox"></alert-box>
            <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
      </b-overlay>
    </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';
import AlertBox from '@/components/utils/CodeBarreInfo.vue';
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';

import { mapGetters } from 'vuex'
export default {
    name:"ligne-form",
    components:{ ErrorDialogue,NoActionPossibleDialogue, AlertBox, CodeBarreInfo },
     computed: {
      ...mapGetters(['user','hasAccess','lignes']),
      items(){
        return this.elements.map((a, index) => {
          a.isFirst = index == 0;
          a.isEven = index % 2 == 0;
          return a;
        });
      },
      filteredSites() {
        return this.utbs.filter((site) =>
        site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase())
        )
      },
      paginatedSites() {
        return this.filteredSites.slice(this.offsetSites, this.limitSites + this.offsetSites)
      },
      hasNextPageSites() {
        const nextOffset = this.offsetSites + this.limitSites
        return Boolean(
          this.filteredSites.slice(nextOffset, this.limitSites + nextOffset).length
        )
      },
      hasPrevPageSites() {   
        const prevOffset = this.offsetSites - this.limitSites
        return Boolean(
          this.filteredSites.slice(prevOffset, this.limitSites + prevOffset).length
        )
      },
      /**essences**/
      filteredEssences() {
          return this.essences.filter((essence) =>
          essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchessences.toLocaleLowerCase())
          )
        },
        paginatedEssences() {
          return this.filteredEssences.slice(this.offsetessences, this.limitessences + this.offsetessences)
        },
        hasNextPage() {
          const nextOffset = this.offsetessences + this.limitessences
          return Boolean(
            this.filteredEssences.slice(nextOffset, this.limitessences + nextOffset).length
          )
        },
        hasPrevPage() {   
          const prevOffset = this.offsetessences - this.limitessences
          return Boolean(
            this.filteredEssences.slice(prevOffset, this.limitessences + prevOffset).length
          )
        },
     },
     data: () => ({
      notSetSiteoper:false, //variable de controle remplissage champ utb
      notSetTypeTransformation:false, //variable de controle remplissage champ type de transformation
      notSetNomLigne:false,//variable de controle remplissage champ nom de la ligne
      currentItem:[], //v-model tableau détails du lot
      indexRowSelected:0,
      showOverlay:true,
      showOverlayEssences:false,
      submitted: false,
      searchessences: '',
      offsetessences: 0,
      limitessences: 10,
      essences:[],
      utbs:[],
      searchsite: '',
      offsetSites: 0,
      limitSites: 10,
      sites:[],
      form: {
        utb: '', // int (id du site de type utb), obligatoire
        lignetransformation: '', // int (id du produit de transformation), obligatoire
        nomligne: "", // string, obligatoire
        description: "", // strting, non obligatoire
        rendements: [],// tableaux des rendements par essences, il contient une liste de tableau et est obligatoire
      },
      isActive:false,
      disable:true,

      isBusy:false,

      produitsTransformations:[],
      // Données du tableau
      fieldsEsssence: [ 
        { key: 'index', label: '' },
        { key: 'nomusuel', label: 'Nom usuel',thStyle: { width: "70%" }  }, 
        { key: 'rendement', label: 'Rendement' },
        { key: 'action', label: '',thStyle: { width: "5%" } },
      ],
      elements:[]
    }),
    watch: {
      "form.utb"(value) {
        if(value!==null&&value.length!==''){
            this.notSetSiteoper= false
        }
        else{
            this.notSetSiteoper= true
        }
     },
     "form.lignetransformation"(value) {
        if(value!==null&&value.length!==''){
            this.notSetTypeTransformation= false
        }
        else{
            this.notSetTypeTransformation= true
        }
     },
     "form.nomligne"(value) {
        if(value!==null&&value.length!==''){
            this.notSetNomLigne= false
        }
        else{
            this.notSetNomLigne= true
        }
     },
     elements(value){
      if(value.length>0){
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    } 
     
    },
    methods: {
      fermer() {
        this.$router.back()
      },
      RemouveField(index){
        this.elements.splice(index, 1);
      },
      AddField () {
        if (php.empty(this.form.utb)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez choisir le site de transformation'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.lignetransformation)) {
          this.notSetTypeTransformation=true;
          let error={ message:'Veuillez choisir le type de transformation'}
          return this.sendAlertMessage(error);
        }
        if(php.empty(this.form.nomligne)){
          this.notSetNomLigne=true;
          let error={ message:'Veuillez renseigner le nom de la ligne'}
          return this.sendAlertMessage(error); 
        }
        if(php.empty())
        this.elements.unshift({nomusuel: '', rendement: '' });
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
        this.indexRowSelected = items.map(item => this.currentItem.indexOf(item));
        for(let i=0; i<items.map(item => this.currentItem.indexOf(item)).length;i++){
          this.indexRowSelected =items.map(item => this.currentItem.indexOf(item))[i]
          console.log('i ',this.indexRowSelected);
        }    
      },
      deleteAll(){
        this.fields = [{nomusuel: '', rendement: '' }]
      },
      controleChange() {
        console.log("Somethings change");
      },
      resetForm() {
        this.form = {
          utb: '', lignetransformation: '', nomligne: "", description: "",
	        rendements: []
        };
      },
      async sendAlertMessage(error){
      const ok = await this.$refs.alertbox.show({
              title: 'Information',
              message: error.message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.alertbox._close();
            } else {
              this.$refs.alertbox._close();
            }
    },
      async sendFormLigne() {
        this.form.rendements =  [];
        this.elements.forEach(field => {
          this.form.rendements.push([field.nomusuel.IDESSENCE, parseFloat(field.rendement)])
        }) 
        if (php.empty(this.form.utb)) {
          this.notSetSiteoper=true;
          let error={ message:'Veuillez remplir l\'unité de transformation'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.lignetransformation)) {
          this.notSetLignetransformation=true;
          let error={ message:'Veuillez remplir la ligne de transfotmation'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.nomligne)) {
          this.notSetNomLigne=true;
          let error={ message:'Veuillez remplir le nom de la ligne'}
          return this.sendAlertMessage(error);
        }
        this.submitted = true ;

        console.log('données envoyées',this.form);

        this.$transformation.post('lignes-transformation', this.form).then(response => {
            this.submitted = false 
            this.resetForm()
            App.notifySuccess(response.data.message)
            return this.$router.push({ name: "lignes_de_transformation" });
        }).catch(error => {
            console.log('entrée dans le catch');
            this.submitted = false
            this.errorHappened(error.response.data)
        })
      },
      async errorHappened(error, index){
        let message=error.message!=undefined ?error.message :'erreur interne du serveur'
        console.log('message ',message);
        const ok = await this.$refs.codebarreinfo.show({
              title: 'Erreur survenue',
              message: message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
              this.$refs.codebarreinfo._close();
            }
    },
      async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "UTB",
              okButton: 'Quitter',
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.errorDialogue._close();
              this.$router.back()
          } else {
              this.$refs.errorDialogue._close();
              this.$router.back()
          }
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
      async getLigneData(){
        this.showOverlay=true;
        //traitement des produits
        if(!php.empty(this.$store.state.produitsTransformations)){
          this.produitsTransformations=this.$store.state.produitsTransformations
        }
        else{
          try {
              this.produitsTransformations = await this.$donneesReference.get("produits/produits-transformation").then(response => response.data.result);
              this.$store.dispatch('produitsTransformations', this.produitsTransformations)
          } catch (error) {
              console.log(error.message);
          }
        }
        //traitement des sites
        if(!php.empty(this.$store.state.utbs)){
          this.utbs=this.$store.state.utbs;
        }
        else{
          try {
              this.utbs = await this.$donneesReference.get("sites/utb").then(response => response.data.result);
              this.$store.dispatch('utbs', this.utbs)
             
            } catch (error) {
                console.log(error.message);
            }
        }
       
      //traitement des essences
        if(!php.empty(this.$store.state.essences)){
          this.essences=this.$store.state.essences;
        }
        else{
          try {
            this.essences =  await this.$donneesReference.get("essences/raw").then(response => response.data.result);
            this.$store.dispatch('essences', this.essences)
          } catch (error) {
            console.log(error.message);
          }
        }
        this.showOverlay=false;
      },
      onSearch(query) {
        this.searchessences = query
        this.offsetessences = 0
      },
      onSearchSite(query) {
        this.searchSite = query
        this.offsetSite = 0
      }

    },
    mounted() {
        this.getLigneData()
    },

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
.styleToSet{
  border: 2px solid red;
}
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
.liens a {
    color: rgb(0, 82, 44) !important;
    font-weight: 600;
    cursor: pointer;
}
.form-control{
  height: 30px !important;
}

#toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
.position_absolute{
  position: absolute;
  bottom: 20px;
  right: 35px;
}
.b-card{
  background-color: transparent !important;
}
.b-col{
  margin-right: 16px;
}
.b-col .content{
  display: flex;
  flex-direction: column;
}


#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */
.search-bar-btn-group{
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius: 6px;
  padding: 6px 20px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
  background-color: rgba(0, 82, 44, 0.89);
  border:none;
}
.search-bar-btn a{
  color:white
}
.search-bar-btn a:hover{
  font-weight: 600;
  font-style: italic;
  
}

.search-bar-custum-input{
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
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
/*edti style par defaut btn-bootstrap au disable*/
.change-image-opacity:disabled {
  color: #6c757d;
  background-color: white!important;
  border-color: white!important;
}
.change-image-opacity:hover {
  color: #6c757d;
  background-color: rgb(0, 82, 44)!important;
  border-color: white!important;
  cursor: not-allowed;
}
.not-change-image-opacity:hover{
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
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