<template>
    <div id="cover" class="min-vh-100">
          <div>
            <tab-head :fermer="fermer" title="Contrat de partenariat"></tab-head>
            <b-row class="m-4">
                <b-col cols="5">
                    <b-row>
                        <b-col cols="3"><label class="mr-1">Type de titre</label></b-col>
                        <b-col cols="8"><span class="font-weight-bold">Concéssion forrestière en convention provisoire</span></b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3"><label class="mr-1">Entité forestière :</label></b-col>
                        <b-col cols="8"><span class="font-weight-bold">BOIS LEGAL CAMEROUN</span></b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3"><label class="mr-1">Marteau :</label></b-col>
                        <b-col cols="8"><span class="font-weight-bold" style="letter-spacing:0.5cm ; font-family:'Arial Narrow', Arial, sans-serif;">BLC</span></b-col>
                    </b-row>
                </b-col>
                <b-col cols="5">
                    <b-row>
                        <b-col cols="3"><label class="mr-1">Type de titre</label></b-col>
                        <b-col cols="8"><span class="font-weight-bold">Concéssion forrestière en convention provisoire</span></b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="3"><label class="mr-1">Superficie Totale :</label></b-col>
                        <b-col cols="8"><span class="font-weight-bold">20 000 Ha</span></b-col>
                    </b-row>
                </b-col>
            </b-row>
          <div class="ml-3">
            <b-row class="wrap" ref="wrap">
                <b-tabs id="tabs" class="w-100" >
                  <button class="arrow-left" @click="scroll_left"><b-icon-arrow-left/></button>
                    <b-tab title="Concession en  convention provisoire n° 2001">
                    <div class="ml-1" style="border:1px solid grey">
                        <b-row>
                        <b-col cols="3">
                            <div class="pl-3">
                                <b-form-group class="p-0 m-0"
                                    label="Arrêté d'attribution"
                                    label-cols="8"
                                >
                                    <!-- <b-form-input value="2001/CP" disabled class="form-control-xs bg-white"></b-form-input> -->
                                    <label class="label-form">2001/CP</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Montant de l'offre(F/ha/an)"
                                    label-cols="8"
                                >
                                    <!-- <b-form-input value="1 100" disabled class="form-control-xs bg-white"></b-form-input> -->
                                    <label class="label-form">1 100</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Date de cautionnement"
                                    label-cols="8"
                                >
                                    <!-- <b-form-input value="08/01/2021" disabled class="form-control-xs bg-white"></b-form-input> -->
                                    <label class="label-form">08/01/2021</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Montant total de la RFA"
                                    label-cols="8"
                                >
                                    <!-- <b-form-input value="22 000 000" disabled class="form-control-xs bg-white"></b-form-input> -->
                                    <label class="label-form">22 000 000</label>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label="Joindre la caution"
                                    label-cols="6"
                                >
                                    <div class="mt-2" style="display:flex;width:100%;justify-content: space-between;">
                                        <span style="font-style: italic;">caution.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                        <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                    </div>
                                </b-form-group>
                            </div>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                label="Date d'attribution (prov.)"
                                label-cols="8"
                            >
                                <!-- <b-form-input value="01/02/2021" disabled class="form-control-xs bg-white"></b-form-input> -->
                                <label class="label-form">01/02/2021</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="N° cautionnement"
                                label-cols="8"
                            >
                                <!-- <b-form-input value="2001" disabled class="form-control-xs bg-white"></b-form-input> -->
                                <label class="label-form">2001</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Date fin de cautionnement"
                                label-cols="8"
                            >
                                <!-- <b-form-input value="31/12/2021" disabled class="form-control-xs bg-white"></b-form-input> -->
                                <label class="label-form">31/12/2021</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Durée de la convention"
                                label-cols="8"
                            >
                                <!-- <b-form-input value="3" disabled class="form-control-xs bg-white"></b-form-input> -->
                                <label>3</label>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Joindre la convention d'exploitation"
                                label-cols="6"
                            >
                                <div class="mt-2" style="display:flex;justify-content: space-between;">
                                    <span style="font-style: italic;">convention.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                    <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col cols="3">
                            <b-form-group
                                label="Date de fin de validité (prov)"
                                label-cols="7"
                            >
                                <!-- <b-form-input disabled value="01/02/2024" class="form-control-xs"></b-form-input> -->
                                <label class="label-form">01/02/2024</label>
                            </b-form-group>
                        </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="4">
                                <b-button
                                    :class="visible_avis_appel ? null : 'collapsed'"
                                        :aria-expanded="visible_avis_appel ? 'true' : 'false'"
                                        aria-controls="collapse-avis-appel"
                                    @click="visible_avis_appel=!visible_avis_appel" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                    <ul>
                                    <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible_avis_appel, 'collapse-close': !visible_avis_appel }">Avis d'appels d'offres</li></ul>
                                </b-button>
                                <b-collapse id="collapse-avis-appel" v-model="visible_avis_appel">
                                    <b-form-group class="p-0 m-0"
                                        label="Numéro"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                    <!-- <b-form-input style="width:50%" disabled class="form-control-xs"></b-form-input> -->
                                    <label class="label-form">12</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label="Date de signature"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                        <!-- <b-form-datepicker style="width:75%" disabled class="form-control-xs"></b-form-datepicker> -->
                                        <label class="label-form">12/12/2012</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label="Document"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                    <div class="mt-2" style="display:flex;justify-content: space-between;">
                                        <span style="font-style: italic;">avis d'appel d'offres.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                        <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                    </div>
                                    </b-form-group>
                                </b-collapse>
                            </b-col>
                            <b-col cols="4">
                                <div>
                                    <b-button
                                        :class="visible_recepisse_depot ? null : 'collapsed'"
                                            :aria-expanded="visible_recepisse_depot ? 'true' : 'false'"
                                            aria-controls="collapse-6"
                                        @click="visible_recepisse_depot=!visible_recepisse_depot" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                        <ul>
                                        <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible_recepisse_depot, 'collapse-close': !visible_recepisse_depot }">Récépissé du dépôt des dossiers</li></ul>
                                    </b-button>
                                    <b-collapse id="visible_recepisse_depot" v-model="visible_recepisse_depot">
                                        <b-form-group class="p-0 m-0"
                                            label="Numéro"
                                            label-cols="4"
                                            label-align="right"
                                        >
                                            <!-- <b-form-input style="width:50%" disabled class="form-control-xs"></b-form-input> -->
                                            <label class="label-form">32</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Date de signature"
                                            label-cols="4"
                                            label-align="right"
                                        >
                                            <!-- <b-form-datepicker style="width:75%" disabled class="form-control-xs"></b-form-datepicker> -->
                                            <label class="label-form">09/12/2021</label>
                                        </b-form-group>
                                        <b-form-group class="p-0 m-0"
                                            label="Document"
                                            label-cols="4"
                                            label-align="right"
                                        >
                                        <div class="mt-2" style="display:flex;justify-content: space-between;">
                                            <span style="font-style: italic;">récépissé dépôt.pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                            <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                        </div>
                                        </b-form-group>
                                    </b-collapse>
                                </div>
                            </b-col>
                            <b-col cols="4">
                                <b-button
                                        :class="visible_plan_approvissionnement ? null : 'collapsed'"
                                            :aria-expanded="visible_plan_approvissionnement ? 'true' : 'false'"
                                            aria-controls="collapse-6"
                                        @click="visible_plan_approvissionnement=!visible_plan_approvissionnement" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                        <ul>
                                        <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible_plan_approvissionnement, 'collapse-close': !visible_plan_approvissionnement }">Plan d'approvisionnement alimentaire</li></ul>
                                    </b-button>
                                <b-collapse id="visible_plan_approvissionnement" v-model="visible_plan_approvissionnement">
                                    <b-form-group class="p-0 m-0"
                                        label="Numéro"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                        <!-- <b-form-input style="width:50%" disabled class="form-control-xs"></b-form-input> -->
                                        <label class="label-form">09</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label="Date de signature"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                        <!-- <b-form-datepicker style="width:75%" disabled class="form-control-xs"></b-form-datepicker> -->
                                        <label class="label-form">01/08/2012</label>
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label="Document"
                                        label-cols="4"
                                        label-align="right"
                                    >
                                        <div class="mt-2" style="display:flex;justify-content: space-between;">
                                            <span style="font-style: italic;">plan d'ap... .pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                            <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                        </div>
                                    </b-form-group>
                                </b-collapse>
                                
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="7">
                                    <b-row>
                                        <b-col cols="8">
                                            <b-button
                                                :class="visible5 ? null : 'collapsed'"
                                                    :aria-expanded="visible5 ? 'true' : 'false'"
                                                    aria-controls="collapse-5"
                                                @click="visible5=!visible5" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                                <ul>
                                                <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible5, 'collapse-close': !visible5 }">Note de service précisant l'interdiction du braconnage et du transport de viande de brousse</li></ul>
                                            </b-button>
                                            <b-collapse id="collapse-5" v-model="visible5">
                                                <b-form-group class="p-0 m-0"
                                                label="Numéro"
                                                label-cols="3"
                                                label-align="right"
                                            >
                                                    <!-- <b-form-input style="width:50%" disabled class="form-control-xs"></b-form-input> -->
                                                    <label class="label-form">012</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Date"
                                                label-cols="3"
                                                label-align="right"
                                            >
                                                <!-- <b-form-datepicker style="width:75%" disabled class="form-control-xs"></b-form-datepicker> -->
                                                <label class="label-form">09/12/2022</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Document"
                                                label-cols="3"
                                                label-align="right"
                                            >
                                            <div class="mt-2" style="display:flex;justify-content: space-between;">
                                                <span style="font-style: italic;">note de service.. .pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                            </div>
                                            </b-form-group>
                                            </b-collapse>
                                            
                                        </b-col>
                                    </b-row>
                            </b-col>
                            <b-col>
                                <b-row>
                                    <b-col cols="10">
                                        <b-button
                                                :class="visible ? null : 'collapsed'"
                                                    :aria-expanded="visible ? 'true' : 'false'"
                                                    aria-controls="collapse-5"
                                                @click="visible=!visible" class="p-0 m-0 pt-3" style="border:none; background: none; color:black">
                                                <ul>
                                                <li style="text-align: left" class="font-weight-bold" :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Note de service précisant les sanctions éventuelles</li></ul>
                                            </b-button>
                                        <b-collapse id="collapse-5" v-model="visible">
                                            <b-form-group class="p-0 m-0"
                                                label="Numéro"
                                                label-cols="4"
                                                label-align="right"
                                                >
                                                    <!-- <b-form-input style="width:50%" disabled class="form-control-xs"></b-form-input> -->
                                                    <label class="label-form">342</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                label="Date"
                                                label-cols="4"
                                                label-align="right"
                                            >
                                                <!-- <b-form-datepicker style="width:75%" disabled class="form-control-xs"></b-form-datepicker> -->
                                                <label class="label-form">21/07/2019</label>
                                            </b-form-group>
                                            <b-form-group class="p-0 m-0"
                                                    label="Document"
                                                    label-cols="4"
                                                    label-align="right"
                                                >
                                                <div class="mt-2" style="display:flex;justify-content: space-between;">
                                                    <span style="font-style: italic;">note de service sanct... .pdf</span><b-form-file id="actual-btn" plain class="form-control-sm"  size="sm" hidden/>
                                                    <label style="font-style: italic;color:green" for="actual-btn">Télécharger...</label>
                                                </div>
                                            </b-form-group>
                                        </b-collapse>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <div class="ml-3">
                                    <b-tabs>
                                        <b-tab title="Détails des informations">
                                            <div style="border:1px solid grey">
                                                <div class="ml-2 mr-3" style="border-bottom:3px solid green;height: 10px;"></div>
                                                <div class="p-3">
                                                    <b-row>
                                                        <b-col cols="7">
                                                            <h6 style="border-top:2px solid green">Assiettes annuelles de coupe</h6>
                                                            <b-table :tbody-tr-class="rowClass" selectable hover @row-selected="onRowSelected" :items="itemsassiettes" :fields="fieldsassiettes">
                                                                
                                                            </b-table>
                                                        </b-col>
                                                        <b-col>
                                                            <h6 style="border-top:2px solid green">Répartition des superficies par arrondissement</h6>
                                                            <b-table selectable hover :items="itemsrepartition" :fields="fieldsrepartition">

                                                            </b-table>
                                                        </b-col>
                                                    </b-row>
                                                </div>  
                                            </div>
                                            
                                        </b-tab>
                                    </b-tabs>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    </b-tab>
                    <b-tab class="" title="Location Concession en  convention provisoire n° 2001">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Répartition des superficies par arrondissement</h6>
                                <b-row>
                                    <b-col cols="5">
                                        <b-table selectable :items="items2" :fields="fields2">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab class="p-2" title="Contrat de partenariat industriel">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Liste des contrats de partenariat</h6>
                                <b-row>
                                    <b-col>
                                        <b-table selectable :items="items3" :fields="fields3">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab class="p-2" title="Liste des suspensions">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Suspension du titre n°</h6>
                                <b-row>
                                    <b-col>
                                        <b-table selectable :items="items4" :fields="fields4">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab class="p-2" title="Liste des retraits">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Retrait du titre n°</h6>
                                <b-row>
                                    <b-col>
                                        <b-table selectable :items="items5" :fields="fields5">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab>   
                    <b-tab class="p-2" title="Liste des abandons">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Abandon du titre n°</h6>
                                <b-row>
                                    <b-col>
                                        <b-table selectable :items="items6" :fields="fields6">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab> 
                    <b-tab class="p-2" title="Liste des transferts">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Transfert du titre n°</h6>
                                <b-row>
                                    <b-col>
                                        <b-table selectable :items="items7" :fields="fields7">

                                        </b-table>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                    </b-tab>  
                    <b-tab class="p-2" title="Liste des renouvellements">
                        <div class="p-3" style="border:1px solid grey">
                            <div style="border-bottom:3px solid green">
                                <h6>Renouvellement du titre n°</h6>
                            </div>
                        </div>
                    </b-tab> 
                    <button class="arrow-right" @click="scroll_right"><b-icon-arrow-right/></button>
                </b-tabs>
              </b-row> 
            </div>
    </div>
