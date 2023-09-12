<template>
    <div>
        <b-overlay rounded="sm" :show="showOverlay">
            <b-row>
            <b-col>
                <div class="p-1">
                    <h5 style="font-weight:bold">Edition des CITES</h5>
                </div>
            </b-col>
            <b-col class="col-md-auto">
                <span>
                    <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                    <button style="cursor:pointer" v-else :disabled="!dataToSet" :class="{'change-opacity':!dataToSet}" @click.prevent="postData" size="sm"   class="mx-1 px-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</button>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="cursor:pointer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                </span>
            </b-col>
            </b-row>
            <b-row>
                    <b-col cols="6">
                        <b-form-group class="p-0 m-0"
                            label-cols="5"
                            label-align="right"
                        >
                            <template #label>
                                <div class="label-form">
                                    <span style="color:red">*</span><span>Numéro Permis CITES</span>
                                </div>
                            </template>
                            <b-input v-model="form.numcites" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label-cols="5"
                            label-align="right"
                        >
                            <template #label>
                                <div class="label-form">
                                    <span style="color:red">*</span><span>Numéro Timbre CITES</span>
                                </div>
                            </template>
                            <b-input v-model="form.numtimbrecites" size="sm" class="form-control" style="height:calc(1em + .300rem + 1px) !important"></b-input>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label-cols="5"
                            label-align="right"
                        >
                            <template #label>
                                <div class="label-form">
                                    <span style="color:red">*</span><span>Numéro Feuillet</span>
                                </div>
                            </template>
                            <b-input v-model="form.numfeuillet" size="sm" class="form-control" style="height:calc(1em + .300rem + 1px) !important"></b-input>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label-cols="5"
                            label-align="right"
                        >
                            <template #label>
                                <div class="label-form">
                                    <span style="color:red">*</span><span>Entité forestière</span>
                                </div>
                            </template>
                            <v-select :options="paginatedEntites" v-model="form.entite" @search="onSearchEntites" label="intitule" class="custom-select-type_titre">
                                <template #option="{ intitule, sigle, adresse }">
                                    <span class="font-weight-bold text-dark">{{ intitule }}</span>
                                    <br />
                                <span class="text-muted">{{ sigle }} - {{ adresse }}</span>
                                </template>
                                <li slot="list-footer" class="pagination">
                                    <button :disabled="!hasPrevPageEntites" @click="offsetEntites -= limitEntites">Prèc.</button>
                                    <button :disabled="!hasNextPageEntites" @click="offsetEntites += limitEntites">Suiv.</button>
                                </li>
                            </v-select>
                        </b-form-group>
                        <b-form-group class="p-0 m-0" label-cols="5" label-align="right" v-if="form.entite!=null&&form.entite!=''">
                            <template #label>
                                <div class="label-form">
                                    <span>Marteau/Sigle</span>
                                </div>
                            </template>
                            <span >{{ form.entite.sigle }}</span>
                        </b-form-group>
                        <b-form-group class="p-0 m-0" label-cols="5" label-align="right" v-if="form.entite!=null&&form.entite!=''">
                            <template #label>
                                <div class="label-form">
                                    <span>Adresse titulaire</span>
                                </div>
                            </template>
                            <span >{{ form.entite.adresse }}</span>
                        </b-form-group>
                        <b-form-group class="p-0 m-0"
                            label-cols="5"
                            label-align="right"
                        >
                            <template #label>
                                <div class="label-form">
                                    <span style="color:red">*</span><span>Numéro du permis</span>
                                </div>
                            </template>
                            <v-select @input="getEssences" :options="paginatedPermis" v-model="form.numpermis" @search="onSearchPermis" label="numpermis" class="custom-select-type_titre">
                                <template #option="{ numpermis, datesignature, numtitre }">
                                    <span class="font-weight-bold text-dark">{{ numpermis }}</span>
                                    <br />
                                <span class="text-muted">{{ datesignature }} - {{ numtitre }}</span>
                                </template>
                                <li slot="list-footer" class="pagination">
                                <button :disabled="!hasPrevPagePermis" @click="offsetPermis -= limitPermis">Prèc.</button>
                                <button :disabled="!hasNextPagePermis" @click="offsetPermis += limitPermis">Suiv.</button>
                                </li>
                            </v-select>
                        </b-form-group>
                        <b-form-group class="p-0 m-0" label-cols="5" label-align="right" v-if="form.numpermis!=null&&form.numpermis!=''">
                            <template #label>
                                <div class="label-form">
                                    <span>Date du permis</span>
                                </div>
                            </template>
                            <span >{{ form.numpermis.datesignature }}</span>
                            <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                        </b-form-group>
                        <b-form-group class="p-0 m-0" label-cols="5" label-align="right" v-if="form.numpermis!=null&&form.numpermis!=''">
                            <template #label>
                                <div class="label-form">
                                    <span>Numéro du titre</span>
                                </div>
                            </template>
                            <span>{{ form.numpermis.numtitre }}</span>
                        </b-form-group>


                        <!--2e PARTIE: DONNEES DU PERMIS-->
                        <transition enter-active-class="animated zoomIn">
                            <b-overlay rounded="sm" :show="showOverlayEssences">
                                <div v-if="firstStepOk" class="mt-2">
                                    <b-form-group class="p-0 m-0" label-cols="5" label-align="right">
                                        <template #label>
                                            <div class="label-form"><span style="color:red">*</span><span>Type de produit</span></div>
                                        </template>
                                        <select v-model="form.typeproduit" name="typeproduits" class="m-0 p-0"  style="width:35%;font-size:1rem; border-radius:0.25rem; height: calc(1em + .400rem) !important;">
                                            <option v-for="(type, index) in typesproduits" :value="type.value" :key="index" :selected="index==0" >{{ type.libelle }}</option>
                                        </select>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0" label-cols="5" label-align="right">
                                        <template #label>
                                            <div class="label-form"><span style="color:red">*</span><span>Essence</span></div>
                                        </template>
                                        <v-select @input="getLocation" :options="filteredEssences" v-model="form.essence" :filterable="false" @search="onSearch" label="NOMUSUEL" class="custom-select-type_titre">
                                            <template #option="{ NOMUSUEL, NOMSCIENTIFIQUE }">
                                            <span class="font-weight-bold text-dark">{{ NOMUSUEL }}</span>
                                            <br />
                                            <span class="text-muted">{{ NOMSCIENTIFIQUE }}</span>
                                            </template>
                                        </v-select>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"  label-cols="5" label-align="right" v-if="form.essence!=null&&form.essence!=''">
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom scientifique</span>
                                            </div>
                                        </template>
                                        <span>{{ form.essence.NOMSCIENTIFIQUE }}</span>
                                    </b-form-group>
                                </div>
                            </b-overlay>
                        </transition>

                    


                        <!--3e PARTIE: DONNEES DE LA LOCALISATION-->
                        <transition enter-active-class="animated zoomIn">
                            <div v-if="secondStepOk" class="mt-2">
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right">
                                    <template #label>
                                        <div class="label-form"><span style="color:red">*</span><span>Pays de provenance</span></div>
                                    </template>
                                    <v-select :options="paginatedPays" v-model="form.paysprovenance" :reduce="pays  => pays.idpays" :filterable="false" @search="onSearch" label="nom" class="custom-select-type_titre">
                                        <template #option="{ nom }">
                                        <span class="font-weight-bold text-dark">{{ nom }}</span>
                                        </template>
                                        <li slot="list-footer" class="pagination">
                                            <button :disabled="!hasPrevPagePays" @click="offsetPays -= limitPays">Prèc.</button>
                                            <button :disabled="!hasNextPagePays" @click="offsetPays += limitPays">Suiv.</button>
                                        </li>
                                    </v-select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right">
                                        <template #label>
                                            <div class="label-form"><span style="color:red">*</span><span>Pays de destination</span></div>
                                        </template>
                                        <v-select :options="paginatedPays" v-model="form.paysdestination" :reduce="pays  => pays.idpays" :filterable="false" @search="onSearch" label="nom" class="custom-select-type_titre">
                                            <template #option="{ nom }">
                                            <span class="font-weight-bold text-dark">{{ nom }}</span>
                                            </template>
                                            <li slot="list-footer" class="pagination">
                                                <button :disabled="!hasPrevPagePays" @click="offsetPays -= limitPays">Prèc.</button>
                                                <button :disabled="!hasNextPagePays" @click="offsetPays += limitPays">Suiv.</button>
                                            </li>
                                        </v-select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right">
                                    <template #label>
                                        <div class="label-form"><span style="color:red">*</span><span>Destinataire</span></div>
                                    </template>
                                    <b-input v-model="form.destinataire" size="sm" class="form-control" style="height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2"  label-cols="5" label-align="right">
                                    <template #label>
                                        <div class="label-form"><span style="color:red">*</span><span>Adresse destinataire</span></div>
                                    </template>
                                    <b-input v-model="form.addressedestinataire" size="sm" class="form-control" style="width:170%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right">
                                    <template #label>
                                        <div class="label-form"><span style="color:red">*</span><span>SOURCE ANNEXE</span></div>
                                    </template>
                                    <b-input v-model="form.sourceannexe" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Date signature CITES</span>
                                        </div>
                                    </template>
                                    <input v-model="form.datesignaturecite" type="date" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important" />
                                </b-form-group>
                                <b-form-group class="p-0 m-0 my-2" label-cols="5" label-align="right" v-if="form.datesignaturecite!=null&&form.datesignaturecite!=''">
                                    <template #label>
                                        <div class="label-form"><span>Date de fin de validité</span></div>
                                    </template>
                                    <label>{{ form.datefin }}</label>
                                </b-form-group>
                            </div>
                        </transition>

                    
                    </b-col>
                    <b-col cols="5">
                        <!--4e PARTIE: AUTRES INFORMATIONS-->
                        <transition enter-active-class="animated zoomIn">
                            <div v-if="thirdStepOk" class="mt-2">
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Numéro de l'expédition</span>
                                        </div>
                                    </template>
                                    <b-input v-model="form.numexpedition" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Volume à exporter</span>
                                        </div>
                                    </template>
                                    <b-input v-model="form.volumeaexporte" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span>Quotas annuel</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{ quotaannuel }}</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right" >
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Quantité</span>
                                        </div>
                                    </template>
                                    <b-input v-model="form.quantite" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Quantité exportée</span>
                                        </div>
                                    </template>
                                    <b-input v-model="form.quantiteexporte" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Volume total</span>
                                        </div>
                                    </template>
                                    <b-input v-model="form.volumetotal" size="sm" class="form-control" style="width:50%;height:calc(1em + .300rem + 1px) !important"></b-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7"  label-align="right" >
                                    <template #label>
                                        <div class="label-form">
                                            <span style="color:red">*</span><span>Attacher le CITES</span>
                                        </div>
                                    </template>
                                    <input type="file" @change="selectFileCertificat"/>
                                    <div class="upload-container" :class="{'border-danger-date': notsetFileCertificat }">
                                        <label>
                                          <input type="file" @change="selectFileCertificat"/>
                                          <b-img src="@/assets/images/download.png"></b-img>
                                          <span v-if="filecertificat" class="file-name">{{ filecertificat.name }}</span>
                                          <span v-else class="title">cliquer pour choisir</span>
                                          
                                        </label>
                                    </div>
                                </b-form-group>
                                <b-form-group class="p-0 m-0" label-cols="7" label-align="right">
                                    <template #label>
                                        <div class="label-form">
                                            <span>Status</span>
                                        </div>
                                    </template>
                                    <b-form-checkbox size="sm"></b-form-checkbox>
                                </b-form-group>
                            </div>
                        </transition>
                    </b-col>
            </b-row>
        </b-overlay>
    </div>
   
