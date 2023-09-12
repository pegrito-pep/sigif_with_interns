<template>
    <div class="" id="cover">
		<b-container fluid class="p-5">
			<h1 class="font-weight-bold text-center text-uppercase"> <span class="text-danger text-uppercase">accès refusé</span></h1> 
			<hr/><br/>
			<div class="w-50 mx-auto">
				<b-alert show style="background-color: #82C138; border-color: #82C138; box-shadow:border-box">
					<div class="h5">
						<p class="text-center h5 ">
							<i class="fa fa-ban fa-3x"></i> <br />
							Vous ne disposez pas du droit de consulter cette page. Pour résoudre ce problème, bien vouloir contacter votre adminnistrateur
						</p>
						
						<div class="d-flex justify-content-center"><b-button variant="success" class="d-flex justify-content-between" @click.prevent="goHome"><i class="fa fa-arrow-left fa-2x mr-2"></i><span>retourner à l'accueil</span></b-button></div>
					</div>
				</b-alert>
			</div>
		</b-container>

		<b-button  class="position-fixed validate btn-icon" variant="danger" @click.prevent="logout" v-b-tooltip.left="'Se deconnecter'"><i class="fa fa-power-off fa-lg"></i></b-button>


	</div>
</template>

<script>
import {mapGetters} from 'vuex'
const php  = require ( 'phpjs' )

export default {
    name: 'unAuthorized',
    data: () => ({


    }),
	computed: {
		...mapGetters(['user']),

	},
    mounted() {
    },
    

    methods: {
		logout() {
           	this.$store.dispatch('user', {})
            storage.clear()
            this.$router.push({name: 'login'})
        },
		goHome(){
			this.$router.push({name: 'modules'})
		}

	}
}
</script>


<style scoped>
#cover {
    background-image: url('~@/assets/images/logo_sigif_trame.png');
    background-size: 40vw 80vh;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}
button.validate{
    bottom: 1em;
    right: 1em;
    width: 3em;
    height: 3em;
    box-shadow: 3px 1px 1px gray;
}
</style>