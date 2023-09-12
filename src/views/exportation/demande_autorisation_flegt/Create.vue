<template>
    <div id="cover">
        <b-overlay rounded="sm" :show="showOverlay">
            <template #overlay>
                <div class="text-center">
                    <i class="fas fa-2x fa-sync fa-spin"></i>
                    <p>Chargement...</p>
                </div>
            </template>
            <b-row class="m-1">
                <b-col>
                    <b-tabs>
                        <b-tab title="Bois réelement exporté">
                            <div style="border:1px solid grey" class="p-2">
                                <b-row>
                                    <b-col>
                                        <h4 class="form_title">Création demande d'autorisation FLEGT n° {{  }} CB n° {{  }}:</h4>
                                    </b-col>
                                    <b-col class="col-md-auto">
                                        <span>
                                            <b-spinner v-if="submitted" class="mx-2"></b-spinner>
                                            <a v-else
                                                @click.prevent="submitData" 
                                                :disabled="submitted"
                                                class="mx-1 simple-btn"
                                            ><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                                            <a class="mx-1 simple-btn" @click.prevent="fermer"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                                        </span>
                                    </b-col>
                                </b-row>
                                <div class="ml-2 mt-2 p-1">
                                    <b-row>
                                        <b-col cols="4">
                                            <b-row>
                                                <b-col cols="4">
                                                    <span>Codebarre BSE</span>
                                                </b-col>
                                                <b-col>
                                                    <v-select class="custom-select-type_titre">

                                                    </v-select>  
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col>
                                            <b-row>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Nombre d'unités</span>
                                                </b-col>
                                                <b-col cols="1"></b-col>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Volume total</span>
                                                </b-col>
                                                <b-col cols="1"></b-col>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Poids total</span>
                                                </b-col>
                                                <b-col cols="1"></b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                    <b-row class="my-1">
                                        <b-col cols="4">
                                            <b-row>
                                                <b-col cols="4">
                                                    <span>Date demande</span>
                                                </b-col>
                                                <b-col>
                                                    <input type="date" 
                                                        style="width:75%"
                                                        class="default-old-system-select-properties"
                                                    />
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </div>
                                <div class="table-header-border p-1">
                                    <b-row>
                                        <b-col cols="4">
                                            <b-row>
                                                <b-col cols="6">
                                                    <span>N° autorisation FLEGT</span>
                                                </b-col>
                                                <b-col>
                                                    <!-- <input type="date" style="width:100%" class="default-old-system-select-properties" /> -->
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-row>
                                                <b-col cols="4">
                                                    <span>Copie Autorisation FLEGT</span>
                                                </b-col>
                                                <b-col>
                                                    <input disabled type="file" style="width:70%" class="default-old-system-select-properties" />
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </div>
                                <div class="table-header-border p-1">
                                    <b-row>
                                        <b-col cols="4">
                                            <b-row>
                                                <b-col cols="5">
                                                    <span>Date rejet</span>
                                                </b-col>
                                                <b-col>
                                                    <input type="date" style="width:100%" class="default-old-system-select-properties" />
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="1"></b-col>
                                        <b-col cols="6">
                                            <b-row>
                                                <b-col cols="6">
                                                    <span>Motif rejet</span>
                                                </b-col>
                                                <b-col>
                                                    <!-- <input type="file" style="width:100%" class="default-old-system-select-properties" /> -->
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                    </b-row>
                                </div>
                                <div style="margin-top:50px;margin-bottom:10px">
                                    <b-tabs id="tabs">
                                        <b-tab title="Liste des produits">
                                            <div style="border:1px solid grey" class="p-2">
                                                <div>
                                                    <b-table
                                                        :items="items"
                                                        :fields="fields"
                                                        :tbody-tr-class="rowClass"
                                                        selectable
                                                        ref="selectableTable"
                                                        @row-select="onRowSelected"
                                                    >

                                                </b-table>
                                                </div>
                                            </div>
                                        </b-tab>
                                    </b-tabs>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
        </b-overlay>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                showOverlay:false,
                submitted:false,
                fields:[
                        {key:'essence',label:'Essence',thStyle:{color:'green'}},
                        {key:'volume',label:'Volume',thStyle:{color:'green'}},
                        {key:'poids',label:'Poids',thStyle:{color:'green'}},
                        {key:'nreunites',label:'Nombre d\'unités',thStyle:{color:'green'}},
                ],
                elements:[],
                isRowselected:false,
                isToValidate:false,
                isToSubmit:false
            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'demande_autorisation_flegt'})
            },
            rowClass(item, type) {
                if (item != "" && item != null) {
                    if (item.isEven) return "table-row-other";
                    if (!item || type !== "row") return "table-info";
                } else {
                    return;
            }
        },
        onRowSelected(){
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
        }
        },
        computed:{
            items(){
            return this.elements.map((a, index) => {
                a.isFirst = index == 0;
                a.isEven = index % 2 == 0;
                return a;
            });
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
    .form_title{
        font-family: 'Verdana';
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }

    .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }

    .simple-btn:hover{
        background:none;
        border:none;
        cursor:pointer;
    }
    .form_title{
        font-family: 'Verdana';
        font-size: 16px;
        font-weight: bold;
        color: #333333;
    }
    .custom-select-type_titre{
    --vs-dropdown-option--active-bg: #82C138;
    --vs-dropdown-option--active-color: #fff;
        --vs-selected-color: #1f1c1c;
            /* Font */
        --vs-font-size: 0.65rem;
        --vs-line-height: 1.2;
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
