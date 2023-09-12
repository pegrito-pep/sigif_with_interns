<template>
  <div id="cover" class="min-vh-100">
        <b-overlay :show="showOverlay">
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span >Création inventaire <span class="font-weight-bold" v-if="inventaire.typetitre!=null">{{ inventaire.typetitre.libelle }}</span> </span>
              </h4>
              </b-col> 
              
            <b-col class="col-md-auto">
              <span>
                <a @click.prevent="enregistrer"  size="sm"   class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <!-- CREATION PROPREMENT DITE INVENTAIRE-->
          <div>
          <b-row class="mt-2">
            <b-col cols="5">
              <b-row class="ml-1">
                <b-col cols="4">
                    <label for="" class="m-0 py-2" style="font-weight:300">Type de titre</label>
                </b-col>
                <b-col cols="8">
                  <div>
                    <v-select label="libelle" :options="typesTitres" v-model="inventaire.typetitre"  @input="getNumTitres" class="font-weight-bold  custom-select-type_titre"></v-select>
                  </div>
                </b-col>
              </b-row>
              <b-overlay :show="loadData" rounded="sm">
                <template #overlay>
                  <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p id="cancel-label">Chargement...</p>
                  </div>
                </template>
                <b-row class="ml-1 mt-2">
                <b-col cols="4">
                    <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> Numéro du titre</label>
                </b-col>
                <b-col cols="8">
                  <div class="w-50">
                    <v-select :disabled="notsetTypetitre" label="numtitre" :options="titres" v-model="inventaire.numtitre"  class="custom-select-type_titre"></v-select>
                  </div>
                </b-col>
              </b-row>
              </b-overlay>
              
              <transition name="fade">
                <div v-if="typeTitreSet">
                  <b-row class="ml-1" v-if="inventaire.typetitre.code =='CP' || inventaire.typetitre.code =='CD'">
                    <b-col cols="3" >
                        <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> N° UFA</label>
                    </b-col>
                    <b-col cols="8">
                      <div class="w-50">
                        <v-select label="libelle" :options="typesTitres" :reduce="typetitre => typetitre.libelle" class="custom-select-type_titre"></v-select>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row class="ml-1" v-if="inventaire.typetitre.code =='CD' || inventaire.typetitre.code =='CC'">
                    <b-col cols="3" >
                        <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> N° UFE</label>
                    </b-col>
                    <b-col cols="8">
                      <div class="w-50">
                        <v-select label="libelle" :options="typesTitres" :reduce="typetitre => typetitre.libelle" class="custom-select-type_titre"></v-select>
                      </div>
                    </b-col>
                  </b-row>

                  <b-row class="ml-1" v-if="inventaire.typetitre.code =='CP' || inventaire.typetitre.code =='CD'|| inventaire.typetitre.code =='CC'">
                    <b-col cols="3">
                        <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> N° AAC</label>
                    </b-col>
                    <b-col cols="8">
                      <div class="w-50">
                        <v-select label="libelle" :options="typesTitres" :reduce="typetitre => typetitre.libelle" class="custom-select-type_titre"></v-select>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row class="ml-1" v-if="inventaire.typetitre.code =='FS' || inventaire.typetitre.code =='FC'">
                    <b-col cols="3">
                        <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> N° Secteur</label>
                    </b-col>
                    <b-col cols="8">
                      <div class="w-50">
                        <v-select label="libelle" :options="typesTitres" :reduce="typetitre => typetitre.libelle" class="custom-select-type_titre"></v-select>
                      </div>
                    </b-col>
                  </b-row>
                  <b-row class="ml-1" v-if="inventaire.typetitre.code =='FS' || inventaire.typetitre.code =='FC'">
                    <b-col cols="3">
                        <label for="" class="m-0 py-2" style="font-weight:300"><span style="color:red; font-size:1.2em; font-weight: bold">*</span> N° Parcelle</label>
                    </b-col>
                    <b-col cols="8">
                      <div class="w-50">
                        <v-select label="libelle" :options="typesTitres" :reduce="typetitre => typetitre.libelle" class="custom-select-type_titre"></v-select>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </transition>
            </b-col>



            <b-col cols="7">
              <b-row class="">
                <b-col cols="3" >
                    <label class="m-0 py-2" style="font-weight:300"><span style="color: red;">*</span>Exercice fiscal</label>
                </b-col>
                <b-col cols="7">
                  <div class="w-50">
                    <v-select label="libelle" :options="exercices" v-model="inventaire.exercicefiscal" class="font-weight-bold custom-select-type_titre"></v-select>
                  </div>
                </b-col>
              </b-row>
              <b-row class="">
                <b-col cols="3" >
                    <label class="m-0 py-2" style="font-weight:300"><span style="color: red;">*</span>Type d'inventaire</label>
                </b-col>
                <b-col cols="7">
                  <div class="w-50">
                    <v-select  label="typeinventaire" @input="getEntitsAgrees" :options="typesinventaires" v-model="inventaire.typeinventaire" class="font-weight-bold custom-select-type_titre"></v-select>
                  </div>
                </b-col>
              </b-row>
              <b-row class="">
                <b-col cols="3" >
                    <label class="m-0 py-2" style="font-weight:300"><span style="color: red;">*</span>Entité agrée inventaire</label>
                </b-col>
                <b-col cols="9">
                  <b-overlay :show="shoverlayentites" rounded="sm">
                      <template #overlay>
                      <div class="text-center">
                        <i class="fas fa-2x fa-sync fa-spin"></i>
                        <p id="cancel-label">Chargement...</p>
                      </div>
                    </template>
                    <div class="w-100 pr-1">
                      <v-select :disabled="notsetTypeinventaire" :options="entitesagrees" :filterable="false" @search="onSearchEntiteeAgree" label="raisonsociale" class="custom-select-type_titre  w-50" v-model="inventaire.entiteagree" :reduce="entite => entite.idsociete"  :class="{'styleToSet': notSetEntiteagree }">
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEntiteesagrees" @click="(offsetentiteagree -= limitentiteagree)">Prèc.</button>
                            <button :disabled="!hasNextPageEntiteesagrees" @click="(offsetentiteagree += limitentiteagree)">Suiv.</button>
                        </li>
                      </v-select>
                    </div>
                  </b-overlay>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <div class="m-4 table-header-border">
              <ul class="nav nav-tabs mt-2">
                  <li class="nav-item m-0 p-0" :class="{ custumSigifTab: section == 'inventaire' }">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link m-1 p-1"
                style="color: inherit; border:solid 1px"
                @click.prevent="section = 'inventaire'"
                >Opération d'inventaires</a
                >
                  </li>
                  <li class="nav-item m-0 p-0" :class="{ custumSigifTab: section == 'import_inventaire' }">
                <a
                data-toggle="tab"
                href="#"
                class="nav-link  m-1 p-1"
                style="color: inherit"
                @click.prevent="section = 'import_inventaire'"
                >Suivie des imports inventaires</a
                >
                  </li>
              </ul>
              <!--GESTION PARTIE SUR LES INVENTAIRES-->
              <b-container fluid v-if="section == 'inventaire'">
                <b-row style="border-bottom: 2px solid green">
                    <b-col><h3 class="tab-header-left-text" style="font-size: 14px !important;"> Liste des tiges</h3></b-col>
                    <b-col class="col-md-auto liens">
                        <a class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Importer</a>
                        <span >
                        <a @click.prevent="AddField" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a @click.prevent="deleteAll" class="mx-1 simple-btn"><b-img src="@/assets/images/rejetter.png"></b-img>Tout supprimer</a>
                        </span>
                    </b-col>
                </b-row>
                <div>
                <b-overlay rounded="sm" :show="showOverlayCodeData">
                  <b-table  height="50px" :items="items"  :fields="fields" :busy="isBusy" class="ml-4 px-2 mt-1" outlined   ref="selectableTablegrumes" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
                    <template v-slot:head(codebarre)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(sequence)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(nomcommercial)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>

                    <template slot="thead-top" slot-scope="{}">
                      <tr>
                        <th></th><th></th><th></th> <th></th><th></th><th></th> <th></th><th></th><th></th>
                        <th class="text-center" colspan="3" style="border-bottom: 4px solid #82C138">Position</th>
                      </tr>
                    </template>
                    <template v-slot:head(diametretige)="data">
                      <span v-html="data.field.label" class="d-flex justify-content-center align-items-center" style="color:green"></span>
                    </template>
                    <template v-slot:head(numbloc)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(nouc)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(notige)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(qualite)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(zone)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(utmx)="data">
                      <span v-html="data.field.label" style="color:green"></span>
                    </template>
                    <template v-slot:head(utmy)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    <template v-slot:head(volume)="data">
                      <span v-html="data.field.label" style="color:green" class="d-flex justify-content-center align-items-center"></span>
                    </template>
                    
                    <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                    
                    <template #cell(codebarre)="data">
                      <input size="xs" @keydown.tab.prevent="checkCodebarre($event.target.value, data.index, 'codebarre')" class="w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important" v-model="data.item.codebarre" />
                    </template>
                    <template #cell(sequence)="data">
                      <input disabled size="xs" class="mx-1 px-1 sigif-input-view text-left font-weight-bold"  style="color:black!important; width:85%" v-model="data.item.sequence" />
                    </template>
        
                  
                    <template #cell(nomcommercial)="data">
                      <v-select :options="paginatedEssences" v-model="data.item.IDESSENCE" :reduce="essence  => essence.IDESSENCE" :filterable="false" @search="onSearchEssence" label="NOMUSUEL" class="custom-select-type_titre">
                        <template #option="{ NOMUSUEL }">
                          <span class="font-weight-bold text-dark">{{ NOMUSUEL }}</span>
                        </template>
                        <li slot="list-footer" class="pagination">
                            <button :disabled="!hasPrevPageEssences" @click="offsetEssences -= limitEssences">Prèc.</button>
                            <button :disabled="!hasNextPageEssences" @click="offsetEssences += limitEssences">Suiv.</button>
                        </li>
                      </v-select>
                    
                    </template>
                    <template #cell(diametretige)="data">
                      <input disabled size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left  font-weight-bold"  style="color:black!important; float:right" v-model="data.item.diametretige" />
                    </template>
                    <template #cell(numbloc)="data">
                      <input disabled size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left"  style="color:black!important " v-model="data.item.numbloc" />
                    </template>
                    <template #cell(nouc)="data">
                      <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold  font-weight-bold"  style="color:black!important" v-model="data.item.nouc" />
                    </template>
                    <template #cell(notige)="data">
                      <input disabled size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left  font-weight-bold"  style="color:black!important" v-model="data.item.notige" />
                    </template>
                    <template #cell(qualite)="data">
                      <select  v-model="data.item.qualite" class="m-0 p-0" style="background:#82C138!important;color:white!important; width:90%;font-size:0.8rem; border-radius:0.25rem; height: calc(1em + .350rem + 2px) !important;" >
                        <option v-for="(qualite, i) in classes" :value="qualite.codequalite" :key="i">
                          {{ qualite.intitule }}
                        </option>
                      </select>
                    </template>
                    <template #cell(zone)="data">
                      <select  v-model="data.item.zone" class="m-0 p-0" style="background:#82C138!important;color:white!important; width:90%;font-size:0.8rem; border-radius:0.25rem; height: calc(1em + .350rem + 2px) !important;" >
                        <option v-for="(zone, i) in zones" :value="zone.value" :key="i">
                          {{ zone.libelle }}
                        </option>
                      </select>
                    </template>
                    <template #cell(utmx)="data">
                      <input  size="xs" class="w-50 d-flex justify-content-end mx-1 px-1 sigif-input-view text-left"  style="color:black!important " v-model="data.item.utmx" />
                    </template>
                    <template #cell(utmy)="data">
                      <input  size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left font-weight-bold  font-weight-bold"  style="color:black!important" v-model="data.item.utmy" />
                    </template>
                    <template #cell(volume)="data">
                      <input disabled size="xs" class="d-flex justify-content-center align-items-center w-75 mx-1 px-1 sigif-input-view text-left  font-weight-bold"  style="color:black!important" v-model="data.item.volume" />
                    </template>
                    <template #cell(action)="data">
                      <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="RemouveFields(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                    </template>
                  </b-table>
                </b-overlay>
          </div>
        </b-container>  
    </div>
  </div>
