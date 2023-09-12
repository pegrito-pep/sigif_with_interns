<template>
    <div id="cover" class="min-vh-100">
        <b-overlay rounded="sm" :show="showOverlay">
            <template #overlay>
                <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p id="cancel-label">Chargement...</p>
                </div>
            </template>
            <b-row class="ml-2" style="border-bottom: 2px solid green">
              <b-col class="pb-1 m-1" >
                <h4 class="tab-header-left-text">
                    <button id="toggleSideBar" @click="toggleSideBar"><i class="fa fa-arrow-left" style="font-size: 18px"></i></button>
                    <span class="form_title">Création BSE n°</span>
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
                    <b-col cols="6">
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;">Entité forestière</span>
                            </b-col>
                            <b-col cols="8">
                                <span>LES ETABLISSEMENTS KAKOUANDE ET FILS SARL</span>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;">SIGLE</span>
                            </b-col>
                            <b-col cols="8">
                                <span>KF</span>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;">Adresse expéditeur</span>
                            </b-col>
                            <b-col cols="8">
                                <span>227 BERTOUA</span>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Exercice</span>
                            </b-col>
                            <b-col cols="8">
                                <select  class="default-old-system-select-properties" style="width:15%" >
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
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Type de produit</span>
                            </b-col>
                            <b-col cols="8">
                                <select type="text" class="default-old-system-select-properties" style="width:40%">
                                    <option value=""></option>
                                    <option value="g">Grume</option>
                                    <option value="d">Débités</option>
                                    <option value="ps">Produit spécial</option>
                                </select>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Numéro d'enregistrement</span>
                            </b-col>
                            <b-col cols="8">
                                <span></span>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Date de demande</span>
                            </b-col>
                            <b-col cols="8">
                                <input type="date" placeholder="dd/mm/yyyy" class="default-old-system-select-properties" style="width:50%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>N° Contrat</span>
                            </b-col>
                            <b-col cols="8">
                                <input type="text"  class="default-old-system-select-properties" style="width:50%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-2">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Pays d'Origine</span>
                            </b-col>
                            <b-col class="mb-1">
                                <v-select value="CAMEROUN" style="height:calc(1em + .800rem + 1px)" class="custom-select-type_titre"></v-select>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-2">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Pays de destination</span>
                            </b-col>
                            <b-col class="mb-1">
                                <v-select class="custom-select-type_titre" :options="paginatedPays" :filterable="false" @search="onSearchPays"  @open="getPays"
                                    label="nom" v-model="pays" style="width:100%"
                                    >
                                    <li slot="list-footer" class="pagination">
                                        <button :disabled="!hasPrevPagePays" @click="offsetPays-=limitPays">Prev</button>
                                        <button :disabled="!hasNextPagePays" @click="offsetPays+=limitPays">Next</button>
                                    </li>
                                </v-select>
                                <!-- <v-select style="height:calc(1em + .800rem + 1px)" class="custom-select-type_titre"></v-select> -->
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-2">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Site d'exportation</span>
                            </b-col>
                            <b-col class="mb-1">
                                <v-select @open="getSites" style="height:calc(1em + .800rem + 1px)" class="custom-select-type_titre"
                                    :options="paginatedSites" v-model="form.site"
                                    filterable @search="onSearch"
                                    label="INTITULE"
                                >
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageSites" @click="offsetSites -= limitSites">Prèc.</button>
                                    <button :disabled="!hasNextPageSites" @click="offsetSites += limitSites">Suiv.</button>
                                </li> 
                                </v-select>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Port de débarquement</span>
                            </b-col>
                            <b-col cols="8">
                                <input type="text"  class="default-old-system-select-properties" style="width:100%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="4">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span title="Obligatoire" class="xf">*</span>Moyen de transport</span>
                            </b-col>
                            <b-col cols="8">
                                <select type="text" class="default-old-system-select-properties" style="width:40%">
                                    <option value=""></option>
                                    <option value="t">Terrestre</option>
                                    <option value="f">Ferroviaire</option>
                                    <option value="m">Maritime</option>
                                </select>
                            </b-col>
                        </b-row>
                    </b-col>
                    <b-col>
                        <b-row class="mx-2 my-1">
                            <b-col cols="6">
                                <span  style="color: #333333; display: flex; justify-content: end;">Email autorités douanières destination</span>
                            </b-col>
                            <b-col cols="6">
                                <input type="text" class="default-old-system-select-properties" style="width:75%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="6">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span class="xf">*</span>Mode de conditionnement</span>
                            </b-col>
                            <b-col cols="6">
                                <input type="text" class="default-old-system-select-properties" style="width:75%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="6">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span class="xf">*</span>Nom du destinataire</span>
                            </b-col>
                            <b-col cols="6">
                                <input type="text" class="default-old-system-select-properties" style="width:75%"/>
                            </b-col>
                        </b-row>
                        <b-row class="mx-2 my-1">
                            <b-col cols="6">
                                <span  style="color: #333333; display: flex; justify-content: end;"><span class="xf">*</span>Adresse du destinataire</span>
                            </b-col>
                            <b-col cols="6">
                                <input type="text" class="default-old-system-select-properties" style="width:75%"/>
                            </b-col>
                        </b-row>
                        <b-row>
                        </b-row>
                    </b-col>
                </b-row>
            </div>
            <div class="px-2">
                  <b-row style="border-bottom:1px solid green">
                      <b-col cols="2"><h4 class="tab-header-left-text" style="font-size: 14px !important;">Liste des produits</h4></b-col>
                      <b-col class="liens">
                        <a style="cursor: pointer" @click.prevent="ajouterProduits" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img>Ajouter</a>
                        <a style="cursor: pointer" @click.prevent=""  class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                        <a style="cursor: pointer" class="mx-1 simple-btn"><b-img class="mr-1" src="@/assets/images/excel.png"></b-img>Importer</a>
                      </b-col>
                  </b-row>
                  <b-row>
                    <b-col style="position:relative;overflow-x:auto;width:995px">
                        <b-table
                            :items="items"
                            :fields="fields"
                            :tbody-tr-class="rowClass"
                            @row-selected="onRowSelected"
                            selectable
                            ref="selectableTable"
                            :busy="isBusy"
                             style="position:relative;width:125%"
                        >
                        <template #table-busy>
                            <div class="text-center text-success my-2">
                                <b-spinner class="align-middle"></b-spinner>
                                <strong class="ml-1">chargement...</strong>
                            </div>
                        </template>
                        <template #cell(index)="data">
                            <span class="font-weight-bold">{{ ++data.index }}</span>
                        </template>
                        <template #cell(actions)>
                            <b-button size="sm" class="d-flex justify-content-center"  title="enlever" @click.prevent="remouveFields(data.item.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                        </template>
                        <template #cell(codebarre)="data">
                            <b-form-input class="sigif-input-view" style="height:calc(1em + 0.300rem + 1px)">{{ data.item.codebarre }}</b-form-input>
                        </template>
                        <template #cell(essence)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.essence }}</b-form-input>
                        </template>
                        <template #cell(diampb)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.diampb }}</b-form-input>
                        </template>
                        <template #cell(diamgb)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.diamgb }}</b-form-input>
                        </template>
                        <template #cell(longueur)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.longueur }}</b-form-input>
                        </template>
                        <template #cell(codecemac)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.codecemac }}</b-form-input>
                        </template>
                        <template #cell(codesh)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.codesh }}</b-form-input>
                        </template>
                        <template #cell(poids)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.poids }}</b-form-input>
                        </template>
                        <template #cell(volume)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.volume }}</b-form-input>
                        </template>
                        <template #cell(nrosel)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.nrosel }}</b-form-input>
                        </template>
                        <template #cell(nrocontainer)="data">
                            <b-form-input class="sigif-input-view" disabled style="height:calc(1em + 0.300rem + 1px)">{{ data.item.nrocontainer }}</b-form-input>
                        </template>
                        </b-table>
                    </b-col>
                  </b-row>
            </div>
        </b-overlay>
    </div>