</div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;

  export default {
name: "concesson_en_cd_ccp",
components: {},
computed:{
    /*propriétés liées aux accès*/
    canExportLot(){return true},

    items1() { 
      return this.elements1.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    itemsrepartition() { 
      return []
    },
    itemsassiettes() { 
      return []
    },
    items2() { 
      return []
    },
    items3() { 
      return []
    },
    items4() { 
      return []
    },
    items5() { 
      return []
    },
    items6() { 
      return []
    },
    items7() { 
      return []
    },
    items8() { 
      return []
    },
    items9() { 
      return []
    },
    items10() { 
      return []
    },
    items11() { 
      return []
    },
    items12() { 
      return []
    },
    
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
  },
data: () => ({

  visible:true,
  visible_avis_appel:true,
  visible_recepisse_depot:true,
  visible_plan_approvissionnement:true,
              visible5:true,
              fieldsrepartition:[
                  {key:'arrondissement',label:'Arrondissement',thStyle:{color:'green'}},
                  {key:'superficie',label:'Superficie',thStyle:{color:'green'}},
              ],
              fieldsassiettes:[
                  {key:'numassiette',label:'Assiette n°',thStyle:{color:'green'}},
                  {key:'limites',label:'limites',thStyle:{color:'green'}},
                  {key:'materialisation',label:'Matérialisation',thStyle:{color:'green'}},
              ],
              fields2:[
                  {key:'arrondissement',label:'Arrondissement',thStyle:{color:'green'}},
                  {key:'departement',label:'Département',thStyle:{color:'green'}},
                  {key:'region',label:'Région',thStyle:{color:'green'}},
              ],
              fields3:[
                  {key:'raisonsociale',label:'Raison sociale',thStyle:{color:'green'}},
                  {key:'sigle',label:'Sigle',thStyle:{color:'green'}},
                  {key:'numcontrat',label:'Contrat n°',thStyle:{color:'green'}},
                  {key:'datecontrat',label:'Date du contrat',thStyle:{color:'green'}},
                  {key:'acte',label:'Acte approbation n°',thStyle:{color:'green'}},
                  {key:'dateacte',label:'Date acte approbation',thStyle:{color:'green'}},
              ],
              fields4:[
                  {key:'numsuspension',label:'N° de la suspension',thStyle:{color:'green'}},
                  {key:'dateactesuspension',label:'date acte de suspension',thStyle:{color:'green'}},
                  {key:'motif',label:'motif',thStyle:{color:'green'}},
                  {key:'datedebutsuspension',label:'Date début suspension',thStyle:{color:'green'}},
                  {key:'datefinsuspension',label:'datefinsuspension',thStyle:{color:'green'}}
              ],
              fields5:[
                  {key:'numretrait',label:'N° du retrait',thStyle:{color:'green'}},
                  {key:'dateretrait',label:'Date de l\'acte de retrait',thStyle:{color:'green'}},
                  {key:'motif',label:'Motif',thStyle:{color:'green'}},
              ],
              fields6:[
                  {key:'numrabandon',label:'N° abandon',thStyle:{color:'green'}},
                  {key:'datenotifabandon',label:'Date notification abandon',thStyle:{color:'green'}},
                  {key:'redevance',label:'Redevance abandon',thStyle:{color:'green'}},
              ],
              fields7:[
                  {key:'numtransfert',label:'N° du transfert',thStyle:{color:'green'}},
                  {key:'datenotiftransfert',label:'Date de notification transfert',thStyle:{color:'green'}},
                  {key:'motif',label:'Motif de la quittance',thStyle:{color:'green'}},
                  {key:'datevente',label:'Date de vente',thStyle:{color:'green'}},
                  {key:'taxe',label:'Taxe de transfert',thStyle:{color:'green'}},
                  {key:'numquittance',label:'N° quittance',thStyle:{color:'green'}},
                  {key:'cedeur',label:'Cédeur',thStyle:{color:'green'}},
                  {key:'acquereur',label:'Acquéreur',thStyle:{color:'green'}},
              ],
              isRowselected:false
}),


methods: {
  fermer(){
      this.$router.push({name: 'concession_en_cp'})
  },
  scroll_left() {
    let content = document.querySelector("#tabs__BV_tab_controls_");
    content.scrollLeft -= 200;
    console.log("=========================");
    console.log($('#tabs__BV_tab_controls_').css('width'));
    console.log("=========================");
  },
  scroll_right() {
    let content = document.querySelector("#tabs__BV_tab_controls_");
    content.scrollLeft += 200;
  },
  onRowSelected(items) {
      console.log('row selected',items);
      itemsassiettes.isSelected =true;
      this.isRowselected=true
      this.selected = itemsassiettes
  },
  rowClass(item, type) {
      if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
      }else{
      return 
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
},

mounted() {
  $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
  window.addEventListener('resize', () => {
    $('#tabs__BV_tab_controls_').css('width', $('#tabs__BV_tab_controls_').parent().css('width'))
  })
}

}

</script>

<style scoped>
label{
  font-weight: normal !important;
}
.style{
  margin-left: 10px;
  font-weight: bold !important;
  font-style: 60px !important;
  color: rgb(19, 16, 16);
  padding: 3px 10px;
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
    overflow-x: hidden !important;
}

.collapse-close{
  list-style-type: disclosure-closed;
}
.collapse-open{
  list-style-type: disclosure-open;
}


/*style barre de recherche */




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
  cursor: pointer;
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

#wrap:after {
    content:"";
    position:relative;
    margin-left:-20px;
    pointer-events:none;
    top: 15px;
    right:5px;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-color: #8E97AF transparent transparent transparent;
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
  width: 180px;
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

/* style des tabs */


.wrap {
  overflow: hidden;
  width: 100%;
  flex-direction: row;
  padding: 0 !important;
}
.tabs {
  position: relative;
}

</style>
<style>

#tabs__BV_tab_controls_{
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  padding: 0!important;
}
.contents {
  padding: 40px 20px;
}

.arrow-left{
  position: absolute;
  top: 10px;
  left: -5px;
}

.arrow-right{
  position: absolute;
  top: 10px;
  right: -5px;
}

.arrow-left, .arrow-right {
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  background-color: rgb(0, 82, 44)!important;
}


.nav-tabs .nav-link.active {
  background-color: rgb(0, 82, 44)!important;
  font-weight: bold;
  color: white !important;
  border-color:  rgb(0, 82, 44)!important;
}
.nav-tabs .nav-link {
  color: grey;
}



 

</style>