<template>
  <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="isbusy">
        <div>
          <b-row>
            <b-col><h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>Enregstrement du moratoire</h4></b-col>
            <b-col class="col-md-auto">
              <span >
                <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- ENTETE CREATION TITRE EN CP-->
          <div>
              <b-row class="m-4 w-75" style="border: 1px solid green; border-radius: 5px">
                <b-col cols="6" class="ml-2">
                  <b-row class="m-2">
                    <b-col cols="4"><span class="text-danger">*</span> Nature échéance</b-col>
                    <b-col cols="8">
                      <select v-model="form.typetitre" class="m-0 p-0" style="width: 100%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .500rem + 2px) !important;">
                      <option @input="getTitres" v-for="(nature, i) in natures" :key="i" :value="nature.key"> {{ nature.libelle }}</option>
                      </select>
                    </b-col>

                  </b-row>
               
                  <b-row>
                    <b-col cols="4">Nombre d'échéance <span v-if="form.nbrecheances>1">s</span></b-col>
                    <b-col cols="8">
                      <input type="text" v-model="form.nbrecheances" class="sigif-form-control w-50" />
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="4">Copie moratoire <span v-if="form.nbrecheances>1">s</span></b-col>
                    <b-col cols="8">
                      <div class="upload-container">
                        <label>
                          <input type="file" @change="selectFileMoratoire"/>
                          <b-img src="@/assets/images/download.png"></b-img>
                          
                          <span v-if="filemoratoire" class="file-name">{{ filemoratoire.name }}</span>
                          <span v-else class="title">cliquer pour choisir</span>
                        </label>
                      </div>
                    </b-col>
                  </b-row>
                </b-col>

                <b-col cols="4">
                  <b-row class="m-2">
                    <b-col cols="4"><span class="text-danger">*</span> Date début</b-col>
                    <b-col cols="8">
                      <date-picker v-model="form.datedebut" format="YYYY-MM-DD" placeholder="yyyy-mm-dd" valueType="YYYY-MM-DD" class="w-75 mt-0" :clearable="false" />
                    </b-col>
                  </b-row>
                  <b-row class="m-2">
                    <b-col cols="4"><span class="text-danger">*</span> Montant</b-col>
                    <b-col cols="8">
                      <h5>{{ form.montant }}</h5>
                    </b-col>
                  </b-row>
   
                </b-col>
              </b-row>
          
              <!--entete des tableaux -->
              <b-container fluid>
                <b-row>
                  <!--LEFT SIDE:TITRES EMIS DU MORATOIRE-->
                  <b-col cols="6">
                    <div class="mx-4">
                      <h5 class="x12f">Liste des titres émis du moratoire</h5>
                      <a class="ml-1 font-weight-bold" @click.prevent="addFieldMoratoire" style="font-size:16px; color: #00522C; cursor:pointer"><b-img src="@/assets/images/addsymbol.png"></b-img>ajouter</a>
                    </div>
                    
                    <div>
                      <b-row class="w-100 my-2 mx-4" style="border-bottom: 2px solid green; ">
                        <b-col class="" cols="3">
                          <label class="p-0 m-0 header-add-moratoire-table" >Nature taxe</label>
                        </b-col>
                        <b-col class="" cols="2">
                          <label class="p-0 m-0  header-add-moratoire-table"><span class="text-danger">*</span> TR N°</label>
                        </b-col>
                        <b-col class="" cols="3">
                          <label class="p-0 m-0 header-add-moratoire-table" >Montant TR</label>
                        </b-col>
                        <b-col class="" cols="2">
                          <label class="p-0 m-0 header-add-moratoire-table" >Reste à payer</label>
                        </b-col>                   
                      </b-row>

                      <b-row class="w-100 mb-2 ml-2 change_bg pb-1" @click.prevent="handleSelected(index)" :class="{ change_bg : indexRowSelected == index }"   v-for="(field, index) in fieldsTitresMoratoires" :key="index">
                        <b-col cols="3" style="height: 24px !important;" class="d-flex align-items-center">
                          <select v-model="field.naturetaxe" class="m-0 p-0 change_bg" style="width: 100%;font-size:1rem; border-radius:0.25rem; height:18px!important; color:white">
                            <option @input="setTr(index)" v-for="(nature, i) in natures" :key="i" :value="nature.key"> {{ nature.libelle }}</option>
                          </select>
                        </b-col>
                        <b-col cols="2" style="height: 24px !important;" class="d-flex align-items-center">
                          <select v-model="field.numtr" class="m-0 p-0 change_bg" style="width: 100%;font-size:1rem; border-radius:0.25rem; height:18px!important; color:white">
                            <option @input="setAmounts" v-for="(tr, i) in numtrs" :key="i" :value="tr"> {{ tr }}</option>
                          </select>
                        </b-col>
                        <b-col cols="3" style="height: 24px !important;" class="d-flex align-items-center">
                          <b-form-input v-model="field.montanttr"  size="sm" class="w-100 py-0 px-1 m-0 change_bg" style="height: 18px !important;text-align: center; color:white" placeholder="" />
                        </b-col>
                        <b-col cols="2" style="height: 24px !important;" class="d-flex align-items-center">
                          <b-form-input disabled v-model="field.resteapayer"  size="sm" class="w-100 py-0 px-1 m-0 change_bg d-flex align-items-center" style="height: 18px !important;text-align: center; color:white" placeholder=""/>
                        </b-col>
                        <b-col cols="1" style="height: 24px !important;" class="d-flex align-items-center">
                          <a class="d-flex" @click.prevent="removeAtIndexMoratoire(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                        </b-col>
                      </b-row>
                      <b-row class="mx-2" style="border-top: 2px solid green;">
                        <b-col cols="3"></b-col>
                        <b-col cols="2" class="d-flex justify-content-center align-items-center"><h5>Totaux</h5></b-col>
                        <b-col cols="3" class="d-flex justify-content-center align-items-center"><h5>{{ montrTotal }}</h5></b-col>
                        <b-col cols="3" class="d-flex justify-content-center align-items-center"><h5>{{ rapTotal }}</h5></b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <!--RIGHT SIDE:ECHEANCIER DU MORATOIRE-->
                  <b-col cols="6">
                    <div class="mx-4">
                      <h5 class="x12f">échéancier du moratoire</h5>
                      <a class="ml-1 font-weight-bold" @click.prevent="generateecheance" style="font-size:16px; color: #00522C; cursor:pointer">Générer</a>
                    </div>
                    
                    <div>
                      <b-row class="w-100 my-2 mx-4" style="border-bottom: 2px solid green; ">
                        <b-col class="" cols="3">
                          <label class="p-0 m-0 header-add-moratoire-table" ><span class="text-danger">*</span> Echéance</label>
                        </b-col>
                        <b-col class="" cols="2">
                          <label class="p-0 m-0  header-add-moratoire-table"><span class="text-danger">*</span> Montant</label>
                        </b-col>
                        <b-col class="" cols="3">
                          <label class="p-0 m-0 header-add-moratoire-table" >Etat</label>
                        </b-col>            
                      </b-row>

                      <b-row class="w-100 mb-2 ml-2 change_bg pb-1" @click.prevent="handleSelectedEcheance(index)" :class="{ change_bg : indexRowSelected == index }"   v-for="(field, index) in fieldsEcheances" :key="index">
                        <b-col cols="3" style="height: 24px !important;" class="d-flex align-items-center">
                          <input type="date" id="start" name="trip-start" value="2018-07-22" min="2018-01-01" max="2023-01-05" style="height: 20px !important;">
                        </b-col>
                        <b-col cols="2" style="height: 24px !important;" class="d-flex align-items-center">
                          <b-form-input v-model="field.montant"  size="sm" class="w-100 py-0 px-1 m-0 change_bg" style="height: 18px !important;text-align: center; color:white" placeholder="" />
                        </b-col>
                        <b-col cols="3" style="height: 24px !important;" class="d-flex align-items-center">
                          <h5 class="font-weight-bold text-table-moratoire" style="height: 18px !important;">échéance soldée</h5>
                        </b-col>
                        <b-col cols="1" style="height: 24px !important;" class="d-flex align-items-center">
                          <a class="d-flex" @click.prevent="removeAtIndexMoratoire(index)" v-b-tooltip.hover.top="'Donne la possibilité \nde supprimer la ligne'" style="height: 10px; width: 20px; color: red; font-weight: 600px" variant="outline-danger"><i class="ik ik-trash-2"></i></a>
                        </b-col>
                      </b-row>
                      <b-row class="mx-2" style="border-top: 2px solid green;">
                        <b-col cols="3"><h5>Total</h5> </b-col>
                        <b-col cols="2" class="d-flex justify-content-center align-items-center"><h5>{{ montrTotalEcheance }}</h5></b-col>
                      </b-row>
                    </div>
                  </b-col>
                </b-row>
              </b-container>

              <div>                
                <error-dialogue ref="errorDialogue"></error-dialogue>
                <no-action-possible-dialogue ref="noactionpossibledialogue"></no-action-possible-dialogue>
              </div>
          </div>
        </div>
      </b-overlay>
  </div>