</template>
<script>
    import { mapGetters } from 'vuex'
    const php = require('phpjs');

    export default{
        name:'create_permis-cites',
        data(){
            return{
                showOverlay:false,
                submitted:false,
                entiteswithoutminfof:[],
                searchentite:'',
                offsetEntites: 0,
                limitEntites: 10,
                permis:[],
                searchpermis:'',
                offsetPermis:0,
                limitPermis:10,
                showOverlayEssences:false,
                essences:[],
                offsetPays:0,
                limitPays:10,
                searchpays:'',
                typesproduits: [
                    { libelle: "Grume", value: 'GR' },
                    { libelle: "Débité", value: 'CL' },
                    { libelle: "Produits spéciaux", value: 'PS' },
                ], 
                permis:[],
                pays:[],
                setLocationData:false,
                form:{
                    numcites: "", //id organisation 
                    numtimbrecites: "",
                    numpermis: '',
                    numfeuillet: "",
                    quantite: '',
                    entite: '',
                    destinataire: "",
                    paysprovenance: '',
                    quotasannuel: '',
                    datedebut: "",
                    datefin: "",
                    datepermis: "",
                    datesignaturecite:"",
                    numpieces: '',
                    volumetotal: '',
                    volumeaexporte: '',
                    quantiteexporte: '',
                    numexpedition:"",
                    numtitre:"",
                    sourceannexe:"",
                    addressedestinataire:"",
                    essence: '',//idessence
                    paysdestination:'',
                    typeproduit:"",
                    fichier: '',
                    filecites:null
                },
                filecertificat:null,
                notsetFileCertificat:false
            }
        },
        watch:{
            "form.datesignaturecite"(value){
                if(!php.empty(value)){
                    let dt = new Date(this.form.datesignaturecite);
                    let no_of_months = 6;
                    dt.setMonth(dt.getMonth() + no_of_months)
                    console.log('dt ',dt, 'datesignature ',this.form.datesignaturecite);

                    this.form.datefin= this.$dayjs(dt).format('DD/MM/YYYY')

                }
            }
        },
        computed:{
            ...mapGetters(['user','hasAccess']),
            quotaannuel(){
                return this.form.volumeaexporte *12
            },
            firstStepOk(){
                if(!php.empty(this.form.numcites)&&!php.empty(this.form.numtimbrecites)&&!php.empty(this.form.numfeuillet)&&!php.empty(this.form.entite)&&!php.empty(this.form.numpermis)){
                    return true;
                }
                return false
            },
            secondStepOk(){
                if(!php.empty(this.form.typeproduit)&&!php.empty(this.form.essence)){
                    return true;
                }
                return false
            },
            thirdStepOk(){
                if(!php.empty(this.form.paysprovenance)&&!php.empty(this.form.paysdestination)&&!php.empty(this.form.destinataire)&&!php.empty(this.form.addressedestinataire)&&!php.empty(this.form.sourceannexe)&&!php.empty(this.form.datesignaturecite)){
                    return true;
                }
                return false
            },
            fourthStepOk(){
                if(php.empty(this.form.numexpedition)||php.empty(this.form.volumeaexporte)||php.empty(this.form.quantite)||php.empty(this.form.quantiteexporte)||php.empty(this.form.volumetotal)){
                    return false;
                }
                return true
            },
            dataToSet(){
                return true;
                if(this.firstStepOk&&this.secondStepOk&&this.thirdStepOk&&this.fourthStepOk){
                    return true;
                }
                return false
            },
            /*propriétés liées aux accèes*/
            filteredEntites() {
                return this.entiteswithoutminfof.filter((entite) =>
                    entite.intitule.toLocaleLowerCase().includes(this.searchentite.toLocaleLowerCase())
                )
            },
            paginatedEntites() {
                return this.filteredEntites.slice(this.offsetEntites, this.limitEntites + this.offsetEntites)
            },
            hasNextPageEntites() {
                const nextOffset = this.offsetEntites + this.limitEntites
                return Boolean(
                    this.filteredEntites.slice(nextOffset, this.limitEntites + nextOffset).length
                )
            },
            hasPrevPageEntites() {   
                const prevOffset = this.offsetEntites - this.limitEntites
                return Boolean(
                    this.filteredEntites.slice(prevOffset, this.limitEntites + prevOffset).length
                )
            },
            //proprietés permis
            filteredPermis() {
                return this.permis.filter((permis) =>
                    permis.numpermis.toLocaleLowerCase().includes(this.searchpermis.toLocaleLowerCase())
                )
            },
            paginatedPermis() {
                return this.filteredPermis.slice(this.offsetPermis, this.limitPermis + this.offsetPermis)
            },
            hasNextPagePermis() {
                const nextOffset = this.offsetPermis + this.limitPermis
                return Boolean(
                    this.filteredPermis.slice(nextOffset, this.limitPermis + nextOffset).length
                )
            },
            hasPrevPagePermis() {   
                const prevOffset = this.offsetPermis - this.limitPermis
                return Boolean(
                    this.filteredPermis.slice(prevOffset, this.limitPermis + prevOffset).length
                )
            },
            //essences
            filteredEssences(){
                return this.essences.filter(elt => elt.QUOTAS=='1')
            },
            //pays
            //proprietés permis
            filteredPays() {
                return this.pays.filter((pays) =>
                    pays.nom.toLocaleLowerCase().includes(this.searchpays.toLocaleLowerCase())
                )
            },
            paginatedPays() {
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
           
        },
        methods:{
            async selectFileCertificat(e){
                const filecertificat = this.filecertificat =  e.target.files[0];
                this.form.fichier=await this.getBase64(filecertificat)
            },
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            },
            async postData() {

                let data={
                    numcites: this.form.numcites,   numtimbrecites: this.form.numtimbrecites,  numpermis: this.form.numpermis.idpermis, numfeuillet: this.form.numfeuillet,  quantite: this.form.quantite,  entite: this.form.entite.idorganisation, 
                    destinataire: this.form.destinataire,
                    paysprovenance: this.form.paysprovenance, quotasannuel: this.form.quotasannuel, datesignaturecite:this.form.datesignaturecite,
                    volumetotal: this.form.volumetotal,  volumeaexporte: this.form.volumeaexporte, quotasannuel: this.quotaannuel, quantiteexporte: this.form.quantiteexporte, 
                    numexpedition:this.form.numexpedition, sourceannexe:this.form.sourceannexe,
                    addressedestinataire:this.form.addressedestinataire, essence: this.form.essence, paysdestination:this.form.paysdestination, typeproduit:this.form.typeproduit, essence:this.form.essence.IDESSENCE,
                    fichier:this.form.fichier
                }
       
                this.submitted = true 
                this.$exportations.post('cites', data).then(response => {
                    this.submitted = false 
                    App.notifySuccess(response.data.message)
                    return this.$router.push({ name: "permis_cites" });
                }).catch(error => {
                    this.submitted = false
                    this.errorHappened(error)
                })
            },
            //récupération des essences
            async getEssences(){
                this.showOverlayEssences=true;
                if (!php.empty(this.$store.state.essences) ) {
                    this.essences = this.$store.state.essences;
                    this.showOverlayEssences=false;
                } 
                else {
                    try {
                        this.essences= await this.$donneesReference.get("essences/raw").then(response => response.data.result);
                        this.$store.dispatch('essences', this.essences)
                        this.showOverlayEssences=false;
                    } catch (error) {
                        App.notifyError(error.message);
                    }
                }
            },
            
            //recupération des données sur la localisation
            async getLocation(){
                this.showOverlayPays=true;
                if (!php.empty(this.$store.state.pays)) {
                    this.pays = this.$store.state.pays;
                } 
                else {
                    try {
                        this.pays= await this.$donneesReference.get("pays?size=150").then(response => response.data.result.items);
                        this.$store.dispatch('pays', this.pays)
                    } catch (error) {
                    App.notifyError(error.message);
                    }
                }
                this.showOverlayPays=false;
            },
            //récupération de la liste des entités ==> au chargement de la page
            async getcreationData(){
                this.showOverlay=true;
                if (!php.empty(this.$store.state.entiteswithoutminfof)) {
                    this.entiteswithoutminfof = this.$store.state.entiteswithoutminfof;
                    console.log('entite 1',this.entiteswithoutminfof);

                } 
                else {
                    try {
                    this.entiteswithoutminfof= await this.$donneesReference.get("entites/entite_forestier").then(response => response.data.result.items);
                    this.$store.dispatch('entiteswithoutminfof', this.entiteswithoutminfof)
                    console.log('entite 2',this.entiteswithoutminfof);

                    } catch (error) {
                    App.notifyError(error.message);
                    }
                }
                if (!php.empty(this.$store.state.permisvalides)) {
                    this.permis = this.$store.state.permisvalides;
                } 
                else {
                    try {
                    this.permis= await this.$permis.get("permis/permisValide").then(response => response.data.result.Items);
                    this.permis.map( elt =>{
                        elt.datesignature = elt.datesignature!==null ? this.$dayjs(elt.datesignature).format('DD-MM-YYYY'):''
                    })
                    console.log('permis 2',this.permis);

                    this.$store.dispatch('permisvalides', this.permis)
                    } catch (error) {
                    App.notifyError(error.message);
                    }
                }
                this.showOverlay=false;
            },
            onSearchEntites(query){
                this.searchentite = query
                this.offsetEntites = 0
            },
            onSearchPermis(query){
                this.searchpermis = query
                this.offsetPermis = 0
            },
            fermer(){
                this.$router.back()
            },
            onSearch(query) {
                this.search = query
                this.offset = 0
            },
            getEntities(){
                this.$donneesReference.get('')
            },
         
    },
    mounted(){
        this.getcreationData()
    }
    }
</script>
<style>
.upload-container label input {
    display: none;
  }
     .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }
    a:hover{
        color:black;
    }
    .label-form{
        margin-top:-8px;
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
        .change-opacity{
            opacity:0.5
        }
</style>