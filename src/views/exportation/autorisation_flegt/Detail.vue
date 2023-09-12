<template>
    <div>
        <b-row>
        <b-col></b-col>
        <b-col class="col-md-auto">
            <a @click.prevent="fermer" class="mx-1 simple-btn">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
            </a>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <b-tabs>
                <b-tab title="Demande autorisation FLEGT">
                    <div class="p-2 pb-0">
                        <h6 style="font-weight:bold">Demande d'autorisation FLEGT n° {{numdemande}} CB n° {{ jsonDetail.codebarrebse }}</h6>
                    </div>
                    <div class="pl-2 pb-2 ml-2" style="border-bottom:2px solid green">
                        <b-row>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Codebarre BSE</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.codebarrebse}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date demande</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.datedemande}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Poids total</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.poids.toFixed(2)}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Nombre d'unités </span>
                                        </div>
                                    </template>
                                    <label class="label-italic">3</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                            </b-col>
                            <b-col cols="3">
                                <b-form-group class="p-0 m-0"
                                    label-cols="5"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Volume total</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.volume.toFixed(2)}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="p-2 ml-2 pt-3" style="border-bottom:2px solid green">
                        <b-row>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>N° autorisation FLEGT</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.numautorisation}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                    label-cols="1"
                                    label-align="right"
                                >
                                    <div style="display:flex;justify-content: space-between;">
                                        <label disabled class="label-italic">autorisation_flegt.pdf</label>
                                        <b-button disabled style="background-color:grey;align-self:flex-end">Mettre à jour...</b-button>
                                        <b-form-file id="form-file" plain hidden></b-form-file>
                                        <label style="font-style:italic;color:green" for="form-file">Télécharger</label>
                                    </div>
                                    
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                    </b-row>
                    </div>
                    <div class="p-2 ml-2 pt-3" style="border-bottom:2px solid green">
                        <b-row>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Date rejet</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.daterejet}}</label>
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                        <b-col cols="4">
                            <b-form-group class="p-0 m-0"
                                    label-cols="3"
                                    label-align="right"
                                >
                                    <template #label>
                                        <div class="label-form">
                                            <span>Motif rejet</span>
                                        </div>
                                    </template>
                                    <label class="label-italic">{{jsonDetail.motifrejet}}</label>
                                    
                                    <!-- <b-form-datepicker style="height: calc(1em + .500rem + 1px) !important" id="datepicker" size="sm" placeholder="dd/mm/yyyy"></b-form-datepicker>  -->
                                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                    </b-row>
                    </div>
                    <b-row>
                        <b-col>
                            <div class="pb-4 m-2">
                                <b-tabs>
                                    <b-tab title="Ventilation des produits par essence">
                                        <div style="border:1px solid grey">
                                            <div class="ml-2 mr-3" style="border-bottom:3px solid green;height: 10px;"></div>
                                            <div class="p-3 pt-0">
                                                <b-row>
                                                    <b-col cols="7">
                                                        <b-table :tbody-tr-class="rowClass" selectable hover @row-selected="onRowSelected" :items="itemsventilation" :fields="fieldsventilation">
                                                            
                                                        </b-table>
                                                    </b-col>
                                                </b-row>
                                            </div>  
                                        </div>
                                    </b-tab>
                                    <b-tab title="Liste des produits">
                                        <h6 style="font-weight:bold">Liste des produits</h6>
                                        <div style="border:1px solid grey">
                                            <div class="ml-2 mr-3" style="border-bottom:3px solid green;height: 10px;"></div>
                                            <div class="p-3 pt-0">
                                                <b-row>
                                                    <b-col>
                                                        <div style="overflow-x:auto;position: relative; width: 1250px;">
                                                            <b-table style="position: relative; width: 120%;" :tbody-tr-class="rowClass" selectable hover @row-selected="onRowSelected" :items="itemsproduits" :fields="fieldsproduits">
                                                            
                                                            </b-table>  
                                                        </div>
                                                        
                                                    </b-col>
                                                </b-row>
                                            </div>  
                                        </div>
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </b-col>
                    </b-row>
                </b-tab>
                <b-tab title="Bois réellement exportés">
                    <!-- <div class="p-2 pb-0 m-0">
                        <h6 style="font-weight:bold">Bois réellement exportés</h6>
                    </div> -->
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Codebarre BSE</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">UC8TCI</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date enregistrement BRE</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">16/05/2021</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date départ</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">16/05/2021</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Mode transport</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">Grumes</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Mode conditionnement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">Maritime</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Transporteur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">En conventionnel</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom navire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">5,589</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code type produit</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">3</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col>
                            <b-form-group class="p-0 m-0"
                                label-cols="5"
                                label-align="right"
                            >
                                <template #label>
                                    <div class="label-form">
                                        <span>Montant droits</span>
                                    </div>
                                </template>
                                <label class="label-italic">3</label>
                                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label-cols="5"
                                label-align="right"
                            >
                                <template #label>
                                    <div class="label-form">
                                        <span>Montant SE</span>
                                    </div>
                                </template>
                                <label class="label-italic">3</label>
                                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group>
                        </b-col>
                    </b-row>
                   </div>
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays récolté</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Code ISO Pays récolté</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays destination</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">BELGIQUE</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Pays exportation</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="6"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>CodeIso Pays exportation</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="6"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>CodeIso Pays destination</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">BE</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                    </b-row>
                   </div>
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Num connaissement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Numdeclex1</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Date connaissement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="6"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Datedeclex1</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">CM</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                    </b-row>
                   </div>
                   <div class="ml-3 p-1" style="border-bottom:3px solid green">
                    <b-row>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Nom exportateur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">BRUSSELS WOOD</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Expéditeur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">BOIS LEGAL CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Adresse expéditeur</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">7852 BRUXELLES</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col cols="4">
                                <div class="p-2">
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Destinataire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">Port de DOUALA</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Adresse destinataire</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">BOIS LEGAL CAMEROUN</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                    <b-form-group class="p-0 m-0"
                                        label-cols="5"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <div class="label-form">
                                                <span>Port embarquement</span>
                                            </div>
                                        </template>
                                        <label class="label-italic">35135 MFOU</label>
                                        <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                                    </b-form-group>
                                </div>
                        </b-col>
                        <b-col>
                            <b-form-group class="p-0 m-0"
                                label-cols="5"
                                label-align="right"
                            >
                                <template #label>
                                    <div class="label-form">
                                        <span>Port débarquement</span>
                                    </div>
                                </template>
                                <label class="label-italic">Port de BRUXELLES</label>
                                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                            </b-form-group> 
                        </b-col>
                    </b-row>
                   </div>
                </b-tab>
            </b-tabs>
        </b-col>
    </b-row>
    </div>
