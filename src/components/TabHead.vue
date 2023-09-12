<template>
            <div style="border-bottom:3px solid green" class="ml-2">
              <b-row>
                <b-col><h6 class="" style>
                  <button id="toggleSideBar" @click="toggleSideBar"><span aria-hidden="true" style="font-size: 30px">&times;</span>
                  <!-- </button><span class="ml-1 font-weight-bold">consultation entrée usinage N°:{{ entreUsinage.idlot }}</span></h4> -->
                  </button><span class="ml-1 font-weight-bold">{{title}} {{idElement}}</span></h6>
                    
                  </b-col>
                <b-col class="col-md-auto">

                  <span>
                    <b-button v-if="showNew" :disabled="!canAddNew" @click.prevent="nouveau" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/iconPLUS_16x16.png"></b-img>Nouveau</b-button>
                  </span>
                  <span>
                    <b-button v-if="showDelete" :disabled="disabledSupprimer" @click.prevent="supprimer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/iconSUPPRIMER_16x16.png"></b-img>Supprimer</b-button>
                  </span>
                  <span>
                    <b-button v-if="showModify" :disabled="disabledModifier" @click.prevent="modifier" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/iconMODIFIER_16x16.png"></b-img>Modidier</b-button>
                  </span>
                  <span>
                    <b-button v-if="showSave" :disabled="disabledEnregistrer" @click.prevent="enregistrer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_enregistrer_vert.png"></b-img>Enregistrer</b-button>
                  </span>
                  <span>
                    <a @click.prevent="fermer" size="sm" class="mx-1 simple-btn"><b-img src="@/assets/images/picto_retour_vert.png"></b-img>Fermer</a>
                  </span>
                </b-col>
              </b-row>
            </div>
</template>
<script>
    export default {
        props:{
            fermer:Function,
            enregistrer:Function,
            disabledModifier:Boolean,
            disabledSupprimer:Boolean,
            disabledEnregistrer:Boolean,
            canAddNew:Boolean,
            showNew:Boolean,
            showDelete:Boolean,
            showModify:Boolean,
            showSave  :Boolean,
            title:String,
            nouveau:Function,
            idElement:{
              type:Number ,required:false
            }
        },
        methods:{
          toggleSideBar() {
            var sidebar = document.querySelector("#sidebar");
            var administration = document.querySelector("#administration");
            var administrationItem = document.querySelectorAll(".administrationItem");
            var actionButton = document.querySelector("#toggleSideBar");

            if (sidebar.style.width !== "0px") {
                sidebar.style.width = "0px";
                sidebar.style.transition = "all 0.5s ease";
                administration.style.backgroundColor = "white";
                administration.style.transition = "background-color 0.2s ease";
                for (let index = 0; index < administrationItem.length; index++) {
                const element = administrationItem[index];
                element.style.opacity = "0";
                element.style.transition = "opacity 0.2s ease";
                }
                actionButton.innerHTML =
                '<i class="fas fa-bars fa-1x" style="font-size: 18px"></i>';
            } else {
                sidebar.style.width = "250px";
                sidebar.style.transition = "all 0.3s ease";
                administration.style.backgroundColor = "#82C138";
                administration.style.transition = "background-color 0.8s ease";

                for (let index = 0; index < administrationItem.length; index++) {
                const element = administrationItem[index];
                element.style.opacity = "100%";
                element.style.transition = "opacity 1s ease";
                }

                actionButton.innerHTML =
                '<span aria-hidden="true" style="font-size: 30px">&times;</span>';
            }
        }
        }
    }
</script>
<style scoped>
  .simple-btn,.simple-btn:hover{
    background:none;
    border:none;
    color:black;
    font-weight: bold;
    cursor:pointer;
  }
</style>
<style>
  #toggleSideBar{
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
</style>