</b-overlay>
</div>

</template>

<script>
const php = require('phpjs');


export default {
  name:"inventaire-form",
   computed: {
    items(){
      return this.elements.map((a, index) => {
        a.isFirst = index == 0;
        a.isEven = index % 2 == 0;
        return a;
      });
    },
    notsetTypeinventaire(){
      return php.empty(this.inventaire.typeinventaire)
    },  
    notsetTypetitre(){
      return php.empty(this.inventaire.typetitre)
    },   
    filteredEntiteesagrees() {
        return this.entitesagrees.filter((entite) =>
        entite.raisonsociale.toLocaleLowerCase().includes(this.searchentiteagree.toLocaleLowerCase())
        )
      },
      paginatedEntiteesagrees() {
        return this.filteredEntiteesagrees.slice(this.offsetentiteagree, this.limitentiteagree + this.offsetentiteagree)
      },
      hasNextPageEntiteesagrees() {
        const nextOffset = this.offsetentiteagree + this.limitentiteagree
        return Boolean(
          this.filteredEntiteesagrees.slice(nextOffset, this.limitentiteagree + nextOffset).length
        )
      },
      hasPrevPageEntiteesagrees() {   
        const prevOffset = this.offsetentiteagree - this.limitentiteagree
        return Boolean(
          this.filteredEntiteesagrees.slice(prevOffset, this.limitentiteagree + prevOffset).length
        )
      },
      //essences
      filteredEssences() {
          return this.essences.filter((essence) => essence.NOMUSUEL.toLocaleLowerCase().includes(this.searchEssence.toLocaleLowerCase()))
      },
      paginatedEssences() {
        return this.filteredEssences.slice(this.offsetEssences, this.limitEssences + this.offsetEssences)
      },
      hasNextPageEssences() {
        const nextOffset = this.offsetEssences + this.limitEssences
        return Boolean(
          this.filteredEssences.slice(nextOffset, this.limitEssences + nextOffset).length
        )
      },
      hasPrevPageEssences() {   
        const prevOffset = this.offsetEssences - this.limitEssences
        return Boolean(
          this.filteredEssences.slice(prevOffset, this.limitEssences + prevOffset).length
        )
      }
   },

   watch: {
    "inventaire.entiteagree"(value){
      if(!php.empty(value)){
        this.notSetEntiteagree= false
      } 
      else{
        this.notSetEntiteagree= true
      }
    },
  },
   data: () => ({
      notSetEntiteagree:false,
      section: 'inventaire',
      submitted: false,
      submittedcontinue: false,
      showOverlay:true,
      shoverlayentites:false,
      inventaire:{
        typetitre: "",
        numtitre:"",
        exercicefiscal:"",
        entiteagree: ""
      },
      searchentiteagree:'',
      offsetentiteagree:0,
      limitentiteagree: 10,
      
      searchEssence:'',
      offsetEssences:0,
      limitEssences:10,
      //données du tableaux
      fields: [ 
        { key: 'index', label: '' },{ key: 'codebarre', label: 'Code barre' },{ key: 'sequence', label: 'Séquence' },
        { key: 'nomcommercial', label: 'Nom commercial', thStyle:{width:'15%'} },{ key: 'diametretige', label: 'Diamètre tige' },{ key: 'numbloc', label: 'N° de bloc' },{ key: 'nouc', label: 'N° UC' },
        { key: 'notige', label: 'N° Tige' },{ key: 'qualite', label: 'Qualité', thStyle:{width:'8%'} },{ key: 'zone', label: 'Zone', thStyle:{width:'5%'} },{ key: 'utmx', label: 'UTM X' },{ key: 'utmy', label: 'UTM Y' },{ key: 'volume', label: 'volume' },
        { key: 'action', label: '',thStyle: { width: "5%" } }
      ],
      elements:[],
      isBusy:false,
      zones:[{value:'32N', libelle:'32N'}, {value:'33N', libelle:'33N'}],
      typeTitreSet:false,
      showOverlayCodeData:false,
      typesTitres:[],
      exercices:[],
      titres:[],
      entitesagrees:[],
      loadData:false,
      typesinventaires: ["Exploitation"],

      // Données du tableau
      classes:[
        {intitule: "CLASSE A", codequalite :"OA"},
        {intitule: "CLASSE B", codequalite :"OB"},
        {intitule: "CLASSE C", codequalite :"OC"},
        {intitule: "CLASSE D", codequalite :"OD"},
        {intitule: "CLASSE D", codequalite :"OD"},
        {intitule: "2ème choix", codequalite :"AA"},
        {intitule: "3ème choix", codequalite :"ZZ"}
      ],
      nomcommercials: [
        { libelle: "test 1", value: 1 },
        { libelle: "test 2", value: 2 },     
        { libelle: "test 3", value: 3 },
      ],
      
      zones: [
        { libelle: "1N", value: 1 },
        { libelle: "2N", value: 2 },
        { libelle: "3N", value: 3 },
      ], 

  }),

  methods: {
    onSearchEntiteeAgree(query){
      this.searchentiteagree = query
      this.offsetentiteagree = 0
    },
    onSearchEssence(query){
      this.searchEssence = query
      this.offsetEssences = 0
    },
    //récupération des entitées agrées à l'inventaire
    async getEntitsAgrees(){
        this.shoverlayentites=true
        console.log('entrée ici')
        if(!php.empty(this.$store.state.entitesagrees)){
            this.entitesagrees=this.$store.state.entitesagrees
        }else{
          try {
              this.entitesagrees = await this.$donneesReference.get("entites/agrees-inventaire?size=400").then(response => response.data.result.items);
              console.log('entitées agrées ',this.entitesagrees);
              this.$store.dispatch('entitesagrees', this.entitesagrees);
          } catch (error) {
          }
        }
        this.shoverlayentites=false
    },
    async getInventaireInitialData(){
        this.showOverlay=true;

        if(!php.empty(this.$store.state.typesTitres)){
          this.typesTitres=this.$store.state.typesTitres
        }
        else{
          try {
               this.typesTitres = await this.$donneesReference.get("types-titre?size=20").then(response => response.data.result.items);
               console.log('types titres',this.typesTitres);
               this.$store.dispatch('changeTypesTitres', this.typesTitres)
          } catch (error) {
              console.log(error.message);
          }
        }
        
        this.showOverlay=false;
      },
      
      async  getNumTitres(){
        if(!php.empty(this.inventaire.typetitre)){
          //this.typeTitreSet =true
          this.loadData = true
          this.inventaire.numtitre=""
          this.titres= await this.$titres.get("titres/"+this.inventaire.typetitre.code+"?size=400").then(response => response.data.result.items);
          console.log('titres ',this.titres);
          this.loadData = false
        }
      },


     fermer() {this.$router.back()},
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
  
      async AddField () {
        //s'il y'a pas d'essences je les charge au travers de l'api
        if(php.empty(this.essences)){
          await this.getEssences();
        }
        this.elements.push({ codebarre: '', sequence: '', nomcommercial: "", diametretige: '', numbloc: '', nouc: '', notige: '', qualite: '', zone: '', utmx: '', utmy: '', volume: ''});
      },
      deleteAll(){
        this.fields = [{ codebarre: '', codebarresequence: '', nomcommercial: { libelle: "", value: 0 }, diametretige: '', nobloc: '', nouc: '', notige: '', qualite: '', zone: '', utmx: '', utmy: '', volume: ''}]
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
      getDates(){
         let exact = 2000 + new Date().getYear() - 100;
         for (let index = 0; index < 5; index++) {
          this.exercices.push({ libelle: exact - index, value: index + 1, },)
         }
         this.inventaire.exercicefiscal=exact
      },
      async getEssences(){
        this.showOverlayCodeData =true;
        if(!php.empty(this.$store.state.essences)){
          this.essences=this.$store.state.essences;
        }
        else{
          try {
            this.essences = await this.$donneesReference.get("essences/raw").then(response => response.data.result);
            this.$store.dispatch('essences', this.essences)
          } catch (error) {
            console.log(error.message);
          }
        }
        this.showOverlayCodeData =false;
      },
      onRowSelected(items) {
        console.log('row selected',items);
      },
  },
   async mounted() {
      await this.getInventaireInitialData();
      this.getDates();
      this.toggleSideBar();
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
.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
      /* Font */
  --vs-font-size: 0.65rem;
  --vs-line-height: 1.2;
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
.custumSigifTab {
  float: left;
  background-position: top;
  box-sizing: border-box;
  white-space: nowrap;
  border-top: 1px solid #82C138;
  border-left: 1px solid #82C138;
  border-right: 1px solid #82C138;
  padding: 0px 5px 0px 7px;
  border-bottom: none;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  line-height: 19px;
  margin-top: 0px;
  background-color: #82C138;
  color:#fff;
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

#vs6__combobox {
border: red solid 5px !important;
height: 20px !important;
display: none !important;
}

</style>
