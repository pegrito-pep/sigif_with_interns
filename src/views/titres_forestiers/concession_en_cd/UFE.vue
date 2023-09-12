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
                    title="UFE de la concession n°"
                    :idElement="idElement"
                >
                </tab-head> 
                <div class="ml-3 mb-0" style="border-top:3px solid green;border-bottom: 3px solid green;">
                    <b-row>
                        <b-col cols="7">
                            <b-form-group class="p-0 m-0"
                                label="Superficie du titre"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ (titreDetailsAac.superficietitre) }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Titre n°"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.numtitre }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Entité forestière"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.entiteforestierer }}</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Marteau"
                                label-cols="6"
                                label-align="right"
                            >
                                <label class="label-form" v-if="titreDetailsAac!=null">{{ titreDetailsAac.marteau }}</label>
                            </b-form-group>
                            <div>
                                <b-form-group class="p-0 m-0"
                                label="UFA n°"
                                label-cols="6"
                                label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>UFA n°
                                    </template>
                                    <select  v-model="form.numUfa" @change="showSupUfa" v-if="showNewForm" class="w-5 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfa}">
                                        <option v-for="(elt,i) in numUfas2" :key="i" :value="elt.idUfa">{{ elt.numUfa }}</option>
                                    </select>
                                    <select v-else disabled class="w-5 mt-2  default-old-system-input-properties" style="background-color:#eee;">
                                        <option selected :value="selectedUfa ? selectedUfa.idUfa:''">{{ selectedUfa ? selectedUfa.numUfa:'' }}</option>
                                    </select>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Superficie UFA(ha)"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <input type="number" disabled v-model="form.supUfa" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" />
                                    <input disabled type="text" v-else :value="selectedUfa?(selectedUfa.superficiUfa):''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                label="UFE n°"
                                label-cols="6"
                                label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>UFE n°
                                    </template>
                                    <!-- <select  v-model="form.numUfe" @change="showSupUfe" v-if="showNewForm" class="w-5 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfe}">
                                        <option v-for="(elt,i) in numUfes" :key="i" :value="elt">{{ elt }}</option>
                                    </select> -->
                                    <input type="text" v-model="form.numUfe" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfe}"/>
                                    <input v-else  type="text" disabled :value="selected.numufe" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <select  v-model="form.numUfa" @change="showSupUfa" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumUfa}">
                                        <option v-for="(elt,i) in numUfas2" :key="i" :value="elt.idUfa">{{ elt.numUfa }}</option>
                                    </select>
                                    <select v-else disabled class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;">
                                        <option selected :value="selected ? selectedUfa.idUfa:''">{{ selectedUfa ? selectedUfa.numUfa:'' }}</option>
                                    </select> -->
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >   
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Superficie UFE
                                    </template>
                                    <input type="number"  v-model="form.supUfe" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetSupUfe}"/>
                                    <input disabled type="text" v-else :value="selected ? selected.superficieUfe:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        Année d'ouverture
                                    </template>
                                    <input type="text" :disabled="okDisabled" v-model="form.newyear" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties"  style="background-color:#eee;"/>
                                    <input v-else  type="text" disabled :value="selected.anneOuverture" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        Dernière année
                                    </template>
                                    <input type="text" disabled v-model="form.lastyear" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties"  style="background-color:#eee;"/>
                                    <input v-else  type="text" disabled :value="selected.anneFermeture" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? titreDetailsUfa.numufa :'' }}</label> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Limites UFA(ha)"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Limites
                                    </template>
                                    <b-form-file v-if="showNewForm || !isUfa" v-model="form.limites" @change="getFileBase64" class="default-old-system-input-properties-file" :class="{'styleToSet':notSetLimitesUfe}" style="margin-bottom:10px;"></b-form-file>
                                    <a class="mx-1 detail-permis-item" v-else   target="_blank" :href="path+selected.limeteufe"><b-img src="@/assets/images/Attach_128x128.png"></b-img> {{selected.limeteufe}}{{ selected.limeteufe ? (!(selected.limeteufe.includes('.')) ? '.pdf':'') :''}}</a>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Arrêté d'approbation du plan quinquenal
                                    </template>
                                    <b-form-file v-if="showNewForm || !isUfa" v-model="form.plan" @change="getFile2Base64" class="default-old-system-input-properties-file" :class="{'styleToSet':notSetPlan}" style="margin-bottom:10px;"></b-form-file>
                                    <a class="mx-1 detail-permis-item" v-else   target="_blank" :href="path+selected.planquinquenal"><b-img src="@/assets/images/Attach_128x128.png"></b-img> {{selected.planquinquenal}}{{ selected.planquinquenal ? (!(selected.planquinquenal.includes('.')) ? '.pdf':'') :''}}</a>
                                </b-form-group>
                            </div>
                            
                        </b-col>
                        <b-col>
                            <b-row>
                                <b-col style="margin-top:-15px">
                                    <b-button
                                        :aria-expanded="visible1 ? 'true' : 'false'"
                                        aria-controls="collapse1"
                                        @click="visible1=!visible1" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                                        <ul style="margin:0">
                                            <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                                :class="{ 'collapse-open': visible1, 'collapse-close': !visible1 }">Parcellaire du bloc d'aménagement
                                            </li>
                                        </ul>
                                    </b-button>
                                    <b-collapse id="collapse1" v-model="visible1" class="p-0 m-0">
                                        <b-row>
                                            <b-col>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >   
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Numéro
                                                    </template>
                                                    <input type="number" v-model="form.numBloc" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumBloc}"/>
                                                    <input disabled type="text" v-else :value="selected ? selected.numPBA:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                                </b-form-group>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >   
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Date
                                                    </template>
                                                    <input type="date" v-model="form.dateBloc" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetDateBloc}"/>
                                                    <input disabled type="text" v-else :value="selected ? selected.datePBA:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                                </b-form-group>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Document
                                                    </template>
                                                    <b-form-file v-if="showNewForm || !isUfa" v-model="form.documentBloc" @change="getFile3Base64" class="default-old-system-input-properties-file" :class="{'styleToSet':notSetDocBloc}"></b-form-file>
                                                    <a class="mx-1 detail-permis-item" v-else v-b-tooltip.hover  target="_blank" :href="path+selected.documentPBA"><b-img src="@/assets/images/Attach_128x128.png"></b-img> {{selected.documentPBA}}{{ selected.documentPBA ? (!(selected.documentPBA.includes('.')) ? '.pdf':'') :''}}</a>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                    <b-button
                                        :aria-expanded="visible2 ? 'true' : 'false'"
                                        aria-controls="collapse2"
                                        @click="visible2=!visible2" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                                        <ul style="margin:0">
                                            <li style="text-align: left;padding:0;margin:0" class="font-weight-bold" 
                                                :class="{ 'collapse-open': visible2, 'collapse-close': !visible2 }">Plan de gestion quinquenal
                                            </li>
                                        </ul>
                                    </b-button>
                                    <b-collapse id="collapse2" v-model="visible2" class="p-0 m-0">
                                        <b-row>
                                            <b-col>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >   
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Numéro
                                                    </template>
                                                    <input type="number" v-model="form.numGestion" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetNumPlan}"/>
                                                    <input disabled type="text" v-else :value="selected ? selected.numPGQ:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                                </b-form-group>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >   
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Date
                                                    </template>
                                                    <input type="date" v-model="form.dateGestion" v-if="showNewForm" class="w-15 mt-2  default-old-system-input-properties" :class="{'styleToSet':notSetDatePlan}"/>
                                                    <input disabled type="text" v-else :value="selected ? selected.datePGQ:''" class="w-15 mt-2  default-old-system-input-properties" style="background-color:#eee;"/>
                                                    <!-- <label class="label-form" v-else>{{ isUfa ? (titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie): ''):''}}</label> -->
                                                    <!-- <label class="label-form" v-else>{{ titreDetailsUfa ? formatAmount(titreDetailsUfa.superficie):'' }}</label> -->
                                                </b-form-group>
                                                <b-form-group class="p-0 m-0"
                                                    label-cols="3"
                                                    label-align="right"
                                                >
                                                    <template #label>
                                                        <span v-if="showNewForm" style="color:red;font-weight: bold;">*</span>Document
                                                    </template>
                                                    <b-form-file v-if="showNewForm || !isUfa" v-model="form.documentGestion" @change="getFile4Base64" class="default-old-system-input-properties-file" :class="{'styleToSet':notSetDocPlan}"></b-form-file>
                                                    <a class="mx-1 detail-permis-item" v-else v-b-tooltip.hover  target="_blank" :href="path+selected.documentPGQ"><b-img src="@/assets/images/Attach_128x128.png"></b-img> {{selected.documentPGQ}}{{ selected.documentPGQ ? (!(selected.documentPGQ.includes('.')) ? '.pdf':'') :''}}</a>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </b-collapse>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
                <div class="p-3 m-0">
                    <b-row class="mt-0 p-0">
                        <b-col>
                            <b-table v-model="currentItemUfa"  ref="selectableTableufa" select-mode="single" responsive="sm" hover  selectable 
                                @row-selected="onRowSelected" :tbody-tr-class="rowClass"
                                :items="itemsufa" :fields="fields">
                                <template #cell(numufa)="data">
                                    <span>{{ data.item.numufa }}</span>
                                </template>
                                <template #cell(index)="data">
                                    <span style="color:#175131;font-weight: bold;">{{ ++data.index }}</span>
                                </template>
                                <template #cell(numufe)="data">
                                    <span>{{ (data.item.numufe) }}</span>
                                </template>
                                <template #cell(anneeouverture)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.anneeouverture }}</span>
                                </template>
                                <template #cell(derniereannee)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.derniereannee }}</span>
                                </template>
                                <template #cell(superficieufe)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.superficieufe }}</span>
                                </template>
                                <template #cell(limites)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.limites }}</span>
                                </template>
                                <template #cell(planquinquenal)="data">
                                    <span v-if="data.item!=null"> &nbsp;{{ data.item.planquinquenal }}</span>
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
            path:'http://192.168.10.109:8080/titre/titre_convenssion/download/',
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
                {key:'index',label:'',thStyle:{color:'#000',width:'2%'}},
                {key:'numufa',label:'UFA n°',thStyle:{color:'#4c9a2a'}},
                {key:'numufe',label:'UFE n°',thStyle:{color:'#4c9a2a'}},
                {key:'anneeouverture',label:'Année d\'ouverture',thStyle:{color:'#4c9a2a'}},
                {key:'derniereannee',label:'Dernière année',thStyle:{color:'#4c9a2a'}},
                {key:'superficieufe',label:'Superficie UFE',thStyle:{color:'#4c9a2a'}},
                {key:'limites',label:'Limites',thStyle:{color:'#4c9a2a'}},
                {key:'planquinquenal',label:'Plan quinquenal de gestion',thStyle:{color:'#4c9a2a'}},
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
            notSetNumUfe:false,
            notSetSupUfe:false,
            notSetLimitesUfe:false,
            notSetPlan:false,
            notSetNumBloc:false,
            notSetDateBloc:false,
            notSetDocBloc:false,
            notSetNumPlan:false,
            notSetDatePlan:false,
            notSetDocPlan:false,
            canAddNew:true,
            selectedUfa:null,
            ufas:[],
            currentItemUfa:[],
            indexRowSelectedUfa:0,
            aacs:[],
            selectedAac:[],
            selected:{},
            numUfa:'',
            visible1:true,
            visible2:true,
            numUfes:[],
            anneesUfe:[],
            lastNewYear:null,
            okDisabled:true
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
        if(!php.empty(value)){
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
      "form.numUfe"(value){
        if(!php.empty(value)){
            this.notSetNumUfe=false
        }else{
            this.notSetNumUfe=true
        }
      },
      "form.supUfe"(value){
        if(!php.empty(value)){
            this.notSetSupUfe=false
        }else{
            this.notSetNumUfe=true
        }
      },
      "form.limites"(value){
        if(!php.empty(value)){
            this.notSetLimitesUfe=false
        }else{
            this.notSetLimitesUfe=true
        }
      },
      "form.plan"(value){
        if(!php.empty(value)){
            this.notSetPlan=false
        }else{
            this.notSetPlan=true
        }
      },
      "form.numBloc"(value){
        if(!php.empty(value)){
            this.notSetNumBloc=false
        }else{
            this.notSetNumBloc=true
        }
      },
      "form.dateBloc"(value){
        if(!php.empty(value)){
            this.notSetDateBloc=false
        }else{
            this.notSetDateBloc=true
        }
      },
      "form.documentBloc"(value){
        if(!php.empty(value)){
            this.notSetDocBloc=false
        }else{
            this.notSetDocBloc=true
        }
      },
      "form.numPlan"(value){
        if(!php.empty(value)){
            this.notSetNumPlan=false
        }else{
            this.notSetNumPlan=true
        }
      },
      "form.datePlan"(value){
        if(!php.empty(value)){
            this.notSetDatePlan=false
        }else{
            this.notSetDatePlan=true
        }
      },
      "form.documentPlan"(value){
        if(!php.empty(value)){
            this.notSetPlan=false
        }else{
            this.notSetPlan=true
        }
      },
  },
    methods:{
        showSupUfe(){

        },
        toDate(d){
            return new Date(d).toLocaleDateString()
        },
        split(s){
            let tableau=s.split('/')
            return tableau[tableau.length-1]
        },
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
            // console.log('numUfa',this.form.numUfa)
            console.log(this.form.numUfa)
            console.log('numufas',this.numUfas2)
            this.numUfa=this.numUfas2.find(elt=>elt.idUfa===(this.form.numUfa)).numUfa
            console.log('numUfa',this.numUfa)
            this.form.supUfa=this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===(this.numUfas2.find(elt=>elt.idUfa===this.form.numUfa)).numUfa).superficiUfa
            console.log(this.form.supUfa)
        },
        onRowSelectedufa(items) {
            this.indexRowSelectedUfa = items.map(item => this.currentItemUfa.indexOf(item));
            for(let i=0; i<items.map(item => this.currentItemUfa.indexOf(item)).length;i++){
            this.indexRowSelectedUfa =items.map(item => this.currentItemUfa.indexOf(item))[i]
            }    
        },
        async getFileBase64(e){
           this.form.limitesString= await this.$getBase64(e.target.files[0])
            // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
            // console.log(this.form.limitesString)
        },
        async getFile2Base64(e){
           this.form.limites2String= await this.$getBase64(e.target.files[0])
            // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
            // console.log(this.form.limitesString)
        },
        async getFile3Base64(e){
           this.form.limites3String= await this.$getBase64(e.target.files[0])
            // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
            // console.log(this.form.limitesString)
        },
        async getFile4Base64(e){
           this.form.limites4String= await this.$getBase64(e.target.files[0])
            // this.form.etudeimpactfichier = await this.$getBase64(e.target.files[0])
            // console.log(this.form.limitesString)
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
                if(php.empty(this.form.numUfe)){
                    this.notSetNumUfe=true
                    let error={ message:'Veuillez renseigner le n° d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supUfe)){
                    this.notSetSupUfe=true
                    let error={ message:'Veuillez renseigner la superficie d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.limites)){
                    this.notSetLimitesUfe=true
                    let error={ message:'Veuillez renseigner les limites d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.plan)){
                    this.notSetPlan=true
                    let error={ message:'Veuillez renseigner l\'arrêté du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.numBloc)){
                    this.notSetNumBloc=true
                    let error={ message:'Veuillez renseigner le n° de la parcelle'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.dateBloc)){
                    this.notSetDateBloc=true
                    let error={ message:'Veuillez renseigner la date'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.documentBloc)){
                    this.notSetDocBloc=true
                    let error={ message:'Veuillez renseigner le document'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.numGestion)){
                    this.notSetNumPlan=true
                    let error={ message:'Veuillez renseigner le n° du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.dateGestion)){
                    this.notSetDatePlan=true
                    let error={ message:'Veuillez renseigner la date du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.documentGestion)){
                    this.notSetDocPlan=true
                    let error={ message:'Veuillez renseigner le document'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
            }
            try{
                let superficies=[]
                const id=this.$route.params.id
                
                const data={
                    numUfa:Number(this.form.numUfa),// qui est l'id du titreUfa obligatoire
                    numUfe:this.form.numUfe, // long obligatoire
                    superficieUfe:Number(this.form.supUfe), //Long obligatoire
                    anneeOuverture : this.form.newyear,// String
                    dernierAnne :this.form.lastyear,// string
                    limiteUfe:this.form.limitesString,//String base64fichier limete ufe
                    arreterAprobPlanQuinquenal:this.form.limites2String,// String base64
                    numPBA :this.form.numBloc,//String
                    datePBA :new Date(this.form.dateBloc),//date
                    documentPBA :this.form.limites3String,//String base64
                    numPGQ:this.form.numGestion,//String
                    datePGA:new Date(this.form.dateGestion),//date
                    documentPGA:this.form.limites4String,//String base64
                    // numUfa:261,// qui est l'id du titreUfa obligatoire
                    // numUfe:"6", // String obligatoire
                    // superficieUfe:13000, //Long obligatoire
                    // anneeOuverture : "2041",// String
                    // dernierAnne :"2045",// string
                    // limiteUfe:this.form.limitesString,//String base64fichier limete ufe
                    // arreterAprobPlanQuinquenal:this.form.limites2String,// String base64
                    // numPBA :this.form.numBloc,//String
                    // datePBA :new Date(this.form.dateBloc),//date
                    // documentPBA :this.form.limites3String,//String base64
                    // numPGQ:this.form.numGestion,//String
                    // datePGA:new Date(this.form.dateGestion),//date
                    // documentPGA:this.form.limites4String,//String base64
                }
                console.log('data',data)
                this.aacs=[]
                this.aacs.unshift(data)
                this.elementsufa.unshift({
                    numufa:this.numUfa,
                    numufe:this.form.numUfe,
                    anneeouverture:(this.form.newyear).toString(),
                    derniereannee:(this.form.lastyear).toString(),
                    limites:this.form.limites.name,
                    planquinquenal:this.form.plan.name,
                    superficieufe:this.form.supUfe
                })
                await this.$titres.post('titres/ufe',{
                    // superficieTitre:this.titreDetailsUfa.superficie, // valeur long
                    // numTitre:Number(id) ,// la valeur a prendre est l'id du titre obligatoire
                    // entiteForestiere:this.entite.idorganisation, // long valeur encore a regarder
                    // numUfa:this.form.numUfa, // string obligatoire
                    // superficieUfa:Number(this.form.supufa), // long
                    // limiteufa:this.form.limitesString, // base64 obligatoire
                    // superficie:superficies
                    
                    numtitre:Number(id) ,// la valeur a prendre est l'id du titre obligatoire
                    ufes:this.aacs,
                }).then(response=>{
                    this.disabledEnregistrer=true
                    console.log(response)
                    this.showOverlay=false
                    let message={ message:'UFE créée avec succès'}
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
                if(php.empty(this.form.numUfe)){
                    this.notSetNumUfe=true
                    let error={ message:'Veuillez renseigner le n° d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.supUfe)){
                    this.notSetSupUfe=true
                    let error={ message:'Veuillez renseigner la superficie d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.limites)){
                    this.notSetLimitesUfe=true
                    let error={ message:'Veuillez renseigner les limites d\'UFE'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.plan)){
                    this.notSetPlan=true
                    let error={ message:'Veuillez renseigner l\'arrêté du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.numBloc)){
                    this.notSetNumBloc=true
                    let error={ message:'Veuillez renseigner le n° de la parcelle'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.dateBloc)){
                    this.notSetDateBloc=true
                    let error={ message:'Veuillez renseigner la date'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.documentBloc)){
                    this.notSetDocBloc=true
                    let error={ message:'Veuillez renseigner le document'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.numGestion)){
                    this.notSetNumPlan=true
                    let error={ message:'Veuillez renseigner le n° du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.dateGestion)){
                    this.notSetDatePlan=true
                    let error={ message:'Veuillez renseigner la date du plan'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                if(php.empty(this.form.documentGestion)){
                    this.notSetDocPlan=true
                    let error={ message:'Veuillez renseigner le document'}
                    this.showOverlay=false
                    return this.sendAlertMessage(error);
                }
                let elt={numufa :'', superficie:'', limiteufa:'' }
                // this.elementsufa.splice(this.indexRowSelectedUfa-1,0,elt)
                this.elementsufa.push({
                numufa: this.form.numUfa,
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
                console.log('mode nouveau')
                this.showNewForm=true
                if(this.isUfa){
                    this.form.newyear=this.lastNewYear + 5
                    this.form.lastyear=this.lastNewYear + 9
                }else{
                    this.okDisabled=false
                }
                
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
                    // console.log(this.arrondissements)
                }
            }
            this.titreDetailsUfa = []
            this.titreDetailsAac = await this.$titres.get('titre_convenssion/detailcpUfe/' +this.$route.params.id)
                .then(response => {
                    return response.data.result.Items
                })
                .catch(err=>{console.log(err);this.showOverlay=false})
            this.elementssuperficie2=[]
            
            console.log(this.titreDetailsAac)
            this.idElement=this.titreDetailsAac?.idtitre.toString()
            if(this.titreDetailsAac.titreufa.length!==0){
                this.isUfa=true
                
                this.numUfas2=this.titreDetailsAac.titreufa.map(elt=>{
                    return{
                        idUfa:elt.idUfa,
                        numUfa:elt.numUfa
                    }
                })
                console.log('numufas',this.numUfas2)
                this.selectedUfa = this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===this.numUfas2[0].numUfa)
                this.numUfa=this.numUfas2[0].numUfa
                console.log('selectedUfa',this.selectedUfa)
                this.selectedAac=this.selectedUfa.titreufe
                console.log('selectedAac',this.selectedAac)
                // superficie2=this.selectedAac[0].titresuperficies.reduce((acc,val)=>acc+val.superficie,0)
                if(this.selectedAac?.length===0){
                    this.showOverlay=false
                    return 
                }
                if(!php.empty(this.selectedAac)){
                    this.anneesUfe=this.selectedAac.map(elt=>Number(elt.anneOuverture)).sort((a,b)=>a-b)
                    // last new year
                    this.lastNewYear=this.anneesUfe[this.anneesUfe.length -1]
                    console.log('annéesufe',this.anneesUfe)
                    console.log('lastnewyear',this.lastNewYear)
                    this.numUfes=this.selectedAac.map(elt=>elt.numufe)
                    // this.elementssuperficie=this.selectedAac[0].titresuperficies
                    this.selected.limeteufe=this.split(this.selectedAac[0].limeteufe)
                    this.selected.planquinquenal=this.split(this.selectedAac[0].planquinquenal)
                    this.selected.numufe=this.selectedAac[0].numufe
                    this.selected.superficieUfe=this.selectedAac[0].superficieUfe
                    this.selected.numPBA=this.selectedAac[0].numPBA
                    this.selected.anneOuverture=this.selectedAac[0].anneOuverture
                    this.selected.anneFermeture=this.selectedAac[0].anneFermeture
                    this.selected.datePBA=this.toDate(this.selectedAac[0].datePBA)
                    this.selected.documentPBA=this.split(this.selectedAac[0].documentPBA)
                    this.selected.numPGQ=this.selectedAac[0].numPGQ
                    this.selected.datePGQ=this.toDate(this.selectedAac[0].datePGQ)
                    this.selected.documentPGQ=this.split(this.selectedAac[0].documentPGQ)
                    // this.selected.superficie=this.selectedAac[0].superficieAac
                }
                
                console.log('selectedufa',this.selectedUfa)

                const objUfas=this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===this.selectedUfa.numUfa)
                const titresAac=objUfas.titreufe?.map(elt=>{
                    return{
                        numufa:this.selectedUfa.numUfa,
                        numufe:elt.numufe,
                        anneeouverture:elt.anneOuverture,
                        derniereannee:elt.anneFermeture,
                        limites:this.split(elt.limeteufe),
                        planquinquenal:this.split(elt.planquinquenal),
                        superficieufe:elt.superficieUfe
                    }
                })
                // this.elementsufa.push({
                //     numufa: this.selectedUfa.numUfa,
                //     assiette:this.selected.numAac,
                //     superficie:this.selected.superficie
                // })
                this.elementsufa=titresAac
                console.log('elemtsufa',this.elementsufa)
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
            }else{
                this.isUfa=false
            }
            this.showOverlay=false
            
            if(!this.isUfa){
                let message={ message:'Il n\'existe pas d\'UFA pour ce titre'}
                this.canAddNew=false
                this.disabledEnregistrer=true
                return this.sendAlertMessage(message);
            }
        },
        onRowSelected(items) {
            console.log('row selected',items);
            items.isSelected =true;
            this.isRowselected=true
            // this.selected = items
            
            if(!this.showNewForm){
                // this.selectedUfa = this.titreDetailsUfa.titreUfa.find(elt=>elt.numUfa===items[0]?.numufa)
                // this.selectedUfa = this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===items[0]?.numufa)
                this.selectedUfa = this.titreDetailsAac.titreufa.find(elt=>elt.numUfa===this.numUfa)
                console.log('selectedUfa',this.selectedUfa)
                this.selectedAac=this.selectedUfa.titreufe
                this.selected=this.selectedAac.find(elt=>elt.numufe===(items[0].numufe))
                // this.selectedAac=this.selectedUfa.titreufe
                // console.log('selected',this.selected)
                if(!php.empty(this.selected)){
                    // console.log(this.selected.limiteufa)
                    // this.selected.limeteufe=this.split(this.selected.limeteufe)
                    // this.selected.planquinquenal=this.split(this.selected.planquinquenal)
                    // this.selected.documentPBA=this.split(this.selected.documentPBA)
                    // this.selected.documentPGQ=this.split(this.selected.documentPGQ)
                    // this.selected.datePBA=this.toDate(this.selected.datePBA)
                    // this.selected.datePGQ=this.toDate(this.selected.datePGQ)
                    
                    this.selected.limeteufe=this.split(this.selected.limeteufe)
                    this.selected.planquinquenal=this.split(this.selected.planquinquenal)
                    // this.selected.numufe=this.selected.numufe
                    // this.selected.superficieUfe=this.selected.superficieUfe
                    // this.selected.numPBA=this.selected.numPBA
                    // this.selected.anneOuverture=this.selected.anneOuverture
                    // this.selected.anneFermeture=this.selected.anneFermeture
                    this.selected.datePBA=this.selected.datePBA===null ?'': this.toDate(this.selected.datePBA)
                    this.selected.documentPBA=this.split(this.selected.documentPBA)
                    // this.selected.numPGQ=this.selectedAac[0].numPGQ
                    this.selected.datePGQ=this.selected.datePGQ===null ?'': this.toDate(this.selected.datePGQ)
                    this.selected.documentPGQ=this.split(this.selected.documentPGQ)
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

.collapse-open{
      list-style-type: disclosure-open;
  }
  .collapse-close{
      list-style-type: disclosure-closed;
  }
</style>