</template>

<script>
const php=require('phpjs')
export default{
    data(){
        return{
            showOverlay:false,
            submitted:false,
            isBusy:false,
            fields:[
                    {key:'index',label:'',thStyle:{color:'green',width:'4px'}},
                    {key:'codebarre',label:'Codes à barres',thStyle:{color:'green',width:'7px'}},
                    {key:'essence',label:'Essences',thStyle:{color:'green',width:'5px'}},
                    {key:'diampb',label:'Diamètre petit bout',thStyle:{color:'green',width:'5px'}},
                    {key:'diamgb',label:'Diamètre gros bout',thStyle:{color:'green',width:'5px'}},
                    {key:'longueur',label:'Longueur(m)',thStyle:{color:'green',width:'3px'}},
                    {key:'codecemac',label:'Code CEMAC',thStyle:{color:'green',width:'5px'}},
                    {key:'codesh',label:'Code SH',thStyle:{color:'green',width:'5px'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green',width:'5px'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green',width:'5px'}},
                    {key:'nrosel',label:'N° SEL',thStyle:{color:'green',width:'5px'}},
                    {key:'nrocontainer',label:'N° Container',thStyle:{color:'green',width:'5px'}},
                    {key:'actions',label:'Actions',thStyle:{color:'green',width:'3px'},}
            ],
            elements:[],
            selected:'',
            sites:[],
            searchsite: '',
            offsetSites: 0,
            limitSites: 10,
            form:{
                site:''
            },
            // pays
            pays:'',
            searchPays:'',
            offsetPays:0,
            limitPays:5,
            paysAll:[],
            showOverlayPays:false,
        }
    },
    methods:{
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
            this.$router.push({name: 'demande_bse'})
        },
        postData(){

        },
        ajouterProduits(){
            this.elements.push({codebarre:''})
        },
        rowClass(item, type) {
            if (item != "" && item != null) {
                if (item.isEven) return "table-row-other";
                if (!item || type !== "row") return "table-info";
            } else {
                return;
        }
        },
        onRowSelected(items) {
            console.log("row selected", items);
            items.isSelected = true;
            this.isRowselected = true;
            
            this.selected = items;
            if (!php.empty(this.selected[0])) {
                if(this.selected[0].statutenr=='Brouillon'){
                this.isToValidate=true
                this.isToSubmit=false
                }
                else if(this.selected[0].statutenr=='Validée'){
                this.isToValidate=false
                this.isToSubmit=true
                }
                else{
                this.isToValidate=false
                this.isToSubmit=false
                }
            }
        },  
        async getSites(){
            this.showOverlay=true
            if(!this.$store.state.sitesnoutbs){
                this.sites=this.$store.state.sitesnoutbs;
            }
            else{
                try {
                    this.sites =  await this.$donneesReference.get("sites/no-utb").then(response => response.data.result);
                    this.$store.dispatch('sitesnoutbs', this.sites)
                } catch (error) {
                    console.log(error.message);
                }
            }
            this.showOverlay=false;
        },
        onSearch(){

        },
        remouveFields(index){
            this.sites.splice(index,1)
        },
        onSearchPays(query){
    this.searchPays = query
    this.offsetPays = 0
  },
  async getPays(){
    this.showOverlayPays=true
    if(!php.empty(this.$store.state.pays)){
      console.log('entrée dans le store')
      
      this.paysAll=this.$store.state.pays
      console.log(this.paysAll)
      this.showOverlayPays=false
    }else{
      // await this.$donneesReference.get('pays',{})
      console.log('requête vers API')
      await this.$donneesReference.get('pays')
        .then(response=>{
          this.paysAll=response.data.result.items
          console.log(this.paysAll)
          this.$store.dispatch('pays',this.paysAll)
        })
        .catch(err=>console.log(err))
      this.showOverlayPays=false
    }
  },
    },
    computed:{
        items(){
            return this.elements.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            });
        },
        filteredSites() {
            return this.sites.filter((site) => site.INTITULE.toLocaleLowerCase().includes(this.searchsite.toLocaleLowerCase()))
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
        // pays
        filteredPays() {
            return this.paysAll;
      return this.paysAll.filter((pays) =>
      pays.nom.toLocaleLowerCase().includes(this.searchPays.toLocaleLowerCase())
      )
    },
    paginatedPays(){
      return this.filteredPays.slice(this.offsetPays, this.limitPays + this.offsetPays)
    },
    hasNextPagePays() {
      const nextOffset = this.offsetPays + this.limitPays
      return Boolean(
        this.filteredPays.slice(nextOffset, this.limitPays + nextOffset).length
      )
    },
    hasPrevPagePays() {
      const prevOffset = this.offsetPays - this.limitPays
      return Boolean(
        this.filteredPays.slice(prevOffset, this.limitPays + prevOffset).length
      )
    },
    }
}
</script>
<style scoped>
    #cover {
        background-image: url('~@/assets/images/logo_sigif_trame.png');
        background-size: 40vw 80vh;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
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
    .form_title{
        font-family: 'Verdana';
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }
    .xf{
        margin-right: 3px;
        font-family: 'Verdana';
        font-weight: normal;
        font-size: 13px;
        color: Red;
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
    .custom-select-type_titre{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
        --vs-selected-color: #1f1c1c;
            /* Font */
        --vs-font-size: 0.65rem;
        --vs-line-height: 1.2;
    }
    .sigif-input-view{
        background:#82C138!important;
        border:1px solid white;
        font-size:0.75rem !important;
        font-weight: 300;
        height: calc(1em + .500rem + 1px) !important;
        border-radius: .2rem;
    }
</style>
