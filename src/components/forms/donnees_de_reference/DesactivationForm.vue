<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlay">
            <b-row>
               <b-col cols="5">
                    <label for="" class="m-0 p-0" style="font-weight:300">Bien vouloir choisir l'Organisation concernée</label>
                </b-col>
                <b-col cols="7">
                    <div>
                        <v-select @input="getSitesForEntite"  :options="paginated" v-model="entite" :filterable="false" @search="onSearch" label="intitule" class="custom-select-type_titre">
                            <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPage" @click="offset -= limit">Prèc.</button>
                                <button :disabled="!hasNextPage" @click="offset += limit">Suiv.</button>
                            </li>
                        </v-select>
                    </div>
                </b-col>
            </b-row>
            
            <div v-if="sites.length>0">
                <b-row class="container mt-2 justify-content-between">
                    <b-col cols="4">
                        <div class="d-flex justify-content-center align-items-center">
                            <b-form-group class="mt-2">
                                <b-form-checkbox class="font-weight-bold" v-model="allSelected" @change="toggleAll">{{ allSelected ? 'Tout deselectionner' : 'Tout selectionner' }}</b-form-checkbox>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="d-flex justify-content-center align-items-center">
                            <b-form-group class="mt-2">
                                <b-form-checkbox class="font-weight-bold" v-model="pf"  @change="filterSites('Parc forêt')">rien que les Parcs Foret</b-form-checkbox>
                            </b-form-group>
                        </div>
                    </b-col>
                    <b-col cols="4">
                        <div class="d-flex justify-content-center align-items-center">
                            <b-form-group class="mt-2">
                                <b-form-checkbox class="font-weight-bold" v-model="pr" @change="filterSites('Parc rupture')">rien que les Parcs Ruptures</b-form-checkbox>
                            </b-form-group>
                        </div>
                    </b-col>
                </b-row>
                <b-table-simple :sortable="true" class="mb-1 p-0"   hover small responsive style="border: 1px solid black!important">
                    <b-tbody>
                    <b-tr>
                        <b-th class="border m-0 text-center" style="width: 15%">Sélectionner</b-th>
                        <b-th class="border m-0 text-center">Intitulé du Site</b-th>          
                        <b-th class="border m-0 text-center">Type de Site</b-th>          
                    </b-tr>
                        <b-tr v-for="site in items" :key="site.idsite">
                            <b-td class="border text-center">
                                <b-form-checkbox v-model="site.selected"></b-form-checkbox>   
                            </b-td>
                            <b-td class="border px-2">
                                <span class="d-inline-block w-100 text-center">{{ site.intitulesite }}</span>
                            </b-td>
                            <b-td class="border px-2">
                                <span class="d-inline-block w-100 text-center">{{ site.libeletypesite }}</span>
                            </b-td>
                        </b-tr>
                                
                        </b-tbody>
                </b-table-simple>
                <paginator  hr="top" :offset="offsetP" :total="sites.length" :limit="perPage" :page="currentPage" @pageChanged="(page) => {currentPage = page}" @limitChanged="(limit) => {perPage = limit}" /> 
            </div>
 
                <hr>
                <b-button @click.prevent="valider" class="float-right mt-2" style="background: rgb(0, 82, 44) !important; " :disabled="submitted" >Enregistrer <b-spinner v-if="submitted" small></b-spinner></b-button>
                <error-dialogue ref="errorDialogue"></error-dialogue>
        </b-overlay>
    </div>
</template>

<script>
const php = require('phpjs');
import ErrorDialogue from '@/components/utils/AlertBox.vue';
import Vue from 'vue'
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
import { Validator } from "vee-validate";
  import { mapGetters } from 'vuex'
