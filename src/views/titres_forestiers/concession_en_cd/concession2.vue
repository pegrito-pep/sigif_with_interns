<template>
    <div id="cover" class="min-vh-100">
          <div>
            <b-row>
              <b-col>
                <h4 class="tab-header-left-text">
                  <button id="toggleSideBar" @click="toggleSideBar">
                    <span aria-hidden="true" style="font-size: 30px">&times;</span>
                  </button>
                  <span
                    class="ml-1 font-weight-bold"
                  >lot bris abattage</span>
                </h4>
              </b-col>
              <b-col class="col-md-auto">
                <span>
                  <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn" style="color:#82C138">
                    <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
                  </a>
                </span>
              </b-col>
            </b-row>
            <b-card>
              <b-row class="mt-1">
                <b-col sm="3">
                  <label for="input-small">Type du Titre:</label>
                  <label class="style" for="input-small">Concession en convention definitive</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">Concession forestiere en CD no:</label>
                  <label class="style" for="input-small">1002</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">Entité forestiere:</label>
                  <label class="style" for="input-small">LA SOCIETE FORESTIERE DE ISCII</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">Marteau:</label>
                  <label class="style" for="input-small">SPIS</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">Superficie Totale(ha):</label>
                  <label class="style" for="input-small">4</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">N° UFE:</label>
                  <label  class="style" for="input-small">4</label>
                </b-col>

                <b-col sm="3">
                  <label for="input-small">N° UFA:</label>
                  <label class="style" for="input-small">2002</label>
                </b-col>
              </b-row>
          </b-card>
            

      

          </div>
          <!--entete des tableaux -->
          <!-- <b-container fluid v-if="section == 'inventaires'"> -->
            <!-- <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des inventaires</h4>
                  <a :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Visualiser</a>
                </b-col>
                <b-col class="col-md-auto">
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                  <span >
                    <a @click.prevent="callEditOperationParc" :disabled="canUpdateOperationParc" size="sm" :class="{'change-image-opacity': !canUpdateOperationParc,  'not-change-image-opacity': canUpdateOperationParc}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateOperationParc}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                  <a :disabled="canViewDetailsOperationParc" size="sm" :class="{'change-image-opacity': !canViewDetailsOperationParc,  'not-change-image-opacity': canViewDetailsOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsOperationParc}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  <a :disabled="canDeleteOperationParc" size="sm" :class="{'change-image-opacity': !canDeleteOperationParc,  'not-change-image-opacity': canDeleteOperationParc}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteOperationParc}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Cloturer</a>
                  <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn">Table de stock</a>
                  <a :disabled="canSubmitOperationParc" size="sm" :class="{'change-image-opacity': !canSubmitOperationParc,  'not-change-image-opacity': canSubmitOperationParc}" class="mx-1 simple-btn">Table de peuplement</a>
                  </span>
                  
                </b-col>
              </b-row>
            </div> -->
            <!--implémentation tableau proprement dite-->
            <!-- <div class="ml-1"> -->
              <!-- <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                <template #empty>
                    <h4 style="color: green" class="text-center">Aucun<span class="font-weight-bold">inventaire</span> trouvé!!</h4>
                </template>
                <template slot="thead-top" slot-scope="{}">
                  <tr>
                    <th></th><th></th><th></th><th></th><th></th> <th></th>
                    <th class="text-center" colspan="6" style="border-bottom: 4px solid #82C138">Inventaire</th>
                  </tr>
              </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
              </b-table> -->
              <ul class="nav nav-tabs">
              <li class="nav-item p-0" :class="{ custumSigifTab:  ! ['Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Concession'"
                  >Concession en convention définitive No 1002</a
                  >
              </li>
              <li class="nav-item p-0" :class="{ custumSigifTab: ! ['Concession','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Localisation'"
                  >Localisation Concession en convention définitive No 1002</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: ! ['Concession','Localisation','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Détailinterdites'"
                  >Détail des essences interdites</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: ! ['Concession','Localisation','Détailinterdites','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Détailaménagement'"
                  >Détail des essences sous aménagement</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab:  ! ['Concession','Localisation','Détailinterdites','Détailaménagement','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section)}">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Contratindustriel'"
                  >Contrat de parténariat industriel</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: ! ['Concession','Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listerenouvellements','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Listesuspensions'"
                  >Liste des suspensions</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab:  ! ['Concession','Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeabandons'] }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Listeretraits'"
                  >Liste des retraits</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab: ! [ 'Concession','Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listetransferts','Listeretraits'] }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Listeabandons'"
                  >Liste des abandons</a
                  >
              </li>
              <li class="nav-item" :class="{ custumSigifTab:  ! ['Concession','Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listerenouvellements','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Listetransferts'"
                  >Liste des transferts</a
                  >
              </li>
               <li class="nav-item" :class="{ custumSigifTab:  ! ['Concession','Localisation','Détailinterdites','Détailaménagement','Contratindustriel','Listesuspensions','Listetransferts','Listeabandons','Listeretraits'].includes(section) }">
                  <a
                  data-toggle="tab"
                  href="#"
                  class="nav-link"
                  style="color: inherit"
                  @click.prevent="section = 'Listerenouvellements'"
                  >Liste des renouvellements</a
                  >
              </li>
             
            </ul>
            <b-container fluid v-if="section == 'Concession'">
            <div class="ml-1">



              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>

          </b-container>


            <b-container fluid v-if="section == 'Localisation'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Repartition des superficies par arrondissement</h4> 
                </b-col>
              </b-row>
            </div>
             <div class="ml-1">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields6" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}></b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>

            <b-container fluid v-if="section == 'Détailinterdites'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Liste des essences interdites</h4> 
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Ajouter</a>
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img> Enlever</a>
                </b-col>
              </b-row>
            </div>
             <div class="ml-1">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields7" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important"><b-form-input type="text">{{ ++data.index }}</b-form-input></b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Détailaménagement'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Liste des essences sous aménégement</h4> 
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Ajouter</a>
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img> Enlever</a>
                </b-col>
              </b-row>
            </div>
             <div class="ml-1">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields5" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important"><b-form-input type="text">{{ ++data.index }}</b-form-input></b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Contratindustriel'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Liste des Contrats de Partenariat</h4>                  
                </b-col>
              </b-row>
            </div>
             <div class="ml-1" >
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields4" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Listesuspensions'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Suspension du titre no 1002</h4>                  
                </b-col>
              </b-row>
            </div>
             <div class="ml-1" style="width:50% ;">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields3" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Listeretraits'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Liste des retraits no 1002</h4>                  
                </b-col>
              </b-row>
            </div>
             <div class="ml-1" style="width:40% ;">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields2" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Listeabandons'">
            <div class="ml-1">



              <!--AJOUT DE LA PAGINATION -->
              <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          </b-container>


            <b-container fluid v-if="section == 'Listetransferts'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Tranfert du titre no 1002</h4>                  
                </b-col>
              </b-row>
            </div>
             <div class="ml-1" style="width:80% ;">
             <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields1" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> 
              </div>
          </div>
          </b-container>

            <b-container fluid v-if="section == 'Listerenouvellements'">
            <div class="ml-1">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2">Renouvellement du titre no 1002</h4>                  
                </b-col>
              </b-row>
            </div>

          </div>
          </b-container>
          
          <!-- <b-container fluid v-if="section == 'verifInventaires'">
              <div class="m-0 px-2 table-header-border">
              <b-row>
                <b-col class="d-flex">
                  <h4 class="tab-header-left-text mr-2"><b-img src="@/assets/images/picto_user_vert.png"></b-img> Liste des inventaires</h4>
                  <a :disabled="canViewDetailsInventaire" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsInventaire}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>Visualiser</a>
                </b-col>
                <b-col class="col-md-auto">
                  <a :disabled="canCreateUtilisateur" @click.prevent="addUser" size="sm" :class="{'change-image-opacity': !canCreateUtilisateur,  'not-change-image-opacity': canCreateUtilisateur}" class="mx-1 simple-btn"><b-img  src="@/assets/images/iconPLUS_16x16.png"></b-img> Créer</a>
                  <span >
                    <a @click.prevent="callEditInventaire" :disabled="canUpdateInventaire" size="sm" :class="{'change-image-opacity': !canUpdateInventaire,  'not-change-image-opacity': canUpdateInventaire}"  class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canUpdateInventaire}" src="@/assets/images/iconMODIFIER_16x16.png"></b-img>modifier</a>
                  <a :disabled="canDeleteInventaire" size="sm" :class="{'change-image-opacity': !canDeleteInventaire,  'not-change-image-opacity': canDeleteInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteInventaire}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>supprimer</a>
                  <a :disabled="canViewDetailsInventaire" @click.prevent="showDetails()" size="sm" :class="{'change-image-opacity': !canViewDetailsInventaire,  'not-change-image-opacity': canViewDetailsInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canViewDetailsInventaire}" src="@/assets/images/iconVISUALISER_16x16.png"></b-img>consulter</a>
                  <a :disabled="canDeleteInventaire" size="sm" :class="{'change-image-opacity': !canDeleteInventaire,  'not-change-image-opacity': canDeleteInventaire}" class="mx-1 simple-btn"><b-img :class="{'change-image-opacity': !canDeleteInventaire}" src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Cloturer</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Table de stock</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Table de peuplement</a>
                  <a :disabled="canSubmitInventaire" size="sm" :class="{'change-image-opacity': !canSubmitInventaire,  'not-change-image-opacity': canSubmitInventaire}" class="mx-1 simple-btn">Exporter les tiges hors limites</a>
                  </span>
                  
                </b-col>
              </b-row>
            </div> -->
             <!-- implémentation tableau proprement dite -->
            <!-- <div class="ml-1">
              <b-table  :busy="isBusy" hover  select-mode="single" responsive="sm" ref="selectableTable" selectable @row-selected="onRowSelected"
                :items="items" 
                :fields="fields" 
                :tbody-tr-class="rowClass" >
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargement...</strong>
                  </div>
                </template>
                 <template #cell(index)="data"><b class="ml-1" style="color: #175131!important">{{ ++data.index }}</b> </template>
                 <template #cell(actif)>
                     <span  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                </template>
                <template #cell(estcemac)="data">
                     <span v-if="data.estcemac==1"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true"></i></span>
                     <span v-else></span>
                </template>
              </b-table> -->

              <!--AJOUT DE LA PAGINATION -->
              <!-- <paginator hr="top" :offset="offset" :total="total" :limit="perPage" :page="currentPage" @pageChanged="changePage" @limitChanged="(limit) => {perPage = limit}" />  
          </div>
          </b-container> -->

    </div>

