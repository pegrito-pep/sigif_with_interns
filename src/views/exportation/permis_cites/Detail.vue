<template>
    <div>
        <b-row>
        <b-col>
            <div class="p-1">
                <h5 style="font-weight:bold">Edition des CITES</h5>
            </div>
        </b-col>
        <b-col class="col-md-auto">
            <a @click.prevent="fermer" class="mx-1 simple-btn">
                <b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer
            </a>
        </b-col>
    </b-row>
    <b-row>
            <b-col cols="5">
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Numéro Permis CITES</span>
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
                            <span>Numéro Timbre CITES</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Numéro Feuillet</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Entité forestière</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Marteau/Sigle</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Adresse titulaire</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Numéro du permis</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Date du permis</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Numéro du titre</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Type de produit</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Type de produit</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Essence</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Nom scientifique</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Pays de provenance</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Pays de destination</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Destinataire</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
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
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>SOURCE ANNEXE</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Date signature CITES</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="5"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Date de fin de validité</span>
                        </div>
                    </template>
                    <label class="label-italic">BLC</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
            </b-col>
            <b-col cols="5">
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Numéro de l'expédition</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Volume à exporter</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Quotas annuels</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Quantité</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Quantité exportée</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Volume total</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Attacher le CITES</span>
                        </div>
                    </template>
                    <b-form-file plain></b-form-file>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Status</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
            </b-col>
    </b-row>
    </div>
   
</template>
<script>
    export default{
        name:'detail-cites',
        data(){
            return{

            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'permis_cites'})
            }
        }
    }
</script>
<style>
     .simple-btn{
        background:none;
        border:none;
        color:black;
        font-weight: bold;
        cursor:pointer;
    }
    a:hover{
        color:black;
    }
    .label-form{
        margin-top:-8px;
    }
</style>