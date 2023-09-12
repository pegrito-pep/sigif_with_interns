
<template>
    <div class="footer px-1">
        <div class="content">
            <!--<p>Copyright &copy; <span class="footer-text">2015 tous droits reservés Réalisations MINFOF</span> </p>-->
            <p>Copyright &copy; <span class="footer-text">2025{{ $t('data.tous_droits_reservés_Réalisations_MINFOF') }}</span> </p>
            <div class="liens">
                <a href="#"  class="footer-text">MINFOF</a>
                <a href="#"  class="footer-text"> {{ $t('data.SIGIF_Informations_publiques') }}</a>
                <a href="#"  class="footer-text">{{ $t('data.Mentions_légales') }}</a> 
            </div>
        </div>
    </div>
</template>


<script>
export default {
    name: 'ModulesFooterc',
    data() {
        return{

        }
    },
}
</script>

<style scoped>
    .footer {
        height: 40px;
        width: 100%;
        display: flex;
        align-items: center;
        background-image: url('~@/assets/images/image.png');
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
        
    }

    .content{
        width: 100%;
        display: flex;
        padding-top: 10px;
        justify-content: space-between;
        color:#175131;;
    }
    .liens a{
        padding-left: 20px;
        color:inherit;
        /*color: black;*/
        text-decoration: none;
    }
    .liens a:hover{
        text-decoration: underline;
        font-weight: 600;
    }

    @media screen and (max-width: 1000px)  {
        .footer{
            height: 60px;
            margin-top: 80px;
            padding-top: 10px;
            padding-bottom: 10px;
        }
    }

    @media screen and (max-width: 600px)  {
        .footer-text{
            font-size: 12px;
        }
    }
</style>