</template>

<script>
  const php  = require ( 'phpjs' ) ;
   import { mapGetters } from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/fr';
export default {
  name: "inventaires",
  components:{
    DatePicker
  },
  data: () => ({
    section: "inventaires",
    /**données liées au modal d'ajout d'un utilisateur */
    headerBgVariant:'success',
    bodyBgVariant:'light',
    isBusy:false,
    isRowselected:false,
    width:"w-50",
    selectWidht:"w-75",
    /*porpriétés data de pagination*/
    perPage: 10,
    currentPage: 1,
    total: 0,
    visible: true,
    //données du tableaux
    fields1: [
        { key: 'index', label: 'No de transfert' },
        { key: 'entite', label: 'Date de notiification de tranfmotif' },
        { key: 'numtitre', label: 'Montant de la quittaDate vente' },
        { key: 'typetitre', label: 'Taxe de transfet' },
        { key: 'numufa', label: 'No de la quittance' }, 
        { key: 'numufe', label: 'Date de la quittanceCédeur' }, 
        { key: 'numaac', label: 'Aquéreur' }, 
    ],

        fields2: [
        { key: 'index', label: 'No de retrait' },
        { key: 'entite', label: 'Date de l\'acte de retrait' },
        { key: 'numtitre', label: 'Motif' },
    ],

        fields3: [
        { key: 'index', label: 'Numero de la suspension' },
        { key: 'entite', label: 'Date d\'acte de suspensionmotif' },
        { key: 'numtitre', label: 'Date debut suspension' },
        { key: 'numaac', label: 'Date fin suspension' },
   ],
    fields4: [
        { key: 'index', label: 'Raison sociale' },
        { key: 'entite', label: 'Sigle' },
        { key: 'numtitre', label: 'Contrat No' },
        { key: 'typetitre', label: 'Date du contrat' },
        { key: 'numufa', label: 'Acte d\'approbation No' }, 
        { key: 'numufe', label: 'Date acte d\'approbation No' }, 
    ],

    
    fields5: [
        { key: 'entite', label: 'Nom commercial', thStyle: { width: "2%" }  },
        { key: 'numaac', label: 'Diamètre' , thStyle: { width: "2%" } }, 
    ],   

    fields6: [
        { key: 'index', label: 'Arrondissement' },
        { key: 'entite', label: 'Département' },
        { key: 'numtitre', label: 'Région' },
    ],

    fields7: [
        { key: 'entite', label: 'Nom commercial' },
    ],

    elements: [],

    selected:{},
    
     search:{
      numtitre:"",
      typetitre:"",
      numufa:"",
      exercice:"",
      numcertificat:""
    },
    entite:{
      id:1,
      libelle:''
    },
    width:"w-50",
    searchSubmitted:false,

    optionsStatus:[{key:"", libelle: ""}, {key:"BROUILLON", libelle: "Brouillon"}, {key:"SOUMIS", libelle: "Soumis"}, {key:"VALIDE", libelle: "validé"}, {key:"REJETE", libelle: "rejeté"}],
  }),
  computed:{
    ...mapGetters(['user']),
    /*propriétés liées aux accèes*/
    canCreateUtilisateur(){return true},
    canUpdateOperationParc(){return true},
    canDeleteOperationParc(){return false},
    canViewDetailsOperationParc(){return true},
    canSaveOperationParc(){return false},
    canSubmitOperationParc(){return true;},
    canPrintOperationParc(){ return false;},

    items() { 
      return this.elements.map((a, index) => {  
        a.isFirst = index == 0        
        a.isEven = index %2 == 0        
        return a
      })
    },
    offset() {
      return (this.currentPage * this.perPage) - this.perPage
    },
  },
 
 methods: {
  rowClass(item, type) {
    if(item !=''&&item!=null){
      if (item.isEven) return 'table-row-other'
      if (!item || type !== 'row') return 'table-info'
    }else{
      return 
    }
  },
  handleAddUser(){
    this.getUsers();
    this.$bvModal.hide('user-form')
  },
  onRowSelected(items) {
    console.log('row selected',items);
    items.isSelected =true;
    this.isRowselected=true
        this.selected = items
  },
  search(){console.log('to implement');},
  reset(){console.log('to implement');},
  callEditOperationParc(){this.$bvModal.show('modal-lg')},
   showDetails(){
    this.$router.push({
    name: 'detail-inventaire', 
    params: { id: this.selected[0].idoperation }
});
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
  changePage(page) {
    this.currentPage = page
    this.getInventaires()
  },
  getInventaires(){
     this.isBusy=true
      const params = this.getRequestParams(
        this.currentPage,
        this.pageSize
      );
      this.$inventaire.get("inventaires", {params}).then(response => {
          console.log(response.data.result.items);
        this.total = response.data.result.totalItems
        this.currentPage = response.data.result.currentPage + 1
        this.elements=response.data.result.items

         this.elements = this.elements.map(elt =>{
           elt.datesoumission = elt.datesoumission !== null? this.$dayjs(elt.datesoumission).format("DD/MM/YYYY"): "";
           elt.datesignature = elt.datesignature !== null? this.$dayjs(elt.datesignature).format("DD/MM/YYYY"): "";
          return elt
        })
	     this.isBusy=false
        setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
      })
      .catch((error) => {
        console.log(error)
        this.isBusy=false
      });

  },
  filterTable() {
    console.log('search',this.search);
      this.isBusy=true
      this.$transformation.post("entrees-usinage/search", this.search).then((response) => {
          this.total = response.data.result.totalItems
          this.currentPage = response.data.result.currentPage + 1
          this.elements=response.data.result.items
          this.elements = this.elements.map(elt =>{
          elt.dateoper = elt.dateoper !==null ? this.$dayjs(elt.dateoper).format('DD/MM/YYYY') :""

          return elt
        })
          storage.set(this.$route.path ,JSON.stringify(this.search))
          this.isBusy=false
        })
        .catch((error) => {
          this.isBusy=false
            console.log('c',error.response.data);
        });
    },

    resetSearcheBar(){
     this.search = {
      idlot: "",
      site: "",
      ligne: "",
	    datedeb: "",
	    datefin: "",
	    statut: "",
	    entite: "",
    }
     localStorage.removeItem('sigif2./transformation-entree_usinage')
     
  },
  reset(){
    this.resetSearcheBar()
    this.getEntreeUsinage()
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
  }
 },
 

  mounted(){
     this.entite.libelle=this.user.profil.organisation
    if(JSON.parse(storage.get(this.$route.path)!==''&&JSON.parse(storage.get(this.$route.path)!==null))){
      this.search=JSON.parse(storage.get(this.$route.path))
      this.filterTable();
    }else{this.getInventaires();}
    if(this.entite.libelle!=="MINFOF"){
      this.disabled=true
    }
     
     this.toggleSideBar()
  }
  }

</script>
<style scoped>
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
  cursor:pointer;
  color:#82C138;
}
.change-image-opacity{
  opacity: 0.15;
}
.not-change-image-opacity{
  opacity: 1;
}
.custumSigifTab {
    float: left;
    background-position: top;
    box-sizing: border-box;
    white-space: nowrap;
    border-top: 1px solid #82C138;
    border-left: 1px solid #82C138;
    border-right: 1px solid #82C138;
    padding: 0 !important;
    border-bottom: none;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    line-height: 19px;
    margin-top: 0px;
    background-color: #fff;
    color: #000;
}
.custumSigifTab .nav-link{
    padding-left: 0 !important;
    padding-right: 0 !important;
}
.nav-tabs .nav-link.active{
  background: #82C138;
  color: #fff;
}

</style>