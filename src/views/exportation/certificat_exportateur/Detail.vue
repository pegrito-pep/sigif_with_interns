<template>
    <div>
        <b-row>
            <b-col>
                <div class="p-1">
                    <b-row>
                        <b-col>
                            <h5 style="font-weight:bold">EDITION DES CERTIFICATS</h5>
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
        <b-col cols="6">
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span>Numéro du certificat</span>
                    </div>
                </template>
                <label class="label-italic">013/CEQE/MINFOF</label>
            </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span style="color:red">*</span><span>ANNEE</span>
                    </div>
                </template>
                <b-input value="2021" style="height: calc(1em + .300rem + 1px) !important;width:100%" class="form-control p-1" size="sm"></b-input>
                <!-- <label>ZTN</label> -->
            </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span style="color:red">*</span><span>Numéro d'enregistrement</span>
                    </div>
                </template>
                <b-input value="2000/CEQE/MINFOF" style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>
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
                <label class="label-italic">BOIS LEGAL CAMEROUN</label>
                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:200%" class="form-control p-1" size="sm"></b-input> -->
            </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span>SIGLE</span>
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
                            <span style="color:red">*</span><span>Type de produit</span>
                        </div>
                    </template>
                    <select disabled style="height: calc(1em + .300rem + 1px) !important;width:50%" class="form-control p-0" size="sm">
                        <option value="g">Grume</option>
                        <option value="d">Débité</option>
                        <option value="p">Produit spéciaux</option>
                    </select>
                </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span>Date de signature</span>
                    </div>
                </template>
                <label class="label-italic">01/05/2021</label>
                <!-- <b-input style="height: calc(1em + .300rem + 1px) !important;width:150%" class="form-control p-1" size="sm"></b-input>0 -->
                <!-- <b-datepicker placeholder="dd/mm/yyyy" style="height: calc(1em + .600rem + 1px) !important;width:100%" class="form-control" size="sm"></b-datepicker> -->
            </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span>Statut</span>
                    </div>
                </template>
                <b-form-checkbox v-model="checked" disabled size="sm"></b-form-checkbox>
            </b-form-group>
            <b-form-group class="p-0 m-0"
                label-cols="5"
                label-align="right"
            >
                <template #label>
                    <div class="label-form">
                        <span>Attacher certificat</span>
                    </div>
                </template>
                <div style="display:flex;justify-content:space-between; width:80%">
                    <b-form-file hidden id="form-file" plain size="sm"></b-form-file>
                    <span style="font-style:italic">certificat exportateur.pdf</span>
                    <label style="color:green;font-style:italic" for="form-file">Mettre à jour...</label>
                </div>
            </b-form-group>
        </b-col>
    </b-row>
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
                this.$router.push({name: 'certificat_exportateur'})
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
  }</style>