export default {
    name:"site-form",
    components:{ ErrorDialogue},
     computed: {

        selectedSites() {
        return this.sites.filter(elt => elt.selected).map(elt => elt.idsite)
        },
        items() { 
            return php.array_slice(this.sites, this.offsetP, this.perPage) 
        },

        offsetP() {
            return (this.currentPage * this.perPage) - this.perPage
        },

        filtered(){
        return this.entites.filter((entite) => entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase()))

        },
        paginated(){
          return this.filtered.slice(this.offset, this.limit + this.offset)
        },
        hasNextPage(){
          const nextOffset = this.offset + this.limit
          return Boolean(
            this.filtered.slice(nextOffset, this.limit + nextOffset).length
          )
        },
        hasPrevPage(){   
          const prevOffset = this.offset - this.limit
          return Boolean(
            this.filtered.slice(prevOffset, this.limit + prevOffset).length
          )
        },

     },

     watch: {
      "form.idregion"(value) {
        if(value!==null&&value.length!==''){
            this.disableDep= false
        }
        else{
            this.disableDep= true
        }
     },
     "form.iddepartement"(value) {
        if(value!==null&&value.length!==''){
            this.disableArrond= false
        }
        else{
            this.disableArrond= true
        }
     },
   
    },
     data: () => ({
        pf:false,
        pr:false,
        showOverlay: false,
        currentPage: 1,
        perPage: 15,
        offset: 0,
        limit: 10,
        searchentite:'',
        allSelected:false,
        entites:[],
        sites:[],
        entite:null,
        submitted:false,
        form: {
            typesiteoper: "Permis spécial",
            intitule:'',
            utmzone: "3N",
            utmx: "",
            utmy: "",
            attachautorisation: "",
            certificatexportateurfile:"",
            exercice: "2022",
            statut:false,
            idregion: null,
            iddepartement: null,
            idarrondissement: null,
            typetitre:"",
            localite:"",
            idorganisation:"",
            idaac:"",
            typesiteminfof:""
        },
        fields: [
            { key: 'idsite', label: '' },
            { key: 'intitule', label: 'Nom du site' },   
            { key: 'libeletypesite', label: 'Type de Site' }    
        ],
       
    }),

    methods: {
        filterSites(type){
            console.log('entrée ici filtre 1',this.pf,' pr', this.pr);
            this.sites.filter(elt =>{
                elt.typesite==type
                return elt;
            })
        },
        onSearch(query) {
            this.searchentite = query
            this.offset = 0
        },
        valider(){
            this.submitted = true 
            this.$donneesReference.post('sites/desactiversite', {idsites:this.selectedSites}).then(response => {
                this.submitted = false 
                this.$emit('desactivationOk')
                return App.notifySuccess(response.data.message)
            }).catch(error => {
                this.submitted = false
                console.log('erreur site',error.message)
                this.errorHappened(error)
            })
        },

        async getSitesForEntite(){
            this.showOverlay=true;
            try {
              this.sites = await this.$donneesReference.get("sites/listesiteorg/"+this.entite.idorganisation).then(response => response.data.result.Items);
          
              console.log('sites new',this.sites);
                this.showOverlay=false
            } catch (error) {
                console.log(error.message);
            }

           
  
        },
        getEntiteForestieres(){
            this.showOverlay=true

            this.$donneesReference.get("entites/entite_forestier").then(response => {

                this.entites=response.data.result.Items
                this.showOverlay=false
            })
            .catch((error) => {
                console.log(error)
                this.showOverlay=false
            });

        },
        toggleAll(checked){
            this.sites = this.sites.map(elt => ({...elt, selected: checked}))
        },
        rowClass(item, type) {
            if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
            }else{
            return 
            }
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
        async addSite(){
            this.$validator.validateAll().then(result => {if (!result) {return;}
            if(!this.form.typesiteoper){this.requiredTysite=true; return;}
            else{this.requiredTysite=false;}
            console.log('user', this.user.idOrganisation);
            this.submitted = true
            this.form.idorganisation=this.user.idOrganisation //set de l'id de l'organisation
            console.log("data site", this.form)
                this.$donneesReference.post('sites', this.form).then(response => {
                    this.submitted = false 
                    this.$emit('siteAdded',response)
                    this.resetForm()
                    return App.notifySuccess(response.data.message)
                }).catch(error => {
                    this.submitted = false
                    console.log('erreur site',error.message)
                    this.errorHappened(error)
                })
            })
        },
       
    },
     mounted() {
        this.getEntiteForestieres();
        this.sites = this.sites.map(elt => ({...elt, selected: this.entites.includes(elt.intitulesite)}))
    },

}
</script>
<style >
.setwidth>input{
    width: 154px!important;
}
.custom-file-input~.custom-file-label[data-browse]::after {
    content: 'choisir';
}
.custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
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