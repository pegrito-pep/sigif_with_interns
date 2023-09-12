<template>
    <div>
        <b-overlay :show="showOverlay" rounded="sm">
            <div class="m-0">
                <tab-head
                    :fermer="fermer"
                    :disabledModifier="disabledModifier"
                    :disabledSupprimer="disabledSupprimer"
                    :disabledEnregistrer="disabledEnregistrer"
                    :enregistrer="enregistrer"
                    :nouveau="nouveau"
                    :canAddNew="canAddNew"
                    title="Assiette de la concession n°"
                    :idElement="idElement"
                >
                </tab-head> 
                <div class="ml-3 mb-0" style="border-top:3px solid green;border-bottom: 3px solid green;">
                    <b-row>
                        <b-col cols="7">
                            <b-form-group class="p-0 m-0"
                                label="Superficie du titre"
                                label-cols="3"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ (titreDetailsAac.superficietitre) }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Titre n°"
                                label-cols="3"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.numtitre }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Entité forestière"
                                label-cols="3"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.entiteforestierer }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Marteau"
                                label-cols="3"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.marteau }}</label>
                            </b-form-group>
                            <div>
                                <b-form-group class="p-0 m-0"
                                label="UFA n°"
                                label-cols="3"
                                label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>UFA n°
                                    </template>
                                    <select  v-model="form.numUfa" @change="showSupUfa" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfa}">
                                        <option v-for="(elt,i) in numUfas2" :key="i" :value="elt.idUfa">{{ elt.numUfa }}</option>
                                    </select>
                                    <select v-else disabled class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;">
                                        <option selected :value="selectedUfa ? selectedUfa.idUfa:''">{{ selectedUfa ? selectedUfa.numUfa:'' }}</option>
                                    </select>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Superficie UFA"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <input type="number" disabled v-model="form.supUfa" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <input disabled type="text" v-else :value="selectedUfa?(selectedUfa.superficiUfa):''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>UFE n°
                                    </template>
                                    <select  v-model="form.numUfe" @change="showSupUfe" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfa}">
                                        <option v-for="(elt,i) in numUfes" :key="i" :value="elt.idufe">{{ elt.numufe }}</option>
                                    </select>
                                    <select v-else disabled class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;">
                                        <option selected :value="selected ? selected.numufe:''">{{ selected ? selected.numufe:'' }}</option>
                                    </select>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Superficie UFE"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <input type="number" disabled v-model="form.supUfe" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <input disabled type="text" v-else :value="selected?(selected.superficieufe):''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Assiette"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Assiette
                                    </template>
                                    <input type="text" v-model="form.assiette" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetAssiette}"/>
                                    <input v-else  type="text" disabled :value="selected ? selected.numAac :''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Superficie assiette"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Superficie assiette
                                    </template>
                                    <input type="text" v-model="form.supassiette" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetSuperficieAssiette}"/>
                                    <input v-else  type="text" disabled :value="selected ? selected.superficieAac:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Année d'exploitation"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Année d'exploitation
                                    </template>
                                    <input type="number" v-model="form.annee" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetAnnee}"/>
                                    <input v-else  type="number" disabled :value="selected ? selected.annee:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                </b-form-group>
                            </div>
                            
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col cols="8">
                                    <h6 class="pt-1" style="font-weight: bold;border-bottom:1px solid black;">Superficie de l'UFA 
                                        <b-button size="sm" @click.prevent="ajouter" class=" simple-btn" :disabled="!showNewForm">
                                            <b-img src="@/assets/images/iconPLUS_16x16.png">

                                            </b-img>
                                            Ajouter
                                        </b-button>
                                        <b-button size="sm" class=" simple-btn" :disabled="!showNewForm">
                                            <b-img src="@/assets/images/iconSUPPRIMER_16x16.png">

                                            </b-img>
                                            Supprimer
                                        </b-button>
                                    </h6>
                                    <div v-if="showNewForm">
                                        <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablelocalisationufa" selectable
                                        :items="itemssuperficie2" 
                                        :fields="fields_superficie_UFA" 
                                        :tbody-tr-class="rowClass" >
                                          <template #table-busy>
                                            <div class="text-center text-success my-2">
                                              <b-spinner class="align-middle"></b-spinner>
                                              <strong class="ml-1">chargement...</strong>
                                            </div>
                                          </template>
                                          <template #cell(arrondissement)="data">
                                            <v-select class="custom-select-type_titre" :options="paginated2" v-model="data.item.arrondissement" :reduce="elt=>elt.idarrondissement"  :filterable="false" @search="onSearch2" label="intitule">
                                                <template #option="{ intitule }">
                                                    <span class="font-weight-bold text-dark">{{ intitule }}</span>
                                                </template>
                                                <li slot="list-footer" class="pagination">
                                                    <button :disabled="!hasPrevPage2" @click="offset2 -= limit2">Prèc.</button>
                                                    <button :disabled="!hasNextPage2" @click="offset2 += limit2">Suiv.</button>
                                                </li>
                                            </v-select>
                                          </template>
                                          <template #cell(superficie)="data">
                                            <input size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right"  v-model="data.item.superficie" type="number"/>
                                          </template>
                                          <template #cell(action)="data">
                                            <b-button size="sm" class="d-flex justify-content-center" @click.prevent="RemouveField(data.index)" variant="outline-danger"><i class="ik ik-trash-2"></i></b-button>
                                          </template>
                                        </b-table>
                                    </div>
                                    <div v-else>
                                        <b-table :busy="isBusy" hover select-mode="single" responsive="sm" ref="selectableTablelocalisationufa" selectable
                                        :items="itemssuperficie" 
                                        :fields="fields_superficie_UFA" 
                                        :tbody-tr-class="rowClass" >
                                          <template #table-busy>
                                            <div class="text-center text-success my-2">
                                              <b-spinner class="align-middle"></b-spinner>
                                              <strong class="ml-1">chargement...</strong>
                                            </div>
                                          </template>
                                          <template #cell(index)=data>
                                            <span>{{ ++data.index }}</span>
                                          </template>
                                          <template #cell(arrondissement)="data">
                                            <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-left"  style="background-color:white!important" v-model="data.item.arrondissement" />
                                          </template>
                                          <template #cell(superficie)="data">
                                            <input disabled size="xs" class="w-75 mx-1 px-1 sigif-input-view text-right" :value="formatAmount(data.item.superficie)" />
                                          </template>
                                        </b-table>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <div class="p-3 m-0">
                    <b-row class="mt-0 p-0">
                        <b-col cols="6">
                            <b-table v-model="currentItemUfa"  ref="selectableTableufa" select-mode="single" responsive="sm" hover  selectable 
                                @row-selected="onRowSelected" :tbody-tr-class="rowClass"
                                :items="itemsufa" :fields="fields">
                                <template #cell(numufa)="data">
                                    <span>{{ data.item.numufa }}</span>
                                </template>
                                <template #cell(numufe)="data">
                                    <span>{{ data.item.numufe }}</span>
                                </template>
                                <template #cell(assiette)="data">
                                    <span>{{ (data.item.assiette) }}</span>
                                </template>
                                <template #cell(superficie)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.superficie }}</span>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </b-overlay>
        <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
    </div>
    
