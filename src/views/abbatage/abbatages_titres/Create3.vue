<template>
    <div id="cover" class="min-vh-100">
      <b-overlay rounded="sm" :show="showOverlay">
        <div>
          <b-row class="ml-2" style="border-bottom: 2px solid green">
            <b-col class="pb-0 m-0" >
                <h4 class="tab-header-left-text">
              <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
              </button>
              <span>Création abattage titre <span class="font-weight-bold"></span> </span>
              </h4>
            </b-col> 
            <b-col class="col-md-auto">
              <span>
                <b-spinner small v-if="submitted" class="ml-2"  style="margin-right: 5px;"></b-spinner>
                <a v-else @click.prevent="enregistrer"  size="sm" style="cursor: pointer"  class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer 
                  
                </a>
                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"  style="cursor:pointer" ><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
              </span>
            </b-col>
          </b-row>
          <div class="container1 mt-1">
              <div class="px-2">
                <b-overlay :show="overlayDetailsPermis" rounded="sm">
                  <b-row class="d-flex justify-content-around">
                    <b-col cols="5" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols-sm="4"
                        content-cols="8"
                        label-align="right"
                      >
                        <template #label>
                          <span class="mt-0d-flex justify-content-center align-items-center" style="color:red">*</span>N° permis
                        </template>
                        <div class="d-flex align-items-center h-100" style="flex-wrap:wrap">
                          <!-- <input v-validate="'required|email'" name="email" type="text" /> -->
                          <!-- <span>{{ errors.first('email') }}</span> -->
                          <select 
                            v-validate="{required:true}"
                            @change="getPermisDetails" 
                            name="selectPermis"
                            v-model="form.numpermis" 
                            class="sigif-normal-select" 
                            :class="{borderError:errors.numpermis.hasError}"
                            >
                            <option v-for="(p, i) in permis" :value="p.idpermis" :key="i" >
                              {{ p.numpermis }}
                            </option>
                          </select>
                          <span v-if="!form.numpermis" style="color:red">{{ errors.numpermis.message }}</span>
                          <!-- <span v-show="vErrors.has(selectPermis)">{{ vErrors.first('selectPermis') }}</span> -->
                          <!-- <b-form-invalid-feedback id="selectPermis">{{ veeErrors.first('selectPermis') }}</b-form-invalid-feedback> -->
                        </div>
                        
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="6"
                        label-align="right"
                        >
                        <template #label>
                          <span>Date permis</span>
                        </template>
                        <div class="h-100 d-flex align-items-center">
                          <input v-model="form.datepermis" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="4"
                        label-align="right"
                        >
                      <template #label>
                        <span>Type titre</span>
                      </template>
                      <div class="h-100 d-flex align-items-center">
                        <input v-model="form.typetitre" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                      </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="3"
                        label-align="right"
                        >
                      <template #label>
                        <span>N° titre</span>
                      </template>
                      <div class="h-100 d-flex align-items-center">
                        <input v-model="form.numtitre" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                      </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row class="d-flex justify-content-around">
                    <b-col cols="3" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols-sm="6"
                        content-cols="6"
                        label-align="right"
                      >
                        <template #label>
                          <span class="mt-0d-flex justify-content-center align-items-center" style="color:red">*</span>N° DF10
                        </template>
                        <div class="d-flex align-items-center h-100" style="flex-wrap: wrap;">
                          <b-form-input 
                            name="inputTitre"
                            v-validate="{required:true}"
                            :state="validateState('inputTitre')"
                            v-model="form.numdf10" 
                            list="my-list-id"
                            :class="{borderError:errors.numdf10.hasError}"
                            class="font-weight-bold sigif-abattage-titre-input-to-fil">
                          </b-form-input>
                        <span style="color:red" v-if="!form.numdf10">{{ errors.numdf10.message }}</span>
                          <!-- <b-form-invalid-feedback style="color:red;font-size:1rem;width:100%" id="inputTitre">Ce champ est obligatoire</b-form-invalid-feedback> -->
                            <datalist id="my-list-id">
                              <option v-for="(feuillet, index) in feuillets" :key="index">{{ feuillet }}</option>
                          </datalist>
                          <!--<input v-model="form.numdf10" type="text" name="" id="" class="font-weight-bold sigif-abattage-titre-input-to-fil"/>-->
                        </div>
                        
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="6"
                        label-align="right"
                        >
                        <template #label>
                          <span>N° UFA</span>
                        </template>
                        <div class="h-100 d-flex align-items-center">
                          <input v-model="form.numufa" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="4"
                        label-align="right"
                        >
                      <template #label>
                        <span>N° UFE</span>
                      </template>
                      <div class="h-100 d-flex align-items-center">
                        <input v-model="form.numufe" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                      </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-cols="3"
                        label-align="right"
                        >
                      <template #label>
                        <span>N° AAC</span>
                      </template>
                      <div class="h-100 d-flex align-items-center">
                        <input v-model="form.numaac" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                      </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-overlay>
                <b-row class="d-flex justify-content-around">
                  <b-col cols="3" class="m-0 p-0">
                    <b-form-group class="m-0 p-0"
                      label-cols-sm="6"
                      content-cols="6"
                      label-align="right"
                    >
                      <template #label>
                        <span class="mt-0d-flex justify-content-center align-items-center" style="color:red">*</span>Date Abattage
                      </template>
                      <div class="d-flex align-items-center h-100" style="flex-wrap:wrap">
                        <input :class="errors.dateabattage.hasError ? 'borderError':''" v-model="form.dateabattage" type="date" name="" id="" class="font-weight-bold sigif-abattage-titre-input-to-fil"/>
                        <span style="color:red" v-if="!form.dateabattage">{{ errors.dateabattage.message }}</span>
                      </div>
                      
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="m-0 p-0">
                    <b-form-group class="m-0 p-0"
                      label-cols="6"
                      label-align="right"
                      >
                      <template #label>
                        <span>Nombre de Grume</span>
                      </template>
                      <div class="h-100 d-flex align-items-center">
                        <input v-model="nbgrumes" disabled type="text" name="" id="" class="w-50 sigif-abattage-titre-input" />
                      </div>
                    </b-form-group>
                  </b-col>
                  <b-col cols="3" class="m-0 p-0">
                    <b-form-group class="m-0 p-0"
                      label-cols="6"
                      label-align="right"
                      >
                    <template #label>
                      <span>Dernier N° Grume</span>
                    </template>
                    <div class="h-100 d-flex align-items-center">
                      <input v-model="numderniergrume" disabled type="text" name="" id="" class="w-50 sigif-abattage-titre-input" />
                    </div>
                    </b-form-group>
                  </b-col>
                  
                </b-row>
              </div>
              <div class="global">
                <div class="m-0 px-2 table-header-border">
                  <b-row>
                    <b-col cols="2"><h4 class="tab-header-left-text"> Tige </h4></b-col>
                    <b-col class="ml-1 liens">
                        
                      <a :disabled="submitted1" style="cursor: pointer;" @click.prevent="AddField" 
                        class="mx-2 simple-btn">
                        <b-img src="@/assets/images/iconPLUS_16x16.png"></b-img><span style="color:rgba(0,100,0,0.7)">Ajouter</span>
                        <b-spinner v-if="submitted1" small></b-spinner> 
                      </a>
                      <a style="cursor: pointer;" @click.prevent="deleteAll" class="mx-2 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Enlever</a>
                      <a style="cursor: pointer;" @click.prevent="resetTigesFields" class="mx-2 simple-btn"><span style="color:rgba(0,100,0,0.7)">Importer</span></a>
                    </b-col>
                  </b-row>
                </div>
                <div v-if="firstStepOk">
                
                  <div>
                    <b-overlay :show="showOverlayCodeData" rounded="sm">
                      <template #overlay>
                        <div class="text-center">
                          <i class="fas fa-2x fa-sync fa-spin"></i>
                          <p id="cancel-label">Chargement...</p>
                        </div>
                      </template>
                    
                      <b-overlay :show="showOverlayTige" rounded="sm">
                        <template #overlay>
                          <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                          </div>
                        </template>
                        <b-row  class="p-2 d-flex justify-content-around">
                          <b-col cols="3" class="m-0 p-0">
                            <b-form-group class="m-0 p-0"
                              label-align="right"
                              label-cols="6"
                            >
                              <template #label><span style="color:red">*</span>Code barre de la tige</template>
                              <div class="h-100 d-flex align-items-center" style="flex-wrap:wrap">
                                <input :class="{borderError:errors.codebarretige.hasError}" v-model="form.codebarretige" @keydown.tab.prevent="getDataDetailsTige($event.target.value)" type="text" name="" id="" class="font-weight-bold sigif-abattage-titre-input-to-fil"/>
                                <span v-if="!form.codebarretige" style="color:red">{{ errors.codebarretige.message }}</span>
                              </div>
                            </b-form-group>
                          </b-col>
                          <b-col cols="3" class="m-0 p-0">
                            <b-form-group class="m-0 p-0"
                              label-align="right"
                              label-cols="3"
                              label="Essence"
                            >
                            <div class="h-100 d-flex align-items-center">
                              <input v-model="form.essence" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                            </div>
                            </b-form-group>
                          </b-col>
                          <b-col cols="2" class="m-0 p-0">
                            <b-form-group class="m-0 p-0"
                              label-align="right"
                              label-cols="6"
                              label="Qualité"
                            >
                            <div class="h-100 d-flex align-items-center">
                              <input v-model="form.qualite" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                            </div>
                            </b-form-group>
                          </b-col>
                          <b-col cols="1" class="m-0 p-0">
                            <b-form-group class="m-0 p-0"
                              label-align="right"
                              label-cols="6"
                            >
                              <template #label>DMA</template>
                              <div class="h-100 d-flex align-items-center">
                                <input disabled v-model="form.dma" type="text" name="" id="" class="font-weight-bold sigif-abattage-titre-input"/>
                              </div>
                            </b-form-group>
                          </b-col>
                          <b-col cols="1" class="m-0 p-0">
                            <b-form-group class="m-0 p-0"
                              label-align="right"
                              label-cols="6"
                            >
                            <template #label>DME</template>
  
                            <div class="h-100 d-flex align-items-center">
                              <input v-model="form.dme" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                            </div>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-overlay>
                      
                      <b-overlay :show="showOverlayGrume" rounded="sm">
                        <template #overlay>
                          <div class="text-center">
                            <i class="fas fa-2x fa-sync fa-spin"></i>
                            <p id="cancel-label">Chargement...</p>
                          </div>
                        </template>
                      <b-row class="d-flex justify-content-space-around">
                        <b-col cols="1">
                          <h5 class="ml-1 font-weight-bold">Grume</h5>
                        </b-col>
                        
                        <b-col cols="3" class="m-0 p-0">
                          <b-form-group class="m-0 p-0"
                            label-align="right"
                            label-cols="6"
                          >
                          <template #label> <span class="text-danger">*</span> Code barre abattage</template>
                          <div class="h-100 d-flex align-items-center" style="flex-wrap:wrap">
                            <input 
                              v-model="form.codebarregrume" @keydown.tab.prevent="getDataDetailsGrume($event.target.value)" 
                              :class="{borderError:errors.codebarregrume.hasError}"
                              type="text" name="" id="" class="font-weight-bold sigif-abattage-titre-input-to-fil"/>
                            <span style="color:red" v-if="!form.codebarregrume">{{ errors.codebarregrume.message }}</span>
                          </div>
                          </b-form-group>
                        </b-col>
                        <b-col cols="3" class="m-0 p-0">
                          <b-form-group class="m-0 p-0"
                            label-align="right"
                            label-cols="6"
                          >
                          <template #label>Sequence</template>

                          <div class="h-100 d-flex align-items-center">
                            <input v-model="sequencegrume" disabled type="text" name="" id="" class="sigif-abattage-titre-input" />
                          </div>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-overlay>
                    </b-overlay>
                  </div>
                  <div class="mx-4 d-flex justify-content-center align-items-center" style="border-bottom: 1px solid green"></div>
  
                  <b-row class="d-flex justify-content-around">
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="8"
                      >
                        <template #label><span class="text-danger">*</span> Diamètre petit bout</template>
                        <div class="h-100 d-flex align-items-center" style="flex-wrap:wrap">
                          <input v-model="form.diampb" type="number" name="" id="" 
                            :class="{borderError:errors.diampb.hasError}"
                            class="font-weight-bold sigif-abattage-titre-input-to-fil"/>
                          <span style="color:red" v-if="!form.diampb">{{ errors.message }}</span>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="8"
                      >
                      <template #label><span class="text-danger">*</span> Diamètre gros bout</template>

                      <div class="h-100 d-flex align-items-center" style="flex-wrap:wrap">
                        <input v-model="form.diampg" type="number" name="" id="" 
                        :class="{borderError:errors.diamgb.hasError}"
                          class="sigif-abattage-titre-input-to-fil" />
                        <span v-if="!form.diampg" style="color:red">{{ errors.message }}</span>
                      </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="6"
                      >
                      <template #label> <span class="text-danger">*</span> Longueur</template>
                      <div class="h-100 d-flex align-items-center" style="flex-wrap:wrap">
                        <input v-model="form.longeur" type="number" name="" id="" 
                          :class="{borderError:errors.longueur.hasError}"
                          class="font-weight-bold sigif-abattage-titre-input-to-fil"/>
                        <span style="color:red" v-if="!form.longeur">{{ errors.message }}</span>
                      </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="3" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="6"
                      >
                      <template #label>Volume</template>

                      <div class="h-100 d-flex align-items-center">
                        <h5 class="font-weight-bold h-50">{{ form.volume }}</h5>
                      </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col cols="2" class="m-0 p-0">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="8"
                      >
                        <template #label>Abandon</template>
                        <div class="h-100 d-flex align-items-center">
                          <select @change="handleMotifVisibility" v-model="form.abandonner" class="sigif-normal-select" >
                            <option  value="1" >Oui </option>
                            <option  value="0" >Non </option>
                          </select>
                        </div>
                      </b-form-group>
                    </b-col>
                    <b-col cols="4" class="m-0 p-0" v-if="showMotifAbandon==true">
                      <b-form-group class="m-0 p-0"
                        label-align="right"
                        label-cols="4"
                      >
                      <template #label><span class="text-danger">*</span> Motif Abandon</template>

                      <div class="h-100 d-flex align-items-center">
                        <input v-model="form.motifabandon" type="text" name="" id="" class="sigif-abattage-titre-input-to-fil" />
                      </div>
                      </b-form-group>
                    </b-col>
                  </b-row>
                </div>
              </div>
              

             
              
          </div>
        </div>
      </b-overlay>    
       
          <ChangeProductBox ref="changeProduct"></ChangeProductBox>
          <CodeBarreInfo ref="codebarreinfo"></CodeBarreInfo>
          <!--entete des tableaux -->
          <div class="mt-0 px-2 table-header-border">
            <b-row>
              <b-col >
                <h4 class="tab-header-left-text mr-1"> Liste des tiges abattues</h4>
                <a style="cursor: pointer;" class="mx-2 simple-btn "><span style="color:rgba(0,100,0,0.7)">Exporter le lot</span></a>
              </b-col>
              <b-col class="col-md-auto" >
                <h5 class="ml-2 mr-4 pr-4">Volume total: <span style="font-weight:bold">{{ volumetotal }}</span></h5>
             </b-col>
            </b-row>
            <div class="mx-1">
              <b-table :items="items"  :fields="entetes" :busy="isBusy" class="mt-1" outlined responsive  ref="selectableTable" select-mode="single" selectable @row-selected="onRowSelected" :tbody-tr-class="rowClass">
               
                  <template #cell(num_ordre)="data">
                      <b-form-input disabled size="sm" class="w-100 py-0 px-2 m-0" style="height: 20px !important; color:black" placeholder="" v-model="data.item.num_ordre " />
                  </template>
                  <template #cell(codebarretige)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.codebarretige }}</b> </span>
                  </template><template #cell(codebarregrume)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.codebarregrume }}</b> </span>
                  </template>
                  <template #cell(diampb)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diampb }}</b> </span>
                  </template>
                  <template #cell(diamgb)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.diamgb }}</b> </span>
                  </template>
                  <template #cell(longeur)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.longeur }}</b> </span>
                  </template>
              </b-table>
            </div>
          </div>
              
        
    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
  import Vue from 'vue'
  import ChangeProductBox from '@/components/utils/ChangeProductBox.vue';
  import CodeBarreInfo from '@/components/utils/CodeBarreInfo.vue';
  import VeeValidate from 'vee-validate';
  Vue.use(VeeValidate,{
    errorBagName: "vErrors" 
  })
