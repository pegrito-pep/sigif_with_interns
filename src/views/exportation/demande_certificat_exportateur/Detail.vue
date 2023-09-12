<template>
    <div>
        <b-row>
            <b-col>
                <div class="p-1">
                    <b-row>
                        <b-col>
                            <h5 style="font-weight:bold">Edition d'un certificat d'exportateur</h5>
                        </b-col>
                        <b-col class="col-md-auto">
                            <span>
                                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                            </span>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
    </b-row>
    <b-row>
        <b-col cols="4">
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Organisation</span>
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
                            <span>N° enregistrement</span>
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
                            <span>Source d'approvisionnement</span>
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
                            <span>Type de produit</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
            </b-col>
    </b-row>
    <div class="ml-2 p-2">
        <h5 class="pl-2 pl-3" style="font-weight:bold;border-bottom:2px solid green">Demande</h5>
        <div>
            <b-row>
                <b-col cols="2">
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>N°</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>Date</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                        label-cols="3"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Document &nbsp;</span>
                            </div>
                        </template>
                        <b-form-file style="width:250%;" plain disabled></b-form-file>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>
        <h5 class="pl-2 pl-3" style="font-weight:bold;border-bottom:2px solid green">Acte d'approbation</h5>
        <div>
            <b-row>
                <b-col cols="2">
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>N°</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>Date</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                        label-cols="3"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Document &nbsp;</span>
                            </div>
                        </template>
                        <b-form-file style="width:250%;" plain disabled></b-form-file>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>
        <h5 class="pl-2 pl-3" style="font-weight:bold;border-bottom:2px solid green">Attestation</h5>
        <div>
            <b-row>
                <b-col cols="2">
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>N°</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                    </b-form-group>
                    <b-form-group class="p-0 m-0"
                    label-cols="3"
                    label-align="right"
                    >
                    <template #label>
                        <div class="label-form">
                            <span>Date</span>
                        </div>
                    </template>
                    <label class="label-italic">fojeph@gmail.com</label>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
                </b-form-group>
                </b-col>
                <b-col cols="3">
                    <b-form-group class="p-0 m-0"
                        label-cols="3"
                        label-align="right"
                    >
                        <template #label>
                            <div class="label-form">
                                <span>Document &nbsp;</span>
                            </div>
                        </template>
                        <b-form-file style="width:250%;" plain disabled></b-form-file>
                    </b-form-group>
                </b-col>
            </b-row>
        </div>
    </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                checked:true
            }   
        },
        methods:{
            fermer(){
                this.$router.push({name: 'demande_certificat_exportateur'})
            }
        }
    }
</script>
<style>
 .label-form{
        margin-top:-8px;
    }
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