</template>

<script>
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import NoActionPossibleDialogue from '@/components/dialog/NoActionPossibleDialogue.vue';

const php = require('phpjs');
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
import { mapGetters } from 'vuex'

export default {
  name:"titre-ps-form",
  components:{ ErrorDialogue,
                NoActionPossibleDialogue},
   computed: {
    ...mapGetters(['user','hasAccess']),
    montrTotal() { 
      let sum=0;
      this.fieldsTitresMoratoires.forEach(elt => {
        sum +=  elt.montanttr !==''? parseFloat(elt.montanttr): 0;
      });
      return this.commify(sum);
    },
    rapTotal() { 
      let sum=0;
      this.fieldsTitresMoratoires.forEach(elt => {
        sum +=  elt.resteapayer !==''? parseFloat(elt.resteapayer): 0;
      });
      return this.commify(sum);
    },
    montrTotalEcheance(){
      let sum=0;
      this.fieldsTitresMoratoires.forEach(elt => {
        sum +=  elt.montanttr !==''? parseFloat(elt.montanttr): 0;
      });
      return this.commify(sum);
    }
   },
   watch:{

   },

   data: () => ({
      natures:[
        {key: '1', libelle: 'A la demande'},
        {key: '2', libelle: 'Annuelle'},
        {key: '3', libelle: 'Sémestrielle'},
        {key: '4', libelle: 'Trimestrièlle'},
        {key: '5', libelle: 'Mensuelle'},
      ],
      isbusy:false,
      amount: '',
      form: {
        nbrecheances:'',
        montant:''
      },
      typestitres:[{key:'CP', libelle:'concession forrestière en convention provisoire'},
                   {key:'CD', libelle:'concession forrestière en convention définitive'},
                   {key:'VC', libelle:'vente de coupe'},
      ],
      titres:[
        {
          numtitre:'2001',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2002',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2003',
          typetitre:{
            key:'ccp', 
            libelle:'concession forrestière en convention provisoire'
          }
        },
        {
          numtitre:'2021',
          typetitre:{
            key:'vc', 
            libelle:'vente de coupe'
          }
        },

      ],
      filemoratoire:null,
   
    fieldsTitresMoratoires:[{naturetaxe:'', numtr:'', montanttr: '', resteapayer:''}],
    fieldsEcheances:[{echeance:'', montant: '', etat:'échéance soldée'}],
    selected:null,
    naturestitres:[
      {value: 1, libelle: "Taxe d'abattages"},
      {value: 2, libelle: "Taxe foncière"},
    ],
    numtrs:[ 120, 121, 122, 127],
    indexRowSelected:0 ,
    indexRowSelectedEcheance:0 
  }),

  methods: {
   
    addFieldMoratoire() {
      this.fieldsTitresMoratoires.unshift({naturetaxe:'', numtr: '',montanttr: '',resteapayer:'' },);
    },
    removeAtIndexMoratoire(){
      this.fieldsTitresMoratoires.splice(index, 1);
    },
    async selectFileMoratoire(e){
      const filemoratoire = this.filemoratoire =  e.target.files[0];
      this.form.filemoratoire=await this.getBase64(filemoratoire)
    },
    deleteField(){

    },
    setTr(i){
      this.fieldsTitresMoratoires[i].numtr='1'
    },
    setAmounts(){
      console.log('data send');
    },
    handleSelected(index){
        this.indexRowSelected =index
        console.log('ligne sélectionnée ',index);
    },
    handleSelectedEcheance(index){
      this.indexRowSelectedEcheance =index
    },
    resetRecouvrementFields(){
      this.form.numtitre='', this.form.naturetaxe='', this.form.numtr='', this.form.montanttr='',
      this.form.montantpaye='', this.form.montantdu=''
    },
    validateState(ref){
      if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) { 
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    generateecheance(){
      console.log('à définir');
    },
    fermer() {
      this.$router.back()
    },
     //fonction de parse d'un montant
     commify(n){
      var parts = n.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];
      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : "");
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
    /**Récupération des titres d'un type de titres spécifiques*/
    async getTitres(){
            this.showOverlay= true;
            const params = this.getRequestParams(0,20);
            
            try {
                this.titres= await this.$titres.get("titres/"+this.form.typetitre, {params}).then(response => response.data.result.items || [])
            } catch (error) {
                this.showOverlay= false;
                console.log('data',error.response.data);
                this.errorHappened(error)
            }

            if(this.titres.length>0){
                this.typetitreSet=true;
            }
            this.showOverlay= false;
            console.log('taille',this.titres.length);
        },  

    getBase64(file) {
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
      });
    },

    resetForm() {
        this.form = {
          typetitre: "CP", numtitre: "", idorganisation: "",superficie: "", arreteattribution: "", 
          dateattribution: "", montantoffre: "", numcautionnement: "", datecautionnement: "", datefincautionnement: "", 
          dureeconvention: "", fichiercaution: "", fichierconventionexploitation: "",
          numappeloffre: "", dateappeloffre: "", documentappeloffre: "",
          numdepot: "",  datedepot: "", documentdepot: "", numplan: "", 
          dateplan: "", documentplan: "", numservicebraconnage: "", 
          dateservicebraconnage: "", documentservicebraconnage: "", numnotesanction: "", 
          datenotesanction: "",documentnotesanction: "", arrondissement:""
        };

    },
    async addTitreAndContinue(){
      this.$validator.validateAll().then(result => {if (!result) {return;}

      this.submitted = true
      this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
      console.log("data site", this.form)
          this.$titres.post('titres', this.form).then(response => {
              this.submitted = false 
              this.$emit('titreAdded',response)
              this.resetForm()
              return   App.notifySuccess(response.data.message)
              return setTimeout(() => {this.$router.push({ name: "concession_en_cp" }); }, 2000);
          }).catch(error => {
              this.submitted = false
              console.log('erreur titre',error.message)
              this.errorHappened(error)
          })
})
    },
    async errorHappened(error) {
          const ok = await this.$refs.errorDialogue.show({
              title: 'Erreur survenue',
              message: "erreur interne interne du serveur",
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
    async alertNoTile(error) {
          const ok = await this.$refs.noactionpossibledialogue.show({
              title: 'OPERATION IMPOSSIBLE',
              message: "Vente de coupe",
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
    async addTitre(){
          this.$validator.validateAll().then(result => {if (!result) {return;}

          this.submitted = true
          this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
          console.log("data site", this.form)
              this.$titres.post('titres', this.form).then(response => {
                  this.submitted = false 
                  this.$emit('titreAdded',response)
                  this.resetForm()
                    App.notifySuccess(response.data.message)
                  return setTimeout(() => {this.$router.push({ name: "arb" }); }, 2000);
              }).catch(error => {
                  this.submitted = false
                  console.log('erreur titre',error.message)
                  this.errorHappened(error)
              })
          })
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
    onSearch(query) {
      this.searchtitre = query
      this.offset = 0
    },
  },
   mounted() {
    this.getTitres()
  },

}
</script>


<style scoped>

.text-table-moratoire{
  font-size: 13px;
  display: contents;
}

.change_bg{
  background:#82C138;
  color: white;
}
.x12f{
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  font-family: 'Verdana';
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.header-add-moratoire-table{
  font-weight:600; 
  color: black; 
  font-size: 16px;
}
.sigif-form-control{
  padding: .25rem .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  width: 100%;
  height: calc(1em + .500rem + 2px) !important;
}

.upload-container label input {
  display: none;
}

.setheight{
  padding: 1px 1px;

}
.nav-tabs .nav-link.active {
  background-color: rgb(0, 82, 44)!important;
  font-weight: bold;
  color: white !important;
  border-color:  rgb(0, 82, 44)!important;
}
.contents {
  padding: 10px 5px;
}

.setwidth>input{
  width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
  content: 'choisir';
}
.form-control-xs {
  height: calc(1em + .500rem + 2px) !important;
  font-size: .85rem !important;
  line-height: 1.5;
  border-radius: .2rem;
  border: 1px solid darkgreen;
  width: 100%;
  font-weight: 800;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border-radius: .25rem;
  /*box-shadow: inset 0 0 0 transparent;*/
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out
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

</style>&