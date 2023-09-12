<template>
    <div>
        <b-row>
            <b-col>
                <div class="p-1">
                    <b-row>
                        <b-col>
                            <h5 style="font-weight:bold">Enregistrement des Quotas</h5>
                        </b-col>
                        <b-col class="col-md-auto">
                            <span>
                                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</a>
                            </span>
                            <span>
                                <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                            </span>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="6">
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Entité forestière</span>
                        </div>
                    </template>
                    <b-input value="LE ZENITH SARL" style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>SIGLE</span>
                        </div>
                    </template>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input> -->
                    <label>ZTN</label>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Exercice fiscal</span>
                        </div>
                    </template>
                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:100%" class="form-control p-1" size="sm"></b-input>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Numéro du quotas</span>
                        </div>
                    </template>
                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Date de signature</span>
                        </div>
                    </template>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>0 -->
                    <b-datepicker placeholder="dd/mm/yyyy" style="height: calc(1em + .600rem + 1px) !important;width:100%" class="form-control" size="sm"></b-datepicker>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Date de fin de validité</span>
                        </div>
                    </template>
                    <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>0 -->
                    <b-datepicker placeholder="dd/mm/yyyy" style="height: calc(1em + .600rem + 1px) !important;width:100%" class="form-control" size="sm"></b-datepicker>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span>Attacher autorisation d'exportation</span>
                        </div>
                    </template>
                    <b-form-file plain style="width:150%;" size="sm"></b-form-file>
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
                    <b-form-checkbox size="sm"></b-form-checkbox>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="4">
                <div class="pl-1"><h5 style="font-weight:bold;">Essence</h5></div>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Nom commercial</span>
                        </div>
                    </template>
                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:250%" class="form-control p-1" size="sm"></b-input>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Type de produit</span>
                        </div>
                    </template>
                    <select style="height: calc(1em + .400rem + 1px) !important;width:100%" class="form-control p-0" size="sm">
                        <option value=""></option>
                        <option value="g">Grume</option>
                        <option value="d">Débité</option>
                        <option value="p">Produit spéciaux</option>
                    </select>
                </b-form-group>
                <b-form-group class="p-0 m-0"
                    label-cols="7"
                    label-align="right"
                >
                    <template #label>
                        <div class="label-form">
                            <span style="color:red">*</span><span>Volume attribué</span>
                        </div>
                    </template>
                    <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>
                </b-form-group>
            </b-col>
        </b-row>
    </div>
</template>
<script>
    export default{
        name:'quotas_bois_exportations_details',
        data(){
            return{

            }
        },
        methods:{
            fermer(){
                this.$router.push({name: 'quota_bois_exportation'})
            }
        }
    }
</script>
<style soped>
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
</style>