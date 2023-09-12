<template>
    <b-table :busy="isBusy" bordered sort-icon-left hover   select-mode="single" responsive="sm" :ref="selectableTable" selectable @row-selected="onRowSelected"
              :items="items" 
              :fields="fields" 
              :tbody-tr-class="rowClass" show-empty>
                <template #table-busy>
                  <div class="text-center text-success my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong class="ml-1">chargements...</strong>
                  </div>
                </template>
                <!-- <template #table-colgroup>
                  <col
                    style="width:30px"
                  >
                </template> -->
                
                  <!-- <template v-slot:head(index)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template> -->
                  <!-- <template v-slot:head(idoperation)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template> -->
                  <!-- <template v-slot:head(dateoper)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(heureoper)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(intitulesite)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(libelletypeopeparc)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template>
                  <template v-slot:head(statutenr)="data">
                    <span class="d-flex justify-content-center align-items-center" v-html="data.field.label" style="color:green"></span>
                  </template> -->
                  <!-- <template #empty>
                        <h4 style="color:green" class="text-center">Aucune opération de parc de type <span class="font-weight-bold">Entrée parc</span> trouvée!!</h4>
                  </template>
                  <template #cell(index)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ ++data.index }}</b> </span>
                  </template>
                  <template #cell(idoperation)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.idoperation }}</b> </span>
                  </template>
                  <template #cell(dateope)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.dateope }}</b> </span>
                  </template>
                  <template #cell(heureoper)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.heureoper }}</b> </span>
                  </template>
                  <template #cell(intituleSite)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.intituleSite }}</b> </span>
                  </template>
                  <template #cell(libelletypeopeparc)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.libelletypeopeparc }}</b> </span>
                  </template>
                  <template #cell(statutenr)="data">
                    <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{ data.item.statutenr }}</b> </span>
                  </template>  -->
                <template #cell(index)="data">
                  <!-- <span class="d-flex justify-content-center align-items-center"><b class="ml-1">{{++data.index}}</b> </span> -->
                  <span style=""><b class="">{{++data.index}}</b> </span>
                </template>
                <template v-for="(field,i) in fields" #[`head(${field.key})`]="data">
                  <!-- <span class="d-flex justify-content-center align-items-center" v-if="data.index > 0" :key="i" v-html="data.field[label]" style="color:green">HTML</span> -->
                  <!-- <span class="d-flex justify-content-center align-items-center"  :key="i"  style="color:green">{{data.field.label}}</span> -->
                  <span  style="display:block;width:50%;color:green"  :key="i"  >{{data.field.label}}</span>
                </template>
                
<!-- <span v-if="data.item.actif==true"  style="color: green; font-weight:bold"><i class="fa fa-check fa-lg" aria-hidden="true">{{data.value}}</i></span> -->

                <template v-for="(f,i) in fields.slice(1)" #[`cell(${f.key})`]="data">
                  <span v-if="f.key==='actif'" :key="i" style="color: green">
                    <!-- <b-icon v-if="data.item.actif" icon="check-square-fill"></b-icon> -->
                    <b-img v-if="data.item.actif" src="@/assets/images/picto_check_vert.png"></b-img>
                  </span>
                  <span v-else-if="f.key==='auth'" :key="i">
                    <span v-if="data.item.auth!==null"  style="color: green; font-weight:bold">
                      <a :href="data.item.auth" target="_blank" v-b-tooltip.hover title="consulter">
                        <b-img src="@/assets/images/download.png"></b-img>
                      </a>
                    </span>
                  </span>
                  <!-- <span v-else class="d-flex justify-content-center align-items-center"  :key="i"> -->
                  <span v-else class=""  :key="i">
                    <b class="">
                      {{data.value}}
                    </b> 
                  </span>
                  
                </template> 
    </b-table>
        
                
</template>



<script>
export default{
    props:{
        isBusy:Boolean,
        onRowSelected:Function,
        items:Array,
        fields:Array,
        rowClass:Function,
        selectableTable:String
    },
}
</script>

<style scoped>
</style>