</template>
<script>
import { mapGetters } from 'vuex'
import TabHead from '@/components/TabHead.vue'
import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
import php from 'phpjs'
export default{

    data(){
        return{
            showOverlay:false,
            titreDetailsUfa:undefined,
            titreDetailsAac:undefined,
            numUfas2:[],
            numUfes:[],
            elementssuperficie:[],
            elementssuperficie2:[],
            elementsufa:[],
            isBusy:false,
            disabledModifier:true,
            disabledSupprimer:true,
            disabledEnregistrer:false,
            fields_superficie_UFA:[
                {key:'index',label:'',thStyle:{width:'10px'}},
                {key:'arrondissement',label:'Arrondissement'},
                {key:'superficie',label:'Superficie(ha)'},
                {key:'action',label:'Action'}
            ],
            fields:[
                {key:'numufa',label:'UFA n°',thStyle:{color:'#4c9a2a'}},
                {key:'numufe',label:'UFE n°',thStyle:{color:'#4c9a2a'}},
                {key:'assiette',label:'Assiette',thStyle:{color:'#4c9a2a'}},
                {key:'superficie',label:'Superficie',thStyle:{color:'#4c9a2a'}},
            ],
            elements:[],
            form:{
                
            },
       
            isRowselected:false,
            selected:{},
            canAddUFA:true,
            canDeleteUFA:true,
            showNewForm:false,
            arrondissements:[],
            search:'',
            offset: 0,
            limit: 10,
            search2:'',
            offset2: 0,
            limit2: 10,
            isUfa:false,
            entite:{

            },
            limitesUfa:'',
            idElement:'',
            notSetNumUfa:false,
            notSetSupUfa:false,
            notSetLimitesUfa:false,
            notSetAssiette:false,
            notSetSuperficieAssiette:false,
            notSetAnnee:false,
            canAddNew:true,
            selectedUfa:null,
            ufas:[],
            currentItemUfa:[],
            indexRowSelectedUfa:0,
            aacs:[],
            selectedUfe:[],
            selectedAac:[],
            selected:{},
            numUfa:''
        }
    },
    components:{
        TabHead, CodeBarreInfo
    },
    computed:{
        ...mapGetters(['user','hasAccess']),
        isMinfof(){ 
            if(this.user.idOrganisation==0||this.user.typeOrganisation=='MF'){
                return true;
            }else{
                return false;
            }
        },
        itemsufa(){
            return this.elementsufa?.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            })
        },
        itemssuperficie(){
            return this.elementssuperficie.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            })
        },
        itemssuperficie2(){
            return this.elementssuperficie2.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            })
        },

        filtered() {
            return this.arrondissements.filter((a) => a.intitule.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()))
        },
        paginated() {
            return this.filtered.slice(this.offset, this.limit + this.offset)
        },
        hasNextPage() {
            const nextOffset = this.offset + this.limit
            return Boolean(
            this.filtered.slice(nextOffset, this.limit + nextOffset).length
            )
        },
        hasPrevPage() {   
            const prevOffset = this.offset - this.limit
            return Boolean(
            this.filtered.slice(prevOffset, this.limit + prevOffset).length
            )
        },
        filtered2() {
            return this.arrondissements.filter((a) => a.intitule.toLocaleLowerCase().includes(this.search2.toLocaleLowerCase()))
        },
        paginated2() {
            return this.filtered2.slice(this.offset2, this.limit2 + this.offset2)
        },
        hasNextPage2() {
            const nextOffset = this.offset2 + this.limit2
            return Boolean(
            this.filtered2.slice(nextOffset, this.limit2 + nextOffset).length
            )
        },
        hasPrevPage2() {   
            const prevOffset = this.offset2 - this.limit2
            return Boolean(
            this.filtered2.slice(prevOffset, this.limit2 + prevOffset).length
            )
        },
        
    },
    watch: {
      itemsufa(value){
        if(value.length>0){
            setTimeout(() => {this.$refs['selectableTableufa'].selectRow(0) }, 200);
        }
      },
    //   itemssuperficie(value){
    //     if(value.length>0){
    //         setTimeout(() => {this.$refs['selectableTablelocalisationufa'].selectRow(0) }, 200);
    //     }
    //   },
      "form.numUfa"(value){
        if(!php.empty(value)){
            this.notSetNumUfa=false
        }else{
            this.notSetNumUfa=true
        }
      },
      "form.assiette"(value){
        if(!php.empty(value)){
            this.notSetSuperficieAssiette=false
        }else{
            this.notSetSuperficieAssiette=true
        }
      },
      "form.supassiette"(value){
        if(!php.empty(value)){
            this.notSetAssiette=false
        }else{
            this.notSetAssiette=true
        }
      },
  },
    methods:{
        checkForm(){
            if(this.showNewForm){
                if(php.empty(this.form.numUfa)){
                    this.notSetNumUfa=true
                    let error={ message:'Veuillez renseigner le n° d\'UFA'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.assiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supassiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.annee)){
                    this.notSetAnnee=true
                    let error={ message:'Veuillez renseigner l\'année'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(this.elementssuperficie2.length===0 || this.elementssuperficie2.some(x=>php.empty(x.arrondisement) && php.empty(x.superficie))){
                    let error={ message:'Veuillez renseigner la localisation de l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
            }
        },
        showSupUfa(){
            console.log(this.titreDetailsAac)
            console.log('numUfa',this.form.numUfa)
            // this.numUfa=this.numUfas2.find(elt=>elt.idUfa===this.form.numUfa).numUfa
            // console.log('numUfa',this.numufa)
            this.form.supUfa=this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===(this.numUfas2.find(elt=>elt.idUfa===this.form.numUfa)).numUfa).superficiUfa
            console.log(this.form.supUfa)
        },
        showSupUfe(){
            console.log(this.titreDetailsAac)
            console.log('numUfe',this.form.numUfe)
            // this.numUfa=this.numUfas2.find(elt=>elt.idUfa===this.form.numUfa).numUfa
            // console.log('numUfa',this.numufa)
            console.log('selectedufe',this.selectedUfe)
            console.log('numufes',this.numUfes)
            // this.form.supUfe=this.selectedUfe.find(elt=>elt.numufe===(this.numUfes.find(elt=>elt.idUfe===Number(this.form.numUfe))).numufe).superficieUfe
            this.form.supUfe=this.selectedUfe.find(elt=>elt.numufe===(this.numUfes.find(elt=>elt.idufe===Number(this.form.numUfe))).numufe).superficieUfe
            console.log(this.form.supUfe)
        },
       
        onRowSelectedufa(items) {
            this.indexRowSelectedUfa = items.map(item => this.currentItemUfa.indexOf(item));
            for(let i=0; i<items.map(item => this.currentItemUfa.indexOf(item)).length;i++){
            this.indexRowSelectedUfa =items.map(item => this.currentItemUfa.indexOf(item))[i]
            }    
        },
        async getFileBase64(e){
            this.form.limitesString=await this.$getBase64(e.target.files[0])
            // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
            console.log(this.form.limitesString)
        },
        async enregistrer(){
            this.showOverlay=true
            if(this.showNewForm){
                if(php.empty(this.form.numUfa)){
                    this.notSetNumUfa=true
                    let error={ message:'Veuillez renseigner le n° d\'UFA'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.assiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supassiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.annee)){
                    this.notSetAnnee=true
                    let error={ message:'Veuillez renseigner l\'année'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(this.elementssuperficie2.length===0 || this.elementssuperficie2.some(x=>php.empty(x.arrondisement) && php.empty(x.superficie))){
                    let error={ message:'Veuillez renseigner la localisation de l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
            }
            try{
                let superficies=[]
                const id=this.$route.params.id
                if(this.elementssuperficie2.length){
                    superficies=this.elementssuperficie2.map(elt=>{
                        return{
                            idarrondisement:elt.arrondissement,
                            superficie:Number(elt.superficie)
                        }
                    })
                    console.log(this.elementssuperficie2)
                    console.log('superficies',superficies)
                    // this.elementssuperficie2.push(superficies)

                }
                const data={
                    numUfa:Number(this.form.numUfa),// qui est l'id du titreUfa obligatoire
                    numAac:Number(this.form.assiette), // long obligatoire
                    numUfe:Number(this.form.numUfe),
                    superficieAssiete:Number(this.form.supassiette), //Long
                    anneeExploitation:this.form.annee.toString(), //String
                    superficie:superficies
                }
                this.aacs.unshift(data)
                this.elementsufa.unshift({
                    numufa:this.form.numUfa,
                    numufe:this.form.numUfe,
                    assiette:this.form.assiette,
                    superficie:this.form.supassiette
                })
                await this.$titres.post('titres/aac',{
                    // superficieTitre:this.titreDetailsUfa.superficie, // valeur long
                    // numTitre:Number(id) ,// la valeur a prendre est l'id du titre obligatoire
                    // entiteForestiere:this.entite.idorganisation, // long valeur encore a regarder
                    // numUfa:this.form.numUfa, // string obligatoire
                    // superficieUfa:Number(this.form.supufa), // long
                    // limiteufa:this.form.limitesString, // base64 obligatoire
                    // superficie:superficies
                    
                    numTitre:Number(id) ,// la valeur a prendre est l'id du titre obligatoire
                    aacs:this.aacs

                }).then(response=>{
                    this.disabledEnregistrer=true
                    this.showOverlay=false
                    let message={ message:'AAC créée avec succès'}
                    return this.sendAlertMessage(message);
                    // this.$router.push({name:'concession_en_cp_UFA', params: { id }})
                })
            }catch(error){
                console.log(error)
                this.showOverlay=false
            }
        },
        RemouveField(index){
            this.elementssuperficie2.splice(index, 1);
        },
        async sendAlertMessage(error){
            const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error.message,
            })
            //If you throw an error, the method will terminate here unless you surround it wil try/catch
            if (ok) {
                this.$refs.codebarreinfo._close();
            } else {
                this.$refs.codebarreinfo._close();
            }
      } ,
        ajouter(){
            // this.elementssuperficie2=[...this.elementssuperficie]
            if(php.empty(this.form.assiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supassiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.annee)){
                    this.notSetAnnee=true
                    let error={ message:'Veuillez renseigner l\'année'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
            this.elementssuperficie2.unshift({arrondissement:'',superficie:''})
            // console.log(this.elementssuperficie2)
            // this.selectedUfa.titresuperficies=this.elementssuperficie2
        },
        onSearch(query) {
            this.search = query
            this.offset = 0
        },
        onSearch2(query) {
            this.search2 = query
            this.offset2 = 0
        },
        nouveau(){
            console.log(this.showNewForm)
            console.log(this.form.limites)
            if(this.showNewForm){
                if(php.empty(this.form.numUfa)){
                    this.notSetNumUfa=true
                    let error={ message:'Veuillez renseigner le n° d\'UFA'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.assiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supassiette)){
                    this.notSetAssiette=true
                    let error={ message:'Veuillez renseigner l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.annee)){
                    this.notSetAnnee=true
                    let error={ message:'Veuillez renseigner l\'année'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(this.elementssuperficie2.length===0 || this.elementssuperficie2.some(x=>php.empty(x.arrondisement) && php.empty(x.superficie))){
                    let error={ message:'Veuillez renseigner la localisation de l\'assiette'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                let elt={numufa :'', superficie:'', limiteufa:'' }
                // this.elementsufa.splice(this.indexRowSelectedUfa-1,0,elt)
                this.elementsufa.push({
                    numufa: this.form.numUfa,
                    numufe:this.form.numUfe,
                    assiette:this.form.assiette,
                    superficie:this.form.supassiette
                })


            // this.resetForm()

                // this.titreDetailsUfa.titreUfa.push({
                //     numUfa:this.form.numUfa,
                //     superficieUfa: Number(this.form.supufa),
                //     limiteUfa: this.form.limitesString,
                //     titresuperficies:this.elementssuperficie2,
                // })
                // this.ufas.push({
                //     numUfa:this.form.numUfa,
                //     superficieUfa: Number(this.form.supufa),
                //     limiteUfa: this.limitesUfa,
                //     titresuperficies:this.elementssuperficie2,
                // })
                // console.log('titredetails',this.titreDetailsUfa.titreUfa)
                // console.log('ufas',this.ufas)
                this.showNewForm=true
                this.resetForm()
            }else{
                this.showNewForm=true
            }
        },
        resetForm(){
            this.form.assiette=''
            this.form.supassiette=''
            this.form.annee
        },
        rowClass(item, type) {
            if(item !=''&&item!=null){
            if (item.isEven) return 'table-row-other'
            if (!item || type !== 'row') return 'table-info'
            }else{
            return 
            }
        },
        fermer(){
            this.$router.push({name:'concession_en_cp'})
        },
        formatAmount(n){
            var parts = n.toString().split(".");
            const numberPart = parts[0];
            const decimalPart = parts[1];
            const thousands = /\B(?=(\d{3})+(?!\d))/g;
            return numberPart.replace(thousands, " ") + (decimalPart ? "," + decimalPart : " ");
        },
        async getInitialData() {
            this.showOverlay = true
            let superficie2
            if(!php.empty(this.$store.arrondissements)){
                this.arrondissements=this.$store.arrondissements
            }else{
                if(!php.empty(this.$store.state.arrondissements)){
                    this.arrondissements=this.$store.state.arrondissements
                }else{
                    this.arrondissements=await this.$donneesReference.get('arrondissements/raw')
                    .then(response=>{
                        let arrondissements=response.data.result.Items.map(elt=>{
                            return{
                                idarrondissement:elt.idarrondissement,
                                intitule:elt.intitule
                            }
                        })
                        return arrondissements
                    })
                    this.$store.dispatch('arrondissements', this.arrondissements)
                    console.log(this.arrondissements)
                }
            }
            this.titreDetailsUfa = []
            this.titreDetailsAac = await this.$titres.get('titre_convenssion/detailcpAac/' +this.$route.params.id)
                .then(response => {
                    return response.data.result
                })
                .catch(err=>{console.log(err);this.showOverlay=false})
            this.elementssuperficie2=[]
            
            console.log(this.titreDetailsAac)
            this.idElement=this.titreDetailsAac?.numtitre
            if(this.titreDetailsAac.titreUfa?.length===0){
                this.isUfa=false
            }else{
                this.isUfa=true
            }
            
            this.numUfas2=this.titreDetailsAac.titreufa?.map(elt=>{
                return{
                    idUfa:elt.idUfa,
                    numUfa:elt.numUfa
                }
            })
            console.log('numufas',this.numUfas2)
            this.selectedUfa = this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===this.numUfas2[0].numUfa)
            
            console.log('selectedUfa',this.selectedUfa)
           
           
            if(php.empty(this.selectedUfa)){
                this.showOverlay=false
                let message={ message:'Il n\'existe pas d\'UFA pour ce titre'}
                this.canAddNew=false
                return this.sendAlertMessage(message);
            }
            this.selectedUfe=(this.selectedUfa?.titreufe)
            console.log('selectedUfe',this.selectedUfe)
            if(this.selectedUfe.length===0){
                this.showOverlay=false
                let message={ message:'Il n\'existe pas d\'UFE pour ce titre'}
                return this.sendAlertMessage(message);
            }
            
            this.numUfes=this.selectedUfe.map(elt=>{
                return{
                    idufe:elt.idufe,
                    numufe:elt.numufe
                }
            })
            console.log('numufes',this.numUfes)
            this.selected.numufe=this.selectedUfe[0].numufe
            this.selected.superficieufe=this.selectedUfe[0].superficieUfe
            this.selectedAac=this.selectedUfe[0].titreaac
            this.elementssuperficie=this.selectedAac[0].titresuperficies
            this.selected.numAac=this.selectedAac[0].numaac
            this.selected.annee=this.selectedAac[0].anneExploittion
            this.selected.superficieAac=this.selectedAac[0].superficieAac
            // console.log('selectedufa',this.selectedUfa)

            const objUfas=this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===this.selectedUfa.numUfa)
            console.log('objUfas',objUfas)
            
            console.log('eltsuperf2',this.elementssuperficie2)
            console.log('eltsuperf',this.elementssuperficie)
            for(const elt of objUfas.titreufe){
                let obj
                for(const el of elt.titreaac){
                    obj={
                        numufa:this.selectedUfa.numUfa,
                        numufe:elt.numufe,
                        assiette:el.numaac,
                        superficie:el.superficieAac
                    }
                    this.elementsufa.push(obj)
                }
                
            }
            
            // console.log('titresaac',titresAac)
            const nbAssiettes=this.selectedAac.length
            console.log('nbassiettes',nbAssiettes)
            
            // this.elementsufa=[]
            // console.log('elmtufa',this.elementsufa)

            // console.log(this.titreDetailsUfa.titreUfa)
            // if(this.titreDetailsUfa.titreUfa.length!==0) {
            //     this.elementsufa=this.titreDetailsUfa.titreUfa.map(elt=>{
            //         return{
            //             numufa:elt.numUfa,
            //             superficie:elt.superficieUfa,
            //             limiteufa:elt.limiteUfa
            //         }
            //     })
            //     const numUfas=this.elementsufa.map(elt=>elt.numufa)
            //     const numAacs=this.titreDetailsAac.map(elt=>elt.numUfa)
            //     this.selectedUfa = this.titreDetailsUfa.titreUfa.find(elt=>elt.numUfa===numUfas[0])
            //     let tableau=[]
            //     tableau=this.selectedUfa?.limiteUfa.split('/')
            //     this.limitesUfa=tableau[tableau.length -1]
            //     console.log('elmtUfas',this.elementsufa)
            //     this.elementsufa.forEach(elt=>{
            //         let tableau=[]
            //         tableau=elt.limiteufa?.split('/')
            //         console.log('tab',tableau)
            //         elt.limiteufa=tableau ? tableau[tableau?.length -1]:''
            //     })
            //     this.elementssuperficie=this.selectedUfa.titresuperficies
                // const limites=this.selectedUfa.limiteUfa.split('/')
                // this.limitesUfa= this.selectedUfa.limiteUfa.split('/')[this.selectedUfa.limiteUfa.length-1]
                
                //  console.log(this.elementssuperficie)
                // console.log(this.titreDetailsUfa.ufaDtos)
                if(nbAssiettes>=5){
                    this.showOverlay=false
                    this.canAddNew=false
                    let message={ message:'Le quota d\'assiettes est atteint pour ce titre'}
                    return this.sendAlertMessage(message);
                }
                this.showOverlay=false
        },
        onRowSelected(items) {
            console.log('row selected',items);
            items.isSelected =true;
            this.isRowselected=true
            // this.selected = items
            
            if(!this.showNewForm){
                // this.selectedUfa = this.titreDetailsUfa.titreUfa.find(elt=>elt.numUfa===items[0]?.numufa)
                // this.selectedUfa = this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===items[0]?.numufa)
                // console.log('selectedUfa',this.selectedUfa)
                // this.selected=this.selectedUfa.titreaac.find(elt=>elt.numaac===Number(items[0].assiette))
                // console.log('selected',this.selected)
                if(this.selected){
                    // this.selected.numAac=items[0]?.assiette
                    // this.selected.superficie=items[0]?.superficie
                    // console.log(this.titreDetailsUfa.titreUfa)
                    // this.elementssuperficie=this.elementssuperficie2
                    // console.log(this.selected)
                    // console.log(this.elementssuperficie)
                    // console.log(this.elementssuperficie2)
                    // console.log(this.limitesUfa)
                    // this.elementssuperficie=this.selected.titresuperficies
                    // console.log('eltsuperficies',this.elementssuperficie)
                    // console.log(this.elementssuperficie)
                }
            }
        }
    },
    mounted() {
        if(!this.isMinfof){
            this.entite.libelle=this.user.profil.organisation
            this.entite.idorganisation=this.user.idOrganisation
        }
        this.getInitialData();
    },
}
</script>
<style scoped>
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

.sigif-input-view{
    background:#82C138!important;
    border:1px solid white;
    font-size:0.75rem !important;
    font-weight: 300;
    height: calc(1em + .500rem + 1px) !important;
    border-radius: .2rem;
}
.label-form{
    display:inline-block;
    margin-top: 7px;
}
.detail-permis-item {
    color: #175131!important;
}
.detail-permis-item:hover{
    text-decoration: underline;
}

.default-old-system-input-properties{
    font-weight: normal;
    border-color: #637A95;
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    border-radius: 3px;
    background-color: White;
    color: #333333;
    border: 1px solid #637A95;
    padding: 1px 2px 1px 3px;
    margin: 1px;
    width: 170px;
    overflow-x: hidden;
    overflow-y: auto;
    font-family: 'verdana';
    font-size: 13px;
    height: 20px;
}

.default-old-system-input-properties-file{
    height: 20px;
    width: 250px;
}

.custom-select-type_titre{
--vs-dropdown-option--active-bg: #82C138;
--vs-dropdown-option--active-color: #fff;
  --vs-selected-color: #1f1c1c;
  --vs-controls-size: 1;
      /* Font */
  --vs-font-size: 0.55rem;
  --vs-line-height: 0.38;
  --vs-dropdown-option-padding: 10px 15px;
  --vs-actions-padding: 0px 0 0 0px;

}

.styleToSet{
  border: 2px solid red;
}
</style>