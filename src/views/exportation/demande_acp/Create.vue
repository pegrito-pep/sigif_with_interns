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
                        <b-tab title="Demande d'ACP">
                            <div style="border:1px solid grey" class="p-2">
                                <b-row>
                                    <b-col>
                                        <h4 class="form_title">Création demande d'attestation de conformité CB n° :</h4>
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
                                                    <v-select @input="getDetailsCodeBse" :options="codesbarreBses" label="codebarre" v-model="objetcodebarre" class="custom-select-type_titre"></v-select>  
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col>
                                            <b-row>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Nombre d'unités</span>
                                                </b-col>
                                                <b-col cols="1"> <span class="font-weight-bold" v-if="objetcodebarredetail!=null&&objetcodebarredetail.nombreUnite!=''">{{ objetcodebarredetail.nombreUnite }}</span> </b-col>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Volume total</span>
                                                </b-col>
                                                <b-col cols="1"><span class="font-weight-bold" v-if="objetcodebarredetail!=null&&objetcodebarredetail.volumeTotals!=''">{{ objetcodebarredetail.volumeTotals }}</span></b-col>
                                                <b-col>
                                                    <span style="color:#333;display: flex; justify-content: end;">Poids total</span>
                                                </b-col>
                                                <b-col cols="1"><span class="font-weight-bold" v-if="objetcodebarredetail!=null">{{ objetcodebarredetail.poidTotals }}</span></b-col>
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
                                                    <input type="date" style="width:75%" v-model="form.datedemande" class="default-old-system-select-properties"/>
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
                                                    <span>Date de délivrance ANRF</span>
                                                </b-col>
                                                <b-col>
                                                    <input type="date" v-model="form.datedelivranceAnrf" style="width:100%" class="default-old-system-select-properties" />
                                                </b-col>
                                            </b-row>
                                        </b-col>
                                        <b-col cols="6">
                                            <b-row>
                                                <b-col cols="8">
                                                    <span>Copie Attestation non redevance fiscale</span>
                                                </b-col>
                                                <b-col>
                                                    <input type="file" @change="selectnonredevancefile" style="width:100%" class="default-old-system-select-properties" />
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
        <created-box ref="createdDialogue"></created-box>

    </div>
</template>
<script>
    import CreatedBox from '@/components/utils/Created.vue';
    
    export default{
        components:{ CreatedBox },
        watch:{
            elements(value){
            if(value.length>0){
                setTimeout(() => {this.$refs['selectableTable'].selectRow(0) }, 200);
            }
            },
        },
        data(){
            return{
                showOverlay:false,
                submitted:false,
                codesbarreBses:[],
                objetcodebarre:null,
                form:{
                    datedelivranceAnrf:'',
                    fichierAttestationRedevance:''
                },
                objetcodebarredetail:null,
                fields:[
                        {key:'numContrat',label:'Nro contrat',thStyle:{color:'green'}},
                        {key:'codebarre',label:'Code barre',thStyle:{color:'green'}},
                        {key:'nonCommercial',label:'Nom commercial',thStyle:{color:'green'}},
                        {key:'diamGb',label:'Diamètre gros bout',thStyle:{color:'green'}},
                        {key:'diamPb',label:'Diamètre petit bout',thStyle:{color:'green'}},
                        {key:'longueur',label:'Longueur',thStyle:{color:'green'}},
                        {key:'volume',label:'Volume',thStyle:{color:'green'}},
                        {key:'poids',label:'Poids',thStyle:{color:'green'}},
                        {key:'codeCEMAC',label:'Code CEMAC',thStyle:{color:'green'}},
                        {key:'codeSH',label:'Code SH',thStyle:{color:'green'}},
                        {key:'refCL',label:'Réf. CL',thStyle:{color:'green'}},
                        {key:'intituleProduit',label:'Intitulé produit',thStyle:{color:'green'}},
                ],
                elements:[],
                filenonredevance:null
            }
        },
        methods:{
            async handleCreated() {
                const ok = await this.$refs.createdDialogue.show({
                    title: 'Enregistrement',
                    message: 'Attestattion crée avec succès',
                    okButton: 'Nouvel enregistrement',
                })
                //If you throw an error, the method will terminate here unless you surround it wil try/catch
                if (ok) {
                    this.$refs.createdDialogue._close();
                    this.resetForm();
                } else {
                    this.$refs.createdDialogue._close();
                    this.$router.back();
                }
            },
            submitData(){
                let data={
                    idbse:this.objetcodebarre.idbseEntete,
                    datedemande:this.form.datedemande,
                    datedelivranceAnrf:this.form.datedelivranceAnrf,
                    fichierAttestationRedevance:this.form.fichierAttestationRedevance
                }
                console.log('data ',data);
                this.submitted =true;
                this.$exportations.post('Acp', data).then(response => {
                    this.submitted = false   
                    App.notifySuccess(response.data.message)
                    return this.handleCreated();
                }).catch(error => {
                console.log('error ',error);
                this.submitted = false
                this.errorHappened(error.response.data.result.toString())
            }) 
            },
            async selectnonredevancefile(e){
                const filenonredevance =this.filenonredevance= e.target.files[0];
                this.form.fichierAttestationRedevance=await this.getBase64(filenonredevance)
            },
            getBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = (error) => reject(error);
                });
            },
            async getDetailsCodeBse(){
                this.showOverlay=true;
                try {
                this.objetcodebarredetail = await this.$exportations.get("bses/"+this.objetcodebarre.idbseEntete).then(response => response.data.result);
                    
                this.elements=this.objetcodebarredetail.produits
            } catch (error) {
                console.log(error.message);
                }
                this.showOverlay=false;
            },
            async getBsesAcivees(){
                this.showOverlay=true;
                try {
                this.codesbarreBses = await this.$exportations.get("bses/activer").then(response => response.data.result.Items);
                } catch (error) {
                console.log(error.message);
                }
                this.showOverlay=false;
            },
            fermer(){
                this.$router.push({name: 'demande_acp'})
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
        },
        mounted(){
            this.getBsesAcivees();
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