</template>
<script>
    export default{
        name:'detail-bois-exporte',
        data(){
            return{
                fieldsventilation:[
                    {key:'essence',label:'Essence',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                    {key:'nombreunites',label:'Nombre d\'unités',thStyle:{color:'green'}},
                ],
                fieldsproduits:[
                    {key:'codebarre',label:'Codebarre',thStyle:{color:'green'}},
                    {key:'volume',label:'Volume',thStyle:{color:'green'}},
                    {key:'poids',label:'Poids',thStyle:{color:'green'}},
                    {key:'essence',label:'Essence',thStyle:{color:'green'}},
                    {key:'codecemac',label:'Code CEMAC',thStyle:{color:'green'}},
                    {key:'codesh',label:'Code SH',thStyle:{color:'green'}},
                    {key:'codebarre BSE',label:'Codebarre BSE',thStyle:{color:'green'}},
                    {key:'nombrepieces',label:'Nombre de pièces',thStyle:{color:'green'}},
                    {key:'diamgrosbout',label:'Diametre gros bout',thStyle:{color:'green'}},
                    {key:'diampetitbout',label:'Diametre petit bout',thStyle:{color:'green'}},
                    {key:'longueur',label:'Longueur',thStyle:{color:'green'}},
                    {key:'nrocontainer',label:'Nro container',thStyle:{color:'green'}},
                    {key:'typroduit',label:'Type produit',thStyle:{color:'green'}},
                ],
                selected:{},
                
                elementsVentilation:[],
                elementsProduits:[],
                json:{
                    data:{
                        listingVentilation:[
                            {essence:'CT002',volume:'LES1IFOUL',poids:'tali',nombreunites:'26/05/2021'
                            }
                        ],
                        listingProduits:[

                        ]
                    }
                },
                options:[
                    {text:'Fiscalite',value:'fiscalité',disabled:true},
                    {text:'Contentieux',value:'contentieux',disabled:true}
                ],
                jsonDetail:{},
                selected:true,
                numdemande:this.$route.params.id
            }
        },
        methods:{
            fermer(){
                this.$router.push({name:'autorisation_flegt'})
            },
            canCreateBSE(){
                return false
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
        getDetailsAutFLEGT(){
                // this.isBusy = true;
                // const params = this.getRequestParams(this.currentPage, this.pageSize);
                this.$exportations
                    .get("authorisationflegt/detail_1/" + this.numdemande)
                    .then((response) => {
                        console.log(response)
                    // this.total = response.data.result.totalItems;
                    // this.currentPage = response.data.result.currentPage + 1;
                    this.jsonDetail = response.data.result;
                    
                    
                   
                    // elt.type_operation = elt.parcOperationTypeopeparc.libelle;
                    this.jsonDetail.datedemande =
                    this.jsonDetail.datedemande !== null
                            ? this.$dayjs(this.jsonDetail.datedemande).format("DD/MM/YYYY")
                            : "";
                        // elt.dateactivation =
                        // elt.dateactivation !== null
                        //     ? this.$dayjs(elt.dateactivation).format("DD/MM/YYYY")
                        //     : "";
                        //elt.siteoperation = elt.siteoperation.intitule;

                        
                    // this.isBusy = false;
                    // setTimeout(() => {
                    //     // console.log(this.$refs);
                    //     this.$refs['selectableTable'].selectRow(0);
                        
                    // }, 200);
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            }
        },
        computed:{
            itemsventilation() { 
        return this.elementsVentilation.map((a, index) => {  
            a.isFirst = index == 0        
            a.isEven = index %2 == 0        
            return a
      })
    },
            itemsproduits() { 
        return this.elementsProduits.map((a, index) => {  
            a.isFirst = index == 0        
            a.isEven = index %2 == 0        
            return a
      })
    },
   
        },
        mounted(){
            this.elementsVentilation=this.json.data.listingVentilation
            // this.elementsProduits=this.json.data.listingProduits
            this.getDetailsAutFLEGT()
        }
    }
</script>
<style>
            .not-change-image-opacity:hover{
        cursor:pointer;
        color:#82C138;
        }
        .change-image-opacity{
        opacity: 0.15;
        }
        .not-change-image-opacity{
        opacity: 1;
        }
    .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }
    
    .label-form{
        margin-top:-8px;
    }
    .link{
        color:green;
    }
    a.link:hover{
        font-style: italic;
    }
    a:hover{
        color:black;
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
    .label-italic{
        font-style: italic;
    }
</style>