<template>
    <div class="administrationItem">
        <li class="nav-item" :class="{'menu-is-opening':checkLink(), 'menu-open':checkLink()}">
            <a href="#" class="nav-link title active">
                <div class="icon">
                    <img :src="item.icon" alt="" />
                </div>
                 <!-- :class="{'menu-is-opening':$route.name == item.items[0].url, menu-open:$route.name == item.items[0].url}" -->
                <p>
                    {{ item.libelle }}
                    
                    <i class="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul class="nav nav-treeview">
                <li  class="nav-item" v-for="i in item.items" :key="i.id">
                    <b-link   :to="i.url" class="nav-link active submenu" :class="{'activ':sublink(i.url),'disable-link':!checkAccess(i.id)}">
                    <i class="far fa-circle nav-icon"></i>
                    <p>{{i.libelle}}</p>
                    </b-link>
                </li>
            </ul>
        </li>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    name: "AdministrationItem",
    props: {
        menu: Object,
        mainLink: Array,
    },
    data() {
       return {
           item: this.menu,
           hint:false,
        //    lienprincipal : this.$route.path
       } 
    },
    computed:{
        ...mapGetters(['user','hasAccess']),
      
        lienprincipal(){
            return this.$route.path
        },
    },
    methods:{
        checkAccess(id){ 
            return true;
           return this.hasAccess(id)
        },
        checkLink(){
            let links = this.mainLink.map(link  => link.url)
            let currentUrl = this.lienprincipal
            return links.includes(currentUrl)
        },
        sublink(temoin){
            let currentUrl = this.lienprincipal
            //console.log('temoin',temoin,'currentUrl',currentUrl);
            if (currentUrl == temoin) {
                return true
            } else {
                return false
            }
        }
    },
    mounted(){
        //Verifier l'url courante est présente les urls contenu par le composant
            
            

        //verifier si l'url actuelle correspond à l'url spécifique de la page d'un composant
    }
}
</script>

<style scoped>
.disable-link{
    pointer-events:none; 
    opacity:0.6;    
}
.administrationItem{
        padding: 2px 12px;
    }
    .icon{
        margin-top: -4px;
        height: 30px;
        width: 30px;
        overflow: hidden;
    }
    .icon img{
        height: 100%;
        width: 100%;
    }
    .nav-pills .nav-link.active,.nav-pills .show>.nav-link {
        color: #fff;
        background-color: rgb(0, 82, 44);
        color: white;
        font-size: 13px;
        font-weight: bold;
    }
    .nav-item .title {
        border: solid white 1.1px;
        height: 35px;
        display: flex;
    }
    .nav-treeview .nav-item p{
        font-weight: normal;
    }
    .nav-link:hover p, .nav-link:hover i{
        color: white;
    }
    .nav-link.actif{
        background: rgb(44, 44, 44);
    }
    .nav-pills .nav-link.submenu{
        background-color: #248458;

    }
    .nav-pills .nav-link.activ{
        background-color: #65A41C;
    }
</style>