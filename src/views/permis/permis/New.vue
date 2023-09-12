<template>
    <div>
        <tab-head
            title="Renouvellement de permis:"
            idElement="1204/PAO/MINFOF/SETAT/SG/DF/SDAFF/SAG"
            :fermer="fermer"
        >

        </tab-head>
        <div class="pl-2">
            <b-row>
                <b-col cols="9">
                    <div style="border-bottom:1px solid grey">
                        <b-row>
                            <b-col cols="8">
                                <b-form-group class="pt-1 m-0"
                                    label="Entité"
                                    label-cols="8"
                                    label-align="right"
                                >
                                    <b-form-input disabled class="form-control" size="sm" value="BOIS LEGAL CAMEROUN"></b-form-input>
                                </b-form-group>  
                                <b-form-group class="p-0 m-0"
                                        label="Type de titre"
                                        label-cols="8"
                                        label-align="right"
                                    >
                                        <select disabled style="width:200%">
                                            <option value="cfcd">Concession forestière en convention définitive</option>
                                        </select>
                                </b-form-group>
                                <b-form-group class="p-0 m-0"
                                    label-align="right"
                                    label-cols="8"
                                    label="Type de permis"
                                >
                                    <b-form-input disabled size="sm" class="form-control-sm" value="Permis annuel d'opération"></b-form-input>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </div>
                    <div style="border-bottom:1px solid grey">
                        <b-row>
                        <b-col cols="8">
                            <b-form-group class="p-0 m-0"
                                label="Entité"
                                label-cols="8"
                                label-align="right"
                            >
                                <template #label>
                                    <span class="text-danger">*</span><span>Exercice fiscal</span>
                                </template>
                                <b-form-input style="width:25%" disabled class="form-control" size="sm" value="2023"></b-form-input>
                            </b-form-group>  
                            <b-form-group class="p-0 m-0"
                                    label="Numéro du permis à renouveller"
                                    label-cols="8"
                                    label-align="right"
                                >
                                    <select disabled style="width:175%">
                                        <option value="1204">1204/PAO/MINFOF/SETAT/SG/DF/SDAFF/SAG</option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label-align="right"
                                label-cols="8"
                                label="Concession forestière n°"
                            >
                            <select disabled style="width:20%">
                                        <option value=""></option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label-align="right"
                                label-cols="8"
                                label="UFA n°"
                            >
                            <select disabled style="width:20%">
                                        <option value="1">1</option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label-align="right"
                                label-cols="8"
                                label="N° UFE"
                            >
                            <select disabled style="width:10%">
                                        <option value="1">1</option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label-align="right"
                                label-cols="8"
                                label="Assiette n°"
                            >
                            <select disabled style="width:10%">
                                        <option value="1">1</option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span class="text-danger">*</span><span>Traitement sylvicole</span>
                                    </template>
                                    <select style="width:150%">
                                        <option value="1204">Enrichissement</option>
                                        <option value="1204">Enrichissement</option>
                                        <option value="1204">Enrichissement</option>
                                    </select>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                label="Sous traitant"
                                label-cols="8"
                                label-align="right"
                            >
                                <b-form-input style="width:150%" value="COMMUNE DE SALAPOUMBE" class="form-control" size="sm"></b-form-input>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span class="text-danger">*</span><span>Lettre d'approbation du contrat de sous-traitance</span>
                                    </template>
                                    <b-form-file style="width:150%" size="sm" class="form-control-sm" hidden></b-form-file>
                            </b-form-group> 
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                    label="Attesstation des mesures de superficie"
                                >
                                    <div style="display: flex;width:150%;justify-content: space-between;">
                                        <span class="label-form" style="font-style: italic;">attestation.pdf</span>&nbsp;
                                        <b-form-file plain id="fileattestation" hidden class="form-control-sm" size="sm"></b-form-file>
                                        <label class="maj"  for="fileattestation">Mettre à jour ...</label>
                                    </div>
                            </b-form-group> 
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                    label="Carte des inventaires"
                                >
                                    <div style="display: flex;width:150%;justify-content: space-between;">
                                        <span class="label-form" style="font-style: italic;">carte inventaire.jpg</span>&nbsp;
                                        <b-form-file plain id="fileinventaire" hidden class="form-control-sm" size="sm"></b-form-file>
                                        <label class="maj"  for="fileinventaire">Mettre à jour ...</label>
                                    </div>
                            </b-form-group> 
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                    label="Attesstation de respect des obligations fiscales"
                                >
                                    <div style="display: flex;width:150%;justify-content: space-between;">
                                        <span class="label-form" style="font-style: italic;">redevance.pdf</span>&nbsp;
                                        <b-form-file plain id="fileobligations" hidden class="form-control-sm" size="sm"></b-form-file>
                                        <label class="maj"  for="fileobligations">Mettre à jour ...</label>
                                    </div>
                            </b-form-group> 
                            <b-form-group class="p-0 m-0"
                                    label-cols="9"
                                    label-align="right"
                                    label="Attesstation de dépôt de cautionnement / Quittance paiement RFA"
                                >
                                    <div style="display: flex;width:170%;justify-content: space-between;">
                                        <span class="label-form" style="font-style: italic;">quittance 2021.pdf</span>&nbsp;
                                        <b-form-file plain id="filedepot" hidden class="form-control-sm" size="sm"></b-form-file>
                                        <label class="maj"  for="filedepot">Mettre à jour ...</label>
                                    </div>
                            </b-form-group> 
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                >
                                    <template #label>
                                        <span class="text-danger">*</span><span>Contrat de sous-traitance</span>
                                    </template>
                                    <b-form-file style="width:150%" size="sm" class="form-control-sm" hidden></b-form-file>
                            </b-form-group>
                            <b-form-group class="p-0 m-0"
                                    label-cols="8"
                                    label-align="right"
                                    label="Certificat de recollement"
                                >
                                    <div style="display: flex;width:150%;justify-content: space-between;">
                                        <span class="label-form" style="font-style: italic;">recollement.pdf</span>&nbsp;
                                        <b-form-file plain id="filerecollement" hidden class="form-control-sm" size="sm"></b-form-file>
                                        <label class="maj"  for="filerecollement">Mettre à jour ...</label>
                                    </div>
                            </b-form-group> 
                            <b-row>
                                <b-col cols="6"></b-col>
                                <b-col cols="6">
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
                                        <li>
                                            <b-link style="color:#285430;font-size:.9rem" href="">Certificat de recollement</b-link>
                                        </li>
                                    </ul>
                                </b-col>
                            </b-row>
                            
                        </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col>
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
    </div>
</template>
<script>
    import TabHead from '@/components/TabHead'
    export default{
        name:'new',
        components:{
            TabHead
        },
        data(){
            return{
                visible:true
            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'permis'})
            }
        }
    }
</script>
<style scoped>
    body{
        font-size:.7rem;
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
    .label-form{
        display: inline-block;
        margin-top:7px;
    }
    .maj{
        padding:.3rem .8rem;
        background-color: #89C4E1;
        border-radius:5px;
        font-size: .8rem;
        font-weight: lighter;
    }
    
</style>