export default {
  name: "create_abattage_titre",
  components: {
    ChangeProductBox,
    CodeBarreInfo,
  },
  data: () => ({
    firstStepOk:true,
    datesignature:'',
    submitted:false,
    submitted1:false,
    permis:[],
    searchpermis:'',
    offsetPermis: 0,
    limitPermis: 10,

    showOverlayFeuilletsDF10: false, //overlay de gestion du chargement des numéros de feuillets
    showOverlayTige:false, // gestion chargement infos tige
    showOverlayGrume:false, //gestion chargement infos grume
    numsdf10 : [],
    searchnumdf10:'',
    offsetDF10: 0,
    limitDF10: 10,
    elements: [],
    isBusy:false,
    isRowselected:false,
    /*propriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    search:'',
    message:'Ce champ est obligatoire',
    showOverlayCodeData:false,
    showOverlay :false, //overlay de chargement des permis
    overlayDetailsPermis: false, //overlay récupération infos permis
 
    offset: 0,
    limit: 10,
    visible: true,


    heure: '08:20',

    errors:{
      codebarretige:{
        message:'',
        hasError:false
      },
      codebarregrume:{
        message:'',
        hasError:false
      },
      numpermis:{
        hasError:false,
        message:''
      },
      numdf10:{
        hasError:false,
        message:''
      },
      dateabattage:{
        hasError:false,
        message:''
      },
      diampb:{
        hasError:false
      },
      diamgb:{
        hasError:false
      },
      longueur:{
        hasError:false
      }
    },
    sequencegrume:'',//affiche la sequence de la grume
    showMotifAbandon:false,
    form: {
      numpermis: '', 
      datepermis:'',
      typetire:'',
      numtitre:'',
	    dateabattage:"",
      numdf10:'',

      essence:'',
      qualite:'',
      codebarretige:'',
      codebarregrume:'', //cbabattage
      abandonner:'',
      motifabandon:'',
      codebarre: "",
      sequence:"",
      diampb:'',
	    diampg:'',
      utmx:'',
      utmy:'',
      longeur:'',
      volume : '',
      nbrGrumes:'',
      dernNroGrume:'',
    },
    fieldsBrisAbattages:[],
    typeProduit: [
      { libelle: "Grume", value: 1 },
      { libelle: "Débité", value: 2 }
    ], 
    // selected:'',
    entetes: [ 
      { key: 'num_ordre', label: 'N° d\'ordre',thStyle: { width: "6%",color:"green",fontWeight:'bold'} },
      { key: 'codebarretige', label: 'Code barre de la tige' ,thStyle: { width: "9%",color:"green",fontWeight:'bold' }}, 
      { key: 'codebarregrume', label: 'Code barre abattage' ,thStyle: { width: "9%",color:"green",fontWeight:'bold' }},
      { key: 'sequence', label: 'N° séquentiel' ,thStyle: { width: "6%",color:"green",fontWeight:'bold' }}, 
      { key: 'essence', label: 'Essence',thStyle: { width: "6%",color:"green",fontWeight:'bold' } },
      { key: 'diamgb', label: 'Diamètre Gros bout' ,thStyle: { width: "9%",color:"green",fontWeight:'bold' } }, 
      { key: 'diampb', label: 'Diamètre Petit bout' ,thStyle: { width: "9%",color:"green",fontWeight:'bold' } }, 
      { key: 'longeur', label: 'Longueur',thStyle: { width: "5%",color:"green",fontWeight:'bold' } }, 
      { key: 'volume', label: 'Volume',thStyle: { width: "5%",color:"green",fontWeight:'bold' } },
      { key: 'abandonner', label: 'Rejet',thStyle: { width: "3%",color:"green",fontWeight:'bold' } },
      { key: 'motifabandon', label: 'Motif Rejet',thStyle: { width: "6%",color:"green",fontWeight:'bold' } },
    ],
    tiges:[],
    codebarretigetoset:true,
    notSetNumpermis:false,
    notSetDateAbattage:false,
    notSetNumdf10:false,

    selected:'',
    selected2:'',
    permis:[],
    permisObj:{},
    code_barre_tige:'',
    code_barre_grume:'',
   
    counter:0,
    feuillets: []

  }),
  watch:{
    tiges(){
      if(this.tiges.length>0){
       setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      }
    },
    "form.codebarregrume"(value){
      if(value!==null&&value!==''){
        this.errors.codebarregrume.hasError= false
      }
      else{
        this.errors.codebarregrume.hasError= true
      }
    },
    "form.dateabattage"(value){
      if(value!==null&&value!==''){
        this.errors.dateabattage.hasError= false
      }
      else{
        this.errors.dateabattage.hasError= true
      }
    },
    "form.codebarretige"(value){
      if(value!=null && value!==''){
        console.log('cbt')
        this.errors.codebarretige.hasError=false
      }else{
        this.errors.codebarretige.hasError=true
      }
    },
    "form.numpermis"(value){
      if(value!=null && value!==''){
        this.errors.numpermis.hasError=false
      }else{
        this.errors.numpermis.hasError=true
      }
    },
    "form.numdf10"(value){
      if(value!=null && value!==''){
        this.errors.numdf10.hasError=false
      }else{
        this.errors.numdf10.hasError=true
      }
    },
    "form.diampb"(value){
      if(value!=null && value!==''){
        this.errors.diampb.hasError=false
      }else{
        this.errors.diampb.hasError=true
      }
    },
    "form.diampg"(value){
      if(value!=null && value!==''){
        this.errors.diamgb.hasError=false
      }else{
        this.errors.diamgb.hasError=true
      }
    },
    "form.longeur"(value){
      if(value!=null && value!==''){
        this.errors.longueur.hasError=false
      }else{
        this.errors.longueur.hasError=true
      }
    },

  },
  computed:{
      volumetotal(){
        let v=0;
        this.tiges.forEach(elt => {
        v +=  elt.volume !==''? parseFloat(elt.volume): 0;
      });
      v=parseFloat(v).toFixed(3)
      return this.commify(v);
      },

      items() { 
        return this.tiges.map((a, index) => {  
          a.isFirst = index == 0        
          a.isEven = index %2 == 0        
          return a
        })
      },
      nbgrumes(){
        return this.tiges.length
      },
      numderniergrume(){
        if(this.tiges.length==0){
          return ''
        }
        else{
          return this.tiges[0].num_ordre.split('/')[1]
        }
      }
 

    },
 
    methods: {
      //method bootstrap de validation du formulaire
      validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    async checkTige(value){
      this.showOverlayTige=true;
      await this.$codesbarres.post("verifincentaire", {idtitre:this.form.numtitre,
      idaacpermis:this.form.idaac,codebarre:value}).then(response => {
            this.form.essence = response.data.result.essence;
            this.form.qualite = response.data.result.qualite;
            this.form.dma = response.data.result.dma;
            this.form.dme = response.data.result.dme;
            this.showOverlayTige=false;   
            // console.log('essence:',this.form.essence)
            // this.setVolume(); //calcul du volume
            // this.tiges.unshift({
            //   num_ordre:this.form.numdf10.replace(/0/g,'')+'/'+ ++this.counter,
            //   codebarretige: this.form.codebarretige, 
            //   codebarregrume:this.form.codebarregrume,
            //   sequence: this.sequencegrume, 
            //   essence: this.form.essence, 
            //   diamgb: this.form.diampg, 
            //   diampb: this.form.diampb,
            //   longeur: this.form.longeur, 
            //   volume: this.form.volume,
            //   abandonner: this.form.abandonner ==1 ? 'oui' :"Non",
            //   motifabandon: this.form.motifabandon !==null ? this.form.motifabandon :""
            // });
            // this.form.nbrGrumes=this.counter
            // this.form.dernNroGrume=this.counter
            // this.form.volume_total=this.volume_total+ this.form.volume
            // this.volume_total=parseFloat(this.volume_total) + parseFloat(this.form.volume)
            // re-initialisation champ form ajout unitaire
            // this.resetTigesFields();
          } )
        .catch(error =>{
          this.showOverlayTige=false;
          this.errorHappened(error.response.data);
        } )       
    },
    async checkGrume(codebarre){
      this.showOverlayGrume=true;
     
      let dataresult =  await this.$codesbarres.post("check/codebarre-sequence", {codebarre}).then(response => response.data.result)
      .catch(error =>{
        this.showOverlayGrume=false;
        this.errorHappened(error.response.data);
      } )
      this.sequencegrume = dataresult.sequence;
      this.showOverlayGrume=false;     
    },
      //récup infos supplémentaire tige
      async getDataDetailsTige(value) {
          //controle du fait que le code barre n'est pas encore pris en compte
          if(php.empty(this.form.codebarretige)){
            this.errors.codebarretige.message=this.message
            return
          }
        // if(this.tiges.length>1){
        //     this.tiges.forEach(field => {
        //       if(field.codebarre==value){
        //         return this.showDialogueLigne('codebarre déjà utilisé');
        //       }
        //     }) 
        // }
        this.showOverlayTige=true;
        let data={idtitre:this.form.numtitre, idaacpermis:this.form.numaac, codebarre:value}
          
        this.checkTige(data.codebarre)
      },
      //récup infos supplémentaire grume
      async getDataDetailsGrume(value) {
        if(php.empty(this.form.codebarregrume)){
          this.errors.codebarregrume.message=this.message
          return
        }
        this.showOverlayGrume=true;
        this.checkGrume(value)
      },
      handleMotifVisibility(){
        if(this.form.abandonner==1){
          this.showMotifAbandon=true
        }
        else{
          this.showMotifAbandon=false
        }
      },
      async getPermisDetails(){
        this.overlayDetailsPermis= true;
        
        try{
          this.permisObj=await this.$permis.get(`permis/${this.form.numpermis}`).then(response=> response.data.result)
          this.form.datepermis= this.permisObj.datesignature!==null ? this.$dayjs(this.permisObj.datesignature).format('YYYY-MM-DD') :""
          this.form.typetitre= this.permisObj.typetitre!==null ? this.permisObj.typetitre :""
          this.form.numtitre= this.permisObj.numtitre!==null ? this.permisObj.numtitre :""
          this.form.numufa= this.permisObj.numufa!==null ? this.permisObj.numufa :""
          this.form.numufe= this.permisObj.numufe!==null ? this.permisObj.numufe :""
          this.form.numaac= this.permisObj.numaac!==null ? this.permisObj.numaac :""
          this.overlayDetailsPermis=false
        }catch(error){
          this.overlayDetailsPermis=false
          console.log(error)
        }
      },

      async setDetailsGrume(value){
        // this.fakeApiGrume.nro_sequence="237650-00352"
        // this.fakeApiGrume.volume=0
        try{
          this.fakeApiGrume=await this.$codesbarres.post('check/codebarre-sequence',{codebarre:value}).then(response=>response.data.result)
        }catch(error){
          console.log(error)
        }
        
      },

       AddField () {
        // this.$validator.validateAll().then(
        //   result => {
        //       this.validate()
        //       if(!result){
        //         return
        //       }else{
        //         this.checkTige(this.form.codebarretige)
        //         this.checkGrume(this.form.codebarregrume)
        //     }
        //   })
        this.submitted1=true
        if(!this.checkData1()){
          this.submitted1=false
          return
        }else{
          if(!this.checkData2()){
            this.submitted1=false
            return
          }else{
            this.submitted1=false
            this.checkTige(this.form.codebarretige)
              .then(()=>{
              })
              .catch(error=>console.log(error))
          }
        }
        if(!this.checkData3()){
          this.submitted1=false
          return
        }else{
          this.submitted1=false
          
          this.checkGrume(this.form.codebarregrume)
        }
        if(!this.checkData4()){
          this.submitted1=false
          return
        }else{
          this.setVolume(); //calcul du volume
            this.tiges.unshift({
              num_ordre:this.form.numdf10.replace(/0/g,'')+'/'+ ++this.counter,
              codebarretige: this.form.codebarretige, 
              codebarregrume:this.form.codebarregrume,
              sequence: this.sequencegrume, 
              essence: this.form.essence, 
              diamgb: this.form.diampg, 
              diampb: this.form.diampb,
              longeur: this.form.longeur, 
              volume: this.form.volume,
              abandonner: this.form.abandonner ==1 ? 'oui' :"Non",
              motifabandon: this.form.motifabandon !==null ? this.form.motifabandon :""
            });
            this.form.nbrGrumes=this.counter
            this.form.dernNroGrume=this.counter
            this.form.volume_total=this.volume_total+ this.form.volume
            this.volume_total=parseFloat(this.volume_total) + parseFloat(this.form.volume)
            // re-initialisation champ form ajout unitaire
            this.resetTigesFields();
        }
        // else{
        //   if(!this.checkData2()){
        //     this.submitted1=false
        //     return
        //   }else{
        //     this.checkTige(this.form.codebarretige)
        //     this.submitted1=true
        //     if(!this.checkData3()){
        //     this.submitted1=false
        //     return
        //     }else{
        //       this.checkGrume()
        //       this.submitted1=true
        //       return
        //   }
        //   return
        //   }
        // }
        },

      resetTigesFields(){
        this.form.codebarretige='', 
        this.form.codebarregrume='', 
        this.sequencegrume='', 
        this.form.essence='', 
        this.form.diampb='', this.form.diampg='', 
        this.form.longeur='', this.form.abandonner='',
         this.form.motifabandon=''
      },
      
      async showConfirmMessage(e){
        if (e.currentTarget.value == "Grume") {
          this.form.typeProduit = "Débité";
        }
        else {
          this.form.typeProduit = "Grume";
        }

        if( this.fields.length > 1 ){
            const ok = await this.$refs.changeProduct.show({
                title: 'Changement de produit',
                message: "Si oui tous les champs seront vidé",
                okButton: 'oui',
                cancelButton: "Non",
              })
              //If you throw an error, the method will terminate here unless you surround it wil try/catch
              if (ok) {
                  this.$refs.changeProduct._close();
              } else {
                this.$refs.changeProduct._close();
              }
        }
        else {
          this.form.typeProduit = e.currentTarget.value;
          this.showGrume = this.form.typeProduit == "Grume" ? true : false;
        }
        
      },
      //methode de calcul du volume
      setVolume(){
        const coef = parseFloat(0.786215)
        this.form.diampb = !isNaN(parseFloat(this.form.diampb)) ? parseFloat(this.form.diampb)  : 0
        this.form.diampg = !isNaN(parseFloat(this.form.diampg)) ? parseFloat(this.form.diampg)  : 0
        this.form.longeur = !isNaN(parseFloat(this.form.longeur))? parseFloat(this.form.longeur)  : 0
        const dpb = this.form.diampb
        const dgb = this.form.diampg
        const longeur = this.form.longeur
        this.form.volume=(dpb*dgb*0.0001*longeur*coef).toFixed(3)
        
      },
  
      removeAtIndex(index) {
        this.fields.splice(index, 1);
      },
      async getCreationData(){
          
          try {
            this.permis = await this.$permis.get("permis/permisValide").then(response => response.data.result.Items);
            console.log('permis ',this.permis);
          } catch (error) {
              console.log(error.message);
          }
          try {
            this.feuillets = await this.$titres.get("titres/feuilletdf10").then(response => response.data.numfeuilletdf10);
            console.log('feuillets ',this.feuillets);
          } catch (error) {
              console.log(error.message);
          }
          this.showOverlay=false;
      }, 
      fermer(){
        this.$router.push({ name :"abbattages_titres"})
      },
      validate(){
        if(php.empty(this.form.numdf10)){
              this.errors.numpermis.hasError=true
            }
            if(php.empty(this.form.codebarretige)){
              this.errors.codebarretige.hasError=true
            }
            if(php.empty(this.form.codebarregrume)){
              this.errors.numdf10.hasError=true
            }
            if(php.empty(this.form.dateabattage)){
              this.errors.dateabattage.hasError=true
            }
            if(php.empty(this.form.diampb)){
              this.errors.diampb.hasError=true
            }
            if(php.empty(this.form.diampg)){
              this.errors.diamgb.hasError=true
            }
            if(php.empty(this.form.longeur)){
              this.errors.longueur.hasError=true
            }
            if(php.empty(this.form.numdf10) || php.empty(this.form.dateabattage)
              || php.empty(this.form.codebarretige) || php.empty(this.form.codebarregrume)
              || php.empty(this.form.diampb) || php.empty(this.form.diampg)
              || php.empty(this.form.longeur)
              ){
                this.errors.message='Ce champ est obligatoire'
                this.errors.codebarregrume.message=this.errors.codebarretige.message=this.message
                return;
              }
      },
      enregistrer(){ 
        // this.validate();
        // this.$validator.validateAll().then(result => {
        //   if (!result) {
        //     return;
        //   }
        //   alert("Form submitted!");
        // });
        
        //formatage des tiges au modèle de l'api
        // if(php.empty(this.form.numdf10)){
        //       this.errors.numdf10.hasError=true
        //     }else{
        //       this.errors.numdf10.hasError=false
        //     }
        // if(php.empty(this.form.numpermis)){
        //       this.errors.numpermis.hasError=true
        //     }else{
        //       this.errors.numpermis=false
        //     }
        //     if(php.empty(this.form.codebarretige)){
        //       this.errors.codebarretige.hasError=true
        //     }
        //     if(php.empty(this.form.codebarregrume)){
        //       this.errors.codebarregrume.hasError=true
        //     }
        //     if(php.empty(this.form.dateabattage)){
        //       this.errors.dateabattage.hasError=true
        //     }
        //     if(php.empty(this.form.diampb)){
        //       this.errors.diampb.hasError=true
        //     }
        //     if(php.empty(this.form.diampg)){
        //       this.errors.diamgb.hasError=true
        //     }
        //     if(php.empty(this.form.longeur)){
        //       this.errors.longueur.hasError=true
        //     }
        // if(this.errors.numpermis.hasError || this.errors.codebarretige.hasError 
        //     || this.errors.dateabattage.hasError
        //   || this.errors.numdf10.hasError || this.errors.codebarregrume.hasError
        //   || this.errors.diamgb.hasError || this.errors.diampb.hasError || this.errors.longueur.hasError
        //   ){
        //     console.log(this.errors)
        //     return
        //   }
        if(this.tiges.length===0){
          this.validate()
          return
        }else{
              this.tiges.map(elt =>{
              elt.abandonner = elt.abandonner =='oui' ? '1' :"0"
              return elt;
            })
            this.form.dateabattage = this.form.dateabattage.replace(/\//g, "-");
            this.form.volumetotal = this.volumetotal
            this.form.nmbgrume=this.nbgrumes
            this.form.numderniergrume = this.numderniergrume
            this.form.tigesabAbattues = this.tiges;
          }
          console.log('données envoyées ',this.form);
              this.submitted = true 
          this.$abbattage.post('tiges', this.form).then(response => {
              this.submitted = false 
              App.notifySuccess(response.data.message)
              return this.$router.push({ name: "abbattages_titres" });
          }).catch(error => {
              console.log('entrée dans le catch');
              this.submitted = false
              this.errorHappened(error)
          })
        
        /*if (php.empty(this.form.numpermis)) {
          this.notSetNumpermis=true;
          let error={ message:'Veuillez choisir le permis du lot'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.numdf10)) {
          this.notSetNumdf10=true;
          let error={ message:'Veuillez choisir le N° df10 correspondant'}
          return this.sendAlertMessage(error);
        }
        if (php.empty(this.form.dateabatage)) {
          this.notSetDateAbattage=true;
          let error={ message:'Veuillez renseigner la date abattage'}
          return this.sendAlertMessage(error);
        }*/
        
      },
      async sendAlertMessage(error){
          const ok = await this.$refs.codebarreinfo.show({
            title: 'Information',
            message: error,
          })
          //If you throw an error, the method will terminate here unless you surround it wil try/catch
          if (ok) {
              this.$refs.codebarreinfo._close();
              this.notSetNumpermis= true
          } else {
            this.$refs.codebarreinfo._close();
            this.notSetNumpermis= true
          }
      },
      //methode de traitement des erreurs obtenues
      async errorHappened(error, index, fields){
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
        this.selected = items[0]
      },
      commify(n){
        var parts = n.toString().split(".");
        const numberPart = parts[0];
        const decimalPart = parts[1];
        const thousands = /\B(?=(\d{3})+(?!\d))/g;
        return numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "");
      },
      setFieldsToUpdate(){
        this.form.codebarre =this.selected.codebarre;
        this.form.sequence =this.selected.sequence;
        this.form.essence =this.selected.essence;
        this.form.utmx =this.selected.utmx;
        this.form.utmy =this.selected.utmy;
        this.form.diampb =this.selected.diampb;
        this.form.diamgb =this.selected.diamgb;
        this.form.longeur =this.selected.longeur;
        this.elements = this.elements.filter( elt =>elt.codebarre != this.form.codebarre )
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
          actionButton.innerHTML = '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';

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
          
          actionButton.innerHTML = '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
        }
      },
      checkData1(){
        let ok=true
        if(php.empty(this.form.numpermis)){
          this.errors.numpermis.hasError=true
          this.errors.numpermis.message=this.message
          ok= false
        }else if(php.empty(this.form.numdf10)){
          this.errors.numdf10.hasError=true
          this.errors.numdf10.message=this.message
          ok=false
        }else if(php.empty(this.form.dateabattage)){
          this.errors.dateabattage.hasError=true
          this.errors.dateabattage.message=this.message
          ok= false
        }
        return ok
      },
      checkData2(){
        let ok=true
        if(php.empty(this.form.codebarretige)){
          this.errors.codebarretige.hasError=true
          this.errors.codebarretige.message=this.message
          ok= false
        }
        return ok
      },
      checkData3(){
        let ok=true
        if(this.form.essence===''){
          ok=false
        }else
        if(php.empty(this.form.codebarregrume)){
          this.errors.codebarregrume.hasError=true
          this.errors.codebarregrume.message=this.message
          ok= false
        }else if(this.form.essence===''){
          ok=false
        }
        return ok
      },
      checkData4(){
        let ok=true
        if(php.empty(this.form.diampb)
         || php.empty(this.form.diampg)
          ||php.empty(this.form.longeur)){
          this.errors.diampb.hasError=true
          this.errors.diampb.message=this.message
          this.errors.diamgb.hasError=true
          this.errors.diamgb.message=this.message
          this.errors.longueur.hasError=true
          this.errors.longueur.message=this.message
          ok= false
        }
        return ok
      },
      
    },
  mounted(){
    this.getCreationData();
  }
}

</script>
<style scoped>
.sigif-normal-select{
  font-size:1rem; width: 80%; border-radius:0.25rem; height: calc(.8em + .500rem + 2px) !important;
}
.sigif-abattage-titre-input{
  background:#e9ecef; height: 20px; border-radius: 4px;border: 1px solid #e9ecef;display: block;width: 100%;
}
.sigif-abattage-titre-input-to-fil{
  background:#fff; font-weight: bold; padding: 1px 10px;
  height: 20px; border-radius: 4px;border: 1px solid #ced4da;display: block;width: 100%;

}
.form-control-xs {
  height: calc(.8em + .500rem + 2px) !important;
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
.border-danger-date{
  border: 2px solid red;
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
.custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 1rem;
    --vs-line-height: 1;
  }

  label { font-weight: bold !important}

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

.label-dyn{
  display:inline-block;
  margin-top:7px;
}
.borderError{
  border:1px solid red;
}


</style>
