<template>
    <div>
        <b-row class="p-2 pb-0 mb-0">
            <b-col>
                <h5 style="font-weight: bold;" class="m-0 p-0">Verification du permis: 9155</h5>
            </b-col>
            <b-col class="col-md-auto">
                <span>
                    <a @click.prevent="valider" size="sm" class="mx-2 simple-btn"><b-img src="@/assets/images/picto_check_vert.png"></b-img>&nbsp;Valider</a>
                </span>
                <span>
                    <a @click.prevent="rejeter"  size="sm" class="mx-2 simple-btn"><b-img src="@/assets/images/picto_annuler_vert.png"></b-img>&nbsp;Rejeter</a>
                </span>
                <span>
                    <a @click.prevent="fermer" size="sm" class="mx-2 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>&nbsp;Fermer</a>
                </span>
            </b-col>
        </b-row>
        <div class="ml-3 mt-0 pt-2" style="border-top:3px solid green;border-bottom:3px solid green">
            <b-row>
                <b-col cols="6">
                    <div style="border-bottom:1px solid grey">
                        <b-row>
                            <b-col cols="10">
                                <b-form-group class="pt-1 m-0"
                                    label="Entité"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <b-form-input style="width:75%;" disabled class="form-control" size="sm" value="LA COMPAGNIE FOREST"></b-form-input>
                                </b-form-group>  
                                <b-form-group class="p-0 m-0"
                                        label="Type de titre"
                                        label-cols="6"
                                        label-align="right"
                                    >
                                        <select disabled style="width:135%">
                                            <option value="cfcd">Concession forestière en convention définitive</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="6"
                                    label="Type de permis"
                                >
                                    <b-form-input style="width:75%;" disabled size="sm" class="form-control-sm" value="Permis annuel d'opération"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div style="border-bottom:1px solid grey">
                        <b-row>
                            <b-col cols="10">
                                <b-form-group class="p-0 m-0"
                                    label="Entité"
                                    label-cols="6"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span class="text-danger">*</span><span>Exercice fiscal</span>
                                    </template>
                                    <b-form-input style="width:50%" disabled class="form-control" size="sm" value="2023"></b-form-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="6"
                                    label="Concession forestière n°"
                                >
                                <select disabled style="width:50%">
                                            <option value="">1109</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="6"
                                    label="UFA n°"
                                >
                                <select disabled style="width:50%">
                                            <option value="1">09031</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="6"
                                    label="N° UFE"
                                >
                                <select disabled style="width:30%">
                                            <option value="1">1</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="6"
                                    label="Assiette n°"
                                >
                                <select disabled style="width:30%">
                                            <option value="1">3</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                        label-cols="6"
                                        label-align="right"
                                    >
                                        <template #label>
                                            <span class="text-danger">*</span><span>Traitement sylvicole</span>
                                        </template>
                                        <select style="width:100%">
                                            <option value="1204">Coupe à diamètre limité</option>
                                            <option value="1204">Enrichissement</option>
                                            <option value="1204">Enrichissement</option>
                                        </select>
                                </b-form-group>
                                <b-row>
                                    <b-col cols="3"></b-col>
                                    <b-col>
                                        <ul>
                                            <li>
                                                <b-link style="color:#285430;font-size:.9rem" href="">Attestation des mesures de superficie</b-link>
                                            </li>
                                            <li>
                                                <b-link style="color:#285430;font-size:.9rem" href="">Carte des inventaires</b-link>
                                            </li>
                                            <li>
                                                <b-link style="color:#285430;font-size:.9rem" href="">Attestation de respect des obligations fiscales</b-link>
                                            </li>
                                        </ul>
                                    </b-col>
                                </b-row>
                                
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col cols="3">
                    <b-button
                        :class="visible ? null : 'collapsed'"
                            :aria-expanded="visible ? 'true' : 'false'"
                            aria-controls="collapse"
                        @click="visible=!visible" class="p-0 m-0 pt-3 pb-0" style="border:none; background: none; color:black">
                        <ul>
                            <li style="text-align: left" class="font-weight-bold" 
                                :class="{ 'collapse-open': visible, 'collapse-close': !visible }">Document émis par le système
                            </li>
                        </ul>
                    </b-button>
                        <b-collapse id="collapse" v-model="visible" class="p-0 m-0">
                            <ul style="margin-top:-1rem;margin-left:2px;">
                                <li>
                                    <b-link style="color:#285430;font-size:.9rem" href="">Certificat de matérialisation des limites</b-link>
                                </li>
                                <li>
                                    <b-link style="color:#285430;font-size:.9rem" href="">Certificat de conformité des inventaires</b-link>
                                </li>
                            </ul>
                        </b-collapse>
                </b-col>
            </b-row>
        </div>
        <!-- <b-modal id="modal-center" centered header-class="bg-green py-1 px-1 text-black">
                <template #modal-title>
                    <div class="p-0 m-0">
                        <span style="font-size:.9rem">Attention cette opération est irréversible.Voulez-vous rejeter cette demande?</span>
                    </div>
                </template>
                <template #modal-ok>
                    <span>
                        <a style="color:green" size="sm" class="simple-btn"><b-img src="@/assets/images/picto_check_vert.png"></b-img>&nbsp;OUI</a>
                    </span>
                </template>
                <template #modal-cancel>
                    <span>
                        <a style="color:green" size="sm" class="simple-btn"><b-img src="@/assets/images/picto_croix_rouge.png"></b-img>&nbsp;NON</a>
                    </span>
                </template>
                <template #default>
                    <b-container-fluid>
                        <b-row>
                            <b-col>
                                <b-form-group class="p-0 m-0"
                                label-cols="3"
                                >
                                    <template #label>
                                        <span style="color:red">*</span>Motif du rejet
                                    </template>
                                    <b-form-input class="control-form" size="sm"></b-form-input>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                label-cols="3"
                                >
                                    <template #label>
                                        <span style="color:red">*</span>Acte de rejet
                                    </template>
                                    <b-form-file class="control-form" size="sm" plain></b-form-file>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-container-fluid>
                </template>
        </b-modal> -->
        <RejectionModal ref="rejectmodal" >
            <template #content>
                <div class="d-flex py-2">
                    <h6 class="mt-1 mx-1"><span class="text-danger">*</span>Motif du rejet</h6>
                    <textarea style="width:80%" rows="1"  v-model="motifrejet"></textarea> 
                </div>
                <div class="d-flex py-2">
                    <h6 class="mt-1 mx-1"><span class="text-danger">*</span>Acte de rejet</h6>
                    <input type="file" accept=".csv" @change="handleFileUpload( $event )" />
                </div>
            </template>
        </RejectionModal>
    </div>
</template>
<script>
    import RejectionModal from '@/components/utils/RejectionModal.vue'
    export default{
        name:'verify-permis',
        data(){
            return{
                visible:true
            }
        },
        components:{RejectionModal},
        methods:{
            fermer(){
                this.$router.push({name: 'permis'})
            },
            async rejeter(){
                const ok = await this.$refs.rejectmodal.show({
                    title: 'Attention cette opération est irréversible.Voulez-vous rejeter cette demande?',
                    okButton: 'OUI',
                    cancelButton: "NON",
                })
              //If you throw an error, the method will terminate here unless you surround it wil try/catch
              if (ok) {
                  this.$refs.rejectmodal._close();
              } else {
                this.$refs.rejectmodal._close();
              }
            },
            valider(){

            }
        }
    }
</script>
<style scoped>
    .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }
    ul,li{
        list-style-type: none;
    }
    .collapse-open{
        list-style-type: disclosure-open;
    }
    .collapse-close{
        list-style-type: disclosure-closed;
    }
</style>