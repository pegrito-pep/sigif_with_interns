<template>
    <div style="max-height: 100vh; overflow: hidden" >
        
        <SigifHeader />
        <div class="d-flex">
            <div id="sidebar">
                <SigifSibar />
            </div>
            <div class="wrapper">
                <slot />
            </div>
            
        </div>
        <ModulesFooter />
    </div>
   
</template>

<script>
import Vue from 'vue'
import SigifHeader from "@/components/templates/SigifHeader.vue"
import SigifSibar from "@/components/templates/SigifSibar.vue"
import ModulesFooter from  '@/components/ModulesFooterc.vue';
import Paginator from '@/components/Paginator.vue'
import PaginatorSelect from '@/components/PaginatorSelect.vue'
import PaginatorTop from '@/components/PaginatorTop.vue'
import FormGroup from '@/components/SigifFormGroup.vue'
import FormGroupVertical from '@/components/SigifFormGroupVertical.vue'
import SearchBarActionsButtons from '@/components/SigifSearchBarActions.vue'
import SearchBarActionsButtonsNew from '@/components/SigifSearchBarActionsNew.vue'
import SigifCustomSelect from '@/components/SigifCustomSelect.vue'
import TabHead from '@/components/TabHead.vue'

Vue.component('TabHead',TabHead)
Vue.component('Paginator', Paginator)
Vue.component('PaginatorSelect', PaginatorSelect)
Vue.component('PaginatorTop', PaginatorTop)
Vue.component('SigifFormGroup', FormGroup)
Vue.component('SigifFormGroupVertical', FormGroupVertical)
Vue.component('SearchBarActionsButtons', SearchBarActionsButtons)
Vue.component('SearchBarActionsButtonsNew', SearchBarActionsButtonsNew)
Vue.component('CustomSelect', SigifCustomSelect)
export default {
    name: 'DefaultLayout',
    components: {
      SigifHeader,
      SigifSibar,
      ModulesFooter,
      FormGroup,
      FormGroupVertical,
      SearchBarActionsButtons,
      TabHead,
    },
    mounted() {
      //initTemplateScript(window, document, jQuery)
    },
}
</script>

<style scoped>
.wrapper{
    flex: 1;
    max-height: calc(100vh - 140px);
    overflow: auto;
    z-index: 100;
}

/* width */
.wrapper::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.wrapper::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 5px grey;  */
  border-radius: 2px;
}
 
/* Handle */
.wrapper::-webkit-scrollbar-thumb {
  background: rgb(0, 82, 44); 
  border-radius: 2px;
}

/* Handle on hover */
.wrapper::-webkit-scrollbar-thumb:hover {
  background: rgb(0, 82, 44); 
}

</style>