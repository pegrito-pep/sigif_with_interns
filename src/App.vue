<template>
	<component :is="layout">
    <vue-page-transition name="fade-in-right">
      <router-view/>
    </vue-page-transition>
	</component>
</template>

<script>
const DEFAULT_LAYOUT = 'empty'

import Vue from 'vue'

import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)

export default {
  name: 'App',
  computed: {
	  layout() {
		  return (this.$route.meta.layout || DEFAULT_LAYOUT) + '-layout'
	  }
  },
  mounted() {
    this.hideOverflow()
	  // initTemplateScript(window, document, jQuery)
  },
  updated() {
    this.hideOverflow()
    //alert('s')
	  //initTemplateScript(window, document, jQuery)
  },
  methods: {
    hideOverflow() {
      if (this.$route.name == 'modules') {
        $('html, body').css('overflow', 'hidden')
      }
      else {
        $('html, body').css('overflow', 'auto')
      }
    },
    
  }
}
</script>
<style>
.table-header-border{
  border-top: 2px solid rgb(0, 82, 44) !important;
  border-bottom: 2px solid rgb(0, 82, 44) !important;
}
.tab-header-left-text{
  display: inline;
  white-space: nowrap;
  font-family: 'Verdana';
  font-size: 22px;
  font-weight: 600;
  color: #333333;
}
.table-first-row{
  background-color: #81c138a8;
  color: White;
}
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td {
    background-color: #82C138!important;
    color:white!important;
}
.table.b-table > tbody > .table-active, .table.b-table > tbody > .table-active > th, .table.b-table > tbody > .table-active > td>input {
    background-color: #82C138!important;
}
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #82C138!important;
  color:white!important;
}
.table td, .table th {
  padding: 5px 0;
}
.table tr{
  font-size: 13px;
  font-family: verdana, arial;
}

.table-row-other{
  background-color: #caf09e;
}    
/*style de la pagination*/
.page-item.active .page-link {  
    background-color: rgb(0, 82, 44)!important;  
    border-color: rgb(0, 82, 44)!important; 
    color: white !important;;
}
.page-link{
  color:rgb(0, 82, 44)!important;  
}
#toggleSideBar {
  margin-left: 20px;
  border: none;
  background-color: #fff;
}
  .custo-bg_detail_-table_element{
    background-color:#82C138;
  }
  /**customization style des checkboxes retrait style bleue par défaut */
    .custom-checkbox .custom-control-input:disabled:checked~.custom-control-label::before {
    background-color: white;
    background-color: #ced4da;
    border: #ced4da;
}
.disabled {
    pointer-events:none;
    color: #bfcbd9;
    cursor: not-allowed;
    background-image: none;
    background-color: #eef1f6;
    border-color: #d1dbe5;   
 }
 .custom-select-type_titre{
  --vs-dropdown-option--active-bg: #82C138;
  --vs-dropdown-option--active-color: #fff;
    --vs-selected-color: #1f1c1c;
        /* Font */
    --vs-font-size: 0.65rem;
    --vs-line-height: 0.8;
    --vs-actions-padding: 0px 0px 0 0px;
  }

  /*obligation de la couleur des checkbox*/
  .custom-control-input:checked~.custom-control-label::before {
    color: #fff;
    border-color: green;
    background-color: green;
    box-shadow: none;
  }

</style>