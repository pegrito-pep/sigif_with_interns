<template>
        <div class="search-bar-btn-group w-100">
            <b-col>
            <b-button @click="$emit('search')" class="search-bar-btn float-left" :disabled="submitted"><b-spinner class="" small v-if="submitted" style="margin-left: 5px;"></b-spinner>Rechercher</b-button>
            </b-col>
            <b-col>
            <b-button @click="$emit('reset')" class="search-bar-btn float-lg-right">Reinitialiser</b-button>
            </b-col>
        </div>
</template>

<script>
export default {
    name: "SigifSearchBarActions",
    props: {
        submitted: {type: Boolean, default: false},
    },
     data: () => ({

    }),
}
</script>
<style >
.search-bar-btn-group{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-bar-btn{
  border:none;
  border-radius: 6px;
  padding: 6px 10px;
  background-color: rgba(0, 82, 44, 0.89);
}
.search-bar-btn:hover{
  background-color: rgba(0, 82, 44, 0.89);
  border:none;
}
.search-bar-btn a{
  color:white
}
.search-bar-btn a:hover{
  font-weight: 600;
  font-style: italic;
  
}
</style>