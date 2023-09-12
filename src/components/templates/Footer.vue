<template>
     <footer class="main-footer">
    <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
    All rights reserved.
    <div class="float-right d-none d-sm-inline-block">
      <b>Version</b> 3.1.0
    </div>
  </footer>
</template>

<script>
export default {
    name: 'Footer',
    data: ()=>{
        return {
            annee:0,
        }
        
    },
    
    methods: {
        updateDate(){
           let date = new Date()
           let exact = 2000 + date.getYear() - 100
           this.annee = exact
           
        },
    },
    mounted() {
        this.updateDate()
    }
}
</script>